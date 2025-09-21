// Stub types for @hive/core to resolve import errors;
// This is a temporary solution until proper dependency resolution is fixed;
export interface Post {id: string;
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
  pollMetadata?: {
    question: string;
    options: Array<{ text: string; votes: number}>;
  };
  eventMetadata?: {
    title: string;
    description?: string;
    startTime: string;
  };
  author?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
    role?: "member" | "builder" | "admin";
  };
}

export interface CreatePost {content: string;
  type: PostType;
  spaceId?: string;
  postType?: PostType | "text";}

export enum PostType {TEXT = "text",
  IMAGE = "image",
  LINK = "link",
  POLL = "poll",
  EVENT = "event",}

export interface Space {id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  memberCount: number;
  status?: string;
  bannerUrl?: string;
  type?: string;
  tags?: Array<{ sub_type: string}>;
}

export interface Element {id: string;
  type: string;
  name: string;
  category: ElementCategory;
  icon?: string;
  description?: string;}

export interface ElementInstance {id: string;
  elementId: string;
  position: { x: number; y: number};
  properties: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface Tool {id: string;
  name: string;
  description?: string;
  elements: ElementInstance[];}

export enum ElementCategory {DISPLAY = "Display & Layout",
  INPUT = "Inputs & Choices",
  LOGIC = "Logic & Dynamics",}

export enum SpaceTag {ACADEMIC = "academic",
  SOCIAL = "social",
  PROFESSIONAL = "professional",}

export interface User {id: string;
  email: string;
  displayName?: string;
  photoURL?: string;}

export interface School {id: string;
  name: string;
  domain?: string;}

// Firebase Timestamp stub;
export interface Timestamp {seconds: number;
  nanoseconds: number;
  toDate(): Date;}

// Additional types for feed components;
export interface FeedPost extends Post {
  author: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
    role?: "member" | "builder" | "admin";
  };
}

export interface FeedResponse {posts: FeedPost[];
  hasMore: boolean;
  lastPostId?: string;}

export interface InfiniteQueryData {pages: FeedResponse[];
  pageParams: unknown[];}
