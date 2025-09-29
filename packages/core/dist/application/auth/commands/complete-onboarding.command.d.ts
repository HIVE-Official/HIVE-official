/**
 * Complete Onboarding Command
 * Creates user profile and completes onboarding after magic link verification
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/shared/base/Result';
import { IProfileRepository, ISpaceRepository, IRitualRepository } from '../../../infrastructure/repositories/interfaces';
export declare class CompleteOnboardingCommand extends Command {
    readonly email: string;
    readonly handle: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly major?: string | undefined;
    readonly graduationYear?: number | undefined;
    readonly interests: string[];
    readonly profilePhoto?: string | undefined;
    constructor(userId: string, campusId: string, email: string, handle: string, firstName: string, lastName: string, major?: string | undefined, graduationYear?: number | undefined, interests?: string[], profilePhoto?: string | undefined);
}
export interface CompleteOnboardingResult {
    profileId: string;
    handle: string;
    joinedSpaces: string[];
    joinedRituals: string[];
    onboardingComplete: boolean;
    redirectUrl: string;
}
export declare class CompleteOnboardingCommandHandler implements ICommandHandler<CompleteOnboardingCommand, CompleteOnboardingResult> {
    private readonly profileRepository;
    private readonly spaceRepository;
    private readonly ritualRepository;
    private readonly eventDispatcher;
    constructor(profileRepository: IProfileRepository, spaceRepository: ISpaceRepository, ritualRepository: IRitualRepository, eventDispatcher: any);
    execute(command: CompleteOnboardingCommand): Promise<Result<CompleteOnboardingResult>>;
}
//# sourceMappingURL=complete-onboarding.command.d.ts.map