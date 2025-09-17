import React from 'react';
import { cn } from '../lib/utils';

interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  sticky?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  actions,
  sticky = true,
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        'bg-background border-b px-4 py-3',
        sticky && 'sticky top-0 z-50',
        className
      )}
      {...props}
    >
      {children || (
        <div className="flex items-center justify-between">
          <div>
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
    </header>
  );
};