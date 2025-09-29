"use strict";
/**
 * HIVE Connection Service
 * Handles automatic connection detection and friend request management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionService = exports.ConnectionService = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const connections_1 = require("../domain/connections/connections");
class ConnectionService {
    constructor() {
        this.connectionsCollection = 'connections';
        this.friendsCollection = 'friends';
        this.requestsCollection = 'friend_requests';
    }
    /**
     * Detect and create automatic connections based on affiliations
     */
    async detectConnections(userId, userProfile, rules = connections_1.DEFAULT_CONNECTION_RULES) {
        const detectedConnections = [];
        const batch = (0, firestore_1.writeBatch)(firebase_1.db);
        // 1. Find users with same major
        if (rules.triggers.sameMajor && userProfile.academic.major) {
            const majorQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'users'), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), // Campus isolation
            (0, firestore_1.where)('academic.major', '==', userProfile.academic.major), (0, firestore_1.limit)(100));
            const majorUsers = await (0, firestore_1.getDocs)(majorQuery);
            majorUsers.forEach(doc => {
                if (doc.id !== userId) {
                    const connection = this.createConnection(doc.id, ['same_major'], rules);
                    detectedConnections.push(connection);
                }
            });
        }
        // 2. Find users in same year
        if (rules.triggers.sameYear && userProfile.academic.graduationYear) {
            const yearQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'users'), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.where)('academic.graduationYear', '==', userProfile.academic.graduationYear), (0, firestore_1.limit)(50));
            const yearUsers = await (0, firestore_1.getDocs)(yearQuery);
            yearUsers.forEach(doc => {
                if (doc.id !== userId) {
                    const existingConnection = detectedConnections.find(c => c.userId === doc.id);
                    if (existingConnection) {
                        // Add to existing connection sources
                        existingConnection.sources.push('same_year');
                        existingConnection.strength = this.calculateStrength(existingConnection.sources, rules);
                    }
                    else {
                        const connection = this.createConnection(doc.id, ['same_year'], rules);
                        detectedConnections.push(connection);
                    }
                }
            });
        }
        // 3. Find users in same spaces
        if (rules.triggers.sameSpace) {
            const userSpacesQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'spaces'), (0, firestore_1.where)('members', 'array-contains', userId), (0, firestore_1.limit)(20));
            const userSpaces = await (0, firestore_1.getDocs)(userSpacesQuery);
            const spaceIds = userSpaces.docs.map(doc => doc.id);
            // For each space, find other members
            for (const spaceId of spaceIds) {
                const spaceDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, 'spaces', spaceId));
                const members = spaceDoc.data()?.members || [];
                members.forEach((memberId) => {
                    if (memberId !== userId) {
                        const existingConnection = detectedConnections.find(c => c.userId === memberId);
                        if (existingConnection) {
                            if (!existingConnection.sources.includes('same_space')) {
                                existingConnection.sources.push('same_space');
                                existingConnection.strength = this.calculateStrength(existingConnection.sources, rules);
                            }
                        }
                        else {
                            const connection = this.createConnection(memberId, ['same_space'], rules);
                            detectedConnections.push(connection);
                        }
                    }
                });
            }
        }
        // Save all connections to Firestore
        for (const connection of detectedConnections) {
            const connectionRef = (0, firestore_1.doc)(firebase_1.db, `users/${userId}/${this.connectionsCollection}`, connection.userId);
            batch.set(connectionRef, connection);
            // Create reverse connection (bidirectional)
            const reverseConnectionRef = (0, firestore_1.doc)(firebase_1.db, `users/${connection.userId}/${this.connectionsCollection}`, userId);
            batch.set(reverseConnectionRef, {
                ...connection,
                userId: userId // Swap the userId for reverse connection
            });
        }
        await batch.commit();
        return detectedConnections;
    }
    /**
     * Send a friend request to a connected user
     */
    async sendFriendRequest(fromUserId, toUserId, message) {
        // Check if already connected
        const connectionRef = (0, firestore_1.doc)(firebase_1.db, `users/${fromUserId}/${this.connectionsCollection}`, toUserId);
        const connection = await (0, firestore_1.getDoc)(connectionRef);
        if (!connection.exists()) {
            throw new Error('You must be connected to send a friend request');
        }
        // Check if already friends
        const friendRef = (0, firestore_1.doc)(firebase_1.db, `users/${fromUserId}/${this.friendsCollection}`, toUserId);
        const existingFriend = await (0, firestore_1.getDoc)(friendRef);
        if (existingFriend.exists()) {
            throw new Error('You are already friends with this user');
        }
        // Check for existing request
        const existingRequestQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.requestsCollection), (0, firestore_1.where)('fromUserId', '==', fromUserId), (0, firestore_1.where)('toUserId', '==', toUserId), (0, firestore_1.where)('status', '==', 'pending'));
        const existingRequests = await (0, firestore_1.getDocs)(existingRequestQuery);
        if (!existingRequests.empty) {
            throw new Error('Friend request already pending');
        }
        // Create friend request
        const requestId = `${fromUserId}_${toUserId}_${Date.now()}`;
        const friendRequest = {
            id: requestId,
            fromUserId,
            toUserId,
            status: 'pending',
            message,
            createdAt: firestore_1.Timestamp.now()
        };
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, this.requestsCollection, requestId), friendRequest);
        return friendRequest;
    }
    /**
     * Accept a friend request
     */
    async acceptFriendRequest(requestId, userId) {
        const requestRef = (0, firestore_1.doc)(firebase_1.db, this.requestsCollection, requestId);
        const request = await (0, firestore_1.getDoc)(requestRef);
        if (!request.exists()) {
            throw new Error('Friend request not found');
        }
        const requestData = request.data();
        if (requestData.toUserId !== userId) {
            throw new Error('You cannot accept this friend request');
        }
        if (requestData.status !== 'pending') {
            throw new Error('This request has already been responded to');
        }
        const batch = (0, firestore_1.writeBatch)(firebase_1.db);
        // Update request status
        batch.update(requestRef, {
            status: 'accepted',
            respondedAt: firestore_1.Timestamp.now()
        });
        // Create friend relationship (bidirectional)
        const friend1 = {
            userId: requestData.fromUserId,
            friendedAt: firestore_1.Timestamp.now()
        };
        const friend2 = {
            userId: requestData.toUserId,
            friendedAt: firestore_1.Timestamp.now()
        };
        // Add to both users' friends lists
        const friend1Ref = (0, firestore_1.doc)(firebase_1.db, `users/${requestData.toUserId}/${this.friendsCollection}`, requestData.fromUserId);
        batch.set(friend1Ref, friend1);
        const friend2Ref = (0, firestore_1.doc)(firebase_1.db, `users/${requestData.fromUserId}/${this.friendsCollection}`, requestData.toUserId);
        batch.set(friend2Ref, friend2);
        await batch.commit();
    }
    /**
     * Reject a friend request
     */
    async rejectFriendRequest(requestId, userId) {
        const requestRef = (0, firestore_1.doc)(firebase_1.db, this.requestsCollection, requestId);
        const request = await (0, firestore_1.getDoc)(requestRef);
        if (!request.exists()) {
            throw new Error('Friend request not found');
        }
        const requestData = request.data();
        if (requestData.toUserId !== userId) {
            throw new Error('You cannot reject this friend request');
        }
        await (0, firestore_1.updateDoc)(requestRef, {
            status: 'rejected',
            respondedAt: firestore_1.Timestamp.now()
        });
    }
    /**
     * Unfriend a user
     */
    async unfriend(userId, friendId) {
        const batch = (0, firestore_1.writeBatch)(firebase_1.db);
        // Remove from both users' friends lists
        const friend1Ref = (0, firestore_1.doc)(firebase_1.db, `users/${userId}/${this.friendsCollection}`, friendId);
        batch.delete(friend1Ref);
        const friend2Ref = (0, firestore_1.doc)(firebase_1.db, `users/${friendId}/${this.friendsCollection}`, userId);
        batch.delete(friend2Ref);
        await batch.commit();
    }
    /**
     * Get user's complete connection state
     */
    async getUserConnections(userId) {
        // Get automatic connections
        const connectionsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, `users/${userId}/${this.connectionsCollection}`), (0, firestore_1.orderBy)('strength', 'desc'));
        const connectionsSnapshot = await (0, firestore_1.getDocs)(connectionsQuery);
        const connections = connectionsSnapshot.docs.map(doc => doc.data());
        // Get friends
        const friendsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, `users/${userId}/${this.friendsCollection}`), (0, firestore_1.orderBy)('friendedAt', 'desc'));
        const friendsSnapshot = await (0, firestore_1.getDocs)(friendsQuery);
        const friends = friendsSnapshot.docs.map(doc => doc.data());
        // Get sent requests
        const sentRequestsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.requestsCollection), (0, firestore_1.where)('fromUserId', '==', userId), (0, firestore_1.where)('status', '==', 'pending'));
        const sentSnapshot = await (0, firestore_1.getDocs)(sentRequestsQuery);
        const sentRequests = sentSnapshot.docs.map(doc => doc.data());
        // Get received requests
        const receivedRequestsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.requestsCollection), (0, firestore_1.where)('toUserId', '==', userId), (0, firestore_1.where)('status', '==', 'pending'));
        const receivedSnapshot = await (0, firestore_1.getDocs)(receivedRequestsQuery);
        const receivedRequests = receivedSnapshot.docs.map(doc => doc.data());
        // Calculate analytics
        const connectionStrength = connections.length > 0
            ? connections.reduce((sum, c) => sum + c.strength, 0) / connections.length
            : 0;
        const networkSize = new Set([
            ...connections.map(c => c.userId),
            ...friends.map(f => f.userId)
        ]).size;
        return {
            connections,
            connectionCount: connections.length,
            friends,
            friendCount: friends.length,
            sentRequests,
            receivedRequests,
            connectionStrength,
            networkSize,
            mutualConnectionsCount: 0 // Would need more complex calculation
        };
    }
    /**
     * Subscribe to real-time connection updates
     */
    subscribeToConnections(userId, onUpdate) {
        const unsubscribers = [];
        // Subscribe to connections
        const connectionsUnsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, `users/${userId}/${this.connectionsCollection}`), async () => {
            const connections = await this.getUserConnections(userId);
            onUpdate(connections);
        });
        unsubscribers.push(connectionsUnsubscribe);
        // Subscribe to friends
        const friendsUnsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, `users/${userId}/${this.friendsCollection}`), async () => {
            const connections = await this.getUserConnections(userId);
            onUpdate(connections);
        });
        unsubscribers.push(friendsUnsubscribe);
        // Subscribe to received requests
        const receivedUnsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.requestsCollection), (0, firestore_1.where)('toUserId', '==', userId), (0, firestore_1.where)('status', '==', 'pending')), async () => {
            const connections = await this.getUserConnections(userId);
            onUpdate(connections);
        });
        unsubscribers.push(receivedUnsubscribe);
        // Return cleanup function
        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }
    // Helper methods
    createConnection(userId, sources, rules) {
        return {
            userId,
            connectedAt: firestore_1.Timestamp.now(),
            sources,
            strength: this.calculateStrength(sources, rules)
        };
    }
    calculateStrength(sources, rules) {
        let strength = 0;
        sources.forEach(source => {
            strength += rules.strengthWeights[source] || 10;
        });
        return Math.min(strength, 100);
    }
}
exports.ConnectionService = ConnectionService;
// Export singleton instance
exports.connectionService = new ConnectionService();
//# sourceMappingURL=connection-service.js.map