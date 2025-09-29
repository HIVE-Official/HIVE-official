/**
 * EnhancedRitual Participation Service
 * Orchestrates ritual participation, progress tracking, and rewards
 */

import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { EnhancedRitual } from '../domain/rituals/aggregates/enhanced-ritual';
import { RitualId } from '../domain/rituals/value-objects/ritual-id.value';
import { Participation } from '../domain/rituals/entities/participation';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../domain/profile/value-objects/campus-id.value';

// Temporary interface until Milestone entity is properly implemented
interface Milestone {
  id: string;
  title: string;
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: Date;
  participantCompletions: any[];
  rewards: {
    type: 'points' | 'badge' | 'achievement';
    value: string;
    description: string;
  }[];
}
import {
  IRitualRepository,
  IProfileRepository,
  IFeedRepository
} from '../infrastructure/repositories/interfaces';

export interface EnhancedRitualCreationData {
  name: string;
  description: string;
  ritualType: 'daily-challenge' | 'weekly-goal' | 'study-challenge' | 'social-mission' | 'campus-event';
  startDate: Date;
  endDate: Date;
  milestones: Array<{
    name: string;
    description: string;
    targetValue: number;
    rewards: Array<{
      type: 'points' | 'badge' | 'achievement';
      value: string;
      description: string;
    }>;
  }>;
  settings?: {
    maxParticipants?: number;
    requireApproval?: boolean;
    allowLateJoin?: boolean;
    isVisible?: boolean;
  };
}

export interface EnhancedRitualProgress {
  ritual: EnhancedRitual;
  participation: Participation;
  completionPercentage: number;
  currentStreak: number;
  rank: number;
  nextMilestone?: Milestone;
  recentAchievements: Array<{
    name: string;
    earnedAt: Date;
    points: number;
  }>;
}

export interface LeaderboardEntry {
  profileId: string;
  displayName: string;
  totalPoints: number;
  rank: number;
  completedMilestones: number;
  streak: number;
}

export class EnhancedRitualParticipationService extends BaseApplicationService {
  private ritualRepo: IRitualRepository;
  private profileRepo: IProfileRepository;
  private feedRepo: IFeedRepository;

  constructor(
    context?: Partial<ApplicationServiceContext>,
    ritualRepo?: IRitualRepository,
    profileRepo?: IProfileRepository,
    feedRepo?: IFeedRepository
  ) {
    super(context);
    // Mock repositories for now - would be injected in production
    this.ritualRepo = ritualRepo || {} as IRitualRepository;
    this.profileRepo = profileRepo || {} as IProfileRepository;
    this.feedRepo = feedRepo || {} as IFeedRepository;
  }

