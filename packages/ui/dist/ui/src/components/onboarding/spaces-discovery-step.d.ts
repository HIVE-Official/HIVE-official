import React from 'react';
interface SpacesDiscoveryStepProps {
    onSpacesChange: (spaceIds: string[]) => void;
    onContinue: () => void;
    selectedSpaces?: string[];
    userInterests?: string[];
    userRole?: string;
    className?: string;
}
export declare const SpacesDiscoveryStep: React.FC<SpacesDiscoveryStepProps>;
export {};
//# sourceMappingURL=spaces-discovery-step.d.ts.map