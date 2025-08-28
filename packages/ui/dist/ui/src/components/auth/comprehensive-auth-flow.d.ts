import React from 'react';
export type UserType = 'STUDENT' | 'FACULTY' | 'STAFF' | 'ALUMNI' | 'NOT_ELIGIBLE';
export type AuthStep = 'entry' | 'user-type-detection' | 'student-flow' | 'faculty-warning' | 'faculty-setup' | 'alumni-rejection' | 'not-eligible' | 'verification' | 'complete';
interface AuthResult {
    success: boolean;
    user: {
        id: string;
        email: string;
        userType: UserType;
        userData: {
            name?: string;
            profileComplete: boolean;
            onboardingStep: number;
            department?: string;
            departmentId?: string;
            role?: string;
            office?: string;
            spaceRequests?: string[];
            facultyId?: string;
            major?: string;
            majorId?: string;
            classYear?: string;
            graduationYear?: number;
            academicLevel?: 'undergraduate' | 'graduate' | 'phd';
            studentId?: string;
            universityId: string;
            campusId: string;
            createdAt: string;
            updatedAt: string;
            lastLogin?: string;
        };
    };
    error?: string;
    requiresOnboarding?: boolean;
}
interface ComprehensiveAuthFlowProps {
    onAuthComplete?: (result: AuthResult) => void;
    onStartOnboarding?: (userType: UserType, email: string, userData?: any) => void;
    mockMode?: boolean;
    apiEndpoint?: string;
    universityId?: string;
    campusId?: string;
}
export declare const ComprehensiveAuthFlow: React.FC<ComprehensiveAuthFlowProps>;
export {};
//# sourceMappingURL=comprehensive-auth-flow.d.ts.map