'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const MediaViewerRoot = DialogPrimitive.Root;
const MediaViewerTrigger = DialogPrimitive.Trigger;
const MediaViewerClose = DialogPrimitive.Close;
const MediaViewerPortal = DialogPrimitive.Portal;
const MediaViewerOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(DialogPrimitive.Overlay, { ref: ref, className: cn('fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(0,0,0,0.92)) 95%,transparent)] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out motion-reduce:animate-none', className), ...props })));
MediaViewerOverlay.displayName = DialogPrimitive.Overlay.displayName;
const MediaViewerContent = React.forwardRef(({ className, children, withChrome = true, showCloseButton = true, ...props }, ref) => (_jsxs(MediaViewerPortal, { children: [_jsx(MediaViewerOverlay, {}), _jsxs(DialogPrimitive.Content, { ref: ref, className: cn('fixed inset-0 z-50 flex flex-col items-stretch justify-center p-4 text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]', className), ...props, children: [withChrome && showCloseButton ? (_jsx(MediaViewerClose, { asChild: true, children: _jsxs("button", { className: "absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,rgba(20,22,27,0.7) 100%,transparent)] text-white/90 transition hover:bg-[color-mix(in_srgb,rgba(20,22,27,0.9) 100%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", children: [_jsx("span", { className: "sr-only", children: "Close media viewer" }), _jsx(X, { className: "h-5 w-5", strokeWidth: 1.5, "aria-hidden": true })] }) })) : null, children] })] })));
MediaViewerContent.displayName = DialogPrimitive.Content.displayName;
const MediaViewerViewport = ({ className, ...props }) => (_jsx("div", { className: cn('mx-auto flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden rounded-3xl bg-[color-mix(in_srgb,rgba(12,14,17,0.85) 100%,transparent)] shadow-[0_32px_90px_rgba(0,0,0,0.55)]', className), ...props }));
MediaViewerViewport.displayName = 'MediaViewerViewport';
const MediaViewerCaption = ({ className, ...props }) => (_jsx("div", { className: cn('mx-auto mt-4 max-w-3xl text-center text-sm text-white/75', className), ...props }));
MediaViewerCaption.displayName = 'MediaViewerCaption';
const clampIndex = (i, max, loop) => {
    if (loop) {
        const mod = max + 1;
        return ((i % mod) + mod) % mod;
    }
    return Math.min(Math.max(i, 0), max);
};
const MediaViewerCarousel = ({ items, index = 0, onIndexChange, enableLoop = true, showChrome = true }) => {
    const isControlled = typeof onIndexChange === 'function';
    const [internalIndex, setInternalIndex] = React.useState(index);
    React.useEffect(() => {
        if (isControlled)
            return;
        setInternalIndex(index);
    }, [index, isControlled]);
    const currentIndex = isControlled ? index : internalIndex;
    const lastIndex = items.length - 1;
    const item = items[currentIndex];
    const goTo = React.useCallback((next) => {
        const target = clampIndex(next, lastIndex, enableLoop);
        if (!enableLoop && target === currentIndex)
            return;
        if (isControlled) {
            onIndexChange?.(target);
        }
        else {
            setInternalIndex(target);
        }
    }, [currentIndex, enableLoop, isControlled, lastIndex, onIndexChange]);
    React.useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goTo(currentIndex + 1);
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goTo(currentIndex - 1);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentIndex, goTo]);
    if (!item)
        return null;
    return (_jsxs("div", { className: "relative flex flex-1 flex-col items-center justify-center", children: [showChrome && items.length > 1 ? (_jsxs(_Fragment, { children: [_jsxs("button", { type: "button", onClick: () => goTo(currentIndex - 1), className: "group absolute left-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", children: [_jsx("span", { className: "sr-only", children: "Previous media" }), _jsx(ChevronLeft, { className: "h-5 w-5", strokeWidth: 1.75 })] }), _jsxs("button", { type: "button", onClick: () => goTo(currentIndex + 1), className: "group absolute right-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", children: [_jsx("span", { className: "sr-only", children: "Next media" }), _jsx(ChevronRight, { className: "h-5 w-5", strokeWidth: 1.75 })] })] })) : null, _jsx(MediaViewerViewport, { children: item.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                _jsx("img", { src: item.src, alt: item.alt ?? '', className: "max-h-[80vh] w-full max-w-full object-contain" })) : (_jsx("video", { src: item.src, controls: true, autoPlay: item.autoPlay, className: "max-h-[80vh] w-full max-w-full rounded-3xl" })) }), item.caption ? (_jsx(MediaViewerCaption, { children: item.caption })) : null, showChrome && items.length > 1 ? (_jsx("div", { className: "mt-4 flex items-center gap-1", children: items.map((entry, idx) => (_jsx("button", { type: "button", onClick: () => goTo(idx), className: cn('h-1.5 w-7 rounded-full transition', idx === currentIndex
                        ? 'bg-white/90'
                        : 'bg-white/30 hover:bg-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]'), "aria-label": `Go to media ${idx + 1}` }, entry.id))) })) : null] }));
};
export { MediaViewerRoot as MediaViewer, MediaViewerTrigger, MediaViewerClose, MediaViewerPortal, MediaViewerOverlay, MediaViewerContent, MediaViewerViewport, MediaViewerCaption, MediaViewerCarousel };
//# sourceMappingURL=media-viewer.js.map