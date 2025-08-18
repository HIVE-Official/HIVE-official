"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Users, 
  Zap, 
  MapPin, 
  Clock, 
  Edit3, 
  Settings, 
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Camera,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Enhanced HIVE animations
const hiveAnimationStyles = `
  @keyframes hive-modal-enter {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes hive-upload-bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes hive-photo-slide {
    from { transform: translateX(10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .animate-hive-modal-enter {
    animation: hive-modal-enter var(--hive-duration-slow, 300ms) var(--hive-liquid-smooth, cubic-bezier(0.4, 0, 0.1, 1));
  }

  .animate-hive-upload-bounce {
    animation: hive-upload-bounce var(--hive-duration-base, 200ms) var(--hive-liquid-smooth, cubic-bezier(0.4, 0, 0.1, 1));
  }

  .animate-hive-photo-slide {
    animation: hive-photo-slide var(--hive-duration-base, 200ms) var(--hive-liquid-smooth, cubic-bezier(0.4, 0, 0.1, 1));
  }
`;

// Inject styles on component mount
if (typeof document !== 'undefined' && !document.getElementById('hive-profile-animations')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'hive-profile-animations';
  styleSheet.textContent = hiveAnimationStyles;
  document.head.appendChild(styleSheet);
}

// Define proper types for API responses
interface RitualData {
  id: string;
  name: string;
  type: string;
  tagline?: string;
  description?: string;
  completedToday?: number;
  userParticipation?: {
    sessionsCompleted: number;
    currentStreak: number;
    longestStreak: number;
    progressPercentage: number;
    lastSessionAt?: string;
  };
  milestones?: {
    id: string;
    name: string;
    description: string;
    isReached: boolean;
    progress?: number;
    progressThreshold?: number;
    reachedAt?: string;
  }[];
}

interface ConnectionData {
  id: string;
  fullName: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  academicYear?: string;
  isOnline?: boolean;
  mutualSpaces?: number;
  connectionType: 'classmate' | 'friend' | 'mutual_friend' | 'colleague';
  commonInterests?: string[];
}

interface SpaceData {
  id: string;
  name: string;
  description?: string;
  color?: string;
  memberCount?: number;
  unreadCount?: number;
  role?: 'admin' | 'member' | 'moderator';
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  type?: 'class' | 'study' | 'meeting' | 'exam' | 'social' | 'other';
}

interface ProfileBoardSystemProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    location?: string;
    school?: string;
    major?: string;
    year?: string;
    joinedAt?: string;
    status?: 'online' | 'offline' | 'busy' | 'away' | 'studying';
  };
  stats?: {
    connections?: number;
    spaces?: number;
    tools?: number;
    contributions?: number;
  };
  editMode?: boolean;
  onEditModeToggle?: () => void;
  onWidgetConfigure?: (widgetId: string) => void;
  className?: string;
}

