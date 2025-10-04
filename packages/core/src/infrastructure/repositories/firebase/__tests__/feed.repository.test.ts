/**
 * Firebase Feed Repository Tests
 * Tests for feed persistence and retrieval
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseFeedRepository } from '../feed.repository';

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
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

import * as firestore from 'firebase/firestore';

describe('FirebaseFeedRepository', () => {
  let repository: FirebaseFeedRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseFeedRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      await repository.findById('feed_123');

      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when feed not found', async () => {
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const result = await repository.findById('nonexistent_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Feed not found');
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      const result = await repository.findById('error_123');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find feed');
    });
  });

  describe('findByUserId', () => {
    it('should query feed by user ID', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Mock getDoc for user profile lookup
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ campusId: 'ub-buffalo' })
      } as any);

      await repository.findByUserId('user_123');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('userId', '==', 'user_123');
      expect(firestore.limit).toHaveBeenCalledWith(1);
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      const result = await repository.findByUserId('user_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find user feed');
    });
  });

  describe('findByCampus', () => {
    it('should query feeds by campus', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.findByCampus('ub-buffalo');

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
      expect(firestore.limit).toHaveBeenCalledWith(100);
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      const result = await repository.findByCampus('ub-buffalo');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find campus feeds');
    });
  });

  describe('addFeedItem', () => {
    it('should add item and update feed timestamp', async () => {
      vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'item_123' } as any);
      vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);

      const mockItem = {
        type: 'post',
        content: { text: 'Test post' },
        campusId: 'ub-buffalo'
      };

      const result = await repository.addFeedItem('feed_123', mockItem);

      expect(result.isSuccess).toBe(true);
      expect(firestore.addDoc).toHaveBeenCalled();
      expect(firestore.updateDoc).toHaveBeenCalled();
    });

    it('should handle add errors', async () => {
      vi.mocked(firestore.addDoc).mockRejectedValue(new Error('Add failed'));

      const result = await repository.addFeedItem('feed_error', {});

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to add feed item');
    });
  });

  describe('removeFeedItem', () => {
    it('should remove item and update feed', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: false,
        docs: [{ ref: 'mockRef' }]
      } as any);
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
      vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);

      const result = await repository.removeFeedItem('feed_123', 'item_456');

      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
      expect(firestore.updateDoc).toHaveBeenCalled();
    });

    it('should handle remove errors', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Remove failed'));

      const result = await repository.removeFeedItem('feed_error', 'item_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to remove feed item');
    });
  });

  describe('delete', () => {
    it('should delete feed items and feed document', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: [{ ref: 'item1' }, { ref: 'item2' }]
      } as any);
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      const result = await repository.delete('feed_delete_123');

      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3); // 2 items + 1 feed
    });

    it('should handle delete errors', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Delete failed'));

      const result = await repository.delete('feed_error');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete feed');
    });
  });

  describe('getFeedContent', () => {
    it('should query posts from spaces and connections', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.getFeedContent('user_123', ['space_1', 'space_2'], ['conn_1'], 50);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('spaceId', 'in', ['space_1', 'space_2']);
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));

      // Pass non-empty arrays to trigger the query
      const result = await repository.getFeedContent('user_error', ['space_1'], ['conn_1'], 50);

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to get feed content');
    });
  });

  describe('getTrendingContent', () => {
    it('should query trending posts', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.getTrendingContent('ub-buffalo', 20);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('trendingScore', '>', 0);
      expect(firestore.orderBy).toHaveBeenCalledWith('trendingScore', 'desc');
    });
  });

  describe('getEventContent', () => {
    it('should query upcoming events', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
      vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow as any);

      await repository.getEventContent('ub-buffalo', 20);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('startTime', '>=', mockNow);
      expect(firestore.orderBy).toHaveBeenCalledWith('startTime', 'asc');
    });
  });

  describe('getRitualContent', () => {
    it('should query active rituals', async () => {
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      await repository.getRitualContent('ub-buffalo', 20);

      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('nextOccurrence', 'asc');
    });
  });

  describe('recordInteraction', () => {
    it('should record user interaction', async () => {
      vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'interaction_123' } as any);

      const result = await repository.recordInteraction('user_123', 'item_456', 'like', { value: 1 });

      expect(result.isSuccess).toBe(true);
      expect(firestore.addDoc).toHaveBeenCalled();
    });

    it('should handle record errors', async () => {
      vi.mocked(firestore.addDoc).mockRejectedValue(new Error('Record failed'));

      const result = await repository.recordInteraction('user_error', 'item_error', 'like');

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to record interaction');
    });
  });

  describe('subscribeToFeed', () => {
    it('should return an unsubscribe function', () => {
      const mockUnsubscribe = vi.fn();
      vi.mocked(firestore.onSnapshot).mockReturnValue(mockUnsubscribe);

      const callback = vi.fn();
      const unsubscribe = repository.subscribeToFeed('user_123', callback);

      expect(typeof unsubscribe).toBe('function');
      expect(firestore.onSnapshot).toHaveBeenCalled();

      // Test unsubscribe
      unsubscribe();
      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });
});
