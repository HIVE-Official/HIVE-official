"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolSurgeStateSchema = exports.FeedContentSchema = exports.ToolSurgeTracker = exports.MainFeedRanker = exports.FeedContentSource = exports.FeedContentType = void 0;
const zod_1 = require("zod");
/**
 * Content types for Main Feed ranking
 * Events > Posts > Tools (Pulse, PromptPost, etc.)
 */
var FeedContentType;
(function (FeedContentType) {
    FeedContentType["EVENT"] = "event";
    FeedContentType["POST"] = "post";
    FeedContentType["TOOL"] = "tool";
})(FeedContentType || (exports.FeedContentType = FeedContentType = {}));
/**
 * Feed content source origin
 */
var FeedContentSource;
(function (FeedContentSource) {
    FeedContentSource["CAMPUS_WIDE"] = "campus_wide";
    FeedContentSource["JOINED_SPACE"] = "joined_space";
})(FeedContentSource || (exports.FeedContentSource = FeedContentSource = {}));
/**
 * Main Feed ranking configuration and algorithm
 */
class MainFeedRanker {
    /**
     * Calculate recency score with decay curve
     * 100% at t=0h → 30% at 24h → 10% at 72h
     */
    static calculateRecencyScore(createdAt) {
        const now = new Date();
        const hoursOld = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
        if (hoursOld <= 0)
            return 100;
        if (hoursOld >= 72)
            return 10;
        // Exponential decay from 100% to 10% over 72 hours
        // Formula: 100 * exp(-0.032 * hours) with floor at 10%
        const decayFactor = -0.032;
        const score = 100 * Math.exp(decayFactor * hoursOld);
        return Math.max(score, 10);
    }
    /**
     * Calculate engagement score with log scaling
     * Each emoji adds +2pts (up to 20), then flat
     */
    static calculateEngagementScore(engagementCount) {
        if (engagementCount === 0)
            return 0;
        if (engagementCount <= 10)
            return engagementCount * 2; // Linear up to 20pts
        // Log scale after 10 reactions to prevent runaway scores
        return 20 + Math.log10(engagementCount - 9) * 5;
    }
    /**
     * Main ranking function implementing the specified algorithm
     */
    static rankContent(contents) {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        // First pass: identify events from the last 24 hours for density cap
        const recentEvents = contents.filter((content) => content.type === FeedContentType.EVENT && content.createdAt > oneDayAgo);
        // Apply event density cap (keep only top 5 events by engagement)
        const cappedEvents = recentEvents
            .sort((a, b) => b.engagementCount - a.engagementCount)
            .slice(0, this.EVENT_DENSITY_CAP);
        const cappedEventIds = new Set(cappedEvents.map((e) => e.id));
        // Filter out excess events
        const filteredContents = contents.filter((content) => content.type !== FeedContentType.EVENT ||
            content.createdAt <= oneDayAgo ||
            cappedEventIds.has(content.id));
        // Calculate scores for each item
        const scoredContents = filteredContents.map((content) => {
            // Base scores
            const recencyScore = this.calculateRecencyScore(content.createdAt);
            const engagementScore = this.calculateEngagementScore(content.engagementCount);
            const typeScore = this.TYPE_WEIGHTS[content.type];
            const sourceBoost = this.SOURCE_BOOST[content.source];
            // Special boosts
            const surgeBoost = content.hasSurgeTag ? this.SURGE_BOOST : 0;
            // Total score calculation
            const totalScore = recencyScore + engagementScore + typeScore + sourceBoost + surgeBoost;
            return {
                ...content,
                _score: totalScore,
                _recencyScore: recencyScore,
                _engagementScore: engagementScore,
                _typeScore: typeScore,
                _sourceBoost: sourceBoost,
                _surgeBoost: surgeBoost,
            };
        });
        // Sort by total score (highest first)
        return scoredContents
            .sort((a, b) => b._score - a._score)
            .map(({ _score, _recencyScore, _engagementScore, _typeScore, _sourceBoost, _surgeBoost, ...content }) => content);
    }
    /**
     * Check if content should be archived (older than 72h with low engagement)
     */
    static shouldArchive(content, minEngagementThreshold = 5) {
        const hoursOld = (new Date().getTime() - content.createdAt.getTime()) / (1000 * 60 * 60);
        return (hoursOld > this.ARCHIVE_THRESHOLD_HOURS &&
            content.engagementCount < minEngagementThreshold);
    }
    /**
     * Get archived content for "Archive" section
     */
    static getArchivedContent(contents) {
        return contents
            .filter((content) => this.shouldArchive(content))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Most recent first in archive
    }
    /**
     * Get active content (not archived)
     */
    static getActiveContent(contents) {
        return contents.filter((content) => !this.shouldArchive(content));
    }
    /**
     * Get debug info for content ranking (useful for development)
     */
    static getDebugInfo(content) {
        const recencyScore = this.calculateRecencyScore(content.createdAt);
        const engagementScore = this.calculateEngagementScore(content.engagementCount);
        const typeScore = this.TYPE_WEIGHTS[content.type];
        const sourceBoost = this.SOURCE_BOOST[content.source];
        const surgeBoost = content.hasSurgeTag ? this.SURGE_BOOST : 0;
        const totalScore = recencyScore + engagementScore + typeScore + sourceBoost + surgeBoost;
        return {
            totalScore,
            recencyScore,
            engagementScore,
            typeScore,
            sourceBoost,
            surgeBoost,
        };
    }
}
exports.MainFeedRanker = MainFeedRanker;
// Weighting Strategy per specifications
MainFeedRanker.TYPE_WEIGHTS = {
    [FeedContentType.EVENT]: 30, // Events highest priority
    [FeedContentType.POST]: 20, // Posts medium priority
    [FeedContentType.TOOL]: 10, // Tools lowest priority
};
MainFeedRanker.SOURCE_BOOST = {
    [FeedContentSource.CAMPUS_WIDE]: 0, // Baseline
    [FeedContentSource.JOINED_SPACE]: 10, // +10 points
};
MainFeedRanker.SURGE_BOOST = 25; // Posts from surging Tools = +25pts
MainFeedRanker.EVENT_DENSITY_CAP = 5; // Hard limit 5 events/day
MainFeedRanker.ARCHIVE_THRESHOLD_HOURS = 72; // After 72h collapse into "Archive"
/**
 * Track tool surge states for content boost
 */
