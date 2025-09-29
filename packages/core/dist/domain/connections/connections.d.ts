/**
 * Connections Domain - Student Social Graph
 */
export interface Connection {
    id: string;
    fromUserId: string;
    toUserId: string;
    status: ConnectionStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum ConnectionStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    BLOCKED = "blocked"
}
export interface ConnectionRequest {
    fromUserId: string;
    toUserId: string;
    message?: string;
}
export interface ConnectionResponse {
    connectionId: string;
    accepted: boolean;
    message?: string;
}
export type ConnectionType = 'friend' | 'follower' | 'following';
export interface UserConnections {
    userId: string;
    friends: string[];
    followers: string[];
    following: string[];
    blocked: string[];
    pendingReceived: ConnectionRequest[];
    pendingSent: ConnectionRequest[];
}
//# sourceMappingURL=connections.d.ts.map