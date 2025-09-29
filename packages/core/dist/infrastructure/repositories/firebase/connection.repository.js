"use strict";
/**
 * Firebase Connection Repository Implementation
 * Handles social connections between profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseConnectionRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const connection_1 = require("../../../domain/profile/aggregates/connection");
const profile_id_value_1 = require("../../../domain/profile/value-objects/profile-id.value");
class FirebaseConnectionRepository {
    constructor() {
        this.collectionName = 'connections';
    }
    async findById(id) {
        try {
            const connectionId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, connectionId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Connection not found');
            }
            const data = docSnap.data();
            return this.toDomain(connectionId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find connection: ${error}`);
        }
    }
    async findByProfiles(profileId1, profileId2) {
        try {
            // Connections use ordered profile IDs, so create consistent query
            const [orderedId1, orderedId2] = [profileId1, profileId2].sort();
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('profileId1', '==', orderedId1), (0, firestore_1.where)('profileId2', '==', orderedId2), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail('Connection not found');
            }
            const doc = snapshot.docs[0];
            return this.toDomain(doc.id, doc.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find connection: ${error}`);
        }
    }
    async findUserConnections(profileId, type) {
        try {
            // Get connections where user is either profileId1 or profileId2
            const constraints = [
                (0, firestore_1.where)('isActive', '==', true),
                (0, firestore_1.orderBy)('createdAt', 'desc'),
                (0, firestore_1.limit)(200)
            ];
            if (type) {
                constraints.unshift((0, firestore_1.where)('type', '==', type));
            }
            // Query connections where user is profileId1
            const q1 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('profileId1', '==', profileId), ...constraints);
            // Query connections where user is profileId2
            const q2 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('profileId2', '==', profileId), ...constraints);
            const [snapshot1, snapshot2] = await Promise.all([
                (0, firestore_1.getDocs)(q1),
                (0, firestore_1.getDocs)(q2)
            ]);
            const connections = [];
            const processedIds = new Set();
            // Process connections where user is profileId1
            for (const doc of snapshot1.docs) {
                if (!processedIds.has(doc.id)) {
                    const result = await this.toDomain(doc.id, doc.data());
                    if (result.isSuccess) {
                        connections.push(result.getValue());
                        processedIds.add(doc.id);
                    }
                }
            }
            // Process connections where user is profileId2
            for (const doc of snapshot2.docs) {
                if (!processedIds.has(doc.id)) {
                    const result = await this.toDomain(doc.id, doc.data());
                    if (result.isSuccess) {
                        connections.push(result.getValue());
                        processedIds.add(doc.id);
                    }
                }
            }
            return Result_1.Result.ok(connections);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find connections: ${error}`);
        }
    }
    async getConnectionCount(profileId, type) {
        try {
            const constraints = [
                (0, firestore_1.where)('isActive', '==', true),
                (0, firestore_1.where)('type', '==', type)
            ];
            // Count connections where user is profileId1
            const q1 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('profileId1', '==', profileId), ...constraints);
            // Count connections where user is profileId2
            const q2 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('profileId2', '==', profileId), ...constraints);
            const [snapshot1, snapshot2] = await Promise.all([
                (0, firestore_1.getDocs)(q1),
                (0, firestore_1.getDocs)(q2)
            ]);
            // Use Set to avoid counting duplicates
            const connectionIds = new Set();
            snapshot1.docs.forEach(doc => connectionIds.add(doc.id));
            snapshot2.docs.forEach(doc => connectionIds.add(doc.id));
            return connectionIds.size;
        }
        catch (error) {
            console.error('Failed to count connections:', error);
            return 0;
        }
    }
    async save(connection) {
        try {
            const data = this.toPersistence(connection);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, connection.connectionId.value);
            if (connection.createdAt) {
                // Update existing
                await (0, firestore_1.updateDoc)(docRef, {
                    ...data,
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            else {
                // Create new
                await (0, firestore_1.setDoc)(docRef, {
                    ...data,
                    createdAt: firestore_1.Timestamp.now(),
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to save connection: ${error}`);
        }
    }
    async delete(id) {
        try {
            const connectionId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, connectionId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete connection: ${error}`);
        }
    }
    // Helper methods for domain mapping
    async toDomain(id, data) {
        try {
            // Create profile IDs
            const profileId1 = profile_id_value_1.ProfileId.create(data.profileId1);
            if (profileId1.isFailure) {
                return Result_1.Result.fail(profileId1.error);
            }
            const profileId2 = profile_id_value_1.ProfileId.create(data.profileId2);
            if (profileId2.isFailure) {
                return Result_1.Result.fail(profileId2.error);
            }
            const requestedBy = profile_id_value_1.ProfileId.create(data.requestedBy);
            if (requestedBy.isFailure) {
                return Result_1.Result.fail(requestedBy.error);
            }
            // Create connection
            const connectionResult = connection_1.Connection.create({
                profileId1: profileId1.getValue(),
                profileId2: profileId2.getValue(),
                type: data.type,
                source: data.source,
                requestedBy: requestedBy.getValue()
            }, id);
            if (connectionResult.isFailure) {
                return Result_1.Result.fail(connectionResult.error);
            }
            return Result_1.Result.ok(connectionResult.getValue());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(connection) {
        return {
            connectionId: connection.connectionId.value,
            profileId1: connection.profileId1.value,
            profileId2: connection.profileId2.value,
            type: connection.type,
            source: connection.source,
            requestedBy: connection.requestedBy.value,
            acceptedBy: connection.acceptedBy?.value,
            isActive: connection.isActive,
            acceptedAt: connection.acceptedAt ? firestore_1.Timestamp.fromDate(connection.acceptedAt) : null,
            rejectedAt: connection.rejectedAt ? firestore_1.Timestamp.fromDate(connection.rejectedAt) : null,
            blockedAt: connection.blockedAt ? firestore_1.Timestamp.fromDate(connection.blockedAt) : null,
            mutualSpaces: connection.mutualSpaces,
            interactionCount: connection.interactionCount,
            metadata: connection.metadata || {}
        };
    }
}
exports.FirebaseConnectionRepository = FirebaseConnectionRepository;
//# sourceMappingURL=connection.repository.js.map