"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
/**
 * Profile Photo Carousel
 *
 * Tinder-style photo navigation with:
 * - Click zones (left/right to navigate)
 * - Interactive indicator dots
 * - Keyboard navigation (arrow keys)
 * - Full-screen expand button
 * - Smooth transitions
 *
 * Design Pattern: Modal-first IA
 * - Clicking photo opens lightbox modal (no route change)
 * - Indicators show total photos at a glance
 */
const ProfilePhotoCarousel = React.forwardRef(({ className, photos, activeIndex: controlledIndex, onPhotoChange, onOpenLightbox, profileName, ...props }, ref) => {
    const [internalIndex, setInternalIndex] = React.useState(0);
    const isControlled = controlledIndex !== undefined;
    const currentIndex = isControlled ? controlledIndex : internalIndex;
    // Update index (controlled or uncontrolled)
    const updateIndex = React.useCallback((newIndex) => {
        const validIndex = Math.max(0, Math.min(newIndex, photos.length - 1));
        if (!isControlled) {
            setInternalIndex(validIndex);
        }
        onPhotoChange?.(validIndex);
    }, [photos.length, isControlled, onPhotoChange]);
    // Navigation handlers
    const goToPrevious = React.useCallback((e) => {
        e.stopPropagation();
        updateIndex(currentIndex - 1);
    }, [currentIndex, updateIndex]);
    const goToNext = React.useCallback((e) => {
        e.stopPropagation();
        updateIndex(currentIndex + 1);
    }, [currentIndex, updateIndex]);
    const goToIndex = React.useCallback((index, e) => {
        e.stopPropagation();
        updateIndex(index);
    }, [updateIndex]);
    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                updateIndex(currentIndex - 1);
            }
            else if (e.key === 'ArrowRight') {
                updateIndex(currentIndex + 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, updateIndex]);
    // Click photo to open lightbox
    const handlePhotoClick = React.useCallback(() => {
        onOpenLightbox?.(currentIndex);
    }, [currentIndex, onOpenLightbox]);
    if (!photos || photos.length === 0) {
        return (_jsx("div", { ref: ref, className: cn("flex items-center justify-center bg-muted rounded-3xl", className), ...props, children: _jsx("p", { className: "text-muted-foreground text-sm", children: "No photos" }) }));
    }
    const hasMultiplePhotos = photos.length > 1;
    return (_jsx("div", { ref: ref, className: cn("relative group", className), ...props, children: _jsxs("div", { className: "relative overflow-hidden rounded-3xl border-4 border-border shadow-2xl cursor-pointer h-full", onClick: handlePhotoClick, children: [_jsx("img", { src: photos[currentIndex], alt: `${profileName} - Photo ${currentIndex + 1}`, className: "h-full w-full object-cover transition-opacity duration-300" }), _jsx("div", { className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx("div", { className: "bg-black/50 backdrop-blur-sm rounded-full p-2", children: _jsx(Maximize2, { className: "h-4 w-4 text-white" }) }) }), hasMultiplePhotos && (_jsxs(_Fragment, { children: [currentIndex > 0 && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity group/nav", onClick: goToPrevious, children: _jsx("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/nav:opacity-100 transition-opacity", children: _jsx(ChevronLeft, { className: "h-5 w-5 text-white" }) }) })), currentIndex < photos.length - 1 && (_jsx("div", { className: "absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity group/nav", onClick: goToNext, children: _jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/nav:opacity-100 transition-opacity", children: _jsx(ChevronRight, { className: "h-5 w-5 text-white" }) }) }))] })), hasMultiplePhotos && (_jsx("div", { className: "absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4", children: photos.map((_, index) => (_jsx("button", { onClick: (e) => goToIndex(index, e), className: cn("flex-1 max-w-[100px] h-1 rounded-full transition-all cursor-pointer", index === currentIndex
                            ? "bg-white shadow-lg"
                            : "bg-white/30 hover:bg-white/50"), "aria-label": `Go to photo ${index + 1}` }, index))) }))] }) }));
});
ProfilePhotoCarousel.displayName = "ProfilePhotoCarousel";
export { ProfilePhotoCarousel };
//# sourceMappingURL=profile-photo-carousel.js.map