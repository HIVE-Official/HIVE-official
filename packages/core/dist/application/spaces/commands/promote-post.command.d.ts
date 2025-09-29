/**
 * Promote Post Command
 * Promotes a space post to the campus feed
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { ISpaceRepository } from '../../../repositories/interfaces';
export declare class PromotePostCommand extends Command {
    readonly spaceId: string;
    readonly postId: string;
    readonly reason: 'leader_boost' | 'auto_promote' | 'velocity';
    constructor(spaceId: string, postId: string, reason: 'leader_boost' | 'auto_promote' | 'velocity', userId: string, campusId: string);
}
export interface PromotePostResult {
    success: boolean;
    promotedAt: Date;
    estimatedReach: number;
}
export declare class PromotePostCommandHandler implements ICommandHandler<PromotePostCommand, PromotePostResult> {
    private readonly spaceRepository;
    private readonly feedService;
    private readonly eventDispatcher;
    constructor(spaceRepository: ISpaceRepository, feedService: any, eventDispatcher: any);
    execute(command: PromotePostCommand): Promise<Result<PromotePostResult>>;
    private calculateEstimatedReach;
}
//# sourceMappingURL=promote-post.command.d.ts.map