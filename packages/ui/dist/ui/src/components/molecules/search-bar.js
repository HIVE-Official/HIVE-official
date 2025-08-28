'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export const SearchBar = React.forwardRef(({ placeholder = "Search...", value = "", onValueChange, onSearch, onClear, suggestions = [], onSuggestionSelect, isLoading = false, debounceMs = 300, className, disabled = false, autoFocus = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [isFocused, setIsFocused] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const inputRef = React.useRef(null);
    const suggestionsRef = React.useRef(null);
    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current, []);
    // Debounced search effect
    React.useEffect(() => {
        if (debounceMs <= 0)
            return;
        const timer = setTimeout(() => {
            if (onSearch && internalValue !== value) {
                onSearch(internalValue);
            }
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [internalValue, onSearch, debounceMs, value]);
    // Update internal value when prop changes
    React.useEffect(() => {
        setInternalValue(value);
    }, [value]);
    const handleValueChange = (newValue) => {
        setInternalValue(newValue);
        setSelectedIndex(-1);
        onValueChange?.(newValue);
    };
    const handleClear = () => {
        setInternalValue("");
        setSelectedIndex(-1);
        onValueChange?.("");
        onClear?.();
        inputRef.current?.focus();
    };
    const handleSuggestionSelect = (suggestion) => {
        setInternalValue(suggestion.label);
        setIsFocused(false);
        setSelectedIndex(-1);
        onValueChange?.(suggestion.label);
        onSuggestionSelect?.(suggestion);
    };
    const handleKeyDown = (e) => {
        if (!suggestions.length)
            return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                }
                else if (onSearch) {
                    onSearch(internalValue);
                    setIsFocused(false);
                }
                break;
            case 'Escape':
                setIsFocused(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };
    const showSuggestions = isFocused && suggestions.length > 0 && internalValue.length > 0;
    return (_jsxs("div", { className: cn("relative w-full", className), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/50", children: _jsx(SearchIcon, { className: "h-4 w-4" }) }), _jsx(Input, { ref: inputRef, type: "search", placeholder: placeholder, value: internalValue, onChange: (e) => handleValueChange(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => {
                            // Delay blur to allow suggestion clicks
                            setTimeout(() => setIsFocused(false), 200);
                        }, onKeyDown: handleKeyDown, disabled: disabled, autoFocus: autoFocus, className: cn("pl-10 pr-10", showSuggestions && "rounded-b-none"), ...props }), internalValue.length > 0 && (_jsx(Button, { variant: "ghost", size: "small", className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0", onClick: handleClear, tabIndex: -1, "aria-label": "Clear search", children: _jsx(ClearIcon, { className: "h-4 w-4" }) })), isLoading && (_jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: _jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-[#FFD700]" }) }))] }), showSuggestions && (_jsx("div", { ref: suggestionsRef, className: cn("absolute z-50 w-full mt-1 bg-[#1C1C1E] border border-white/12 rounded-lg shadow-lg max-h-60 overflow-auto", "border-t-0 rounded-t-none"), children: suggestions.map((suggestion, index) => (_jsx("button", { className: cn("w-full px-3 py-2 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-none transition-colors", "border-b border-white/8 last:border-b-0", selectedIndex === index && "bg-white/10"), onClick: () => handleSuggestionSelect(suggestion), onMouseEnter: () => setSelectedIndex(index), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-white truncate", children: highlightMatch(suggestion.label, internalValue) }), suggestion.description && (_jsx("div", { className: "text-xs text-white/70 truncate mt-1", children: suggestion.description }))] }), suggestion.type && (_jsx("div", { className: "ml-2 px-2 py-1 bg-[#FFD700]/10 text-[#FFD700] text-xs rounded", children: suggestion.type }))] }) }, suggestion.id))) }))] }));
});
SearchBar.displayName = "SearchBar";
// Helper function to highlight matching text
function highlightMatch(text, query) {
    if (!query.trim())
        return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => regex.test(part) ? (_jsx("mark", { className: "bg-[#FFD700]/20 text-[#FFD700]", children: part }, index)) : (part));
}
// Icons
const SearchIcon = ({ className }) => (_jsx("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }));
const ClearIcon = ({ className }) => (_jsx("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }));
// Search Bar Presets for different contexts
export const SearchBarPresets = {
    // Global Search
    GlobalSearch: (props) => (_jsx(SearchBar, { placeholder: "Search campus, spaces, tools...", ...props })),
    // Space Search
    SpaceSearch: (props) => (_jsx(SearchBar, { placeholder: "Search spaces...", ...props })),
    // Tool Search
    ToolSearch: (props) => (_jsx(SearchBar, { placeholder: "Search tools...", ...props })),
    // Member Search
    MemberSearch: (props) => (_jsx(SearchBar, { placeholder: "Search members...", ...props })),
};
export { SearchBar as SearchBarMolecule };
//# sourceMappingURL=search-bar.js.map