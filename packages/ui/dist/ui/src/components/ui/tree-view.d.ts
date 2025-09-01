import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export interface TreeNode {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    children?: TreeNode[];
    data?: Record<string, any>;
    isExpanded?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isDraggable?: boolean;
    isDroppable?: boolean;
    className?: string;
}
export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof treeViewVariants> {
    data: TreeNode[];
    selectable?: boolean;
    multiSelect?: boolean;
    searchable?: boolean;
    draggable?: boolean;
    showLines?: boolean;
    showIcons?: boolean;
    defaultExpanded?: string[];
    defaultSelected?: string[];
    onNodeSelect?: (nodeId: string, isSelected: boolean) => void;
    onNodeExpand?: (nodeId: string, isExpanded: boolean) => void;
    onNodeDrop?: (sourceId: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
    onSearch?: (query: string) => void;
    renderNode?: (node: TreeNode, level: number) => React.ReactNode;
    className?: string;
}
declare const treeViewVariants: (props?: ({
    variant?: "default" | "minimal" | "prominent" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    density?: "default" | "compact" | "spacious" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const TreeView: React.ForwardRefExoticComponent<TreeViewProps & React.RefAttributes<HTMLDivElement>>;
export type { TreeNode, TreeViewProps };
//# sourceMappingURL=tree-view.d.ts.map