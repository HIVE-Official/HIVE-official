"use strict";
/**
 * Firebase Connection Repository Tests
 * Tests for social connections persistence
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
const connection_repository_1 = require("../connection.repository");
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
    query: vitest_1.vi.fn(),
    where: vitest_1.vi.fn(),
    orderBy: vitest_1.vi.fn(),
    limit: vitest_1.vi.fn(),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
const firestore = __importStar(require("firebase/firestore"));
(0, vitest_1.describe)('FirebaseConnectionRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new connection_repository_1.FirebaseConnectionRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            await repository.findById('connection_123');
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when connection not found', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            const result = await repository.findById('nonexistent_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Connection not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            const result = await repository.findById('error_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find connection');
        });
    });
    (0, vitest_1.describe)('findByProfiles', () => {
        (0, vitest_1.it)('should query with ordered profile IDs', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Should sort IDs alphabetically
            await repository.findByProfiles('user_b', 'user_a');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('profileId1', '==', 'user_a');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('profileId2', '==', 'user_b');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(1);
        });
        (0, vitest_1.it)('should return failure when connection not found', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            const result = await repository.findByProfiles('user_1', 'user_2');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Connection not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));
            const result = await repository.findByProfiles('user_error', 'user_fail');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find connection');
        });
    });
    (0, vitest_1.describe)('findUserConnections', () => {
        (0, vitest_1.it)('should query both profileId1 and profileId2', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findUserConnections('user_123');
            // Should be called twice: once for profileId1, once for profileId2
            (0, vitest_1.expect)(firestore.getDocs).toHaveBeenCalledTimes(2);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('profileId1', '==', 'user_123');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('profileId2', '==', 'user_123');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(200);
        });
        (0, vitest_1.it)('should filter by connection type when provided', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findUserConnections('user_123', 'friend');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('type', '==', 'friend');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Query error'));
            const result = await repository.findUserConnections('user_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find connections');
        });
    });
    (0, vitest_1.describe)('getConnectionCount', () => {
        (0, vitest_1.it)('should count connections from both queries', async () => {
            vitest_1.vi.mocked(firestore.getDocs)
                .mockResolvedValueOnce({
                docs: [{ id: 'conn_1' }, { id: 'conn_2' }]
            })
                .mockResolvedValueOnce({
                docs: [{ id: 'conn_3' }, { id: 'conn_1' }] // conn_1 is duplicate
            });
            const count = await repository.getConnectionCount('user_123', 'friend');
            // Should return 3 (deduped)
            (0, vitest_1.expect)(count).toBe(3);
            (0, vitest_1.expect)(firestore.getDocs).toHaveBeenCalledTimes(2);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('type', '==', 'friend');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            const consoleSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Count error'));
            const count = await repository.getConnectionCount('user_error', 'friend');
            (0, vitest_1.expect)(count).toBe(0);
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('Failed to count connections:', vitest_1.expect.any(Error));
            consoleSpy.mockRestore();
        });
    });
    (0, vitest_1.describe)('save', () => {
        (0, vitest_1.it)('should handle save errors', async () => {
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
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            const result = await repository.save(mockConnection);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save connection');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a connection', async () => {
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            const result = await repository.delete('conn_delete_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            vitest_1.vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));
            const result = await repository.delete('conn_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete connection');
        });
    });
});
//# sourceMappingURL=connection.repository.test.js.map