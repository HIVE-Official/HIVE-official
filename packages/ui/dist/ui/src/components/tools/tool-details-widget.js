'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Star, Calendar, Play, Settings, Share, Download, Heart, BarChart3, Eye, Clock, Tag, Globe, Lock, Zap, TrendingUp } from 'lucide-react';
export const ToolDetailsWidget = ({ tool, isOwnTool = false, onRun, onEdit, onShare, onFavorite, onViewAnalytics, onDownload }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const getStatusColor = (status) => {
        switch (status) {
            case 'featured':
                return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'published':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'draft':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'deprecated':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-hive-text-tertiary/10 text-hive-text-tertiary border-hive-border-default';
        }
    };
    const getDifficultyBadge = () => {
        if (!tool.difficulty)
            return null;
        const difficultyConfig = {
            beginner: { icon: Zap, label: 'Beginner', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
            intermediate: { icon: Star, label: 'Intermediate', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
            advanced: { icon: TrendingUp, label: 'Advanced', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
        };
        const config = difficultyConfig[tool.difficulty];
        const IconComponent = config.icon;
        return (_jsxs("div", { className: `inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${config.color}`, children: [_jsx(IconComponent, { size: 14 }), _jsx("span", { children: config.label })] }));
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-hive-brand-secondary/10 rounded-xl mb-4 text-4xl", children: tool.icon }), _jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [_jsx("h2", { className: "text-heading-lg font-semibold text-hive-text-primary", children: tool.name }), _jsx("div", { className: `px-2 py-1 rounded border text-xs font-medium ${getStatusColor(tool.status)}`, children: tool.status.charAt(0).toUpperCase() + tool.status.slice(1) })] }), _jsxs("div", { className: "flex items-center justify-center gap-4 text-hive-text-secondary mb-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { size: 16 }), _jsxs("span", { className: "text-sm", children: [tool.usageCount || 0, " uses"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { size: 16 }), _jsxs("span", { className: "text-sm", children: [tool.likes || 0, " likes"] })] }), tool.timeToComplete && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 16 }), _jsx("span", { className: "text-sm", children: tool.timeToComplete })] })), getDifficultyBadge()] }), _jsx("p", { className: "text-body-md text-hive-text-secondary max-w-2xl", children: tool.description })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsxs("button", { onClick: () => onRun?.(tool.id), className: "px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover transition-colors flex items-center justify-center gap-2", children: [_jsx(Play, { size: 18 }), "Run Tool"] }), _jsxs("button", { onClick: () => {
                            setIsFavorited(!isFavorited);
                            onFavorite?.(tool.id);
                        }, className: `px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isFavorited
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                            : 'border border-hive-border-default text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus'}`, children: [_jsx(Heart, { size: 18, className: isFavorited ? 'fill-current' : '' }), isFavorited ? 'Unfavorite' : 'Favorite'] }), _jsxs("button", { onClick: () => onShare?.(tool.id), className: "px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors flex items-center justify-center gap-2", children: [_jsx(Share, { size: 18 }), "Share"] }), isOwnTool && (_jsx("button", { onClick: () => onEdit?.(tool.id), className: "px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors flex items-center justify-center", children: _jsx(Settings, { size: 18 }) }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6", children: [_jsxs("h3", { className: "font-semibold text-hive-text-primary mb-4 flex items-center gap-2", children: [_jsx(BarChart3, { size: 18, className: "text-hive-brand-secondary" }), "Usage Stats"] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Total Uses" }), _jsx("span", { className: "text-hive-text-primary font-medium", children: tool.usageCount || 0 })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Likes" }), _jsx("span", { className: "text-hive-text-primary font-medium", children: tool.likes || 0 })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Category" }), _jsx("span", { className: "text-hive-text-primary font-medium capitalize", children: tool.category })] }), tool.version && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Version" }), _jsxs("span", { className: "text-hive-text-primary font-medium", children: ["v", tool.version] })] }))] })] }), _jsxs("div", { className: "bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6", children: [_jsxs("h3", { className: "font-semibold text-hive-text-primary mb-4 flex items-center gap-2", children: [_jsx(Calendar, { size: 18, className: "text-hive-brand-secondary" }), "Tool Details"] }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Created" }), _jsx("span", { className: "text-hive-text-primary", children: formatDate(tool.createdAt) })] }), tool.updatedAt && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Last Updated" }), _jsx("span", { className: "text-hive-text-primary", children: formatDate(tool.updatedAt) })] })), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Visibility" }), _jsxs("div", { className: "flex items-center gap-1", children: [tool.isPublic ? _jsx(Globe, { size: 12 }) : _jsx(Lock, { size: 12 }), _jsx("span", { className: "text-hive-text-primary", children: tool.isPublic ? 'Public' : 'Private' })] })] }), tool.author && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Created by" }), _jsx("span", { className: "text-hive-text-primary", children: tool.author.name })] }))] })] })] }), tool.tags && tool.tags.length > 0 && (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-hive-text-primary mb-3", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2", children: tool.tags.map((tag, index) => (_jsxs("span", { className: "px-3 py-1 bg-hive-background-tertiary border border-hive-border-subtle rounded-lg text-sm text-hive-text-secondary flex items-center gap-1", children: [_jsx(Tag, { size: 12 }), tag] }, index))) })] })), isOwnTool && (_jsx("div", { className: "pt-4 border-t border-hive-border-subtle", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("button", { onClick: () => onViewAnalytics?.(tool.id), className: "flex-1 px-4 py-2 bg-hive-background-tertiary text-hive-text-secondary rounded-lg hover:text-hive-text-primary transition-colors flex items-center justify-center gap-2", children: [_jsx(BarChart3, { size: 16 }), "View Analytics"] }), _jsxs("button", { onClick: () => onDownload?.(tool.id), className: "flex-1 px-4 py-2 bg-hive-background-tertiary text-hive-text-secondary rounded-lg hover:text-hive-text-primary transition-colors flex items-center justify-center gap-2", children: [_jsx(Download, { size: 16 }), "Export Tool"] })] }) }))] }));
};
export default ToolDetailsWidget;
//# sourceMappingURL=tool-details-widget.js.map