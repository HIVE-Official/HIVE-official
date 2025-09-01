'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { InputEnhanced as Input } from '../atoms/input-enhanced';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Spinner } from '../atoms/spinner';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  loading?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'filled';
  className?: string;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value = '',
  loading = false,
  clearable = true,
  size = 'md',
  variant = 'default',
  className,
  onSearch,
  onChange,
  onClear,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(value);
  
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(internalValue);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onClear?.();
  };

  const showClearButton = clearable && internalValue.length > 0 && !loading;

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <InputEnhanced
        type="search"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        variant={variant}
        size={size}
        leftIcon={
          loading ? (
            <Spinner size="sm" color="secondary" />
          ) : (
            <Search className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          )
        }
        rightIcon={
          showClearButton ? (
            <ButtonEnhanced
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </ButtonEnhanced>
          ) : undefined
        }
        className={cn(
          // Add padding for icons
          'pr-10',
          showClearButton && 'pr-16'
        )}
        {...props}
      />
      
      {/* Hidden submit button for enter key support */}
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};