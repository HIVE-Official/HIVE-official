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
    bio?: string;
    major: string;
    graduationYear?: number;
    schoolId: string;
    isPublic: boolean;
    consentGiven: boolean;
    builderOptIn: boolean;
    isBuilder: boolean;
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
    bio: z.ZodOptional<z.ZodString>;
    major: z.ZodString;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodString;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    consentGiven: z.ZodBoolean;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    isBuilder: z.ZodDefault<z.ZodBoolean>;
    builderAnalyticsEnabled: z.ZodDefault<z.ZodBoolean>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    lastActiveAt: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    uid?: string;
    id?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    handle?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    schoolId?: string;
    builderOptIn?: boolean;
    createdAt?: number;
    updatedAt?: number;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
    lastActiveAt?: number;
}, {
    email?: string;
    uid?: string;
    id?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    handle?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    schoolId?: string;
    builderOptIn?: boolean;
    createdAt?: number;
    updatedAt?: number;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
    lastActiveAt?: number;
}>;
export declare const CreateUserSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    uid: z.ZodString;
    email: z.ZodString;
    fullName: z.ZodString;
    handle: z.ZodString;
    avatarUrl: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    major: z.ZodString;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodString;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    consentGiven: z.ZodBoolean;
    builderOptIn: z.ZodDefault<z.ZodBoolean>;
    isBuilder: z.ZodDefault<z.ZodBoolean>;
    builderAnalyticsEnabled: z.ZodDefault<z.ZodBoolean>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    lastActiveAt: z.ZodOptional<z.ZodNumber>;
}, "uid" | "id" | "createdAt" | "updatedAt" | "lastActiveAt">, "strip", z.ZodTypeAny, {
    email?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    handle?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    schoolId?: string;
    builderOptIn?: boolean;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
}, {
    email?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    handle?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    schoolId?: string;
    builderOptIn?: boolean;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
}>;
export declare const UpdateUserSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    uid: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    major: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    schoolId: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    consentGiven: z.ZodOptional<z.ZodBoolean>;
    builderOptIn: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isBuilder: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    builderAnalyticsEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    onboardingCompleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "suspended", "deleted"]>>>;
    createdAt: z.ZodOptional<z.ZodNumber>;
    updatedAt: z.ZodOptional<z.ZodNumber>;
    lastActiveAt: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "uid" | "id" | "handle" | "schoolId" | "createdAt">, "strip", z.ZodTypeAny, {
    email?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    builderOptIn?: boolean;
    updatedAt?: number;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
    lastActiveAt?: number;
}, {
    email?: string;
    onboardingCompleted?: boolean;
    fullName?: string;
    major?: string;
    graduationYear?: number;
    avatarUrl?: string;
    builderOptIn?: boolean;
    updatedAt?: number;
    status?: "active" | "deleted" | "suspended";
    isPublic?: boolean;
    bio?: string;
    consentGiven?: boolean;
    isBuilder?: boolean;
    builderAnalyticsEnabled?: boolean;
    isVerified?: boolean;
    lastActiveAt?: number;
}>;
export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=user.d.ts.map