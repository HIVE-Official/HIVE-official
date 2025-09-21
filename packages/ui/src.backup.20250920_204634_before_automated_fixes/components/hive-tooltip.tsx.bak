"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils";
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';

// HIVE Tooltip variants - Luxury glass morphism with semantic tokens
const hiveTooltipVariants = cva(
  // Base styles - matte obsidian glass with heavy radius and backdrop blur
  "z-50 overflow-hidden text-sm shadow-lg backdrop-blur-xl border transition-all",
  {
    variants: {
      variant: {
        // Default glass morphism variant
        default: "bg-[var(--hive-background-secondary)]/80 text-[var(--hive-text-primary)] border-[var(--hive-border-glass)] rounded-[var(--hive-radius-lg)]",
        
        // Glass strong variant with enhanced opacity
        glass: "bg-[var(--hive-overlay-glass-strong)] text-[var(--hive-text-primary)] border-[var(--hive-border-glass-strong)] rounded-[var(--hive-radius-lg)]",
        
        // Gold accent variant
        gold: "bg-[var(--hive-background-secondary)]/80 text-[var(--hive-brand-primary)] border-[var(--hive-border-gold)] rounded-[var(--hive-radius-lg)] shadow-[var(--hive-shadow-gold-glow)]",
        
        // Success state
        success: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border-[var(--hive-status-success)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
        
        // Warning state
        warning: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
        
        // Error state
        error: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border-[var(--hive-status-error)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
        
        // Info state
        info: "bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border-[var(--hive-status-info)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
        
        // Minimal variant
        minimal: "bg-[var(--hive-background-primary)]/90 text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] rounded-[var(--hive-radius-md)] backdrop-blur-sm",
        
        // Solid variant for high contrast needs
        solid: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-primary)] rounded-[var(--hive-radius-lg)]",
      },
      
      size: {
        sm: "px-2 py-1 text-xs max-w-48",
        default: "px-3 py-1.5 text-sm max-w-64",
        lg: "px-4 py-2 text-base max-w-80",
        xl: "px-5 py-3 text-lg max-w-96",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Animation variants for smooth entrance/exit
const tooltipAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 2,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

const HiveTooltipProvider = TooltipPrimitive.Provider;

const HiveTooltip = TooltipPrimitive.Root;

const HiveTooltipTrigger = TooltipPrimitive.Trigger;

interface HiveTooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof hiveTooltipVariants> {
  variant?: "default" | "glass" | "gold" | "success" | "warning" | "error" | "info" | "minimal" | "solid";
  size?: "sm" | "default" | "lg" | "xl";
  withArrow?: boolean;
  animated?: boolean;
}

const HiveTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  HiveTooltipContentProps
>(({ 
  className, 
  sideOffset = 4, 
  variant, 
  size,
  withArrow = true,
  animated = true,
  children,
  ...props 
}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      hiveTooltipVariants({ variant, size }),
      animated && "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
    {withArrow && (
      <TooltipPrimitive.Arrow 
        className={cn(
          "fill-current",
          variant === 'gold' && "text-[var(--hive-background-secondary)]",
          variant === 'success' && "text-[var(--hive-status-success)]",
          variant === 'warning' && "text-[var(--hive-status-warning)]", 
          variant === 'error' && "text-[var(--hive-status-error)]",
          variant === 'info' && "text-[var(--hive-status-info)]",
          !variant && "text-[var(--hive-background-secondary)]"
        )}
      />
    )}
  </TooltipPrimitive.Content>
));
HiveTooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Enhanced Motion Tooltip with Framer Motion
interface HiveMotionTooltipProps extends Omit<HiveTooltipContentProps, 'content'> {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
}

const HiveMotionTooltip = React.forwardRef<
  HTMLElement,
  HiveMotionTooltipProps
>(({ 
  children, 
  content, 
  variant = "default",
  size = "default",
  side = "top",
  delayDuration = 200,
  withArrow = true,
  ...props 
}, ref) => (
  <HiveTooltipProvider delayDuration={delayDuration}>
    <HiveTooltip>
      <HiveTooltipTrigger asChild>
        {children}
      </HiveTooltipTrigger>
      <HiveTooltipContent
        side={side}
        variant={variant}
        size={size}
        withArrow={withArrow}
        {...props}
      >
        {content}
      </HiveTooltipContent>
    </HiveTooltip>
  </HiveTooltipProvider>
));
HiveMotionTooltip.displayName = "HiveMotionTooltip";

// Pre-built Tooltip variants for common use cases
const HiveHelpTooltip = React.forwardRef<
  HTMLElement,
  Omit<HiveMotionTooltipProps, 'variant' | 'size'>
>(({ ...props }, ref) => (
  <HiveMotionTooltip
    ref={ref}
    variant="glass"
    size="default"
    {...props}
  />
));

const HiveErrorTooltip = React.forwardRef<
  HTMLElement,
  Omit<HiveMotionTooltipProps, 'variant'>
>(({ ...props }, ref) => (
  <HiveMotionTooltip
    ref={ref}
    variant="error"
    {...props}
  />
));

const HiveSuccessTooltip = React.forwardRef<
  HTMLElement,
  Omit<HiveMotionTooltipProps, 'variant'>
>(({ ...props }, ref) => (
  <HiveMotionTooltip
    ref={ref}
    variant="success"
    {...props}
  />
));

const HiveGoldTooltip = React.forwardRef<
  HTMLElement,
  Omit<HiveMotionTooltipProps, 'variant'>
>(({ ...props }, ref) => (
  <HiveMotionTooltip
    ref={ref}
    variant="gold"
    {...props}
  />
));

const HiveMinimalTooltip = React.forwardRef<
  HTMLElement,
  Omit<HiveMotionTooltipProps, 'variant' | 'withArrow'>
>(({ ...props }, ref) => (
  <HiveMotionTooltip
    ref={ref}
    variant="minimal"
    withArrow={false}
    {...props}
  />
));

HiveHelpTooltip.displayName = "HiveHelpTooltip";
HiveErrorTooltip.displayName = "HiveErrorTooltip";
HiveSuccessTooltip.displayName = "HiveSuccessTooltip";
HiveGoldTooltip.displayName = "HiveGoldTooltip";
HiveMinimalTooltip.displayName = "HiveMinimalTooltip";

export {
  HiveTooltip,
  HiveTooltipTrigger,
  HiveTooltipContent,
  HiveTooltipProvider,
  HiveMotionTooltip,
  HiveHelpTooltip,
  HiveErrorTooltip,
  HiveSuccessTooltip,
  HiveGoldTooltip,
  HiveMinimalTooltip,
  hiveTooltipVariants
};

// Export for backward compatibility
export {
  HiveTooltip as Tooltip,
  HiveTooltipTrigger as TooltipTrigger,
  HiveTooltipContent as TooltipContent,
  HiveTooltipProvider as TooltipProvider
};