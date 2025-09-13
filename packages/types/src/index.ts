/**
 * HIVE Platform Type Definitions
 * Central export point for all type definitions
 */

export * from './common';

// Re-export for convenience
export type { 
  User,
  Space,
  SpaceMember,
  Tool,
  ToolElement,
  Event,
  Post,
  Comment,
  Attachment,
  ApiResponse,
  PaginatedResponse,
  ApiError,
  FormData,
  ValidationError,
  FormState,
  BaseComponentProps,
  PageProps,
  AsyncState,
  Activity,
  Analytics,
  Notification,
  UserSettings,
  FirebaseTimestamp,
  FirebaseDocument,
  Nullable,
  Optional,
  Maybe,
  AsyncFunction,
  VoidFunction,
  HiveTypes
} from './common';

// Type guard exports
export {
  isUser,
  isSpace,
  isApiError
} from './common';