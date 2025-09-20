"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { AlertCircle, Check, Info, Loader, Eye, EyeOff } from 'lucide-react';

// HIVE Form System - Advanced Validation with Liquid Metal Motion
// Sophisticated form components with real-time validation, flow control, and magnetic interactions

// Form validation types and utilities
export type ValidationRule = {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean | Promise<boolean>
};

export type FieldError = {
  type: string;
  message: string
};

export type FormFieldState = {
  value: any;
  errors: FieldError[];
  touched: boolean;
  validating: boolean;
  valid: boolean
};

export type FormState = {
  values: Record<string, any>;
  errors: Record<string, FieldError[]>;
  touched: Record<string, boolean>;
  validating: Record<string, boolean>;
  valid: boolean;
  submitting: boolean
};

// Form context
interface FormContextType {
  state: FormState;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: FieldError | null) => void;
  setTouched: (name: string, touched: boolean) => void;
  setValidating: (name: string, validating: boolean) => void;
  validateField: (name: string, value: any, rules: ValidationRule[]) => Promise<void>;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  getFieldState: (name: string) => FormFieldState
}

const FormContext = createContext<FormContextType | null>(null);

// Form field variants
const hiveFormFieldVariants = cva(
  "relative w-full transition-all",
  {
    variants: {
      variant: {
        default: "",
        premium: "",
        minimal: "",
      },
      
      state: {
        default: "",
        error: "",
        success: "",
        validating: "",
      }
    },
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
);

const formInputVariants = cva(
  "w-full px-4 py-3 bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border rounded-xl transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-white/20 focus:border-yellow-500/50 text-[var(--hive-text-primary)] placeholder-white/50",
        premium: "border-yellow-500/30 focus:border-yellow-500 text-[var(--hive-text-primary)] placeholder-white/50",
        minimal: "border-white/10 focus:border-white/30 text-[var(--hive-text-primary)] placeholder-white/50",
      },
      
      state: {
        default: "",
        error: "border-red-500/50 focus:border-red-500",
        success: "border-green-500/50 focus:border-green-500",
        validating: "border-blue-500/50 focus:border-blue-500",
      },
      
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-4 py-3",
        lg: "px-5 py-4 text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      state: "default",
      size: "default",
    },
  }
);

// Error animation variants
const errorVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  visible: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  }
};

// Form validation utilities
const validateField = async (value: any, rules: ValidationRule[]): Promise<FieldError[]> => {
  const errors: FieldError[] = [];
  
  for (const rule of rules) {
    let isValid = true;
    
    switch (rule.type) {
      case 'required':
        isValid = value !== undefined && value !== null && value !== '';
        break;
      case 'min':
        isValid = typeof value === 'string' ? value.length >= rule.value : value >= rule.value;
        break;
      case 'max':
        isValid = typeof value === 'string' ? value.length <= rule.value : value <= rule.value;
        break;
      case 'pattern':
        isValid = rule.value instanceof RegExp ? rule.value.test(value) : true;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        break;
      case 'custom':
        if (rule.validator) {
          isValid = await rule.validator(value)
        }
        break
    }
    
    if (!isValid) {
      errors.push({
        type: rule.type,
        message: rule.message,
      })
    }
  }
  
  return errors
};

// Form Provider Component
export interface HiveFormProps {
  children: React.ReactNode;
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit';
  className?: string
}

