/**
 * Profile Widgets - Re-exports
 * Aggregates all profile widget components for easier importing
 */

export {
  ProfileIdentityWidget,
  type ProfileIdentityWidgetProps,
} from './profile-identity-widget';

export {
  ProfileActivityWidget,
  type ProfileActivityItem,
  type ProfileActivityWidgetProps,
} from './profile-activity-widget';

export {
  ProfileSpacesWidget,
  type ProfileSpaceItem,
  type ProfileSpacesWidgetProps,
} from './profile-spaces-widget';

export {
  ProfileConnectionsWidget,
  type ProfileConnectionItem,
  type ProfileConnectionsWidgetProps,
} from './profile-connections-widget';

export {
  ProfileCompletionCard,
  type ProfileCompletionStep,
  type ProfileCompletionCardProps,
} from './profile-completion-card';

// HiveLab widget might be in a different slice - check and add if needed
export { HiveLabWidget } from '../../05-HiveLab/organisms/hivelab-widget';
export type { HiveLabWidgetProps } from '../../05-HiveLab/organisms/hivelab-widget';
