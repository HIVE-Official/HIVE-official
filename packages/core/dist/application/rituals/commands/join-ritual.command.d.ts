/**
 * Join Ritual Command
 * Handles user joining a ritual
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IRitualRepository, IProfileRepository } from '../../../repositories/interfaces';
export declare class JoinRitualCommand extends Command {
    readonly ritualId: string;
    constructor(ritualId: string, userId: string, campusId: string);
}
export interface JoinRitualResult {
    success: boolean;
    ritualName: string;
    startDate: Date;
    endDate: Date;
    currentMilestone: string;
    participantCount: number;
}
export declare class JoinRitualCommandHandler implements ICommandHandler<JoinRitualCommand, JoinRitualResult> {
    private readonly ritualRepository;
    private readonly profileRepository;
    private readonly eventDispatcher;
    constructor(ritualRepository: IRitualRepository, profileRepository: IProfileRepository, eventDispatcher: any);
    execute(command: JoinRitualCommand): Promise<Result<JoinRitualResult>>;
}
//# sourceMappingURL=join-ritual.command.d.ts.map