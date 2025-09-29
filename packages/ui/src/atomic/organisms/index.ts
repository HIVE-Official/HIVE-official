export { WelcomeMat } from "./welcome-mat"
export { CompleteHIVEToolsSystem } from "./complete-hive-tools-system"
// Legacy ProfileBentoGrid - kept for backward compatibility
export { ProfileBentoGrid } from "./profile-bento-grid"
export { NavigationShell, navigationShellVariants, navigationContentVariants, type NavigationItem } from "./navigation-shell"
export { NotificationSystem, useNotificationSystem } from "./notification-system"

// Profile Widget System - DESIGN_SPEC Compliant
export {
  ProfileIdentityWidget,
  ProfileActivityWidget,
  ProfileSpacesWidget,
  ProfileConnectionsWidget,
  ProfileCompletionCard,
  HiveLabWidget
} from './profile-widgets'

// Profile Widget Types
export type {
  ProfileIdentityWidgetProps,
  MyActivityWidgetProps,
  MySpacesWidgetProps,
  MyConnectionsWidgetProps,
  ProfileCompletionCardProps,
  HiveLabWidgetProps,
  Tool
} from './profile-widgets'