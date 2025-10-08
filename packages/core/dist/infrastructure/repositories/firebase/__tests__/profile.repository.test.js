"use strict";
/**
 * Firebase Profile Repository Tests
 * Tests for profile persistence with Firebase
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
const profile_repository_1 = require("../profile.repository");
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
(0, vitest_1.describe)('FirebaseProfileRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new profile_repository_1.FirebaseProfileRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            await repository.findById('profile_123');
            // Assert
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when profile not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            // Act
            const result = await repository.findById('nonexistent_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Profile not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            // Act
            const result = await repository.findById('error_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find profile');
        });
    });
    (0, vitest_1.describe)('findByEmail', () => {
        (0, vitest_1.it)('should call Firestore with email query', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            await repository.findByEmail('student@buffalo.edu');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('email', '==', 'student@buffalo.edu');
        });
        (0, vitest_1.it)('should return failure when email not found', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            const result = await repository.findByEmail('notfound@buffalo.edu');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Profile not found');
        });
    });
    (0, vitest_1.describe)('findByHandle', () => {
        (0, vitest_1.it)('should call Firestore with handle query', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            await repository.findByHandle('cooluser');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('handle', '==', 'cooluser');
        });
        (0, vitest_1.it)('should convert handle to lowercase', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true,
                docs: []
            });
            // Act
            await repository.findByHandle('MixedCase');
            // Assert
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('handle', '==', 'mixedcase');
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
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
        });
    });
    (0, vitest_1.describe)('exists', () => {
        (0, vitest_1.it)('should return true when handle exists', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: false
            });
            // Act
            const exists = await repository.exists('existinguser');
            // Assert
            (0, vitest_1.expect)(exists).toBe(true);
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('handle', '==', 'existinguser');
        });
        (0, vitest_1.it)('should return false when handle does not exist', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                empty: true
            });
            // Act
            const exists = await repository.exists('nonexistent');
            // Assert
            (0, vitest_1.expect)(exists).toBe(false);
        });
        (0, vitest_1.it)('should return false on error', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            // Act
            const exists = await repository.exists('erroruser');
            // Assert
            (0, vitest_1.expect)(exists).toBe(false);
        });
    });
    (0, vitest_1.describe)('save', () => {
        (0, vitest_1.it)('should handle save errors', async () => {
            // Arrange
            const mockProfile = {
                id: { id: 'profile_error' },
                email: { value: 'error@buffalo.edu' },
                handle: { value: 'erroruser' },
                campusId: { id: 'ub-buffalo' }
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            // Act
            const result = await repository.save(mockProfile);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save profile');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a profile', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            // Act
            const result = await repository.delete('profile_delete_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));
            // Act
            const result = await repository.delete('profile_error');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete profile');
        });
    });
    (0, vitest_1.describe)('searchByName', () => {
        (0, vitest_1.it)('should query with campus and active filters', async () => {
            // Arrange
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            // Act
            await repository.searchByName('john', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
        });
    });
});
//# sourceMappingURL=profile.repository.test.js.map