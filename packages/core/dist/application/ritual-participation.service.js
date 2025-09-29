"use strict";
/**
 * EnhancedRitual Participation Service
 * Orchestrates ritual participation, progress tracking, and rewards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedRitualParticipationService = void 0;
const base_service_1 = require("./base.service");
const Result_1 = require("../domain/shared/base/Result");
const enhanced_ritual_1 = require("../domain/rituals/aggregates/enhanced-ritual");
const ritual_id_value_1 = require("../domain/rituals/value-objects/ritual-id.value");
const participation_1 = require("../domain/rituals/entities/participation");
const profile_id_value_1 = require("../domain/profile/value-objects/profile-id.value");
const campus_id_value_1 = require("../domain/profile/value-objects/campus-id.value");
class EnhancedRitualParticipationService extends base_service_1.BaseApplicationService {
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
    async createEnhancedRitual(creatorId, data) {
        return this.execute(async () => {
            // Validate creator
            const creatorProfileId = profile_id_value_1.ProfileId.create(creatorId).getValue();
            const creatorResult = await this.profileRepo.findById(creatorProfileId);
            if (creatorResult.isFailure) {
                return Result_1.Result.fail('Creator profile not found');
            }
            // Generate ritual ID
            const ritualId = ritual_id_value_1.RitualId.create(`ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`).getValue();
            // Create ritual
            const ritualResult = enhanced_ritual_1.EnhancedRitual.create({
                ritualId: ritualId,
                name: data.name,
                description: data.description,
                type: this.mapRitualType(data.ritualType),
                campusId: campus_id_value_1.CampusId.createUBBuffalo().getValue(),
                startDate: data.startDate,
                endDate: data.endDate,
                createdBy: creatorProfileId,
                milestones: data.milestones.map((m, index) => ({
                    id: `milestone_${index}`,
                    title: m.name,
                    name: m.name,
                    description: m.description,
                    targetValue: m.targetValue,
                    currentValue: 0,
                    isCompleted: false,
                    completedAt: undefined,
                    participantCompletions: [],
                    rewards: m.rewards,
                    threshold: m.targetValue,
                    isReached: false,
                    reachedAt: undefined
                })),
                settings: {
                    maxParticipants: data.settings?.maxParticipants || undefined,
                    requiresApproval: data.settings?.requireApproval || false,
                    allowLateJoin: data.settings?.allowLateJoin || true,
                    isVisible: data.settings?.isVisible || true
                }
            });
            if (ritualResult.isFailure) {
                return Result_1.Result.fail(ritualResult.error);
            }
            const ritual = ritualResult.getValue();
            // Save ritual
            const saveResult = await this.ritualRepo.save(ritual);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            // Creator automatically participates
            await this.joinEnhancedRitual(creatorId, ritual.ritualId.value);
            return Result_1.Result.ok(ritual);
        }, 'EnhancedRitualParticipation.createEnhancedRitual');
    }
    /**
     * Join a ritual
     */
    async joinEnhancedRitual(userId, ritualId) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const ritualIdVO = ritual_id_value_1.RitualId.create(ritualId).getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result_1.Result.fail('EnhancedRitual not found');
            }
            const ritual = ritualResult.getValue();
            // Check if already participating
            const existingParticipation = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (existingParticipation.isSuccess) {
                return Result_1.Result.fail('Already participating in this ritual');
            }
            // Check ritual constraints
            const joinResult = ritual.addParticipant(userProfileId);
            if (joinResult.isFailure) {
                return Result_1.Result.fail(joinResult.error);
            }
            // Create participation
            const participationResult = participation_1.Participation.create({
                ritualId: ritualIdVO,
                profileId: userProfileId
            });
            if (participationResult.isFailure) {
                return Result_1.Result.fail(participationResult.error);
            }
            const participation = participationResult.getValue();
            // Save participation
            await this.ritualRepo.saveParticipation(participation);
            // Update ritual with new participant
            await this.ritualRepo.save(ritual);
            const result = {
                data: participation,
                warnings: this.generateParticipationWarnings(ritual)
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedRitualParticipation.joinEnhancedRitual');
    }
    /**
     * Record progress on a ritual milestone
     */
    async recordProgress(userId, ritualId, milestoneId, progress) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const ritualIdVO = ritual_id_value_1.RitualId.create(ritualId).getValue();
            // Get participation
            const participationResult = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (participationResult.isFailure) {
                return Result_1.Result.fail('Not participating in this ritual');
            }
            const participation = participationResult.getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result_1.Result.fail('EnhancedRitual not found');
            }
            const ritual = ritualResult.getValue();
            // Update milestone progress
            participation.updateMilestoneProgress(milestoneId, progress);
            // Check if milestone completed
            const milestone = ritual.toData().milestones.find((m) => m.id === milestoneId);
            if (milestone && progress >= milestone.targetValue) {
                // Complete milestone
                participation.completeMilestone(milestoneId);
                // Award points
                const points = this.calculateMilestonePoints(milestone);
                participation.addPoints(points);
                // Add achievement
                participation.addAchievement(`Completed: ${milestone.name}`);
                // Update ritual milestone completion (if method exists)
                if (ritual.updateMilestoneProgress) {
                    ritual.updateMilestoneProgress(milestoneId, progress);
                }
            }
            // Update streak
            participation.updateStreak(participation.streakCount + 1);
            // Save participation
            await this.ritualRepo.saveParticipation(participation);
            // Save ritual if modified
            await this.ritualRepo.save(ritual);
            // Get current progress
            const progressData = await this.calculateEnhancedRitualProgress(ritual, participation);
            return Result_1.Result.ok(progressData);
        }, 'EnhancedRitualParticipation.recordProgress');
    }
    /**
     * Get user's ritual progress
     */
    async getEnhancedRitualProgress(userId, ritualId) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const ritualIdVO = ritual_id_value_1.RitualId.create(ritualId).getValue();
            // Get participation
            const participationResult = await this.ritualRepo.findParticipation(ritualIdVO, userProfileId);
            if (participationResult.isFailure) {
                return Result_1.Result.fail('Not participating in this ritual');
            }
            const participation = participationResult.getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result_1.Result.fail('EnhancedRitual not found');
            }
            const ritual = ritualResult.getValue();
            const progress = await this.calculateEnhancedRitualProgress(ritual, participation);
            return Result_1.Result.ok(progress);
        }, 'EnhancedRitualParticipation.getEnhancedRitualProgress');
    }
    /**
     * Get ritual leaderboard
     */
    async getLeaderboard(ritualId, limit = 20) {
        return this.execute(async () => {
            const ritualIdVO = ritual_id_value_1.RitualId.create(ritualId).getValue();
            // Get ritual
            const ritualResult = await this.ritualRepo.findById(ritualIdVO);
            if (ritualResult.isFailure) {
                return Result_1.Result.fail('EnhancedRitual not found');
            }
            // Get leaderboard participations
            const leaderboardResult = await this.ritualRepo.findLeaderboard(ritualIdVO, limit);
            if (leaderboardResult.isFailure) {
                return Result_1.Result.fail(leaderboardResult.error);
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
            return Result_1.Result.ok(result);
        }, 'EnhancedRitualParticipation.getLeaderboard');
    }
    /**
     * Get user's active rituals
     */
    async getUserEnhancedRituals(userId) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const ritualsResult = await this.ritualRepo.findByParticipant(userProfileId);
            if (ritualsResult.isFailure) {
                return Result_1.Result.fail(ritualsResult.error);
            }
            const rituals = ritualsResult.getValue();
            // Filter to active rituals
            const activeEnhancedRituals = rituals.filter((r) => r.toData().status === 'active');
            const result = {
                data: activeEnhancedRituals,
                metadata: {
                    totalCount: activeEnhancedRituals.length
                }
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedRitualParticipation.getUserEnhancedRituals');
    }
    /**
     * Get available rituals to join
     */
    async getAvailableEnhancedRituals() {
        return this.execute(async () => {
            const activeResult = await this.ritualRepo.findActive(this.context.campusId);
            if (activeResult.isFailure) {
                return Result_1.Result.fail(activeResult.error);
            }
            const rituals = activeResult.getValue()
                .filter((r) => r.toData().settings.isVisible);
            const result = {
                data: rituals,
                metadata: {
                    totalCount: rituals.length
                }
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedRitualParticipation.getAvailableEnhancedRituals');
    }
    /**
     * Subscribe to ritual updates
     */
    subscribeToEnhancedRitual(ritualId, callback) {
        const ritualIdVO = ritual_id_value_1.RitualId.create(ritualId).getValue();
        return this.ritualRepo.subscribeToRitual(ritualIdVO, callback);
    }
    /**
     * Subscribe to active rituals feed
     */
    subscribeToActiveEnhancedRituals(callback) {
        return this.ritualRepo.subscribeToActiveRituals(this.context.campusId, callback);
    }
    // Private helper methods
    async calculateEnhancedRitualProgress(ritual, participation) {
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
    calculateMilestonePoints(milestone) {
        // Base points based on target value
        let points = milestone.targetValue * 10;
        // Bonus for rewards
        milestone.rewards.forEach((reward) => {
            if (reward.type === 'points') {
                points += parseInt(reward.value) || 0;
            }
        });
        return points;
    }
    generateParticipationWarnings(ritual) {
        const warnings = [];
        const ritualData = ritual.toData();
        const now = new Date();
        const daysUntilEnd = Math.ceil((ritualData.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilEnd <= 7) {
            warnings.push(`This ritual ends in ${daysUntilEnd} days`);
        }
        if (ritualData.settings.maxParticipants) {
            const spotsLeft = ritualData.settings.maxParticipants - ritualData.participants.length;
            if (spotsLeft <= 10) {
                warnings.push(`Only ${spotsLeft} spots remaining`);
            }
        }
        if (!ritualData.settings.allowLateJoin && now > ritualData.startDate) {
            warnings.push('This ritual has already started and doesn\'t allow late joins');
        }
        return warnings;
    }
    mapRitualType(ritualType) {
        switch (ritualType) {
            case 'daily-challenge':
                return 'daily';
            case 'weekly-goal':
                return 'weekly';
            case 'study-challenge':
                return 'monthly';
            case 'social-mission':
                return 'seasonal';
            case 'campus-event':
                return 'one-time';
            default:
                return 'one-time';
        }
    }
}
exports.EnhancedRitualParticipationService = EnhancedRitualParticipationService;
//# sourceMappingURL=ritual-participation.service.js.map