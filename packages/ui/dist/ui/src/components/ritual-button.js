import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils.js";
const ritualButtonVariants = cva(
// Base: Special HIVE moments - campus energy and celebration
"inline-flex items-center justify-center whitespace-nowrap font-medium relative overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group", {
    variants: {
        variant: {
            // RITUAL: Full gold fill for special HIVE moments
            ritual: [
                "bg-accent text-[var(--hive-text-primary)] border-2 border-accent font-semibold",
                "hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]",
                "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-accent",
                "active:scale-[0.98] active:shadow-lg",
                "disabled:bg-accent/50 disabled:text-[var(--hive-text-primary)]/70"
            ],
            // CELEBRATION: Gold glow for achievements
            celebration: [
                "bg-accent text-[var(--hive-text-primary)] border-2 border-accent font-bold",
                "shadow-[0_0_20px_rgba(255,215,0,0.3)]",
                "hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105",
                "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                "active:scale-95 animate-pulse"
            ],
            // ENERGY: Campus energy pulse
            energy: [
                "bg-gradient-to-r from-accent/80 via-accent to-accent/80 text-[var(--hive-text-primary)] border-2 border-accent",
                "relative before:absolute before:inset-0 before:bg-gradient-to-r",
                "before:from-transparent before:via-white/20 before:to-transparent before:scale-x-0",
                "before:transition-transform before:duration-500 before:ease-out",
                "hover:before:scale-x-100 hover:shadow-lg",
                "font-semibold animate-pulse-subtle hover:animate-none"
            ]
        },
        size: {
            md: "h-10 px-6 text-base rounded-lg",
            lg: "h-12 px-8 text-lg rounded-xl",
            xl: "h-14 px-10 text-xl rounded-2xl"
        }
    },
    defaultVariants: {
        variant: "ritual",
        size: "lg"
    }
});
const RitualButton = React.forwardRef(({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { className: cn(ritualButtonVariants({ variant, size }), className), ref: ref, disabled: disabled || loading, "aria-busy": loading, ...props, children: loading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), _jsx("span", { className: "opacity-80", children: "Loading..." })] })) : (children) }));
});
RitualButton.displayName = "RitualButton";
export { RitualButton, ritualButtonVariants };
//# sourceMappingURL=ritual-button.js.map