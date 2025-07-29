"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Button } from "../../../index";
import { Input } from "../../../index";
import { Label } from "../../ui/label";
import { Textarea } from "../../../index";
import { Switch } from "../../../index";
import { ScrollArea } from "../../ui/scroll-area";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui-legacy-backup/select";
import { Settings, Palette, Eye, EyeOff, Copy, Trash2, ChevronDown, Sliders, } from "lucide-react";
const ConfigSection = ({ title, icon, children, defaultExpanded = true, }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: cn("border border-[var(--hive-border-primary)] rounded-lg", "bg-[var(--hive-background-secondary)]/30 backdrop-blur-sm"), children: [_jsxs("button", { onClick: () => setIsExpanded(!isExpanded), className: cn("w-full flex items-center justify-between p-3", "hover:bg-[var(--hive-background-secondary)]/50 transition-colors", "text-[var(--hive-text-primary)]"), children: [_jsxs("div", { className: "flex items-center gap-2", children: [icon, _jsx("span", { className: "font-medium text-sm", children: title })] }), _jsx(motion.div, { animate: { rotate: isExpanded ? 180 : 0 }, transition: { duration: 0.2 }, children: _jsx(ChevronDown, { className: "h-4 w-4" }) })] }), _jsx(AnimatePresence, { children: isExpanded && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, className: "overflow-hidden", children: _jsx("div", { className: "p-3 pt-0 border-t border-[var(--hive-border-primary)]", children: children }) })) })] }));
};
// Field renderers with HIVE design system
const TextFieldRenderer = ({ value, onChange, config, label }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: label }), config.multiline ? (_jsx(Textarea, { value: value || '', onChange: (e) => onChange(e.target.value), placeholder: config.placeholder, className: cn("min-h-[15] text-sm resize-none", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-secondary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 focus:border-[var(--hive-brand-primary)]"), maxLength: config.maxLength })) : (_jsx(Input, { value: value || '', onChange: (e) => onChange(e.target.value), placeholder: config.placeholder, className: cn("text-sm", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-secondary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 focus:border-[var(--hive-brand-primary)]"), maxLength: config.maxLength })), config.maxLength && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] text-right", children: [(value || '').length, "/", config.maxLength] }))] }));
};
const NumberFieldRenderer = ({ value, onChange, config, label }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: label }), _jsx(Input, { type: "number", value: value || 0, onChange: (e) => onChange(Number(e.target.value)), min: config.min, max: config.max, step: config.step || 1, className: cn("text-sm", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 focus:border-[var(--hive-brand-primary)]") }), (config.min !== undefined || config.max !== undefined) && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["Range: ", config.min ?? '∞', " - ", config.max ?? '∞'] }))] }));
};
const BooleanFieldRenderer = ({ value, onChange, config, label }) => {
    return (_jsxs("div", { className: "flex items-center justify-between py-1", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: label }), _jsx(Switch, { checked: value || false, onCheckedChange: onChange, className: "data-[state=checked]:bg-[var(--hive-brand-primary)]" })] }));
};
const SelectFieldRenderer = ({ value, onChange, config, label }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: label }), _jsxs(Select, { value: value || config.default, onValueChange: onChange, children: [_jsx(SelectTrigger, { className: cn("text-sm", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 focus:border-[var(--hive-brand-primary)]"), children: _jsx(SelectValue, { placeholder: config.placeholder || "Select..." }) }), _jsx(SelectContent, { className: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-primary)]", children: config.options?.map((option) => (_jsx(SelectItem, { value: option.value, className: "text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]", children: option.label }, option.value))) })] })] }));
};
const ColorFieldRenderer = ({ value, onChange, config, label }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: label }), _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "color", value: value || config.default || 'var(--hive-background-primary)', onChange: (e) => onChange(e.target.value), className: cn("w-12 h-8 rounded border border-[var(--hive-border-primary)]", "cursor-pointer bg-transparent") }) }), _jsx(Input, { value: value || config.default || 'var(--hive-background-primary)', onChange: (e) => onChange(e.target.value), placeholder: "var(--hive-background-primary)", className: cn("flex-1 text-sm font-mono", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)]") })] })] }));
};
// Style configuration with HIVE design tokens
const StyleConfigRenderer = ({ value, onChange }) => {
    const updateStyle = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(ColorFieldRenderer, { value: value?.backgroundColor, onChange: (color) => updateStyle('backgroundColor', color), config: { default: 'var(--hive-background-primary)' }, label: "Background Color" }), _jsx(ColorFieldRenderer, { value: value?.textColor, onChange: (color) => updateStyle('textColor', color), config: { default: 'var(--hive-text-primary)' }, label: "Text Color" }), _jsx(NumberFieldRenderer, { value: value?.padding, onChange: (padding) => updateStyle('padding', padding), config: { min: 0, max: 100, default: 0 }, label: "Padding (px)" }), _jsx(NumberFieldRenderer, { value: value?.margin, onChange: (margin) => updateStyle('margin', margin), config: { min: 0, max: 100, default: 0 }, label: "Margin (px)" }), _jsx(NumberFieldRenderer, { value: value?.borderRadius, onChange: (radius) => updateStyle('borderRadius', radius), config: { min: 0, max: 50, default: 8 }, label: "Border Radius (px)" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(NumberFieldRenderer, { value: value?.borderWidth, onChange: (width) => updateStyle('borderWidth', width), config: { min: 0, max: 10, default: 0 }, label: "Border Width" }), _jsx(ColorFieldRenderer, { value: value?.borderColor, onChange: (color) => updateStyle('borderColor', color), config: { default: 'var(--hive-border-primary)' }, label: "Border Color" })] })] }));
};
// Dynamic form field renderer
const renderFormField = (key, fieldConfig, value, onChange) => {
    const { type, label, ...config } = fieldConfig;
    switch (type) {
        case 'text':
        case 'string':
            return (_jsx(TextFieldRenderer, { value: value, onChange: onChange, config: config, label: label || key }, key));
        case 'number':
        case 'integer':
            return (_jsx(NumberFieldRenderer, { value: value, onChange: onChange, config: config, label: label || key }, key));
        case 'boolean':
            return (_jsx(BooleanFieldRenderer, { value: value, onChange: onChange, config: config, label: label || key }, key));
        case 'select':
        case 'enum':
            return (_jsx(SelectFieldRenderer, { value: value, onChange: onChange, config: config, label: label || key }, key));
        case 'color':
            return (_jsx(ColorFieldRenderer, { value: value, onChange: onChange, config: config, label: label || key }, key));
        default:
            return (_jsxs("div", { className: "p-2 bg-[var(--hive-background-secondary)]/50 rounded text-xs text-[var(--hive-text-secondary)]", children: ["Unknown field type: ", type] }, key));
    }
};
export const PropertiesPanel = ({ selectedInstance, element, onConfigChange, onInstanceUpdate, onDeleteInstance, onDuplicateInstance, className, }) => {
    const [activeTab, setActiveTab] = useState('config');
    const [config, setConfig] = useState(selectedInstance?.config || {});
    // Update local config when selected instance changes
    useEffect(() => {
        if (selectedInstance) {
            setConfig(selectedInstance.config);
        }
    }, [selectedInstance]);
    // Handle config changes with debouncing
    const handleConfigChange = useCallback((key, value) => {
        const newConfig = { ...config, [key]: value };
        setConfig(newConfig);
        // Debounce the actual update
        const timeoutId = setTimeout(() => {
            if (selectedInstance) {
                onConfigChange(selectedInstance.id, newConfig);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [config, selectedInstance, onConfigChange]);
    // Handle instance property changes
    const handleInstanceChange = useCallback((key, value) => {
        if (selectedInstance) {
            onInstanceUpdate(selectedInstance.id, { [key]: value });
        }
    }, [selectedInstance, onInstanceUpdate]);
    if (!selectedInstance || !element) {
        return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: cn("flex flex-col h-full border-l border-[var(--hive-border-primary)]", "bg-[var(--hive-background-secondary)]/30 backdrop-blur-sm", className), children: [_jsx("div", { className: "p-4 border-b border-[var(--hive-border-primary)]", children: _jsx("h3", { className: "font-semibold text-sm text-[var(--hive-text-primary)]", children: "Properties" }) }), _jsx("div", { className: "flex-1 flex items-center justify-center p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(motion.div, { animate: {
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.05, 1]
                                }, transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }, children: _jsx(Sliders, { className: "h-12 w-12 mx-auto mb-4 text-[var(--hive-text-secondary)]/50" }) }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Select an element to view its properties" })] }) })] }));
    }
    // Parse element's config schema to create form fields
    const getFormFields = () => {
        try {
            const schema = JSON.parse(element.configSchema);
            return schema.properties || {};
        }
        catch (error) {
            console.error('Failed to parse element config schema:', error);
            return {};
        }
    };
    const formFields = getFormFields();
    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: cn("flex flex-col h-full border-l border-[var(--hive-border-primary)]", "bg-[var(--hive-background-secondary)]/30 backdrop-blur-sm", className), children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-sm text-[var(--hive-text-primary)]", children: element.name }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: element.description })] }), _jsxs(Badge, { variant: "outline", className: cn("text-xs border-[var(--hive-border-primary)]", "bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)]"), children: ["v", element.version] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", variant: "outline", onClick: () => onDuplicateInstance(selectedInstance.id), className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", "hover:bg-[var(--hive-background-secondary)]"), children: [_jsx(Copy, { className: "h-3 w-3 mr-1" }), "Copy"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleInstanceChange('isVisible', !selectedInstance.isVisible), className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", "hover:bg-[var(--hive-background-secondary)]"), children: [selectedInstance.isVisible ? (_jsx(Eye, { className: "h-3 w-3 mr-1" })) : (_jsx(EyeOff, { className: "h-3 w-3 mr-1" })), selectedInstance.isVisible ? 'Hide' : 'Show'] }), _jsxs(Button, { size: "sm", variant: "destructive", onClick: () => onDeleteInstance(selectedInstance.id), className: "h-8 px-3", children: [_jsx(Trash2, { className: "h-3 w-3 mr-1" }), "Delete"] })] })] }), _jsx("div", { className: "flex border-b border-[var(--hive-border-primary)]", children: ['config', 'style', 'advanced'].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: cn("flex-1 px-4 py-2 text-xs font-medium transition-colors", "border-b-2 border-transparent", activeTab === tab
                        ? "text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                        : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]/30"), children: tab.charAt(0).toUpperCase() + tab.slice(1) }, tab))) }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("div", { className: "p-4", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: "space-y-4", children: [activeTab === 'config' && (_jsx(ConfigSection, { title: "Element Configuration", icon: _jsx(Settings, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), children: _jsxs("div", { className: "space-y-4", children: [Object.entries(formFields).map(([key, fieldConfig]) => {
                                                // Skip style field as it has its own tab
                                                if (key === 'style' || key === 'conditionalRules')
                                                    return null;
                                                return renderFormField(key, fieldConfig, config[key], (value) => handleConfigChange(key, value));
                                            }), Object.keys(formFields).length === 0 && (_jsx("div", { className: "text-xs text-[var(--hive-text-secondary)] text-center py-4", children: "No configuration options available." }))] }) })), activeTab === 'style' && (_jsx(ConfigSection, { title: "Visual Styling", icon: _jsx(Palette, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), children: _jsx(StyleConfigRenderer, { value: config.style || {}, onChange: (style) => handleConfigChange('style', style) }) })), activeTab === 'advanced' && (_jsxs(_Fragment, { children: [_jsx(ConfigSection, { title: "Element Properties", icon: _jsx(Settings, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: "Instance ID" }), _jsx(Input, { value: selectedInstance.id, readOnly: true, className: cn("text-xs font-mono", "bg-[var(--hive-background-secondary)]/50 border-[var(--hive-border-primary)]", "text-[var(--hive-text-secondary)]") })] }), _jsx(BooleanFieldRenderer, { value: selectedInstance.isLocked || false, onChange: (locked) => handleInstanceChange('isLocked', locked), config: {}, label: "Lock Position" })] }) }), _jsx(ConfigSection, { title: "Position & Size", defaultExpanded: false, children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(NumberFieldRenderer, { value: selectedInstance.position.x, onChange: (x) => handleInstanceChange('position', { ...selectedInstance.position, x }), config: { min: 0 }, label: "X Position" }), _jsx(NumberFieldRenderer, { value: selectedInstance.position.y, onChange: (y) => handleInstanceChange('position', { ...selectedInstance.position, y }), config: { min: 0 }, label: "Y Position" })] }) })] }))] }, activeTab) }) }) })] }));
};
export default PropertiesPanel;
//# sourceMappingURL=properties-panel.js.map