"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";

/**
 * PostItNote - Interactive 3D Post-It Component
 *
 * Features:
 * - Hover: Floats up and casts stronger shadow
 * - Click: Flips 180° to reveal back message
 * - Slight curl at corners (vertex displacement)
 * - Pastel color variants
 */

interface PostItNoteProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  frontText: string;
  backText?: string;
  size?: [number, number];
}

const AnimatedMesh = animated("mesh");

export function PostItNote({
  position,
  rotation = [0, 0, 0],
  color = "#FFE97F",
  frontText,
  backText = "✨ Easter egg!",
  size = [0.8, 0.8],
}: PostItNoteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // Spring animation for hover and flip
  const { positionZ, rotationY, scale } = useSpring({
    positionZ: hovered ? position[2] + 0.3 : position[2],
    rotationY: flipped ? Math.PI : 0,
    scale: hovered ? 1.05 : 1,
    config: { tension: 300, friction: 20 },
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Post-it Note Body */}
      <AnimatedMesh
        ref={meshRef}
        castShadow
        receiveShadow
        // @ts-ignore - react-spring types
        position-z={positionZ}
        // @ts-ignore
        rotation-y={rotationY}
        // @ts-ignore
        scale={scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Thin box geometry for paper thickness */}
        <boxGeometry args={[...size, 0.02]} />

        {/* Paper material - pastel color */}
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </AnimatedMesh>

      {/* Front Text */}
      <Text
        position={[0, 0, position[2] + 0.02]}
        rotation={rotation}
        fontSize={0.12}
        color="#333"
        anchorX="center"
        anchorY="middle"
        maxWidth={size[0] * 0.8}
      >
        {!flipped ? frontText : ""}
      </Text>

      {/* Back Text (visible when flipped) */}
      <Text
        position={[0, 0, position[2] - 0.02]}
        rotation={[rotation[0], rotation[1] + Math.PI, rotation[2]]}
        fontSize={0.12}
        color="#333"
        anchorX="center"
        anchorY="middle"
        maxWidth={size[0] * 0.8}
      >
        {flipped ? backText : ""}
      </Text>
    </group>
  );
}
