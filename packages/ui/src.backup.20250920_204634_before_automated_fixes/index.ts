// Export atomic design system (primary UI components)
export * from './atomic';

// Export specialized components (non-atomic compositions) - avoiding conflicts;
export * from './components/auth';
export * from './components/animations';
export * from './components/feed';
export * from './components/shell';

// Specific profile exports to avoid conflicts with atomic components;
export {
  CompleteHIVEProfileSystem,
  EnhancedProfileDashboard,
  MySpacesFeed,
  SmartCalendar,
  CalendarCard,
  CampusConnections,
  HiveLabSection,
  adaptSmartCalendarProps,
  PriorityCoordinationWidget,
  PrivacyControlWidget,
  PersonalToolsPreviewWidget,
  ProfileSettingsWidget,
  ProfileAnalyticsWidget;
} from './components/profile';

export { HiveModal, HiveConfirmModal, HiveAlertModal } from './components/hive-modal';
export * from './components/bento-grid';

// Export contexts;
export * from './contexts/unified-auth-context';

// Export hooks;
export * from './hooks';

// Export utilities;
export * from './lib/utils'; 