export const HiveForm: React.FC<HiveFormProps> = ({
  children,
  initialValues = {},
  onSubmit,
  validationMode = 'onBlur',
  className,
}) => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    validating: {},
    valid: true,
    submitting: false,
  });
  
  const setValue = useCallback((name: string, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }))
  }, []);
  
  const setError = useCallback((name: string, error: FieldError | null) => {
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error ? [error] : [],
      },
    }))
  }, []);
  
  const setTouched = useCallback((name: string, touched: boolean) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }))
  }, []);
  
  const setValidating = useCallback((name: string, validating: boolean) => {
    setState(prev => ({
      ...prev,
      validating: { ...prev.validating, [name]: validating },
    }))
  }, []);
  
  const validateFormField = useCallback(async (name: string, value: any, rules: ValidationRule[]) => {
    setValidating(name, true);
    
    try {
      const errors = await validateField(value, rules);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: errors },
        validating: { ...prev.validating, [name]: false },
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: { 
          ...prev.errors, 
          [name]: [{ type: 'validation', message: 'Validation error occurred' }] 
        },
        validating: { ...prev.validating, [name]: false },
      }))
    }
  }, []);
  
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      validating: {},
      valid: true,
      submitting: false,
    })
  }, [initialValues]);
  
  const submitForm = useCallback(async () => {
    setState(prev => ({ ...prev, submitting: true }));
    
    try {
      if (onSubmit) {
        await onSubmit(state.values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setState(prev => ({ ...prev, submitting: false }))
    }
  }, [onSubmit, state.values]);
  
  const getFieldState = useCallback((name: string): FormFieldState => {
    return {
      value: state.values[name],
      errors: state.errors[name] || [],
      touched: state.touched[name] || false,
      validating: state.validating[name] || false,
      valid: !state.errors[name] || state.errors[name].length === 0,
    }
  }, [state]);
  
  // Update form validity
  useEffect(() => {
    const hasErrors = Object.values(state.errors).some(errors => errors.length > 0);
    const isValidating = Object.values(state.validating).some(Boolean);
    
    setState(prev => ({
      ...prev,
      valid: !hasErrors && !isValidating,
    }))
  }, [state.errors, state.validating]);
  
  const contextValue: FormContextType = {
    state,
    setValue,
    setError,
    setTouched,
    setValidating,
    validateField: validateFormField,
    resetForm,
    submitForm,
    getFieldState,
  };
  
  return (
    <FormContext.Provider value={contextValue}>
      <form className={cn("space-y-6", className)} onSubmit={(e) => {
        e.preventDefault();
        submitForm()
      }}>
        {children}
      </form>
    </FormContext.Provider>
  )
};

// Form Field Hook
export function useFormField(name: string) {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormField must be used within a HiveForm')
  }
  
  return {
    ...context.getFieldState(name),
    setValue: (value: any) => context.setValue(name, value),
    setError: (error: FieldError | null) => context.setError(name, error),
    setTouched: (touched: boolean) => context.setTouched(name, touched),
    validate: (rules: ValidationRule[]) => context.validateField(name, context.getFieldState(name).value, rules),
  }
}

// Form Input Component
export interface HiveFormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof formInputVariants> {
  name: string;
  label?: string;
  description?: string;
  rules?: ValidationRule[];
  showPasswordToggle?: boolean
}

