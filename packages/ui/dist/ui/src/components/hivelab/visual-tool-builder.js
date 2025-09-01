"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Visual Tool Builder
 * Drag-and-drop interface for creating tools from elements
 */
import { useState, useCallback, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createToolDefaults } from '@hive/core';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { LiveToolRuntime } from '../live-tool-runtime.js';
import { ElementConfigPanel } from './element-config-panel.js';
import { SpaceToolDeployment } from '../community/space-tool-deployment.js';
import { apiClient } from '../../lib/api-client.js';
import { Type, Image, Minus, Layout, MousePointer, ChevronDown, List, Star, Timer, BarChart3, Settings, Eye, Save, Play, Trash2, Zap } from 'lucide-react';
// Element library with all available elements
const ELEMENT_LIBRARY = [
    {
        id: 'textBlock-v1',
        name: 'Text Block',
        type: 'textBlock',
        category: 'Display & Layout',
        description: 'Display text content with formatting options',
        icon: 'Type',
        version: 1,
        configSchema: JSON.stringify({}), // Simplified for now
        defaultConfig: {
            text: 'Enter your text here...',
            style: {
                fontSize: 'base',
                fontWeight: 'normal',
                textAlign: 'left'
            }
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'textInput-v1',
        name: 'Text Input',
        type: 'textInput',
        category: 'Inputs & Choices',
        description: 'Collect text input from users',
        icon: 'Type',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            label: 'Enter label',
            placeholder: 'Type here...',
            type: 'text',
            required: false
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'button-v1',
        name: 'Button',
        type: 'button',
        category: 'Inputs & Choices',
        description: 'Interactive button for actions',
        icon: 'MousePointer',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            text: 'Click me',
            variant: 'primary',
            size: 'md',
            onClick: {
                type: 'submit'
            }
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'imageBlock-v1',
        name: 'Image',
        type: 'imageBlock',
        category: 'Display & Layout',
        description: 'Display images with captions',
        icon: 'Image',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            src: 'https://via.placeholder.com/300x200',
            alt: 'Image placeholder',
            caption: 'Add a caption here'
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'divider-v1',
        name: 'Divider',
        type: 'divider',
        category: 'Display & Layout',
        description: 'Visual divider line',
        icon: 'Minus',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            thickness: 1,
            color: '#e5e7eb',
            style: 'solid',
            margin: 16
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'choiceSelect-v1',
        name: 'Choice Select',
        type: 'choiceSelect',
        category: 'Inputs & Choices',
        description: 'Dropdown, radio, or checkbox selection',
        icon: 'List3',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            label: 'Select an option',
            options: [
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
            ],
            multiple: false,
            required: false
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'ratingStars-v1',
        name: 'Rating Stars',
        type: 'ratingStars',
        category: 'Inputs & Choices',
        description: 'Star rating input',
        icon: 'Star',
        version: 1,
        configSchema: JSON.stringify({}),
        defaultConfig: {
            label: 'Rate this',
            maxRating: 5,
            allowHalf: false,
            required: false,
            size: 'md',
            color: '#fbbf24'
        },
        isOfficial: true,
        isDeprecated: false,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
// Icon mapping
const getElementIcon = (iconName) => {
    switch (iconName) {
        case 'Type': return Type;
        case 'Image': return Image;
        case 'Minus': return Minus;
        case 'MousePointer': return MousePointer;
        case 'List3': return List;
        case 'Star': return Star;
        case 'Timer': return Timer;
        case 'BarChart3': return BarChart3;
        default: return Layout;
    }
};
// Draggable element from library
const DraggableElement = ({ element }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'element',
        item: { elementId: element.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const IconComponent = getElementIcon(element.icon);
    return (_jsxs("div", { ref: drag, className: `
        p-3 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]
        hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-background-tertiary)]
        cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? 'opacity-50' : ''}
      `, children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(IconComponent, { className: "w-4 h-4 text-[var(--hive-text-secondary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: element.name })] }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)] mt-1", children: element.description })] }));
};
// Canvas element instance
const CanvasElement = ({ element, isSelected, onSelect, onDelete }) => {
    const elementDef = ELEMENT_LIBRARY.find(el => el.id === element.elementId);
    const IconComponent = elementDef ? getElementIcon(elementDef.icon) : Layout;
    return (_jsxs("div", { className: `
        relative p-3 m-2 rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${isSelected
            ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
            : 'border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-hover)]'}
      `, onClick: onSelect, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(IconComponent, { className: "w-4 h-4 text-[var(--hive-text-secondary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: elementDef?.name || 'Unknown Element' })] }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onDelete();
                        }, className: "text-[var(--hive-text-tertiary)] hover:text-red-500 transition-colors", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mt-2 p-2 bg-[var(--hive-background-primary)] rounded border text-xs", children: [element.elementId.includes('textBlock') && (_jsxs("div", { children: ["\uD83D\uDCDD ", element.config?.text || 'Text content'] })), element.elementId.includes('textInput') && (_jsxs("div", { children: ["\uD83D\uDCDD Input: ", element.config?.label || 'Label'] })), element.elementId.includes('button') && (_jsxs("div", { children: ["\uD83D\uDD18 ", element.config?.text || 'Button'] })), element.elementId.includes('image') && (_jsx("div", { children: "\uD83D\uDDBC\uFE0F Image" })), element.elementId.includes('divider') && (_jsx("div", { children: "\u2796 Divider" })), element.elementId.includes('choiceSelect') && (_jsxs("div", { children: ["\u2611\uFE0F ", element.config?.label || 'Select'] })), element.elementId.includes('ratingStars') && (_jsxs("div", { children: ["\u2B50 ", element.config?.label || 'Rating'] }))] })] }));
};
// Drop zone canvas
const ToolCanvas = ({ elements, selectedElementId, onElementSelect, onElementAdd, onElementDelete }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'element',
        drop: (item) => {
            onElementAdd(item.elementId);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return (_jsx("div", { ref: drop, className: `
        min-h-96 rounded-lg border-2 border-dashed transition-all duration-200
        ${isOver
            ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/5'
            : 'border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]'}
      `, children: elements.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-96 text-center", children: _jsxs("div", { children: [_jsx(Layout, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "Build Your Tool" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Drag elements from the library to start building" })] }) })) : (_jsx("div", { className: "p-4", children: elements.map((element) => (_jsx(CanvasElement, { element: element, isSelected: selectedElementId === element.id, onSelect: () => onElementSelect(element.id), onDelete: () => onElementDelete(element.id) }, element.id))) })) }));
};
export const VisualToolBuilder = ({ onSave, onPreview, onDeploy, initialTool, availableSpaces = [] }) => {
    const [toolName, setToolName] = useState(initialTool?.name || 'My New Tool');
    const [toolDescription, setToolDescription] = useState(initialTool?.description || '');
    const [elements, setElements] = useState(initialTool?.elements || []);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [activeTab, setActiveTab] = useState('build');
    const [showDeployment, setShowDeployment] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    // Group elements by category
    const elementsByCategory = useMemo(() => {
        return ELEMENT_LIBRARY.reduce((acc, element) => {
            if (!acc[element.category]) {
                acc[element.category] = [];
            }
            acc[element.category].push(element);
            return acc;
        }, {});
    }, []);
    // Add element to canvas
    const handleElementAdd = useCallback((elementId) => {
        const elementDef = ELEMENT_LIBRARY.find(el => el.id === elementId);
        if (!elementDef)
            return;
        const newElement = {
            id: `${elementId}-${Date.now()}`,
            elementId: elementId,
            config: elementDef.defaultConfig,
            position: { x: 0, y: elements.length * 100 },
            order: elements.length,
            isVisible: true,
            isLocked: false
        };
        setElements(prev => [...prev, newElement]);
        setSelectedElementId(newElement.id);
    }, [elements.length]);
    // Delete element
    const handleElementDelete = useCallback((elementId) => {
        setElements(prev => prev.filter(el => el.id !== elementId));
        setSelectedElementId(null);
    }, []);
    // Update element config
    const handleElementConfigChange = useCallback((elementId, newConfig) => {
        setElements(prev => prev.map(el => el.id === elementId ? { ...el, config: newConfig } : el));
    }, []);
    // Create tool object
    const createTool = useCallback(() => {
        const createData = {
            name: toolName,
            description: toolDescription
        };
        const toolDefaults = createToolDefaults('user-id', createData);
        return {
            id: initialTool?.id || `tool-${Date.now()}`,
            ...toolDefaults,
            elements,
            createdAt: initialTool?.createdAt || new Date(),
            updatedAt: new Date()
        };
    }, [toolName, toolDescription, elements, initialTool]);
    // Handle save
    const handleSave = useCallback(() => {
        const tool = createTool();
        if (onSave) {
            onSave(tool);
        }
    }, [createTool, onSave]);
    // Handle preview
    const handlePreview = useCallback(() => {
        const tool = createTool();
        if (onPreview) {
            onPreview(tool);
        }
        setActiveTab('preview');
    }, [createTool, onPreview]);
    // Handle deployment
    const handleDeployment = useCallback(async (deploymentConfig) => {
        setIsDeploying(true);
        try {
            const tool = createTool();
            // First save the tool if it doesn't exist or has changes
            let savedTool = tool;
            if (!tool.id || JSON.stringify(elements) !== JSON.stringify(initialTool?.elements || [])) {
                const saveResult = initialTool?.id
                    ? await apiClient.updateTool(initialTool.id, tool)
                    : await apiClient.createTool({
                        name: tool.name,
                        description: tool.description,
                        isSpaceTool: true,
                        spaceId: deploymentConfig.spaceId,
                    });
                savedTool = saveResult.tool;
            }
            // Deploy the saved tool to the space using real API
            await apiClient.deployTool({
                toolId: savedTool.id,
                deployTo: 'space',
                targetId: deploymentConfig.spaceId,
                surface: 'tools',
                permissions: {
                    canView: deploymentConfig.permissions?.view?.includes('all') || true,
                    canInteract: deploymentConfig.permissions?.use?.length > 0 || true,
                    canEdit: deploymentConfig.permissions?.manage?.length > 0 || false,
                    allowedRoles: deploymentConfig.permissions?.use || ['member', 'moderator', 'admin'],
                },
                settings: {
                    showInDirectory: deploymentConfig.settings?.isActive !== false,
                    allowSharing: true,
                    collectAnalytics: deploymentConfig.settings?.trackUsage !== false,
                    notifyOnInteraction: false,
                },
                config: {
                    displayName: deploymentConfig.customization?.displayName || tool.name,
                    description: deploymentConfig.customization?.description || tool.description,
                    category: deploymentConfig.customization?.category || 'productivity',
                    autoLaunch: deploymentConfig.settings?.autoLaunch || false,
                    requirePermission: deploymentConfig.settings?.requirePermission || false,
                    maxConcurrentUsers: deploymentConfig.settings?.maxConcurrentUsers,
                },
            });
            // Call original onDeploy callback if provided
            if (onDeploy) {
                await onDeploy(savedTool, deploymentConfig);
            }
            setShowDeployment(false);
        }
        catch (error) {
            console.error('Deployment failed:', error);
            throw error; // Let the deployment component handle the error display
        }
        finally {
            setIsDeploying(false);
        }
    }, [createTool, elements, initialTool, onDeploy]);
    const currentTool = createTool();
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "border-b border-[var(--hive-border-default)] p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1 max-w-md", children: [_jsx("input", { type: "text", value: toolName, onChange: (e) => setToolName(e.target.value), className: "text-xl font-semibold bg-transparent border-none outline-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] w-full", placeholder: "Tool name" }), _jsx("input", { type: "text", value: toolDescription, onChange: (e) => setToolDescription(e.target.value), className: "text-sm bg-transparent border-none outline-none text-[var(--hive-text-secondary)] placeholder-[var(--hive-text-tertiary)] w-full mt-1", placeholder: "Tool description" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex bg-[var(--hive-background-secondary)] rounded-lg p-1", children: [_jsxs("button", { onClick: () => setActiveTab('build'), className: `px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'build'
                                                    ? 'bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]'
                                                    : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Settings, { className: "w-4 h-4 inline mr-1" }), "Build"] }), _jsxs("button", { onClick: () => setActiveTab('preview'), className: `px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'preview'
                                                    ? 'bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]'
                                                    : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Eye, { className: "w-4 h-4 inline mr-1" }), "Preview"] })] }), _jsxs(Button, { variant: "secondary", onClick: handlePreview, children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Test"] }), _jsxs(Button, { variant: "secondary", onClick: () => setShowDeployment(true), disabled: elements.length === 0, children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Deploy"] }), _jsxs(Button, { onClick: handleSave, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save"] })] })] }) }), _jsx("div", { className: "flex-1 flex overflow-hidden", children: activeTab === 'build' ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-80 border-r border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] overflow-y-auto", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Element Library" }), Object.entries(elementsByCategory).map(([category, categoryElements]) => (_jsxs("div", { className: "mb-6", children: [_jsxs("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-3 flex items-center", children: [category, _jsx(ChevronDown, { className: "w-4 h-4 ml-1" })] }), _jsx("div", { className: "space-y-2", children: categoryElements.map((element) => (_jsx(DraggableElement, { element: element }, element.id))) })] }, category)))] }) }), _jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: _jsx(ToolCanvas, { elements: elements, selectedElementId: selectedElementId, onElementSelect: setSelectedElementId, onElementAdd: handleElementAdd, onElementDelete: handleElementDelete }) }), _jsx(ElementConfigPanel, { element: elements.find(el => el.id === selectedElementId) || null, elementDefinition: selectedElementId
                                    ? ELEMENT_LIBRARY.find(lib => lib.id === elements.find(el => el.id === selectedElementId)?.elementId) || null
                                    : null, onChange: (newConfig) => {
                                    if (selectedElementId) {
                                        handleElementConfigChange(selectedElementId, newConfig);
                                    }
                                }, onClose: () => setSelectedElementId(null) })] })) : (
                    /* Preview Mode */
                    _jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: _jsx("div", { className: "max-w-2xl mx-auto", children: _jsx(LiveToolRuntime, { tool: currentTool, readOnly: false, showDebugInfo: true, onDataSubmit: (data) => {
                                    console.log('Tool submitted:', data);
                                    alert('Tool test completed! Check console for submission data.');
                                } }) }) })) }), showDeployment && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsx("div", { className: "bg-[var(--hive-background-primary)] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden", children: _jsx(SpaceToolDeployment, { tool: currentTool, availableSpaces: availableSpaces, onDeploy: handleDeployment, onCancel: () => setShowDeployment(false), isDeploying: isDeploying }) }) }))] }) }));
};
//# sourceMappingURL=visual-tool-builder.js.map