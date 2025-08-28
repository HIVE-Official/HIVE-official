import { type Timestamp } from "firebase/firestore";
import { z } from "zod";
/**
 * Onboarding session data for tracking user progress through the registration flow
 */
export interface OnboardingSession {
    id: string;
    userId?: string;
    sessionStarted: Timestamp;
    sessionExpires: Timestamp;
    currentStep: OnboardingStep;
    isComplete: boolean;
    email: string;
    schoolId: string;
    schoolDomain: string;
    fullName?: string;
    handle?: string;
    avatarUrl?: string;
    majorId?: string;
    graduationYear?: number;
    academicLevel?: 'undergraduate' | 'graduate' | 'phd' | 'faculty' | 'alumni';
    interestTags: string[];
    isFirstYear: boolean;
    isLeaderCandidate: boolean;
    selectedSpaces: string[];
    autoJoinSpaces: string[];
    consentGiven: boolean;
    builderOptIn: boolean;
    stepsCompleted: OnboardingStep[];
    lastActivity: Timestamp;
    completedAt?: Timestamp;
    errors: OnboardingError[];
}
export type OnboardingStep = 'email_verification' | 'school_selection' | 'profile_setup' | 'academic_info' | 'interests' | 'space_discovery' | 'consent' | 'completion';
export interface OnboardingError {
    step: OnboardingStep;
    error: string;
    timestamp: Timestamp;
    resolved: boolean;
}
/**
 * Waitlist entry for schools that aren't open yet
 */
export interface WaitlistEntry {
    id: string;
    schoolId: string;
    email: string;
    fullName?: string;
    graduationYear?: number;
    interests: string[];
    referralSource?: string;
    status: 'pending' | 'approved' | 'rejected';
    position?: number;
    emailVerified: boolean;
    notificationsEnabled: boolean;
    joinedAt: Timestamp;
    approvedAt?: Timestamp;
    notifiedAt?: Timestamp;
}
/**
 * School invitation for early access or beta testing
 */
