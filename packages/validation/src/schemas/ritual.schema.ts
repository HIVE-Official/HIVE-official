import { z } from "zod";

// Ritual Type Schema
export const RitualTypeSchema = z.enum([
  'first_light',
  'orientation_qa',
  'torch_pass',
  'space_hunt',
  'builder_spotlight',
  'space_wars',
  'tool_roulette',
  'wave_challenge',
  'campus_vibe_check',
  'seasonal_finale',
  'custom'
]);

// Ritual Status Schema
export const RitualStatusSchema = z.enum([
  'draft',
  'scheduled',
  'active',
  'completed',
  'paused',
  'cancelled'
]);

// Ritual Participation Schema
export const RitualParticipationSchema = z.object({
  ritualId: z.string().min(1),
  userId: z.string().min(1),
  
  // Participation data
  completedAt: z.date(),
  response: z.string().min(1).max(2000).optional(), // Text response
  attachments: z.array(z.string()).max(5).optional(), // URLs or file IDs
  metadata: z.record(z.string(), z.any()).optional(),
  
  // Scoring/validation
  validated: z.boolean().default(false),
  score: z.number().min(0).max(100).optional(),
  
  // Recognition
  featured: z.boolean().default(false),
  featuredAt: z.date().optional(),
  
  createdAt: z.date()
});

// Ritual Reward Schema
export const RitualRewardSchema = z.object({
  type: z.enum(['access', 'badge', 'privilege', 'content']),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  iconUrl: z.string().url().optional(),
  
  // Reward details
  value: z.string().optional(), // What they get access to
  duration: z.number().optional(), // How long the reward lasts (seconds)
  
  // Conditions
  requirements: z.array(z.string()).optional(),
  autoGrant: z.boolean().default(true)
});

// Ritual Configuration Schema
export const RitualConfigSchema = z.object({
  // Timing
  participationWindow: z.number().min(60).max(604800), // 1 minute to 1 week (seconds)
  reminderSchedule: z.array(z.number()).optional(), // Hours before end to send reminders
  
  // Validation
  requiresValidation: z.boolean().default(false),
  autoComplete: z.boolean().default(true),
  maxParticipants: z.number().min(1).optional(),
  
  // Features
  allowAttachments: z.boolean().default(false),
  allowComments: z.boolean().default(false),
  showParticipants: z.boolean().default(true),
  showProgress: z.boolean().default(true),
  
  // Moderation
  contentFilter: z.boolean().default(true),
  requiresApproval: z.boolean().default(false)
});

// Main Ritual Schema
export const RitualSchema = z.object({
  id: z.string().min(1),
  type: RitualTypeSchema,
  status: RitualStatusSchema,
  
  // Basic info
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  instructions: z.string().min(1).max(2000),
  
  // Visual
  iconUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  colorTheme: z.string().regex(/^#[0-9A-F]{6}$/i).optional(), // Hex color
  
  // Timing
  scheduledStart: z.date(),
  scheduledEnd: z.date(),
  actualStart: z.date().optional(),
  actualEnd: z.date().optional(),
  
  // Targeting
  targetAudience: z.enum(['all', 'new_users', 'builders', 'leaders', 'specific_school']).default('all'),
  schoolId: z.string().optional(), // If targeting specific school
  
  // Configuration
  config: RitualConfigSchema,
  
  // Rewards
  rewards: z.array(RitualRewardSchema).max(5).optional(),
  
  // Progress tracking
  totalParticipants: z.number().min(0).default(0),
  completedParticipants: z.number().min(0).default(0),
  
  // Metadata
  createdBy: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Ritual Analytics Schema
export const RitualAnalyticsSchema = z.object({
  ritualId: z.string().min(1),
  
  // Participation metrics
  totalViews: z.number().min(0).default(0),
  totalStarts: z.number().min(0).default(0),
  totalCompletions: z.number().min(0).default(0),
  completionRate: z.number().min(0).max(100).default(0),
  
  // Engagement metrics
  averageCompletionTime: z.number().min(0).default(0), // seconds
  averageResponseLength: z.number().min(0).default(0), // characters
  
  // Quality metrics
  featuredResponses: z.number().min(0).default(0),
  reportedContent: z.number().min(0).default(0),
  
  // Temporal analysis
  participationByHour: z.array(z.number()).length(24).default(() => Array(24).fill(0)),
  participationByDay: z.array(z.number()).length(7).default(() => Array(7).fill(0)),
  
  // Demographics
  participantsByAcademicLevel: z.record(z.string(), z.number()).default({}),
  participantsByMajor: z.record(z.string(), z.number()).default({}),
  
  // Outcomes
  rewardsClaimed: z.number().min(0).default(0),
  followUpEngagement: z.number().min(0).max(100).default(0), // % continuing to engage
  
  lastUpdated: z.date()
});

// Ritual Announcement Schema
export const RitualAnnouncementSchema = z.object({
  ritualId: z.string().min(1),
  
  // Announcement details
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  
  // Scheduling
  scheduledFor: z.date(),
  
  // Targeting
  targetUsers: z.array(z.string()).optional(), // Specific users, or empty for all
  
  // Delivery
  channels: z.array(z.enum(['push', 'email', 'in_app', 'feed'])).min(1),
  
  // Metadata
  createdBy: z.string().min(1),
  createdAt: z.date(),
  sentAt: z.date().optional()
});

// Export types
export type Ritual = z.infer<typeof RitualSchema>;
export type RitualParticipation = z.infer<typeof RitualParticipationSchema>;
export type RitualReward = z.infer<typeof RitualRewardSchema>;
export type RitualConfig = z.infer<typeof RitualConfigSchema>;
export type RitualAnalytics = z.infer<typeof RitualAnalyticsSchema>;
export type RitualAnnouncement = z.infer<typeof RitualAnnouncementSchema>;
export type RitualType = z.infer<typeof RitualTypeSchema>;
export type RitualStatus = z.infer<typeof RitualStatusSchema>;