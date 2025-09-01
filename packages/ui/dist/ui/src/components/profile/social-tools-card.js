/**
 * Social Tools Card - Utility + Social Discovery
 * Grid of tools with social context and usage sharing
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Wrench, Star, Users, Plus, ExternalLink, Zap, BookOpen, Target, Clock, BarChart3, Calculator, FileText, Share2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../ui/badge.js';
import { motion } from '../../lib/motion.js';
import { butterClasses, getStaggerClass } from '../../lib/motion.js';
import '../../styles/social-profile.css';
export function SocialToolsCard({ tools = [], createdTools = [], totalCreated = 0, campusImpact = 0, averageRating, isBuilder = false, onToolClick, onCreateTool, onBrowseTools, onShareTools, className }) {
    const [activeTab, setActiveTab] = useState('trending');
    const trendingTools = tools
        .filter(tool => tool.socialProof?.trending)
        .slice(0, 4);
    const yourTools = tools
        .filter(tool => !tool.isCreated)
        .sort((a, b) => new Date(b.lastUsed || 0).getTime() - new Date(a.lastUsed || 0).getTime())
        .slice(0, 4);
    const getToolIcon = (iconName) => {
        const iconMap = {
            '🧮': _jsx(Calculator, { size: 20 }),
            '📊': _jsx(BarChart3, { size: 20 }),
            '⏰': _jsx(Clock, { size: 20 }),
            '🤝': _jsx(Users, { size: 20 }),
            '📝': _jsx(FileText, { size: 20 }),
            '📎': _jsx(ExternalLink, { size: 20 }),
            '🎯': _jsx(Target, { size: 20 }),
            '📚': _jsx(BookOpen, { size: 20 }),
        };
        return iconMap[iconName] || _jsx(Wrench, { size: 20 });
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'academic': return 'var(--campus-blue)';
            case 'productivity': return 'var(--social-green)';
            case 'social': return 'var(--campus-blue)';
            case 'finance': return '#10B981';
            case 'health': return '#EF4444';
            default: return 'var(--text-tertiary)';
        }
    };
    const formatUsageCount = (count) => {
        if (count > 1000)
            return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };
    const ToolButton = ({ tool }) => (_jsxs(motion.button, { onClick: () => onToolClick?.(tool.id), className: cn("group relative p-3 rounded-xl border border-white/10 hover:border-white/20 bg-gradient-to-br from-transparent to-white/5 hover:to-white/10", butterClasses.button), whileHover: { scale: 1.02, y: -2 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }, children: [tool.isNew && (_jsx(Badge, { className: "absolute -top-1 -right-1 bg-blue-500 text-[var(--hive-text-inverse)] text-xs px-1 py-0", children: "NEW" })), tool.socialProof?.trending && (_jsx("div", { className: "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" })), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center text-[var(--hive-text-inverse)]", style: { background: getCategoryColor(tool.category) }, children: tool.icon ? (_jsx("span", { className: "text-lg", children: tool.icon })) : (getToolIcon(tool.name)) }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "profile-caption font-medium text-primary group-hover:text-blue-400 transition-colors", children: tool.name }), _jsxs("div", { className: "flex items-center justify-center gap-1 mt-1", children: [_jsx(Star, { size: 10, className: "text-blue-400 fill-current" }), _jsx("span", { className: "profile-fine text-secondary", children: tool.rating.toFixed(1) })] }), tool.socialProof && (_jsx("div", { className: "profile-fine text-tertiary mt-1", children: tool.socialProof.friendsUsed.length > 0 ? (_jsxs("span", { children: [tool.socialProof.friendsUsed[0], " +", tool.socialProof.totalUsers - 1, " used"] })) : (_jsxs("span", { children: [formatUsageCount(tool.socialProof.totalUsers), " users"] })) })), tool.isCreated && (_jsx(Badge, { variant: "secondary", className: "mt-1 text-xs border-blue-400/30 text-blue-400", children: "Your Tool" }))] })] })] }));
    return (_jsxs(motion.div, { className: cn("social-profile-card", butterClasses.card, className), style: { gridArea: 'tools' }, initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center", children: _jsx(Wrench, { size: 20, className: "text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "profile-heading text-primary", children: "\uD83D\uDEE0\uFE0F YOUR TOOLS" }), _jsxs("div", { className: "profile-caption text-secondary", children: [tools.length, "/20 tools"] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onShareTools, className: "text-tertiary hover:text-primary", children: _jsx(Share2, { size: 16 }) })] }), isBuilder && (totalCreated > 0 || campusImpact > 0) && (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 text-[var(--hive-text-inverse)] flex items-center justify-center", children: _jsx(Zap, { size: 16 }) }), _jsxs("div", { children: [_jsx("div", { className: "profile-caption font-semibold text-blue-400", children: "\uD83C\uDFD7\uFE0F Builder Impact" }), _jsxs("div", { className: "profile-fine text-secondary", children: [totalCreated, " tools \u2022 ", campusImpact, " campus uses this week"] })] })] }), _jsx(Badge, { className: "bg-blue-500 text-[var(--hive-text-inverse)]", children: "Top 5%" })] })), _jsxs("div", { className: "flex gap-1 mb-4 p-1 bg-white/5 rounded-lg", children: [_jsx("button", { onClick: () => setActiveTab('trending'), className: cn("flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'trending'
                            ? "bg-blue-500 text-[var(--hive-text-inverse)]"
                            : "text-secondary hover:text-primary"), children: "\uD83D\uDD25 Trending" }), _jsx("button", { onClick: () => setActiveTab('yours'), className: cn("flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'yours'
                            ? "bg-blue-500 text-[var(--hive-text-inverse)]"
                            : "text-secondary hover:text-primary"), children: "\uD83D\uDCDA Your Tools" }), isBuilder && createdTools.length > 0 && (_jsx("button", { onClick: () => setActiveTab('created'), className: cn("flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'created'
                            ? "bg-blue-500 text-[var(--hive-text-inverse)]"
                            : "text-secondary hover:text-primary"), children: "\uD83C\uDFD7\uFE0F Created" }))] }), _jsxs(motion.div, { className: "grid grid-cols-2 gap-3 mb-6", initial: "hidden", animate: "visible", variants: {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }, children: [activeTab === 'trending' && trendingTools.map((tool, index) => (_jsx(motion.div, { variants: {
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 }
                        }, className: getStaggerClass(index), children: _jsx(ToolButton, { tool: tool }) }, tool.id))), activeTab === 'yours' && yourTools.map((tool, index) => (_jsx(motion.div, { variants: {
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 }
                        }, className: getStaggerClass(index), children: _jsx(ToolButton, { tool: tool }) }, tool.id))), activeTab === 'created' && createdTools.map((tool, index) => (_jsx(motion.div, { variants: {
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 }
                        }, className: getStaggerClass(index), children: _jsx(ToolButton, { tool: tool }) }, tool.id))), (activeTab === 'yours' || activeTab === 'created') && (_jsx(motion.button, { onClick: onCreateTool, className: cn("group p-3 rounded-xl border border-dashed border-white/20 hover:border-blue-400/50 bg-transparent hover:bg-blue-400/10", butterClasses.button), whileHover: { scale: 1.02, borderColor: 'rgba(255, 215, 0, 0.5)' }, whileTap: { scale: 0.98 }, variants: {
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 }
                        }, children: _jsxs("div", { className: "flex flex-col items-center justify-center gap-2 h-full", children: [_jsx("div", { className: "w-10 h-10 rounded-lg border border-dashed border-white/30 group-hover:border-blue-400 flex items-center justify-center", children: _jsx(Plus, { size: 20, className: "text-tertiary group-hover:text-blue-400" }) }), _jsx("div", { className: "profile-caption text-tertiary group-hover:text-blue-400", children: activeTab === 'created' ? 'Create New' : 'Add Tool' })] }) }))] }, activeTab), campusImpact > 0 && (_jsxs("div", { className: "social-proof mb-4", children: [_jsx("span", { className: "social-count", children: campusImpact }), _jsx("span", { children: " students used your tools this week" })] })), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { onClick: onBrowseTools, className: "social-action-button flex-1", children: [_jsx(ExternalLink, { size: 16 }), "Browse Tools"] }), _jsxs(Button, { onClick: onCreateTool, className: "social-action-button secondary", variant: "secondary", children: [_jsx(Plus, { size: 16 }), "Create New"] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "profile-caption font-semibold text-primary", children: tools.length }), _jsx("div", { className: "profile-fine text-tertiary", children: "Tools Used" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "profile-caption font-semibold text-primary", children: totalCreated }), _jsx("div", { className: "profile-fine text-tertiary", children: "Created" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "profile-caption font-semibold text-primary", children: averageRating ? averageRating.toFixed(1) : '—' }), _jsx("div", { className: "profile-fine text-tertiary", children: "Avg Rating" })] })] })] }));
}
export default SocialToolsCard;
//# sourceMappingURL=social-tools-card.js.map