"use client";

import React, { createContext, useContext, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// HIVE Tabs System - Atomic Design with Semantic Tokens
// Full compatibility with existing usage while using HIVE design system

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
};

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg p-1 text-[var(--hive-text-secondary)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)]",
        ghost: "bg-transparent",
        underline: "bg-transparent border-b border-[var(--hive-border-default)]",
        pills: "bg-[var(--hive-background-tertiary)] gap-1",
      },
      size: {
        sm: "h-8 text-sm",
        default: "h-10 text-sm",
        lg: "h-12 text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 font-medium ring-offset-[var(--hive-background-primary)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-[var(--hive-background-secondary)] data-[state=active]:text-[var(--hive-text-primary)] data-[state=active]:shadow-sm hover:bg-[var(--hive-interactive-hover)]",
        ghost: "data-[state=active]:text-[var(--hive-brand-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]",
        underline: "rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--hive-brand-secondary)] data-[state=active]:text-[var(--hive-brand-secondary)] hover:text-[var(--hive-text-primary)]",
        pills: "rounded-full data-[state=active]:bg-[var(--hive-brand-secondary)] data-[state=active]:text-[var(--hive-brand-on-secondary)] hover:bg-[var(--hive-interactive-hover)]",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface TabsProps extends VariantProps<typeof tabsListVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
};

interface TabsListProps extends VariantProps<typeof tabsListVariants> {
  children: React.ReactNode;
  className?: string
}

export const TabsList: React.FC<TabsListProps> = ({ 
  children, 
  className,
  variant = "default",
  size = "default"
}) => {
  return (
    <div className={cn(tabsListVariants({ variant, size }), className)}>
      {children}
    </div>
  )
};

interface TabsTriggerProps extends VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
  disabled = false,
  variant = "default",
  size = "default",
}) => {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      disabled={disabled}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(tabsTriggerVariants({ variant, size }), className)}
    >
      {children}
    </button>
  )
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { value: activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null
  }

  return (
    <div
      className={cn(
        "mt-2 ring-offset-[var(--hive-background-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)] focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  )
};

export { tabsListVariants, tabsTriggerVariants };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };