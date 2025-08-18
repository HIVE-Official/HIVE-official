import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '../../input';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';
export const SearchInput = ({ value, onChange, className, placeholder = "Search schools..." }) => {
    return (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" }), _jsx(Input, { type: "text", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: cn("pl-10", className) })] }));
};
//# sourceMappingURL=search-input.js.map