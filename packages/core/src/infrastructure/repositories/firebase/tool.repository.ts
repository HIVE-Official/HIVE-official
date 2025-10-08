/**
 * Firebase Tool Repository Implementation
 * Handles tool (HiveLab) persistence with Firebase
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
  Timestamp,
  increment
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { IToolRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Tool, ToolStatus, ToolVisibility } from '../../../domain/tools/aggregates/tool.aggregate';
import { ToolId } from '../../../domain/tools/value-objects/tool-id.value';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
import { SpaceId } from '../../../domain/spaces/value-objects/space-id.value';

export class FirebaseToolRepository implements IToolRepository {
  private readonly collectionName = 'tools';

  async findById(id: ToolId | any): Promise<Result<Tool>> {
    try {
      const toolId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, toolId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<Tool>('Tool not found');
      }

      const data = docSnap.data();
      return this.toDomain(toolId, data);
    } catch (error) {
      return Result.fail<Tool>(`Failed to find tool: ${error}`);
    }
  }

  async findByCreator(profileId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('createdBy', '==', profileId),
        orderBy('updatedAt', 'desc'),
        firestoreLimit(100)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find tools by creator: ${error}`);
    }
  }

  async findBySpace(spaceId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('spaceId', '==', spaceId),
        where('status', 'in', ['published', 'draft']),
        orderBy('updatedAt', 'desc')
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find tools by space: ${error}`);
    }
  }

  async findByStatus(status: string, campusId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', status),
        where('campusId', '==', campusId),
        orderBy('updatedAt', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find tools by status: ${error}`);
    }
  }

  async findByVisibility(visibility: string, campusId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('visibility', '==', visibility),
        where('campusId', '==', campusId),
        where('status', '==', 'published'),
        orderBy('analytics.uses', 'desc'),
        firestoreLimit(50)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find tools by visibility: ${error}`);
    }
  }

  async findPublished(campusId: string, limitCount: number = 20): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'published'),
        where('campusId', '==', campusId),
        where('visibility', 'in', ['campus', 'public']),
        orderBy('publishedAt', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find published tools: ${error}`);
    }
  }

  async findDeployedToSpace(spaceId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('deployedTo', 'array-contains', spaceId),
        where('status', '==', 'published'),
        orderBy('analytics.uses', 'desc')
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find deployed tools: ${error}`);
    }
  }

  async findTrending(campusId: string, limitCount: number = 10): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('status', '==', 'published'),
        orderBy('analytics.uses', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find trending tools: ${error}`);
    }
  }

  async findForkableTools(campusId: string): Promise<Result<Tool[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('status', '==', 'published'),
        where('permissions.canFork', '==', true),
        orderBy('analytics.forks', 'desc'),
        firestoreLimit(30)
      );
      const snapshot = await getDocs(q);

      const tools: Tool[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          tools.push(result.getValue());
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Failed to find forkable tools: ${error}`);
    }
  }

  async searchTools(searchQuery: string, campusId: string): Promise<Result<Tool[]>> {
    try {
      // Firebase doesn't support full-text search natively
      // For MVP, we'll do a simple name/description-based search
      // In production, use Algolia or Elasticsearch
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('status', '==', 'published'),
        orderBy('name'),
        firestoreLimit(50)
      );

      const snapshot = await getDocs(q);
      const tools: Tool[] = [];
      const searchLower = searchQuery.toLowerCase();

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const nameLower = data.name?.toLowerCase() || '';
        const descriptionLower = data.description?.toLowerCase() || '';

        if (nameLower.includes(searchLower) || descriptionLower.includes(searchLower)) {
          const result = await this.toDomain(doc.id, data);
          if (result.isSuccess) {
            tools.push(result.getValue());
          }
        }
      }

      return Result.ok<Tool[]>(tools);
    } catch (error) {
      return Result.fail<Tool[]>(`Tool search failed: ${error}`);
    }
  }

  async recordUse(toolId: string): Promise<Result<void>> {
    try {
      const docRef = doc(db, this.collectionName, toolId);
      await updateDoc(docRef, {
        'analytics.uses': increment(1),
        updatedAt: Timestamp.now()
      });
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to record tool use: ${error}`);
    }
  }

  async save(tool: Tool): Promise<Result<void>> {
    try {
      const data = this.toPersistence(tool);
      const docRef = doc(db, this.collectionName, tool.toolId.value);

      if (tool.createdAt) {
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
      return Result.fail<void>(`Failed to save tool: ${error}`);
    }
  }

  async delete(id: ToolId | any): Promise<Result<void>> {
    try {
      const toolId = typeof id === 'string' ? id : id.value;
      const docRef = doc(db, this.collectionName, toolId);
      await deleteDoc(docRef);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete tool: ${error}`);
    }
  }

  // Helper methods for domain mapping
  private async toDomain(id: string, data: any): Promise<Result<Tool>> {
    try {
      // Create ToolId
      const toolIdResult = ToolId.create(id);
      if (toolIdResult.isFailure) {
        return Result.fail<Tool>(toolIdResult.error!);
      }

      // Create ProfileId for creator
      const creatorIdResult = ProfileId.create(data.createdBy);
      if (creatorIdResult.isFailure) {
        return Result.fail<Tool>(creatorIdResult.error!);
      }

      // Create SpaceId if exists
      let spaceId: SpaceId | undefined;
      if (data.spaceId) {
        const spaceIdResult = SpaceId.create(data.spaceId);
        if (spaceIdResult.isSuccess) {
          spaceId = spaceIdResult.getValue();
        }
      }

      // Create forkedFrom ToolId if exists
      let forkedFrom: ToolId | undefined;
      if (data.forkedFrom) {
        const forkedFromResult = ToolId.create(data.forkedFrom);
        if (forkedFromResult.isSuccess) {
          forkedFrom = forkedFromResult.getValue();
        }
      }

      // Convert deployedTo to SpaceId array
      const deployedTo: SpaceId[] = [];
      if (data.deployedTo && Array.isArray(data.deployedTo)) {
        for (const spaceIdStr of data.deployedTo) {
          const spaceIdResult = SpaceId.create(spaceIdStr);
          if (spaceIdResult.isSuccess) {
            deployedTo.push(spaceIdResult.getValue());
          }
        }
      }

      // Convert canEdit to ProfileId array
      const canEdit: ProfileId[] = [];
      if (data.permissions?.canEdit && Array.isArray(data.permissions.canEdit)) {
        for (const profileIdStr of data.permissions.canEdit) {
          const profileIdResult = ProfileId.create(profileIdStr);
          if (profileIdResult.isSuccess) {
            canEdit.push(profileIdResult.getValue());
          }
        }
      }

      // Create tool
      const toolResult = Tool.create({
        toolId: toolIdResult.getValue(),
        name: data.name,
        description: data.description,
        icon: data.icon,
        createdBy: creatorIdResult.getValue(),
        spaceId,
        forkedFrom,
        elements: data.elements || [],
        version: data.version || '1.0.0',
        status: (data.status as ToolStatus) || 'draft',
        visibility: (data.visibility as ToolVisibility) || 'private',
        permissions: {
          canFork: data.permissions?.canFork || false,
          canEdit,
          requiresApproval: data.permissions?.requiresApproval || false
        }
      });

      if (toolResult.isFailure) {
        return Result.fail<Tool>(toolResult.error!);
      }

      const tool = toolResult.getValue();

      // Set additional properties using setters
      if (deployedTo.length > 0) {
        tool.setDeployedTo(deployedTo);
      }

      if (data.analytics) {
        tool.setAnalytics(data.analytics);
      }

      if (data.createdAt) {
        tool.setCreatedAt(data.createdAt.toDate());
      }

      if (data.updatedAt) {
        tool.setUpdatedAt(data.updatedAt.toDate());
      }

      if (data.publishedAt) {
        tool.setPublishedAt(data.publishedAt.toDate());
      }

      return Result.ok<Tool>(tool);
    } catch (error) {
      return Result.fail<Tool>(`Failed to map tool to domain: ${error}`);
    }
  }

  private toPersistence(tool: Tool): any {
    return {
      name: tool.name,
      description: tool.description,
      icon: tool.icon || null,
      createdBy: tool.createdBy.value,
      spaceId: tool.spaceId?.value || null,
      forkedFrom: tool.forkedFrom?.value || null,
      campusId: 'ub-buffalo', // Campus isolation (from spaceId or profile in production)
      elements: tool.elements,
      version: tool.version,
      status: tool.status,
      visibility: tool.visibility,
      deployedTo: tool.deployedTo.map(s => s.value),
      analytics: tool.analytics,
      permissions: {
        canFork: tool.permissions.canFork,
        canEdit: tool.permissions.canEdit.map(p => p.value),
        requiresApproval: tool.permissions.requiresApproval
      },
      publishedAt: tool.publishedAt ? Timestamp.fromDate(tool.publishedAt) : null
    };
  }
}
