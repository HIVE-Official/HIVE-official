/**
 * Firebase Unit of Work Implementation
 * Manages transactions across repositories
 */
import { IUnitOfWork, IProfileRepository, IConnectionRepository, ISpaceRepository, IFeedRepository, IRitualRepository, IToolRepository } from '../interfaces';
export declare class FirebaseUnitOfWork implements IUnitOfWork {
    private _profiles;
    private _connections;
    private _spaces;
    private _feeds;
    private _rituals;
    private _tools;
    private transactionStarted;
    private transactionData;
    constructor();
    get profiles(): IProfileRepository;
    get connections(): IConnectionRepository;
    get spaces(): ISpaceRepository;
    get feeds(): IFeedRepository;
    get rituals(): IRitualRepository;
    get tools(): IToolRepository;
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=unit-of-work.d.ts.map