/**
 * Firebase Profile Repository
 * Firestore implementation for Profile domain
 */
import { IProfileRepository } from '../interfaces';
import { Profile, ProfileId, Handle, UBEmail, Result } from '../../domain';
export declare class FirebaseProfileRepository implements IProfileRepository {
    private readonly collectionName;
    save(profile: Profile): Promise<Result<void>>;
    findById(profileId: ProfileId): Promise<Result<Profile>>;
    findByEmail(email: UBEmail): Promise<Result<Profile>>;
    findByHandle(handle: Handle): Promise<Result<Profile>>;
    delete(profileId: ProfileId): Promise<Result<void>>;
    findConnectionsOf(profileId: ProfileId): Promise<Result<Profile[]>>;
    findByInterest(interest: string, limitCount?: number): Promise<Result<Profile[]>>;
    findByMajor(major: string, limitCount?: number): Promise<Result<Profile[]>>;
    findOnboardedProfiles(maxCount?: number): Promise<Result<Profile[]>>;
    findByCampus(campusId: string, limitCount?: number): Promise<Result<Profile[]>>;
    getTotalCampusUsers(campusId: string): Promise<Result<number>>;
    subscribeToProfile(profileId: ProfileId, callback: (profile: Profile | null) => void): () => void;
    private domainToFirestore;
    private firestoreToDisplay;
}
//# sourceMappingURL=profile.repository.d.ts.map