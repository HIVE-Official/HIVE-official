"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// HIVE Logo Pattern & Texture System;
// Creates backgrounds, borders, and decorative elements using the HIVE hexagon;
const patternVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        tessellation: "bg-[var(--hive-background-primary)]",
        watermark: "bg-transparent",
        border: "border-current",
        glow: "bg-[var(--hive-background-primary)]",
        gradient: "bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-tertiary)]",
      },
      density: {
        sparse: "opacity-20",
        normal: "opacity-40",
        dense: "opacity-60",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      }
    },
    defaultVariants: {
      variant: "tessellation",
      density: "normal",
      size: "md",
    },
  }
);

export interface HivePatternProps;
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof patternVariants> {
  animated?: boolean;
  children?: React.ReactNode;
}

// Base simplified hexagon for patterns;
const HexagonPattern = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <polygon;
      points="50,10 85,30 85,70 50,90 15,70 15,30"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      fillOpacity="0.1"
    />
  </svg>
);

// 1. TESSELLATION BACKGROUND;
export const HiveTessellation = ({ 
  variant = "tessellation", 
  density = "normal", 
  size = "md",
  animated = false,
  className, 
  children,
  ...props;
}: HivePatternProps) => {
  const hexSize = size === "xs" ? 20 : size === "sm" ? 30 : size === "md" ? 40 : size === "lg" ? 50 : 60;
  const rows = 20;
  const cols = 20;

  return (
    <div;
      className={cn(patternVariants({variant, density, size, className)})} 
      {...props}
    >
      {/* Hexagon grid */}
      <div className="absolute inset-0 text-[var(--hive-text-primary)]/10">
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => (
            <motion.div;
              key={`${row}-${col}`}
              className="absolute"
              style={{
                left: `${col * (hexSize * 0.75)}px`,
                top: `${row * (hexSize * 0.87) + (col % 2) * (hexSize * 0.43)}px`,
          }}
              initial={animated ? { opacity: 0, scale: 0 } : {}}
              animate={animated ? { opacity: 1, scale: 1 } : {}}
              transition={animated ? { 
                delay: (row + col) * 0.01,
                duration: 0.3 
              } : {}}
            >
              <HexagonPattern size={hexSize} />
            </motion.div>
          ))
        )}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// 2. WATERMARK PATTERN;
export const HiveWatermark = ({ 
  density = "sparse",
  size = "xl",
  className,
  children,
  ...props;
}: HivePatternProps) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {/* Large watermark logos */}
      <div className={cn("absolute inset-0 pointer-events-none text-[var(--hive-text-primary)]/5", patternVariants({density)})}>
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div;
            key={i}
            className="absolute"
            style={{
              left: `${(i % 3) * 33}%`,
              top: `${Math.floor(i / 3) * 50}%`,
              transform: "translate(-50%, -50%)",
          }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1]
          }}
            transition={{ 
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
          }}
          >
            <svg viewBox="0 0 1500 1500" className="w-32 h-32">
              <path;
                d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {children}
    </div>
  )
};

// 3. BORDER DECORATION;
export const HiveBorder = ({ 
  side = "all",
  size = "md",
  className,
  children,
  ...props;
}: HivePatternProps & { side?: "top" | "bottom" | "left" | "right" | "all" }) => {
  const hexSize = size === "sm" ? 16 : size === "md" ? 20 : 24;
  
  const BorderSide = ({ position }: { position: string }) => (
    <div className={cn("absolute flex text-[var(--hive-color-gold)]", position)}>
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div;
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <HexagonPattern size={hexSize} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={cn("relative", className)} {...props}>
      {(side === "all" || side === "top") && (
        <BorderSide position="top-0 left-1/2 transform -translate-x-1/2" />
      )}
      {(side === "all" || side === "bottom") && (
        <BorderSide position="bottom-0 left-1/2 transform -translate-x-1/2" />
      )}
      {(side === "all" || side === "left") && (
        <BorderSide position="left-0 top-1/2 transform -translate-y-1/2 flex-col" />
      )}
      {(side === "all" || side === "right") && (
        <BorderSide position="right-0 top-1/2 transform -translate-y-1/2 flex-col" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// 4. GLOW EFFECT BACKGROUND;
export const HiveGlow = ({ 
  intensity = "normal",
  color = "var(--hive-color-gold)",
  className,
  children,
  ...props;
}: HivePatternProps & { intensity?: "low" | "normal" | "high"; color?: string }) => {
  const glowStrength = intensity === "low" ? 10 : intensity === "normal" ? 20 : 40;
  
  return (
    <div className={cn("relative bg-[var(--hive-background-primary)]", className)} {...props}>
      {/* Glow hexagons */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div;
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: "translate(-50%, -50%)",
            filter: `blur(${glowStrength}px)`,
            color: color,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <svg viewBox="0 0 1500 1500" className="w-20 h-20">
            <path;
              d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// 5. FLOATING HEXAGONS;
export const HiveFloating = ({ 
  count = 15,
  className,
  children,
  ...props;
}: HivePatternProps & { count?: number }) => {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Floating hexagons */}
      {Array.from({ length: count }, (_, i) => (
        <motion.div;
          key={i}
          className="absolute text-[var(--hive-text-primary)]/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          <HexagonPattern size={16 + Math.random() * 24} />
        </motion.div>
      ))}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// 6. CORNER DECORATIONS;
export const HiveCorners = ({ 
  size = "md",
  className,
  children,
  ...props;
}: HivePatternProps) => {
  const cornerSize = size === "sm" ? 24 : size === "md" ? 32 : 40;
  
  const Corner = ({ position, rotation }: { position: string; rotation: number }) => (
    <motion.div;
      className={cn("absolute text-[var(--hive-color-gold)]", position)}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <HexagonPattern size={cornerSize} />
    </motion.div>
  );

  return (
    <div className={cn("relative", className)} {...props}>
      <Corner position="top-2 left-2" rotation={0} />
      <Corner position="top-2 right-2" rotation={90} />
      <Corner position="bottom-2 left-2" rotation={270} />
      <Corner position="bottom-2 right-2" rotation={180} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// 7. LOADING PATTERN;
export const HiveLoadingPattern = ({ 
  className,
  children,
  ...props;
}: HivePatternProps) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {/* Hexagon wave pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-2">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div;
              key={i}
              className="text-[var(--hive-color-gold)]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
          }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
          }}
            >
              <HexagonPattern size={20} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
};

// Export all pattern components;
export {
  HiveTessellation as TessellationPattern,
  HiveWatermark as WatermarkPattern,
  HiveBorder as BorderPattern,
  HiveGlow as GlowPattern,
  HiveFloating as FloatingPattern,
  HiveCorners as CornersPattern,
  HiveLoadingPattern as LoadingPattern,
};