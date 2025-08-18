import React from "react";
export interface ClaimSpaceStepProps {
    spaceName: string;
    spaceDescription: string;
    onSpaceNameChange: (value: string) => void;
    onSpaceDescriptionChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    onBack?: () => void;
}
export declare const ClaimSpaceStep: React.FC<ClaimSpaceStepProps>;
//# sourceMappingURL=claim-space-step.d.ts.map