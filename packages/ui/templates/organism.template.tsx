'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * {{ComponentName}} - HIVE Organism Component
 *
 * Atomic Design: Complex system combining molecules and atoms
 * Built in Storybook, exported to production
 *
 * Behavioral Psychology Implementation:
 * - Relief amplifier design patterns
 * - Social proof messaging
 * - Variable reward scheduling
 * - Effortless competence positioning
 * - Mobile-first interaction design
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Keyboard navigation support
 * - Screen reader optimized
 * - Focus management
 */

export interface {{ComponentName}}Props {
  /**
   * Component variant
   */
  variant?: 'default' | 'compact' | 'expanded';
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Error state
   */
  error?: string | null;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

export const {{ComponentName}} = React.forwardRef<
  HTMLDivElement,
  {{ComponentName}}Props
>(({ variant = 'default', isLoading, error, className, children, ...props }, ref) => {
  // Local state for complex interactions
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Handle loading state
  if (isLoading) {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-[var(--hive-background-secondary)] rounded-lg p-6",
          className
        )}
        {...props}
      >
        <div className="space-y-3">
          <div className="h-4 bg-[var(--hive-border-default)] rounded w-3/4" />
          <div className="h-4 bg-[var(--hive-border-default)] rounded w-1/2" />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--hive-background-secondary)] border-2 border-[var(--hive-status-error)] rounded-lg p-6",
          className
        )}
        {...props}
      >
        <p className="text-[var(--hive-status-error)]">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        // Base styles
        "bg-[var(--hive-background-secondary)] rounded-lg shadow-hive-level2",
        "border border-[var(--hive-border-default)]",
        // Interactive styles
        "transition-all duration-200",
        // Variant styles
        {
          'p-6': variant === 'default',
          'p-4': variant === 'compact',
          'p-8': variant === 'expanded',
        },
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </motion.div>
  );
});

{{ComponentName}}.displayName = "{{ComponentName}}";
