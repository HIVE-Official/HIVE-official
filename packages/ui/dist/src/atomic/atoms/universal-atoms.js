import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Universal Atoms
 * Core UI building blocks for the HIVE platform
 * Uses the gold (var(--hive-brand-secondary)), black, and white color scheme
 */
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
export const UniversalButton = forwardRef(({ variant = 'primary', size = 'md', fullWidth = false, loading = false, icon, iconPosition = 'left', className, children, disabled, ...props }, ref) => {
    const baseClasses = 'relative font-semibold transition-all duration-200 rounded-lg flex items-center justify-center gap-2';
    const variants = {
        primary: 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)] shadow-lg hover:shadow-xl',
        secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
        ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/5',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
    };
    return (_jsxs("button", { ref: ref, className: cn(baseClasses, variants[variant], sizes[size], fullWidth && 'w-full', (disabled || loading) && 'opacity-50 cursor-not-allowed', className), disabled: disabled || loading, ...props, children: [loading && (_jsxs("svg", { className: "animate-spin h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] })), !loading && icon && iconPosition === 'left' && icon, children, !loading && icon && iconPosition === 'right' && icon] }));
});
UniversalButton.displayName = 'UniversalButton';
export const UniversalInput = forwardRef(({ label, error, hint, icon, className, ...props }, ref) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-white mb-1.5", children: label })), _jsxs("div", { className: "relative", children: [icon && (_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40", children: icon })), _jsx("input", { ref: ref, className: cn('w-full px-4 py-2.5 bg-white/5 border rounded-lg', 'text-white placeholder-white/30', 'focus:border-[var(--hive-brand-secondary)] focus:bg-white/10 focus:outline-none', 'transition-all duration-200', icon && 'pl-10', error ? 'border-red-500' : 'border-white/10', className), ...props })] }), error && (_jsx("p", { className: "mt-1.5 text-sm text-red-500", children: error })), hint && !error && (_jsx("p", { className: "mt-1.5 text-sm text-white/40", children: hint }))] }));
});
UniversalInput.displayName = 'UniversalInput';
export const UniversalCard = ({ children, className, variant = 'default', padding = 'md', interactive = false, onClick }) => {
    const variants = {
        default: 'bg-white/5 border border-white/10',
        elevated: 'bg-black shadow-xl border border-white/10',
        outlined: 'bg-transparent border-2 border-white/20',
        glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
    };
    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4 lg:p-6',
        lg: 'p-6 lg:p-8',
    };
    const Component = onClick ? 'button' : 'div';
    return (_jsx(Component, { className: cn('rounded-xl transition-all duration-200', variants[variant], paddings[padding], interactive && 'hover:bg-white/10 hover:border-[var(--hive-brand-secondary)]/50 cursor-pointer', onClick && 'w-full text-left', className), onClick: onClick, children: children }));
};
export const UniversalBadge = ({ children, variant = 'default', size = 'md', className }) => {
    const variants = {
        default: 'bg-white/10 text-white',
        primary: 'bg-[var(--hive-brand-secondary)] text-black',
        success: 'bg-green-500/20 text-green-400',
        danger: 'bg-red-500/20 text-red-400',
        warning: 'bg-orange-500/20 text-orange-400',
    };
    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };
    return (_jsx("span", { className: cn('inline-flex items-center font-medium rounded-full', variants[variant], sizes[size], className), children: children }));
};
export const UniversalAvatar = ({ src, alt = 'Avatar', size = 'md', fallback, status, className }) => {
    const sizes = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };
    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        busy: 'bg-red-500',
    };
    return (_jsxs("div", { className: cn('relative inline-block', className), children: [_jsx("div", { className: cn('rounded-full overflow-hidden bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)]', sizes[size]), children: src ? (_jsx("img", { src: src, alt: alt, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center text-black font-bold", children: fallback || alt.charAt(0).toUpperCase() })) }), status && (_jsx("span", { className: cn('absolute bottom-0 right-0 block rounded-full ring-2 ring-black', statusColors[status], size === 'xs' && 'w-2 h-2', size === 'sm' && 'w-2.5 h-2.5', size === 'md' && 'w-3 h-3', size === 'lg' && 'w-3.5 h-3.5', size === 'xl' && 'w-4 h-4') }))] }));
};
export const UniversalSkeleton = ({ width = '100%', height = '20px', variant = 'rectangular', className }) => {
    const variants = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };
    return (_jsx("div", { className: cn('animate-pulse bg-white/10', variants[variant], className), style: { width, height } }));
};
// Universal Divider
export const UniversalDivider = ({ orientation = 'horizontal', className }) => {
    return (_jsx("div", { className: cn('bg-white/10', orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full', className) }));
};
// Universal Icon Button
export const UniversalIconButton = forwardRef(({ icon, variant = 'default', size = 'md', className, ...props }, ref) => {
    const variants = {
        default: 'bg-white/10 text-white hover:bg-white/20',
        primary: 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]',
        ghost: 'text-white/60 hover:text-white hover:bg-white/5',
    };
    const sizes = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
    };
    return (_jsx("button", { ref: ref, className: cn('rounded-lg transition-all duration-200', variants[variant], sizes[size], className), ...props, children: icon }));
});
UniversalIconButton.displayName = 'UniversalIconButton';
export const UniversalCheckbox = forwardRef(({ label, className, ...props }, ref) => {
    return (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { ref: ref, type: "checkbox", className: cn('w-5 h-5 rounded border-2 border-white/20', 'checked:bg-[var(--hive-brand-secondary)] checked:border-[var(--hive-brand-secondary)]', 'focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/50 focus:ring-offset-2 focus:ring-offset-black', 'transition-all duration-200', className), ...props }), label && _jsx("span", { className: "text-white select-none", children: label })] }));
});
UniversalCheckbox.displayName = 'UniversalCheckbox';
// Export all atoms
export default {
    UniversalButton,
    UniversalInput,
    UniversalCard,
    UniversalBadge,
    UniversalAvatar,
    UniversalSkeleton,
    UniversalDivider,
    UniversalIconButton,
    UniversalCheckbox,
};
//# sourceMappingURL=universal-atoms.js.map