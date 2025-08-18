import React from 'react';
export type SpaceCategoryType = 'university' | 'residential' | 'greek' | 'student';
export interface SpaceCategoryData {
    type: SpaceCategoryType;
    title: string;
    description: string;
    icon: React.ReactNode;
    count: number;
    gradient: string;
    accentColor: string;
    examples: string[];
}
export interface SpaceCategoryCardProps {
    category: SpaceCategoryData;
    onClick?: (type: SpaceCategoryType) => void;
    variant?: 'default' | 'featured';
    className?: string;
}
export declare const SPACE_CATEGORIES: Record<SpaceCategoryType, Omit<SpaceCategoryData, 'count'>>;
export declare const SpaceCategoryCard: React.FC<SpaceCategoryCardProps>;
export default SpaceCategoryCard;
//# sourceMappingURL=space-category-card.d.ts.map