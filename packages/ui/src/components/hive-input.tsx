"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, liquidFlow } from '../motion/hive-motion-system';
import { Eye, EyeOff } from 'lucide-react';

// HIVE Input System - Builder's Toolkit with Liquid Metal Motion
// Matte obsidian glass with floating labels and premium interactions

const hiveInputVariants = cva(
  // Base styles - matte obsidian glass with heavy radius using semantic tokens
  "relative w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-xl border rounded-xl transition-all hive-motion-base focus-within:bg-[var(--hive-background-secondary)]/60",
  {
    variants: {
      variant: {
        // Standard input - matte obsidian glass with semantic tokens
        default: "border-[var(--hive-border-subtle)] focus-within:border-[var(--hive-border-primary)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-primary)]/50",
        
        // Error state - semantic error tokens
        error: "border-[var(--hive-status-error)]/40 focus-within:border-[var(--hive-status-error)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-status-error)]/50",
        
        // Success state - semantic success tokens
        success: "border-[var(--hive-status-success)]/40 focus-within:border-[var(--hive-status-success)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-status-success)]/50",
        
        // Disabled state - semantic disabled tokens
        disabled: "border-[var(--hive-border-disabled)] bg-[var(--hive-background-disabled)] opacity-60 cursor-not-allowed",
        
        // Premium variant - semantic brand tokens
        premium: "border-[var(--hive-brand-primary)]/30 focus-within:border-[var(--hive-brand-primary)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-brand-primary)]/50 focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
        
        // Minimal variant for basic use cases
        minimal: "border-[var(--hive-border-subtle)] focus-within:border-[var(--hive-border-primary)] bg-transparent",
      },
      
      size: {
        sm: "h-9",
        default: "h-11", 
        lg: "h-13",
        xl: "h-16",
      },
      
      radius: {
        sm: "rounded-[var(--hive-radius-lg)]",
        default: "rounded-[var(--hive-radius-xl)]",
        lg: "rounded-[var(--hive-radius-2xl)]", 
        xl: "rounded-[var(--hive-radius-2xl)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default", 
      radius: "default",
    },
  }
);

// Floating label animation - now handled directly in component

// Character count fade animation
const characterCountVariants = {
  hidden: {
    opacity: 0,
    y: 5,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  }
};

// Helper text slide animation
const helperTextVariants = {
  ...liquidFlow,
  visible: {
    ...liquidFlow.visible,
    transition: {
      duration: motionDurations.flowing,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    }
  }
};

export interface HiveInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof hiveInputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  showCharacterCount?: boolean;
  maxLength?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  loading?: boolean;
  floatingLabel?: boolean;
  // For basic Input compatibility
  asChild?: boolean;
}

