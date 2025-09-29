/**
 * Profile Widget Exports
 * DESIGN_SPEC Compliant Components
 */

export { ProfileIdentityWidget } from './profile-identity-widget';
export { MyActivityWidget as ProfileActivityWidget } from './profile-activity-widget';
export { MySpacesWidget as ProfileSpacesWidget } from './profile-spaces-widget';
export { MyConnectionsWidget as ProfileConnectionsWidget } from './profile-connections-widget';
export { ProfileCompletionCard } from './profile-completion-card';
export { HiveLabWidget } from './hivelab-widget';

// Export profile type utilities
export { specProfileToUIProfile } from './profile-types';

// Re-export types
export type { ProfileIdentityWidgetProps } from './profile-identity-widget';
export type { MyActivityWidgetProps } from './profile-activity-widget';
export type { MySpacesWidgetProps } from './profile-spaces-widget';
export type { MyConnectionsWidgetProps } from './profile-connections-widget';
export type { ProfileCompletionCardProps } from './profile-completion-card';
export type { HiveLabWidgetProps, Tool } from './hivelab-widget';