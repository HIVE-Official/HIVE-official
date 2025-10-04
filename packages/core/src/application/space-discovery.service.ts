/**
 * Space Discovery Service
 * Orchestrates space discovery, joining, and management flows
 */

import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Space } from '../domain/spaces/aggregates/space.aggregate';
import { SpaceId } from '../domain/spaces/value-objects/space-id.value';
import { SpaceName } from '../domain/spaces/value-objects/space-name.value';
import { SpaceDescription } from '../domain/spaces/value-objects/space-description.value';
import { SpaceCategory } from '../domain/spaces/value-objects/space-category.value';
import { CampusId } from '../domain/profile/value-objects/campus-id.value';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import {
  ISpaceRepository,
  IProfileRepository,
  IFeedRepository
} from '../infrastructure/repositories/interfaces';

export interface SpaceCreationData {
  name: string;
  description: string;
  spaceType: 'general' | 'study-group' | 'social' | 'event' | 'resource';
  visibility: 'public' | 'private';
  settings?: {
    allowInvites?: boolean;
    requireApproval?: boolean;
    allowRSS?: boolean;
  };
  rssUrl?: string;
}

export interface SpaceDiscoveryFilters {
  spaceType?: string;
  searchQuery?: string;
  sortBy?: 'trending' | 'members' | 'activity' | 'new';
  includePrivate?: boolean;
  limit?: number;
}

export interface SpaceJoinResult {
  space: Space;
  role: 'member' | 'moderator' | 'admin';
  welcomeMessage?: string;
  suggestedActions: Array<{ action: string; description: string }>;
}

export interface SpaceActivityData {
  spaceId: string;
  recentPosts: Array<{
    id: string;
    content: string;
    authorName: string;
    timestamp: Date;
  }>;
  activeMembers: number;
  todaysPosts: number;
  trendingTopics: string[];
}

export class SpaceDiscoveryService extends BaseApplicationService {
  private spaceRepo: ISpaceRepository;
  private profileRepo: IProfileRepository;
  private feedRepo: IFeedRepository;

  constructor(
    context?: Partial<ApplicationServiceContext>,
    spaceRepo?: ISpaceRepository,
    profileRepo?: IProfileRepository,
    feedRepo?: IFeedRepository
  ) {
    super(context);
    // Mock repositories for now - would be injected in production
    this.spaceRepo = spaceRepo || {} as ISpaceRepository;
    this.profileRepo = profileRepo || {} as IProfileRepository;
    this.feedRepo = feedRepo || {} as IFeedRepository;
  }

  /**
   * Discover spaces based on user preferences and filters
   */
  async discoverSpaces(
    filters: SpaceDiscoveryFilters = {}
  ): Promise<Result<ServiceResult<Space[]>>> {
    return this.execute(async () => {
      let spaces: Space[] = [];

      // Apply different discovery strategies based on filters
      if (filters.searchQuery) {
        const searchResult = await this.spaceRepo.searchSpaces(
          filters.searchQuery,
          this.context.campusId
        );
        if (searchResult.isSuccess) {
          spaces = searchResult.getValue();
        }
      } else if (filters.sortBy === 'trending') {
        const trendingResult = await this.spaceRepo.findTrending(
          this.context.campusId,
          filters.limit || 20
        );
        if (trendingResult.isSuccess) {
          spaces = trendingResult.getValue();
        }
      } else if (filters.spaceType) {
        const typeResult = await this.spaceRepo.findByType(
          filters.spaceType,
          this.context.campusId
        );
        if (typeResult.isSuccess) {
          spaces = typeResult.getValue();
        }
      } else {
        // Default: get public spaces
        const publicResult = await this.spaceRepo.findPublicSpaces(
          this.context.campusId,
          filters.limit || 20
        );
        if (publicResult.isSuccess) {
          spaces = publicResult.getValue();
        }
      }

      // Filter out private spaces unless explicitly requested
      if (!filters.includePrivate) {
        spaces = spaces.filter(space => space.toData().visibility === 'public');
      }

      // Sort spaces based on criteria
      spaces = this.sortSpaces(spaces, filters.sortBy || 'trending');

      const result: ServiceResult<Space[]> = {
        data: spaces,
        metadata: {
          totalCount: spaces.length,
          hasMore: spaces.length === (filters.limit || 20)
        }
      };

      return Result.ok<ServiceResult<Space[]>>(result);
    }, 'SpaceDiscovery.discoverSpaces');
  }

