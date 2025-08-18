// HIVE State Management System
export * from './hive-state-management';
export * from './hive-auth-hooks';

// Main state provider (recommended)
export { HiveStateProvider as StateProvider } from './hive-state-management';

// Core hooks for app features
export {
  useHiveState as useState
} from './hive-state-management';

export {
  // useAuth removed - use useUnifiedAuth from unified-auth-context instead
  useOnboarding,
  useBuilderProgression,
  usePrivacy
} from './hive-auth-hooks';

// Utility functions
export {
  canPerformToolAction,
  generateToolShareUrl
} from './hive-state-management';

// Type exports for TypeScript
export type {
  User,
  Space,
  Tool,
  AppState,
  StateAction,
  AuthStatus,
  ProfileCompletionStage,
  BuilderLevel,
  ToolPermission,
  SpaceMembershipRole,
  GhostModeStatus
} from './hive-state-management';