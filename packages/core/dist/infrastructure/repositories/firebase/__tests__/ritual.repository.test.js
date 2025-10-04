"use strict";
/**
 * Firebase Ritual Repository Tests
 * Tests for ritual persistence with Firebase
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
const ritual_repository_1 = require("../ritual.repository");
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
(0, vitest_1.describe)('FirebaseRitualRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new ritual_repository_1.FirebaseRitualRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            await repository.findById('ritual_123');
            // Assert
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when ritual not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            const result = await repository.findById('nonexistent_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Ritual not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findById('error_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find ritual');
        });
    });
    (0, vitest_1.describe)('findByCampus', () => {
        (0, vitest_1.it)('should query rituals by campus', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByCampus('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findByCampus('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find rituals');
        });
    });
    (0, vitest_1.describe)('findActive', () => {
        (0, vitest_1.it)('should query active rituals with date filters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Mock Timestamp.now() to return a fixed value
            const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
            vitest_1.vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow);
            // Act
            await repository.findActive('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('startDate', '<=', mockNow);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('endDate', '>=', mockNow);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('endDate', 'asc');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findActive('ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find active rituals');
        });
    });
    (0, vitest_1.describe)('findByType', () => {
        (0, vitest_1.it)('should query rituals by type and campus', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByType('short', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('type', '==', 'short');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('startDate', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findByType('anticipatory', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find rituals by type');
        });
    });
    (0, vitest_1.describe)('findActiveByType', () => {
        (0, vitest_1.it)('should query active ritual by type with date filters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            const mockNow = { seconds: Date.now() / 1000, nanoseconds: 0 };
            vitest_1.vi.mocked(firestore.Timestamp.now).mockReturnValue(mockNow);
            // Act
            await repository.findActiveByType('yearbook', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('type', '==', 'yearbook');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('startDate', '<=', mockNow);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('endDate', '>=', mockNow);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(1);
        });
        (0, vitest_1.it)('should return failure when no active ritual found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            const result = await repository.findActiveByType('short', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('No active ritual of this type found');
        });
    });
    (0, vitest_1.describe)('findUserRituals', () => {
        (0, vitest_1.it)('should query rituals by participant', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findUserRituals('user_123');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('participantIds', 'array-contains', 'user_123');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('endDate', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findUserRituals('user_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find user rituals');
        });
    });
    (0, vitest_1.describe)('save', () => {
        (0, vitest_1.it)('should handle save errors', async () => {
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
                createdAt: null, // Indicate new ritual (will use setDoc)
                updatedAt: new Date()
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            // Act
            const result = await repository.save(mockRitual);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save ritual');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a ritual', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            // Act
            const result = await repository.delete('ritual_delete_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));
            // Act
            const result = await repository.delete('ritual_error');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete ritual');
        });
    });
    (0, vitest_1.describe)('findParticipation', () => {
        (0, vitest_1.it)('should return failure when participation not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            const result = await repository.findParticipation('ritual_123', 'user_456');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Participation not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findParticipation('ritual_123', 'user_456');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find participation');
        });
    });
    (0, vitest_1.describe)('saveParticipation', () => {
        (0, vitest_1.it)('should save participation data', async () => {
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
            vitest_1.vi.mocked(firestore.setDoc).mockResolvedValue(undefined);
            // Act
            const result = await repository.saveParticipation(mockParticipation);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.setDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle save errors', async () => {
            // Arrange
            const mockParticipation = {
                ritualId: 'ritual_error',
                profileId: 'user_error'
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            // Act
            const result = await repository.saveParticipation(mockParticipation);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save participation');
        });
    });
    (0, vitest_1.describe)('findLeaderboard', () => {
        (0, vitest_1.it)('should query leaderboard with correct filters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findLeaderboard('ritual_123', 50);
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('totalPoints', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should use default limit when not provided', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findLeaderboard('ritual_123');
            // Assert
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findLeaderboard('ritual_error');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find leaderboard');
        });
    });
    (0, vitest_1.describe)('findByParticipant', () => {
        (0, vitest_1.it)('should query all rituals and check participation', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.findByParticipant('user_123');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.collection).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findByParticipant('user_error');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find rituals by participant');
        });
    });
    (0, vitest_1.describe)('subscribeToRitual', () => {
        (0, vitest_1.it)('should return an unsubscribe function', () => {
            // Arrange
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            const callback = vitest_1.vi.fn();
            // Act
            const unsubscribe = repository.subscribeToRitual('ritual_123', callback);
            // Assert
            (0, vitest_1.expect)(typeof unsubscribe).toBe('function');
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('Subscribing to ritual ritual_123');
            // Test unsubscribe
            unsubscribe();
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('Unsubscribed from ritual ritual_123');
            consoleLogSpy.mockRestore();
        });
    });
    (0, vitest_1.describe)('subscribeToActiveRituals', () => {
        (0, vitest_1.it)('should return an unsubscribe function', () => {
            // Arrange
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            const callback = vitest_1.vi.fn();
            // Act
            const unsubscribe = repository.subscribeToActiveRituals('ub-buffalo', callback);
            // Assert
            (0, vitest_1.expect)(typeof unsubscribe).toBe('function');
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('Subscribing to active rituals for campus ub-buffalo');
            // Test unsubscribe
            unsubscribe();
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('Unsubscribed from active rituals for campus ub-buffalo');
            consoleLogSpy.mockRestore();
        });
    });
});
//# sourceMappingURL=ritual.repository.test.js.map