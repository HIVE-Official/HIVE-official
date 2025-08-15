"use client";

import React from "react";

// Simplified motion proxy that returns regular HTML elements
// This avoids the framer-motion compatibility issues with Next.js 15
export const motion = {
  div: (props: any) => <div {...props} />,
  button: (props: any) => <button {...props} />,
  span: (props: any) => <span {...props} />,
  section: (props: any) => <section {...props} />,
  nav: (props: any) => <nav {...props} />,
  a: (props: any) => <a {...props} />,
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  h4: (props: any) => <h4 {...props} />,
  p: (props: any) => <p {...props} />,
  header: (props: any) => <header {...props} />,
  // Add more elements as needed
};

// Simple AnimatePresence fallback that just renders children
export const AnimatePresence: React.FC<{ 
  children: React.ReactNode;
  mode?: string;
  initial?: boolean;
  exitBeforeEnter?: boolean;
  onExitComplete?: () => void;
}> = ({ children }) => {
  return <>{children}</>;
};

// Export individual motion components for convenience
export const MotionDiv = motion.div;
export const MotionButton = motion.button;

// Mock framer-motion hooks for components that need them
export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
  set: () => {},
  subscribe: () => () => {},
  mount: () => () => {},
});

export const useMotionValue = (initialValue: any) => ({
  get: () => initialValue,
  set: (value: any) => {},
  onChange: (callback: any) => () => {},
});

export const useTransform = (motionValue: any, input?: any, output?: any) => ({
  get: () => motionValue?.get?.() || 0,
  set: (value: any) => {},
  onChange: (callback: any) => () => {},
});
export const MotionSpan = motion.span;
export const MotionSection = motion.section;