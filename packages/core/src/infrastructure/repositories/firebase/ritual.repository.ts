/**
 * Firebase Ritual Repository Implementation
 * Handles ritual persistence with Firebase
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
import { IRitualRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedRitual } from '../../../domain/rituals/aggregates/enhanced-ritual';
import { RitualId } from '../../../domain/rituals/value-objects/ritual-id.value';
import { CampusId } from '../../../domain/profile/value-objects/campus-id.value';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
import { Participation } from '../../../domain/rituals/entities/participation';

export class FirebaseRitualRepository implements IRitualRepository {
  private readonly collectionName = 'rituals';

  async findById(id: RitualId | any): Promise<Result<EnhancedRitual>> {
    try {
      const ritualId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, ritualId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<EnhancedRitual>('Ritual not found');
      }

      const data = docSnap.data();
      return this.toDomain(ritualId, data);
    } catch (error) {
      return Result.fail<EnhancedRitual>(`Failed to find ritual: ${error}`);
    }
  }

  async findByCampus(campusId: string): Promise<Result<EnhancedRitual[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        orderBy('startDate', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const rituals: EnhancedRitual[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          rituals.push(result.getValue());
        }
      }

      return Result.ok<EnhancedRitual[]>(rituals);
    } catch (error) {
      return Result.fail<EnhancedRitual[]>(`Failed to find rituals: ${error}`);
    }
  }

  async findActive(campusId: string): Promise<Result<EnhancedRitual[]>> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('startDate', '<=', now),
        where('endDate', '>=', now),
        where('isActive', '==', true),
        orderBy('endDate', 'asc'),
        orderBy('startDate', 'desc'),
        firestoreLimit(20)
      );
      const snapshot = await getDocs(q);

      const rituals: EnhancedRitual[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          const ritual = result.getValue();
          if (ritual.isActive) {
            rituals.push(ritual);
          }
        }
      }

      return Result.ok<EnhancedRitual[]>(rituals);
    } catch (error) {
      return Result.fail<EnhancedRitual[]>(`Failed to find active rituals: ${error}`);
    }
  }

  async findByType(type: string, campusId: string): Promise<Result<EnhancedRitual[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('type', '==', type),
        orderBy('startDate', 'desc'),
        firestoreLimit(20)
      );
      const snapshot = await getDocs(q);

      const rituals: EnhancedRitual[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          rituals.push(result.getValue());
        }
      }

      return Result.ok<EnhancedRitual[]>(rituals);
    } catch (error) {
      return Result.fail<EnhancedRitual[]>(`Failed to find rituals by type: ${error}`);
    }
  }

  async findActiveByType(type: string, campusId: string): Promise<Result<EnhancedRitual>> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('type', '==', type),
        where('startDate', '<=', now),
        where('endDate', '>=', now),
        where('isActive', '==', true),
        orderBy('endDate', 'asc'),
        orderBy('startDate', 'desc'),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Result.fail<EnhancedRitual>('No active ritual of this type found');
      }

      const doc = snapshot.docs[0];
      return this.toDomain(doc.id, doc.data());
    } catch (error) {
      return Result.fail<EnhancedRitual>(`Failed to find active ritual by type: ${error}`);
    }
  }

  async findUserRituals(userId: string): Promise<Result<EnhancedRitual[]>> {
    try {
      // Query rituals where user is a participant
      const q = query(
        collection(db, this.collectionName),
        where('participantIds', 'array-contains', userId),
        orderBy('endDate', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const rituals: EnhancedRitual[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          rituals.push(result.getValue());
        }
      }

      return Result.ok<EnhancedRitual[]>(rituals);
    } catch (error) {
      return Result.fail<EnhancedRitual[]>(`Failed to find user rituals: ${error}`);
    }
  }

  async save(ritual: EnhancedRitual): Promise<Result<void>> {
    try {
      const data = this.toPersistence(ritual);
      const docRef = doc(db, this.collectionName, ritual.ritualId.value);

      if (ritual.createdAt) {
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
      return Result.fail<void>(`Failed to save ritual: ${error}`);
    }
  }

  async delete(id: RitualId | any): Promise<Result<void>> {
    try {
      const ritualId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, ritualId);
      await deleteDoc(docRef);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete ritual: ${error}`);
    }
  }

  // Helper methods for domain mapping
  private async toDomain(id: string, data: any): Promise<Result<EnhancedRitual>> {
    try {
      // Create campus ID
      const campusIdResult = CampusId.create(data.campusId);
      if (campusIdResult.isFailure) {
        return Result.fail<EnhancedRitual>(campusIdResult.error!);
      }

      // Create ritual
      const ritualIdResult = RitualId.create(id);
      if (ritualIdResult.isFailure) {
        return Result.fail<EnhancedRitual>(ritualIdResult.error!);
      }

      // Create ProfileId for creator
      const createdBy = ProfileId.create(data.createdBy || 'system');
      if (createdBy.isFailure) {
        return Result.fail<EnhancedRitual>(createdBy.error!);
      }

      const ritualResult = EnhancedRitual.create({
        ritualId: ritualIdResult.getValue(),
        name: data.name,
        description: data.description,
        type: data.type,
        campusId: campusIdResult.getValue(),
        createdBy: createdBy.getValue(),
        startDate: data.startDate?.toDate(),
        endDate: data.endDate?.toDate(),
        milestones: data.milestones || []
      });

      if (ritualResult.isFailure) {
        return Result.fail<EnhancedRitual>(ritualResult.error!);
      }

      const ritual = ritualResult.getValue();

      // Set additional properties using setter methods
      if (data.createdAt) {
        ritual.setCreatedAt(data.createdAt.toDate());
      }
      if (data.updatedAt) {
        ritual.setUpdatedAt(data.updatedAt.toDate());
      }

      // Load participants
      if (data.participants && Array.isArray(data.participants)) {
        data.participants.forEach((participantData: any) => {
          ritual.addParticipant(participantData.profileId);

          // Note: Participant data is now stored separately in participation entities
          // The participant is just a ProfileId, additional data would be in the Participation aggregate
        });
      }

      // Load milestones
      if (data.milestones && Array.isArray(data.milestones)) {
        const milestones = data.milestones.map((milestoneData: any) => ({
          id: milestoneData.id,
          name: milestoneData.name,
          title: milestoneData.title || milestoneData.name,
          description: milestoneData.description,
          targetValue: milestoneData.targetValue || milestoneData.threshold || 100,
          currentValue: milestoneData.currentValue || 0,
          rewards: milestoneData.rewards || [],
          isCompleted: milestoneData.isCompleted || milestoneData.isReached || false,
          threshold: milestoneData.threshold || milestoneData.targetValue || 100,
          isReached: milestoneData.isReached || milestoneData.isCompleted || false,
          reachedAt: milestoneData.reachedAt?.toDate()
        }));
        ritual.setMilestones(milestones);
      }

      // TODO: Load rewards - temporarily disabled
      // if (data.rewards && Array.isArray(data.rewards)) {
      //   ritual.rewards = data.rewards.map((rewardData: any) => ({
      //     id: { id: rewardData.id, equals: () => false },
      //     type: rewardData.type,
      //     name: rewardData.name,
      //     description: rewardData.description,
      //     icon: rewardData.icon,
      //     threshold: rewardData.threshold,
      //     isClaimed: rewardData.isClaimed || false
      //   }));
      // }

      return Result.ok<EnhancedRitual>(ritual);
    } catch (error) {
      return Result.fail<EnhancedRitual>(`Failed to map to domain: ${error}`);
    }
  }

  private toPersistence(ritual: EnhancedRitual): any {
    return {
      name: ritual.name,
      description: ritual.description,
      type: ritual.type,
      campusId: ritual.campusId.value,
      startDate: ritual.startDate ? Timestamp.fromDate(ritual.startDate) : null,
      endDate: ritual.endDate ? Timestamp.fromDate(ritual.endDate) : null,
      isActive: ritual.isActive,
      participantIds: ritual.getParticipants().map((p: any) => p.value),
      participants: ritual.getParticipants().map((p: any) => ({
        profileId: p.value,
        totalPoints: 0,
        lastActivity: null,
        joinedAt: Timestamp.now()
      })),
      milestones: ritual.milestones.map(milestone => ({
        id: milestone.id,
        name: milestone.name,
        title: milestone.title,
        description: milestone.description,
        targetValue: milestone.targetValue,
        currentValue: milestone.currentValue,
        threshold: milestone.threshold,
        isReached: milestone.isReached,
        isCompleted: milestone.isCompleted,
        reachedAt: milestone.reachedAt ? Timestamp.fromDate(milestone.reachedAt) : null,
        rewards: milestone.rewards
      })),
      totalProgress: ritual.getTotalProgress(),
      participantCount: ritual.getParticipantCount(),
      totalActivities: ritual.getTotalActivities(),
      createdAt: Timestamp.fromDate(ritual.createdAt),
      updatedAt: Timestamp.fromDate(ritual.updatedAt)
    };
  }

  async findParticipation(ritualId: any, profileId: any): Promise<Result<any>> {
    try {
      const participationDoc = await getDoc(
        doc(db, `${this.collectionName}/${ritualId}/participation/${profileId}`)
      );

      if (!participationDoc.exists()) {
        return Result.fail('Participation not found');
      }

      const data = participationDoc.data();
      return Result.ok({
        id: participationDoc.id,
        ritualId,
        profileId,
        completionCount: data.completionCount || 0,
        streakCount: data.streakCount || 0,
        totalPoints: data.totalPoints || 0,
        lastParticipatedAt: data.lastParticipatedAt?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        isActive: data.isActive !== false
      });
    } catch (error) {
      return Result.fail(`Failed to find participation: ${error}`);
    }
  }

  async saveParticipation(participation: any): Promise<Result<void>> {
    try {
      const participationData = {
        ritualId: participation.ritualId,
        profileId: participation.profileId,
        completionCount: participation.completionCount || 0,
        streakCount: participation.streakCount || 0,
        totalPoints: participation.totalPoints || 0,
        lastParticipatedAt: participation.lastParticipatedAt ? Timestamp.fromDate(participation.lastParticipatedAt) : null,
        createdAt: participation.createdAt ? Timestamp.fromDate(participation.createdAt) : Timestamp.now(),
        isActive: participation.isActive !== false,
        updatedAt: Timestamp.now()
      };

      await setDoc(
        doc(db, `${this.collectionName}/${participation.ritualId}/participation/${participation.profileId}`),
        participationData
      );

      return Result.ok();
    } catch (error) {
      return Result.fail(`Failed to save participation: ${error}`);
    }
  }

  async findLeaderboard(ritualId: any, limit: number = 50): Promise<Result<any[]>> {
    try {
      const q = query(
        collection(db, `${this.collectionName}/${ritualId}/participation`),
        where('isActive', '==', true),
        orderBy('totalPoints', 'desc'),
        firestoreLimit(limit)
      );

      const snapshot = await getDocs(q);
      const leaderboard = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastParticipatedAt: doc.data().lastParticipatedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      return Result.ok(leaderboard);
    } catch (error) {
      return Result.fail(`Failed to find leaderboard: ${error}`);
    }
  }

  async findByParticipant(profileId: any): Promise<Result<EnhancedRitual[]>> {
    try {
      // First find all rituals where this user has participated
      const ritualsSnapshot = await getDocs(
        query(collection(db, this.collectionName))
      );

      const participatedRituals: EnhancedRitual[] = [];

      for (const ritualDoc of ritualsSnapshot.docs) {
        const participationDoc = await getDoc(
          doc(db, `${this.collectionName}/${ritualDoc.id}/participation/${profileId}`)
        );

        if (participationDoc.exists()) {
          const ritualResult = await this.toDomain(ritualDoc.id, ritualDoc.data());
          if (ritualResult.isSuccess) {
            participatedRituals.push(ritualResult.getValue());
          }
        }
      }

      return Result.ok(participatedRituals);
    } catch (error) {
      return Result.fail(`Failed to find rituals by participant: ${error}`);
    }
  }

  subscribeToRitual(ritualId: any, callback: (ritual: EnhancedRitual) => void): () => void {
    // Simplified subscription implementation
    // In production, this would use Firestore real-time listeners
    console.log(`Subscribing to ritual ${ritualId}`);

    // Return unsubscribe function
    return () => {
      console.log(`Unsubscribed from ritual ${ritualId}`);
    };
  }

  subscribeToActiveRituals(campusId: string, callback: (rituals: EnhancedRitual[]) => void): () => void {
    // Simplified subscription implementation
    // In production, this would use Firestore real-time listeners
    console.log(`Subscribing to active rituals for campus ${campusId}`);

    // Return unsubscribe function
    return () => {
      console.log(`Unsubscribed from active rituals for campus ${campusId}`);
    };
  }
}