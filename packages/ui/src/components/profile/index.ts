// Profile System Components
export { ProfileSystem } from './profile-system';
export { ProfileHeader } from './profile-header';
export { MySpacesFeed } from './my-spaces-feed';
export { SmartCalendar } from './smart-calendar';
export { CalendarCard } from './calendar-card';
export { CampusConnections } from './campus-connections';
export { HiveLabSection } from './hive-lab-section';
export { ProfileStats } from './profile-stats';
export { adaptSmartCalendarProps } from './calendar-data-adapter';

// Enhanced Profile Dashboard with Expand-Focus
export { EnhancedProfileDashboard } from './enhanced-profile-dashboard';

// Enhanced Profile System (Bento Grid) - temporarily disabled due to import errors
// export { EnhancedProfileSystem } from './enhanced-profile-system';
// export type { EnhancedProfileUser, ProfileCompletionStatus } from './enhanced-profile-system';

// Universal Profile System (Mobile-First with Bottom Nav) - temporarily disabled due to import errors
// export { UniversalProfileSystem } from './universal-profile-system';
// export type { UniversalProfileUser } from './universal-profile-system';

// Bento Grid Components
export * from './bento-grid';

// Profile Widgets
export { PriorityCoordinationWidget } from './widgets/priority-coordination-widget';
export { PrivacyControlWidget } from './widgets/privacy-control-widget';
export { PersonalToolsPreviewWidget } from './widgets/personal-tools-preview-widget';
export { ProfileSettingsWidget } from './widgets/profile-settings-widget';
export { ProfileAnalyticsWidget } from './widgets/profile-analytics-widget';

// Enhanced Profile Features - temporarily disabled due to import errors
// export { AnalyticsDashboard, generateSampleAnalyticsData } from './analytics-dashboard';
// export type { AnalyticsMetric, AnalyticsTimeframe, AnalyticsData } from './analytics-dashboard';

// export { PrivacyDashboard } from './privacy-dashboard';
// export type { PrivacySettings } from './privacy-dashboard';

// export { BuilderPortfolio } from './builder-portfolio';
// export type { Tool, Achievement as BuilderAchievement, BuilderStats, ToolCategory } from './builder-portfolio';

// export { AchievementSystem } from './achievement-system';
// export type { Achievement, AchievementStats, AchievementCategory, AchievementRarity } from './achievement-system';

// Types
export type * from './types';