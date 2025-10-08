/**
 * Ritual Aggregate Tests
 * Comprehensive test coverage for Ritual business logic
 */

import { describe, it, expect } from 'vitest';
import { Ritual, RitualType, RitualCategory, RitualStatus, GoalType, RitualGoal, RitualRequirement, RitualReward } from '../aggregates/ritual.aggregate';
import { RitualId } from '../value-objects/ritual-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';

/**
 * Test Data Factories
 */

const createValidRitualId = (): RitualId => {
  const result = RitualId.generate(); // Use generate() for auto-generated IDs
  if (result.isFailure) throw new Error('Failed to create RitualId');
  return result.getValue();
};

const createValidCampusId = (value = 'ub-buffalo'): CampusId => {
  const result = CampusId.create(value);
  if (result.isFailure) throw new Error(`Failed to create CampusId: ${result.error}`);
  return result.getValue();
};

const createValidProfileId = (value = 'profile_123'): ProfileId => {
  const result = ProfileId.create(value);
  if (result.isFailure) throw new Error(`Failed to create ProfileId: ${result.error}`);
  return result.getValue();
};

const createValidGoal = (overrides?: Partial<RitualGoal>): RitualGoal => {
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

const createValidRequirement = (overrides?: Partial<RitualRequirement>): RitualRequirement => {
  return {
    action: 'Join Space',
    target: 5,
    validation: 'automatic',
    ...overrides
  };
};

const createValidReward = (overrides?: Partial<RitualReward>): RitualReward => {
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

describe('Ritual.create()', () => {
  it('should create a valid short ritual', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    expect(ritual.name).toBe('Freshman Welcome');
    expect(ritual.type).toBe('short');
    expect(ritual.duration).toBe('1 week');
    expect(ritual.status).toBe('draft');
  });

  it('should create a valid yearbook ritual', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    expect(ritual.type).toBe('yearbook');
    expect(ritual.duration).toBe('3 weeks');
  });

  it('should create a valid anticipatory ritual', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    expect(ritual.type).toBe('anticipatory');
    expect(ritual.duration).toBe('variable');
  });

  it('should fail when name is empty', () => {
    const result = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('name is required');
  });

  it('should fail when description is empty', () => {
    const result = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('description is required');
  });

  it('should fail when short ritual is not 1 week duration', () => {
    const result = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Short rituals must be 1 week');
  });

  it('should fail when yearbook ritual is not 3 weeks duration', () => {
    const result = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Yearbook rituals must be 3 weeks');
  });

  it('should initialize with empty participants', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    expect(ritual.getParticipantCount()).toBe(0);
  });

  it('should initialize participation stats to zero', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    expect(ritual.participationStats.total).toBe(0);
    expect(ritual.participationStats.active).toBe(0);
    expect(ritual.participationStats.completed).toBe(0);
  });

  it('should emit RitualCreatedEvent', () => {
    const result = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    const ritual = result.getValue();
    const events = ritual.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].getEventName()).toBe('RitualCreated');
  });
});

describe('Ritual.announce()', () => {
  it('should announce a draft ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('announced');
  });

  it('should fail when announcing non-draft ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only draft rituals can be announced');
  });
});

describe('Ritual.activate()', () => {
  it('should activate an announced ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('active');
  });

  it('should activate a paused ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('active');
  });

  it('should emit RitualActivatedEvent', () => {
    const ritual = Ritual.create({
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
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('RitualActivated');
  });

  it('should fail when activating draft ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only announced or paused rituals can be activated');
  });
});

describe('Ritual.enterFinalPush()', () => {
  it('should enter final push from active status', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('final_push');
  });

  it('should fail when entering final push from non-active status', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only active rituals can enter final push');
  });
});

describe('Ritual.complete()', () => {
  it('should complete an active ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('completed');
  });

  it('should complete a final_push ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('completed');
  });

  it('should fail when completing draft ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only active or final push rituals can be completed');
  });
});

describe('Ritual.pause()', () => {
  it('should pause an active ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.status).toBe('paused');
  });

  it('should emit RitualDeactivatedEvent', () => {
    const ritual = Ritual.create({
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
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('RitualDeactivated');
  });

  it('should fail when pausing non-active ritual', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only active rituals can be paused');
  });
});

describe('Ritual.addParticipant()', () => {
  it('should add a new participant', () => {
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.getParticipantCount()).toBe(1);
    expect(ritual.participationStats.total).toBe(1);
    expect(ritual.participationStats.active).toBe(1);
  });

  it('should prevent adding duplicate participants', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('already participating');
  });

  it('should block participants before ritual is announced', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('not currently accepting');
    expect(ritual.getParticipantCount()).toBe(0);
    expect(ritual.participationStats.total).toBe(0);
    expect(ritual.participationStats.active).toBe(0);
  });

  it('should enforce maximum participant limit', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('maximum participants');
  });

  it('should prevent joining hidden rituals', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Cannot join hidden rituals');
  });

  it('should emit ParticipantJoinedEvent', () => {
    const ritual = Ritual.create({
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
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ParticipantJoined');
  });
});

