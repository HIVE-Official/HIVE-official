/**
 * Firebase Profile Repository Tests
 * Tests for profile persistence with Firebase
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FirebaseProfileRepository } from '../profile.repository';
import { Profile } from '../../../../domain/profile/aggregates/profile.aggregate';
import { ProfileId } from '../../../../domain/profile/value-objects/profile-id.value';
import { UBEmail } from '../../../../domain/profile/value-objects';
import { ProfileHandle } from '../../../../domain/profile/value-objects/profile-handle.value';
import { CampusId } from '../../../../domain/profile/value-objects/campus-id.value';

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

describe('FirebaseProfileRepository', () => {
  let repository: FirebaseProfileRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new FirebaseProfileRepository();
  });

  describe('findById', () => {
    it('should call Firestore with correct parameters', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      await repository.findById('profile_123');

      // Assert
      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    it('should return failure when profile not found', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      // Act
      const result = await repository.findById('nonexistent_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Profile not found');
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(firestore.getDoc).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await repository.findById('error_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to find profile');
    });
  });

  describe('findByEmail', () => {
    it('should call Firestore with email query', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      await repository.findByEmail('student@buffalo.edu');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('email', '==', 'student@buffalo.edu');
    });

    it('should return failure when email not found', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      const result = await repository.findByEmail('notfound@buffalo.edu');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Profile not found');
    });
  });

  describe('findByHandle', () => {
    it('should call Firestore with handle query', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      await repository.findByHandle('cooluser');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('handle', '==', 'cooluser');
    });

    it('should convert handle to lowercase', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true,
        docs: []
      } as any);

      // Act
      await repository.findByHandle('MixedCase');

      // Assert
      expect(firestore.where).toHaveBeenCalledWith('handle', '==', 'mixedcase');
    });
  });

  describe('findByCampus', () => {
    it('should query by campus with correct filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.findByCampus('ub-buffalo', 50);

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });
  });

  describe('exists', () => {
    it('should return true when handle exists', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: false
      } as any);

      // Act
      const exists = await repository.exists('existinguser');

      // Assert
      expect(exists).toBe(true);
      expect(firestore.where).toHaveBeenCalledWith('handle', '==', 'existinguser');
    });

    it('should return false when handle does not exist', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        empty: true
      } as any);

      // Act
      const exists = await repository.exists('nonexistent');

      // Assert
      expect(exists).toBe(false);
    });

    it('should return false on error', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockRejectedValue(new Error('Database error'));

      // Act
      const exists = await repository.exists('erroruser');

      // Assert
      expect(exists).toBe(false);
    });
  });

  describe('save', () => {
    it('should handle save errors', async () => {
      // Arrange
      const mockProfile = {
        id: { id: 'profile_error' },
        email: { value: 'error@buffalo.edu' },
        handle: { value: 'erroruser' },
        campusId: { id: 'ub-buffalo' }
      } as any;

      vi.mocked(firestore.setDoc).mockRejectedValue(new Error('Save failed'));

      // Act
      const result = await repository.save(mockProfile);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to save profile');
    });
  });

  describe('delete', () => {
    it('should delete a profile', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      // Act
      const result = await repository.delete('profile_delete_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });

    it('should handle delete errors', async () => {
      // Arrange
      vi.mocked(firestore.deleteDoc).mockRejectedValue(new Error('Delete failed'));

      // Act
      const result = await repository.delete('profile_error');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Failed to delete profile');
    });
  });

  describe('searchByName', () => {
    it('should query with campus and active filters', async () => {
      // Arrange
      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: []
      } as any);

      // Act
      await repository.searchByName('john', 'ub-buffalo');

      // Assert
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(firestore.where).toHaveBeenCalledWith('isActive', '==', true);
    });
  });
});
