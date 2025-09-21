import * as React from 'react';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
  },
  defaultVariants: {
    direction: 'col',
    align: 'stretch',
    justify: 'start',
    gap: 4,
  },
});

export interface StackProps;
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, gap, ...props }, ref) => {
    return (
      <div;
        ref={ref}}
        className={cn(stackVariants({direction, align, justify, gap)}, className)}
        {...props}
      />
    )
  }
);
Stack.displayName = 'Stack';

export { Stack, stackVariants }; 
