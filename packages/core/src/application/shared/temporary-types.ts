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
export { Ritual } from '../../domain/rituals/aggregates/ritual.aggregate';
// export { Space } from '../../domain/spaces/aggregates/space.aggregate'; // Commented out - using local stub class below
export { Profile } from '../../domain/profile/aggregates/profile.aggregate';
export { Connection } from '../../domain/profile/aggregates/connection';

// Re-export entities and types
export { FeedItem } from '../../domain/feed/feed-item';
// export type { Milestone, Reward } from '../../domain/rituals/aggregates/ritual.aggregate'; // These types don't exist - use RitualGoal and RitualReward instead
export type { RitualReward as Reward } from '../../domain/rituals/aggregates/ritual.aggregate';

// Profile utility functions
export function getProfileCompleteness(profile: any): number {
  if (!profile) return 0;

  const requiredFields = ['displayName', 'email', 'handle'];
  const optionalFields = ['bio', 'photoURL', 'major', 'year', 'interests'];

  let completed = 0;
  const totalFields = requiredFields.length + optionalFields.length;

  requiredFields.forEach(field => {
    if (profile[field]) completed++;
  });

  optionalFields.forEach(field => {
    if (profile[field]) completed++;
  });

  return Math.round((completed / totalFields) * 100);
}

// Authentication utilities
export function getDefaultActionCodeSettings(continueUrl?: string) {
  return {
    url: continueUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://hive-official.vercel.app',
    handleCodeInApp: true,
    dynamicLinkDomain: undefined
  };
}

export function validateEmailDomain(email: string, allowedDomains: string[] = ['buffalo.edu']): boolean {
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
}

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

// NOTE: Ritual is now exported from domain/rituals/aggregates/ritual.aggregate
// Legacy wrapper removed - use proper domain model instead

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

// SpaceType enum for categorization
export enum SpaceType {
  GENERAL = 'general',
  ACADEMIC = 'academic',
  SOCIAL = 'social',
  PROFESSIONAL = 'professional',
  MARKETPLACE = 'marketplace',
  EVENT = 'event'
}

export class Space {
  public visibility: string = 'public';
  public memberCount: number = 0;
  public lastActivityAt: Date = new Date();
  public createdAt: Date = new Date();
  public spaceType: string = 'general';
  public type: SpaceType = SpaceType.GENERAL; // Add type property
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
        space.type = data.type || SpaceType.GENERAL;
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
      type: this.type,
      posts: this.posts,
      settings: this.settings,
      members: this.members
    };
  }
}

// Post type definition
export interface Post {
  id: string;
  spaceId: string;
  authorId: string;
  content: {
    text: string;
    mediaUrls?: string[];
    mentions?: string[];
  };
  metadata: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  createdAt: Date | any;
  updatedAt?: Date | any;
  isPromoted?: boolean;
  isPinned?: boolean;
  visibility?: 'public' | 'members' | 'private';
  campusId: string;

  // Additional properties for content validation and special post types
  type?: 'default' | 'toolshare' | 'event' | 'poll' | 'image';
  reactions?: {
    heart?: number;
    thumbsUp?: number;
    celebrate?: number;
    [key: string]: number | undefined;
  };
  reactedUsers?: {
    [userId: string]: string; // userId -> reactionType
  };
  author?: {
    id: string;
    displayName?: string;
    handle?: string;
    photoURL?: string;
    role?: 'student' | 'faculty' | 'builder' | 'admin';
  };
  richContent?: {
    mentions?: Array<{
      type: 'user' | 'tool' | 'space';
      id: string;
      displayText: string;
    }>;
    hashtags?: string[];
    links?: string[];
  };
  toolShareMetadata?: {
    toolId: string;
    toolName: string;
    shareType: 'created' | 'used' | 'recommended';
  };
  pollMetadata?: {
    question: string;
    options: string[];
    votes: { [option: string]: number };
    endsAt?: Date;
  };
  imageMetadata?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
}

