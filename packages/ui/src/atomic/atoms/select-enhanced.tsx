'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// HIVE Select System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const selectVariants = cva(
  // Base styles using semantic tokens only
  "flex w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-[var(--hive-background-primary)] [&>option]:text-[var(--hive-text-primary)] [&>option]:py-2 [&>option]:px-3 [&>option:hover]:bg-[var(--hive-brand-secondary)] [&>option:hover]:text-[var(--hive-background-primary)] [&>option:checked]:bg-[var(--hive-brand-secondary)] [&>option:checked]:text-[var(--hive-background-primary)]",
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
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  allowClear?: boolean;
  onClear?: () => void;
  searchable?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    options,
    placeholder,
    error,
    success,
    helperText,
    label,
    required,
    allowClear,
    onClear,
    value,
    id,
    onValueChange,
    onChange,
    ...props 
  }, ref) => {
    const selectId = id || React.useId();
    const hasValue = Boolean(value);
    
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    
    const selectElement = (
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            selectVariants({ variant: computedVariant, size, radius }),
            "appearance-none cursor-pointer pr-10",
            className
          )}
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option: SelectOption) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hive-brand-secondary)] transition-colors duration-200">
          <ChevronDownIcon />
        </div>
        
        {/* Clear Button */}
        {allowClear && hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
            aria-label="Clear selection"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
    
    if (label || error || success || helperText) {
      return (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={selectId}
              className="text-sm font-medium text-[var(--hive-text-primary)]"
            >
              {label}
              {required && (
                <span className="ml-1 text-[var(--hive-status-error)]">*</span>
              )}
            </label>
          )}
          
          {/* Select */}
          {selectElement}
          
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
    
    return selectElement;
  }
);
Select.displayName = "Select";

// Multi-Select Component
export interface MultiSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelected?: number;
}

const MultiSelect = React.forwardRef<HTMLSelectElement, MultiSelectProps>(
  ({ value = [], onChange, maxSelected, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      
      if (maxSelected && selectedOptions.length > maxSelected) {
        return; // Don't allow selection beyond max
      }
      
      onChange?.(selectedOptions);
    };
    
    return (
      <Select
        ref={ref}
        value={value as unknown as string}
        onChange={handleChange}
        multiple
        className="min-h-20"
        {...props}
      />
    );
  }
);
MultiSelect.displayName = "MultiSelect";

// Native Select Group Component
export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md";
}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
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
SelectGroup.displayName = "SelectGroup";

// Select presets for common patterns
export const SelectPresets = {
  // Country Select
  Country: (props: Omit<SelectProps, 'options'>) => (
    <Select 
      options={[
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "mx", label: "Mexico" },
        { value: "uk", label: "United Kingdom" },
        { value: "de", label: "Germany" },
        { value: "fr", label: "France" },
      ]}
      placeholder="Select country"
      {...props} 
    />
  ),
  
  // Priority Select
  Priority: (props: Omit<SelectProps, 'options'>) => (
    <Select 
      options={[
        { value: "low", label: "Low Priority" },
        { value: "medium", label: "Medium Priority" },
        { value: "high", label: "High Priority" },
        { value: "urgent", label: "Urgent" },
      ]}
      placeholder="Select priority"
      {...props} 
    />
  ),
  
  // Status Select
  Status: (props: Omit<SelectProps, 'options'>) => (
    <Select 
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
        { value: "archived", label: "Archived" },
      ]}
      placeholder="Select status"
      {...props} 
    />
  ),
  
  // Size Select
  Size: (props: Omit<SelectProps, 'options'>) => (
    <Select 
      options={[
        { value: "xs", label: "Extra Small" },
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ]}
      placeholder="Select size"
      {...props} 
    />
  ),
};

// Simple icons using semantic approach
const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="drop-shadow-sm">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClearIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export { 
  Select, 
  Select as SelectEnhanced,
  MultiSelect,
  SelectGroup, 
  selectVariants 
};

export type { SelectOption as SelectOptionEnhanced };