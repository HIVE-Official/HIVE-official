// Type exports for @hive/ui package

// User and Auth types
export type UserRole = 'student' | 'faculty' | 'alumni' | 'staff' | 'admin';

// Onboarding types
export interface OnboardingData {
  userId: string;
  email: string;
  handle?: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  major?: string;
  year?: number;
  interests?: string[];
  spacePreferences?: string[];
  completed: boolean;
}

// Social types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  replies?: Comment[];
  likes?: number;
}

// Calendar types
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  type: 'academic' | 'personal' | 'space' | 'system';
  spaceId?: string;
  attendees?: string[];
  location?: string;
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

export interface CalendarCardData {
  events: Event[];
  currentDate: Date;
  selectedDate?: Date;
  loading?: boolean;
}

export interface CalendarCardState {
  view: 'month' | 'week' | 'day';
  selectedDate: Date;
  events: Event[];
  loading: boolean;
}

// Space types
export interface Space {
  id: string;
  name: string;
  description?: string;
  type: 'course' | 'major' | 'dorm' | 'club' | 'interest' | 'project';
  isPrivate: boolean;
  memberCount: number;
  memberIds: string[];
  leaderId: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Tool types
export interface Tool {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  spaceId?: string;
  isPublic: boolean;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt?: Date;
}