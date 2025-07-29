"use client";

import React from "react";
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils";
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';

// HIVE Switch variants - Luxury toggle with glass morphism and gold states
const hiveSwitchVariants = cva(
  // Base styles - matte obsidian glass with heavy radius
  "relative inline-flex items-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm border",
  {
    variants: {
      variant: {
        // Default glass morphism variant
        default: "focus-visible:ring-[var(--hive-brand-primary)]/50",
        
        // Gold premium variant
        gold: "focus-visible:ring-[var(--hive-brand-primary)]/60",
        
        // Success variant
        success: "focus-visible:ring-[var(--hive-status-success)]/50",
        
        // Minimal variant
        minimal: "focus-visible:ring-[var(--hive-border-primary)]/50",
      },
      
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11", 
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Thumb variants for the moving part
const hiveSwitchThumbVariants = cva(
  // Base thumb styles with proper positioning and shadows
  "pointer-events-none block rounded-full shadow-lg ring-0 transition-all duration-300 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)]",
        gold: "bg-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)]",
        success: "bg-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)]",
        minimal: "bg-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)]",
      },
      
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6", 
        xl: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Animation variants for liquid metal motion
const thumbMotionVariants = {
  unchecked: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      duration: motionDurations.quick,
    }
  },
  checked: (translateDistance: number) => ({
    x: translateDistance,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      duration: motionDurations.quick,
    }
  })
};

export interface HiveSwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof hiveSwitchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  variant?: "default" | "gold" | "success" | "minimal";
  size?: "sm" | "default" | "lg" | "xl";
}

const HiveSwitch = React.forwardRef<HTMLButtonElement, HiveSwitchProps>(
  ({ 
    className,
    variant = "default",
    size = "default",
    checked = false,
    onCheckedChange,
    disabled = false,
    label,
    description,
    id,
    ...props 
  }, ref) => {
    
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };
    
    // Calculate translation distance based on size
    const getTranslateDistance = () => {
      switch (size) {
        case 'sm': return 16; // 9*4 - 4*4 = 5
        case 'default': return 20; // 11*4 - 5*4 = 24px  
        case 'lg': return 24; // 13*4 - 6*4 = 28px
        case 'xl': return 28; // 15*4 - 7*4 = 32px
        default: return 20;
      }
    };
    
    // Background colors based on state and variant
    const getBackgroundClasses = () => {
      if (checked) {
        switch (variant) {
          case 'gold':
            return "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]/40 shadow-[var(--hive-shadow-gold-glow)]";
          case 'success':
            return "bg-[var(--hive-status-success)]/20 border-[var(--hive-status-success)]/40";
          case 'minimal':
            return "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-primary)]";
          default:
            return "bg-[var(--hive-brand-primary)]/15 border-[var(--hive-brand-primary)]/30";
        }
      } else {
        return "bg-[var(--hive-background-secondary)]/40 border-[var(--hive-border-subtle)]";
      }
    };
    
    return (
      <div className="flex items-start space-x-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-describedby={description ? `${id}-description` : undefined}
          disabled={disabled}
          onClick={handleClick}
          id={id}
          ref={ref}
          className={cn(
            hiveSwitchVariants({ variant, size }),
            getBackgroundClasses(),
            className
          )}
          {...props}
        >
          <motion.span
            className={cn(hiveSwitchThumbVariants({ variant, size }))}
            variants={thumbMotionVariants}
            initial="unchecked"
            animate={checked ? "checked" : "unchecked"}
            custom={getTranslateDistance()}
            style={{
              marginLeft: size === 'sm' ? 2 : size === 'default' ? 2 : size === 'lg' ? 2 : 2,
              marginTop: size === 'sm' ? 2 : size === 'default' ? 2 : size === 'lg' ? 2 : 2,
            }}
          />
        </button>
        
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                id={`${id}-label`}
                htmlFor={id}
                className="block text-sm font-medium text-[var(--hive-text-primary)] cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p 
                id={`${id}-description`}
                className="text-sm text-[var(--hive-text-secondary)] mt-1"
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

HiveSwitch.displayName = "HiveSwitch";

// Pre-built Switch variants for common use cases
const HiveGoldSwitch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'variant'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="gold"
      {...props}
    />
  )
);

const HiveSuccessSwitch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'variant'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="success"
      {...props}
    />
  )
);

const HiveMinimalSwitch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'variant'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="minimal"
      {...props}
    />
  )
);

const HiveNotificationSwitch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'label' | 'description'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="default"
      label="Push Notifications"
      description="Receive notifications about new messages and updates"
      {...props}
    />
  )
);

const HivePrivacySwitch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'label' | 'description'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="minimal"
      label="Public Profile"
      description="Make your profile visible to other HIVE users"
      {...props}
    />
  )
);

HiveGoldSwitch.displayName = "HiveGoldSwitch";
HiveSuccessSwitch.displayName = "HiveSuccessSwitch";
HiveMinimalSwitch.displayName = "HiveMinimalSwitch";
HiveNotificationSwitch.displayName = "HiveNotificationSwitch";
HivePrivacySwitch.displayName = "HivePrivacySwitch";

export {
  HiveSwitch,
  HiveGoldSwitch,
  HiveSuccessSwitch,
  HiveMinimalSwitch,
  HiveNotificationSwitch,
  HivePrivacySwitch,
  hiveSwitchVariants,
  hiveSwitchThumbVariants
};

// Simple Switch component for basic use cases (backwards compatibility)
const Switch = React.forwardRef<HTMLButtonElement, Omit<HiveSwitchProps, 'label' | 'description'>>(
  (props, ref) => (
    <HiveSwitch
      ref={ref}
      variant="minimal"
      {...props}
    />
  )
);
Switch.displayName = "Switch";

// Export as Switch for easier migration and consistency
export { Switch, HiveSwitch as SwitchAdvanced };