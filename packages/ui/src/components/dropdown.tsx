'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

// Simple dropdown implementation for compatibility
export interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  return <div className={cn("relative inline-block text-left", className)}>{children}</div>;
};

export const DropdownTrigger: React.FC<DropdownProps> = ({ children, className }) => {
  return <div className={cn("cursor-pointer", className)}>{children}</div>;
};

export interface DropdownMenuProps extends DropdownProps {
  open?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className, open = false }) => {
  if (!open) return null;
  return (
    <div className={cn(
      "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md",
      "bg-[var(--hive-background-primary)] shadow-lg ring-1 ring-black ring-opacity-5",
      className
    )}>
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownProps & { onClick?: () => void }> = ({ 
  children, 
  className, 
  onClick 
}) => {
  return (
    <div 
      className={cn(
        "block px-4 py-2 text-sm text-[var(--hive-text-primary)]",
        "hover:bg-[var(--hive-interactive-hover)] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const DropdownMenuContent = DropdownMenu;
export const DropdownMenuTrigger = DropdownTrigger;
export const DropdownItem = DropdownMenuItem;