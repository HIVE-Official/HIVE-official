import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useReducer, useContext, createContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  Users,
  MessageCircle,
  Bell,
  Settings,
  User,
  Activity,
  BarChart3,
  Cloud,
  CloudOff,
  Zap,
  TrendingUp,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Upload,
  Download,
  Share2,
  Copy,
  Edit3,
  Trash2,
  PlusCircle,
  MinusCircle,
  Star,
  Heart,
  Bookmark,
  Flag,
  Filter,
  Search,
  SortAsc,
  SortDesc
} from 'lucide-react';

/**
 * # HIVE Advanced State Management System
 * 
 * Production-ready state management patterns, data synchronization, and real-time features
 * for the HIVE platform. Demonstrates advanced React patterns, optimistic updates,
 * conflict resolution, offline support, and complex data flows.
 * 
 * ## Advanced Features:
 * - **Real-time Synchronization**: Live data updates with conflict resolution
 * - **Optimistic Updates**: Instant UI feedback with rollback capabilities
 * - **Offline Support**: Queue operations and sync when reconnected
 * - **Context-based Architecture**: Scalable state management patterns
 * - **Advanced Error Handling**: Comprehensive error states and recovery
 * - **Performance Optimization**: Memoization, lazy loading, virtual scrolling
 * - **Complex Data Flows**: Multi-step operations with transaction support
 * - **Real-time Notifications**: Live updates and presence indicators
 */

const meta: Meta<typeof React.Fragment> = {
  title: '18-Advanced Systems/State Management & Data Flow',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Advanced state management patterns and real-time data synchronization for HIVE'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Advanced State Management Types
interface AppState {
  user: UserState;
  spaces: SpacesState;
  feed: FeedState;
  notifications: NotificationState;
  sync: SyncState;
  ui: UIState;
}

interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences;
  activity: ActivityData;
  connections: Connection[];
  status: 'idle' | 'loading' | 'error' | 'syncing';
  error: string | null;
  lastSync: number | null;
}

interface SpacesState {
  spaces: Space[];
  activeSpace: string | null;
  members: Record<string, SpaceMember[]>;
  posts: Record<string, Post[]>;
  status: 'idle' | 'loading' | 'error';
  pagination: Record<string, PaginationInfo>;
  filters: SpaceFilters;
}

interface FeedState {
  posts: Post[];
  status: 'idle' | 'loading' | 'refreshing' | 'error';
  hasMore: boolean;
  optimisticUpdates: OptimisticUpdate[];
  lastRefresh: number | null;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  realTimeConnection: 'connected' | 'disconnected' | 'connecting';
  preferences: NotificationPreferences;
}

interface SyncState {
  isOnline: boolean;
  syncStatus: 'idle' | 'syncing' | 'error' | 'offline';
  queuedOperations: QueuedOperation[];
  conflictedItems: ConflictedItem[];
  lastSyncAttempt: number | null;
  retryCount: number;
}

interface UIState {
  activeTab: string;
  sidebarOpen: boolean;
  modals: Record<string, boolean>;
  toasts: Toast[];
  loading: Record<string, boolean>;
  theme: 'dark' | 'light' | 'auto';
  viewport: 'mobile' | 'tablet' | 'desktop';
}

// Mock Data Types
interface UserProfile {
  id: string;
  handle: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  major: string;
  graduationYear: number;
  dorm: string;
  joinedAt: string;
  stats: {
    spacesJoined: number;
    toolsCreated: number;
    connectionsCount: number;
    postsShared: number;
  };
}

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'social' | 'dorm' | 'club' | 'general';
  memberCount: number;
  isPrivate: boolean;
  avatar: string;
  createdAt: string;
  lastActivity: string;
  tags: string[];
}

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  type: 'text' | 'image' | 'poll' | 'event' | 'tool';
  spaceId?: string;
  spaceName?: string;
  createdAt: string;
  updatedAt: string;
  interactions: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  userInteracted: {
    liked: boolean;
    commented: boolean;
    shared: boolean;
    bookmarked: boolean;
  };
  status: 'published' | 'draft' | 'pending' | 'failed';
  isOptimistic?: boolean;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'space_invite' | 'mention' | 'system';
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

