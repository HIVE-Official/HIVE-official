// Dashboard Components - Complete HIVE Dashboard System
export * from './hive-dashboard';
export * from './personal-tools';
export * from './calendar-widget';
export * from './activity-tracker';
export * from './bento-grid';
export * from './dashboard-demo';

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