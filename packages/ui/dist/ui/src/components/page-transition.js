"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils.js';
import { darkLuxury } from '../theme/dark-luxury.js';
export function PageTransition({ children, className }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    useEffect(() => {
        // Start transition
        setIsTransitioning(true);
        // Small delay to show transition effect
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, 150);
        return () => clearTimeout(timer);
    }, [pathname, children]);
    return (_jsxs("div", { className: cn("relative min-h-full", className), children: [_jsx("div", { className: cn("transition-all duration-300 ease-out", isTransitioning
                    ? "opacity-0 translate-y-2 scale-[0.98]"
                    : "opacity-100 translate-y-0 scale-100"), style: {
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '300ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }, children: displayChildren }), isTransitioning && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", style: {
                    background: `linear-gradient(135deg, ${darkLuxury.obsidian}95 0%, ${darkLuxury.charcoal}95 100%)`,
                    backdropFilter: 'blur(2)',
                }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin", style: {
                                color: darkLuxury.gold,
                                borderTopColor: 'transparent'
                            } }), _jsx("span", { className: "text-sm font-medium", style: { color: darkLuxury.mercury }, children: "Loading..." })] }) }))] }));
}
export default PageTransition;
//# sourceMappingURL=page-transition.js.map