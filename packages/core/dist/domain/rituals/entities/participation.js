"use strict";
/**
 * Participation Entity
 * Represents a user's participation in a ritual
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = void 0;
const Entity_base_1 = require("../../shared/base/Entity.base");
const Result_1 = require("../../shared/base/Result");
class Participation extends Entity_base_1.Entity {
    get profileId() {
        return this.props.profileId;
    }
    get ritualId() {
        return this.props.ritualId;
    }
    get joinedAt() {
        return this.props.joinedAt;
    }
    get lastParticipatedAt() {
        return this.props.lastParticipatedAt;
    }
    get completionCount() {
        return this.props.completionCount;
    }
    get streakCount() {
        return this.props.streakCount;
    }
    get totalPoints() {
        return this.props.totalPoints;
    }
    get achievements() {
        return this.props.achievements;
    }
    get isActive() {
        return this.props.isActive;
    }
    get metadata() {
        return this.props.metadata;
    }
    constructor(props, id) {
        super(props, id || `participation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        const participationProps = {
            profileId: props.profileId,
            ritualId: props.ritualId,
            joinedAt: props.joinedAt || new Date(),
            completionCount: props.completionCount || 0,
            streakCount: props.streakCount || 0,
            totalPoints: props.totalPoints || 0,
            achievements: props.achievements || [],
            isActive: props.isActive !== undefined ? props.isActive : true,
            metadata: props.metadata
        };
        const participation = new Participation(participationProps, id);
        return Result_1.Result.ok(participation);
    }
    participate() {
        if (!this.props.isActive) {
            return Result_1.Result.fail('Cannot participate in inactive participation');
        }
        this.props.completionCount++;
        this.props.lastParticipatedAt = new Date();
        // Update streak logic would go here
        this.props.streakCount++;
        // Award points
        this.props.totalPoints += 10; // Base points per participation
        return Result_1.Result.ok();
    }
    addAchievement(achievement) {
        if (!this.props.achievements.includes(achievement)) {
            this.props.achievements.push(achievement);
        }
    }
    deactivate() {
        this.props.isActive = false;
    }
    reactivate() {
        this.props.isActive = true;
    }
    updateMetadata(metadata) {
        this.props.metadata = { ...this.props.metadata, ...metadata };
    }
    updateMilestoneProgress(milestoneId, progress) {
        if (!this.props.metadata) {
            this.props.metadata = {};
        }
        if (!this.props.metadata.milestones) {
            this.props.metadata.milestones = {};
        }
        this.props.metadata.milestones[milestoneId] = progress;
    }
    completeMilestone(milestoneId) {
        this.updateMilestoneProgress(milestoneId, 100);
        this.addAchievement(`milestone_${milestoneId}`);
        this.addPoints(50); // Bonus points for milestone completion
        // Add to completedMilestones array if not already there
        if (!this.props.completedMilestones) {
            this.props.completedMilestones = [];
        }
        if (!this.props.completedMilestones.includes(milestoneId)) {
            this.props.completedMilestones.push(milestoneId);
        }
    }
    addPoints(points) {
        this.props.totalPoints += points;
    }
    updateStreak(streakCount) {
        this.props.streakCount = streakCount;
    }
    toData() {
        return {
            id: this.id,
            profileId: this.props.profileId, // Return full object for compatibility
            ritualId: this.props.ritualId.value,
            joinedAt: this.props.joinedAt,
            lastParticipatedAt: this.props.lastParticipatedAt,
            completionCount: this.props.completionCount,
            streakCount: this.props.streakCount,
            totalPoints: this.props.totalPoints,
            achievements: this.props.achievements,
            completedMilestones: this.props.completedMilestones || [],
            streak: {
                currentDays: this.props.streakCount || 0,
                longestStreak: this.props.longestStreak || 0,
                lastParticipationDate: this.props.lastParticipatedAt
            },
            isActive: this.props.isActive,
            metadata: this.props.metadata
        };
    }
}
exports.Participation = Participation;
//# sourceMappingURL=participation.js.map