/**
 * Firebase Space Repository
 * Firestore implementation for Space domain
 */
import { ISpaceRepository } from '../interfaces';
import { Space, SpaceId, SpaceName, ProfileId, Result } from '../../domain';
export declare class FirebaseSpaceRepository implements ISpaceRepository {
    private readonly spacesCollection;
    private readonly membersCollection;
    private readonly postsCollection;
    save(space: Space): Promise<Result<void>>;
    findById(spaceId: SpaceId): Promise<Result<Space>>;
    findByName(name: SpaceName, campusId: string): Promise<Result<Space>>;
    delete(spaceId: SpaceId): Promise<Result<void>>;
    findByCampus(campusId: string, maxResults?: number): Promise<Result<Space[]>>;
    findByType(spaceType: string, campusId: string, maxResults?: number): Promise<Result<Space[]>>;
    findByMember(profileId: ProfileId, maxResults?: number): Promise<Result<Space[]>>;
    findTrending(campusId: string, maxResults?: number): Promise<Result<Space[]>>;
    findPublicSpaces(campusId: string, maxResults?: number): Promise<Result<Space[]>>;
    searchSpaces(searchQuery: string, campusId: string, maxResults?: number): Promise<Result<Space[]>>;
    subscribeToSpace(spaceId: SpaceId, callback: (space: Space | null) => void): () => void;
    findRecommended(campusId: string, interests?: string[], major?: string, limitCount?: number): Promise<Result<Space[]>>;
    subscribeToTrendingSpaces(campusId: string, callback: (spaces: Space[]) => void): () => void;
    private executeSpacesQuery;
    private getSpaceMembers;
    private getSpacePosts;
    private domainToFirestore;
    private firestoreToDisplay;
}
//# sourceMappingURL=space.repository.d.ts.map