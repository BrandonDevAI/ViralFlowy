'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { ViralCore } from './ViralCore';

interface HeroSceneProps {
  step?: number;
  className?: string;
}

export default function HeroScene({ step = 0, className = '' }: HeroSceneProps) {
  return (
    <div className={`relative w-full h-full min-h-[320px] pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -4, -3]} intensity={0.5} color="#818cf8" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <ViralCore step={step} />
          </Float>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
