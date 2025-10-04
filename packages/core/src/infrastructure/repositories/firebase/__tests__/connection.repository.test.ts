/**
 * Firebase Connection Repository Tests
 * Tests for social connections persistence
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseConnectionRepository } from '../connection.repository';

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

describe('FirebaseConnectionRepository', () => {
  let repository: FirebaseConnectionRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseConnectionRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      await repository.findById('connection_123');

      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when connection not found', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const result = await repository.findById('nonexistent_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Connection not found');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      const result = await repository.findById('error_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find connection');
    });
  });

  describe('findByProfiles', () => {
    it('should query with ordered profile IDs', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Should sort IDs alphabetically
      await repository.findByProfiles('user_b', 'user_a');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('profileId1', '==', 'user_a');
      expect(firestore.where).toHaveBeenCalledWith('profileId2', '==', 'user_b');
      expect(firestore.limit).toHaveBeenCalledWith(1);
    });

    it('should return failure when connection not found', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      const result = await repository.findByProfiles('user_1', 'user_2');

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Connection not found');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));

      const result = await repository.findByProfiles('user_error', 'user_fail');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find connection');
    });
  });

  describe('findUserConnections', () => {
    it('should query both profileId1 and profileId2', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findUserConnections('user_123');

      // Should be called twice: once for profileId1, once for profileId2
      expect(firestore.getDocs).toHaveBeenCalledTimes(2);
      expect(firestore.where).toHaveBeenCalledWith('profileId1', '==', 'user_123');
      expect(firestore.where).toHaveBeenCalledWith('profileId2', '==', 'user_123');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(200);
    });

    it('should filter by connection type when provided', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findUserConnections('user_123', 'friend');

      expect(firestore.where).toHaveBeenCalledWith('type', '==', 'friend');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));

      const result = await repository.findUserConnections('user_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find connections');
    });
  });

  describe('getConnectionCount', () => {
    it('should count connections from both queries', async () => {
      vi.mocked(firestore.getDocs)
        .mockResolvedValueOnce({
          docs: [{ id: 'conn_1' }, { id: 'conn_2' }]
        } as any)
        .mockResolvedValueOnce({
          docs: [{ id: 'conn_3' }, { id: 'conn_1' }] // conn_1 is duplicate
        } as any);

      const count = await repository.getConnectionCount('user_123', 'friend');

      // Should return 3 (deduped)
      expect(count).toBe(3);
      expect(firestore.getDocs).toHaveBeenCalledTimes(2);
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.where).toHaveBeenCalledWith('type', '==', 'friend');
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Count error'));

      const count = await repository.getConnectionCount('user_error', 'friend');

      expect(count).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith('Failed to count connections:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('save', () => {
    it('should handle save errors', async () => {
      const mockConnection = {
        connectionId: { value: 'conn_error' },
        profileId1: { value: 'user_1' },
        profileId2: { value: 'user_2' },
        type: 'friend',
        source: 'manual',
        requestedBy: { value: 'user_1' },
        isActive: true,
        interactionCount: 0,
        mutualSpaces: [],
        createdAt: null
      } as any;

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      const result = await repository.save(mockConnection);

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save connection');
    });
  });

  describe('delete', () => {
    it('should delete a connection', async () => {
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      const result = await repository.delete('conn_delete_123');

      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });

    it('should handle delete errors', async () => {
      vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));

      const result = await repository.delete('conn_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete connection');
    });
  });
});
