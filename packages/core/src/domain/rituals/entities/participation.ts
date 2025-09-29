/**
 * Participation Entity
 * Represents a user's participation in a ritual
 */

import { Entity } from '../../shared/base/Entity.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { RitualId } from '../value-objects/ritual-id.value';

interface ParticipationProps {
  profileId: ProfileId;
  ritualId: RitualId;
  joinedAt: Date;
  lastParticipatedAt?: Date;
  completionCount: number;
  streakCount: number;
  totalPoints: number;
  achievements: string[];
  isActive: boolean;
  metadata?: Record<string, any>;
}

export class Participation extends Entity<ParticipationProps> {
  get profileId(): ProfileId {
    return this.props.profileId;
  }

  get ritualId(): RitualId {
    return this.props.ritualId;
  }

  get joinedAt(): Date {
    return this.props.joinedAt;
  }

  get lastParticipatedAt(): Date | undefined {
    return this.props.lastParticipatedAt;
  }

  get completionCount(): number {
    return this.props.completionCount;
  }

  get streakCount(): number {
    return this.props.streakCount;
  }

  get totalPoints(): number {
    return this.props.totalPoints;
  }

  get achievements(): string[] {
    return this.props.achievements;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get metadata(): Record<string, any> | undefined {
    return this.props.metadata;
  }

  private constructor(props: ParticipationProps, id?: string) {
    super(props, id || `participation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    props: {
      profileId: ProfileId;
      ritualId: RitualId;
      joinedAt?: Date;
      completionCount?: number;
      streakCount?: number;
      totalPoints?: number;
      achievements?: string[];
      isActive?: boolean;
      metadata?: Record<string, any>;
    },
    id?: string
  ): Result<Participation> {
    const participationProps: ParticipationProps = {
      profileId: props.profileId,
      ritualId: props.ritualId,
      joinedAt: props.joinedAt || new Date(),
      completionCount: props.completionCount || 0,
      streakCount: props.streakCount || 0,
      totalPoints: props.totalPoints || 0,
      achievements: props.achievements || [],
      isActive: props.isActive !== undefined ? props.isActive : true,
      metadata: props.metadata
    };

    const participation = new Participation(participationProps, id);
    return Result.ok<Participation>(participation);
  }

  public participate(): Result<void> {
    if (!this.props.isActive) {
      return Result.fail<void>('Cannot participate in inactive participation');
    }

    this.props.completionCount++;
    this.props.lastParticipatedAt = new Date();

    // Update streak logic would go here
    this.props.streakCount++;

    // Award points
    this.props.totalPoints += 10; // Base points per participation

    return Result.ok<void>();
  }

  public addAchievement(achievement: string): void {
    if (!this.props.achievements.includes(achievement)) {
      this.props.achievements.push(achievement);
    }
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  public reactivate(): void {
    this.props.isActive = true;
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this.props.metadata = { ...this.props.metadata, ...metadata };
  }

  public updateMilestoneProgress(milestoneId: string, progress: number): void {
    if (!this.props.metadata) {
      this.props.metadata = {};
    }
    if (!this.props.metadata.milestones) {
      this.props.metadata.milestones = {};
    }
    this.props.metadata.milestones[milestoneId] = progress;
  }

  public completeMilestone(milestoneId: string): void {
    this.updateMilestoneProgress(milestoneId, 100);
    this.addAchievement(`milestone_${milestoneId}`);
    this.addPoints(50); // Bonus points for milestone completion
  }

  public addPoints(points: number): void {
    this.props.totalPoints += points;
  }

  public updateStreak(streakCount: number): void {
    this.props.streakCount = streakCount;
  }

  public toData(): any {
    return {
      id: this.id,
      profileId: this.props.profileId.value,
      ritualId: this.props.ritualId.value,
      joinedAt: this.props.joinedAt,
      lastParticipatedAt: this.props.lastParticipatedAt,
      completionCount: this.props.completionCount,
      streakCount: this.props.streakCount,
      totalPoints: this.props.totalPoints,
      achievements: this.props.achievements,
      isActive: this.props.isActive,
      metadata: this.props.metadata
    };
  }
}