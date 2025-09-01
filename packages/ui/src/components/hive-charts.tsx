import React from 'react';
import { cn } from '../lib/utils';

export interface HiveChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any[];
  type?: 'line' | 'bar' | 'pie' | 'area';
}

export const HiveChart: React.FC<HiveChartProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div className={cn('w-full h-64 bg-muted rounded-lg p-4', className)} {...props}>
      {children || <div className="text-muted-foreground">Chart placeholder</div>}
    </div>
  );
};

export const hiveChartVariants = {};