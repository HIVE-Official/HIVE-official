/**
 * Common type definitions for the HIVE platform
 * These types replace 'any' usage throughout the codebase
 */

// User and Authentication Types
export interface User {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'student' | 'faculty' | 'admin';
  schoolId?: string;
  handle?: string;
  major?: string;
  year?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  onboardingComplete?: boolean;
  privacy?: {
    profileVisibility: 'public' | 'connections' | 'private';
    showEmail?: boolean;
    showLocation?: boolean;
  };
}

// Space Types
export interface Space {
  id: string;
  name: string;
  description?: string;
  type: 'academic' | 'social' | 'professional' | 'creative' | 'athletic';
  category?: string;
  memberCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  settings?: Record<string, unknown>;
  visibility?: 'public' | 'private' | 'invite-only';
  schoolId?: string;
}

export interface SpaceMember {
  userId: string;
  spaceId: string;
  role: 'leader' | 'moderator' | 'member';
  joinedAt: Date | string;
  permissions?: string[];
}

// Tool Types
export interface Tool {
  id: string;
  name: string;
  description?: string;
  category: string;
  type?: 'widget' | 'automation' | 'integration' | 'utility';
  config: Record<string, unknown>;
  elements?: ToolElement[];
  createdBy: string;
  isPublished: boolean;
  version?: string;
  plantedIn?: string[];
}

export interface ToolElement {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: ToolElement[];
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date | string;
  endTime: Date | string;
  location?: string;
  spaceId?: string;
  createdBy: string;
  attendees?: string[];
  maxAttendees?: number;
  isVirtual?: boolean;
  meetingLink?: string;
  category?: string;
  status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

// Post and Feed Types
export interface Post {
  id: string;
  content: string;
  authorId: string;
  spaceId?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  likes?: string[];
  comments?: Comment[];
  attachments?: Attachment[];
  visibility?: 'public' | 'space' | 'connections';
  type?: 'text' | 'image' | 'video' | 'poll' | 'event';
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date | string;
  likes?: string[];
  parentId?: string; // For nested comments
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

// Form and Validation Types
export interface FormData {
  [key: string]: string | number | boolean | File | null | undefined;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T = FormData> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// React Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'data-testid'?: string;
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[]>;
}

// Async State Types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Activity and Analytics Types
export interface Activity {
  id: string;
  userId: string;
  type: string;
  action: string;
  target?: string;
  targetType?: 'space' | 'post' | 'event' | 'tool' | 'user';
  metadata?: Record<string, unknown>;
  timestamp: Date | string;
  ip?: string;
  userAgent?: string;
}

export interface Analytics {
  views: number;
  uniqueViews: number;
  engagement: number;
  shares?: number;
  timeSpent?: number;
  bounceRate?: number;
  period: 'day' | 'week' | 'month' | 'year';
  data: Record<string, number>;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'mention' | 'follow' | 'like' | 'comment';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

// Settings Types
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  privacy: {
    profileVisibility: 'public' | 'connections' | 'private';
    showEmail: boolean;
    showActivity: boolean;
    allowMessages: 'everyone' | 'connections' | 'none';
  };
}

// Type Guards
export function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'email' in obj;
}

export function isSpace(obj: unknown): obj is Space {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'type' in obj;
}

export function isApiError(obj: unknown): obj is ApiError {
  return typeof obj === 'object' && obj !== null && 'code' in obj && 'message' in obj;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type VoidFunction = () => void;

// Firebase Types
export type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
};

export type FirebaseDocument<T = Record<string, unknown>> = T & {
  id: string;
  createdAt?: FirebaseTimestamp | Date;
  updatedAt?: FirebaseTimestamp | Date;
};

// Export all types as a namespace for convenience
export type HiveTypes = {
  User: User;
  Space: Space;
  Tool: Tool;
  Event: Event;
  Post: Post;
  ApiResponse: ApiResponse;
  FormData: FormData;
  AsyncState: AsyncState<unknown>;
};