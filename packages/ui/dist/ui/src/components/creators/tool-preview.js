// HIVE Tool Preview - Atomic Design: Template
// Real-time tool preview with responsive testing
"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { X, Monitor, Tablet, Smartphone, RotateCcw, RefreshCw, ExternalLink, Share2, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
// Device viewport configurations
const DEVICE_VIEWPORTS = {
    desktop: {
        width: 1200,
        height: 800,
        name: 'Desktop',
        icon: Monitor
    },
    tablet: {
        width: 768,
        height: 1024,
        name: 'Tablet',
        icon: Tablet
    },
    mobile: {
        width: 375,
        height: 667,
        name: 'Mobile',
        icon: Smartphone
    }
};
const ElementRenderer = ({ instance, element, isPreview = true }) => {
    if (!element) {
        return (_jsxs("div", { className: "w-full h-12 bg-red-100 border border-red-300 rounded flex items-center justify-center text-red-600 text-sm", children: ["Element not found: ", instance.elementId] }));
    }
    const IconComponent = element.icon;
    // Render based on element type - simplified for preview
    const renderElementContent = () => {
        switch (element.id) {
            case 'text':
                return (_jsx("div", { className: "text-[var(--hive-text-primary)]", style: {
                        fontSize: instance.config.fontSize || '16px',
                        color: instance.config.color || 'var(--hive-text-primary)',
                        fontWeight: instance.config.fontWeight || 'normal',
                        textAlign: instance.config.textAlign || 'left'
                    }, children: instance.config.content || 'Sample text' }));
            case 'button':
                return (_jsx(HiveButton, { variant: instance.config.variant || 'default', size: instance.config.size || 'default', disabled: instance.config.disabled || false, className: "w-full", children: instance.config.label || 'Button' }));
            case 'input':
                return (_jsxs("div", { className: "space-y-1", children: [instance.config.label && (_jsxs("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [instance.config.label, instance.config.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsx("input", { type: instance.config.type || 'text', placeholder: instance.config.placeholder || 'Enter text...', disabled: instance.config.disabled || false, className: "w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] focus:ring-2 focus:ring-[var(--hive-color-gold-primary)] focus:border-transparent" })] }));
            case 'image':
                return (_jsx("div", { className: "bg-[var(--hive-background-secondary)] border-2 border-dashed border-[var(--hive-border-default)] rounded-lg flex items-center justify-center", style: {
                        width: instance.config.width || '200px',
                        height: instance.config.height || '150px',
                        borderRadius: instance.config.borderRadius || '0px'
                    }, children: instance.config.src ? (_jsx("img", { src: instance.config.src, alt: instance.config.alt || 'Image', className: "max-w-full max-h-full object-contain rounded" })) : (_jsxs("div", { className: "text-center text-[var(--hive-text-tertiary)]", children: [_jsx(IconComponent, { size: 24, className: "mx-auto mb-2" }), _jsx("span", { className: "text-xs", children: "No image selected" })] })) }));
            case 'container':
                return (_jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg", style: {
                        backgroundColor: instance.config.backgroundColor || 'transparent',
                        borderRadius: instance.config.borderRadius || '0px',
                        border: instance.config.border || '1px solid var(--hive-border-default)',
                        padding: instance.config.padding || '16px'
                    }, children: [instance.config.title && (_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: instance.config.title })), _jsx("div", { className: "min-h-[60px] bg-[var(--hive-background-secondary)] rounded border-2 border-dashed border-[var(--hive-border-default)] flex items-center justify-center text-[var(--hive-text-tertiary)] text-sm", children: "Container content area" })] }));
            case 'poll':
                return (_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: instance.config.question || 'What do you think?' }), _jsx("div", { className: "space-y-2", children: (instance.config.options || ['Option 1', 'Option 2']).map((option, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: instance.config.allowMultiple ? 'checkbox' : 'radio', name: `poll-${instance.id}`, id: `poll-${instance.id}-${index}`, className: "w-4 h-4" }), _jsx("label", { htmlFor: `poll-${instance.id}-${index}`, className: "text-sm text-[var(--hive-text-primary)] cursor-pointer", children: option })] }, index))) }), instance.config.showResults && (_jsx("div", { className: "text-xs text-[var(--hive-text-secondary)] pt-2 border-t border-[var(--hive-border-default)]", children: "Results will appear here after voting" }))] }));
            case 'calendar':
                return (_jsx("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "text-center", children: [_jsx(IconComponent, { size: 32, className: "mx-auto mb-2 text-[var(--hive-text-secondary)]" }), _jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Calendar Widget" }), _jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: "Interactive calendar will render here" })] }) }));
            case 'chart':
                return (_jsx("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "text-center", children: [_jsx(IconComponent, { size: 32, className: "mx-auto mb-2 text-[var(--hive-text-secondary)]" }), _jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: instance.config.title || 'Chart' }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: [instance.config.type || 'bar', " chart will render here"] })] }) }));
            default:
                return (_jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)] text-center", children: [_jsx(IconComponent, { size: 24, className: "mx-auto mb-2 text-[var(--hive-text-secondary)]" }), _jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: element.name }), _jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: element.description })] }));
        }
    };
    return (_jsx("div", { className: cn("transition-all duration-200", !instance.isVisible && "opacity-50"), style: {
            position: 'absolute',
            left: instance.position.x,
            top: instance.position.y,
            width: instance.size.width === 'auto' ? 'auto' : instance.size.width,
            height: instance.size.height === 'auto' ? 'auto' : instance.size.height,
            zIndex: instance.zIndex,
            padding: instance.style.padding ?
                `${instance.style.padding.top}px ${instance.style.padding.right}px ${instance.style.padding.bottom}px ${instance.style.padding.left}px` :
                undefined,
            margin: instance.style.margin ?
                `${instance.style.margin.top}px ${instance.style.margin.right}px ${instance.style.margin.bottom}px ${instance.style.margin.left}px` :
                undefined,
            backgroundColor: instance.style.backgroundColor,
            borderRadius: instance.style.borderRadius,
            opacity: instance.style.opacity,
            transform: instance.style.transform,
            boxShadow: instance.style.boxShadow
        }, children: renderElementContent() }));
};
// Main Tool Preview component
export const ToolPreview = ({ tool, mode = 'desktop', onClose }) => {
    const [currentMode, setCurrentMode] = useState(mode);
    const [isRotated, setIsRotated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const viewport = DEVICE_VIEWPORTS[currentMode];
    const actualWidth = isRotated && currentMode !== 'desktop' ? viewport.height : viewport.width;
    const actualHeight = isRotated && currentMode !== 'desktop' ? viewport.width : viewport.height;
    // Handle refresh
    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };
    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
            else if (e.key === 'r' && e.metaKey) {
                e.preventDefault();
                handleRefresh();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    return (_jsx(HiveMotionWrapper, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full h-full max-w-7xl max-h-[90vh] bg-[var(--hive-background-primary)] rounded-xl border border-[var(--hive-border-default)] shadow-2xl flex flex-col", children: [_jsx("div", { className: "p-4 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] rounded-t-xl", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-color-gold-primary)] rounded-lg flex items-center justify-center", children: _jsx(Play, { size: 16, className: "text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: [tool.name, " - Preview"] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: [tool.elements.length, " elements \u2022 ", currentMode, " view"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex gap-1 p-1 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-default)]", children: Object.entries(DEVICE_VIEWPORTS).map(([key, device]) => {
                                                const IconComponent = device.icon;
                                                return (_jsxs(HiveButton, { variant: currentMode === key ? 'primary' : 'ghost', size: "sm", onClick: () => {
                                                        setCurrentMode(key);
                                                        setIsRotated(false);
                                                    }, className: "px-3", children: [_jsx(IconComponent, { size: 16 }), _jsx("span", { className: "hidden sm:inline ml-1", children: device.name })] }, key));
                                            }) }), currentMode !== 'desktop' && (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => setIsRotated(!isRotated), children: _jsx(RotateCcw, { size: 16 }) })), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: isLoading, children: _jsx(RefreshCw, { size: 16, className: cn(isLoading && "animate-spin") }) }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: onClose, children: _jsx(X, { size: 16 }) })] })] }) }), _jsx("div", { className: "flex-1 flex items-center justify-center p-8 bg-[var(--hive-background-tertiary)]", children: _jsxs("div", { className: "relative", children: [_jsxs("div", { className: cn("bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] shadow-xl transition-all duration-300", currentMode === 'desktop' ? "rounded-lg" : "rounded-2xl", currentMode === 'mobile' && "border-8 border-gray-800"), style: {
                                        width: actualWidth,
                                        height: actualHeight,
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }, children: [currentMode === 'mobile' && !isRotated && (_jsx("div", { className: "h-6 bg-gray-800 rounded-t-xl flex items-center justify-center", children: _jsx("div", { className: "w-16 h-1 bg-gray-600 rounded-full" }) })), _jsxs("div", { className: "relative w-full h-full overflow-auto bg-[var(--hive-background-primary)] rounded-lg", style: {
                                                height: currentMode === 'mobile' && !isRotated ? 'calc(100% - 24px)' : '100%'
                                            }, children: [isLoading && (_jsx("div", { className: "absolute inset-0 bg-white/80 flex items-center justify-center z-50", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-color-gold-primary)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Loading preview..." })] }) })), tool.elements.length > 0 ? (tool.elements.map((instance) => (_jsx(ElementRenderer, { instance: instance, isPreview: true }, instance.id)))) : (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx(Play, { size: 24, className: "text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Empty Tool" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Add elements to see them in preview" })] }) }))] })] }), _jsx("div", { className: "absolute -bottom-8 left-0 right-0 text-center", children: _jsxs(HiveBadge, { variant: "tool-tag", className: "text-xs", children: [actualWidth, " \u00D7 ", actualHeight, "px", isRotated && " (rotated)"] }) })] }) }), _jsx("div", { className: "p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] rounded-b-xl", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Preview Mode \u2022 Press ", _jsx("kbd", { className: "px-1.5 py-0.5 bg-[var(--hive-background-tertiary)] rounded text-xs", children: "ESC" }), " to close"] }) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(Share2, { size: 16 }), "Share Preview"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(ExternalLink, { size: 16 }), "Open in New Tab"] })] })] }) })] }) }) }));
};
export default ToolPreview;
//# sourceMappingURL=tool-preview.js.map