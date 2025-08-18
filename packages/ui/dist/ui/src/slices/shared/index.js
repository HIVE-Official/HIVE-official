/**
 * Shared Utilities & Base Components
 *
 * This module contains shared utilities, base components, and common
 * functionality that can be used across all slices.
 */
// Utility functions
export { cn } from '../../lib/utils.js';
export { formatDate, formatTime } from './utils/date-utils';
export { validateEmail, validateHandle } from './utils/validation-utils';
export { debounce, throttle } from './utils/performance-utils';
// Base components that don't belong to any specific slice
export { ErrorBoundary } from './components/error-boundary';
export { LoadingSpinner } from './components/loading-spinner';
export { EmptyState } from './components/empty-state';
export { ConfirmDialog } from './components/confirm-dialog';
// Common hooks
export { useLocalStorage } from './hooks/use-local-storage';
export { useDebounce } from './hooks/use-debounce';
export { useMediaQuery } from './hooks/use-media-query';
export { useClickOutside } from './hooks/use-click-outside';
// API utilities
export { apiClient } from './api/client';
export { apiErrorHandler } from './api/error-handler';
export { createMutation } from './api/mutations';
export { createQuery } from './api/queries';
// Constants used across slices
export { API_ENDPOINTS } from './constants/api-endpoints';
export { UI_CONSTANTS } from './constants/ui-constants';
export { BREAKPOINTS } from './constants/breakpoints';
//# sourceMappingURL=index.js.map