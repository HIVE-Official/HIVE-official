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

export abstract class CompositeSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

class AndSpecification<T> extends CompositeSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends CompositeSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends CompositeSpecification<T> {
  constructor(private spec: Specification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

/**
 * Feed Specifications
 */
export class FeedItemSpecifications {
  static fromSpace(spaceId: string): Specification<any> {
    return new FromSpaceSpecification(spaceId);
  }

  static byAuthor(authorId: string): Specification<any> {
    return new ByAuthorSpecification(authorId);
  }

  static isRecent(hoursAgo: number): Specification<any> {
    return new IsRecentSpecification(hoursAgo);
  }

  static hasMinimumEngagement(minEngagement: number): Specification<any> {
    return new HasMinimumEngagementSpecification(minEngagement);
  }

  static isTrending(): Specification<any> {
    return new IsTrendingSpecification();
  }

  static hasTag(tag: string): Specification<any> {
    return new HasTagSpecification(tag);
  }
}

class FromSpaceSpecification extends CompositeSpecification<any> {
  constructor(private spaceId: string) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    return candidate.source?.spaceId === this.spaceId;
  }
}

class ByAuthorSpecification extends CompositeSpecification<any> {
  constructor(private authorId: string) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    return candidate.content?.authorId?.id === this.authorId;
  }
}

class IsRecentSpecification extends CompositeSpecification<any> {
  private cutoffTime: Date;

  constructor(hoursAgo: number) {
    super();
    this.cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
  }

  isSatisfiedBy(candidate: any): boolean {
    return candidate.createdAt > this.cutoffTime;
  }
}

class HasMinimumEngagementSpecification extends CompositeSpecification<any> {
  constructor(private minEngagement: number) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    const engagements = candidate.interactions?.filter((i: any) => i.isEngagement()) || [];
    return engagements.length >= this.minEngagement;
  }
}

class IsTrendingSpecification extends CompositeSpecification<any> {
  isSatisfiedBy(candidate: any): boolean {
    return candidate.isTrending === true;
  }
}

class HasTagSpecification extends CompositeSpecification<any> {
  constructor(private tag: string) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    return candidate.tags?.includes(this.tag) || false;
  }
}

/**
 * Ritual Specifications
 */
export class RitualSpecifications {
  static isActive(): Specification<any> {
    return new IsActiveRitualSpecification();
  }

  static hasType(type: string): Specification<any> {
    return new HasTypeSpecification(type);
  }

  static hasAvailableSlots(): Specification<any> {
    return new HasAvailableSlotsSpecification();
  }

  static isEndingSoon(daysRemaining: number): Specification<any> {
    return new IsEndingSoonSpecification(daysRemaining);
  }

  static hasMinimumParticipants(min: number): Specification<any> {
    return new HasMinimumParticipantsSpecification(min);
  }

  static isJoinableBy(userId: string): Specification<any> {
    return new IsJoinableBySpecification(userId);
  }
}

class IsActiveRitualSpecification extends CompositeSpecification<any> {
  isSatisfiedBy(candidate: any): boolean {
    const now = new Date();
    return candidate.status?.isActive() &&
           candidate.startDate <= now &&
           candidate.endDate >= now;
  }
}

class HasTypeSpecification extends CompositeSpecification<any> {
  constructor(private type: string) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    return candidate.type?.type === this.type;
  }
}

class HasAvailableSlotsSpecification extends CompositeSpecification<any> {
  isSatisfiedBy(candidate: any): boolean {
    // Assuming max 1000 participants per ritual
    const maxParticipants = 1000;
    return (candidate.participantCount || 0) < maxParticipants;
  }
}

class IsEndingSoonSpecification extends CompositeSpecification<any> {
  constructor(private daysRemaining: number) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    const now = new Date();
    const daysLeft = Math.ceil(
      (candidate.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft <= this.daysRemaining && daysLeft > 0;
  }
}

class HasMinimumParticipantsSpecification extends CompositeSpecification<any> {
  constructor(private min: number) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    return (candidate.participantCount || 0) >= this.min;
  }
}

class IsJoinableBySpecification extends CompositeSpecification<any> {
  constructor(private userId: string) {
    super();
  }

  isSatisfiedBy(candidate: any): boolean {
    // Check if user can join (not already participating)
    const isParticipating = candidate.participations?.some(
      (p: any) => p.participantId?.id === this.userId && p.isActive
    );
    return candidate.canJoin?.() && !isParticipating;
  }
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