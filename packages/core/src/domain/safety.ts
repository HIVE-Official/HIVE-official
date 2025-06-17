/**
 * Safety and moderation features for HIVE platform
 * Provides comprehensive user safety, privacy controls, and content moderation
 */

import { type Timestamp } from "firebase/firestore";
import { z } from "zod";

/**
 * Types of reportable content and behavior
 */
export type ReportReason =
  | "harassment"
  | "spam"
  | "inappropriate_content"
  | "fake_profile"
  | "impersonation"
  | "bullying"
  | "hate_speech"
  | "violence_threats"
  | "self_harm"
  | "academic_dishonesty"
  | "privacy_violation"
  | "other";

/**
 * Status of a safety report
 */
export type ReportStatus =
  | "pending"
  | "under_review"
  | "resolved"
  | "dismissed"
  | "escalated";

/**
 * Actions taken on reported content/users
 */
export type ModerationAction =
  | "none"
  | "warning_issued"
  | "content_removed"
  | "profile_restricted"
  | "temporary_suspension"
  | "permanent_ban"
  | "educational_intervention";

/**
 * User privacy and visibility settings
 */
export interface PrivacySettings {
  // Profile visibility
  profileVisibility: "public" | "school_only" | "private";
  showRealName: boolean;
  showMajor: boolean;
  showGraduationYear: boolean;
  showAvatarToStranger: boolean;

  // Contact preferences
  allowDirectMessages: "everyone" | "connections_only" | "none";
  allowSpaceInvitations: boolean;
  allowEventInvitations: boolean;

  // Discovery settings
  discoverableByEmail: boolean;
  discoverableByHandle: boolean;
  showInMemberLists: boolean;
  showActivityStatus: boolean; // online/offline status

  // Safety features
  requireConnectionApproval: boolean;
  autoBlockSuspiciousAccounts: boolean;
  filterExplicitContent: boolean;
  hideFromSearch: boolean;
}

/**
 * User blocking relationship
 */
export interface BlockedUser {
  id: string; // Document ID: `${blockerId}_${blockedId}`
  blockerId: string;
  blockedId: string;
  reason?: string;
  blockedAt: Timestamp;

  // Automatic expiration (for temporary blocks)
  expiresAt?: Timestamp;
  isTemporary: boolean;
}

/**
 * Safety report submitted by users
 */
export interface SafetyReport {
  id: string;

  // Report details
  reporterId: string;
  reportedUserId?: string;
  reportedContentId?: string; // postId, commentId, etc.
  reportedContentType?: "profile" | "post" | "comment" | "message" | "space";

  reason: ReportReason;
  description: string;

  // Evidence
  screenshots?: string[]; // URLs to uploaded evidence
  additionalContext?: string;

  // Status tracking
  status: ReportStatus;
  priority: "low" | "medium" | "high" | "critical";

  // Resolution
  moderatorId?: string;
  moderationAction?: ModerationAction;
  moderatorNotes?: string;
  resolutionDetails?: string;

  // Timestamps
  reportedAt: Timestamp;
  reviewedAt?: Timestamp;
  resolvedAt?: Timestamp;
}

/**
 * User safety score and risk assessment
 */
export interface SafetyProfile {
  userId: string;

  // Risk assessment
  riskScore: number; // 0-100, higher = more risky
  trustScore: number; // 0-100, higher = more trustworthy

  // Behavioral indicators
  reportsAgainst: number;
  reportsSubmitted: number;
  validReportsSubmitted: number; // Reports that led to action

  // Account verification
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
  schoolEmailVerified: boolean;

  // Safety flags
  isNewAccount: boolean;
  hasSuspiciousActivity: boolean;
  requiresManualReview: boolean;

  // Restrictions
  isRestricted: boolean;
  restrictionReason?: string;
  restrictionExpiresAt?: Timestamp;

  // Timestamps
  lastRiskAssessment: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Trusted connection between users
 */
export interface TrustedConnection {
  id: string; // Document ID: `${userId1}_${userId2}` (alphabetical order)
  userId1: string;
  userId2: string;

  // Connection status
  status: "pending" | "accepted" | "declined";
  requestedBy: string;

  // Trust level
  trustLevel: "acquaintance" | "friend" | "close_friend";

  // Verification method
  verificationMethod?:
    | "mutual_spaces"
    | "email_contact"
    | "in_person"
    | "vouched";

  // Timestamps
  requestedAt: Timestamp;
  acceptedAt?: Timestamp;
  lastInteraction?: Timestamp;
}

/**
 * Safety verification methods and badges
 */
export interface SafetyVerification {
  userId: string;

