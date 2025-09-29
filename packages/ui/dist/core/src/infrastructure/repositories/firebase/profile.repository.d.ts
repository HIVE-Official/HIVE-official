/**
 * Firebase Profile Repository Implementation
 * Handles profile persistence with Firebase
 */
import { IProfileRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedProfile } from '../../../domain/profile/aggregates/enhanced-profile';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
export declare class FirebaseProfileRepository implements IProfileRepository {
    private readonly collectionName;
    private readonly connectionsCollection;
    findById(id: ProfileId | any): Promise<Result<EnhancedProfile>>;
    findByEmail(email: string): Promise<Result<EnhancedProfile>>;
    findByHandle(handle: string): Promise<Result<EnhancedProfile>>;
    findByCampus(campusId: string, limitCount?: number): Promise<Result<EnhancedProfile[]>>;
    exists(handle: string): Promise<boolean>;
    searchByName(searchQuery: string, campusId: string): Promise<Result<EnhancedProfile[]>>;
    save(profile: EnhancedProfile): Promise<Result<void>>;
    delete(id: ProfileId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findOnboardedProfiles(maxCount?: number): Promise<Result<EnhancedProfile[]>>;
    findByInterest(interest: string, limitCount?: number): Promise<Result<EnhancedProfile[]>>;
    findByMajor(major: string, limitCount?: number): Promise<Result<EnhancedProfile[]>>;
    findConnectionsOf(profileId: string): Promise<Result<EnhancedProfile[]>>;
    getTotalCampusUsers(campusId: string): Promise<Result<number>>;
}
//# sourceMappingURL=profile.repository.d.ts.map