  /**
   * Get personalized space recommendations for a user
   */
  async getRecommendedSpaces(userId: string): Promise<Result<ServiceResult<Space[]>>> {
    return this.execute(async () => {
      const userContext = this.validateUserContext();
      if (userContext.isFailure) {
        return Result.fail<ServiceResult<Space[]>>(userContext.error!);
      }

      // Get user profile to understand interests
      const profileId = ProfileId.create(userId).getValue();
      const profileResult = await this.profileRepo.findById(profileId);

      if (profileResult.isFailure) {
        return Result.fail<ServiceResult<Space[]>>('User profile not found');
      }

      const profile = profileResult.getValue();
      const profileData = profile; // ProfileDTO doesn't need toData

      // Get spaces user is already in
      const userSpacesResult = await this.spaceRepo.findByMember(profileId.id);
      const userSpaceIds = userSpacesResult.isSuccess
        ? userSpacesResult.getValue().map((s: any) => typeof s.id === 'string' ? s.id : s.id)
        : [];

      // Build recommendation based on multiple factors
      const recommendations: Space[] = [];

      // 1. Spaces related to user's major
      if (profileData.personalInfo.major) {
        const majorSpaces = await this.spaceRepo.findByType(
          'study-group',
          this.context.campusId
        );
        if (majorSpaces.isSuccess) {
          recommendations.push(
            ...majorSpaces.getValue().filter(s => !userSpaceIds.includes(s.id))
          );
        }
      }

      // 2. Spaces matching user interests
      for (const interest of profileData.interests.slice(0, 3)) {
        const searchResult = await this.spaceRepo.searchSpaces(
          interest,
          this.context.campusId
        );
        if (searchResult.isSuccess) {
          recommendations.push(
            ...searchResult.getValue().filter((s: Space) => !userSpaceIds.includes(s.id))
          );
        }
      }

      // 3. Trending spaces user hasn't joined
      const trendingResult = await this.spaceRepo.findTrending(this.context.campusId, 10);
      if (trendingResult.isSuccess) {
        recommendations.push(
          ...trendingResult.getValue().filter(s => !userSpaceIds.includes(s.id))
        );
      }

      // Deduplicate and limit
      const uniqueSpaces = Array.from(
        new Map(recommendations.map(space => [typeof space.id === 'string' ? space.id : space.id, space])).values()
      ).slice(0, 10);

      const result: ServiceResult<Space[]> = {
        data: uniqueSpaces,
        metadata: {
          totalCount: uniqueSpaces.length
        }
      };

      return Result.ok<ServiceResult<Space[]>>(result);
    }, 'SpaceDiscovery.getRecommendedSpaces');
  }

