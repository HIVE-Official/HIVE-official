import { z } from "zod";
export declare const ContentTypeSchema: z.ZodEnum<["post", "comment", "space", "tool", "user_profile", "event", "ritual_response", "message"]>;
export declare const ReportReasonSchema: z.ZodEnum<["spam", "harassment", "hate_speech", "violence", "sexual_content", "misinformation", "copyright", "privacy_violation", "impersonation", "inappropriate_content", "off_topic", "duplicate", "other"]>;
export declare const ReportStatusSchema: z.ZodEnum<["pending", "under_review", "escalated", "resolved", "dismissed", "appealed"]>;
export declare const ModerationActionSchema: z.ZodEnum<["no_action", "warning", "content_removal", "content_edit", "user_timeout", "user_suspend", "user_ban", "space_disable", "tool_disable", "escalate_to_admin"]>;
export declare const ReportSeveritySchema: z.ZodEnum<["low", "medium", "high", "critical"]>;
export declare const ContentReportSchema: z.ZodObject<{
    id: z.ZodString;
    reason: z.ZodEnum<["spam", "harassment", "hate_speech", "violence", "sexual_content", "misinformation", "copyright", "privacy_violation", "impersonation", "inappropriate_content", "off_topic", "duplicate", "other"]>;
    description: z.ZodString;
    contentSnapshot: z.ZodOptional<z.ZodString>;
    resolvedAt: z.ZodOptional<z.ZodDate>;
    resolvedBy: z.ZodOptional<z.ZodString>;
    appealReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description: string;
    reason: "other" | "spam" | "harassment" | "hate_speech" | "violence" | "sexual_content" | "misinformation" | "copyright" | "privacy_violation" | "impersonation" | "inappropriate_content" | "off_topic" | "duplicate";
    contentSnapshot?: string | undefined;
    resolvedAt?: Date | undefined;
    resolvedBy?: string | undefined;
    appealReason?: string | undefined;
}, {
    id: string;
    description: string;
    reason: "other" | "spam" | "harassment" | "hate_speech" | "violence" | "sexual_content" | "misinformation" | "copyright" | "privacy_violation" | "impersonation" | "inappropriate_content" | "off_topic" | "duplicate";
    contentSnapshot?: string | undefined;
    resolvedAt?: Date | undefined;
    resolvedBy?: string | undefined;
    appealReason?: string | undefined;
}>;
export declare const ModerationQueueItemSchema: z.ZodObject<{
    id: z.ZodString;
    flag: z.ZodString;
    confidence: z.ZodNumber;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    flag: string;
    confidence: number;
    reason?: string | undefined;
}, {
    id: string;
    flag: string;
    confidence: number;
    reason?: string | undefined;
}>;
export declare const ModerationActionLogSchema: z.ZodObject<{
    id: z.ZodString;
    targetId: z.ZodString;
    reversible: z.ZodDefault<z.ZodBoolean>;
    reversalReason: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    targetId: string;
    reversible: boolean;
    reversalReason?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    targetId: string;
    reversible?: boolean | undefined;
    reversalReason?: string | undefined;
}>;
export declare const UserSafetyRecordSchema: z.ZodObject<{
    userId: z.ZodString;
    falseReports: z.ZodDefault<z.ZodNumber>;
    riskLevel: z.ZodEnum<["low", "medium", "high", "critical"]>;
    suspensions: z.ZodDefault<z.ZodNumber>;
    type: z.ZodString;
    reason: z.ZodString;
    expiresAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    type: string;
    userId: string;
    reason: string;
    falseReports: number;
    riskLevel: "low" | "medium" | "high" | "critical";
    suspensions: number;
    expiresAt?: Date | undefined;
}, {
    type: string;
    userId: string;
    reason: string;
    riskLevel: "low" | "medium" | "high" | "critical";
    expiresAt?: Date | undefined;
    falseReports?: number | undefined;
    suspensions?: number | undefined;
}>;
export declare const ContentFilterRuleSchema: z.ZodObject<{
    id: z.ZodString;
    confidence: z.ZodNumber;
    accuracy: z.ZodDefault<z.ZodNumber>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedAt: Date;
    confidence: number;
    accuracy: number;
}, {
    id: string;
    updatedAt: Date;
    confidence: number;
    accuracy?: number | undefined;
}>;
export type ContentReport = z.infer<typeof ContentReportSchema>;
export type ModerationQueueItem = z.infer<typeof ModerationQueueItemSchema>;
export type ModerationActionLog = z.infer<typeof ModerationActionLogSchema>;
export type UserSafetyRecord = z.infer<typeof UserSafetyRecordSchema>;
export type ContentFilterRule = z.infer<typeof ContentFilterRuleSchema>;
export type ContentType = z.infer<typeof ContentTypeSchema>;
export type ReportReason = z.infer<typeof ReportReasonSchema>;
export type ReportStatus = z.infer<typeof ReportStatusSchema>;
export type ModerationAction = z.infer<typeof ModerationActionSchema>;
export type ReportSeverity = z.infer<typeof ReportSeveritySchema>;
//# sourceMappingURL=moderation.schema.d.ts.map