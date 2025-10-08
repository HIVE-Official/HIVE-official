/**
 * Profile Domain Event Handlers
 * Handle cross-aggregate communication when profile events occur
 */
import { EventHandler } from '../../infrastructure/events';
import { ProfileCreatedEvent } from '../../domain/profile/events/profile-created.event';
import { ProfileOnboardedEvent } from '../../domain/profile/events/profile-onboarded.event';
/**
 * When a profile is created:
 * 1. Create default feed for user
 * 2. Set up initial notifications preferences
 * 3. Track sign-up analytics
 */
export declare const handleProfileCreated: EventHandler<ProfileCreatedEvent>;
/**
 * When a profile completes onboarding:
 * 1. Recommend spaces based on interests
 * 2. Suggest initial connections
 * 3. Send welcome notification with next steps
 */
export declare const handleProfileOnboarded: EventHandler<ProfileOnboardedEvent>;
//# sourceMappingURL=profile-event.handlers.d.ts.map