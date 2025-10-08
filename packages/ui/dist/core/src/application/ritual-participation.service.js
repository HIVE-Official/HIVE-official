/**
 * Ritual Participation Service
 * Orchestrates ritual participation, progress tracking, and rewards
 */
import { BaseApplicationService } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Ritual } from '../domain/rituals/aggregates/ritual.aggregate';
import { RitualId } from '../domain/rituals/value-objects/ritual-id.value';
import { Participation } from '../domain/rituals/entities/participation';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../domain/profile/value-objects/campus-id.value';
export class RitualParticipationService extends BaseApplicationService {
    constructor(context, ritualRepo, profileRepo, feedRepo) {
        super(context);
        // Mock repositories for now - would be injected in production
        this.ritualRepo = ritualRepo || {};
        this.profileRepo = profileRepo || {};
        this.feedRepo = feedRepo || {};
    }
    /**
     * Create a new ritual campaign
     */
    async createRitual(creatorId, data) {
        return this.execute(async () => {
            // Validate creator
            const creatorProfileId = ProfileId.create(creatorId).getValue();
            const creatorResult = await this.profileRepo.findById(creatorProfileId);
            if (creatorResult.isFailure) {
                return Result.fail('Creator profile not found');
            }
            // Generate ritual ID
            const ritualId = RitualId.create(`ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`).getValue();
            // Validate ritual type and duration
            if (data.ritualType === 'short' && data.duration !== '1 week') {
                return Result.fail('Short rituals must be 1 week duration');
            }
            if (data.ritualType === 'yearbook' && data.duration !== '3 weeks') {
                return Result.fail('Yearbook rituals must be 3 weeks duration');
            }
            // Create ritual using correct types from SPEC.md
            const ritualResult = Ritual.create({
                ritualId: ritualId,
                name: data.name,
                description: data.description,
                type: data.ritualType, // FIXED: No mapping needed - use correct type directly
                category: data.category,
                duration: data.duration,
                campusId: CampusId.createUBBuffalo().getValue(),
                startDate: data.startDate,
                endDate: data.endDate,
                createdBy: creatorProfileId,
                targetAudience: 'all',
                visibility: data.settings?.isVisible ? 'public' : 'hidden',
                goals: data.goals.map((g, index) => ({
                    id: `goal_${index}`,
                    description: g.description,
                    type: g.type,
                    targetValue: g.targetValue,
                    currentValue: 0,
                    isCompleted: false
                })),
                requirements: data.requirements,
                rewards: data.rewards.map((r, index) => ({
                    id: `reward_${index}`,
                    type: r.type,
                    name: r.name,
                    description: r.description,
                    value: r.value
                })),
                targetParticipation: data.settings?.maxParticipants,
                status: 'draft'
            });
            if (ritualResult.isFailure) {
                return Result.fail(ritualResult.error);
            }
            const ritual = ritualResult.getValue();
            // Save ritual
            const saveResult = await this.ritualRepo.save(ritual);
            if (saveResult.isFailure) {
                return Result.fail(saveResult.error);
            }
            // Creator automatically participates
            await this.joinRitual(creatorId, ritual.ritualId.value);
            return Result.ok(ritual);
        }, 'RitualParticipation.createRitual');
    }
    /**
     * Join a ritual
     */
    async joinRitual(userId, ritualId) {
        return this.execute(async () => {
            const userProfileId = ProfileId.create(userId).getValue();
            const ritualIdVO = RitualId.create(ritualId).getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result.fail('Ritual not found');
            }
            const ritual = ritualResult.getValue();
            // Check if already participating
            const existingParticipation = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (existingParticipation.isSuccess) {
                return Result.fail('Already participating in this ritual');
            }
            // Check ritual constraints
            const joinResult = ritual.addParticipant(userProfileId);
            if (joinResult.isFailure) {
                return Result.fail(joinResult.error);
            }
            // Create participation
            const participationResult = Participation.create({
                ritualId: ritualIdVO,
                profileId: userProfileId
            });
            if (participationResult.isFailure) {
                return Result.fail(participationResult.error);
            }
            const participation = participationResult.getValue();
            // Save participation
            await this.ritualRepo.saveParticipation(participation);
            // Update ritual with new participant
            await this.ritualRepo.save(ritual);
            const result = {
                data: participation,
                warnings: ritual.getParticipationWarnings() // Use domain logic
            };
            return Result.ok(result);
        }, 'RitualParticipation.joinRitual');
    }
    /**
     * Record progress on a ritual milestone
     */
    async recordProgress(userId, ritualId, milestoneId, progress) {
        return this.execute(async () => {
            const userProfileId = ProfileId.create(userId).getValue();
            const ritualIdVO = RitualId.create(ritualId).getValue();
            // Get participation
            const participationResult = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (participationResult.isFailure) {
                return Result.fail('Not participating in this ritual');
            }
            const participation = participationResult.getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result.fail('Ritual not found');
            }
            const ritual = ritualResult.getValue();
            // Update milestone progress
            participation.updateMilestoneProgress(milestoneId, progress);
            // Check if milestone completed
            const milestone = ritual.toData().milestones.find((m) => m.id === milestoneId);
            if (milestone && progress >= milestone.targetValue) {
                // Complete milestone
                participation.completeMilestone(milestoneId);
                // Award points (use domain logic)
                const points = ritual.calculateGoalPoints(milestoneId);
                participation.addPoints(points);
                // Add achievement
                participation.addAchievement(`Completed: ${milestone.name}`);
                // Note: updateMilestoneProgress method not available on Ritual aggregate
                // Milestone progress is tracked through participation records
            }
            // Update streak
            participation.updateStreak(participation.streakCount + 1);
            // Save participation
            await this.ritualRepo.saveParticipation(participation);
            // Save ritual if modified
            await this.ritualRepo.save(ritual);
            // Get current progress
            const progressData = await this.calculateRitualProgress(ritual, participation);
            return Result.ok(progressData);
        }, 'RitualParticipation.recordProgress');
    }
    /**
     * Get user's ritual progress
     */
    async getRitualProgress(userId, ritualId) {
        return this.execute(async () => {
            const userProfileId = ProfileId.create(userId).getValue();
            const ritualIdVO = RitualId.create(ritualId).getValue();
            // Get participation
            const participationResult = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (participationResult.isFailure) {
                return Result.fail('Not participating in this ritual');
            }
            const participation = participationResult.getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result.fail('Ritual not found');
            }
            const ritual = ritualResult.getValue();
            const progress = await this.calculateRitualProgress(ritual, participation);
            return Result.ok(progress);
        }, 'RitualParticipation.getRitualProgress');
    }
    /**
     * Get ritual leaderboard
     */
    async getLeaderboard(ritualId, limit = 20) {
        return this.execute(async () => {
            const ritualIdVO = RitualId.create(ritualId).getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result.fail('Ritual not found');
            }
            // Get leaderboard participations
            const leaderboardResult = await this.ritualRepo.findLeaderboard(ritualIdVO, limit);
            if (leaderboardResult.isFailure) {
                return Result.fail(leaderboardResult.error);
            }
            const participations = leaderboardResult.getValue();
            // Build leaderboard entries
            const entries = [];
            for (let i = 0; i < participations.length; i++) {
                const participation = participations[i];
                const participationData = participation.toData();
                // Get profile for display name
                const profileResult = await this.profileRepo.findById(participationData.profileId);
                const profile = profileResult.getValue();
                const displayName = profileResult.isSuccess
                    ? `${profile.personalInfo?.firstName || ''} ${profile.personalInfo?.lastName || ''}`.trim() || 'Anonymous'
                    : 'Anonymous';
                entries.push({
                    profileId: participationData.profileId.id,
                    displayName,
                    totalPoints: participationData.totalPoints,
                    rank: i + 1,
                    completedMilestones: participationData.completedMilestones.length,
                    streak: participationData.streak.currentDays
                });
            }
            const result = {
                data: entries,
                metadata: {
                    totalCount: entries.length,
                    hasMore: entries.length === limit
                }
            };
            return Result.ok(result);
        }, 'RitualParticipation.getLeaderboard');
    }
    /**
     * Get user's active rituals
     */
    async getUserRituals(userId) {
        return this.execute(async () => {
            const userProfileId = ProfileId.create(userId).getValue();
            const ritualsResult = await this.ritualRepo.findByParticipant(userProfileId);
            if (ritualsResult.isFailure) {
                return Result.fail(ritualsResult.error);
            }
            const rituals = ritualsResult.getValue();
            // Filter to active rituals
            const activeRituals = rituals.filter((r) => r.toData().status === 'active');
            const result = {
                data: activeRituals,
                metadata: {
                    totalCount: activeRituals.length
                }
            };
            return Result.ok(result);
        }, 'RitualParticipation.getUserRituals');
    }
    /**
     * Get available rituals to join
     */
    async getAvailableRituals() {
        return this.execute(async () => {
            const activeResult = await this.ritualRepo.findActive(this.context.campusId);
            if (activeResult.isFailure) {
                return Result.fail(activeResult.error);
            }
            const rituals = activeResult.getValue()
                .filter((r) => r.toData().settings.isVisible);
            const result = {
                data: rituals,
                metadata: {
                    totalCount: rituals.length
                }
            };
            return Result.ok(result);
        }, 'RitualParticipation.getAvailableRituals');
    }
    /**
     * Subscribe to ritual updates
     */
    subscribeToRitual(ritualId, callback) {
        const ritualIdVO = RitualId.create(ritualId).getValue();
        return this.ritualRepo.subscribeToRitual(ritualIdVO, callback);
    }
    /**
     * Subscribe to active rituals feed
     */
    subscribeToActiveRituals(callback) {
        return this.ritualRepo.subscribeToActiveRituals(this.context.campusId, callback);
    }
    // Private helper methods
    async calculateRitualProgress(ritual, participation) {
        const ritualData = ritual.toData();
        const participationData = participation.toData();
        // Calculate completion percentage
        const totalMilestones = ritualData.milestones.length;
        const completedMilestones = participationData.completedMilestones.length;
        const completionPercentage = totalMilestones > 0
            ? Math.round((completedMilestones / totalMilestones) * 100)
            : 0;
        // Find next milestone
        const nextMilestone = ritualData.milestones.find((m) => !participationData.completedMilestones.includes(m.id));
        // Get rank (would query from leaderboard in production)
        const leaderboard = await this.ritualRepo.findLeaderboard(ritual.id, 100);
        const rank = leaderboard.isSuccess
            ? leaderboard.getValue().findIndex((p) => p.profileId.id === participationData.profileId.id) + 1
            : 0;
        return {
            ritual,
            participation,
            completionPercentage,
            currentStreak: participationData.streak,
            rank,
            nextMilestone,
            recentAchievements: participationData.achievements.slice(-3)
        };
    }
}
//# sourceMappingURL=ritual-participation.service.js.map