import React from 'react';
import { cn } from '../lib/utils';

export interface HiveMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<{ label: string; value: string; onClick?: () => void }>;
}

export const HiveMenu: React.FC<HiveMenuProps> = ({ 
  className, 
  items = [],
  children,
  ...props 
}) => {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={item.onClick}
          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          {item.label}
        </button>
      ))}
      {children}
    </div>
  );
};

export const hiveMenuVariants = {};