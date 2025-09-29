/**
 * EnhancedRitual Aggregate
 * Represents a campus-wide ritual or campaign with gamification
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { RitualId } from '../value-objects/ritual-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';

export interface Milestone {
  id: string;
  name: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  rewards: Reward[];
  isCompleted: boolean;
  threshold: number;
  isReached: boolean;
  reachedAt?: Date;
}

export interface Reward {
  type: 'badge' | 'points' | 'unlock' | 'achievement';
  value: string | number;
  description: string;
}

interface RitualSettings {
  isVisible: boolean;
  maxParticipants?: number;
  allowLateJoin: boolean;
  requiresApproval: boolean;
  autoStart: boolean;
  autoEnd: boolean;
}

interface EnhancedRitualProps {
  ritualId: RitualId;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'one-time';
  campusId: CampusId;
  createdBy: ProfileId;
  milestones: Milestone[];
  participants: ProfileId[];
  settings: RitualSettings;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  completedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class EnhancedRitual extends AggregateRoot<EnhancedRitualProps> {
  get ritualId(): RitualId {
    return this.props.ritualId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get type(): string {
    return this.props.type;
  }

  get campusId(): CampusId {
    return this.props.campusId;
  }

  get participants(): number {
    return this.props.participants.length;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get settings(): RitualSettings {
    return this.props.settings;
  }

  get startDate(): Date | undefined {
    return this.props.startDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  get milestones(): Milestone[] {
    return this.props.milestones;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: EnhancedRitualProps, id?: string) {
    super(props, id || `ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    props: {
      ritualId: RitualId;
      name: string;
      description: string;
      type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'one-time';
      campusId: CampusId;
      createdBy: ProfileId;
      milestones?: Milestone[];
      settings?: Partial<RitualSettings>;
      startDate?: Date;
      endDate?: Date;
    },
    id?: string
  ): Result<EnhancedRitual> {
    if (!props.name || props.name.trim().length === 0) {
      return Result.fail<EnhancedRitual>('Ritual name is required');
    }

    if (!props.description || props.description.trim().length === 0) {
      return Result.fail<EnhancedRitual>('Ritual description is required');
    }

    const defaultSettings: RitualSettings = {
      isVisible: true,
      allowLateJoin: true,
      requiresApproval: false,
      autoStart: false,
      autoEnd: false,
      ...props.settings
    };

    const ritualProps: EnhancedRitualProps = {
      ritualId: props.ritualId,
      name: props.name,
      description: props.description,
      type: props.type,
      campusId: props.campusId,
      createdBy: props.createdBy,
      milestones: props.milestones || [],
      participants: [],
      settings: defaultSettings,
      startDate: props.startDate,
      endDate: props.endDate,
      isActive: true,
      completedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return Result.ok<EnhancedRitual>(new EnhancedRitual(ritualProps, id));
  }

  public addParticipant(profileId: ProfileId | string): Result<void> {
    const id = typeof profileId === 'string' ? profileId : profileId.value;

    // Check if already participating
    if (this.props.participants.some(p =>
      (typeof p === 'string' ? p : p.value) === id
    )) {
      return Result.fail<void>('User is already participating');
    }

    // Check max participants
    if (
      this.props.settings.maxParticipants &&
      this.props.participants.length >= this.props.settings.maxParticipants
    ) {
      return Result.fail<void>('Ritual has reached maximum participants');
    }

    // Check if late join is allowed
    if (!this.props.settings.allowLateJoin && this.props.startDate) {
      if (new Date() > this.props.startDate) {
        return Result.fail<void>('Late join is not allowed for this ritual');
      }
    }

    // Add the participant
    const participantId = typeof profileId === 'string'
      ? ProfileId.create(profileId).getValue()
      : profileId;

    this.props.participants.push(participantId);
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public removeParticipant(profileId: ProfileId): Result<void> {
    const index = this.props.participants.findIndex(
      p => (typeof p === 'string' ? p : p.value) === profileId.value
    );

    if (index === -1) {
      return Result.fail<void>('User is not participating');
    }

    this.props.participants.splice(index, 1);
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public updateMilestoneProgress(
    milestoneId: string,
    progress: number
  ): Result<void> {
    const milestone = this.props.milestones.find(m => m.id === milestoneId);

    if (!milestone) {
      return Result.fail<void>('Milestone not found');
    }

    milestone.currentValue = progress;

    if (progress >= milestone.targetValue && !milestone.isCompleted) {
      milestone.isCompleted = true;
      this.props.completedCount++;
    }

    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public hasStarted(): boolean {
    if (!this.props.startDate) return true;
    return new Date() >= this.props.startDate;
  }

  public hasEnded(): boolean {
    if (!this.props.endDate) return false;
    return new Date() > this.props.endDate;
  }

  public isInProgress(): boolean {
    return this.hasStarted() && !this.hasEnded() && this.props.isActive;
  }

  public getCompletionPercentage(): number {
    if (this.props.milestones.length === 0) return 0;
    const completed = this.props.milestones.filter(m => m.isCompleted).length;
    return (completed / this.props.milestones.length) * 100;
  }

  public getParticipant(profileId: string): ProfileId | undefined {
    return this.props.participants.find(p =>
      (typeof p === 'string' ? p : p.value) === profileId
    );
  }

  public getParticipants(): ProfileId[] {
    return this.props.participants;
  }

  public getTotalProgress(): number {
    if (this.props.milestones.length === 0) return 0;
    const totalProgress = this.props.milestones.reduce((sum, milestone) => {
      return sum + Math.min(milestone.currentValue / milestone.targetValue, 1);
    }, 0);
    return (totalProgress / this.props.milestones.length) * 100;
  }

  public getParticipantCount(): number {
    return this.props.participants.length;
  }

  public getTotalActivities(): number {
    return this.props.milestones.reduce((sum, milestone) => sum + milestone.currentValue, 0);
  }

  public get rewards(): Reward[] {
    return this.props.milestones.flatMap(milestone => milestone.rewards);
  }

  // Temporary setters for repository layer - should be removed once proper construction is implemented
  public setCreatedAt(date: Date): void {
    (this.props as any).createdAt = date;
  }

  public setUpdatedAt(date: Date): void {
    (this.props as any).updatedAt = date;
  }

  public setMilestones(milestones: Milestone[]): void {
    (this.props as any).milestones = milestones;
  }

  public toData(): any {
    return {
      id: this.id,
      ritualId: this.props.ritualId,
      name: this.props.name,
      description: this.props.description,
      type: this.props.type,
      campusId: this.props.campusId,
      createdBy: this.props.createdBy,
      milestones: this.props.milestones,
      participants: this.props.participants.length,
      settings: this.props.settings,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      isActive: this.props.isActive,
      completedCount: this.props.completedCount,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    };
  }
}