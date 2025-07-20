/**
 * HIVE Unified Card System Architecture
 * 
 * This system provides a consistent foundation for all card components,
 * ensuring design token consistency, unified APIs, and cohesive interactions.
 */

"use client";

import React from 'react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';

// ============================================================================
// UNIFIED CARD SYSTEM ARCHITECTURE
// ============================================================================

/**
 * Base card variants following HIVE design system
 * All cards inherit from this foundation
 */
const hiveCardBaseVariants = cva(
  "relative overflow-hidden transition-all duration-300 will-change-transform backface-visibility-hidden",
  {
    variants: {
      // Visual hierarchy variants
      variant: {
        default: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)]",
        elevated: "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]",
        minimal: "bg-transparent border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)]",
        premium: "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] to-[var(--hive-background-secondary)] border-[var(--hive-border-gold)] hover:border-[var(--hive-border-gold-strong)]",
        
        // Status variants
        active: "bg-[var(--hive-background-secondary)] border-[var(--hive-status-success)] hover:border-[var(--hive-status-success)]",
        warning: "bg-[var(--hive-background-secondary)] border-[var(--hive-status-warning)] hover:border-[var(--hive-status-warning)]",
        error: "bg-[var(--hive-background-secondary)] border-[var(--hive-status-error)] hover:border-[var(--hive-status-error)]",
        
        // Interactive variants
        interactive: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-gold-subtle)] cursor-pointer",
        selected: "bg-[var(--hive-overlay-gold-subtle)] border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]",
        
        // Content-specific variants
        academic: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-status-info)]",
        social: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-status-success)]",
        builder: "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] to-[var(--hive-background-secondary)] border-[var(--hive-border-gold)]",
      },
      
      // Size variants
      size: {
        sm: "p-4 rounded-xl",
        default: "p-6 rounded-2xl",
        lg: "p-8 rounded-2xl",
        xl: "p-10 rounded-3xl",
      },
      
      // Shadow variants
      shadow: {
        none: "shadow-none",
        subtle: "shadow-[var(--hive-shadow-level1)]",
        medium: "shadow-[var(--hive-shadow-level2)]",
        strong: "shadow-[var(--hive-shadow-level3)]",
        dramatic: "shadow-[var(--hive-shadow-level4)]",
        glow: "shadow-[var(--hive-shadow-gold-glow)]",
      },
      
      // Border variants
      border: {
        none: "border-0",
        subtle: "border border-[var(--hive-border-subtle)]",
        default: "border border-[var(--hive-border-primary)]",
        strong: "border-2 border-[var(--hive-border-primary)]",
        gold: "border border-[var(--hive-border-gold)]",
        "gold-strong": "border-2 border-[var(--hive-border-gold-strong)]",
      },
      
      // Motion variants
      motionType: {
        none: "",
        subtle: "hover:scale-[1.01] hover:translate-y-[-1px]",
        medium: "hover:scale-[1.02] hover:translate-y-[-2px]",
        strong: "hover:scale-[1.03] hover:translate-y-[-4px]",
        magnetic: "hover:scale-[1.02] hover:translate-y-[-2px]", // Enhanced by magnetic component
      },
      
      // Glass morphism variants
      glass: {
        none: "",
        subtle: "backdrop-blur-sm bg-[var(--hive-overlay-glass)]",
        medium: "backdrop-blur-md bg-[var(--hive-overlay-glass-medium)]",
        strong: "backdrop-blur-lg bg-[var(--hive-overlay-glass-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "subtle",
      border: "subtle",
      motionType: "subtle",
      glass: "none",
    },
  }
);

/**
 * Unified motion configurations for all cards
 */
const cardMotionConfig = {
  subtle: {
    whileHover: { scale: 1.01, y: -1 },
    whileTap: { scale: 0.99 },
    transition: { duration: motionDurations.quick, ease: liquidMetal.easing },
  },
  medium: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: motionDurations.smooth, ease: liquidMetal.easing },
  },
  strong: {
    whileHover: { scale: 1.03, y: -4 },
    whileTap: { scale: 0.97 },
    transition: { duration: motionDurations.smooth, ease: liquidMetal.easing },
  },
  magnetic: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: motionDurations.quick, ease: liquidMetal.easing },
  },
  none: {},
};

/**
 * Entrance animation configurations
 */
const entranceAnimations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: motionDurations.smooth },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: motionDurations.smooth, ease: liquidMetal.easing },
  },
  cascade: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: motionDurations.smooth,
      delay: index * 0.1,
      ease: liquidMetal.easing,
    },
  }),
  liquidMetal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: motionDurations.flowing,
      ease: liquidMetal.easing,
    },
  },
};

// ============================================================================
// UNIFIED CARD INTERFACES
// ============================================================================

/**
 * Base props that all cards should inherit from
 */
export interface HiveCardBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof hiveCardBaseVariants> {
  className?: string;
  
