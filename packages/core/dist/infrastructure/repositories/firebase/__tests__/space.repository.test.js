"use strict";
/**
 * Firebase Space Repository Tests
 * Tests for space persistence with Firebase
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
const space_repository_1 = require("../space.repository");
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
(0, vitest_1.describe)('FirebaseSpaceRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new space_repository_1.FirebaseSpaceRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            await repository.findById('space_123');
            // Assert
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when space not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            const result = await repository.findById('nonexistent_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Space not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findById('error_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find space');
        });
    });
    (0, vitest_1.describe)('findByName', () => {
        (0, vitest_1.it)('should call Firestore with name and campus query', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            await repository.findByName('Computer Science Club', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('name', '==', 'Computer Science Club');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(1);
        });
        (0, vitest_1.it)('should return failure when space not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            const result = await repository.findByName('Nonexistent Club', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Space not found');
        });
    });
    (0, vitest_1.describe)('findByCampus', () => {
        (0, vitest_1.it)('should query by campus with correct filters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByCampus('ub-buffalo', 50);
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should use default limit when not provided', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByCampus('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findByCampus('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find spaces');
        });
    });
    (0, vitest_1.describe)('findByCategory', () => {
        (0, vitest_1.it)('should query by category and campus', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByCategory('student_org', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('category', '==', 'student_org');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
        });
    });
    (0, vitest_1.describe)('findUserSpaces', () => {
        (0, vitest_1.it)('should query spaces by member array', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findUserSpaces('user_123');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('memberIds', 'array-contains', 'user_123');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('lastActivityAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(100);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findUserSpaces('user_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find user spaces');
        });
    });
    (0, vitest_1.describe)('findTrending', () => {
        (0, vitest_1.it)('should query trending spaces with score filter', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findTrending('ub-buffalo', 20);
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('trendingScore', '>', 0);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('trendingScore', 'desc');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
        (0, vitest_1.it)('should use default limit when not provided', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findTrending('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
    });
    (0, vitest_1.describe)('findRecommended', () => {
        (0, vitest_1.it)('should query popular spaces', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findRecommended('ub-buffalo', ['tech', 'gaming']);
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(10);
        });
        (0, vitest_1.it)('should query major-specific spaces when major provided', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findRecommended('ub-buffalo', ['tech'], 'Computer Science');
            // Assert
            // Should be called twice: once for popular, once for major
            (0, vitest_1.expect)(firestore.getDocs).toHaveBeenCalledTimes(2);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('tags', 'array-contains', 'computer science');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(5); // major query limit
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findRecommended('ub-buffalo', ['tech']);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find recommended spaces');
        });
    });
    (0, vitest_1.describe)('searchSpaces', () => {
        (0, vitest_1.it)('should query all active spaces for client-side filtering', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.searchSpaces('computer', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('name');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Search error'));
            // Act
            const result = await repository.searchSpaces('test', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Search failed');
        });
    });
    (0, vitest_1.describe)('save', () => {
        (0, vitest_1.it)('should handle save errors', async () => {
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
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            // Act
            const result = await repository.save(mockSpace);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save space');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a space', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            // Act
            const result = await repository.delete('space_delete_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));
            // Act
            const result = await repository.delete('space_error');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete space');
        });
    });
    (0, vitest_1.describe)('findByType', () => {
        (0, vitest_1.it)('should query by type field', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByType('club', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('type', '==', 'club');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
        });
    });
    (0, vitest_1.describe)('findByMember', () => {
        (0, vitest_1.it)('should delegate to findUserSpaces', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByMember('user_456');
            // Assert
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('memberIds', 'array-contains', 'user_456');
        });
    });
    (0, vitest_1.describe)('findPublicSpaces', () => {
        (0, vitest_1.it)('should query public spaces only', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findPublicSpaces('ub-buffalo', 100);
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('visibility', '==', 'public');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('memberCount', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(100);
        });
        (0, vitest_1.it)('should use default limit when not provided', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findPublicSpaces('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(100);
        });
    });
});
//# sourceMappingURL=space.repository.test.js.map