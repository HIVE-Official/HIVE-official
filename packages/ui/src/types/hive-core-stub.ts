// Partial consolidation with @hive/core types
// Some types are imported from @hive/core to reduce duplication
// Full consolidation blocked by TypeScript isolatedModules configuration

// Core types that can be safely imported
export type { 
  User, 
  Space,
  Tool
} from '@hive/core';

// PostType enum causes re-export issues in isolatedModules mode
// Define locally for now, TODO: fix in future refactor
export enum PostType {
  TEXT = "text",
  IMAGE = "image", 
  LINK = "link",
  POLL = "poll",
  EVENT = "event",
}

// Post interface - kept local due to compatibility issues
// TODO: Consolidate with @hive/core once component interfaces align
export interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  reactions?: Record<string, number>;
  reactedUsers?: Record<string, string[]>;
  type?: PostType;
  isDeleted?: boolean;
  isFlagged?: boolean;
  isPinned?: boolean;
  isEdited?: boolean;
  author?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
    role?: "member" | "builder" | "admin";
  };
}

// Legacy CreatePost for backwards compatibility  
export interface CreatePost {
  content: string;
  type: PostType;
  spaceId?: string;
  postType?: PostType | "text";
}

export interface Element {
  id: string;
  type: string;
  name: string;
  category: ElementCategory;
  icon?: string;
  description?: string;
}

export interface ElementInstance {
  id: string;
  elementId: string;
  position: { x: number; y: number };
  properties: Record<string, unknown>;
  config?: Record<string, unknown>;
}

// Tool interface is now imported from @hive/core

export enum ElementCategory {
  DISPLAY = "Display & Layout",
  INPUT = "Inputs & Choices",
  LOGIC = "Logic & Dynamics",
}

export enum SpaceTag {
  ACADEMIC = "academic",
  SOCIAL = "social",
  PROFESSIONAL = "professional",
}

// User interface is now imported from @hive/core

export interface School {
  id: string;
  name: string;
  domain?: string;
}

// Firebase Timestamp stub
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
  toDate(): Date;
}

// Additional types for feed components
// Using intersection type instead of extends to avoid issues with Post import
export interface FeedPost {
  id: string;
  content: string;
  type: PostType;
  spaceId?: string;
  createdAt: any;
  author: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
    role?: "member" | "builder" | "admin";
  };
}

export interface FeedResponse {
  posts: FeedPost[];
  hasMore: boolean;
  lastPostId?: string;
}

export interface InfiniteQueryData {
  pages: FeedResponse[];
  pageParams: unknown[];
}
