'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from 'lucide-react';
import { cn } from '../lib/utils.js';
import { InputEnhanced } from '../atomic/atoms/input-enhanced.js';
export const SearchBar = ({ onSearch, placeholder = "Search...", showIcon = true, className, onChange, ...props }) => {
    const handleChange = (e) => {
        onChange?.(e);
        onSearch?.(e.target.value);
    };
    return (_jsxs("div", { className: cn("relative", className), children: [showIcon && (_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" })), _jsx(InputEnhanced, { type: "search", placeholder: placeholder, onChange: handleChange, className: cn(showIcon && "pl-10"), ...props })] }));
};
//# sourceMappingURL=search-bar.js.map