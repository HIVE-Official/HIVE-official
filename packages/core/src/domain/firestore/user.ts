import { type Timestamp } from "firebase/firestore";
import { z } from "zod";

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
  interestTags: string[]; // Added for onboarding

  // Academic information
  majorId: string; // Renamed from major
  graduationYear?: number;
  schoolId: string; // Immutable after creation
  isFirstYear: boolean; // Added for onboarding

  // Leadership
  isLeaderCandidate: boolean; // Added for onboarding

  // Residential information (for auto-join)
  dormitory?: string; // e.g., "East Hall"
  roomNumber?: string;
  housingType?: "on_campus" | "off_campus" | "commuter";

  // Organization affiliations (for auto-join)
  organizations: string[]; // e.g., ["Sustainability Club", "Computer Science Society"]
  clubs: string[]; // Student clubs and societies
  academicInterests: string[]; // Academic focus areas

  // Privacy & visibility
  isPublic: boolean; // Whether profile is publicly viewable
  consentGiven: boolean; // GDPR/privacy consent
  showDormitory: boolean; // Privacy control for residential info
  showOrganizations: boolean; // Privacy control for organizations

  // Builder program
  builderOptIn: boolean; // Opted into builder program
  isBuilder: boolean; // Approved as builder
  builderApprovedAt?: Timestamp; // When builder status was granted
  builderAchievements: {
    toolsCreated: number;
    totalEngagement: number;
    invitesSent: number;
    nextBadgeTarget?: string; // e.g., "next badge" progress
  };

  // Analytics privacy controls
  builderAnalyticsEnabled: boolean; // For creation engine analytics opt-out

  // System fields
  onboardingCompleted: boolean;
  isVerified: boolean; // Email verified
  status: "active" | "suspended" | "deleted";

  // Timestamps
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
  interestTags: z.array(z.string()).default([]),
  majorId: z.string(),
  graduationYear: z.number().optional(),
  schoolId: z.string(),
  isFirstYear: z.boolean().default(false),
  isLeaderCandidate: z.boolean().default(false),
  dormitory: z.string().optional(),
  roomNumber: z.string().optional(),
  housingType: z.enum(["on_campus", "off_campus", "commuter"]).optional(),
  organizations: z.array(z.string()).default([]),
  clubs: z.array(z.string()).default([]),
  academicInterests: z.array(z.string()).default([]),
  isPublic: z.boolean().default(false),
  consentGiven: z.boolean(),
  showDormitory: z.boolean().default(true),
  showOrganizations: z.boolean().default(true),
  builderOptIn: z.boolean().default(false),
  isBuilder: z.boolean().default(false),
  builderApprovedAt: z.union([z.date(), z.number()]).optional(),
  builderAchievements: z
    .object({
      toolsCreated: z.number().default(0),
      totalEngagement: z.number().default(0),
      invitesSent: z.number().default(0),
      nextBadgeTarget: z.string().optional(),
    })
    .default({
      toolsCreated: 0,
      totalEngagement: 0,
      invitesSent: 0,
    }),
  builderAnalyticsEnabled: z.boolean().default(true),
  onboardingCompleted: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  status: z.enum(["active", "suspended", "deleted"]).default("active"),
  createdAt: z.union([z.date(), z.number()]),
  updatedAt: z.union([z.date(), z.number()]),
  lastActiveAt: z.union([z.date(), z.number()]).optional(),
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
});

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
