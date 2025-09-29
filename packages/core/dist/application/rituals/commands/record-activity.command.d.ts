/**
 * Record Ritual Activity Command
 * Records user activity within a ritual
 */
import { Command, ICommandHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IRitualRepository } from '../../../repositories/interfaces';
export declare class RecordActivityCommand extends Command {
    readonly ritualId: string;
    readonly activityType: string;
    readonly points: number;
    readonly metadata?: Record<string, any> | undefined;
    constructor(ritualId: string, activityType: string, points: number, metadata?: Record<string, any> | undefined, userId: string, campusId: string);
}
export interface RecordActivityResult {
    success: boolean;
    totalPoints: number;
    newLevel?: number;
    badgeEarned?: {
        id: string;
        name: string;
        icon: string;
    };
    nextMilestone?: {
        name: string;
        pointsNeeded: number;
    };
}
export declare class RecordActivityCommandHandler implements ICommandHandler<RecordActivityCommand, RecordActivityResult> {
    private readonly ritualRepository;
    private readonly eventDispatcher;
    constructor(ritualRepository: IRitualRepository, eventDispatcher: any);
    execute(command: RecordActivityCommand): Promise<Result<RecordActivityResult>>;
}
//# sourceMappingURL=record-activity.command.d.ts.map