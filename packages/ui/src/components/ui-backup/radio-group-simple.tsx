/**
 * Simple RadioGroup component - for tool elements
 * Uses standard HTML radio inputs with HIVE styling
 */

import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
  disabled?: boolean
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name, disabled, children, ...props }, ref) => {
    const handleChange = (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue)
      }
    };

    // Clone children and add radio group props
    const clonedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === RadioGroupItem) {
        return React.cloneElement(child, {
          ...child.props,
          name,
          checked: child.props.value === value,
          disabled: disabled || child.props.disabled,
          onChange: () => handleChange(child.props.value),
        })}}}
      }
      return child
    });

    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        role="radiogroup"
        {...props}
      >
        {clonedChildren}
      </div>
    )
  }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        className={cn(
          "h-5 w-5 rounded-full border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-[var(--hive-brand-secondary)] checked:border-[var(--hive-brand-secondary)]",
          className
        )}
        {...props}
      />
    )
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';