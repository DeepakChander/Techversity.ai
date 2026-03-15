"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 5000;

  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 3);
      const r2 = seededRandom(i * 3 + 1);
      const r3 = seededRandom(i * 3 + 2);
      const r4 = seededRandom(i * 7 + 5);
      const r5 = seededRandom(i * 11 + 3);

      const t = r1;
      const section = r2;
      let x: number, y: number, z: number;

      if (section < 0.3) {
        // Body - central ellipsoid
        const angle = t * Math.PI * 2;
        const bodyWidth = 0.6 + r3 * 0.4;
        const bodyHeight = 1.2 + r4 * 0.6;
        x = Math.cos(angle) * bodyWidth * (0.2 + r5 * 0.8);
        y = Math.sin(angle) * bodyHeight * 0.4 - 0.1;
        z = (r3 - 0.5) * 0.35;
      } else if (section < 0.55) {
        // Left wing
        const wingSpread = t * 3.0;
        const wingCurve = Math.sin(t * Math.PI) * 1.4;
        x = -wingSpread - 0.2;
        y = wingCurve * (1 - t * 0.4) + 0.4;
        z = (r3 - 0.5) * 0.25;
        x += (r4 - 0.5) * 0.5;
        y += (r5 - 0.5) * 0.35;
      } else if (section < 0.8) {
        // Right wing
        const wingSpread = t * 3.0;
        const wingCurve = Math.sin(t * Math.PI) * 1.4;
        x = wingSpread + 0.2;
        y = wingCurve * (1 - t * 0.4) + 0.4;
        z = (r3 - 0.5) * 0.25;
        x += (r4 - 0.5) * 0.5;
        y += (r5 - 0.5) * 0.35;
      } else if (section < 0.9) {
        // Head - sphere at top
        const angle = t * Math.PI * 2;
        const phi = r3 * Math.PI;
        const headR = 0.3 + r4 * 0.15;
        x = Math.cos(angle) * Math.sin(phi) * headR;
        y = Math.sin(angle) * Math.sin(phi) * headR + 1.4;
        z = Math.cos(phi) * headR * 0.5;
      } else {
        // Tail feathers - flowing down
        const tailLength = t * 2.5;
        const tailSpread = Math.sin(t * Math.PI * 4) * 0.6 * t;
        x = tailSpread + (r4 - 0.5) * 0.3;
        y = -tailLength - 0.6;
        z = (r3 - 0.5) * 0.25 + Math.cos(t * Math.PI * 3) * 0.1;
      }

      const scale = 1.6;
      positions[i * 3] = x * scale;
      positions[i * 3 + 1] = y * scale;
      positions[i * 3 + 2] = z * scale;

      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];

      // Color gradient: blue body → cyan wings → coral/orange head
      const normalizedY = (y + 1.5) / 3.5;
      let cr: number, cg: number, cb: number;

      if (section >= 0.8 && section < 0.9) {
        // Head: coral to orange
        cr = 1.0;
        cg = 0.42 + r3 * 0.2;
        cb = 0.26 + r4 * 0.2;
      } else if (section >= 0.3 && section < 0.8) {
        // Wings: cyan gradient
        cr = 0.0;
        cg = 0.7 + normalizedY * 0.3;
        cb = 1.0;
      } else if (section >= 0.9) {
        // Tail: purple to blue
        cr = 0.48;
        cg = 0.18;
        cb = 0.97;
      } else {
        // Body: blue
        cr = 0.1;
        cg = 0.43;
        cb = 1.0;
      }

      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }

    return { positions, colors, originalPositions };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = meshRef.current.geometry;
    const pos = geometry.attributes.position.array as Float32Array;

    const mx = state.pointer.x * viewport.width * 0.5;
    const my = state.pointer.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle breathing/floating
      const breathX = Math.sin(time * 0.7 + i * 0.008) * 0.02;
      const breathY = Math.cos(time * 0.5 + i * 0.012) * 0.025;
      const breathZ = Math.sin(time * 0.9 + i * 0.015) * 0.01;

      let targetX = originalPositions[i3] + breathX;
      let targetY = originalPositions[i3 + 1] + breathY;
      let targetZ = originalPositions[i3 + 2] + breathZ;

      // Mouse magnetic repulsion
      const dx = targetX - mx;
      const dy = targetY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 1.5;

      if (dist < maxDist && dist > 0.01) {
        const force = (1 - dist / maxDist) * 0.3;
        targetX += (dx / dist) * force;
        targetY += (dy / dist) * force;
      }

      // Smooth interpolation
      pos[i3] += (targetX - pos[i3]) * 0.06;
      pos[i3 + 1] += (targetY - pos[i3 + 1]) * 0.06;
      pos[i3 + 2] += (targetZ - pos[i3 + 2]) * 0.06;
    }

    geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.8}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function PhoenixParticlesCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
