/**
 * Firebase Ritual Repository Implementation
 * Handles ritual persistence with Firebase
 */
import { IRitualRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedRitual } from '../../../domain/rituals/aggregates/enhanced-ritual';
import { RitualId } from '../../../domain/rituals/value-objects/ritual-id.value';
export declare class FirebaseRitualRepository implements IRitualRepository {
    private readonly collectionName;
    findById(id: RitualId | any): Promise<Result<EnhancedRitual>>;
    findByCampus(campusId: string): Promise<Result<EnhancedRitual[]>>;
    findActive(campusId: string): Promise<Result<EnhancedRitual[]>>;
    findByType(type: string, campusId: string): Promise<Result<EnhancedRitual[]>>;
    findActiveByType(type: string, campusId: string): Promise<Result<EnhancedRitual>>;
    findUserRituals(userId: string): Promise<Result<EnhancedRitual[]>>;
    save(ritual: EnhancedRitual): Promise<Result<void>>;
    delete(id: RitualId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    findParticipation(ritualId: any, profileId: any): Promise<Result<any>>;
    saveParticipation(participation: any): Promise<Result<void>>;
    findLeaderboard(ritualId: any, limit?: number): Promise<Result<any[]>>;
    findByParticipant(profileId: any): Promise<Result<EnhancedRitual[]>>;
    subscribeToRitual(ritualId: any, callback: (ritual: EnhancedRitual) => void): () => void;
    subscribeToActiveRituals(campusId: string, callback: (rituals: EnhancedRitual[]) => void): () => void;
}
//# sourceMappingURL=ritual.repository.d.ts.map