// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import type {
  AcademicInfo,
  AffiliationInfo,
  PersonalInfo,
  PersonalInterest,
  ResidentialSelection,
  SocialInfo,
  UserType
} from "@core";

export const profileVisibilitySchema = z.enum(["public", "campus", "connections"]);
export type ProfileVisibility = z.infer<typeof profileVisibilitySchema>;

export interface ProfilePrivacySettings {
  readonly visibility: ProfileVisibility;
  readonly showEmail: boolean;
  readonly showAcademicInfo: boolean;
  readonly showActivity: boolean;
  readonly showSpaces: boolean;
  readonly allowMessages: boolean;
}

export const profilePrivacySettingsSchema = z.object({
  visibility: profileVisibilitySchema,
  showEmail: z.boolean(),
  showAcademicInfo: z.boolean(),
  showActivity: z.boolean(),
  showSpaces: z.boolean(),
  allowMessages: z.boolean()
});

export interface ProfilePresence {
  readonly status: "online" | "away" | "offline";
  readonly lastSeenAt: Date | null;
  readonly isGhostMode: boolean;
}

const profilePresenceSchema = z.object({
  status: z.enum(["online", "away", "offline"]),
  lastSeenAt: z.coerce.date().nullable(),
  isGhostMode: z.boolean()
});

export interface ProfileStats {
  readonly completion: number;
  readonly connectionCount: number;
  readonly spacesJoined: number;
  readonly postsAuthored: number;
  readonly ritualsCompleted: number;
  readonly toolsCreated: number;
}

const profileStatsSchema = z.object({
  completion: z.number().min(0).max(100),
  connectionCount: z.number().nonnegative(),
  spacesJoined: z.number().nonnegative(),
  postsAuthored: z.number().nonnegative(),
  ritualsCompleted: z.number().nonnegative(),
  toolsCreated: z.number().nonnegative()
});

export interface ProfileOnboardingState {
  readonly isComplete: boolean;
  readonly completedAt: Date | null;
  readonly consentGrantedAt: Date | null;
  readonly stepsCompleted: readonly string[];
}

const profileOnboardingStateSchema = z.object({
  isComplete: z.boolean(),
  completedAt: z.coerce.date().nullable(),
  consentGrantedAt: z.coerce.date().nullable(),
  stepsCompleted: z.array(z.string()).readonly()
});

const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  pronouns: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(500).optional(),
  photoUrl: z.string().url().optional()
});

const academicInfoSchema = z.object({
  majors: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(120)
    )
    .min(1)
    .max(2),
  graduationYear: z
    .number()
    .int()
    .min(new Date().getFullYear() - 1)
    .max(new Date().getFullYear() + 10),
  courses: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(80)
    )
    .max(10)
    .optional()
});

const affiliationInfoSchema = z.object({
  department: z.string().trim().min(1).max(120)
});

const socialInfoSchema = z.object({
  instagram: z
    .string()
    .trim()
    .regex(/^@?[a-zA-Z0-9._]{1,30}$/)
    .transform((value: string) => (value.startsWith("@") ? value : `@${value}`))
    .optional(),
  linkedin: z.string().trim().url().optional(),
  website: z.string().trim().url().optional()
});

const personalInterestSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: z.string().optional()
}) as z.ZodType<PersonalInterest>;

const residentialSelectionSchema = z.object({
  spaceId: z.string().min(1),
  name: z.string().min(1)
}) as z.ZodType<ResidentialSelection>;

export interface ProfileIdentity {
  readonly id: string;
  readonly email: string;
  readonly campusId: string;
  readonly userType: UserType;
  readonly handle: string;
  readonly personalInfo: PersonalInfo;
  readonly academicInfo?: AcademicInfo;
  readonly affiliation?: AffiliationInfo;
  readonly socialInfo?: SocialInfo;
  readonly interests: readonly PersonalInterest[];
  readonly clubs: readonly string[];
  readonly residentialSelection?: ResidentialSelection;
  readonly isVerified: boolean;
  readonly isActive: boolean;
  readonly onboarding: ProfileOnboardingState;
}

const profileIdentitySchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  campusId: z.string().min(1),
  userType: z.enum(["student", "alumni", "faculty"]) as z.ZodType<UserType>,
  handle: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_]+$/, "Handle can only contain lowercase letters, numbers, and underscores"),
  personalInfo: personalInfoSchema,
  academicInfo: academicInfoSchema.optional(),
  affiliation: affiliationInfoSchema.optional(),
  socialInfo: socialInfoSchema.optional(),
  interests: z.array(personalInterestSchema).readonly(),
  clubs: z.array(z.string()).readonly(),
  residentialSelection: residentialSelectionSchema.optional(),
  isVerified: z.boolean(),
  isActive: z.boolean(),
  onboarding: profileOnboardingStateSchema
});

export interface ProfileSnapshot {
  readonly identity: ProfileIdentity;
  readonly privacy: ProfilePrivacySettings;
  readonly stats: ProfileStats;
  readonly presence: ProfilePresence;
  readonly lastUpdatedAt: Date;
}

export const profileSnapshotSchema = z.object({
  identity: profileIdentitySchema,
  privacy: profilePrivacySettingsSchema,
  stats: profileStatsSchema,
  presence: profilePresenceSchema,
  lastUpdatedAt: z.coerce.date()
});

export interface ProfileConnectionSummary {
  readonly profileId: string;
  readonly handle: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly userType: UserType;
  readonly campusId: string;
  readonly mutualSpaces: number;
  readonly mutualConnections: number;
  readonly lastActiveAt: Date | null;
}

