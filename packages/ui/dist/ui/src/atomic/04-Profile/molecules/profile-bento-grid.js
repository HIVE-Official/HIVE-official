"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Calendar, GripVertical, Maximize2, Minimize2, Search, Settings, TrendingUp, Users, Zap, } from "lucide-react";
import { Button } from "../../00-Global/atoms/button.js";
import { Card } from "../../00-Global/atoms/card.js";
import { cn } from "../../../lib/utils.js";
const DEFAULT_LAYOUT = {
    cards: [
        {
            id: "spaces_hub",
            type: "spaces_hub",
            position: { x: 0, y: 0 },
            size: "2x1",
            visible: true,
        },
        {
            id: "friends_network",
            type: "friends_network",
            position: { x: 1, y: 0 },
            size: "2x1",
            visible: true,
        },
        {
            id: "active_now",
            type: "active_now",
            position: { x: 2, y: 0 },
            size: "1x1",
            visible: true,
        },
        {
            id: "discovery",
            type: "discovery",
            position: { x: 3, y: 0 },
            size: "1x1",
            visible: true,
        },
    ],
    mobileLayout: [
        {
            id: "spaces_hub_mobile",
            type: "spaces_hub",
            position: { x: 0, y: 0 },
            size: "2x1",
            visible: true,
        },
        {
            id: "friends_network_mobile",
            type: "friends_network",
            position: { x: 1, y: 0 },
            size: "2x1",
            visible: true,
        },
    ],
    lastModified: null,
};
const CARD_CONFIGS = {
    spaces_hub: {
        title: "My Spaces",
        icon: Users,
        color: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
        borderColor: "border-blue-500/20",
    },
    friends_network: {
        title: "Friends Network",
        icon: Users,
        color: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
        borderColor: "border-purple-500/20",
    },
    schedule_overlap: {
        title: "Schedule Overlap",
        icon: Calendar,
        color: "bg-gradient-to-br from-green-500/10 to-green-600/10",
        borderColor: "border-green-500/20",
    },
    active_now: {
        title: "Active Now",
        icon: Activity,
        color: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
        borderColor: "border-orange-500/20",
    },
    discovery: {
        title: "Discover",
        icon: Search,
        color: "bg-gradient-to-br from-pink-500/10 to-pink-600/10",
        borderColor: "border-pink-500/20",
    },
    vibe_check: {
        title: "Campus Vibe",
        icon: Zap,
        color: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10",
        borderColor: "border-yellow-500/20",
    },
    tools_created: {
        title: "Tools",
        icon: Zap,
        color: "bg-gradient-to-br from-indigo-500/10 to-indigo-600/10",
        borderColor: "border-indigo-500/20",
    },
    rituals_active: {
        title: "Rituals",
        icon: Activity,
        color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10",
        borderColor: "border-emerald-500/20",
    },
    reputation: {
        title: "Reputation",
        icon: TrendingUp,
        color: "bg-gradient-to-br from-amber-500/10 to-amber-600/10",
        borderColor: "border-amber-500/20",
    },
};
function normalizeLayout(layout) {
    if (!layout) {
        return DEFAULT_LAYOUT;
    }
    const cards = Array.isArray(layout.cards) ? layout.cards : [];
    const mobile = Array.isArray(layout.mobileLayout)
        ? layout.mobileLayout
        : cards;
    const withPositions = (items, offset = 0) => items.map((card, index) => {
        const rawPos = card.position;
        const resolvedPos = typeof rawPos === "number"
            ? { x: rawPos, y: 0 }
            : rawPos && typeof rawPos.x === "number" && typeof rawPos.y === "number"
                ? rawPos
                : { x: index + offset, y: 0 };
        const size = card.size ?? "1x1";
        const visible = card.visible ?? true;
        return {
            id: card.id ?? `card-${index}`,
            type: card.type ?? "custom",
            position: resolvedPos,
            size,
            visible,
            customType: card.customType,
            title: card.title,
        };
    });
    return {
        ...layout,
        cards: withPositions(cards),
        mobileLayout: withPositions(mobile),
        lastModified: layout.lastModified ?? null,
    };
}
/**
 * Mobile-first responsive Bento Grid
 * - Mobile: 2 columns max, vertical scroll
 * - Tablet: 3 columns
 * - Desktop: 4 columns full grid
 */
