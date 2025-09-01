'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    photo: 'aspect-[4/3]',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]'
};
const objectFits = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down'
};
const roundedVariants = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
};
export const Image = React.forwardRef(({ src, alt, fallback, aspectRatio, fit = 'cover', loading = 'lazy', placeholder = 'skeleton', sizes, priority = false, rounded = 'md', bordered = false, grayscale = false, blur = false, className, style, onError, onLoad, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(src);
    // Reset states when src changes
    React.useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        setImageSrc(src);
    }, [src]);
    const handleLoad = (event) => {
        setIsLoading(false);
        onLoad?.(event);
    };
    const handleError = (event) => {
        setIsLoading(false);
        setHasError(true);
        onError?.(event);
    };
    const containerClasses = [
        'relative overflow-hidden',
        'bg-[var(--hive-background-tertiary)]',
        // Aspect ratio
        typeof aspectRatio === 'string' ? aspectRatios[aspectRatio] : '',
        // Rounded corners
        roundedVariants[rounded],
        // Border
        bordered && 'border border-[var(--hive-border-primary)]',
        // Custom aspect ratio
        typeof aspectRatio === 'number' && 'relative'
    ].filter(Boolean).join(' ');
    const imageClasses = [
        'w-full h-full',
        'transition-all duration-300 ease-out',
        // Object fit
        objectFits[fit],
        // Visual effects
        grayscale && 'grayscale',
        blur && 'blur-sm',
        // Loading state
        isLoading && placeholder !== 'none' && 'opacity-0',
        !isLoading && !hasError && 'opacity-100'
    ].filter(Boolean).join(' ');
    const customStyle = React.useMemo(() => {
        const computedStyle = { ...style };
        if (typeof aspectRatio === 'number') {
            computedStyle.aspectRatio = aspectRatio.toString();
        }
        return computedStyle;
    }, [style, aspectRatio]);
    // Show fallback if error and fallback provided
    if (hasError && fallback) {
        return (_jsx("div", { className: cn(containerClasses, className), style: customStyle, children: typeof fallback === 'string' ? (_jsx("div", { className: "flex items-center justify-center h-full text-[var(--hive-text-secondary)] text-sm", children: fallback })) : (fallback) }));
    }
    return (_jsxs("div", { className: cn(containerClasses, className), style: customStyle, children: [isLoading && placeholder === 'skeleton' && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse" })), isLoading && placeholder === 'blur' && (_jsx("div", { className: "absolute inset-0 bg-[var(--hive-background-tertiary)] blur-sm" })), !hasError && (_jsx("img", { ref: ref, src: imageSrc, alt: alt, loading: priority ? 'eager' : loading, sizes: sizes, className: imageClasses, onLoad: handleLoad, onError: handleError, ...props })), hasError && !fallback && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--hive-background-tertiary)]", children: _jsxs("div", { className: "text-center text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50" }), _jsx("p", { className: "text-xs", children: "Failed to load image" })] }) }))] }));
});
Image.displayName = 'Image';
// Convenient preset components
// Avatar is now provided by the dedicated avatar.tsx component
// This maintains the Image component focused on its core responsibility
export const ProfileImage = React.forwardRef((props, ref) => (_jsx(Image, { ref: ref, aspectRatio: "square", rounded: "full", fit: "cover", ...props })));
ProfileImage.displayName = 'ProfileImage';
export const ThumbnailImage = React.forwardRef((props, ref) => (_jsx(Image, { ref: ref, aspectRatio: "square", fit: "cover", rounded: "md", ...props })));
ThumbnailImage.displayName = 'ThumbnailImage';
export const HeroImage = React.forwardRef((props, ref) => (_jsx(Image, { ref: ref, aspectRatio: "video", fit: "cover", priority: true, ...props })));
HeroImage.displayName = 'HeroImage';
//# sourceMappingURL=image.js.map