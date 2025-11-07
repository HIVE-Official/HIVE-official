import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { cn } from '../../lib/utils';
export function SearchBar({ placeholder = 'Search…', onSearch, className, defaultValue }) {
    const [value, setValue] = React.useState(defaultValue ?? '');
    return (_jsxs("div", { className: cn('flex items-center gap-2 rounded-hive-card border border-hive-border-default bg-hive-background-secondary p-2', className), children: [_jsx(Input, { value: value, onChange: (e) => setValue(e.target.value), placeholder: placeholder, className: "flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:outline-none", "aria-label": "Search" }), _jsx(Button, { onClick: () => onSearch?.(value), variant: "primary", size: "sm", children: "Search" })] }));
}
//# sourceMappingURL=search-bar.js.map