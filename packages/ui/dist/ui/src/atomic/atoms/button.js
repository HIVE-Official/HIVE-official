'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';
const buttonVariants = {
    variant: {
        // PRD-Aligned Primary: Semantic tokens only
        primary: [
            'bg-[var(--hive-brand-primary)] text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-brand-hover)]',
            'active:bg-[var(--hive-brand-primary)]',
            'disabled:bg-[var(--hive-background-tertiary)] disabled:text-[var(--hive-text-disabled)]'
        ].join(' '),
        // PRD-Aligned Secondary: Semantic tokens only
        secondary: [
            'bg-transparent text-[var(--hive-text-primary)]',
            'border border-[var(--hive-border-default)]',
            'hover:bg-[var(--hive-interactive-hover)] hover:border-[var(--hive-border-hover)]',
            'active:bg-[var(--hive-interactive-active)]',
            'disabled:bg-transparent disabled:text-[var(--hive-text-disabled)] disabled:border-[var(--hive-border-default)]'
        ].join(' '),
        // PRD-Aligned Ghost: Semantic tokens only
        ghost: [
            'text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-interactive-hover)]',
            'active:bg-[var(--hive-interactive-active)]',
            'disabled:text-[var(--hive-text-disabled)]'
        ].join(' '),
        // PRD-Aligned Destructive: Semantic tokens only
        destructive: [
            'bg-[var(--hive-status-error)] text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-status-error)]',
            'active:bg-[var(--hive-status-error)]',
            'disabled:bg-[var(--hive-background-tertiary)] disabled:text-[var(--hive-text-disabled)]'
        ].join(' '),
        // PRD-Aligned Outline: Semantic tokens only
        outline: [
            'border border-[var(--hive-border-strong)] text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-interactive-hover)] hover:border-[var(--hive-border-hover)]',
            'active:bg-[var(--hive-interactive-active)]',
            'disabled:border-[var(--hive-border-default)] disabled:text-[var(--hive-text-disabled)]'
        ].join(' '),
        // Sleek accent: Gold outline only
        accent: [
            'bg-transparent text-[var(--hive-brand-secondary)]',
            'border border-[var(--hive-brand-secondary)]',
            'hover:bg-[var(--hive-interactive-hover)]',
            'disabled:text-[var(--hive-text-disabled)] disabled:border-[var(--hive-border-default)]'
        ].join(' ')
    },
    size: {
        sm: 'h-8 px-3 text-sm font-medium',
        md: 'h-10 px-4 text-sm font-medium',
        lg: 'h-12 px-6 text-base font-medium',
        icon: 'h-10 w-10'
    }
};
export const Button = forwardRef(({ className, variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', fullWidth = false, children, disabled, ...props }, ref) => {
    const baseClasses = [
        // Layout & Spacing
        'inline-flex items-center justify-center gap-2',
        'rounded-2xl', // Apple-like generous radius (16px instead of 3)
        'font-medium',
        'transition-all duration-200 ease-out',
        // Clean focus - no persistent rings
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)] focus-visible:ring-offset-1',
        // Social platform motion
        'transform hover:scale-[1.02] active:scale-[0.98]',
        // Disabled State
        'disabled:cursor-not-allowed disabled:transform-none',
        // Full Width
        fullWidth && 'w-full'
    ].filter(Boolean).join(' ');
    const variantClasses = buttonVariants.variant[variant];
    const sizeClasses = buttonVariants.size[size];
    return (_jsxs(motion.button, { ref: ref, className: cn(baseClasses, variantClasses, sizeClasses, className), disabled: disabled || loading, whileHover: { scale: disabled || loading ? 1 : 1.02 }, whileTap: { scale: disabled || loading ? 1 : 0.98 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, ...props, children: [loading && (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })), !loading && icon && iconPosition === 'left' && (_jsx("span", { className: "flex-shrink-0", children: icon })), children && (_jsx("span", { className: cn(size === 'icon' && 'sr-only'), children: children })), !loading && icon && iconPosition === 'right' && (_jsx("span", { className: "flex-shrink-0", children: icon }))] }));
});
Button.displayName = 'Button';
//# sourceMappingURL=button.js.map