'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Wrench, Plus, ExternalLink, Users, Heart, Star, Zap, Code, Calculator, MessageSquare, Settings, ChevronRight, Play, Share } from 'lucide-react';
const getToolCategoryConfig = (category) => {
    const configs = {
        academic: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: Calculator,
            label: 'Academic'
        },
        productivity: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Zap,
            label: 'Productivity'
        },
        social: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: MessageSquare,
            label: 'Social'
        },
        utility: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Wrench,
            label: 'Utility'
        },
        experimental: {
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            icon: Code,
            label: 'Experimental'
        }
    };
    return configs[category] || configs.utility;
};
const getToolStatusConfig = (status) => {
    const configs = {
        active: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            label: 'Active'
        },
        draft: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            label: 'Draft'
        },
        published: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            label: 'Published'
        },
        archived: {
            color: 'text-[var(--hive-text-muted)]',
            bgColor: 'bg-[var(--hive-background-secondary)]',
            label: 'Archived'
        }
    };
    return configs[status] || configs.draft;
};
export const ProfileToolsWidget = ({ user, personalTools = [], totalToolsCreated = 0, totalUsage = 0, featuredTool, weeklyActivity = 0, isEditable = true, onCreateTool, onViewTool, onEditTool, onViewAllTools, onToolMarketplace, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get the most recent tools (up to 3)
    const recentTools = personalTools.slice(0, 3);
    const activeTools = personalTools.filter(tool => tool.status === 'active' || tool.status === 'published').length;
    const totalLikes = personalTools.reduce((sum, tool) => sum + tool.likes, 0);
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "Personal Tools" }), activeTools > 0 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), activeTools, " Active"] }))] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewAllTools, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Wrench, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalToolsCreated })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Tools Created" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalUsage.toLocaleString() })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Total Usage" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Heart, { className: "h-3 w-3 text-red-500" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalLikes })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Likes Received" })] })] }), featuredTool && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Featured Tool:" }), _jsx(Star, { className: "h-3 w-3 text-[var(--hive-gold)]" })] }), _jsx("div", { className: cn('p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer', getToolCategoryConfig(featuredTool.category).bgColor, getToolCategoryConfig(featuredTool.category).borderColor), onClick: () => onViewTool?.(featuredTool.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [(() => {
                                                    const IconComponent = getToolCategoryConfig(featuredTool.category).icon;
                                                    return _jsx(IconComponent, { className: cn('h-4 w-4 mt-0.5 flex-shrink-0', getToolCategoryConfig(featuredTool.category).color) });
                                                })(), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", className: "truncate", children: featuredTool.name }), featuredTool.isPublic && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "Public" }))] }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "line-clamp-2", children: featuredTool.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredTool.usageCount.toLocaleString(), " uses"] })] }), featuredTool.likes > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "h-3 w-3 text-red-500" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: featuredTool.likes })] })), featuredTool.collaborators && featuredTool.collaborators > 1 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", featuredTool.collaborators - 1, " collaborators"] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-1 ml-2", children: [isEditable && onEditTool && (_jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onEditTool(featuredTool.id);
                                                    }, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Play, { className: "h-3 w-3" }) })), _jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onViewTool?.(featuredTool.id);
                                                    }, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(ExternalLink, { className: "h-3 w-3" }) })] })] }) })] })), recentTools.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Recent Tools:" }), personalTools.length > 3 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", personalTools.length - 3, " more"] }))] }), _jsx("div", { className: "space-y-1", children: recentTools.map((tool) => {
                                    const categoryConfig = getToolCategoryConfig(tool.category);
                                    const statusConfig = getToolStatusConfig(tool.status);
                                    return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer", onClick: () => onViewTool?.(tool.id), children: [_jsx(categoryConfig.icon, { className: cn('h-3 w-3', categoryConfig.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: tool.name }), _jsx(Badge, { variant: "secondary", className: cn('text-xs', statusConfig.color), children: statusConfig.label }), _jsxs("div", { className: "flex items-center gap-1", children: [tool.usageCount > 0 && (_jsx(Text, { variant: "body-xs", color: "secondary", children: tool.usageCount > 999 ? '999+' : tool.usageCount })), _jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" })] })] }, tool.id));
                                }) })] })), weeklyActivity > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "This Week:" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Tool Development Activity" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full", children: _jsx("div", { className: "h-2 bg-[var(--hive-gold)] rounded-full transition-all duration-500", style: { width: `${Math.min(weeklyActivity, 100)}%` } }) }), _jsxs(Text, { variant: "body-xs", color: "gold", weight: "medium", children: [weeklyActivity, "%"] })] })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onCreateTool && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreateTool, className: "flex-1", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Create Tool"] })), onViewAllTools && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onViewAllTools, className: "flex-1", children: [_jsx(Wrench, { className: "h-3 w-3 mr-1" }), "My Tools"] })), onToolMarketplace && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onToolMarketplace, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Share, { className: "h-3 w-3" }) }))] }), personalTools.length === 0 && (_jsxs("div", { className: "text-center py-6", children: [_jsx(Wrench, { className: "h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No tools created yet" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mb-4", children: "Start building your first tool to help fellow UB students" }), isEditable && onCreateTool && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreateTool, children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Create Your First Tool"] }))] }))] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-tools-widget.js.map