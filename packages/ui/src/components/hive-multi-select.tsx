import React from 'react';
import { cn } from '../lib/utils';

export interface HiveMultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options?: Array<{ label: string; value: string }>;
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}

export const HiveMultiSelect: React.FC<HiveMultiSelectProps> = ({ 
  className, 
  options = [],
  value = [],
  onChange,
  placeholder = 'Select items...',
  ...props 
}) => {
  return (
    <div className={cn('w-full border rounded-md p-2', className)} {...props}>
      <div className="text-sm text-muted-foreground">{placeholder}</div>
      <div className="flex flex-wrap gap-1 mt-2">
        {value.map((v: string) => (
          <span key={v} className="px-2 py-1 bg-primary/10 rounded-md text-xs">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
};

export const hiveMultiSelectVariants = {};