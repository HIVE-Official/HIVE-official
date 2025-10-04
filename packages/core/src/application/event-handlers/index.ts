/**
 * Event Handler Registry
 * Central location for registering all domain event handlers
 */

import { getEventBus } from '../../infrastructure/events';

// Profile event handlers
import {
  handleProfileCreated,
  handleProfileOnboarded
} from './profile-event.handlers';

// Space event handlers
import {
  handleSpaceCreated,
  handleMemberJoined,
  handlePostCreated,
  handleMemberRemoved
} from './space-event.handlers';

// Ritual event handlers
import {
  handleRitualCreated,
  handleParticipantJoined,
  handleMilestoneCompleted,
  handleRitualActivated
} from './ritual-event.handlers';

// Tool event handlers
import {
  handleToolCreated,
  handleToolPublished,
  handleToolUsed,
  handleToolForked
} from './tool-event.handlers';

/**
 * Register all event handlers with the event bus
 * Call this once during application initialization
 */
export function registerEventHandlers(): void {
  const eventBus = getEventBus({ enableLogging: true });

  // Profile events
  eventBus.subscribe('ProfileCreated', handleProfileCreated);
  eventBus.subscribe('ProfileOnboarded', handleProfileOnboarded);

  // Space events
  eventBus.subscribe('SpaceCreated', handleSpaceCreated);
  eventBus.subscribe('MemberJoined', handleMemberJoined);
  eventBus.subscribe('PostCreated', handlePostCreated);
  eventBus.subscribe('MemberRemoved', handleMemberRemoved);

  // Ritual events
  eventBus.subscribe('RitualCreated', handleRitualCreated);
  eventBus.subscribe('ParticipantJoined', handleParticipantJoined);
  eventBus.subscribe('MilestoneCompleted', handleMilestoneCompleted);
  eventBus.subscribe('RitualActivated', handleRitualActivated);

  // Tool events
  eventBus.subscribe('ToolCreated', handleToolCreated);
  eventBus.subscribe('ToolPublished', handleToolPublished);
  eventBus.subscribe('ToolUsed', handleToolUsed);
  eventBus.subscribe('ToolForked', handleToolForked);

  console.log('[EventHandlers] All domain event handlers registered');
  console.log(`[EventHandlers] Total event types: ${eventBus.getRegisteredEvents().length}`);
}

// Export all handlers for testing
export * from './profile-event.handlers';
export * from './space-event.handlers';
export * from './ritual-event.handlers';
export * from './tool-event.handlers';
