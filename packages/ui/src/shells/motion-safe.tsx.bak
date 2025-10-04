'use client';

import React from 'react';
import { motion, type MotionProps } from 'framer-motion';

// Type helper to extract only HTML props from motion props
type ExtractHTMLProps<T extends React.HTMLProps<HTMLElement>> = Omit<T, keyof MotionProps>;

// Safe motion components that handle SSR properly
export const MotionDiv = React.forwardRef<
  HTMLDivElement,
  MotionProps & React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain div
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <div ref={ref} {...(rest as ExtractHTMLProps<React.HTMLProps<HTMLDivElement>>)} />;
  }
  // Client-side: return motion div
  return <motion.div ref={ref} {...props} />;
});

MotionDiv.displayName = 'MotionDiv';

export const MotionSpan = React.forwardRef<
  HTMLSpanElement,
  MotionProps & React.HTMLProps<HTMLSpanElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain span
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <span ref={ref} {...(rest as ExtractHTMLProps<React.HTMLProps<HTMLSpanElement>>)} />;
  }
  // Client-side: return motion span
  return <motion.span ref={ref} {...props} />;
});

MotionSpan.displayName = 'MotionSpan';

export const MotionButton = React.forwardRef<
  HTMLButtonElement,
  MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain button
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <button ref={ref} {...(rest as ExtractHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>>)} />;
  }
  // Client-side: return motion button
  return <motion.button ref={ref} {...props} />;
});

MotionButton.displayName = 'MotionButton';

// Motion link component
export const MotionLink = React.forwardRef<
  HTMLAnchorElement,
  MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain anchor
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <a ref={ref} {...(rest as ExtractHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>)} />;
  }
  // Client-side: return motion anchor
  return <motion.a ref={ref} {...props} />;
});

MotionLink.displayName = 'MotionLink';

// Motion nav component
export const MotionNav = React.forwardRef<
  HTMLElement,
  MotionProps & React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain nav
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <nav ref={ref} {...(rest as ExtractHTMLProps<React.HTMLAttributes<HTMLElement>>)} />;
  }
  // Client-side: return motion nav
  return <motion.nav ref={ref} {...props} />;
});

MotionNav.displayName = 'MotionNav';

// Motion aside component
export const MotionAside = React.forwardRef<
  HTMLElement,
  MotionProps & React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  if (typeof window === 'undefined') {
    // Server-side: return a plain aside
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return <aside ref={ref} {...(rest as ExtractHTMLProps<React.HTMLAttributes<HTMLElement>>)} />;
  }
  // Client-side: return motion aside
  return <motion.aside ref={ref} {...props} />;
});

MotionAside.displayName = 'MotionAside';

// Re-export AnimatePresence as-is since it handles SSR internally
export { AnimatePresence } from 'framer-motion';