/**
 * ToolCard - Purpose-built for UB student tools
 *
 * Shows what students want to know about tools:
 * 1. What does this tool do? (name, purpose)
 * 2. Who built it and where? (creator, space context)
 * 3. How do I use/get it? (install, run, share)
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Play, Download, Share, Star, Users, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
export function ToolCard({ tool, currentUserId, showCreator = true, showSpace = true, showUsage = true, onInstall, onRun, onShare, onFavorite, onView, className }) {
    const isOwn = currentUserId === tool.creator.id;
    const categoryColors = {
        academic: 'bg-blue-500/10 text-blue-400',
        productivity: 'bg-green-500/10 text-green-400',
        social: 'bg-purple-500/10 text-purple-400',
        utility: 'bg-amber-500/10 text-amber-400'
    };
    const handlePrimaryAction = (e) => {
        e.stopPropagation();
        if (tool.isInstalled) {
            onRun?.(tool.id);
        }
        else {
            onInstall?.(tool.id);
        }
    };
    const handleCardClick = () => {
        onView?.(tool.id);
    };
    return (_jsx(Card, { className: cn("cursor-pointer border border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-850", className), onClick: handleCardClick, children: _jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: "font-semibold text-white text-base leading-tight line-clamp-2", children: tool.name }), _jsx("div", { className: "flex items-center gap-1", children: _jsx(Badge, { variant: "secondary", className: cn("text-xs px-2 py-0.5", categoryColors[tool.category]), children: tool.category }) })] }), _jsx("p", { className: "text-sm text-gray-400 line-clamp-2 leading-relaxed", children: tool.description })] }), (showCreator || showSpace) && (_jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-3", children: [showCreator && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsxs(Avatar, { className: "h-4 w-4", children: [_jsx(AvatarImage, { src: tool.creator.avatar, alt: tool.creator.name }), _jsx(AvatarFallback, { className: "bg-gray-800 text-white text-xs", children: tool.creator.name[0].toUpperCase() })] }), _jsx("span", { children: isOwn ? 'Your tool' : `by ${tool.creator.name}` })] })), showSpace && tool.space && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: tool.space.name })] }))] }), showUsage && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsxs("span", { children: [tool.usageCount, " uses"] })] }))] })), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [tool.isFavorite && (_jsx(Star, { className: "h-3 w-3 text-amber-400 fill-amber-400" })), tool.lastUsed && (_jsxs("span", { className: "text-xs text-gray-500", children: ["Used ", tool.lastUsed] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [onFavorite && (_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                        e.stopPropagation();
                                        onFavorite(tool.id);
                                    }, className: "p-1 h-auto", children: _jsx(Star, { className: cn("h-3 w-3", tool.isFavorite ? "text-amber-400 fill-amber-400" : "text-gray-500") }) })), onShare && (_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                        e.stopPropagation();
                                        onShare(tool.id);
                                    }, className: "p-1 h-auto", children: _jsx(Share, { className: "h-3 w-3 text-gray-500" }) })), _jsx(Button, { size: "sm", variant: tool.isInstalled ? "secondary" : "primary", onClick: handlePrimaryAction, className: "text-xs px-3 py-1.5 h-auto", children: tool.isInstalled ? (_jsxs(_Fragment, { children: [_jsx(Play, { className: "h-3 w-3 mr-1" }), "Run"] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "h-3 w-3 mr-1" }), "Install"] })) })] })] })] }) }));
}
// Compact version for lists and smaller spaces
export function ToolCardCompact({ tool, onInstall, onRun, className }) {
    const isInstalled = tool.isInstalled;
    return (_jsxs("div", { className: cn("flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50", className), children: [_jsx("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-white text-sm truncate", children: tool.name }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [_jsxs("span", { children: ["by ", tool.creator.name] }), _jsx("div", { className: "h-1 w-1 bg-gray-500 rounded-full" }), _jsxs("span", { children: [tool.usageCount, " uses"] })] })] }) }), _jsx(Button, { size: "sm", variant: isInstalled ? "secondary" : "primary", onClick: (e) => {
                    e.stopPropagation();
                    if (isInstalled) {
                        onRun?.(tool.id);
                    }
                    else {
                        onInstall?.(tool.id);
                    }
                }, className: "text-xs px-3 py-1.5 h-auto flex-shrink-0", children: isInstalled ? (_jsxs(_Fragment, { children: [_jsx(Play, { className: "h-3 w-3 mr-1" }), "Run"] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "h-3 w-3 mr-1" }), "Get"] })) })] }));
}
// Loading skeleton
export function ToolCardSkeleton() {
    return (_jsx(Card, { className: "border border-gray-700 bg-gray-900", children: _jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-5 bg-gray-800 rounded animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-800 rounded animate-pulse w-3/4" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "h-3 bg-gray-800 rounded animate-pulse w-1/3" }), _jsx("div", { className: "h-8 bg-gray-800 rounded animate-pulse w-16" })] })] }) }));
}
//# sourceMappingURL=tool-card.js.map