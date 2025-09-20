import { z } from "zod";
export declare const RitualTypeSchema: z.ZodEnum<["first_light", "orientation_qa", "torch_pass", "space_hunt", "builder_spotlight", "space_wars", "tool_roulette", "wave_challenge", "campus_vibe_check", "seasonal_finale", "custom"]>;
export declare const RitualStatusSchema: z.ZodEnum<["draft", "scheduled", "active", "completed", "paused", "cancelled"]>;
export declare const RitualParticipationSchema: z.ZodObject<{
    ritualId: z.ZodString;
    userId: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    createdAt: Date;
    ritualId: string;
}, {
    userId: string;
    createdAt: Date;
    ritualId: string;
}>;
export declare const RitualRewardSchema: z.ZodObject<{
    type: z.ZodEnum<["access", "badge", "privilege", "content"]>;
    name: z.ZodString;
    description: z.ZodString;
    iconUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "content" | "access" | "badge" | "privilege";
    name: string;
    description: string;
    iconUrl?: string | undefined;
}, {
    type: "content" | "access" | "badge" | "privilege";
    name: string;
    description: string;
    iconUrl?: string | undefined;
}>;
export declare const RitualConfigSchema: z.ZodObject<{
    maxParticipants: z.ZodOptional<z.ZodNumber>;
    showParticipants: z.ZodDefault<z.ZodBoolean>;
    showProgress: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    showParticipants: boolean;
    showProgress: boolean;
    maxParticipants?: number | undefined;
}, {
    maxParticipants?: number | undefined;
    showParticipants?: boolean | undefined;
    showProgress?: boolean | undefined;
}>;
export declare const RitualSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["first_light", "orientation_qa", "torch_pass", "space_hunt", "builder_spotlight", "space_wars", "tool_roulette", "wave_challenge", "campus_vibe_check", "seasonal_finale", "custom"]>;
    status: z.ZodEnum<["draft", "scheduled", "active", "completed", "paused", "cancelled"]>;
    instructions: z.ZodString;
    colorTheme: z.ZodOptional<z.ZodString>;
    actualStart: z.ZodOptional<z.ZodDate>;
    actualEnd: z.ZodOptional<z.ZodDate>;
    schoolId: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "custom" | "builder_spotlight" | "first_light" | "orientation_qa" | "torch_pass" | "space_hunt" | "space_wars" | "tool_roulette" | "wave_challenge" | "campus_vibe_check" | "seasonal_finale";
    status: "draft" | "completed" | "cancelled" | "active" | "scheduled" | "paused";
    updatedAt: Date;
    instructions: string;
    colorTheme?: string | undefined;
    actualStart?: Date | undefined;
    actualEnd?: Date | undefined;
    schoolId?: string | undefined;
}, {
    id: string;
    type: "custom" | "builder_spotlight" | "first_light" | "orientation_qa" | "torch_pass" | "space_hunt" | "space_wars" | "tool_roulette" | "wave_challenge" | "campus_vibe_check" | "seasonal_finale";
    status: "draft" | "completed" | "cancelled" | "active" | "scheduled" | "paused";
    updatedAt: Date;
    instructions: string;
    colorTheme?: string | undefined;
    actualStart?: Date | undefined;
    actualEnd?: Date | undefined;
    schoolId?: string | undefined;
}>;
export declare const RitualAnalyticsSchema: z.ZodObject<{
    ritualId: z.ZodString;
    totalCompletions: z.ZodDefault<z.ZodNumber>;
    completionRate: z.ZodDefault<z.ZodNumber>;
    participantsByMajor: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    ritualId: string;
    totalCompletions: number;
    completionRate: number;
    participantsByMajor: Record<string, number>;
}, {
    ritualId: string;
    totalCompletions?: number | undefined;
    completionRate?: number | undefined;
    participantsByMajor?: Record<string, number> | undefined;
}>;
export declare const RitualAnnouncementSchema: z.ZodObject<{
    ritualId: z.ZodString;
    sentAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    ritualId: string;
    sentAt?: Date | undefined;
}, {
    ritualId: string;
    sentAt?: Date | undefined;
}>;
export type Ritual = z.infer<typeof RitualSchema>;
export type RitualParticipation = z.infer<typeof RitualParticipationSchema>;
export type RitualReward = z.infer<typeof RitualRewardSchema>;
export type RitualConfig = z.infer<typeof RitualConfigSchema>;
export type RitualAnalytics = z.infer<typeof RitualAnalyticsSchema>;
export type RitualAnnouncement = z.infer<typeof RitualAnnouncementSchema>;
export type RitualType = z.infer<typeof RitualTypeSchema>;
export type RitualStatus = z.infer<typeof RitualStatusSchema>;
//# sourceMappingURL=ritual.schema.d.ts.map