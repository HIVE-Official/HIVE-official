import * as React from 'react';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva('font-display font-semibold tracking-tight', {
  variants: {
    level: {
      1: 'text-h1',
      2: 'text-h2',
      3: 'text-lg font-medium',
      4: 'text-base font-medium',
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, ...props }, ref) => {
    const Comp = `h${level || 2}` as 'h1' | 'h2' | 'h3' | 'h4';
    return <Comp ref={ref} className={cn(headingVariants({ level }), className)} {...props} />;
  }
);
Heading.displayName = 'Heading';

const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn('text-body', className)} {...props} />;
});
Text.displayName = 'Text';

const Muted = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
    >(({ className, ...props }, ref) => {
    return <p ref={ref} className={cn('text-sm text-text-muted', className)} {...props} />;
});
Muted.displayName = 'Muted';


export { Heading, Text, Muted }; 
