"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search, Command, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, MotionDiv } from '../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { getHiveMotionProps } from '../../lib/motion-utils';

// HIVE Navigation Input variants - Following input design patterns
const hiveNavigationInputVariants = cva(
  // Base styles - premium search input with semantic tokens
  "relative w-full transition-all duration-300 ease-out backdrop-blur-sm",
  {
    variants: {
      variant: {
        // Standard search input
        default: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
        
        // Command palette style
        command: "bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-xl focus-within:shadow-[var(--hive-shadow-gold-glow)]",
        
        // Minimal variant
        minimal: "bg-[var(--hive-overlay-glass)] border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:bg-[var(--hive-background-secondary)]",
        
        // Premium variant with gold accent
        premium: "bg-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-gold)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
      },
      
      size: {
        sm: "h-8 text-sm rounded-xl",
        default: "h-10 text-sm rounded-2xl",
        lg: "h-12 text-base rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface HiveNavigationInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof hiveNavigationInputVariants> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showShortcut?: boolean;
  shortcutKey?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  loading?: boolean;
}

export function HiveNavigationInput({
  variant,
  size,
  onSearch,
  onClear,
  showShortcut = true,
  shortcutKey = "K",
  icon,
  rightIcon,
  clearable = true,
  loading = false,
  className,
  value,
  onChange,
  placeholder = "Search...",
  ...props
}: HiveNavigationInputProps) {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchValue = value !== undefined ? value : internalValue;
  const hasValue = typeof searchValue === 'string' ? searchValue.length > 0 : Boolean(searchValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(e);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    const newValue = '';
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <motion.div
      className={cn(
        hiveNavigationInputVariants({ variant, size }),
        "flex items-center overflow-hidden",
        className
      )}
      style={{
        willChange: 'transform',
        transformOrigin: 'center',
        backfaceVisibility: 'hidden' as const,
        transform: 'translateZ(0)',
      }}
      whileFocus={{ scale: 1.01 }}
    >
      {/* Left Icon */}
      {icon || (
        <div className="flex items-center justify-center w-10 h-full">
          <Search 
            className="w-4 h-4" 
            style={{ color: 'var(--hive-text-muted)' }}
          />
        </div>
      )}

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "flex-1 h-full px-2 bg-transparent border-0 outline-none",
          "placeholder:text-[var(--hive-text-muted)]",
          "text-[var(--hive-text-primary)]"
        )}
        style={{
          fontFamily: 'var(--hive-font-family-primary)',
          fontSize: `var(--hive-font-size-${size === 'sm' ? 'sm' : size === 'lg' ? 'base' : 'sm'})`,
          fontWeight: 'var(--hive-font-weight-regular)'
        }}
        {...props}
      />

      {/* Right Section */}
      <div className="flex items-center gap-2 px-2">
        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-t-transparent rounded-full"
            style={{ borderColor: 'var(--hive-brand-primary)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Clear Button */}
        {clearable && hasValue && !loading && (
          <motion.button
            onClick={handleClear}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-[var(--hive-interactive-hover)] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-3 h-3" style={{ color: 'var(--hive-text-muted)' }} />
          </motion.button>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <div className="flex items-center justify-center w-6 h-6">
            {rightIcon}
          </div>
        )}

        {/* Keyboard Shortcut */}
        {showShortcut && !hasValue && !loading && (
          <motion.div
            className="flex items-center gap-1 px-2 py-1 rounded border"
            style={{
              backgroundColor: 'var(--hive-background-primary)',
              borderColor: 'var(--hive-border-subtle)',
              color: 'var(--hive-text-muted)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Command className="w-3 h-3" />
            <span className="text-xs font-medium">{shortcutKey}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Command Result Item Component
export interface HiveCommandResultProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function HiveCommandResult({
  title,
  subtitle,
  icon,
  shortcut,
  isSelected,
  onClick,
  className
}: HiveCommandResultProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full flex items-center px-3 py-2 text-left transition-all duration-200 rounded-2xl",
        isSelected 
          ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]" 
          : "text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]",
        className
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {icon && (
        <div className="flex items-center justify-center w-8 h-8 mr-3">
          {icon}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{title}</div>
        {subtitle && (
          <div 
            className="text-xs truncate mt-1"
            style={{ 
              color: isSelected ? 'var(--hive-text-inverse)' : 'var(--hive-text-muted)',
              opacity: isSelected ? 0.8 : 1
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 ml-2">
        {shortcut && (
          <kbd 
            className="px-2 py-1 text-xs font-medium border rounded"
            style={{
              backgroundColor: isSelected ? 'var(--hive-background-primary)' : 'var(--hive-background-secondary)',
              borderColor: isSelected ? 'var(--hive-border-primary)' : 'var(--hive-border-subtle)',
              color: isSelected ? 'var(--hive-text-primary)' : 'var(--hive-text-muted)'
            }}
          >
            {shortcut}
          </kbd>
        )}
        <ArrowRight className="w-4 h-4 opacity-50" />
      </div>
    </motion.button>
  );
}

// Command Section Header
export interface HiveCommandSectionProps {
  title: string;
  count?: number;
  className?: string;
}

export function HiveCommandSection({ title, count, className }: HiveCommandSectionProps) {
  return (
    <div className={cn("px-3 py-2 mb-1", className)}>
      <div className="flex items-center justify-between">
        <h3 
          className="text-xs font-semibold uppercase tracking-wider"
          style={{
            color: 'var(--hive-text-muted)',
            fontFamily: 'var(--hive-font-family-primary)',
            fontSize: 'var(--hive-font-size-xs)',
            fontWeight: 'var(--hive-font-weight-semibold)',
            letterSpacing: 'var(--hive-letter-spacing-wider)'
          }}
        >
          {title}
        </h3>
        {count && (
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: 'var(--hive-background-tertiary)',
              color: 'var(--hive-text-muted)'
            }}
          >
            {count}
          </span>
        )}
      </div>
    </div>
  );
}