export function ProfileBoardSystem({ 
  user, 
  stats = {},
  editMode = false,
  onEditModeToggle = () => {},
  onWidgetConfigure = () => {},
  className = ''
}: ProfileBoardSystemProps) {
  const router = useRouter();

  // Expand & Focus state management
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [configPanelWidget, setConfigPanelWidget] = useState<string | null>(null);
  
  // Widget data state
  const [currentRitual, setCurrentRitual] = useState<RitualData | null>(null);
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [mySpaces, setMySpaces] = useState<SpaceData[]>([]);
  const [todayEvents, setTodayEvents] = useState<CalendarEvent[]>([]);
  
  // Loading states for all widgets
  const [isLoadingRitual, setIsLoadingRitual] = useState(true);
  const [isLoadingConnections, setIsLoadingConnections] = useState(true);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Load all widget data with proper loading states
  const loadData = useCallback(async () => {
      // Set initial loading states
      setIsLoadingProfile(true);
      
      // Load current ritual
      try {
        setIsLoadingRitual(true);
        const token = localStorage.getItem('hive_session_token');
        if (!token) throw new Error('Authentication required');
        
        const response = await fetch('/api/rituals', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json() as { currentRitual?: RitualData };
          setCurrentRitual(data.currentRitual || null);
        }
      } catch {
        
      } finally {
        setIsLoadingRitual(false);
      }

      // Load connections
      try {
        setIsLoadingConnections(true);
        const token = localStorage.getItem('hive_session_token');
        if (!token) throw new Error('Authentication required');
        
        const response = await fetch('/api/profile/connections', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json() as { connections?: ConnectionData[] };
          setConnections(data.connections || []);
        }
      } catch {
        
      } finally {
        setIsLoadingConnections(false);
      }

      // Load spaces
      try {
        setIsLoadingSpaces(true);
        const token = localStorage.getItem('hive_session_token');
        if (!token) throw new Error('Authentication required');
        
        const response = await fetch('/api/spaces/my', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json() as { spaces?: SpaceData[] };
          setMySpaces(data.spaces || []);
        }
      } catch {
        
      } finally {
        setIsLoadingSpaces(false);
      }

      // Load calendar events
      try {
        setIsLoadingEvents(true);
        const token = localStorage.getItem('hive_session_token');
        if (!token) throw new Error('Authentication required');
        
        const response = await fetch('/api/calendar', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json() as { events?: CalendarEvent[] };
          const events = data.events || [];
          
          // Filter and validate events for today
          const validEvents = events.filter((event: CalendarEvent) => {
            return event.startDate && event.endDate && event.title;
          });

          const todayEvents = validEvents.filter((event: CalendarEvent) => {
            const eventDate = new Date(event.startDate);
            const today = new Date();
            return eventDate.toDateString() === today.toDateString();
          });

          const sortedEvents = todayEvents
            .sort((a: CalendarEvent, b: CalendarEvent) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 5);

          setTodayEvents(sortedEvents);
        }
      } catch {
        
      } finally {
        setIsLoadingEvents(false);
      }

      // Overall profile loading complete
      setIsLoadingProfile(false);
    }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleWidgetExpand = (widgetId: string) => {
    if (!editMode) {
      setExpandedWidget(widgetId);
    }
  };

  const handleWidgetConfigure = (widgetId: string) => {
    setConfigPanelWidget(widgetId);
    onWidgetConfigure(widgetId);
  };

  const closeExpandedView = () => {
    setExpandedWidget(null);
  };

  const closeConfigPanel = () => {
    setConfigPanelWidget(null);
  };

  // Skeleton Loading Components
  const WidgetSkeleton = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );

  const TextSkeleton = ({ width = "w-full", height = "h-4" }: { width?: string; height?: string }) => (
    <div className={`bg-hive-background-secondary rounded-hive-md ${width} ${height}`} />
  );

  const CircleSkeleton = ({ size = "w-8 h-8" }: { size?: string }) => (
    <div className={`bg-hive-background-secondary rounded-full ${size}`} />
  );

  const AvatarWidgetSkeleton = () => (
    <WidgetSkeleton className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default overflow-hidden">
      {/* Photo skeleton */}
      <div className="relative h-3/5 bg-hive-background-secondary" />
      
      {/* Info skeleton */}
      <div className="p-hive-4 h-2/5 flex flex-col space-y-hive-2">
        <TextSkeleton width="w-3/4" height="h-5" />
        <TextSkeleton width="w-1/2" height="h-4" />
        <TextSkeleton width="w-2/3" height="h-3" />
        
        <div className="flex-1" />
        
        <div className="flex items-center justify-between pt-hive-2 border-t border-hive-border-default">
          <TextSkeleton width="w-16" height="h-3" />
          <CircleSkeleton size="w-4 h-4" />
        </div>
      </div>
    </WidgetSkeleton>
  );

  const CalendarWidgetSkeleton = () => (
    <WidgetSkeleton className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-hive-4">
        <div className="flex items-center gap-hive-2">
          <CircleSkeleton size="w-4 h-4" />
          <TextSkeleton width="w-24" height="h-5" />
        </div>
        <TextSkeleton width="w-16" height="h-4" />
      </div>
      
      {/* Events skeleton */}
      <div className="space-y-hive-3">
        <div className="flex items-center gap-hive-3 p-hive-3 bg-hive-background-primary rounded-hive-lg">
          <CircleSkeleton size="w-3 h-3" />
          <div className="flex-1 space-y-hive-1">
            <TextSkeleton width="w-3/4" height="h-4" />
            <TextSkeleton width="w-1/2" height="h-3" />
          </div>
        </div>
        <div className="flex items-center gap-hive-3 p-hive-3 bg-hive-background-primary rounded-hive-lg">
          <CircleSkeleton size="w-3 h-3" />
          <div className="flex-1 space-y-hive-1">
            <TextSkeleton width="w-2/3" height="h-4" />
            <TextSkeleton width="w-1/3" height="h-3" />
          </div>
        </div>
      </div>
    </WidgetSkeleton>
  );

  const RitualWidgetSkeleton = () => (
    <WidgetSkeleton className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-hive-2 mb-hive-3">
        <CircleSkeleton size="w-4 h-4" />
        <TextSkeleton width="w-20" height="h-5" />
      </div>
      
      {/* Content skeleton */}
      <div className="text-center space-y-hive-3">
        <CircleSkeleton size="w-16 h-16 mx-auto" />
        <TextSkeleton width="w-24 mx-auto" height="h-4" />
        <TextSkeleton width="w-16 mx-auto" height="h-3" />
        <div className="w-full h-8 bg-hive-background-secondary rounded-hive-lg" />
      </div>
    </WidgetSkeleton>
  );

  const ConnectionsWidgetSkeleton = () => (
    <WidgetSkeleton className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-hive-2 mb-hive-3">
        <CircleSkeleton size="w-4 h-4" />
        <TextSkeleton width="w-20" height="h-5" />
      </div>
      
      {/* Stats skeleton */}
      <div className="text-center space-y-hive-2">
        <TextSkeleton width="w-8 mx-auto" height="h-8" />
        <TextSkeleton width="w-20 mx-auto" height="h-3" />
        
        {/* Avatar circles skeleton */}
        <div className="flex -space-x-2 justify-center mb-hive-3">
          {[1, 2, 3, 4].map(i => (
            <CircleSkeleton key={i} size="w-6 h-6" />
          ))}
        </div>
        
        <div className="w-full h-8 bg-hive-background-secondary rounded-hive-lg" />
      </div>
    </WidgetSkeleton>
  );

  const SpacesWidgetSkeleton = () => (
    <WidgetSkeleton className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-hive-2 mb-hive-3">
        <CircleSkeleton size="w-4 h-4" />
        <TextSkeleton width="w-16" height="h-5" />
      </div>
      
      {/* Stats skeleton */}
      <div className="text-center space-y-hive-2">
        <TextSkeleton width="w-6 mx-auto" height="h-8" />
        <TextSkeleton width="w-16 mx-auto" height="h-3" />
        
        {/* Space items skeleton */}
        <div className="space-y-hive-2 mb-hive-3">
          <div className="flex items-center gap-hive-2 p-hive-2 bg-hive-background-primary rounded-hive-md">
            <CircleSkeleton size="w-6 h-6" />
            <TextSkeleton width="w-16" height="h-3" />
          </div>
          <div className="flex items-center gap-hive-2 p-hive-2 bg-hive-background-primary rounded-hive-md">
            <CircleSkeleton size="w-6 h-6" />
            <TextSkeleton width="w-12" height="h-3" />
          </div>
        </div>
        
        <div className="w-full h-8 bg-hive-background-secondary rounded-hive-lg" />
      </div>
    </WidgetSkeleton>
  );

  // Data validation and error handling for Avatar Widget
  const validateUserData = (userData: ProfileBoardSystemProps['user']) => {
    const errors: string[] = [];
    
    // Required field validation
    if (!userData?.id) errors.push('User ID is required');
    if (!userData?.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
      errors.push('User name is required and must be a valid string');
    }
    if (!userData?.handle || typeof userData.handle !== 'string' || userData.handle.trim().length === 0) {
      errors.push('User handle is required and must be a valid string');
    }
    
    // Optional field validation
    if (userData?.name && userData.name.length > 100) {
      errors.push('User name must be less than 100 characters');
    }
    if (userData?.handle && userData.handle.length > 50) {
      errors.push('User handle must be less than 50 characters');
    }
    if (userData?.bio && userData.bio.length > 500) {
      errors.push('User bio must be less than 500 characters');
    }
    if (userData?.major && userData.major.length > 100) {
      errors.push('Major must be less than 100 characters');
    }
    if (userData?.school && userData.school.length > 200) {
      errors.push('School name must be less than 200 characters');
    }
    
    // Handle format validation (alphanumeric, underscore, hyphen only)
    if (userData?.handle && !/^[a-zA-Z0-9_-]+$/.test(userData.handle)) {
      errors.push('Handle can only contain letters, numbers, underscores, and hyphens');
    }
    
    // Status validation
    const validStatuses = ['online', 'busy', 'away', 'studying', 'offline'];
    if (userData?.status && !validStatuses.includes(userData.status)) {
      errors.push('Invalid user status');
    }
    
    // Avatar URL validation (basic URL format check)
    if (userData?.avatar && typeof userData.avatar === 'string') {
      try {
        new URL(userData.avatar);
      } catch {
        errors.push('Invalid avatar URL format');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Avatar Widget Error Boundary Component
  const AvatarWidgetErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
      const handleError = (error: ErrorEvent) => {
        setHasError(true);
        setErrorMessage(error.message || 'An unexpected error occurred');
      };
      
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);

    React.useEffect(() => {
      setHasError(false);
      setErrorMessage('');
    }, []);

    if (hasError) {
      return (
        <div className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-status-error p-hive-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-hive-status-error/20 rounded-full flex items-center justify-center mb-hive-3">
            <X size={24} className="text-hive-status-error" />
          </div>
          <h3 className="text-heading-sm font-semibold text-hive-text-primary mb-hive-2">Profile Error</h3>
          <p className="text-body-sm text-hive-text-secondary mb-hive-4 max-w-xs">
            {errorMessage || 'There was an issue loading your profile information.'}
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setErrorMessage('');
              window.location.reload();
            }}
            className="px-hive-4 py-hive-2 bg-hive-brand-secondary text-hive-text-primary rounded-hive-lg text-body-sm font-medium hover:bg-hive-brand-hover transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      );
    }

    return <>{children}</>;
  };

  // Campus Identity Widget (1x2) - Student profile showcase
  const AvatarWidget = ({ editMode, onConfigure }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Always call hooks at the top level
    const validation = React.useMemo(() => validateUserData(user), []);
    
    // Safe user data with fallbacks
    
    // Loading state
    if (isLoadingProfile) {
      return <AvatarWidgetSkeleton />;
    }

    // Validation error state
    if (!validation.isValid) {
      return (
        <div className="h-full bg-hive-background-elevated rounded-hive-xl border border-hive-status-warning p-hive-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-hive-status-warning/20 rounded-full flex items-center justify-center mb-hive-3">
            <X size={24} className="text-hive-status-warning" />
          </div>
          <h3 className="text-heading-sm font-semibold text-hive-text-primary mb-hive-2">Invalid Profile Data</h3>
          <div className="text-body-xs text-hive-text-secondary space-y-hive-1 mb-hive-4">
            {validation.errors.slice(0, 3).map((error, index) => (
              <p key={index}>• {error}</p>
            ))}
            {validation.errors.length > 3 && (
              <p>• ... and {validation.errors.length - 3} more issues</p>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-hive-4 py-hive-2 border border-hive-border-default text-hive-text-secondary rounded-hive-lg text-body-sm hover:text-hive-text-primary hover:border-hive-border-focus transition-colors duration-200"
          >
            Refresh Profile
          </button>
        </div>
      );
    }

    return (
      <AvatarWidgetErrorBoundary>
        <div 
          className={`h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default relative overflow-hidden cursor-pointer hover:bg-hive-interactive-hover hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200 ${
            editMode ? 'ring-2 ring-hive-brand-secondary/20 ring-offset-2 ring-offset-hive-background-primary' : ''
          }`}
          onClick={() => handleWidgetExpand('avatar')}
        >
          {editMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWidgetConfigure('avatar');
              }}
              className="absolute top-hive-2 right-hive-2 z-10 p-hive-1 bg-hive-background-primary rounded-hive-lg border border-hive-border-default hover:bg-hive-interactive-hover transition-colors duration-200"
            >
              <Settings size={12} className="text-hive-text-tertiary" />
            </button>
          )}
          
          {/* Photo Section */}
          <div className="relative h-3/5 overflow-hidden">
            {user.avatar ? (
              <>
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-hive-brand-secondary flex items-center justify-center">
                <div className="text-white text-4xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            )}
            
            {/* Campus Status Indicator */}
            <div className="absolute top-hive-3 left-hive-3">
              <div className={`w-hive-3 h-hive-3 rounded-full border-2 border-white shadow-hive-sm ${
                user.status === 'online' ? 'bg-hive-status-success' :
                user.status === 'busy' ? 'bg-hive-status-error' :
                user.status === 'away' ? 'bg-hive-status-warning' : 
                user.status === 'studying' ? 'bg-hive-status-info' : 'bg-hive-text-tertiary'
              }`} />
            </div>

            {/* Photo Edit Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onConfigure && onConfigure('avatar');
              }}
              className="absolute bottom-hive-2 right-hive-2 p-hive-2 bg-hive-background-overlay/60 rounded-full text-white hover:bg-hive-background-overlay/80 transition-all duration-200 backdrop-blur-sm"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Campus Identity Info */}
          <div className="p-hive-4 h-2/5 flex flex-col">
            <div className="flex-1 space-y-hive-1">
              <h3 className="font-bold text-hive-text-primary text-heading-lg leading-tight">{user.name}</h3>
              <p className="text-hive-text-secondary text-body-md">@{user.handle}</p>
              
              {user.major && (
                <p className="text-hive-text-tertiary text-body-sm">
                  {user.major} • {user.year || 'Student'}
                </p>
              )}

              {user.bio && (
                <p className="text-hive-text-secondary text-body-sm mt-hive-2 line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Campus Location & Edit */}
            <div className="flex items-center justify-between mt-hive-2 pt-hive-2 border-t border-hive-border-default">
              <div className="flex items-center gap-hive-1 text-body-xs text-hive-text-tertiary">
                <MapPin size={12} className="text-hive-brand-secondary" />
                <span>{user.school || 'University at Buffalo'}</span>
              </div>
              <button className="p-hive-1 rounded-hive-lg hover:bg-hive-interactive-hover transition-colors duration-200">
                <Edit3 size={12} className="text-hive-text-tertiary hover:text-hive-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </AvatarWidgetErrorBoundary>
    );
  };

  
  // Calendar Widget Error Boundary Component
  const CalendarWidgetErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
    
    React.useEffect(() => {
      const handleError = (error: ErrorEvent) => {
        setHasError(true);
        setErrorMessage(error.message || 'An unexpected error occurred in the Calendar Widget');
      };
      
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        setHasError(true);
        setErrorMessage(`Calendar data loading failed: ${event.reason}`);
      };
      
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }, []);
    
    if (hasError) {
      return (
        <div className="h-full bg-hive-background-secondary rounded-hive-xl border border-hive-status-error p-hive-lg flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-hive-status-error/20 rounded-full flex items-center justify-center mb-hive-md">
            <AlertTriangle className="w-5 h-5 text-hive-status-error" />
          </div>
          <h3 className="text-sm font-semibold text-hive-text-primary mb-hive-sm">Calendar Widget Error</h3>
          <p className="text-hive-text-secondary text-xs mb-hive-md max-w-xs">{errorMessage}</p>
          <div className="flex gap-hive-sm">
            <button 
              onClick={() => {
                setHasError(false);
                setErrorMessage('');
                window.location.reload();
              }}
              className="px-hive-md py-hive-sm bg-hive-status-error text-white rounded-hive-lg text-xs font-medium hover:bg-red-600 transition-colors"
            >
              Reload
            </button>
            <button 
              onClick={() => {
                setHasError(false);
                setErrorMessage('');
              }}
              className="px-hive-md py-hive-sm text-hive-text-secondary text-xs hover:text-hive-text-primary transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      );
    }
    
    // Show validation errors if any
    if (validationErrors.length > 0) {
      return (
        <div className="h-full bg-hive-background-secondary rounded-hive-xl border border-hive-status-warning p-hive-lg flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-hive-status-warning/20 rounded-full flex items-center justify-center mb-hive-md">
            <AlertTriangle className="w-5 h-5 text-hive-status-warning" />
          </div>
          <h3 className="text-sm font-semibold text-hive-text-primary mb-hive-sm">Calendar Data Issues</h3>
          <div className="space-y-hive-xs mb-hive-md max-w-xs">
            {validationErrors.slice(0, 3).map((error, index) => (
              <p key={index} className="text-hive-text-secondary text-xs">• {error}</p>
            ))}
            {validationErrors.length > 3 && (
              <p className="text-hive-text-secondary text-xs">• ... and {validationErrors.length - 3} more issues</p>
            )}
          </div>
          <button 
            onClick={() => setValidationErrors([])}
            className="text-hive-brand-secondary text-xs hover:text-hive-brand-primary transition-colors"
          >
            Continue Anyway
          </button>
        </div>
      );
    }
    
    return <>{children}</>;
  };

  // Calendar Widget (2x1) - Real calendar integration
  const CalendarWidget = ({ editMode }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => {
    const [calendarError, setCalendarError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);


    // Loading state check after hooks
    if (isLoadingEvents) {
      return <CalendarWidgetSkeleton />;
    }

    // Safe event rendering with fallbacks
    const getSafeEventTitle = (event: CalendarEvent) => {
      if (!event?.title || typeof event.title !== 'string') {
        return 'Untitled Event';
      }
      return event.title.trim() || 'Untitled Event';
    };
    
    const getSafeEventTime = (event: CalendarEvent) => {
      try {
        const startTime = new Date(event.startDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const endTime = new Date(event.endDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        return `${startTime} - ${endTime}`;
      } catch {
        return 'Time TBD';
      }
    };
    
    const getSafeEventType = (event: CalendarEvent) => {
      const validTypes = ['class', 'study', 'meeting', 'exam', 'social', 'other'];
      return validTypes.includes(event?.type) ? event.type : 'other';
    };
    
    // Show error state if calendar error exists
    if (calendarError) {
      return (
        <CalendarWidgetErrorBoundary>
          <div className="h-full bg-hive-background-secondary rounded-hive-xl border border-hive-status-error p-hive-lg flex flex-col items-center justify-center text-center">
            <Calendar className="w-8 h-8 text-hive-status-error mb-hive-md" />
            <h3 className="text-sm font-semibold text-hive-text-primary mb-hive-sm">Calendar Unavailable</h3>
            <p className="text-hive-text-secondary text-xs mb-hive-md max-w-xs">{calendarError}</p>
            <button 
              onClick={() => {
                setCalendarError(null);
                setIsLoadingEvents(true);
                // Trigger re-load
                window.location.reload();
              }}
              className="px-hive-md py-hive-sm bg-hive-brand-secondary text-hive-text-primary rounded-hive-lg text-xs font-medium hover:bg-hive-brand-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        </CalendarWidgetErrorBoundary>
      );
    }
    
    return (
      <CalendarWidgetErrorBoundary>
        <div 
          className={`h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-6 relative cursor-pointer hover:bg-hive-interactive-hover hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200 ${
            editMode ? 'ring-2 ring-hive-brand-secondary/20 ring-offset-2 ring-offset-hive-background-primary' : ''
          }`}
          onClick={() => handleWidgetExpand('calendar')}
        >
        {editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWidgetConfigure('calendar');
            }}
            className="absolute top-hive-2 right-hive-2 z-10 p-hive-1 bg-hive-background-primary rounded-hive-lg border border-hive-border-default hover:bg-hive-interactive-hover transition-colors duration-200"
          >
            <Settings size={12} className="text-hive-text-tertiary" />
          </button>
        )}
        
        <div className="flex items-center justify-between mb-hive-4">
          <div className="flex items-center gap-hive-2">
            <Calendar size={16} className="text-hive-brand-secondary" />
            <h3 className="font-semibold text-hive-text-primary text-heading-sm">Campus Schedule</h3>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Action handled by modal - no navigation
            }}
            className="text-body-xs text-hive-text-tertiary hover:text-hive-text-secondary flex items-center gap-hive-1 transition-colors duration-200"
          >
            View All <ChevronRight size={12} />
          </button>
        </div>

        {/* Today's Campus Events */}
        <div className="space-y-hive-3">
          {isLoadingEvents ? (
            <div className="space-y-hive-2">
              <div className="h-12 bg-hive-background-primary rounded-hive-lg animate-pulse" />
              <div className="h-12 bg-hive-background-primary rounded-hive-lg animate-pulse" />
            </div>
          ) : validationErrors.length > 0 ? (
            <div className="text-center py-hive-4">
              <AlertTriangle className="w-8 h-8 text-hive-status-warning mx-auto mb-hive-2" />
              <p className="text-sm text-hive-text-primary mb-hive-1">Calendar Data Issues</p>
              <p className="text-xs text-hive-text-secondary mb-hive-2">Some events have validation errors</p>
              <button 
                onClick={() => setValidationErrors([])}
                className="text-xs text-hive-brand-secondary hover:text-hive-brand-primary transition-colors"
              >
                Show Anyway
              </button>
            </div>
          ) : todayEvents.length > 0 ? (
            todayEvents.map((event: CalendarEvent, index: number) => {
              const eventType = getSafeEventType(event);
              return (
                <div key={event.id || `event-${index}`} className="flex items-center gap-hive-3 p-hive-3 bg-hive-background-primary rounded-hive-lg border border-hive-border-default hover:border-hive-border-focus transition-colors duration-200">
                  <div className={`w-hive-3 h-hive-3 rounded-full flex-shrink-0 ${
                    eventType === 'class' ? 'bg-hive-status-info' :
                    eventType === 'study' ? 'bg-hive-status-success' :
                    eventType === 'meeting' ? 'bg-hive-status-warning' :
                    eventType === 'exam' ? 'bg-hive-status-error' :
                    'bg-hive-brand-secondary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium text-hive-text-primary truncate" title={getSafeEventTitle(event)}>
                      {getSafeEventTitle(event)}
                    </p>
                    <p className="text-body-xs text-hive-text-tertiary">
                      {getSafeEventTime(event)}
                    </p>
                    {event.location && (
                      <p className="text-body-xs text-hive-text-tertiary truncate" title={event.location}>
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-hive-4">
              <Calendar size={32} className="text-hive-text-tertiary mx-auto mb-hive-2" />
              <p className="text-body-md text-hive-text-tertiary mb-hive-1">No events today</p>
              <p className="text-body-xs text-hive-text-tertiary">Perfect time for studying or connecting with friends!</p>
            </div>
          )}
          
          <div className="text-center pt-hive-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Action handled by modal - no navigation
              }}
              className="text-body-xs text-hive-brand-secondary hover:text-hive-brand-hover flex items-center gap-hive-1 mx-auto transition-colors duration-200"
            >
              <Plus size={12} />
              Add Campus Event
            </button>
          </div>
        </div>
        </div>
      </CalendarWidgetErrorBoundary>
    );
  };

  // Ritual Widget (1x1) - Real ritual tracking
  const RitualWidget = ({ editMode }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => {
    if (isLoadingRitual) {
      return <RitualWidgetSkeleton />;
    }

    const handleStartSession = async () => {
      try {
        const token = localStorage.getItem('hive_session_token');
        if (!token) throw new Error('Authentication required');
        
        const response = await fetch('/api/rituals/start', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ritualType: currentRitual?.type || 'focus'
          })
        });
        
        if (response.ok) {
          // Reload ritual data - no navigation needed
          loadData();
        }
      } catch {
        
      }
    };

    return (
      <div 
        className={`h-full bg-hive-background-elevated rounded-hive-xl border border-hive-border-default p-hive-4 relative cursor-pointer hover:bg-hive-interactive-hover hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200 ${
          editMode ? 'ring-2 ring-hive-brand-secondary/20 ring-offset-2 ring-offset-hive-background-primary' : ''
        }`}
        onClick={() => handleWidgetExpand('ritual')}
      >
        {editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWidgetConfigure('ritual');
            }}
            className="absolute top-hive-2 right-hive-2 z-10 p-hive-1 bg-hive-background-primary rounded-hive-lg border border-hive-border-default hover:bg-hive-interactive-hover transition-colors duration-200"
          >
            <Settings size={12} className="text-hive-text-tertiary" />
          </button>
        )}
        
        <div className="flex items-center gap-hive-2 mb-hive-3">
          <Sparkles size={14} className="text-hive-brand-secondary" />
          <h3 className="font-semibold text-hive-text-primary text-heading-sm">Campus Rituals</h3>
        </div>
        
        <div className="text-center">
          {isLoadingRitual ? (
            <div className="py-4">
              <div className="w-12 h-12 bg-hive-background-primary rounded-full animate-pulse mx-auto mb-2" />
              <div className="h-4 bg-hive-background-primary rounded animate-pulse mb-1" />
              <div className="h-3 bg-hive-background-primary rounded animate-pulse" />
            </div>
          ) : currentRitual ? (
            <>
              <div className="w-16 h-16 bg-hive-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={24} className="text-hive-brand-secondary" />
              </div>
              <p className="text-body-md font-medium text-hive-text-primary">
                {currentRitual.name || 'Focus Session'}
              </p>
              <p className="text-body-xs text-hive-text-tertiary mt-1">
                {currentRitual.completedToday || 0} sessions completed
              </p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartSession();
                }}
                className="w-full mt-3 p-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg text-body-xs font-medium hover:bg-hive-brand-hover transition-colors"
              >
                Start Session
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-hive-background-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-hive-text-tertiary" />
              </div>
              <p className="text-body-md text-hive-text-tertiary mb-1">No ritual set</p>
              <p className="text-body-xs text-hive-text-tertiary mb-3">Create your first routine</p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Action handled by modal - no navigation
                }}
                className="w-full p-2 border border-hive-border-default rounded-lg text-body-xs text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
              >
                Set Up Ritual
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // My Spaces Widget (1x1) - Real spaces integration
  const MySpacesWidget = ({ editMode }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => {
    if (isLoadingSpaces) {
      return <SpacesWidgetSkeleton />;
    }

    return (
      <div 
        className={`h-full bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 relative cursor-pointer hover:bg-hive-interactive-hover transition-colors ${
          editMode ? 'ring-2 ring-hive-brand-secondary/50' : ''
        }`}
        onClick={() => handleWidgetExpand('spaces')}
      >
        {editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWidgetConfigure('spaces');
            }}
            className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-lg border border-hive-border-default"
          >
            <Settings size={12} />
          </button>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-hive-status-info" />
          <h3 className="font-semibold text-hive-text-primary text-heading-sm">My Spaces</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          {isLoadingSpaces ? (
            <>
              <div className="h-8 bg-hive-background-primary rounded-lg animate-pulse" />
              <div className="h-8 bg-hive-background-primary rounded-lg animate-pulse" />
            </>
          ) : mySpaces.length > 0 ? (
            mySpaces.map((space, index) => (
              <button
                key={space.id || index}
                onClick={(e) => {
                  e.stopPropagation();
                  // Action handled by modal - no navigation
                }}
                className="flex items-center gap-2 p-2 bg-hive-background-primary rounded-lg hover:bg-hive-interactive-hover transition-colors w-full text-left"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-body-xs font-bold text-white`}
                     style={{ backgroundColor: space.color || '#3B82F6' }}>
                  {space.name?.charAt(0).toUpperCase() || 'S'}
                </div>
                <span className="text-body-xs text-hive-text-primary font-medium truncate">
                  {space.name || 'Unnamed Space'}
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-2">
              <p className="text-body-xs text-hive-text-tertiary mb-2">No spaces yet</p>
              <p className="text-body-xs text-hive-text-tertiary">Join your first space!</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Action handled by modal - no navigation
          }}
          className="w-full p-2 border border-hive-border-default rounded-lg text-body-xs text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
        >
          {mySpaces.length > 0 ? 'Browse All' : 'Find Spaces'}
        </button>
      </div>
    );
  };

  // Connections Widget (1x1) - Real connections integration
  const ConnectionsWidget = ({ editMode }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => {
    if (isLoadingConnections) {
      return <ConnectionsWidgetSkeleton />;
    }

    return (
      <div 
        className={`h-full bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 relative cursor-pointer hover:bg-hive-interactive-hover transition-colors ${
          editMode ? 'ring-2 ring-hive-brand-secondary/50' : ''
        }`}
        onClick={() => handleWidgetExpand('connections')}
      >
        {editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWidgetConfigure('connections');
            }}
            className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-lg border border-hive-border-default"
          >
            <Settings size={12} />
          </button>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <Heart size={14} className="text-hive-status-error" />
          <h3 className="font-semibold text-hive-text-primary text-heading-sm">Connections</h3>
        </div>
        
        <div className="text-center">
          <div className="text-display-sm font-bold text-hive-text-primary">{stats.connections || 0}</div>
          <p className="text-body-xs text-hive-text-tertiary mb-3">Campus friends</p>
          
          {connections.length > 0 ? (
            <div className="flex -space-x-2 justify-center mb-3">
              {connections.slice(0, 4).map((connection, index) => (
                <div
                  key={connection.id || index}
                  className="w-6 h-6 rounded-full border-2 border-hive-background-secondary flex items-center justify-center bg-hive-brand-secondary text-white text-xs font-bold"
                  title={connection.fullName || connection.name}
                >
                  {connection.avatarUrl ? (
                    <Image
                      src={connection.avatarUrl}
                      alt={connection.fullName || connection.name}
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    (connection.fullName || connection.name || 'U').charAt(0).toUpperCase()
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-3 py-2">
              <p className="text-body-xs text-hive-text-tertiary">No connections yet</p>
            </div>
          )}
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              router.push('/connections');
            }}
            className="w-full p-2 border border-hive-border-default rounded-lg text-body-xs text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
          >
            {connections.length > 0 ? 'View All' : 'Find Friends'}
          </button>
        </div>
      </div>
    );
  };

  // HiveLAB Widget (1x1)
  const HiveLABWidget = ({ editMode }: { editMode: boolean; onConfigure?: (widgetId: string) => void; }) => (
    <div 
      className={`h-full bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 relative cursor-pointer hover:bg-hive-interactive-hover transition-colors ${
        editMode ? 'ring-2 ring-hive-brand-secondary/50' : ''
      }`}
      onClick={() => handleWidgetExpand('hivelab')}
    >
      {editMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWidgetConfigure('hivelab');
          }}
          className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-lg border border-hive-border-default"
        >
          <Settings size={12} />
        </button>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <Zap size={14} className="text-hive-brand-secondary" />
        <h3 className="font-semibold text-hive-text-primary text-heading-sm">HiveLAB</h3>
      </div>
      
      <div className="text-center">
        <div className="w-12 h-12 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Award size={20} className="text-hive-brand-secondary" />
        </div>
        <div className="text-heading-xl font-bold text-hive-text-primary">{stats.tools || 0}</div>
        <p className="text-body-xs text-hive-text-tertiary mb-4">Tools built</p>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            router.push('/tools');
          }}
          className="w-full p-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg text-body-xs font-medium hover:bg-hive-brand-hover transition-colors"
        >
          Build Tool
        </button>
      </div>
    </div>
  );

  const renderWidget = (widgetId: string) => {
    const widgets = {
      avatar: <AvatarWidget editMode={editMode} onConfigure={onWidgetConfigure} />,
      calendar: <CalendarWidget editMode={editMode} onConfigure={onWidgetConfigure} />,
      ritual: <RitualWidget editMode={editMode} onConfigure={onWidgetConfigure} />,
      spaces: <MySpacesWidget editMode={editMode} onConfigure={onWidgetConfigure} />,
      connections: <ConnectionsWidget editMode={editMode} onConfigure={onWidgetConfigure} />,
      hivelab: <HiveLABWidget editMode={editMode} onConfigure={onWidgetConfigure} />
    };
    return widgets[widgetId as keyof typeof widgets];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Global Loading Overlay */}
      {isLoadingProfile && (
        <div className="fixed inset-0 bg-hive-background-primary/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-hive-4">
            <div className="w-12 h-12 border-4 border-hive-brand-secondary border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-hive-1">
              <p className="text-heading-sm font-semibold text-hive-text-primary">Loading Your Campus Profile</p>
              <p className="text-body-sm text-hive-text-secondary">Setting up your command center...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Header - Campus Command Center */}
      <div className="flex items-center justify-between mb-hive-6 p-hive-6 bg-hive-background-secondary rounded-hive-xl border border-hive-border-default">
        <div className="space-y-hive-1">
          <h1 className="text-display-md font-bold text-hive-text-primary">Your Profile</h1>
          <p className="text-body-md text-hive-text-secondary">Campus command center - where connections meet purpose</p>
        </div>
        <div className="flex items-center gap-hive-3">
          <button
            onClick={onEditModeToggle}
            className={`px-hive-4 py-hive-2 rounded-hive-lg font-medium transition-all duration-200 ${
              editMode 
                ? 'bg-hive-brand-secondary text-hive-text-on-brand shadow-hive-sm' 
                : 'border border-hive-border-default text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus hover:shadow-hive-sm'
            }`}
          >
            <Edit3 size={16} className="mr-hive-2 inline" />
            {editMode ? 'Done' : 'Customize'}
          </button>
        </div>
      </div>

      {/* 4-Column Campus Widget Grid */}
      <div className="grid grid-cols-4 gap-hive-4 h-[600px]">
        {/* Avatar Widget - 1x2 */}
        <div className="col-span-1 row-span-2">
          {renderWidget('avatar')}
        </div>
        
        {/* Calendar Widget - 2x1 */}
        <div className="col-span-2 row-span-1">
          {renderWidget('calendar')}
        </div>
        
        {/* Ritual Widget - 1x1 */}
        <div className="col-span-1 row-span-1">
          {renderWidget('ritual')}
        </div>
        
        {/* My Spaces Widget - 1x1 */}
        <div className="col-span-1 row-span-1">
          {renderWidget('spaces')}
        </div>
        
        {/* Connections Widget - 1x1 */}
        <div className="col-span-1 row-span-1">
          {renderWidget('connections')}
        </div>
        
        {/* HiveLAB Widget - 1x1 */}
        <div className="col-span-1 row-span-1">
          {renderWidget('hivelab')}
        </div>
      </div>

      {/* Edit Mode Instructions */}
      {editMode && (
        <div className="mt-6 p-4 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Settings size={16} className="text-hive-brand-secondary" />
            <h3 className="font-medium text-hive-text-primary text-heading-sm">Customize Mode</h3>
          </div>
          <p className="text-body-md text-hive-text-secondary">
            Click the settings icon on any widget to configure it. Your layout will be saved automatically.
          </p>
        </div>
      )}

      {/* Expand & Focus Modal Overlay */}
      {expandedWidget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-hive-background-primary border border-hive-border-default rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
              <h2 className="text-heading-lg font-semibold text-hive-text-primary">
                {expandedWidget === 'avatar' && 'Profile Details'}
                {expandedWidget === 'calendar' && 'Schedule Overview'}
                {expandedWidget === 'ritual' && 'Today\'s Ritual'}
                {expandedWidget === 'spaces' && 'My Spaces'}
                {expandedWidget === 'connections' && 'Connections'}
                {expandedWidget === 'hivelab' && 'HiveLAB Tools'}
              </h2>
              <button
                onClick={closeExpandedView}
                className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
              >
                <X size={20} className="text-hive-text-secondary" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {expandedWidget === 'avatar' && (
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6">
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={128} height={128} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-hive-brand-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-heading-xl font-bold text-hive-text-primary mb-2">{user.name}</h3>
                  <p className="text-body-lg text-hive-text-secondary mb-4">{user.handle}</p>
                  {user.bio && <p className="text-body-md text-hive-text-primary mb-6">{user.bio}</p>}
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {expandedWidget === 'calendar' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-heading-md font-semibold text-hive-text-primary mb-4">Upcoming Events</h3>
                    <div className="space-y-4">
                      {todayEvents.length > 0 ? (
                        todayEvents.map((event: CalendarEvent, index: number) => (
                          <div key={event.id || index} className="flex items-start gap-4 p-4 bg-hive-background-elevated rounded-lg border border-hive-border-default">
                            <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-2 ${
                              event.type === 'class' ? 'bg-hive-status-info' :
                              event.type === 'study' ? 'bg-hive-status-success' :
                              'bg-hive-brand-secondary'
                            }`} />
                            <div className="flex-1">
                              <h4 className="text-heading-sm font-medium text-hive-text-primary mb-1">{event.title}</h4>
                              {event.description && (
                                <p className="text-body-sm text-hive-text-secondary mb-2">{event.description}</p>
                              )}
                              <div className="flex items-center gap-4 text-body-xs text-hive-text-tertiary">
                                <span>
                                  {new Date(event.startDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - 
                                  {new Date(event.endDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                </span>
                                {event.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin size={10} />
                                    {event.location}
                                  </span>
                                )}
                                <span className="capitalize text-hive-brand-secondary">{event.type || 'personal'}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Calendar size={48} className="text-hive-text-tertiary mx-auto mb-4" />
                          <p className="text-body-md text-hive-text-tertiary mb-2">No events scheduled for today</p>
                          <p className="text-body-xs text-hive-text-tertiary">Enjoy your free time!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => {
                        // Create new event functionality would go here
                        closeExpandedView();
                      }}
                      className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                    >
                      Add Event
                    </button>
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                    >
                      Open Full Calendar
                    </button>
                  </div>
                </div>
              )}

              {expandedWidget === 'ritual' && (
                <div>
                  {currentRitual ? (
                    <div>
                      {/* Ritual Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center">
                            <TrendingUp size={20} className="text-hive-brand-secondary" />
                          </div>
                          <div>
                            <h3 className="text-heading-md font-semibold text-hive-text-primary">{currentRitual.name}</h3>
                            <p className="text-body-sm text-hive-text-secondary">{currentRitual.tagline}</p>
                          </div>
                        </div>
                        <p className="text-body-md text-hive-text-primary mb-4">{currentRitual.description}</p>
                      </div>

                      {/* Progress Overview */}
                      <div className="mb-6">
                        <h4 className="text-heading-sm font-semibold text-hive-text-primary mb-3">Your Progress</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-hive-background-elevated rounded-lg">
                            <div className="text-heading-lg font-bold text-hive-brand-secondary">
                              {currentRitual.userParticipation?.sessionsCompleted || 0}
                            </div>
                            <p className="text-body-xs text-hive-text-tertiary">Sessions</p>
                          </div>
                          <div className="text-center p-3 bg-hive-background-elevated rounded-lg">
                            <div className="text-heading-lg font-bold text-hive-status-success">
                              {currentRitual.userParticipation?.currentStreak || 0}
                            </div>
                            <p className="text-body-xs text-hive-text-tertiary">Current Streak</p>
                          </div>
                          <div className="text-center p-3 bg-hive-background-elevated rounded-lg">
                            <div className="text-heading-lg font-bold text-hive-status-info">
                              {currentRitual.userParticipation?.longestStreak || 0}
                            </div>
                            <p className="text-body-xs text-hive-text-tertiary">Best Streak</p>
                          </div>
                          <div className="text-center p-3 bg-hive-background-elevated rounded-lg">
                            <div className="text-heading-lg font-bold text-hive-text-primary">
                              {Math.round(currentRitual.userParticipation?.progressPercentage || 0)}%
                            </div>
                            <p className="text-body-xs text-hive-text-tertiary">Progress</p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-hive-background-elevated rounded-full h-2 mb-2">
                          <div 
                            className="bg-hive-brand-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${currentRitual.userParticipation?.progressPercentage || 0}%` }}
                          />
                        </div>
                        <p className="text-body-xs text-hive-text-tertiary text-center">
                          {currentRitual.userParticipation?.progressPercentage || 0}% complete
                        </p>
                      </div>

                      {/* Milestones */}
                      {currentRitual.milestones && currentRitual.milestones.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-heading-sm font-semibold text-hive-text-primary mb-3">Milestones</h4>
                          <div className="space-y-3">
                            {currentRitual.milestones.map((milestone: NonNullable<RitualData['milestones']>[0]) => (
                              <div key={milestone.id} className="flex items-center gap-3 p-3 bg-hive-background-elevated rounded-lg">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  milestone.isReached 
                                    ? 'bg-hive-status-success text-white' 
                                    : 'bg-hive-background-secondary text-hive-text-tertiary'
                                }`}>
                                  {milestone.isReached ? (
                                    <Check size={16} />
                                  ) : (
                                    <Clock size={16} />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-body-md font-medium text-hive-text-primary">{milestone.name}</h5>
                                  <p className="text-body-xs text-hive-text-secondary">{milestone.description}</p>
                                  {!milestone.isReached && milestone.progress !== undefined && (
                                    <div className="mt-2 flex items-center gap-2">
                                      <div className="flex-1 bg-hive-background-secondary rounded-full h-1">
                                        <div 
                                          className="bg-hive-brand-secondary h-1 rounded-full"
                                          style={{ 
                                            width: `${Math.min(100, (milestone.progress / milestone.progressThreshold) * 100)}%` 
                                          }}
                                        />
                                      </div>
                                      <span className="text-body-xs text-hive-text-tertiary">
                                        {milestone.progress}/{milestone.progressThreshold}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {milestone.isReached && milestone.reachedAt && (
                                  <span className="text-body-xs text-hive-status-success">
                                    {new Date(milestone.reachedAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recent Activity */}
                      <div className="mb-6">
                        <h4 className="text-heading-sm font-semibold text-hive-text-primary mb-3">Recent Activity</h4>
                        {currentRitual.userParticipation?.lastSessionAt ? (
                          <div className="p-3 bg-hive-background-elevated rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                              <span className="text-body-sm font-medium text-hive-text-primary">Last Session Completed</span>
                            </div>
                            <p className="text-body-xs text-hive-text-secondary">
                              {new Date(currentRitual.userParticipation.lastSessionAt).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <Clock size={32} className="text-hive-text-tertiary mx-auto mb-2" />
                            <p className="text-body-sm text-hive-text-tertiary">No sessions completed yet</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => {
                            // Start session functionality
                            closeExpandedView();
                          }}
                          className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                        >
                          Start Session
                        </button>
                        <button 
                          onClick={() => {
                            closeExpandedView();
                          }}
                          className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                        >
                          View All Rituals
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-hive-background-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles size={32} className="text-hive-text-tertiary" />
                      </div>
                      <h3 className="text-heading-md font-semibold text-hive-text-primary mb-2">No Active Ritual</h3>
                      <p className="text-body-sm text-hive-text-secondary mb-6">
                        Start your first ritual to build productive habits and connect with your campus community.
                      </p>
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => {
                            closeExpandedView();
                          }}
                          className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                        >
                          Browse Rituals
                        </button>
                        <button 
                          onClick={() => {
                            closeExpandedView();
                          }}
                          className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {expandedWidget === 'spaces' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-heading-md font-semibold text-hive-text-primary mb-4">My Spaces</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mySpaces.length > 0 ? (
                        mySpaces.map((space: SpaceData, index: number) => (
                          <div key={space.id || index} className="p-4 bg-hive-background-elevated rounded-lg border border-hive-border-default">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-body-md font-bold text-white`}
                                   style={{ backgroundColor: space.color || '#3B82F6' }}>
                                {space.name?.charAt(0).toUpperCase() || 'S'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-heading-sm font-medium text-hive-text-primary mb-1 truncate">
                                  {space.name || 'Unnamed Space'}
                                </h4>
                                <p className="text-body-xs text-hive-text-tertiary mb-2 line-clamp-2">
                                  {space.description || 'No description available'}
                                </p>
                                <div className="flex items-center gap-2 text-body-xs text-hive-text-tertiary">
                                  <span>{space.memberCount || 0} members</span>
                                  {space.unreadCount > 0 && (
                                    <span className="px-2 py-1 bg-hive-brand-secondary text-white rounded-full text-xs">
                                      {space.unreadCount} new
                                    </span>
                                  )}
                                  <span className="capitalize text-hive-brand-secondary">{space.role || 'member'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  closeExpandedView();
                                }}
                                className="flex-1 px-3 py-2 text-body-xs text-hive-text-secondary border border-hive-border-default rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                              >
                                Visit Space
                              </button>
                              {space.role === 'admin' && (
                                <button
                                  onClick={() => {
                                    closeExpandedView();
                                  }}
                                  className="px-3 py-2 text-body-xs text-hive-brand-secondary border border-hive-brand-secondary rounded-lg hover:bg-hive-brand-secondary hover:text-white transition-colors"
                                >
                                  Manage
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <Users size={48} className="text-hive-text-tertiary mx-auto mb-4" />
                          <p className="text-body-md text-hive-text-tertiary mb-2">No spaces joined yet</p>
                          <p className="text-body-xs text-hive-text-tertiary">Discover spaces that match your interests</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                    >
                      Discover Spaces
                    </button>
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                    >
                      View All Spaces
                    </button>
                  </div>
                </div>
              )}

              {expandedWidget === 'connections' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-heading-md font-semibold text-hive-text-primary mb-4">Campus Connections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {connections.length > 0 ? (
                        connections.map((connection: ConnectionData, index: number) => (
                          <div key={connection.id || index} className="p-4 bg-hive-background-elevated rounded-lg border border-hive-border-default">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="relative">
                                {connection.avatarUrl ? (
                                  <Image
                                    src={connection.avatarUrl}
                                    alt={connection.fullName || connection.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-hive-brand-secondary rounded-full flex items-center justify-center">
                                    <span className="text-white text-body-md font-bold">
                                      {(connection.fullName || connection.name || 'U').charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                {connection.isOnline && (
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-heading-sm font-medium text-hive-text-primary mb-1 truncate">
                                  {connection.fullName || connection.name}
                                </h4>
                                <p className="text-body-xs text-hive-text-secondary mb-1">@{connection.handle}</p>
                                {connection.bio && (
                                  <p className="text-body-xs text-hive-text-tertiary mb-2 line-clamp-2">{connection.bio}</p>
                                )}
                                <div className="flex items-center gap-2 text-body-xs text-hive-text-tertiary">
                                  <span>{connection.major}</span>
                                  <span>•</span>
                                  <span>{connection.academicYear}</span>
                                  {connection.mutualSpaces > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-hive-brand-secondary">{connection.mutualSpaces} mutual spaces</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-body-xs text-hive-text-tertiary capitalize">{connection.connectionType.replace('_', ' ')}</span>
                                  {connection.commonInterests?.length > 0 && (
                                    <span className="text-body-xs text-hive-brand-secondary">
                                      • {connection.commonInterests.length} shared interests
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  closeExpandedView();
                                }}
                                className="flex-1 px-3 py-2 text-body-xs text-hive-text-secondary border border-hive-border-default rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                              >
                                View Profile
                              </button>
                              <button
                                onClick={() => {
                                  // Message functionality would go here
                                  closeExpandedView();
                                }}
                                className="px-3 py-2 text-body-xs text-hive-brand-secondary border border-hive-brand-secondary rounded-lg hover:bg-hive-brand-secondary hover:text-white transition-colors"
                              >
                                Message
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <Heart size={48} className="text-hive-text-tertiary mx-auto mb-4" />
                          <p className="text-body-md text-hive-text-tertiary mb-2">No connections yet</p>
                          <p className="text-body-xs text-hive-text-tertiary">Meet classmates and join spaces to build your network</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                    >
                      Meet People
                    </button>
                    <button 
                      onClick={() => {
                        closeExpandedView();
                      }}
                      className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                    >
                      Manage Connections
                    </button>
                  </div>
                </div>
              )}

              {expandedWidget === 'hivelab' && (
                <div>
                  <p className="text-body-md text-hive-text-secondary mb-4">Detailed tools overview coming soon...</p>
                  <button 
                    onClick={() => {
                      closeExpandedView();
                    }}
                    className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                  >
                    Open HiveLAB
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Universal Configuration Panel */}
      {configPanelWidget && (
        <div className="fixed inset-y-0 right-0 w-96 bg-hive-background-secondary border-l border-hive-border-default z-50 transform transition-transform">
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
              <h2 className="text-heading-md font-semibold text-hive-text-primary">
                Configure {configPanelWidget === 'avatar' && 'Profile'} 
                {configPanelWidget === 'calendar' && 'Calendar'}
                {configPanelWidget === 'ritual' && 'Ritual'}
                {configPanelWidget === 'spaces' && 'Spaces'}
                {configPanelWidget === 'connections' && 'Connections'}
                {configPanelWidget === 'hivelab' && 'HiveLAB'}
              </h2>
              <button
                onClick={closeConfigPanel}
                className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
              >
                <X size={20} className="text-hive-text-secondary" />
              </button>
            </div>
            
            {/* Panel Content */}
            <div className="flex-1 p-6 overflow-auto">
              <p className="text-body-md text-hive-text-secondary">
                Widget configuration options coming soon...
              </p>
            </div>
            
            {/* Panel Footer */}
            <div className="p-6 border-t border-hive-border-default">
              <div className="flex gap-3">
                <button
                  onClick={closeConfigPanel}
                  className="flex-1 px-4 py-2 border border-hive-border-default rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={closeConfigPanel}
                  className="flex-1 px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}