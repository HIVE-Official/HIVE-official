"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CampusCard } from './campus-card';
import { SearchInput } from './search-input';
import { cn } from '@/lib/utils';
export const CampusSelector = ({ campuses, selectedCampusId, onSelect, className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredCampuses = useMemo(() => {
        if (!searchQuery)
            return campuses;
        const query = searchQuery.toLowerCase();
        return campuses.filter(campus => campus.name.toLowerCase().includes(query) ||
            campus.domain.toLowerCase().includes(query));
    }, [campuses, searchQuery]);
    // Prioritize UB and active campuses
    const sortedCampuses = useMemo(() => {
        return [...filteredCampuses].sort((a, b) => {
            // UB always first
            if (a.domain.includes('buffalo.edu'))
                return -1;
            if (b.domain.includes('buffalo.edu'))
                return 1;
            // Then active campuses
            if (a.status === 'active' && b.status !== 'active')
                return -1;
            if (a.status !== 'active' && b.status === 'active')
                return 1;
            // Then alphabetically
            return a.name.localeCompare(b.name);
        });
    }, [filteredCampuses]);
    return (_jsxs("div", { className: cn('flex flex-col gap-6', className), children: [_jsx(SearchInput, { value: searchQuery, onChange: setSearchQuery, className: "w-full" }), _jsxs(motion.div, { className: "grid gap-4", layout: true, children: [sortedCampuses.map((campus) => (_jsx(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2 }, children: _jsx(CampusCard, { ...campus, selected: campus.id === selectedCampusId, onClick: () => onSelect(campus) }) }, campus.id))), sortedCampuses.length === 0 && (_jsxs(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center text-muted-foreground", children: ["No schools found matching \"", searchQuery, "\""] }))] })] }));
};
//# sourceMappingURL=campus-selector.js.map