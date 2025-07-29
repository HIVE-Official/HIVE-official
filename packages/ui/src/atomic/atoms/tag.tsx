'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'filled' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gold' | 'ruby' | 'emerald' | 'sapphire';
  removable?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: () => void;
  children: React.ReactNode;
}

const tagColors = {
  default: {
    filled: 'bg-gray-800 text-gray-300 border-[var(--hive-border-default)]',
    outline: 'bg-transparent text-gray-300 border-[var(--hive-border-default)]',
    ghost: 'bg-gray-700 text-gray-300 border-transparent',
    gradient: 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 border-transparent'
  },
  primary: {
    filled: 'bg-blue-600 text-[var(--hive-text-primary)] border-blue-600',
    outline: 'bg-transparent text-blue-400 border-blue-500',
    ghost: 'bg-blue-500/10 text-blue-400 border-transparent',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-500 text-[var(--hive-text-primary)] border-transparent'
  },
  success: {
    filled: 'bg-green-500 text-[var(--hive-text-primary)] border-green-500',
    outline: 'bg-transparent text-green-400 border-green-500',
    ghost: 'bg-green-500/10 text-green-400 border-transparent',
    gradient: 'bg-gradient-to-r from-green-500 to-green-400 text-[var(--hive-text-primary)] border-transparent'
  },
  warning: {
    filled: 'bg-yellow-500 text-[var(--hive-background-primary)] border-yellow-500',
    outline: 'bg-transparent text-yellow-400 border-yellow-500',
    ghost: 'bg-yellow-500/10 text-yellow-400 border-transparent',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-400 text-[var(--hive-background-primary)] border-transparent'
  },
  error: {
    filled: 'bg-red-500 text-[var(--hive-text-primary)] border-red-500',
    outline: 'bg-transparent text-red-400 border-red-500',
    ghost: 'bg-red-500/10 text-red-400 border-transparent',
    gradient: 'bg-gradient-to-r from-red-500 to-red-400 text-[var(--hive-text-primary)] border-transparent'
  },
  gold: {
    filled: 'bg-yellow-500 text-[var(--hive-background-primary)] border-yellow-500',
    outline: 'bg-transparent text-yellow-400 border-yellow-500',
    ghost: 'bg-yellow-500/10 text-yellow-400 border-transparent',
    gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-[var(--hive-background-primary)] border-transparent'
  },
  ruby: {
    filled: 'bg-red-500 text-[var(--hive-text-primary)] border-red-500',
    outline: 'bg-transparent text-red-400 border-red-500',
    ghost: 'bg-red-500/10 text-red-400 border-transparent',
    gradient: 'bg-gradient-to-r from-red-500 to-pink-400 text-[var(--hive-text-primary)] border-transparent'
  },
  emerald: {
    filled: 'bg-green-500 text-[var(--hive-text-primary)] border-green-500',
    outline: 'bg-transparent text-green-400 border-green-500',
    ghost: 'bg-green-500/10 text-green-400 border-transparent',
    gradient: 'bg-gradient-to-r from-green-500 to-teal-400 text-[var(--hive-text-primary)] border-transparent'
  },
  sapphire: {
    filled: 'bg-blue-500 text-[var(--hive-text-primary)] border-blue-500',
    outline: 'bg-transparent text-blue-400 border-blue-500',
    ghost: 'bg-blue-500/10 text-blue-400 border-transparent',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-400 text-[var(--hive-text-primary)] border-transparent'
  }
};

const tagSizes = {
  sm: {
    base: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
    removeButton: 'w-3 h-3'
  },
  md: {
    base: 'px-3 py-1.5 text-sm',
    icon: 'w-4 h-4',
    removeButton: 'w-4 h-4'
  },
  lg: {
    base: 'px-4 py-2 text-base',
    icon: 'w-5 h-5',
    removeButton: 'w-5 h-5'
  }
};

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(({
  variant = 'default',
  size = 'md',
  color = 'default',
  removable = false,
  disabled = false,
  interactive = false,
  leftIcon,
  rightIcon,
  onRemove,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const baseClasses = [
    // Layout
    'inline-flex items-center gap-1.5',
    'rounded-full',
    'border',
    'font-medium',
    'transition-all duration-200 ease-out',
    'select-none',
    
    // Size
    tagSizes[size].base,
    
    // Color and variant
    tagColors[color][variant === 'default' ? 'filled' : variant],
    
    // Interactive states
    interactive && !disabled && [
      'cursor-pointer',
      'hover:scale-105',
      'active:scale-95'
    ].filter(Boolean).join(' '),
    
    // Disabled state
    disabled && [
      'opacity-50',
      'cursor-not-allowed',
      'pointer-events-none'
    ].join(' '),
    
    // Focus styles for interactive tags
    interactive && !disabled && [
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-400/20',
      'focus:ring-offset-2'
    ].join(' ')
  ].filter(Boolean).join(' ');

  const iconSize = tagSizes[size].icon;
  const removeButtonSize = tagSizes[size].removeButton;

  return (
    <div
      ref={ref}
      className={cn(baseClasses, className)}
      onClick={interactive && !disabled ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      onKeyDown={interactive && !disabled ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as any);
        }
      } : undefined}
      {...props}
    >
      {leftIcon && (
        <span className={cn('flex-shrink-0', iconSize)}>
          {leftIcon}
        </span>
      )}
      
      <span className="truncate">
        {children}
      </span>
      
      {rightIcon && !removable && (
        <span className={cn('flex-shrink-0', iconSize)}>
          {rightIcon}
        </span>
      )}
      
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className={cn(
            'flex-shrink-0 rounded-full',
            'transition-all duration-200 ease-out',
            'hover:bg-[var(--hive-background-primary)]/10 dark:hover:bg-[var(--hive-text-primary)]/10',
            'focus:outline-none focus:bg-[var(--hive-background-primary)]/10 dark:focus:bg-[var(--hive-text-primary)]/10',
            'active:scale-90',
            removeButtonSize,
            disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-label="Remove tag"
        >
          <X className="w-full h-full" />
        </button>
      )}
    </div>
  );
});

Tag.displayName = 'Tag';

// Convenient preset components
export const PrimaryTag: React.FC<Omit<TagProps, 'color'>> = (props) => (
  <Tag color="primary" {...props} />
);

export const SuccessTag: React.FC<Omit<TagProps, 'color'>> = (props) => (
  <Tag color="success" {...props} />
);

export const WarningTag: React.FC<Omit<TagProps, 'color'>> = (props) => (
  <Tag color="warning" {...props} />
);

export const ErrorTag: React.FC<Omit<TagProps, 'color'>> = (props) => (
  <Tag color="error" {...props} />
);

export const RemovableTag: React.FC<Omit<TagProps, 'removable'>> = (props) => (
  <Tag removable {...props} />
);

export const InteractiveTag: React.FC<Omit<TagProps, 'interactive'>> = (props) => (
  <Tag interactive {...props} />
);

export const OutlineTag: React.FC<Omit<TagProps, 'variant'>> = (props) => (
  <Tag variant="outline" {...props} />
);

export const GhostTag: React.FC<Omit<TagProps, 'variant'>> = (props) => (
  <Tag variant="ghost" {...props} />
);

export const GradientTag: React.FC<Omit<TagProps, 'variant'>> = (props) => (
  <Tag variant="gradient" {...props} />
);