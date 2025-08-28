export type UserRole = 'student' | 'faculty' | 'alumni' | 'staff' | 'admin';
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
export interface Tool {
    id: string;
    name: string;
    description?: string;
    creatorId: string;
    spaceId?: string;
    isPublic: boolean;
    config: Record<string, any>;
    createdAt: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=types.d.ts.map