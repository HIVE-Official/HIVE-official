'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Maximize2, Minimize2, X, Move } from 'lucide-react';
import { cn } from '../../../lib/utils.js';
export const BaseWidget = ({ id, title, size, position, settings, isEditing, isDragging = false, onSettingsChange, onSizeChange, onPositionChange, onRemove, children, className }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const gridSpan = {
        width: size.width === 2 ? 'col-span-2' : 'col-span-1',
        height: size.height === 2 ? 'row-span-2' : 'row-span-1'
    };
    const canResize = size.width === 1 || size.height === 1; // Can resize if not already max size
    const handleResize = () => {
        if (size.width === 1 && size.height === 1) {
            // Expand to 2x1 first
            onSizeChange({ width: 2, height: 1 });
        }
        else if (size.width === 2 && size.height === 1) {
            // Expand to 2x2
            onSizeChange({ width: 2, height: 2 });
        }
        else if (size.width === 1 && size.height === 2) {
            // Shrink back to 1x1
            onSizeChange({ width: 1, height: 1 });
        }
        else {
            // Shrink 2x2 to 1x1
            onSizeChange({ width: 1, height: 1 });
        }
    };
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, scale: 0.8 }, animate: {
            opacity: isDragging ? 0.7 : 1,
            scale: isDragging ? 1.05 : 1,
            zIndex: isDragging ? 50 : 1
        }, exit: { opacity: 0, scale: 0.8 }, transition: {
            layout: { duration: 0.3, ease: "easeInOut" },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
        }, className: cn(gridSpan.width, gridSpan.height, 'relative group', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), "data-widget-id": id, "data-widget-type": title, children: [_jsxs(Card, { className: cn('h-full overflow-hidden transition-all duration-300', 'bg-charcoal border border-steel/30', isEditing && 'ring-2 ring-gold/30', isDragging && 'shadow-2xl shadow-gold/20', 'hover:border-steel/60'), children: [_jsxs("div", { className: cn('flex items-center justify-between p-4 border-b border-hive-border-subtle/50', settings.displayOptions.showHeader ? 'block' : 'hidden'), children: [_jsxs("div", { className: "flex items-center gap-3", children: [isEditing && (_jsx("div", { className: "cursor-move p-1 rounded hover:bg-hive-surface-elevated/60 transition-colors", "data-drag-handle": true, children: _jsx(Move, { className: "h-4 w-4 text-hive-text-secondary" }) })), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary", children: settings.displayOptions.customTitle || title })] }), _jsx(AnimatePresence, { children: (isEditing || isHovered) && (_jsxs(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, className: "flex items-center gap-2", children: [canResize && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleResize, className: "h-8 w-8 p-0", children: size.width === 1 && size.height === 1 ? (_jsx(Maximize2, { className: "h-4 w-4" })) : (_jsx(Minimize2, { className: "h-4 w-4" })) })), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowSettings(!showSettings), className: "h-8 w-8 p-0", children: _jsx(Settings, { className: "h-4 w-4" }) }), isEditing && onRemove && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onRemove, className: "h-8 w-8 p-0 text-red-400 hover:text-red-300", children: _jsx(X, { className: "h-4 w-4" }) }))] })) })] }), _jsx("div", { className: cn('flex-1 overflow-hidden', settings.displayOptions.compactMode ? 'p-3' : 'p-4'), children: children }), _jsx("div", { className: "px-4 pb-4" })] }), _jsx(AnimatePresence, { children: showSettings && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "absolute right-0 top-0 w-80 z-50", children: _jsx(WidgetSettingsPanel, { settings: settings, onSettingsChange: onSettingsChange, onClose: () => setShowSettings(false) }) })) })] }));
};
const WidgetSettingsPanel = ({ settings, onSettingsChange, onClose }) => {
    const updateSetting = (path, value) => {
        const newSettings = { ...settings };
        const keys = path.split('.');
        let current = newSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        onSettingsChange(newSettings);
    };
    return (_jsxs(Card, { className: "p-6 bg-hive-surface-modal backdrop-blur-sm border border-hive-border-subtle shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary", children: "Widget Settings" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "h-8 w-8 p-0", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary mb-3", children: "Display Options" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: settings.displayOptions.showHeader, onChange: (e) => updateSetting('displayOptions.showHeader', e.target.checked), className: "w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold" }), _jsx("span", { className: "text-sm text-hive-text-secondary", children: "Show Header" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: settings.displayOptions.compactMode, onChange: (e) => updateSetting('displayOptions.compactMode', e.target.checked), className: "w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold" }), _jsx("span", { className: "text-sm text-hive-text-secondary", children: "Compact Mode" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-hive-text-secondary mb-2", children: "Custom Title" }), _jsx("input", { type: "text", value: settings.displayOptions.customTitle || '', onChange: (e) => updateSetting('displayOptions.customTitle', e.target.value), placeholder: "Enter custom title...", className: "w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary placeholder-hive-text-tertiary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-hive-text-secondary mb-2", children: "Update Frequency" }), _jsxs("select", { value: settings.displayOptions.updateFrequency, onChange: (e) => updateSetting('displayOptions.updateFrequency', e.target.value), className: "w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50", children: [_jsx("option", { value: "real-time", children: "Real-time" }), _jsx("option", { value: "hourly", children: "Hourly" }), _jsx("option", { value: "manual", children: "Manual" })] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary mb-3", children: "Privacy & Sharing" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-hive-text-secondary mb-2", children: "Widget Visibility" }), _jsxs("select", { value: settings.privacy.visibility, onChange: (e) => updateSetting('privacy.visibility', e.target.value), className: "w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50", children: [_jsx("option", { value: "private", children: "Private" }), _jsx("option", { value: "friends", children: "Friends Only" }), _jsx("option", { value: "community", children: "Community" }), _jsx("option", { value: "public", children: "Public" })] })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: settings.privacy.dataSharing, onChange: (e) => updateSetting('privacy.dataSharing', e.target.checked), className: "w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold" }), _jsx("span", { className: "text-sm text-hive-text-secondary", children: "Anonymous Analytics" })] })] })] })] }), _jsxs("div", { className: "flex gap-3 mt-6 pt-6 border-t border-hive-border-subtle", children: [_jsx(Button, { variant: "secondary", onClick: onClose, className: "flex-1", children: "Cancel" }), _jsx(Button, { onClick: onClose, className: "flex-1", children: "Save Changes" })] })] }));
};
//# sourceMappingURL=base-widget.js.map