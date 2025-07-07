"use client";

import React, { useState, useEffect, createContext, useContext, useMemo, forwardRef, type CSSProperties } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

// Global motion context to share motion state across components
const MotionContext = createContext<{ isLoaded: boolean }>({ 
  isLoaded: false 
});

// Provider component to wrap the app
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load on client side
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }
  }, []);

  const contextValue = useMemo(() => ({ isLoaded }), [isLoaded]);

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
    </MotionContext.Provider>
  );
}

// Hook to use motion context
function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    // Fallback if provider is not used
    return { isLoaded: false };
  }
  return context;
}

// Extract only safe props for fallback
function extractSafeProps(props: Record<string, unknown>) {
  const {
    animate: _animate,
    initial: _initial,
    transition: _transition,
    variants: _variants,
    whileHover: _whileHover,
    whileTap: _whileTap,
    whileInView: _whileInView,
    whileFocus: _whileFocus,
    whileDrag: _whileDrag,
    exit: _exit,
    layout: _layout,
    layoutId: _layoutId,
    layoutDependency: _layoutDependency,
    onUpdate: _onUpdate,
    onAnimationStart: _onAnimationStart,
    onAnimationComplete: _onAnimationComplete,
    onHoverStart: _onHoverStart,
    onHoverEnd: _onHoverEnd,
    onTapStart: _onTapStart,
    onTap: _onTap,
    onTapCancel: _onTapCancel,
    onPan: _onPan,
    onPanStart: _onPanStart,
    onPanEnd: _onPanEnd,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    ...safeProps
  } = props;
  return safeProps;
}

interface MotionWrapperProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  [key: string]: unknown;
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    
    // During SSR or before motion loads, render a regular div
    if (!isLoaded) {
      const safeProps = extractSafeProps(props);
      return <div ref={ref} {...safeProps}>{children}</div>;
    }

    // On client with motion loaded, render motion.div
    return <motion.div ref={ref} {...(props as HTMLMotionProps<"div">)}>{children}</motion.div>;
  }
);

MotionDiv.displayName = "MotionDiv";

interface MotionSpanWrapperProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

interface MotionButtonWrapperProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [key: string]: unknown;
}

export const MotionSpan = forwardRef<HTMLSpanElement, MotionSpanWrapperProps>(
  ({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    
    if (!isLoaded) {
      const safeProps = extractSafeProps(props);
      return <span ref={ref} {...safeProps}>{children}</span>;
    }

    return <motion.span ref={ref} {...(props as HTMLMotionProps<"span">)}>{children}</motion.span>;
  }
);

MotionSpan.displayName = "MotionSpan";

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonWrapperProps>(
  ({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    
    if (!isLoaded) {
      const safeProps = extractSafeProps(props);
      return <button ref={ref} {...safeProps}>{children}</button>;
    }

    return <motion.button ref={ref} {...(props as HTMLMotionProps<"button">)}>{children}</motion.button>;
  }
);

MotionButton.displayName = "MotionButton";