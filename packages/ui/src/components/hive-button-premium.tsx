"use client";

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// HIVE Premium Button System - Matte Black Hardware Feel
// Every button feels like premium matte black equipment

const hivePremiumButtonVariants = cva(
  // Base premium styles - matte black foundation with strong radius
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none relative overflow-hidden transition-all will-change-transform",
  {
    variants: {
      variant: {
        // Primary - Matte obsidian transparency with strong radius
        primary: "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] font-semibold border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-primary)]/90 hover:border-[var(--hive-border-glass)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] active:scale-[0.98]",
        
        // Secondary - Lighter matte transparency
        secondary: "bg-[var(--hive-overlay-glass)] backdrop-blur-sm text-[var(--hive-text-primary)] border border-[var(--hive-border-glass)] hover:bg-[var(--hive-overlay-glass-medium)] hover:border-[var(--hive-border-glass-strong)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] active:scale-[0.98]",
        
        // Ghost - Subtle matte transparency
        ghost: "text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/20 backdrop-blur-sm hover:bg-[var(--hive-background-primary)]/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] active:scale-[0.98]",
        
        // Outline - Matte transparency borders
        outline: "bg-[var(--hive-background-primary)]/40 backdrop-blur-sm border border-[var(--hive-border-glass-strong)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/60 hover:border-[var(--hive-border-primary)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] active:scale-[0.98]",
        
        // Gold glow - premium HIVE accent - NO GOLD FILLS
        "gold-glow": "bg-[var(--hive-background-primary)]/60 backdrop-blur-sm border border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)] font-semibold hover:bg-[var(--hive-background-primary)]/80 focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)] active:scale-[0.98]",
        
        // Success with emerald
        success: "bg-[var(--hive-status-success)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] font-medium border border-[var(--hive-status-success)]/30 hover:bg-[var(--hive-status-success)]/90 hover:border-[var(--hive-status-success)]/50 hover:shadow-[var(--hive-shadow-emeraldGlow)] focus-visible:ring-2 focus-visible:ring-[var(--hive-status-success)] active:scale-[0.98]",
        
        // Danger with ruby
        danger: "bg-[var(--hive-status-error)]/80 backdrop-blur-sm text-[var(--hive-text-primary)] font-medium border border-[var(--hive-status-error)]/30 hover:bg-[var(--hive-status-error)]/90 hover:border-[var(--hive-status-error)]/50 hover:shadow-[var(--hive-shadow-rubyGlow)] focus-visible:ring-2 focus-visible:ring-[var(--hive-status-error)] active:scale-[0.98]",
        
        // Chip gold - elegant outline pill - NO GOLD FILLS
        "chip-gold": "bg-[var(--hive-background-primary)]/60 backdrop-blur-sm border border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-background-primary)]/80 hover:border-[var(--hive-brand-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)] active:scale-[0.98] rounded-full",
        
        "chip-glass": "bg-[var(--hive-overlay-glass)] backdrop-blur-[16px] border border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)] hover:border-[var(--hive-border-glass-strong)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] active:scale-[0.98] rounded-full",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-2xl",
        sm: "h-9 px-4 text-sm rounded-2xl", 
        default: "h-11 px-6 py-2 text-sm rounded-3xl",
        lg: "h-13 px-8 text-base rounded-3xl",
        xl: "h-16 px-10 text-lg rounded-3xl",
        icon: "h-11 w-11 rounded-3xl",
        "icon-sm": "h-9 w-9 rounded-2xl",
        "icon-lg": "h-13 w-13 rounded-3xl",
      },
      radius: {
        soft: "rounded-2xl",
        medium: "rounded-2xl",
        large: "rounded-3xl",
        xl: "rounded-3xl",
        pill: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      radius: "large",
    },
  }
);

// Premium Motion Configuration - Using HIVE Motion Tokens
const magneticMotion = {
  whileHover: {
    y: "var(--hive-transform-moveHover)",
    scale: "var(--hive-transform-scaleHover)",
    transition: {
      type: "spring",
      stiffness: 400, // var(--hive-spring-medium)
      damping: 25,    // var(--hive-spring-balanced)
      mass: 0.6,      // Between light and normal
    }
  },
  whileTap: {
    scale: "var(--hive-transform-scaleTap)",
    y: "var(--hive-transform-movePress)",
    transition: {
      type: "spring", 
      stiffness: 600, // var(--hive-spring-firm)
      damping: 30,    // var(--hive-spring-tight)
    }
  }
};

// Ripple Effect Component
const RippleEffect = ({ x, y, show }: { x: number; y: number; show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: x, top: y }}
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 3, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-3 h-3 -ml-1.5 -mt-1.5 bg-gradient-radial from-[var(--hive-text-primary)]/30 to-transparent rounded-full" />
      </motion.div>
    )}
  </AnimatePresence>
);

export interface HivePremiumButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof hivePremiumButtonVariants> {
  magneticHover?: boolean;
  rippleEffect?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const HivePremiumButton = React.forwardRef<HTMLButtonElement, HivePremiumButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    magneticHover = true,
    rippleEffect = true,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    disabled,
    ...props 
  }, ref) => {
    
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; show: boolean }>>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const rippleId = React.useRef(0);
    
    const isDisabled = disabled || loading;
    
    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (rippleEffect && buttonRef.current && !isDisabled) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newRipple = {
          id: rippleId.current++,
          x,
          y,
          show: true
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 500);
      }
      
      onClick?.(e);
    };
    
    // Motion configuration based on props
    const motionProps = magneticHover ? magneticMotion : {};
    
    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          hivePremiumButtonVariants({ 
            variant, 
            size, 
            radius,
            className 
          })
        )}
        onClick={handleClick}
        disabled={isDisabled}
        {...motionProps}
        {...(props as any)}
      >
        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <RippleEffect 
            key={ripple.id} 
            x={ripple.x} 
            y={ripple.y} 
            show={ripple.show} 
          />
        ))}
        
        {/* Loading Spinner */}
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {/* Left Icon */}
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        
        {/* Content */}
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Right Icon */}
        {rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

HivePremiumButton.displayName = "HivePremiumButton";

// Button Group Component for cascading animations
export interface HivePremiumButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  cascade?: boolean;
  spacing?: "sm" | "md" | "lg";
}

const HivePremiumButtonGroup = React.forwardRef<HTMLDivElement, HivePremiumButtonGroupProps>(
  ({ 
    className,
    cascade = false,
    spacing = "md",
    children,
    ...props 
  }, ref) => {
    
    const spacingClasses = {
      sm: "gap-2",
      md: "gap-3", 
      lg: "gap-4"
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {cascade ? (
          React.Children.map(children, (child, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              {child}
            </motion.div>
          ))
        ) : (
          children
        )}
      </div>
    );
  }
);

HivePremiumButtonGroup.displayName = "HivePremiumButtonGroup";

export { 
  HivePremiumButton, 
  HivePremiumButtonGroup,
  hivePremiumButtonVariants 
};