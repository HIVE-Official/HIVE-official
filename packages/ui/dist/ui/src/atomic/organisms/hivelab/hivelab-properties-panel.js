/**
 * HiveLab Properties Panel
 *
 * Floating panel for configuring selected element properties.
 * Shows element info, configuration fields, port connections, and actions.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';
import { FloatingPanel } from '../../molecules/panels/floating-panel';
import { PropertyField } from '../../molecules/panels/property-field';
import { DataMappingRow } from '../../molecules/panels/data-mapping-row';
import { Settings, Trash2, Copy } from 'lucide-react';
/**
 * Get element category label
 */
function getCategoryLabel(type) {
    const labels = {
        trigger: 'Trigger',
        collector: 'Collector',
        transformer: 'Transformer',
        router: 'Router',
        storage: 'Storage',
        display: 'Display',
        action: 'Action',
        connector: 'Connector',
    };
    return labels[type];
}
/**
 * Get element category color
 */
function getCategoryColor(type) {
    const colors = {
        trigger: 'text-red-500',
        collector: 'text-blue-500',
        transformer: 'text-purple-500',
        router: 'text-orange-500',
        storage: 'text-green-500',
        display: 'text-cyan-500',
        action: 'text-pink-500',
        connector: 'text-yellow-500',
    };
    return colors[type];
}
export function HiveLabPropertiesPanel({ selectedElement, allElements = [], onPropertyChange, onDeleteElement, onDuplicateElement, position = 'right', width = 320, isCollapsed = false, onToggleCollapse, onClose, className, }) {
    // Empty state when no element selected
    if (!selectedElement) {
        return (_jsx(FloatingPanel, { title: "Properties", icon: _jsx(Settings, { className: "h-4 w-4" }), position: position, width: width, isCollapsed: isCollapsed, onToggleCollapse: onToggleCollapse, onClose: onClose, className: className, children: _jsx("div", { className: "flex-1 flex items-center justify-center text-center p-8", children: _jsxs("div", { children: [_jsx("div", { className: "text-4xl mb-3", children: "\u2699\uFE0F" }), _jsx("p", { className: "text-sm font-medium mb-1", children: "No Element Selected" }), _jsx("p", { className: "text-xs text-white/70", children: "Click an element on the canvas to configure its properties" })] }) }) }));
    }
    // Find connected elements for data mapping display
    const getConnectedElement = (portId, portSide) => {
        // In a real implementation, this would look up connections
        // For now, return null (no connections shown)
        return null;
    };
    return (_jsxs(FloatingPanel, { title: "Properties", icon: _jsx(Settings, { className: "h-4 w-4" }), position: position, width: width, isCollapsed: isCollapsed, onToggleCollapse: onToggleCollapse, onClose: onClose, className: className, children: [_jsxs("div", { className: "px-3 py-3 border-b space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0 flex-1", children: [_jsx("span", { className: "text-xl shrink-0", children: selectedElement.icon }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "text-sm font-semibold truncate", children: selectedElement.name }), _jsx("p", { className: cn('text-xs font-medium', getCategoryColor(selectedElement.type)), children: getCategoryLabel(selectedElement.type) })] })] }), _jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-6 w-6 p-0", onClick: onDuplicateElement, title: "Duplicate element", children: _jsx(Copy, { className: "h-3.5 w-3.5" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-6 w-6 p-0 text-red-500 hover:text-red-500", onClick: onDeleteElement, title: "Delete element", children: _jsx(Trash2, { className: "h-3.5 w-3.5" }) })] })] }), selectedElement.description && (_jsx("p", { className: "text-xs text-white/70 line-clamp-2", children: selectedElement.description })), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [selectedElement.complexity && (_jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: selectedElement.complexity })), selectedElement.isNew && (_jsx(Badge, { variant: "freshman", className: "h-5 px-1.5 text-xs", children: "NEW" })), _jsxs(Badge, { variant: "freshman", className: "h-5 px-1.5 text-xs", children: [selectedElement.inputs.length, " \u2B05\uFE0F | \u27A1\uFE0F ", selectedElement.outputs.length] })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "px-3 py-3 space-y-3 border-b", children: [_jsx("h4", { className: "text-xs font-semibold", children: "Basic Properties" }), _jsx(PropertyField, { label: "Name", type: "text", value: selectedElement.name, onChange: (value) => onPropertyChange?.('name', value), placeholder: "Element name" }), _jsx(PropertyField, { label: "Description", type: "textarea", value: selectedElement.description, onChange: (value) => onPropertyChange?.('description', value), placeholder: "Describe what this element does" })] }), selectedElement.inputs.length > 0 && (_jsxs("div", { className: "px-3 py-3 space-y-3 border-b", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-xs font-semibold", children: "Input Connections" }), _jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: selectedElement.inputs.length })] }), _jsx("div", { className: "space-y-2", children: selectedElement.inputs.map((input) => (_jsx(DataMappingRow, { port: input, sourceElementName: getConnectedElement(input.id, 'input') }, input.id))) })] })), selectedElement.outputs.length > 0 && (_jsxs("div", { className: "px-3 py-3 space-y-3 border-b", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-xs font-semibold", children: "Output Connections" }), _jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: selectedElement.outputs.length })] }), _jsx("div", { className: "space-y-2", children: selectedElement.outputs.map((output) => (_jsx(DataMappingRow, { port: output, sourceElementName: getConnectedElement(output.id, 'output') }, output.id))) })] })), _jsxs("div", { className: "px-3 py-3 space-y-3 border-b", children: [_jsx("h4", { className: "text-xs font-semibold", children: "Configuration" }), Object.keys(selectedElement.config).length > 0 ? (Object.entries(selectedElement.config).map(([key, value]) => {
                                // Infer field type from value
                                let fieldType = 'text';
                                if (typeof value === 'boolean')
                                    fieldType = 'boolean';
                                else if (typeof value === 'number')
                                    fieldType = 'number';
                                return (_jsx(PropertyField, { label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'), type: fieldType, value: value, onChange: (newValue) => {
                                        onPropertyChange?.('config', {
                                            ...selectedElement.config,
                                            [key]: newValue,
                                        });
                                    } }, key));
                            })) : (_jsx("p", { className: "text-xs text-white/70", children: "No configuration options available" }))] }), _jsxs("div", { className: "px-3 py-3 space-y-3", children: [_jsx("h4", { className: "text-xs font-semibold", children: "Advanced" }), _jsx(PropertyField, { label: "Element ID", type: "text", value: selectedElement.id, onChange: () => { }, disabled: true, help: "Unique identifier for this element" }), _jsx(PropertyField, { label: "Page ID", type: "text", value: selectedElement.pageId, onChange: () => { }, disabled: true, help: "The page this element belongs to" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(PropertyField, { label: "Width", type: "number", value: selectedElement.width, onChange: (value) => onPropertyChange?.('width', value) }), _jsx(PropertyField, { label: "Height", type: "number", value: selectedElement.height, onChange: (value) => onPropertyChange?.('height', value) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(PropertyField, { label: "X Position", type: "number", value: selectedElement.x, onChange: (value) => onPropertyChange?.('x', value) }), _jsx(PropertyField, { label: "Y Position", type: "number", value: selectedElement.y, onChange: (value) => onPropertyChange?.('y', value) })] })] })] }), _jsx("div", { className: "px-3 py-2 border-t bg-white/5", children: _jsx("p", { className: "text-[10px] text-white/70 text-center", children: "\uD83D\uDCBE Changes are saved automatically" }) })] }));
}
HiveLabPropertiesPanel.displayName = 'HiveLabPropertiesPanel';
//# sourceMappingURL=hivelab-properties-panel.js.map