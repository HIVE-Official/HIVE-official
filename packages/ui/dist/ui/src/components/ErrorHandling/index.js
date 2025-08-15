// HIVE Error Handling System - Empathetic & Intelligent
// Campus-aware error handling with student-friendly messaging
export { HiveErrorBoundary as ErrorBoundary, HiveErrorBoundary } from './ErrorBoundary';
export { GlobalErrorBoundary, GlobalErrorTracker, useGlobalErrorBoundary } from './GlobalErrorBoundary';
export { NetworkError } from './NetworkError';
export { FallbackUI } from './FallbackUI';
// Utilities and hooks
export { useHiveErrorBoundary, reportHiveError, HiveErrorHandler } from './ErrorBoundary';
export { useNetworkMonitoring, detectCampusNetwork, generateCampusMessage } from './NetworkError';
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus } from './FallbackUI';
//# sourceMappingURL=index.js.map