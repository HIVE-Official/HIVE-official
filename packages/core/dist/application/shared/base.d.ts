/**
 * Base CQRS Infrastructure
 * Foundation for Commands, Queries, and Handlers
 */
import { Result } from '../../domain/profile/value-objects';
export interface ICommand {
    readonly commandId: string;
    readonly timestamp: Date;
    readonly userId: string;
    readonly campusId: string;
}
export interface IQuery {
    readonly queryId: string;
    readonly timestamp: Date;
    readonly userId?: string;
    readonly campusId: string;
}
export interface ICommandHandler<TCommand extends ICommand, TResult> {
    execute(command: TCommand): Promise<Result<TResult>>;
}
export interface IQueryHandler<TQuery extends IQuery, TResult> {
    execute(query: TQuery): Promise<Result<TResult>>;
}
export declare abstract class Command implements ICommand {
    readonly userId: string;
    readonly campusId: string;
    readonly commandId: string;
    readonly timestamp: Date;
    constructor(userId: string, campusId: string);
}
export declare abstract class Query implements IQuery {
    readonly campusId: string;
    readonly userId?: string | undefined;
    readonly queryId: string;
    readonly timestamp: Date;
    constructor(campusId: string, userId?: string | undefined);
}
export interface IUnitOfWork {
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    complete(): Promise<void>;
}
export interface IEventDispatcher {
    dispatch(events: any[]): Promise<void>;
}
export declare abstract class ApplicationService {
    protected readonly unitOfWork: IUnitOfWork;
    protected readonly eventDispatcher: IEventDispatcher;
    constructor(unitOfWork: IUnitOfWork, eventDispatcher: IEventDispatcher);
    protected executeInTransaction<T>(operation: () => Promise<Result<T>>): Promise<Result<T>>;
}
export interface ICommandBus {
    execute<TResult>(command: ICommand): Promise<Result<TResult>>;
    register<TCommand extends ICommand, TResult>(commandType: string, handler: ICommandHandler<TCommand, TResult>): void;
}
export interface IQueryBus {
    execute<TResult>(query: IQuery): Promise<Result<TResult>>;
    register<TQuery extends IQuery, TResult>(queryType: string, handler: IQueryHandler<TQuery, TResult>): void;
}
export declare class CommandBus implements ICommandBus {
    private handlers;
    register<TCommand extends ICommand, TResult>(commandType: string, handler: ICommandHandler<TCommand, TResult>): void;
    execute<TResult>(command: ICommand): Promise<Result<TResult>>;
}
export declare class QueryBus implements IQueryBus {
    private handlers;
    register<TQuery extends IQuery, TResult>(queryType: string, handler: IQueryHandler<TQuery, TResult>): void;
    execute<TResult>(query: IQuery): Promise<Result<TResult>>;
}
export declare abstract class Saga {
    protected steps: Array<() => Promise<Result<any>>>;
    protected compensations: Array<() => Promise<void>>;
    protected addStep(step: () => Promise<Result<any>>, compensation: () => Promise<void>): void;
    execute(): Promise<Result<void>>;
}
//# sourceMappingURL=base.d.ts.map