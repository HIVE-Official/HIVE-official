"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
const DropdownMenuContext = React.createContext({
    isOpen: false,
    setIsOpen: () => { },
});
export const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsx(DropdownMenuContext.Provider, { value: { isOpen, setIsOpen }, children: _jsx("div", { className: "relative inline-block text-left", children: children }) }));
};
export const DropdownMenuTrigger = ({ children, asChild = false, className, }) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);
    if (asChild) {
        return React.cloneElement(children, {
            onClick: () => setIsOpen(true),
        });
    }
    return (_jsx("button", { className: cn("inline-flex items-center justify-center", className), onClick: () => setIsOpen(true), children: children }));
};
export const DropdownMenuContent = ({ children, className, align = "center", }) => {
    const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setIsOpen(false) }), _jsx("div", { className: cn("absolute z-50 min-w-[max-h-32] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", align === "start" && "left-0", align === "center" && "left-1/2 -translate-x-1/2", align === "end" && "right-0", className), children: children })] }));
};
export const DropdownMenuItem = ({ children, onClick, className, }) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);
    const handleClick = () => {
        onClick?.();
        setIsOpen(false);
    };
    return (_jsx("button", { className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left", className), onClick: handleClick, children: children }));
};
export const DropdownMenuSeparator = ({ className, }) => {
    return _jsx("div", { className: cn("-mx-1 my-1 h-px bg-muted", className) });
};
export const DropdownMenuLabel = ({ children, className, }) => {
    return (_jsx("div", { className: cn("px-2 py-1.5 text-sm font-semibold", className), children: children }));
};
// Additional components for full functionality
export const DropdownMenuShortcut = ({ children, className, }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), children: children }));
};
export const DropdownMenuCheckboxItem = ({ children, checked, onCheckedChange, className }) => {
    return (_jsxs("div", { className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), onClick: () => onCheckedChange?.(!checked), children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: checked && _jsx("div", { className: "h-2 w-2 bg-current rounded-sm" }) }), children] }));
};
export const DropdownMenuRadioGroup = ({ children, value, onValueChange }) => {
    const RadioContext = React.createContext({ value, onValueChange });
    return _jsx(RadioContext.Provider, { value: { value, onValueChange }, children: children });
};
export const DropdownMenuRadioItem = ({ children, value, className }) => {
    return (_jsxs("div", { className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx("div", { className: "h-2 w-2 bg-current rounded-full" }) }), children] }));
};
export const DropdownMenuSub = ({ children }) => {
    return _jsx("div", { className: "relative", children: children });
};
export const DropdownMenuSubTrigger = ({ children, className }) => {
    return (_jsx("div", { className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className), children: children }));
};
export const DropdownMenuSubContent = ({ children, className }) => {
    return (_jsx("div", { className: cn("z-50 min-w-[max-h-32] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg", className), children: children }));
};
export const DropdownMenuGroup = ({ children, className }) => {
    return (_jsx("div", { className: cn("", className), children: children }));
};
//# sourceMappingURL=dropdown-menu.js.map