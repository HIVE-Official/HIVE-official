"use strict";
/**
 * Firebase Tool Repository Tests
 * Tests for tool (HiveLab) persistence with Firebase
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
const tool_repository_1 = require("../tool.repository");
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
    increment: vitest_1.vi.fn((val) => val),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
const firestore = __importStar(require("firebase/firestore"));
(0, vitest_1.describe)('FirebaseToolRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        repository = new tool_repository_1.FirebaseToolRepository();
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should call Firestore with correct parameters', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            await repository.findById('tool_123');
            (0, vitest_1.expect)(firestore.doc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.getDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return failure when tool not found', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockResolvedValue({
                exists: () => false
            });
            const result = await repository.findById('nonexistent_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Tool not found');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));
            const result = await repository.findById('error_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find tool');
        });
    });
    (0, vitest_1.describe)('findByCreator', () => {
        (0, vitest_1.it)('should query tools by creator', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findByCreator('user_123');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('createdBy', '==', 'user_123');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(100);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            const result = await repository.findByCreator('user_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find tools by creator');
        });
    });
    (0, vitest_1.describe)('findBySpace', () => {
        (0, vitest_1.it)('should query tools by space with status filter', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findBySpace('space_123');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('spaceId', '==', 'space_123');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', 'in', ['published', 'draft']);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));
            const result = await repository.findBySpace('space_123');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to find tools by space');
        });
    });
    (0, vitest_1.describe)('findByStatus', () => {
        (0, vitest_1.it)('should query tools by status and campus', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findByStatus('published', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('updatedAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
    });
    (0, vitest_1.describe)('findByVisibility', () => {
        (0, vitest_1.it)('should query published tools by visibility', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findByVisibility('public', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('visibility', '==', 'public');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
        });
    });
    (0, vitest_1.describe)('findPublished', () => {
        (0, vitest_1.it)('should query published campus/public tools', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findPublished('ub-buffalo', 20);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('visibility', 'in', ['campus', 'public']);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('publishedAt', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
        (0, vitest_1.it)('should use default limit', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findPublished('ub-buffalo');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(20);
        });
    });
    (0, vitest_1.describe)('findDeployedToSpace', () => {
        (0, vitest_1.it)('should query tools deployed to space', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findDeployedToSpace('space_123');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('deployedTo', 'array-contains', 'space_123');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
        });
    });
    (0, vitest_1.describe)('findTrending', () => {
        (0, vitest_1.it)('should query trending tools by usage', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findTrending('ub-buffalo', 10);
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('analytics.uses', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(10);
        });
        (0, vitest_1.it)('should use default limit', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findTrending('ub-buffalo');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(10);
        });
    });
    (0, vitest_1.describe)('findForkableTools', () => {
        (0, vitest_1.it)('should query forkable published tools', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.findForkableTools('ub-buffalo');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('permissions.canFork', '==', true);
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('analytics.forks', 'desc');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(30);
        });
    });
    (0, vitest_1.describe)('searchTools', () => {
        (0, vitest_1.it)('should query all published tools for client-side search', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockResolvedValue({
                docs: []
            });
            await repository.searchTools('poll', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.query).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
            (0, vitest_1.expect)(firestore.where).toHaveBeenCalledWith('status', '==', 'published');
            (0, vitest_1.expect)(firestore.orderBy).toHaveBeenCalledWith('name');
            (0, vitest_1.expect)(firestore.limit).toHaveBeenCalledWith(50);
        });
        (0, vitest_1.it)('should handle search errors', async () => {
            vitest_1.vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Search error'));
            const result = await repository.searchTools('test', 'ub-buffalo');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Tool search failed');
        });
    });
    (0, vitest_1.describe)('recordUse', () => {
        (0, vitest_1.it)('should increment usage analytics', async () => {
            vitest_1.vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);
            const result = await repository.recordUse('tool_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.updateDoc).toHaveBeenCalled();
            (0, vitest_1.expect)(firestore.increment).toHaveBeenCalledWith(1);
        });
        (0, vitest_1.it)('should handle record errors', async () => {
            vitest_1.vi.mocked(firestore.updateDoc).mockRejectedValue(new Error('Update failed'));
            const result = await repository.recordUse('tool_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to record tool use');
        });
    });
    (0, vitest_1.describe)('save', () => {
        (0, vitest_1.it)('should handle save errors', async () => {
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
            };
            vitest_1.vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));
            const result = await repository.save(mockTool);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to save tool');
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a tool', async () => {
            vitest_1.vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);
            const result = await repository.delete('tool_delete_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(firestore.deleteDoc).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle delete errors', async () => {
            vitest_1.vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));
            const result = await repository.delete('tool_error');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Failed to delete tool');
        });
    });
});
//# sourceMappingURL=tool.repository.test.js.map