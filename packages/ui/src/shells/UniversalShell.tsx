/**
 * Universal Shell Component
 * The foundational wrapper for the entire HIVE platform
 * Provides consistent layout, navigation, and context across all pages
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Shell Context for global state
interface ShellContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  currentSlice: string;
  shellReady: boolean;
}

const ShellContext = createContext<ShellContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  isMobile: false,
  currentSlice: 'feed',
  shellReady: false,
});

export const useShell = () => useContext(ShellContext);

// Main Shell Component
export const UniversalShell: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'minimal';
}> = ({ children, className = '', variant = 'full' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shellReady, setShellReady] = useState(false);
  const pathname = usePathname();

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    setShellReady(true);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine current vertical slice from pathname
  const getCurrentSlice = () => {
    if (pathname?.includes('/feed')) return 'feed';
    if (pathname?.includes('/spaces')) return 'spaces';
    if (pathname?.includes('/profile')) return 'profile';
    if (pathname?.includes('/hivelab') || pathname?.includes('/tools')) return 'hivelab';
    if (pathname?.includes('/events')) return 'events';
    if (pathname?.includes('/messages')) return 'messages';
    if (pathname?.includes('/rituals')) return 'rituals';
    return 'feed'; // default
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const contextValue = {
    isSidebarOpen,
    toggleSidebar,
    isMobile,
    currentSlice: getCurrentSlice(),
    shellReady,
  };

  // For minimal variant, only show header and content
  if (variant === 'minimal') {
    return (
      <ShellContext.Provider value={contextValue}>
        <div className={`hive-shell-minimal min-h-screen bg-black ${className}`}>
          {/* Skip to main content for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--hive-brand-secondary)] text-black px-4 py-2 rounded">
            Skip to main content
          </a>

          {/* Global Header */}
          <GlobalHeader />

          {/* Main Content Area */}
          <main
            id="main-content"
            className="pt-16 min-h-[calc(100vh-64px)]"
          >
            <div className="hive-content-wrapper">
              {shellReady ? children : <ShellLoader />}
            </div>
          </main>

          {/* Global Modals Layer */}
          <div id="modal-root" />

          {/* Global Toast Layer */}
          <div id="toast-root" />
        </div>
      </ShellContext.Provider>
    );
  }

  // Full variant with all navigation elements
  return (
    <ShellContext.Provider value={contextValue}>
      <div className={`hive-shell min-h-screen bg-black ${className}`}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--hive-brand-secondary)] text-black px-4 py-2 rounded">
          Skip to main content
        </a>

        {/* Global Header */}
        <GlobalHeader />

        {/* Main Layout Container */}
        <div className="flex h-[calc(100vh-64px)] pt-16">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <main
            id="main-content"
            className={`
              flex-1 overflow-y-auto
              ${!isMobile && isSidebarOpen ? 'lg:ml-64' : ''}
              transition-all duration-300
            `}
          >
            <div className="hive-content-wrapper">
              {shellReady ? children : <ShellLoader />}
            </div>
          </main>

          {/* Context Panel (Desktop only, for certain slices) */}
          {!isMobile && ['feed', 'spaces'].includes(getCurrentSlice()) && (
            <ContextPanel />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav />}

        {/* Global Modals Layer */}
        <div id="modal-root" />

        {/* Global Toast Layer */}
        <div id="toast-root" />
      </div>
    </ShellContext.Provider>
  );
};

