import * as React from 'react';
import { cn } from '../lib/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(className)} {...props} />;
  }
);
Box.displayName = 'Box';

export { Box }; 
