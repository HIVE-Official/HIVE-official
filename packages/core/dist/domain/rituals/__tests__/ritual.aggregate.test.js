"use strict";
/**
 * Ritual Aggregate Tests
 * Comprehensive test coverage for Ritual business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_aggregate_1 = require("../aggregates/ritual.aggregate");
const ritual_id_value_1 = require("../value-objects/ritual-id.value");
const campus_id_value_1 = require("../../profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../../profile/value-objects/profile-id.value");
/**
 * Test Data Factories
 */
const createValidRitualId = () => {
    const result = ritual_id_value_1.RitualId.generate(); // Use generate() for auto-generated IDs
    if (result.isFailure)
        throw new Error('Failed to create RitualId');
    return result.getValue();
};
const createValidCampusId = (value = 'ub-buffalo') => {
    const result = campus_id_value_1.CampusId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create CampusId: ${result.error}`);
    return result.getValue();
};
const createValidProfileId = (value = 'profile_123') => {
    const result = profile_id_value_1.ProfileId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create ProfileId: ${result.error}`);
    return result.getValue();
};
const createValidGoal = (overrides) => {
    return {
        id: 'goal_1',
        description: 'Join 5 spaces',
        type: 'individual',
        targetValue: 5,
        currentValue: 0,
        isCompleted: false,
        ...overrides
    };
};
const createValidRequirement = (overrides) => {
    return {
        action: 'Join Space',
        target: 5,
        validation: 'automatic',
        ...overrides
    };
};
const createValidReward = (overrides) => {
    return {
        id: 'reward_1',
        type: 'badge',
        name: 'Early Adopter',
        description: 'Joined during first week',
        ...overrides
    };
};
/**
 * Tests
 */
