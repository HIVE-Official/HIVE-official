import React from 'react';
type UserRole = 'student' | 'faculty' | 'alumni';
interface WelcomeRoleStepProps {
    onRoleSelect: (role: UserRole, data?: {
        firstName: string;
        lastName: string;
        role: string;
        selectedSpaceId: string;
    }) => void;
    schoolName: string;
    userEmail: string;
}
export declare const WelcomeRoleStep: React.FC<WelcomeRoleStepProps>;
export {};
//# sourceMappingURL=welcome-role-step.d.ts.map