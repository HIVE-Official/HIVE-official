'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
const iconSizes = {
    xs: 'h-3 w-3', // 3
    sm: 'h-4 w-4', // 16px  
    md: 'h-5 w-5', // 5
    lg: 'h-6 w-6', // 24px
    xl: 'h-8 w-8', // 32px
    '2xl': 'h-10 w-10' // 10
};
const iconColors = {
    primary: 'text-[var(--hive-text-primary)]',
    secondary: 'text-[var(--hive-text-secondary)]',
    muted: 'text-[var(--hive-text-muted)]',
    gold: 'text-[var(--hive-brand-secondary)]',
    ruby: 'text-[var(--hive-status-error)]',
    emerald: 'text-[var(--hive-status-success)]',
    sapphire: 'text-[var(--hive-brand-primary)]'
};
export const Icon = ({ icon: IconComponent, size = 'md', color = 'primary', variant = 'default', className, ...props }) => {
    const baseClasses = [
        iconSizes[size],
        iconColors[color],
        'flex-shrink-0',
        // Variants
        variant === 'outlined' && 'stroke-2 fill-none',
        variant === 'filled' && 'fill-current',
        // Interactive states
        'transition-colors duration-200 ease-out'
    ].filter(Boolean).join(' ');
    return (_jsx(IconComponent, { className: cn(baseClasses, className), ...props }));
};
//# sourceMappingURL=icon.js.map