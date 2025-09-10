'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useRef, useMemo } from 'react';
import { Plus, Search, Download, Star, Eye, Settings, Code, Play, Save, Share2, Edit, Layout, Type, Image, Link, MousePointer, Sparkles, Zap, Target } from 'lucide-react';
import { Button, Input, Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '../atoms/index.js';
// Available element types for the visual builder
const ELEMENT_TYPES = [
    {
        type: 'input',
        label: 'Text Input',
        icon: Type,
        color: 'text-blue-500',
        defaultProps: {
            placeholder: 'Enter text...',
            label: 'Input Field',
            required: false
        }
    },
    {
        type: 'button',
        label: 'Button',
        icon: MousePointer,
        color: 'text-green-500',
        defaultProps: {
            text: 'Click me',
            variant: 'primary',
            size: 'medium'
        }
    },
    {
        type: 'text',
        label: 'Text Block',
        icon: Type,
        color: 'text-gray-500',
        defaultProps: {
            content: 'Sample text',
            size: 'medium',
            weight: 'normal'
        }
    },
    {
        type: 'image',
        label: 'Image',
        icon: Image,
        color: 'text-purple-500',
        defaultProps: {
            src: '/placeholder-image.jpg',
            alt: 'Image description',
            fit: 'cover'
        }
    },
    {
        type: 'container',
        label: 'Container',
        icon: Layout,
        color: 'text-orange-500',
        defaultProps: {
            padding: 16,
            margin: 8,
            backgroundColor: 'transparent',
            borderRadius: 8
        }
    },
    {
        type: 'link',
        label: 'Link',
        icon: Link,
        color: 'text-indigo-500',
        defaultProps: {
            text: 'Click here',
            url: 'https://example.com',
            target: '_blank'
        }
    }
];
export function CompleteHIVEToolsSystem({ tools, personalTools = [], onToolInstall, onToolCreate, onToolUpdate, onToolDelete, className = '' }) {
    const [activeTab, setActiveTab] = useState('marketplace');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [builderMode, setBuilderMode] = useState('design');
    const [selectedElement, setSelectedElement] = useState(null);
    const [currentTool, setCurrentTool] = useState(null);
    const [draggedElement, setDraggedElement] = useState(null);
    const canvasRef = useRef(null);
    // Filter tools based on search and category
    const filteredTools = useMemo(() => {
        let filtered = tools;
        if (searchQuery) {
            filtered = filtered.filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(tool => tool.category === selectedCategory);
        }
        return filtered;
    }, [tools, searchQuery, selectedCategory]);
    // Get unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(tools.map(tool => tool.category))];
        return ['all', ...cats];
    }, [tools]);
    // Handle element drag and drop
    const handleElementDrag = useCallback((elementType, event) => {
        event.dataTransfer.setData('elementType', elementType);
        setDraggedElement(elementType);
    }, []);
    const handleCanvasDrop = useCallback((event) => {
        event.preventDefault();
        const elementType = event.dataTransfer.getData('elementType');
        const canvas = canvasRef.current;
        if (!canvas || !elementType)
            return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const elementTemplate = ELEMENT_TYPES.find(t => t.type === elementType);
        if (!elementTemplate)
            return;
        const newElement = {
            id: `element-${Date.now()}`,
            type: elementType,
            label: elementTemplate.label,
            properties: { ...elementTemplate.defaultProps },
            position: { x, y },
            size: { width: 200, height: 40 },
            style: {}
        };
        setCurrentTool(prev => ({
            ...prev,
            elements: [...(prev?.elements || []), newElement]
        }));
        setDraggedElement(null);
    }, []);
    const handleCanvasDragOver = useCallback((event) => {
        event.preventDefault();
    }, []);
    // Tool creation and management
    const startNewTool = useCallback(() => {
        setCurrentTool({
            id: `tool-${Date.now()}`,
            name: 'New Tool',
            description: 'A custom tool created with HiveLab',
            category: 'custom',
            type: 'custom',
            elements: [],
            config: {}
        });
        setActiveTab('builder');
        setBuilderMode('design');
    }, []);
    const saveTool = useCallback(() => {
        if (currentTool && onToolCreate) {
            onToolCreate(currentTool);
            setCurrentTool(null);
            setActiveTab('personal');
        }
    }, [currentTool, onToolCreate]);
    const renderElement = useCallback((element) => {
        const { type, properties, position, size, style } = element;
        const isSelected = selectedElement === element.id;
        const elementStyle = {
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: size.width,
            height: type === 'container' ? 'auto' : size.height,
            minHeight: type === 'container' ? size.height : undefined,
            border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            ...style
        };
        const handleElementClick = () => setSelectedElement(element.id);
        switch (type) {
            case 'input':
                return (_jsx("div", { style: elementStyle, onClick: handleElementClick, children: _jsx("input", { type: "text", placeholder: properties.placeholder, disabled: builderMode === 'design', className: "w-full border-0 bg-transparent outline-none" }) }, element.id));
            case 'button':
                return (_jsx("div", { style: elementStyle, onClick: handleElementClick, children: _jsx(Button, { size: "sm", variant: properties.variant, disabled: builderMode === 'design', className: "w-full", children: properties.text }) }, element.id));
            case 'text':
                return (_jsx("div", { style: elementStyle, onClick: handleElementClick, children: _jsx("span", { style: {
                            fontSize: properties.size === 'large' ? '18px' : properties.size === 'small' ? '12px' : '14px',
                            fontWeight: properties.weight
                        }, children: properties.content }) }, element.id));
            case 'image':
                return (_jsx("div", { style: elementStyle, onClick: handleElementClick, children: _jsx("img", { src: properties.src, alt: properties.alt, className: "w-full h-full object-cover rounded" }) }, element.id));
            case 'container':
                return (_jsx("div", { style: {
                        ...elementStyle,
                        backgroundColor: properties.backgroundColor || 'rgba(249, 250, 251, 0.8)',
                        padding: properties.padding || 16,
                        minHeight: 100
                    }, onClick: handleElementClick, children: _jsx("div", { className: "text-sm text-gray-500 text-center", children: "Container" }) }, element.id));
            case 'link':
                return (_jsx("div", { style: elementStyle, onClick: handleElementClick, children: _jsx("a", { href: builderMode === 'preview' ? properties.url : '#', target: properties.target, className: "text-blue-600 hover:text-blue-800 underline", onClick: (e) => builderMode === 'design' && e.preventDefault(), children: properties.text }) }, element.id));
            default:
                return null;
        }
    }, [selectedElement, builderMode]);
    return (_jsxs("div", { className: `h-full flex flex-col ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-white/10", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-6 w-6 text-[var(--hive-gold)]" }), _jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-inverse)]", children: "HIVE Tools" })] }), _jsxs(Button, { onClick: startNewTool, className: "bg-[var(--hive-gold)] text-[var(--hive-obsidian)]", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Create Tool"] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), className: "flex-1 flex flex-col", children: [_jsxs(TabsList, { className: "w-full bg-white/5 p-1", children: [_jsxs(TabsTrigger, { value: "marketplace", className: "flex-1", children: [_jsx(Target, { className: "h-4 w-4 mr-2" }), "Marketplace"] }), _jsxs(TabsTrigger, { value: "personal", className: "flex-1", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "My Tools"] }), _jsxs(TabsTrigger, { value: "builder", className: "flex-1", children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "HiveLab"] })] }), _jsxs(TabsContent, { value: "marketplace", className: "flex-1 flex flex-col", children: [_jsx("div", { className: "p-4 border-b border-white/10", children: _jsxs("div", { className: "flex gap-4 mb-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search tools...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }), _jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)]", children: categories.map(cat => (_jsx("option", { value: cat, children: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1) }, cat))) })] }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredTools.map((tool) => {
                                        const IconComponent = tool.icon;
                                        return (_jsxs(Card, { className: "p-4 hover:bg-white/5 transition-colors", children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "p-2 rounded-lg", style: { backgroundColor: `${tool.color}20` }, children: _jsx(IconComponent, { className: "h-5 w-5", style: { color: tool.color } }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: tool.name }), _jsx("p", { className: "text-sm text-gray-400 line-clamp-2", children: tool.description })] })] }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 text-yellow-400 fill-current" }), _jsxs("span", { className: "text-xs text-gray-400", children: [tool.rating, " (", tool.ratingCount, ")"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "h-3 w-3 text-gray-400" }), _jsx("span", { className: "text-xs text-gray-400", children: tool.downloads })] })] }), _jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: tool.tags.slice(0, 3).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", className: "flex-1", onClick: () => onToolInstall?.(tool.id), disabled: tool.isInstalled, children: tool.isInstalled ? 'Installed' : 'Install' }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Eye, { className: "h-4 w-4" }) })] })] }, tool.id));
                                    }) }) })] }), _jsx(TabsContent, { value: "personal", className: "flex-1 flex flex-col", children: _jsx("div", { className: "flex-1 overflow-y-auto p-4", children: personalTools.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-64", children: [_jsx(Zap, { className: "h-12 w-12 text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-inverse)] mb-2", children: "No personal tools yet" }), _jsx("p", { className: "text-gray-400 text-center mb-4", children: "Create your first custom tool using HiveLab or install tools from the marketplace." }), _jsxs(Button, { onClick: startNewTool, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Create Your First Tool"] })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: personalTools.map((tool) => {
                                    const IconComponent = tool.icon;
                                    return (_jsxs(Card, { className: "p-4 hover:bg-white/5 transition-colors", children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "p-2 rounded-lg", style: { backgroundColor: `${tool.color}20` }, children: _jsx(IconComponent, { className: "h-5 w-5", style: { color: tool.color } }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: tool.name }), _jsx("p", { className: "text-sm text-gray-400 line-clamp-2", children: tool.description })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", className: "flex-1", children: [_jsx(Play, { className: "h-4 w-4 mr-2" }), "Open"] }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Share2, { className: "h-4 w-4" }) })] })] }, tool.id));
                                }) })) }) }), _jsx(TabsContent, { value: "builder", className: "flex-1 flex flex-col", children: !currentTool ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [_jsx(Code, { className: "h-16 w-16 text-gray-400 mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-inverse)] mb-2", children: "Welcome to HiveLab" }), _jsx("p", { className: "text-gray-400 text-center mb-6 max-w-md", children: "Build powerful tools for your campus community without writing any code. Drag and drop elements to create exactly what you need." }), _jsxs(Button, { onClick: startNewTool, size: "lg", children: [_jsx(Plus, { className: "h-5 w-5 mr-2" }), "Start Building"] })] })) : (_jsxs("div", { className: "flex-1 flex", children: [_jsxs("div", { className: "w-64 border-r border-white/10 p-4 bg-white/[0.02]", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] mb-4", children: "Elements" }), _jsx("div", { className: "space-y-2", children: ELEMENT_TYPES.map((elementType) => {
                                                const IconComponent = elementType.icon;
                                                return (_jsxs("div", { draggable: true, onDragStart: (e) => handleElementDrag(elementType.type, e), className: "flex items-center gap-2 p-3 rounded-lg border border-white/10 cursor-move hover:bg-white/5 transition-colors", children: [_jsx(IconComponent, { className: `h-4 w-4 ${elementType.color}` }), _jsx("span", { className: "text-sm text-[var(--hive-text-inverse)]", children: elementType.label })] }, elementType.type));
                                            }) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "flex items-center gap-2 p-4 border-b border-white/10", children: [_jsx(Input, { value: currentTool.name || '', onChange: (e) => setCurrentTool(prev => ({ ...prev, name: e.target.value })), className: "flex-1", placeholder: "Tool name..." }), _jsxs(Button, { onClick: saveTool, disabled: !currentTool.name, children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), "Save"] })] }), _jsxs("div", { ref: canvasRef, className: "flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-auto", onDrop: handleCanvasDrop, onDragOver: handleCanvasDragOver, style: { minHeight: '500px' }, children: [currentTool.elements?.map(renderElement), draggedElement && (_jsx("div", { className: "absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500 pointer-events-none flex items-center justify-center", children: _jsxs("span", { className: "text-blue-600 font-medium", children: ["Drop to add ", ELEMENT_TYPES.find(t => t.type === draggedElement)?.label] }) }))] })] })] })) })] })] }));
}
//# sourceMappingURL=complete-hive-tools-system.js.map