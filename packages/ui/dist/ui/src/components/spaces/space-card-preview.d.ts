import React from 'react';
export interface SpaceCardPreviewProps {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
    potentialMembers: number;
    anticipatedEvents?: number;
    category: string;
    keywords?: string[];
    onRequestActivation?: () => void;
    onLearnMore?: () => void;
    className?: string;
}
export declare const SpaceCardPreview: React.FC<SpaceCardPreviewProps>;
//# sourceMappingURL=space-card-preview.d.ts.map