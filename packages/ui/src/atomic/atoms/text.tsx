'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 
    | 'display-2xl' | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm'
    | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm'
    | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs' | 'body-2xs';
  color?: 'primary' | 'secondary' | 'muted' | 'mutedLight' | 'mutedDark' | 'subtle' | 'gold' | 'ruby' | 'emerald' | string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  children: React.ReactNode;
  // Legacy props for compatibility
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
}

export const textVariants = {
  variant: {
    // Display Scale
    'display-2xl': 'text-display-2xl font-display font-bold leading-tight tracking-tight',
    'display-xl': 'text-display-xl font-display font-bold leading-tight tracking-tight',
    'display-lg': 'text-display-lg font-display font-bold leading-snug tracking-tight',
    'display-md': 'text-display-md font-display font-bold leading-snug tracking-normal',
    'display-sm': 'text-display-sm font-display font-semibold leading-normal tracking-normal',
    
    // Heading Scale
    'heading-xl': 'text-heading-xl font-sans font-semibold leading-normal',
    'heading-lg': 'text-heading-lg font-sans font-semibold leading-normal', 
    'heading-md': 'text-heading-md font-sans font-semibold leading-normal',
    'heading-sm': 'text-heading-sm font-sans font-medium leading-normal',
    
    // Body Scale
    'body-lg': 'text-body-lg font-sans font-normal leading-relaxed',
    'body-md': 'text-body-md font-sans font-normal leading-normal',
    'body-sm': 'text-body-sm font-sans font-normal leading-normal',
    'body-xs': 'text-body-xs font-sans font-normal leading-normal',
    'body-2xs': 'text-body-2xs font-sans font-normal leading-none'
  },
  color: {
    primary: 'text-[var(--hive-text-primary)]',
    secondary: 'text-[var(--hive-text-secondary)]', 
    muted: 'text-[var(--hive-text-muted)]',
    mutedLight: 'text-[var(--hive-text-tertiary)]',
    mutedDark: 'text-[var(--hive-text-quaternary)]',
    subtle: 'text-[var(--hive-text-tertiary)]',
    gold: 'text-[var(--hive-brand-secondary)]',
    ruby: 'text-[var(--hive-status-error)]',
    emerald: 'text-[var(--hive-status-success)]'
  },
  weight: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium', 
    semibold: 'font-semibold',
    bold: 'font-bold'
  },
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
};

// Map level prop to variant
const levelToVariant = {
  1: 'heading-xl',
  2: 'heading-lg',
  3: 'heading-md',
  4: 'heading-sm',
  5: 'body-lg',
  6: 'body-md'
};

// Map size prop to variant
const sizeToVariant = {
  'xs': 'body-xs',
  'sm': 'body-sm',
  'md': 'body-md',
  'lg': 'body-lg',
  'xl': 'heading-sm',
  '2xl': 'heading-md'
};

export const Text: React.FC<TextProps> = ({
  as = 'p',
  variant = 'body-md',
  color = 'primary',
  weight,
  align = 'left',
  truncate = false,
  className,
  children,
  level,
  size,
  ...props
}) => {
  // Handle legacy props
  const computedAs = level ? (`h${level}` as any) : as;
  const computedVariant = level 
    ? levelToVariant[level as keyof typeof levelToVariant] 
    : size 
    ? (sizeToVariant[size as keyof typeof sizeToVariant] || variant)
    : variant;
  
  const Component = computedAs;
  
  const baseClasses = [
    // Base typography
    textVariants.variant[computedVariant as keyof typeof textVariants.variant],
    textVariants.color[color as keyof typeof textVariants.color] || color,
    textVariants.align[align],
    
    // Weight override if specified
    weight && textVariants.weight[weight],
    
    // Truncation
    truncate && 'truncate',
    
    // Responsive text scaling for mobile
    variant.startsWith('display') && 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
    variant.startsWith('heading') && 'text-sm sm:text-base md:text-lg lg:text-xl'
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={cn(baseClasses, className)} 
      {...props}
    >
      {children}
    </Component>
  );
};