"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
export const PhotoCarousel = ({ photos, photoContexts = [], primaryPhotoIndex = 0, aspectRatio = 'portrait', showIndicators = true, showContextTags = true, enableNavigation = true, className, onPhotoChange, onPhotoClick, }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(primaryPhotoIndex);
    const [imageLoadErrors, setImageLoadErrors] = useState({});
    // Ensure we don't exceed array bounds
    const validatedPhotos = useMemo(() => {
        return photos.filter(photo => photo && photo.length > 0).slice(0, 6);
    }, [photos]);
    // Handle photo navigation
    const goToPhoto = useCallback((index) => {
        if (index >= 0 && index < validatedPhotos.length) {
            setCurrentPhotoIndex(index);
            onPhotoChange?.(index);
        }
    }, [validatedPhotos.length, onPhotoChange]);
    const goToPrevious = useCallback(() => {
        const prevIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : validatedPhotos.length - 1;
        goToPhoto(prevIndex);
    }, [currentPhotoIndex, validatedPhotos.length, goToPhoto]);
    const goToNext = useCallback(() => {
        const nextIndex = currentPhotoIndex < validatedPhotos.length - 1 ? currentPhotoIndex + 1 : 0;
        goToPhoto(nextIndex);
    }, [currentPhotoIndex, validatedPhotos.length, goToPhoto]);
    // Handle image loading errors
    const handleImageError = useCallback((photoIndex) => {
        setImageLoadErrors(prev => ({ ...prev, [photoIndex]: true }));
    }, []);
    // Handle tap navigation (left/right zones)
    const handlePhotoClick = useCallback((event) => {
        if (!enableNavigation || validatedPhotos.length <= 1) {
            onPhotoClick?.(currentPhotoIndex);
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const containerWidth = rect.width;
        // Left 30% = previous, right 30% = next, center 40% = photo click
        if (clickX < containerWidth * 0.3) {
            goToPrevious();
        }
        else if (clickX > containerWidth * 0.7) {
            goToNext();
        }
        else {
            onPhotoClick?.(currentPhotoIndex);
        }
    }, [enableNavigation, validatedPhotos.length, currentPhotoIndex, onPhotoClick, goToPrevious, goToNext]);
    // Get aspect ratio classes
    const aspectRatioClasses = {
        portrait: 'aspect-[3/4]', // 9:12 ratio for mobile portrait
        square: 'aspect-square',
        landscape: 'aspect-[4/3]'
    };
    if (!validatedPhotos.length) {
        return (_jsx("div", { className: cn("relative rounded-2xl bg-gradient-to-br from-hive-gold/20 to-purple-600/20 flex items-center justify-center", aspectRatioClasses[aspectRatio], className), children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-hive-gold/20 flex items-center justify-center mb-4 mx-auto", children: _jsx("svg", { className: "w-8 h-8 text-hive-gold", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }), _jsx("p", { className: "text-white/70 text-sm", children: "Add photos to get started" })] }) }));
    }
    const currentPhoto = validatedPhotos[currentPhotoIndex];
    const currentContext = photoContexts[currentPhotoIndex];
    const hasError = imageLoadErrors[currentPhotoIndex];
    return (_jsxs("div", { className: cn("relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg", "border border-gray-700/50 hover:border-hive-gold/30 transition-all duration-300", aspectRatioClasses[aspectRatio], className), children: [_jsxs("div", { className: "relative w-full h-full cursor-pointer group", onClick: handlePhotoClick, children: [!hasError ? (_jsx("img", { src: currentPhoto, alt: `Profile photo ${currentPhotoIndex + 1}`, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105", onError: () => handleImageError(currentPhotoIndex) })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-2 mx-auto", children: _jsx("svg", { className: "w-6 h-6 text-red-400", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) }), _jsx("p", { className: "text-gray-400 text-xs", children: "Photo unavailable" })] }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }), showContextTags && currentContext && !hasError && (_jsx("div", { className: "absolute top-3 right-3", children: _jsx("span", { className: "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-hive-gold/90 text-black backdrop-blur-sm", children: currentContext }) })), enableNavigation && validatedPhotos.length > 1 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute left-0 top-0 w-[30%] h-full bg-transparent" }), _jsx("div", { className: "absolute right-0 top-0 w-[30%] h-full bg-transparent" })] }))] }), showIndicators && validatedPhotos.length > 1 && (_jsx("div", { className: "absolute bottom-3 left-1/2 transform -translate-x-1/2", children: _jsx("div", { className: "flex items-center space-x-2", children: validatedPhotos.map((_, index) => (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            goToPhoto(index);
                        }, className: cn("w-2 h-2 rounded-full transition-all duration-200", index === currentPhotoIndex
                            ? "bg-hive-gold scale-125"
                            : "bg-white/40 hover:bg-white/60") }, index))) }) })), validatedPhotos.length > 1 && (_jsx("div", { className: "absolute top-3 left-3", children: _jsxs("span", { className: "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-sm", children: [currentPhotoIndex + 1, "/", validatedPhotos.length] }) }))] }));
};
export const PortraitCard = ({ displayName, age, graduationYear, major, showUserInfo = true, mutualConnections, mutualSpaces = [], activityStatus, isVerified, ...carouselProps }) => {
    return (_jsxs("div", { className: "relative", children: [_jsx(PhotoCarousel, { ...carouselProps, aspectRatio: "portrait", className: cn("shadow-2xl shadow-hive-gold/20", carouselProps.className) }), showUserInfo && displayName && (_jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("h3", { className: "text-xl font-semibold text-white", children: [displayName, age && `, ${age}`] }), isVerified && (_jsx("div", { className: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }) }) }))] }), major && graduationYear && (_jsxs("p", { className: "text-white/80 text-sm", children: [major, " \u2022 ", graduationYear] }))] }), activityStatus && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: cn("w-2 h-2 rounded-full", activityStatus === 'online' ? 'bg-green-400' :
                                            activityStatus === 'active_today' ? 'bg-yellow-400' :
                                                'bg-gray-400') }), _jsx("span", { className: "text-white/60 text-xs", children: activityStatus === 'online' ? 'Active now' :
                                            activityStatus === 'active_today' ? 'Active today' :
                                                'Active this week' })] }))] }), (mutualConnections !== undefined || mutualSpaces.length > 0) && (_jsxs("div", { className: "space-y-1", children: [mutualConnections !== undefined && mutualConnections > 0 && (_jsxs("p", { className: "text-white/70 text-sm", children: ["\uD83D\uDC65 ", mutualConnections, " mutual connection", mutualConnections !== 1 ? 's' : ''] })), mutualSpaces.length > 0 && (_jsxs("p", { className: "text-white/70 text-sm", children: ["\uD83D\uDCCD ", mutualSpaces.length > 1
                                        ? `${mutualSpaces.length} shared spaces`
                                        : `Both in ${mutualSpaces[0]}`] }))] }))] }))] }));
};
export default PhotoCarousel;
//# sourceMappingURL=photo-carousel.js.map