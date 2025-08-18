"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE ImageBlock Element Renderer
 * Renders images within tools
 * Uses standard style system for consistent output
 */
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';
export const ImageBlockRenderer = ({ element, config, onStateChange, runtimeContext }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
        if (onStateChange) {
            onStateChange({ loaded: true, error: false });
        }
    };
    const handleImageError = () => {
        setImageLoaded(false);
        setImageError(true);
        if (onStateChange) {
            onStateChange({ loaded: false, error: true });
        }
    };
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, style: styles, children: [_jsx("div", { className: `relative overflow-hidden ${classes.element}`, children: imageError ? (_jsx("div", { className: "flex items-center justify-center bg-[var(--hive-background-secondary)] border-2 border-dashed border-[var(--hive-border)] rounded-lg p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: "w-8 h-8 text-[var(--hive-text-tertiary)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Failed to load image" }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: config.src })] }) })) : (_jsxs(_Fragment, { children: [!imageLoaded && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--hive-background-secondary)] animate-pulse", children: _jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: "w-6 h-6 text-[var(--hive-text-tertiary)] mx-auto mb-1" }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Loading..." })] }) })), _jsx("img", { src: config.src, alt: config.alt, onLoad: handleImageLoad, onError: handleImageError, className: `
                max-w-full h-auto object-cover
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300
              ` })] })) }), config.caption && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] italic", children: config.caption }))] }));
};
//# sourceMappingURL=image-block-renderer.js.map