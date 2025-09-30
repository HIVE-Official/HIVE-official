"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";

/**
 * PushPin - 3D Push Pin Component
 *
 * Features:
 * - Metallic material with color variants
 * - Click animation: Presses down into cork board
 * - Composed of cylinder (pin) + cone (head)
 * - Casts realistic shadows
 */

interface PushPinProps {
  position: [number, number, number];
  color?: string;
}

const AnimatedGroup = animated("group");

export function PushPin({
  position,
  color = "#FF6B6B", // Red default
}: PushPinProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [pressed, setPressed] = useState(false);

  // Spring animation for press down effect
  const { positionZ } = useSpring({
    positionZ: pressed ? position[2] - 0.1 : position[2],
    config: { tension: 500, friction: 30 },
    onRest: () => {
      if (pressed) {
        setTimeout(() => setPressed(false), 200);
      }
    },
  });

  return (
    // @ts-ignore - react-spring types
    <AnimatedGroup ref={groupRef} position-z={positionZ} position={[position[0], position[1], 0]}>
      {/* Pin Head (Cone) */}
      <mesh position={[0, 0, 0.08]} castShadow onClick={() => setPressed(true)}>
        <coneGeometry args={[0.08, 0.06, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Pin Needle (Cylinder) */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </AnimatedGroup>
  );
}
