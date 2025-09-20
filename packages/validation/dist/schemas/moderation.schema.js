import { z } from "zod";
// Content Type Schema
export const ContentTypeSchema = z.enum([
    'post',
    'comment',
    'space',
    'tool',
    'user_profile',
    'event',
    'ritual_response',
    'message'
]);
// Report Reason Schema
export const ReportReasonSchema = z.enum([
    'spam',
    'harassment',
    'hate_speech',
    'violence',
    'sexual_content',
    'misinformation',
    'copyright',
    'privacy_violation',
    'impersonation',
    'inappropriate_content',
    'off_topic',
    'duplicate',
    'other'
]);
// Report Status Schema
export const ReportStatusSchema = z.enum([
    'pending',
    'under_review',
    'escalated',
    'resolved',
    'dismissed',
    'appealed'
]);
// Moderation Action Schema
export const ModerationActionSchema = z.enum([
    'no_action',
    'warning',
    'content_removal',
    'content_edit',
    'user_timeout',
    'user_suspend',
    'user_ban',
    'space_disable',
    'tool_disable',
    'escalate_to_admin'
]);
// Report Severity Schema
export const ReportSeveritySchema = z.enum([
    'low',
    'medium',
    'high',
    'critical'
]);
// Content Report Schema
export const ContentReportSchema = z.object({
    id: z.string().min(1),
    // Report details contentType: ContentTypeSchema  contentId: z.string().min(1),
    reason: ReportReasonSchema,
    description: z.string().min(1).max(1000),
    // Reporter info reportedBy: z.string().min(1)  reporterAnonymous: z.boolean().default(false),
    // Content info contentAuthor: z.string().min(1)  contentUrl: z.string().optional(),
    contentSnapshot: z.string().max(5000).optional(), // Snapshot of content at report time
    // Categorization severity: ReportSeveritySchema  category: z.array(z.string()).max(5).default([]),
    // Status tracking status: ReportStatusSchema  priority: z.number().min(1).max(5).default(3),
    // Evidence  screenshots: z.array(z.string()).max(5).default([]), // URLs to screenshots additionalEvidence: z.array(z.string()).max(10).default([]), // URLs or text
    // Assignment assignedTo: z.string().optional()  assignedAt: z.date().optional(),
    // Resolution resolution: z.string().max(1000).optional()  actionTaken: ModerationActionSchema.optional(),
    resolvedAt: z.date().optional(),
    resolvedBy: z.string().optional(),
    // Appeal process appealable: z.boolean().default(true)  appealedAt: z.date().optional(),
    appealReason: z.string().max(1000).optional(),
    // Timestamps createdAt: z.date()  updatedAt: z.date()
});
// Moderation Queue Item Schema
export const ModerationQueueItemSchema = z.object({
    id: z.string().min(1),
    // Queue details reportId: z.string().min(1)  queueType: z.enum(['auto_flagged', 'user_reported', 'escalated', 'appeal']),
    // Priority scoring priorityScore: z.number().min(0).max(100)  urgency: z.enum(['low', 'medium', 'high', 'critical']),
    // Content summary contentPreview: z.string().max(500)  contentMetadata: z.record(z.string(), z.any()).optional(),
    // Automated analysis aiFlags: z.array(z.object({
    flag: z.string(),
    confidence: z.number().min(0).max(1),
    reason: z.string().optional()
});
([]),
    // Assignment assignedTo: z.string().optional()  assignedAt: z.date().optional(),
    estimatedReviewTime;
z.number().min(0).optional(), // minutes
    // Processing status: z.enum(['queued', 'in_progress', 'completed', 'escalated']),
    // SLA tracking slaTarget: z.date().optional()  slaBreached: z.boolean().default(false),
    createdAt;
z.date(),
    updatedAt;
z.date();
;
// Moderation Action Log Schema
export const ModerationActionLogSchema = z.object({
    id: z.string().min(1),
    // Action details action: ModerationActionSchema  targetType: ContentTypeSchema,
    targetId: z.string().min(1),
    // Context reportId: z.string().optional()  reason: z.string().min(1).max(1000),
    // Duration (for timeouts/suspensions)  duration: z.number().min(0).optional(), // seconds expiresAt: z.date().optional()  
    // Evidence evidence: z.array(z.string()).max(10).default([])  notes: z.string().max(2000).optional(),
    // Impact affectedUsers: z.array(z.string()).default([])  notificationsSent: z.boolean().default(false),
    // Metadata moderatorId: z.string().min(1)  automated: z.boolean().default(false),
    reversible: z.boolean().default(true),
    // Reversal tracking reversedAt: z.date().optional()  reversedBy: z.string().optional(),
    reversalReason: z.string().max(1000).optional(),
    createdAt: z.date()
});
// User Safety Record Schema
export const UserSafetyRecordSchema = z.object({
    userId: z.string().min(1),
    // Violation history totalReports: z.number().min(0).default(0)  confirmedViolations: z.number().min(0).default(0),
    falseReports: z.number().min(0).default(0),
    // Current status currentStatus: z.enum(['good_standing', 'warned', 'restricted', 'suspended', 'banned']),
    riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
    // Actions taken warnings: z.number().min(0).default(0)  timeouts: z.number().min(0).default(0),
    suspensions: z.number().min(0).default(0),
    // Current restrictions activeRestrictions: z.array(z.object({
    type: z.string(),
    reason: z.string(),
    expiresAt: z.date().optional()
});
([]),
    // Rehabilitation tracking behaviorScore: z.number().min(0).max(100).default(100)  lastViolation: z.date().optional(),
    rehabilitationProgress;
z.number().min(0).max(100).default(0),
    // Appeal history appeals: z.array(z.object({
    actionId;
z.string(),
    status;
z.enum(['pending', 'approved', 'denied']),
    submittedAt;
z.date(),
    resolvedAt;
z.date().optional();
([]),
    // Notes moderatorNotes: z.array(z.object({
    note;
z.string().max(1000),
    moderatorId;
z.string(),
    createdAt;
z.date();
([]),
    createdAt;
z.date(),
    updatedAt;
z.date();
;
// Content Filter Rule Schema
export const ContentFilterRuleSchema = z.object({
    id: z.string().min(1),
    // Rule details name: z.string().min(1).max(100)  description: z.string().min(1).max(500),
    // Pattern matching  patterns: z.array(z.string()).min(1).max(50), // Regex patterns keywords: z.array(z.string()).max(100).default([])  
    // Targeting contentTypes: z.array(ContentTypeSchema)  severity: ReportSeveritySchema,
    // Actions autoAction: z.enum(['flag', 'block', 'queue_review', 'none']),
    confidence: z.number().min(0).max(1), // Confidence threshold
    // Status active: z.boolean().default(true)  testMode: z.boolean().default(false), // Don't take action, just log
    // Performance tracking matches: z.number().min(0).default(0)  falsePositives: z.number().min(0).default(0),
    accuracy: z.number().min(0).max(1).default(0),
    // Metadata createdBy: z.string().min(1)  createdAt: z.date(),
    updatedAt: z.date()
});
//# sourceMappingURL=moderation.schema.js.map