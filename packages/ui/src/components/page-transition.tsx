'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hiveVariants } from '../lib/motion';
import { useAdaptiveMotion } from '../lib/adaptive-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  layoutId?: string;
  transition?: 'fade' | 'slide' | 'scale' | 'ritual';
  context?: 'academic' | 'social' | 'ritual' | 'navigation';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
  layoutId,
  transition = 'fade',
  context = 'navigation',
}) => {
  const { variants: _variants } = useAdaptiveMotion(context);

  const getTransitionVariant = () => {
    switch (transition) {
      case 'slide':
        return hiveVariants.slideUp;
      case 'scale':
        return hiveVariants.scaleIn;
      case 'ritual':
        return _variants.ritual;
      case 'fade':
      default:
        return hiveVariants.fadeIn;
    }
  };

  return (
    <motion.div
      className={className}
      layoutId={layoutId}
      variants={getTransitionVariant()}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
};

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  context?: 'academic' | 'social' | 'ritual' | 'navigation';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  stagger = true,
  context = 'navigation',
}) => {
  const { variants: _variants } = useAdaptiveMotion(context);

  return (
    <motion.div
      className={className}
      variants={stagger ? hiveVariants.container : hiveVariants.fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
};

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <motion.section
      className={className}
      variants={hiveVariants.item}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
};

interface RouteTransitionProps {
  children: React.ReactNode;
  routeKey: string;
  className?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  routeKey,
  className,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        className={className}
        variants={hiveVariants.fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Higher-order component for page animations
export function withPageTransition<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  options: Partial<PageTransitionProps> = {}
) {
  const WrappedComponent = React.forwardRef<HTMLElement, P>((props, _ref) => (
    <PageTransition {...options}>
      <Component {...(props as P)} />
    </PageTransition>
  ));

  WrappedComponent.displayName = `withPageTransition(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

export default PageTransition;