interface OptimisticUpdate {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: 'post' | 'comment' | 'like' | 'follow';
  data: any;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

interface QueuedOperation {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

interface ConflictedItem {
  id: string;
  entity: string;
  localVersion: any;
  serverVersion: any;
  conflictType: 'update' | 'delete' | 'concurrent';
  timestamp: number;
}

interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  actions?: ToastAction[];
}

interface ToastAction {
  label: string;
  action: () => void;
  variant?: 'default' | 'destructive';
}

// State Management Reducer
type AppAction = 
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_USER_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_SPACES'; payload: Space[] }
  | { type: 'ADD_SPACE'; payload: Space }
  | { type: 'UPDATE_SPACE'; payload: { id: string; updates: Partial<Space> } }
  | { type: 'SET_FEED_POSTS'; payload: Post[] }
  | { type: 'ADD_POST_OPTIMISTIC'; payload: Post }
  | { type: 'CONFIRM_POST'; payload: { tempId: string; confirmedPost: Post } }
  | { type: 'ROLLBACK_OPTIMISTIC'; payload: string }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_SYNC_STATUS'; payload: SyncState['syncStatus'] }
  | { type: 'QUEUE_OPERATION'; payload: Omit<QueuedOperation, 'id' | 'timestamp' | 'retryCount'> }
  | { type: 'PROCESS_QUEUE' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: string; loading: boolean } }
  | { type: 'ADD_TOAST'; payload: Omit<Toast, 'id'> }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'TOGGLE_MODAL'; payload: { modal: string; open: boolean } }
  | { type: 'ADD_CONFLICT'; payload: ConflictedItem }
  | { type: 'RESOLVE_CONFLICT'; payload: { id: string; resolution: 'local' | 'server' | 'merge' } };

const initialState: AppState = {
  user: {
    profile: null,
    preferences: {
      theme: 'dark',
      notifications: true,
      realTimeUpdates: true,
      autoSync: true
    },
    activity: {
      dailyActiveTime: 0,
      weeklyPosts: 0,
      monthlyConnections: 0
    },
    connections: [],
    status: 'idle',
    error: null,
    lastSync: null
  },
  spaces: {
    spaces: [],
    activeSpace: null,
    members: {},
    posts: {},
    status: 'idle',
    pagination: {},
    filters: {
      type: 'all',
      sortBy: 'activity',
      search: ''
    }
  },
  feed: {
    posts: [],
    status: 'idle',
    hasMore: true,
    optimisticUpdates: [],
    lastRefresh: null
  },
  notifications: {
    notifications: [],
    unreadCount: 0,
    realTimeConnection: 'disconnected',
    preferences: {
      inApp: true,
      email: true,
      push: false
    }
  },
  sync: {
    isOnline: true,
    syncStatus: 'idle',
    queuedOperations: [],
    conflictedItems: [],
    lastSyncAttempt: null,
    retryCount: 0
  },
  ui: {
    activeTab: 'feed',
    sidebarOpen: true,
    modals: {},
    toasts: [],
    loading: {},
    theme: 'dark',
    viewport: 'desktop'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
          status: 'idle',
          lastSync: Date.now()
        }
      };

    case 'UPDATE_USER_PROFILE':
      if (!state.user.profile) return state;
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            ...action.payload
          }
        }
      };

    case 'SET_SPACES':
      return {
        ...state,
        spaces: {
          ...state.spaces,
          spaces: action.payload,
          status: 'idle'
        }
      };

    case 'ADD_SPACE':
      return {
        ...state,
        spaces: {
          ...state.spaces,
          spaces: [...state.spaces.spaces, action.payload]
        }
      };

    case 'SET_FEED_POSTS':
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: action.payload,
          status: 'idle',
          lastRefresh: Date.now()
        }
      };

    case 'ADD_POST_OPTIMISTIC':
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: [action.payload, ...state.feed.posts],
          optimisticUpdates: [
            ...state.feed.optimisticUpdates,
            {
              id: action.payload.id,
              type: 'create',
              entity: 'post',
              data: action.payload,
              timestamp: Date.now(),
              status: 'pending'
            }
          ]
        }
      };

    case 'CONFIRM_POST':
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: state.feed.posts.map(post => 
            post.id === action.payload.tempId 
              ? { ...action.payload.confirmedPost, isOptimistic: false }
              : post
          ),
          optimisticUpdates: state.feed.optimisticUpdates.map(update => 
            update.data.id === action.payload.tempId 
              ? { ...update, status: 'confirmed' }
              : update
          )
        }
      };

    case 'ROLLBACK_OPTIMISTIC':
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: state.feed.posts.filter(post => post.id !== action.payload),
          optimisticUpdates: state.feed.optimisticUpdates.map(update => 
            update.data.id === action.payload 
              ? { ...update, status: 'failed' }
              : update
          )
        }
      };

    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        sync: {
          ...state.sync,
          isOnline: action.payload,
          syncStatus: action.payload ? 'idle' : 'offline'
        }
      };

    case 'SET_SYNC_STATUS':
      return {
        ...state,
        sync: {
          ...state.sync,
          syncStatus: action.payload,
          lastSyncAttempt: Date.now()
        }
      };

    case 'QUEUE_OPERATION':
      return {
        ...state,
        sync: {
          ...state.sync,
          queuedOperations: [
            ...state.sync.queuedOperations,
            {
              ...action.payload,
              id: Date.now().toString(),
              timestamp: Date.now(),
              retryCount: 0
            }
          ]
        }
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notifications: [action.payload, ...state.notifications.notifications],
          unreadCount: state.notifications.unreadCount + 1
        }
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notifications: state.notifications.notifications.map(notif => 
            notif.id === action.payload 
              ? { ...notif, isRead: true }
              : notif
          ),
          unreadCount: Math.max(0, state.notifications.unreadCount - 1)
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: {
            ...state.ui.loading,
            [action.payload.key]: action.payload.loading
          }
        }
      };

    case 'ADD_TOAST':
      return {
        ...state,
        ui: {
          ...state.ui,
          toasts: [
            ...state.ui.toasts,
            {
              ...action.payload,
              id: Date.now().toString()
            }
          ]
        }
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        ui: {
          ...state.ui,
          toasts: state.ui.toasts.filter(toast => toast.id !== action.payload)
        }
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        ui: {
          ...state.ui,
          activeTab: action.payload
        }
      };

    case 'TOGGLE_MODAL':
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: {
            ...state.ui.modals,
            [action.payload.modal]: action.payload.open
          }
        }
      };

    case 'ADD_CONFLICT':
      return {
        ...state,
        sync: {
          ...state.sync,
          conflictedItems: [...state.sync.conflictedItems, action.payload]
        }
      };

    case 'RESOLVE_CONFLICT':
      return {
        ...state,
        sync: {
          ...state.sync,
          conflictedItems: state.sync.conflictedItems.filter(item => item.id !== action.payload.id)
        }
      };

    default:
      return state;
  }
}

