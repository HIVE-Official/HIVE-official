// Bounded Context Owner: Design System Guild
"use client";

import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DUR, EASE } from "@hive/ui";
import { usePathname } from "next/navigation";
import { useMotionEnabled } from "./useMotionEnabled";

interface PageTransitionProps extends PropsWithChildren {
  readonly surface?: "entry" | "app";
}

export function PageTransition({
  children,
  surface = "entry"
}: PageTransitionProps): JSX.Element {
  const pathname = usePathname();
  const motionEnabled = useMotionEnabled();

  if (!motionEnabled) {
    return <>{children}</>;
  }

  const offset = surface === "entry" ? 18 : 10;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -offset }}
        transition={{ duration: DUR.lg / 1000, ease: EASE.standard as any }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
