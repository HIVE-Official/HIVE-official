import React from 'react';
import { cn } from '../lib/utils';

interface NavItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BottomNavBarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  items = [],
  className,
  ...props
}) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-background border-t z-50',
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full px-2 py-2',
              'hover:bg-accent hover:text-accent-foreground transition-colors',
              item.active && 'text-primary'
            )}
          >
            {item.icon && <div className="mb-1">{item.icon}</div>}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};