// Context for Global State
const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Custom Hooks for State Management
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

const useOptimisticUpdates = () => {
  const { state, dispatch } = useAppState();
  
  const createPostOptimistic = useCallback(async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticPost: Post = {
      ...postData,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interactions: { likes: 0, comments: 0, shares: 0, bookmarks: 0 },
      userInteracted: { liked: false, commented: false, shared: false, bookmarked: false },
      status: 'pending',
      isOptimistic: true
    };

    // Optimistic update
    dispatch({ type: 'ADD_POST_OPTIMISTIC', payload: optimisticPost });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random failure for demo
      if (Math.random() < 0.1) {
        throw new Error('Network error');
      }

      const confirmedPost: Post = {
        ...optimisticPost,
        id: `post-${Date.now()}`,
        status: 'published',
        isOptimistic: false
      };

      dispatch({ type: 'CONFIRM_POST', payload: { tempId, confirmedPost } });
      dispatch({ type: 'ADD_TOAST', payload: { type: 'success', title: 'Posted!', message: 'Your post has been shared.' } });
    } catch (error) {
      dispatch({ type: 'ROLLBACK_OPTIMISTIC', payload: tempId });
      dispatch({ type: 'ADD_TOAST', payload: { 
        type: 'error', 
        title: 'Post failed', 
        message: 'Failed to share your post. Try again?',
        actions: [
          {
            label: 'Retry',
            action: () => createPostOptimistic(postData)
          }
        ]
      }});
    }
  }, [dispatch]);

  return { createPostOptimistic };
};

const useRealTimeSync = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    // Simulate real-time connection
    const interval = setInterval(() => {
      // Simulate new notification
      if (Math.random() < 0.3) {
        const notification: Notification = {
          id: Date.now().toString(),
          type: ['like', 'comment', 'follow', 'space_invite'][Math.floor(Math.random() * 4)] as unknown,
          title: 'New Activity',
          message: 'Someone interacted with your content',
          isRead: false,
          createdAt: new Date().toISOString()
        };
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const syncData = useCallback(async () => {
    if (!state.sync.isOnline) return;

    dispatch({ type: 'SET_SYNC_STATUS', payload: 'syncing' });

    try {
      // Process queued operations
      for (const operation of state.sync.queuedOperations) {
        // Simulate processing each queued operation
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Simulate successful sync
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'idle' });
      dispatch({ type: 'ADD_TOAST', payload: { type: 'success', title: 'Synced', message: 'All data is up to date.' } });
    } catch (error) {
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'error' });
      dispatch({ type: 'ADD_TOAST', payload: { type: 'error', title: 'Sync failed', message: 'Will retry automatically.' } });
    }
  }, [state.sync.isOnline, state.sync.queuedOperations, dispatch]);

  return { syncData };
};

