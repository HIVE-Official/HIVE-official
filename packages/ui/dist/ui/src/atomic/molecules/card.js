'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
const cardVariants = {
    variant: {
        // PRD-Aligned: Semantic tokens only
        default: [
            'bg-[var(--hive-background-secondary)]',
            'border border-[var(--hive-border-default)]'
        ].join(' '),
        elevated: [
            'bg-[var(--hive-background-secondary)]',
            'shadow-lg',
            'border border-[var(--hive-border-default)]'
        ].join(' '),
        glass: [
            'bg-[var(--hive-background-secondary)]/50',
            'backdrop-blur-md',
            'border border-[var(--hive-border-default)]/50'
        ].join(' '),
        interactive: [
            'bg-[var(--hive-background-secondary)]',
            'border border-[var(--hive-border-default)]',
            'hover:bg-[var(--hive-interactive-hover)]',
            'hover:border-[var(--hive-border-hover)]',
            'transition-all duration-200 ease-out',
            'cursor-pointer'
        ].join(' '),
        bordered: [
            'bg-transparent',
            'border-2 border-[var(--hive-border-strong)]'
        ].join(' ')
    },
    padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6'
    },
    rounded: {
        // PRD-Aligned: Apple-like generous radius
        sm: 'rounded-hive-sm', // 3
        md: 'rounded-hive-md', // 16px  
        lg: 'rounded-hive-lg', // 5
        xl: 'rounded-hive-xl' // 24px
    }
};
export const Card = ({ variant = 'default', padding = 'md', rounded = 'xl', hoverable = false, className, children, ...props }) => {
    const baseClasses = [
        cardVariants.variant[variant],
        cardVariants.padding[padding],
        cardVariants.rounded[rounded],
        // PRD-Aligned focus states
        'focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)]'
    ].join(' ');
    if (hoverable || variant === 'interactive') {
        return (_jsx(motion.div, { className: cn(baseClasses, className), whileHover: {
                scale: 1.02,
                y: -2
            }, whileTap: { scale: 0.98 }, transition: {
                duration: 0.2,
                ease: 'easeOut'
            }, ...props, children: children }));
    }
    return (_jsx("div", { className: cn(baseClasses, className), ...props, children: children }));
};
export const CardHeader = ({ className, children, ...props }) => (_jsx("div", { className: cn('flex flex-col space-y-1.5 pb-4', className), ...props, children: children }));
export const CardContent = ({ className, children, ...props }) => (_jsx("div", { className: cn('', className), ...props, children: children }));
export const CardFooter = ({ className, children, ...props }) => (_jsx("div", { className: cn('flex items-center pt-4', className), ...props, children: children }));
//# sourceMappingURL=card.js.map