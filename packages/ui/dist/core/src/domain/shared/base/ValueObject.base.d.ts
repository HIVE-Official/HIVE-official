/**
 * Base Value Object class following DDD principles
 * Value Objects are immutable and defined by their properties
 */
export declare abstract class ValueObject<TProps> {
    protected readonly props: TProps;
    protected constructor(props: TProps);
    equals(vo?: ValueObject<TProps>): boolean;
    getValue(): TProps;
}
//# sourceMappingURL=ValueObject.base.d.ts.map