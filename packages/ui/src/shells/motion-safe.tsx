"use client";

import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import type * as React from "react";

type MotionComponent<E extends Element, P> = React.ForwardRefExoticComponent<
  MotionProps & P & React.RefAttributes<E>
>;

export const MotionDiv = motion.div as MotionComponent<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
export const MotionSpan = motion.span as MotionComponent<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>;
export const MotionButton = motion.button as MotionComponent<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>;
export const MotionLink = motion.a as MotionComponent<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>;
export const MotionNav = motion.nav as MotionComponent<HTMLElement, React.HTMLAttributes<HTMLElement>>;
export const MotionAside = motion.aside as MotionComponent<HTMLElement, React.HTMLAttributes<HTMLElement>>;

export { AnimatePresence };
