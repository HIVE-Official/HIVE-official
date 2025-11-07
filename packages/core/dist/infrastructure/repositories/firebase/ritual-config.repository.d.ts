import { Result } from "../../../domain/shared/base/Result";
import { RitualUnion, RitualPhase } from "../../../domain/rituals/archetypes";
import { IRitualConfigRepository } from "../interfaces";
export declare class FirebaseRitualConfigRepository implements IRitualConfigRepository {
    private collectionRef;
    findById(id: string): Promise<Result<RitualUnion>>;
    findBySlug(slug: string, campusId: string): Promise<Result<RitualUnion>>;
    findByCampus(campusId: string, options?: {
        phases?: RitualPhase[];
    }): Promise<Result<RitualUnion[]>>;
    findActive(campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
    findByArchetype(archetype: string, campusId: string): Promise<Result<RitualUnion[]>>;
    findActiveByArchetype(archetype: string, campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
    save(ritual: RitualUnion): Promise<Result<void>>;
    delete(id: string): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
    private timestampToIso;
}
//# sourceMappingURL=ritual-config.repository.d.ts.map