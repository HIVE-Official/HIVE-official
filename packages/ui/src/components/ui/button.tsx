import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// HIVE Brand Button System - Compliant with hive-brand-system.md
const buttonVariants = cva(
  // Base styles using HIVE motion and typography systems
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl',
    'font-sans font-button', // Correctly uses font-sans (Geist) and button token
    'transition-all duration-fast ease-standard', // HIVE motion tokens
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // Primary: Gold FILL, white text.
        primary: [
          'bg-accent !text-background border border-accent', // FORCE white text on gold bg
          'hover:bg-accent-600 hover:border-accent-600',
          'hover:scale-102',
          'active:scale-98 active:duration-instant',
        ],
        // Default is an alias for Primary
        default: [
          'bg-accent !text-background border border-accent', // FORCE white text on gold bg
          'hover:bg-accent-600 hover:border-accent-600',
          'hover:scale-102',
          'active:scale-98 active:duration-instant',
        ],
        // Secondary: Monochrome, for less important actions.
        secondary: [
          'bg-foreground/5 border-foreground/10 !text-foreground', // FORCE white text
          'hover:bg-foreground/10',
          'hover:scale-101',
          'active:scale-98 active:duration-instant',
        ],
        // Ghost: For tertiary actions, minimal visual weight.
        ghost: [
          '!text-foreground/80', // FORCE white text
          'hover:bg-foreground/5 hover:!text-foreground',
          'active:scale-98 active:duration-instant',
        ],
        // Outline: Border-focused
        outline: [
          'border border-border bg-transparent',
          '!text-foreground/90', // Muted text for less emphasis -> Changed to white
          'hover:bg-surface-02 hover:border-accent hover:text-accent',
          'hover:scale-102',
          'active:scale-98 active:duration-instant',
        ],
        // Link: For navigation, styled like a hyperlink.
        link: [
          '!text-foreground/80 underline-offset-4', // FORCE white text
          'hover:underline hover:!text-foreground',
          'active:scale-98 active:duration-instant',
        ],
        // Monochrome Destructive: Uses motion for feedback, not color.
        destructive: [
          'bg-surface !text-foreground/90 border border-border', // Changed to white
          'hover:bg-surface-02 hover:border-muted hover:text-foreground',
          'focus-visible:ring-foreground',
          'hover:animate-shake-micro', // Use HIVE shake animation
          'active:scale-98 active:duration-instant',
        ],
      },
      size: {
        xs: 'h-8 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 py-2 text-button', // Use button typography token
        md: 'h-10 px-4 py-2 text-button', // Alias for default
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// Loading spinner component with HIVE motion
const LoadingSpinner = ({ size = 'default' }: { size?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' }) => {
  const spinnerSize = {
    xs: 'h-3 w-3',
    sm: 'h-3 w-3', 
    default: 'h-4 w-4',
    md: 'h-4 w-4', // Same as default
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  }[size];

  return (
    <svg
      className={cn("animate-spin duration-base ease-linear", spinnerSize)} // Use HIVE duration token
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    fullWidth,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={size === 'icon' ? 'default' : (size || 'default')} />
        ) : (
          <>
            {leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}
            <span className={cn(fullWidth && "flex-1 text-center")}>{children}</span>
            {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

// Button Group Component for related actions
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', size = 'default', variant = 'outline', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          '[&>button]:rounded-none',
          '[&>button:first-child]:rounded-l-xl',
          '[&>button:last-child]:rounded-r-xl',
          orientation === 'vertical' && '[&>button:first-child]:rounded-t-xl [&>button:first-child]:rounded-l-none',
          orientation === 'vertical' && '[&>button:last-child]:rounded-b-xl [&>button:last-child]:rounded-r-none',
          '[&>button:not(:first-child)]:border-l-0',
          orientation === 'vertical' && '[&>button:not(:first-child)]:border-l [&>button:not(:first-child)]:border-t-0',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child, {
              size,
              variant,
              ...child.props,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, buttonVariants }; 