/**
 * Universal Atoms
 * Core UI building blocks for the HIVE platform
 * Uses the gold (var(--hive-brand-secondary)), black, and white color scheme
 */

import React, { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// Universal Button
export interface UniversalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const UniversalButton = forwardRef<HTMLButtonElement, UniversalButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'relative font-semibold transition-all duration-200 rounded-lg flex items-center justify-center gap-2';

    const variants = {
      primary: 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)] shadow-lg hover:shadow-xl',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
      ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/5',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);
UniversalButton.displayName = 'UniversalButton';

// Universal Input
export interface UniversalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const UniversalInput = forwardRef<HTMLInputElement, UniversalInputProps>(
  ({ label, error, hint, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 bg-white/5 border rounded-lg',
              'text-white placeholder-white/30',
              'focus:border-[var(--hive-brand-secondary)] focus:bg-white/10 focus:outline-none',
              'transition-all duration-200',
              icon && 'pl-10',
              error ? 'border-red-500' : 'border-white/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-white/40">{hint}</p>
        )}
      </div>
    );
  }
);
UniversalInput.displayName = 'UniversalInput';

// Universal Card
export interface UniversalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
}

export const UniversalCard: React.FC<UniversalCardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  interactive = false,
  onClick
}) => {
  const variants = {
    default: 'bg-white/5 border border-white/10',
    elevated: 'bg-black shadow-xl border border-white/10',
    outlined: 'bg-transparent border-2 border-white/20',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 lg:p-6',
    lg: 'p-6 lg:p-8',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        'rounded-xl transition-all duration-200',
        variants[variant],
        paddings[padding],
        interactive && 'hover:bg-white/10 hover:border-[var(--hive-brand-secondary)]/50 cursor-pointer',
        onClick && 'w-full text-left',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

// Universal Badge
export interface UniversalBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UniversalBadge: React.FC<UniversalBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const variants = {
    default: 'bg-white/10 text-white',
    primary: 'bg-[var(--hive-brand-secondary)] text-black',
    success: 'bg-green-500/20 text-green-400',
    danger: 'bg-red-500/20 text-red-400',
    warning: 'bg-orange-500/20 text-orange-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};

// Universal Avatar
export interface UniversalAvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const UniversalAvatar: React.FC<UniversalAvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  status,
  className
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div className={cn(
        'rounded-full overflow-hidden bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)]',
        sizes[size]
      )}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black font-bold">
            {fallback || alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 block rounded-full ring-2 ring-black',
          statusColors[status],
          size === 'xs' && 'w-2 h-2',
          size === 'sm' && 'w-2.5 h-2.5',
          size === 'md' && 'w-3 h-3',
          size === 'lg' && 'w-3.5 h-3.5',
          size === 'xl' && 'w-4 h-4',
        )} />
      )}
    </div>
  );
};

// Universal Skeleton Loader
export interface UniversalSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

export const UniversalSkeleton: React.FC<UniversalSkeletonProps> = ({
  width = '100%',
  height = '20px',
  variant = 'rectangular',
  className
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-white/10',
        variants[variant],
        className
      )}
      style={{ width, height }}
    />
  );
};

// Universal Divider
export const UniversalDivider: React.FC<{
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={cn(
        'bg-white/10',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
    />
  );
};

// Universal Icon Button
export const UniversalIconButton = forwardRef<HTMLButtonElement, {
  icon: React.ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ icon, variant = 'default', size = 'md', className, ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 text-white hover:bg-white/20',
      primary: 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]',
      ghost: 'text-white/60 hover:text-white hover:bg-white/5',
    };

    const sizes = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
UniversalIconButton.displayName = 'UniversalIconButton';

// Universal Checkbox
export interface UniversalCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const UniversalCheckbox = forwardRef<HTMLInputElement, UniversalCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'w-5 h-5 rounded border-2 border-white/20',
            'checked:bg-[var(--hive-brand-secondary)] checked:border-[var(--hive-brand-secondary)]',
            'focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/50 focus:ring-offset-2 focus:ring-offset-black',
            'transition-all duration-200',
            className
          )}
          {...props}
        />
        {label && <span className="text-white select-none">{label}</span>}
      </label>
    );
  }
);
UniversalCheckbox.displayName = 'UniversalCheckbox';

// Export all atoms
export default {
  UniversalButton,
  UniversalInput,
  UniversalCard,
  UniversalBadge,
  UniversalAvatar,
  UniversalSkeleton,
  UniversalDivider,
  UniversalIconButton,
  UniversalCheckbox,
};