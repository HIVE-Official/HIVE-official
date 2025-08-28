'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// HIVE Textarea System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const textareaVariants = cva(
  // Base styles using semantic tokens only
  "flex w-full rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
        error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
        success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
        warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
        brand: "bg-transparent border-2 border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)] focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)]",
      },
      
      size: {
        sm: "min-h-20 px-2 py-1.5 text-xs",
        default: "min-h-24 px-3 py-2 text-sm",
        lg: "min-h-32 px-4 py-3 text-base",
        xl: "min-h-40 px-5 py-4 text-lg",
      },
      
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-lg", 
        lg: "rounded-xl",
        full: "rounded-2xl",
      },
      
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      resize: "vertical",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    resize,
    error,
    success,
    helperText,
    label,
    required,
    showCharCount,
    maxLength,
    autoResize = true, // Default to true for modern UX
    minRows = 1,
    maxRows = 10,
    value,
    onChange,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || React.useId();
    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    
    // Calculate line height based on size
    const getLineHeight = () => {
      switch (size) {
        case 'sm': return 20;
        case 'lg': return 28; 
        case 'xl': return 32;
        default: return 24;
      }
    };
    
    // Handle auto-resize with min/max constraints
    const handleAutoResize = React.useCallback(() => {
      if (autoResize && textareaRef.current) {
        const lineHeight = getLineHeight();
        const minHeight = lineHeight * minRows + 16; // Add padding
        const maxHeight = lineHeight * maxRows + 16;
        
        // Reset height to get accurate scrollHeight
        textareaRef.current.style.height = 'auto';
        
        // Calculate new height
        const scrollHeight = textareaRef.current.scrollHeight;
        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        
        textareaRef.current.style.height = `${newHeight}px`;
        textareaRef.current.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
      }
    }, [autoResize, minRows, maxRows, size]);
    
    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCharCount(newValue.length);
      
      if (maxLength && newValue.length > maxLength) {
        return; // Don't allow input beyond maxLength
      }
      
      onChange?.(e);
      handleAutoResize();
    };
    
    // Set ref function to handle both forwarded ref and internal ref
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    
    // Initialize character count and auto-resize
    React.useEffect(() => {
      if (value) {
        setCharCount(String(value).length);
      }
      handleAutoResize();
    }, [value, handleAutoResize]);
    
    const textareaElement = (
      <div className="relative">
        <textarea
          id={textareaId}
          className={cn(
            textareaVariants({ variant: computedVariant, size, radius, resize: autoResize ? "none" : resize }),
            autoResize && "overflow-hidden transition-all duration-150 ease-out",
            className
          )}
          ref={setRefs}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        
        {/* Character Count */}
        {showCharCount && (
          <div className="absolute bottom-2 right-3 text-xs text-[var(--hive-text-tertiary)]">
            {charCount}{maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>
    );
    
    if (label || error || success || helperText || showCharCount) {
      return (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={textareaId}
              className="text-sm font-medium text-[var(--hive-text-primary)]"
            >
              {label}
              {required && (
                <span className="ml-1 text-[var(--hive-status-error)]">*</span>
              )}
            </label>
          )}
          
          {/* Textarea */}
          {textareaElement}
          
          {/* Helper Text / Error / Success */}
          {(error || success || helperText) && (
            <p className={cn(
              "text-xs",
              error && "text-[var(--hive-status-error)]",
              success && "text-[var(--hive-status-success)]",
              !error && !success && "text-[var(--hive-text-tertiary)]"
            )}>
              {error || success || helperText}
            </p>
          )}
        </div>
      );
    }
    
    return textareaElement;
  }
);
Textarea.displayName = "Textarea";

// Code Textarea Component
export interface CodeTextareaProps extends Omit<TextareaProps, 'className'> {
  language?: string;
  showLineNumbers?: boolean;
}

const CodeTextarea = React.forwardRef<HTMLTextAreaElement, CodeTextareaProps>(
  ({ language, showLineNumbers, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className="font-mono text-sm bg-[color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)] border-[var(--hive-border-default)]"
        placeholder={language ? `Enter ${language} code...` : "Enter code..."}
        {...props}
      />
    );
  }
);
CodeTextarea.displayName = "CodeTextarea";

// Textarea Group Component
export interface TextareaGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md";
}

const TextareaGroup = React.forwardRef<HTMLDivElement, TextareaGroupProps>(
  ({ className, orientation = "vertical", spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
      md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row items-start" : "flex-col",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TextareaGroup.displayName = "TextareaGroup";

// Textarea presets for common patterns
export const TextareaPresets = {
  // Comment/Message Input
  Comment: (props: Omit<TextareaProps, 'placeholder' | 'size'>) => (
    <Textarea 
      placeholder="Write your comment..."
      size="default"
      autoResize
      minRows={1}
      maxRows={6}
      showCharCount
      maxLength={500}
      {...props} 
    />
  ),
  
  // Description Input
  Description: (props: Omit<TextareaProps, 'placeholder' | 'size'>) => (
    <Textarea 
      placeholder="Enter description..."
      size="lg"
      showCharCount
      maxLength={1000}
      {...props} 
    />
  ),
  
  // Notes Input
  Notes: (props: Omit<TextareaProps, 'placeholder'>) => (
    <Textarea 
      placeholder="Add your notes..."
      autoResize
      resize="vertical"
      {...props} 
    />
  ),
  
  // Code Input
  Code: (props: Omit<CodeTextareaProps, 'placeholder'>) => (
    <CodeTextarea 
      placeholder="Enter code..."
      size="lg"
      resize="both"
      {...props} 
    />
  ),
  
  // Feedback Input
  Feedback: (props: Omit<TextareaProps, 'placeholder' | 'size'>) => (
    <Textarea 
      placeholder="Share your feedback..."
      size="lg"
      autoResize
      showCharCount
      maxLength={2000}
      {...props} 
    />
  ),
};

export { 
  Textarea, 
  CodeTextarea,
  TextareaGroup, 
  textareaVariants 
};