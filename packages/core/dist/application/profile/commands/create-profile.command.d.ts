/**
 * Create Profile Command
 * Creates a new user profile with onboarding
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IProfileRepository } from '../../../infrastructure/repositories/interfaces';
export declare class CreateProfileCommand extends Command {
    readonly email: string;
    readonly handle: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly userType: 'student' | 'faculty';
    constructor(email: string, handle: string, firstName: string, lastName: string, userType: 'student' | 'faculty', userId: string, campusId: string);
}
export interface CreateProfileResult {
    profileId: string;
    handle: string;
    isOnboarded: boolean;
    nextSteps: string[];
}
export declare class CreateProfileCommandHandler implements ICommandHandler<CreateProfileCommand, CreateProfileResult> {
    private readonly profileRepository;
    private readonly eventDispatcher;
    constructor(profileRepository: IProfileRepository, eventDispatcher: any);
    execute(command: CreateProfileCommand): Promise<Result<CreateProfileResult>>;
    private generateNextSteps;
}
//# sourceMappingURL=create-profile.command.d.ts.map