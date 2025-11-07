'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge, Button, ToolIcon, SparklesIcon, DownloadIcon, UsersIcon, } from '../atoms';
import { FeedSpaceChip } from '../molecules/feed-space-chip';
const formatNumber = (value) => {
    if (!value || value <= 0)
        return null;
    if (value >= 1000) {
        return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
    }
    return `${value}`;
};
export const FeedCardTool = React.forwardRef(({ tool, onOpenTool, onPreview, onSpaceClick, tone = 'default', className, ...props }, ref) => {
    const { space, meta, stats, tags } = tool;
    const installsCopy = formatNumber(stats?.installs);
    const activesCopy = formatNumber(stats?.activeUsers);
    const handleOpen = () => {
        onOpenTool?.(tool.id);
    };
    const handlePreview = () => {
        onPreview?.(tool.id);
    };
    return (_jsx("article", { ref: ref, role: "article", className: cn('group relative overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--hive-border-default) 78%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] shadow-[0_24px_45px_rgba(5,7,13,0.35)] transition-shadow hover:shadow-[0_26px_52px_rgba(5,7,13,0.45)]', tone === 'featured' && 'border-[var(--hive-brand-primary)]/40 bg-[color-mix(in_srgb,var(--hive-brand-primary) 6%,var(--hive-background-secondary))]', className), ...props, children: _jsxs("div", { className: "flex flex-col gap-5 p-6", children: [_jsxs("header", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [meta?.featured && (_jsxs(Badge, { className: "flex items-center gap-1 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40", children: [_jsx(SparklesIcon, { className: "h-3.5 w-3.5" }), "Featured Tool"] })), meta?.categoryLabel && (_jsx(Badge, { variant: "outline", className: "text-[var(--hive-text-secondary)]", children: meta.categoryLabel })), meta?.lastUpdatedLabel && (_jsxs("span", { className: "text-xs uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]", children: ["Updated ", meta.lastUpdatedLabel] }))] }), _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-lg font-semibold leading-tight text-[var(--hive-text-primary)]", children: tool.title }), tool.summary && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed", children: tool.summary }))] }), _jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[var(--hive-brand-primary)]", children: _jsx(ToolIcon, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(FeedSpaceChip, { spaceId: space.id, spaceName: space.name, spaceColor: space.color, spaceIcon: space.icon, onClick: onSpaceClick
                                        ? (event) => {
                                            event.stopPropagation();
                                            onSpaceClick(space.id);
                                        }
                                        : undefined }), _jsx("span", { className: "text-xs text-[var(--hive-text-tertiary)]", children: tool.authorLabel })] })] }), tool.previewDescription && (_jsx("div", { className: "rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 text-sm leading-relaxed text-[var(--hive-text-secondary)]", children: tool.previewDescription })), tags && tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsxs("span", { className: "rounded-full border border-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]", children: ["#", tag] }, tag))) })), _jsxs("footer", { className: "flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]", children: [installsCopy && (_jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 font-medium text-white", children: [_jsx(DownloadIcon, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), installsCopy, " installs"] })), activesCopy && (_jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65", children: [_jsx(UsersIcon, { className: "h-3.5 w-3.5" }), activesCopy, " active"] })), stats?.ratingLabel && (_jsx("span", { className: "text-xs uppercase tracking-[0.16em] text-white/55", children: stats.ratingLabel }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "brand", size: "md", onClick: handleOpen, children: "Open tool" }), _jsx(Button, { variant: "secondary", size: "md", onClick: handlePreview, children: "Preview" })] })] })] }) }));
});
FeedCardTool.displayName = 'FeedCardTool';
//# sourceMappingURL=feed-card-tool.js.map