'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, X, Check } from 'lucide-react';
const selectVariants = {
    default: [
        'bg-[var(--hive-background-secondary)]',
        'border border-[var(--hive-border-strong)]',
        'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
        'hover:border-[var(--hive-border-hover)]'
    ].join(' '),
    outline: [
        'bg-transparent',
        'border border-[var(--hive-border-strong)]',
        'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
        'hover:border-[var(--hive-border-hover)]'
    ].join(' '),
    ghost: [
        'bg-transparent',
        'border border-transparent',
        'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-border-strong)]'
    ].join(' '),
    filled: [
        'bg-[var(--hive-background-tertiary)]',
        'border border-transparent',
        'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-brand-secondary)]'
    ].join(' ')
};
const selectSizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base'
};
export const Select = React.forwardRef(({ options, value, placeholder = 'Select...', multiple = false, searchable = false, clearable = false, disabled = false, error, label, helperText, size = 'md', variant = 'default', fullWidth = true, onChange, onSearch, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const selectRef = React.useRef(null);
    React.useImperativeHandle(ref, () => selectRef.current);
    // Handle outside clicks
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
        if (!searchable || !searchQuery)
            return options;
        return options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [options, searchQuery, searchable]);
    // Get selected options
    const selectedOptions = React.useMemo(() => {
        if (!value)
            return [];
        const values = Array.isArray(value) ? value : [value];
        return options.filter(option => values.includes(option.value));
    }, [value, options]);
    const handleOptionClick = (option) => {
        if (option.disabled)
            return;
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValues = currentValues.includes(option.value)
                ? currentValues.filter(v => v !== option.value)
                : [...currentValues, option.value];
            onChange?.(newValues);
        }
        else {
            onChange?.(option.value);
            setIsOpen(false);
            setSearchQuery('');
        }
    };
    const handleClear = () => {
        onChange?.(multiple ? [] : '');
    };
    const displayText = React.useMemo(() => {
        if (selectedOptions.length === 0)
            return placeholder;
        if (multiple) {
            return selectedOptions.length === 1
                ? selectedOptions[0].label
                : `${selectedOptions.length} selected`;
        }
        return selectedOptions[0]?.label || placeholder;
    }, [selectedOptions, placeholder, multiple]);
    const baseClasses = [
        'relative flex items-center justify-between',
        'rounded-xl cursor-pointer',
        'transition-all duration-200 ease-out',
        'font-medium text-[var(--hive-text-primary)]',
        selectVariants[variant],
        selectSizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        error && 'border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[var(--hive-status-error)]/20',
        fullWidth && 'w-full'
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { className: cn('space-y-2', fullWidth && 'w-full'), children: [label && (_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: label })), _jsxs("div", { ref: selectRef, className: "relative", children: [_jsxs("div", { className: baseClasses, onClick: () => !disabled && setIsOpen(!isOpen), ...props, children: [_jsx("span", { className: cn('flex-1 text-left truncate', selectedOptions.length === 0 && 'text-[var(--hive-text-tertiary)]'), children: displayText }), _jsxs("div", { className: "flex items-center gap-2", children: [clearable && selectedOptions.length > 0 && (_jsx("button", { type: "button", onClick: (e) => {
                                            e.stopPropagation();
                                            handleClear();
                                        }, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(X, { className: "h-4 w-4" }) })), _jsx(ChevronDown, { className: cn('h-4 w-4 text-[var(--hive-text-secondary)] transition-transform duration-200', isOpen && 'rotate-180') })] })] }), isOpen && (_jsxs("div", { className: "absolute z-50 w-full mt-1 bg-[var(--hive-background-tertiary)] border-2 border-[var(--hive-border-strong)] rounded-xl shadow-[var(--hive-shadow-level4)] max-h-60 overflow-auto", children: [searchable && (_jsx("div", { className: "p-2 border-b border-[var(--hive-border-strong)]", children: _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => {
                                        setSearchQuery(e.target.value);
                                        onSearch?.(e.target.value);
                                    }, className: "w-full px-3 py-2 bg-[var(--hive-background-interactive)] border border-[var(--hive-border-strong)] rounded-lg text-sm focus:outline-none focus:border-[var(--hive-brand-secondary)] text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-placeholder)]" }) })), _jsxs("div", { className: "py-1", children: [filteredOptions.length === 0 ? (_jsx("div", { className: "px-3 py-2 text-sm text-[var(--hive-text-secondary)]", children: "No options found" })) : (filteredOptions.map((option) => {
                                        const isSelected = selectedOptions.some(selected => selected.value === option.value);
                                        return (_jsxs("div", { className: cn('flex items-center justify-between px-3 py-2 text-sm cursor-pointer text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-background-interactive)]', option.disabled && 'opacity-50 cursor-not-allowed', isSelected && 'bg-[var(--hive-background-interactive)] text-[var(--hive-brand-secondary)]'), onClick: () => handleOptionClick(option), children: [_jsx("span", { className: "truncate", children: option.label }), isSelected && (_jsx(Check, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }))] }, option.value));
                                    })), ")}"] })] }))] }), (error || helperText) && (_jsx("p", { className: cn('text-xs', error ? 'text-[var(--hive-status-error)]' : 'text-[var(--hive-text-secondary)]'), children: error || helperText }))] }));
});
Select.displayName = 'Select';
//# sourceMappingURL=select.js.map