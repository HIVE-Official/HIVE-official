import React from 'react';
import { cn } from '../lib/utils';

export interface HiveTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'ghost' | 'filled';
}

export const HiveTextarea = React.forwardRef<HTMLTextAreaElement, HiveTextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'border border-input bg-background',
      ghost: 'border-transparent bg-transparent hover:bg-accent',
      filled: 'bg-muted border-transparent',
    };
    
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

HiveTextarea.displayName = 'HiveTextarea';

export const hiveTextareaVariants = {};