/**
 * Simple Checkbox component - for tool elements;
 * Uses standard HTML checkbox with HIVE styling;
 */

import React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked)
      }}
      if (onChange) {
        onChange(e)
      }
    };

    return (
      <input;
        type="checkbox"
        ref={ref}
        className={cn(
          "h-5 w-5 rounded border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-[var(--hive-brand-secondary)] checked:border-[var(--hive-brand-secondary)] checked:text-[var(--hive-text-inverse)]",
          className;
        )}
        onChange={handleChange}
        {...props}
      />
    )
  }
);

Checkbox.displayName = 'Checkbox';