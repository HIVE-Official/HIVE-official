/**
 * Firebase Ritual Repository Implementation
 * Handles ritual persistence with Firebase
 */
import { IRitualRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Ritual } from '../../../domain/rituals/aggregates/ritual.aggregate';
import { RitualId } from '../../../domain/rituals/value-objects/ritual-id.value';
export declare class FirebaseRitualRepository implements IRitualRepository {
    private readonly collectionName;
    findById(id: RitualId | any): Promise<Result<Ritual>>;
    findByCampus(campusId: string): Promise<Result<Ritual[]>>;
    findActive(campusId: string): Promise<Result<Ritual[]>>;
    findByType(type: string, campusId: string): Promise<Result<Ritual[]>>;
    findActiveByType(type: string, campusId: string): Promise<Result<Ritual>>;
    findUserRituals(userId: string): Promise<Result<Ritual[]>>;
    save(ritual: Ritual): Promise<Result<void>>;
    delete(id: RitualId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findParticipation(ritualId: any, profileId: any): Promise<Result<any>>;
    saveParticipation(participation: any): Promise<Result<void>>;
    findLeaderboard(ritualId: any, limit?: number): Promise<Result<any[]>>;
    findByParticipant(profileId: any): Promise<Result<Ritual[]>>;
    subscribeToRitual(ritualId: any, callback: (ritual: Ritual) => void): () => void;
    subscribeToActiveRituals(campusId: string, callback: (rituals: Ritual[]) => void): () => void;
}
//# sourceMappingURL=ritual.repository.d.ts.map