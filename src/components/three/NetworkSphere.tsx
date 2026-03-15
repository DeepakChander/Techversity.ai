"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Generate evenly distributed points on a sphere (Fibonacci lattice) ─── */
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = (2 * Math.PI * i) / goldenRatio;

    positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(theta);
  }

  return positions;
}

/* ─── Connect nearby points with edges ─── */
function generateEdges(
  positions: Float32Array,
  count: number,
  maxDist: number
): Float32Array {
  const edges: number[] = [];

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDist) {
        edges.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2]
        );
      }
    }
  }

  return new Float32Array(edges);
}

/* ─── The network sphere mesh ─── */
const NODE_COUNT = 90;
const SPHERE_RADIUS = 2.8;
const EDGE_MAX_DIST = 1.4;

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { pointsGeometry, edgesGeometry } = useMemo(() => {
    const positions = generateSpherePoints(NODE_COUNT, SPHERE_RADIUS);
    const edgePositions = generateEdges(positions, NODE_COUNT, EDGE_MAX_DIST);

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Generate per-vertex sizes for variation
    const sizes = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      sizes[i] = 2.0 + Math.random() * 3.0;
    }
    pointsGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const edgesGeometry = new THREE.BufferGeometry();
    edgesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(edgePositions, 3)
    );

    return { pointsGeometry, edgesGeometry };
  }, []);

  // Custom shader for glowing points
  const pointsMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#00e5ff") },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float pulse = 0.7 + 0.3 * sin(uTime * 1.5 + position.x * 2.0 + position.y * 3.0);
          vAlpha = pulse;
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
        fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 2.0);
          gl_FragColor = vec4(uColor, glow * vAlpha * 0.9);
        }
      `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.15;
    }
    if (pointsMaterial.uniforms) {
      pointsMaterial.uniforms.uTime.value = t;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing nodes */}
      <points ref={pointsRef} geometry={pointsGeometry} material={pointsMaterial} />

      {/* Connection lines */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color="#1a6dff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[SPHERE_RADIUS - 0.02, SPHERE_RADIUS + 0.02, 128]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─── Canvas wrapper ─── */
export function NetworkSphereCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NetworkMesh />
      </Canvas>
    </div>
  );
}
