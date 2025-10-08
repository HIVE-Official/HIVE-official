"use strict";
/**
 * ConnectionId Value Object Tests
 * Tests for connection identifier between two profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const connection_id_value_1 = require("../connection-id.value");
(0, vitest_1.describe)('ConnectionId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid ConnectionId with string', () => {
            const result = connection_id_value_1.ConnectionId.create('connection_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            (0, vitest_1.expect)(connectionId.value).toBe('connection_123');
            (0, vitest_1.expect)(connectionId.id).toBe('connection_123');
        });
        (0, vitest_1.it)('should fail when id is empty string', () => {
            const result = connection_id_value_1.ConnectionId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ConnectionId cannot be empty');
        });
        (0, vitest_1.it)('should fail when id is whitespace only', () => {
            const result = connection_id_value_1.ConnectionId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ConnectionId cannot be empty');
        });
        (0, vitest_1.it)('should accept connection id with underscores', () => {
            const result = connection_id_value_1.ConnectionId.create('connection_abc_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('connection_abc_123');
        });
    });
    (0, vitest_1.describe)('createFromProfiles()', () => {
        (0, vitest_1.it)('should create deterministic connection id from two profile ids', () => {
            const result = connection_id_value_1.ConnectionId.createFromProfiles('profile_1', 'profile_2');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            (0, vitest_1.expect)(connectionId.value).toContain('connection_');
            (0, vitest_1.expect)(connectionId.value).toContain('profile_1');
            (0, vitest_1.expect)(connectionId.value).toContain('profile_2');
        });
        (0, vitest_1.it)('should create same connection id regardless of profile order', () => {
            const result1 = connection_id_value_1.ConnectionId.createFromProfiles('profile_a', 'profile_b');
            const result2 = connection_id_value_1.ConnectionId.createFromProfiles('profile_b', 'profile_a');
            (0, vitest_1.expect)(result1.isSuccess).toBe(true);
            (0, vitest_1.expect)(result2.isSuccess).toBe(true);
            const id1 = result1.getValue();
            const id2 = result2.getValue();
            (0, vitest_1.expect)(id1.value).toBe(id2.value);
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should sort profile ids alphabetically', () => {
            const result = connection_id_value_1.ConnectionId.createFromProfiles('profile_z', 'profile_a');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            // Should be: connection_profile_a_profile_z
            (0, vitest_1.expect)(connectionId.value).toBe('connection_profile_a_profile_z');
        });
        (0, vitest_1.it)('should handle numeric profile ids', () => {
            const result = connection_id_value_1.ConnectionId.createFromProfiles('123', '456');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            (0, vitest_1.expect)(connectionId.value).toBe('connection_123_456');
        });
        (0, vitest_1.it)('should handle identical profile ids (self-connection)', () => {
            const result = connection_id_value_1.ConnectionId.createFromProfiles('profile_1', 'profile_1');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            (0, vitest_1.expect)(connectionId.value).toBe('connection_profile_1_profile_1');
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when connection ids are the same', () => {
            const id1 = connection_id_value_1.ConnectionId.create('connection_123').getValue();
            const id2 = connection_id_value_1.ConnectionId.create('connection_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when connection ids differ', () => {
            const id1 = connection_id_value_1.ConnectionId.create('connection_123').getValue();
            const id2 = connection_id_value_1.ConnectionId.create('connection_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal when created from same profiles in different order', () => {
            const id1 = connection_id_value_1.ConnectionId.createFromProfiles('profile_a', 'profile_b').getValue();
            const id2 = connection_id_value_1.ConnectionId.createFromProfiles('profile_b', 'profile_a').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the connection id value as string', () => {
            const connectionId = connection_id_value_1.ConnectionId.create('connection_test').getValue();
            (0, vitest_1.expect)(connectionId.toString()).toBe('connection_test');
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should create connection between student profiles', () => {
            const student1 = 'profile_john_doe';
            const student2 = 'profile_jane_smith';
            const result = connection_id_value_1.ConnectionId.createFromProfiles(student1, student2);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const connectionId = result.getValue();
            (0, vitest_1.expect)(connectionId.value).toContain('connection_');
        });
        (0, vitest_1.it)('should handle UUID-style profile ids', () => {
            const uuid1 = '550e8400-e29b-41d4-a716-446655440000';
            const uuid2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
            const result = connection_id_value_1.ConnectionId.createFromProfiles(uuid1, uuid2);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=connection-id.value.test.js.map