export function ProfileBentoGrid({ profile, editable = false, onLayoutChange, className, }) {
    const [layout, setLayout] = useState(() => normalizeLayout(profile?.grid));
    const [isDragging, setIsDragging] = useState(false);
    const [draggedCard, setDraggedCard] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const gridRef = useRef(null);
    useEffect(() => {
        setLayout(normalizeLayout(profile?.grid));
    }, [profile]);
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);
    const activeCards = useMemo(() => {
        const cards = isMobile ? layout.mobileLayout : layout.cards;
        return Array.isArray(cards) ? cards : [];
    }, [isMobile, layout.cards, layout.mobileLayout]);
    const updateLayout = (updatedCards) => {
        const nextLayout = {
            ...layout,
            [isMobile ? "mobileLayout" : "cards"]: updatedCards,
            lastModified: new Date(),
        };
        setLayout(nextLayout);
        onLayoutChange?.(nextLayout);
    };
    const handleDragStart = (event, cardId) => {
        if (!editable)
            return;
        setIsDragging(true);
        setDraggedCard(cardId);
        event.dataTransfer.effectAllowed = "move";
    };
    const handleDragOver = (event) => {
        if (!editable)
            return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };
    const handleDrop = (event, targetPos) => {
        event.preventDefault();
        if (!editable || !draggedCard)
            return;
        const updatedCards = activeCards.map((card) => card.id === draggedCard ? { ...card, position: targetPos } : card);
        setIsDragging(false);
        setDraggedCard(null);
        updateLayout(updatedCards);
    };
    const toggleCardSize = (cardId) => {
        if (!editable)
            return;
        const updatedCards = activeCards.map((card) => {
            if (card.id !== cardId)
                return card;
            const nextSize = card.size === "1x1"
                ? "2x1"
                : card.size === "2x1"
                    ? "2x2"
                    : card.size === "2x2"
                        ? "1x1"
                        : "1x1";
            return { ...card, size: nextSize };
        });
        updateLayout(updatedCards);
    };
    const renderCardContent = (card) => {
        const cardType = card.type === "custom" ? card.customType : card.type;
        const cardProfile = profile;
        switch (cardType) {
            case "spaces_hub": {
                const activeSpaces = cardProfile?.connections?.connections?.filter((conn) => conn.sharedSpaces?.length > 0) ?? [];
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeSpaces.length || 0 }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Active spaces" }), card.size !== "1x1" && activeSpaces.length > 0 ? (_jsxs("div", { className: "mt-3 space-y-1", children: [_jsx("div", { className: "mb-1 text-xs text-hive-text-secondary", children: "Recent activity" }), activeSpaces.slice(0, 3).map((conn, index) => (_jsx("div", { className: "truncate text-xs text-hive-text-primary", children: conn.sharedSpaces?.[0] ?? "Space" }, index)))] })) : null, card.size === "2x2" ? (_jsx(Button, { size: "sm", variant: "outline", className: "mt-3 w-full", children: "Browse Spaces" })) : null] }));
            }
            case "friends_network": {
                const friendCount = cardProfile?.connections?.friends?.length ??
                    cardProfile?.stats?.friends ??
                    0;
                const connectionCount = cardProfile?.connections?.connections?.length ?? 0;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: friendCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: connectionCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Connections" })] })] }), card.size === "2x2" && (friendCount > 0 || connectionCount > 0) ? (_jsxs("div", { className: "mt-3", children: [_jsx("div", { className: "mb-2 text-xs text-hive-text-secondary", children: "Recently connected" }), _jsx("div", { className: "flex -space-x-2", children: Array.from({
                                        length: Math.min(5, friendCount + connectionCount),
                                    }).map((_, index) => (_jsx("div", { className: "h-8 w-8 rounded-full border-2 border-hive-background-primary bg-gradient-to-br from-hive-accent/40 to-hive-accent/20" }, index))) })] })) : null] }));
            }
            case "active_now": {
                const allFriends = cardProfile?.connections?.friends ?? [];
                const activeFriends = allFriends.filter((_, index) => index % 2 === 0 ? true : false);
                const isUserOnline = cardProfile?.presence?.isOnline ?? cardProfile?.isOnline ?? false;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeFriends.length }), isUserOnline ? (_jsx("div", { className: "h-2 w-2 animate-pulse rounded-full bg-green-400" })) : null] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends online now" }), card.size !== "1x1" && activeFriends.length > 0 ? (_jsx("div", { className: "mt-2", children: _jsxs("div", { className: "flex -space-x-2", children: [activeFriends.slice(0, 5).map((_, index) => (_jsx("div", { className: "h-6 w-6 rounded-full border border-hive-background-primary bg-gradient-to-br from-green-400 to-green-600" }, index))), activeFriends.length > 5 ? (_jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full border border-hive-background-primary bg-hive-background-secondary", children: _jsxs("span", { className: "text-xs text-hive-text-secondary", children: ["+", activeFriends.length - 5] }) })) : null] }) })) : null] }));
            }
            case "vibe_check": {
                const currentVibe = cardProfile?.presence?.vibe ?? "🚀 Building";
                const vibeOptions = [
                    "🎯 Focused",
                    "🚀 Building",
                    "📚 Studying",
                    "🤝 Connecting",
                    "⚡ Energized",
                    "😴 Resting",
                ];
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-lg font-semibold text-hive-text-primary", children: currentVibe }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Campus vibe \u2022 Tap to update" }), card.size === "2x2" ? (_jsx("div", { className: "mt-3 grid grid-cols-2 gap-1", children: vibeOptions.slice(0, 4).map((vibe, index) => (_jsx("button", { className: "rounded bg-hive-background-secondary p-2 text-xs transition-colors hover:bg-hive-background-tertiary", children: vibe }, index))) })) : null] }));
            }
            case "schedule_overlap": {
                const overlaps = cardProfile?.intelligence?.overlaps ?? [];
                const beaconActive = cardProfile?.presence?.beacon?.active ?? false;
                const beaconLocation = cardProfile?.presence?.beacon?.location ?? "Campus";
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-sm text-hive-text-primary", children: overlaps.length > 0
                                ? `${overlaps.length} overlaps today`
                                : "No overlaps today" }), beaconActive ? (_jsxs("div", { className: "flex items-center gap-1 text-xs text-green-400", children: [_jsx("div", { className: "h-2 w-2 animate-pulse rounded-full bg-green-400" }), "Beacon at ", beaconLocation] })) : (_jsx("div", { className: "text-xs text-hive-text-secondary", children: "Enable beacon to find friends" })), card.size !== "1x1" && overlaps.length > 0 ? (_jsx("div", { className: "mt-2 space-y-1", children: overlaps.slice(0, 2).map((overlap, index) => (_jsxs("div", { className: "text-xs text-hive-text-primary", children: [overlap.time ?? "TBD", " \u2022 ", overlap.name ?? "Event"] }, index))) })) : null] }));
            }
            case "discovery": {
                const suggestions = cardProfile?.intelligence?.suggestions ?? [];
                const hasSuggestions = suggestions.length > 0;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-sm text-hive-text-primary", children: hasSuggestions
                                ? `${suggestions.length} new suggestions`
                                : "Explore HIVE" }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: hasSuggestions
                                ? "Based on your interests"
                                : "Discover spaces & tools" }), card.size !== "1x1" ? (_jsx("div", { className: "mt-3", children: hasSuggestions ? (_jsx("div", { className: "space-y-2", children: suggestions.slice(0, 2).map((suggestion, index) => (_jsxs("div", { className: "rounded bg-hive-background-secondary p-2", children: [_jsx("div", { className: "text-xs font-medium text-hive-text-primary", children: suggestion.name ?? "Suggestion" }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: suggestion.reason ??
                                                suggestion.reasons?.[0] ??
                                                "Recommended for you" })] }, index))) })) : (_jsxs(Button, { size: "sm", variant: "outline", className: "w-full", children: [_jsx(Search, { size: 12, className: "mr-1" }), "Discover"] })) })) : null] }));
            }
            case "tools_created": {
                const toolsCount = cardProfile?.stats?.toolsCreated ?? 0;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: toolsCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Tools created" }), card.size !== "1x1" ? (_jsx("div", { className: "mt-3", children: _jsxs(Button, { size: "sm", variant: "outline", className: "w-full", children: [_jsx(Zap, { size: 12, className: "mr-1" }), "Create Tool"] }) })) : null] }));
            }
            case "rituals_active": {
                const activeRituals = cardProfile?.stats?.activeRituals ?? 0;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeRituals }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Active rituals" }), card.size !== "1x1" ? (_jsxs("div", { className: "mt-2 text-xs text-hive-accent", children: ["Current streak: ", cardProfile?.stats?.currentStreak ?? 0, " days"] })) : null] }));
            }
            case "reputation": {
                const reputation = cardProfile?.stats?.reputation ?? 0;
                return (_jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: reputation }), _jsx(TrendingUp, { size: 14, className: "text-green-400" })] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Reputation score" }), card.size !== "1x1" ? (_jsx("div", { className: "mt-2", children: _jsx("div", { className: "h-2 w-full rounded-full bg-hive-background-secondary", children: _jsx("div", { className: "h-2 rounded-full bg-gradient-to-r from-hive-accent to-green-500 transition-all duration-500", style: { width: `${Math.min(100, reputation)}%` } }) }) })) : null] }));
            }
            default:
                return (_jsx("div", { className: "mt-2 space-y-2", children: _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Widget coming soon" }) }));
        }
    };
    const renderCard = (card) => {
        const resolvedType = card.type === "custom" ? card.customType ?? card.type : card.type;
        const config = CARD_CONFIGS[resolvedType] ??
            CARD_CONFIGS[card.customType ?? ""] ?? {
            title: card.title ?? "Widget",
            icon: Settings,
            color: "bg-hive-background-secondary/60",
            borderColor: "border-hive-border",
        };
        return (_jsxs(Card, { draggable: editable, onDragStart: (event) => handleDragStart(event, card.id), onDragOver: handleDragOver, onDrop: (event) => handleDrop(event, card.position), className: cn("group relative overflow-hidden rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(10,10,18,0.9)) 80%,transparent)] shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-shadow", card.size === "2x2" ? "row-span-2" : undefined, card.size === "2x1" ? "col-span-2" : undefined, card.size === "1x2" ? "row-span-2" : undefined, config.borderColor), children: [_jsxs("div", { className: cn("relative rounded-t-[inherit] px-4 pt-4", config.color), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 70%,transparent)]", children: config.title }), _jsx("div", { className: "text-sm text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 78%,transparent)]", children: card.title ?? cardTypeLabel(resolvedType) })] }), _jsx(config.icon, { className: "h-5 w-5 text-[var(--hive-brand-primary,#FACC15)]" })] }), editable ? (_jsxs("div", { className: "absolute right-3 top-3 flex gap-1 rounded-full bg-black/40 p-1 opacity-0 transition-opacity group-hover:opacity-100", children: [_jsx("button", { type: "button", onClick: () => toggleCardSize(card.id), className: "rounded p-1 hover:bg-white/10", children: card.size === "2x2" ? (_jsx(Minimize2, { size: 14 })) : (_jsx(Maximize2, { size: 14 })) }), _jsx("button", { type: "button", className: "cursor-move rounded p-1 hover:bg-white/10", children: _jsx(GripVertical, { size: 14 }) })] })) : null] }), _jsx("div", { className: "px-4 pb-4", children: renderCardContent(card) })] }, card.id));
    };
    return (_jsxs("div", { ref: gridRef, className: cn("grid gap-4 p-4", isMobile
            ? "grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", className), children: [activeCards.filter((card) => card.visible ?? true).map(renderCard), editable ? (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx(Button, { variant: "default", size: "sm", className: "shadow-lg", onClick: () => onLayoutChange?.(layout), children: "Save Layout" }) })) : null] }));
}
function cardTypeLabel(type) {
    switch (type) {
        case "spaces_hub":
            return "Spaces overview";
        case "friends_network":
            return "Network";
        case "active_now":
            return "Active now";
        case "schedule_overlap":
            return "Schedule overlap";
        case "discovery":
            return "Discover";
        case "vibe_check":
            return "Campus vibe";
        case "tools_created":
            return "Tools";
        case "rituals_active":
            return "Rituals";
        case "reputation":
            return "Reputation";
        default:
            return "Widget";
    }
}
//# sourceMappingURL=profile-bento-grid.js.map