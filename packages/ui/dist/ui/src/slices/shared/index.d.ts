/**
 * Shared Utilities & Base Components
 *
 * This module contains shared utilities, base components, and common
 * functionality that can be used across all slices.
 */
export { cn } from '../../lib/utils';
export { formatDate, formatTime } from './utils/date-utils';
export { validateEmail, validateHandle } from './utils/validation-utils';
export { debounce, throttle } from './utils/performance-utils';
export { ErrorBoundary } from './components/error-boundary';
export { LoadingSpinner } from './components/loading-spinner';
export { EmptyState } from './components/empty-state';
export { ConfirmDialog } from './components/confirm-dialog';
export { useLocalStorage } from './hooks/use-local-storage';
export { useDebounce } from './hooks/use-debounce';
export { useMediaQuery } from './hooks/use-media-query';
export { useClickOutside } from './hooks/use-click-outside';
export { apiClient } from './api/client';
export { apiErrorHandler } from './api/error-handler';
export { createMutation } from './api/mutations';
export { createQuery } from './api/queries';
export { API_ENDPOINTS } from './constants/api-endpoints';
export { UI_CONSTANTS } from './constants/ui-constants';
export { BREAKPOINTS } from './constants/breakpoints';
export type { ApiResponse, ErrorResponse, PaginatedResponse } from './types/api-types';
export type { BaseComponent, WithChildren } from './types/component-types';
//# sourceMappingURL=index.d.ts.map