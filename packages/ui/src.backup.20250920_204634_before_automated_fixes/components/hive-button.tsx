"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { motion } from './framer-motion-proxy';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';
import { getMotionProps } from '../lib/motion-utils';
import { HiveMagneticHover } from './hive-magnetic-interactions';
import { 
  magneticInteractions, 
  liquidMetalPerformance,
  liquidMetalUtils;
} from '../motion/hive-liquid-metal';

// HIVE Button variants - Luxury design system aligned;
const hiveButtonVariants = cva(
  // Base styles - premium appearance with semantic tokens and liquid motion;
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:pointer-events-none disabled:opacity-50 select-none backdrop-blur-sm",
  {
    variants: {
      variant: {
        // Default - Same as primary for backward compatibility;
        default: "bg-[var(--hive-background-primary)] text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10 hover:shadow-lg hover:shadow-[var(--hive-brand-primary)]/20 active:scale-[0.98]",
        
        // Primary - Gold outline on black (HIVE signature)
        primary: "bg-[var(--hive-background-primary)] text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10 hover:shadow-lg hover:shadow-[var(--hive-brand-primary)]/20 active:scale-[0.98]",
        
        // Secondary - Glass morphism with semantic tokens;
        secondary: "bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-tertiary)]/90 hover:border-[var(--hive-border-secondary)]",
        
        // Premium - Gold signature with proper semantics;
        premium: "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10 hover:shadow-lg hover:shadow-[var(--hive-brand-primary)]/20",
        
        // Outlined variants using semantic border tokens;
        outline: "bg-[var(--hive-background-primary)]/40 backdrop-blur-sm border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]/60 hover:border-[var(--hive-border-secondary)]",
        
        "outline-subtle": "bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]/40 hover:border-[var(--hive-border-primary)]",
        
        // Ghost variants with semantic backgrounds;
        ghost: "text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/20 backdrop-blur-sm hover:bg-[var(--hive-interactive-hover)]",
        
        "ghost-gold": "text-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)]/20 backdrop-blur-sm hover:bg-[var(--hive-brand-primary)]/10",
        
        // Chip variants;
        chip: "bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]/90 rounded-full",
        
        "chip-platinum": "bg-[var(--hive-text-primary)]/90 backdrop-blur-sm text-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] hover:bg-[var(--hive-text-primary)] rounded-full",
        
        "chip-gold": "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10 rounded-full",
        
        "chip-glass": "bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]/60 rounded-full",
        
        // Link variant;
        link: "text-[var(--hive-brand-primary)] underline-offset-4 hover:underline hover:text-[var(--hive-brand-primary)]/80 bg-transparent border-0",
        
        // Special variants;
        glow: "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10 hover:shadow-xl hover:shadow-[var(--hive-brand-primary)]/20 shadow-[var(--hive-brand-primary)]/10",
        
        minimal: "text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/10 backdrop-blur-sm hover:bg-[var(--hive-interactive-hover)] border-0",
        
        // Status variants using semantic status tokens;
        success: "bg-[var(--hive-status-success)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] border border-[var(--hive-status-success)]/30 hover:bg-[var(--hive-status-success)]/90 hover:shadow-lg hover:shadow-[var(--hive-status-success)]/20",
        
        destructive: "bg-[var(--hive-status-error)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] border border-[var(--hive-status-error)]/30 hover:bg-[var(--hive-status-error)]/90 hover:shadow-lg hover:shadow-[var(--hive-status-error)]/20",
        
        warning: "bg-[var(--hive-status-warning)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] border border-[var(--hive-status-warning)]/30 hover:bg-[var(--hive-status-warning)]/90 hover:shadow-lg hover:shadow-[var(--hive-status-warning)]/20",
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-[var(--hive-radius-lg)]",
        sm: "h-8 px-3 text-sm rounded-[var(--hive-radius-xl)]", 
        md: "h-9 px-4 text-sm rounded-[var(--hive-radius-xl)]",
        default: "h-9 px-4 text-sm rounded-[var(--hive-radius-xl)]",
        lg: "h-10 px-6 text-base rounded-[var(--hive-radius-xl)]",
        xl: "h-12 px-8 text-lg rounded-[var(--hive-radius-2xl)]",
        icon: "h-9 w-9 rounded-[var(--hive-radius-xl)]",
        "icon-sm": "h-8 w-8 rounded-[var(--hive-radius-lg)]",
        "icon-lg": "h-10 w-10 rounded-[var(--hive-radius-xl)]",
        // Chip-specific sizes with pill shape;
        "chip-xs": "h-6 px-3 text-xs rounded-[var(--hive-radius-full)]",
        "chip-sm": "h-7 px-4 text-sm rounded-[var(--hive-radius-full)]",
        "chip": "h-8 px-5 text-sm rounded-[var(--hive-radius-full)]",
        "chip-lg": "h-9 px-6 text-base rounded-[var(--hive-radius-full)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface HiveButtonProps;
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hiveButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  magneticHover?: boolean;
  magneticIntensity?: 'subtle' | 'medium' | 'strong';
  rippleEffect?: boolean;
}

const HiveButton = React.forwardRef<HTMLButtonElement, HiveButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false,
    loading = false, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled,
    magneticHover = true,
    magneticIntensity = 'medium',
    rippleEffect = false,
    ...props;
  }, ref) => {
    const isDisabled = disabled || loading;
    
    // Create enhanced spring transition based on variant;
    const springTransition = liquidMetalUtils.createSpringTransition(
      variant === 'premium' || variant === 'glow' ? 'light' : 'standard',
      'balanced',
      'balanced'
    );
    
    // Use Slot for asChild pattern (Radix compatibility)
    const Comp = asChild ? Slot : motion.button;
    
    const ButtonComponent = (
      <Comp;
        className={cn(hiveButtonVariants({variant, size, className)})}
        ref={ref}
        disabled={isDisabled}
        variants={magneticInteractions.hover}
        initial="rest"
        whileHover={isDisabled ? "rest" : "magnetic"}
        whileTap={isDisabled ? "rest" : "pressed"}
        style={liquidMetalPerformance.gpuLayer}
        {...getMotionProps(props)}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </Comp>
    );
    
    // Enhanced magnetic hover wrapper for premium interactions;
    if (magneticHover && !isDisabled && (variant === 'premium' || variant === 'glow')) {
      return (
        <HiveMagneticHover;
          intensity={magneticIntensity}
          disabled={isDisabled}
        >
          {ButtonComponent}
        </HiveMagneticHover>
      )
    }
    
    return ButtonComponent;
  }
);

HiveButton.displayName = "HiveButton";

export { HiveButton, hiveButtonVariants };

// Export as Button for easier migration and consistency;
export { HiveButton as Button, hiveButtonVariants as buttonVariants };