class ToolSurgeTracker {
    /**
     * Determine if a tool is currently surging
     */
    static isToolSurging(toolId, surgeStates) {
        const now = new Date();
        const toolState = surgeStates.find((state) => state.toolId === toolId);
        if (!toolState || !toolState.isActive)
            return false;
        const hoursAgo = (now.getTime() - toolState.surgeStartedAt.getTime()) / (1000 * 60 * 60);
        return hoursAgo <= this.SURGE_DURATION_HOURS;
    }
    /**
     * Calculate surge score based on tool usage
     */
    static calculateSurgeScore(recentUsageCount, participantCount, timeWindowHours) {
        // Usage density: uses per participant per hour
        const usageDensity = recentUsageCount / (participantCount * timeWindowHours);
        // Participation factor: how many unique users are using the tool
        const participationFactor = Math.min(participantCount / this.MIN_PARTICIPANTS_FOR_SURGE, 3);
        return usageDensity * participationFactor * 100;
    }
    /**
     * Update tool surge state based on recent activity
     */
    static updateSurgeState(toolId, recentUsageCount, participantCount, existingStates) {
        const now = new Date();
        const surgeScore = this.calculateSurgeScore(recentUsageCount, participantCount, 1); // 1 hour window
        const existingState = existingStates.find((state) => state.toolId === toolId);
        return {
            toolId,
            toolName: existingState?.toolName || `Tool ${toolId}`,
            surgeStartedAt: existingState?.surgeStartedAt || now,
            surgeScore,
            participantCount,
            isActive: surgeScore >= this.SURGE_SCORE_THRESHOLD &&
                participantCount >= this.MIN_PARTICIPANTS_FOR_SURGE,
        };
    }
}
exports.ToolSurgeTracker = ToolSurgeTracker;
ToolSurgeTracker.SURGE_DURATION_HOURS = 24;
ToolSurgeTracker.MIN_PARTICIPANTS_FOR_SURGE = 5;
ToolSurgeTracker.SURGE_SCORE_THRESHOLD = 50; // Minimum score to trigger surge
/**
 * Zod schemas for validation
 */
exports.FeedContentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.nativeEnum(FeedContentType),
    source: zod_1.z.nativeEnum(FeedContentSource),
    spaceId: zod_1.z.string().optional(),
    authorId: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    engagementCount: zod_1.z.number().min(0),
    hasSurgeTag: zod_1.z.boolean(),
    metadata: zod_1.z.record(zod_1.z.unknown()),
});
exports.ToolSurgeStateSchema = zod_1.z.object({
    toolId: zod_1.z.string(),
    toolName: zod_1.z.string(),
    surgeStartedAt: zod_1.z.date(),
    surgeScore: zod_1.z.number(),
    participantCount: zod_1.z.number().min(0),
    isActive: zod_1.z.boolean(),
});
//# sourceMappingURL=main-feed.js.map