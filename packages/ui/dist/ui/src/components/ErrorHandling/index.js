// HIVE Error Handling System - Empathetic & Intelligent
// Campus-aware error handling with student-friendly messaging
export { HiveErrorBoundary as ErrorBoundary, HiveErrorBoundary } from './ErrorBoundary.js';
export { GlobalErrorBoundary, GlobalErrorTracker, useGlobalErrorBoundary } from './GlobalErrorBoundary.js';
export { NetworkError } from './NetworkError.js';
export { FallbackUI } from './FallbackUI.js';
// Utilities and hooks
export { useHiveErrorBoundary, reportHiveError, HiveErrorHandler } from './ErrorBoundary.js';
export { useNetworkMonitoring, detectCampusNetwork, generateCampusMessage } from './NetworkError.js';
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus } from './FallbackUI.js';
//# sourceMappingURL=index.js.map