"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { Search, Command, X, ArrowRight } from 'lucide-react';
import { motion } from '../framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
// HIVE Navigation Input variants - Following input design patterns
const hiveNavigationInputVariants = cva(
// Base styles - premium search input with semantic tokens
"relative w-full transition-all duration-300 ease-out backdrop-blur-sm", {
    variants: {
        variant: {
            // Standard search input
            default: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
            // Command palette style
            command: "bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-xl focus-within:shadow-[var(--hive-shadow-gold-glow)]",
            // Minimal variant
            minimal: "bg-[var(--hive-overlay-glass)] border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:bg-[var(--hive-background-secondary)]",
            // Premium variant with gold accent
            premium: "bg-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-[var(--hive-brand-secondary)])] text-[var(--hive-text-primary)] focus-within:border-[var(--hive-brand-primary)] focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
        },
        size: {
            sm: "h-8 text-sm rounded-xl",
            default: "h-10 text-sm rounded-2xl",
            lg: "h-12 text-base rounded-2xl",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
export function HiveNavigationInput({ variant, size, onSearch, onClear, showShortcut = true, shortcutKey = "K", icon, rightIcon, clearable = true, loading = false, className, value, onChange, placeholder = "Search...", ...props }) {
    const [internalValue, setInternalValue] = useState(value || '');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const searchValue = value !== undefined ? value : internalValue;
    const hasValue = typeof searchValue === 'string' ? searchValue.length > 0 : Boolean(searchValue);
    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(e);
        onSearch?.(newValue);
    };
    const handleClear = () => {
        const newValue = '';
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onClear?.();
        inputRef.current?.focus();
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClear();
        }
    };
    return (_jsxs(motion.div, { className: cn(hiveNavigationInputVariants({ variant, size }), "flex items-center overflow-hidden", className), style: {
            willChange: 'transform',
            transformOrigin: 'center',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
        }, whileFocus: { scale: 1.01 }, children: [icon || (_jsx("div", { className: "flex items-center justify-center w-10 h-full", children: _jsx(Search, { className: "w-4 h-4", style: { color: 'var(--hive-text-muted)' } }) })), _jsx("input", { ref: inputRef, type: "text", value: searchValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), placeholder: placeholder, className: cn("flex-1 h-full px-2 bg-transparent border-0 outline-none", "placeholder:text-[var(--hive-text-muted)]", "text-[var(--hive-text-primary)]"), style: {
                    fontFamily: 'var(--hive-font-family-primary)',
                    fontSize: `var(--hive-font-size-${size === 'sm' ? 'sm' : size === 'lg' ? 'base' : 'sm'})`,
                    fontWeight: 'var(--hive-font-weight-regular)'
                }, ...props }), _jsxs("div", { className: "flex items-center gap-2 px-2", children: [loading && (_jsx(motion.div, { className: "w-4 h-4 border-2 border-t-transparent rounded-full", style: { borderColor: 'var(--hive-brand-primary)' }, animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } })), clearable && hasValue && !loading && (_jsx(motion.button, { onClick: handleClear, className: "flex items-center justify-center w-6 h-6 rounded-full hover:bg-[var(--hive-interactive-hover)] transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(X, { className: "w-3 h-3", style: { color: 'var(--hive-text-muted)' } }) })), rightIcon && (_jsx("div", { className: "flex items-center justify-center w-6 h-6", children: rightIcon })), showShortcut && !hasValue && !loading && (_jsxs(motion.div, { className: "flex items-center gap-1 px-2 py-1 rounded border", style: {
                            backgroundColor: 'var(--hive-background-primary)',
                            borderColor: 'var(--hive-border-subtle)',
                            color: 'var(--hive-text-muted)'
                        }, initial: { opacity: 0 }, animate: { opacity: isFocused ? 0 : 1 }, transition: { duration: 0.2 }, children: [_jsx(Command, { className: "w-3 h-3" }), _jsx("span", { className: "text-xs font-medium", children: shortcutKey })] }))] })] }));
}
export function HiveCommandResult({ title, subtitle, icon, shortcut, isSelected, onClick, className }) {
    return (_jsxs(motion.button, { onClick: onClick, className: cn("w-full flex items-center px-3 py-2 text-left transition-all duration-200 rounded-2xl", isSelected
            ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]"
            : "text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", className), whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [icon && (_jsx("div", { className: "flex items-center justify-center w-8 h-8 mr-3", children: icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: title }), subtitle && (_jsx("div", { className: "text-xs truncate mt-1", style: {
                            color: isSelected ? 'var(--hive-text-inverse)' : 'var(--hive-text-muted)',
                            opacity: isSelected ? 0.8 : 1
                        }, children: subtitle }))] }), _jsxs("div", { className: "flex items-center gap-2 ml-2", children: [shortcut && (_jsx("kbd", { className: "px-2 py-1 text-xs font-medium border rounded", style: {
                            backgroundColor: isSelected ? 'var(--hive-background-primary)' : 'var(--hive-background-secondary)',
                            borderColor: isSelected ? 'var(--hive-border-primary)' : 'var(--hive-border-subtle)',
                            color: isSelected ? 'var(--hive-text-primary)' : 'var(--hive-text-muted)'
                        }, children: shortcut })), _jsx(ArrowRight, { className: "w-4 h-4 opacity-50" })] })] }));
}
export function HiveCommandSection({ title, count, className }) {
    return (_jsx("div", { className: cn("px-3 py-2 mb-1", className), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider", style: {
                        color: 'var(--hive-text-muted)',
                        fontFamily: 'var(--hive-font-family-primary)',
                        fontSize: 'var(--hive-font-size-xs)',
                        fontWeight: 'var(--hive-font-weight-semibold)',
                        letterSpacing: 'var(--hive-letter-spacing-wider)'
                    }, children: title }), count && (_jsx("span", { className: "text-xs px-2 py-1 rounded-full", style: {
                        backgroundColor: 'var(--hive-background-tertiary)',
                        color: 'var(--hive-text-muted)'
                    }, children: count }))] }) }));
}
//# sourceMappingURL=hive-navigation-input.js.map