import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// User state
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  handle?: string;
  role?: 'student' | 'faculty' | 'admin';
  spaces?: string[];
  createdAt: Date;
  lastActiveAt: Date;
}

// Space state
interface Space {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'social' | 'dorm' | 'organization' | 'interest';
  memberCount: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Post state
interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName?: string;
  spaceId: string;
  spaceName?: string;
  type?: 'discussion' | 'coordination' | 'event' | 'announcement' | 'tool_share';
  images?: string[];
  createdAt: Date;
  updatedAt?: Date;
  reactions?: Record<string, number>;
  commentCount?: number;
  isPinned?: boolean;
  metadata?: any;
}

// Notification state
interface Notification {
  id: string;
  userId: string;
  type: 'post' | 'comment' | 'reaction' | 'follow' | 'mention' | 'event';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// App state interface
interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  
  // Spaces
  spaces: Space[];
  currentSpace: Space | null;
  userSpaces: string[];
  spacesLoading: boolean;
  
  // Posts
  feedPosts: Post[];
  spacePosts: Record<string, Post[]>;
  currentPost: Post | null;
  postsLoading: boolean;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  notificationsLoading: boolean;
  
  // UI State
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  feedType: 'personal' | 'campus' | 'trending';
  
  // Real-time
  activeUsers: Record<string, { userId: string; lastSeen: Date }>;
  typingUsers: Record<string, string[]>; // spaceId -> userIds
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  
  // Space actions
  setSpaces: (spaces: Space[]) => void;
  addSpace: (space: Space) => void;
  updateSpace: (spaceId: string, updates: Partial<Space>) => void;
  deleteSpace: (spaceId: string) => void;
  setCurrentSpace: (space: Space | null) => void;
  joinSpace: (spaceId: string) => void;
  leaveSpace: (spaceId: string) => void;
  
  // Post actions
  setFeedPosts: (posts: Post[]) => void;
  addFeedPost: (post: Post) => void;
  updateFeedPost: (postId: string, updates: Partial<Post>) => void;
  deleteFeedPost: (postId: string) => void;
  setSpacePosts: (spaceId: string, posts: Post[]) => void;
  addSpacePost: (spaceId: string, post: Post) => void;
  
  // Notification actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  
  // UI actions
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFeedType: (type: 'personal' | 'campus' | 'trending') => void;
  
  // Real-time actions
  setActiveUser: (userId: string) => void;
  removeActiveUser: (userId: string) => void;
  setTypingUser: (spaceId: string, userId: string) => void;
  removeTypingUser: (spaceId: string, userId: string) => void;
  
  // Utility actions
  reset: () => void;
}

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
  
  spaces: [],
  currentSpace: null,
  userSpaces: [],
  spacesLoading: false,
  
  feedPosts: [],
  spacePosts: {},
  currentPost: null,
  postsLoading: false,
  
  notifications: [],
  unreadCount: 0,
  notificationsLoading: false,
  
  sidebarOpen: true,
  mobileMenuOpen: false,
  theme: 'dark' as const,
  feedType: 'personal' as const,
  
  activeUsers: {},
  typingUsers: {},
};

