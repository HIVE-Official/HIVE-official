/**
 * Event type for calendar and event management
 */
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  organizer?: string;
  attendees?: string[];
  type?: 'meeting' | 'workshop' | 'social' | 'academic' | 'other';
  isAllDay?: boolean;
  isRecurring?: boolean;
  recurrenceRule?: string;
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Date;
  parentId?: string; // For nested comments
  likes?: number;
  isEdited?: boolean;
  editedAt?: Date;
}