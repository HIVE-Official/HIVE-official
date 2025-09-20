"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { Calendar, Star, Link as LinkIcon, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';
// HIVE Pinned Surface - Core Information & Welcome Content
// First impression and essential Space information display
const hivePinnedSurfaceVariants = cva("relative w-full", {
    variants: {
        mode: {
            view: "",
            edit: "ring-2 ring-yellow-500/30 ring-offset-2 ring-offset-black/20",
            builder: "ring-2 ring-yellow-500/30 ring-offset-2 ring-offset-black/20",
        }
    },
    defaultVariants: {
        mode: "view",
    },
});
// Pinned content types with HIVE design patterns
const pinnedContentTypes = {
    welcome: {
        icon: Star,
        label: 'Welcome Message',
        color: 'text-yellow-400',
        description: 'Space introduction and guidelines'
    },
    announcement: {
        icon: AlertCircle,
        label: 'Announcement',
        color: 'text-orange-400',
        description: 'Important updates and news'
    },
    link: {
        icon: LinkIcon,
        label: 'Quick Link',
        color: 'text-blue-400',
        description: 'External resources and websites'
    },
    event: {
        icon: Calendar,
        label: 'Featured Event',
        color: 'text-green-400',
        description: 'Upcoming important events'
    },
    image: {
        icon: ImageIcon,
        label: 'Image',
        color: 'text-purple-400',
        description: 'Visual content and media'
    },
    document: {
        icon: FileText,
        label: 'Document',
        color: 'text-gray-400',
        description: 'Important files and resources'
    },
};
export const HivePinnedSurface = React.forwardRef(({ className, mode, space, pinnedContent = [], isBuilder = false, canEdit = false, onAddContent, onEditContent, onDeleteContent, onReorderContent, showWelcomePrompt = true, maxItems = 6, ...props }, ref) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    // Sort pinned content by priority and date
    const sortedContent = pinnedContent
        .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
})
    .slice(0, maxItems);
const handleAddContent = useCallback((type) => {
    onAddContent?.(type);
    setShowAddMenu(false);
}, [onAddContent]);
// Empty state for new Spaces
if (pinnedContent.length === 0 && showWelcomePrompt) {
    return (_jsx("div", { ref: ref, className: cn(hivePinnedSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(Pin, { className: "w-8 h-8 text-yellow-400" }) }), _jsxs("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: ["Welcome to ", space.name] }), _jsx("p", { className: "text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed", children: space.description || "This Space is ready for content! Pin important announcements, links, and resources to help members get started." }), isBuilder && canEdit && (_jsxs(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 font-medium", onClick: () => setShowAddMenu(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), "Add First Pin"] }))] }) }));
}
return (_jsxs("div", { ref: ref, className: cn(hivePinnedSurfaceVariants({ mode, className })), ...props, children: [_jsx("div", { className: "space-y-4", children: sortedContent.map((content, index) => {
                const typeConfig = pinnedContentTypes[content.type];
                const TypeIcon = typeConfig.icon;
                const isHovered = hoveredItem === content.id;
                return (_jsxs(motion.article, { className: cn("relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-4 transition-all duration-200", isHovered && "border-white/10", content.priority === 'high' && "ring-1 ring-yellow-500/20", mode === 'edit' && "hover:ring-2 hover:ring-yellow-500/30"), onMouseEnter: () => setHoveredItem(content.id), onMouseLeave: () => setHoveredItem(null), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, layout: true, children: [content.priority === 'high' && (_jsx(motion.div, { className: "absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full", initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: index * 0.05 + 0.2 } })), _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", content.priority === 'high' ? "bg-yellow-500/20" : "bg-[var(--hive-text-primary)]/5"), children: _jsx(TypeIcon, { className: cn("w-5 h-5", typeConfig.color) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] text-sm truncate", children: content.title }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400 mt-1", children: [_jsx("span", { children: typeConfig.label }), _jsx("span", { children: "\u2022" }), _jsx("time", { children: new Date(content.updatedAt).toLocaleDateString() }), content.expiresAt && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1 text-orange-400", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: "Expires" })] })] }))] })] })] }), _jsx(AnimatePresence, { children: (isHovered || mode === 'edit') && canEdit && (_jsxs(motion.div, { className: "flex items-center gap-1 ml-2", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: motionDurations.quick }, children: [_jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", onClick: () => onEditContent?.(content), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Edit3, { className: "w-3.5 h-3.5" }) }), _jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200", onClick: () => onDeleteContent?.(content.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] })) })] }), _jsxs("div", { className: "space-y-3", children: [content.content && (_jsx("p", { className: "text-sm text-gray-300 leading-relaxed line-clamp-3", children: content.content })), content.imageUrl && (_jsxs(motion.div, { className: "relative rounded-lg overflow-hidden bg-gray-800/50", whileHover: { scale: 1.02 }, transition: { duration: motionDurations.quick }, children: [_jsx("img", { src: content.imageUrl, alt: "", className: "w-full h-32 object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })] })), content.url && (_jsxs(motion.a, { href: content.url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-sm text-blue-400 hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200 group", whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsx(ExternalLink, { className: "w-4 h-4 flex-shrink-0" }), _jsx("span", { className: "truncate", children: content.url }), _jsx(ArrowRight, { className: "w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })] }))] })] }, content.id));
            }) }), canEdit && (_jsx(motion.div, { className: "mt-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, children: _jsxs("div", { className: "relative", children: [_jsxs(motion.button, { className: "w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:border-white/20 hover:text-[var(--hive-text-primary)] transition-all duration-200", onClick: () => setShowAddMenu(!showAddMenu), whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: "Pin Content" })] }), _jsx(AnimatePresence, { children: showAddMenu && (_jsx(motion.div, { className: "absolute top-full left-0 right-0 mt-2 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-10", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: motionDurations.quick }, children: _jsx("div", { className: "p-2", children: Object.entries(pinnedContentTypes).map(([type, config]) => {
                                    const Icon = config.icon;
                                    return (_jsxs(motion.button, { className: "w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", onClick: () => handleAddContent(type), whileHover: { x: 4 }, children: [_jsx(Icon, { className: cn("w-5 h-5", config.color) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: config.label }), _jsx("div", { className: "text-xs text-gray-400", children: config.description })] })] }, type));
                                }) }) })) })] }) })), isBuilder && mode === 'edit' && (_jsx(motion.div, { className: "mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, transition: { delay: 0.5 }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Crown, { className: "w-5 h-5 text-yellow-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-yellow-400 mb-1", children: "Builder Mode Active" }), _jsx("p", { className: "text-xs text-yellow-300/80", children: "Pin essential content that welcomes new members and provides quick access to important resources." })] })] }) }))] }));
;
HivePinnedSurface.displayName = "HivePinnedSurface";
export { hivePinnedSurfaceVariants, pinnedContentTypes };
//# sourceMappingURL=hive-pinned-surface.js.map