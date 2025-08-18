export { HiveErrorBoundary as ErrorBoundary, HiveErrorBoundary } from './ErrorBoundary';
export { GlobalErrorBoundary, GlobalErrorTracker, useGlobalErrorBoundary } from './GlobalErrorBoundary';
export { NetworkError } from './NetworkError';
export { FallbackUI } from './FallbackUI';
export { useHiveErrorBoundary, reportHiveError, HiveErrorHandler } from './ErrorBoundary';
export { useNetworkMonitoring, detectCampusNetwork, generateCampusMessage } from './NetworkError';
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus } from './FallbackUI';
export type { HiveError, HiveErrorBoundaryProps } from './ErrorBoundary';
export type { NetworkErrorProps, NetworkCondition, CampusNetworkContext, NetworkErrorType } from './NetworkError';
export type { FallbackUIProps, FallbackStrategy, FeatureCategory, FallbackContext } from './FallbackUI';
//# sourceMappingURL=index.d.ts.map