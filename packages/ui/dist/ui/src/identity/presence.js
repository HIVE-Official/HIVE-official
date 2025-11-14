"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const presenceVariants = cva("rounded-full", {
    variants: {
        status: {
            online: "bg-emerald-500",
            away: "bg-amber-500",
            offline: "bg-slate-500",
            ghost: "bg-purple-500",
        },
        size: {
            sm: "h-2 w-2",
            md: "h-3 w-3",
            lg: "h-4 w-4",
        },
    },
    defaultVariants: {
        status: "offline",
        size: "md",
    },
});
export const PresenceDot = ({ status, size, className }) => {
    return _jsx("div", { className: cn(presenceVariants({ status, size }), className) });
};
PresenceDot.displayName = "PresenceDot";
//# sourceMappingURL=presence.js.map