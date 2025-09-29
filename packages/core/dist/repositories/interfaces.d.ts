/**
 * Repository Interfaces
 * Abstract data access for each domain vertical slice
 */
import { Profile, ProfileId, Space, SpaceId, Feed, FeedItem, Ritual, RitualId, Participation, Handle, SpaceName, UBEmail, Result } from '../domain';
/**
 * Profile Repository Interface
 */
export interface IProfileRepository {
    save(profile: Profile): Promise<Result<void>>;
    findById(profileId: ProfileId): Promise<Result<Profile>>;
    findByEmail(email: UBEmail): Promise<Result<Profile>>;
    findByHandle(handle: Handle): Promise<Result<Profile>>;
    delete(profileId: ProfileId): Promise<Result<void>>;
    findConnectionsOf(profileId: ProfileId): Promise<Result<Profile[]>>;
    findByInterest(interest: string, limit?: number): Promise<Result<Profile[]>>;
    findByMajor(major: string, limit?: number): Promise<Result<Profile[]>>;
    findOnboardedProfiles(limit?: number): Promise<Result<Profile[]>>;
    findByCampus(campusId: string, limit?: number): Promise<Result<Profile[]>>;
    getTotalCampusUsers(campusId: string): Promise<Result<number>>;
    subscribeToProfile(profileId: ProfileId, callback: (profile: Profile | null) => void): () => void;
}
/**
 * Space Repository Interface
 */
export interface ISpaceRepository {
    save(space: Space): Promise<Result<void>>;
    findById(spaceId: SpaceId): Promise<Result<Space>>;
    findByName(name: SpaceName, campusId: string): Promise<Result<Space>>;
    delete(spaceId: SpaceId): Promise<Result<void>>;
    findByCampus(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findByType(spaceType: string, campusId: string, limit?: number): Promise<Result<Space[]>>;
    findByMember(profileId: ProfileId, limit?: number): Promise<Result<Space[]>>;
    findTrending(campusId: string, limit?: number): Promise<Result<Space[]>>;
    findPublicSpaces(campusId: string, limit?: number): Promise<Result<Space[]>>;
    searchSpaces(query: string, campusId: string, limit?: number): Promise<Result<Space[]>>;
    findRecommended(campusId: string, interests?: string[], major?: string, limit?: number): Promise<Result<Space[]>>;
    subscribeToSpace(spaceId: SpaceId, callback: (space: Space | null) => void): () => void;
    subscribeToTrendingSpaces(campusId: string, callback: (spaces: Space[]) => void): () => void;
}
/**
 * Feed Repository Interface
 */
export interface IFeedRepository {
    saveFeed(feed: Feed): Promise<Result<void>>;
    findByUserId(userId: ProfileId): Promise<Result<Feed>>;
    getFeedContent(userId: ProfileId, userSpaces: SpaceId[], userConnections: ProfileId[], limit?: number): Promise<Result<FeedItem[]>>;
    getTrendingContent(campusId: string, limit?: number): Promise<Result<FeedItem[]>>;
    getEventContent(campusId: string, limit?: number): Promise<Result<FeedItem[]>>;
    getRitualContent(campusId: string, limit?: number): Promise<Result<FeedItem[]>>;
    recordInteraction(userId: ProfileId, itemId: string, interactionType: string, metadata?: Record<string, unknown>): Promise<Result<void>>;
    subscribeToFeed(userId: ProfileId, callback: (items: FeedItem[]) => void): () => void;
}
/**
 * Ritual Repository Interface
 */
export interface IRitualRepository {
    save(ritual: Ritual): Promise<Result<void>>;
    findById(ritualId: RitualId): Promise<Result<Ritual>>;
    delete(ritualId: RitualId): Promise<Result<void>>;
    findActive(campusId: string): Promise<Result<Ritual[]>>;
    findByType(ritualType: string, campusId: string): Promise<Result<Ritual[]>>;
    findActiveByType(ritualType: string, campusId: string): Promise<Result<Ritual>>;
    findByParticipant(profileId: ProfileId): Promise<Result<Ritual[]>>;
    findCompleted(campusId: string, limit?: number): Promise<Result<Ritual[]>>;
    findUpcoming(campusId: string): Promise<Result<Ritual[]>>;
    saveParticipation(participation: Participation): Promise<Result<void>>;
    findParticipation(ritualId: RitualId, profileId: ProfileId): Promise<Result<Participation>>;
    findLeaderboard(ritualId: RitualId, limit?: number): Promise<Result<Participation[]>>;
    subscribeToRitual(ritualId: RitualId, callback: (ritual: Ritual | null) => void): () => void;
    subscribeToActiveRituals(campusId: string, callback: (rituals: Ritual[]) => void): () => void;
}
/**
 * Campus Data Interface (for shared campus operations)
 */
export interface ICampusRepository {
    getCampusStats(campusId: string): Promise<Result<{
        totalUsers: number;
        totalSpaces: number;
        activeRituals: number;
        dailyActiveUsers: number;
    }>>;
    verifyCampusEmail(email: string): Promise<Result<boolean>>;
    getValidEmailDomains(campusId: string): Promise<Result<string[]>>;
}
/**
 * Repository Factory Interface
 */
export interface IRepositoryFactory {
    createProfileRepository(): IProfileRepository;
    createSpaceRepository(): ISpaceRepository;
    createFeedRepository(): IFeedRepository;
    createRitualRepository(): IRitualRepository;
    createCampusRepository(): ICampusRepository;
}
//# sourceMappingURL=interfaces.d.ts.map