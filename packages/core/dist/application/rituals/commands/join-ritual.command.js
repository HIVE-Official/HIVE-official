"use strict";
/**
 * Join Ritual Command
 * Handles user joining a ritual
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRitualCommandHandler = exports.JoinRitualCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class JoinRitualCommand extends base_1.Command {
    constructor(ritualId, userId, campusId) {
        super(userId, campusId);
        this.ritualId = ritualId;
    }
}
exports.JoinRitualCommand = JoinRitualCommand;
class JoinRitualCommandHandler {
    constructor(ritualRepository, profileRepository, eventDispatcher) {
        this.ritualRepository = ritualRepository;
        this.profileRepository = profileRepository;
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
            // Check if ritual is active
            if (!ritual.isActive) {
                return value_objects_1.Result.fail('Ritual is not currently active');
            }
            // Verify campus match
            if (!ritual.campusId.equals({ id: command.campusId, equals: () => false })) {
                return value_objects_1.Result.fail('Ritual not available on your campus');
            }
            // Add participant
            const joinResult = ritual.addParticipant({ id: command.userId, equals: () => false });
            if (joinResult.isFailure) {
                return value_objects_1.Result.fail(joinResult.error);
            }
            // Save ritual
            await this.ritualRepository.save(ritual);
            // Dispatch event
            await this.eventDispatcher.dispatch([{
                    eventType: 'ritual.joined',
                    ritualId: command.ritualId,
                    userId: command.userId,
                    campusId: command.campusId,
                    timestamp: new Date()
                }]);
            // Get recent milestones for current milestone info
            const recentMilestones = ritual.getRecentMilestones(24);
            const currentMilestone = recentMilestones.length > 0 ? recentMilestones[0].name : 'Starting';
            return value_objects_1.Result.ok({
                success: true,
                ritualName: ritual.title.title,
                startDate: ritual.startDate,
                endDate: ritual.endDate,
                currentMilestone,
                participantCount: ritual.participantCount
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to join ritual: ${error}`);
        }
    }
}
exports.JoinRitualCommandHandler = JoinRitualCommandHandler;
//# sourceMappingURL=join-ritual.command.js.map