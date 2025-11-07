'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FeedMediaPreview - Media grid for post attachments
 *
 * Features:
 * - 1-4 image/video grid layouts
 * - Lightbox on click (using MediaViewer)
 * - Lazy loading for performance
 * - Responsive aspect ratios
 * - Video play overlay
 *
 * Usage:
 * ```tsx
 * import { FeedMediaPreview } from '@hive/ui';
 *
 * <FeedMediaPreview
 *   media={[
 *     { type: 'image', url: 'https://...', alt: 'Photo 1' },
 *     { type: 'video', url: 'https://...', thumbnail: 'https://...' }
 *   ]}
 * />
 * ```
 */
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { MediaViewer, MediaViewerContent, MediaViewerViewport, MediaViewerClose, } from '../atoms/media-viewer.js';
import { PlayIcon } from '../atoms/icon-library.js';
export const FeedMediaPreview = React.forwardRef(({ media, className, rounded = true }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    if (!media || media.length === 0) {
        return null;
    }
    const count = Math.min(media.length, 4); // Max 4 items
    // Grid layout classes based on count
    const getGridClasses = () => {
        switch (count) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-2'; // 2 cols with 3rd item spanning
            case 4:
                return 'grid-cols-2';
            default:
                return 'grid-cols-1';
        }
    };
    // Item-specific classes
    const getItemClasses = (index) => {
        if (count === 3 && index === 2) {
            return 'col-span-2'; // Third item spans full width
        }
        return '';
    };
    const handleMediaClick = (index) => {
        setSelectedIndex(index);
        setLightboxOpen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: ref, className: cn('grid gap-1', getGridClasses(), className), children: media.slice(0, 4).map((item, index) => (_jsxs("button", { type: "button", onClick: () => handleMediaClick(index), className: cn('group relative aspect-[4/3] overflow-hidden bg-[var(--hive-background-secondary)] transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]', rounded && 'rounded-xl', getItemClasses(index), count === 1 && 'aspect-[16/9]'), children: [item.type === 'image' && (_jsx("img", { src: item.url, alt: item.alt || `Image ${index + 1}`, loading: "lazy", className: "h-full w-full object-cover" })), item.type === 'video' && (_jsxs(_Fragment, { children: [_jsx("img", { src: item.thumbnail || item.url, alt: item.alt || `Video ${index + 1}`, loading: "lazy", className: "h-full w-full object-cover" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40", children: _jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110", children: _jsx(PlayIcon, { className: "h-8 w-8 text-black" }) }) })] })), index === 3 && media.length > 4 && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: _jsxs("span", { className: "text-3xl font-bold text-white", children: ["+", media.length - 4] }) }))] }, index))) }), _jsx(MediaViewer, { open: lightboxOpen, onOpenChange: setLightboxOpen, children: _jsxs(MediaViewerContent, { children: [_jsxs(MediaViewerViewport, { children: [media[selectedIndex]?.type === 'image' && (_jsx("img", { src: media[selectedIndex].url, alt: media[selectedIndex].alt || `Image ${selectedIndex + 1}`, className: "max-h-[90vh] max-w-full object-contain" })), media[selectedIndex]?.type === 'video' && (_jsx("video", { src: media[selectedIndex].url, controls: true, autoPlay: true, className: "max-h-[90vh] max-w-full" }))] }), _jsx(MediaViewerClose, {})] }) })] }));
});
FeedMediaPreview.displayName = 'FeedMediaPreview';
//# sourceMappingURL=feed-media-preview.js.map