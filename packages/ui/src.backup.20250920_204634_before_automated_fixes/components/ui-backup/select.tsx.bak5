/**
 * Select component - simplified bridge for tool elements
 * Creates a basic select using standard HTML select element with HIVE styling
 */

import React from 'react';
import { cn } from '../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, onValueChange, onChange, children, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <select
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-[var(--hive-background-primary)] [&>option]:text-[var(--hive-text-primary)] [&>option]:py-2 [&>option]:px-3 [&>option:hover]:bg-[var(--hive-brand-secondary)] [&>option:hover]:text-[var(--hive-background-primary)] [&>option:checked]:bg-[var(--hive-brand-secondary)] [&>option:checked]:text-[var(--hive-background-primary)]",
          className
        )}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

// For compatibility with Radix-style API
export const SelectTrigger = Select;
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => <option value="" disabled>{placeholder}</option>;
export const SelectItem = ({ value, children, disabled }: { value: string; children: React.ReactNode; disabled?: boolean }) => (
  <option value={value} disabled={disabled}>{children}</option>
);