// Create store with persistence and devtools
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // User actions
        setUser: (user) => set((state) => {
          state.user = user;
          state.isAuthenticated = !!user;
          state.authLoading = false;
        }),
        
        setAuthenticated: (isAuthenticated) => set((state) => {
          state.isAuthenticated = isAuthenticated;
          state.authLoading = false;
        }),
        
        // Space actions
        setSpaces: (spaces) => set((state) => {
          state.spaces = spaces;
          state.spacesLoading = false;
        }),
        
        addSpace: (space) => set((state) => {
          state.spaces.push(space);
        }),
        
        updateSpace: (spaceId, updates) => set((state) => {
          const index = state.spaces.findIndex(s => s.id === spaceId);
          if (index !== -1) {
            state.spaces[index] = { ...state.spaces[index], ...updates };
          }
          if (state.currentSpace?.id === spaceId) {
            state.currentSpace = { ...state.currentSpace, ...updates };
          }
        }),
        
        deleteSpace: (spaceId) => set((state) => {
          state.spaces = state.spaces.filter(s => s.id !== spaceId);
          if (state.currentSpace?.id === spaceId) {
            state.currentSpace = null;
          }
        }),
        
        setCurrentSpace: (space) => set((state) => {
          state.currentSpace = space;
        }),
        
        joinSpace: (spaceId) => set((state) => {
          if (!state.userSpaces.includes(spaceId)) {
            state.userSpaces.push(spaceId);
          }
          const space = state.spaces.find(s => s.id === spaceId);
          if (space) {
            space.memberCount += 1;
          }
        }),
        
        leaveSpace: (spaceId) => set((state) => {
          state.userSpaces = state.userSpaces.filter(id => id !== spaceId);
          const space = state.spaces.find(s => s.id === spaceId);
          if (space) {
            space.memberCount = Math.max(0, space.memberCount - 1);
          }
        }),
        
        // Post actions
        setFeedPosts: (posts) => set((state) => {
          state.feedPosts = posts;
          state.postsLoading = false;
        }),
        
        addFeedPost: (post) => set((state) => {
          state.feedPosts.unshift(post);
        }),
        
        updateFeedPost: (postId, updates) => set((state) => {
          const index = state.feedPosts.findIndex(p => p.id === postId);
          if (index !== -1) {
            state.feedPosts[index] = { ...state.feedPosts[index], ...updates };
          }
        }),
        
        deleteFeedPost: (postId) => set((state) => {
          state.feedPosts = state.feedPosts.filter(p => p.id !== postId);
        }),
        
        setSpacePosts: (spaceId, posts) => set((state) => {
          state.spacePosts[spaceId] = posts;
        }),
        
        addSpacePost: (spaceId, post) => set((state) => {
          if (!state.spacePosts[spaceId]) {
            state.spacePosts[spaceId] = [];
          }
          state.spacePosts[spaceId].unshift(post);
          // Also add to feed if it's from a user's space
          if (state.userSpaces.includes(spaceId)) {
            state.feedPosts.unshift(post);
          }
        }),
        
        // Notification actions
        setNotifications: (notifications) => set((state) => {
          state.notifications = notifications;
          state.unreadCount = notifications.filter(n => !n.isRead).length;
          state.notificationsLoading = false;
        }),
        
        addNotification: (notification) => set((state) => {
          state.notifications.unshift(notification);
          if (!notification.isRead) {
            state.unreadCount += 1;
          }
        }),
        
        markAsRead: (notificationId) => set((state) => {
          const notification = state.notifications.find(n => n.id === notificationId);
          if (notification && !notification.isRead) {
            notification.isRead = true;
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }),
        
        markAllAsRead: () => set((state) => {
          state.notifications.forEach(n => n.isRead = true);
          state.unreadCount = 0;
        }),
        
        clearNotifications: () => set((state) => {
          state.notifications = [];
          state.unreadCount = 0;
        }),
        
        // UI actions
        setSidebarOpen: (open) => set((state) => {
          state.sidebarOpen = open;
        }),
        
        setMobileMenuOpen: (open) => set((state) => {
          state.mobileMenuOpen = open;
        }),
        
        setTheme: (theme) => set((state) => {
          state.theme = theme;
          // Apply theme to document
          if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }),
        
        setFeedType: (type) => set((state) => {
          state.feedType = type;
        }),
        
        // Real-time actions
        setActiveUser: (userId) => set((state) => {
          state.activeUsers[userId] = { userId, lastSeen: new Date() };
        }),
        
        removeActiveUser: (userId) => set((state) => {
          delete state.activeUsers[userId];
        }),
        
        setTypingUser: (spaceId, userId) => set((state) => {
          if (!state.typingUsers[spaceId]) {
            state.typingUsers[spaceId] = [];
          }
          if (!state.typingUsers[spaceId].includes(userId)) {
            state.typingUsers[spaceId].push(userId);
          }
        }),
        
        removeTypingUser: (spaceId, userId) => set((state) => {
          if (state.typingUsers[spaceId]) {
            state.typingUsers[spaceId] = state.typingUsers[spaceId].filter(id => id !== userId);
          }
        }),
        
        // Reset
        reset: () => set(() => initialState),
      })),
      {
        name: 'hive-app-store',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
          userSpaces: state.userSpaces,
        }),
      }
    ),
    {
      name: 'HiveAppStore',
    }
  )
);

// Selectors
export const selectUser = (state: AppState) => state.user;
export const selectIsAuthenticated = (state: AppState) => state.isAuthenticated;
export const selectSpaces = (state: AppState) => state.spaces;
export const selectCurrentSpace = (state: AppState) => state.currentSpace;
export const selectFeedPosts = (state: AppState) => state.feedPosts;
export const selectNotifications = (state: AppState) => state.notifications;
export const selectUnreadCount = (state: AppState) => state.unreadCount;
export const selectTheme = (state: AppState) => state.theme;
export const selectActiveUserCount = (state: AppState) => Object.keys(state.activeUsers).length;

// Computed selectors
export const selectUserSpaceDetails = (state: AppState) => {
  return state.spaces.filter(space => state.userSpaces.includes(space.id));
};

export const selectSpacePostsById = (spaceId: string) => (state: AppState) => {
  return state.spacePosts[spaceId] || [];
};

export const selectIsUserInSpace = (spaceId: string) => (state: AppState) => {
  return state.userSpaces.includes(spaceId);
};

export const selectTypingUsersInSpace = (spaceId: string) => (state: AppState) => {
  return state.typingUsers[spaceId] || [];
};