/**
 * HIVE Feed Algorithm Service
 *
 * Implements behavioral psychology-based content scoring according to SPEC.md:394-435
 * Score = (AnxietyRelief × 0.4) + (SocialProof × 0.3) + (InsiderAccess × 0.3)
 *
 * Key Principles:
 * - Variable ratio reinforcement (slot machine dynamic)
 * - Investment escalation (view → react → comment → repost → requote)
 * - Social proof signals ("3 friends reacted")
 * - FOMO generation (limited time, exclusive access)
 */
import type { User, Space } from '../types/index';
interface FeedPost {
    id: string;
    content: string;
    authorId: string;
    authorRole?: 'leader' | 'moderator' | 'member';
    spaceId: string;
    timestamp: string;
    expiresAt?: string;
    reactions?: {
        friendsCount?: number;
    };
    engagement?: {
        hourlyRate?: number;
    };
}
interface Connection {
    id: string;
    userId: string;
    connectedUserId: string;
    status: 'pending' | 'accepted' | 'blocked';
    createdAt: Date;
}
export interface FeedAlgorithmConfig {
    anxietyReliefWeight: number;
    socialProofWeight: number;
    insiderAccessWeight: number;
    campusId: string;
}
export interface ScoredPost extends FeedPost {
    algorithmScore: number;
    anxietyReliefScore: number;
    socialProofScore: number;
    insiderAccessScore: number;
    scoreBreakdown: {
        type: 'anxiety_relief' | 'social_proof' | 'insider_access' | 'mixed';
        primaryFactor: string;
        confidence: number;
    };
}
export interface AnxietyReliefSignals {
    studyStress: boolean;
    loneliness: boolean;
    fomo: boolean;
    academicHelp: boolean;
    foodInsecurity: boolean;
    socialAnxiety: boolean;
}
export interface SocialProofSignals {
    friendsEngaged: number;
    connectionsInSpace: number;
    campusVelocity: number;
    mutualConnections: number;
    dormProximity: boolean;
    majorRelevance: boolean;
}
export interface InsiderAccessSignals {
    spaceMemberCount: number;
    requiresInvite: boolean;
    newMemberRestricted: boolean;
    leaderOnly: boolean;
    timeExclusive: boolean;
    greekExclusive: boolean;
}
export declare class FeedAlgorithmService {
    private config;
    constructor(config: FeedAlgorithmConfig);
    /**
     * Score posts for feed ranking according to behavioral psychology
     */
    scorePost(post: FeedPost, user: User, space: Space, userConnections: Connection[]): ScoredPost;
    /**
     * Calculate anxiety relief score (0-100)
     * Higher scores for content that solves immediate student anxieties
     */
    private calculateAnxietyRelief;
    /**
     * Calculate social proof score (0-100)
     * Higher scores when friends/connections are already engaged
     */
    private calculateSocialProof;
    /**
     * Calculate insider access score (0-100)
     * Higher scores for exclusive/hard-to-find communities
     */
    private calculateInsiderAccess;
    /**
     * Extract anxiety relief signals from post content
     */
    private extractAnxietySignals;
    /**
     * Extract social proof signals
     */
    private extractSocialProofSignals;
    /**
     * Extract insider access signals
     */
    private extractInsiderAccessSignals;
    /**
     * Determine primary score type for analytics
     */
    private determineScoreType;
    /**
     * Helper methods for time-based scoring
     */
    private isFirstYear;
    private isHappeningSoon;
    private isMealTime;
    /**
     * Variable ratio reinforcement - not every scroll has gold
     * Implements slot machine psychology per SPEC
     */
    applyVariableRatio(posts: ScoredPost[]): ScoredPost[];
}
/**
 * Default configuration following SPEC requirements
 */
export declare const defaultFeedConfig: FeedAlgorithmConfig;
export {};
//# sourceMappingURL=feed-algorithm.service.d.ts.map