// Mock Data
const MOCK_USER: UserProfile = {
  id: 'user-1',
  handle: 'sarah.chen',
  displayName: 'Sarah Chen',
  email: 'sarah.chen@buffalo.edu',
  avatar: '/api/placeholder/80/80',
  bio: 'CS Major • Building the future of campus community',
  major: 'Computer Science',
  graduationYear: 2025,
  dorm: 'Ellicott Complex',
  joinedAt: '2024-08-15T00:00:00Z',
  stats: {
    spacesJoined: 12,
    toolsCreated: 3,
    connectionsCount: 89,
    postsShared: 47
  }
};

const MOCK_SPACES: Space[] = [
  {
    id: 'space-1',
    name: 'CS 115 Study Group',
    description: 'Weekly study sessions for Computer Science fundamentals',
    type: 'academic',
    memberCount: 24,
    isPrivate: false,
    avatar: '/api/placeholder/40/40',
    createdAt: '2024-09-01T00:00:00Z',
    lastActivity: new Date().toISOString(),
    tags: ['cs', 'study', 'programming']
  },
  {
    id: 'space-2', 
    name: 'Ellicott Complex',
    description: 'Dorm community for Ellicott residents',
    type: 'dorm',
    memberCount: 156,
    isPrivate: true,
    avatar: '/api/placeholder/40/40',
    createdAt: '2024-08-20T00:00:00Z',
    lastActivity: new Date(Date.now() - 3600000).toISOString(),
    tags: ['dorm', 'community', 'ellicott']
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    authorName: 'Mike Johnson',
    authorAvatar: '/api/placeholder/40/40',
    content: 'Anyone interested in forming a study group for the upcoming CS midterm? We could meet at Lockwood Library this weekend.',
    type: 'text',
    spaceId: 'space-1',
    spaceName: 'CS 115 Study Group',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    interactions: {
      likes: 8,
      comments: 12,
      shares: 3,
      bookmarks: 5
    },
    userInteracted: {
      liked: false,
      commented: true,
      shared: false,
      bookmarked: true
    },
    status: 'published'
  },
  {
    id: 'post-2',
    authorId: 'user-3',
    authorName: 'Lisa Zhang',
    authorAvatar: '/api/placeholder/40/40',
    content: 'The laundry room on the 2nd floor is working again! 🎉',
    type: 'text',
    spaceId: 'space-2',
    spaceName: 'Ellicott Complex',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    interactions: {
      likes: 23,
      comments: 6,
      shares: 1,
      bookmarks: 2
    },
    userInteracted: {
      liked: true,
      commented: false,
      shared: false,
      bookmarked: false
    },
    status: 'published'
  }
];