export const HiveFormInput = React.forwardRef<HTMLInputElement, HiveFormInputProps>(
  ({ 
    className,
    variant,
    size,
    name,
    label,
    description,
    rules = [],
    type = 'text',
    showPasswordToggle = false,
    ...props 
  }, ref) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const field = useFormField(name);
    const context = useContext(FormContext);
    
    if (!context) {
      throw new Error('HiveFormInput must be used within a HiveForm')
    }
    
    const fieldState = field.errors.length > 0 ? 'error' : 
                     field.validating ? 'validating' : 
                     field.touched && field.valid ? 'success' : 'default';
    
    const inputType = showPasswordToggle && type === 'password' ? 
                      (showPassword ? 'text' : 'password') : type;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      field.setValue(value);
      
      if (context.state.touched[name] && rules.length > 0) {
        field.validate(rules)
      }
    };
    
    const handleBlur = () => {
      field.setTouched(true);
      if (rules.length > 0) {
        field.validate(rules)
      }
    };
    
    return (
      <div className={cn(hiveFormFieldVariants({ variant, state: fieldState }))}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            {label}
            {rules.some(r => r.type === 'required') && (
              <span className="text-red-400 ml-1">*</span>
            )}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--hive-text-primary)]/60 mb-3">{description}</p>
        )}
        
        {/* Input Container */}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            name={name}
            value={field.value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(formInputVariants({ variant, state: fieldState, size, className }))}
            {...props}
          />
          
          {/* Input Icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Validation Status */}
            {field.validating && (
              <Loader size={16} className="text-blue-400 animate-spin" />
            )}
            {field.touched && field.valid && !field.validating && (
              <Check size={16} className="text-green-400" />
            )}
            {field.errors.length > 0 && !field.validating && (
              <AlertCircle size={16} className="text-red-400" />
            )}
            
            {/* Password Toggle */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
        </div>
        
        {/* Error Messages */}
        <AnimatePresence>
          {field.errors.length > 0 && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-2"
            >
              {field.errors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-red-400">
                  <AlertCircle size={14} />
                  <span>{error.message}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success Message */}
        <AnimatePresence>
          {field.touched && field.valid && !field.validating && field.errors.length === 0 && rules.length > 0 && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-2"
            >
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <Check size={14} />
                <span>Valid</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
);

HiveFormInput.displayName = "HiveFormInput";

// Form Textarea Component
export interface HiveFormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  description?: string;
  rules?: ValidationRule[];
  variant?: 'default' | 'premium' | 'minimal'
}

export const HiveFormTextarea = React.forwardRef<HTMLTextAreaElement, HiveFormTextareaProps>(
  ({ 
    className,
    variant = 'default',
    name,
    label,
    description,
    rules = [],
    ...props 
  }, ref) => {
    
    const field = useFormField(name);
    const context = useContext(FormContext);
    
    if (!context) {
      throw new Error('HiveFormTextarea must be used within a HiveForm')
    }
    
    const fieldState = field.errors.length > 0 ? 'error' : 
                     field.validating ? 'validating' : 
                     field.touched && field.valid ? 'success' : 'default';
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      field.setValue(value);
      
      if (context.state.touched[name] && rules.length > 0) {
        field.validate(rules)
      }
    };
    
    const handleBlur = () => {
      field.setTouched(true);
      if (rules.length > 0) {
        field.validate(rules)
      }
    };
    
    return (
      <div className={cn(hiveFormFieldVariants({ variant, state: fieldState }))}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            {label}
            {rules.some(r => r.type === 'required') && (
              <span className="text-red-400 ml-1">*</span>
            )}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--hive-text-primary)]/60 mb-3">{description}</p>
        )}
        
        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={ref}
            name={name}
            value={field.value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full px-4 py-3 bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border rounded-xl transition-all focus:outline-none resize-none",
              variant === 'default' && "border-white/20 focus:border-yellow-500/50",
              variant === 'premium' && "border-yellow-500/30 focus:border-yellow-500",
              variant === 'minimal' && "border-white/10 focus:border-white/30",
              fieldState === 'error' && "border-red-500/50 focus:border-red-500",
              fieldState === 'success' && "border-green-500/50 focus:border-green-500",
              fieldState === 'validating' && "border-blue-500/50 focus:border-blue-500",
              "text-[var(--hive-text-primary)] placeholder-white/50",
              className
            )}
            {...props}
          />
          
          {/* Status Icon */}
          <div className="absolute right-3 top-3">
            {field.validating && (
              <Loader size={16} className="text-blue-400 animate-spin" />
            )}
            {field.touched && field.valid && !field.validating && (
              <Check size={16} className="text-green-400" />
            )}
            {field.errors.length > 0 && !field.validating && (
              <AlertCircle size={16} className="text-red-400" />
            )}
          </div>
        </div>
        
        {/* Error Messages */}
        <AnimatePresence>
          {field.errors.length > 0 && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-2"
            >
              {field.errors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-red-400">
                  <AlertCircle size={14} />
                  <span>{error.message}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
);

HiveFormTextarea.displayName = "HiveFormTextarea";

// Pre-built validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    type: 'required',
    message,
  }),
  
  minLength: (length: number, message?: string): ValidationRule => ({
    type: 'min',
    value: length,
    message: message || `Must be at least ${length} characters`,
  }),
  
  maxLength: (length: number, message?: string): ValidationRule => ({
    type: 'max',
    value: length,
    message: message || `Must not exceed ${length} characters`,
  }),
  
  email: (message = 'Must be a valid email address'): ValidationRule => ({
    type: 'email',
    message,
  }),
  
  pattern: (regex: RegExp, message: string): ValidationRule => ({
    type: 'pattern',
    value: regex,
    message,
  }),
  
  custom: (validator: (value: any) => boolean | Promise<boolean>, message: string): ValidationRule => ({
    type: 'custom',
    validator,
    message,
  }),
};

export { 
  FormContext,
  hiveFormFieldVariants,
  formInputVariants
};