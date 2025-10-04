/**
 * Firebase Tool Repository Tests
 * Tests for tool (HiveLab) persistence with Firebase
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseToolRepository } from '../tool.repository';

// Mock Firebase
vi.mock('@hive/firebase', () => ({
  db: {},
  auth: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  increment: vi.fn((val: number) => val),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

import * as firestore from 'firebase/firestore';

describe('FirebaseToolRepository', () => {
  let repository: FirebaseToolRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseToolRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      await repository.findById('tool_123');

      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when tool not found', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const result = await repository.findById('nonexistent_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Tool not found');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      const result = await repository.findById('error_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find tool');
    });
  });

  describe('findByCreator', () => {
    it('should query tools by creator', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findByCreator('user_123');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('createdBy', '==', 'user_123');
      expect(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(100);
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      const result = await repository.findByCreator('user_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find tools by creator');
    });
  });

  describe('findBySpace', () => {
    it('should query tools by space with status filter', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findBySpace('space_123');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('spaceId', '==', 'space_123');
      expect(firestore.where).toHaveBeenCalledWith('status', 'in', ['published', 'draft']);
      expect(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      const result = await repository.findBySpace('space_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find tools by space');
    });
  });

  describe('findByStatus', () => {
    it('should query tools by status and campus', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findByStatus('published', 'ub-buffalo');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });
  });

  describe('findByVisibility', () => {
    it('should query published tools by visibility', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findByVisibility('public', 'ub-buffalo');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('visibility', '==', 'public');
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
    });
  });

  describe('findPublished', () => {
    it('should query published campus/public tools', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findPublished('ub-buffalo', 20);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('visibility', 'in', ['campus', 'public']);
      expect(firestore.orderBy).toHaveBeenCalledWith('publishedAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(20);
    });

    it('should use default limit', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findPublished('ub-buffalo');

      expect(firestore.limit).toHaveBeenCalledWith(20);
    });
  });

  describe('findDeployedToSpace', () => {
    it('should query tools deployed to space', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findDeployedToSpace('space_123');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('deployedTo', 'array-contains', 'space_123');
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
    });
  });

  describe('findTrending', () => {
    it('should query trending tools by usage', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findTrending('ub-buffalo', 10);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(10);
    });

    it('should use default limit', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findTrending('ub-buffalo');

      expect(firestore.limit).toHaveBeenCalledWith(10);
    });
  });

  describe('findForkableTools', () => {
    it('should query forkable published tools', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findForkableTools('ub-buffalo');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.where).toHaveBeenCalledWith('permissions.canFork', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('analytics.forks', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(30);
    });
  });

  describe('searchTools', () => {
    it('should query all published tools for client-side search', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.searchTools('poll', 'ub-buffalo');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
      expect(firestore.orderBy).toHaveBeenCalledWith('name');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle search errors', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Search error'));

      const result = await repository.searchTools('test', 'ub-buffalo');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Tool search failed');
    });
  });

  describe('recordUse', () => {
    it('should increment usage analytics', async () => {
      vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);

      const result = await repository.recordUse('tool_123');

      expect(result.isSuccess).toBe(true);
      expect(firestore.updateDoc).toHaveBeenCalled();
      expect(firestore.increment).toHaveBeenCalledWith(1);
    });

    it('should handle record errors', async () => {
      vi.mocked(firestore.updateDoc).mockRejectedValue(new Error('Update failed'));

      const result = await repository.recordUse('tool_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to record tool use');
    });
  });

  describe('save', () => {
    it('should handle save errors', async () => {
      const mockTool = {
        toolId: { value: 'tool_error' },
        name: 'Test Tool',
        description: 'Test description',
        createdBy: { value: 'user_123' },
        spaceId: { value: 'space_123' },
        elements: [],
        version: '1.0.0',
        status: 'draft',
        visibility: 'private',
        deployedTo: [],
        analytics: { uses: 0, forks: 0 },
        permissions: {
          canFork: false,
          canEdit: [],
          requiresApproval: false
        },
        createdAt: null
      } as any;

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      const result = await repository.save(mockTool);

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save tool');
    });
  });

  describe('delete', () => {
    it('should delete a tool', async () => {
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      const result = await repository.delete('tool_delete_123');

      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });

    it('should handle delete errors', async () => {
      vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));

      const result = await repository.delete('tool_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete tool');
    });
  });
});
