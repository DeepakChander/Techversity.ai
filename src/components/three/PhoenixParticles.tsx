"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Seeded pseudo-random for deterministic results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 3000;

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

      if (section < 0.35) {
        const angle = t * Math.PI * 2;
        const bodyWidth = 0.8 + r3 * 0.3;
        const bodyHeight = 1.5 + r4 * 0.5;
        x = Math.cos(angle) * bodyWidth * (0.3 + r5 * 0.7);
        y = Math.sin(angle) * bodyHeight * 0.5 - 0.2;
        z = (r3 - 0.5) * 0.3;
      } else if (section < 0.6) {
        const wingSpread = t * 2.5;
        const wingCurve = Math.sin(t * Math.PI) * 1.2;
        x = -wingSpread - 0.3;
        y = wingCurve * (1 - t * 0.3) + 0.3;
        z = (r3 - 0.5) * 0.2;
        x += (r4 - 0.5) * 0.4;
        y += (r5 - 0.5) * 0.3;
      } else if (section < 0.85) {
        const wingSpread = t * 2.5;
        const wingCurve = Math.sin(t * Math.PI) * 1.2;
        x = wingSpread + 0.3;
        y = wingCurve * (1 - t * 0.3) + 0.3;
        z = (r3 - 0.5) * 0.2;
        x += (r4 - 0.5) * 0.4;
        y += (r5 - 0.5) * 0.3;
      } else if (section < 0.92) {
        const angle = t * Math.PI * 2;
        const headR = 0.25 + r3 * 0.15;
        x = Math.cos(angle) * headR;
        y = Math.sin(angle) * headR + 1.2;
        z = (r4 - 0.5) * 0.15;
      } else {
        const tailLength = t * 2;
        const tailSpread = Math.sin(t * Math.PI * 3) * 0.5 * t;
        x = tailSpread;
        y = -tailLength - 0.8;
        z = (r3 - 0.5) * 0.2;
      }

      // Fixed scale - don't depend on viewport to avoid re-creating on resize
      const scale = 1.8;
      positions[i * 3] = x * scale;
      positions[i * 3 + 1] = y * scale;
      positions[i * 3 + 2] = z * scale;

      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];

      // Color gradient: blue → cyan → coral based on y position
      const colorT = (y + 1.5) / 3;
      const r = THREE.MathUtils.lerp(0.1, 1.0, colorT > 0.6 ? (colorT - 0.6) * 2.5 : 0);
      const g = THREE.MathUtils.lerp(0.43, 0.9, colorT > 0.3 && colorT < 0.7 ? 1 : 0.3);
      const b = THREE.MathUtils.lerp(1.0, 0.42, colorT);

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
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

      const breathX = Math.sin(time * 0.8 + i * 0.01) * 0.015;
      const breathY = Math.cos(time * 0.6 + i * 0.015) * 0.02;
      const breathZ = Math.sin(time * 1.0 + i * 0.02) * 0.008;

      let targetX = originalPositions[i3] + breathX;
      let targetY = originalPositions[i3 + 1] + breathY;
      let targetZ = originalPositions[i3 + 2] + breathZ;

      // Mouse repulsion
      const dx = targetX - mx;
      const dy = targetY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 1.2;

      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 0.25;
        targetX += (dx / dist) * force;
        targetY += (dy / dist) * force;
      }

      pos[i3] += (targetX - pos[i3]) * 0.08;
      pos[i3 + 1] += (targetY - pos[i3 + 1]) * 0.08;
      pos[i3 + 2] += (targetZ - pos[i3 + 2]) * 0.08;
    }

    geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function PhoenixParticlesCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
