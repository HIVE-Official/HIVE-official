'use client';

import React from 'react';
import { cn } from '../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'none';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  fluid?: boolean;
  breakout?: boolean;
  variant?: 'default' | 'card' | 'panel' | 'section';
  gutter?: boolean;
  children: React.ReactNode;
}

// Max width variants based on Tailwind responsive breakpoints
const maxWidthVariants = {
  xs: 'max-w-xs',      // 320px
  sm: 'max-w-sm',      // 384px
  md: 'max-w-md',      // 448px
  lg: 'max-w-lg',      // 512px
  xl: 'max-w-xl',      // 576px
  '2xl': 'max-w-2xl',  // 672px
  '3xl': 'max-w-3xl',  // 768px
  '4xl': 'max-w-4xl',  // 896px
  '5xl': 'max-w-5xl',  // 1024px
  '6xl': 'max-w-6xl',  // 1152px
  '7xl': 'max-w-7xl',  // 1280px
  full: 'max-w-full',
  none: 'max-w-none'
};

// Padding variants using HIVE spacing scale
const paddingVariants = {
  none: '',
  xs: 'p-2',      // 2
  sm: 'p-4',      // 16px
  md: 'p-6',      // 24px
  lg: 'p-8',      // 32px
  xl: 'p-12'      // 48px
};

// Responsive padding with gutters
const gutterPadding = {
  none: '',
  xs: 'px-2',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 md:px-8',
  lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
  xl: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
};

// Container variants for different use cases
const containerVariants = {
  default: '',
  card: [
    'bg-[var(--hive-background-secondary)]',
    'border border-[var(--hive-border-primary)]',
    'rounded-xl',
    'shadow-sm'
  ].join(' '),
  panel: [
    'bg-[var(--hive-background-primary)]',
    'border border-[var(--hive-border-primary)]',
    'rounded-lg'
  ].join(' '),
  section: [
    'bg-[var(--hive-background-tertiary)]',
    'border-y border-[var(--hive-border-tertiary)]'
  ].join(' ')
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
  maxWidth = '7xl',
  padding = 'md',
  center = true,
  fluid = false,
  breakout = false,
  variant = 'default',
  gutter = false,
  className,
  children,
  ...props
}, ref) => {
  const baseClasses = [
    // Container basics
    'w-full',
    
    // Max width (unless fluid or breakout)
    !fluid && !breakout && maxWidthVariants[maxWidth],
    
    // Centering
    center && 'mx-auto',
    
    // Padding
    gutter 
      ? gutterPadding[padding]
      : paddingVariants[padding],
    
    // Fluid behavior
    fluid && 'min-w-full',
    
    // Breakout behavior (extends beyond normal constraints)
    breakout && [
      'relative',
      'left-1/2',
      'right-1/2',
      '-ml-[50vw]',
      '-mr-[50vw]',
      'w-screen',
      'max-w-none'
    ].join(' '),
    
    // Variant styles
    containerVariants[variant]
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cn(baseClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Convenient preset components
export const PageContainer: React.FC<Omit<ContainerProps, 'maxWidth' | 'gutter'>> = (props) => (
  <Container maxWidth="7xl" gutter {...props} />
);

export const ContentContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="4xl" {...props} />
);

export const NarrowContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="2xl" {...props} />
);

export const WideContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="6xl" {...props} />
);

export const FluidContainer: React.FC<Omit<ContainerProps, 'fluid'>> = (props) => (
  <Container fluid {...props} />
);

export const CardContainer: React.FC<Omit<ContainerProps, 'variant'>> = (props) => (
  <Container variant="card" {...props} />
);

export const PanelContainer: React.FC<Omit<ContainerProps, 'variant'>> = (props) => (
  <Container variant="panel" {...props} />
);

export const SectionContainer: React.FC<Omit<ContainerProps, 'variant'>> = (props) => (
  <Container variant="section" {...props} />
);

export const BreakoutContainer: React.FC<Omit<ContainerProps, 'breakout'>> = (props) => (
  <Container breakout {...props} />
);

// Size-specific containers
export const SmallContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="sm" {...props} />
);

export const MediumContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="md" {...props} />
);

export const LargeContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="lg" {...props} />
);

export const ExtraLargeContainer: React.FC<Omit<ContainerProps, 'maxWidth'>> = (props) => (
  <Container maxWidth="xl" {...props} />
);

// Layout composition helpers
export const CenteredContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <Container maxWidth="4xl" center padding="lg" className={className}>
    {children}
  </Container>
);

export const FullWidthSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <Container fluid variant="section" padding="xl" className={className}>
    <Container maxWidth="7xl" center padding="none">
      {children}
    </Container>
  </Container>
);