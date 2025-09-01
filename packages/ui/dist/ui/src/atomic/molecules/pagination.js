'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { Button } from '../atoms/button-enhanced.js';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
export function Pagination({ currentPage, totalPages, onPageChange, showPageNumbers = true, maxVisiblePages = 5, size = 'md', variant = 'default', className, showFirstLast = true, showPrevNext = true }) {
    const getVisiblePages = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);
        if (currentPage <= halfVisible) {
            endPage = maxVisiblePages;
        }
        if (currentPage + halfVisible >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
        }
        const pages = [];
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('ellipsis');
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('ellipsis');
            }
            pages.push(totalPages);
        }
        return pages;
    };
    const sizeClasses = {
        sm: 'h-8 min-w-8 text-sm',
        md: 'h-9 min-w-9 text-sm',
        lg: 'h-10 min-w-10 text-base'
    };
    const buttonSize = {
        sm: 'sm',
        md: 'default',
        lg: 'lg'
    };
    if (variant === 'minimal') {
        return (_jsxs("div", { className: cn('flex items-center space-x-2', className), children: [_jsx(Button, { variant: "ghost", size: buttonSize[size], onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)] px-2", children: [currentPage, " of ", totalPages] }), _jsx(Button, { variant: "ghost", size: buttonSize[size], onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: "Next" })] }));
    }
    if (variant === 'compact') {
        return (_jsxs("div", { className: cn('flex items-center space-x-1', className), children: [showPrevNext && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, "aria-label": "Previous page", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) })), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)] px-3", children: [currentPage, " / ", totalPages] }), showPrevNext && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, "aria-label": "Next page", children: _jsx(ChevronRight, { className: "h-4 w-4" }) }))] }));
    }
    return (_jsxs("nav", { className: cn('flex items-center space-x-1', className), role: "navigation", "aria-label": "Pagination", children: [showFirstLast && (_jsx(Button, { variant: "ghost", size: buttonSize[size], onClick: () => onPageChange(1), disabled: currentPage === 1, className: "px-2", children: "First" })), showPrevNext && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, "aria-label": "Previous page", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) })), showPageNumbers && getVisiblePages().map((page, index) => (page === 'ellipsis' ? (_jsx("div", { className: cn('flex items-center justify-center', sizeClasses[size]), children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" }) }, `ellipsis-${index}`)) : (_jsx(Button, { variant: page === currentPage ? "primary" : "ghost", size: buttonSize[size], onClick: () => onPageChange(page), className: cn(sizeClasses[size], page === currentPage && "pointer-events-none"), children: page }, page)))), showPrevNext && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, "aria-label": "Next page", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })), showFirstLast && (_jsx(Button, { variant: "ghost", size: buttonSize[size], onClick: () => onPageChange(totalPages), disabled: currentPage === totalPages, className: "px-2", children: "Last" }))] }));
}
export function PaginationInfo({ currentPage, totalPages, totalItems, itemsPerPage, className }) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return (_jsxs("div", { className: cn('text-sm text-[var(--hive-text-secondary)]', className), children: ["Showing ", startItem, " to ", endItem, " of ", totalItems, " results"] }));
}
// Preset configurations
export const PaginationPresets = {
    // Default table pagination
    Table: (props) => (_jsx(Pagination, { variant: "default", size: "md", ...props })),
    // Feed/list pagination
    Feed: (props) => (_jsx(Pagination, { variant: "minimal", showPageNumbers: false, ...props })),
    // Mobile-optimized pagination
    Mobile: (props) => (_jsx(Pagination, { variant: "compact", size: "sm", maxVisiblePages: 3, ...props })),
    // Search results pagination
    Search: (props) => (_jsx(Pagination, { variant: "default", showFirstLast: false, ...props }))
};
//# sourceMappingURL=pagination.js.map