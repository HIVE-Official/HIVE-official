/**
 * Specification Pattern
 * For building complex queries in a composable way
 */
export interface Specification<T> {
    isSatisfiedBy(candidate: T): boolean;
    and(other: Specification<T>): Specification<T>;
    or(other: Specification<T>): Specification<T>;
    not(): Specification<T>;
}
export declare abstract class CompositeSpecification<T> implements Specification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;
    and(other: Specification<T>): Specification<T>;
    or(other: Specification<T>): Specification<T>;
    not(): Specification<T>;
}
/**
 * Feed Specifications
 */
export declare class FeedItemSpecifications {
    static fromSpace(spaceId: string): Specification<any>;
    static byAuthor(authorId: string): Specification<any>;
    static isRecent(hoursAgo: number): Specification<any>;
    static hasMinimumEngagement(minEngagement: number): Specification<any>;
    static isTrending(): Specification<any>;
    static hasTag(tag: string): Specification<any>;
}
/**
 * Ritual Specifications
 */
export declare class RitualSpecifications {
    static isActive(): Specification<any>;
    static hasType(type: string): Specification<any>;
    static hasAvailableSlots(): Specification<any>;
    static isEndingSoon(daysRemaining: number): Specification<any>;
    static hasMinimumParticipants(min: number): Specification<any>;
    static isJoinableBy(userId: string): Specification<any>;
}
/**
 * Usage Examples:
 *
 * // Find trending items from user's spaces in the last 24 hours
 * const spec = FeedItemSpecifications.isTrending()
 *   .and(FeedItemSpecifications.isRecent(24))
 *   .and(FeedItemSpecifications.fromSpace(userSpaceId));
 *
 * const filteredItems = feedItems.filter(item => spec.isSatisfiedBy(item));
 *
 * // Find active challenge rituals ending soon with good participation
 * const ritualSpec = RitualSpecifications.isActive()
 *   .and(RitualSpecifications.hasType('challenge'))
 *   .and(RitualSpecifications.isEndingSoon(7))
 *   .and(RitualSpecifications.hasMinimumParticipants(50));
 *
 * const urgentRituals = rituals.filter(r => ritualSpec.isSatisfiedBy(r));
 */ 
//# sourceMappingURL=specification.d.ts.map