'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { InputEnhanced as Input } from '../atoms/input-enhanced';
import { Text } from '../atoms/text';

export interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  required = false,
  children,
  className
}) => {
  // Generate unique ID for accessibility
  const fieldId = React.useId();
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  // Clone child with accessibility props
  const childWithProps = React.cloneElement(children, {
    id: fieldId,
    'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? 'true' : undefined,
    error
  });

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={fieldId}
          className="block font-medium text-[var(--hive-text-primary)]"
        >
          <Text variant="body-sm" color="primary">
            {label}
            {required && (
              <span className="text-[var(--hive-status-error)] ml-1" aria-label="required">
                *
              </span>
            )}
          </Text>
        </label>
      )}

      {/* Description */}
      {description && (
        <Text
          variant="body-xs"
          color="secondary"
          id={descriptionId}
        >
          {description}
        </Text>
      )}

      {/* Input Field */}
      {childWithProps}

      {/* Error Message */}
      {error && (
        <Text
          variant="body-xs"
          color="ruby"
          id={errorId}
          role="alert"
        >
          {error}
        </Text>
      )}
    </div>
  );
};

// Composed form field components for common patterns
export const TextFormField: React.FC<
  Omit<FormFieldProps, 'children'> & 
  React.ComponentProps<typeof Input>
> = ({ label, description, error, required, className, ...inputProps }) => (
  <FormField
    label={label}
    description={description}
    error={error}
    required={required}
    className={className}
  >
    <InputEnhanced {...inputProps} />
  </FormField>
);

export const EmailFormField: React.FC<
  Omit<FormFieldProps, 'children'> & 
  Omit<React.ComponentProps<typeof Input>, 'type'>
> = ({ label = 'Email', ...props }) => (
  <TextFormField
    type="email"
    label={label}
    {...props}
  />
);

export const PasswordFormField: React.FC<
  Omit<FormFieldProps, 'children'> & 
  Omit<React.ComponentProps<typeof Input>, 'type'>
> = ({ label = 'Password', ...props }) => (
  <TextFormField
    type="password"
    label={label}
    {...props}
  />
);