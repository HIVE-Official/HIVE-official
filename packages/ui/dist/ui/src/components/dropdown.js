'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
export const Dropdown = ({ children, className }) => {
    return _jsx("div", { className: cn("relative inline-block text-left", className), children: children });
};
export const DropdownTrigger = ({ children, className }) => {
    return _jsx("div", { className: cn("cursor-pointer", className), children: children });
};
export const DropdownMenu = ({ children, className, open = false }) => {
    if (!open)
        return null;
    return (_jsx("div", { className: cn("absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md", "bg-[var(--hive-background-primary)] shadow-lg ring-1 ring-black ring-opacity-5", className), children: children }));
};
export const DropdownMenuItem = ({ children, className, onClick }) => {
    return (_jsx("div", { className: cn("block px-4 py-2 text-sm text-[var(--hive-text-primary)]", "hover:bg-[var(--hive-interactive-hover)] cursor-pointer", className), onClick: onClick, children: children }));
};
export const DropdownMenuContent = DropdownMenu;
export const DropdownMenuTrigger = DropdownTrigger;
export const DropdownItem = DropdownMenuItem;
//# sourceMappingURL=dropdown.js.map