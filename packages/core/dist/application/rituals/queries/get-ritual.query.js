"use strict";
/**
 * Get Ritual Query
 * Retrieves ritual details and participation status
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRitualQueryHandler = exports.GetRitualQuery = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class GetRitualQuery extends base_1.Query {
    constructor(ritualId, userId, campusId) {
        super(campusId, userId);
        this.ritualId = ritualId;
    }
}
exports.GetRitualQuery = GetRitualQuery;
class GetRitualQueryHandler {
    constructor(ritualRepository, profileRepository) {
        this.ritualRepository = ritualRepository;
        this.profileRepository = profileRepository;
    }
    async execute(query) {
        try {
            // Get ritual
            const ritualResult = await this.ritualRepository.findById({
                id: query.ritualId,
                equals: () => false
            });
            if (ritualResult.isFailure) {
                return value_objects_1.Result.fail('Ritual not found');
            }
            const ritual = ritualResult.getValue();
            // Verify campus match
            if (!ritual.campusId.equals({ id: query.campusId, equals: () => false })) {
                return value_objects_1.Result.fail('Ritual not available on your campus');
            }
            // Get user participation
            const participant = ritual.getParticipant({ id: query.userId, equals: () => false });
            const isParticipant = !!participant;
            // Get leaderboard
            const leaderboard = await this.buildLeaderboard(ritual);
            // Calculate user rank
            let userRank;
            if (isParticipant) {
                userRank = leaderboard.findIndex(entry => entry.userId === query.userId) + 1;
            }
            // Get current milestone
            const currentMilestone = ritual.getCurrentMilestone();
            const totalProgress = ritual.getTotalProgress();
            // Calculate stats
            const participants = ritual.getParticipants();
            const activeParticipants = participants.filter((p) => {
                const lastActivity = p.lastActivity;
                if (!lastActivity)
                    return false;
                const daysSinceLastActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
                return daysSinceLastActivity < 7;
            }).length;
            const totalPoints = participants.reduce((sum, p) => sum + (p.totalPoints || 0), 0);
            const averagePoints = participants.length > 0 ? totalPoints / participants.length : 0;
            // Build rewards list
            const rewards = ritual.rewards.map(reward => ({
                type: reward.type,
                name: reward.name,
                description: reward.description,
                icon: reward.icon,
                threshold: reward.threshold
            }));
            return value_objects_1.Result.ok({
                id: ritual.id.id,
                name: ritual.name,
                description: ritual.description,
                type: ritual.type,
                startDate: ritual.startDate,
                endDate: ritual.endDate,
                isActive: ritual.isActive(),
                campusId: ritual.campusId.id,
                progress: {
                    total: totalProgress,
                    currentMilestone: currentMilestone?.name || 'Starting',
                    milestoneThreshold: currentMilestone?.threshold || 0,
                    percentComplete: currentMilestone
                        ? Math.min(100, (totalProgress / currentMilestone.threshold) * 100)
                        : 0
                },
                participation: {
                    isParticipant,
                    userPoints: participant?.totalPoints,
                    userRank,
                    lastActivity: participant?.lastActivity
                },
                leaderboard: leaderboard.slice(0, 10), // Top 10
                rewards,
                stats: {
                    totalParticipants: participants.length,
                    activeParticipants,
                    totalActivities: ritual.getTotalActivities(),
                    averagePoints: Math.round(averagePoints)
                }
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to get ritual: ${error}`);
        }
    }
    async buildLeaderboard(ritual) {
        const participants = ritual.getParticipants();
        // Sort by points
        const sorted = participants
            .map((p) => ({
            userId: p.profileId.id,
            points: p.totalPoints || 0
        }))
            .sort((a, b) => b.points - a.points);
        // Get user profiles for names
        const leaderboard = [];
        for (let i = 0; i < Math.min(sorted.length, 20); i++) {
            const entry = sorted[i];
            // Get user profile
            const profileResult = await this.profileRepository.findById({
                id: entry.userId,
                equals: () => false
            });
            if (profileResult.isSuccess) {
                const profile = profileResult.getValue();
                leaderboard.push({
                    userId: entry.userId,
                    userName: profile.fullName || profile.handle?.username || 'Unknown',
                    points: entry.points,
                    rank: i + 1,
                    avatar: undefined // Would come from profile photos
                });
            }
        }
        return leaderboard;
    }
}
exports.GetRitualQueryHandler = GetRitualQueryHandler;
//# sourceMappingURL=get-ritual.query.js.map