// School type definition
export interface School {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  stats: {
    studentCount: number;
    facultyCount: number;
  };
  campusId: string;
  isActive: boolean;
  createdAt: Date | any;
  updatedAt?: Date | any;
}

// User type definition
export interface User {
  id: string;
  email: string;
  displayName?: string;
  handle?: string;
  profileId?: string;
  photoURL?: string;
  emailVerified: boolean;
  campusId: string;
  role?: 'student' | 'faculty' | 'alumni' | 'staff' | 'admin';
  createdAt: Date | any;
  lastActive?: Date | any;
  metadata?: {
    school?: string;
    major?: string;
    graduationYear?: number;
    interests?: string[];
  };
}

// AuthUser type for Firebase User compatibility
export interface AuthUser extends Omit<User, 'displayName' | 'photoURL'> {
  uid: string;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  campusId: string;
}

// Tool type definitions
// NOTE: Tool is now exported from domain/tools/aggregates/tool.aggregate
// These are kept for backward compatibility during migration
// TODO: Migrate all usages to domain model
export interface Tool {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  version: string;
  elements: ElementInstance[];
  settings: ToolSettings;
  analytics?: ToolAnalytics;
  permissions: ToolPermissions;
  createdAt: Date | any;
  updatedAt?: Date | any;
  publishedAt?: Date | any;
  campusId: string;
}

export interface ElementInstance {
  id: string;
  type: string;
  config: any;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  style?: any;
  data?: any;
}

export interface Element {
  id: string;
  type: string;
  category: string;
  name: string;
  description: string;
  defaultConfig: any;
  schema?: any;
}

export interface ToolSettings {
  isPublic: boolean;
  allowComments: boolean;
  allowSharing: boolean;
  requireAuth: boolean;
  maxUsers?: number;
}

export interface ToolAnalytics {
  views: number;
  uses: number;
  shares: number;
  rating?: number;
  reviews?: number;
}

export interface ToolPermissions {
  canEdit: string[];
  canView: string[];
  canShare: string[];
  canDelete: string[];
}

// Tool-related schemas and validators
export const ToolSchema = {
  parse: (data: any) => data,
  safeParse: (data: any) => ({ success: true, data })
};

export const CreateToolSchema = {
  parse: (data: any) => data,
  safeParse: (data: any) => ({ success: true, data })
};

export const UpdateToolSchema = {
  parse: (data: any) => data,
  safeParse: (data: any) => ({ success: true, data })
};

export const ShareToolSchema = {
  parse: (data: any) => data,
  safeParse: (data: any) => ({ success: true, data })
};

// Tool utility functions
export function canUserEditTool(tool: Tool, userId: string): boolean {
  return tool.creatorId === userId ||
         (tool.permissions?.canEdit || []).includes(userId);
}

export function canUserViewTool(tool: Tool, userId: string): boolean {
  return tool.settings?.isPublic ||
         tool.creatorId === userId ||
         (tool.permissions?.canView || []).includes(userId);
}

export function getNextVersion(currentVersion: string): string {
  const parts = currentVersion.split('.');
  const patch = parseInt(parts[2] || '0', 10);
  return `${parts[0]}.${parts[1]}.${patch + 1}`;
}

export function determineChangeType(changes: any): 'major' | 'minor' | 'patch' {
  // Simple heuristic for now
  if (changes.elements?.length > 0) return 'minor';
  if (changes.settings) return 'patch';
  return 'patch';
}

export function validateToolStructure(tool: any): boolean {
  return !!(tool.name && tool.elements && Array.isArray(tool.elements));
}

export function validateElementConfig(element: any): boolean {
  return !!(element.type && element.config);
}

export function generateShareToken(toolId: string, userId: string): string {
  return Buffer.from(`${toolId}:${userId}:${Date.now()}`).toString('base64');
}

export function createToolDefaults(): Partial<Tool> {
  return {
    version: '1.0.0',
    elements: [],
    settings: {
      isPublic: false,
      allowComments: true,
      allowSharing: true,
      requireAuth: false
    },
    permissions: {
      canEdit: [],
      canView: [],
      canShare: [],
      canDelete: []
    }
  };
}