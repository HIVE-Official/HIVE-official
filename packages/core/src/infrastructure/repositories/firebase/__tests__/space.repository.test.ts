/**
 * Firebase Space Repository Tests
 * Tests for space persistence with Firebase
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseSpaceRepository } from '../space.repository';

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
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

import * as firestore from 'firebase/firestore';

describe('FirebaseSpaceRepository', () => {
  let repository: FirebaseSpaceRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseSpaceRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      await repository.findById('space_123');

      // Assert
      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when space not found', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      const result = await repository.findById('nonexistent_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Space not found');
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findById('error_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find space');
    });
  });

  describe('findByName', () => {
    it('should call Firestore with name and campus query', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      await repository.findByName('Computer Science Club', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('name', '==', 'Computer Science Club');
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.limit).toHaveBeenCalledWith(1);
    });

    it('should return failure when space not found', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      const result = await repository.findByName('Nonexistent Club', 'ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Space not found');
    });
  });

  describe('findByCampus', () => {
    it('should query by campus with correct filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByCampus('ub-buffalo', 50);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should use default limit when not provided', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByCampus('ub-buffalo');

      // Assert
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findByCampus('ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find spaces');
    });
  });

  describe('findByCategory', () => {
    it('should query by category and campus', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByCategory('student_org', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('category', '==', 'student_org');
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
    });
  });

  describe('findUserSpaces', () => {
    it('should query spaces by member array', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findUserSpaces('user_123');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('memberIds', 'array-contains', 'user_123');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('lastActivityAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(100);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findUserSpaces('user_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find user spaces');
    });
  });

  describe('findTrending', () => {
    it('should query trending spaces with score filter', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findTrending('ub-buffalo', 20);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.where).toHaveBeenCalledWith('trendingScore', '>', 0);
      expect(firestore.orderBy).toHaveBeenCalledWith('trendingScore', 'desc');
      expect(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(20);
    });

    it('should use default limit when not provided', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findTrending('ub-buffalo');

      // Assert
      expect(firestore.limit).toHaveBeenCalledWith(20);
    });
  });

  describe('findRecommended', () => {
    it('should query popular spaces', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findRecommended('ub-buffalo', ['tech', 'gaming']);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(10);
    });

    it('should query major-specific spaces when major provided', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findRecommended('ub-buffalo', ['tech'], 'Computer Science');

      // Assert
      // Should be called twice: once for popular, once for major
      expect(firestore.getDocs).toHaveBeenCalledTimes(2);
      expect(firestore.where).toHaveBeenCalledWith('tags', 'array-contains', 'computer science');
      expect(firestore.limit).toHaveBeenCalledWith(5); // major query limit
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findRecommended('ub-buffalo', ['tech']);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find recommended spaces');
    });
  });

  describe('searchSpaces', () => {
    it('should query all active spaces for client-side filtering', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.searchSpaces('computer', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('name');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Search error'));

      // Act
      const result = await repository.searchSpaces('test', 'ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Search failed');
    });
  });

  describe('save', () => {
    it('should handle save errors', async () => {
      // Arrange
      const mockSpace = {
        spaceId: { value: 'space_error' },
        name: { name: 'Test Space' },
        description: { value: 'Test description' },
        category: { value: 'student_org' },
        campusId: { id: 'ub-buffalo' },
        isPublic: true,
        isVerified: false,
        memberCount: 0,
        postCount: 0,
        trendingScore: 0,
        lastActivityAt: new Date(),
        members: [],
        tabs: [],
        widgets: []
      } as any;

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      // Act
      const result = await repository.save(mockSpace);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save space');
    });
  });

  describe('delete', () => {
    it('should delete a space', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      // Act
      const result = await repository.delete('space_delete_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });

    it('should handle delete errors', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));

      // Act
      const result = await repository.delete('space_error');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete space');
    });
  });

  describe('findByType', () => {
    it('should query by type field', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByType('club', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('type', '==', 'club');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
    });
  });

  describe('findByMember', () => {
    it('should delegate to findUserSpaces', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByMember('user_456');

      // Assert
      expect(firestore.where).toHaveBeenCalledWith('memberIds', 'array-contains', 'user_456');
    });
  });

  describe('findPublicSpaces', () => {
    it('should query public spaces only', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findPublicSpaces('ub-buffalo', 100);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('visibility', '==', 'public');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(100);
    });

    it('should use default limit when not provided', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findPublicSpaces('ub-buffalo');

      // Assert
      expect(firestore.limit).toHaveBeenCalledWith(100);
    });
  });
});
