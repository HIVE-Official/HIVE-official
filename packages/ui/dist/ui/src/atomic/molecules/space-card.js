/**
 * Space Card - Unified Polymorphic Component
 *
 * Single card molecule that handles all space display variants:
 * - default: Standard vertical card for grids
 * - discovery: Horizontal card with campus context for browse/discovery
 * - joined: Vertical card with unread badge for joined spaces
 * - compact: Minimal card for lists
 *
 * Uses SpaceData canonical type and SpaceActionHandler for events.
 *
 * @module molecules/space-card
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MotionDiv } from "../../shells/motion-safe";
import { transitions } from "../../lib/animations";
import { Users, MessageCircle, CheckCircle2, Plus, Flame, GraduationCap } from "lucide-react";
import { Card } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { cn } from "../../lib/utils";
/**
 * Space Card Component
 */
const SpaceCard = React.forwardRef(({ className, space, variant = "default", layout = "vertical", showActions = true, showStats = true, showCampusContext = false, showTags = true, maxTags = 3, onAction, onClick, onJoin, onLeave, ...props }, ref) => {
    // Determine layout based on variant
    const effectiveLayout = variant === "discovery" ? "horizontal" : layout;
    // Campus context signals (for discovery variant)
    const campusSignals = React.useMemo(() => {
        const signals = [];
        if (space.campus.friendsInSpace.length > 0) {
            const count = space.campus.friendsInSpace.length;
            signals.push({
                type: "friends",
                label: `${count} ${count === 1 ? "friend" : "friends"} here`,
                icon: _jsx(Users, { className: "h-3.5 w-3.5" })
            });
        }
        if (space.campus.isTrending) {
            signals.push({
                type: "trending",
                label: "Trending on campus",
                icon: _jsx(Flame, { className: "h-3.5 w-3.5" })
            });
        }
        if (space.campus.primaryMajor) {
            signals.push({
                type: "major",
                label: space.campus.primaryMajor,
                icon: _jsx(GraduationCap, { className: "h-3.5 w-3.5" })
            });
        }
        return signals;
    }, [space.campus]);
    // Handle actions with both new and legacy handlers
    const handleCardClick = () => {
        onClick?.();
        onAction?.({ type: "space.click" });
    };
    const handleJoin = (e) => {
        e.stopPropagation();
        onJoin?.();
        onAction?.({ type: "space.join" });
    };
    const handleLeave = (e) => {
        e.stopPropagation();
        onLeave?.();
        onAction?.({ type: "space.leave" });
    };
    // Render helper: Member avatars
    const renderMemberAvatars = () => {
        if (!space.memberAvatars || space.memberAvatars.length === 0)
            return null;
        const displayAvatars = space.memberAvatars.slice(0, 4);
        const remaining = space.memberAvatars.length - 4;
        return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex -space-x-2", children: [displayAvatars.map((member, index) => (_jsx("div", { className: "h-7 w-7 overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 transition-smooth ease-liquid hover:z-10 hover:scale-110", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[10px] font-semibold text-[#FFD700]", children: member.name.split(" ").map((n) => n[0]).join("").slice(0, 2) })) }, index))), remaining > 0 && (_jsxs("div", { className: "flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 text-[10px] font-semibold text-white/70", children: ["+", remaining] }))] }), variant !== "compact" && (_jsxs("span", { className: "text-xs text-white/70", children: [space.stats.memberCount, " members"] }))] }));
    };
    // Render helper: Stats
    const renderStats = () => {
        if (!showStats)
            return null;
        return (_jsxs("div", { className: "flex items-center gap-4 text-sm text-white/70", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: space.stats.memberCount })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: space.stats.postCount })] }), space.stats.activeToday > 0 && (_jsxs("div", { className: "flex items-center gap-1.5 text-[#FFD700]", children: [_jsx(Flame, { className: "h-4 w-4", "aria-hidden": "true" }), _jsxs("span", { className: "text-xs", children: [space.stats.activeToday, " active"] })] }))] }));
    };
    // Render helper: Campus context badges
    const renderCampusContext = () => {
        if (!showCampusContext || campusSignals.length === 0)
            return null;
        // Show primary signal only for compact variant
        const displaySignals = variant === "compact" ? campusSignals.slice(0, 1) : campusSignals;
        return (_jsx("div", { className: "flex flex-wrap gap-1.5", children: displaySignals.map((signal, index) => (_jsxs(Badge, { variant: "sophomore", className: "h-6 gap-1 px-2 text-xs bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20", children: [signal.icon, _jsx("span", { children: signal.label })] }, index))) }));
    };
    // Render helper: Tags
    const renderTags = () => {
        if (!showTags || space.tags.length === 0)
            return null;
        const displayTags = space.tags.slice(0, maxTags);
        const remaining = space.tags.length - maxTags;
        return (_jsxs("div", { className: "flex flex-wrap gap-1.5", children: [displayTags.map((tag, index) => (_jsxs(Badge, { variant: "sophomore", className: "text-xs", children: ["#", tag] }, index))), remaining > 0 && (_jsxs(Badge, { variant: "freshman", className: "text-xs", children: ["+", remaining] }))] }));
    };
    // Render helper: Action button
    const renderActionButton = () => {
        if (!showActions)
            return null;
        const { isJoined, unreadCount } = space.userContext;
        if (variant === "compact") {
            return (_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0 shrink-0", onClick: isJoined ? handleLeave : handleJoin, children: isJoined ? (_jsx(CheckCircle2, { className: "h-4 w-4 text-[#FFD700]" })) : (_jsx(Plus, { className: "h-4 w-4" })) }));
        }
        if (variant === "discovery") {
            return (_jsxs(Button, { size: "sm", className: "shrink-0", onClick: handleJoin, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Join Space"] }));
        }
        if (isJoined) {
            return (_jsxs("div", { className: "flex items-center gap-2", children: [unreadCount > 0 && (_jsxs(Badge, { variant: "freshman", className: "h-5 px-2 text-xs bg-[#FFD700] text-black", children: [unreadCount, " new"] })), _jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 text-sm font-medium", onClick: handleLeave, children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), "Joined"] })] }));
        }
        return (_jsxs(Button, { size: "sm", className: "w-full text-sm font-medium", onClick: handleJoin, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Join Space"] }));
    };
    // Render helper: Cover photo
    const renderCover = () => {
        const coverHeight = variant === "compact" ? "h-16" : effectiveLayout === "horizontal" ? "h-full" : "h-32";
        return (_jsxs("div", { className: cn("relative w-full overflow-hidden", coverHeight), children: [space.coverPhoto ? (_jsx("img", { src: space.coverPhoto, alt: `${space.name} cover`, className: "h-full w-full object-cover transition-smooth ease-liquid group-hover:scale-105" })) : (_jsx("div", { className: "h-full w-full bg-gradient-to-br from-[#FFD700]/30 via-[#FFD700]/20 to-[#FFD700]/10 transition-smooth ease-liquid group-hover:from-[#FFD700]/40 group-hover:via-[#FFD700]/30 group-hover:to-[#FFD700]/20" })), _jsx("div", { className: "absolute inset-0 flex items-start justify-between p-2", children: variant !== "compact" && (_jsx("div", { className: "ml-auto", children: _jsx(Badge, { variant: space.privacy === "public" ? "secondary" : "default", className: "text-xs backdrop-blur-sm bg-[#0c0c0c]/80", children: space.privacy === "public" ? "Public" : space.privacy === "private" ? "Private" : "Hidden" }) })) }), variant === "joined" && space.userContext.unreadCount > 0 && (_jsx("div", { className: "absolute top-2 left-2", children: _jsxs(Badge, { variant: "freshman", className: "h-6 px-2 text-xs bg-[#FFD700] text-black", children: [space.userContext.unreadCount, " new"] }) })), variant === "discovery" && space.campus.isTrending && (_jsx("div", { className: "absolute top-2 left-2", children: _jsxs(Badge, { variant: "freshman", className: "h-6 gap-1 px-2 text-xs bg-[#FFD700] text-black", children: [_jsx(Flame, { className: "h-3 w-3 fill-current" }), "Trending"] }) }))] }));
    };
    // Compact variant (minimal, for lists)
    if (variant === "compact") {
        return (_jsx(MotionDiv, { whileHover: { x: 4 }, transition: transitions.fast, children: _jsxs(Card, { ref: ref, className: cn("group flex items-center gap-3 p-3 transition-all duration-smooth ease-liquid hover:shadow-md hover:border-[#FFD700]/50 cursor-pointer", className), onClick: handleCardClick, ...props, children: [_jsx("div", { className: "relative h-12 w-16 shrink-0 overflow-hidden rounded", children: space.coverPhoto ? (_jsx("img", { src: space.coverPhoto, alt: space.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "h-full w-full bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/10" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-semibold text-sm text-white truncate group-hover:text-[#FFD700] transition-smooth", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-white/70", children: [_jsxs("span", { children: [space.stats.memberCount, " members"] }), _jsx("span", { children: "\u2022" }), _jsx(Badge, { variant: "freshman", className: "h-4 px-1 text-[10px]", children: space.category })] })] }), renderActionButton()] }) }));
    }
    // Horizontal layout (for discovery variant)
    if (effectiveLayout === "horizontal") {
        return (_jsx(MotionDiv, { whileHover: { y: -2 }, transition: transitions.fast, children: _jsxs(Card, { ref: ref, className: cn("group flex overflow-hidden transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-[#FFD700]/50 cursor-pointer", className), onClick: handleCardClick, ...props, children: [_jsx("div", { className: "relative w-48 shrink-0", children: renderCover() }), _jsxs("div", { className: "flex-1 p-4 space-y-3 min-w-0", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("h3", { className: "font-semibold text-white line-clamp-1 transition-smooth ease-liquid group-hover:text-[#FFD700]", children: space.name }), _jsx(Badge, { variant: "freshman", className: "shrink-0 text-xs", children: space.category })] }), space.description && (_jsx("p", { className: "text-sm text-white/70 line-clamp-2", children: space.description }))] }), renderCampusContext(), renderStats(), space.campus.friendsInSpace.length > 0 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex -space-x-2", children: space.campus.friendsInSpace.slice(0, 3).map((friend, index) => (_jsx("div", { className: "h-6 w-6 overflow-hidden rounded-full border-2 border-[#0c0c0c] bg-white/10", children: friend.avatar ? (_jsx("img", { src: friend.avatar, alt: friend.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[10px] font-semibold text-[#FFD700]", children: friend.name[0] })) }, index))) }), _jsxs("span", { className: "text-xs text-white/70", children: [space.campus.friendsInSpace[0].name, space.campus.friendsInSpace.length > 1 && ` and ${space.campus.friendsInSpace.length - 1} ${space.campus.friendsInSpace.length === 2 ? "other" : "others"}`] })] })), _jsx("div", { className: "pt-1", children: renderActionButton() })] })] }) }));
    }
    // Vertical layout (default, joined variants)
    return (_jsx(MotionDiv, { whileHover: { y: -4 }, transition: transitions.fast, children: _jsxs(Card, { ref: ref, className: cn("group overflow-hidden transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-[#FFD700]/50 cursor-pointer", className), onClick: handleCardClick, ...props, children: [renderCover(), _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("h3", { className: "font-semibold text-white line-clamp-1 transition-smooth ease-liquid group-hover:text-[#FFD700]", children: space.name }), _jsx(Badge, { variant: "freshman", className: "shrink-0 text-xs", children: space.category })] }), space.description && (_jsx("p", { className: "text-sm text-white/70 line-clamp-2", children: space.description }))] }), renderCampusContext(), renderTags(), renderStats(), space.memberAvatars && space.memberAvatars.length > 0 && renderMemberAvatars(), _jsx("div", { className: "pt-2", children: renderActionButton() })] })] }) }));
});
SpaceCard.displayName = "SpaceCard";
export { SpaceCard };
//# sourceMappingURL=space-card.js.map