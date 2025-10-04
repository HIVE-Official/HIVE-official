/**
 * Repository Interfaces
 * Abstracts data persistence from domain logic
 */
import { Result } from '../../domain/shared/base/Result';
import { Profile } from '../../domain/profile/aggregates/profile.aggregate';
import { Connection } from '../../domain/profile/aggregates/connection';
import { Ritual } from '../../domain/rituals/aggregates/ritual.aggregate';
import { Space } from '../../domain/spaces/aggregates/space.aggregate';
import { Tool } from '../../domain/tools/aggregates/tool.aggregate';
import { EnhancedFeed } from '../../domain/feed/enhanced-feed';
import { Participation } from '../../domain/rituals/entities/participation';
export interface IRepository<T> {
    findById(id: any): Promise<Result<T>>;
    save(entity: T): Promise<Result<void>>;
    delete(id: any): Promise<Result<void>>;
}
export interface IProfileRepository extends IRepository<Profile> {
    findByEmail(email: string): Promise<Result<Profile>>;
    findByHandle(handle: string): Promise<Result<Profile>>;
    findByCampus(campusId: string, limit?: number): Promise<Result<Profile[]>>;
    findOnboardedProfiles(maxCount?: number): Promise<Result<Profile[]>>;
    findByInterest(interest: string, limitCount?: number): Promise<Result<Profile[]>>;
    findByMajor(major: string, limitCount?: number): Promise<Result<Profile[]>>;
    findConnectionsOf(profileId: string): Promise<Result<Profile[]>>;
    getTotalCampusUsers(campusId: string): Promise<Result<number>>;
    exists(handle: string): Promise<boolean>;
    searchByName(query: string, campusId: string): Promise<Result<Profile[]>>;
}
export interface IConnectionRepository extends IRepository<Connection> {
    findByProfiles(profileId1: string, profileId2: string): Promise<Result<Connection>>;
    findUserConnections(profileId: string, type?: string): Promise<Result<Connection[]>>;
    getConnectionCount(profileId: string, type: string): Promise<number>;
}
export interface ISpaceRepository extends IRepository<Space> {
    findByName(name: string, campusId: string): Promise<Result<Space>>;
    findByCampus(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findByCategory(category: string, campusId: string): Promise<Result<Space[]>>;
    findByType(type: string, campusId: string): Promise<Result<Space[]>>;
    findUserSpaces(userId: string): Promise<Result<Space[]>>;
    findByMember(userId: string): Promise<Result<Space[]>>;
    findPublicSpaces(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findPublicSpaces(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findTrending(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findRecommended(campusId: string, interests: string[], major?: string): Promise<Result<Space[]>>;
    searchSpaces(query: string, campusId: string): Promise<Result<Space[]>>;
    searchSpaces(query: string, campusId: string): Promise<Result<Space[]>>;
}
export interface IFeedRepository extends IRepository<EnhancedFeed> {
    findByUserId(userId: any): Promise<Result<EnhancedFeed>>;
    findByCampus(campusId: string): Promise<Result<EnhancedFeed[]>>;
    saveFeed(feed: EnhancedFeed): Promise<Result<void>>;
    getFeedContent(userId: string, userSpaces: string[], userConnections: string[], limitCount?: number): Promise<Result<any[]>>;
    getTrendingContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    getEventContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    getRitualContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    recordInteraction(userId: string, itemId: string, interactionType: string, metadata?: Record<string, unknown>): Promise<Result<void>>;
    addFeedItem(feedId: string, item: any): Promise<Result<void>>;
    removeFeedItem(feedId: string, itemId: string): Promise<Result<void>>;
    subscribeToFeed(userId: string, callback: (items: any[]) => void): () => void;
}
export interface IRitualRepository extends IRepository<Ritual> {
    findByCampus(campusId: string): Promise<Result<Ritual[]>>;
    findActive(campusId: string): Promise<Result<Ritual[]>>;
    findByType(type: string, campusId: string): Promise<Result<Ritual[]>>;
    findActiveByType(type: string, campusId: string): Promise<Result<Ritual>>;
    findUserRituals(userId: string): Promise<Result<Ritual[]>>;
    findParticipation(ritualId: any, profileId: any): Promise<Result<Participation>>;
    saveParticipation(participation: Participation): Promise<Result<void>>;
    findLeaderboard(ritualId: any, limit: number): Promise<Result<Participation[]>>;
    findByParticipant(profileId: any): Promise<Result<Ritual[]>>;
    subscribeToRitual(ritualId: any, callback: (ritual: Ritual) => void): () => void;
    subscribeToActiveRituals(campusId: string, callback: (rituals: Ritual[]) => void): () => void;
}
export interface IToolRepository extends IRepository<Tool> {
    findByCreator(profileId: string): Promise<Result<Tool[]>>;
    findBySpace(spaceId: string): Promise<Result<Tool[]>>;
    findByStatus(status: string, campusId: string): Promise<Result<Tool[]>>;
    findByVisibility(visibility: string, campusId: string): Promise<Result<Tool[]>>;
    findPublished(campusId: string, limit?: number): Promise<Result<Tool[]>>;
    findDeployedToSpace(spaceId: string): Promise<Result<Tool[]>>;
    findTrending(campusId: string, limit?: number): Promise<Result<Tool[]>>;
    findForkableTools(campusId: string): Promise<Result<Tool[]>>;
    searchTools(query: string, campusId: string): Promise<Result<Tool[]>>;
    recordUse(toolId: string): Promise<Result<void>>;
}
export interface IUnitOfWork {
    profiles: IProfileRepository;
    connections: IConnectionRepository;
    spaces: ISpaceRepository;
    feeds: IFeedRepository;
    rituals: IRitualRepository;
    tools: IToolRepository;
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export interface IEventDispatcher {
    dispatch(events: any[]): Promise<void>;
    subscribe(eventType: string, handler: (event: any) => Promise<void>): void;
    unsubscribe(eventType: string, handler: (event: any) => Promise<void>): void;
}
//# sourceMappingURL=interfaces.d.ts.map