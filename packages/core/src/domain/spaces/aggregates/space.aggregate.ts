/**
 * Space Aggregate
 * Represents a community space with full DDD business logic
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { SpaceId } from '../value-objects/space-id.value';
import { SpaceName } from '../value-objects/space-name.value';
import { SpaceDescription } from '../value-objects/space-description.value';
import { SpaceCategory } from '../value-objects/space-category.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { Tab } from '../entities/tab';
import { Widget } from '../entities/widget';
import { SpaceCreatedEvent } from '../events/space-created.event';
import { MemberJoinedEvent } from '../events/member-joined.event';
import { MemberRemovedEvent } from '../events/member-removed.event';
import { MemberRoleUpdatedEvent } from '../events/member-role-updated.event';
import { PostCreatedEvent } from '../events/post-created.event';

export interface SpaceMember {
  profileId: ProfileId;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
}

export interface SpaceSettings {
  allowInvites: boolean;
  requireApproval: boolean;
  allowRSS: boolean;
  maxMembers?: number;
  isPublic: boolean;
}

export interface RushMode {
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  requirements?: string[];
}

export interface SpaceProps {
  spaceId: SpaceId;
  name: SpaceName;
  description: SpaceDescription;
  category: SpaceCategory;
  campusId: CampusId;
  createdBy: ProfileId;
  members: SpaceMember[];
  tabs: Tab[];
  widgets: Widget[];
  settings: SpaceSettings;
  rssUrl?: string;
  visibility: 'public' | 'private';
  isActive: boolean;
  isVerified: boolean;
  trendingScore: number;
  rushMode?: RushMode;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  postCount: number;
}

export class Space extends AggregateRoot<SpaceProps> {
  get spaceId(): SpaceId {
    return this.props.spaceId;
  }

  get name(): SpaceName {
    return this.props.name;
  }

  get description(): SpaceDescription {
    return this.props.description;
  }

  get category(): SpaceCategory {
    return this.props.category;
  }

  get campusId(): CampusId {
    return this.props.campusId;
  }

  get memberCount(): number {
    return this.props.members.length;
  }

  get isPublic(): boolean {
    return this.props.visibility === 'public';
  }

  get tabs(): Tab[] {
    return this.props.tabs;
  }

  get widgets(): Widget[] {
    return this.props.widgets;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get trendingScore(): number {
    return this.props.trendingScore;
  }

  get rushMode(): RushMode | undefined {
    return this.props.rushMode;
  }

  get postCount(): number {
    return this.props.postCount;
  }

  get members(): SpaceMember[] {
    return this.props.members;
  }

  get adminCount(): number {
    return this.getAdminCount();
  }

  get lastActivityAt(): Date {
    return this.props.lastActivityAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Compatibility getters for Space interface
  get spaceIdValue(): SpaceId {
    return this.props.spaceId;
  }

  get visibility(): 'public' | 'private' {
    return this.props.visibility;
  }

  get settings(): SpaceSettings {
    return this.props.settings;
  }

  get spaceType(): string {
    return this.props.category.value;
  }

  // Alias for backward compatibility (many components use 'type' instead of 'spaceType')
  get type(): string {
    return this.props.category.value;
  }

  get posts(): any[] {
    // Posts are managed separately - return empty array for interface compatibility
    return [];
  }

  public getMemberCount(): number {
    return this.props.members.length;
  }


  private constructor(props: SpaceProps, id?: string) {
    super(props, id || `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    props: {
      spaceId: SpaceId;
      name: SpaceName;
      description: SpaceDescription;
      category: SpaceCategory;
      campusId: CampusId;
      createdBy: ProfileId;
      settings?: Partial<SpaceSettings>;
      visibility?: 'public' | 'private';
      rssUrl?: string;
    },
    id?: string
  ): Result<Space> {
    const defaultSettings: SpaceSettings = {
      allowInvites: true,
      requireApproval: false,
      allowRSS: false,
      isPublic: props.visibility === 'public',
      ...props.settings
    };

    const creator: SpaceMember = {
      profileId: props.createdBy,
      role: 'admin',
      joinedAt: new Date()
    };

    const spaceProps: SpaceProps = {
      spaceId: props.spaceId,
      name: props.name,
      description: props.description,
      category: props.category,
      campusId: props.campusId,
      createdBy: props.createdBy,
      members: [creator],
      tabs: [],
      widgets: [],
      settings: defaultSettings,
      rssUrl: props.rssUrl,
      visibility: props.visibility || 'public',
      isActive: true,
      isVerified: false,
      trendingScore: 0,
      rushMode: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date(),
      postCount: 0
    };

    const space = new Space(spaceProps, id);

    // Create default tabs
    space.createDefaultTabs();

    // Fire domain event
    space.addDomainEvent(
      new SpaceCreatedEvent(
        space.id,
        props.name.value,
        props.category.value,
        props.createdBy.value
      )
    );

    return Result.ok<Space>(space);
  }

  public addMember(profileId: ProfileId, role: 'member' | 'moderator' = 'member'): Result<void> {
    if (this.isMember(profileId)) {
      return Result.fail<void>('User is already a member');
    }

    if (this.props.settings.maxMembers && this.memberCount >= this.props.settings.maxMembers) {
      return Result.fail<void>('Space has reached maximum member capacity');
    }

    this.props.members.push({
      profileId,
      role,
      joinedAt: new Date()
    });

    this.updateLastActivity();

    // Fire domain event
    this.addDomainEvent(
      new MemberJoinedEvent(this.id, profileId.value, role, this.memberCount)
    );

    return Result.ok<void>();
  }

  public removeMember(profileId: ProfileId): Result<void> {
    const memberIndex = this.props.members.findIndex(
      m => m.profileId.value === profileId.value
    );

    if (memberIndex === -1) {
      return Result.fail<void>('User is not a member');
    }

    const member = this.props.members[memberIndex];

    // Can't remove last admin
    if (member.role === 'admin' && this.getAdminCount() === 1) {
      return Result.fail<void>('Cannot remove the last admin');
    }

    this.props.members.splice(memberIndex, 1);
    this.updateLastActivity();

    // Fire domain event
    this.addDomainEvent(
      new MemberRemovedEvent(this.id, profileId.value, this.memberCount)
    );

    return Result.ok<void>();
  }

  public isMember(profileId: ProfileId): boolean {
    return this.props.members.some(m => m.profileId.value === profileId.value);
  }

  public getMemberRole(profileId: ProfileId): string | null {
    const member = this.props.members.find(m => m.profileId.value === profileId.value);
    return member ? member.role : null;
  }

  public updateMemberRole(
    profileId: ProfileId,
    newRole: 'admin' | 'moderator' | 'member'
  ): Result<void> {
    const member = this.props.members.find(m => m.profileId.value === profileId.value);

    if (!member) {
      return Result.fail<void>('User is not a member');
    }

    // Can't demote last admin
    if (member.role === 'admin' && newRole !== 'admin' && this.getAdminCount() === 1) {
      return Result.fail<void>('Cannot demote the last admin');
    }

    const oldRole = member.role;
    member.role = newRole;
    this.updateLastActivity();

    // Fire domain event
    this.addDomainEvent(
      new MemberRoleUpdatedEvent(this.id, profileId.value, oldRole, newRole)
    );

    return Result.ok<void>();
  }

  public addTab(tab: Tab): Result<void> {
    if (this.props.tabs.find(t => t.name === tab.name)) {
      return Result.fail<void>('Tab with this name already exists');
    }

    this.props.tabs.push(tab);
    this.updateLastActivity();
    return Result.ok<void>();
  }

  public addWidget(widget: Widget): Result<void> {
    this.props.widgets.push(widget);
    this.updateLastActivity();
    return Result.ok<void>();
  }

  public incrementPostCount(postId?: string, authorId?: string): void {
    this.props.postCount++;
    this.updateLastActivity();

    // Fire domain event if post details provided
    if (postId && authorId) {
      this.addDomainEvent(
        new PostCreatedEvent(this.id, postId, authorId, this.props.postCount)
      );
    }
  }

  public updateSettings(settings: Partial<SpaceSettings>): Result<void> {
    if (
      typeof settings.maxMembers === 'number' &&
      settings.maxMembers > 0 &&
      settings.maxMembers < this.memberCount
    ) {
      return Result.fail<void>('Cannot set maxMembers below current member count');
    }

    this.props.settings = { ...this.props.settings, ...settings };
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  private getAdminCount(): number {
    return this.props.members.filter(m => m.role === 'admin').length;
  }

  private updateLastActivity(): void {
    this.props.lastActivityAt = new Date();
    this.props.updatedAt = new Date();
  }

  private createDefaultTabs(): void {
    const feedTab = Tab.create({
      name: 'Feed',
      type: 'feed',
      isDefault: true,
      order: 0,
      widgets: [],
      isVisible: true
    });

    if (feedTab.isSuccess) {
      this.props.tabs.push(feedTab.getValue());
    }
  }

  /**
   * Space Discovery Business Logic (Moved from SpaceDiscoveryService)
   */

  public getWelcomeMessage(): string {
    const name = this.props.name.value;
    const description = this.props.description.value;
    return `Welcome to ${name}! ${description}`;
  }

  public getSuggestedActions(): Array<{ action: string; description: string }> {
    const actions: Array<{ action: string; description: string }> = [];

    // If space has posts, suggest reading them
    if (this.props.postCount > 0) {
      actions.push({
        action: 'read_recent_posts',
        description: 'Catch up on recent discussions'
      });
    }

    // Always suggest introducing yourself
    actions.push({
      action: 'introduce_yourself',
      description: 'Post an introduction to let others know you\'re here'
    });

    // Suggest sharing resources for study groups
    if (this.props.category.value === 'study-group') {
      actions.push({
        action: 'share_resources',
        description: 'Share helpful study materials or notes'
      });
    }

    // Suggest inviting friends
    actions.push({
      action: 'invite_friends',
      description: 'Invite classmates who might be interested'
    });

    return actions;
  }

  // Temporary setters for repository layer - should be removed once proper construction is implemented
  public setIsVerified(isVerified: boolean): void {
    (this.props as any).isVerified = isVerified;
  }


  public setPostCount(count: number): void {
    (this.props as any).postCount = count;
  }

  public setMemberCount(count: number): void {
    // Note: This is for setting cached count from database
    // The actual count should be calculated from members.length
    (this.props as any).memberCount = count;
  }

  public setTrendingScore(score: number): void {
    (this.props as any).trendingScore = score;
  }

  public setLastActivityAt(date: Date): void {
    (this.props as any).lastActivityAt = date;
  }

  public setCreatedAt(date: Date): void {
    (this.props as any).createdAt = date;
  }

  public setUpdatedAt(date: Date): void {
    (this.props as any).updatedAt = date;
  }

  public setTabs(tabs: Tab[]): void {
    (this.props as any).tabs = tabs;
  }

  public setWidgets(widgets: Widget[]): void {
    (this.props as any).widgets = widgets;
  }

  public toData(): any {
    return {
      id: this.id,
      spaceId: this.props.spaceId,
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
      campusId: this.props.campusId,
      createdBy: this.props.createdBy,
      members: this.props.members,
      tabs: this.props.tabs,
      widgets: this.props.widgets,
      settings: this.props.settings,
      rssUrl: this.props.rssUrl,
      visibility: this.props.visibility,
      isActive: this.props.isActive,
      memberCount: this.memberCount,
      postCount: this.props.postCount,
      posts: [], // Posts are stored as subcollection, not in aggregate
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      lastActivityAt: this.props.lastActivityAt
    };
  }
}
