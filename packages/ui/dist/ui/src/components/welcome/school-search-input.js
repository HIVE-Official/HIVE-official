import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { cn } from '../../lib/utils.js';
// Mock data for schools, to be replaced by Firestore data in T1-S1A-D2-03
const MOCK_SCHOOLS = [
    { id: '1', name: 'University at Buffalo' },
    { id: '2', name: 'Stony Brook University' },
    { id: '3', name: 'Binghamton University' },
    { id: '4', name: 'University at Albany' },
    { id: '5', name: 'Cornell University' },
    { id: '6', name: 'New York University' },
    { id: '7', name: 'Columbia University' },
    { id: '8', name: 'Syracuse University' },
];
const SchoolSearchInput = React.forwardRef(({ onSchoolSelect, className, ...props }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const filteredSchools = React.useMemo(() => {
        if (!searchQuery) {
            return []; // Don't show any schools until the user starts typing
        }
        return MOCK_SCHOOLS.filter((school) => school.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);
    return (_jsxs("div", { className: cn('relative w-full', className), children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" }), _jsx(Input, { ref: ref, type: "search", placeholder: "Search for your university...", className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), ...props })] }), searchQuery && (_jsx("div", { className: "absolute top-full mt-2 w-full bg-bg-card border border-border rounded-lg z-10 max-h-60 overflow-y-auto", children: filteredSchools.length > 0 ? (_jsx("ul", { children: filteredSchools.map((school) => (_jsx("li", { onClick: () => onSchoolSelect(school.id), className: "px-4 py-3 hover:bg-accent-gold/10 cursor-pointer text-sm", children: school.name }, school.id))) })) : (_jsx("p", { className: "p-4 text-center text-sm text-muted", children: "No schools found." })) }))] }));
});
SchoolSearchInput.displayName = 'SchoolSearchInput';
export { SchoolSearchInput };
//# sourceMappingURL=school-search-input.js.map