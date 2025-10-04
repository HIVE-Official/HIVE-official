"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../atoms/card";
import { Separator } from "../atoms/separator";
import { cn } from "../../lib/utils";
import { Users, ChevronRight, Pin } from "lucide-react";
/**
 * Joined Space Card
 *
 * Built on shadcn Card with HIVE monochrome + gold visual language.
 * For "My Spaces" section - spaces the user has already joined.
 *
 * Design Strategy:
 * - shadcn Card as base (no reinventing primitives)
 * - Monochrome hierarchy (muted backgrounds, subtle borders)
 * - Gold accent ONLY for active state (hover)
 * - Motion on hover for tactile feel
 * - Cover image as visual anchor
 *
 * Differentiation from generic cards:
 * - Vertical layout with cover image on top
 * - Unread count badge (gold when active)
 * - ChevronRight for affordance
 * - Hover state with gold border
 */
const JoinedSpaceCard = React.forwardRef(({ className, title, description, coverImage, memberCount, unreadCount, onClick, ...props }, ref) => {
    return (_jsx(motion.div, { whileHover: { y: -4, rotate: 0.5 }, transition: { duration: 0.25, ease: "easeOut" }, children: _jsxs(Card, { ref: ref, className: cn("relative overflow-hidden cursor-pointer group", "transition-all duration-[400ms] ease-smooth", 
            // Paper texture (subtle noise grain)
            "before:absolute before:inset-0 before:opacity-[0.015] before:pointer-events-none before:z-0", "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]", 
            // Layered paper shadow (HIVE design system)
            "shadow-hive-sm", "hover:border-primary hover:shadow-hive-glow", className), onClick: onClick, ...props, children: [_jsx("div", { className: "absolute top-3 left-3 z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-fast", children: _jsx(Pin, { className: "h-4 w-4 text-muted-foreground rotate-45", "aria-hidden": "true", fill: "currentColor" }) }), coverImage && (_jsxs("div", { className: "relative h-32 w-full overflow-hidden bg-muted", children: [_jsx("img", { src: coverImage, alt: "", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }), unreadCount && unreadCount > 0 && (_jsx("div", { className: "absolute top-3 right-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-black", children: unreadCount > 99 ? "99+" : unreadCount }))] })), _jsxs(CardContent, { className: "p-6 space-y-4 relative z-10", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors duration-fast line-clamp-2", children: title }), _jsx(ChevronRight, { className: "h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-fast shrink-0", "aria-hidden": "true" })] }), description && (_jsx("p", { className: "text-sm text-muted-foreground leading-normal line-clamp-2", children: description }))] }), _jsx(Separator, {}), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { className: "font-medium text-foreground", children: memberCount.toLocaleString() }), _jsx("span", { children: memberCount === 1 ? "member" : "members" })] })] })] }) }));
});
JoinedSpaceCard.displayName = "JoinedSpaceCard";
export { JoinedSpaceCard };
//# sourceMappingURL=joined-space-card.js.map