"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";

/**
 * Scene - Main 3D Canvas wrapper component
 *
 * This component sets up the Three.js scene with:
 * - Camera configuration (FOV 45, position [0,0,5])
 * - Professional lighting setup (ambient + directional + point)
 * - Post-processing effects (bloom, depth of field, vignette)
 * - Orbit controls for subtle camera movement
 */

interface SceneProps {
  children: React.ReactNode;
}

function SceneContent({ children }: SceneProps) {
  return (
    <>
      {/* Camera Setup - FOV 45 for realistic perspective */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

      {/* Orbit Controls - Limited movement for guided experience */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={3}
        maxDistance={7}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        target={[0, 0, 0]}
      />

      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[0, 2, 3]}
        intensity={0.5}
        color="#F5C842" // Gold tint
      />

      {/* Scene Content (Cork Board, Post-its, etc.) */}
      {children}

      {/* Post-Processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
        <DepthOfField
          focusDistance={0.5}
          focalLength={0.02}
          bokehScale={2}
        />
        <Vignette
          darkness={0.5}
          offset={0.3}
        />
      </EffectComposer>
    </>
  );
}

export function Scene({ children }: SceneProps) {
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        dpr={[1, 2]} // Adaptive pixel ratio for performance
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneContent>{children}</SceneContent>
        </Suspense>
      </Canvas>
    </div>
  );
}
