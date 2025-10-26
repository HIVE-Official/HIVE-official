// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion as useUiReducedMotion } from "@hive/ui";

type AuroraLayerProps = {
  readonly disabled?: boolean;
};

export function AuroraLayer({ disabled }: AuroraLayerProps) {
  const reduced = useUiReducedMotion();
  const animate = !(disabled || reduced);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  if (!animate) {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_12%_8%,hsl(var(--primary)/0.16)_0,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(680px_320px_at_88%_18%,hsl(var(--accent)/0.12)_0,transparent_70%)]" />
      </div>
    );
  }

  return (
    <motion.div style={{ y, scale }} className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_12%_8%,hsl(var(--primary)/0.16)_0,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(680px_320px_at_88%_18%,hsl(var(--accent)/0.12)_0,transparent_70%)]" />
    </motion.div>
  );
}
