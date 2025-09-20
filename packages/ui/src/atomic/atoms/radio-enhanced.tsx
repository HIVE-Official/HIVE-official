'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// HIVE Radio System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const radioVariants = cva(
  // Hidden native input
  "peer sr-only"
);

const radioIndicatorVariants = cva(
  // Custom radio button styling
  "relative flex items-center justify-center aspect-square shrink-0 rounded-full border-2 bg-[var(--hive-background-secondary)] transition-all duration-200 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:border-[var(--hive-brand-secondary)] peer-checked:border-[var(--hive-brand-secondary)] peer-checked:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      },
      
      variant: {
        default: "border-[var(--hive-border-default)] peer-checked:border-[var(--hive-brand-secondary)]",
        success: "border-[var(--hive-status-success)] peer-checked:border-[var(--hive-status-success)]",
        error: "border-[var(--hive-status-error)] peer-checked:border-[var(--hive-status-error)]",
        warning: "border-[var(--hive-status-warning)] peer-checked:border-[var(--hive-status-warning)]",
        info: "border-[var(--hive-status-info)] peer-checked:border-[var(--hive-status-info)]",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const radioLabelVariants = cva(
  "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      color: {
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        tertiary: "text-[var(--hive-text-tertiary)]",
        error: "text-[var(--hive-status-error)]",
        success: "text-[var(--hive-status-success)]",
        warning: "text-[var(--hive-status-warning)]",
        info: "text-[var(--hive-status-info)]",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      }
    },
    defaultVariants: {
      color: "primary",
      weight: "normal",
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioIndicatorVariants> {
  label?: string;
  description?: string;
  error?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement> & 
    VariantProps<typeof radioLabelVariants>;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    size, 
    variant,
    label,
    description,
    error,
    labelProps,
    checked,
    id,
    ...props 
  }, ref) => {
    const radioId = id || React.useId();
    
    const radioElement = (
      <div className="relative flex items-center">
        <input
          type="radio"
          id={radioId}
          className={cn(radioVariants(), className)}
          ref={ref}
          checked={checked}
          {...props}
        />
        
        {/* Custom Radio Visual */}
        <div className={cn(radioIndicatorVariants({ size, variant }))}>
          {/* Radio Inner Circle - shows when checked */}
          <div className={cn(
            "rounded-full transition-all duration-200",
            checked ? "opacity-100 scale-100" : "opacity-0 scale-0",
            // Size based on parent
            size === "sm" && "h-1.5 w-1.5",
            size === "default" && "h-2 w-2", 
            size === "lg" && "h-2.5 w-2.5",
            size === "xl" && "h-3 w-3",
            // Color based on variant
            variant === "default" && "bg-[var(--hive-brand-secondary)]",
            variant === "success" && "bg-[var(--hive-status-success)]",
            variant === "error" && "bg-[var(--hive-status-error)]",
            variant === "warning" && "bg-[var(--hive-status-warning)]",
            variant === "info" && "bg-[var(--hive-status-info)]"
          )} />
        </div>
      </div>
    );
    
    if (label || description || error) {
      return (
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            {radioElement}
            
            <div className="flex-1 space-y-1">
              {label && (
                <label 
                  htmlFor={radioId}
                  className={cn(
                    radioLabelVariants({
                      color: labelProps?.color,
                      weight: labelProps?.weight
                    }),
                    "cursor-pointer",
                    labelProps?.className
                  )}
                  {...(labelProps && Object.fromEntries(
                    Object.entries(labelProps).filter(([key]) => 
                      !['color', 'weight', 'className'].includes(key)
                    )
                  ))}
                >
                  {label}
                </label>
              )}
              
              {description && (
                <p className="text-xs text-[var(--hive-text-tertiary)] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-xs text-[var(--hive-status-error)] ml-8">
              {error}
            </p>
          )}
        </div>
      );
    }
    
    return radioElement;
  }
);
Radio.displayName = "Radio";

