'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Users, Calendar, Activity, Search, Zap, Settings, GripVertical, Maximize2, Minimize2 } from 'lucide-react';
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
        const config = cardConfigs[card.type] || {};
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
        switch (card.type) {
            case 'spaces_hub':
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: profile.connections.connections.length }), _jsxs("div", { className: "text-xs text-hive-text-secondary", children: ["Active in ", profile.connections.connections.filter(c => c.sharedSpaces.length > 0).length, " spaces"] }), card.size !== '1x1' && (_jsx("div", { className: "mt-3 space-y-1", children: _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Recent activity" }) }))] }));
            case 'friends_network':
                return (_jsx("div", { className: "space-y-2 mt-2", children: _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: profile.connections.friends.length }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-hive-text-primary", children: profile.connections.connections.length }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Connections" })] })] }) }));
            case 'active_now':
                const activeFriends = profile.connections.friends.filter(f => 
                // In real app, check real-time presence
                Math.random() > 0.5);
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: activeFriends.length }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends online" }), card.size !== '1x1' && (_jsx("div", { className: "flex -space-x-2 mt-2", children: [1, 2, 3].map(i => (_jsx("div", { className: "w-6 h-6 rounded-full bg-hive-accent/20 border border-hive-background-primary" }, i))) }))] }));
            case 'vibe_check':
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx("div", { className: "text-lg font-semibold text-hive-text-primary", children: profile.presence.vibe }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Tap to update your vibe" })] }));
            case 'schedule_overlap':
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("div", { className: "text-sm text-hive-text-primary", children: [profile.intelligence.overlaps.length, " overlaps today"] }), profile.presence.beacon?.active && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-green-400", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), "Beacon active"] }))] }));
            case 'discovery':
                return (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("div", { className: "text-sm text-hive-text-primary", children: [profile.intelligence.suggestions.length, " new suggestions"] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Based on your interests" })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { ref: gridRef, className: `
        grid gap-4 p-4
        ${isMobile ? 'grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
        ${className}
      `, children: [activeCards.filter(card => card.visible).map(renderCard), editable && (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx(Button, { variant: "default", size: "sm", onClick: () => onLayoutChange?.(layout), className: "shadow-lg", children: "Save Layout" }) }))] }));
};
//# sourceMappingURL=profile-bento-grid.js.map