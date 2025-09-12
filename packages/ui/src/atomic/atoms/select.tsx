'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, X, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled' | 'ghost';
  fullWidth?: boolean;
  onChange?: (value: string | string[]) => void;
  onSearch?: (query: string) => void;
}

const selectVariants = {
  default: [
    'bg-[var(--hive-background-secondary)]',
    'border border-[var(--hive-border-strong)]',
    'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
    'hover:border-[var(--hive-border-hover)]'
  ].join(' '),
  outline: [
    'bg-transparent',
    'border border-[var(--hive-border-strong)]',
    'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
    'hover:border-[var(--hive-border-hover)]'
  ].join(' '),
  ghost: [
    'bg-transparent',
    'border border-transparent',
    'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-border-strong)]'
  ].join(' '),
  filled: [
    'bg-[var(--hive-background-tertiary)]',
    'border border-transparent',
    'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-brand-secondary)]'
  ].join(' ')
};

const selectSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base'
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(({
  options,
  value,
  placeholder = 'Select...',
  multiple = false,
  searchable = false,
  clearable = false,
  disabled = false,
  error,
  label,
  helperText,
  size = 'md',
  variant = 'default',
  fullWidth = true,
  onChange,
  onSearch,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => selectRef.current!);

  // Handle outside clicks
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  // Get selected options
  const selectedOptions = React.useMemo(() => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return options.filter(option => values.includes(option.value));
  }, [value, options]);

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange?.(newValues);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const handleClear = () => {
    onChange?.(multiple ? [] : '');
  };

  const displayText = React.useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (multiple) {
      return selectedOptions.length === 1 
        ? selectedOptions[0].label
        : `${selectedOptions.length} selected`;
    }
    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, placeholder, multiple]);

  const baseClasses = [
    'relative flex items-center justify-between',
    'rounded-xl cursor-pointer',
    'transition-all duration-200 ease-out',
    'font-medium text-[var(--hive-text-primary)]',
    selectVariants[variant],
    selectSizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[var(--hive-status-error)]/20',
    fullWidth && 'w-full'
  ].filter(Boolean).join(' ');

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
          {label}
        </label>
      )}

      <div ref={selectRef} className="relative">
        {/* Select Trigger */}
        <div
          className={baseClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          {...props}
        >
          <span className={cn(
            'flex-1 text-left truncate',
            selectedOptions.length === 0 && 'text-[var(--hive-text-tertiary)]'
          )}>
            {displayText}
          </span>
          
          <div className="flex items-center gap-2">
            {clearable && selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown className={cn(
              'h-4 w-4 text-[var(--hive-text-secondary)] transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-[var(--hive-background-tertiary)] border-2 border-[var(--hive-border-strong)] rounded-xl shadow-[var(--hive-shadow-level4)] max-h-60 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-[var(--hive-border-strong)]">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-[var(--hive-background-interactive)] border border-[var(--hive-border-strong)] rounded-lg text-sm focus:outline-none focus:border-[var(--hive-brand-secondary)] text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-placeholder)]"
                />
              </div>
            )}
            
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-[var(--hive-text-secondary)]">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedOptions.some(selected => selected.value === option.value);
                  
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 text-sm cursor-pointer text-[var(--hive-text-primary)]',
                        'hover:bg-[var(--hive-background-interactive)]',
                        option.disabled && 'opacity-50 cursor-not-allowed',
                        isSelected && 'bg-[var(--hive-background-interactive)] text-[var(--hive-brand-secondary)]'
                      )}
                      onClick={() => handleOptionClick(option)}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn(
          'text-xs',
          error ? 'text-[var(--hive-status-error)]' : 'text-[var(--hive-text-secondary)]'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';