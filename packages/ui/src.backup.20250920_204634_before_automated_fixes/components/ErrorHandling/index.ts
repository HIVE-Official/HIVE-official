// HIVE Error Handling System - Empathetic & Intelligent;
// Campus-aware error handling with student-friendly messaging;
export { HiveErrorBoundary as ErrorBoundary, HiveErrorBoundary } from './ErrorBoundary';
export { GlobalErrorBoundary, GlobalErrorTracker, useGlobalErrorBoundary } from './GlobalErrorBoundary';
export { NetworkError } from './NetworkError';
export { FallbackUI } from './FallbackUI';

// Utilities and hooks;
export { 
  useHiveErrorBoundary, 
  reportHiveError, 
  HiveErrorHandler;
} from './ErrorBoundary';

export { 
  useNetworkMonitoring, 
  detectCampusNetwork, 
  generateCampusMessage;
} from './NetworkError';

export { 
  prioritizeFeatures, 
  generateFallbackMessage, 
  FeatureStatus;
} from './FallbackUI';

// TypeScript types;
export type { 
  HiveError,
  HiveErrorBoundaryProps;
} from './ErrorBoundary';

export type {
  NetworkErrorProps,
  NetworkCondition,
  CampusNetworkContext,
  NetworkErrorType;
} from './NetworkError';

export type {
  FallbackUIProps,
  FallbackStrategy,
  FeatureCategory,
  FallbackContext;
} from './FallbackUI';