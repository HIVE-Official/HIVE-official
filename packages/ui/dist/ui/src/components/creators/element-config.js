// HIVE Element Configuration - Atomic Design: Organism
// Dynamic property editing for tool elements
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { Settings, Palette, Layout, Type, Eye, EyeOff, Lock, Unlock, Copy, Trash2, ChevronDown, ChevronRight, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveSelect } from '../hive-select';
const PropertyInput = ({ property, value, onChange, propertyKey }) => {
    switch (property.type) {
        case 'string':
            if (property.options) {
                // Dropdown for predefined options
                return (_jsx(HiveSelect, { options: property.options.map(map) }));
            }
            value = { value } || property.default;
    }
    onValueChange = { onChange };
    placeholder = "Select option..."
        >
            { property, : .options.map((option) => (_jsx("option", { value: option, children: option }, option))) };
};
HiveSelect >
;
// Text input or textarea for long strings
if (propertyKey.toLowerCase().includes('description') ||
    propertyKey.toLowerCase().includes('content') ||
    (typeof value === 'string' && value.length > 50)) {
    return (_jsx(HiveTextarea, { value: value || property.default || '', onChange: (e) => onChange(e.target.value), placeholder: `Enter ${property.type}...`, rows: 3 }));
}
return (_jsx(HiveInput, { type: "text", value: value || property.default || '', onChange: (e) => onChange(e.target.value), placeholder: `Enter ${property.type}...` }));
'number';
return (_jsx(HiveInput, { type: "number", value: value || property.default || 0, onChange: (e) => onChange(Number(e.target.value)), min: property.min, max: property.max, placeholder: `Enter ${property.type}...` }));
'boolean';
return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveSwitch, { checked: value !== undefined ? value : property.default, onCheckedChange: onChange }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: value !== undefined ? value : property.default ? 'Enabled' : 'Disabled' })] }));
'array';
return (_jsxs("div", { className: "space-y-2", children: [_jsx(HiveTextarea, { value: Array.isArray(value) ? value.join('\n') : '', onChange: (e) => {
                const items = e.target.value.split('\n').filter(item => item.trim());
                onChange(items);
            }, placeholder: "Enter items, one per line...", rows: 4 }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: [Array.isArray(value) ? value.length : 0, " items"] })] }));
return (_jsx(HiveInput, { type: "text", value: JSON.stringify(value) || JSON.stringify(property.default) || '', onChange: (e) => {
        try {
            onChange(JSON.parse(e.target.value));
        }
        catch {
            onChange(e.target.value);
        }
    }, placeholder: `Enter ${property.type}...` }));
