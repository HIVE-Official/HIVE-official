export interface User {id: string;
  fullName: string;
  handle: string;
  email: string;
  avatar?: string | null;
  major?: string | null;
  graduationYear?: number | null;
  school?: string | null;
  isBuilder: boolean;
  isPublic: boolean;
  builderLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  memberSince: string;
  onlineStatus: 'online' | 'offline' | 'invisible';
  timezone?: string;
  location?: string;
  bio?: string | null;
  interests: string[];
  stats: {
    totalSpaces: number;
    activeSpaces: number;
    toolsCreated: number;
    connectionsCount: number;
    streakDays: number;
    totalActivity: number;};
  privacy?: {
    ghostMode: boolean;
    showActivity: boolean;
    showSpaces: boolean;
    showConnections: boolean;
  };
}

export interface SpacePost {id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'announcement' | 'discussion' | 'update' | 'question';
  replies?: number;
  reactions?: {
    likes: number;
    helpful: number;};
}

export interface Space {id: string;
  name: string;
  type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
  memberCount: number;
  unreadCount: number;
  lastActivity: string;
  recentPosts?: SpacePost[]; // Made optional to handle cases where posts aren't loaded yet;
  icon?: string;
  color?: string;
  isPrivate?: boolean;
  isFavorite?: boolean;
  isPinned?: boolean;}

export interface EventOverlap {count: number;
  message: string;}

export interface Event {id: string;
  title: string;
  time: string;
  type: 'class' | 'social' | 'meeting' | 'academic' | 'milestone' | 'deadline';
  location?: string;
  attendees: string[];
  overlap?: EventOverlap;
  isRecurring?: boolean;
  reminder?: string;
  description?: string;
  isAllDay?: boolean;
  hasReminder?: boolean;
  reminderMinutes?: number;
  metadata?: {
    spaceId?: string;
    rsvpStatus?: 'yes' | 'no' | 'maybe' | 'pending';
    professor?: string;
    room?: string;
    buildingCode?: string;
    recurring?: boolean;
    conflictsWith?: string[];};
}

export interface Connection {id: string;
  type: 'dorm_classmate' | 'tool_usage' | 'multi_overlap' | 'tool_collaboration' | 'cultural_connection' | 'mentorship' | 'alumni_network';
  message: string;
  people: string[];
  action: string;
  priority?: 'high' | 'medium' | 'low';}

export interface HiveLabSection {isLocked: boolean;
  availableTools: string[];
  createdTools: string[];
  comingSoon: string[];}

export interface ProfileSystemProps {user: User | null;
  spaces: Space[];
  events: Event[];
  connections: Connection[];
  hiveLab: HiveLabSection | null;
  
  // State flags;
  isLoading?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  showOnboarding?: boolean;
  showPrivacyBanner?: boolean;
  showGraduationBanner?: boolean;
  showErrors?: boolean;
  
  // Completion and error states;
  completionStatus?: {
    percentage: number;
    missing: string[];};
  
  errors?: {
    spacesError?: string;
    eventsError?: string;
    connectionsError?: string;
    apiError?: string;
  };
  
  loadingStates?: {
    profile?: boolean;
    spaces?: boolean;
    events?: boolean;
    connections?: boolean;
    hiveLab?: boolean;
  };
  
  // Callbacks;
  onSpaceClick?: (spaceId: string) => void;
  onEventClick?: (eventId: string) => void;
  onConnectionClick?: (connectionId: string) => void;
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
  onJoinSpace?: () => void;
  onCreateTool?: () => void;
}

export interface ProfileHeaderProps {user: User;
  showOnboarding?: boolean;
  showPrivacyBanner?: boolean;
  showGraduationBanner?: boolean;
  completionStatus?: {
    percentage: number;
    missing: string[];};
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
}

export interface MySpacesFeedProps {spaces: Space[];
  isLoading?: boolean;
  error?: string;
  onSpaceClick?: (spaceId: string) => void;
  onJoinSpace?: () => void;}

export interface SmartCalendarProps {events: Event[];
  isLoading?: boolean;
  error?: string;
  onEventClick?: (eventId: string) => void;
  onAddEvent?: () => void;}

export interface CampusConnectionsProps {connections: Connection[];
  isLoading?: boolean;
  error?: string;
  onConnectionClick?: (connectionId: string) => void;}

export interface HiveLabSectionProps {hiveLab: HiveLabSection;
  isLoading?: boolean;
  onCreateTool?: () => void;
  onViewTool?: (toolId: string) => void;}

export interface ProfileStatsProps {stats: User['stats'];
  isLoading?: boolean;}

// Re-export UniversalProfileUser from universal-profile-system;
export type { UniversalProfileUser } from './universal-profile-system';

// Extended Calendar Types for Calendar Card;
export type CalendarEventType = 'academic' | 'study' | 'social' | 'personal' | 'work'
export type CalendarConnectionStatus = 'connected' | 'disconnected' | 'syncing' | 'error'
export type CalendarCardState = 'loading' | 'default' | 'empty' | 'error' | 'sync-failed'

export interface CalendarConnection {id: string;
  name: string;
  type: 'google' | 'outlook' | 'university' | 'custom'
  status: CalendarConnectionStatus;
  lastSync?: Date;
  color: string;}

export interface CalendarConflict {id: string;
  events: Event[]
  severity: 'minor' | 'major' | 'critical'
  suggestion?: string;
  canAutoResolve: boolean;}

export interface CalendarCardData {nextEvent?: Event;
  upcomingEvents: Event[]
  todaysEvents: Event[]
  connections: CalendarConnection[]
  conflicts: CalendarConflict[]
  lastUpdated: Date;}

export interface CalendarCardProps {data?: CalendarCardData;
  state: CalendarCardState;
  variant?: 'desktop' | 'mobile'
  onViewCalendar?: () => void;
  onConnectCalendar?: (type: 'google' | 'outlook') => void;
  onAddEvent?: () => void;
  onResolveConflict?: (conflictId: string) => void;
  onSyncCalendar?: (connectionId: string) => void;
  onEventClick?: (event: Event) => void;
  className?: string;}