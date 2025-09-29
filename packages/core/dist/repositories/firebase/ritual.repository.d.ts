/**
 * Firebase Ritual Repository
 * Firestore implementation for Ritual domain with participation tracking
 */
import { IRitualRepository } from '../interfaces';
import { Ritual, RitualId, Participation, ProfileId, Result } from '../../domain';
export declare class FirebaseRitualRepository implements IRitualRepository {
    private readonly ritualsCollection;
    private readonly participationCollection;
    save(ritual: Ritual): Promise<Result<void>>;
    findById(ritualId: RitualId): Promise<Result<Ritual>>;
    delete(ritualId: RitualId): Promise<Result<void>>;
    findActive(campusId: string): Promise<Result<Ritual[]>>;
    findByType(ritualType: string, campusId: string): Promise<Result<Ritual[]>>;
    findByParticipant(profileId: ProfileId): Promise<Result<Ritual[]>>;
    findCompleted(campusId: string, limitCount?: number): Promise<Result<Ritual[]>>;
    findActiveByType(ritualType: string, campusId: string): Promise<Result<Ritual>>;
    findUpcoming(campusId: string): Promise<Result<Ritual[]>>;
    saveParticipation(participation: Participation): Promise<Result<void>>;
    findParticipation(ritualId: RitualId, profileId: ProfileId): Promise<Result<Participation>>;
    findLeaderboard(ritualId: RitualId, limitCount?: number): Promise<Result<Participation[]>>;
    subscribeToRitual(ritualId: RitualId, callback: (ritual: Ritual | null) => void): () => void;
    subscribeToActiveRituals(campusId: string, callback: (rituals: Ritual[]) => void): () => void;
    private updateRitualParticipantCount;
    private domainToFirestore;
    private firestoreToDisplay;
    private participationToFirestore;
    private firestoreToParticipation;
}
//# sourceMappingURL=ritual.repository.d.ts.map