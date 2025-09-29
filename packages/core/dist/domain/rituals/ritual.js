"use strict";
/**
 * Ritual Aggregate - Campus-Wide Behavioral Campaigns
 * Based on SPEC.md rituals system for student engagement
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ritual = void 0;
const value_objects_1 = require("./value-objects");
/**
 * Ritual Aggregate Root
 * Represents a campus-wide behavioral campaign
 */
class Ritual {
    constructor(data) {
        this.data = data;
    }
    // Getters
    get id() {
        return this.data.id;
    }
    get title() {
        return this.data.title;
    }
    get description() {
        return this.data.description;
    }
    get type() {
        return this.data.type;
    }
    get status() {
        return this.data.status;
    }
    get campusGoal() {
        return this.data.campusGoal;
    }
    get milestones() {
        return [...this.data.milestones];
    }
    get startDate() {
        return this.data.startDate;
    }
    get endDate() {
        return this.data.endDate;
    }
    get participantCount() {
        return this.data.participations.filter(p => p.isActive).length;
    }
    get totalActivities() {
        return this.data.participations.reduce((sum, p) => sum + p.activities.length, 0);
    }
    get isActive() {
        const now = new Date();
        return this.data.status.isActive() &&
            now >= this.data.startDate &&
            now <= this.data.endDate;
    }
    get isCompleted() {
        return this.data.status.isCompleted() || this.data.campusGoal.isComplete;
    }
    get progressPercentage() {
        return this.data.campusGoal.progressPercentage;
    }
    // Factory method to create new ritual
    static create(props) {
        // Validate title
        const titleResult = value_objects_1.RitualTitle.create(props.title);
        if (titleResult.isFailure) {
            return value_objects_1.Result.fail(titleResult.error);
        }
        // Validate description
        const descriptionResult = value_objects_1.RitualDescription.create(props.description);
        if (descriptionResult.isFailure) {
            return value_objects_1.Result.fail(descriptionResult.error);
        }
        // Validate type
        const typeResult = value_objects_1.RitualType.create(props.type);
        if (typeResult.isFailure) {
            return value_objects_1.Result.fail(typeResult.error);
        }
        // Validate dates
        if (props.startDate >= props.endDate) {
            return value_objects_1.Result.fail('Start date must be before end date');
        }
        // Create campus goal
        const campusGoalResult = value_objects_1.CampusGoal.create(props.campusGoalTarget, props.campusGoalUnit);
        if (campusGoalResult.isFailure) {
            return value_objects_1.Result.fail(campusGoalResult.error);
        }
        const now = new Date();
        const status = props.startDate > now ? value_objects_1.RitualStatus.upcoming() : value_objects_1.RitualStatus.active();
        const ritual = new Ritual({
            id: value_objects_1.RitualId.generate(),
            title: titleResult.getValue(),
            description: descriptionResult.getValue(),
            type: typeResult.getValue(),
            status,
            campusGoal: campusGoalResult.getValue(),
            milestones: [],
            participations: [],
            startDate: props.startDate,
            endDate: props.endDate,
            createdAt: now,
            updatedAt: now,
        });
        return value_objects_1.Result.ok(ritual);
    }
    // Add milestone to ritual
    addMilestone(name, description, threshold, reward) {
        const milestoneResult = value_objects_1.Milestone.create(name, description, threshold, reward);
        if (milestoneResult.isFailure) {
            return value_objects_1.Result.fail(milestoneResult.error);
        }
        // Check if milestone with same name already exists
        if (this.data.milestones.some(m => m.name === name)) {
            return value_objects_1.Result.fail('Milestone with this name already exists');
        }
        const milestone = milestoneResult.getValue();
        this.data.milestones.push(milestone);
        this.data.milestones.sort((a, b) => a.threshold - b.threshold); // Sort by threshold
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(milestone);
    }
    // Student joins ritual
    addParticipant(profileId) {
        if (!this.canJoin()) {
            return value_objects_1.Result.fail('Ritual is not accepting new participants');
        }
        // Check if already participating
        if (this.isParticipating(profileId)) {
            return value_objects_1.Result.fail('User is already participating in this ritual');
        }
        const participation = {
            id: value_objects_1.ParticipationId.generate(),
            ritualId: this.data.id,
            participantId: profileId,
            joinedAt: new Date(),
            totalPoints: value_objects_1.Points.zero(),
            activities: [],
            milestonesUnlocked: [],
            isActive: true,
        };
        this.data.participations.push(participation);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(participation);
    }
    // Record activity for participant
    recordActivity(participantId, activityType, points, metadata = {}) {
        const participation = this.data.participations.find(p => p.participantId.equals(participantId) && p.isActive);
        if (!participation) {
            return value_objects_1.Result.fail('User is not participating in this ritual');
        }
        if (!this.isActive) {
            return value_objects_1.Result.fail('Cannot record activity for inactive ritual');
        }
        const activity = {
            id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: activityType,
            participantId,
            points,
            metadata,
            timestamp: new Date(),
        };
        participation.activities.push(activity);
        participation.totalPoints = participation.totalPoints.add(points);
        // Update campus goal progress
        const currentProgress = this.calculateCampusProgress();
        const goalUpdateResult = this.data.campusGoal.updateProgress(currentProgress);
        if (goalUpdateResult.isSuccess) {
            this.data.campusGoal = goalUpdateResult.getValue();
        }
        // Check for milestone unlocks
        this.checkMilestoneUnlocks(participation);
        // Check if ritual is completed
        if (this.data.campusGoal.isComplete && !this.data.status.isCompleted()) {
            this.data.status = value_objects_1.RitualStatus.completed();
        }
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(activity);
    }
    // Get participant's progress
    getParticipantProgress(participantId) {
        return this.data.participations.find(p => p.participantId.equals(participantId) && p.isActive) || null;
    }
    // Get leaderboard
    getLeaderboard(limit = 10) {
        return this.data.participations
            .filter(p => p.isActive)
            .sort((a, b) => b.totalPoints.value - a.totalPoints.value)
            .slice(0, limit);
    }
    // Get recently unlocked milestones (for feed)
    getRecentMilestones(timeWindowHours = 24) {
        const cutoffTime = new Date(Date.now() - timeWindowHours * 60 * 60 * 1000);
        const currentProgress = this.calculateCampusProgress();
        return this.data.milestones.filter(milestone => {
            const wasRecentlyUnlocked = milestone.canUnlock(currentProgress) ||
                (milestone.unlocked && this.data.updatedAt > cutoffTime);
            return wasRecentlyUnlocked;
        });
    }
    // Start ritual (change status from upcoming to active)
    start() {
        if (this.data.status.status !== 'upcoming') {
            return value_objects_1.Result.fail('Only upcoming rituals can be started');
        }
        const now = new Date();
        if (now < this.data.startDate) {
            return value_objects_1.Result.fail('Cannot start ritual before start date');
        }
        this.data.status = value_objects_1.RitualStatus.active();
        this.data.updatedAt = now;
        return value_objects_1.Result.ok();
    }
    // Complete ritual manually
    complete() {
        if (!this.data.status.isActive()) {
            return value_objects_1.Result.fail('Only active rituals can be completed');
        }
        this.data.status = value_objects_1.RitualStatus.completed();
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Cancel ritual
    cancel() {
        if (this.data.status.isCompleted()) {
            return value_objects_1.Result.fail('Cannot cancel completed ritual');
        }
        this.data.status = value_objects_1.RitualStatus.cancelled();
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Remove participant
    removeParticipant(participantId) {
        const participation = this.data.participations.find(p => p.participantId.equals(participantId));
        if (!participation) {
            return value_objects_1.Result.fail('User is not participating in this ritual');
        }
        participation.isActive = false;
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Check if user can join ritual
    canJoin() {
        const now = new Date();
        return this.data.status.canParticipate() &&
            now >= this.data.startDate &&
            now <= this.data.endDate;
    }
    // Check if user is participating
    isParticipating(profileId) {
        return this.data.participations.some(p => p.participantId.equals(profileId) && p.isActive);
    }
    // Get ritual statistics
    getStatistics() {
        const activeParticipants = this.data.participations.filter(p => p.isActive);
        const totalPoints = activeParticipants.reduce((sum, p) => sum + p.totalPoints.value, 0);
        const avgPoints = activeParticipants.length > 0 ? totalPoints / activeParticipants.length : 0;
        const now = new Date();
        const daysRemaining = Math.max(0, Math.ceil((this.data.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        return {
            participantCount: activeParticipants.length,
            totalActivities: this.totalActivities,
            averagePointsPerParticipant: avgPoints,
            completionRate: this.progressPercentage,
            daysRemaining,
        };
    }
    // Private helper methods
    calculateCampusProgress() {
        // Different calculation based on ritual type
        switch (this.data.type.type) {
            case 'onboarding':
                // Count completed onboarding activities
                return this.data.participations.filter(p => p.activities.some(a => a.type.type === 'profile_complete')).length;
            case 'challenge':
                // Sum all points across participants
                return this.data.participations.reduce((sum, p) => sum + p.totalPoints.value, 0);
            case 'seasonal':
                // Count unique participants with activities
                return this.data.participations.filter(p => p.isActive && p.activities.length > 0).length;
            case 'emergency':
                // Count total activities
                return this.totalActivities;
            default:
                return this.participantCount;
        }
    }
    checkMilestoneUnlocks(participation) {
        const currentProgress = this.calculateCampusProgress();
        for (const milestone of this.data.milestones) {
            if (milestone.canUnlock(currentProgress) &&
                !participation.milestonesUnlocked.includes(milestone.name)) {
                participation.milestonesUnlocked.push(milestone.name);
            }
        }
    }
    // Convert to plain object for persistence
    toData() {
        return {
            ...this.data,
            milestones: [...this.data.milestones],
            participations: [...this.data.participations],
        };
    }
    // Recreate from persistence data
    static fromData(data) {
        return new Ritual(data);
    }
}
exports.Ritual = Ritual;
//# sourceMappingURL=ritual.js.map