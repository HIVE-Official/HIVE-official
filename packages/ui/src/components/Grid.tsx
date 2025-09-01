import React from 'react';
import { cn } from '../lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | string;
  gap?: number | string;
  responsive?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap = '1rem',
  responsive = true,
  className,
  children,
  style,
  ...props
}) => {
  const gridCols = typeof cols === 'number' 
    ? responsive 
      ? `repeat(auto-fit, minmax(250px, 1fr))`
      : `repeat(${cols}, 1fr)`
    : cols;

  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: gridCols,
        gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};