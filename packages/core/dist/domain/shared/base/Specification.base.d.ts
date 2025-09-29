/**
 * Base Specification class following DDD principles
 * Specifications encapsulate business rules that can be combined
 */
export declare abstract class Specification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;
    and(specification: Specification<T>): Specification<T>;
    or(specification: Specification<T>): Specification<T>;
    not(): Specification<T>;
}
//# sourceMappingURL=Specification.base.d.ts.map