/**
 * Update Privacy Command
 * Updates user's privacy settings
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { VisibilityLevel } from '../../../domain/profile/value-objects/profile-privacy';
import { IProfileRepository } from '../../../infrastructure/repositories/interfaces';
export declare class UpdatePrivacyCommand extends Command {
    readonly profileId: string;
    readonly visibility?: VisibilityLevel;
    readonly searchable?: boolean | undefined;
    readonly ghostMode?: boolean | undefined;
    readonly widgetPrivacy?: Record<string, VisibilityLevel> | undefined;
    constructor(profileId: string, visibility?: VisibilityLevel, searchable?: boolean | undefined, ghostMode?: boolean | undefined, widgetPrivacy?: Record<string, VisibilityLevel> | undefined, userId: string, campusId: string);
}
export interface UpdatePrivacyResult {
    success: boolean;
    newVisibility: VisibilityLevel;
    isGhostMode: boolean;
}
export declare class UpdatePrivacyCommandHandler implements ICommandHandler<UpdatePrivacyCommand, UpdatePrivacyResult> {
    private readonly profileRepository;
    private readonly eventDispatcher;
    constructor(profileRepository: IProfileRepository, eventDispatcher: any);
    execute(command: UpdatePrivacyCommand): Promise<Result<UpdatePrivacyResult>>;
}
//# sourceMappingURL=update-privacy.command.d.ts.map