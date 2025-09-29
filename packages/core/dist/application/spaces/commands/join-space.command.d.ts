/**
 * Join Space Command
 * Handles user joining a space
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { ISpaceRepository, IProfileRepository } from '../../../repositories/interfaces';
export declare class JoinSpaceCommand extends Command {
    readonly spaceId: string;
    constructor(spaceId: string, userId: string, campusId: string);
}
export interface JoinSpaceResult {
    success: boolean;
    memberCount: number;
    userRole: string;
    requiresApproval: boolean;
}
export declare class JoinSpaceCommandHandler implements ICommandHandler<JoinSpaceCommand, JoinSpaceResult> {
    private readonly spaceRepository;
    private readonly profileRepository;
    private readonly eventDispatcher;
    constructor(spaceRepository: ISpaceRepository, profileRepository: IProfileRepository, eventDispatcher: any);
    execute(command: JoinSpaceCommand): Promise<Result<JoinSpaceResult>>;
}
//# sourceMappingURL=join-space.command.d.ts.map