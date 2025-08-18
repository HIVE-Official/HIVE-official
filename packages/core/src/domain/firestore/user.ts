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
  bio?: string; // User biography/description

  // Academic information
  major: string;
  graduationYear?: number;
  schoolId: string; // Immutable after creation

  // Privacy & visibility
  isPublic: boolean; // Whether profile is publicly viewable
  consentGiven: boolean; // GDPR/privacy consent

  // Builder program
  builderOptIn: boolean; // Opted into builder program
  isBuilder: boolean; // Approved as builder

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
  bio: z.string().max(500).optional(),
  major: z.string(),
  graduationYear: z.number().optional(),
  schoolId: z.string(),
  isPublic: z.boolean().default(false),
  consentGiven: z.boolean(),
  builderOptIn: z.boolean().default(false),
  isBuilder: z.boolean().default(false),
  builderAnalyticsEnabled: z.boolean().default(true),
  onboardingCompleted: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  status: z.enum(["active", "suspended", "deleted"]).default("active"),
  createdAt: z.number(),
  updatedAt: z.number(),
  lastActiveAt: z.number().optional(),
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
