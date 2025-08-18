import React from "react";
import { StepProps } from "./types";
export interface SpaceSelectionStepProps extends StepProps {
    initialData?: {
        spaceCategory?: string;
        selectedSpace?: string;
        customSpaceName?: string;
        customSpaceDescription?: string;
    };
}
export declare const SpaceSelectionStep: React.FC<SpaceSelectionStepProps>;
//# sourceMappingURL=space-selection-step.d.ts.map