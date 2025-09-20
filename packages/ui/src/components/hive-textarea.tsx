"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, liquidFlow } from '../motion/hive-motion-system';

// HIVE Textarea System - Builder's Toolkit with Liquid Metal Motion
// Matte obsidian glass with floating labels and premium interactions

const hiveTextareaVariants = cva(
  // Base styles - matte obsidian glass with heavy radius using semantic tokens
  "relative w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-xl border rounded-xl transition-all hive-motion-base focus-within:bg-[var(--hive-background-secondary)]/60",
  {
    variants: {
      variant: {
        // Standard textarea - matte obsidian glass with semantic tokens
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
        sm: "min-h-20",
        default: "min-h-[30]", 
        lg: "min-h-[160px]",
        xl: "min-h-50",
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

export interface HiveTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof hiveTextareaVariants> {
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
  resize?: boolean;
  // For basic Textarea compatibility
  asChild?: boolean
}

const HiveTextarea = React.forwardRef<HTMLTextAreaElement, HiveTextareaProps>(
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
    resize = true,
    value,
    defaultValue,
    disabled,
    ...props 
  }, ref) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Determine if label should float
    const hasValue = Boolean(internalValue);
    const shouldFloat = isFocused || hasValue;
    
    // Determine current state variant
    const currentVariant = errorText ? 'error' : successText ? 'success' : variant;
    
    // Character count logic
    const currentLength = String(internalValue).length;
    const showCount = showCharacterCount && (isFocused || (maxLength && currentLength > maxLength * 0.8));
    const isOverLimit = maxLength && currentLength > maxLength;
    
    // Handle textarea change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      props.onChange?.(e)
    };
    
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
        
        {/* Main Textarea Container */}
        <div className="relative">
          <div className={cn(hiveTextareaVariants({ variant: currentVariant, size, radius, className }))}>
            {/* Left Icon */}
            {leftIcon && (
              <div className="absolute left-3 top-4 text-[var(--hive-text-secondary)] z-10">
                {leftIcon}
              </div>
            )}
            
            {/* Floating Label */}
            {label && floatingLabel && (
              <motion.label
                className={cn(
                  "absolute pointer-events-none origin-left font-medium transition-all duration-300 z-10",
                  leftIcon ? "left-10" : "left-3",
                  shouldFloat ? "top-2 text-xs text-[var(--hive-text-primary)]" : "top-4 text-sm text-[var(--hive-text-secondary)]"
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
            
            {/* Textarea Element */}
            <textarea
              ref={textareaRef}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled || loading}
              maxLength={maxLength}
              className={cn(
                "w-full h-full bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none relative z-20",
                leftIcon ? "pl-10" : "pl-3",
                "pr-12", // Proper space for icons and count
                floatingLabel ? "pt-6 pb-3" : "py-3",
                resize ? "resize-y" : "resize-none",
                size === 'sm' && "text-sm",
                size === 'default' && "text-sm", 
                size === 'lg' && "text-base",
                size === 'xl' && "text-lg"
              )}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e)
          }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e)
          }}
              onChange={handleChange}
              {...props}
            />
            
            {/* Bottom Right Corner Icons */}
            <div className="absolute bottom-3 right-3 flex items-center space-x-2 z-10">
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
    )
  }
);

HiveTextarea.displayName = "HiveTextarea";

// Pre-built Textarea Variants for common use cases
const HiveToolDescriptionTextarea = React.forwardRef<HTMLTextAreaElement, Omit<HiveTextareaProps, 'label' | 'placeholder'>>(
  (props, ref) => (
    <HiveTextarea
      ref={ref}
      label="Tool Description"
      placeholder="Describe what your tool does..."
      variant="premium"
      showCharacterCount
      maxLength={500}
      size="lg"
      {...props}
    />
  )
);

const HiveSpaceDescriptionTextarea = React.forwardRef<HTMLTextAreaElement, Omit<HiveTextareaProps, 'label' | 'placeholder'>>(
  (props, ref) => (
    <HiveTextarea
      ref={ref}
      label="Space Description" 
      placeholder="Describe your space..."
      showCharacterCount
      maxLength={300}
      {...props}
    />
  )
);

const HiveFeedbackTextarea = React.forwardRef<HTMLTextAreaElement, Omit<HiveTextareaProps, 'label' | 'placeholder'>>(
  (props, ref) => (
    <HiveTextarea
      ref={ref}
      label="Feedback"
      placeholder="Share your thoughts..."
      showCharacterCount
      maxLength={1000}
      size="lg"
      {...props}
    />
  )
);

const HiveCodeTextarea = React.forwardRef<HTMLTextAreaElement, Omit<HiveTextareaProps, 'label' | 'className'>>(
  (props, ref) => (
    <HiveTextarea
      ref={ref}
      className="font-mono text-sm"
      variant="minimal"
      resize={false}
      {...props}
    />
  )
);

HiveToolDescriptionTextarea.displayName = "HiveToolDescriptionTextarea";
HiveSpaceDescriptionTextarea.displayName = "HiveSpaceDescriptionTextarea"; 
HiveFeedbackTextarea.displayName = "HiveFeedbackTextarea";
HiveCodeTextarea.displayName = "HiveCodeTextarea";

export { 
  HiveTextarea,
  HiveToolDescriptionTextarea,
  HiveSpaceDescriptionTextarea,
  HiveFeedbackTextarea,
  HiveCodeTextarea,
  hiveTextareaVariants
};

// Simple Textarea component for basic use cases (backwards compatibility)
const Textarea = React.forwardRef<HTMLTextAreaElement, Omit<HiveTextareaProps, 'label' | 'floatingLabel'>>(
  (props, ref) => (
    <HiveTextarea
      ref={ref}
      variant="minimal"
      floatingLabel={false}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// Export as Textarea for easier migration and consistency
export { Textarea, HiveTextarea as TextareaAdvanced };