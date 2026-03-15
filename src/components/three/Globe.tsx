"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MARKER_POSITIONS = [
  { lat: 38.9, lng: -77.0, name: "CC University" },       // Washington DC
  { lat: 47.6, lng: -122.3, name: "Washington Digital" },  // Seattle
  { lat: 59.4, lng: 24.7, name: "Euro-Asian" },            // Estonia
  { lat: 48.8, lng: 2.3, name: "ESDST" },                  // Paris
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const globeRef = useRef<THREE.Group>(null);

  const wireframeGeo = useMemo(() => {
    const points: THREE.Vector3[][] = [];

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        ring.push(latLngToVec3(lat, lng, 2));
      }
      points.push(ring);
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const line: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        line.push(latLngToVec3(lat, lng, 2));
      }
      points.push(line);
    }

    return points;
  }, []);

  // Marker positions in 3D
  const markers = useMemo(
    () => MARKER_POSITIONS.map((m) => latLngToVec3(m.lat, m.lng, 2.02)),
    []
  );

  // Arc connections between markers
  const arcs = useMemo(() => {
    const arcPairs = [
      [0, 1], // CC University <-> Washington Digital
      [0, 2], // CC University <-> Euro-Asian
      [2, 3], // Euro-Asian <-> ESDST
    ];

    return arcPairs.map(([a, b]) => {
      const start = markers[a];
      const end = markers[b];
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.6); // Arc height

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(50);
    });
  }, [markers]);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe wireframe lines */}
      {wireframeGeo.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a6dff" transparent opacity={0.12} />
        </line>
      ))}

      {/* Globe surface glow */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial
          color="#0a0e27"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#1a6dff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Markers */}
      {markers.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Glow */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
          </mesh>
          {/* Outer glow ring */}
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}

      {/* Arc connections */}
      {arcs.map((arcPoints, i) => (
        <line key={`arc-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(arcPoints.flatMap((p) => [p.x, p.y, p.z])),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00e5ff" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

export function GlobeCanvas() {
  return (
    <div className="w-full aspect-square max-w-md mx-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}
