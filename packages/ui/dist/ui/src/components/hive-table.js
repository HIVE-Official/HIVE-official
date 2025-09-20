"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { Eye, Edit, Trash2 } from 'lucide-react';
const hiveTableVariants = cva(
// Base table styles - matte obsidian glass
"relative w-full bg-[var(--hive-background-primary)]/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden", {
    variants: {
        variant: {
            default: "",
            premium: "border-yellow-500/20",
            minimal: "border-white/5 bg-transparent",
        },
        density: {
            compact: "",
            default: "",
            spacious: "",
        }
    },
    defaultVariants: {
        variant: "default",
        density: "default",
    },
});
// Row animation variants
const rowVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Header cell animation variants
const headerVariants = {
    rest: {
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        backgroundColor: 'var(--hive-interactive-active)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
const HiveTable = ({ className, variant, density, data, columns, loading = false, empty, sortable = true, filterable = true, searchable = true, selectable = false, pagination = true, pageSize = 10, onSort, onFilter, onSearch, onSelect, onRowClick, onRowDoubleClick, rowActions, bulkActions, toolbar, stickyHeader = true, virtualizeRows = false, expandable = false, expandedRowRender, ...props }) => {
    const [currentSort, setCurrentSort] = useState({ column: '', direction: null });
    const [filters, setFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    // Process data with search, filter, and sort
    const processedData = useMemo(() => {
        let filtered = [...data];
        // Apply search
        if (searchQuery && searchable) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(row => columns.some(column => {
                const value = column.accessor
                    ? typeof column.accessor === 'function'
                        ? column.accessor(row)
                        : row[column.accessor]
                    : '';
                return String(value).toLowerCase().includes(query);
            }));
        }
    });
};
// Apply filters
filters.forEach(filter => {
    filtered = filtered.filter(row => {
        const column = columns.find(col => col.id === filter.column);
        if (!column)
            return true;
        const value = column.accessor
            ? typeof column.accessor === 'function'
                ? column.accessor(row)
                : row[column.accessor]
            : '';
        switch (filter.operator) {
            case 'equals':
                return value === filter.value;
            case 'contains':
                return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
            case 'startsWith':
                return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
            case 'endsWith':
                return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
            case 'greaterThan':
                return Number(value) > Number(filter.value);
            case 'lessThan':
                return Number(value) < Number(filter.value);
            default:
                return true;
        }
    });
});
// Apply sort
if (currentSort.column && currentSort.direction) {
    const column = columns.find(col => col.id === currentSort.column);
    if (column) {
        filtered.sort((a, b) => {
            const aValue = column.accessor
                ? typeof column.accessor === 'function'
                    ? column.accessor(a)
                    : a[column.accessor]
                : '';
            const bValue = column.accessor
                ? typeof column.accessor === 'function'
                    ? column.accessor(b)
                    : b[column.accessor]
                : '';
            let comparison = 0;
            if (column.type === 'number') {
                comparison = Number(aValue) - Number(bValue);
            }
            else if (column.type === 'date') {
                comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
            }
            else {
                comparison = String(aValue).localeCompare(String(bValue));
            }
            return currentSort.direction === 'asc' ? comparison : -comparison;
        });
    }
}
return filtered;
[data, columns, searchQuery, filters, currentSort, searchable];
;
// Pagination calculations
const totalPages = Math.ceil(processedData.length / pageSize);
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const paginatedData = pagination ? processedData.slice(startIndex, endIndex) : processedData;
// Handle sorting
const handleSort = useCallback((columnId) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable)
        return;
    let newDirection = 'asc';
    if (currentSort.column === columnId) {
        if (currentSort.direction === 'asc') {
            newDirection = 'desc';
        }
        else if (currentSort.direction === 'desc') {
            newDirection = null;
        }
    }
    const newSort = { column: columnId, direction: newDirection };
    setCurrentSort(newSort);
    onSort?.(newSort);
}, [columns, currentSort, onSort]);
// Handle filtering
const handleFilter = useCallback((columnId, value, operator = 'contains') => {
    const newFilters = filters.filter(f => f.column !== columnId);
    if (value !== '' && value !== null && value !== undefined) {
        newFilters.push({ column: columnId, value, operator });
    }
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
    onFilter?.(newFilters);
}, [filters, onFilter]);
// Handle search
const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
    onSearch?.(query);
}, [onSearch]);
// Handle row selection
const handleRowSelect = useCallback((index, selected) => {
    const newSelected = new Set(selectedRows);
    if (selected) {
        newSelected.add(index);
    }
    else {
        newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    const selectedData = Array.from(newSelected).map(idx => paginatedData[idx]).filter(Boolean);
    onSelect?.(selectedData);
}, [selectedRows, paginatedData, onSelect]);
// Handle select all
const handleSelectAll = useCallback((selected) => {
    if (selected) {
        const allIndices = new Set(paginatedData.map((_, idx) => idx));
        setSelectedRows(allIndices);
        onSelect?.(paginatedData);
    }
    else {
        setSelectedRows(new Set());
        onSelect?.([]);
    }
}, [paginatedData, onSelect]);
// Handle row expansion
const handleRowExpand = useCallback((index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
        newExpanded.delete(index);
    }
    else {
        newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
}, [expandedRows]);
// Render cell content
const renderCellContent = useCallback((column, row, index) => {
    const value = column.accessor
        ? typeof column.accessor === 'function'
            ? column.accessor(row)
            : row[column.accessor]
        : '';
    if (column.render) {
        return column.render(value, row, index);
    }
    // Default rendering based on type
    switch (column.type) {
        case 'boolean':
            return value ? '✓' : '✗';
        case 'date':
            return value ? new Date(value).toLocaleDateString() : '';
        case 'number':
            return typeof value === 'number' ? value.toLocaleString() : value;
        default:
            return String(value || '');
    }
}, []);
const allSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;
const someSelected = selectedRows.size > 0 && selectedRows.size < paginatedData.length;
return (_jsxs("div", { className: cn(hiveTableVariants({ variant, density, className })), ...props, children: [(toolbar || searchable || bulkActions) && (_jsx("div", { className: "p-4 border-b border-white/10 bg-[var(--hive-background-primary)]/10", children: _jsxs("div", { className: "flex items-center justify-between space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [searchable && (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-primary)]/40", size: 16 }), _jsx("input", { className: "bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-[var(--hive-text-primary)] placeholder-white/40 focus:outline-none focus:border-yellow-500/50", placeholder: "Search...", value: searchQuery, onChange: (e) => handleSearch(e.target.value) })] })), selectedRows.size > 0 && bulkActions && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-sm text-[var(--hive-text-primary)]/60", children: [selectedRows.size, " selected"] }), bulkActions] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [toolbar, _jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(RefreshCw, { size: 16 }) }), _jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Download, { size: 16 }) })] })] }) })), _jsx("div", { className: "overflow-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: cn("bg-[var(--hive-background-primary)]/20 backdrop-blur-sm", stickyHeader && "sticky top-0 z-10"), children: _jsxs("tr", { children: [selectable && (_jsx("th", { className: "w-12 p-4", children: _jsx("input", { type: "checkbox", checked: allSelected, ref: (input) => {
                                            if (input)
                                                input.indeterminate = someSelected;
                                        }, onChange: (e) => handleSelectAll(e.target.checked), className: "rounded border-white/20 bg-[var(--hive-background-primary)]/40 text-yellow-500 focus:ring-yellow-500" }) })), expandable && (_jsx("th", { className: "w-12 p-4" })), columns.map((column) => (_jsx(motion.th, { className: cn("p-4 text-left font-semibold text-[var(--hive-text-primary)] border-b border-white/10", column.sortable && "cursor-pointer select-none", density === 'compact' && "p-2", density === 'spacious' && "p-6"), style: {
                                        width: column.width,
                                        minWidth: column.minWidth
                                    }, variants: headerVariants, initial: "rest", whileHover: column.sortable ? "hover" : "rest", onClick: () => column.sortable && handleSort(column.id), children: _jsxs("div", { className: "flex items-center space-x-2", children: [column.headerRender ? column.headerRender() : (_jsx("span", { children: column.header })), column.sortable && (_jsxs("div", { className: "flex flex-col", children: [_jsx(ChevronUp, { size: 12, className: cn("transition-colors", currentSort.column === column.id && currentSort.direction === 'asc'
                                                            ? "text-yellow-400"
                                                            : "text-[var(--hive-text-primary)]/40") }), _jsx(ChevronDown, { size: 12, className: cn("transition-colors -mt-1", currentSort.column === column.id && currentSort.direction === 'desc'
                                                            ? "text-yellow-400"
                                                            : "text-[var(--hive-text-primary)]/40") })] }))] }) }, column.id))), rowActions && (_jsx("th", { className: "w-20 p-4 text-center font-semibold text-[var(--hive-text-primary)] border-b border-white/10", children: "Actions" }))] }) }), _jsx("tbody", { children: _jsx(AnimatePresence, { mode: "popLayout", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0), className: "p-8 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2 text-[var(--hive-text-primary)]/60", children: [_jsx(RefreshCw, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Loading..." })] }) }) })) : paginatedData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0), className: "p-8 text-center", children: empty || (_jsxs("div", { className: "text-[var(--hive-text-primary)]/60", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDCCB" }), _jsx("div", { children: "No data found" })] })) }) })) : (paginatedData.map((row, index) => (_jsxs(React.Fragment, { children: [_jsxs(motion.tr, { className: cn("border-b border-white/5 cursor-pointer", selectedRows.has(index) && "bg-yellow-500/10"), variants: rowVariants, initial: "hidden", animate: "visible", exit: "hidden", whileHover: "hover", onClick: () => onRowClick?.(row, index), onDoubleClick: () => onRowDoubleClick?.(row, index), custom: index, children: [selectable && (_jsx("td", { className: "p-4", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: selectedRows.has(index), onChange: (e) => handleRowSelect(index, e.target.checked), className: "rounded border-white/20 bg-[var(--hive-background-primary)]/40 text-yellow-500 focus:ring-yellow-500" }) })), expandable && (_jsx("td", { className: "p-4", onClick: (e) => e.stopPropagation(), children: _jsx(motion.button, { className: "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors", onClick: () => handleRowExpand(index), whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(motion.div, { animate: { rotate: expandedRows.has(index) ? 90 : 0 }, transition: { duration: motionDurations.quick }, children: _jsx(ChevronRight, { size: 16 }) }) }) })), columns.map((column) => (_jsx("td", { className: cn("p-4 text-[var(--hive-text-primary)]/80", density === 'compact' && "p-2", density === 'spacious' && "p-6"), children: renderCellContent(column, row, index) }, column.id))), rowActions && (_jsx("td", { className: "p-4 text-center", onClick: (e) => e.stopPropagation(), children: rowActions(row, index) }))] }), expandable && expandedRows.has(index) && expandedRowRender && (_jsx(motion.tr, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: motionDurations.smooth }, children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0), children: _jsx("div", { className: "bg-[var(--hive-background-primary)]/10 p-4 border-l-4 border-yellow-500/30", children: expandedRowRender(row, index) }) }) }))] }, index)))) }) })] }) }), pagination && totalPages > 1 && (_jsx("div", { className: "p-4 border-t border-white/10 bg-[var(--hive-background-primary)]/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-primary)]/60", children: ["Showing ", startIndex + 1, " to ", Math.min(endIndex, processedData.length), " of ", processedData.length, " results"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors disabled:opacity-50", disabled: currentPage === 1, onClick: () => setCurrentPage(1), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(ChevronsLeft, { size: 16 }) }), _jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors disabled:opacity-50", disabled: currentPage === 1, onClick: () => setCurrentPage(currentPage - 1), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(ChevronLeft, { size: 16 }) }), _jsx("div", { className: "flex items-center space-x-1", children: Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                    return (_jsx(motion.button, { className: cn("px-3 py-1 rounded-lg text-sm font-medium transition-colors", currentPage === pageNum
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                            : "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10"), onClick: () => setCurrentPage(pageNum), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: pageNum }, pageNum));
                                }) }), _jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors disabled:opacity-50", disabled: currentPage === totalPages, onClick: () => setCurrentPage(currentPage + 1), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(ChevronRight, { size: 16 }) }), _jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors disabled:opacity-50", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(ChevronsRight, { size: 16 }) })] })] }) }))] }));
;
// Default row actions component
export const DefaultRowActions = ({ onView, onEdit, onDelete }) => (_jsxs("div", { className: "flex items-center space-x-1", children: [onView && (_jsx(motion.button, { className: "p-1 text-[var(--hive-text-primary)]/60 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors", onClick: onView, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Eye, { size: 14 }) })), onEdit && (_jsx(motion.button, { className: "p-1 text-[var(--hive-text-primary)]/60 hover:text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors", onClick: onEdit, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Edit, { size: 14 }) })), onDelete && (_jsx(motion.button, { className: "p-1 text-[var(--hive-text-primary)]/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors", onClick: onDelete, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Trash2, { size: 14 }) }))] }));
export { HiveTable, hiveTableVariants };
//# sourceMappingURL=hive-table.js.map