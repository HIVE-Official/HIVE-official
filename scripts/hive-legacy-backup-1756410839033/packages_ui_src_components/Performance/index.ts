// HIVE Performance System - Complete Architecture
// Advanced performance optimization with campus network intelligence

export { LazyRoutes } from './LazyRoutes';
export { Preloader } from './Preloader';
export { OfflineHandler } from './OfflineHandler';
export { 
  SuspenseBoundary,
  ProfileSuspenseBoundary,
  SpacesSuspenseBoundary,
  ToolsSuspenseBoundary,
  FeedSuspenseBoundary
} from './SuspenseBoundary';

// Utilities and managers
export { 
  SmartPreloader, 
  useNavigationAnalytics 
} from './LazyRoutes';

export { 
  CampusPreloadManager,
  createPreloadResource 
} from './Preloader';

export { 
  CampusOfflineManager, 
  useConnectionMonitor 
} from './OfflineHandler';

// Utility functions
export { createLazyRoute } from './LazyRoutes';

// TypeScript types
export type {
  LazyRoutesProps,
  LazyRoute,
  RoutePriority,
  UserPattern,
  CampusContext,
  NavigationAnalytics
} from './LazyRoutes';

export type {
  PreloaderProps,
  PreloadResource,
  ResourceType,
  CampusPreloadContext,
  UserPreloadContext,
  PreloadStats
} from './Preloader';

export type {
  OfflineHandlerProps,
  OfflineCapability,
  SyncStrategy,
  CampusOfflineContext,
  OfflineActivity,
  ConnectionState,
  SyncResult
} from './OfflineHandler';

export type {
  SuspenseBoundaryProps
} from './SuspenseBoundary';