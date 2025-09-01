import React from 'react';
import { cn } from '../lib/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  spacing?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = '1rem',
  align = 'stretch',
  justify = 'start',
  className,
  children,
  style,
  ...props
}) => {
  const flexDirection = direction === 'horizontal' ? 'row' : 'column';
  
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };
  
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  return (
    <div
      className={cn('flex', className)}
      style={{
        flexDirection,
        gap: spacing,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};