/**
 * Base Entity class following DDD principles
 * Entities have identity that persists over time
 */
export declare abstract class Entity<TProps> {
    protected readonly _id: string;
    protected props: TProps;
    protected constructor(props: TProps, id: string);
    get id(): string;
    equals(entity?: Entity<TProps>): boolean;
}
//# sourceMappingURL=Entity.base.d.ts.map