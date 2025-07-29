import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ElementPicker, ToolBuilder, DesignCanvas, ElementLibrary, TemplateMode } from '../../components/creator/ToolBuilder';
import { Square, Type, Image, Layout, Code, Wand2 } from 'lucide-react';
const meta = {
    title: '10-Creator/Builder Components',
    parameters: {
        docs: {
            description: {
                component: 'HIVE tool builder components for creating and designing interactive tools',
            },
        },
    },
};
export default meta;
// Mock data for builders
const mockElements = [
    {
        id: 'button',
        name: 'Button',
        category: 'Interactive',
        icon: _jsx(Square, { className: "w-4 h-4" }),
        description: 'Interactive button element',
        properties: {
            text: 'Click me',
            variant: 'primary',
            size: 'medium',
        },
        preview: '/element-button.svg',
    },
    {
        id: 'input',
        name: 'Input Field',
        category: 'Forms',
        icon: _jsx(Type, { className: "w-4 h-4" }),
        description: 'Text input field',
        properties: {
            placeholder: 'Enter text...',
            type: 'text',
            required: false,
        },
        preview: '/element-input.svg',
    },
    {
        id: 'image',
        name: 'Image',
        category: 'Media',
        icon: _jsx(Image, { className: "w-4 h-4" }),
        description: 'Image display element',
        properties: {
            src: '/placeholder.jpg',
            alt: 'Image description',
            width: 75,
            height: 200,
        },
        preview: '/element-image.svg',
    },
    {
        id: 'container',
        name: 'Container',
        category: 'Layout',
        icon: _jsx(Layout, { className: "w-4 h-4" }),
        description: 'Layout container',
        properties: {
            direction: 'vertical',
            spacing: 'medium',
            padding: 'medium',
        },
        preview: '/element-container.svg',
    },
];
const mockTemplates = [
    {
        id: 'survey-tool',
        name: 'Survey Tool',
        description: 'Create interactive surveys and collect responses',
        category: 'Data Collection',
        difficulty: 'beginner',
        estimatedTime: '15 min',
        thumbnail: '/template-survey.jpg',
        elements: ['input', 'button', 'container', 'text'],
        features: ['form-validation', 'data-export', 'analytics'],
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        description: 'Advanced color selection and palette generator',
        category: 'Design',
        difficulty: 'intermediate',
        estimatedTime: '30 min',
        thumbnail: '/template-color.jpg',
        elements: ['color-wheel', 'slider', 'preview', 'export'],
        features: ['color-harmony', 'accessibility-check', 'export-formats'],
    },
    {
        id: 'chart-builder',
        name: 'Chart Builder',
        description: 'Data visualization and chart creation tool',
        category: 'Analytics',
        difficulty: 'advanced',
        estimatedTime: '45 min',
        thumbnail: '/template-chart.jpg',
        elements: ['chart', 'data-input', 'config-panel', 'export'],
        features: ['multiple-chart-types', 'real-time-data', 'interactive-legends'],
    },
];
const mockCanvasState = {
    elements: [
        {
            id: 'element-1',
            type: 'button',
            x: 100,
            y: 50,
            width: 120,
            height: 40,
            properties: { text: 'Get Started', variant: 'primary' },
        },
        {
            id: 'element-2',
            type: 'input',
            x: 100,
            y: 120,
            width: 200,
            height: 40,
            properties: { placeholder: 'Enter your email...', type: 'email' },
        },
        {
            id: 'element-3',
            type: 'container',
            x: 50,
            y: 200,
            width: 75,
            height: 150,
            properties: { direction: 'vertical', padding: 'large' },
            children: ['element-4', 'element-5'],
        },
    ],
    selectedElement: 'element-1',
    canvas: {
        width: 800,
        height: 600,
        zoom: 1,
        background: 'var(--hive-background-primary)',
    },
};
// Template Tool Builder
export const TemplateBuilder = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Template Tool Builder" }), _jsx("div", { className: "max-w-6xl", children: _jsx(TemplateMode, { templates: mockTemplates, onSelectTemplate: (template) => console.log('Selected template:', template), onCustomizeTemplate: (templateId, config) => console.log('Customize:', templateId, config), onPreviewTemplate: (templateId) => console.log('Preview:', templateId) }) }), _jsxs("div", { className: "mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Template Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Pre-built tool templates for common use cases" }), _jsx("li", { children: "\u2022 Drag-and-drop customization interface" }), _jsx("li", { children: "\u2022 Template preview with live interaction" }), _jsx("li", { children: "\u2022 Category filtering and difficulty levels" }), _jsx("li", { children: "\u2022 Estimated completion time and required elements" }), _jsx("li", { children: "\u2022 One-click deployment and sharing" })] })] })] })),
};
// Visual Tool Builder
export const VisualBuilder = {
    render: () => (_jsxs("div", { className: "h-screen bg-[var(--hive-background-primary)] flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-default)]", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Visual Tool Builder" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Drag and drop elements to build your tool" })] }), _jsx("div", { className: "flex-1 flex", children: _jsx(ToolBuilder, { mode: "visual", elements: mockElements, onSave: (tool) => console.log('Save tool:', tool), onPreview: (tool) => console.log('Preview tool:', tool), onPublish: (tool) => console.log('Publish tool:', tool) }) })] })),
};
// Wizard Tool Builder
export const WizardBuilder = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Wizard Tool Builder" }), _jsx("div", { className: "max-w-4xl", children: _jsx("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Tool Configuration" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[var(--hive-text-secondary)] text-sm font-medium mb-2", children: "Tool Name" }), _jsx("input", { type: "text", className: "w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:border-[var(--hive-brand-secondary)] focus:outline-none", placeholder: "Enter tool name..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[var(--hive-text-secondary)] text-sm font-medium mb-2", children: "Category" }), _jsxs("select", { className: "w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:border-[var(--hive-brand-secondary)] focus:outline-none", children: [_jsx("option", { children: "Design" }), _jsx("option", { children: "Development" }), _jsx("option", { children: "Analytics" }), _jsx("option", { children: "Communication" })] })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-[var(--hive-text-secondary)] text-sm font-medium mb-2", children: "Description" }), _jsx("textarea", { rows: 3, className: "w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:border-[var(--hive-brand-secondary)] focus:outline-none", placeholder: "Describe what your tool does..." })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Tool Features" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: ['Real-time Preview', 'Export Options', 'Collaboration', 'Version History', 'Analytics', 'API Access'].map((feature) => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", className: "rounded border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-brand-secondary)] focus:ring-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-[var(--hive-text-secondary)] text-sm", children: feature })] }, feature))) })] })] }) }) })] })),
};
// Advanced Tool Builder
export const AdvancedBuilder = {
    render: () => (_jsxs("div", { className: "h-screen bg-[var(--hive-background-primary)] flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-default)]", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Advanced Tool Builder" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Professional tool creation with full customization" })] }), _jsx("div", { className: "flex-1", children: _jsx(ToolBuilder, { mode: "advanced", elements: mockElements, canvasState: mockCanvasState, onSave: (toolData) => console.log('Save tool:', toolData), onPublish: (toolData) => console.log('Publish tool:', toolData), onPreview: () => console.log('Preview tool'), onExport: (format) => console.log('Export:', format), features: {
                        codeEditor: true,
                        scriptingAPI: true,
                        customCSS: true,
                        advancedLogic: true,
                        dataConnectors: true,
                        collaborativeEditing: true,
                    }, panels: {
                        elementLibrary: true,
                        propertyPanel: true,
                        codePanel: true,
                        previewPanel: true,
                        layersPanel: true,
                    } }) })] })),
};
// Design Canvas
export const CanvasComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Design Canvas" }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)] p-6", children: _jsx("div", { className: "h-96", children: _jsx(DesignCanvas, { elements: mockCanvasState.elements, selectedElement: mockCanvasState.selectedElement, canvas: mockCanvasState.canvas, onElementMove: (elementId, position) => console.log('Move element:', elementId, position), onElementResize: (elementId, size) => console.log('Resize element:', elementId, size), onElementSelect: (elementId) => console.log('Select element:', elementId), onCanvasClick: (position) => console.log('Canvas click:', position), tools: {
                            grid: true,
                            snap: true,
                            rulers: true,
                            guidelines: true,
                        }, zoom: 1, readonly: false }) }) }), _jsxs("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Canvas Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Drag and drop element positioning" }), _jsx("li", { children: "\u2022 Multi-select and group operations" }), _jsx("li", { children: "\u2022 Snap to grid and guidelines" }), _jsx("li", { children: "\u2022 Zoom and pan navigation" }), _jsx("li", { children: "\u2022 Undo/redo history" }), _jsx("li", { children: "\u2022 Real-time collaboration cursors" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Keyboard Shortcuts" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Select All" }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] font-mono", children: "Cmd+A" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Copy" }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] font-mono", children: "Cmd+C" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Paste" }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] font-mono", children: "Cmd+V" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Undo" }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] font-mono", children: "Cmd+Z" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Delete" }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] font-mono", children: "Del" })] })] })] })] })] })),
};
// Element Library
export const ElementLibraryComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Element Library" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(ElementLibrary, { elements: mockElements, categories: ['Interactive', 'Forms', 'Media', 'Layout', 'Text', 'Data'], onElementSelect: (element) => console.log('Select element:', element), onElementDrag: (element) => console.log('Drag element:', element), searchEnabled: true, favoriteElements: ['button', 'input'], onToggleFavorite: (elementId) => console.log('Toggle favorite:', elementId), customElements: [
                                {
                                    id: 'custom-header',
                                    name: 'Custom Header',
                                    category: 'Custom',
                                    icon: _jsx(Type, { className: "w-4 h-4" }),
                                    description: 'Your custom header component',
                                    custom: true,
                                }
                            ] }) }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Element Categories" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                                                { name: 'Interactive', icon: _jsx(Square, { className: "w-6 h-6" }), count: 12, color: 'var(--hive-status-info)' },
                                                { name: 'Forms', icon: _jsx(Type, { className: "w-6 h-6" }), count: 8, color: 'var(--hive-status-success)' },
                                                { name: 'Media', icon: _jsx(Image, { className: "w-6 h-6" }), count: 6, color: 'var(--hive-status-warning)' },
                                                { name: 'Layout', icon: _jsx(Layout, { className: "w-6 h-6" }), count: 10, color: 'var(--hive-status-info)' },
                                                { name: 'Data', icon: _jsx(Code, { className: "w-6 h-6" }), count: 7, color: 'var(--hive-status-error)' },
                                                { name: 'Custom', icon: _jsx(Wand2, { className: "w-6 h-6" }), count: 3, color: 'var(--hive-brand-secondary)' },
                                            ].map((category) => (_jsx("div", { className: "bg-[var(--hive-background-secondary)] p-4 rounded-lg border border-[var(--hive-border-default)]", children: _jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 rounded-lg", style: { backgroundColor: `${category.color}20` }, children: _jsx("div", { style: { color: category.color }, children: category.icon }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: category.name }), _jsxs("div", { className: "text-[var(--hive-text-tertiary)] text-sm", children: [category.count, " elements"] })] })] }) }, category.name))) })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Element Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Drag and drop from library to canvas" }), _jsx("li", { children: "\u2022 Search and filter elements by category" }), _jsx("li", { children: "\u2022 Favorite frequently used elements" }), _jsx("li", { children: "\u2022 Create and save custom elements" }), _jsx("li", { children: "\u2022 Live preview with hover states" }), _jsx("li", { children: "\u2022 Element documentation and examples" })] })] })] }) })] })] })),
};
// Element Picker
export const ElementPickerComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Element Picker" }), _jsx("div", { className: "max-w-4xl", children: _jsx(ElementPicker, { elements: mockElements, onElementSelect: (element) => console.log('Selected element:', element), onElementPreview: (element) => console.log('Preview element:', element), layout: "grid", showCategories: true, showPreview: true, searchPlaceholder: "Search elements...", emptyState: {
                        title: 'No elements found',
                        description: 'Try adjusting your search or category filter',
                        action: 'Browse all elements',
                    } }) }), _jsxs("div", { className: "mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Picker Modes" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-secondary)] font-medium mb-2", children: "Grid Layout" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Visual grid with element previews and quick selection" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-secondary)] font-medium mb-2", children: "List Layout" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Compact list view with detailed element information" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-secondary)] font-medium mb-2", children: "Tree Layout" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Hierarchical tree view organized by categories" })] })] })] })] })),
};
//# sourceMappingURL=builder-components.stories.js.map