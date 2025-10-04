/**
 * Firebase Space Repository Implementation
 * Handles space persistence with Firebase
 */
import { ISpaceRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Space } from '../../../domain/spaces/aggregates/space.aggregate';
import { SpaceId } from '../../../domain/spaces/value-objects/space-id.value';
export declare class FirebaseSpaceRepository implements ISpaceRepository {
    private readonly collectionName;
    findById(id: SpaceId | any): Promise<Result<Space>>;
    findByName(name: string, campusId: string): Promise<Result<Space>>;
    findByCampus(campusId: string, limitCount?: number): Promise<Result<Space[]>>;
    findByCategory(category: string, campusId: string): Promise<Result<Space[]>>;
    findUserSpaces(userId: string): Promise<Result<Space[]>>;
    findTrending(campusId: string, limitCount?: number): Promise<Result<Space[]>>;
    findRecommended(campusId: string, interests: string[], major?: string): Promise<Result<Space[]>>;
    save(space: Space): Promise<Result<void>>;
    delete(id: SpaceId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findByType(type: string, campusId: string): Promise<Result<Space[]>>;
    findByMember(userId: string): Promise<Result<Space[]>>;
    findPublicSpaces(campusId: string, limit?: number): Promise<Result<Space[]>>;
}
//# sourceMappingURL=space.repository.d.ts.map