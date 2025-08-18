import React from "react";
export interface BentoCard {
    id: string;
    size: "1x1" | "2x1" | "2x2" | "1x2";
    priority: number;
    component: React.ComponentType<any>;
    permissions?: string[];
    isLocked?: boolean;
    title?: string;
}
interface BentoGridProps {
    cards: BentoCard[];
    className?: string;
}
export declare function BentoGrid({ cards, className }: BentoGridProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=bento-grid.d.ts.map