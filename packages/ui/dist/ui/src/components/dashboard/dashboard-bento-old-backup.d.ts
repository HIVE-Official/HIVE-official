import React from 'react';
export type GridSize = 'small' | 'medium' | 'large' | 'xl';
export type GridPosition = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface BentoGridItem {
    id: string;
    title: string;
    component: React.ReactNode;
    size: GridSize;
    position?: GridPosition;
    minSize?: GridSize;
    maxSize?: GridSize;
    resizable?: boolean;
    removable?: boolean;
    configurable?: boolean;
    priority?: number;
    category?: string;
    description?: string;
    icon?: React.ReactNode;
}
export interface BentoGridLayout {
    id: string;
    name: string;
    items: BentoGridItem[];
    columns: number;
    gap: number;
    responsive?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
}
interface BentoGridProps {
    layout: BentoGridLayout;
    onLayoutChange?: (newLayout: BentoGridLayout) => void;
    onItemResize?: (itemId: string, newSize: GridSize) => void;
    onItemRemove?: (itemId: string) => void;
    onItemAdd?: () => void;
    onItemConfigure?: (itemId: string) => void;
    editable?: boolean;
    className?: string;
}
export declare function BentoGrid({ layout, onLayoutChange, onItemResize, onItemRemove, onItemAdd, onItemConfigure, editable, className }: BentoGridProps): import("react/jsx-runtime").JSX.Element;
export declare const defaultLayouts: Record<string, BentoGridLayout>;
export declare const createGridItem: (id: string, title: string, component: React.ReactNode, options?: Partial<BentoGridItem>) => BentoGridItem;
export declare const optimizeLayout: (items: BentoGridItem[], columns: number) => BentoGridItem[];
export default BentoGrid;
//# sourceMappingURL=dashboard-bento-old-backup.d.ts.map