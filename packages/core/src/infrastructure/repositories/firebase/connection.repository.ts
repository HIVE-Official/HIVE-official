/**
 * Firebase Connection Repository Implementation
 * Handles social connections between profiles
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { IConnectionRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Connection } from '../../../domain/profile/aggregates/connection';
import { ConnectionId } from '../../../domain/profile/value-objects/connection-id.value';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';

export class FirebaseConnectionRepository implements IConnectionRepository {
  private readonly collectionName = 'connections';

  async findById(id: ConnectionId | any): Promise<Result<Connection>> {
    try {
      const connectionId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, connectionId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<Connection>('Connection not found');
      }

      const data = docSnap.data();
      return this.toDomain(connectionId, data);
    } catch (error) {
      return Result.fail<Connection>(`Failed to find connection: ${error}`);
    }
  }

  async findByProfiles(profileId1: string, profileId2: string): Promise<Result<Connection>> {
    try {
      // Connections use ordered profile IDs, so create consistent query
      const [orderedId1, orderedId2] = [profileId1, profileId2].sort();
      const q = query(
        collection(db, this.collectionName),
        where('profileId1', '==', orderedId1),
        where('profileId2', '==', orderedId2),
        firestoreLimit(1)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Result.fail<Connection>('Connection not found');
      }

      const doc = snapshot.docs[0];
      return this.toDomain(doc.id, doc.data());
    } catch (error) {
      return Result.fail<Connection>(`Failed to find connection: ${error}`);
    }
  }

  async findUserConnections(profileId: string, type?: string): Promise<Result<Connection[]>> {
    try {
      // Get connections where user is either profileId1 or profileId2
      const constraints: any[] = [
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(200)
      ];

      if (type) {
        constraints.unshift(where('type', '==', type));
      }

      // Query connections where user is profileId1
      const q1 = query(
        collection(db, this.collectionName),
        where('profileId1', '==', profileId),
        ...constraints
      );

      // Query connections where user is profileId2
      const q2 = query(
        collection(db, this.collectionName),
        where('profileId2', '==', profileId),
        ...constraints
      );

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]);

      const connections: Connection[] = [];
      const processedIds = new Set<string>();

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

      return Result.ok<Connection[]>(connections);
    } catch (error) {
      return Result.fail<Connection[]>(`Failed to find connections: ${error}`);
    }
  }

  async getConnectionCount(profileId: string, type: string): Promise<number> {
    try {
      const constraints = [
        where('isActive', '==', true),
        where('type', '==', type)
      ];

      // Count connections where user is profileId1
      const q1 = query(
        collection(db, this.collectionName),
        where('profileId1', '==', profileId),
        ...constraints
      );

      // Count connections where user is profileId2
      const q2 = query(
        collection(db, this.collectionName),
        where('profileId2', '==', profileId),
        ...constraints
      );

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]);

      // Use Set to avoid counting duplicates
      const connectionIds = new Set<string>();
      snapshot1.docs.forEach(doc => connectionIds.add(doc.id));
      snapshot2.docs.forEach(doc => connectionIds.add(doc.id));

      return connectionIds.size;
    } catch (error) {
      console.error('Failed to count connections:', error);
      return 0;
    }
  }

  async save(connection: Connection): Promise<Result<void>> {
    try {
      const data = this.toPersistence(connection);
      const docRef = doc(db, this.collectionName, connection.connectionId.value);

      if (connection.createdAt) {
        // Update existing
        await updateDoc(docRef, {
          ...data,
          updatedAt: Timestamp.now()
        });
      } else {
        // Create new
        await setDoc(docRef, {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to save connection: ${error}`);
    }
  }

  async delete(id: ConnectionId | any): Promise<Result<void>> {
    try {
      const connectionId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, connectionId);
      await deleteDoc(docRef);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete connection: ${error}`);
    }
  }

  // Helper methods for domain mapping
  private async toDomain(id: string, data: any): Promise<Result<Connection>> {
    try {
      // Create profile IDs
      const profileId1 = ProfileId.create(data.profileId1);
      if (profileId1.isFailure) {
        return Result.fail<Connection>(profileId1.error!);
      }

      const profileId2 = ProfileId.create(data.profileId2);
      if (profileId2.isFailure) {
        return Result.fail<Connection>(profileId2.error!);
      }

      const requestedBy = ProfileId.create(data.requestedBy);
      if (requestedBy.isFailure) {
        return Result.fail<Connection>(requestedBy.error!);
      }

      // Create connection
      const connectionResult = Connection.create({
        profileId1: profileId1.getValue(),
        profileId2: profileId2.getValue(),
        type: data.type,
        source: data.source,
        requestedBy: requestedBy.getValue()
      }, id);

      if (connectionResult.isFailure) {
        return Result.fail<Connection>(connectionResult.error!);
      }

      return Result.ok<Connection>(connectionResult.getValue());
    } catch (error) {
      return Result.fail<Connection>(`Failed to map to domain: ${error}`);
    }
  }

  private toPersistence(connection: Connection): any {
    return {
      connectionId: connection.connectionId.value,
      profileId1: connection.profileId1.value,
      profileId2: connection.profileId2.value,
      type: connection.type,
      source: connection.source,
      requestedBy: connection.requestedBy.value,
      acceptedBy: connection.acceptedBy?.value,
      isActive: connection.isActive,
      acceptedAt: connection.acceptedAt ? Timestamp.fromDate(connection.acceptedAt) : null,
      rejectedAt: connection.rejectedAt ? Timestamp.fromDate(connection.rejectedAt) : null,
      blockedAt: connection.blockedAt ? Timestamp.fromDate(connection.blockedAt) : null,
      mutualSpaces: connection.mutualSpaces,
      interactionCount: connection.interactionCount,
      metadata: connection.metadata || {}
    };
  }
}