export const profileConnectionSummarySchema = z.object({
  profileId: z.string().min(1),
  handle: z.string().min(3),
  displayName: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  userType: z.enum(["student", "alumni", "faculty"]) as z.ZodType<UserType>,
  campusId: z.string().min(1),
  mutualSpaces: z.number().nonnegative(),
  mutualConnections: z.number().nonnegative(),
  lastActiveAt: z.coerce.date().nullable()
});

export interface ProfileConnection {
  readonly summary: ProfileConnectionSummary;
  readonly connectedAt: Date;
  readonly tags: readonly string[];
}

export const profileConnectionSchema = z.object({
  summary: profileConnectionSummarySchema,
  connectedAt: z.coerce.date(),
  tags: z.array(z.string()).readonly()
});

export interface ProfileConnectionState {
  readonly accepted: readonly ProfileConnection[];
  readonly pending: readonly ProfileConnectionSummary[];
  readonly suggestions: readonly ProfileConnectionSummary[];
  readonly lastSyncedAt: Date;
}

export const profileConnectionStateSchema = z.object({
  accepted: z.array(profileConnectionSchema).readonly(),
  pending: z.array(profileConnectionSummarySchema).readonly(),
  suggestions: z.array(profileConnectionSummarySchema).readonly(),
  lastSyncedAt: z.coerce.date()
});

export type ProfileActivityType =
  | "space_joined"
  | "badge_earned"
  | "connection_made"
  | "tool_published"
  | "ritual_completed";

export interface ProfileActivityEntry {
  readonly id: string;
  readonly type: ProfileActivityType;
  readonly occurredAt: Date;
  readonly description: string;
  readonly metadata?: Record<string, unknown>;
}

export const profileActivityEntrySchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "space_joined",
    "badge_earned",
    "connection_made",
    "tool_published",
    "ritual_completed"
  ]) as z.ZodType<ProfileActivityType>,
  occurredAt: z.coerce.date(),
  description: z.string(),
  metadata: z.record(z.unknown()).optional()
});

export interface ProfileActivityState {
  readonly entries: readonly ProfileActivityEntry[];
  readonly lastUpdatedAt: Date;
}

const profileActivityStateSchema = z.object({
  entries: z.array(profileActivityEntrySchema).readonly(),
  lastUpdatedAt: z.coerce.date()
});

export interface ProfileSpaceRecommendation {
  readonly spaceId: string;
  readonly name: string;
  readonly reason: string;
  readonly memberCount: number;
  readonly joinUrl: string;
}

const profileSpaceRecommendationSchema = z.object({
  spaceId: z.string().min(1),
  name: z.string().min(1),
  reason: z.string().min(1),
  memberCount: z.number().nonnegative(),
  joinUrl: z.string().min(1)
});

export interface ProfileRecommendationsState {
  readonly spaces: readonly ProfileSpaceRecommendation[];
  readonly people: readonly ProfileConnectionSummary[];
  readonly generatedAt: Date;
}

export const profileRecommendationsStateSchema = z.object({
  spaces: z.array(profileSpaceRecommendationSchema).readonly(),
  people: z.array(profileConnectionSummarySchema).readonly(),
  generatedAt: z.coerce.date()
});

export interface ProfileBundle {
  readonly profile: ProfileSnapshot;
  readonly connections: ProfileConnectionState;
  readonly activity: ProfileActivityState;
  readonly recommendations: ProfileRecommendationsState;
}

export const profileBundleSchema = z.object({
  profile: profileSnapshotSchema,
  connections: profileConnectionStateSchema,
  activity: profileActivityStateSchema,
  recommendations: profileRecommendationsStateSchema
});

const partialPersonalInfoSchema = personalInfoSchema.partial();
const partialAcademicInfoSchema = academicInfoSchema.partial();
const partialAffiliationInfoSchema = affiliationInfoSchema.partial();
const partialSocialInfoSchema = socialInfoSchema.partial();

export const profileUpdatePayloadSchema = z
  .object({
    handle: z
      .string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[a-z0-9_]+$/, "Handle can only contain lowercase letters, numbers, and underscores")
      .optional(),
    personalInfo: partialPersonalInfoSchema.optional(),
    academicInfo: partialAcademicInfoSchema.nullable().optional(),
    affiliation: partialAffiliationInfoSchema.nullable().optional(),
    socialInfo: partialSocialInfoSchema.nullable().optional(),
    interests: z.array(personalInterestSchema).readonly().optional(),
    clubs: z.array(z.string()).optional(),
    residentialSelection: residentialSelectionSchema.nullable().optional()
  })
  .refine(
    (payload) =>
      payload.handle ||
      payload.personalInfo ||
      payload.academicInfo !== undefined ||
      payload.affiliation !== undefined ||
      payload.socialInfo !== undefined ||
      payload.interests !== undefined ||
      payload.clubs !== undefined ||
      payload.residentialSelection !== undefined,
    { message: "At least one field must be provided for profile update" }
  );

export type ProfileUpdatePayload = z.infer<typeof profileUpdatePayloadSchema>;

export const profilePrivacyUpdatePayloadSchema = profilePrivacySettingsSchema
  .partial()
  .refine(
    (payload) =>
      payload.visibility !== undefined ||
      payload.showEmail !== undefined ||
      payload.showAcademicInfo !== undefined ||
      payload.showActivity !== undefined ||
      payload.showSpaces !== undefined ||
      payload.allowMessages !== undefined,
    { message: "At least one privacy field must be provided" }
  );

export type ProfilePrivacyUpdatePayload = z.infer<typeof profilePrivacyUpdatePayloadSchema>;
