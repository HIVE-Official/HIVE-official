"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    /** Size variant for the tabs */
    size?: "sm" | "md" | "lg";
    /** Visual style variant */
    variant?: "default" | "pills" | "underline";
  }
>(({ className, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const variantClasses = {
    default:
      "inline-flex items-center justify-center rounded-lg bg-white/5 p-1 text-text-muted",
    pills: "inline-flex items-center justify-center gap-2 p-1 text-text-muted",
    underline:
      "inline-flex items-center justify-center border-b border-white/8 text-text-muted",
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    /** Size variant for the trigger */
    size?: "sm" | "md" | "lg";
    /** Visual style variant */
    variant?: "default" | "pills" | "underline";
  }
>(({ className, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-7 px-3 text-xs",
    md: "h-8 px-4 text-sm",
    lg: "h-10 px-6 text-base",
  };

  const variantClasses = {
    default: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
      "disabled:pointer-events-none disabled:opacity-50",
      "hover:text-white",
      "data-[state=active]:bg-white data-[state=active]:text-bg-canvas data-[state=active]:shadow-sm"
    ),
    pills: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
      "disabled:pointer-events-none disabled:opacity-50",
      "hover:text-white hover:bg-white/10",
      "data-[state=active]:bg-accent-gold data-[state=active]:text-bg-canvas data-[state=active]:shadow-sm"
    ),
    underline: cn(
      "inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent font-medium transition-all duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
      "disabled:pointer-events-none disabled:opacity-50",
      "hover:text-white",
      "data-[state=active]:border-accent-gold data-[state=active]:text-white"
    ),
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 ring-offset-bg-canvas transition-all duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
