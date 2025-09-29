/**
 * HIVE Connection Service
 * Handles automatic connection detection and friend request management
 */
import type { Connection, FriendRequest, UserConnections, ConnectionRules } from '../domain/connections/connections';
import type { HiveProfile } from '../domain/profile/profile';
export declare class ConnectionService {
    private readonly connectionsCollection;
    private readonly friendsCollection;
    private readonly requestsCollection;
    /**
     * Detect and create automatic connections based on affiliations
     */
    detectConnections(userId: string, userProfile: HiveProfile, rules?: ConnectionRules): Promise<Connection[]>;
    /**
     * Send a friend request to a connected user
     */
    sendFriendRequest(fromUserId: string, toUserId: string, message?: string): Promise<FriendRequest>;
    /**
     * Accept a friend request
     */
    acceptFriendRequest(requestId: string, userId: string): Promise<void>;
    /**
     * Reject a friend request
     */
    rejectFriendRequest(requestId: string, userId: string): Promise<void>;
    /**
     * Unfriend a user
     */
    unfriend(userId: string, friendId: string): Promise<void>;
    /**
     * Get user's complete connection state
     */
    getUserConnections(userId: string): Promise<UserConnections>;
    /**
     * Subscribe to real-time connection updates
     */
    subscribeToConnections(userId: string, onUpdate: (connections: UserConnections) => void): () => void;
    private createConnection;
    private calculateStrength;
}
export declare const connectionService: ConnectionService;
//# sourceMappingURL=connection-service.d.ts.map