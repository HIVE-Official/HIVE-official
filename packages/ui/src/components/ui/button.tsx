'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// HIVE Button System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage

const buttonVariants = cva(
  // Base styles using semantic tokens only
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary brand button - GOLD OUTLINE ONLY (never fill)
        primary: [
          "border-2 border-[var(--hive-brand-secondary)]",
          "bg-transparent",
          "text-[var(--hive-brand-secondary)]", 
          "hover:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]",
          "hover:border-[var(--hive-brand-secondary)]",
          "active:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
        
        // Secondary outline button
        secondary: [
          "border border-[var(--hive-border-default)]",
          "bg-[var(--hive-background-secondary)]",
          "text-[var(--hive-text-primary)]",
          "hover:bg-[var(--hive-interactive-hover)]",
          "hover:border-[var(--hive-border-hover)]",
          "active:bg-[var(--hive-interactive-active)]",
        ],
        
        // Ghost button
        ghost: [
          "text-[var(--hive-text-primary)]",
          "hover:bg-[var(--hive-interactive-hover)]",
          "active:bg-[var(--hive-interactive-active)]",
        ],
        
        // Destructive button
        destructive: [
          "bg-[var(--hive-status-error)]",
          "text-[var(--hive-text-inverse)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-status-error)_90%,transparent)]",
          "active:bg-[color-mix(in_srgb,var(--hive-status-error)_80%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
        
        // Success button
        success: [
          "bg-[var(--hive-status-success)]",
          "text-[var(--hive-text-inverse)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-status-success)_90%,transparent)]",
          "active:bg-[color-mix(in_srgb,var(--hive-status-success)_80%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
        
        // Warning button
        warning: [
          "bg-[var(--hive-status-warning)]",
          "text-[var(--hive-background-primary)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-status-warning)_90%,transparent)]",
          "active:bg-[color-mix(in_srgb,var(--hive-status-warning)_80%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
        
        // Info button  
        info: [
          "bg-[var(--hive-status-info)]",
          "text-[var(--hive-text-inverse)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-status-info)_90%,transparent)]",
          "active:bg-[color-mix(in_srgb,var(--hive-status-info)_80%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
        
        // Link style button
        link: [
          "text-[var(--hive-brand-secondary)]",
          "underline-offset-4",
          "hover:underline",
          "hover:text-[color-mix(in_srgb,var(--hive-brand-secondary)_80%,transparent)]",
        ],
        
        // Accent button - GOLD OUTLINE VARIATION
        accent: [
          "border-2 border-[var(--hive-brand-secondary)]",
          "bg-[color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent)]",
          "text-[var(--hive-brand-secondary)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)]",
          "hover:border-[var(--hive-brand-secondary)]",
          "active:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_25%,transparent)]",
          "shadow-sm hover:shadow-md",
        ],
      },
      
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-sm", 
        default: "h-10 px-6 text-sm",
        md: "h-10 px-6 text-sm", // Alias for default
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-base",
        icon: "h-10 w-10",
      },
      
      radius: {
        none: "rounded-none",
        sm: "rounded-sm", 
        default: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      
      loading: {
        true: "cursor-not-allowed",
        false: "",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default", 
      radius: "default",
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    loading = false,
    leftIcon,
    rightIcon,
    asChild = false, 
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, loading }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size={size} />
            {children && <span className="opacity-70">{children}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: VariantProps<typeof buttonVariants>["size"];
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "default" }) => {
  const spinnerSize = {
    xs: "h-3 w-3",
    sm: "h-3 w-3", 
    default: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-5 w-5",
    icon: "h-4 w-4",
  };

  return (
    <svg
      className={cn("animate-spin", spinnerSize[size || "default"])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Button Group Component
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", spacing = "sm", children, ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
      md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row items-center" : "flex-col items-stretch",
          spacingClasses[spacing],
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

// Icon Button Component
export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: React.ReactNode;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = "icon", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("shrink-0", className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

// Button presets for common patterns
export const ButtonPresets = {
  // Primary CTA
  PrimaryCTA: (props: Omit<ButtonProps, 'variant' | 'size'>) => (
    <Button variant="primary" size="lg" {...props} />
  ),
  
  // Secondary Action
  SecondaryAction: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="secondary" {...props} />
  ),
  
  // Destructive Action (Delete, Remove, etc.)
  DestructiveAction: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="destructive" {...props} />
  ),
  
  // Success Action (Save, Submit, etc.)
  SuccessAction: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="success" {...props} />
  ),
  
  // Ghost Menu Item
  MenuItem: (props: Omit<ButtonProps, 'variant' | 'size'>) => (
    <Button variant="ghost" size="sm" {...props} />
  ),
  
  // Link Button
  TextLink: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="link" {...props} />
  ),
  
  // Close Button
  CloseButton: (props: Omit<IconButtonProps, 'variant' | 'icon'>) => (
    <IconButton 
      variant="ghost" 
      icon={<CloseIcon />}
      {...props}
      aria-label={props['aria-label'] || "Close"}
    />
  ),
};

// Simple Close Icon (using semantic approach)
const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export { Button, Button as ButtonEnhanced, ButtonGroup, IconButton, buttonVariants };