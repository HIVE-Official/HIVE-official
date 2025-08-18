"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils";
export function BentoGrid({ cards, className }) {
    // Sort cards by priority
    const sortedCards = [...cards].sort((a, b) => a.priority - b.priority);
    return (_jsx("div", { className: cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8", "auto-rows-[220px] md:auto-rows-[260px]", className), children: sortedCards.map((card, index) => {
            const Component = card.component;
            return (_jsx(BentoCardWrapper, { card: card, animationDelay: index * 100, children: _jsx(Component, {}) }, card.id));
        }) }));
}
function BentoCardWrapper({ card, children, animationDelay = 0 }) {
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), animationDelay);
        return () => clearTimeout(timer);
    }, [animationDelay]);
    const sizeClasses = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-1 md:col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-1 md:col-span-2 row-span-2"
    };
    return (_jsxs("div", { className: cn("relative rounded-xl border border-[#2A2A2A] bg-[#111111] p-8", "shadow-lg shadow-black/20", "transition-all duration-[240ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "hover:border-[#FFD700]/30 hover:bg-[#111111]/90 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]", "focus-within:ring-2 focus-within:ring-[#FFD700] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0A0A]", sizeClasses[card.size], card.isLocked && "opacity-80", 
        // Staggered entrance animation
        isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-95"), children: [card.isLocked && (_jsx("div", { className: "absolute inset-0 rounded-xl bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center", children: _jsxs("div", { className: "flex items-center gap-2 text-[#FFD700]/90 text-sm font-medium bg-black/50 px-3 py-2 rounded-lg", children: [_jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }), "Coming Soon"] }) })), children] }));
}
//# sourceMappingURL=bento-grid.js.map