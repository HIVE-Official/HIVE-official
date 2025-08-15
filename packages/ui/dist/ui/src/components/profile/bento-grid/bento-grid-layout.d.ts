import React from 'react';
export interface GridItem {
    id: string;
    cardType: 'avatar' | 'calendar' | 'notifications' | 'spaces' | 'ghostMode' | 'hiveLab';
    position: {
        x: number;
        y: number;
    };
    size: {
        width: 1 | 2;
        height: 1 | 2;
    };
    isVisible: boolean;
    settings?: Record<string, any>;
}
export interface BentoGridProps {
    items: GridItem[];
    isEditMode: boolean;
    onItemsChange: (items: GridItem[]) => void;
    onEditModeChange: (isEdit: boolean) => void;
    className?: string;
    maxColumns?: number;
    children?: React.ReactNode;
}
export declare function BentoGridLayout({ items, isEditMode, onItemsChange, onEditModeChange, className, maxColumns, children }: BentoGridProps): import("react/jsx-runtime").JSX.Element;
export declare function useBentoGrid(initialItems?: GridItem[]): {
    items: GridItem[];
    isEditMode: boolean;
    updateItems: (newItems: GridItem[]) => void;
    toggleEditMode: () => void;
    addCard: (cardType: GridItem["cardType"]) => void;
    removeCard: (id: string) => void;
    updateCardSettings: (id: string, settings: Record<string, any>) => void;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
//# sourceMappingURL=bento-grid-layout.d.ts.map