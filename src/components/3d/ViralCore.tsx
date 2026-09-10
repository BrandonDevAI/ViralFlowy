'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ViralCoreProps {
  step?: number; // 0: Input, 1: Typing, 2: Analyzing, 3: Insight/Output
}

export function ViralCore({ step = 0 }: ViralCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle cloud representing neural data nodes
  const particleCount = 200;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color('#a855f7'); // purple
    const color2 = new THREE.Color('#3b82f6'); // blue
    const color3 = new THREE.Color('#06b6d4'); // cyan

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? color1 : (Math.random() > 0.5 ? color2 : color3);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = step === 2 ? 2.8 : step === 3 ? 1.5 : 0.8;

    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
      groupRef.current.rotation.y = t * 0.15 * speedMult;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3 * speedMult;
      coreRef.current.rotation.y = t * 0.4 * speedMult;

      // Pulse scale during analyzing
      const targetScale = step === 2 ? 1.15 + Math.sin(t * 6) * 0.08 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5 * speedMult;
      ring1Ref.current.rotation.z = t * 0.3 * speedMult;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.4 * speedMult;
      ring2Ref.current.rotation.x = -t * 0.2 * speedMult;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = -t * 0.1 * speedMult;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Central AI Engine Geometric Nucleus */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          emissive="#6366f1"
          emissiveIntensity={step === 2 ? 0.9 : 0.4}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Wireframe outer shell */}
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={step === 2 ? 0.6 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Particle cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Core Light Sources */}
      <pointLight color="#a855f7" intensity={step === 2 ? 4.5 : 2.5} distance={6} decay={2} />
      <pointLight color="#38bdf8" intensity={step === 2 ? 3.5 : 2.0} distance={7} position={[0, -1, 1]} />
    </group>
  );
}
