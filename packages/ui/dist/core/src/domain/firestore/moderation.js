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
    // Report details
    contentType: ContentTypeSchema,
    contentId: z.string().min(1),
    reason: ReportReasonSchema,
    description: z.string().min(1).max(1000),
    // Reporter info
    reportedBy: z.string().min(1),
    reporterAnonymous: z.boolean().default(false),
    // Content info
    contentAuthor: z.string().min(1),
    contentUrl: z.string().optional(),
    contentSnapshot: z.string().max(5000).optional(), // Snapshot of content at report time
    // Categorization
    severity: ReportSeveritySchema,
    category: z.array(z.string()).max(5).default([]),
    // Status tracking
    status: ReportStatusSchema,
    priority: z.number().min(1).max(5).default(3),
    // Evidence
    screenshots: z.array(z.string()).max(5).default([]), // URLs to screenshots
    additionalEvidence: z.array(z.string()).max(10).default([]), // URLs or text
    // Assignment
    assignedTo: z.string().optional(),
    assignedAt: z.date().optional(),
    // Resolution
    resolution: z.string().max(1000).optional(),
    actionTaken: ModerationActionSchema.optional(),
    resolvedAt: z.date().optional(),
    resolvedBy: z.string().optional(),
    // Appeal process
    appealable: z.boolean().default(true),
    appealedAt: z.date().optional(),
    appealReason: z.string().max(1000).optional(),
    // Timestamps
    createdAt: z.date(),
    updatedAt: z.date()
});
// Moderation Queue Item Schema
export const ModerationQueueItemSchema = z.object({
    id: z.string().min(1),
    // Queue details
    reportId: z.string().min(1),
    queueType: z.enum(['auto_flagged', 'user_reported', 'escalated', 'appeal']),
    // Priority scoring
    priorityScore: z.number().min(0).max(100),
    urgency: z.enum(['low', 'medium', 'high', 'critical']),
    // Content summary
    contentPreview: z.string().max(500),
    contentMetadata: z.record(z.string(), z.any()).optional(),
    // Automated analysis
    aiFlags: z.array(z.object({
        flag: z.string(),
        confidence: z.number().min(0).max(1),
        reason: z.string().optional()
    })).default([]),
    // Assignment
    assignedTo: z.string().optional(),
    assignedAt: z.date().optional(),
    estimatedReviewTime: z.number().min(0).optional(), // minutes
    // Processing
    status: z.enum(['queued', 'in_progress', 'completed', 'escalated']),
    // SLA tracking
    slaTarget: z.date().optional(),
    slaBreached: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Moderation Action Log Schema
export const ModerationActionLogSchema = z.object({
    id: z.string().min(1),
    // Action details
    action: ModerationActionSchema,
    targetType: ContentTypeSchema,
    targetId: z.string().min(1),
    // Context
    reportId: z.string().optional(),
    reason: z.string().min(1).max(1000),
    // Duration (for timeouts/suspensions)
    duration: z.number().min(0).optional(), // seconds
    expiresAt: z.date().optional(),
    // Evidence
    evidence: z.array(z.string()).max(10).default([]),
    notes: z.string().max(2000).optional(),
    // Impact
    affectedUsers: z.array(z.string()).default([]),
    notificationsSent: z.boolean().default(false),
    // Metadata
    moderatorId: z.string().min(1),
    automated: z.boolean().default(false),
    reversible: z.boolean().default(true),
    // Reversal tracking
    reversedAt: z.date().optional(),
    reversedBy: z.string().optional(),
    reversalReason: z.string().max(1000).optional(),
    createdAt: z.date()
});
// User Safety Record Schema
export const UserSafetyRecordSchema = z.object({
    userId: z.string().min(1),
    // Violation history
    totalReports: z.number().min(0).default(0),
    confirmedViolations: z.number().min(0).default(0),
    falseReports: z.number().min(0).default(0),
    // Current status
    currentStatus: z.enum(['good_standing', 'warned', 'restricted', 'suspended', 'banned']),
    riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
    // Actions taken
    warnings: z.number().min(0).default(0),
    timeouts: z.number().min(0).default(0),
    suspensions: z.number().min(0).default(0),
    // Current restrictions
    activeRestrictions: z.array(z.object({
        type: z.string(),
        reason: z.string(),
        expiresAt: z.date().optional()
    })).default([]),
    // Rehabilitation tracking
    behaviorScore: z.number().min(0).max(100).default(100),
    lastViolation: z.date().optional(),
    rehabilitationProgress: z.number().min(0).max(100).default(0),
    // Appeal history
    appeals: z.array(z.object({
        actionId: z.string(),
        status: z.enum(['pending', 'approved', 'denied']),
        submittedAt: z.date(),
        resolvedAt: z.date().optional()
    })).default([]),
    // Notes
    moderatorNotes: z.array(z.object({
        note: z.string().max(1000),
        moderatorId: z.string(),
        createdAt: z.date()
    })).default([]),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Content Filter Rule Schema
export const ContentFilterRuleSchema = z.object({
    id: z.string().min(1),
    // Rule details
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    // Pattern matching
    patterns: z.array(z.string()).min(1).max(50), // Regex patterns
    keywords: z.array(z.string()).max(100).default([]),
    // Targeting
    contentTypes: z.array(ContentTypeSchema),
    severity: ReportSeveritySchema,
    // Actions
    autoAction: z.enum(['flag', 'block', 'queue_review', 'none']),
    confidence: z.number().min(0).max(1), // Confidence threshold
    // Status
    active: z.boolean().default(true),
    testMode: z.boolean().default(false), // Don't take action, just log
    // Performance tracking
    matches: z.number().min(0).default(0),
    falsePositives: z.number().min(0).default(0),
    accuracy: z.number().min(0).max(1).default(0),
    // Metadata
    createdBy: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Firestore-specific helpers
export const ContentReportConverter = {
    toFirestore: (report) => ({
        ...report,
        assignedAt: report.assignedAt,
        resolvedAt: report.resolvedAt,
        appealedAt: report.appealedAt,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
    }),
    fromFirestore: (data) => {
        return ContentReportSchema.parse({
            ...data,
            assignedAt: data.assignedAt?.toDate?.() || data.assignedAt,
            resolvedAt: data.resolvedAt?.toDate?.() || data.resolvedAt,
            appealedAt: data.appealedAt?.toDate?.() || data.appealedAt,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
        });
    }
};
export const ModerationActionLogConverter = {
    toFirestore: (log) => ({
        ...log,
        expiresAt: log.expiresAt,
        reversedAt: log.reversedAt,
        createdAt: log.createdAt
    }),
    fromFirestore: (data) => {
        return ModerationActionLogSchema.parse({
            ...data,
            expiresAt: data.expiresAt?.toDate?.() || data.expiresAt,
            reversedAt: data.reversedAt?.toDate?.() || data.reversedAt,
            createdAt: data.createdAt?.toDate?.() || data.createdAt
        });
    }
};
// Collection paths
export const MODERATION_COLLECTIONS = {
    CONTENT_REPORTS: 'content_reports',
    MODERATION_QUEUE: 'moderation_queue',
    ACTION_LOGS: 'moderation_action_logs',
    USER_SAFETY_RECORDS: 'user_safety_records',
    FILTER_RULES: 'content_filter_rules',
    SAFETY_REPORTS: 'safety_reports'
};
// Moderation utility functions
export const ModerationUtils = {
    createReport: (contentType, contentId, reason, description, reportedBy, contentAuthor, options) => ({
        contentType,
        contentId,
        reason,
        description,
        reportedBy,
        reporterAnonymous: false,
        contentAuthor,
        severity: ModerationUtils.getSeverityFromReason(reason),
        category: [],
        status: 'pending',
        priority: 3,
        screenshots: [],
        additionalEvidence: [],
        appealable: true,
        ...options
    }),
    getSeverityFromReason: (reason) => {
        const severityMap = {
            'spam': 'low',
            'harassment': 'high',
            'hate_speech': 'critical',
            'violence': 'critical',
            'sexual_content': 'high',
            'misinformation': 'medium',
            'copyright': 'medium',
            'privacy_violation': 'high',
            'impersonation': 'high',
            'inappropriate_content': 'medium',
            'off_topic': 'low',
            'duplicate': 'low',
            'other': 'medium'
        };
        return severityMap[reason] || 'medium';
    },
    calculatePriorityScore: (report) => {
        let score = 50; // Base score
        // Severity multipliers
        const severityMultipliers = {
            'low': 0.5,
            'medium': 1.0,
            'high': 1.5,
            'critical': 2.0
        };
        score *= severityMultipliers[report.severity];
        // Reason adjustments
        if (report.reason === 'violence' || report.reason === 'hate_speech') {
            score += 30;
        }
        // Evidence bonus
        if (report.screenshots.length > 0)
            score += 10;
        if (report.additionalEvidence.length > 0)
            score += 5;
        // Time factor (newer reports get higher priority)
        const hoursOld = (Date.now() - report.createdAt.getTime()) / (1000 * 60 * 60);
        if (hoursOld < 1)
            score += 15;
        else if (hoursOld < 6)
            score += 10;
        else if (hoursOld < 24)
            score += 5;
        return Math.min(100, Math.max(0, Math.round(score)));
    },
    shouldAutoFlag: (report) => {
        return report.severity === 'critical' ||
            report.reason === 'violence' ||
            report.reason === 'hate_speech';
    },
    getEstimatedReviewTime: (report) => {
        // Returns estimated review time in minutes
        const baseTime = {
            'low': 5,
            'medium': 15,
            'high': 30,
            'critical': 60
        };
        let time = baseTime[report.severity];
        // Add time for evidence review
        time += report.screenshots.length * 2;
        time += report.additionalEvidence.length * 1;
        // Complex reasons take longer
        if (['misinformation', 'copyright', 'privacy_violation'].includes(report.reason)) {
            time *= 1.5;
        }
        return Math.round(time);
    },
    canAppeal: (report) => {
        return report.appealable &&
            report.status === 'resolved' &&
            !report.appealedAt;
    },
    isStale: (report, staleDays = 30) => {
        const staleDate = new Date();
        staleDate.setDate(staleDate.getDate() - staleDays);
        return report.createdAt < staleDate && report.status === 'pending';
    }
};
// User safety utilities
export const UserSafetyUtils = {
    calculateRiskLevel: (record) => {
        const violationRatio = record.totalReports > 0
            ? record.confirmedViolations / record.totalReports
            : 0;
        if (record.confirmedViolations >= 5 || violationRatio > 0.8)
            return 'critical';
        if (record.confirmedViolations >= 3 || violationRatio > 0.6)
            return 'high';
        if (record.confirmedViolations >= 1 || violationRatio > 0.3)
            return 'medium';
        return 'low';
    },
    shouldSuspend: (record) => {
        return record.confirmedViolations >= 3 ||
            record.warnings >= 5 ||
            record.behaviorScore < 20;
    },
    shouldBan: (record) => {
        return record.confirmedViolations >= 5 ||
            record.suspensions >= 3 ||
            record.behaviorScore < 10;
    },
    calculateRehabilitationProgress: (record) => {
        if (!record.lastViolation)
            return 100;
        const daysSince = (Date.now() - record.lastViolation.getTime()) / (1000 * 60 * 60 * 24);
        const maxRehabDays = 90; // 3 months for full rehabilitation
        return Math.min(100, Math.round((daysSince / maxRehabDays) * 100));
    },
    updateBehaviorScore: (record, action) => {
        let newScore = record.behaviorScore;
        switch (action) {
            case 'violation':
                newScore -= 20;
                break;
            case 'positive':
                newScore += 5;
                break;
            case 'neutral':
                // Gradual recovery over time
                newScore += 0.1;
                break;
        }
        return Math.min(100, Math.max(0, newScore));
    }
};
// Content filter utilities
export const ContentFilterUtils = {
    testContent: (content, rules) => {
        for (const rule of rules.filter(r => r.active)) {
            for (const pattern of rule.patterns) {
                try {
                    const regex = new RegExp(pattern, 'gi');
                    if (regex.test(content)) {
                        return {
                            matched: true,
                            rule,
                            confidence: rule.confidence
                        };
                    }
                }
                catch {
                    // Invalid regex, skip
                    continue;
                }
            }
            // Check keywords
            const lowerContent = content.toLowerCase();
            for (const keyword of rule.keywords) {
                if (lowerContent.includes(keyword.toLowerCase())) {
                    return {
                        matched: true,
                        rule,
                        confidence: rule.confidence
                    };
                }
            }
        }
        return { matched: false, confidence: 0 };
    },
    updateRuleAccuracy: (rule, wasCorrect) => {
        const newMatches = rule.matches + 1;
        const newFalsePositives = rule.falsePositives + (wasCorrect ? 0 : 1);
        const newAccuracy = (newMatches - newFalsePositives) / newMatches;
        return {
            matches: newMatches,
            falsePositives: newFalsePositives,
            accuracy: Math.max(0, newAccuracy)
        };
    }
};
//# sourceMappingURL=moderation.js.map