export interface SchoolInvitation {
    id: string;
    schoolId: string;
    email: string;
    invitedBy: string;
    role?: 'student' | 'faculty' | 'admin';
    message?: string;
    status: 'pending' | 'accepted' | 'expired' | 'revoked';
    sentAt: Timestamp;
    expiresAt: Timestamp;
    acceptedAt?: Timestamp;
    revokedAt?: Timestamp;
}
export declare const OnboardingErrorSchema: z.ZodObject<{
    step: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
    error: z.ZodString;
    timestamp: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    resolved: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    timestamp: number | Date;
    step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    error: string;
    resolved: boolean;
}, {
    timestamp: number | Date;
    step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    error: string;
    resolved?: boolean | undefined;
}>;
export declare const OnboardingSessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionStarted: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    sessionExpires: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    currentStep: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
    isComplete: z.ZodDefault<z.ZodBoolean>;
    email: z.ZodString;
    schoolId: z.ZodString;
    schoolDomain: z.ZodString;
    fullName: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    majorId: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    academicLevel: z.ZodOptional<z.ZodEnum<["undergraduate", "graduate", "phd", "faculty", "alumni"]>>;
    interestTags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isFirstYear: z.ZodDefault<z.ZodBoolean>;
    isLeaderCandidate: z.ZodDefault<z.ZodBoolean>;
    selectedSpaces: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    autoJoinSpaces: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    consentGiven: z.ZodDefault<z.ZodBoolean>;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    stepsCompleted: z.ZodDefault<z.ZodArray<z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>, "many">>;
    lastActivity: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    completedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    errors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
        error: z.ZodString;
        timestamp: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
        resolved: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    schoolId: string;
    consentGiven: boolean;
    builderOptIn: boolean;
    errors: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }[];
    lastActivity: number | Date;
    sessionStarted: number | Date;
    sessionExpires: number | Date;
    currentStep: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    isComplete: boolean;
    schoolDomain: string;
    interestTags: string[];
    isFirstYear: boolean;
    isLeaderCandidate: boolean;
    selectedSpaces: string[];
    autoJoinSpaces: string[];
    stepsCompleted: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[];
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    completedAt?: number | Date | undefined;
}, {
    id: string;
    email: string;
    schoolId: string;
    lastActivity: number | Date;
    sessionStarted: number | Date;
    sessionExpires: number | Date;
    currentStep: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    schoolDomain: string;
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    consentGiven?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    errors?: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }[] | undefined;
    isComplete?: boolean | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    interestTags?: string[] | undefined;
    isFirstYear?: boolean | undefined;
    isLeaderCandidate?: boolean | undefined;
    selectedSpaces?: string[] | undefined;
    autoJoinSpaces?: string[] | undefined;
    stepsCompleted?: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[] | undefined;
    completedAt?: number | Date | undefined;
}>;
export declare const WaitlistEntrySchema: z.ZodObject<{
    id: z.ZodString;
    schoolId: z.ZodString;
    email: z.ZodString;
    fullName: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    interests: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    referralSource: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected"]>>;
    position: z.ZodOptional<z.ZodNumber>;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    notificationsEnabled: z.ZodDefault<z.ZodBoolean>;
    joinedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    approvedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    notifiedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "approved" | "rejected";
    id: string;
    email: string;
    schoolId: string;
    emailVerified: boolean;
    interests: string[];
    notificationsEnabled: boolean;
    joinedAt: number | Date;
    position?: number | undefined;
    fullName?: string | undefined;
    graduationYear?: number | undefined;
    referralSource?: string | undefined;
    approvedAt?: number | Date | undefined;
    notifiedAt?: number | Date | undefined;
}, {
    id: string;
    email: string;
    schoolId: string;
    joinedAt: number | Date;
    status?: "pending" | "approved" | "rejected" | undefined;
    position?: number | undefined;
    fullName?: string | undefined;
    graduationYear?: number | undefined;
    emailVerified?: boolean | undefined;
    interests?: string[] | undefined;
    referralSource?: string | undefined;
    notificationsEnabled?: boolean | undefined;
    approvedAt?: number | Date | undefined;
    notifiedAt?: number | Date | undefined;
}>;
export declare const SchoolInvitationSchema: z.ZodObject<{
    id: z.ZodString;
    schoolId: z.ZodString;
    email: z.ZodString;
    invitedBy: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["student", "faculty", "admin"]>>;
    message: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "accepted", "expired", "revoked"]>>;
    sentAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    expiresAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    acceptedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    revokedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "accepted" | "expired" | "revoked";
    id: string;
    email: string;
    expiresAt: number | Date;
    schoolId: string;
    invitedBy: string;
    sentAt: number | Date;
    message?: string | undefined;
    role?: "admin" | "faculty" | "student" | undefined;
    acceptedAt?: number | Date | undefined;
    revokedAt?: number | Date | undefined;
}, {
    id: string;
    email: string;
    expiresAt: number | Date;
    schoolId: string;
    invitedBy: string;
    sentAt: number | Date;
    message?: string | undefined;
    status?: "pending" | "accepted" | "expired" | "revoked" | undefined;
    role?: "admin" | "faculty" | "student" | undefined;
    acceptedAt?: number | Date | undefined;
    revokedAt?: number | Date | undefined;
}>;
export declare const CreateOnboardingSessionSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionStarted: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    sessionExpires: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    currentStep: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
    isComplete: z.ZodDefault<z.ZodBoolean>;
    email: z.ZodString;
    schoolId: z.ZodString;
    schoolDomain: z.ZodString;
    fullName: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    majorId: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    academicLevel: z.ZodOptional<z.ZodEnum<["undergraduate", "graduate", "phd", "faculty", "alumni"]>>;
    interestTags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isFirstYear: z.ZodDefault<z.ZodBoolean>;
    isLeaderCandidate: z.ZodDefault<z.ZodBoolean>;
    selectedSpaces: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    autoJoinSpaces: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    consentGiven: z.ZodDefault<z.ZodBoolean>;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    stepsCompleted: z.ZodDefault<z.ZodArray<z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>, "many">>;
    lastActivity: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    completedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    errors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
        error: z.ZodString;
        timestamp: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
        resolved: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }>, "many">>;
}, "id" | "lastActivity" | "sessionStarted">, "strip", z.ZodTypeAny, {
    email: string;
    schoolId: string;
    consentGiven: boolean;
    builderOptIn: boolean;
    errors: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }[];
    sessionExpires: number | Date;
    currentStep: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    isComplete: boolean;
    schoolDomain: string;
    interestTags: string[];
    isFirstYear: boolean;
    isLeaderCandidate: boolean;
    selectedSpaces: string[];
    autoJoinSpaces: string[];
    stepsCompleted: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[];
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    completedAt?: number | Date | undefined;
}, {
    email: string;
    schoolId: string;
    sessionExpires: number | Date;
    currentStep: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
    schoolDomain: string;
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    consentGiven?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    errors?: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }[] | undefined;
    isComplete?: boolean | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    interestTags?: string[] | undefined;
    isFirstYear?: boolean | undefined;
    isLeaderCandidate?: boolean | undefined;
    selectedSpaces?: string[] | undefined;
    autoJoinSpaces?: string[] | undefined;
    stepsCompleted?: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[] | undefined;
    completedAt?: number | Date | undefined;
}>;
export declare const UpdateOnboardingSessionSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sessionStarted: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    sessionExpires: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    currentStep: z.ZodOptional<z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>>;
    isComplete: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    email: z.ZodOptional<z.ZodString>;
    schoolId: z.ZodOptional<z.ZodString>;
    schoolDomain: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    handle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    majorId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    graduationYear: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    academicLevel: z.ZodOptional<z.ZodOptional<z.ZodEnum<["undergraduate", "graduate", "phd", "faculty", "alumni"]>>>;
    interestTags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    isFirstYear: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isLeaderCandidate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    selectedSpaces: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    autoJoinSpaces: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    consentGiven: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    builderOptIn: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    stepsCompleted: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>, "many">>>;
    lastActivity: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    completedAt: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>>;
    errors: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<["email_verification", "school_selection", "profile_setup", "academic_info", "interests", "space_discovery", "consent", "completion"]>;
        error: z.ZodString;
        timestamp: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
        resolved: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }, {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }>, "many">>>;
}, "id" | "sessionStarted">, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    schoolId?: string | undefined;
    consentGiven?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    errors?: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved: boolean;
    }[] | undefined;
    lastActivity?: number | Date | undefined;
    sessionExpires?: number | Date | undefined;
    currentStep?: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion" | undefined;
    isComplete?: boolean | undefined;
    schoolDomain?: string | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    interestTags?: string[] | undefined;
    isFirstYear?: boolean | undefined;
    isLeaderCandidate?: boolean | undefined;
    selectedSpaces?: string[] | undefined;
    autoJoinSpaces?: string[] | undefined;
    stepsCompleted?: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[] | undefined;
    completedAt?: number | Date | undefined;
}, {
    email?: string | undefined;
    userId?: string | undefined;
    handle?: string | undefined;
    fullName?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    schoolId?: string | undefined;
    consentGiven?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    errors?: {
        timestamp: number | Date;
        step: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion";
        error: string;
        resolved?: boolean | undefined;
    }[] | undefined;
    lastActivity?: number | Date | undefined;
    sessionExpires?: number | Date | undefined;
    currentStep?: "email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion" | undefined;
    isComplete?: boolean | undefined;
    schoolDomain?: string | undefined;
    majorId?: string | undefined;
    academicLevel?: "undergraduate" | "graduate" | "phd" | "faculty" | "alumni" | undefined;
    interestTags?: string[] | undefined;
    isFirstYear?: boolean | undefined;
    isLeaderCandidate?: boolean | undefined;
    selectedSpaces?: string[] | undefined;
    autoJoinSpaces?: string[] | undefined;
    stepsCompleted?: ("email_verification" | "school_selection" | "profile_setup" | "academic_info" | "interests" | "space_discovery" | "consent" | "completion")[] | undefined;
    completedAt?: number | Date | undefined;
}>;
export type CreateOnboardingSessionData = z.infer<typeof CreateOnboardingSessionSchema>;
export type UpdateOnboardingSessionData = z.infer<typeof UpdateOnboardingSessionSchema>;
export type CreateWaitlistEntryData = z.infer<typeof WaitlistEntrySchema>;
export type CreateSchoolInvitationData = z.infer<typeof SchoolInvitationSchema>;
//# sourceMappingURL=onboarding.d.ts.map