import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils.js';
import { cva } from 'class-variance-authority';
const hiveInputVariants = cva('flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', {
    variants: {
        variant: {
            default: '',
            ghost: 'border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground',
            filled: 'bg-muted border-transparent',
        },
        size: {
            sm: 'h-8 px-2 text-xs',
            md: 'h-10 px-3 py-2',
            lg: 'h-12 px-4 text-base',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});
const HiveInput = React.forwardRef(({ className, variant, size, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn(hiveInputVariants({ variant, size }), className), ref: ref, ...props }));
});
HiveInput.displayName = 'HiveInput';
export { HiveInput, hiveInputVariants };
//# sourceMappingURL=hive-input.js.map