  // Verification badges
  badges: {
    emailVerified: boolean;
    phoneVerified: boolean;
    studentIdVerified: boolean;
    inPersonVerified: boolean;
    socialMediaLinked: boolean;
  };

  // Verification details
  verifications: {
    type: "email" | "phone" | "student_id" | "in_person" | "social_media";
    status: "verified" | "pending" | "failed";
    verifiedAt?: Timestamp;
    expiresAt?: Timestamp;
    verifierId?: string; // For manual verifications
  }[];

  // Overall trust indicators
  overallTrustLevel: "unverified" | "basic" | "standard" | "high" | "premium";
  publicTrustScore: number; // Visible to other users (0-5 stars)

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Content filter preferences
 */
export interface ContentFilterSettings {
  userId: string;

  // Automatic filtering
  filterProfanity: boolean;
  filterHarassment: boolean;
  filterSpam: boolean;
  filterExplicitContent: boolean;

  // Custom filters
  blockedKeywords: string[];
  blockedDomains: string[];

  // AI moderation preferences
  aiModerationLevel: "off" | "low" | "medium" | "high" | "strict";

  updatedAt: Timestamp;
}

// Zod validation schemas
export const PrivacySettingsSchema = z.object({
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
});

export const SafetyReportSchema = z.object({
  id: z.string(),
  reporterId: z.string(),
  reportedUserId: z.string().optional(),
  reportedContentId: z.string().optional(),
  reportedContentType: z
    .enum(["profile", "post", "comment", "message", "space"])
    .optional(),
  reason: z.enum([
    "harassment",
    "spam",
    "inappropriate_content",
    "fake_profile",
    "impersonation",
    "bullying",
    "hate_speech",
    "violence_threats",
    "self_harm",
    "academic_dishonesty",
    "privacy_violation",
    "other",
  ]),
  description: z.string().min(10).max(1000),
  screenshots: z.array(z.string().url()).optional(),
  additionalContext: z.string().max(500).optional(),
  status: z
    .enum(["pending", "under_review", "resolved", "dismissed", "escalated"])
    .default("pending"),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  moderatorId: z.string().optional(),
  moderationAction: z
    .enum([
      "none",
      "warning_issued",
      "content_removed",
      "profile_restricted",
      "temporary_suspension",
      "permanent_ban",
      "educational_intervention",
    ])
    .optional(),
  moderatorNotes: z.string().optional(),
  resolutionDetails: z.string().optional(),
  reportedAt: z.number(),
  reviewedAt: z.number().optional(),
  resolvedAt: z.number().optional(),
});

export const BlockedUserSchema = z.object({
  id: z.string(),
  blockerId: z.string(),
  blockedId: z.string(),
  reason: z.string().max(500).optional(),
  blockedAt: z.number(),
  expiresAt: z.number().optional(),
  isTemporary: z.boolean().default(false),
});

export const SafetyProfileSchema = z.object({
  userId: z.string(),
  riskScore: z.number().min(0).max(100).default(0),
  trustScore: z.number().min(0).max(100).default(50),
  reportsAgainst: z.number().min(0).default(0),
  reportsSubmitted: z.number().min(0).default(0),
  validReportsSubmitted: z.number().min(0).default(0),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  identityVerified: z.boolean().default(false),
  schoolEmailVerified: z.boolean().default(false),
  isNewAccount: z.boolean().default(true),
  hasSuspiciousActivity: z.boolean().default(false),
  requiresManualReview: z.boolean().default(false),
  isRestricted: z.boolean().default(false),
  restrictionReason: z.string().optional(),
  restrictionExpiresAt: z.number().optional(),
  lastRiskAssessment: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const ContentFilterSettingsSchema = z.object({
  userId: z.string(),
  filterProfanity: z.boolean().default(true),
  filterHarassment: z.boolean().default(true),
  filterSpam: z.boolean().default(true),
  filterExplicitContent: z.boolean().default(true),
  blockedKeywords: z.array(z.string()).default([]),
  blockedDomains: z.array(z.string()).default([]),
  aiModerationLevel: z
    .enum(["off", "low", "medium", "high", "strict"])
    .default("medium"),
  updatedAt: z.number(),
});

// Type exports
export type PrivacySettingsData = z.infer<typeof PrivacySettingsSchema>;
export type SafetyReportData = z.infer<typeof SafetyReportSchema>;
export type BlockedUserData = z.infer<typeof BlockedUserSchema>;
export type SafetyProfileData = z.infer<typeof SafetyProfileSchema>;
export type ContentFilterSettingsData = z.infer<
  typeof ContentFilterSettingsSchema
>;
