"use strict";
/**
 * Firebase Unit of Work Tests
 * Tests for transaction management across repositories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
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
    addDoc: vitest_1.vi.fn(),
    onSnapshot: vitest_1.vi.fn(),
    increment: vitest_1.vi.fn(),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
const unit_of_work_1 = require("../unit-of-work");
(0, vitest_1.describe)('FirebaseUnitOfWork', () => {
    let unitOfWork;
    (0, vitest_1.beforeEach)(() => {
        unitOfWork = new unit_of_work_1.FirebaseUnitOfWork();
    });
    (0, vitest_1.describe)('Repository Access', () => {
        (0, vitest_1.it)('should provide access to profiles repository', () => {
            (0, vitest_1.expect)(unitOfWork.profiles).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.profiles).toBe(unitOfWork.profiles); // Same instance
        });
        (0, vitest_1.it)('should provide access to connections repository', () => {
            (0, vitest_1.expect)(unitOfWork.connections).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.connections).toBe(unitOfWork.connections);
        });
        (0, vitest_1.it)('should provide access to spaces repository', () => {
            (0, vitest_1.expect)(unitOfWork.spaces).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.spaces).toBe(unitOfWork.spaces);
        });
        (0, vitest_1.it)('should provide access to feeds repository', () => {
            (0, vitest_1.expect)(unitOfWork.feeds).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.feeds).toBe(unitOfWork.feeds);
        });
        (0, vitest_1.it)('should provide access to rituals repository', () => {
            (0, vitest_1.expect)(unitOfWork.rituals).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.rituals).toBe(unitOfWork.rituals);
        });
        (0, vitest_1.it)('should provide access to tools repository', () => {
            (0, vitest_1.expect)(unitOfWork.tools).toBeDefined();
            (0, vitest_1.expect)(unitOfWork.tools).toBe(unitOfWork.tools);
        });
    });
    (0, vitest_1.describe)('Transaction Management', () => {
        (0, vitest_1.it)('should begin a transaction', async () => {
            await (0, vitest_1.expect)(unitOfWork.begin()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should throw when starting transaction twice', async () => {
            await unitOfWork.begin();
            await (0, vitest_1.expect)(unitOfWork.begin()).rejects.toThrow('Transaction already started');
        });
        (0, vitest_1.it)('should commit a transaction', async () => {
            await unitOfWork.begin();
            await (0, vitest_1.expect)(unitOfWork.commit()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should throw when committing without transaction', async () => {
            await (0, vitest_1.expect)(unitOfWork.commit()).rejects.toThrow('No transaction to commit');
        });
        (0, vitest_1.it)('should allow new transaction after commit', async () => {
            await unitOfWork.begin();
            await unitOfWork.commit();
            await (0, vitest_1.expect)(unitOfWork.begin()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should rollback a transaction', async () => {
            await unitOfWork.begin();
            await (0, vitest_1.expect)(unitOfWork.rollback()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should not throw when rolling back without transaction', async () => {
            await (0, vitest_1.expect)(unitOfWork.rollback()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should allow new transaction after rollback', async () => {
            await unitOfWork.begin();
            await unitOfWork.rollback();
            await (0, vitest_1.expect)(unitOfWork.begin()).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('Transaction Lifecycle', () => {
        (0, vitest_1.it)('should support complete begin-commit cycle', async () => {
            await unitOfWork.begin();
            // Perform operations (would use repositories here)
            await unitOfWork.commit();
            // Should be able to start new transaction
            await (0, vitest_1.expect)(unitOfWork.begin()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should support complete begin-rollback cycle', async () => {
            await unitOfWork.begin();
            // Perform operations that need to be rolled back
            await unitOfWork.rollback();
            // Should be able to start new transaction
            await (0, vitest_1.expect)(unitOfWork.begin()).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should maintain repository instances across transactions', async () => {
            const profilesRepo1 = unitOfWork.profiles;
            await unitOfWork.begin();
            const profilesRepo2 = unitOfWork.profiles;
            await unitOfWork.commit();
            const profilesRepo3 = unitOfWork.profiles;
            (0, vitest_1.expect)(profilesRepo1).toBe(profilesRepo2);
            (0, vitest_1.expect)(profilesRepo2).toBe(profilesRepo3);
        });
    });
});
//# sourceMappingURL=unit-of-work.test.js.map