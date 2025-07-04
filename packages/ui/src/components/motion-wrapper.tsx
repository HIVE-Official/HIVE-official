"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

// Global motion context to share motion state across components
const MotionContext = createContext<{ motion: any; isLoaded: boolean }>({ 
  motion: null, 
  isLoaded: false 
});

// Provider component to wrap the app
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load on client side
    if (typeof window !== 'undefined') {
      import("framer-motion").then((framerMotion) => {
        setMotion(framerMotion.motion);
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <MotionContext.Provider value={{ motion, isLoaded }}>
      {children}
    </MotionContext.Provider>
  );
}

// Hook to use motion context
function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    // Fallback if provider is not used
    return { motion: null, isLoaded: false };
  }
  return context;
}

interface MotionWrapperProps {
  children?: React.ReactNode;
  animate?: any;
  initial?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  [key: string]: any;
}

export function MotionDiv({ children, ...props }: MotionWrapperProps) {
  const { motion, isLoaded } = useMotion();
  
  // During SSR or before motion loads, render a regular div
  if (!isLoaded || !motion) {
    const { animate, initial, transition, variants, whileHover, whileTap, ...divProps } = props;
    return <div {...divProps}>{children}</div>;
  }

  // On client with motion loaded, render motion.div
  return <motion.div {...props}>{children}</motion.div>;
}

export function MotionSpan({ children, ...props }: MotionWrapperProps) {
  const { motion, isLoaded } = useMotion();
  
  if (!isLoaded || !motion) {
    const { animate, initial, transition, variants, whileHover, whileTap, ...spanProps } = props;
    return <span {...spanProps}>{children}</span>;
  }

  return <motion.span {...props}>{children}</motion.span>;
}

export function MotionButton({ children, ...props }: MotionWrapperProps) {
  const { motion, isLoaded } = useMotion();
  
  if (!isLoaded || !motion) {
    const { animate, initial, transition, variants, whileHover, whileTap, ...buttonProps } = props;
    return <button {...buttonProps}>{children}</button>;
  }

  return <motion.button {...props}>{children}</motion.button>;
}