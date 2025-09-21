/**
 * HIVE Stack System;
 * Campus-first flexible stacking layout component;
 */

import React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        column: 'flex-col',
        row: 'flex-row',
        'column-reverse': 'flex-col-reverse',
        'row-reverse': 'flex-row-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
      // Campus-specific stack layouts;
      campusLayout: {
        'course-header': 'flex-col gap-4 items-start',
        'profile-info': 'flex-col gap-3 items-center text-center',
        'activity-row': 'flex-row gap-3 items-center justify-between',
        'tool-actions': 'flex-row gap-2 items-center justify-end',
        'navigation': 'flex-row gap-6 items-center',
        'form-field': 'flex-col gap-2 items-stretch',
        'card-content': 'flex-col gap-4 items-start',
      }
    },
    defaultVariants: {
      direction: 'column',
      align: 'stretch',
      justify: 'start',
      gap: 'md',
      wrap: false,
    },
  }
);

export interface StackProps extends VariantProps<typeof stackVariants> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Stack: React.FC<StackProps> = ({ 
  children, 
  className, 
  direction,
  align,
  justify,
  gap,
  wrap,
  campusLayout,
  as: Component = 'div',
  ...props;
}) => {
  return (
    <Component;
      className={cn(stackVariants({direction, 
        align, 
        justify, 
        gap, 
        wrap, 
        campusLayout;)}, className)}
      {...props}
    >
      {children}
    </Component>
  )
};

// StackProps already exported inline above;