export type AcademicLevel = "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | "other";
export type VerificationLevel = "verified" | "verified+" | "faculty" | "alumni";
export type SpaceType = "academic" | "social" | "professional" | "sports" | "cultural" | "service";
export interface SpaceClaim {
    spaceId: string;
    spaceName: string;
    spaceType: SpaceType;
    claimReason: string;
    status: "pending" | "approved" | "rejected";
    submittedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
}
export interface OnboardingState {
    uid?: string;
    email: string;
    schoolId: string;
    schoolName: string;
    userRole?: 'student' | 'faculty' | 'alumni';
    displayName: string;
    avatarUrl?: string;
    avatarModerationStatus?: "pending" | "approved" | "rejected" | "under_review";
    handle: string;
    academicLevel: AcademicLevel;
    majors: string[];
    major?: string;
    graduationYear: number;
    isStudentLeader: boolean;
    verificationLevel: VerificationLevel;
    spaceClaims?: SpaceClaim[];
    spaceType?: SpaceType;
    spaceId?: string;
    verificationEmails?: string[];
    isLeader?: boolean;
    spaceName?: string;
    spaceDescription?: string;
    onboardingCompleted?: boolean;
    shouldClaimSpace?: boolean;
    spaceCreated?: boolean;
    autoJoinSpaces?: string[];
    spaceDiscoveryCompleted?: boolean;
    interests: string[];
    suggestedSpaces?: string[];
    joinedSpaces?: string[];
    selectedSpaces?: string[];
    builderOptIn?: boolean;
    consentGiven: boolean;
    isComplete: boolean;
    completedAt?: Date;
}
//# sourceMappingURL=onboarding.d.ts.map