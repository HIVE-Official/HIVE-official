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
export const MotionSpan = motion.span;
export const MotionSection = motion.section;