;
const PropertySection = ({ title, icon: Icon, children, defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    return (_jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg overflow-hidden", children: [_jsxs("button", { className: "w-full p-3 bg-[var(--hive-background-tertiary)] hover:bg-[var(--hive-interactive-hover)] transition-colors flex items-center justify-between", onClick: () => setIsExpanded(!isExpanded), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { size: 16, className: "text-[var(--hive-text-secondary)]" }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: title })] }), isExpanded ? (_jsx(ChevronDown, { size: 16, className: "text-[var(--hive-text-secondary)]" })) : (_jsx(ChevronRight, { size: 16, className: "text-[var(--hive-text-secondary)]" }))] }), isExpanded && (_jsx("div", { className: "p-4 space-y-4", children: children }))] }));
};
// Main Element Configuration component
export const ElementConfig = ({ element, instance, onChange }) => {
    const [activeTab, setActiveTab] = useState('properties');
    // Handle property changes
    const handlePropertyChange = useCallback((key, value) => {
        const newConfig = { ...instance.config, [key]: value };
        onChange(newConfig);
    }, [instance.config, onChange]);
    // Handle style changes
    const handleStyleChange = useCallback((key, value) => {
        // This would be handled by parent component
        console.log('Style change:', key, value);
    }, []);
    const IconComponent = element.icon;
    return (_jsxs("div", { className: "flex flex-col h-full bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0", style: { backgroundColor: `${element.color}15`, color: element.color }, children: _jsx(IconComponent, { size: 20 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)] truncate", children: element.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: element.description }), _jsxs("div", { className: "flex gap-1 mt-2", children: [_jsx(HiveBadge, { variant: "tool-tag", className: "text-xs", children: element.category }), _jsxs(HiveBadge, { variant: "tool-tag", className: "text-xs", children: ["v", element.version] })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: () => { }, className: "flex-1", children: [instance.isVisible ? _jsx(Eye, { size: 16 }) : _jsx(EyeOff, { size: 16 }), instance.isVisible ? 'Visible' : 'Hidden'] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: () => { }, className: "flex-1", children: [instance.isLocked ? _jsx(Lock, { size: 16 }) : _jsx(Unlock, { size: 16 }), instance.isLocked ? 'Locked' : 'Unlocked'] })] })] }), _jsx("div", { className: "border-b border-[var(--hive-border-default)]", children: _jsxs("div", { className: "flex", children: [[
                            { id: 'properties', label: 'Properties', icon: Settings },
                            { id: 'style', label: 'Style', icon: Palette },
                            { id: 'events', label: 'Events', icon: Hash }
                        ].map(map), ") => (", _jsxs("button", { className: cn("flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2", activeTab === id
                                ? "border-[var(--hive-color-gold-primary)] text-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                                : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"), onClick: () => setActiveTab(id), children: [_jsx(Icon, { size: 16 }), label] }, id), "))}"] }) }), _jsxs("div", { className: "flex-1 overflow-auto", children: [activeTab === 'properties' && (_jsxs("div", { className: "p-4 space-y-4", children: [_jsx(PropertySection, { title: "Basic Settings", icon: Settings, children: _jsx("div", { className: "space-y-3", children: _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Element Name" }), _jsx(HiveInput, { value: instance.name || element.name, onChange: (e) => { }, placeholder: "Enter element name..." })] }) }) }), Object.keys(element.schema.config).length > 0 && (_jsx(PropertySection, { title: "Element Properties", icon: Type, children: _jsx("div", { className: "space-y-4", children: Object.entries(element.schema.config).map(([key, property]) => (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: [key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'), property.required && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsx(PropertyInput, { property: property, value: instance.config[key], onChange: (value) => handlePropertyChange(key, value), propertyKey: key }), property.validation && (_jsxs("div", { className: "mt-1 text-xs text-[var(--hive-text-tertiary)]", children: [property.validation.min && `Min: ${property.validation.min}`, property.validation.max && ` Max: ${property.validation.max}`] }))] }, key))) }) })), _jsx(PropertySection, { title: "Layout & Position", icon: Layout, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "X Position" }), _jsx(HiveInput, { type: "number", value: instance.position.x, onChange: (e) => { } })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Y Position" }), _jsx(HiveInput, { type: "number", value: instance.position.y, onChange: (e) => { } })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Width" }), _jsx(HiveInput, { value: instance.size.width, onChange: (e) => { }, placeholder: "auto, 100px, 50%" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Height" }), _jsx(HiveInput, { value: instance.size.height, onChange: (e) => { }, placeholder: "auto, 100px, 50%" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Z-Index" }), _jsx(HiveInput, { type: "number", value: instance.zIndex, onChange: (e) => { }, min: 0 })] })] }) })] })), activeTab === 'style' && (_jsxs("div", { className: "p-4 space-y-4", children: [_jsx(PropertySection, { title: "Appearance", icon: Palette, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Background Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveInput, { type: "color", value: instance.style.backgroundColor || 'transparent', onChange: (e) => handleStyleChange('backgroundColor', e.target.value), className: "w-16" }), _jsx(HiveInput, { value: instance.style.backgroundColor || 'transparent', onChange: (e) => handleStyleChange('backgroundColor', e.target.value), placeholder: "transparent, #ff0000, rgb(255,0,0)", className: "flex-1" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Border Radius" }), _jsx(HiveInput, { type: "number", value: instance.style.borderRadius || 0, onChange: (e) => handleStyleChange('borderRadius', Number(e.target.value)), min: 0, placeholder: "0" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Opacity" }), _jsx(HiveInput, { type: "range", min: 0, max: 1, step: 0.1, value: instance.style.opacity || 1, onChange: (e) => handleStyleChange('opacity', Number(e.target.value)) }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: [Math.round((instance.style.opacity || 1) * 100), "%"] })] })] }) }), _jsx(PropertySection, { title: "Spacing", icon: Layout, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Padding" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(HiveInput, { type: "number", placeholder: "Top", value: instance.style.padding?.top || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Right", value: instance.style.padding?.right || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Bottom", value: instance.style.padding?.bottom || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Left", value: instance.style.padding?.left || 0, onChange: (e) => { } })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Margin" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(HiveInput, { type: "number", placeholder: "Top", value: instance.style.margin?.top || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Right", value: instance.style.margin?.right || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Bottom", value: instance.style.margin?.bottom || 0, onChange: (e) => { } }), _jsx(HiveInput, { type: "number", placeholder: "Left", value: instance.style.margin?.left || 0, onChange: (e) => { } })] })] })] }) })] })), activeTab === 'events' && (_jsx("div", { className: "p-4 space-y-4", children: _jsx(PropertySection, { title: "Available Events", icon: Hash, children: _jsx("div", { className: "space-y-3", children: element.schema.events.length > 0 ? (element.schema.events.map((event) => (_jsxs("div", { className: "flex items-center justify-between p-3 border border-[var(--hive-border-default)] rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: event }), _jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Trigger action when ", event.replace('on', '').toLowerCase(), " occurs"] })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Add Action" })] }, event)))) : (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: [_jsx(Hash, { size: 24, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No events available for this element" })] })) }) }) }))] }), _jsx("div", { className: "p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", className: "flex-1", children: [_jsx(Copy, { size: 16 }), "Duplicate"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", className: "flex-1 text-red-600 border-red-600 hover:bg-red-50", children: [_jsx(Trash2, { size: 16 }), "Delete"] })] }) })] }));
};
export default ElementConfig;
//# sourceMappingURL=element-config.js.map