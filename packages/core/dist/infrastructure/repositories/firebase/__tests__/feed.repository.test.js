"use strict";
/**
 * Firebase Feed Repository Tests
 * Tests for feed persistence and retrieval
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_repository_1 = require("../feed.repository");
// Mock Firebase
vitest_1.vi.mock('@hive/firebase', () => ({
    db: {},
    auth: {}
}));
vitest_1.vi.mock('firebase/firestore', () => ({
    collection: vitest_1.vi.fn(),
    doc: vitest_1.vi.fn(),
    getDoc: vitest_1.vi.fn(),
    getDocs: vitest_1.vi.fn(),
    setDoc: vitest_1.vi.fn(),
    updateDoc: vitest_1.vi.fn(),
    deleteDoc: vitest_1.vi.fn(),
    addDoc: vitest_1.vi.fn(),
    query: vitest_1.vi.fn(),
    where: vitest_1.vi.fn(),
    orderBy: vitest_1.vi.fn(),
    limit: vitest_1.vi.fn(),
    onSnapshot: vitest_1.vi.fn(() => vitest_1.vi.fn()),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
const firestore = __importStar(require("firebase/firestore"));
(0, vitest_1.describe)('FirebaseFeedRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new feed_repository_1.FirebaseFeedRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            await repository.findById('feed_123');
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when feed not found', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            const result = await repository.findById('nonexistent_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Feed not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            const result = await repository.findById('error_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find feed');
        });
    });
    (0, vitest_1.describe)('findByUserId', () => {
        (0, vitest_1.it)('should query feed by user ID', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Mock getDoc for user profile lookup
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => true,
                data: () => ({ campusId: 'ub-buffalo' })
            });
            await repository.findByUserId('user_123');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('userId', '==', 'user_123');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(1);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            const result = await repository.findByUserId('user_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find user feed');
        });
    });
    (0, vitest_1.describe)('findByCampus', () => {
        (0, vitest_1.it)('should query feeds by campus', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findByCampus('ub-buffalo');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(100);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            const result = await repository.findByCampus('ub-buffalo');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find campus feeds');
        });
    });
    (0, vitest_1.describe)('addFeedItem', () => {
        (0, vitest_1.it)('should add item and update feed timestamp', async () => {
            vitest_1.vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'item_123' });
            vitest_1.vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);
            const mockItem = {
                type: 'post',
                content: { text: 'Test post' },
                campusId: 'ub-buffalo'
            };
            const result = await repository.addFeedItem('feed_123', mockItem);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.addDoc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.updateDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle add errors', async () => {
            vitest_1.vi.mocked(firestore.addDoc).mockRejectedValue(new Error('Add failed'));
            const result = await repository.addFeedItem('feed_error', {});
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to add feed item');
        });
    });
    (0, vitest_1.describe)('removeFeedItem', () => {
        (0, vitest_1.it)('should remove item and update feed', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: false,
                docs: [{ ref: 'mockRef' }]
            });
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            vitest_1.vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);
            const result = await repository.removeFeedItem('feed_123', 'item_456');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.updateDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle remove errors', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Remove failed'));
            const result = await repository.removeFeedItem('feed_error', 'item_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to remove feed item');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete feed items and feed document', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: [{ ref: 'item1' }, { ref: 'item2' }]
            });
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            const result = await repository.delete('feed_delete_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalledTimes(3); // 2 items + 1 feed
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Delete failed'));
            const result = await repository.delete('feed_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete feed');
        });
    });
    (0, vitest_1.describe)('getFeedContent', () => {
        (0, vitest_1.it)('should query posts from spaces and connections', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.getFeedContent('user_123', ['space_1', 'space_2'], ['conn_1'], 50);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('spaceId', 'in', ['space_1', 'space_2']);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));
            // Pass non-empty arrays to trigger the query
            const result = await repository.getFeedContent('user_error', ['space_1'], ['conn_1'], 50);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to get feed content');
        });
    });
    (0, vitest_1.describe)('getTrendingContent', () => {
        (0, vitest_1.it)('should query trending posts', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.getTrendingContent('ub-buffalo', 20);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('trendingScore', '>', 0);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('trendingScore', 'desc');
        });
    });
    (0, vitest_1.describe)('getEventContent', () => {
        (0, vitest_1.it)('should query upcoming events', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
            vitest_1.vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow);
            await repository.getEventContent('ub-buffalo', 20);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('startTime', '>=', mockNow);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('startTime', 'asc');
        });
    });
    (0, vitest_1.describe)('getRitualContent', () => {
        (0, vitest_1.it)('should query active rituals', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.getRitualContent('ub-buffalo', 20);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('nextOccurrence', 'asc');
        });
    });
    (0, vitest_1.describe)('recordInteraction', () => {
        (0, vitest_1.it)('should record user interaction', async () => {
            vitest_1.vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'interaction_123' });
            const result = await repository.recordInteraction('user_123', 'item_456', 'like', { value: 1 });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.addDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle record errors', async () => {
            vitest_1.vi.mocked(firestore.addDoc).mockRejectedValue(new Error('Record failed'));
            const result = await repository.recordInteraction('user_error', 'item_error', 'like');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to record interaction');
        });
    });
    (0, vitest_1.describe)('subscribeToFeed', () => {
        (0, vitest_1.it)('should return an unsubscribe function', () => {
            const mockUnsubscribe = vitest_1.vi.fn();
            vitest_1.vi.mocked(firestore.onSnapshot).mockReturnValue(mockUnsubscribe);
            const callback = vitest_1.vi.fn();
            const unsubscribe = repository.subscribeToFeed('user_123', callback);
            (0, vitest_1.expect)(typeof unsubscribe).toBe('function');
            (0, vitest_1.expect)(firestore.onSnapshot).toHaveBeenCalled();
            // Test unsubscribe
            unsubscribe();
            (0, vitest_1.expect)(mockUnsubscribe).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=feed.repository.test.js.map