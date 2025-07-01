import { Search } from 'lucide-react';
import { Input } from '@/components/input';
import { cn } from '@/lib/utils';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  className,
  placeholder = 'Search for your school...'
}: SearchInputProps) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
        placeholder={placeholder}
      />
    </div>
  );
}; 