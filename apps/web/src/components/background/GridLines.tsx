// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion as useUiReducedMotion } from "@hive/ui";

type GridLinesProps = {
  readonly disabled?: boolean;
};

export function GridLines({ disabled }: GridLinesProps): JSX.Element {
  const reduced = useUiReducedMotion();
  const isDisabled = disabled || reduced;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.015]);

  const content = (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );

  if (isDisabled) {
    return <div className="absolute inset-0 text-foreground/10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">{content}</div>;
  }

  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0 text-foreground/10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
      {content}
    </motion.div>
  );
}
