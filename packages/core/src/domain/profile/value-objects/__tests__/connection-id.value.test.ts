/**
 * ConnectionId Value Object Tests
 * Tests for connection identifier between two profiles
 */

import { describe, it, expect } from 'vitest';
import { ConnectionId } from '../connection-id.value';

describe('ConnectionId', () => {
  describe('create()', () => {
    it('should create valid ConnectionId with string', () => {
      const result = ConnectionId.create('connection_123');
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      expect(connectionId.value).toBe('connection_123');
      expect(connectionId.id).toBe('connection_123');
    });

    it('should fail when id is empty string', () => {
      const result = ConnectionId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ConnectionId cannot be empty');
    });

    it('should fail when id is whitespace only', () => {
      const result = ConnectionId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ConnectionId cannot be empty');
    });

    it('should accept connection id with underscores', () => {
      const result = ConnectionId.create('connection_abc_123');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('connection_abc_123');
    });
  });

  describe('createFromProfiles()', () => {
    it('should create deterministic connection id from two profile ids', () => {
      const result = ConnectionId.createFromProfiles('profile_1', 'profile_2');
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      expect(connectionId.value).toContain('connection_');
      expect(connectionId.value).toContain('profile_1');
      expect(connectionId.value).toContain('profile_2');
    });

    it('should create same connection id regardless of profile order', () => {
      const result1 = ConnectionId.createFromProfiles('profile_a', 'profile_b');
      const result2 = ConnectionId.createFromProfiles('profile_b', 'profile_a');

      expect(result1.isSuccess).toBe(true);
      expect(result2.isSuccess).toBe(true);

      const id1 = result1.getValue();
      const id2 = result2.getValue();

      expect(id1.value).toBe(id2.value);
      expect(id1.equals(id2)).toBe(true);
    });

    it('should sort profile ids alphabetically', () => {
      const result = ConnectionId.createFromProfiles('profile_z', 'profile_a');
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      // Should be: connection_profile_a_profile_z
      expect(connectionId.value).toBe('connection_profile_a_profile_z');
    });

    it('should handle numeric profile ids', () => {
      const result = ConnectionId.createFromProfiles('123', '456');
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      expect(connectionId.value).toBe('connection_123_456');
    });

    it('should handle identical profile ids (self-connection)', () => {
      const result = ConnectionId.createFromProfiles('profile_1', 'profile_1');
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      expect(connectionId.value).toBe('connection_profile_1_profile_1');
    });
  });

  describe('equality', () => {
    it('should be equal when connection ids are the same', () => {
      const id1 = ConnectionId.create('connection_123').getValue();
      const id2 = ConnectionId.create('connection_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when connection ids differ', () => {
      const id1 = ConnectionId.create('connection_123').getValue();
      const id2 = ConnectionId.create('connection_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should be equal when created from same profiles in different order', () => {
      const id1 = ConnectionId.createFromProfiles('profile_a', 'profile_b').getValue();
      const id2 = ConnectionId.createFromProfiles('profile_b', 'profile_a').getValue();

      expect(id1.equals(id2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the connection id value as string', () => {
      const connectionId = ConnectionId.create('connection_test').getValue();
      expect(connectionId.toString()).toBe('connection_test');
    });
  });

  describe('real-world examples', () => {
    it('should create connection between student profiles', () => {
      const student1 = 'profile_john_doe';
      const student2 = 'profile_jane_smith';

      const result = ConnectionId.createFromProfiles(student1, student2);
      expect(result.isSuccess).toBe(true);

      const connectionId = result.getValue();
      expect(connectionId.value).toContain('connection_');
    });

    it('should handle UUID-style profile ids', () => {
      const uuid1 = '550e8400-e29b-41d4-a716-446655440000';
      const uuid2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

      const result = ConnectionId.createFromProfiles(uuid1, uuid2);
      expect(result.isSuccess).toBe(true);
    });
  });
});
