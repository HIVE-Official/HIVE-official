"use client";
// Bounded Context Owner: Design System Guild
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { routeCrossfade } from "@hive/ui";

export function RouteTransitions({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        variants={routeCrossfade as any}
        initial="hidden"
        animate="show"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

export default RouteTransitions;

