/**
 * Firebase Space Repository Implementation
 * Handles space persistence with Firebase
 */
import { ISpaceRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedSpace } from '../../../domain/spaces/aggregates/enhanced-space';
import { SpaceId } from '../../../domain/spaces/value-objects/space-id.value';
export declare class FirebaseSpaceRepository implements ISpaceRepository {
    private readonly collectionName;
    findById(id: SpaceId | any): Promise<Result<EnhancedSpace>>;
    findByName(name: string, campusId: string): Promise<Result<EnhancedSpace>>;
    findByCampus(campusId: string, limitCount?: number): Promise<Result<EnhancedSpace[]>>;
    findByCategory(category: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
    findUserSpaces(userId: string): Promise<Result<EnhancedSpace[]>>;
    findTrending(campusId: string, limitCount?: number): Promise<Result<EnhancedSpace[]>>;
    findRecommended(campusId: string, interests: string[], major?: string): Promise<Result<EnhancedSpace[]>>;
    searchSpaces(searchQuery: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
    save(space: EnhancedSpace): Promise<Result<void>>;
    delete(id: SpaceId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findByType(type: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
    findByMember(userId: string): Promise<Result<EnhancedSpace[]>>;
    findPublicSpaces(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
    findPublicEnhancedSpaces(campusId: string, limit?: number): Promise<Result<EnhancedSpace[]>>;
    searchEnhancedSpaces(query: string, campusId: string): Promise<Result<EnhancedSpace[]>>;
}
//# sourceMappingURL=space.repository.d.ts.map