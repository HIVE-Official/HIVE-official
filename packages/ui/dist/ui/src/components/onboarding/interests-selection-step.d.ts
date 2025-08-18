import React from 'react';
export interface InterestsSelectionStepProps {
    selectedInterests: string[];
    onInterestToggle: (interest: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    isLoading: boolean;
    interestCategories: Record<string, string[]>;
    minInterests?: number;
}
export declare const InterestsSelectionStep: React.FC<InterestsSelectionStepProps>;
//# sourceMappingURL=interests-selection-step.d.ts.map