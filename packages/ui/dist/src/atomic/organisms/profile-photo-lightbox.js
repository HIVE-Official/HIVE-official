"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { Button } from "../atoms/button";
/**
 * Profile Photo Lightbox
 *
 * Full-screen modal for viewing profile photos with:
 * - Keyboard navigation (arrow keys, escape)
 * - Swipe gestures (touch)
 * - Download and share actions
 * - Smooth transitions
 * - Dark overlay
 *
 * Design Pattern: Modal-first IA
 * - Opens from ProfilePhotoCarousel
 * - Preserves navigation context
 * - Smooth enter/exit transitions
 */
const ProfilePhotoLightbox = React.forwardRef(({ className, photos, initialIndex = 0, isOpen, onClose, profileName, onDownload, onShare, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Update index when initialIndex changes
    React.useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);
    // Navigation handlers
    const goToPrevious = React.useCallback(() => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => prev - 1);
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [currentIndex, isAnimating]);
    const goToNext = React.useCallback(() => {
        if (currentIndex < photos.length - 1 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => prev + 1);
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [currentIndex, photos.length, isAnimating]);
    // Keyboard navigation
    React.useEffect(() => {
        if (!isOpen)
            return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
            else if (e.key === 'ArrowLeft') {
                goToPrevious();
            }
            else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, goToPrevious, goToNext]);
    // Touch swipe handling
    const touchStartX = React.useRef(0);
    const touchEndX = React.useRef(0);
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;
        if (swipeDistance > minSwipeDistance) {
            goToNext();
        }
        else if (swipeDistance < -minSwipeDistance) {
            goToPrevious();
        }
    };
    // Prevent body scroll when open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    // Download handler
    const handleDownload = React.useCallback(() => {
        const photoUrl = photos[currentIndex];
        if (onDownload) {
            onDownload(photoUrl);
        }
        else {
            // Default download behavior
            const link = document.createElement('a');
            link.href = photoUrl;
            link.download = `${profileName}-photo-${currentIndex + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [photos, currentIndex, onDownload, profileName]);
    // Share handler
    const handleShare = React.useCallback(() => {
        const photoUrl = photos[currentIndex];
        if (onShare) {
            onShare(photoUrl);
        }
        else {
            // Fallback to Web Share API
            if (navigator.share) {
                navigator.share({
                    title: `${profileName}'s Photo`,
                    text: `Check out this photo from ${profileName} on HIVE`,
                    url: photoUrl,
                }).catch(() => {
                    // User cancelled or share failed
                });
            }
            else {
                // Copy to clipboard fallback
                navigator.clipboard.writeText(photoUrl);
            }
        }
    }, [photos, currentIndex, onShare, profileName]);
    if (!isOpen)
        return null;
    return (_jsxs("div", { ref: ref, className: cn("fixed inset-0 z-50 bg-black/95 backdrop-blur-sm", "animate-in fade-in duration-300", className), onClick: onClose, ...props, children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, className: "absolute top-4 right-4 z-50 text-white hover:bg-white/20", children: _jsx(X, { className: "h-6 w-6" }) }), _jsx("div", { className: "absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full", children: _jsxs("p", { className: "text-white text-sm font-medium", children: [currentIndex + 1, " / ", photos.length] }) }), _jsxs("div", { className: "absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2", children: [onDownload !== undefined && (_jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                            e.stopPropagation();
                            handleDownload();
                        }, className: "text-white hover:bg-white/20", children: _jsx(Download, { className: "h-5 w-5" }) })), _jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                            e.stopPropagation();
                            handleShare();
                        }, className: "text-white hover:bg-white/20", children: _jsx(Share2, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "h-full w-full flex items-center justify-center p-8", onClick: (e) => e.stopPropagation(), onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [currentIndex > 0 && (_jsx(Button, { variant: "ghost", size: "icon", onClick: goToPrevious, className: "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12", children: _jsx(ChevronLeft, { className: "h-8 w-8" }) })), _jsx("img", { src: photos[currentIndex], alt: `${profileName} - Photo ${currentIndex + 1}`, className: cn("max-h-full max-w-full object-contain rounded-xl shadow-2xl", "transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100") }), currentIndex < photos.length - 1 && (_jsx(Button, { variant: "ghost", size: "icon", onClick: goToNext, className: "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12", children: _jsx(ChevronRight, { className: "h-8 w-8" }) }))] }), _jsx("div", { className: "absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4", children: photos.map((_, index) => (_jsx("button", { onClick: (e) => {
                        e.stopPropagation();
                        if (!isAnimating) {
                            setIsAnimating(true);
                            setCurrentIndex(index);
                            setTimeout(() => setIsAnimating(false), 300);
                        }
                    }, className: cn("h-2 rounded-full transition-all cursor-pointer", index === currentIndex
                        ? "bg-white w-8"
                        : "bg-white/30 hover:bg-white/50 w-2"), "aria-label": `Go to photo ${index + 1}` }, index))) })] }));
});
ProfilePhotoLightbox.displayName = "ProfilePhotoLightbox";
export { ProfilePhotoLightbox };
//# sourceMappingURL=profile-photo-lightbox.js.map