/**
 * Temporary type exports for backward compatibility
 * These re-export from proper domain models
 * This file will be deleted once all references are updated
 */

// Re-export from proper domain models
export { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
export { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
export { SpaceName } from '../../domain/spaces/value-objects/space-name.value';
export { RitualId } from '../../domain/rituals/value-objects/ritual-id.value';
export { CampusId } from '../../domain/profile/value-objects/campus-id.value';
export { ConnectionId } from '../../domain/profile/value-objects/connection-id.value';

// Re-export aggregates
export { EnhancedFeed } from '../../domain/feed/enhanced-feed';
export { EnhancedRitual } from '../../domain/rituals/aggregates/enhanced-ritual';
export { EnhancedSpace } from '../../domain/spaces/aggregates/enhanced-space';
export { EnhancedProfile } from '../../domain/profile/aggregates/enhanced-profile';
export { Connection } from '../../domain/profile/aggregates/connection';

// Re-export entities and types
export { FeedItem } from '../../domain/feed/feed-item';
export type { Milestone, Reward } from '../../domain/rituals/aggregates/enhanced-ritual';

// Legacy types that need migration (kept temporarily)
export interface Feed {
  userId: string;
  lastUpdated: Date;
  toData?: () => any;
}

export interface PostContent {
  text: string;
  mediaUrls: string[];
}

// These classes provide backward compatibility wrappers
export class FeedFilter {
  constructor(public type: string, public value: any) {}

  static create(type: string) {
    return {
      isSuccess: true,
      isFailure: false,
      getValue: () => new FeedFilter(type, null),
      error: null
    };
  }
}

export class Ritual {
  public participants: number = 0;
  public isActive: boolean = true;
  public settings: { isVisible: boolean } = { isVisible: true };
  public startDate?: Date;
  public endDate?: Date;

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public milestones: any[]
  ) {}

  static create(data: any) {
    return {
      isSuccess: true,
      isFailure: false,
      getValue: () => {
        const ritual = new Ritual(data.id, data.name, data.description, data.milestones || []);
        ritual.participants = data.participants || 0;
        ritual.isActive = data.isActive !== undefined ? data.isActive : true;
        ritual.settings = data.settings || { isVisible: true };
        ritual.startDate = data.startDate;
        ritual.endDate = data.endDate;
        return ritual;
      },
      error: null
    };
  }

  addParticipant(profileId: string) {
    this.participants++;
    return { isSuccess: true, isFailure: false };
  }

  updateMilestoneProgress(milestoneId: string, progress: number) {
    return { isSuccess: true, isFailure: false };
  }

  toData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      milestones: this.milestones,
      participants: this.participants,
      isActive: this.isActive,
      settings: this.settings,
      startDate: this.startDate,
      endDate: this.endDate
    };
  }
}

export class Participation {
  public streak: number = 0;
  public achievements: any[] = [];
  public totalPoints: number = 0;

  constructor(
    public id: string,
    public profileId: any,
    public ritualId: any,
    public completedMilestones: string[] = [],
    public progress: number = 0
  ) {}

  static create(data: any) {
    return {
      isSuccess: true,
      isFailure: false,
      getValue: () => {
        const participation = new Participation(
          data.id,
          data.profileId,
          data.ritualId,
          data.completedMilestones || [],
          data.progress || 0
        );
        participation.streak = data.streak || 0;
        participation.achievements = data.achievements || [];
        participation.totalPoints = data.totalPoints || 0;
        return participation;
      },
      error: null
    };
  }

  toData() {
    return {
      id: this.id,
      profileId: this.profileId,
      ritualId: this.ritualId,
      completedMilestones: this.completedMilestones,
      progress: this.progress,
      streak: this.streak,
      achievements: this.achievements,
      totalPoints: this.totalPoints
    };
  }

  updateMilestoneProgress(milestoneId: string, progress: number) {
    this.progress = progress;
    return { isSuccess: true, isFailure: false };
  }

  completeMilestone(milestoneId: string) {
    if (!this.completedMilestones.includes(milestoneId)) {
      this.completedMilestones.push(milestoneId);
    }
    return { isSuccess: true, isFailure: false };
  }
}

export class Space {
  public visibility: string = 'public';
  public memberCount: number = 0;
  public lastActivityAt: Date = new Date();
  public createdAt: Date = new Date();
  public spaceType: string = 'general';
  public posts: any[] = [];
  public settings: any = {};
  public members: Array<{ profileId: any; role: string }> = [];
  private memberSet: Set<string> = new Set();

  constructor(
    public id: any,
    public name: any,
    public description: string,
    public category: string,
    public campusId: string,
    public createdBy?: any
  ) {}

  static create(data: any) {
    return {
      isSuccess: true,
      isFailure: false,
      getValue: () => {
        const space = new Space(
          data.id,
          data.name,
          data.description,
          data.category || data.spaceType,
          data.campusId,
          data.createdBy
        );
        space.visibility = data.visibility || 'public';
        space.memberCount = data.memberCount || 0;
        space.lastActivityAt = data.lastActivityAt || new Date();
        space.createdAt = data.createdAt || new Date();
        space.spaceType = data.spaceType || 'general';
        space.posts = data.posts || [];
        space.settings = data.settings || {};
        space.members = data.members || [];
        return space;
      },
      error: null
    };
  }

  addMember(profileId: string | any) {
    const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
    this.memberSet.add(id);
    if (!this.members.find(m => {
      const memberId = typeof m.profileId === 'string' ? m.profileId : m.profileId.id || m.profileId.value;
      return memberId === id;
    })) {
      this.members.push({
        profileId: typeof profileId === 'string' ? profileId : profileId,
        role: 'member'
      });
    }
    this.memberCount = this.memberSet.size;
    return { isSuccess: true, isFailure: false };
  }

  removeMember(profileId: string | any) {
    const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
    this.memberSet.delete(id);
    this.members = this.members.filter(m => {
      const memberId = typeof m.profileId === 'string' ? m.profileId : m.profileId.id || m.profileId.value;
      return memberId !== id;
    });
    this.memberCount = this.memberSet.size;
    return { isSuccess: true, isFailure: false };
  }

  isMember(profileId: string | any): boolean {
    const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
    return this.memberSet.has(id);
  }

  getAdminCount(): number {
    return this.members.filter(m => m.role === 'admin').length;
  }

  getMemberCount(): number {
    return this.memberCount;
  }

  toData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      campusId: this.campusId,
      visibility: this.visibility,
      memberCount: this.memberCount,
      lastActivityAt: this.lastActivityAt,
      createdAt: this.createdAt,
      spaceType: this.spaceType,
      posts: this.posts,
      settings: this.settings,
      members: this.members
    };
  }
}