import React from 'react';
interface InterestsStepProps {
    options: string[];
    selected: string[];
    onToggle: (interest: string) => void;
    helperMessage?: string | null;
    minRequired?: number;
    maxAllowed?: number;
}
export declare const InterestsStep: React.FC<InterestsStepProps>;
export {};
//# sourceMappingURL=interests-step.d.ts.map