"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "../atoms/card";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { AvatarGroup } from "../atoms/avatar";
import { Separator } from "../atoms/separator";
import { cn } from "../../lib/utils";
import { Users, Pin, Flame, GraduationCap, MapPin } from "lucide-react";
/**
 * Discoverable Space Card
 *
 * Built on shadcn Card with HIVE monochrome + gold visual language.
 * For spaces the user hasn't joined yet (discovery/browse state).
 *
 * Design Strategy:
 * - shadcn Card + Button (no custom primitives)
 * - Monochrome base with strategic gold on primary button
 * - Horizontal layout for browse efficiency
 * - Motion for tactile feedback
 * - Clear join CTA
 *
 * Differentiation from JoinedSpaceCard:
 * - Horizontal layout (image on left, content on right)
 * - Primary "Join" button instead of chevron
 * - No unread badge (not joined yet)
 * - Description always visible (not truncated)
 */
const DiscoverableSpaceCard = React.forwardRef(({ className, title, description, coverImage, memberCount, postCount, campusContext, onJoin, onClick, ...props }, ref) => {
    // Determine primary signal (ONE per card)
    const primarySignal = React.useMemo(() => {
        // Priority 1: Friends in space (strongest social proof)
        if (campusContext?.friendsInSpace && campusContext.friendsInSpace.length > 0) {
            return { type: 'friends', data: campusContext.friendsInSpace };
        }
        // Priority 2: Trending (campus relevance)
        if (campusContext?.isTrending) {
            return { type: 'trending', category: campusContext.trendingCategory };
        }
        return null;
    }, [campusContext]);
    // Format friend names for display (HIVE-native, not generic)
    const formatFriends = (friends) => {
        if (!friends || friends.length === 0)
            return '';
        if (friends.length === 1)
            return friends[0].name;
        if (friends.length === 2)
            return `${friends[0].name} and ${friends[1].name}`;
        return `${friends[0].name}, ${friends[1].name} +${friends.length - 2}`;
    };
    return (_jsx(motion.div, { whileHover: { y: -2, rotate: -0.3 }, transition: { duration: 0.25, ease: "easeOut" }, children: _jsxs(Card, { ref: ref, className: cn("relative overflow-hidden group", "transition-all duration-[400ms] ease-smooth", 
            // Paper texture (subtle noise grain)
            "before:absolute before:inset-0 before:opacity-[0.015] before:pointer-events-none before:z-0", "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]", 
            // Layered paper shadow (HIVE design system)
            "shadow-hive-sm", "hover:border-primary hover:shadow-hive-glow", className), ...props, children: [_jsx("div", { className: "absolute top-3 left-3 z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-fast", children: _jsx(Pin, { className: "h-4 w-4 text-muted-foreground -rotate-12", "aria-hidden": "true", fill: "currentColor" }) }), primarySignal && (_jsxs("div", { className: "absolute top-3 right-3 z-10", children: [primarySignal.type === 'friends' && (_jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1.5 bg-primary/10 border-primary/20 hover:bg-primary/15 transition-colors duration-fast", children: [_jsx(AvatarGroup, { className: "shrink-0", size: "xs", max: 3, avatars: (primarySignal.data || []).map(f => ({ src: f.avatar, alt: f.name })) }), _jsx("span", { className: "text-xs font-medium", children: primarySignal.data?.length === 1
                                        ? '1 connection'
                                        : `${primarySignal.data?.length} connections` })] })), primarySignal.type === 'trending' && (_jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1.5 bg-orange-500/10 border-orange-500/20 text-orange-500", children: [_jsx(Flame, { className: "h-3 w-3", "aria-hidden": "true" }), _jsx("span", { className: "text-xs font-medium", children: primarySignal.category === 'campus'
                                        ? 'Trending on campus'
                                        : primarySignal.category
                                            ? `Trending with ${primarySignal.category}`
                                            : 'Trending' })] }))] })), _jsxs("div", { className: cn("flex gap-0", coverImage ? "flex-col sm:flex-row" : "flex-col"), children: [coverImage && (_jsx("div", { className: cn("relative overflow-hidden bg-muted shrink-0", "h-32 sm:h-auto sm:w-40"), onClick: onClick, role: onClick ? "button" : undefined, tabIndex: onClick ? 0 : undefined, children: _jsx("img", { src: coverImage, alt: "", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) })), _jsxs("div", { className: "flex flex-col flex-1 min-w-0", children: [_jsxs(CardContent, { className: cn("p-6 flex-1 space-y-3 relative z-10", onClick && "cursor-pointer"), onClick: onClick, children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight leading-tight line-clamp-2 flex-1", children: title }), campusContext?.spaceType && (_jsxs(Badge, { variant: "outline", className: "shrink-0 text-xs", children: [campusContext.spaceType === 'academic' && campusContext.primaryMajor && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(GraduationCap, { className: "h-3 w-3" }), campusContext.primaryMajor] })), campusContext.spaceType === 'residential' && campusContext.building && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), campusContext.building] })), campusContext.spaceType === 'greek' && 'Greek Life', campusContext.spaceType === 'official' && 'Official', campusContext.spaceType === 'interest' && !campusContext.primaryMajor && 'Interest'] }))] }), _jsx("p", { className: "text-sm text-muted-foreground leading-normal line-clamp-2", children: description }), primarySignal?.type === 'friends' && primarySignal.data && (_jsxs("div", { className: "text-xs text-muted-foreground", children: [formatFriends(primarySignal.data), " ", primarySignal.data.length === 1 ? 'is' : 'are', " here"] })), _jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground pt-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Users, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx("span", { className: "font-medium text-foreground", children: memberCount.toLocaleString() }), _jsx("span", { children: memberCount === 1 ? "member" : "members" })] }), postCount !== undefined && postCount > 0 && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "font-medium text-foreground", children: postCount.toLocaleString() }), _jsx("span", { children: postCount === 1 ? "post" : "posts" })] })), campusContext?.activeToday && campusContext.activeToday > 0 && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-green-500", "aria-hidden": "true" }), _jsxs("span", { children: [campusContext.activeToday, " active today"] })] }))] })] }), _jsx(Separator, {}), _jsx(CardFooter, { className: "p-4", children: _jsx(Button, { onClick: (e) => {
                                            e.stopPropagation();
                                            onJoin?.();
                                        }, className: "w-full sm:w-auto", size: "sm", children: "Join Space" }) })] })] })] }) }));
});
DiscoverableSpaceCard.displayName = "DiscoverableSpaceCard";
export { DiscoverableSpaceCard };
//# sourceMappingURL=discoverable-space-card.js.map