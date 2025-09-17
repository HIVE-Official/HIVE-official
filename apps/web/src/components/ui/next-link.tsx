import React from 'react';
import NextLink from 'next/link';
import { LinkProps } from '@hive/ui';

/**
 * Next.js-specific Link component that wraps next/link
 * while maintaining compatibility with the UI package's Link interface
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <NextLink href={href} className={className} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'NextLink'; 