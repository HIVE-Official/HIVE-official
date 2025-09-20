"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { StackConfigSchema } from '@hive/core';
import { z } from 'zod';

// Extract the config type from the schema
type StackConfig = z.infer<typeof StackConfigSchema>;

interface StackProps {
  config: StackConfig;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties
}

export const Stack: React.FC<StackProps> = ({
  config,
  children,
  className,
  style
}) => {
  const {
    direction = 'vertical',
    spacing = 8,
    alignment = 'start',
    wrap = false,
    style: configStyle
  } = config;

  // Convert spacing to CSS units (assuming spacing is in spacing tokens)
  const spacingValue = `${spacing * 0.25}rem`; // 1 base unit (spacing * 0.25rem)

  // Direction classes
  const directionClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row'
  };

  // Alignment classes based on direction
  const alignmentClasses = {
    start: direction === 'vertical' ? 'items-start' : 'justify-start',
    center: direction === 'vertical' ? 'items-center' : 'justify-center',
    end: direction === 'vertical' ? 'items-end' : 'justify-end',
    stretch: direction === 'vertical' ? 'items-stretch' : 'justify-stretch'
  };

  // Cross-axis alignment (opposite of main direction)
  const crossAxisAlignmentClasses = {
    start: direction === 'vertical' ? 'justify-start' : 'items-start',
    center: direction === 'vertical' ? 'justify-center' : 'items-center',
    end: direction === 'vertical' ? 'justify-end' : 'items-end',
    stretch: direction === 'vertical' ? 'justify-stretch' : 'items-stretch'
  };

  // Wrap classes
  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap';

  // Convert children to array for processing
  const childArray = React.Children.toArray(children);

  // Animation variants for staggered children
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'vertical' ? 20 : 0,
      x: direction === 'horizontal' ? 20 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        // Base flex container using HIVE design system
        "flex",
        directionClasses[direction],
        alignmentClasses[alignment],
        crossAxisAlignmentClasses[alignment],
        wrapClasses,
        
        // HIVE design system integration
        "transition-all duration-300 ease-out",
        
        className
      )}
      style={{
        // Dynamic spacing using CSS custom properties
        gap: spacingValue,
        
        // Apply style configuration from config
        ...(configStyle?.backgroundColor && {
          backgroundColor: configStyle.backgroundColor
        }),
        ...(configStyle?.padding && {
          padding: `${configStyle.padding * 0.25}rem`
        }),
        ...(configStyle?.margin && {
          margin: `${configStyle.margin * 0.25}rem`
        }),
        ...(configStyle?.borderRadius && {
          borderRadius: `${configStyle.borderRadius}px`
        }),
        ...(configStyle?.borderWidth && configStyle?.borderColor && {
          border: `${configStyle.borderWidth}px solid ${configStyle.borderColor}`
        }),
        ...(configStyle?.width && {
          width: typeof configStyle.width === 'number' 
            ? `${configStyle.width}px` 
            : configStyle.width
        }),
        ...(configStyle?.height && {
          height: typeof configStyle.height === 'number' 
            ? `${configStyle.height}px` 
            : configStyle.height
        }),
        
        // Additional inline styles
        ...style
          })}
    >
      {childArray.map((child, index) => {
        // Don't animate if child is not a valid React element
        if (!React.isValidElement(child)) {
          return child
        }

        return (
          <motion.div
            key={index}
            variants={childVariants}
            className={cn(
              // Stack item base styles
              "flex-shrink-0",
              
              // Handle stretch alignment for children
              alignment === 'stretch' && direction === 'vertical' && "w-full",
              alignment === 'stretch' && direction === 'horizontal' && "h-full"
            )}
          >
            {child}
          </motion.div>
        )
          })}
    </motion.div>
  )
};

// Stack.Item component for better composition
interface StackItemProps {
  children: React.ReactNode;
  grow?: boolean;
  shrink?: boolean;
  basis?: string | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  style?: React.CSSProperties
}

export const StackItem: React.FC<StackItemProps> = ({
  children,
  grow = false,
  shrink = true,
  basis = 'auto',
  align,
  className,
  style
}) => {
  // Convert numeric basis to rem units
  const flexBasis = typeof basis === 'number' ? `${basis * 0.25}rem` : basis;

  // Alignment classes for individual items
  const alignClasses = {
    start: 'self-start',
    center: 'self-center',
    end: 'self-end',
    stretch: 'self-stretch'
  };

  return (
    <div
      className={cn(
        // Default flex item behavior
        shrink ? 'flex-shrink' : 'flex-shrink-0',
        grow ? 'flex-grow' : 'flex-grow-0',
        
        // Individual alignment override
        align && alignClasses[align],
        
        className
      )}
      style={{
        flexBasis,
        ...style
          }}
    >
      {children}
    </div>
  )
};

// Compound component export
(Stack as any).Item = StackItem;

export default Stack;