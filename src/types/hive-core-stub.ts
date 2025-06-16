export interface Element {
  id: string;
  name: string;
  category: ElementCategory;
  icon: string;
  description: string;
  usageCount?: number;
  presets?: Array<{ popularity?: number; [key: string]: any }>;
  defaultConfig?: Record<string, unknown>;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  elements: ElementInstance[];
  currentVersion?: string;
  status?: 'draft' | 'preview' | 'published';
  updatedAt?: string;
}

export interface ElementInstance {
  id: string;
  elementId: string;
  position: { x: number; y: number; width?: number; height?: number };
  config: Record<string, unknown>;
  order?: number;
}

export enum PostType {
  TEXT = 'text',
  POLL = 'poll',
  EVENT = 'event'
}

// CreatePost interface for feed composer
export interface CreatePost {
  content: string;
  postType: PostType;
  spaceId?: string;
  attachments?: string[];
  pollOptions?: string[];
  eventDate?: string;
  eventLocation?: string;
} 