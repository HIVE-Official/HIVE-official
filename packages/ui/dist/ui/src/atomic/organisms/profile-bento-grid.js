'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Card } from '../atoms/card.js';
import { Button } from '../atoms/button.js';
import { Users, Calendar, TrendingUp, Activity, Search, Zap, Settings, GripVertical, Maximize2, Minimize2 } from 'lucide-react';
/**
 * Mobile-first responsive Bento Grid
 * - Mobile: 2 columns max, vertical scroll
 * - Tablet: 3 columns
 * - Desktop: 4 columns full grid
 */
export const ProfileBentoGrid = ({ profile, editable = false, onLayoutChange, className = '' }) => {
    const [layout, setLayout] = useState(profile.grid);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedCard, setDraggedCard] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const gridRef = useRef(null);
    // Detect mobile/tablet/desktop
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);
    // Get the appropriate cards based on device
    const activeCards = isMobile ? layout.mobileLayout : layout.cards;
    // Card type configurations
    const cardConfigs = {
        spaces_hub: {
            title: 'My Spaces',
            icon: Users,
            color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10',
            borderColor: 'border-blue-500/20'
        },
        friends_network: {
            title: 'Friends Network',
            icon: Users,
            color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10',
            borderColor: 'border-purple-500/20'
        },
        schedule_overlap: {
            title: 'Schedule Overlap',
            icon: Calendar,
            color: 'bg-gradient-to-br from-green-500/10 to-green-600/10',
            borderColor: 'border-green-500/20'
        },
        active_now: {
            title: 'Active Now',
            icon: Activity,
            color: 'bg-gradient-to-br from-orange-500/10 to-orange-600/10',
            borderColor: 'border-orange-500/20'
        },
        discovery: {
            title: 'Discover',
            icon: Search,
            color: 'bg-gradient-to-br from-pink-500/10 to-pink-600/10',
            borderColor: 'border-pink-500/20'
        },
        vibe_check: {
            title: 'Campus Vibe',
            icon: Zap,
            color: 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/10',
            borderColor: 'border-yellow-500/20'
        },
        tools_created: {
            title: 'Tools',
            icon: Zap,
            color: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10',
            borderColor: 'border-indigo-500/20'
        },
        rituals_active: {
            title: 'Rituals',
            icon: Activity,
            color: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10',
            borderColor: 'border-emerald-500/20'
        },
        reputation: {
            title: 'Reputation',
            icon: TrendingUp,
            color: 'bg-gradient-to-br from-amber-500/10 to-amber-600/10',
            borderColor: 'border-amber-500/20'
        }
    };
    // Handle drag start
    const handleDragStart = (e, cardId) => {
        if (!editable)
            return;
        setIsDragging(true);
        setDraggedCard(cardId);
        e.dataTransfer.effectAllowed = 'move';
    };
    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    // Handle drop
    const handleDrop = (e, targetPosition) => {
        e.preventDefault();
        if (!draggedCard || !editable)
            return;
        const updatedCards = activeCards.map(card => {
            if (card.id === draggedCard) {
                return { ...card, position: targetPosition };
            }
            return card;
        });
        const updatedLayout = {
            ...layout,
            [isMobile ? 'mobileLayout' : 'cards']: updatedCards,
            lastModified: new Date()
        };
        setLayout(updatedLayout);
        onLayoutChange?.(updatedLayout);
        setIsDragging(false);
        setDraggedCard(null);
    };
    // Toggle card size
    const toggleCardSize = (cardId) => {
        if (!editable)
            return;
        const updatedCards = activeCards.map(card => {
            if (card.id === cardId) {
                const newSize = card.size === '1x1' ? '2x1' :
                    card.size === '2x1' ? '2x2' :
                        card.size === '2x2' ? '1x1' : '1x1';
                return { ...card, size: newSize };
            }
            return card;
        });
        const updatedLayout = {
            ...layout,
            [isMobile ? 'mobileLayout' : 'cards']: updatedCards,
            lastModified: new Date()
        };
        setLayout(updatedLayout);
        onLayoutChange?.(updatedLayout);
    };
    // Render individual card
    const renderCard = (card) => {
        // Handle custom card types
        const cardType = card.type === 'custom' ? card.customType : card.type;
        const config = cardConfigs[cardType] || {};
        const Icon = config.icon || Settings;
        // Calculate grid span based on size
        const sizeClasses = {
            '1x1': 'col-span-1 row-span-1',
            '2x1': 'col-span-2 row-span-1',
            '2x2': 'col-span-2 row-span-2',
            '1x2': 'col-span-1 row-span-2'
        };
        // Mobile overrides - max 2 columns
        const mobileSizeClasses = {
            '1x1': 'col-span-1 row-span-1',
            '2x1': 'col-span-2 row-span-1',
            '2x2': 'col-span-2 row-span-2',
            '1x2': 'col-span-1 row-span-2'
        };
        return (_jsx("div", { className: `
          ${isMobile ? mobileSizeClasses[card.size] : sizeClasses[card.size]}
          ${isDragging && draggedCard === card.id ? 'opacity-50' : ''}
          transition-all duration-200
        `, draggable: editable, onDragStart: (e) => handleDragStart(e, card.id), onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, card.position), children: _jsxs(Card, { className: `
          h-full relative group cursor-pointer
          ${config.color} ${config.borderColor}
          border backdrop-blur-sm
          hover:shadow-lg transition-all duration-200
          ${editable ? 'hover:ring-2 hover:ring-hive-accent/50' : ''}
        `, children: [_jsxs("div", { className: "p-4 pb-2 flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { size: 18, className: "text-hive-text-primary" }), _jsx("h3", { className: "font-semibold text-sm text-hive-text-primary", children: config.title })] }), editable && (_jsxs("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity flex gap-1", children: [_jsx("button", { onClick: () => toggleCardSize(card.id), className: "p-1 hover:bg-white/10 rounded", children: card.size === '2x2' ? _jsx(Minimize2, { size: 14 }) : _jsx(Maximize2, { size: 14 }) }), _jsx("button", { className: "p-1 hover:bg-white/10 rounded cursor-move", children: _jsx(GripVertical, { size: 14 }) })] }))] }), _jsx("div", { className: "px-4 pb-4", children: renderCardContent(card, profile) })] }) }, card.id));
    };
    // Render card content based on type
    const renderCardContent = (card, profile) => {
        // Handle extended card types and custom types
        const cardType = card.type === 'custom' ? card.customType : card.type;
        switch (cardType) {
            case 'spaces_hub': {
                const activeSpaces = profile.connections?.connections?.filter(c => c.sharedSpaces?.length > 0) || [];
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeSpaces.length || 0 }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Active spaces" }), card.size !== '1x1' && activeSpaces.length > 0 && (_jsxs("div", { className: "mt-3 space-y-1", children: [_jsx("div", { className: "text-xs text-hive-text-secondary mb-1", children: "Recent activity" }), activeSpaces.slice(0, 3).map((conn, idx) => (_jsx("div", { className: "text-xs text-hive-text-primary truncate", children: conn.sharedSpaces[0] }, idx)))] })), card.size === '2x2' && (_jsx(Button, { size: "sm", className: "mt-3 w-full", variant: "outline", children: "Browse Spaces" }))] }));
            }
            case 'friends_network': {
                const friendCount = profile.connections?.friends?.length || 0;
                const connectionCount = profile.connections?.connections?.length || 0;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: friendCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: connectionCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Connections" })] })] }), card.size === '2x2' && (friendCount > 0 || connectionCount > 0) && (_jsxs("div", { className: "mt-3", children: [_jsx("div", { className: "text-xs text-hive-text-secondary mb-2", children: "Recently connected" }), _jsx("div", { className: "flex -space-x-2", children: [...Array(Math.min(5, friendCount + connectionCount))].map((_, i) => (_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-hive-accent/40 to-hive-accent/20 border-2 border-hive-background-primary" }, i))) })] }))] }));
            }
            case 'active_now': {
                const allFriends = profile.connections?.friends || [];
                // Simulate online status - in production, use real-time presence
                const activeFriends = allFriends.filter((_, idx) => idx % 2 === 0);
                const isUserOnline = profile.presence?.isOnline || profile.isOnline || false;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeFriends.length }), isUserOnline && (_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }))] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends online now" }), card.size !== '1x1' && activeFriends.length > 0 && (_jsx("div", { className: "mt-2", children: _jsxs("div", { className: "flex -space-x-2", children: [activeFriends.slice(0, 5).map((friend, i) => (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 border border-hive-background-primary" }), _jsx("div", { className: "absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-hive-background-primary" })] }, i))), activeFriends.length > 5 && (_jsx("div", { className: "w-6 h-6 rounded-full bg-hive-background-secondary border border-hive-background-primary flex items-center justify-center", children: _jsxs("span", { className: "text-xs text-hive-text-secondary", children: ["+", activeFriends.length - 5] }) }))] }) }))] }));
            }
            case 'vibe_check': {
                const currentVibe = profile.presence?.vibe || '🚀 Building';
                const vibeOptions = ['🎯 Focused', '🚀 Building', '📚 Studying', '🤝 Connecting', '⚡ Energized', '😴 Resting'];
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-lg font-semibold text-hive-text-primary", children: currentVibe }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Campus vibe \u2022 Tap to update" }), card.size === '2x2' && (_jsx("div", { className: "mt-3 grid grid-cols-2 gap-1", children: vibeOptions.slice(0, 4).map((vibe, idx) => (_jsx("button", { className: "text-xs p-2 rounded bg-hive-background-secondary hover:bg-hive-background-tertiary transition-colors", children: vibe }, idx))) }))] }));
            }
            case 'schedule_overlap': {
                const overlaps = profile.intelligence?.overlaps || [];
                const beaconActive = profile.presence?.beacon?.active || false;
                const beaconLocation = profile.presence?.beacon?.location || 'Campus';
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-sm text-hive-text-primary", children: overlaps.length > 0 ? `${overlaps.length} overlaps today` : 'No overlaps today' }), beaconActive ? (_jsxs("div", { className: "flex items-center gap-1 text-xs text-green-400", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), "Beacon at ", beaconLocation] })) : (_jsx("div", { className: "text-xs text-hive-text-secondary", children: "Enable beacon to find friends" })), card.size !== '1x1' && overlaps.length > 0 && (_jsx("div", { className: "mt-2 space-y-1", children: overlaps.slice(0, 2).map((overlap, idx) => (_jsxs("div", { className: "text-xs text-hive-text-primary", children: [overlap.time || 'TBD', " \u2022 ", overlap.name || 'Event'] }, idx))) }))] }));
            }
            case 'discovery': {
                const suggestions = profile.intelligence?.suggestions || [];
                const hasSuggestions = suggestions.length > 0;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-sm text-hive-text-primary", children: hasSuggestions ? `${suggestions.length} new suggestions` : 'Explore HIVE' }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: hasSuggestions ? 'Based on your interests' : 'Discover spaces & tools' }), card.size !== '1x1' && (_jsx("div", { className: "mt-3", children: hasSuggestions ? (_jsx("div", { className: "space-y-2", children: suggestions.slice(0, 2).map((sug, idx) => (_jsxs("div", { className: "p-2 bg-hive-background-secondary rounded", children: [_jsx("div", { className: "text-xs font-medium text-hive-text-primary", children: sug.name || 'Suggestion' }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: sug.reason || sug.reasons?.[0] || 'Recommended for you' })] }, idx))) })) : (_jsxs(Button, { size: "sm", variant: "outline", className: "w-full", children: [_jsx(Search, { size: 12, className: "mr-1" }), "Discover"] })) }))] }));
            }
            case 'tools_created': {
                const toolsCount = profile.stats?.toolsCreated || 0;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: toolsCount }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Tools created" }), card.size !== '1x1' && (_jsx("div", { className: "mt-3", children: _jsxs(Button, { size: "sm", variant: "outline", className: "w-full", children: [_jsx(Zap, { size: 12, className: "mr-1" }), "Create Tool"] }) }))] }));
            }
            case 'rituals_active': {
                const activeRituals = profile.stats?.activeRituals || 0;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeRituals }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Active rituals" }), card.size !== '1x1' && (_jsx("div", { className: "mt-2", children: _jsxs("div", { className: "text-xs text-hive-accent", children: ["Current streak: ", profile.stats?.currentStreak || 0, " days"] }) }))] }));
            }
            case 'reputation': {
                const reputation = profile.stats?.reputation || 0;
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: reputation }), _jsx(TrendingUp, { size: 14, className: "text-green-400" })] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Reputation score" }), card.size !== '1x1' && (_jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full bg-hive-background-secondary rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-hive-accent to-green-500 rounded-full h-2 transition-all duration-500", style: { width: `${Math.min(100, reputation)}%` } }) }) }))] }));
            }
            default:
                return (_jsx("div", { className: "space-y-2 mt-2", children: _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Widget coming soon" }) }));
        }
    };
    return (_jsxs("div", { ref: gridRef, className: `
        grid gap-4 p-4
        ${isMobile ? 'grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
        ${className}
      `, children: [activeCards.filter(card => card.visible).map(renderCard), editable && (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx(Button, { variant: "default", size: "sm", onClick: () => onLayoutChange?.(layout), className: "shadow-lg", children: "Save Layout" }) }))] }));
};
//# sourceMappingURL=profile-bento-grid.js.map