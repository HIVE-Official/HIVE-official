import { z } from "zod";
/**
 * Content types for Main Feed ranking
 * Events > Posts > Tools (Pulse, PromptPost, etc.)
 */
export declare enum FeedContentType {
    EVENT = "event",// Highest priority
    POST = "post",// Medium priority
    TOOL = "tool"
}
/**
 * Feed content source origin
 */
export declare enum FeedContentSource {
    CAMPUS_WIDE = "campus_wide",// Baseline scoring
    JOINED_SPACE = "joined_space"
}
/**
 * Base interface for rankable feed content
 */
export interface RankableFeedContent {
    id: string;
    type: FeedContentType;
    source: FeedContentSource;
    spaceId?: string;
    authorId: string;
    createdAt: Date;
    engagementCount: number;
    hasSurgeTag: boolean;
    metadata: Record<string, unknown>;
}
/**
 * Main Feed ranking configuration and algorithm
 */
export declare class MainFeedRanker {
    private static readonly TYPE_WEIGHTS;
    private static readonly SOURCE_BOOST;
    private static readonly SURGE_BOOST;
    private static readonly EVENT_DENSITY_CAP;
    private static readonly ARCHIVE_THRESHOLD_HOURS;
    /**
     * Calculate recency score with decay curve
     * 100% at t=0h → 30% at 24h → 10% at 72h
     */
    private static calculateRecencyScore;
    /**
     * Calculate engagement score with log scaling
     * Each emoji adds +2pts (up to 20), then flat
     */
    private static calculateEngagementScore;
    /**
     * Main ranking function implementing the specified algorithm
     */
    static rankContent(contents: RankableFeedContent[]): RankableFeedContent[];
    /**
     * Check if content should be archived (older than 72h with low engagement)
     */
    static shouldArchive(content: RankableFeedContent, minEngagementThreshold?: number): boolean;
    /**
     * Get archived content for "Archive" section
     */
    static getArchivedContent(contents: RankableFeedContent[]): RankableFeedContent[];
    /**
     * Get active content (not archived)
     */
    static getActiveContent(contents: RankableFeedContent[]): RankableFeedContent[];
    /**
     * Get debug info for content ranking (useful for development)
     */
    static getDebugInfo(content: RankableFeedContent): Record<string, number>;
}
/**
 * Tool surge state tracking
 */
export interface ToolSurgeState {
    toolId: string;
    toolName: string;
    surgeStartedAt: Date;
    surgeScore: number;
    participantCount: number;
    isActive: boolean;
}
/**
 * Track tool surge states for content boost
 */
export declare class ToolSurgeTracker {
    private static readonly SURGE_DURATION_HOURS;
    private static readonly MIN_PARTICIPANTS_FOR_SURGE;
    private static readonly SURGE_SCORE_THRESHOLD;
    /**
     * Determine if a tool is currently surging
     */
    static isToolSurging(toolId: string, surgeStates: ToolSurgeState[]): boolean;
    /**
     * Calculate surge score based on tool usage
     */
    static calculateSurgeScore(recentUsageCount: number, participantCount: number, timeWindowHours: number): number;
    /**
     * Update tool surge state based on recent activity
     */
    static updateSurgeState(toolId: string, recentUsageCount: number, participantCount: number, existingStates: ToolSurgeState[]): ToolSurgeState;
}
/**
 * Zod schemas for validation
 */
export declare const FeedContentSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof FeedContentType>;
    source: z.ZodNativeEnum<typeof FeedContentSource>;
    spaceId: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    createdAt: z.ZodDate;
    engagementCount: z.ZodNumber;
    hasSurgeTag: z.ZodBoolean;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: FeedContentType;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    authorId: string;
    source: FeedContentSource;
    engagementCount: number;
    hasSurgeTag: boolean;
    spaceId?: string | undefined;
}, {
    type: FeedContentType;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    authorId: string;
    source: FeedContentSource;
    engagementCount: number;
    hasSurgeTag: boolean;
    spaceId?: string | undefined;
}>;
export declare const ToolSurgeStateSchema: z.ZodObject<{
    toolId: z.ZodString;
    toolName: z.ZodString;
    surgeStartedAt: z.ZodDate;
    surgeScore: z.ZodNumber;
    participantCount: z.ZodNumber;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    toolName: string;
    participantCount: number;
    isActive: boolean;
    surgeStartedAt: Date;
    surgeScore: number;
}, {
    toolId: string;
    toolName: string;
    participantCount: number;
    isActive: boolean;
    surgeStartedAt: Date;
    surgeScore: number;
}>;
//# sourceMappingURL=main-feed.d.ts.map