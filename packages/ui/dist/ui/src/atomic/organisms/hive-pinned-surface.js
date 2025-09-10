'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Plus, FileText, Link as LinkIcon, Calendar, AlertCircle, Download, Eye, MoreHorizontal, Clock, User, TrendingUp, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';
export const HivePinnedSurface = ({ space, items = [], maxItems, canPin = false, canModerate = false, leaderMode, viewMode = 'list', onAddPinned, onViewItem, onDownloadItem, onUnpinItem }) => {
    const [filter, setFilter] = useState('all');
    const filteredItems = useMemo(() => {
        let filtered = items.filter(item => {
            const matchesFilter = filter === 'all' || item.type === filter;
            return matchesFilter;
        });
        // Sort by pinned date (most recent first)
        filtered.sort((a, b) => b.pinnedAt.getTime() - a.pinnedAt.getTime());
        if (maxItems) {
            filtered = filtered.slice(0, maxItems);
        }
        return filtered;
    }, [items, filter, maxItems]);
    const getItemIcon = (type) => {
        switch (type) {
            case 'document': return _jsx(FileText, { className: "h-4 w-4" });
            case 'link': return _jsx(LinkIcon, { className: "h-4 w-4" });
            case 'announcement': return _jsx(AlertCircle, { className: "h-4 w-4" });
            case 'event': return _jsx(Calendar, { className: "h-4 w-4" });
            case 'resource': return _jsx(FileText, { className: "h-4 w-4" });
            default: return _jsx(Pin, { className: "h-4 w-4" });
        }
    };
    const getItemTypeColor = (type) => {
        switch (type) {
            case 'document': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'link': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'announcement': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'event': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'resource': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    const formatFileSize = (bytes) => {
        if (!bytes)
            return '';
        const kb = bytes / 1024;
        const mb = kb / 1024;
        if (mb >= 1)
            return `${mb.toFixed(1)}MB`;
        return `${kb.toFixed(0)}KB`;
    };
    const formatTimeAgo = (date) => {
        const diff = Date.now() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes}m ago`;
    };
    const isExpiringSoon = (expiresAt) => {
        if (!expiresAt)
            return false;
        const daysUntilExpiry = (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        return daysUntilExpiry <= 3;
    };
    const pinnedStats = useMemo(() => {
        return {
            total: items.length,
            totalViews: items.reduce((sum, item) => sum + (item.viewCount || 0), 0),
            totalDownloads: items.reduce((sum, item) => sum + (item.downloadCount || 0), 0),
            expiringSoon: items.filter(item => isExpiringSoon(item.expiresAt)).length
        };
    }, [items]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Pin, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: "Pinned Resources" }), _jsxs("span", { className: "text-sm text-neutral-400", children: ["(", filteredItems.length, ")"] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canPin && (_jsxs("button", { onClick: onAddPinned, className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Pin Resource" })] }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: pinnedStats.total }), _jsx("div", { className: "text-xs text-neutral-400", children: "Pinned Items" })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: pinnedStats.totalViews }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Views" })] }), _jsxs("div", { className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: pinnedStats.totalDownloads }), _jsx("div", { className: "text-xs text-neutral-400", children: "Downloads" })] }), _jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-yellow-400", children: pinnedStats.expiringSoon }), _jsx("div", { className: "text-xs text-neutral-400", children: "Expiring Soon" })] })] })), items.length > 3 && (_jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: [
                    { id: 'all', label: 'All Items' },
                    { id: 'document', label: 'Documents' },
                    { id: 'announcement', label: 'Announcements' },
                    { id: 'resource', label: 'Resources' },
                    { id: 'event', label: 'Events' },
                    { id: 'link', label: 'Links' }
                ].map((filterOption) => (_jsx("button", { onClick: () => setFilter(filterOption.id), className: cn("px-3 py-1 rounded-full text-sm transition-colors whitespace-nowrap", filter === filterOption.id
                        ? "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30"
                        : "bg-white/5 text-neutral-400 border border-white/10 hover:text-[var(--hive-text-inverse)]"), children: filterOption.label }, filterOption.id))) })), _jsxs("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                    : "space-y-3"), children: [_jsx(AnimatePresence, { children: filteredItems.map((item, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.05 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5", isExpiringSoon(item.expiresAt) && "border-yellow-500/30 bg-yellow-500/5"), children: _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: item.title }), _jsxs("span", { className: cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize flex items-center gap-1", getItemTypeColor(item.type)), children: [getItemIcon(item.type), item.type] }), isExpiringSoon(item.expiresAt) && (_jsx("span", { className: "px-2 py-0.5 text-xs font-medium rounded-full border bg-yellow-500/20 text-yellow-400 border-yellow-500/30", children: "Expiring Soon" }))] }), item.description && (_jsx("p", { className: "text-sm text-neutral-300 mb-3 line-clamp-2", children: item.description })), _jsxs("div", { className: "space-y-1 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-3 w-3" }), _jsxs("span", { children: ["Pinned by ", item.pinnedBy.name] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTimeAgo(item.pinnedAt) })] }), item.fileName && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-3 w-3" }), _jsx("span", { children: item.fileName }), item.fileSize && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: formatFileSize(item.fileSize) })] }))] })), item.expiresAt && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: ["Expires ", item.expiresAt.toLocaleDateString()] })] })), leaderMode === 'insights' && (item.viewCount || item.downloadCount) && (_jsxs("div", { className: "flex items-center gap-4 pt-2 border-t border-white/10", children: [item.viewCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsxs("span", { className: "text-blue-400", children: [item.viewCount, " views"] })] })), item.downloadCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "h-3 w-3" }), _jsxs("span", { className: "text-green-400", children: [item.downloadCount, " downloads"] })] })), item.lastAccessed && (_jsxs("span", { className: "text-neutral-500", children: ["Last accessed ", formatTimeAgo(item.lastAccessed)] }))] }))] })] }), _jsxs("div", { className: "flex items-center gap-2 ml-4", children: [item.fileUrl ? (_jsxs("button", { onClick: () => onDownloadItem?.(item.id), className: "flex items-center gap-1 px-3 py-1 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors text-sm", children: [_jsx(Download, { className: "h-3 w-3" }), "Download"] })) : item.url ? (_jsxs("button", { onClick: () => onViewItem?.(item.id), className: "flex items-center gap-1 px-3 py-1 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors text-sm", children: [_jsx(Eye, { className: "h-3 w-3" }), "View"] })) : (_jsxs("button", { onClick: () => onViewItem?.(item.id), className: "flex items-center gap-1 px-3 py-1 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors text-sm", children: [_jsx(Eye, { className: "h-3 w-3" }), "View"] })), canModerate && (_jsx("div", { className: "relative", children: _jsx("button", { className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-neutral-400" }) }) })), canModerate && (_jsx("button", { onClick: () => onUnpinItem?.(item.id), className: "p-2 hover:bg-red-500/10 rounded-lg transition-colors", title: "Unpin item", children: _jsx(Trash2, { className: "h-4 w-4 text-red-400" }) }))] })] }) }, item.id))) }), filteredItems.length === 0 && (_jsxs("div", { className: "text-center py-8 col-span-full", children: [_jsx(Pin, { className: "h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" }), _jsx("p", { className: "text-neutral-400", children: "No pinned items found" }), _jsx("p", { className: "text-sm text-neutral-500 mt-1", children: canPin ? 'Pin important resources for quick access' : 'Leaders will pin important items here' })] }))] }), maxItems && items.length > maxItems && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium", children: ["View all ", items.length, " pinned items"] }) }))] }));
};
export default HivePinnedSurface;
//# sourceMappingURL=hive-pinned-surface.js.map