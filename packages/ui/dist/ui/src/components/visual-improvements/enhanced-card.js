import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const enhancedCardVariants = cva(
// Base styles with REAL visual presence
"relative overflow-hidden text-foreground transition-all duration-300 ease-out group", {
    variants: {
        variant: {
            // HIVE SIGNATURE: Angled corners + gold accent line
            signature: [
                "bg-gradient-to-br from-surface via-surface to-surface-02",
                "border-l-4 border-l-accent border-r border-t border-b border-border",
                "clip-path-[polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]", // Angled top-right
                "shadow-lg shadow-black/20",
                "hover:shadow-xl hover:shadow-accent/10 hover:border-l-accent/80",
                "hover:translate-x-1 hover:-translate-y-1"
            ],
            // BULLETIN BOARD: Looks pinned/posted
            bulletin: [
                "bg-surface border border-border/50",
                "transform rotate-[0.5deg] hover:rotate-0",
                "relative before:absolute before:top-2 before:left-2 before:w-3 before:h-3",
                "before:bg-accent before:rounded-full before:shadow-sm", // Pushpin effect
                "shadow-md hover:shadow-lg",
                "transition-transform duration-300"
            ],
            // ENERGY PULSE: Living, breathing card
            pulse: [
                "bg-gradient-to-r from-surface via-surface-02 to-surface",
                "border border-accent/20 rounded-xl",
                "relative before:absolute before:inset-0 before:rounded-xl",
                "before:bg-gradient-to-r before:from-transparent before:via-accent/5 before:to-transparent",
                "before:animate-pulse-slow",
                "shadow-lg hover:shadow-2xl hover:shadow-accent/20",
                "hover:scale-[1.02] hover:border-accent/40"
            ],
            // NEON GLOW: Cyberpunk energy
            neon: [
                "bg-black/90 border border-accent/30",
                "rounded-lg relative overflow-hidden",
                "shadow-[0_0_20px_rgba(255,215,0,0.1)]",
                "hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]",
                "before:absolute before:inset-0 before:bg-gradient-to-r",
                "before:from-transparent before:via-accent/5 before:to-transparent",
                "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                "before:transition-transform before:duration-700"
            ],
            // CAMPUS MESH: Tech meets organic
            mesh: [
                "bg-gradient-to-br from-surface via-surface-02 to-surface",
                "border border-border rounded-2xl relative overflow-hidden",
                "before:absolute before:inset-0 before:opacity-30",
                "before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_50%)]",
                "after:absolute after:inset-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyMTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')]",
                "after:opacity-50",
                "shadow-xl hover:shadow-2xl hover:scale-[1.01]"
            ]
        },
        size: {
            sm: "p-3",
            md: "p-4",
            lg: "p-6",
            xl: "p-8"
        },
        elevation: {
            flat: "shadow-none",
            low: "shadow-sm",
            medium: "shadow-md",
            high: "shadow-lg",
            dramatic: "shadow-2xl shadow-accent/10"
        }
    },
    defaultVariants: {
        variant: "signature",
        size: "md",
        elevation: "medium"
    }
});
const EnhancedCard = React.forwardRef(({ className, variant, size, elevation, asChild: _asChild = false, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(enhancedCardVariants({ variant, size, elevation }), className), ...props }));
});
EnhancedCard.displayName = "EnhancedCard";
export { EnhancedCard, enhancedCardVariants };
//# sourceMappingURL=enhanced-card.js.map