// Global Header Component
const GlobalHeader: React.FC = () => {
  const { toggleSidebar, isMobile, currentSlice } = useShell();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle (Mobile) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded flex items-center justify-center">
              <span className="font-black text-black text-xl">H</span>
            </div>
            {!isMobile && (
              <span className="font-black text-xl text-white">HIVE</span>
            )}
          </div>
        </div>

        {/* Center Section - Search */}
        {!isMobile && (
          <div className="flex-1 max-w-xl mx-8">
            <GlobalSearch />
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Icon (Mobile) */}
          {isMobile && (
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          {/* Notifications */}
          <NotificationBell />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

// Sidebar Navigation Component
const Sidebar: React.FC = () => {
  const { isSidebarOpen, isMobile, currentSlice } = useShell();

  if (isMobile && !isSidebarOpen) return null;

  const navItems = [
    { id: 'feed', label: 'Feed', icon: '🏠', path: '/feed' },
    { id: 'spaces', label: 'Spaces', icon: '🏛️', path: '/spaces' },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
    { id: 'hivelab', label: 'HiveLab', icon: '🔧', path: '/hivelab' },
    { id: 'events', label: 'Events', icon: '📅', path: '/events' },
    { id: 'messages', label: 'Messages', icon: '💬', path: '/messages', badge: 3 },
    { id: 'rituals', label: 'Rituals', icon: '🎭', path: '/rituals' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-30
        w-64 bg-black border-r border-white/10
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <SidebarNavItem
              key={item.id}
              {...item}
              active={currentSlice === item.id}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button className="w-full px-4 py-3 bg-[var(--hive-brand-secondary)] text-black font-semibold rounded-lg hover:bg-[var(--hive-brand-secondary-hover)] transition-colors">
            Create Post
          </button>
        </div>
      </aside>
    </>
  );
};

// Sidebar Navigation Item
const SidebarNavItem: React.FC<{
  id: string;
  label: string;
  icon: string;
  path: string;
  active: boolean;
  badge?: number;
}> = ({ label, icon, path, active, badge }) => {
  return (
    <a
      href={path}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg
        transition-all duration-200
        ${active
          ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-l-4 border-[var(--hive-brand-secondary)]'
          : 'text-white/60 hover:text-white hover:bg-white/5'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-[var(--hive-brand-secondary)] text-black text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

// Context Panel (Right Sidebar)
const ContextPanel: React.FC = () => {
  return (
    <aside className="hidden xl:block w-80 border-l border-white/10 p-6">
      <div className="space-y-6">
        {/* Trending Section */}
        <section>
          <h3 className="text-white font-semibold mb-3">Trending Now</h3>
          <div className="space-y-2">
            <TrendingItem tag="#midterms" count="1.2k" />
            <TrendingItem tag="#halloween" count="847" />
            <TrendingItem tag="#studygroup" count="623" />
          </div>
        </section>

        {/* Active Now */}
        <section>
          <h3 className="text-white font-semibold mb-3">Active Now</h3>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-black" />
            ))}
            <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-black flex items-center justify-center">
              <span className="text-white/60 text-xs">+12</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

// Mobile Bottom Navigation
const MobileBottomNav: React.FC = () => {
  const { currentSlice } = useShell();

  const navItems = [
    { id: 'feed', icon: '🏠' },
    { id: 'spaces', icon: '🔍' },
    { id: 'create', icon: '➕', primary: true },
    { id: 'messages', icon: '💬' },
    { id: 'profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-30">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`
              p-3 rounded-lg transition-all
              ${item.primary ? 'bg-[var(--hive-brand-secondary)] text-black scale-110' : ''}
              ${!item.primary && currentSlice === item.id ? 'text-[var(--hive-brand-secondary)]' : ''}
              ${!item.primary && currentSlice !== item.id ? 'text-white/60' : ''}
            `}
          >
            <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Global Search Component
const GlobalSearch: React.FC = () => {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search everything..."
        className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none transition-all"
      />
      <svg className="absolute left-3 top-2.5 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

// Notification Bell
const NotificationBell: React.FC = () => {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <button className="relative p-2 text-white/60 hover:text-white transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {hasNotifications && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full" />
      )}
    </button>
  );
};

// User Menu
const UserMenu: React.FC = () => {
  return (
    <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-colors">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)]" />
      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

// Shell Loader
const ShellLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60">Loading HIVE...</p>
      </div>
    </div>
  );
};

// Trending Item Component
const TrendingItem: React.FC<{ tag: string; count: string }> = ({ tag, count }) => (
  <button className="flex items-center justify-between w-full p-2 rounded hover:bg-white/5 transition-colors">
    <span className="text-[var(--hive-brand-secondary)]">{tag}</span>
    <span className="text-white/40 text-sm">{count} posts</span>
  </button>
);

export default UniversalShell;