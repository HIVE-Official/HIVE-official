import React from 'react';
import { cn } from '../../lib/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Framework-agnostic Link component.
 * In Storybook: renders as anchor tag
 * In Next.js app: gets replaced with Next.js Link via provider pattern
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn('text-current', className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link'; 