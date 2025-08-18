import React from "react";
export interface InterestsStepProps {
    initialInterests: string[];
    onSubmit: (data: {
        interests: string[];
    } | null) => void;
    onBack?: () => void;
}
export declare const InterestsStep: React.FC<InterestsStepProps>;
//# sourceMappingURL=interests-step.d.ts.map