// Radio Group Component
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    name,
    value,
    onChange,
    orientation = "vertical", 
    spacing = "md",
    label,
    description,
    error,
    required,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const groupId = React.useId();
    
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "space-x-4" : "space-y-2",
      md: orientation === "horizontal" ? "space-x-6" : "space-y-3",
      lg: orientation === "horizontal" ? "space-x-8" : "space-y-4",
    };
    
    // Handle radio change
    const handleRadioChange = (radioValue: string) => {
      onChange?.(radioValue);
    };
    
    // Clone children and add necessary props
    const radioChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Radio) {
        return React.cloneElement(child as React.ReactElement<RadioProps>, {
          name,
          checked: child.props.value === value,
          onChange: () => handleRadioChange(child.props.value),
          disabled: disabled || child.props.disabled,
        });
      }
      return child;
    });
    
    return (
      <div className="space-y-2">
        {/* Group Label */}
        {label && (
          <label 
            htmlFor={groupId}
            className="text-sm font-medium text-[var(--hive-text-primary)]"
          >
            {label}
            {required && (
              <span className="ml-1 text-[var(--hive-status-error)]">*</span>
            )}
          </label>
        )}
        
        {/* Group Description */}
        {description && (
          <p className="text-xs text-[var(--hive-text-tertiary)]">
            {description}
          </p>
        )}
        
        {/* Radio Group */}
        <div
          ref={ref}
          id={groupId}
          className={cn(
            "flex",
            orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col",
            spacingClasses[spacing],
            className
          )}
          role="radiogroup"
          aria-labelledby={label ? groupId : undefined}
          aria-required={required}
          {...props}
        >
          {radioChildren}
        </div>
        
        {/* Group Error */}
        {error && (
          <p className="text-xs text-[var(--hive-status-error)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

// Radio Card Component - for enhanced selection experience
export interface RadioCardProps extends RadioProps {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  value: string;
}

const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ icon, badge, label, description, value, className, ...props }, ref) => {
    const radioId = React.useId();
    
    return (
      <label 
        htmlFor={radioId}
        className={cn(
        "relative flex cursor-pointer rounded-lg border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] has-[:checked]:border-[var(--hive-brand-secondary)] has-[:checked]:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]",
        className
      )}>
        <div className="flex items-start space-x-3 w-full">
          <Radio 
            ref={ref} 
            id={radioId}
            className="mt-0.5" 
            value={value}
            {...props} 
          />
          
          {icon && (
            <div className="flex-shrink-0 text-[var(--hive-text-secondary)]">
              {icon}
            </div>
          )}
          
          <div className="flex-1 space-y-1">
            {label && (
              <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                {label}
              </div>
            )}
            
            {description && (
              <div className="text-xs text-[var(--hive-text-tertiary)]">
                {description}
              </div>
            )}
          </div>
          
          {badge && (
            <div className="flex-shrink-0">
              {badge}
            </div>
          )}
        </div>
      </label>
    );
  }
);
RadioCard.displayName = "RadioCard";

// Radio presets for common patterns
export const RadioPresets = {
  // Payment Method
  PaymentMethod: ({ options, ...props }: { options: Array<{ value: string; label: string; icon?: React.ReactNode }> } & Omit<RadioGroupProps, 'children'>) => (
    <RadioGroup {...props}>
      {options.map((option) => (
        <RadioCard
          key={option.value}
          value={option.value}
          label={option.label}
          icon={option.icon}
        />
      ))}
    </RadioGroup>
  ),
  
  // Priority Level
  Priority: (props: Omit<RadioGroupProps, 'children'>) => (
    <RadioGroup {...props}>
      <Radio value="low" label="Low Priority" />
      <Radio value="medium" label="Medium Priority" />
      <Radio value="high" label="High Priority" />
      <Radio value="urgent" label="Urgent" />
    </RadioGroup>
  ),
  
  // Size Selection
  Size: (props: Omit<RadioGroupProps, 'children'>) => (
    <RadioGroup orientation="horizontal" {...props}>
      <Radio value="xs" label="XS" />
      <Radio value="sm" label="SM" />
      <Radio value="md" label="MD" />
      <Radio value="lg" label="LG" />
      <Radio value="xl" label="XL" />
    </RadioGroup>
  ),
  
  // Theme Selection
  Theme: (props: Omit<RadioGroupProps, 'children'>) => (
    <RadioGroup {...props}>
      <Radio value="light" label="Light Theme" description="Clean and bright interface" />
      <Radio value="dark" label="Dark Theme" description="Easy on the eyes" />
      <Radio value="auto" label="Auto" description="Matches system preference" />
    </RadioGroup>
  ),
};

export { 
  Radio, 
  RadioGroup,
  RadioCard, 
  radioVariants,
  radioIndicatorVariants 
};