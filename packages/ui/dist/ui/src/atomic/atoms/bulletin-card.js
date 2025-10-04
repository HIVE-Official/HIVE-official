"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MotionDiv } from "../../shells/motion-safe";
import { transitions } from "../../lib/animations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Users, Pin, TrendingUp } from "lucide-react";
/**
 * Bulletin Board Card Component
 *
 * Custom primitive built from shadcn Card with bulletin board aesthetic.
 * Designed to look like a notice pinned to a cork board.
 *
 * Features:
 * - Pin icon indicator for featured/pinned items
 * - Slight rotation effect on hover (like physical pin tilt)
 * - Shadow depth for layered bulletin feel
 * - Trending indicator for active spaces
 */
const BulletinCard = React.forwardRef(({ className, title, description, coverImage, category, memberCount, isTrending = false, isPinned = false, tags = [], onJoin, onClick, isJoined = false, ...props }, ref) => {
    return (_jsx(MotionDiv, { whileHover: {
            scale: 1.02,
            rotate: isPinned ? 0.5 : 0,
        }, transition: transitions.fast, children: _jsxs(Card, { ref: ref, className: cn("relative overflow-hidden cursor-pointer group", "border-l-4 border-l-primary/50", "hover:shadow-lg hover:border-l-primary", "transition-all duration-300", className), onClick: onClick, ...props, children: [coverImage && (_jsxs("div", { className: "relative h-32 w-full overflow-hidden bg-muted", children: [_jsx("img", { src: coverImage, alt: "", className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" })] })), isPinned && (_jsx("div", { className: cn("absolute top-3 right-3 text-primary z-10", coverImage && "text-background drop-shadow-lg"), children: _jsx(Pin, { className: "h-4 w-4 fill-current", "aria-hidden": "true" }) })), isTrending && (_jsxs(Badge, { variant: "secondary", className: cn("absolute top-3 left-3 gap-1 z-10", coverImage
                        ? "bg-background/90 text-foreground backdrop-blur-sm"
                        : "bg-primary/10 text-primary border-primary/20"), children: [_jsx(TrendingUp, { className: "h-3 w-3", "aria-hidden": "true" }), "Trending"] })), _jsxs(CardHeader, { className: cn(isPinned && "pr-10", isTrending && !coverImage && "pt-12"), children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx(CardTitle, { className: "text-lg font-semibold group-hover:text-primary transition-colors", children: title }), category && (_jsx(Badge, { variant: "outline", className: "shrink-0 text-xs", children: category }))] }), description && (_jsx(CardDescription, { className: "line-clamp-2 text-sm", children: description }))] }), _jsxs(CardContent, { className: "space-y-4", children: [tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1.5", children: [tags.slice(0, 3).map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "text-xs font-normal", children: ["#", tag] }, index))), tags.length > 3 && (_jsxs(Badge, { variant: "outline", className: "text-xs", children: ["+", tags.length - 3] }))] })), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { className: "font-medium", children: memberCount || 0 })] }), _jsx(Button, { size: "sm", variant: isJoined ? "outline" : "default", onClick: (e) => {
                                        e.stopPropagation();
                                        onJoin?.();
                                    }, className: "text-sm font-medium", children: isJoined ? "Joined" : "Join" })] })] })] }) }));
});
BulletinCard.displayName = "BulletinCard";
export { BulletinCard };
//# sourceMappingURL=bulletin-card.js.map