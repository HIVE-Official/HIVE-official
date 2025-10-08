/**
 * Tool Event Handler Tests
 * Tests for tool domain event handlers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  handleToolCreated,
  handleToolPublished,
  handleToolUsed,
  handleToolForked
} from '../tool-event.handlers';
import { ToolCreatedEvent } from '../../../domain/tools/events/tool-created.event';
import { ToolPublishedEvent } from '../../../domain/tools/events/tool-published.event';
import { ToolUsedEvent } from '../../../domain/tools/events/tool-used.event';
import { ToolForkedEvent } from '../../../domain/tools/events/tool-forked.event';

describe('Tool Event Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleToolCreated', () => {
    it('should handle tool created event', async () => {
      // Arrange
      const event = new ToolCreatedEvent(
        'tool_123',
        'Campus Poll Builder',
        'creator_456',
        'space_789'
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleToolCreated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ToolEventHandler] Tool created: Campus Poll Builder by creator_456'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle tool created without space', async () => {
      const event = new ToolCreatedEvent(
        'tool_789',
        'Generic Calculator',
        'creator_101'
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleToolCreated(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.spaceId).toBeUndefined();
      consoleLogSpy.mockRestore();
    });

    it('should complete without throwing errors', async () => {
      const event = new ToolCreatedEvent(
        'tool_new',
        'Event Scheduler',
        'creator_999',
        'space_111'
      );

      await expect(handleToolCreated(event)).resolves.toBeUndefined();
    });
  });

  describe('handleToolPublished', () => {
    it('should handle tool published event', async () => {
      // Arrange
      const event = new ToolPublishedEvent(
        'tool_123',
        'Campus Poll Builder',
        'public'
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleToolPublished(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ToolEventHandler] Tool published: Campus Poll Builder (tool_123) with visibility public'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle different visibility levels', async () => {
      const visibilities = ['public', 'private', 'space'];

      for (const visibility of visibilities) {
        const event = new ToolPublishedEvent(
          `tool_${visibility}`,
          `Test ${visibility} Tool`,
          visibility
        );

        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        await handleToolPublished(event);
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
      }
    });

    it('should complete without throwing errors', async () => {
      const event = new ToolPublishedEvent(
        'tool_456',
        'Study Timer',
        'public'
      );

      await expect(handleToolPublished(event)).resolves.toBeUndefined();
    });
  });

  describe('handleToolUsed', () => {
    it('should handle tool used event', async () => {
      // Arrange
      const event = new ToolUsedEvent(
        'tool_123',
        'Campus Poll Builder',
        'user_456',
        42
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleToolUsed(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ToolEventHandler] Tool used: Campus Poll Builder by user_456 (total: 42)'
      );

      consoleLogSpy.mockRestore();
    });

    it('should track usage count', async () => {
      const event = new ToolUsedEvent(
        'tool_popular',
        'Hot Tool',
        'user_999',
        1000
      );

      await handleToolUsed(event);
      expect(event.totalUses).toBe(1000);
    });

    it('should handle first use', async () => {
      const event = new ToolUsedEvent(
        'tool_new',
        'Brand New Tool',
        'user_first',
        1
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleToolUsed(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.totalUses).toBe(1);
      consoleLogSpy.mockRestore();
    });

    it('should complete without throwing errors', async () => {
      const event = new ToolUsedEvent(
        'tool_789',
        'Study Helper',
        'user_111',
        25
      );

      await expect(handleToolUsed(event)).resolves.toBeUndefined();
    });
  });

  describe('handleToolForked', () => {
    it('should handle tool forked event', async () => {
      // Arrange
      const event = new ToolForkedEvent(
        'tool_fork_456',
        'tool_original_123',
        'forker_789',
        3
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleToolForked(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ToolEventHandler] Tool forked: tool_fork_456 by forker_789'
      );

      consoleLogSpy.mockRestore();
    });

    it('should track fork count', async () => {
      const event = new ToolForkedEvent(
        'tool_fork_new',
        'tool_popular',
        'user_forker',
        10
      );

      await handleToolForked(event);
      expect(event.totalForks).toBe(10);
    });

    it('should handle first fork', async () => {
      const event = new ToolForkedEvent(
        'tool_fork_1',
        'tool_original',
        'user_first_fork',
        1
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleToolForked(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.totalForks).toBe(1);
      consoleLogSpy.mockRestore();
    });

    it('should track forked tool relationship', async () => {
      const event = new ToolForkedEvent(
        'tool_fork_999',
        'tool_awesome',
        'user_fan',
        5
      );

      await handleToolForked(event);
      expect(event.forkedToolId).toBe('tool_awesome');
      expect(event.forkedBy).toBe('user_fan');
    });

    it('should complete without throwing errors', async () => {
      const event = new ToolForkedEvent(
        'tool_fork_final',
        'tool_base',
        'user_dev',
        7
      );

      await expect(handleToolForked(event)).resolves.toBeUndefined();
    });
  });
});
