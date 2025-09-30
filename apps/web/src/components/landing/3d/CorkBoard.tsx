"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CorkBoard - 3D Cork Bulletin Board
 *
 * Features:
 * - Realistic cork texture with roughness
 * - Mouse parallax effect (board rotates based on cursor position)
 * - Receives shadows from post-its and pins
 * - 16:9 aspect ratio
 */

export function CorkBoard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useFrame(() => {
    if (meshRef.current) {
      // Smoothly rotate board based on mouse position (max ±3 degrees)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mousePosition.x * 0.05,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mousePosition.y * 0.05,
        0.1
      );
    }
  });

  // Track mouse position for parallax
  const handlePointerMove = (event: THREE.Event) => {
    setMousePosition({
      x: (event.point.x / viewport.width) * 2 - 1,
      y: -(event.point.y / viewport.height) * 2 + 1,
    });
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      receiveShadow
      onPointerMove={handlePointerMove}
    >
      {/* 16:9 plane geometry */}
      <planeGeometry args={[8, 4.5]} />

      {/* Cork material */}
      <meshStandardMaterial
        color="#B8956A" // Cork brown
        roughness={0.8} // Matte cork texture
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
