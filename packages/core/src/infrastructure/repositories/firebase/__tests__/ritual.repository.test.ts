/**
 * Firebase Ritual Repository Tests
 * Tests for ritual persistence with Firebase
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseRitualRepository } from '../ritual.repository';

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

describe('FirebaseRitualRepository', () => {
  let repository: FirebaseRitualRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseRitualRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      await repository.findById('ritual_123');

      // Assert
      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when ritual not found', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      const result = await repository.findById('nonexistent_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Ritual not found');
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findById('error_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find ritual');
    });
  });

  describe('findByCampus', () => {
    it('should query rituals by campus', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByCampus('ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findByCampus('ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find rituals');
    });
  });

  describe('findActive', () => {
    it('should query active rituals with date filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Mock Timestamp.now() to return a fixed value
      const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
      vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow as any);

      // Act
      await repository.findActive('ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('startDate', '<=', mockNow);
      expect(firestore.where).toHaveBeenCalledWith('endDate', '>=', mockNow);
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('endDate', 'asc');
      expect(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(20);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findActive('ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find active rituals');
    });
  });

  describe('findByType', () => {
    it('should query rituals by type and campus', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByType('short', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('type', '==', 'short');
      expect(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(20);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findByType('anticipatory', 'ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find rituals by type');
    });
  });

  describe('findActiveByType', () => {
    it('should query active ritual by type with date filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
      vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow as any);

      // Act
      await repository.findActiveByType('yearbook', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('type', '==', 'yearbook');
      expect(firestore.where).toHaveBeenCalledWith('startDate', '<=', mockNow);
      expect(firestore.where).toHaveBeenCalledWith('endDate', '>=', mockNow);
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.limit).toHaveBeenCalledWith(1);
    });

    it('should return failure when no active ritual found', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      const result = await repository.findActiveByType('short', 'ub-buffalo');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('No active ritual of this type found');
    });
  });

  describe('findUserRituals', () => {
    it('should query rituals by participant', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findUserRituals('user_123');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('participantIds', 'array-contains', 'user_123');
      expect(firestore.orderBy).toHaveBeenCalledWith('endDate', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findUserRituals('user_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find user rituals');
    });
  });

  describe('save', () => {
    it('should handle save errors', async () => {
      // Arrange
      const mockRitual = {
        ritualId: { value: 'ritual_error' },
        name: 'Test Ritual',
        description: 'Test description',
        type: 'short',
        category: 'social',
        duration: '1 week',
        startDate: new Date(),
        campusId: { value: 'ub-buffalo' },
        targetAudience: 'all',
        status: 'draft',
        visibility: 'public',
        goals: [],
        requirements: [],
        rewards: [],
        getParticipants: () => [],
        getParticipantCount: () => 0,
        participationStats: { total: 0 },
        getTotalProgress: () => 0,
        getCompletionPercentage: () => 0,
        createdAt: null,  // Indicate new ritual (will use setDoc)
        updatedAt: new Date()
      } as any;

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      // Act
      const result = await repository.save(mockRitual);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save ritual');
    });
  });

  describe('delete', () => {
    it('should delete a ritual', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      // Act
      const result = await repository.delete('ritual_delete_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });

    it('should handle delete errors', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));

      // Act
      const result = await repository.delete('ritual_error');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete ritual');
    });
  });

  describe('findParticipation', () => {
    it('should return failure when participation not found', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      const result = await repository.findParticipation('ritual_123', 'user_456');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Participation not found');
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findParticipation('ritual_123', 'user_456');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find participation');
    });
  });

  describe('saveParticipation', () => {
    it('should save participation data', async () => {
      // Arrange
      const mockParticipation = {
        ritualId: 'ritual_123',
        profileId: 'user_456',
        completionCount: 5,
        streakCount: 3,
        totalPoints: 150,
        lastParticipatedAt: new Date(),
        createdAt: new Date(),
        isActive: true
      };

      vi.mocked(firestore.setDoc).mockResolvedValue(undefined);

      // Act
      const result = await repository.saveParticipation(mockParticipation);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(firestore.setDoc).toHaveBeenCalled();
    });

    it('should handle save errors', async () => {
      // Arrange
      const mockParticipation = {
        ritualId: 'ritual_error',
        profileId: 'user_error'
      };

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      // Act
      const result = await repository.saveParticipation(mockParticipation);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save participation');
    });
  });

  describe('findLeaderboard', () => {
    it('should query leaderboard with correct filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findLeaderboard('ritual_123', 50);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('totalPoints', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should use default limit when not provided', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findLeaderboard('ritual_123');

      // Assert
      expect(firestore.limit).toHaveBeenCalledWith(50);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findLeaderboard('ritual_error');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find leaderboard');
    });
  });

  describe('findByParticipant', () => {
    it('should query all rituals and check participation', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByParticipant('user_123');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.collection).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findByParticipant('user_error');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find rituals by participant');
    });
  });

  describe('subscribeToRitual', () => {
    it('should return an unsubscribe function', () => {
      // Arrange
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const callback = vi.fn();

      // Act
      const unsubscribe = repository.subscribeToRitual('ritual_123', callback);

      // Assert
      expect(typeof unsubscribe).toBe('function');
      expect(consoleLogSpy).toHaveBeenCalledWith('Subscribing to ritual ritual_123');

      // Test unsubscribe
      unsubscribe();
      expect(consoleLogSpy).toHaveBeenCalledWith('Unsubscribed from ritual ritual_123');

      consoleLogSpy.mockRestore();
    });
  });

  describe('subscribeToActiveRituals', () => {
    it('should return an unsubscribe function', () => {
      // Arrange
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const callback = vi.fn();

      // Act
      const unsubscribe = repository.subscribeToActiveRituals('ub-buffalo', callback);

      // Assert
      expect(typeof unsubscribe).toBe('function');
      expect(consoleLogSpy).toHaveBeenCalledWith('Subscribing to active rituals for campus ub-buffalo');

      // Test unsubscribe
      unsubscribe();
      expect(consoleLogSpy).toHaveBeenCalledWith('Unsubscribed from active rituals for campus ub-buffalo');

      consoleLogSpy.mockRestore();
    });
  });
});
