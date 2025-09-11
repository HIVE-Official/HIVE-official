import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';
const hiveBadgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
            secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            outline: 'text-foreground',
            success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
            info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
const HiveBadge = React.forwardRef(({ className, variant, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(hiveBadgeVariants({ variant }), className), ...props }));
});
HiveBadge.displayName = 'HiveBadge';
export { HiveBadge, hiveBadgeVariants };
//# sourceMappingURL=hive-badge.js.map