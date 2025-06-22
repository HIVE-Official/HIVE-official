import { type Timestamp } from "firebase/firestore";
import { z } from "zod";
/**
 * User data model for HIVE platform.
 * The document ID is the user's Auth UID.
 */
export interface User {
    id: string;
    uid: string;
    email: string;
    fullName: string;
    handle: string;
    avatarUrl?: string;
    major: string;
    graduationYear?: number;
    schoolId: string;
    dormitory?: string;
    roomNumber?: string;
    housingType?: "on_campus" | "off_campus" | "commuter";
    organizations: string[];
    clubs: string[];
    academicInterests: string[];
    isPublic: boolean;
    consentGiven: boolean;
    showDormitory: boolean;
    showOrganizations: boolean;
    builderOptIn: boolean;
    isBuilder: boolean;
    builderApprovedAt?: Timestamp;
    builderAchievements: {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string;
    };
    builderAnalyticsEnabled: boolean;
    onboardingCompleted: boolean;
    isVerified: boolean;
    status: "active" | "suspended" | "deleted";
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastActiveAt?: Timestamp;
}
/**
 * Motion log entry for tracking user activity
 */
export interface MotionEntry {
    id: string;
    userId: string;
    action: "joined_space" | "created_tool" | "posted" | "attended_event";
    details: {
        spaceId?: string;
        toolId?: string;
        postId?: string;
        eventId?: string;
        [key: string]: unknown;
    };
    timestamp: Timestamp;
}
/**
 * Handle reservation document
 */
