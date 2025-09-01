'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Folder, FolderOpen, File, Search, MoreHorizontal, Check } from 'lucide-react';
// Tree View Variants
const treeViewVariants = cva('w-full', {
    variants: {
        variant: {
            default: 'text-[var(--hive-text-primary)]',
            minimal: 'text-[var(--hive-text-secondary)]',
            prominent: 'text-[var(--hive-text-primary)] font-medium',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
        density: {
            compact: 'space-y-1',
            default: 'space-y-2',
            spacious: 'space-y-3',
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
        density: 'default',
    },
});
const TreeNodeComponent = ({ node, level, isLast, onToggle, onSelect, onContextMenu, renderNode, showLines, showIcons, selectable, multiSelect, }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.isExpanded || false;
    const isSelected = node.isSelected || false;
    const isDisabled = node.isDisabled || false;
    const handleToggle = (e) => {
        e.stopPropagation();
        if (hasChildren && !isDisabled) {
            onToggle(node.id);
        }
    };
    const handleSelect = (e) => {
        if (!isDisabled) {
            onSelect(node.id, e);
        }
    };
    const handleContextMenu = (e) => {
        e.preventDefault();
        onContextMenu?.(node.id, e);
    };
    const getNodeIcon = () => {
        if (!showIcons)
            return null;
        if (hasChildren) {
            return isExpanded ? FolderOpen : Folder;
        }
        return node.icon || File;
    };
    const IconComponent = getNodeIcon();
    return (_jsxs("div", { className: "relative", children: [showLines && level > 0 && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-px bg-[var(--hive-border-default)]" })), _jsxs("div", { className: cn('flex items-center min-h-[32px] px-2 py-1 rounded-md cursor-pointer', 'hover:bg-[var(--hive-interactive-hover)] transition-colors duration-200', 'group', isSelected && 'bg-[var(--hive-interactive-active)] text-[var(--hive-text-primary)]', isDisabled && 'opacity-50 cursor-not-allowed', node.className), style: { paddingLeft: `${level * 20 + 8}px` }, onClick: handleSelect, onContextMenu: handleContextMenu, role: "treeitem", "aria-selected": isSelected, "aria-expanded": hasChildren ? isExpanded : undefined, "aria-disabled": isDisabled, children: [hasChildren && (_jsx("button", { onClick: handleToggle, className: cn('flex items-center justify-center w-4 h-4 mr-2 rounded', 'hover:bg-[var(--hive-interactive-hover)] transition-colors', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:ring-offset-1'), "aria-label": isExpanded ? 'Collapse' : 'Expand', children: _jsx(motion.div, { animate: { rotate: isExpanded ? 90 : 0 }, transition: { duration: 0.2 }, children: _jsx(ChevronRight, { className: "w-3 h-3" }) }) })), !hasChildren && _jsx("div", { className: "w-6 mr-2" }), selectable && (_jsx("div", { className: "mr-2", children: multiSelect ? (_jsx("div", { className: "w-4 h-4 border border-[var(--hive-border-primary)] rounded flex items-center justify-center", children: isSelected && (_jsx(Check, { className: "w-3 h-3 text-[var(--hive-brand-secondary)]" })) })) : (_jsx("div", { className: cn('w-4 h-4 rounded-full border-2', isSelected
                                ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]'
                                : 'border-[var(--hive-border-primary)]'), children: isSelected && (_jsx("div", { className: "w-2 h-2 bg-white rounded-full m-0.5" })) })) })), IconComponent && (_jsx(IconComponent, { className: "w-4 h-4 mr-2 text-[var(--hive-text-secondary)]" })), _jsx("div", { className: "flex-1 min-w-0", children: renderNode ? (renderNode(node, level)) : (_jsx("span", { className: "truncate", children: node.label })) }), _jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx("button", { className: "p-1 hover:bg-[var(--hive-interactive-hover)] rounded", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }) })] }), hasChildren && isExpanded && (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, children: node.children.map((child, index) => (_jsx(TreeNodeComponent, { node: child, level: level + 1, isLast: index === node.children.length - 1, onToggle: onToggle, onSelect: onSelect, onContextMenu: onContextMenu, renderNode: renderNode, showLines: showLines, showIcons: showIcons, selectable: selectable, multiSelect: multiSelect }, child.id))) }) }))] }));
};
// Main Tree View Component
export const TreeView = React.forwardRef(({ data, selectable = false, multiSelect = false, searchable = false, draggable = false, showLines = true, showIcons = true, defaultExpanded = [], defaultSelected = [], onNodeSelect, onNodeExpand, onNodeDrop, onSearch, renderNode, variant, size, density, className, ...props }, ref) => {
    const [expandedNodes, setExpandedNodes] = useState(new Set(defaultExpanded));
    const [selectedNodes, setSelectedNodes] = useState(new Set(defaultSelected));
    const [searchQuery, setSearchQuery] = useState('');
    const [dragState, setDragState] = useState({
        isDragging: false,
        draggedNodeId: null,
        dropTargetId: null,
        dropPosition: null,
    });
    // Process tree data with state
    const processedData = useMemo(() => {
        const processNode = (node) => ({
            ...node,
            isExpanded: expandedNodes.has(node.id),
            isSelected: selectedNodes.has(node.id),
            children: node.children ? node.children.map(processNode) : undefined,
        });
        return data.map(processNode);
    }, [data, expandedNodes, selectedNodes]);
    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery.trim())
            return processedData;
        const filterNode = (node) => {
            const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase());
            const filteredChildren = node.children
                ? node.children.map(filterNode).filter(Boolean)
                : undefined;
            if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
                return {
                    ...node,
                    children: filteredChildren,
                };
            }
            return null;
        };
        return processedData.map(filterNode).filter(Boolean);
    }, [processedData, searchQuery]);
    // Handle node expansion
    const handleToggle = useCallback((nodeId) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            }
            else {
                newSet.add(nodeId);
            }
            return newSet;
        });
        onNodeExpand?.(nodeId, !expandedNodes.has(nodeId));
    }, [expandedNodes, onNodeExpand]);
    // Handle node selection
    const handleSelect = useCallback((nodeId, event) => {
        if (event.ctrlKey || event.metaKey) {
            // Multi-select with modifier key
            setSelectedNodes(prev => {
                const newSet = new Set(prev);
                if (newSet.has(nodeId)) {
                    newSet.delete(nodeId);
                }
                else {
                    newSet.add(nodeId);
                }
                return newSet;
            });
        }
        else if (multiSelect) {
            // Multi-select mode
            setSelectedNodes(prev => {
                const newSet = new Set(prev);
                if (newSet.has(nodeId)) {
                    newSet.delete(nodeId);
                }
                else {
                    newSet.add(nodeId);
                }
                return newSet;
            });
        }
        else {
            // Single select mode
            setSelectedNodes(new Set([nodeId]));
        }
        onNodeSelect?.(nodeId, !selectedNodes.has(nodeId));
    }, [multiSelect, selectedNodes, onNodeSelect]);
    // Handle search
    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        onSearch?.(query);
    }, [onSearch]);
    // Handle context menu
    const handleContextMenu = useCallback((nodeId, event) => {
        // Implement context menu logic
        console.log('Context menu for node:', nodeId);
    }, []);
    return (_jsxs("div", { ref: ref, className: cn(treeViewVariants({ variant, size, density }), className), role: "tree", "aria-label": "Tree view", ...props, children: [searchable && (_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: "Search nodes...", value: searchQuery, onChange: (e) => handleSearch(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-md text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:border-transparent" })] }) })), _jsxs("div", { className: "relative", children: [filteredData.map((node, index) => (_jsx(TreeNodeComponent, { node: node, level: 0, isLast: index === filteredData.length - 1, onToggle: handleToggle, onSelect: handleSelect, onContextMenu: handleContextMenu, renderNode: renderNode, showLines: showLines, showIcons: showIcons, selectable: selectable, multiSelect: multiSelect }, node.id))), filteredData.length === 0 && (_jsx("div", { className: "text-center py-8 text-[var(--hive-text-muted)]", children: searchQuery ? 'No nodes match your search' : 'No nodes to display' }))] })] }));
});
TreeView.displayName = 'TreeView';
//# sourceMappingURL=tree-view.js.map