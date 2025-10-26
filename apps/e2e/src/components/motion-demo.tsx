"use client";

import React from "react";
import { AnimatePresence, motion as m, useReducedMotion } from "framer-motion";
import * as UI from "@hive/ui";

export function MotionDemo(): JSX.Element {
  const shouldReduce = useReducedMotion();
  const [open, setOpen] = React.useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <UI.Button className="focus-ring" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide" : "Show"} panel
        </UI.Button>
        <span className="text-caption text-muted-foreground">Framer Motion demo (reduced-motion safe)</span>
      </div>
      <div className="relative h-28">
        <AnimatePresence initial={false} mode="popLayout">
          {open && (
            <m.div
              key="panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: shouldReduce ? 0 : 0.2 }}
              className="absolute inset-0 rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="h-full w-full grid place-items-center text-muted-foreground">
                Panel content animates in/out using Framer Motion.
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <div className="text-caption text-muted-foreground">
        Tip: Toggle OS reduced motion to verify it snaps without animation.
      </div>
    </div>
  );
}

