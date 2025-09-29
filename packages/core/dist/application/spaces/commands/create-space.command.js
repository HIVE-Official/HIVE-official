"use strict";
/**
 * Create Space Command
 * Creates a new space with proper category and widgets
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpaceCommandHandler = exports.CreateSpaceCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
const enhanced_space_1 = require("../../../domain/spaces/aggregates/enhanced-space");
class CreateSpaceCommand extends base_1.Command {
    constructor(name, description, category, isPrivate = false, requiresApproval = false, userId, campusId) {
        super(userId, campusId);
        this.name = name;
        this.description = description;
        this.category = category;
        this.isPrivate = isPrivate;
        this.requiresApproval = requiresApproval;
    }
}
exports.CreateSpaceCommand = CreateSpaceCommand;
class CreateSpaceCommandHandler {
    constructor(spaceRepository, profileRepository, eventDispatcher) {
        this.spaceRepository = spaceRepository;
        this.profileRepository = profileRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        try {
            // Check if name is unique within campus
            const existingSpace = await this.spaceRepository.findByName(command.name, command.campusId);
            if (existingSpace.isSuccess) {
                return value_objects_1.Result.fail('A space with this name already exists on campus');
            }
            // Verify creator permissions
            const creatorProfile = await this.profileRepository.findById({
                id: command.userId,
                equals: () => false
            });
            if (creatorProfile.isFailure) {
                return value_objects_1.Result.fail('Creator profile not found');
            }
            const profile = creatorProfile.getValue();
            // Check if user can create this category of space
            if (!this.canCreateSpaceCategory(profile, command.category)) {
                return value_objects_1.Result.fail('You do not have permission to create this type of space');
            }
            // Create space
            const spaceResult = enhanced_space_1.EnhancedSpace.create({
                name: command.name,
                description: command.description,
                category: command.category,
                creatorId: command.userId,
                campusId: command.campusId,
                visibility: {
                    isPublic: !command.isPrivate,
                    isDiscoverable: true,
                    requiresApproval: command.requiresApproval,
                    inviteOnly: false,
                    temporarilyPublic: false
                }
            });
            if (spaceResult.isFailure) {
                return value_objects_1.Result.fail(spaceResult.error);
            }
            const space = spaceResult.getValue();
            // Auto-verify if creator is faculty for academic spaces
            if (profile.userType?.isFaculty && space.category.isAcademic()) {
                space.verify(command.userId);
            }
            // Save space
            const saveResult = await this.spaceRepository.save(space);
            if (saveResult.isFailure) {
                return value_objects_1.Result.fail(saveResult.error);
            }
            // Dispatch events
            await this.eventDispatcher.dispatch([{
                    eventType: 'space.created',
                    spaceId: space.id.id,
                    creatorId: command.userId,
                    category: command.category,
                    campusId: command.campusId
                }]);
            return value_objects_1.Result.ok({
                spaceId: space.id.id,
                name: space.name.name,
                category: command.category,
                joinUrl: `/spaces/${space.id.id}`,
                isVerified: space.isVerified,
                widgets: space.widgets.map(w => w.type)
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to create space: ${error}`);
        }
    }
    canCreateSpaceCategory(profile, category) {
        // Faculty can create academic spaces
        if (profile.userType?.isFaculty && ['academic_department', 'class', 'research'].includes(category)) {
            return true;
        }
        // Student leaders can create certain spaces
        if (profile.badges?.some((b) => b.type === 'student_leader')) {
            return ['student_org', 'student_gov', 'social_club'].includes(category);
        }
        // Anyone can create general spaces
        return ['general', 'study_group', 'interest_group'].includes(category);
    }
}
exports.CreateSpaceCommandHandler = CreateSpaceCommandHandler;
//# sourceMappingURL=create-space.command.js.map