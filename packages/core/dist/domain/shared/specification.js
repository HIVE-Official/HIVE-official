"use strict";
/**
 * Specification Pattern
 * For building complex queries in a composable way
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualSpecifications = exports.FeedItemSpecifications = exports.CompositeSpecification = void 0;
class CompositeSpecification {
    and(other) {
        return new AndSpecification(this, other);
    }
    or(other) {
        return new OrSpecification(this, other);
    }
    not() {
        return new NotSpecification(this);
    }
}
exports.CompositeSpecification = CompositeSpecification;
class AndSpecification extends CompositeSpecification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
    }
}
class OrSpecification extends CompositeSpecification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
    }
}
class NotSpecification extends CompositeSpecification {
    constructor(spec) {
        super();
        this.spec = spec;
    }
    isSatisfiedBy(candidate) {
        return !this.spec.isSatisfiedBy(candidate);
    }
}
/**
 * Feed Specifications
 */
class FeedItemSpecifications {
    static fromSpace(spaceId) {
        return new FromSpaceSpecification(spaceId);
    }
    static byAuthor(authorId) {
        return new ByAuthorSpecification(authorId);
    }
    static isRecent(hoursAgo) {
        return new IsRecentSpecification(hoursAgo);
    }
    static hasMinimumEngagement(minEngagement) {
        return new HasMinimumEngagementSpecification(minEngagement);
    }
    static isTrending() {
        return new IsTrendingSpecification();
    }
    static hasTag(tag) {
        return new HasTagSpecification(tag);
    }
}
exports.FeedItemSpecifications = FeedItemSpecifications;
class FromSpaceSpecification extends CompositeSpecification {
    constructor(spaceId) {
        super();
        this.spaceId = spaceId;
    }
    isSatisfiedBy(candidate) {
        return candidate.source?.spaceId === this.spaceId;
    }
}
class ByAuthorSpecification extends CompositeSpecification {
    constructor(authorId) {
        super();
        this.authorId = authorId;
    }
    isSatisfiedBy(candidate) {
        return candidate.content?.authorId?.id === this.authorId;
    }
}
class IsRecentSpecification extends CompositeSpecification {
    constructor(hoursAgo) {
        super();
        this.cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    }
    isSatisfiedBy(candidate) {
        return candidate.createdAt > this.cutoffTime;
    }
}
class HasMinimumEngagementSpecification extends CompositeSpecification {
    constructor(minEngagement) {
        super();
        this.minEngagement = minEngagement;
    }
    isSatisfiedBy(candidate) {
        const engagements = candidate.interactions?.filter((i) => i.isEngagement()) || [];
        return engagements.length >= this.minEngagement;
    }
}
class IsTrendingSpecification extends CompositeSpecification {
    isSatisfiedBy(candidate) {
        return candidate.isTrending === true;
    }
}
class HasTagSpecification extends CompositeSpecification {
    constructor(tag) {
        super();
        this.tag = tag;
    }
    isSatisfiedBy(candidate) {
        return candidate.tags?.includes(this.tag) || false;
    }
}
/**
 * Ritual Specifications
 */
class RitualSpecifications {
    static isActive() {
        return new IsActiveRitualSpecification();
    }
    static hasType(type) {
        return new HasTypeSpecification(type);
    }
    static hasAvailableSlots() {
        return new HasAvailableSlotsSpecification();
    }
    static isEndingSoon(daysRemaining) {
        return new IsEndingSoonSpecification(daysRemaining);
    }
    static hasMinimumParticipants(min) {
        return new HasMinimumParticipantsSpecification(min);
    }
    static isJoinableBy(userId) {
        return new IsJoinableBySpecification(userId);
    }
}
exports.RitualSpecifications = RitualSpecifications;
class IsActiveRitualSpecification extends CompositeSpecification {
    isSatisfiedBy(candidate) {
        const now = new Date();
        return candidate.status?.isActive() &&
            candidate.startDate <= now &&
            candidate.endDate >= now;
    }
}
class HasTypeSpecification extends CompositeSpecification {
    constructor(type) {
        super();
        this.type = type;
    }
    isSatisfiedBy(candidate) {
        return candidate.type?.type === this.type;
    }
}
class HasAvailableSlotsSpecification extends CompositeSpecification {
    isSatisfiedBy(candidate) {
        // Assuming max 1000 participants per ritual
        const maxParticipants = 1000;
        return (candidate.participantCount || 0) < maxParticipants;
    }
}
class IsEndingSoonSpecification extends CompositeSpecification {
    constructor(daysRemaining) {
        super();
        this.daysRemaining = daysRemaining;
    }
    isSatisfiedBy(candidate) {
        const now = new Date();
        const daysLeft = Math.ceil((candidate.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysLeft <= this.daysRemaining && daysLeft > 0;
    }
}
class HasMinimumParticipantsSpecification extends CompositeSpecification {
    constructor(min) {
        super();
        this.min = min;
    }
    isSatisfiedBy(candidate) {
        return (candidate.participantCount || 0) >= this.min;
    }
}
class IsJoinableBySpecification extends CompositeSpecification {
    constructor(userId) {
        super();
        this.userId = userId;
    }
    isSatisfiedBy(candidate) {
        // Check if user can join (not already participating)
        const isParticipating = candidate.participations?.some((p) => p.participantId?.id === this.userId && p.isActive);
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
//# sourceMappingURL=specification.js.map