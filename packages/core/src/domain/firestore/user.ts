import { type Timestamp } from "firebase/firestore";
import { z } from "zod";
import type { PrivacySettings } from "../safety";

/**
 * User data model for HIVE platform.
 * The document ID is the user's Auth UID.
 */
export interface User {
  // Core identification
  id: string; // Auth UID
  uid: string; // Auth UID (duplicate for clarity in queries)
  email: string;

  // Profile information
  fullName: string;
  handle: string; // Unique, immutable after creation
  avatarUrl?: string;
  bio?: string; // Optional profile description

  // Academic information
  major: string;
  graduationYear?: number;
  schoolId: string; // Immutable after creation

  // Privacy & visibility
  isPublic: boolean; // Whether profile is publicly viewable
  consentGiven: boolean; // GDPR/privacy consent
  privacySettings: PrivacySettings; // Comprehensive privacy controls

  // Safety & Security
  safetyScore: number; // 0-100, automated safety assessment
  trustLevel: "unverified" | "basic" | "standard" | "high" | "premium";
  isSafetyRestricted: boolean; // Temporary safety restrictions
  requiresManualReview: boolean; // Flagged for admin review

  // Verification status
  emailVerified: boolean;
  phoneVerified: boolean;
  studentIdVerified: boolean;

  // Safety statistics (for moderation)
  reportsReceived: number; // Number of reports against this user
  reportsMade: number; // Number of reports this user has made
  lastSafetyReview?: Timestamp; // Last admin safety review

  // Builder program
  builderOptIn: boolean; // Opted into builder program
  isBuilder: boolean; // Approved as builder

  // Analytics privacy controls
  builderAnalyticsEnabled: boolean; // For creation engine analytics opt-out

  // System fields
  onboardingCompleted: boolean;
  isVerified: boolean; // Email verified (legacy, use emailVerified instead)
  status: "active" | "suspended" | "deleted" | "under_review";

  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt?: Timestamp;
  lastSafetyCheck?: Timestamp;
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
  handle: string; // Document ID
  userId: string;
  reservedAt: Timestamp;
}

// Zod validation schemas
export const UserSchema = z.object({
  id: z.string(),
  uid: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  handle: z.string(),
  avatarUrl: z.string().optional(),
  bio: z.string().max(500).optional(),
  major: z.string(),
  graduationYear: z.number().optional(),
  schoolId: z.string(),
  isPublic: z.boolean().default(false),
  consentGiven: z.boolean(),
  privacySettings: z.object({
    profileVisibility: z
      .enum(["public", "school_only", "private"])
      .default("school_only"),
    showRealName: z.boolean().default(true),
    showMajor: z.boolean().default(true),
    showGraduationYear: z.boolean().default(false),
    showAvatarToStranger: z.boolean().default(true),
    allowDirectMessages: z
      .enum(["everyone", "connections_only", "none"])
      .default("connections_only"),
    allowSpaceInvitations: z.boolean().default(true),
    allowEventInvitations: z.boolean().default(true),
    discoverableByEmail: z.boolean().default(false),
    discoverableByHandle: z.boolean().default(true),
    showInMemberLists: z.boolean().default(true),
    showActivityStatus: z.boolean().default(false),
    requireConnectionApproval: z.boolean().default(true),
    autoBlockSuspiciousAccounts: z.boolean().default(true),
    filterExplicitContent: z.boolean().default(true),
    hideFromSearch: z.boolean().default(false),
  }),
  safetyScore: z.number().min(0).max(100).default(50),
  trustLevel: z
    .enum(["unverified", "basic", "standard", "high", "premium"])
    .default("unverified"),
  isSafetyRestricted: z.boolean().default(false),
  requiresManualReview: z.boolean().default(false),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  studentIdVerified: z.boolean().default(false),
  reportsReceived: z.number().min(0).default(0),
  reportsMade: z.number().min(0).default(0),
  lastSafetyReview: z.number().optional(),
  builderOptIn: z.boolean().default(false),
  isBuilder: z.boolean().default(false),
  builderAnalyticsEnabled: z.boolean().default(true),
  onboardingCompleted: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  status: z
    .enum(["active", "suspended", "deleted", "under_review"])
    .default("active"),
  createdAt: z.number(),
  updatedAt: z.number(),
  lastActiveAt: z.number().optional(),
  lastSafetyCheck: z.number().optional(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  uid: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
});

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  uid: true,
  handle: true,
  schoolId: true,
  createdAt: true,
  safetyScore: true, // Only updated by safety algorithms
  reportsReceived: true, // Only updated by moderation system
  reportsMade: true, // Only updated by moderation system
  lastSafetyReview: true, // Only updated by admin
  lastSafetyCheck: true, // Only updated by safety system
});

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
