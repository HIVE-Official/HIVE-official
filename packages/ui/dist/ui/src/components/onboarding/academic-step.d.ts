import React from 'react';
import type { AcademicLevel } from '@hive/core';
export interface AcademicStepProps {
    academicLevel: AcademicLevel;
    onAcademicLevelChange: (level: AcademicLevel) => void;
    graduationYear: number;
    onGraduationYearChange: (year: number) => void;
    onSubmit: () => void;
    onBack: () => void;
    isLoading: boolean;
    major?: string;
    onMajorChange?: (major: string) => void;
    classYear?: string;
    onClassYearChange?: (year: string) => void;
}
export declare const AcademicStep: React.FC<AcademicStepProps>;
//# sourceMappingURL=academic-step.d.ts.map