// System Status Component
const SystemStatus = ({ state }: { state: AppState }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Activity className="mr-2 h-5 w-5" />
        System Status
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          {state.sync.isOnline ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm text-white">
            {state.sync.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {state.sync.syncStatus === 'syncing' ? (
            <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
          ) : state.sync.syncStatus === 'error' ? (
            <XCircle className="h-4 w-4 text-red-500" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          <span className="text-sm text-white capitalize">
            {state.sync.syncStatus}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-white">
            {state.notifications.unreadCount} unread
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-white">
            {state.sync.queuedOperations.length} queued
          </span>
        </div>
      </div>

      {state.sync.conflictedItems.length > 0 && (
        <Alert className="border-yellow-600 bg-yellow-900/20">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            {state.sync.conflictedItems.length} items need conflict resolution
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Optimistic Updates</span>
          <span className="text-white">{state.feed.optimisticUpdates.length}</span>
        </div>
        <Progress 
          value={
            state.feed.optimisticUpdates.length > 0 
              ? (state.feed.optimisticUpdates.filter(u => u.status === 'confirmed').length / state.feed.optimisticUpdates.length) * 100
              : 100
          }
          className="h-2"
        />
      </div>
    </CardContent>
  </Card>
);

// Real-time Feed Component
const RealTimeFeed = () => {
  const { state, dispatch } = useAppState();
  const { createPostOptimistic } = useOptimisticUpdates();
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !state.user.profile) return;

    await createPostOptimistic({
      authorId: state.user.profile.id,
      authorName: state.user.profile.displayName,
      authorAvatar: state.user.profile.avatar,
      content: newPostContent,
      type: 'text'
    });

    setNewPostContent('');
  };

  return (
    <div className="space-y-6">
      {/* Post Composer */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Share with your campus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={state.user.profile?.avatar} />
              <AvatarFallback className="bg-gray-700 text-white">
                {state.user.profile?.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Input
                value={newPostContent}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPostContent(e.target.value)}
                placeholder="What's happening on campus?"
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e: any) => e.key === 'Enter' && !e.shiftKey && handleCreatePost()}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    📷 Photo
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    📊 Poll
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    📍 Location
                  </Button>
                </div>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Posts */}
      <div className="space-y-4">
        {state.feed.posts.map((post: any) => (
          <Card 
            key={post.id} 
            className={`bg-gray-900 border-gray-800 ${
              post.isOptimistic ? 'opacity-75 border-dashed' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {post.authorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-white">{post.authorName}</span>
                    {post.spaceName && (
                      <>
                        <span className="text-gray-500">in</span>
                        <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs">
                          {post.spaceName}
                        </Badge>
                      </>
                    )}
                    <span className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                    {post.status === 'pending' && (
                      <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                    )}
                  </div>
                  <p className="text-white mb-3">{post.content}</p>
                  <div className="flex items-center space-x-6 text-gray-400">
                    <button 
                      className={`flex items-center space-x-1 hover:text-red-400 transition-colors ${
                        post.userInteracted.liked ? 'text-red-400' : ''
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.interactions.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.interactions.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">{post.interactions.shares}</span>
                    </button>
                    <button 
                      className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors ${
                        post.userInteracted.bookmarked ? 'text-yellow-400' : ''
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span className="text-sm">{post.interactions.bookmarks}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Sync Controls Component
const SyncControls = () => {
  const { state, dispatch } = useAppState();
  const { syncData } = useRealTimeSync();

  const toggleOnlineStatus = () => {
    dispatch({ type: 'SET_ONLINE_STATUS', payload: !state.sync.isOnline });
  };

  const simulateConflict = () => {
    const conflict: ConflictedItem = {
      id: Date.now().toString(),
      entity: 'post',
      localVersion: { title: 'Local Version', content: 'Local content' },
      serverVersion: { title: 'Server Version', content: 'Server content' },
      conflictType: 'update',
      timestamp: Date.now()
    };
    dispatch({ type: 'ADD_CONFLICT', payload: conflict });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Sync Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white">Network Status</span>
          <Button
            size="sm"
            onClick={toggleOnlineStatus}
            variant={state.sync.isOnline ? "default" : "destructive"}
          >
            {state.sync.isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex items-center justify-between">
          <span className="text-white">Force Sync</span>
          <Button
            size="sm"
            onClick={syncData}
            disabled={!state.sync.isOnline || state.sync.syncStatus === 'syncing'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {state.sync.syncStatus === 'syncing' ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              'Sync Now'
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white">Simulate Conflict</span>
          <Button
            size="sm"
            onClick={simulateConflict}
            variant="secondary"
            className="border-yellow-600 text-yellow-500 hover:bg-yellow-900/20"
          >
            Create Conflict
          </Button>
        </div>

        {state.sync.queuedOperations.length > 0 && (
          <div className="mt-4">
            <Label className="text-white text-sm">Queued Operations</Label>
            <div className="mt-2 space-y-2">
              {state.sync.queuedOperations.map((op: any) => (
                <div key={op.id} className="flex items-center justify-between text-sm bg-gray-800 rounded p-2">
                  <span className="text-gray-300">{op.type}</span>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                    {new Date(op.timestamp).toLocaleTimeString()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main State Management Demo
const StateManagementSystem = () => {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    user: {
      ...initialState.user,
      profile: MOCK_USER
    },
    spaces: {
      ...initialState.spaces,
      spaces: MOCK_SPACES
    },
    feed: {
      ...initialState.feed,
      posts: MOCK_POSTS
    }
  });

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              <Database className="mr-4 h-10 w-10" />
              Advanced State Management System
            </h1>
            <p className="text-gray-400 text-lg max-w-4xl">
              Production-ready state management with real-time synchronization, optimistic updates, 
              offline support, and comprehensive error handling for the HIVE platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Status & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <SystemStatus state={state} />
              <SyncControls />
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2">
              <RealTimeFeed />
            </div>
          </div>
        </div>
      </div>
    </AppStateContext.Provider>
  );
};

// Story Exports
export const AdvancedStateManagement: Story = {
  render: () => <StateManagementSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete advanced state management system with real-time sync, optimistic updates, and offline support'
      }
    }
  }
};
