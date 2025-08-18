'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { InputEnhanced as Input } from '../atoms/input-enhanced';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Spinner } from '../atoms/spinner';
import { Search, X } from 'lucide-react';
export const SearchBar = ({ placeholder = 'Search...', value = '', loading = false, clearable = true, size = 'md', variant = 'default', className, onSearch, onChange, onClear, ...props }) => {
    const [internalValue, setInternalValue] = React.useState(value);
    React.useEffect(() => {
        setInternalValue(value);
    }, [value]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(internalValue);
    };
    const handleClear = () => {
        setInternalValue('');
        onChange?.('');
        onClear?.();
    };
    const showClearButton = clearable && internalValue.length > 0 && !loading;
    return (_jsxs("form", { onSubmit: handleSubmit, className: cn('relative', className), children: [_jsx(Input, { type: "search", placeholder: placeholder, value: internalValue, onChange: handleChange, variant: variant, size: size, leftIcon: loading ? (_jsx(Spinner, { size: "sm", color: "secondary" })) : (_jsx(Search, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" })), rightIcon: showClearButton ? (_jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: handleClear, className: "h-6 w-6 p-0 hover:bg-transparent", children: _jsx(X, { className: "h-4 w-4" }) })) : undefined, className: cn(
                // Add padding for icons
                'pr-10', showClearButton && 'pr-16'), ...props }), _jsx("button", { type: "submit", className: "sr-only", children: "Search" })] }));
};
//# sourceMappingURL=search-bar.js.map