"use strict";
/**
 * Promote Post Command
 * Promotes a space post to the campus feed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotePostCommandHandler = exports.PromotePostCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class PromotePostCommand extends base_1.Command {
    constructor(spaceId, postId, reason, userId, campusId) {
        super(userId, campusId);
        this.spaceId = spaceId;
        this.postId = postId;
        this.reason = reason;
    }
}
exports.PromotePostCommand = PromotePostCommand;
class PromotePostCommandHandler {
    constructor(spaceRepository, feedService, eventDispatcher) {
        this.spaceRepository = spaceRepository;
        this.feedService = feedService;
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
            if (!space.campusId.equals({ id: command.campusId, equals: () => false })) {
                return value_objects_1.Result.fail('Space not on this campus');
            }
            // Check if it's auto-promotion or manual
            if (command.reason === 'leader_boost') {
                // Verify user is a leader
                const member = space.getMember({ id: command.userId, equals: () => false });
                if (!member || !member.role.canModerate()) {
                    return value_objects_1.Result.fail('Only leaders and moderators can promote posts');
                }
                // Promote the post
                const promoteResult = space.promotePost({ id: command.postId, equals: () => false }, { id: command.userId, equals: () => false });
                if (promoteResult.isFailure) {
                    return value_objects_1.Result.fail(promoteResult.error);
                }
            }
            else if (command.reason === 'auto_promote') {
                // Check if post meets auto-promotion threshold
                const promoted = space.checkAutoPromotion({ id: command.postId, equals: () => false });
                if (!promoted) {
                    return value_objects_1.Result.fail('Post does not meet auto-promotion threshold');
                }
            }
            // Save space
            await this.spaceRepository.save(space);
            // Add to feed
            await this.feedService.addPromotedPost({
                spaceId: command.spaceId,
                postId: command.postId,
                promotedBy: command.userId,
                reason: command.reason,
                campusId: command.campusId
            });
            // Dispatch event
            await this.eventDispatcher.dispatch([{
                    eventType: 'post.promoted',
                    spaceId: command.spaceId,
                    postId: command.postId,
                    promotedBy: command.userId,
                    reason: command.reason,
                    campusId: command.campusId
                }]);
            // Calculate estimated reach based on campus size
            const estimatedReach = this.calculateEstimatedReach(space);
            return value_objects_1.Result.ok({
                success: true,
                promotedAt: new Date(),
                estimatedReach
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to promote post: ${error}`);
        }
    }
    calculateEstimatedReach(space) {
        // Base reach on space members
        const baseReach = space.memberCount * 10;
        // Boost for trending spaces
        const trendingBoost = space.trendingScore > 0.5 ? 1.5 : 1;
        // Boost for verified spaces
        const verifiedBoost = space.isVerified ? 1.2 : 1;
        return Math.floor(baseReach * trendingBoost * verifiedBoost);
    }
}
exports.PromotePostCommandHandler = PromotePostCommandHandler;
//# sourceMappingURL=promote-post.command.js.map