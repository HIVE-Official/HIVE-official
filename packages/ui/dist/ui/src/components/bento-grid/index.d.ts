/**
 * HIVE Unified Bento Grid System
 * Production-ready, mobile-first, responsive grid for campus profiles
 */
import React from 'react';
export type BentoCardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero';
export type BentoCardPriority = 'essential' | 'high' | 'medium' | 'low' | 'hidden';
export interface BentoCardProps {
    id: string;
    title: string;
    size: BentoCardSize;
    priority: BentoCardPriority;
    children: React.ReactNode;
    isVisible?: boolean;
    isLocked?: boolean;
    isBuilderOnly?: boolean;
    comingSoon?: boolean;
    onResize?: (newSize: BentoCardSize) => void;
    onToggleVisibility?: () => void;
    onRemove?: () => void;
    onConfigure?: () => void;
    className?: string;
    icon?: React.ReactNode;
    description?: string;
    badge?: {
        text: string;
        variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    };
}
export interface BentoGridProps {
    cards: BentoCardProps[];
    columns?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gap?: number;
    minCardHeight?: number;
    isCustomizable?: boolean;
    isEditMode?: boolean;
    showHiddenCards?: boolean;
    onCardReorder?: (newOrder: string[]) => void;
    onToggleEditMode?: () => void;
    onCardUpdate?: (cardId: string, updates: Partial<BentoCardProps>) => void;
    className?: string;
}
export declare const BentoGrid: React.FC<BentoGridProps>;
export declare const createBentoCard: (id: string, title: string, size?: BentoCardSize, priority?: BentoCardPriority, overrides?: Partial<BentoCardProps>) => BentoCardProps;
export declare const CAMPUS_CARD_PRESETS: {
    readonly avatar: BentoCardProps;
    readonly calendar: BentoCardProps;
    readonly spaces: BentoCardProps;
    readonly tools: BentoCardProps;
    readonly activity: BentoCardProps;
    readonly analytics: BentoCardProps;
    readonly social: BentoCardProps;
    readonly hivelab: BentoCardProps;
};
export default BentoGrid;
//# sourceMappingURL=index.d.ts.map