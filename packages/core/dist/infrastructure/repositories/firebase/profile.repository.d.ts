/**
 * Firebase Profile Repository Implementation
 * Handles profile persistence with Firebase
 */
import { IProfileRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Profile } from '../../../domain/profile/aggregates/profile.aggregate';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
export declare class FirebaseProfileRepository implements IProfileRepository {
    private readonly collectionName;
    private readonly connectionsCollection;
    findById(id: ProfileId | any): Promise<Result<Profile>>;
    findByEmail(email: string): Promise<Result<Profile>>;
    findByHandle(handle: string): Promise<Result<Profile>>;
    findByCampus(campusId: string, limitCount?: number): Promise<Result<Profile[]>>;
    exists(handle: string): Promise<boolean>;
    searchByName(searchQuery: string, campusId: string): Promise<Result<Profile[]>>;
    save(profile: Profile): Promise<Result<void>>;
    delete(id: ProfileId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findOnboardedProfiles(maxCount?: number): Promise<Result<Profile[]>>;
    findByInterest(interest: string, limitCount?: number): Promise<Result<Profile[]>>;
    findByMajor(major: string, limitCount?: number): Promise<Result<Profile[]>>;
    findConnectionsOf(profileId: string): Promise<Result<Profile[]>>;
    getTotalCampusUsers(campusId: string): Promise<Result<number>>;
}
//# sourceMappingURL=profile.repository.d.ts.map