  /**
   * Create a new ritual campaign
   */
  async createEnhancedRitual(
    creatorId: string,
    data: EnhancedRitualCreationData
  ): Promise<Result<EnhancedRitual>> {
    return this.execute(async () => {
      // Validate creator
      const creatorProfileId = ProfileId.create(creatorId).getValue();
      const creatorResult = await this.profileRepo.findById(creatorProfileId);

      if (creatorResult.isFailure) {
        return Result.fail<EnhancedRitual>('Creator profile not found');
      }

      // Generate ritual ID
      const ritualId = RitualId.create(
        `ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      ).getValue();

      // Create ritual
      const ritualResult = EnhancedRitual.create({
        ritualId: ritualId,
        name: data.name,
        description: data.description,
        type: this.mapRitualType(data.ritualType),
        campusId: CampusId.createUBBuffalo().getValue(),
        startDate: data.startDate,
        endDate: data.endDate,
        createdBy: creatorProfileId,
        milestones: data.milestones.map((m, index) => ({
          id: `milestone_${index}`,
          title: m.name,
          name: m.name,
          description: m.description,
          targetValue: m.targetValue,
          currentValue: 0,
          isCompleted: false,
          completedAt: undefined,
          participantCompletions: [],
          rewards: m.rewards,
          threshold: m.targetValue,
          isReached: false,
          reachedAt: undefined
        })),
        settings: {
          maxParticipants: data.settings?.maxParticipants || undefined,
          requiresApproval: data.settings?.requireApproval || false,
          allowLateJoin: data.settings?.allowLateJoin || true,
          isVisible: data.settings?.isVisible || true
        }
      });

      if (ritualResult.isFailure) {
        return Result.fail<EnhancedRitual>(ritualResult.error!);
      }

      const ritual = ritualResult.getValue();

      // Save ritual
      const saveResult = await this.ritualRepo.save(ritual);
      if (saveResult.isFailure) {
        return Result.fail<EnhancedRitual>(saveResult.error!);
      }

      // Creator automatically participates
      await this.joinEnhancedRitual(creatorId, ritual.ritualId.value);

      return Result.ok<EnhancedRitual>(ritual);
    }, 'EnhancedRitualParticipation.createEnhancedRitual');
  }

  /**
   * Join a ritual
   */
  async joinEnhancedRitual(
    userId: string,
    ritualId: string
  ): Promise<Result<ServiceResult<Participation>>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();
      const ritualIdVO = RitualId.create(ritualId).getValue();

      // Get ritual
      const ritualResult = await this.ritualRepo.findById(ritualIdVO);
      if (ritualResult.isFailure) {
        return Result.fail<ServiceResult<Participation>>('EnhancedRitual not found');
      }

      const ritual = ritualResult.getValue();

      // Check if already participating
      const existingParticipation = await this.ritualRepo.findParticipation(
        ritualIdVO,
        userProfileId
      );

      if (existingParticipation.isSuccess) {
        return Result.fail<ServiceResult<Participation>>('Already participating in this ritual');
      }

      // Check ritual constraints
      const joinResult = ritual.addParticipant(userProfileId);
      if (joinResult.isFailure) {
        return Result.fail<ServiceResult<Participation>>(joinResult.error!);
      }

      // Create participation
      const participationResult = Participation.create({
        ritualId: ritualIdVO,
        profileId: userProfileId
      });

      if (participationResult.isFailure) {
        return Result.fail<ServiceResult<Participation>>(participationResult.error!);
      }

      const participation = participationResult.getValue();

      // Save participation
      await this.ritualRepo.saveParticipation(participation);

      // Update ritual with new participant
      await this.ritualRepo.save(ritual);

      const result: ServiceResult<Participation> = {
        data: participation,
        warnings: this.generateParticipationWarnings(ritual)
      };

      return Result.ok<ServiceResult<Participation>>(result);
    }, 'EnhancedRitualParticipation.joinEnhancedRitual');
  }

  /**
   * Record progress on a ritual milestone
   */
  async recordProgress(
    userId: string,
    ritualId: string,
    milestoneId: string,
    progress: number
  ): Promise<Result<EnhancedRitualProgress>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();
      const ritualIdVO = RitualId.create(ritualId).getValue();

      // Get participation
      const participationResult = await this.ritualRepo.findParticipation(
        ritualIdVO,
        userProfileId
      );

      if (participationResult.isFailure) {
        return Result.fail<EnhancedRitualProgress>('Not participating in this ritual');
      }

      const participation = participationResult.getValue();

      // Get ritual
      const ritualResult = await this.ritualRepo.findById(ritualIdVO);
      if (ritualResult.isFailure) {
        return Result.fail<EnhancedRitualProgress>('EnhancedRitual not found');
      }

      const ritual = ritualResult.getValue();

      // Update milestone progress
      participation.updateMilestoneProgress(milestoneId, progress);

      // Check if milestone completed
      const milestone = ritual.toData().milestones.find((m: any) => m.id === milestoneId);
      if (milestone && progress >= milestone.targetValue) {
        // Complete milestone
        participation.completeMilestone(milestoneId);

        // Award points
        const points = this.calculateMilestonePoints(milestone);
        participation.addPoints(points);

        // Add achievement
        participation.addAchievement(`Completed: ${milestone.name}`);

        // Update ritual milestone completion (if method exists)
        if (ritual.updateMilestoneProgress) {
          ritual.updateMilestoneProgress(milestoneId, progress);
        }
      }

      // Update streak
      participation.updateStreak(participation.streakCount + 1);

      // Save participation
      await this.ritualRepo.saveParticipation(participation);

      // Save ritual if modified
      await this.ritualRepo.save(ritual);

      // Get current progress
      const progressData = await this.calculateEnhancedRitualProgress(
        ritual,
        participation
      );

      return Result.ok<EnhancedRitualProgress>(progressData);
    }, 'EnhancedRitualParticipation.recordProgress');
  }

  /**
   * Get user's ritual progress
   */
  async getEnhancedRitualProgress(
    userId: string,
    ritualId: string
  ): Promise<Result<EnhancedRitualProgress>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();
      const ritualIdVO = RitualId.create(ritualId).getValue();

      // Get participation
      const participationResult = await this.ritualRepo.findParticipation(
        ritualIdVO,
        userProfileId
      );

      if (participationResult.isFailure) {
        return Result.fail<EnhancedRitualProgress>('Not participating in this ritual');
      }

      const participation = participationResult.getValue();

      // Get ritual
      const ritualResult = await this.ritualRepo.findById(ritualIdVO);
      if (ritualResult.isFailure) {
        return Result.fail<EnhancedRitualProgress>('EnhancedRitual not found');
      }

      const ritual = ritualResult.getValue();

      const progress = await this.calculateEnhancedRitualProgress(ritual, participation);

      return Result.ok<EnhancedRitualProgress>(progress);
    }, 'EnhancedRitualParticipation.getEnhancedRitualProgress');
  }

  /**
   * Get ritual leaderboard
   */
  async getLeaderboard(
    ritualId: string,
    limit: number = 20
  ): Promise<Result<ServiceResult<LeaderboardEntry[]>>> {
    return this.execute(async () => {
      const ritualIdVO = RitualId.create(ritualId).getValue();

      // Get ritual
      const ritualResult = await this.ritualRepo.findById(ritualIdVO);
      if (ritualResult.isFailure) {
        return Result.fail<ServiceResult<LeaderboardEntry[]>>('EnhancedRitual not found');
      }

      // Get leaderboard participations
      const leaderboardResult = await this.ritualRepo.findLeaderboard(
        ritualIdVO,
        limit
      );

      if (leaderboardResult.isFailure) {
        return Result.fail<ServiceResult<LeaderboardEntry[]>>(leaderboardResult.error!);
      }

      const participations = leaderboardResult.getValue();

      // Build leaderboard entries
      const entries: LeaderboardEntry[] = [];

      for (let i = 0; i < participations.length; i++) {
        const participation = participations[i];
        const participationData = participation.toData();

        // Get profile for display name
        const profileResult = await this.profileRepo.findById(participationData.profileId);
        const profile = profileResult.getValue();
        const displayName = profileResult.isSuccess
          ? `${profile.personalInfo?.firstName || ''} ${profile.personalInfo?.lastName || ''}`.trim() || 'Anonymous'
          : 'Anonymous';

        entries.push({
          profileId: participationData.profileId.id,
          displayName,
          totalPoints: participationData.totalPoints,
          rank: i + 1,
          completedMilestones: participationData.completedMilestones.length,
          streak: participationData.streak.currentDays
        });
      }

      const result: ServiceResult<LeaderboardEntry[]> = {
        data: entries,
        metadata: {
          totalCount: entries.length,
          hasMore: entries.length === limit
        }
      };

      return Result.ok<ServiceResult<LeaderboardEntry[]>>(result);
    }, 'EnhancedRitualParticipation.getLeaderboard');
  }

  /**
   * Get user's active rituals
   */
  async getUserEnhancedRituals(
    userId: string
  ): Promise<Result<ServiceResult<EnhancedRitual[]>>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();

      const ritualsResult = await this.ritualRepo.findByParticipant(userProfileId);

      if (ritualsResult.isFailure) {
        return Result.fail<ServiceResult<EnhancedRitual[]>>(ritualsResult.error!);
      }

      const rituals = ritualsResult.getValue();

      // Filter to active rituals
      const activeEnhancedRituals = rituals.filter((r: any) => r.toData().status === 'active');

      const result: ServiceResult<EnhancedRitual[]> = {
        data: activeEnhancedRituals,
        metadata: {
          totalCount: activeEnhancedRituals.length
        }
      };

      return Result.ok<ServiceResult<EnhancedRitual[]>>(result);
    }, 'EnhancedRitualParticipation.getUserEnhancedRituals');
  }

  /**
   * Get available rituals to join
   */
  async getAvailableEnhancedRituals(): Promise<Result<ServiceResult<EnhancedRitual[]>>> {
    return this.execute(async () => {
      const activeResult = await this.ritualRepo.findActive(this.context.campusId);

      if (activeResult.isFailure) {
        return Result.fail<ServiceResult<EnhancedRitual[]>>(activeResult.error!);
      }

      const rituals = activeResult.getValue()
        .filter((r: any) => r.toData().settings.isVisible);

      const result: ServiceResult<EnhancedRitual[]> = {
        data: rituals,
        metadata: {
          totalCount: rituals.length
        }
      };

      return Result.ok<ServiceResult<EnhancedRitual[]>>(result);
    }, 'EnhancedRitualParticipation.getAvailableEnhancedRituals');
  }

  /**
   * Subscribe to ritual updates
   */
  subscribeToEnhancedRitual(
    ritualId: string,
    callback: (ritual: EnhancedRitual | null) => void
  ): () => void {
    const ritualIdVO = RitualId.create(ritualId).getValue();
    return this.ritualRepo.subscribeToRitual(ritualIdVO, callback);
  }

  /**
   * Subscribe to active rituals feed
   */
  subscribeToActiveEnhancedRituals(
    callback: (rituals: EnhancedRitual[]) => void
  ): () => void {
    return this.ritualRepo.subscribeToActiveRituals(this.context.campusId, callback);
  }

  // Private helper methods

  private async calculateEnhancedRitualProgress(
    ritual: EnhancedRitual,
    participation: Participation
  ): Promise<EnhancedRitualProgress> {
    const ritualData = ritual.toData();
    const participationData = participation.toData();

    // Calculate completion percentage
    const totalMilestones = ritualData.milestones.length;
    const completedMilestones = participationData.completedMilestones.length;
    const completionPercentage = totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;

    // Find next milestone
    const nextMilestone = ritualData.milestones.find(
      (m: any) => !participationData.completedMilestones.includes(m.id)
    );

    // Get rank (would query from leaderboard in production)
    const leaderboard = await this.ritualRepo.findLeaderboard(ritual.id, 100);
    const rank = leaderboard.isSuccess
      ? leaderboard.getValue().findIndex((p: any) => p.profileId.id === participationData.profileId.id) + 1
      : 0;

    return {
      ritual,
      participation,
      completionPercentage,
      currentStreak: participationData.streak,
      rank,
      nextMilestone,
      recentAchievements: participationData.achievements.slice(-3)
    };
  }

  private calculateMilestonePoints(milestone: Milestone): number {
    // Base points based on target value
    let points = milestone.targetValue * 10;

    // Bonus for rewards
    milestone.rewards.forEach((reward: any) => {
      if (reward.type === 'points') {
        points += parseInt(reward.value) || 0;
      }
    });

    return points;
  }

  private generateParticipationWarnings(ritual: EnhancedRitual): string[] {
    const warnings: string[] = [];
    const ritualData = ritual.toData();

    const now = new Date();
    const daysUntilEnd = Math.ceil(
      (ritualData.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilEnd <= 7) {
      warnings.push(`This ritual ends in ${daysUntilEnd} days`);
    }

    if (ritualData.settings.maxParticipants) {
      const spotsLeft = ritualData.settings.maxParticipants - ritualData.participants.length;
      if (spotsLeft <= 10) {
        warnings.push(`Only ${spotsLeft} spots remaining`);
      }
    }

    if (!ritualData.settings.allowLateJoin && now > ritualData.startDate) {
      warnings.push('This ritual has already started and doesn\'t allow late joins');
    }

    return warnings;
  }

  private mapRitualType(ritualType: string): 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'one-time' {
    switch (ritualType) {
      case 'daily-challenge':
        return 'daily';
      case 'weekly-goal':
        return 'weekly';
      case 'study-challenge':
        return 'monthly';
      case 'social-mission':
        return 'seasonal';
      case 'campus-event':
        return 'one-time';
      default:
        return 'one-time';
    }
  }
}