const HiveInput = React.forwardRef<HTMLInputElement, HiveInputProps>(
  ({ 
    className,
    variant,
    size,
    radius,
    label,
    helperText,
    errorText,
    successText,
    showCharacterCount = false,
    maxLength,
    leftIcon,
    rightIcon,
    onClear,
    loading = false,
    floatingLabel = true,
    type = "text",
    value,
    defaultValue,
    disabled,
    ...props 
  }, ref) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Determine if label should float
    const hasValue = Boolean(internalValue);
    const shouldFloat = isFocused || hasValue;
    
    // Determine current state variant
    const currentVariant = errorText ? 'error' : successText ? 'success' : variant;
    
    // Character count logic
    const currentLength = String(internalValue).length;
    const showCount = showCharacterCount && (isFocused || (maxLength && currentLength > maxLength * 0.8));
    const isOverLimit = maxLength && currentLength > maxLength;
    
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      props.onChange?.(e);
    };
    
    // Handle password toggle
    const togglePassword = () => {
      setShowPassword(!showPassword);
    };
    
    // Determine input type
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
    
    // Status message to show
    const statusMessage = errorText || successText || helperText;
    
    return (
      <div className="w-full">
        {/* Static Label for non-floating */}
        {label && !floatingLabel && (
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            {label}
          </label>
        )}
        
        {/* Main Input Container */}
        <div className="relative">
          <div className={cn(hiveInputVariants({ variant: currentVariant, size, radius, className }))}>
            {/* Left Icon */}
            {leftIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-secondary)] z-10">
                {leftIcon}
              </div>
            )}
            
            {/* Floating Label */}
            {label && floatingLabel && (
              <motion.label
                className={cn(
                  "absolute pointer-events-none origin-left font-medium transition-all duration-300",
                  leftIcon ? "left-10" : "left-3",
                  shouldFloat ? "top-2 text-xs text-[var(--hive-text-primary)]" : "top-1/2 -translate-y-1/2 text-sm text-[var(--hive-text-secondary)]"
                )}
                animate={{
                  scale: shouldFloat ? 0.9 : 1,
                  y: shouldFloat ? 0 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                {label}
              </motion.label>
            )}
            
            {/* Input Element */}
            <input
              ref={inputRef}
              type={inputType}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled || loading}
              maxLength={maxLength}
              className={cn(
                "w-full h-full bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none relative z-20",
                leftIcon ? "pl-10" : "pl-3",
                "pr-12", // Proper space for icons
                floatingLabel ? "pt-6 pb-2" : "py-3",
                size === 'sm' && "text-sm",
                size === 'default' && "text-sm", 
                size === 'lg' && "text-base",
                size === 'xl' && "text-lg"
              )}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              onChange={handleChange}
              {...props}
            />
            
            {/* Right Side Icons */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 z-10">
              {/* Character Count */}
              <AnimatePresence>
                {showCount && (
                  <motion.span
                    className={cn(
                      "text-xs font-medium shrink-0",
                      isOverLimit ? "text-[var(--hive-status-error)]" : "text-[var(--hive-text-secondary)]"
                    )}
                    variants={characterCountVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {currentLength}{maxLength && `/${maxLength}`}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Clear Button */}
              {onClear && hasValue && !loading && (
                <motion.button
                  type="button"
                  className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors shrink-0 w-4 h-4 flex items-center justify-center"
                  onClick={onClear}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              )}
              
              {/* Password Toggle */}
              {type === 'password' && (
                <motion.button
                  type="button"
                  className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors shrink-0"
                  onClick={togglePassword}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              )}
              
              {/* Loading Spinner */}
              {loading && (
                <motion.div
                  className="w-4 h-4 border-2 border-[var(--hive-text-secondary)] border-t-[var(--hive-text-primary)] rounded-full shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
              
              {/* Right Icon */}
              {rightIcon && !loading && (
                <div className="text-[var(--hive-text-secondary)] shrink-0">
                  {rightIcon}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Status Message */}
        <AnimatePresence mode="wait">
          {statusMessage && (
            <motion.div
              className={cn(
                "text-sm px-1 mt-2",
                errorText && "text-[var(--hive-status-error)]",
                successText && "text-[var(--hive-status-success)]",
                !errorText && !successText && "text-[var(--hive-text-secondary)]"
              )}
              variants={helperTextVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HiveInput.displayName = "HiveInput";

// Pre-built Input Variants for common use cases
const HiveToolNameInput = React.forwardRef<HTMLInputElement, Omit<HiveInputProps, 'label' | 'placeholder'>>(
  (props, ref) => (
    <HiveInput
      ref={ref}
      label="Tool Name"
      placeholder="Enter tool name..."
      variant="premium"
      showCharacterCount
      maxLength={50}
      {...props}
    />
  )
);

const HiveSpaceNameInput = React.forwardRef<HTMLInputElement, Omit<HiveInputProps, 'label' | 'placeholder'>>(
  (props, ref) => (
    <HiveInput
      ref={ref}
      label="Space Name" 
      placeholder="Enter space name..."
      showCharacterCount
      maxLength={30}
      {...props}
    />
  )
);

const HiveSearchInput = React.forwardRef<HTMLInputElement, Omit<HiveInputProps, 'label' | 'placeholder' | 'type'>>(
  (props, ref) => (
    <HiveInput
      ref={ref}
      label="Search"
      placeholder="Search tools, spaces, people..."
      type="search"
      floatingLabel={false}
      {...props}
    />
  )
);

const HivePasswordInput = React.forwardRef<HTMLInputElement, Omit<HiveInputProps, 'type'>>(
  (props, ref) => (
    <HiveInput
      ref={ref}
      type="password"
      {...props}
    />
  )
);

HiveToolNameInput.displayName = "HiveToolNameInput";
HiveSpaceNameInput.displayName = "HiveSpaceNameInput"; 
HiveSearchInput.displayName = "HiveSearchInput";
HivePasswordInput.displayName = "HivePasswordInput";

export { 
  HiveInput,
  HiveToolNameInput,
  HiveSpaceNameInput,
  HiveSearchInput,
  HivePasswordInput,
  hiveInputVariants
};

// Simple Input component for basic use cases (backwards compatibility)
const Input = React.forwardRef<HTMLInputElement, Omit<HiveInputProps, 'label' | 'floatingLabel'>>(
  (props, ref) => (
    <HiveInput
      ref={ref}
      variant="minimal"
      floatingLabel={false}
      {...props}
    />
  )
);
Input.displayName = "Input";

// Export as Input for easier migration and consistency
export { Input, HiveInput as InputAdvanced };