  // Interactive behavior
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  
  // Motion configuration
  magneticHover?: boolean;
  magneticIntensity?: number;
  animateEntrance?: 'fade' | 'slideUp' | 'cascade' | 'liquidMetal' | false;
  cascadeIndex?: number;
  
  // Visual enhancements
  goldAccent?: boolean;
  glowEffect?: boolean;
  
  // Accessibility
  role?: string;
  'aria-label'?: string;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
}

/**
 * Extended props for structured cards
 */
export interface HiveStructuredCardProps extends Omit<HiveCardBaseProps, 'title' | 'content'> {
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Props for entity-specific cards (courses, spaces, users, etc.)
 */
export interface HiveEntityCardProps extends HiveCardBaseProps {
  entity: {
    id: string;
    type: 'course' | 'space' | 'user' | 'tool' | 'project';
    name: string;
    description?: string;
    image?: string;
    status?: 'active' | 'inactive' | 'pending';
    metadata?: Record<string, any>;
  };
  
  // Entity-specific actions
  onEntityAction?: (action: string, entityId: string) => void;
  entityActions?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
  
  // Display configuration
  showStatus?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
}

// ============================================================================
// UNIFIED CARD UTILITIES
// ============================================================================

/**
 * Utility to generate consistent card animations
 */
export const createCardAnimation = (
  motionType: 'subtle' | 'medium' | 'strong' | 'magnetic' | 'none',
  entrance?: 'fade' | 'slideUp' | 'cascade' | 'liquidMetal' | false,
  cascadeIndex?: number
): MotionProps => {
  const motionProps = cardMotionConfig[motionType];
  
  if (!entrance) {
    return motionProps;
  }
  
  const entranceProps = entrance === 'cascade' 
    ? entranceAnimations.cascade(cascadeIndex || 0)
    : entranceAnimations[entrance];
  
  return {
    ...motionProps,
    ...entranceProps,
  };
};

/**
 * Utility to generate consistent card variants
 */
export const createCardVariant = (
  baseVariant: string,
  entity?: { type: string; status?: string },
  interactive?: boolean,
  selected?: boolean
): string => {
  if (selected) return 'selected';
  if (interactive) return 'interactive';
  
  if (entity) {
    switch (entity.type) {
      case 'course':
        return 'academic';
      case 'space':
        return entity.status === 'active' ? 'social' : 'default';
      case 'tool':
      case 'project':
        return 'builder';
      default:
        return baseVariant;
    }
  }
  
  return baseVariant;
};

/**
 * Utility to generate consistent card styles
 */
export const createCardStyles = ({
  variant,
  size,
  shadow,
  border,
  motionType,
  glass,
  goldAccent,
  glowEffect,
  className,
}: HiveCardBaseProps & { className?: string; motionType?: string }) => {
  return cn(
    hiveCardBaseVariants({ variant, size, shadow, border, motionType, glass }),
    goldAccent && "ring-1 ring-[var(--hive-border-gold)]/30",
    glowEffect && "shadow-[var(--hive-shadow-gold-glow)]",
    className
  );
};

// ============================================================================
// UNIFIED CARD COMPONENTS
// ============================================================================

/**
 * Base card component that all other cards inherit from
 */
const HiveCardBase = React.forwardRef<HTMLDivElement, HiveCardBaseProps>(
  ({ 
    className,
    variant,
    size,
    shadow,
    border,
    motionType = 'subtle',
    glass,
    interactive = false,
    selected = false,
    disabled = false,
    loading = false,
    magneticHover = false,
    magneticIntensity = 1,
    animateEntrance = false,
    cascadeIndex = 0,
    goldAccent = false,
    glowEffect = false,
    children,
    onClick,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onDrop: _onDrop,
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    ...domProps
  }, ref) => {
    
    // Generate dynamic variant based on state
    const dynamicVariant = createCardVariant(variant || 'default', undefined, interactive, selected);
    
    // Generate animation props
    const animationProps = createCardAnimation(motionType, animateEntrance, cascadeIndex);
    
    // Generate styles
    const cardStyles = createCardStyles({
      variant: dynamicVariant as any,
      size,
      shadow,
      border,
      motionType,
      glass,
      goldAccent,
      glowEffect,
      className,
    });
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          cardStyles,
          disabled && "opacity-50 cursor-not-allowed",
          loading && "animate-pulse",
          interactive && "cursor-pointer"
        )}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled}
        aria-selected={selected}
        {...animationProps}
        {...domProps}
      >
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-[var(--hive-overlay-glass)] rounded"></div>
            <div className="h-4 bg-[var(--hive-overlay-glass)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--hive-overlay-glass)] rounded w-1/2"></div>
          </div>
        ) : (
          children
        )}
      </motion.div>
    );
  }
);

HiveCardBase.displayName = "HiveCardBase";

export {
  HiveCardBase,
  hiveCardBaseVariants,
  cardMotionConfig,
  entranceAnimations,
};