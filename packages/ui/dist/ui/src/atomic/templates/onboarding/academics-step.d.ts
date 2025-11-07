import React from 'react';
interface Option {
    value: string;
    label: string;
}
interface AcademicsStepProps {
    academicLevel: string;
    graduationYear: string;
    livingSituation: string;
    major: string;
    academicOptions: Option[];
    graduationOptions: Option[];
    livingOptions: Option[];
    onAcademicLevelChange: (value: string) => void;
    onGraduationYearChange: (value: string) => void;
    onLivingSituationChange: (value: string) => void;
    onMajorChange: (value: string) => void;
}
export declare const AcademicsStep: React.FC<AcademicsStepProps>;
export {};
//# sourceMappingURL=academics-step.d.ts.map