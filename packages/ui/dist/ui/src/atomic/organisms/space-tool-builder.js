/**
 * Space Tool Builder
 *
 * ON-BRAND wrapper around HiveLab for creating tools within a space context.
 * This is what space leaders see - NOT a generic builder.
 *
 * ## Design Philosophy
 * - HiveLab = infrastructure (low-level primitives)
 * - SpaceToolBuilder = branded interface (space-contextual)
 * - Always shows which space you're building for
 * - Tools auto-save to the space
 * - Uses space colors and branding
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { HiveLabProvider, useHiveLab, useHiveLabActions } from '../../contexts/hivelab-context';
import { HiveLabToolbar } from './hivelab/hivelab-toolbar';
import { HiveLabCanvas } from './hivelab/hivelab-canvas';
import { HiveLabElementLibrary } from './hivelab/hivelab-element-library';
import { HiveLabPropertiesPanel } from './hivelab/hivelab-properties-panel';
import { ELEMENT_LIBRARY } from '../../lib/hivelab-element-library';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { ArrowLeft, AlertCircle } from 'lucide-react';
/**
 * Internal builder (wrapped by provider)
 */
function SpaceToolBuilderInternal({ space, onSave, onPreview, onExit, className, }) {
    const state = useHiveLab();
    const actions = useHiveLabActions();
    const [libraryCollapsed, setLibraryCollapsed] = React.useState(false);
    const [propertiesCollapsed, setPropertiesCollapsed] = React.useState(false);
    const currentPage = state.tool.pages.find((p) => p.id === state.currentPage);
    const selectedElement = currentPage?.elements.find((el) => state.selectedElements.includes(el.id)) || null;
    // Check if tool has unsaved changes
    const hasChanges = state.history.past.length > 0;
    // Handlers
    const handleSave = () => {
        // Ensure tool has space context
        const toolWithSpaceContext = {
            ...state.tool,
            spaceId: space.id,
            visibility: 'space',
        };
        onSave?.(toolWithSpaceContext);
    };
    const handlePreview = () => {
        onPreview?.(state.tool);
    };
    const handleExit = () => {
        if (hasChanges && !confirm('Exit builder? Unsaved changes will be lost.')) {
            return;
        }
        onExit?.();
    };
    const handleElementSelect = (elementDef) => {
        const viewportCenter = {
            x: -state.viewport.x / state.viewport.zoom + 400,
            y: -state.viewport.y / state.viewport.zoom + 300,
        };
        const newElement = {
            id: `el-${Date.now()}`,
            type: elementDef.category,
            name: elementDef.name,
            icon: elementDef.icon,
            description: elementDef.description,
            x: viewportCenter.x,
            y: viewportCenter.y,
            width: elementDef.defaultWidth,
            height: elementDef.defaultHeight,
            inputs: elementDef.defaultInputs.map((input, i) => ({
                ...input,
                id: `el-${Date.now()}-in-${i}`,
            })),
            outputs: elementDef.defaultOutputs.map((output, i) => ({
                ...output,
                id: `el-${Date.now()}-out-${i}`,
            })),
            config: { ...elementDef.defaultConfig },
            complexity: elementDef.complexity,
            isNew: elementDef.isNew,
            pageId: state.currentPage,
        };
        actions.addElement(newElement, state.currentPage);
        actions.selectElements([newElement.id]);
    };
    const handlePropertyChange = (property, value) => {
        if (!selectedElement)
            return;
        actions.updateElement(selectedElement.id, state.currentPage, { [property]: value });
    };
    const handleElementClick = (elementId, e) => {
        e.stopPropagation();
        if (e.metaKey || e.ctrlKey) {
            const current = [...state.selectedElements];
            actions.selectElements(current.includes(elementId)
                ? current.filter((id) => id !== elementId)
                : [...current, elementId]);
        }
        else {
            actions.selectElements([elementId]);
        }
    };
    return (_jsxs("div", { className: cn('space-tool-builder h-full w-full flex flex-col bg-[#0c0c0c]', className), children: [_jsxs("div", { className: "px-6 py-3 border-b flex items-center justify-between", style: { backgroundColor: `${space.color}15` }, children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: handleExit, className: "gap-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to ", space.name] }), _jsx("div", { className: "h-6 w-px bg-white/8" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: space.emoji }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-white/70", children: "Building for" }), _jsx("div", { className: "text-sm font-semibold", children: space.name })] })] }), hasChanges && (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-6 w-px bg-white/8" }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-white/70", children: [_jsx(AlertCircle, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Unsaved changes" })] })] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [state.tool.status === 'draft' && _jsx(Badge, { variant: "freshman", children: "Draft" }), _jsxs(Badge, { style: { backgroundColor: space.color, color: 'white' }, children: [space.memberCount, " members"] })] })] }), _jsx(HiveLabToolbar, { toolName: state.tool.name, canUndo: state.history.past.length > 0, canRedo: state.history.future.length > 0, zoom: state.viewport.zoom, isSaved: !hasChanges, showGrid: state.showGrid, onUndo: actions.undo, onRedo: actions.redo, onSave: handleSave, onRun: handlePreview, onZoomIn: () => actions.updateViewport({ zoom: Math.min(state.viewport.zoom + 0.25, 4) }), onZoomOut: () => actions.updateViewport({ zoom: Math.max(state.viewport.zoom - 0.25, 0.1) }), onZoomToFit: () => actions.updateViewport({ x: 0, y: 0, zoom: 1 }), onToggleGrid: actions.toggleGrid }), _jsxs("div", { className: "flex-1 flex relative overflow-hidden", children: [_jsx(HiveLabElementLibrary, { elements: ELEMENT_LIBRARY, onElementSelect: handleElementSelect, position: "left", width: 280, isCollapsed: libraryCollapsed, onToggleCollapse: () => setLibraryCollapsed(!libraryCollapsed) }), _jsx("div", { className: "flex-1", children: _jsx(HiveLabCanvas, { pages: state.tool.pages, currentPageId: state.currentPage, elements: currentPage?.elements || [], connections: currentPage?.connections || [], viewport: state.viewport, selectedElementIds: state.selectedElements, selectedConnectionId: state.selectedConnection, showGrid: state.showGrid, showMiniMap: true, showZoomControls: true, onViewportChange: (viewport) => actions.updateViewport(viewport), onElementClick: handleElementClick, onConnectionClick: (id, e) => {
                                e.stopPropagation();
                                actions.selectConnection(id);
                            }, onCanvasClick: () => actions.clearSelection(), onPageClick: (id) => actions.setCurrentPage(id), onZoomIn: () => actions.updateViewport({ zoom: Math.min(state.viewport.zoom + 0.25, 4) }), onZoomOut: () => actions.updateViewport({ zoom: Math.max(state.viewport.zoom - 0.25, 0.1) }), onZoomToFit: () => actions.updateViewport({ x: 0, y: 0, zoom: 1 }) }) }), _jsx(HiveLabPropertiesPanel, { selectedElement: selectedElement, allElements: currentPage?.elements, onPropertyChange: handlePropertyChange, onDeleteElement: () => {
                            if (selectedElement) {
                                actions.removeElement(selectedElement.id, state.currentPage);
                                actions.clearSelection();
                            }
                        }, onDuplicateElement: () => {
                            if (selectedElement) {
                                actions.duplicateElement(selectedElement.id, state.currentPage);
                            }
                        }, position: "right", width: 320, isCollapsed: propertiesCollapsed, onToggleCollapse: () => setPropertiesCollapsed(!propertiesCollapsed) })] })] }));
}
/**
 * Space Tool Builder with Context Provider
 *
 * THIS is the component spaces use, not HiveLabBuilderLayout.
 */
export function SpaceToolBuilder({ space, initialTool, onSave, onPreview, onExit, className, }) {
    return (_jsx(HiveLabProvider, { initialTool: initialTool, children: _jsx(SpaceToolBuilderInternal, { space: space, onSave: onSave, onPreview: onPreview, onExit: onExit, className: className }) }));
}
SpaceToolBuilder.displayName = 'SpaceToolBuilder';
//# sourceMappingURL=space-tool-builder.js.map