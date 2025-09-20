'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// HIVE Switch System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const switchVariants = cva(
  // Base styles using semantic tokens only
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
      
      variant: {
        default: "data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
        success: "data-[state=checked]:bg-[var(--hive-status-success)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
        error: "data-[state=checked]:bg-[var(--hive-status-error)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
        warning: "data-[state=checked]:bg-[var(--hive-status-warning)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
        info: "data-[state=checked]:bg-[var(--hive-status-info)] data-[state=unchecked]:bg-[var(--hive-border-default)]",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-[var(--hive-background-primary)] shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
        xl: "h-7 w-7 data-[state=checked]:translate-x-7",
      }
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const switchLabelVariants = cva(
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

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
  labelPosition?: "left" | "right";
  showIcons?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement> & 
    VariantProps<typeof switchLabelVariants>;
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    size, 
    variant,
    label,
    description,
    error,
    labelPosition = "right",
    showIcons,
    checkedIcon,
    uncheckedIcon,
    labelProps,
    checked,
    onChange,
    onCheckedChange,
    id,
    ...props 
  }, ref) => {
    const switchId = id || React.useId();
    
    const switchElement = (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={switchId}
          className={cn(
            switchVariants({ size, variant }),
            "sr-only", // Hide the actual input
            className
          )}
          ref={ref}
          checked={checked}
          onChange={(e) => {
            onChange?.(e);
            onCheckedChange?.(e.target.checked)
          }}
          {...props}
        />
        
        {/* Switch Track */}
        <label 
          htmlFor={switchId}
          className={cn(
            switchVariants({ size, variant }),
            "relative cursor-pointer"
          )}
          data-state={checked ? "checked" : "unchecked"}
        >
          {/* Switch Thumb */}
          <span 
            className={cn(switchThumbVariants({ size }))}
            data-state={checked ? "checked" : "unchecked"}
          >
            {/* Icons inside thumb */}
            {showIcons && (
              <span className="absolute inset-0 flex items-center justify-center text-xs">
                {checked ? (checkedIcon || <CheckIcon />) : (uncheckedIcon || <XIcon />)}
              </span>
            )}
          </span>
        </label>
      </div>
    );
    
    const labelElement = (label || description) && (
      <div className="flex-1 space-y-1">
        {label && (
          <label 
            htmlFor={switchId}
            className={cn(
              switchLabelVariants({
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
    );
    
    if (label || description || error) {
      return (
        <div className="space-y-2">
          <div className={cn(
            "flex items-start space-x-3",
            labelPosition === "left" && "flex-row-reverse space-x-reverse"
          )}>
            {switchElement}
            {labelElement}
          </div>
          
          {/* Error Message */}
          {error && (
            <p className={cn(
              "text-xs text-[var(--hive-status-error)]",
              labelPosition === "left" ? "mr-14" : "ml-14"
            )}>
              {error}
            </p>
          )}
        </div>
      )
    }
    
    return switchElement
  }
);
Switch.displayName = "Switch";

// Switch Group Component
export interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: string
}

const SwitchGroup = React.forwardRef<HTMLDivElement, SwitchGroupProps>(
  ({ 
    className, 
    orientation = "vertical", 
    spacing = "md",
    label,
    description,
    error,
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
    
    return (
      <div className="space-y-2">
        {/* Group Label */}
        {label && (
          <label 
            htmlFor={groupId}
            className="text-sm font-medium text-[var(--hive-text-primary)]"
          >
            {label}
          </label>
        )}
        
        {/* Group Description */}
        {description && (
          <p className="text-xs text-[var(--hive-text-tertiary)]">
            {description}
          </p>
        )}
        
        {/* Switch Group */}
        <div
          ref={ref}
          id={groupId}
          className={cn(
            "flex",
            orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col",
            spacingClasses[spacing],
            className
          )}
          role="group"
          aria-labelledby={label ? groupId : undefined}
          {...props}
        >
          {children}
        </div>
        
        {/* Group Error */}
        {error && (
          <p className="text-xs text-[var(--hive-status-error)]">
            {error}
          </p>
        )}
      </div>
    )
  }
);
SwitchGroup.displayName = "SwitchGroup";

// Switch Card Component - for enhanced toggle experience
export interface SwitchCardProps extends SwitchProps {
  icon?: React.ReactNode;
  badge?: React.ReactNode
}

const SwitchCard = React.forwardRef<HTMLInputElement, SwitchCardProps>(
  ({ icon, badge, label, description, className, ...props }, ref) => {
    return (
      <div className={cn(
        "flex items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)]",
        className
      )}>
        <div className="flex items-start space-x-3 flex-1">
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
        
        <Switch 
          ref={ref} 
          labelPosition="left"
          className="ml-4"
          {...props} 
        />
      </div>
    )
  }
);
SwitchCard.displayName = "SwitchCard";

// Switch presets for common patterns
export const SwitchPresets = {
  // Notifications
  Notifications: (props: Omit<SwitchProps, 'label'>) => (
    <Switch 
      label="Enable notifications"
      description="Receive updates and alerts"
      {...props} 
    />
  ),
  
  // Dark Mode
  DarkMode: (props: Omit<SwitchProps, 'label' | 'showIcons'>) => (
    <Switch 
      label="Dark mode"
      description="Toggle between light and dark themes"
      showIcons
      checkedIcon={<MoonIcon />}
      uncheckedIcon={<SunIcon />}
      {...props} 
    />
  ),
  
  // Privacy
  Privacy: (props: Omit<SwitchProps, 'label'>) => (
    <Switch 
      label="Private profile"
      description="Hide your profile from search results"
      {...props} 
    />
  ),
  
  // Auto-save
  AutoSave: (props: Omit<SwitchProps, 'label'>) => (
    <Switch 
      label="Auto-save"
      description="Automatically save changes"
      size="sm"
      {...props} 
    />
  ),
};

// Icons using semantic approach
const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

export { 
  Switch, 
  SwitchGroup,
  SwitchCard, 
  switchVariants 
};