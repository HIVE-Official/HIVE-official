/**
 * Global Type Definitions for HIVE Platform
 * RED TEAM - Type Safety Initiative
 *
 * This file contains comprehensive type definitions to replace
 * the 1,526 'any' type usages found across the codebase.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  CollectionReference,
  Query
} from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';

// ============================================
// Core Domain Types
// ============================================

export interface HiveUser {
  id: string;
  email: string;
  emailVerified: boolean;
  handle?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  profileImageUrl?: string;
  coverImageUrl?: string;
  socialLinks?: SocialLinks;
  interests?: string[];
  skills?: string[];
  campusId: string;
  isActive: boolean;
  isAdmin?: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  lastActiveAt?: Timestamp | Date;
  onboardingCompleted?: boolean;
  metadata?: UserMetadata;
}

export interface UserMetadata {
  loginCount?: number;
  lastLoginAt?: Timestamp | Date;
  lastLoginIp?: string;
  deviceInfo?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  language?: string;
  timezone?: string;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: SpaceCategory;
  coverImageUrl?: string;
  iconUrl?: string;
  campusId: string;
  createdBy: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  memberCount: number;
  postCount: number;
  isActive: boolean;
  isPublic: boolean;
  settings?: SpaceSettings;
  metadata?: SpaceMetadata;
}

export type SpaceCategory =
  | 'academic'
  | 'social'
  | 'sports'
  | 'clubs'
  | 'housing'
  | 'marketplace'
  | 'events'
  | 'other';

export interface SpaceSettings {
  requireApproval?: boolean;
  allowAnonymousPosts?: boolean;
  moderationLevel?: 'none' | 'low' | 'medium' | 'high';
  pinnedPosts?: string[];
}

export interface SpaceMetadata {
  totalViews?: number;
  weeklyActiveMembers?: number;
  trending?: boolean;
  tags?: string[];
}

export interface Post {
  id: string;
  spaceId: string;
  authorId: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  content: string;
  images?: string[];
  attachments?: Attachment[];
  type: PostType;
  visibility: 'public' | 'members' | 'private';
  campusId: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
  isPinned?: boolean;
  isPromoted?: boolean;
  metadata?: PostMetadata;
}

export type PostType =
  | 'text'
  | 'image'
  | 'poll'
  | 'event'
  | 'marketplace'
  | 'announcement';

export interface PostMetadata {
  edited?: boolean;
  editedAt?: Timestamp | Date;
  reportCount?: number;
  isHidden?: boolean;
  moderationStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  content: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  likeCount: number;
  replyCount?: number;
  parentCommentId?: string;
  isDeleted?: boolean;
}

export interface Attachment {
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  name?: string;
  size?: number;
  mimeType?: string;
  thumbnail?: string;
}

// ============================================
// API Types
// ============================================

export interface ApiAuthContext {
  userId: string;
  token: string;
  isAdmin?: boolean;
  user: {
    email?: string;
    emailVerified?: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface ResponseMetadata {
  timestamp?: string;
  requestId?: string;
  version?: string;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse {
  items: any[];
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
}

// ============================================
// Route Handler Types
// ============================================

export type RouteHandler<TParams = void> = TParams extends void
  ? (request: NextRequest) => Promise<NextResponse> | NextResponse
  : (request: NextRequest, params: TParams) => Promise<NextResponse> | NextResponse;

export type AuthenticatedRouteHandler<TParams = void> = TParams extends void
  ? (request: NextRequest, context: ApiAuthContext) => Promise<NextResponse> | NextResponse
  : (request: NextRequest, context: ApiAuthContext, params: TParams) => Promise<NextResponse> | NextResponse;

export interface RouteParams {
  params: Record<string, string | string[]>;
  searchParams?: URLSearchParams;
}

export interface DynamicRouteParams {
  params: {
    [key: string]: string;
  };
}

// ============================================
// Firebase Types
// ============================================

export interface FirebaseDoc extends DocumentData {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseQuery {
  collection: string;
  where?: Array<{
    field: string;
    operator: WhereFilterOp;
    value: any;
  }>;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  limit?: number;
  startAfter?: any;
}

export type WhereFilterOp =
  | '<' | '<=' | '==' | '!=' | '>=' | '>'
  | 'array-contains' | 'array-contains-any'
  | 'in' | 'not-in';

export type FirebaseTimestamp = Timestamp;
export type FirebaseDocRef = DocumentReference;
export type FirebaseCollectionRef = CollectionReference;
export type FirebaseQuery = Query;

// ============================================
// Form & Input Types
// ============================================

export interface FormData<T = Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: string;
}

export interface FileUpload {
  file: File;
  url?: string;
  progress?: number;
  error?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

// ============================================
// Event Types
// ============================================

export interface HiveEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date | Timestamp;
  endDate?: Date | Timestamp;
  location?: EventLocation;
  organizer: EventOrganizer;
  attendees?: string[];
  maxAttendees?: number;
  isPublic: boolean;
  tags?: string[];
  imageUrl?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  campusId: string;
}

export interface EventLocation {
  name: string;
  address?: string;
  building?: string;
  room?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventOrganizer {
  id: string;
  name: string;
  type: 'user' | 'space' | 'organization';
  avatar?: string;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Timestamp | Date;
  expiresAt?: Timestamp | Date;
}

export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'post'
  | 'event'
  | 'announcement'
  | 'system';

// ============================================
// Analytics Types
// ============================================

export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
  properties?: Record<string, unknown>;
}

export interface AnalyticsMetrics {
  pageViews: number;
  uniqueVisitors: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate?: number;
}

// ============================================
// Error Types
// ============================================

export interface AppError extends Error {
  code: string;
  statusCode: number;
  context?: Record<string, unknown>;
  cause?: any;
  toJSON(): object;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
  value?: any;
}

// ============================================
// Utility Types
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type AsyncFunction<T = void, R = void> = (arg: T) => Promise<R>;
export type SyncFunction<T = void, R = void> = (arg: T) => R;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// ============================================
// Component Props Types
// ============================================

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  testId?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// ============================================
// Hook Return Types
// ============================================

export interface UseAuthReturn {
  user: HiveUser | null;
  loading: boolean;
  error: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface UseFeedReturn {
  posts: Post[];
  loading: boolean;
  error: any | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface UseSpaceReturn {
  space: Space | null;
  loading: boolean;
  error: any | null;
  members: HiveUser[];
  posts: Post[];
  joinSpace: () => Promise<void>;
  leaveSpace: () => Promise<void>;
}

// ============================================
// State Management Types
// ============================================

export interface AppState {
  auth: AuthState;
  ui: UIState;
  feed: FeedState;
  spaces: SpacesState;
  notifications: NotificationsState;
}

export interface AuthState {
  user: HiveUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any | null;
}

export interface UIState {
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  modalStack: string[];
  toasts: Toast[];
}

export interface FeedState {
  posts: Post[];
  loading: boolean;
  error: any | null;
  cursor?: string;
  hasMore: boolean;
}

export interface SpacesState {
  activeSpace: Space | null;
  userSpaces: Space[];
  recommendedSpaces: Space[];
  loading: boolean;
  error: any | null;
}

export interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
  error: any | null;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

// ============================================
// Logger Types
// ============================================

export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: any;
  userId?: string;
  requestId?: string;
}

export interface LoggerConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  enableConsole: boolean;
  enableRemote: boolean;
  remoteUrl?: string;
  format?: 'json' | 'text';
}

// ============================================
// Export all types
// ============================================

export type * from './global';