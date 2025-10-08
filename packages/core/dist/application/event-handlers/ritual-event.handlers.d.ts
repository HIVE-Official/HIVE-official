/**
 * Ritual Domain Event Handlers
 * Handle cross-aggregate communication when ritual events occur
 */
import { EventHandler } from '../../infrastructure/events';
import { RitualCreatedEvent } from '../../domain/rituals/events/ritual-created.event';
import { ParticipantJoinedEvent } from '../../domain/rituals/events/participant-joined.event';
import { MilestoneCompletedEvent } from '../../domain/rituals/events/milestone-completed.event';
import { RitualActivatedEvent } from '../../domain/rituals/events/ritual-activated.event';
/**
 * When a ritual is created:
 * 1. Add to campus-wide ritual feed
 * 2. Notify eligible participants
 * 3. Track creation analytics
 */
export declare const handleRitualCreated: EventHandler<RitualCreatedEvent>;
/**
 * When a participant joins a ritual:
 * 1. Update ritual leaderboard
 * 2. Send join confirmation notification
 * 3. Add ritual updates to user's feed
 */
export declare const handleParticipantJoined: EventHandler<ParticipantJoinedEvent>;
/**
 * When a milestone is completed:
 * 1. Award points/badges to participant
 * 2. Update leaderboard rankings
 * 3. Send achievement notification
 * 4. Post achievement to user's feed
 */
export declare const handleMilestoneCompleted: EventHandler<MilestoneCompletedEvent>;
/**
 * When a ritual is activated:
 * 1. Notify all participants
 * 2. Add to trending rituals
 * 3. Schedule reminder notifications
 */
export declare const handleRitualActivated: EventHandler<RitualActivatedEvent>;
//# sourceMappingURL=ritual-event.handlers.d.ts.map