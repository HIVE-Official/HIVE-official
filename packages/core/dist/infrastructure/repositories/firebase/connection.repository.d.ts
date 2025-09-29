/**
 * Firebase Connection Repository Implementation
 * Handles social connections between profiles
 */
import { IConnectionRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Connection } from '../../../domain/profile/aggregates/connection';
import { ConnectionId } from '../../../domain/profile/value-objects/connection-id.value';
export declare class FirebaseConnectionRepository implements IConnectionRepository {
    private readonly collectionName;
    findById(id: ConnectionId | any): Promise<Result<Connection>>;
    findByProfiles(profileId1: string, profileId2: string): Promise<Result<Connection>>;
    findUserConnections(profileId: string, type?: string): Promise<Result<Connection[]>>;
    getConnectionCount(profileId: string, type: string): Promise<number>;
    save(connection: Connection): Promise<Result<void>>;
    delete(id: ConnectionId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
}
//# sourceMappingURL=connection.repository.d.ts.map