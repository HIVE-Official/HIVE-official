"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Pin, Link, FileText, AlertCircle, Download, ExternalLink, MoreVertical, Edit, Trash2, Plus, Info, ChevronRight, File } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useFirebaseRealtime, useOptimisticUpdates } from '../../hooks/use-live-updates';
// Pinned Item Card Component
const PinnedItemCard = ({ item, isLeader, variant = 'widget', onEdit, onUnpin, onView }) => {
    const [showActions, setShowActions] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const typeConfig = {
        announcement: {
            icon: AlertCircle,
            color: 'text-blue-600 bg-blue-50',
            label: 'Announcement'
        },
        resource: {
            icon: FileText,
            color: 'text-green-600 bg-green-50',
            label: 'Resource'
        },
        link: {
            icon: Link,
            color: 'text-purple-600 bg-purple-50',
            label: 'Link'
        },
        document: {
            icon: File,
            color: 'text-gray-600 bg-gray-50',
            label: 'Document'
        },
        alert: {
            icon: Info,
            color: 'text-red-600 bg-red-50',
            label: 'Alert'
        }
    };
    const priorityColors = {
        high: 'border-l-4 border-l-red-500',
        medium: 'border-l-4 border-l-yellow-500',
        low: 'border-l-4 border-l-gray-300'
    };
    const config = typeConfig[item.type];
    const TypeIcon = config.icon;
    return (_jsx("div", { className: cn("bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all", priorityColors[item.priority], variant === 'compact' && "p-3", variant !== 'compact' && "p-4"), children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg shrink-0", config.color), children: _jsx(TypeIcon, { className: "h-5 w-5" }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-gray-900 line-clamp-1", children: item.title }), item.description && (_jsx("p", { className: cn("text-sm text-gray-600 mt-1", !isExpanded && "line-clamp-2"), children: item.description })), item.content && isExpanded && (_jsx("div", { className: "mt-3 p-3 bg-gray-50 rounded-lg", children: _jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: item.content }) })), item.fileUrl && (_jsxs("a", { href: item.fileUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors", children: [_jsx(Download, { className: "h-4 w-4" }), item.fileName || 'Download', item.fileSize && (_jsxs("span", { className: "text-xs text-gray-500", children: ["(", item.fileSize, ")"] }))] })), item.url && (_jsxs("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700", children: [_jsx(ExternalLink, { className: "h-3 w-3" }), "View link"] })), item.imageUrl && isExpanded && (_jsx("img", { src: item.imageUrl, alt: item.title, className: "mt-3 rounded-lg w-full max-h-64 object-cover" })), item.tags && item.tags.length > 0 && variant === 'full' && (_jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: item.tags.map((tag) => (_jsx("span", { className: "text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded", children: tag }, tag))) })), _jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-gray-500", children: [_jsxs("span", { children: ["Pinned by ", item.authorName] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatDistanceToNow(item.pinnedAt, { addSuffix: true }) }), item.expiresAt && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { className: "text-orange-600", children: ["Expires ", formatDistanceToNow(item.expiresAt, { addSuffix: true })] })] }))] })] }), _jsxs("div", { className: "relative shrink-0", children: [(item.content || item.imageUrl) && !isExpanded && (_jsx("button", { onClick: () => setIsExpanded(true), className: "p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 mr-1", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })), _jsx("button", { onClick: () => setShowActions(!showActions), className: "p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }), showActions && (_jsxs("div", { className: "absolute right-0 top-6 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10", children: [isExpanded && (_jsx("button", { onClick: () => {
                                                    setIsExpanded(false);
                                                    setShowActions(false);
                                                }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50", children: "Collapse" })), isLeader && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                            onEdit?.();
                                                            setShowActions(false);
                                                        }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Edit, { className: "h-4 w-4" }), "Edit item"] }), _jsxs("button", { onClick: () => {
                                                            onUnpin?.();
                                                            setShowActions(false);
                                                        }, className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2", children: [_jsx(Trash2, { className: "h-4 w-4" }), "Unpin item"] })] }))] }))] })] }) })] }) }));
};
// Main Surface Component
export const HivePinnedSurface = ({ spaceId, spaceName, isLeader = false, currentUserId, className, variant = 'widget', pinnedItems: propItems, loading = false, error = null, onPinItem, onUnpinItem, onEditItem, }) => {
    // No mock data - use real pinned items only
    const emptyPinnedItems = [];
    /* Removed mock data
    const mockPinnedItems: PinnedItem[] = useMemo(() => [
      {
        id: '1',
        type: 'alert',
        title: 'Important: Space Guidelines Updated',
        description: 'We\'ve updated our community guidelines to better reflect our values and ensure a positive environment for everyone.',
        content: 'Please review the following changes:\n\n1. Respectful communication is mandatory\n2. No spam or self-promotion without approval\n3. Share resources that benefit the community\n4. Report any issues to space leaders immediately',
        priority: 'high',
        authorId: '1',
        authorName: 'Sarah Chen',
        pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        tags: ['guidelines', 'important']
      },
      {
        id: '2',
        type: 'resource',
        title: 'Project Resources & Templates',
        description: 'Collection of useful templates and resources for our projects.',
        fileUrl: '#',
        fileName: 'project-templates.zip',
        fileSize: '2.4 MB',
        priority: 'medium',
        authorId: '2',
        authorName: 'Marcus Johnson',
        pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        tags: ['resources', 'templates']
      },
      {
        id: '3',
        type: 'link',
        title: 'Team Collaboration Board',
        description: 'Our shared Notion workspace for project planning and collaboration.',
        url: 'https://notion.so/workspace',
        priority: 'medium',
        authorId: '3',
        authorName: 'Emily Rodriguez',
        pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
        tags: ['collaboration', 'planning']
      },
      {
        id: '4',
        type: 'announcement',
        title: 'Welcome New Members!',
        description: 'A warm welcome to everyone who joined this week. Feel free to introduce yourself in the feed!',
        priority: 'low',
        authorId: '1',
        authorName: 'Sarah Chen',
        pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        tags: ['welcome']
      }
    ], []);
    */
    // Real-time pinned items data
    const { data: realtimePinnedItems, loading: realtimeLoading, error: realtimeError } = useFirebaseRealtime('pinned', [{ field: 'spaceId', operator: '==', value: spaceId }], 'pinnedAt', 10, [spaceId]);
    const { data: optimisticPinnedItems } = useOptimisticUpdates(propItems || realtimePinnedItems || []);
    // Use optimistic pinned items for immediate UI updates
    const pinnedItems = optimisticPinnedItems || emptyPinnedItems;
    const isLoading = loading || realtimeLoading;
    const displayError = error || realtimeError;
    // Sort by priority then by date
    const sortedItems = useMemo(() => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...pinnedItems].sort((a, b) => {
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            return b.pinnedAt.getTime() - a.pinnedAt.getTime();
        });
    }, [pinnedItems]);
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 rounded-lg h-16 mb-4" }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => (_jsx("div", { className: "bg-gray-100 rounded-lg h-24" }, i))) })] }) }));
    }
    if (displayError) {
        return (_jsx(HiveCard, { className: cn("p-6", className), children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "Unable to load pinned items" }), _jsx("p", { className: "text-sm text-gray-500", children: displayError.message })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Pin, { className: "h-5 w-5 text-gray-600" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: variant === 'full' && spaceName ? `${spaceName} Pinned` : 'Pinned' }), _jsx(HiveBadge, { variant: "secondary", className: "text-xs", children: sortedItems.length })] }), isLeader && (_jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: onPinItem, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Pin Item"] }))] }), _jsx("div", { className: "space-y-3", children: sortedItems.length === 0 ? (_jsx(HiveCard, { className: "p-8", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Pin, { className: "h-12 w-12 text-gray-400 mx-auto" }), _jsx("p", { className: "text-gray-600", children: "No pinned items" }), _jsx("p", { className: "text-sm text-gray-500", children: isLeader
                                    ? "Pin important announcements, resources, or links for your space"
                                    : "Important information will appear here" })] }) })) : (sortedItems
                    .slice(0, variant === 'widget' ? 3 : undefined)
                    .map((item) => (_jsx(PinnedItemCard, { item: item, isLeader: isLeader, variant: variant, onEdit: () => onEditItem?.(item.id), onUnpin: () => onUnpinItem?.(item.id), onView: () => console.log('View item:', item.id) }, item.id)))) }), variant === 'widget' && sortedItems.length > 3 && (_jsxs("button", { className: "w-full py-2 text-sm text-orange-600 hover:text-orange-700 font-medium", children: ["View all ", sortedItems.length, " pinned items \u2192"] }))] }));
};
// Export display name for debugging
HivePinnedSurface.displayName = 'HivePinnedSurface';
//# sourceMappingURL=HivePinnedSurface.js.map