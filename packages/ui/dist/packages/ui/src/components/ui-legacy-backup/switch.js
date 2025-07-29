"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
export const Switch = ({ checked = false, onCheckedChange, disabled = false, className, id, }) => {
    const handleClick = () => {
        if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
        }
    };
    return (_jsx("button", { type: "button", role: "switch", "aria-checked": checked, disabled: disabled, onClick: handleClick, id: id, className: cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", checked ? "bg-primary" : "bg-input", className), children: _jsx("span", { className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform", checked ? "translate-x-5" : "translate-x-0") }) }));
};
//# sourceMappingURL=switch.js.map