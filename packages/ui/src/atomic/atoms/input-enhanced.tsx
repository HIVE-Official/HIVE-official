'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// HIVE Input System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const inputVariants = cva(
  // Base styles using semantic tokens only
  "flex w-full rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
        error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
        success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
        warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
        brand: "border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)]",
        ghost: "border-transparent bg-transparent focus:border-[var(--hive-brand-secondary)] focus:bg-[var(--hive-background-secondary)]",
        filled: "border-transparent bg-[var(--hive-background-tertiary)] focus:border-[var(--hive-brand-secondary)]",
      },
      
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        md: "h-10 px-3 text-sm", // Alias for default
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-5 text-lg",
      },
      
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-lg", 
        lg: "rounded-xl",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    leftIcon,
    rightIcon,
    leftElement,
    rightElement,
    error,
    success,
    helperText,
    label,
    required,
    id,
    ...htmlProps 
  }, ref) => {
    // Filter out any conflicting HTML size attribute
    const { size: _htmlSize, ...props } = htmlProps as any;
    const inputId = id || React.useId();
    const hasLeftElement = leftIcon || leftElement;
    const hasRightElement = rightIcon || rightElement;
    
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    
    const inputElement = (
      <input
        id={inputId}
        className={cn(
          inputVariants({ variant: computedVariant, size, radius }),
          hasLeftElement && "pl-10",
          hasRightElement && "pr-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
    
    const wrapperElement = hasLeftElement || hasRightElement ? (
      <div className="relative">
        {/* Left Element */}
        {(leftIcon || leftElement) && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-tertiary)]">
            {leftIcon && (
              <span className="flex h-4 w-4 items-center justify-center">
                {leftIcon}
              </span>
            )}
            {leftElement}
          </div>
        )}
        
        {inputElement}
        
        {/* Right Element */}
        {(rightIcon || rightElement) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-tertiary)]">
            {rightIcon && (
              <span className="flex h-4 w-4 items-center justify-center">
                {rightIcon}
              </span>
            )}
            {rightElement}
          </div>
        )}
      </div>
    ) : inputElement;
    
    if (label || error || success || helperText) {
      return (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={inputId}
              className="text-sm font-medium text-[var(--hive-text-primary)]"
            >
              {label}
              {required && (
                <span className="ml-1 text-[var(--hive-status-error)]">*</span>
              )}
            </label>
          )}
          
          {/* Input */}
          {wrapperElement}
          
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
    
    return wrapperElement;
  }
);
Input.displayName = "Input";

// Search Input Component
export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, showClearButton = true, value, ...props }, ref) => {
    const hasValue = Boolean(value);
    
    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        leftIcon={<SearchIcon />}
        rightElement={
          showClearButton && hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

// Password Input Component
export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex h-4 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Number Input Component
export interface NumberInputProps extends Omit<InputProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  showControls?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    min, 
    max, 
    step = 1, 
    onIncrement, 
    onDecrement, 
    showControls = true,
    ...props 
  }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        rightElement={
          showControls ? (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={onIncrement}
                className="flex h-3 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                aria-label="Increment"
              >
                <ChevronUpIcon />
              </button>
              <button
                type="button"
                onClick={onDecrement}
                className="flex h-3 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                aria-label="Decrement"
              >
                <ChevronDownIcon />
              </button>
            </div>
          ) : undefined
        }
        {...props}
      />
    );
  }
);
NumberInput.displayName = "NumberInput";

// Input Group Component
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md";
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
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
          orientation === "horizontal" ? "flex-row items-end" : "flex-col",
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
InputGroup.displayName = "InputGroup";

// Input presets for common patterns
export const InputPresets = {
  // Email Input
  Email: (props: Omit<InputProps, 'type'>) => (
    <Input 
      type="email" 
      leftIcon={<EmailIcon />}
      placeholder="Enter your email"
      {...props} 
    />
  ),
  
  // Phone Input
  Phone: (props: Omit<InputProps, 'type'>) => (
    <Input 
      type="tel" 
      leftIcon={<PhoneIcon />}
      placeholder="Enter your phone number"
      {...props} 
    />
  ),
  
  // URL Input
  URL: (props: Omit<InputProps, 'type'>) => (
    <Input 
      type="url" 
      leftIcon={<LinkIcon />}
      placeholder="https://example.com"
      {...props} 
    />
  ),
  
  // Search Input
  Search: (props: Omit<SearchInputProps, 'type'>) => (
    <SearchInput 
      placeholder="Search..."
      {...props} 
    />
  ),
  
  // Currency Input
  Currency: (props: Omit<InputProps, 'leftElement'>) => (
    <Input 
      type="number" 
      leftElement={
        <span className="text-[var(--hive-text-tertiary)]">$</span>
      }
      placeholder="0.00"
      {...props} 
    />
  ),
};

// Floating Label Input Component
export interface FloatingLabelInputProps extends Omit<InputProps, 'label'> {
  label: string;
  labelClassName?: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, labelClassName, className, id, variant, size, radius, error, success, helperText, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputId = id || React.useId();
    
    const isFloated = isFocused || hasValue || props.value || props.defaultValue;
    
    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue));
    }, [props.value, props.defaultValue]);
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(Boolean(e.target.value));
      props.onBlur?.(e);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value));
      props.onChange?.(e);
    };
    
    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            inputVariants({ 
              variant: error ? "error" : success ? "success" : variant,
              size: size,
              radius: radius 
            }),
            "peer placeholder-transparent",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 transition-all duration-200 pointer-events-none font-sans",
            "peer-placeholder-shown:text-[var(--hive-text-tertiary)]",
            "peer-focus:text-[var(--hive-brand-secondary)]",
            error && "peer-focus:text-[var(--hive-status-error)]",
            success && "peer-focus:text-[var(--hive-status-success)]",
            isFloated ? [
              "-top-2 left-2 text-xs bg-[var(--hive-background-primary)] px-1 z-10",
              "text-[var(--hive-brand-secondary)]",
              error && "text-[var(--hive-status-error)]",
              success && "text-[var(--hive-status-success)]"
            ] : [
              "top-1/2 -translate-y-1/2 text-sm text-[var(--hive-text-tertiary)]"
            ],
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-[var(--hive-status-error)]">*</span>
          )}
        </label>
        
        {/* Helper Text / Error / Success */}
        {(error || success || helperText) && (
          <p className={cn(
            "text-xs mt-2",
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
);
FloatingLabelInput.displayName = "FloatingLabelInput";

// Simple icons using semantic approach
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ClearIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" />
    <path d="M2 2l20 20" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export { 
  Input, 
  Input as InputEnhanced,
  SearchInput, 
  PasswordInput, 
  NumberInput, 
  InputGroup,
  FloatingLabelInput,
  inputVariants 
};