/**
 * Ritual Aggregate
 * Campus-wide behavioral campaigns based on SPEC.md Complete Ritual Specifications
 *
 * Three Types:
 * - Short (1 week): Feature introduction or themed celebration
 * - Anticipatory (variable): Build excitement for feature reveals
 * - Yearbook (3 weeks): Tournament-style competitions
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { RitualId } from '../value-objects/ritual-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { RitualCreatedEvent } from '../events/ritual-created.event';
import { ParticipantJoinedEvent } from '../events/participant-joined.event';
import { ParticipantLeftEvent } from '../events/participant-left.event';
import { MilestoneCompletedEvent } from '../events/milestone-completed.event';
import { RitualActivatedEvent } from '../events/ritual-activated.event';
import { RitualDeactivatedEvent } from '../events/ritual-deactivated.event';

// Ritual Types from SPEC.md
export type RitualType = 'short' | 'anticipatory' | 'yearbook';

// Ritual Categories
export type RitualCategory = 'social' | 'academic' | 'wellness' | 'community';

// Ritual Lifecycle Status
export type RitualStatus = 'draft' | 'announced' | 'active' | 'final_push' | 'completed' | 'paused';

// Goal Types (from conceptual model)
export type GoalType = 'individual' | 'space' | 'campus' | 'stretch';

/**
 * Ritual Goal - Progress markers for collective achievement
 */
export interface RitualGoal {
  id: string;
  description: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: Date;
}

/**
 * Ritual Requirement - Specific actions users must complete
 */
export interface RitualRequirement {
  action: string;              // "Join Space", "Make Post", "Add Connection"
  target: number;              // How many times
  validation: 'manual' | 'automatic' | 'peer';
}

/**
 * Ritual Reward - What participants earn
 */
export interface RitualReward {
  id: string;
  type: 'badge' | 'feature_unlock' | 'special_access' | 'recognition' | 'points';
  name: string;
  description: string;
  value?: string | number;     // Points value or feature ID
  requirements?: string;        // What's needed to claim
}

/**
 * Participation Analytics
 */
export interface ParticipationStats {
  total: number;               // Total participants
  active: number;              // Currently active
  completed: number;           // Finished successfully
  averageProgress: number;     // 0-100%
}

export interface RitualProps {
  ritualId: RitualId;
  name: string;
  description: string;
  icon?: string;

  // Ritual Classification
  type: RitualType;            // short, anticipatory, yearbook
  category: RitualCategory;     // social, academic, wellness, community

  // Duration
  duration: string;            // "1 week", "2 weeks", "3 weeks", "variable"
  startDate: Date;
  endDate?: Date;              // null for ongoing

  // Goals and Mechanics
  goals: RitualGoal[];
  requirements: RitualRequirement[];
  rewards: RitualReward[];

  // Participation
  participants: ProfileId[];
  targetParticipation?: number; // Expected number of participants
  participationStats: ParticipationStats;

  // Campus
  campusId: CampusId;
  targetAudience: 'all' | 'students' | 'leaders' | 'new_users';
  createdBy: ProfileId;

  // Status
  status: RitualStatus;
  visibility: 'public' | 'targeted' | 'hidden';

  // Lifecycle Timestamps
  announcedAt?: Date;
  activatedAt?: Date;
  launchedAt?: Date;
  completedAt?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Ritual Aggregate
 * Manages campus-wide behavioral campaigns
 */
export class Ritual extends AggregateRoot<RitualProps> {

  private constructor(props: RitualProps, id?: string) {
    super(props, id);
  }

