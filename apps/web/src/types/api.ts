/**
 * API Type Definitions
 * Centralized TypeScript interfaces for API handlers and responses
 */

import { NextRequest } from 'next/server';
import { User } from 'next-auth';

// Base API Context
export interface ApiContext {
  request: NextRequest;
  user?: User;
  session?: any;
  headers: Headers;
  params?: Record<string, string | string[]>;
  searchParams?: URLSearchParams;
}

// API Handler Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

// Route Parameters
export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams?: Promise<Record<string, string | string[]>>;
}

// Handler Function Types
export type ApiHandler<TParams = any, TResponse = any> = (
  context: ApiContext,
  params?: TParams
) => Promise<TResponse>;

export type GetHandler<TParams = any, TResponse = any> = ApiHandler<TParams, TResponse>;
export type PostHandler<TParams = any, TResponse = any> = ApiHandler<TParams, TResponse>;
export type PutHandler<TParams = any, TResponse = any> = ApiHandler<TParams, TResponse>;
export type DeleteHandler<TParams = any, TResponse = any> = ApiHandler<TParams, TResponse>;

// Common API Request Bodies
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface FilterParams {
  search?: string;
  category?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Firebase Document Types
export interface FirebaseDocument {
  id: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface FirebaseUser extends FirebaseDocument {
  email: string;
  name?: string;
  image?: string;
  role?: string;
  metadata?: Record<string, any>;
}

export interface FirebasePost extends FirebaseDocument {
  title?: string;
  content: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
  spaceId?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  tags?: string[];
  media?: string[];
  visibility?: 'public' | 'space' | 'private';
}

export interface FirebaseSpace extends FirebaseDocument {
  name: string;
  description?: string;
  category?: string;
  visibility?: 'public' | 'private' | 'invite';
  memberCount?: number;
  postCount?: number;
  leaderId?: string;
  leaderName?: string;
  settings?: Record<string, any>;
}

export interface FirebaseComment extends FirebaseDocument {
  content: string;
  postId: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
  parentCommentId?: string;
  likeCount?: number;
  replyCount?: number;
  isEdited?: boolean;
}

export interface FirebaseEvent extends FirebaseDocument {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isAllDay?: boolean;
  spaceId?: string;
  organizerId: string;
  organizerName?: string;
  attendeeCount?: number;
  maxAttendees?: number;
  rsvpRequired?: boolean;
}

export interface FirebaseTool extends FirebaseDocument {
  name: string;
  description?: string;
  category?: string;
  config?: Record<string, any>;
  elements?: any[];
  authorId: string;
  authorName?: string;
  spaceId?: string;
  visibility?: 'public' | 'space' | 'private';
  version?: string;
  stats?: {
    views?: number;
    uses?: number;
    likes?: number;
    shares?: number;
  };
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

// Common API Response Types
export interface ListResponse<T> {
  items: T[];
  total: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
}

export interface CreateResponse<T> {
  created: T;
  id: string;
  message?: string;
}

export interface UpdateResponse<T> {
  updated: T;
  message?: string;
}

export interface DeleteResponse {
  deleted: boolean;
  id: string;
  message?: string;
}

// Search Result Types
export interface SearchResult {
  id: string;
  type: 'post' | 'space' | 'user' | 'event' | 'tool';
  title: string;
  description?: string;
  url: string;
  icon?: string;
  timestamp?: string;
  highlights?: string[];
  score?: number;
  metadata?: Record<string, any>;
}

// Analytics Types
export interface AnalyticsData {
  overview: {
    totalUsage: number;
    activeUsers: number;
    avgRating: number;
    downloads: number;
  };
  usage: {
    daily: Array<{ date: string; usage: number; users: number }>;
    spaces: Array<{ name: string; usage: number; members: number }>;
    features: Array<{ feature: string; usage: number; percentage: number }>;
  };
  feedback: {
    ratings: Array<{ rating: number; count: number }>;
    comments: Array<{ user: string; comment: string; rating: number; date: string }>;
  };
}

// Notification Types
export interface Notification {
  id: string;
  recipientId: string;
  type: 'like' | 'comment' | 'share' | 'follow' | 'mention' | 'system';
  title?: string;
  message: string;
  actorId?: string;
  actorName?: string;
  actorImage?: string;
  targetId?: string;
  targetType?: string;
  read: boolean;
  createdAt: string;
}