import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  // Navigation mode
  mode: 'sidebar' | 'header';
  setMode: (mode: 'sidebar' | 'header') => void;
  
  // Mobile menu state
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Search state
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  
  // Notification count
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  
  // Active spaces
  activeSpaces: Array<{ id: string; name: string; slug: string }>;
  setActiveSpaces: (spaces: Array<{ id: string; name: string; slug: string }>) => void;
  
  // User preferences
  preferences: {
    compactMode: boolean;
    showBadges: boolean;
    autoCollapseSidebar: boolean;
  };
  updatePreferences: (prefs: Partial<NavigationState['preferences']>) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      // Default to sidebar mode
      mode: 'sidebar',
      setMode: (mode) => {
        set({ mode });
        // Save to localStorage for persistence
        localStorage.setItem('hive-nav-mode', mode);
      },
      
      // Mobile menu
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      
      // Search
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      
      // Notifications
      notificationCount: 0,
      setNotificationCount: (count) => set({ notificationCount: count }),
      
      // Active spaces
      activeSpaces: [
        { id: '1', name: 'Study Group', slug: 'study-group' },
        { id: '2', name: 'CS 442', slug: 'cs-442' },
        { id: '3', name: 'Hackathon 2024', slug: 'hackathon-2024' },
      ],
      setActiveSpaces: (spaces) => set({ activeSpaces: spaces }),
      
      // Preferences
      preferences: {
        compactMode: false,
        showBadges: true,
        autoCollapseSidebar: false,
      },
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: 'hive-navigation', // localStorage key
      partialize: (state) => ({
        mode: state.mode,
        preferences: state.preferences,
      }),
    }
  )
);