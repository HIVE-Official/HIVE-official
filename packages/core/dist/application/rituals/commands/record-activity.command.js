"use strict";
/**
 * Record Ritual Activity Command
 * Records user activity within a ritual
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordActivityCommandHandler = exports.RecordActivityCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class RecordActivityCommand extends base_1.Command {
    constructor(ritualId, activityType, points, metadata, userId, campusId) {
        super(userId, campusId);
        this.ritualId = ritualId;
        this.activityType = activityType;
        this.points = points;
        this.metadata = metadata;
    }
}
exports.RecordActivityCommand = RecordActivityCommand;
class RecordActivityCommandHandler {
    constructor(ritualRepository, eventDispatcher) {
        this.ritualRepository = ritualRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        try {
            // Get ritual
            const ritualResult = await this.ritualRepository.findById({
                id: command.ritualId,
                equals: () => false
            });
            if (ritualResult.isFailure) {
                return value_objects_1.Result.fail('Ritual not found');
            }
            const ritual = ritualResult.getValue();
            // Verify campus match
            if (!ritual.campusId.equals({ id: command.campusId, equals: () => false })) {
                return value_objects_1.Result.fail('Ritual not available on your campus');
            }
            // Check if user is participant
            const participant = ritual.getParticipant({ id: command.userId, equals: () => false });
            if (!participant) {
                return value_objects_1.Result.fail('User is not a participant in this ritual');
            }
            // Record activity
            const previousPoints = participant.totalPoints || 0;
            const recordResult = ritual.recordActivity({ id: command.userId, equals: () => false }, { type: command.activityType }, { value: command.points }, command.metadata || {});
            if (recordResult.isFailure) {
                return value_objects_1.Result.fail(recordResult.error);
            }
            // Save ritual
            await this.ritualRepository.save(ritual);
            // Get updated participant data
            const updatedParticipant = ritual.getParticipant({ id: command.userId, equals: () => false });
            const newPoints = updatedParticipant?.totalPoints || 0;
            // Check for badge earned
            let badgeEarned;
            if (newPoints >= 100 && previousPoints < 100) {
                badgeEarned = {
                    id: 'ritual_100',
                    name: '100 Points',
                    icon: '💯'
                };
                // Dispatch badge event
                await this.eventDispatcher.dispatch([{
                        eventType: 'ritual.badge_earned',
                        ritualId: command.ritualId,
                        userId: command.userId,
                        badge: badgeEarned,
                        timestamp: new Date()
                    }]);
            }
            // Calculate next milestone
            const currentMilestone = ritual.getCurrentMilestone();
            const nextMilestone = currentMilestone ? {
                name: currentMilestone.name,
                pointsNeeded: Math.max(0, currentMilestone.threshold - ritual.getTotalProgress())
            } : undefined;
            // Dispatch activity event
            await this.eventDispatcher.dispatch([{
                    eventType: 'ritual.activity_recorded',
                    ritualId: command.ritualId,
                    userId: command.userId,
                    activityType: command.activityType,
                    points: command.points,
                    totalPoints: newPoints,
                    timestamp: new Date()
                }]);
            return value_objects_1.Result.ok({
                success: true,
                totalPoints: newPoints,
                newLevel: Math.floor(newPoints / 100),
                badgeEarned,
                nextMilestone
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to record activity: ${error}`);
        }
    }
}
exports.RecordActivityCommandHandler = RecordActivityCommandHandler;
//# sourceMappingURL=record-activity.command.js.map