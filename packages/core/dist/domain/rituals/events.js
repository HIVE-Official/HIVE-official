"use strict";
/**
 * Ritual Domain Events
 * Events that occur within the Ritual aggregate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantLeftRitual = exports.RitualCompleted = exports.CampusGoalProgressUpdated = exports.MilestoneUnlocked = exports.RitualActivityRecorded = exports.ParticipantJoinedRitual = exports.RitualStarted = exports.RitualCreated = void 0;
const domain_event_1 = require("../shared/domain-event");
// Ritual created
class RitualCreated extends domain_event_1.DomainEvent {
    constructor(ritualId, title, type, startDate, endDate, campusGoalTarget, metadata) {
        super(metadata);
        this.ritualId = ritualId;
        this.title = title;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.campusGoalTarget = campusGoalTarget;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'RitualCreated';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            title: this.title,
            type: this.type,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            campusGoalTarget: this.campusGoalTarget
        };
    }
}
exports.RitualCreated = RitualCreated;
// Ritual started (status changed from upcoming to active)
class RitualStarted extends domain_event_1.DomainEvent {
    constructor(ritualId, participantCount, metadata) {
        super(metadata);
        this.ritualId = ritualId;
        this.participantCount = participantCount;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'RitualStarted';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            participantCount: this.participantCount
        };
    }
}
exports.RitualStarted = RitualStarted;
// User joined ritual
class ParticipantJoinedRitual extends domain_event_1.DomainEvent {
    constructor(ritualId, participationId, participantId, currentParticipantCount, metadata) {
        super({ ...metadata, userId: participantId.id });
        this.ritualId = ritualId;
        this.participationId = participationId;
        this.participantId = participantId;
        this.currentParticipantCount = currentParticipantCount;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'ParticipantJoinedRitual';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            participationId: this.participationId.toString(),
            participantId: this.participantId.id,
            currentParticipantCount: this.currentParticipantCount
        };
    }
}
exports.ParticipantJoinedRitual = ParticipantJoinedRitual;
// Activity recorded for participant
class RitualActivityRecorded extends domain_event_1.DomainEvent {
    constructor(ritualId, participantId, activityId, activityType, points, newTotalPoints, metadata) {
        super({ ...metadata, userId: participantId.id });
        this.ritualId = ritualId;
        this.participantId = participantId;
        this.activityId = activityId;
        this.activityType = activityType;
        this.points = points;
        this.newTotalPoints = newTotalPoints;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'RitualActivityRecorded';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            participantId: this.participantId.id,
            activityId: this.activityId,
            activityType: this.activityType.toString(),
            points: this.points.value,
            newTotalPoints: this.newTotalPoints
        };
    }
}
exports.RitualActivityRecorded = RitualActivityRecorded;
// Milestone unlocked
class MilestoneUnlocked extends domain_event_1.DomainEvent {
    constructor(ritualId, participantId, milestoneName, milestoneThreshold, reward, isGlobalMilestone, metadata) {
        super({ ...metadata, userId: participantId.id });
        this.ritualId = ritualId;
        this.participantId = participantId;
        this.milestoneName = milestoneName;
        this.milestoneThreshold = milestoneThreshold;
        this.reward = reward;
        this.isGlobalMilestone = isGlobalMilestone;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'MilestoneUnlocked';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            participantId: this.participantId.id,
            milestoneName: this.milestoneName,
            milestoneThreshold: this.milestoneThreshold,
            reward: this.reward,
            isGlobalMilestone: this.isGlobalMilestone
        };
    }
}
exports.MilestoneUnlocked = MilestoneUnlocked;
// Campus goal progress updated
class CampusGoalProgressUpdated extends domain_event_1.DomainEvent {
    constructor(ritualId, currentProgress, targetProgress, progressPercentage, contributorCount, metadata) {
        super(metadata);
        this.ritualId = ritualId;
        this.currentProgress = currentProgress;
        this.targetProgress = targetProgress;
        this.progressPercentage = progressPercentage;
        this.contributorCount = contributorCount;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'CampusGoalProgressUpdated';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            currentProgress: this.currentProgress,
            targetProgress: this.targetProgress,
            progressPercentage: this.progressPercentage,
            contributorCount: this.contributorCount
        };
    }
}
exports.CampusGoalProgressUpdated = CampusGoalProgressUpdated;
// Ritual completed
class RitualCompleted extends domain_event_1.DomainEvent {
    constructor(ritualId, finalParticipantCount, totalActivities, completionReason, topParticipants, metadata) {
        super(metadata);
        this.ritualId = ritualId;
        this.finalParticipantCount = finalParticipantCount;
        this.totalActivities = totalActivities;
        this.completionReason = completionReason;
        this.topParticipants = topParticipants;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'RitualCompleted';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            finalParticipantCount: this.finalParticipantCount,
            totalActivities: this.totalActivities,
            completionReason: this.completionReason,
            topParticipants: this.topParticipants
        };
    }
}
exports.RitualCompleted = RitualCompleted;
// Participant left ritual
class ParticipantLeftRitual extends domain_event_1.DomainEvent {
    constructor(ritualId, participantId, reason, pointsEarned, metadata) {
        super({ ...metadata, userId: participantId.id });
        this.ritualId = ritualId;
        this.participantId = participantId;
        this.reason = reason;
        this.pointsEarned = pointsEarned;
    }
    get aggregateId() {
        return this.ritualId.toString();
    }
    get eventName() {
        return 'ParticipantLeftRitual';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            ritualId: this.ritualId.toString(),
            participantId: this.participantId.id,
            reason: this.reason,
            pointsEarned: this.pointsEarned
        };
    }
}
exports.ParticipantLeftRitual = ParticipantLeftRitual;
//# sourceMappingURL=events.js.map