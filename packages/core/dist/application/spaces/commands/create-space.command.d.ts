/**
 * Create Space Command
 * Creates a new space with proper category and widgets
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { ISpaceRepository } from '../../../repositories/interfaces';
export declare class CreateSpaceCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly category: string;
    readonly isPrivate: boolean;
    readonly requiresApproval: boolean;
    constructor(name: string, description: string, category: string, isPrivate: boolean | undefined, requiresApproval: boolean | undefined, userId: string, campusId: string);
}
export interface CreateSpaceResult {
    spaceId: string;
    name: string;
    category: string;
    joinUrl: string;
    isVerified: boolean;
    widgets: string[];
}
export declare class CreateSpaceCommandHandler implements ICommandHandler<CreateSpaceCommand, CreateSpaceResult> {
    private readonly spaceRepository;
    private readonly profileRepository;
    private readonly eventDispatcher;
    constructor(spaceRepository: ISpaceRepository, profileRepository: any, eventDispatcher: any);
    execute(command: CreateSpaceCommand): Promise<Result<CreateSpaceResult>>;
    private canCreateSpaceCategory;
}
//# sourceMappingURL=create-space.command.d.ts.map