describe('Ritual.removeParticipant()', () => {
  it('should remove an existing participant', () => {
    const ritual = Ritual.create({
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

    expect(ritual.getParticipantCount()).toBe(1);

    const result = ritual.removeParticipant(participantId);

    expect(result.isSuccess).toBe(true);
    expect(ritual.getParticipantCount()).toBe(0);
  });

  it('should fail when removing non-participant', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('not participating');
  });

  it('should emit ParticipantLeftEvent', () => {
    const ritual = Ritual.create({
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
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ParticipantLeft');
  });
});

describe('Ritual.updateGoalProgress()', () => {
  it('should update goal progress', () => {
    const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
    const ritual = Ritual.create({
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

    expect(result.isSuccess).toBe(true);
    expect(ritual.goals[0].currentValue).toBe(5);
  });

  it('should mark goal as completed when target reached', () => {
    const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
    const ritual = Ritual.create({
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

    expect(ritual.goals[0].isCompleted).toBe(true);
    expect(ritual.goals[0].completedAt).toBeDefined();
  });

  it('should emit MilestoneCompletedEvent when goal completed', () => {
    const goal = createValidGoal({ id: 'goal_1', targetValue: 10, currentValue: 0 });
    const ritual = Ritual.create({
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
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('MilestoneCompleted');
  });

  it('should fail when goal not found', () => {
    const ritual = Ritual.create({
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

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Goal not found');
  });
});

describe('Ritual.getCompletionPercentage()', () => {
  it('should return 0 when no goals exist', () => {
    const ritual = Ritual.create({
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

    expect(ritual.getCompletionPercentage()).toBe(0);
  });

  it('should calculate completion percentage correctly', () => {
    const goal1 = createValidGoal({ id: 'g1', isCompleted: true });
    const goal2 = createValidGoal({ id: 'g2', isCompleted: false });
    const goal3 = createValidGoal({ id: 'g3', isCompleted: true });

    const ritual = Ritual.create({
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

    expect(ritual.getCompletionPercentage()).toBe(67); // 2 of 3 = 66.67 rounded to 67
  });
});

describe('Ritual.getTotalProgress()', () => {
  it('should return 0 when no goals exist', () => {
    const ritual = Ritual.create({
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

    expect(ritual.getTotalProgress()).toBe(0);
  });

  it('should calculate total progress across all goals', () => {
    const goal1 = createValidGoal({ id: 'g1', targetValue: 10, currentValue: 5 }); // 50%
    const goal2 = createValidGoal({ id: 'g2', targetValue: 20, currentValue: 10 }); // 50%
    const goal3 = createValidGoal({ id: 'g3', targetValue: 100, currentValue: 100 }); // 100%

    const ritual = Ritual.create({
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

    expect(ritual.getTotalProgress()).toBe(67); // (50 + 50 + 100) / 3 = 66.67 rounded to 67
  });
});

describe('Ritual.isActive()', () => {
  it('should return true for active status', () => {
    const ritual = Ritual.create({
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

    expect(ritual.isActive()).toBe(true);
  });

  it('should return true for final_push status', () => {
    const ritual = Ritual.create({
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

    expect(ritual.isActive()).toBe(true);
  });

  it('should return false for non-active status', () => {
    const ritual = Ritual.create({
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

    expect(ritual.isActive()).toBe(false);
  });
});

describe('Ritual.hasStarted()', () => {
  it('should return true when start date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const ritual = Ritual.create({
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

    expect(ritual.hasStarted()).toBe(true);
  });

  it('should return false when start date is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const ritual = Ritual.create({
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

    expect(ritual.hasStarted()).toBe(false);
  });
});

describe('Ritual.hasEnded()', () => {
  it('should return true when end date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const ritual = Ritual.create({
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

    expect(ritual.hasEnded()).toBe(true);
  });

  it('should return false when end date is undefined', () => {
    const ritual = Ritual.create({
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

    expect(ritual.hasEnded()).toBe(false);
  });
});

describe('Ritual.getParticipationWarnings()', () => {
  it('should warn when less than 7 days remaining', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const ritual = Ritual.create({
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

    expect(warnings.some(w => w.includes('days'))).toBe(true);
  });

  it('should warn when less than 10 spots remaining', () => {
    const ritual = Ritual.create({
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

    expect(warnings.some(w => w.includes('spots remaining'))).toBe(true);
  });
});

describe('Ritual.getSpotsRemaining()', () => {
  it('should return null when no target participation set', () => {
    const ritual = Ritual.create({
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

    expect(ritual.getSpotsRemaining()).toBeNull();
  });

  it('should calculate spots remaining correctly', () => {
    const ritual = Ritual.create({
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

    expect(ritual.getSpotsRemaining()).toBe(18);
  });
});

describe('Ritual Business Invariants', () => {
  it('should maintain campus isolation', () => {
    const campusId = createValidCampusId('ub-buffalo');
    const ritual = Ritual.create({
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

    expect(ritual.campusId.value).toBe('ub-buffalo');
  });

  it('should enforce valid ritual types', () => {
    const validTypes: RitualType[] = ['short', 'anticipatory', 'yearbook'];

    validTypes.forEach(type => {
      const duration = type === 'short' ? '1 week' : type === 'yearbook' ? '3 weeks' : 'variable';
      const result = Ritual.create({
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

      expect(result.isSuccess).toBe(true);
    });
  });

  it('should enforce valid categories', () => {
    const validCategories: RitualCategory[] = ['social', 'academic', 'wellness', 'community'];

    validCategories.forEach(category => {
      const result = Ritual.create({
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

      expect(result.isSuccess).toBe(true);
    });
  });
});
