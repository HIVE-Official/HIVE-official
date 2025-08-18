import React from 'react';
export type UserRole = 'student' | 'faculty' | 'alumni';
interface RoleSelectionStepProps {
    onRoleSelect: (role: UserRole) => void;
    schoolName: string;
}
export declare const RoleSelectionStep: React.FC<RoleSelectionStepProps>;
export {};
//# sourceMappingURL=role-selection-step.d.ts.map