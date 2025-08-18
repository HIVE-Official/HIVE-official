import React from 'react';
export interface Feature {
    icon: string;
    title: string;
    description: string;
    highlight?: boolean;
}
export interface FeaturesSectionProps {
    features?: Feature[];
    className?: string;
}
export declare const FeaturesSection: React.FC<FeaturesSectionProps>;
//# sourceMappingURL=features-section.d.ts.map