/**
 * ToolId Value Object Tests
 * Tests for unique tool identifier validation
 */

import { describe, it, expect } from 'vitest';
import { ToolId } from '../tool-id.value';

describe('ToolId', () => {
  describe('create()', () => {
    it('should create a valid ToolId when no argument provided', () => {
      const result = ToolId.create();
      expect(result.isSuccess).toBe(true);

      const toolId = result.getValue();
      expect(toolId.value).toBeDefined();
      expect(toolId.value.length).toBeGreaterThan(0);
      expect(toolId.id).toBe(toolId.value);
    });

    it('should create a valid ToolId with provided id', () => {
      const result = ToolId.create('tool_123');
      expect(result.isSuccess).toBe(true);

      const toolId = result.getValue();
      expect(toolId.value).toBe('tool_123');
      expect(toolId.id).toBe('tool_123');
    });

    it('should create different ids when called multiple times without argument', () => {
      const id1 = ToolId.create().getValue();
      const id2 = ToolId.create().getValue();

      expect(id1.value).not.toBe(id2.value);
    });

    it('should fail when provided id is empty string', () => {
      const result = ToolId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ToolId cannot be empty');
    });

    it('should fail when provided id is whitespace only', () => {
      const result = ToolId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ToolId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = ToolId.create('tool_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('tool_abc-123_xyz');
    });

    it('should accept UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = ToolId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = ToolId.create('tool_123').getValue();
      const id2 = ToolId.create('tool_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = ToolId.create('tool_123').getValue();
      const id2 = ToolId.create('tool_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should not be equal when auto-generated', () => {
      const id1 = ToolId.create().getValue();
      const id2 = ToolId.create().getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const toolId = ToolId.create('tool_test').getValue();
      expect(toolId.toString()).toBe('tool_test');
    });
  });

  describe('real-world usage', () => {
    it('should create ids for various HiveLab tools', () => {
      const tools = [
        'tool_poll_creator',
        'tool_event_rsvp',
        'tool_textbook_exchange',
        'tool_ride_share_board'
      ];

      tools.forEach(toolId => {
        const result = ToolId.create(toolId);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should handle forked tool ids', () => {
      const result = ToolId.create('tool_poll_creator_fork_1');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle versioned tool ids', () => {
      const result = ToolId.create('tool_event_rsvp_v2');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle user-created tool ids', () => {
      const result = ToolId.create('tool_custom_attendance_tracker');
      expect(result.isSuccess).toBe(true);
    });
  });
});
