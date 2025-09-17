'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { InputEnhanced } from '../atomic/atoms/input-enhanced';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showIcon?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  showIcon = true,
  className,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      {showIcon && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" />
      )}
      <InputEnhanced
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className={cn(showIcon && "pl-10")}
        {...props}
      />
    </div>
  );
};