'use client';

import * as React from "react";
import { cn } from "../lib/utils";
import { Input, type InputProps } from "../ui/input";
import { Typography } from "../ui/typography";
import { Label } from "../ui/label";

// HIVE Level 2 Molecule: Form Field
// Components: Label + Input + Helper Text + Error Message
// States: Default, Focus, Error, Success, Disabled

export interface FormFieldProps extends Omit<InputProps, 'id'> {
  id?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  showOptional?: boolean;
  success?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    id,
    label,
    helperText,
    errorMessage,
    required = false,
    showOptional = false,
    success = false,
    variant,
    className,
    ...props 
  }, ref) => {
    // Generate unique ID if not provided
    const fieldId = id || React.useId();
    
    // Determine input variant based on state
    const inputVariant = errorMessage ? 'error' : success ? 'success' : variant;
    
    return (
      <div className="space-y-2">
        {/* Label with Required/Optional indicator */}
        {label && (
          <Label 
            htmlFor={fieldId}
            className={cn(
              "text-sm font-medium text-[var(--hive-text-inverse)]",
              props.disabled && "opacity-50"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-[#F87171]" aria-label="Required">
                *
              </span>
            )}
            {showOptional && !required && (
              <span className="ml-1 text-[var(--hive-text-inverse)]/50 text-sm font-normal">
                (Optional)
              </span>
            )}
          </Label>
        )}
        
        {/* Input with proper state */}
        <InputEnhanced
          ref={ref}
          id={fieldId}
          variant={inputVariant}
          className={cn(
            // Label animation on focus
            "transition-all duration-200",
            className
          )}
          aria-describedby={
            cn(
              helperText && `${fieldId}-helper`,
              errorMessage && `${fieldId}-error`
            ) || undefined
          }
          aria-invalid={errorMessage ? 'true' : undefined}
          {...props}
        />
        
        {/* Helper Text */}
        {helperText && !errorMessage && (
          <Typography
            id={`${fieldId}-helper`}
            size="small"
            color="medium"
            className="text-xs"
          >
            {helperText}
          </Typography>
        )}
        
        {/* Error Message */}
        {errorMessage && (
          <Typography
            id={`${fieldId}-error`}
            size="small"
            color="error"
            className="text-xs"
            role="alert"
          >
            {errorMessage}
          </Typography>
        )}
        
        {/* Success Message */}
        {success && !errorMessage && (
          <Typography
            size="small"
            color="success"
            className="text-xs"
          >
            ✓ Valid
          </Typography>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

// Form Field Presets for common patterns
export const FormFieldPresets = {
  // Email Field
  EmailField: (props: Omit<FormFieldProps, 'type' | 'placeholder' | 'label'>) => (
    <FormField
      type="email"
      label="Email"
      placeholder="your.email@buffalo.edu"
      {...props}
    />
  ),
  
  // Password Field
  PasswordField: (props: Omit<FormFieldProps, 'type' | 'label'>) => (
    <FormField
      type="password"
      label="Password"
      {...props}
    />
  ),
  
  // Required Text Field
  RequiredTextField: (props: Omit<FormFieldProps, 'required'>) => (
    <FormField
      required
      {...props}
    />
  ),
  
  // Search Field
  SearchField: (props: Omit<FormFieldProps, 'type' | 'placeholder'>) => (
    <FormField
      type="search"
      placeholder="Search..."
      {...props}
    />
  ),
};

export { FormField as FormFieldMolecule };