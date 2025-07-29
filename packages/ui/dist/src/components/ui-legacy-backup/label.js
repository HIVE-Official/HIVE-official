"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
export const Label = ({ children, className, ...props }) => {
    return (_jsx("label", { className: cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className), ...props, children: children }));
};
//# sourceMappingURL=label.js.map