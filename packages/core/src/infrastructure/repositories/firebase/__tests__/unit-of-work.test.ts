/**
 * Firebase Unit of Work Tests
 * Tests for transaction management across repositories
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

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
  addDoc: vi.fn(),
  onSnapshot: vi.fn(),
  increment: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

import { FirebaseUnitOfWork } from '../unit-of-work';

describe('FirebaseUnitOfWork', () => {
  let unitOfWork: FirebaseUnitOfWork;

  beforeEach(() => {
    unitOfWork = new FirebaseUnitOfWork();
  });

  describe('Repository Access', () => {
    it('should provide access to profiles repository', () => {
      expect(unitOfWork.profiles).toBeDefined();
      expect(unitOfWork.profiles).toBe(unitOfWork.profiles); // Same instance
    });

    it('should provide access to connections repository', () => {
      expect(unitOfWork.connections).toBeDefined();
      expect(unitOfWork.connections).toBe(unitOfWork.connections);
    });

    it('should provide access to spaces repository', () => {
      expect(unitOfWork.spaces).toBeDefined();
      expect(unitOfWork.spaces).toBe(unitOfWork.spaces);
    });

    it('should provide access to feeds repository', () => {
      expect(unitOfWork.feeds).toBeDefined();
      expect(unitOfWork.feeds).toBe(unitOfWork.feeds);
    });

    it('should provide access to rituals repository', () => {
      expect(unitOfWork.rituals).toBeDefined();
      expect(unitOfWork.rituals).toBe(unitOfWork.rituals);
    });

    it('should provide access to tools repository', () => {
      expect(unitOfWork.tools).toBeDefined();
      expect(unitOfWork.tools).toBe(unitOfWork.tools);
    });
  });

  describe('Transaction Management', () => {
    it('should begin a transaction', async () => {
      await expect(unitOfWork.begin()).resolves.toBeUndefined();
    });

    it('should throw when starting transaction twice', async () => {
      await unitOfWork.begin();
      await expect(unitOfWork.begin()).rejects.toThrow('Transaction already started');
    });

    it('should commit a transaction', async () => {
      await unitOfWork.begin();
      await expect(unitOfWork.commit()).resolves.toBeUndefined();
    });

    it('should throw when committing without transaction', async () => {
      await expect(unitOfWork.commit()).rejects.toThrow('No transaction to commit');
    });

    it('should allow new transaction after commit', async () => {
      await unitOfWork.begin();
      await unitOfWork.commit();
      await expect(unitOfWork.begin()).resolves.toBeUndefined();
    });

    it('should rollback a transaction', async () => {
      await unitOfWork.begin();
      await expect(unitOfWork.rollback()).resolves.toBeUndefined();
    });

    it('should not throw when rolling back without transaction', async () => {
      await expect(unitOfWork.rollback()).resolves.toBeUndefined();
    });

    it('should allow new transaction after rollback', async () => {
      await unitOfWork.begin();
      await unitOfWork.rollback();
      await expect(unitOfWork.begin()).resolves.toBeUndefined();
    });
  });

  describe('Transaction Lifecycle', () => {
    it('should support complete begin-commit cycle', async () => {
      await unitOfWork.begin();
      // Perform operations (would use repositories here)
      await unitOfWork.commit();
      // Should be able to start new transaction
      await expect(unitOfWork.begin()).resolves.toBeUndefined();
    });

    it('should support complete begin-rollback cycle', async () => {
      await unitOfWork.begin();
      // Perform operations that need to be rolled back
      await unitOfWork.rollback();
      // Should be able to start new transaction
      await expect(unitOfWork.begin()).resolves.toBeUndefined();
    });

    it('should maintain repository instances across transactions', async () => {
      const profilesRepo1 = unitOfWork.profiles;

      await unitOfWork.begin();
      const profilesRepo2 = unitOfWork.profiles;
      await unitOfWork.commit();

      const profilesRepo3 = unitOfWork.profiles;

      expect(profilesRepo1).toBe(profilesRepo2);
      expect(profilesRepo2).toBe(profilesRepo3);
    });
  });
});
