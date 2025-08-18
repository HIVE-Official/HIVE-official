import React from "react";
import { StepProps } from "./types";
export interface AcademicCardStepProps extends StepProps {
    initialData?: {
        academicLevel?: string;
        majors?: string[];
        graduationYear?: number;
    };
}
export declare const AcademicCardStep: React.FC<AcademicCardStepProps>;
//# sourceMappingURL=academic-card-step.d.ts.map