'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
export const Skeleton = ({ variant = 'rectangular', width, height, lines = 1, animate = true, className, style, ...props }) => {
    const baseClasses = [
        'bg-[var(--hive-background-tertiary)]',
        animate && 'animate-pulse',
        // Variants
        variant === 'circular' && 'rounded-full',
        variant === 'rounded' && 'rounded-lg',
        variant === 'rectangular' && 'rounded-sm',
        variant === 'text' && 'rounded-sm h-4'
    ].filter(Boolean).join(' ');
    const skeletonStyle = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style
    };
    // Multi-line text skeleton
    if (variant === 'text' && lines > 1) {
        return (_jsx("div", { className: cn('space-y-2', className), ...props, children: Array.from({ length: lines }).map((_, index) => (_jsx("div", { className: cn(baseClasses, 
                // Make last line shorter for more realistic look
                index === lines - 1 && 'w-3/4'), style: {
                    height: typeof height === 'number' ? `${height}px` : height || '1rem',
                    width: index === lines - 1 ? '75%' : (typeof width === 'number' ? `${width}px` : width)
                } }, index))) }));
    }
    // Single skeleton
    return (_jsx("div", { className: cn(baseClasses, className), style: skeletonStyle, ...props }));
};
// Predefined skeleton compositions
export const SkeletonText = ({ lines = 3, className }) => (_jsx(Skeleton, { variant: "text", lines: lines, className: className }));
export const SkeletonAvatar = ({ size = 'md', className }) => {
    const sizeMap = {
        sm: 32,
        md: 40,
        lg: 48
    };
    return (_jsx(Skeleton, { variant: "circular", width: sizeMap[size], height: sizeMap[size], className: className }));
};
export const SkeletonCard = ({ className }) => (_jsxs("div", { className: cn('space-y-4 p-4', className), children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(SkeletonAvatar, { size: "sm" }), _jsxs("div", { className: "space-y-2 flex-1", children: [_jsx(Skeleton, { variant: "text", width: "60%" }), _jsx(Skeleton, { variant: "text", width: "40%" })] })] }), _jsx(SkeletonText, { lines: 2 })] }));
//# sourceMappingURL=skeleton.js.map