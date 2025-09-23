import React from 'react';
/**
 * Tech-Sleek Component Showcase
 * Demonstrates the Gold + Black + White branding system
 */
export declare const TechSleekButton: React.FC<{
    variant?: 'gold' | 'ghost' | 'black';
    children: React.ReactNode;
    onClick?: () => void;
}>;
export declare const TechSleekCard: React.FC<{
    title: string;
    description: string;
    metric?: string;
    active?: boolean;
}>;
export declare const TechSleekInput: React.FC<{
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>;
export declare const TechSleekBadge: React.FC<{
    children: React.ReactNode;
    variant?: 'gold' | 'white' | 'black';
}>;
export declare const TechSleekToggle: React.FC<{
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
}>;
export declare const TechSleekProgress: React.FC<{
    value: number;
    max?: number;
}>;
export declare const TechSleekDivider: React.FC<{
    variant?: 'solid' | 'gradient' | 'glow';
}>;
export declare const TechSleekLogo: React.FC<{
    size?: 'sm' | 'md' | 'lg';
}>;
export declare const TechSleekShowcase: React.FC;
export default TechSleekShowcase;
//# sourceMappingURL=tech-sleek-showcase.d.ts.map