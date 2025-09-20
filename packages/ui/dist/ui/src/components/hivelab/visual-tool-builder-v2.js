"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiveCard, HiveButton, HiveInput, HiveTextarea, HiveBadge } from '../index';
import { Plus, Grip, Settings, Eye, Save, Trash2, Type, Square, Image, ToggleLeft, Hash, Calendar, Clock, Star, CheckSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
// Component Palette - Visual library students can understand
const COMPONENT_PALETTE = [
    { type: 'heading', icon: Type, label: 'Heading', description: 'Title text for your tool' },
    { type: 'text', icon: Type, label: 'Text', description: 'Display text to users' },
    { type: 'input', icon: Square, label: 'Text Input', description: 'Let users type text' },
    { type: 'textarea', icon: Square, label: 'Long Text', description: 'Multi-line text input' },
    { type: 'button', icon: Square, label: 'Button', description: 'Clickable action button' },
    { type: 'number', icon: Hash, label: 'Number', description: 'Number input field' },
    { type: 'select', icon: Square, label: 'Dropdown', description: 'Choose from options' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Yes/no option' },
    { type: 'toggle', icon: ToggleLeft, label: 'Toggle', description: 'On/off switch' },
    { type: 'date', icon: Calendar, label: 'Date Picker', description: 'Select a date' },
    { type: 'timer', icon: Clock, label: 'Timer', description: 'Countdown timer' },
    { type: 'rating', icon: Star, label: 'Rating', description: 'Star rating system' },
    { type: 'image', icon: Image, label: 'Image', description: 'Display pictures' },
    { type: 'card', icon: Square, label: 'Card', description: 'Container for content' },
    { type: 'divider', icon: Square, label: 'Divider', description: 'Visual separator' },
];
// Draggable Component from Palette
function PaletteItem({ component }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `palette-${component.type}`,
        data: { type: 'palette-item', componentType: component.type }
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };
    return (_jsxs("div", { ref: setNodeRef, style: style, ...listeners, ...attributes, className: cn("flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200", "hover:border-amber-300 hover:shadow-sm cursor-grab active:cursor-grabbing", "transition-all duration-150"), children: [_jsx(component.icon, { className: "w-5 h-5 text-amber-600" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-gray-900", children: component.label }), _jsx("p", { className: "text-xs text-gray-500 truncate", children: component.description })] })] }));
}
// Canvas Component - Where students build
function CanvasComponent({ component, isSelected, onSelect, onUpdate, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
        id: component.id,
        data: { type: 'canvas-component', component }
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };
    const renderComponent = () => {
        switch (component.type) {
            case 'heading':
                return (_jsx("h2", { className: cn("font-bold text-gray-900", component.style?.size === 'sm' && "text-lg", component.style?.size === 'md' && "text-xl", component.style?.size === 'lg' && "text-2xl", !component.style?.size && "text-xl"), children: component.label || 'Your Heading' }));
            case 'text':
                return _jsx("p", { className: "text-gray-700", children: component.label || 'Your text content' });
            case 'input':
                return _jsx(HiveInput, { placeholder: component.placeholder || 'Enter text...', className: "w-full" });
            case 'textarea':
                return _jsx(HiveTextarea, { placeholder: component.placeholder || 'Enter long text...', className: "w-full" });
            case 'button':
                return (_jsx(HiveButton, { variant: component.style?.variant || 'default', size: component.style?.size || 'md', children: component.label || 'Button' }));
            case 'number':
                return _jsx(HiveInput, { type: "number", placeholder: "0", className: "w-full" });
            case 'checkbox':
                return (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", className: "rounded border-gray-300" }), _jsx("span", { children: component.label || 'Checkbox option' })] }));
            case 'select':
                return (_jsxs("select", { className: "w-full p-2 border border-gray-300 rounded-md", children: [_jsx("option", { children: "Choose an option..." }), component.options?.map((option, i) => (_jsx("option", { value: option, children: option }, i)))] }));
            case 'divider':
                return _jsx("hr", { className: "border-gray-300 w-full" });
            case 'card':
                return (_jsx(HiveCard, { className: "p-4 min-h-[80px] border-dashed border-gray-300", children: _jsx("p", { className: "text-gray-500 text-center", children: "Card content goes here" }) }));
            default:
                return _jsx("div", { className: "p-2 bg-gray-100 rounded text-sm", children: component.type });
        }
    };
    return (_jsxs("div", { ref: setNodeRef, style: style, onClick: onSelect, className: cn("relative group p-2 rounded-lg border-2 transition-all", isSelected ? "border-amber-400 bg-amber-50" : "border-transparent hover:border-gray-200", "cursor-pointer"), children: [_jsx("div", { ...listeners, ...attributes, className: cn("absolute -top-2 -left-2 w-6 h-6 bg-amber-500 rounded-full", "flex items-center justify-center cursor-grab active:cursor-grabbing", "opacity-0 group-hover:opacity-100 transition-opacity"), children: _jsx(Grip, { className: "w-3 h-3 text-white" }) }), _jsx("button", { onClick: (e) => { e.stopPropagation(); onDelete(); }, className: cn("absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full", "flex items-center justify-center", "opacity-0 group-hover:opacity-100 transition-opacity"), children: _jsx(Trash2, { className: "w-3 h-3 text-white" }) }), _jsx("div", { className: "pointer-events-none", children: renderComponent() })] }));
}
// Property Panel - Simple settings students can understand
function PropertyPanel({ component, onUpdate }) {
    if (!component) {
        return (_jsxs("div", { className: "p-6 text-center text-gray-500", children: [_jsx(Settings, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { children: "Select a component to edit its properties" })] }));
    }
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Settings, { className: "w-5 h-5 text-amber-600" }), _jsx("h3", { className: "font-semibold", children: "Component Settings" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: component.type === 'text' || component.type === 'heading' ? 'Content' : 'Label' }), _jsx(HiveInput, { value: component.label || '', onChange: (e) => onUpdate({ label: e.target.value }), placeholder: "Enter text..." })] }), (['input', 'textarea', 'number'].includes(component.type)) && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Placeholder" }), _jsx(HiveInput, { value: component.placeholder || '', onChange: (e) => onUpdate({ placeholder: e.target.value }), placeholder: "Hint text..." })] })), component.type === 'select' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Options (one per line)" }), _jsx(HiveTextarea, { value: component.options?.join('\n') || '', onChange: (e) => onUpdate({ options: e.target.value.split('\n').filter(Boolean) }), placeholder: "Option 1\nOption 2\nOption 3", rows: 4 })] })), (['button', 'heading'].includes(component.type)) && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Size" }), _jsxs("select", { value: component.style?.size || 'md', onChange: (e) => onUpdate({
                            style: { ...component.style, size: e.target.value }
                        }), className: "w-full p-2 border border-gray-300 rounded-md", children: [_jsx("option", { value: "sm", children: "Small" }), _jsx("option", { value: "md", children: "Medium" }), _jsx("option", { value: "lg", children: "Large" })] })] })), (['input', 'textarea', 'number', 'select'].includes(component.type)) && (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: component.required || false, onChange: (e) => onUpdate({ required: e.target.checked }), className: "rounded border-gray-300" }), _jsx("span", { className: "text-sm", children: "Required field" })] }))] }));
}
// Main Visual Tool Builder
export function VisualToolBuilderV2() {
    const [tool, setTool] = useState({
        id: 'new-tool',
        name: 'My New Tool',
        description: 'A tool to help students',
        components: [],
        actions: [],
        theme: {
            primaryColor: '#D4AF37',
            backgroundColor: '#FFFFFF',
            textColor: '#1F2937'
        }
    });
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [mode, setMode] = useState('build');
    // Canvas drop zone
    const { setNodeRef: setCanvasRef, isOver } = useDroppable({
        id: 'canvas',
    });
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over)
            return;
        // Adding new component from palette
        if (active.data.current?.type === 'palette-item' && over.id === 'canvas') {
            const componentType = active.data.current.componentType;
            const newComponent = {
                id: `${componentType}-${Date.now()}`,
                type: componentType,
                label: COMPONENT_PALETTE.find(c => c.type === componentType)?.label || '',
                position: { x: 50, y: tool.components.length * 80 + 50 },
                width: 200,
                height: 60,
                style: { size: 'md', variant: 'default' }
            };
            setTool(prev => ({
                ...prev,
                components: [...prev.components, newComponent]
            }));
            setSelectedComponent(newComponent);
        }
    };
    const updateComponent = useCallback((id, updates) => {
        setTool(prev => ({
            ...prev,
            components: prev.components.map(comp => comp.id === id ? { ...comp, ...updates } : comp)
        }));
        if (selectedComponent?.id === id) {
            setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
        }
    }, [selectedComponent]);
    const deleteComponent = useCallback((id) => {
        setTool(prev => ({
            ...prev,
            components: prev.components.filter(comp => comp.id !== id)
        }));
        if (selectedComponent?.id === id) {
            setSelectedComponent(null);
        }
    }, [selectedComponent]);
    const saveTool = async () => {
        // TODO: Implement actual save to backend
        console.log('Saving tool:', tool);
        alert('Tool saved! (This will connect to the backend)');
    };
    const previewTool = () => {
        setMode('preview');
        setSelectedComponent(null);
    };
    return (_jsx("div", { className: "h-screen flex bg-gray-50", children: _jsxs(DndContext, { onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: [_jsxs("div", { className: "w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-2", children: "Add Components" }), _jsx("p", { className: "text-xs text-gray-500", children: "Drag components to your canvas" })] }), _jsx("div", { className: "space-y-2", children: COMPONENT_PALETTE.map(component => (_jsx(PaletteItem, { component: component }, component.type))) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "bg-white border-b border-gray-200 p-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveInput, { value: tool.name, onChange: (e) => setTool(prev => ({ ...prev, name: e.target.value })), className: "font-semibold text-lg border-none p-0 h-auto focus:ring-0", placeholder: "Tool Name" }), _jsx(HiveBadge, { variant: "outline", children: "Draft" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(HiveButton, { variant: mode === 'build' ? 'default' : 'outline', size: "sm", onClick: () => setMode('build'), children: [_jsx(Settings, { className: "w-4 h-4 mr-1" }), "Build"] }), _jsxs(HiveButton, { variant: mode === 'preview' ? 'default' : 'outline', size: "sm", onClick: previewTool, children: [_jsx(Eye, { className: "w-4 h-4 mr-1" }), "Preview"] }), _jsxs(HiveButton, { onClick: saveTool, size: "sm", children: [_jsx(Save, { className: "w-4 h-4 mr-1" }), "Save"] })] })] }), _jsx("div", { className: "flex-1 p-8 overflow-auto", children: _jsx("div", { ref: setCanvasRef, className: cn("max-w-2xl mx-auto bg-white rounded-lg shadow-sm border-2 border-dashed min-h-96 p-6", isOver ? "border-amber-400 bg-amber-50" : "border-gray-300", tool.components.length === 0 && "flex items-center justify-center"), children: tool.components.length === 0 ? (_jsxs("div", { className: "text-center text-gray-500", children: [_jsx(Plus, { className: "w-12 h-12 mx-auto mb-4 text-gray-400" }), _jsx("p", { className: "text-lg font-medium mb-2", children: "Start Building Your Tool" }), _jsx("p", { className: "text-sm", children: "Drag components from the left panel to get started" })] })) : (_jsx(SortableContext, { items: tool.components.map(c => c.id), strategy: verticalListSortingStrategy, children: _jsx("div", { className: "space-y-4", children: tool.components.map(component => (_jsx(CanvasComponent, { component: component, isSelected: selectedComponent?.id === component.id, onSelect: () => setSelectedComponent(component), onUpdate: (updates) => updateComponent(component.id, updates), onDelete: () => deleteComponent(component.id) }, component.id))) }) })) }) })] }), mode === 'build' && (_jsxs("div", { className: "w-80 bg-white border-l border-gray-200 overflow-y-auto", children: [_jsx(PropertyPanel, { component: selectedComponent, onUpdate: (updates) => {
                                if (selectedComponent) {
                                    updateComponent(selectedComponent.id, updates);
                                }
                            } }), ")} />"] })), _jsx(DragOverlay, { children: activeId && activeId.startsWith('palette-') && (_jsx("div", { className: "bg-white border border-gray-200 rounded-lg p-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4 text-amber-600" }), _jsx("span", { className: "text-sm font-medium", children: "Adding component..." })] }) })) })] }) }));
}
export default VisualToolBuilderV2;
//# sourceMappingURL=visual-tool-builder-v2.js.map