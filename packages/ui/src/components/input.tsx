import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, X, AlertCircle, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"

import { cn } from "../lib/utils"

export type InputState = 'default' | 'error' | 'success' | 'loading';

const inputVariants = cva(
  // Base: Clean chip-style inputs for social platform
  "flex w-full bg-background text-white font-medium transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] file:border-0 file:bg-transparent file:font-medium placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-accent/20",
  {
    variants: {
      variant: {
        // DEFAULT: Clean chip with gold focus border
        default: [
          "rounded-xl border border-border px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:border-accent/50 hover:bg-surface"
        ],
        
        // FILLED: Elevated chip surface
        filled: [
          "rounded-xl border border-border bg-surface px-4 py-3",
          "focus-visible:border-accent focus-visible:bg-surface",
          "hover:bg-border"
        ],
        
        // FLOATING: Chip with floating label
        floating: [
          "rounded-xl border border-border px-4 pt-6 pb-2",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:border-accent/50"
        ],
        
        // SEARCH: Pill-shaped for search
        search: [
          "rounded-full border border-border px-6 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:border-accent/50"
        ],
        
        // MINIMAL: Ghost style
        minimal: [
          "rounded-xl border border-transparent bg-surface px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:bg-border"
        ],
        
        // ACCENT: Highlighted with gold border
        accent: [
          "rounded-xl border border-accent bg-background px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:bg-accent/5"
        ]
      },
      inputSize: {
        sm: "h-9 text-sm",
        md: "h-10 text-sm", 
        lg: "h-12 text-base"
      },
      state: {
        default: "",
        error: "border-border focus-visible:border-accent bg-surface/50",
        success: "border-accent focus-visible:border-accent bg-accent/5",
        loading: "border-accent/30 bg-accent/5"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md", 
      state: "default"
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "state"> {
  label?: string
  hint?: string
  error?: string
  success?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  loading?: boolean
  state?: InputState
}

// Helper function to determine input type
const getInputType = (showPasswordToggle: boolean, type: string | undefined, showPassword: boolean) => {
  return showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;
};

// Helper function to determine current state
const getCurrentState = (error: string | undefined, success: string | undefined, loading: boolean, state?: InputState): InputState => {
  return error ? 'error' : success ? 'success' : loading ? 'loading' : state || 'default';
};

// Helper function to get state icon
const _getStateIcon = (currentState: InputState | undefined) => {
  switch (currentState) {
    case 'error':
      return <AlertCircle className="h-4 w-4 text-muted" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-accent" />;
    case 'loading':
      return <Loader2 className="h-4 w-4 animate-spin text-muted" />;
    default:
      return null;
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    inputSize, 
    state, 
    type, 
    label,
    hint,
    error,
    success,
    icon,
    rightIcon,
    showPasswordToggle = false,
    loading = false,
    value,
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(Boolean(value || props.defaultValue))
    
    // Determine actual input type
    const inputType = getInputType(showPasswordToggle, type, showPassword);
    
    // Determine state based on props
    const currentState = getCurrentState(error, success, loading, state);
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value))
      props.onChange?.(e)
    }
    
    const showFloatingLabel = variant === 'floating' && label
    const isLabelFloated = showFloatingLabel && (isFocused || hasValue)
    
    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
              {loading ? (
                <div className="w-4 h-4 animate-spin">
                  {icon}
                </div>
              ) : (
                icon
              )}
            </div>
          )}
          
          {/* Floating Label */}
          {showFloatingLabel && (
            <label
              htmlFor={props.id}
              className={cn(
                "absolute left-4 text-muted pointer-events-none transition-all duration-200 ease-smooth",
                isLabelFloated 
                  ? "top-2 text-caption text-accent font-medium transform scale-85" 
                  : "top-1/2 -translate-y-1/2 text-body"
              )}
            >
              {label}
            </label>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            placeholder={showFloatingLabel ? undefined : placeholder}
            className={cn(
              inputVariants({ variant, inputSize, state: currentState }),
              icon && "pl-12",
              (rightIcon || showPasswordToggle) && "pr-12",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {/* Right Icon / Password Toggle */}
          {(rightIcon || showPasswordToggle) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted hover:text-accent transition-colors duration-200 p-0.5 rounded-md hover:bg-accent/10"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              ) : (
                <div className="text-muted">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
          
          {/* State Icon */}
          {currentState !== 'default' && !loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {currentState === 'error' && <X className="w-4 h-4 text-muted-foreground" />}
              {currentState === 'success' && <Check className="w-4 h-4 text-accent" />}
            </div>
          )}
        </div>
        
        {/* Helper Text */}
        {(hint || error || success) && (
          <div className="mt-2 px-1">
            {error && (
              <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {error}
              </div>
            )}
            {!error && success && (
              <div className="flex items-center gap-1.5 text-caption text-accent">
                <Check className="w-3 h-3 flex-shrink-0" />
                {success}
              </div>
            )}
            {!error && !success && hint && (
              <div className="text-caption text-muted">
                {hint}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Simple input without the wrapper (for backward compatibility)
const SimpleInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'label' | 'hint' | 'error' | 'success' | 'icon' | 'rightIcon' | 'showPasswordToggle' | 'loading'>>(
  ({ className, variant, inputSize, state, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize, state, className }))}
        {...props}
      />
    )
  }
)
SimpleInput.displayName = "SimpleInput"

export { Input, SimpleInput, inputVariants }
