/**
 * Local type definitions to replace @hive/core imports
 * These provide the essential types needed by the web app
 */

// Space-related types
export interface Space {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: SpaceType;
  campusId: string;
  visibility: 'public' | 'private' | 'hidden';
  memberCount: number;
  isActive: boolean;
  tags: string[];
  settings: {
    allowMemberPosts: boolean;
    requireApproval: boolean;
    allowEvents: boolean;
    allowTools: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  leaderId?: string;
  moderators: string[];
  metadata?: Record<string, any>;
}

export type SpaceType = 
  | 'academic' 
  | 'social' 
  | 'professional' 
  | 'hobby' 
  | 'service' 
  | 'study-group'
  | 'cohort'
  | 'class'
  | 'club'
  | 'organization';

// Tool-related types
export interface Tool {
  id: string;
  name: string;
  description: string;
  version: string;
  ownerId: string;
  spaceId?: string;
  isPublic: boolean;
  elements: ElementInstance[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ElementInstance {
  id: string;
  type: string;
  properties: Record<string, any>;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  children?: ElementInstance[];
}

// Post-related types
export interface Post {
  id: string;
  authorId: string;
  spaceId?: string;
  content: string;
  type: 'text' | 'image' | 'link' | 'poll' | 'event';
  visibility: 'public' | 'members' | 'private';
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

// Utility functions that were imported from @hive/core
export function generateHandleVariants(baseHandle: string): string[] {
  const variants = [baseHandle];
  
  // Add numbered variants
  for (let i = 1; i <= 5; i++) {
    variants.push(`${baseHandle}${i}`);
    variants.push(`${baseHandle}_${i}`);
  }
  
  // Add random suffix variants
  const suffixes = ['hive', 'ub', 'buffalo', '2025'];
  suffixes.forEach(suffix => {
    variants.push(`${baseHandle}_${suffix}`);
    variants.push(`${baseHandle}${suffix}`);
  });
  
  return variants;
}

export function generateBaseHandle(name: string, email?: string): string {
  // Start with name
  let handle = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15);
  
  // If too short, try to use email prefix
  if (handle.length < 3 && email) {
    const emailPrefix = email.split('@')[0];
    handle = emailPrefix
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 15);
  }
  
  // Ensure minimum length
  if (handle.length < 3) {
    handle = 'user' + Math.random().toString(36).substring(2, 8);
  }
  
  return handle;
}