"use client";
// Bounded Context Owner: Design System Guild
// Central MotionConfig wrapper to align Framer Motion with Hive motion tokens

import * as React from "react";
import { MotionConfig, type Transition } from "framer-motion";
import { DUR, EASE } from "./tokens";
import { useReducedMotion } from "./use-reduced-motion";

export type HiveMotionConfigProps = {
  children: React.ReactNode;
  /** Override default transition; falls back to tokenized standard */
  transition?: Partial<Transition>;
  /** Force reduced motion. Default respects OS preference. */
  reducedMotion?: "always" | "never" | "user" | undefined;
};

/**
 * HiveMotionConfig — Framer Motion provider aligned with Hive motion tokens.
 * - Sets default transition duration/ease using tokens.
 * - Respects OS reduced-motion by default.
 */
export function HiveMotionConfig({ children, transition, reducedMotion = "user" }: HiveMotionConfigProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const resolvedReduced =
    reducedMotion === "user" ? (prefersReduced ? "always" : "never") : reducedMotion ?? (prefersReduced ? "always" : "never");
  const base = {
    duration: DUR.md / 1000,
    ease: EASE.standard,
    ...transition
  };

  return (
    <MotionConfig
      reducedMotion={resolvedReduced}
      transition={base as Transition}
    >
      {children}
    </MotionConfig>
  );
}

export default HiveMotionConfig;
