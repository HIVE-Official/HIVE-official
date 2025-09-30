"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * FloatingText - Hero Message in 3D
 *
 * Features:
 * - Large, bold 3D text
 * - Gold emissive glow (catches bloom post-processing)
 * - Gentle bob animation (sine wave on Y-axis)
 * - Positioned in front of cork board
 */

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
}

export function FloatingText({
  text,
  position = [0, 2, 1],
  fontSize = 0.5,
}: FloatingTextProps) {
  const textRef = useRef<THREE.Mesh>(null);

  // Gentle bob animation
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      anchorX="center"
      anchorY="middle"
      letterSpacing={-0.02}
      lineHeight={1.2}
      maxWidth={6}
    >
      {text}
      <meshStandardMaterial
        color="#F5C842" // Gold
        emissive="#F5C842"
        emissiveIntensity={0.5} // Glow effect
        roughness={0.3}
        metalness={0.2}
      />
    </Text>
  );
}