export interface HandleReservation {
    handle: string;
    userId: string;
    reservedAt: Timestamp;
}
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    uid: z.ZodString;
    email: z.ZodString;
    fullName: z.ZodString;
    handle: z.ZodString;
    avatarUrl: z.ZodOptional<z.ZodString>;
    major: z.ZodString;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodString;
    dormitory: z.ZodOptional<z.ZodString>;
    roomNumber: z.ZodOptional<z.ZodString>;
    housingType: z.ZodOptional<z.ZodEnum<["on_campus", "off_campus", "commuter"]>>;
    organizations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    clubs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    academicInterests: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    consentGiven: z.ZodBoolean;
    showDormitory: z.ZodDefault<z.ZodBoolean>;
    showOrganizations: z.ZodDefault<z.ZodBoolean>;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    isBuilder: z.ZodDefault<z.ZodBoolean>;
    builderApprovedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    builderAchievements: z.ZodDefault<z.ZodObject<{
        toolsCreated: z.ZodDefault<z.ZodNumber>;
        totalEngagement: z.ZodDefault<z.ZodNumber>;
        invitesSent: z.ZodDefault<z.ZodNumber>;
        nextBadgeTarget: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    }, {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    }>>;
    builderAnalyticsEnabled: z.ZodDefault<z.ZodBoolean>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    lastActiveAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "deleted" | "suspended";
    handle: string;
    id: string;
    fullName: string;
    createdAt: number | Date;
    updatedAt: number | Date;
    major: string;
    uid: string;
    email: string;
    schoolId: string;
    organizations: string[];
    clubs: string[];
    academicInterests: string[];
    isPublic: boolean;
    consentGiven: boolean;
    showDormitory: boolean;
    showOrganizations: boolean;
    builderOptIn: boolean;
    isBuilder: boolean;
    builderAchievements: {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    };
    builderAnalyticsEnabled: boolean;
    onboardingCompleted: boolean;
    isVerified: boolean;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    builderApprovedAt?: number | Date | undefined;
    lastActiveAt?: number | Date | undefined;
}, {
    handle: string;
    id: string;
    fullName: string;
    createdAt: number | Date;
    updatedAt: number | Date;
    major: string;
    uid: string;
    email: string;
    schoolId: string;
    consentGiven: boolean;
    status?: "active" | "deleted" | "suspended" | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    organizations?: string[] | undefined;
    clubs?: string[] | undefined;
    academicInterests?: string[] | undefined;
    isPublic?: boolean | undefined;
    showDormitory?: boolean | undefined;
    showOrganizations?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    isBuilder?: boolean | undefined;
    builderApprovedAt?: number | Date | undefined;
    builderAchievements?: {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    } | undefined;
    builderAnalyticsEnabled?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
    isVerified?: boolean | undefined;
    lastActiveAt?: number | Date | undefined;
}>;
export declare const CreateUserSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    uid: z.ZodString;
    email: z.ZodString;
    fullName: z.ZodString;
    handle: z.ZodString;
    avatarUrl: z.ZodOptional<z.ZodString>;
    major: z.ZodString;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodString;
    dormitory: z.ZodOptional<z.ZodString>;
    roomNumber: z.ZodOptional<z.ZodString>;
    housingType: z.ZodOptional<z.ZodEnum<["on_campus", "off_campus", "commuter"]>>;
    organizations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    clubs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    academicInterests: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    consentGiven: z.ZodBoolean;
    showDormitory: z.ZodDefault<z.ZodBoolean>;
    showOrganizations: z.ZodDefault<z.ZodBoolean>;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    isBuilder: z.ZodDefault<z.ZodBoolean>;
    builderApprovedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    builderAchievements: z.ZodDefault<z.ZodObject<{
        toolsCreated: z.ZodDefault<z.ZodNumber>;
        totalEngagement: z.ZodDefault<z.ZodNumber>;
        invitesSent: z.ZodDefault<z.ZodNumber>;
        nextBadgeTarget: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    }, {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    }>>;
    builderAnalyticsEnabled: z.ZodDefault<z.ZodBoolean>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    lastActiveAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
}, "id" | "createdAt" | "updatedAt" | "uid" | "lastActiveAt">, "strip", z.ZodTypeAny, {
    status: "active" | "deleted" | "suspended";
    handle: string;
    fullName: string;
    major: string;
    email: string;
    schoolId: string;
    organizations: string[];
    clubs: string[];
    academicInterests: string[];
    isPublic: boolean;
    consentGiven: boolean;
    showDormitory: boolean;
    showOrganizations: boolean;
    builderOptIn: boolean;
    isBuilder: boolean;
    builderAchievements: {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    };
    builderAnalyticsEnabled: boolean;
    onboardingCompleted: boolean;
    isVerified: boolean;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    builderApprovedAt?: number | Date | undefined;
}, {
    handle: string;
    fullName: string;
    major: string;
    email: string;
    schoolId: string;
    consentGiven: boolean;
    status?: "active" | "deleted" | "suspended" | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    organizations?: string[] | undefined;
    clubs?: string[] | undefined;
    academicInterests?: string[] | undefined;
    isPublic?: boolean | undefined;
    showDormitory?: boolean | undefined;
    showOrganizations?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    isBuilder?: boolean | undefined;
    builderApprovedAt?: number | Date | undefined;
    builderAchievements?: {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    } | undefined;
    builderAnalyticsEnabled?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
    isVerified?: boolean | undefined;
}>;
export declare const UpdateUserSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    uid: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    major: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    schoolId: z.ZodOptional<z.ZodString>;
    dormitory: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    roomNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    housingType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["on_campus", "off_campus", "commuter"]>>>;
    organizations: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    clubs: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    academicInterests: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    isPublic: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    consentGiven: z.ZodOptional<z.ZodBoolean>;
    showDormitory: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showOrganizations: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    builderOptIn: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isBuilder: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    builderApprovedAt: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>>;
    builderAchievements: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        toolsCreated: z.ZodDefault<z.ZodNumber>;
        totalEngagement: z.ZodDefault<z.ZodNumber>;
        invitesSent: z.ZodDefault<z.ZodNumber>;
        nextBadgeTarget: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    }, {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    }>>>;
    builderAnalyticsEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    onboardingCompleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>>;
    createdAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    updatedAt: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    lastActiveAt: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>>;
}, "handle" | "id" | "createdAt" | "uid" | "schoolId">, "strip", z.ZodTypeAny, {
    status?: "active" | "deleted" | "suspended" | undefined;
    fullName?: string | undefined;
    updatedAt?: number | Date | undefined;
    major?: string | undefined;
    email?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    organizations?: string[] | undefined;
    clubs?: string[] | undefined;
    academicInterests?: string[] | undefined;
    isPublic?: boolean | undefined;
    consentGiven?: boolean | undefined;
    showDormitory?: boolean | undefined;
    showOrganizations?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    isBuilder?: boolean | undefined;
    builderApprovedAt?: number | Date | undefined;
    builderAchievements?: {
        toolsCreated: number;
        totalEngagement: number;
        invitesSent: number;
        nextBadgeTarget?: string | undefined;
    } | undefined;
    builderAnalyticsEnabled?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
    isVerified?: boolean | undefined;
    lastActiveAt?: number | Date | undefined;
}, {
    status?: "active" | "deleted" | "suspended" | undefined;
    fullName?: string | undefined;
    updatedAt?: number | Date | undefined;
    major?: string | undefined;
    email?: string | undefined;
    avatarUrl?: string | undefined;
    graduationYear?: number | undefined;
    dormitory?: string | undefined;
    roomNumber?: string | undefined;
    housingType?: "on_campus" | "off_campus" | "commuter" | undefined;
    organizations?: string[] | undefined;
    clubs?: string[] | undefined;
    academicInterests?: string[] | undefined;
    isPublic?: boolean | undefined;
    consentGiven?: boolean | undefined;
    showDormitory?: boolean | undefined;
    showOrganizations?: boolean | undefined;
    builderOptIn?: boolean | undefined;
    isBuilder?: boolean | undefined;
    builderApprovedAt?: number | Date | undefined;
    builderAchievements?: {
        toolsCreated?: number | undefined;
        totalEngagement?: number | undefined;
        invitesSent?: number | undefined;
        nextBadgeTarget?: string | undefined;
    } | undefined;
    builderAnalyticsEnabled?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
    isVerified?: boolean | undefined;
    lastActiveAt?: number | Date | undefined;
}>;
export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=user.d.ts.map