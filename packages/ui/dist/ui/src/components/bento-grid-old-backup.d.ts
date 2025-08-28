import React from 'react';
export type BentoCardSize = 'sm' | 'md' | 'lg' | 'xl';
export type BentoCardType = 'avatar' | 'calendar' | 'tools' | 'spaces' | 'activity' | 'social' | 'ghostmode' | 'hivelab' | 'analytics' | 'leadership';
export interface BentoCard {
    id: string;
    type: BentoCardType;
    title: string;
    size: BentoCardSize;
    isVisible: boolean;
    isLocked?: boolean;
    isBuilderOnly?: boolean;
    comingSoon?: boolean;
    children: React.ReactNode;
    onResize?: (newSize: BentoCardSize) => void;
    onToggleVisibility?: () => void;
    onSettings?: () => void;
}
export interface BentoGridProps {
    cards: BentoCard[];
    isCustomizable?: boolean;
    isEditMode?: boolean;
    onCardReorder?: (cards: BentoCard[]) => void;
    onToggleEditMode?: () => void;
    className?: string;
}
export declare const BentoGrid: React.FC<BentoGridProps>;
export default BentoGrid;
//# sourceMappingURL=bento-grid-old-backup.d.ts.map