/**
 * Repository Interfaces
 * Abstracts data persistence from domain logic
 */

import { Result } from '../../domain/shared/base/Result';
import { EnhancedProfile } from '../../domain/profile/aggregates/enhanced-profile';
import { Connection } from '../../domain/profile/aggregates/connection';
import { EnhancedRitual } from '../../domain/rituals/aggregates/enhanced-ritual';
import { EnhancedSpace } from '../../domain/spaces/aggregates/enhanced-space';
import { EnhancedFeed } from '../../domain/feed/enhanced-feed';
import { Participation } from '../../domain/rituals/entities/participation';
import { RitualPhase, RitualUnion, RitualArchetype } from '../../domain/rituals/archetypes';

// Base repository interface
export interface IRepository<T> {
  findById(id: any): Promise<Result<T>>;
  save(entity: T): Promise<Result<void>>;
  delete(id: any): Promise<Result<void>>;
}

// Profile repository
export interface IProfileRepository extends IRepository<EnhancedProfile> {
  findByEmail(email: string): Promise<Result<EnhancedProfile>>;
  findByHandle(handle: string): Promise<Result<EnhancedProfile>>;
  findByCampus(campusId: string, limit?: number): Promise<Result<EnhancedProfile[]>>;
  findOnboardedProfiles(maxCount?: number): Promise<Result<EnhancedProfile[]>>;
  findByInterest(interest: string, limitCount?: number): Promise<Result<EnhancedProfile[]>>;
  findByMajor(major: string, limitCount?: number): Promise<Result<EnhancedProfile[]>>;
  findConnectionsOf(profileId: string): Promise<Result<EnhancedProfile[]>>;
  getTotalCampusUsers(campusId: string): Promise<Result<number>>;
  exists(handle: string): Promise<boolean>;
  searchByName(query: string, campusId: string): Promise<Result<EnhancedProfile[]>>;
}

// Connection repository
export interface IConnectionRepository extends IRepository<Connection> {
  findByProfiles(profileId1: string, profileId2: string): Promise<Result<Connection>>;
  findUserConnections(profileId: string, type?: string): Promise<Result<Connection[]>>;
  getConnectionCount(profileId: string, type: string): Promise<number>;
}

// Space repository
export interface ISpaceRepository extends IRepository<EnhancedSpace> {
  findByName(name: string, campusId: string): Promise<Result<EnhancedSpace>>;
  findByCampus(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
  findByCategory(category: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
  findByType(type: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
  findUserSpaces(userId: string): Promise<Result<EnhancedSpace[]>>;
  findByMember(userId: string): Promise<Result<EnhancedSpace[]>>;
  findPublicSpaces(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
  findPublicEnhancedSpaces(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
  findTrending(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
  findRecommended(campusId: string, interests: string[], major?: string): Promise<Result<EnhancedSpace[]>>;
  searchSpaces(query: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
  searchEnhancedSpaces(query: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
}

// Feed repository
export interface IFeedRepository extends IRepository<EnhancedFeed> {
  findByUserId(userId: any): Promise<Result<EnhancedFeed>>;
  findByCampus(campusId: string): Promise<Result<EnhancedFeed[]>>;
  saveFeed(feed: EnhancedFeed): Promise<Result<void>>;
  getFeedContent(
    userId: string,
    userSpaces: string[],
    userConnections: string[],
    limitCount?: number
  ): Promise<Result<any[]>>;
  getTrendingContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
  getEventContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
  getRitualContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
  recordInteraction(
    userId: string,
    itemId: string,
    interactionType: string,
    metadata?: Record<string, unknown>
  ): Promise<Result<void>>;
  addFeedItem(feedId: string, item: any): Promise<Result<void>>;
  removeFeedItem(feedId: string, itemId: string): Promise<Result<void>>;
  subscribeToFeed(userId: string, callback: (items: any[]) => void): () => void;
}

// Ritual repository
export interface IRitualRepository extends IRepository<EnhancedRitual> {
  findByCampus(campusId: string): Promise<Result<EnhancedRitual[]>>;
  findActive(campusId: string): Promise<Result<EnhancedRitual[]>>;
  findByType(type: string, campusId: string): Promise<Result<EnhancedRitual[]>>;
  findActiveByType(type: string, campusId: string): Promise<Result<EnhancedRitual>>;
  findUserRituals(userId: string): Promise<Result<EnhancedRitual[]>>;
  findParticipation(ritualId: any, profileId: any): Promise<Result<Participation>>;
  saveParticipation(participation: Participation): Promise<Result<void>>;
  findLeaderboard(ritualId: any, limit: number): Promise<Result<Participation[]>>;
  findByParticipant(profileId: any): Promise<Result<EnhancedRitual[]>>;
  subscribeToRitual(ritualId: any, callback: (ritual: EnhancedRitual) => void): () => void;
  subscribeToActiveRituals(campusId: string, callback: (rituals: EnhancedRitual[]) => void): () => void;
}

export interface IRitualConfigRepository extends IRepository<RitualUnion> {
  findByCampus(campusId: string, options?: { phases?: RitualPhase[] }): Promise<Result<RitualUnion[]>>;
  findActive(campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
  findBySlug(slug: string, campusId: string): Promise<Result<RitualUnion>>;
  findByArchetype(archetype: RitualArchetype, campusId: string): Promise<Result<RitualUnion[]>>;
  findActiveByArchetype(archetype: RitualArchetype, campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
}

// Unit of Work for transaction management
export interface IUnitOfWork {
  profiles: IProfileRepository;
  connections: IConnectionRepository;
  spaces: ISpaceRepository;
  feeds: IFeedRepository;
  rituals: IRitualRepository;
  ritualConfigs?: IRitualConfigRepository;

  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

// Event dispatcher
export interface IEventDispatcher {
  dispatch(events: any[]): Promise<void>;
  subscribe(eventType: string, handler: (event: any) => Promise<void>): void;
  unsubscribe(eventType: string, handler: (event: any) => Promise<void>): void;
}
