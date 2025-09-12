import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils.js';
import { cva } from 'class-variance-authority';
const hiveCardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
    variants: {
        variant: {
            default: 'border-border',
            ghost: 'border-transparent shadow-none',
            outline: 'border-border bg-transparent shadow-none',
            elevated: 'border-transparent shadow-md hover:shadow-lg transition-shadow',
        },
        size: {
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});
const HiveCard = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(hiveCardVariants({ variant, size }), className), ...props }));
});
HiveCard.displayName = 'HiveCard';
const HiveCardHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('flex flex-col space-y-1.5', className), ...props })));
HiveCardHeader.displayName = 'HiveCardHeader';
const HiveCardTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn('text-2xl font-semibold leading-none tracking-tight', className), ...props })));
HiveCardTitle.displayName = 'HiveCardTitle';
const HiveCardDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn('text-sm text-muted-foreground', className), ...props })));
HiveCardDescription.displayName = 'HiveCardDescription';
const HiveCardContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('pt-0', className), ...props })));
HiveCardContent.displayName = 'HiveCardContent';
const HiveCardFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('flex items-center pt-0', className), ...props })));
HiveCardFooter.displayName = 'HiveCardFooter';
export { HiveCard, HiveCardHeader, HiveCardFooter, HiveCardTitle, HiveCardDescription, HiveCardContent, hiveCardVariants, };
//# sourceMappingURL=hive-card.js.map