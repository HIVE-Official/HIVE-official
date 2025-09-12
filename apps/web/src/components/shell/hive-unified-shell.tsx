"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  User,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalSearch, useGlobalSearch } from '@/components/search/global-search';
import { useNavigationStore } from '@/store/navigation-store';

// Core navigation items for mobile bottom bar
const mobileNavItems = [
  {
    label: 'Feed',
    href: '/feed',
    icon: Home,
  },
  {
    label: 'Spaces',
    href: '/spaces',
    icon: Users,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
];

// Full navigation items for desktop
const desktopNavItems = [
  {
    label: 'Feed',
    href: '/feed',
    icon: Home,
    badge: null,
  },
  {
    label: 'Spaces',
    href: '/spaces',
    icon: Users,
    badge: 3,
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: Home, // Will use Calendar icon when imported
    badge: null,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: Home, // Will use MessageSquare icon when imported
    badge: 5,
  },
];

interface HiveUnifiedShellProps {
  children: React.ReactNode;
}

export function HiveUnifiedShell({ children }: HiveUnifiedShellProps) {
  const pathname = usePathname();
  const { mode, setMode } = useNavigationStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useGlobalSearch();

  // Mock user data for dev
  const user = {
    name: 'John Developer',
    handle: 'jwhrineh',
    email: 'jwhrineh@buffalo.edu',
    avatar: null
  };

  const isActiveRoute = (href: string) => {
    if (href === '/feed' && pathname === '/') return true;
    return pathname.startsWith(href);
  };

  // Load navigation preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('hive-nav-mode') as 'sidebar' | 'header' | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, [setMode]);

  // Desktop Sidebar Mode
  const renderSidebar = () => (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[240px] lg:flex-col bg-[#0D0D0E] border-r border-[var(--hive-white)]/[0.08] z-30">
      {/* Logo Header */}
      <div className="h-16 flex items-center px-5 border-b border-[var(--hive-white)]/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--hive-gold)] rounded-lg flex items-center justify-center">
            <Image 
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={20}
              height={20}
              className="w-5 h-5 invert"
            />
          </div>
          <span className="text-[20px] font-[800] text-[var(--hive-text-primary)] tracking-[-0.02em]">
            HIVE
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                  isActive 
                    ? "bg-[var(--hive-gold)]/15 text-[var(--hive-gold)]" 
                    : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]"
                )}
              >
                <Icon className={cn(
                  "h-[18px] w-[18px]",
                  isActive ? "text-[var(--hive-gold)]" : "text-current"
                )} />
                <span className="text-[14px] font-[500] flex-1">
                  {item.label}
                </span>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] font-[600] px-1.5 py-0.5 rounded-full",
                    isActive 
                      ? "bg-[var(--hive-gold)] text-[var(--hive-black)]" 
                      : "bg-[var(--hive-white)]/10 text-[var(--hive-text-primary)]"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-[var(--hive-white)]/[0.08]">
        <button 
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--hive-white)]/[0.06] transition-all group"
        >
          <div className="h-8 w-8 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center">
            <span className="text-[12px] font-[700] text-[var(--hive-gold)]">JD</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-[500] text-[var(--hive-text-primary)] truncate">{user.name}</p>
            <p className="text-[11px] text-gray-500 truncate">@{user.handle}</p>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            isUserMenuOpen && "rotate-180"
          )} />
        </button>

        {/* User Dropdown */}
        {isUserMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-[var(--hive-background-primary)] border border-[var(--hive-white)]/[0.08] rounded-lg py-1">
            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  // Desktop Header Mode
  const renderHeader = () => (
    <header className="hidden lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:h-16 lg:flex bg-[#0D0D0E] border-b border-[var(--hive-white)]/[0.08] z-30">
      <div className="flex items-center justify-between w-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--hive-gold)] rounded-lg flex items-center justify-center">
            <Image 
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={20}
              height={20}
              className="w-5 h-5 invert"
            />
          </div>
          <span className="text-[20px] font-[800] text-[var(--hive-text-primary)] tracking-[-0.02em]">
            HIVE
          </span>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150",
                  isActive 
                    ? "bg-[var(--hive-gold)]/15 text-[var(--hive-gold)]" 
                    : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]"
                )}
              >
                <Icon className={cn(
                  "h-[16px] w-[16px]",
                  isActive ? "text-[var(--hive-gold)]" : "text-current"
                )} />
                <span className="text-[14px] font-[500]">
                  {item.label}
                </span>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] font-[600] px-1.5 py-0.5 rounded-full ml-1",
                    isActive 
                      ? "bg-[var(--hive-gold)] text-[var(--hive-black)]" 
                      : "bg-[var(--hive-white)]/10 text-[var(--hive-text-primary)]"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 h-9 px-4 bg-[var(--hive-white)]/[0.06] border border-[var(--hive-white)]/[0.08] rounded-lg text-[13px] text-gray-500 hover:bg-[var(--hive-white)]/[0.08] hover:border-[var(--hive-gold)]/40 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-[var(--hive-white)]/10 rounded text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[var(--hive-white)]/[0.06] transition-all">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[var(--hive-gold)] rounded-full" />
          </button>

          {/* User Menu */}
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--hive-white)]/[0.06] transition-all"
          >
            <div className="h-7 w-7 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center">
              <span className="text-[11px] font-[700] text-[var(--hive-gold)]">JD</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-gray-500 transition-transform duration-200",
              isUserMenuOpen && "rotate-180"
            )} />
          </button>
        </div>
      </div>

      {/* User Dropdown */}
      {isUserMenuOpen && (
        <div className="absolute top-full right-6 mt-2 w-48 bg-[var(--hive-background-primary)] border border-[var(--hive-white)]/[0.08] rounded-lg py-1">
          <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]">
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </header>
  );

  // Mobile Bottom Navigation Bar
  const renderMobileBottomNav = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0D0D0E] border-t border-[var(--hive-white)]/[0.08] z-30">
      <div className="h-full flex items-center justify-around px-4">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-150",
                isActive 
                  ? "text-[var(--hive-gold)]" 
                  : "text-gray-400"
              )}
            >
              <Icon className={cn(
                "h-6 w-6",
                isActive ? "text-[var(--hive-gold)]" : "text-current"
              )} />
              <span className={cn(
                "text-[10px] font-[600]",
                isActive ? "text-[var(--hive-gold)]" : "text-current"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Mobile Top Header
  const renderMobileHeader = () => (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--hive-background-primary)]/95 backdrop-blur-xl border-b border-[var(--hive-white)]/[0.08] z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 -ml-1.5"
        >
          <Menu className="h-5 w-5 text-[var(--hive-text-primary)]" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--hive-gold)] rounded-lg flex items-center justify-center">
            <Image 
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={16}
              height={16}
              className="w-4 h-4 invert"
            />
          </div>
          <span className="text-[18px] font-[800] text-[var(--hive-text-primary)] tracking-[-0.02em]">
            HIVE
          </span>
        </div>

        <button className="relative p-1.5 -mr-1.5">
          <Bell className="h-5 w-5 text-[var(--hive-text-primary)]" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-[var(--hive-gold)] rounded-full" />
        </button>
      </div>
    </header>
  );

  // Mobile Menu Overlay (for additional options)
  const renderMobileMenu = () => (
    isMobileMenuOpen && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-[var(--hive-black)]/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0D0D0E] border-r border-[var(--hive-white)]/[0.08]">
          <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--hive-white)]/[0.08]">
            <span className="text-[16px] font-[700] text-[var(--hive-text-primary)]">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 -mr-1.5"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              <Link 
                href="/settings" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]"
              >
                <Settings className="h-5 w-5" />
                <span className="text-[14px] font-[500]">Settings</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-[14px] font-[500]">Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]" style={{ fontFamily: "'Geist Sans', system-ui, sans-serif" }}>
      {/* Desktop Navigation */}
      {mode === 'sidebar' && renderSidebar()}
      {mode === 'header' && renderHeader()}

      {/* Mobile Navigation */}
      {renderMobileHeader()}
      {renderMobileBottomNav()}
      {renderMobileMenu()}

      {/* Main Content */}
      <main className={cn(
        "min-h-screen",
        // Desktop spacing
        mode === 'sidebar' && "lg:pl-[240px]",
        mode === 'header' && "lg:pt-16",
        // Mobile spacing
        "pt-14 pb-16 lg:pb-0"
      )}>
        {children}
      </main>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
}