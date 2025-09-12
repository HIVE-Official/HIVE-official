// Common UI types
export interface OnboardingData {
  userId: string;
  email: string;
  step: number;
  completed: boolean;
  data: Record<string, unknown>;
}

export type UserRole = 'student' | 'faculty' | 'alumni' | 'staff';

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
  replies?: Comment[];
  author?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
  };
  parentCommentId?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  type: 'academic' | 'personal' | 'space' | 'system';
  spaceId?: string;
  creatorId: string;
  attendeeIds: string[];
  maxAttendees?: number;
  createdAt: Date;
  updatedAt?: Date;
  isAllDay?: boolean;
}

export interface CalendarCardData {
  events: Event[];
  selectedDate?: Date;
  month?: number;
  year?: number;
  upcomingEvents?: Event[];
  todaysEvents?: Event[];
  nextEvent?: Event;
  connections?: unknown[];
  conflicts?: unknown[];
  lastUpdated?: Date;
}

export interface CalendarCardState {
  isLoading: boolean;
  error?: string;
  data?: CalendarCardData;
}