  // Getters
  get ritualId(): RitualId {
    return this.props.ritualId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get type(): RitualType {
    return this.props.type;
  }

  get category(): RitualCategory {
    return this.props.category;
  }

  get status(): RitualStatus {
    return this.props.status;
  }

  get duration(): string {
    return this.props.duration;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  get goals(): RitualGoal[] {
    return this.props.goals;
  }

  get requirements(): RitualRequirement[] {
    return this.props.requirements;
  }

  get rewards(): RitualReward[] {
    return this.props.rewards;
  }

  get campusId(): CampusId {
    return this.props.campusId;
  }

  get targetAudience(): string {
    return this.props.targetAudience;
  }

  get visibility(): string {
    return this.props.visibility;
  }

  get participationStats(): ParticipationStats {
    return this.props.participationStats;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get announcedAt(): Date | undefined {
    return this.props.announcedAt;
  }

  get activatedAt(): Date | undefined {
    return this.props.activatedAt;
  }

  get launchedAt(): Date | undefined {
    return this.props.launchedAt;
  }

  get completedAt(): Date | undefined {
    return this.props.completedAt;
  }

  // Factory Method
  public static create(
    props: Omit<RitualProps, 'ritualId' | 'createdAt' | 'updatedAt' | 'participants' | 'participationStats'> & {
      ritualId?: RitualId;
    },
    id?: string
  ): Result<Ritual> {
    // Validation
    if (!props.name || props.name.trim().length === 0) {
      return Result.fail<Ritual>('Ritual name is required');
    }

    if (!props.description || props.description.trim().length === 0) {
      return Result.fail<Ritual>('Ritual description is required');
    }

    // Validate ritual type
    const validTypes: RitualType[] = ['short', 'anticipatory', 'yearbook'];
    if (!validTypes.includes(props.type)) {
      return Result.fail<Ritual>('Invalid ritual type');
    }

    // Validate duration based on type
    if (props.type === 'short' && props.duration !== '1 week') {
      return Result.fail<Ritual>('Short rituals must be 1 week duration');
    }

    if (props.type === 'yearbook' && props.duration !== '3 weeks') {
      return Result.fail<Ritual>('Yearbook rituals must be 3 weeks duration');
    }

    // Create ritual ID if not provided
    const ritualId = props.ritualId || RitualId.generate().getValue();

    const ritualProps: RitualProps = {
      ...props,
      ritualId,
      participants: [],
      participationStats: {
        total: 0,
        active: 0,
        completed: 0,
        averageProgress: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const ritual = new Ritual(ritualProps, id);

    // Fire domain event
    ritual.addDomainEvent(
      new RitualCreatedEvent(ritual.id, props.name, props.type, props.createdBy.value)
    );

    return Result.ok<Ritual>(ritual);
  }

  /**
   * Announce Ritual (48hr preview phase)
   */
  public announce(): Result<void> {
    if (this.props.status !== 'draft') {
      return Result.fail<void>('Only draft rituals can be announced');
    }

    this.props.status = 'announced';
    this.props.announcedAt = new Date();
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Activate Ritual (start active phase)
   */
  public activate(): Result<void> {
    if (this.props.status !== 'announced' && this.props.status !== 'paused') {
      return Result.fail<void>('Only announced or paused rituals can be activated');
    }

    this.props.status = 'active';
    this.props.activatedAt = new Date();
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(new RitualActivatedEvent(this.id));

    return Result.ok<void>();
  }

  /**
   * Enter Final Push Phase (last 24 hours)
   */
  public enterFinalPush(): Result<void> {
    if (this.props.status !== 'active') {
      return Result.fail<void>('Only active rituals can enter final push');
    }

    this.props.status = 'final_push';
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Complete Ritual
   */
  public complete(): Result<void> {
    if (this.props.status !== 'active' && this.props.status !== 'final_push') {
      return Result.fail<void>('Only active or final push rituals can be completed');
    }

    this.props.status = 'completed';
    this.props.completedAt = new Date();
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Pause Ritual
   */
  public pause(): Result<void> {
    if (this.props.status !== 'active') {
      return Result.fail<void>('Only active rituals can be paused');
    }

    this.props.status = 'paused';
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(new RitualDeactivatedEvent(this.id));

    return Result.ok<void>();
  }

  /**
   * Add Participant
   */
  public addParticipant(profileId: ProfileId | string): Result<void> {
    const id = typeof profileId === 'string' ? profileId : profileId.value;
    const participantId = typeof profileId === 'string'
      ? ProfileId.create(profileId).getValue()
      : profileId;

    // Business Rule: No duplicate participants
    if (this.props.participants.some(p => p.value === id)) {
      return Result.fail<void>('User is already participating in this ritual');
    }

    // Business Rule: Check target participation capacity
    if (this.props.targetParticipation &&
        this.props.participants.length >= this.props.targetParticipation) {
      return Result.fail<void>('Ritual has reached maximum participants');
    }

    // Business Rule: Check visibility and audience
    if (this.props.visibility === 'hidden') {
      return Result.fail<void>('Cannot join hidden rituals');
    }

    // Add participant
    this.props.participants.push(participantId);
    this.props.participationStats.total++;
    this.props.participationStats.active++;
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ParticipantJoinedEvent(this.id, id, this.props.participants.length)
    );

    return Result.ok<void>();
  }

  /**
   * Remove Participant
   */
  public removeParticipant(profileId: ProfileId | string): Result<void> {
    const id = typeof profileId === 'string' ? profileId : profileId.value;

    const index = this.props.participants.findIndex(p => p.value === id);
    if (index === -1) {
      return Result.fail<void>('User is not participating in this ritual');
    }

    this.props.participants.splice(index, 1);
    this.props.participationStats.active = Math.max(0, this.props.participationStats.active - 1);
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ParticipantLeftEvent(this.id, id, this.props.participants.length)
    );

    return Result.ok<void>();
  }

  /**
   * Update Goal Progress
   */
  public updateGoalProgress(goalId: string, progress: number): Result<void> {
    const goal = this.props.goals.find(g => g.id === goalId);
    if (!goal) {
      return Result.fail<void>('Goal not found');
    }

    goal.currentValue = progress;

    // Check if goal is completed
    if (progress >= goal.targetValue && !goal.isCompleted) {
      goal.isCompleted = true;
      goal.completedAt = new Date();

      // Fire domain event
      this.addDomainEvent(
        new MilestoneCompletedEvent(
          this.id,
          goal.id,
          goal.description,
          [] // Rewards are separate from goals
        )
      );
    }

    this.props.updatedAt = new Date();
    this.updateParticipationStats();

    return Result.ok<void>();
  }

  /**
   * Calculate completion percentage
   */
  public getCompletionPercentage(): number {
    if (this.props.goals.length === 0) return 0;

    const completed = this.props.goals.filter(g => g.isCompleted).length;
    return Math.round((completed / this.props.goals.length) * 100);
  }

  /**
   * Calculate total progress across all goals
   */
  public getTotalProgress(): number {
    if (this.props.goals.length === 0) return 0;

    const totalProgress = this.props.goals.reduce((sum, goal) => {
      return sum + Math.min(goal.currentValue / goal.targetValue, 1);
    }, 0);

    return Math.round((totalProgress / this.props.goals.length) * 100);
  }

  /**
   * Get participant count
   */
  public getParticipantCount(): number {
    return this.props.participants.length;
  }

  /**
   * Get all participants
   */
  public getParticipants(): ProfileId[] {
    return this.props.participants;
  }

  /**
   * Check if ritual is active
   */
  public isActive(): boolean {
    return this.props.status === 'active' || this.props.status === 'final_push';
  }

  /**
   * Check if ritual has started
   */
  public hasStarted(): boolean {
    return new Date() >= this.props.startDate;
  }

  /**
   * Check if ritual has ended
   */
  public hasEnded(): boolean {
    if (!this.props.endDate) return false;
    return new Date() > this.props.endDate;
  }

  /**
   * Check if in final push period (last 24 hours)
   */
  public isInFinalPush(): boolean {
    if (!this.props.endDate) return false;

    const now = new Date();
    const hoursRemaining = (this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursRemaining <= 24 && hoursRemaining > 0;
  }

  /**
   * Update participation statistics
   */
  private updateParticipationStats(): void {
    const totalGoals = this.props.goals.length;
    if (totalGoals === 0) {
      this.props.participationStats.averageProgress = 0;
      return;
    }

    // Calculate average progress across all goals
    const avgProgress = this.props.goals.reduce((sum, goal) => {
      const goalProgress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
      return sum + goalProgress;
    }, 0) / totalGoals;

    this.props.participationStats.averageProgress = Math.round(avgProgress);
  }

  /**
   * Mark participant as completed
   */
  public markParticipantCompleted(): Result<void> {
    this.props.participationStats.completed++;
    this.props.participationStats.active = Math.max(
      0,
      this.props.participationStats.active - 1
    );
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Participation Business Logic (Moved from RitualParticipationService)
   */

  public getParticipationWarnings(now: Date = new Date()): string[] {
    const warnings: string[] = [];

    // Days until end warning
    if (this.props.endDate) {
      const daysUntilEnd = Math.ceil(
        (this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilEnd <= 7 && daysUntilEnd > 0) {
        warnings.push(`This ritual ends in ${daysUntilEnd} days`);
      }
    }

    // Spots remaining warning
    if (this.props.targetParticipation) {
      const spotsLeft = this.props.targetParticipation - this.props.participants.length;
      if (spotsLeft <= 10 && spotsLeft > 0) {
        warnings.push(`Only ${spotsLeft} spots remaining`);
      }
    }

    // Late join warning (if ritual has started and doesn't allow late join)
    // Note: This would need a settings field in the future
    // if (!this.props.settings.allowLateJoin && now > this.props.startDate) {
    //   warnings.push('This ritual has already started and doesn\'t allow late joins');
    // }

    return warnings;
  }

  public calculateGoalPoints(goalId: string): number {
    const goal = this.props.goals.find(g => g.id === goalId);
    if (!goal) return 0;

    // Base points based on target value
    let points = goal.targetValue * 10;

    // Find associated rewards for this goal
    const goalRewards = this.props.rewards.filter(r =>
      r.requirements && r.requirements.includes(goalId)
    );

    // Add bonus for point-type rewards
    goalRewards.forEach(reward => {
      if (reward.type === 'points' && typeof reward.value === 'number') {
        points += reward.value;
      }
    });

    return points;
  }

  public getDaysUntilEnd(now: Date = new Date()): number {
    if (!this.props.endDate) return Infinity;
    return Math.ceil(
      (this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  public getSpotsRemaining(): number | null {
    if (!this.props.targetParticipation) return null;
    return Math.max(0, this.props.targetParticipation - this.props.participants.length);
  }

  // Setters for repository mapping
  public setCreatedAt(date: Date): void {
    this.props.createdAt = date;
  }

  public setUpdatedAt(date: Date): void {
    this.props.updatedAt = date;
  }

  public setGoals(goals: RitualGoal[]): void {
    this.props.goals = goals;
  }

  public setRequirements(requirements: RitualRequirement[]): void {
    this.props.requirements = requirements;
  }

  public setRewards(rewards: RitualReward[]): void {
    this.props.rewards = rewards;
  }

  public toData(): any {
    return {
      id: this.id,
      ritualId: this.props.ritualId,
      name: this.props.name,
      description: this.props.description,
      type: this.props.type,
      category: this.props.category,
      duration: this.props.duration,
      campusId: this.props.campusId,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      createdBy: this.props.createdBy,
      targetAudience: this.props.targetAudience,
      visibility: this.props.visibility,
      status: this.props.status,
      goals: this.props.goals,
      requirements: this.props.requirements,
      rewards: this.props.rewards,
      participants: this.props.participants || [],
      participationStats: this.props.participationStats,
      targetParticipation: this.props.targetParticipation,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    };
  }
}