(0, vitest_1.describe)('Ritual.create()', () => {
    (0, vitest_1.it)('should create a valid short ritual', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Freshman Welcome',
            description: 'Welcome all freshmen to campus',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'students',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        (0, vitest_1.expect)(ritual.name).toBe('Freshman Welcome');
        (0, vitest_1.expect)(ritual.type).toBe('short');
        (0, vitest_1.expect)(ritual.duration).toBe('1 week');
        (0, vitest_1.expect)(ritual.status).toBe('draft');
    });
    (0, vitest_1.it)('should create a valid yearbook ritual', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Campus Championship',
            description: 'Tournament-style competition',
            type: 'yearbook',
            category: 'community',
            duration: '3 weeks',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        (0, vitest_1.expect)(ritual.type).toBe('yearbook');
        (0, vitest_1.expect)(ritual.duration).toBe('3 weeks');
    });
    (0, vitest_1.it)('should create a valid anticipatory ritual', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Feature Countdown',
            description: 'Build excitement for new feature',
            type: 'anticipatory',
            category: 'community',
            duration: 'variable',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        (0, vitest_1.expect)(ritual.type).toBe('anticipatory');
        (0, vitest_1.expect)(ritual.duration).toBe('variable');
    });
    (0, vitest_1.it)('should fail when name is empty', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: '',
            description: 'Test ritual',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('name is required');
    });
    (0, vitest_1.it)('should fail when description is empty', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: '',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('description is required');
    });
    (0, vitest_1.it)('should fail when short ritual is not 1 week duration', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '2 weeks',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Short rituals must be 1 week');
    });
    (0, vitest_1.it)('should fail when yearbook ritual is not 3 weeks duration', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'yearbook',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Yearbook rituals must be 3 weeks');
    });
    (0, vitest_1.it)('should initialize with empty participants', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        (0, vitest_1.expect)(ritual.getParticipantCount()).toBe(0);
    });
    (0, vitest_1.it)('should initialize participation stats to zero', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        (0, vitest_1.expect)(ritual.participationStats.total).toBe(0);
        (0, vitest_1.expect)(ritual.participationStats.active).toBe(0);
        (0, vitest_1.expect)(ritual.participationStats.completed).toBe(0);
    });
    (0, vitest_1.it)('should emit RitualCreatedEvent', () => {
        const result = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const ritual = result.getValue();
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[0].getEventName()).toBe('RitualCreated');
    });
});
(0, vitest_1.describe)('Ritual.announce()', () => {
    (0, vitest_1.it)('should announce a draft ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.announce();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('announced');
    });
    (0, vitest_1.it)('should fail when announcing non-draft ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.announce();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only draft rituals can be announced');
    });
});
(0, vitest_1.describe)('Ritual.activate()', () => {
    (0, vitest_1.it)('should activate an announced ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'announced',
            visibility: 'public'
        }).getValue();
        const result = ritual.activate();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('active');
    });
    (0, vitest_1.it)('should activate a paused ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'paused',
            visibility: 'public'
        }).getValue();
        const result = ritual.activate();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('active');
    });
    (0, vitest_1.it)('should emit RitualActivatedEvent', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'announced',
            visibility: 'public'
        }).getValue();
        ritual.clearEvents();
        ritual.activate();
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('RitualActivated');
    });
    (0, vitest_1.it)('should fail when activating draft ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.activate();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only announced or paused rituals can be activated');
    });
});
(0, vitest_1.describe)('Ritual.enterFinalPush()', () => {
    (0, vitest_1.it)('should enter final push from active status', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.enterFinalPush();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('final_push');
    });
    (0, vitest_1.it)('should fail when entering final push from non-active status', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.enterFinalPush();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only active rituals can enter final push');
    });
});
(0, vitest_1.describe)('Ritual.complete()', () => {
    (0, vitest_1.it)('should complete an active ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.complete();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('completed');
    });
    (0, vitest_1.it)('should complete a final_push ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'final_push',
            visibility: 'public'
        }).getValue();
        const result = ritual.complete();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('completed');
    });
    (0, vitest_1.it)('should fail when completing draft ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.complete();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only active or final push rituals can be completed');
    });
});
(0, vitest_1.describe)('Ritual.pause()', () => {
    (0, vitest_1.it)('should pause an active ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.pause();
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.status).toBe('paused');
    });
    (0, vitest_1.it)('should emit RitualDeactivatedEvent', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.clearEvents();
        ritual.pause();
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('RitualDeactivated');
    });
    (0, vitest_1.it)('should fail when pausing non-active ritual', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.pause();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only active rituals can be paused');
    });
});
(0, vitest_1.describe)('Ritual.addParticipant()', () => {
    (0, vitest_1.it)('should add a new participant', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const participantId = createValidProfileId('participant_001');
        const result = ritual.addParticipant(participantId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.getParticipantCount()).toBe(1);
        (0, vitest_1.expect)(ritual.participationStats.total).toBe(1);
        (0, vitest_1.expect)(ritual.participationStats.active).toBe(1);
    });
    (0, vitest_1.it)('should prevent adding duplicate participants', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const participantId = createValidProfileId('participant_001');
        ritual.addParticipant(participantId);
        const result = ritual.addParticipant(participantId);
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('already participating');
    });
    (0, vitest_1.it)('should block participants before ritual is announced', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Draft Ritual',
            description: 'Draft description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        const result = ritual.addParticipant(createValidProfileId('late_joiner'));
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('not currently accepting');
        (0, vitest_1.expect)(ritual.getParticipantCount()).toBe(0);
        (0, vitest_1.expect)(ritual.participationStats.total).toBe(0);
        (0, vitest_1.expect)(ritual.participationStats.active).toBe(0);
    });
    (0, vitest_1.it)('should enforce maximum participant limit', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            targetParticipation: 2,
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.addParticipant(createValidProfileId('p1'));
        ritual.addParticipant(createValidProfileId('p2'));
        const result = ritual.addParticipant(createValidProfileId('p3'));
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('maximum participants');
    });
    (0, vitest_1.it)('should prevent joining hidden rituals', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'hidden'
        }).getValue();
        const result = ritual.addParticipant(createValidProfileId());
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Cannot join hidden rituals');
    });
    (0, vitest_1.it)('should emit ParticipantJoinedEvent', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.clearEvents();
        ritual.addParticipant(createValidProfileId('participant_001'));
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ParticipantJoined');
    });
});
(0, vitest_1.describe)('Ritual.removeParticipant()', () => {
    (0, vitest_1.it)('should remove an existing participant', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const participantId = createValidProfileId('participant_001');
        ritual.addParticipant(participantId);
        (0, vitest_1.expect)(ritual.getParticipantCount()).toBe(1);
        const result = ritual.removeParticipant(participantId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.getParticipantCount()).toBe(0);
    });
    (0, vitest_1.it)('should fail when removing non-participant', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.removeParticipant(createValidProfileId('non_participant'));
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('not participating');
    });
    (0, vitest_1.it)('should emit ParticipantLeftEvent', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const participantId = createValidProfileId('participant_001');
        ritual.addParticipant(participantId);
        ritual.clearEvents();
        ritual.removeParticipant(participantId);
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ParticipantLeft');
    });
});
(0, vitest_1.describe)('Ritual.updateGoalProgress()', () => {
    (0, vitest_1.it)('should update goal progress', () => {
        const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [goal],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.updateGoalProgress('goal_1', 5);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(ritual.goals[0].currentValue).toBe(5);
    });
    (0, vitest_1.it)('should mark goal as completed when target reached', () => {
        const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [goal],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.updateGoalProgress('goal_1', 10);
        (0, vitest_1.expect)(ritual.goals[0].isCompleted).toBe(true);
        (0, vitest_1.expect)(ritual.goals[0].completedAt).toBeDefined();
    });
    (0, vitest_1.it)('should emit MilestoneCompletedEvent when goal completed', () => {
        const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [goal],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.clearEvents();
        ritual.updateGoalProgress('goal_1', 10);
        const events = ritual.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('MilestoneCompleted');
    });
    (0, vitest_1.it)('should fail when goal not found', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal({ id: 'goal_1' })],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const result = ritual.updateGoalProgress('goal_999', 5);
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Goal not found');
    });
});
(0, vitest_1.describe)('Ritual.getCompletionPercentage()', () => {
    (0, vitest_1.it)('should return 0 when no goals exist', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.getCompletionPercentage()).toBe(0);
    });
    (0, vitest_1.it)('should calculate completion percentage correctly', () => {
        const goal1 = createValidGoal({ id: 'g1', isCompleted: true });
        const goal2 = createValidGoal({ id: 'g2', isCompleted: false });
        const goal3 = createValidGoal({ id: 'g3', isCompleted: true });
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [goal1, goal2, goal3],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.getCompletionPercentage()).toBe(67); // 2 of 3 = 66.67 rounded to 67
    });
});
(0, vitest_1.describe)('Ritual.getTotalProgress()', () => {
    (0, vitest_1.it)('should return 0 when no goals exist', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.getTotalProgress()).toBe(0);
    });
    (0, vitest_1.it)('should calculate total progress across all goals', () => {
        const goal1 = createValidGoal({ id: 'g1', targetValue: 10, currentValue: 5 }); // 50%
        const goal2 = createValidGoal({ id: 'g2', targetValue: 20, currentValue: 10 }); // 50%
        const goal3 = createValidGoal({ id: 'g3', targetValue: 100, currentValue: 100 }); // 100%
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [goal1, goal2, goal3],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.getTotalProgress()).toBe(67); // (50 + 50 + 100) / 3 = 66.67 rounded to 67
    });
});
(0, vitest_1.describe)('Ritual.isActive()', () => {
    (0, vitest_1.it)('should return true for active status', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.isActive()).toBe(true);
    });
    (0, vitest_1.it)('should return true for final_push status', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'final_push',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.isActive()).toBe(true);
    });
    (0, vitest_1.it)('should return false for non-active status', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.isActive()).toBe(false);
    });
});
(0, vitest_1.describe)('Ritual.hasStarted()', () => {
    (0, vitest_1.it)('should return true when start date is in the past', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: pastDate,
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.hasStarted()).toBe(true);
    });
    (0, vitest_1.it)('should return false when start date is in the future', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: futureDate,
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.hasStarted()).toBe(false);
    });
});
(0, vitest_1.describe)('Ritual.hasEnded()', () => {
    (0, vitest_1.it)('should return true when end date is in the past', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            endDate: pastDate,
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'completed',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.hasEnded()).toBe(true);
    });
    (0, vitest_1.it)('should return false when end date is undefined', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'anticipatory',
            category: 'social',
            duration: 'variable',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.hasEnded()).toBe(false);
    });
});
(0, vitest_1.describe)('Ritual.getParticipationWarnings()', () => {
    (0, vitest_1.it)('should warn when less than 7 days remaining', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            endDate: futureDate,
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        const warnings = ritual.getParticipationWarnings();
        (0, vitest_1.expect)(warnings.some(w => w.includes('days'))).toBe(true);
    });
    (0, vitest_1.it)('should warn when less than 10 spots remaining', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            targetParticipation: 15,
            status: 'active',
            visibility: 'public'
        }).getValue();
        // Add 10 participants (5 spots remaining)
        for (let i = 0; i < 10; i++) {
            ritual.addParticipant(createValidProfileId(`p${i}`));
        }
        const warnings = ritual.getParticipationWarnings();
        (0, vitest_1.expect)(warnings.some(w => w.includes('spots remaining'))).toBe(true);
    });
});
(0, vitest_1.describe)('Ritual.getSpotsRemaining()', () => {
    (0, vitest_1.it)('should return null when no target participation set', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'active',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.getSpotsRemaining()).toBeNull();
    });
    (0, vitest_1.it)('should calculate spots remaining correctly', () => {
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: createValidCampusId(),
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            targetParticipation: 20,
            status: 'active',
            visibility: 'public'
        }).getValue();
        ritual.addParticipant(createValidProfileId('p1'));
        ritual.addParticipant(createValidProfileId('p2'));
        (0, vitest_1.expect)(ritual.getSpotsRemaining()).toBe(18);
    });
});
(0, vitest_1.describe)('Ritual Business Invariants', () => {
    (0, vitest_1.it)('should maintain campus isolation', () => {
        const campusId = createValidCampusId('ub-buffalo');
        const ritual = ritual_aggregate_1.Ritual.create({
            name: 'Test Ritual',
            description: 'Test description',
            type: 'short',
            category: 'social',
            duration: '1 week',
            startDate: new Date(),
            goals: [createValidGoal()],
            requirements: [createValidRequirement()],
            rewards: [createValidReward()],
            campusId: campusId,
            targetAudience: 'all',
            createdBy: createValidProfileId(),
            status: 'draft',
            visibility: 'public'
        }).getValue();
        (0, vitest_1.expect)(ritual.campusId.value).toBe('ub-buffalo');
    });
    (0, vitest_1.it)('should enforce valid ritual types', () => {
        const validTypes = ['short', 'anticipatory', 'yearbook'];
        validTypes.forEach(type => {
            const duration = type === 'short' ? '1 week' : type === 'yearbook' ? '3 weeks' : 'variable';
            const result = ritual_aggregate_1.Ritual.create({
                name: 'Test Ritual',
                description: 'Test description',
                type: type,
                category: 'social',
                duration: duration,
                startDate: new Date(),
                goals: [createValidGoal()],
                requirements: [createValidRequirement()],
                rewards: [createValidReward()],
                campusId: createValidCampusId(),
                targetAudience: 'all',
                createdBy: createValidProfileId(),
                status: 'draft',
                visibility: 'public'
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.it)('should enforce valid categories', () => {
        const validCategories = ['social', 'academic', 'wellness', 'community'];
        validCategories.forEach(category => {
            const result = ritual_aggregate_1.Ritual.create({
                name: 'Test Ritual',
                description: 'Test description',
                type: 'short',
                category: category,
                duration: '1 week',
                startDate: new Date(),
                goals: [createValidGoal()],
                requirements: [createValidRequirement()],
                rewards: [createValidReward()],
                campusId: createValidCampusId(),
                targetAudience: 'all',
                createdBy: createValidProfileId(),
                status: 'draft',
                visibility: 'public'
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=ritual.aggregate.test.js.map