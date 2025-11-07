'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * SearchBar - Global search input component
 *
 * Features:
 * - Fuzzy search across posts/spaces/people
 * - Debounced input (300ms)
 * - Keyboard shortcut (Cmd+F) support
 * - Loading state indicator
 * - Clear button
 *
 * Usage:
 * ```tsx
 * import { SearchBar } from '@hive/ui';
 *
 * const [query, setQuery] = useState('');
 * const [isLoading, setIsLoading] = useState(false);
 *
 * <SearchBar
 *   value={query}
 *   onChange={setQuery}
 *   onSearch={(q) => performSearch(q)}
 *   placeholder="Search posts, spaces, people..."
 *   isLoading={isLoading}
 * />
 * ```
 */
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../../00-Global/atoms/input';
import { SearchIcon, XIcon, LoaderIcon } from '../atoms/icon-library';
export const SearchBar = React.forwardRef(({ value, onChange, onSearch, placeholder = 'Search posts, spaces, people...', isLoading = false, debounceMs = 300, className, size = 'md', }, ref) => {
    const [localValue, setLocalValue] = React.useState(value);
    const debounceTimerRef = React.useRef();
    // Sync external value changes
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);
    // Handle input change with debounce
    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange(newValue);
        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Set new timer for debounced search
        if (onSearch) {
            debounceTimerRef.current = setTimeout(() => {
                onSearch(newValue);
            }, debounceMs);
        }
    };
    // Clear search
    const handleClear = () => {
        setLocalValue('');
        onChange('');
        if (onSearch) {
            onSearch('');
        }
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
    };
    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);
    const sizeClasses = {
        sm: 'h-9 text-sm',
        md: 'h-11 text-base',
        lg: 'h-12 text-lg',
    };
    return (_jsxs("div", { className: cn('relative', className), children: [_jsx(SearchIcon, { className: cn('absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-tertiary)]', size === 'sm' && 'h-4 w-4', size === 'md' && 'h-5 w-5', size === 'lg' && 'h-5 w-5') }), _jsx(Input, { ref: ref, type: "text", value: localValue, onChange: handleChange, placeholder: placeholder, className: cn('pl-10 pr-10', sizeClasses[size], className) }), _jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: isLoading ? (_jsx(LoaderIcon, { className: cn('animate-spin text-[var(--hive-text-tertiary)]', size === 'sm' && 'h-4 w-4', size === 'md' && 'h-5 w-5', size === 'lg' && 'h-5 w-5') })) : (localValue && (_jsx("button", { type: "button", onClick: handleClear, className: "rounded-full p-1 text-[var(--hive-text-tertiary)] transition-colors hover:bg-[var(--hive-background-tertiary)] hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", "aria-label": "Clear search", children: _jsx(XIcon, { className: cn(size === 'sm' && 'h-3 w-3', size === 'md' && 'h-4 w-4', size === 'lg' && 'h-4 w-4') }) }))) })] }));
});
SearchBar.displayName = 'SearchBar';
//# sourceMappingURL=search-bar.js.map