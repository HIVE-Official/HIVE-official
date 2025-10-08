/**
 * Firebase Space Repository Implementation
 * Handles space persistence with Firebase
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
import { ISpaceRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Space } from '../../../domain/spaces/aggregates/space.aggregate';
import { SpaceId } from '../../../domain/spaces/value-objects/space-id.value';
import { SpaceName } from '../../../domain/spaces/value-objects/space-name.value';
import { SpaceDescription } from '../../../domain/spaces/value-objects/space-description.value';
import { SpaceCategory } from '../../../domain/spaces/value-objects/space-category.value';
import { CampusId } from '../../../domain/profile/value-objects/campus-id.value';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
import { Tab } from '../../../domain/spaces/entities/tab';
import { Widget } from '../../../domain/spaces/entities/widget';

export class FirebaseSpaceRepository implements ISpaceRepository {
  private readonly collectionName = 'spaces';

  async findById(id: SpaceId | any): Promise<Result<Space>> {
    try {
      const spaceId = typeof id === 'string' ? id : id.id;
      const docRef = doc(db, this.collectionName, spaceId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<Space>('Space not found');
      }

      const data = docSnap.data();
      return this.toDomain(spaceId, data);
    } catch (error) {
      return Result.fail<Space>(`Failed to find space: ${error}`);
    }
  }

  async findByName(name: string, campusId: string): Promise<Result<Space>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('name', '==', name),
        where('campusId', '==', campusId),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Result.fail<Space>('Space not found');
      }

      const doc = snapshot.docs[0];
      return this.toDomain(doc.id, doc.data());
    } catch (error) {
      return Result.fail<Space>(`Failed to find space: ${error}`);
    }
  }

  async findByCampus(campusId: string, limitCount: number = 50): Promise<Result<Space[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('memberCount', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find spaces: ${error}`);
    }
  }

  async findByCategory(category: string, campusId: string): Promise<Result<Space[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('memberCount', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find spaces: ${error}`);
    }
  }

  async findUserSpaces(userId: string): Promise<Result<Space[]>> {
    try {
      // Query spaces where user is a member
      const q = query(
        collection(db, this.collectionName),
        where('memberIds', 'array-contains', userId),
        where('isActive', '==', true),
        orderBy('lastActivityAt', 'desc'),
        firestoreLimit(100)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find user spaces: ${error}`);
    }
  }

  async findTrending(campusId: string, limitCount: number = 20): Promise<Result<Space[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        where('trendingScore', '>', 0),
        orderBy('trendingScore', 'desc'),
        orderBy('memberCount', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find trending spaces: ${error}`);
    }
  }

  async findRecommended(campusId: string, interests: string[], major?: string): Promise<Result<Space[]>> {
    try {
      // For MVP, recommend based on member count and category
      // In production, this would use a recommendation engine
      const spaces: Space[] = [];

      // Get popular spaces
      const popularQuery = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('memberCount', 'desc'),
        firestoreLimit(10)
      );
      const popularSnapshot = await getDocs(popularQuery);

      for (const doc of popularSnapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      // Get spaces matching major if provided
      if (major) {
        const majorQuery = query(
          collection(db, this.collectionName),
          where('campusId', '==', campusId),
          where('tags', 'array-contains', major.toLowerCase()),
          where('isActive', '==', true),
          firestoreLimit(5)
        );
        const majorSnapshot = await getDocs(majorQuery);

        for (const doc of majorSnapshot.docs) {
          const result = await this.toDomain(doc.id, doc.data());
          if (result.isSuccess && !spaces.find(s => s.spaceId.value === doc.id)) {
            spaces.push(result.getValue());
          }
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find recommended spaces: ${error}`);
    }
  }

  async searchSpaces(searchQuery: string, campusId: string): Promise<Result<Space[]>> {
    try {
      // Firebase doesn't support full-text search natively
      // For MVP, we'll do a simple name-based search
      // In production, use Algolia or Elasticsearch
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('name'),
        firestoreLimit(50)
      );

      const snapshot = await getDocs(q);
      const spaces: Space[] = [];
      const searchLower = searchQuery.toLowerCase();

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const nameLower = data.name?.toLowerCase() || '';
        const descriptionLower = data.description?.toLowerCase() || '';

        if (nameLower.includes(searchLower) || descriptionLower.includes(searchLower)) {
          const result = await this.toDomain(doc.id, data);
          if (result.isSuccess) {
            spaces.push(result.getValue());
          }
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Search failed: ${error}`);
    }
  }

  async save(space: Space): Promise<Result<void>> {
    try {
      const data = this.toPersistence(space);
      const docRef = doc(db, this.collectionName, space.spaceId.value);

      if (space.createdAt) {
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
      return Result.fail<void>(`Failed to save space: ${error}`);
    }
  }

  async delete(id: SpaceId | any): Promise<Result<void>> {
    try {
      const spaceId = typeof id === 'string' ? id : id.id;
      const docRef = doc(db, this.collectionName, spaceId);
      await deleteDoc(docRef);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete space: ${error}`);
    }
  }

  // Helper methods for domain mapping
  private async toDomain(id: string, data: any): Promise<Result<Space>> {
    try {
      // Create value objects
      const nameResult = SpaceName.create(data.name);
      if (nameResult.isFailure) {
        return Result.fail<Space>(nameResult.error!);
      }

      const descriptionResult = SpaceDescription.create(data.description);
      if (descriptionResult.isFailure) {
        return Result.fail<Space>(descriptionResult.error!);
      }

      const categoryResult = SpaceCategory.create(data.category);
      if (categoryResult.isFailure) {
        return Result.fail<Space>(categoryResult.error!);
      }

      const campusIdResult = CampusId.create(data.campusId);
      if (campusIdResult.isFailure) {
        return Result.fail<Space>(campusIdResult.error!);
      }

      // Create ProfileId for creator
      const creatorId = ProfileId.create(data.creatorId);
      if (creatorId.isFailure) {
        return Result.fail<Space>(creatorId.error!);
      }

      // Create SpaceId
      const spaceId = SpaceId.create(id);
      if (spaceId.isFailure) {
        return Result.fail<Space>(spaceId.error!);
      }

      // Create space
      const spaceResult = Space.create({
        spaceId: spaceId.getValue(),
        name: nameResult.getValue(),
        description: descriptionResult.getValue(),
        category: categoryResult.getValue(),
        createdBy: creatorId.getValue(),
        campusId: campusIdResult.getValue(),
        visibility: data.visibility === 'private' ? 'private' : 'public'
      });

      if (spaceResult.isFailure) {
        return Result.fail<Space>(spaceResult.error!);
      }

      const space = spaceResult.getValue();

      // Set additional properties using setters
      space.setIsVerified(data.isVerified || false);
      space.setMemberCount(data.memberCount || 0);
      space.setPostCount(data.postCount || 0);
      space.setTrendingScore(data.trendingScore || 0);
      space.setLastActivityAt(data.lastActivityAt?.toDate() || new Date());
      if (data.createdAt) space.setCreatedAt(data.createdAt.toDate());
      if (data.updatedAt) space.setUpdatedAt(data.updatedAt.toDate());

      // Load tabs
      if (data.tabs && Array.isArray(data.tabs)) {
        const tabs = data.tabs.map((tabData: any) => {
          const tab = Tab.create({
            name: tabData.title || tabData.name,
            type: tabData.type || 'feed',
            isDefault: tabData.isDefault || false,
            order: tabData.order || 0,
            widgets: tabData.widgets || [],
            isVisible: tabData.isVisible !== false,
            title: tabData.title || tabData.name,
            originPostId: tabData.originPostId,
            messageCount: tabData.messageCount || 0,
            createdAt: tabData.createdAt?.toDate() || new Date(),
            lastActivityAt: tabData.lastActivityAt?.toDate(),
            expiresAt: tabData.expiresAt?.toDate(),
            isArchived: tabData.isArchived || false
          }, tabData.id);
          return tab.isSuccess ? tab.getValue() : null;
        }).filter(Boolean);
        space.setTabs(tabs);
      }

      // Load widgets
      if (data.widgets && Array.isArray(data.widgets)) {
        const widgets = data.widgets.map((widgetData: any) => {
          const widget = Widget.create(
            widgetData.type,
            widgetData.config
          );
          return widget.isSuccess ? widget.getValue() : null;
        }).filter(Boolean);
        space.setWidgets(widgets);
      }

      return Result.ok<Space>(space);
    } catch (error) {
      return Result.fail<Space>(`Failed to map to domain: ${error}`);
    }
  }

  private toPersistence(space: Space): any {
    return {
      name: space.name.name,
      description: space.description.value,
      category: space.category.value,
      campusId: space.campusId.id,
      creatorId: space.spaceId.value, // Use spaceId since creatorId doesn't exist
      visibility: space.isPublic ? 'public' : 'private',
      isVerified: space.isVerified,
      memberCount: space.memberCount,
      postCount: space.postCount,
      trendingScore: space.trendingScore,
      lastActivityAt: space.lastActivityAt ? Timestamp.fromDate(space.lastActivityAt) : null,
      isActive: true,
      memberIds: space.members.map(m => m.profileId.value),
      tabs: space.tabs.map(tab => ({
        id: tab.id,
        title: tab.title,
        name: tab.name,
        type: tab.type,
        originPostId: tab.originPostId || null,
        messageCount: tab.messageCount,
        createdAt: tab.createdAt,
        lastActivityAt: tab.lastActivityAt,
        expiresAt: tab.expiresAt,
        isArchived: tab.isArchived,
        isDefault: tab.isDefault,
        order: tab.order,
        widgets: tab.widgets,
        isVisible: tab.isVisible
      })),
      widgets: space.widgets.map(widget => ({
        id: widget.id,
        type: widget.type,
        config: widget.config,
        position: widget.position,
        isEnabled: widget.isEnabled
      })),
      tags: [], // Would be extracted from description/name
      rushModeEnabled: space.rushMode?.isActive || false,
      rushModeEndDate: space.rushMode?.endDate
    };
  }

  // Additional methods required by interface
  async findByType(type: string, campusId: string): Promise<Result<Space[]>> {
    try {
      // Type could be a sub-category or feature type
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('type', '==', type),
        where('isActive', '==', true),
        orderBy('memberCount', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      // If 'type' field doesn't exist, fallback to category
      console.warn(`Falling back to category search for type ${type}`, error);
      return this.findByCategory(type, campusId);
    }
  }

  async findByMember(userId: string): Promise<Result<Space[]>> {
    // This is the same as findUserSpaces, just delegate
    return this.findUserSpaces(userId);
  }

  async findPublicSpaces(campusId: string, limit: number = 100): Promise<Result<Space[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('visibility', '==', 'public'),
        where('isActive', '==', true),
        orderBy('memberCount', 'desc'),
        firestoreLimit(limit)
      );
      const snapshot = await getDocs(q);

      const spaces: Space[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          spaces.push(result.getValue());
        }
      }

      return Result.ok<Space[]>(spaces);
    } catch (error) {
      return Result.fail<Space[]>(`Failed to find public spaces: ${error}`);
    }
  }
}
