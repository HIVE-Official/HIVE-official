/**
 * Firebase Unit of Work Implementation
 * Manages transactions across repositories
 */
import { IUnitOfWork, IProfileRepository, IConnectionRepository, ISpaceRepository, IFeedRepository, IRitualRepository } from '../interfaces';
export declare class FirebaseUnitOfWork implements IUnitOfWork {
    private _profiles;
    private _connections;
    private _spaces;
    private _feeds;
    private _rituals;
    private transactionStarted;
    private transactionData;
    constructor();
    get profiles(): IProfileRepository;
    get connections(): IConnectionRepository;
    get spaces(): ISpaceRepository;
    get feeds(): IFeedRepository;
    get rituals(): IRitualRepository;
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=unit-of-work.d.ts.map