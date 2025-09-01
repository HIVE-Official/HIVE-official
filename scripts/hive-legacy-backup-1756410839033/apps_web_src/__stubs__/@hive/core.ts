// Temporary stub for @hive/core to enable compilation testing
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  handle?: string;
  avatar?: string;
  userType?: string;
  major?: string;
  graduationYear?: number;
  campusId?: string;
}

export interface Space {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  memberCount: number;
  memberIds: string[];
  category?: string;
  tags?: string[];
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  spaceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  spaceId?: string;
  isPublic: boolean;
}

export interface Activity {
  id: string;
  userId: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  reactions?: any[];
}

export interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  role: SpaceRole;
  joinedAt: Date;
}

export interface School {
  id: string;
  name: string;
  domain: string;
  location?: string;
}

export interface AuthUser extends User {
  isAuthenticated: boolean;
}

// Stub types and functions
export type CampusId = string;
export type SpaceRole = 'admin' | 'moderator' | 'member';

export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
export const generateHandle = (name: string): string => name.toLowerCase().replace(/\s+/g, '');
export const formatDate = (date: Date): string => date.toLocaleDateString();