  /**
   * Create a new space
   */
  async createSpace(
    creatorId: string,
    data: SpaceCreationData
  ): Promise<Result<Space>> {
    return this.execute(async () => {
      // Validate creator exists
      const creatorProfileId = ProfileId.create(creatorId).getValue();
      const creatorResult = await this.profileRepo.findById(creatorProfileId);

      if (creatorResult.isFailure) {
        return Result.fail<Space>('Creator profile not found');
      }

      // Create space value objects
      const spaceNameResult = SpaceName.create(data.name);
      if (spaceNameResult.isFailure) {
        return Result.fail<Space>(spaceNameResult.error!);
      }

      const spaceDescriptionResult = SpaceDescription.create(data.description);
      if (spaceDescriptionResult.isFailure) {
        return Result.fail<Space>(spaceDescriptionResult.error!);
      }

      const spaceCategoryResult = SpaceCategory.create(data.spaceType);
      if (spaceCategoryResult.isFailure) {
        return Result.fail<Space>(spaceCategoryResult.error!);
      }

      const campusIdResult = CampusId.create(this.context.campusId);
      if (campusIdResult.isFailure) {
        return Result.fail<Space>(campusIdResult.error!);
      }

      // Check if space name already exists
      const existingSpace = await this.spaceRepo.findByName(
        spaceNameResult.getValue().value,
        this.context.campusId
      );

      if (existingSpace.isSuccess) {
        return Result.fail<Space>('A space with this name already exists');
      }

      // Generate space ID
      const spaceId = SpaceId.create(
        `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      ).getValue();

      // Create space
      const spaceResult = Space.create({
        spaceId: spaceId,
        name: spaceNameResult.getValue(),
        description: spaceDescriptionResult.getValue(),
        category: spaceCategoryResult.getValue(),
        campusId: campusIdResult.getValue(),
        createdBy: creatorProfileId,
        visibility: data.visibility,
        settings: {
          allowInvites: data.settings?.allowInvites ?? true,
          requireApproval: data.settings?.requireApproval ?? false,
          allowRSS: data.settings?.allowRSS ?? false
        },
        rssUrl: data.rssUrl
      });

      if (spaceResult.isFailure) {
        return Result.fail<Space>(spaceResult.error!);
      }

      const space = spaceResult.getValue();

      // Creator automatically becomes admin
      space.addMember(creatorProfileId);

      // Save space
      const saveResult = await this.spaceRepo.save(space);
      if (saveResult.isFailure) {
        return Result.fail<Space>(saveResult.error!);
      }

      // If RSS URL provided, schedule initial fetch
      if (data.rssUrl) {
        await this.scheduleRSSFetch(space);
      }

      return Result.ok<Space>(space);
    }, 'SpaceDiscovery.createSpace');
  }

  /**
   * Join a space
   */
  async joinSpace(
    userId: string,
    spaceId: string
  ): Promise<Result<ServiceResult<SpaceJoinResult>>> {
    return this.execute(async () => {
      // Get user profile
      const userProfileId = ProfileId.create(userId).getValue();
      const profileResult = await this.profileRepo.findById(userProfileId);

      if (profileResult.isFailure) {
        return Result.fail<ServiceResult<SpaceJoinResult>>('User profile not found');
      }

      // Get space
      const spaceIdVO = SpaceId.create(spaceId).getValue();
      const spaceResult = await this.spaceRepo.findById(spaceIdVO);

      if (spaceResult.isFailure) {
        return Result.fail<ServiceResult<SpaceJoinResult>>('Space not found');
      }

      const space = spaceResult.getValue();
      const spaceData = space.toData();

      // Check if already member
      if (space.isMember(userProfileId)) {
        return Result.fail<ServiceResult<SpaceJoinResult>>('Already a member of this space');
      }

      // Check if space requires approval
      if (spaceData.settings.requireApproval && spaceData.visibility === 'private') {
        return Result.fail<ServiceResult<SpaceJoinResult>>(
          'This space requires approval to join'
        );
      }

      // Add member to space
      const addMemberResult = space.addMember(userProfileId);
      if (addMemberResult.isFailure) {
        return Result.fail<ServiceResult<SpaceJoinResult>>(addMemberResult.error!);
      }

      // Save updated space
      await this.spaceRepo.save(space);

      // Generate welcome message and suggested actions (using domain logic)
      const welcomeMessage = space.getWelcomeMessage();
      const suggestedActions = space.getSuggestedActions();

      const result: ServiceResult<SpaceJoinResult> = {
        data: {
          space,
          role: 'member',
          welcomeMessage,
          suggestedActions
        }
      };

      return Result.ok<ServiceResult<SpaceJoinResult>>(result);
    }, 'SpaceDiscovery.joinSpace');
  }

  /**
   * Leave a space
   */
  async leaveSpace(userId: string, spaceId: string): Promise<Result<void>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();
      const spaceIdVO = SpaceId.create(spaceId).getValue();

      const spaceResult = await this.spaceRepo.findById(spaceIdVO);
      if (spaceResult.isFailure) {
        return Result.fail<void>('Space not found');
      }

      const space = spaceResult.getValue();

      // Check if member
      if (!space.isMember(userProfileId)) {
        return Result.fail<void>('Not a member of this space');
      }

      // Check if last admin
      const member = space.toData().members.find((m: { profileId: ProfileId; role: string }) => m.profileId.id === userId);
      if (member?.role === 'admin' && space.adminCount === 1) {
        return Result.fail<void>('Cannot leave space as the only admin. Transfer ownership first.');
      }

      // Remove member
      const removeResult = space.removeMember(userProfileId);
      if (removeResult.isFailure) {
        return Result.fail<void>(removeResult.error!);
      }

      // Save updated space
      await this.spaceRepo.save(space);

      return Result.ok<void>();
    }, 'SpaceDiscovery.leaveSpace');
  }

  /**
   * Get space activity summary
   */
  async getSpaceActivity(spaceId: string): Promise<Result<ServiceResult<SpaceActivityData>>> {
    return this.execute(async () => {
      const spaceIdVO = SpaceId.create(spaceId).getValue();
      const spaceResult = await this.spaceRepo.findById(spaceIdVO);

      if (spaceResult.isFailure) {
        return Result.fail<ServiceResult<SpaceActivityData>>('Space not found');
      }

      const space = spaceResult.getValue();
      const spaceData = space.toData();

      // Get recent posts
      const recentPosts = spaceData.posts
        .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5)
        .map((post: any) => ({
          id: post.id.id,
          content: post.toData().content,
          authorName: 'Anonymous', // Would fetch actual name
          timestamp: post.createdAt
        }));

      // Count today's posts
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todaysPosts = spaceData.posts.filter(
        (post: any) => post.createdAt >= today
      ).length;

      // Get trending topics (simplified)
      const trendingTopics = this.extractTrendingTopics(spaceData.posts);

      const activity: ServiceResult<SpaceActivityData> = {
        data: {
          spaceId: spaceId,
          recentPosts,
          activeMembers: spaceData.members.length,
          todaysPosts,
          trendingTopics
        }
      };

      return Result.ok<ServiceResult<SpaceActivityData>>(activity);
    }, 'SpaceDiscovery.getSpaceActivity');
  }

  // Private helper methods

  private sortSpaces(spaces: Space[], sortBy: string): Space[] {
    switch (sortBy) {
      case 'members':
        return spaces.sort((a, b) => b.getMemberCount() - a.getMemberCount());
      case 'activity':
        return spaces.sort((a, b) =>
          b.toData().lastActivityAt.getTime() - a.toData().lastActivityAt.getTime()
        );
      case 'new':
        return spaces.sort((a, b) =>
          b.toData().createdAt.getTime() - a.toData().createdAt.getTime()
        );
      case 'trending':
      default:
        // Simple trending: combination of members and recent activity
        return spaces.sort((a, b) => {
          const aScore = a.getMemberCount() + (Date.now() - a.toData().lastActivityAt.getTime()) / 1000000;
          const bScore = b.getMemberCount() + (Date.now() - b.toData().lastActivityAt.getTime()) / 1000000;
          return bScore - aScore;
        });
    }
  }

  // NOTE: Trending topics extraction could become a domain service if it grows more complex
  private extractTrendingTopics(posts: any[]): string[] {
    // Simple word frequency analysis (would be more sophisticated in production)
    const wordFrequency = new Map<string, number>();

    posts.forEach((post: any) => {
      const words = post.toData().content.toLowerCase().split(/\s+/);
      words.forEach((word: string) => {
        if (word.length > 4) { // Only consider words longer than 4 chars
          wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
        }
      });
    });

    return Array.from(wordFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }

  private async scheduleRSSFetch(space: Space): Promise<void> {
    // This would trigger an RSS fetch job in production
    console.log(`Scheduling RSS fetch for space ${typeof space.id === 'string' ? space.id : space.id}`);
  }

  // Business logic methods removed - now in Space aggregate:
  // - generateWelcomeMessage() -> Space.getWelcomeMessage()
  // - generateSuggestedActions() -> Space.getSuggestedActions()
  // NOTE: sortSpaces() kept here as it's orchestration logic (could be pushed to repository layer)
}