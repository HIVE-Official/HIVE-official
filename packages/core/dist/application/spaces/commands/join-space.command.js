"use strict";
/**
 * Join Space Command
 * Handles user joining a space
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinSpaceCommandHandler = exports.JoinSpaceCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class JoinSpaceCommand extends base_1.Command {
    constructor(spaceId, userId, campusId) {
        super(userId, campusId);
        this.spaceId = spaceId;
    }
}
exports.JoinSpaceCommand = JoinSpaceCommand;
class JoinSpaceCommandHandler {
    constructor(spaceRepository, profileRepository, eventDispatcher) {
        this.spaceRepository = spaceRepository;
        this.profileRepository = profileRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        try {
            // Get space
            const spaceResult = await this.spaceRepository.findById({
                id: command.spaceId,
                equals: () => false
            });
            if (spaceResult.isFailure) {
                return value_objects_1.Result.fail('Space not found');
            }
            const space = spaceResult.getValue();
            // Verify campus match
            if (space.campusId !== command.campusId) {
                return value_objects_1.Result.fail('Space not available on your campus');
            }
            // Get user profile
            const profileResult = await this.profileRepository.findById({
                id: command.userId,
                equals: () => false
            });
            if (profileResult.isFailure) {
                return value_objects_1.Result.fail('User profile not found');
            }
            // Create ProfileId for the user
            const userProfileIdResult = value_objects_1.ProfileId.create(command.userId);
            if (userProfileIdResult.isFailure) {
                return value_objects_1.Result.fail('Invalid user ID');
            }
            const userProfileId = userProfileIdResult.getValue();
            // Check if already a member
            if (space.isMember(userProfileId)) {
                return value_objects_1.Result.fail('Already a member of this space');
            }
            // Add member
            const joinResult = space.addMember(userProfileId);
            if (joinResult.isFailure) {
                return value_objects_1.Result.fail(joinResult.error);
            }
            // Save space
            await this.spaceRepository.save(space);
            // Dispatch event
            await this.eventDispatcher.dispatch([{
                    eventType: 'space.joined',
                    spaceId: command.spaceId,
                    userId: command.userId,
                    campusId: command.campusId,
                    timestamp: new Date()
                }]);
            return value_objects_1.Result.ok({
                success: true,
                memberCount: space.memberCount,
                userRole: 'member',
                requiresApproval: space.settings.requireApproval
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to join space: ${error}`);
        }
    }
}
exports.JoinSpaceCommandHandler = JoinSpaceCommandHandler;
//# sourceMappingURL=join-space.command.js.map