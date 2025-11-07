export type OnboardingUserType = 'student' | 'alumni' | 'faculty';
export type StepId = 'welcome' | 'role' | 'profile' | 'academics' | 'interests' | 'legal';
export interface StepConfig {
    id: StepId;
    title: string;
    description: string;
}
export type HandleStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';
export interface OnboardingState {
    userType: OnboardingUserType | null;
    firstName: string;
    lastName: string;
    fullName: string;
    handle: string;
    academicLevel: string;
    major: string;
    graduationYear: string;
    livingSituation: string;
    interests: string[];
    hasConsented: boolean;
    acceptedPrivacy: boolean;
    acceptedGuidelines: boolean;
    bio: string;
}
//# sourceMappingURL=types.d.ts.map