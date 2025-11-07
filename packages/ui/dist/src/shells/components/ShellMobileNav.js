'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { usePathname } from 'next/navigation';
import { MotionDiv, MotionButton, MotionNav } from '../motion-safe';
// HIVE Easing Curves
const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1],
};
// Helper function
const isPathActive = (currentPath, targetPath) => {
    if (!targetPath)
        return false;
    if (!currentPath)
        return false;
    const normalizedTarget = targetPath.split('?')[0];
    if (normalizedTarget === '/') {
        return currentPath === '/';
    }
    if (normalizedTarget === '/discover') {
        return currentPath.startsWith('/discover') || currentPath.startsWith('/spaces');
    }
    return currentPath === normalizedTarget || currentPath.startsWith(`${normalizedTarget}/`);
};
export function ShellMobileNav({ navItems, onNavigate }) {
    const pathname = usePathname();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed bottom-16 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-30" }), _jsxs(MotionNav, { className: "fixed bottom-0 left-0 right-0 z-40", "aria-label": "Bottom navigation", initial: { y: 100 }, animate: { y: 0 }, transition: { duration: 0.5, ease: HIVE_EASING.reveal }, children: [_jsx("span", { className: "sr-only", children: "\uD83C\uDFE0" }), _jsx("div", { className: "absolute inset-0 bg-[#0C1015]/95 border-t border-white/8 shadow-[0_-2px_12px_rgba(0,0,0,0.15)]" }), (() => {
                        const cols = navItems.length;
                        const gridColsClass = cols >= 5 ? 'grid-cols-5' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3';
                        return (_jsx("div", { className: `relative grid ${gridColsClass} items-center h-20 px-4 pb-4 pt-2 gap-2`, children: navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = isPathActive(pathname, item.path);
                                const badgeValue = item.badge ?? 0;
                                return (_jsxs(MotionButton, { type: "button", className: `relative flex flex-col items-center gap-0.5 rounded-xl px-0 py-1 ${isActive ? 'text-hive-brand-primary' : 'text-hive-text-secondary hover:text-hive-text-primary'}`, whileTap: { scale: 0.96 }, "aria-label": item.label, "aria-current": isActive ? 'page' : undefined, onClick: () => {
                                        if (item.onClick) {
                                            item.onClick();
                                            return;
                                        }
                                        onNavigate(item.path);
                                    }, children: [_jsx(Icon, { className: `w-6 h-6 transition-colors ${isActive ? 'text-hive-brand-primary' : 'text-hive-text-tertiary'}`, strokeWidth: isActive ? 2.5 : 2 }), badgeValue > 0 && (_jsx(MotionDiv, { className: "absolute top-0 right-2 bg-hive-brand-primary text-hive-brand-onGold text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow-hive-gold-glow", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.3, ease: HIVE_EASING.interactive }, children: badgeValue > 9 ? '9+' : badgeValue })), _jsx("span", { className: "text-[11px] font-medium", children: item.label }), isActive && (_jsx(MotionDiv, { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-white/80", layoutId: "mobileActiveIndicator", transition: { duration: 0.4, ease: HIVE_EASING.layout } }))] }, item.id));
                            }) }));
                    })()] })] }));
}
//# sourceMappingURL=ShellMobileNav.js.map