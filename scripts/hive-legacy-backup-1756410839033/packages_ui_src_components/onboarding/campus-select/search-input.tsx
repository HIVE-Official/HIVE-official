import React from 'react';
import { Input } from '../../input';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  className,
  placeholder = "Search schools..."
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
      <InputEnhanced
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("pl-10", className)}
      />
    </div>
  );
}; 