/**
 * HiveLab Builder Layout
 *
 * Complete full-screen visual no-code tool builder.
 * Combines toolbar, canvas, element library, and properties panel
 * into a cohesive Figma-like building experience.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '@/lib/utils';
import { HiveLabProvider, useHiveLab } from '@/contexts/hivelab-context';
import { HiveLabToolbar } from '@/atomic/organisms/hivelab/hivelab-toolbar';
import { HiveLabCanvas } from '@/atomic/organisms/hivelab/hivelab-canvas';
import { HiveLabElementLibrary } from '@/atomic/organisms/hivelab/hivelab-element-library';
import { HiveLabPropertiesPanel } from '@/atomic/organisms/hivelab/hivelab-properties-panel';
import { ELEMENT_LIBRARY } from '@/lib/hivelab-element-library';
/**
 * Internal builder component (wrapped by provider)
 */
function HiveLabBuilderInternal({ onSave, onRun, onExport, onImport, onDelete, className, }) {
    const { state, actions } = useHiveLab();
    // Panel states
    const [libraryCollapsed, setLibraryCollapsed] = React.useState(false);
    const [propertiesCollapsed, setPropertiesCollapsed] = React.useState(false);
    // Get current page
    const currentPage = state.tool.pages.find((p) => p.id === state.currentPage);
    // Get selected element
    const selectedElement = currentPage?.elements.find((el) => state.selectedElements.includes(el.id)) || null;
    // Toolbar handlers
    const handleSave = () => {
        onSave?.(state.tool);
    };
    const handleRun = () => {
        onRun?.(state.tool);
    };
    const handleExport = () => {
        onExport?.(state.tool);
    };
    const handleImport = () => {
        onImport?.();
    };
    const handleDelete = () => {
        onDelete?.(state.tool);
    };
    const handleDuplicate = () => {
        // Duplicate the tool
        const newTool = {
            ...state.tool,
            id: `${state.tool.id}-copy`,
            name: `${state.tool.name} (Copy)`,
        };
        actions.loadTool(newTool);
    };
    const handleZoomIn = () => {
        actions.updateViewport({
            zoom: Math.min(state.viewport.zoom + 0.25, 4),
        });
    };
    const handleZoomOut = () => {
        actions.updateViewport({
            zoom: Math.max(state.viewport.zoom - 0.25, 0.1),
        });
    };
    const handleZoomToFit = () => {
        actions.updateViewport({ x: 0, y: 0, zoom: 1 });
    };
    const handleToggleGrid = () => {
        actions.toggleGrid();
    };
    // Element library handlers
    const handleElementSelect = (elementDef) => {
        // Add element to center of current viewport
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
    // Properties panel handlers
    const handlePropertyChange = (property, value) => {
        if (!selectedElement)
            return;
        actions.updateElement(selectedElement.id, state.currentPage, {
            [property]: value,
        });
    };
    const handleDeleteElement = () => {
        if (!selectedElement)
            return;
        actions.removeElement(selectedElement.id, state.currentPage);
        actions.clearSelection();
    };
    const handleDuplicateElement = () => {
        if (!selectedElement)
            return;
        actions.duplicateElement(selectedElement.id, state.currentPage);
    };
    // Canvas handlers
    const handleElementClick = (elementId, e) => {
        e.stopPropagation();
        if (e.metaKey || e.ctrlKey) {
            // Multi-select
            const currentSelection = [...state.selectedElements];
            if (currentSelection.includes(elementId)) {
                actions.selectElements(currentSelection.filter((id) => id !== elementId));
            }
            else {
                actions.selectElements([...currentSelection, elementId]);
            }
        }
        else {
            // Single select
            actions.selectElements([elementId]);
        }
    };
    const handleConnectionClick = (connectionId, e) => {
        e.stopPropagation();
        actions.selectConnection(connectionId);
    };
    const handleCanvasClick = () => {
        actions.clearSelection();
    };
    const handlePageClick = (pageId) => {
        actions.setCurrentPage(pageId);
    };
    // Check if tool has unsaved changes (simplified - would need proper change tracking)
    const isSaved = state.history.past.length === 0 && state.history.future.length === 0;
    return (_jsxs("div", { className: cn('hivelab-builder h-screen w-full flex flex-col bg-background', className), children: [_jsx(HiveLabToolbar, { toolName: state.tool.name, canUndo: state.history.past.length > 0, canRedo: state.history.future.length > 0, zoom: state.viewport.zoom, isSaved: isSaved, showGrid: state.showGrid, onUndo: actions.undo, onRedo: actions.redo, onSave: handleSave, onRun: handleRun, onSettings: () => console.log('Settings'), onExport: handleExport, onImport: handleImport, onDelete: handleDelete, onDuplicate: handleDuplicate, onZoomIn: handleZoomIn, onZoomOut: handleZoomOut, onZoomToFit: handleZoomToFit, onToggleGrid: handleToggleGrid, onViewCode: () => console.log('View code'), onViewDocs: () => console.log('View docs') }), _jsxs("div", { className: "flex-1 flex relative overflow-hidden", children: [_jsx(HiveLabElementLibrary, { elements: ELEMENT_LIBRARY, onElementSelect: handleElementSelect, position: "left", width: 280, isCollapsed: libraryCollapsed, onToggleCollapse: () => setLibraryCollapsed(!libraryCollapsed) }), _jsx("div", { className: "flex-1", children: _jsx(HiveLabCanvas, { pages: state.tool.pages, currentPageId: state.currentPage, elements: currentPage?.elements || [], connections: currentPage?.connections || [], viewport: state.viewport, selectedElementIds: state.selectedElements, selectedConnectionId: state.selectedConnection, showGrid: state.showGrid, showMiniMap: true, showZoomControls: true, onViewportChange: (viewport) => actions.updateViewport(viewport), onElementClick: handleElementClick, onConnectionClick: handleConnectionClick, onCanvasClick: handleCanvasClick, onPageClick: handlePageClick, onZoomIn: handleZoomIn, onZoomOut: handleZoomOut, onZoomToFit: handleZoomToFit }) }), _jsx(HiveLabPropertiesPanel, { selectedElement: selectedElement, allElements: currentPage?.elements, onPropertyChange: handlePropertyChange, onDeleteElement: handleDeleteElement, onDuplicateElement: handleDuplicateElement, position: "right", width: 320, isCollapsed: propertiesCollapsed, onToggleCollapse: () => setPropertiesCollapsed(!propertiesCollapsed) })] })] }));
}
/**
 * HiveLab Builder Layout with Context Provider
 */
export function HiveLabBuilderLayout({ initialTool, onSave, onRun, onExport, onImport, onDelete, className, }) {
    return (_jsx(HiveLabProvider, { initialTool: initialTool, children: _jsx(HiveLabBuilderInternal, { onSave: onSave, onRun: onRun, onExport: onExport, onImport: onImport, onDelete: onDelete, className: className }) }));
}
HiveLabBuilderLayout.displayName = 'HiveLabBuilderLayout';
//# sourceMappingURL=hivelab-builder-layout.js.map