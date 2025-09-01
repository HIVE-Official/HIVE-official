// Dashboard Components - Complete HIVE Dashboard System
export * from './hive-dashboard';
export * from './personal-tools';
export * from './calendar-widget';
export * from './activity-tracker';
export * from './bento-grid';
export * from './dashboard-demo';
export * from './notification-center';
// export * from './recommendation-engine'; // Temporarily disabled
// export * from './dashboard-customization'; // Temporarily disabled
export * from './dashboard-loading-states';

// Type exports
export type {
  ProfileDashboardData,
} from './hive-dashboard';

export type {
  PersonalTool,
  PersonalToolsData,
} from './personal-tools';

export type {
  CalendarEvent,
  CalendarWidgetData,
} from './calendar-widget';

export type {
  ActivityMetric,
  ActivitySession,
  ActivityInsight,
  ActivityGoal,
  ActivityTrackerData,
} from './activity-tracker';

export type {
  GridSize,
  GridPosition,
  BentoGridItem,
  BentoGridLayout,
} from './bento-grid';

export type {
  HiveNotification,
} from './notification-center';

// export type {
//   SpaceRecommendation,
//   ToolRecommendation,
//   ConnectionRecommendation,
//   ContentRecommendation,
//   RecommendationData,
// } from './recommendation-engine';

// export type {
//   DashboardWidget,
//   DashboardLayout,
//   CustomizationPreferences,
// } from './dashboard-customization';

export type {
  LoadingState,
  ErrorState,
  ConnectionState,
} from './dashboard-loading-states';

// Mock data exports for development and testing
export {
  mockPersonalToolsData,
} from './personal-tools';

export {
  mockCalendarData,
} from './calendar-widget';

export {
  mockActivityTrackerData,
} from './activity-tracker';

export {
  defaultLayouts,
  createGridItem,
  optimizeLayout,
} from './bento-grid';

// Component exports
export {
  NotificationCenter,
} from './notification-center';

// export {
//   RecommendationEngine,
// } from './recommendation-engine';

// export {
//   DashboardCustomization,
// } from './dashboard-customization';

export {
  DashboardSkeleton,
  WidgetSkeleton,
  DashboardError,
  LoadingProgress,
  ConnectionStatus,
  AccessibilityAnnouncer,
  EmptyState,
} from './dashboard-loading-states';