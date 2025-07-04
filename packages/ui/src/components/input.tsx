import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Check, X, AlertCircle, Eye, EyeOff } from "lucide-react"

import { cn } from "../lib/utils"
import { createGoldAccent } from "../lib/motion"
import { useAdaptiveMotion } from "../lib/adaptive-motion"

const inputVariants = cva(
  // Base chip-style input with 2025 AI feel
  "flex w-full bg-background text-foreground font-sans transition-all duration-base ease-smooth file:border-0 file:bg-transparent file:font-medium placeholder:text-muted/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-accent/20",
  {
    variants: {
      variant: {
        // CHIP: Modern chip-style (default 2025 look)
        chip: [
          "rounded-2xl border border-border px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:shadow-lg focus-visible:shadow-accent/5",
          "hover:border-accent/50 hover:bg-surface-01/50",
          "placeholder:text-muted/50"
        ],
        
        // FLOATING: Chip with floating label
        floating: [
          "rounded-2xl border border-border px-4 pt-6 pb-2",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:shadow-lg focus-visible:shadow-accent/5",
          "hover:border-accent/50 hover:bg-surface-01/50"
        ],
        
        // SEARCH: Pill-shaped search input
        search: [
          "rounded-full border border-border px-6 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:shadow-lg focus-visible:shadow-accent/5",
          "hover:border-accent/50 hover:bg-surface-01/50",
          "placeholder:text-muted/60"
        ],
        
        // MINIMAL: Ghost chip
        minimal: [
          "rounded-2xl border border-transparent bg-surface-01/50 px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:bg-surface-01",
          "hover:bg-surface-01 hover:border-border/50"
        ],
        
        // ACCENT: Gold accent chip for special inputs
        accent: [
          "rounded-2xl border border-accent/30 bg-accent/5 px-4 py-3",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:shadow-lg focus-visible:shadow-accent/10",
          "hover:border-accent/50 hover:bg-accent/10"
        ],
        
        // SURFACE: Elevated chip surface
        surface: [
          "rounded-2xl border border-border bg-surface-01 px-4 py-3 shadow-sm",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:bg-surface-02 focus-visible:shadow-md",
          "hover:border-accent/40 hover:bg-surface-02"
        ],
      },
      inputSize: {
        sm: "h-10 text-body-sm",
        default: "h-12 text-body",
        lg: "h-14 text-body",
        xl: "h-16 text-h4",
      },
      state: {
        default: "",
        error: "border-border focus-visible:border-accent focus-visible:ring-accent/20 bg-surface/50",
        success: "border-accent/60 focus-visible:border-accent focus-visible:ring-accent/20 bg-accent/5",
        loading: "animate-pulse border-accent/30 bg-accent/5",
      },
    },
    defaultVariants: {
      variant: "chip",
      inputSize: "default", 
      state: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  enableMotion?: boolean
  label?: string
  hint?: string
  error?: string
  success?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  loading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    inputSize, 
    state, 
    type, 
    enableMotion = true,
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
    const { createTransition } = useAdaptiveMotion('academic')
    
    // Determine actual input type
    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password') 
      : type
    
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : loading ? 'loading' : state
    
    const getMotionProps = () => {
      if (!enableMotion) return {}
      
      return {
        whileFocus: { 
          scale: 1.005,
          transition: createTransition('fast')
        },
        whileHover: {
          scale: 1.002,
          transition: createTransition('fast')
        },
        ...(variant === 'accent' && createGoldAccent('fast'))
      }
    }
    
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
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4"
                >
                  {icon}
                </motion.div>
              ) : (
                icon
              )}
            </div>
          )}
          
          {/* Floating Label */}
          {showFloatingLabel && (
            <motion.label
              htmlFor={props.id}
              className={cn(
                "absolute left-4 text-muted pointer-events-none transition-all duration-200 ease-smooth",
                isLabelFloated 
                  ? "top-2 text-caption text-accent font-medium" 
                  : "top-1/2 -translate-y-1/2 text-body"
              )}
              initial={false}
              animate={{
                y: isLabelFloated ? 0 : 0,
                scale: isLabelFloated ? 0.85 : 1,
                color: isLabelFloated ? (isFocused ? "rgb(255, 215, 0)" : "rgb(161, 161, 170)") : "rgb(161, 161, 170)"
              }}
              transition={{ duration: 0.2, ease: [0.33, 0.65, 0, 1] }}
            >
              {label}
            </motion.label>
          )}
          
          {/* Input Field */}
          <motion.input
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
            {...getMotionProps()}
            {...(({ 
              onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
              onAnimationStart, onAnimationEnd, onAnimationIteration,
              onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
              ...rest 
            }) => rest)(props)}
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
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 px-1"
          >
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
          </motion.div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Simple input without the wrapper (for backward compatibility)
const SimpleInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'label' | 'hint' | 'error' | 'success' | 'icon' | 'rightIcon' | 'showPasswordToggle' | 'loading'>>(
  ({ className, variant, inputSize, state, type, enableMotion = true, ...props }, ref) => {
    const { createTransition } = useAdaptiveMotion('academic')
    
    const getMotionProps = () => {
      if (!enableMotion) return {}
      
      return {
        whileFocus: { 
          scale: 1.005,
          transition: createTransition('fast')
        },
        ...(variant === 'accent' && createGoldAccent('fast'))
      }
    }
    
    // Exclude HTML event handlers that conflict with Framer Motion
    const { 
      onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <motion.input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize, state, className }))}
        {...getMotionProps()}
        {...motionProps}
      />
    )
  }
)
SimpleInput.displayName = "SimpleInput"

export { Input, SimpleInput, inputVariants }
