"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFeedConfig = exports.FeedAlgorithmService = void 0;
const space_category_value_1 = require("../../spaces/value-objects/space-category.value");
class FeedAlgorithmService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Score posts for feed ranking according to behavioral psychology
     */
    scorePost(post, user, space, userConnections) {
        const anxietyReliefScore = this.calculateAnxietyRelief(post, user, space);
        const socialProofScore = this.calculateSocialProof(post, user, userConnections);
        const insiderAccessScore = this.calculateInsiderAccess(post, space, user);
        const algorithmScore = (anxietyReliefScore * this.config.anxietyReliefWeight) +
            (socialProofScore * this.config.socialProofWeight) +
            (insiderAccessScore * this.config.insiderAccessWeight);
        const scoreBreakdown = this.determineScoreType(anxietyReliefScore, socialProofScore, insiderAccessScore);
        return {
            ...post,
            algorithmScore,
            anxietyReliefScore,
            socialProofScore,
            insiderAccessScore,
            scoreBreakdown
        };
    }
    /**
     * Calculate anxiety relief score (0-100)
     * Higher scores for content that solves immediate student anxieties
     */
    calculateAnxietyRelief(post, user, space) {
        const signals = this.extractAnxietySignals(post.content);
        let score = 0;
        // Study stress relief - highest priority during academic periods
        if (signals.studyStress) {
            score += 40;
            // Boost during finals/midterm periods (would come from calendar context)
            score += 20;
        }
        // Loneliness relief - critical for first-year students
        if (signals.loneliness) {
            score += 35;
            // Note: Profile doesn't have nested profile property, access graduationYear directly
            if (user.academicInfo?.graduationYear && this.isFirstYear(user.academicInfo.graduationYear)) {
                score += 15;
            }
        }
        // FOMO relief - time-sensitive content
        if (signals.fomo) {
            score += 30;
            // Boost for events happening soon
            if (post.timestamp && this.isHappeningSoon(post.timestamp)) {
                score += 20;
            }
        }
        // Academic help - major-specific boost
        if (signals.academicHelp) {
            score += 25;
            if (space.category.value === space_category_value_1.SpaceCategoryEnum.ACADEMIC && space.name.toString().includes(user.personalInfo?.major || '')) {
                score += 25;
            }
        }
        // Food insecurity relief
        if (signals.foodInsecurity) {
            score += 20;
            // Boost during meal times
            if (this.isMealTime()) {
                score += 15;
            }
        }
        // Social anxiety relief
        if (signals.socialAnxiety) {
            score += 25;
            if (space.category.value === space_category_value_1.SpaceCategoryEnum.SOCIAL) {
                score += 20; // Social spaces feel safer for social anxiety
            }
        }
        return Math.min(score, 100);
    }
    /**
     * Calculate social proof score (0-100)
     * Higher scores when friends/connections are already engaged
     */
    calculateSocialProof(post, user, userConnections) {
        const signals = this.extractSocialProofSignals(post, user, userConnections);
        let score = 0;
        // Friends already engaged - strongest signal
        if (signals.friendsEngaged > 0) {
            score += 30 + (signals.friendsEngaged * 15); // Cap at ~75
        }
        // Connections in space - "where your friends are"
        if (signals.connectionsInSpace > 0) {
            score += 20 + (signals.connectionsInSpace * 5); // Cap at ~45
        }
        // Campus velocity - trending content
        if (signals.campusVelocity > 10) { // 10+ engagements in 2h
            score += 25;
        }
        // Mutual connections with author
        if (signals.mutualConnections > 0) {
            score += 15 + (signals.mutualConnections * 3);
        }
        // Dorm proximity - "your floor"
        if (signals.dormProximity) {
            score += 20;
        }
        // Major relevance
        if (signals.majorRelevance) {
            score += 15;
        }
        return Math.min(score, 100);
    }
    /**
     * Calculate insider access score (0-100)
     * Higher scores for exclusive/hard-to-find communities
     */
    calculateInsiderAccess(post, space, user) {
        const signals = this.extractInsiderAccessSignals(post, space, user);
        let score = 0;
        // Smaller communities feel more exclusive
        if (signals.spaceMemberCount < 20) {
            score += 40;
        }
        else if (signals.spaceMemberCount < 50) {
            score += 25;
        }
        else if (signals.spaceMemberCount < 100) {
            score += 15;
        }
        // Invite-only spaces
        if (signals.requiresInvite) {
            score += 35;
        }
        // New member restrictions - "you're in the inner circle"
        if (signals.newMemberRestricted) {
            score += 25;
        }
        // Leader-only content
        if (signals.leaderOnly) {
            score += 20;
        }
        // Time-exclusive content
        if (signals.timeExclusive) {
            score += 30;
        }
        // Greek exclusive
        if (signals.greekExclusive) {
            score += 25;
        }
        return Math.min(score, 100);
    }
    /**
     * Extract anxiety relief signals from post content
     */
    extractAnxietySignals(content) {
        const lowerContent = content.toLowerCase();
        return {
            studyStress: /\b(midterm|finals?|stressed|cramming|exam|quiz|studying|library|study\s+group)\b/.test(lowerContent),
            loneliness: /\b(lonely|hang\s+out|anyone\s+want|join\s+me|looking\s+for\s+friends)\b/.test(lowerContent),
            fomo: /\b(tonight|missing\s+out|what's\s+happening|going\s+on|events?\s+today)\b/.test(lowerContent),
            academicHelp: /\b(help\s+with|study\s+group|tutoring|homework|assignment)\b/.test(lowerContent),
            foodInsecurity: /\b(dining\s+hall|free\s+food|cheap\s+eats|hungry|meal\s+plan)\b/.test(lowerContent),
            socialAnxiety: /\b(nervous|first\s+time|don't\s+know\s+anyone|shy|anxious)\b/.test(lowerContent)
        };
    }
    /**
     * Extract social proof signals
     */
    extractSocialProofSignals(post, user, userConnections) {
        // This would integrate with actual user data
        // For now, return mock implementation
        return {
            friendsEngaged: post.reactions?.friendsCount || 0,
            connectionsInSpace: 0, // Would query actual connections in space
            campusVelocity: post.engagement?.hourlyRate || 0,
            mutualConnections: 0, // Would calculate mutual connections with author
            dormProximity: false, // Would check if same dorm
            majorRelevance: false // Would check if same major
        };
    }
    /**
     * Extract insider access signals
     */
    extractInsiderAccessSignals(post, space, user) {
        return {
            spaceMemberCount: space.memberCount || 0,
            requiresInvite: !space.isPublic, // Use isPublic as proxy for invite requirement
            newMemberRestricted: space.settings?.requireApproval || false,
            leaderOnly: post.authorRole === 'leader',
            timeExclusive: post.expiresAt ? new Date(post.expiresAt) > new Date() : false,
            greekExclusive: space.category.value === space_category_value_1.SpaceCategoryEnum.SOCIAL && space.name.toString().toLowerCase().includes('fraternity|sorority|greek')
        };
    }
    /**
     * Determine primary score type for analytics
     */
    determineScoreType(anxietyRelief, socialProof, insiderAccess) {
        const max = Math.max(anxietyRelief, socialProof, insiderAccess);
        if (anxietyRelief === max) {
            return {
                type: 'anxiety_relief',
                primaryFactor: 'Solves immediate student anxiety',
                confidence: anxietyRelief / 100
            };
        }
        else if (socialProof === max) {
            return {
                type: 'social_proof',
                primaryFactor: 'Friends are already engaged',
                confidence: socialProof / 100
            };
        }
        else {
            return {
                type: 'insider_access',
                primaryFactor: 'Exclusive community content',
                confidence: insiderAccess / 100
            };
        }
    }
    /**
     * Helper methods for time-based scoring
     */
    isFirstYear(graduationYear) {
        const currentYear = new Date().getFullYear();
        return graduationYear - currentYear <= 1;
    }
    isHappeningSoon(timestamp) {
        // Would parse event time and check if within next 2 hours
        return false;
    }
    isMealTime() {
        const hour = new Date().getHours();
        return (hour >= 7 && hour <= 9) || // Breakfast
            (hour >= 11 && hour <= 14) || // Lunch
            (hour >= 17 && hour <= 20); // Dinner
    }
    /**
     * Variable ratio reinforcement - not every scroll has gold
     * Implements slot machine psychology per SPEC
     */
    applyVariableRatio(posts) {
        return posts.map((post, index) => {
            // Random perfect discoveries - creates addictive scrolling
            const isGoldenPost = Math.random() < 0.15; // 15% chance
            if (isGoldenPost) {
                return {
                    ...post,
                    algorithmScore: post.algorithmScore * 1.5,
                    scoreBreakdown: {
                        ...post.scoreBreakdown,
                        type: 'mixed',
                        primaryFactor: '🎰 Perfect discovery',
                        confidence: 1.0
                    }
                };
            }
            return post;
        });
    }
}
exports.FeedAlgorithmService = FeedAlgorithmService;
/**
 * Default configuration following SPEC requirements
 */
exports.defaultFeedConfig = {
    anxietyReliefWeight: 0.4, // Primary - solve student problems
    socialProofWeight: 0.3, // Secondary - friend validation
    insiderAccessWeight: 0.3, // Secondary - exclusive access
    campusId: 'ub-buffalo'
};
//# sourceMappingURL=feed-algorithm.service.js.map