"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  User,
  Beaker,
  Search,
  Bell,
  MessageSquare,
  Calendar,
  Menu,
  X,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description?: string;
  badge?: number;
  accent?: 'gold' | 'white' | 'gradient';
}

const mainNavItems: NavItem[] = [
  {
    label: 'Feed',
    href: '/feed',
    icon: Home,
    description: 'Your personalized campus feed',
    accent: 'gold'
  },
  {
    label: 'Spaces',
    href: '/spaces',
    icon: Users,
    description: 'Communities & groups',
    badge: 2,
    accent: 'white'
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Your profile & dashboard',
    accent: 'gold'
  },
  {
    label: 'HiveLAB',
    href: '/lab',
    icon: Beaker,
    description: 'Build & discover tools',
    accent: 'gradient'
  }
];

const quickActions: NavItem[] = [
  {
    label: 'Search',
    href: '/search',
    icon: Search
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: 3
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    badge: 5
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: Calendar
  }
];

export function HiveAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply Geist Sans font family to the shell
  React.useEffect(() => {
    document.documentElement.style.fontFamily = "'Geist Sans', system-ui, sans-serif";
  }, []);

  // Mock user data for dev
  const user = {
    name: 'John Developer',
    handle: '@jwhrineh',
    role: 'student',
    avatar: null
  };

  const isActiveRoute = (href: string) => {
    if (href === '/feed' && pathname === '/') return true;
    return pathname.startsWith(href);
  };

  const getAccentClasses = (accent?: string, isActive?: boolean) => {
    if (isActive) {
      switch (accent) {
        case 'gold':
          return 'bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-l-4 border-[#FFD700]';
        case 'white':
          return 'bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-white';
        case 'gradient':
          return 'bg-gradient-to-r from-[#FFD700]/20 to-white/10 border-l-4 border-transparent bg-clip-border';
        default:
          return 'bg-white/10';
      }
    }
    return '';
  };

  const getIconAccent = (accent?: string) => {
    switch (accent) {
      case 'gold':
        return 'text-[#FFD700]';
      case 'white':
        return 'text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-[#FFD700] to-white bg-clip-text text-transparent';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white" style={{ fontFamily: "'Geist Sans', system-ui, sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r border-white/5 bg-gradient-to-b from-[#0A0A0B] to-[#0F0F10]">
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex h-20 items-center gap-3 px-6 border-b border-white/5 bg-black/30">
            <div className="flex items-center gap-3">
              {/* Animated HIVE Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] rounded-xl blur-xl opacity-30 animate-pulse" />
                <div className="relative flex items-center justify-center w-10 h-10 bg-black rounded-xl p-1.5">
                  <Image 
                    src="/assets/hive-logo-white.svg"
                    alt="HIVE Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[32px] leading-none font-[900] tracking-[-0.03em] bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 bg-clip-text text-transparent" style={{ fontWeight: 900 }}>
                  HIVE
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-[600] mt-1" style={{ fontWeight: 600 }}>
                  Social Utility Platform
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="px-6 py-6 border-b border-white/5 bg-gradient-to-r from-transparent via-[#FFD700]/[0.02] to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-30" />
                <div className="relative h-12 w-12 rounded-full bg-[#FFD700] p-0.5">
                  <div className="h-full w-full rounded-full bg-[#0A0A0B] flex items-center justify-center">
                    <span className="text-[14px] font-[800] text-[#FFD700]" style={{ fontWeight: 800 }}>
                      JD
                    </span>
                  </div>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#FFD700] border-2 border-[#0A0A0B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-[600] truncate text-white leading-tight" style={{ fontWeight: 600 }}>{user.name}</p>
                <p className="text-[13px] text-gray-400 font-[400] leading-tight" style={{ fontWeight: 400 }}>{user.handle}</p>
              </div>
              <span className="px-3 py-1 text-[10px] font-[700] uppercase tracking-[0.1em] rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30" style={{ fontWeight: 700 }}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200",
                    "hover:bg-white/5",
                    isActive ? getAccentClasses(item.accent, true) : "hover:translate-x-1"
                  )}
                >
                  <div className="relative">
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? getIconAccent(item.accent) : "text-gray-400 group-hover:text-white"
                    )} />
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFD700] text-[10px] font-bold text-black shadow-lg shadow-[#FFD700]/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "text-[15px] leading-tight transition-colors",
                      isActive ? "text-white font-[600]" : "text-gray-200 font-[500] group-hover:text-white"
                    )} style={{ fontWeight: isActive ? 600 : 500 }}>
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-[11px] text-gray-500 group-hover:text-gray-400 mt-1 font-[400] leading-tight" style={{ fontWeight: 400 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.accent === 'gradient' && (
                    <Sparkles className="h-3 w-3 text-[#FFD700] opacity-50 group-hover:opacity-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="px-3 py-4 border-t border-white/5 bg-black/20">
            <div className="flex items-center justify-between px-3 mb-3">
              <p className="text-[10px] font-[700] text-gray-400 uppercase tracking-[0.3em]" style={{ fontWeight: 700 }}>
                Quick Actions
              </p>
              <Zap className="h-3 w-3 text-[#FFD700]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 rounded-lg px-3 py-3 transition-all",
                      "hover:bg-white/5 hover:scale-105",
                      isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    <div className="relative">
                      <Icon className="h-5 w-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FFD700] text-[9px] font-bold text-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-[500] text-gray-300 mt-1" style={{ fontWeight: 500 }}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Brand Mark */}
          <div className="px-6 py-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FFD700]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-[600]" style={{ fontWeight: 600 }}>
                  HIVE v1.0
                </span>
              </div>
              <span className="text-[9px] text-gray-500 font-[400]" style={{ fontWeight: 400 }}>
                © 2024
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0A0A0B]/95 backdrop-blur-xl px-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD700] rounded-lg blur-md opacity-30" />
              <div className="relative flex items-center justify-center w-8 h-8 bg-black rounded-lg p-1">
                <Image 
                  src="/assets/hive-logo-white.svg"
                  alt="HIVE Logo"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
            </div>
            <span className="text-[24px] font-[900] tracking-[-0.03em] bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 bg-clip-text text-transparent" style={{ fontWeight: 900 }}>HIVE</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-[#0A0A0B] to-[#0F0F10] border-r border-white/5">
            {/* Mobile menu content - similar structure to desktop */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700] rounded-lg blur-md opacity-30" />
                  <div className="relative flex items-center justify-center w-8 h-8 bg-black rounded-lg p-1">
                    <Image 
                      src="/assets/hive-logo-white.svg"
                      alt="HIVE Logo"
                      width={24}
                      height={24}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <span className="text-[24px] font-[900] tracking-[-0.03em] bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 bg-clip-text text-transparent" style={{ fontWeight: 900 }}>HIVE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile User Profile */}
            <div className="px-4 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#FFD700] p-0.5">
                  <div className="h-full w-full rounded-full bg-[#0A0A0B] flex items-center justify-center">
                    <span className="text-[12px] font-[800] text-[#FFD700]" style={{ fontWeight: 800 }}>
                      JD
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-[600] text-white leading-tight" style={{ fontWeight: 600 }}>{user.name}</p>
                  <p className="text-[13px] text-gray-400 font-[400] leading-tight" style={{ fontWeight: 400 }}>{user.handle}</p>
                </div>
              </div>
            </div>

            {/* Mobile Nav Items */}
            <div className="px-3 py-4">
              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                        isActive ? getAccentClasses(item.accent, true) : "text-gray-400"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5",
                        isActive && getIconAccent(item.accent)
                      )} />
                      <div className="flex-1">
                        <p className="text-[15px] font-[500] text-gray-200 leading-tight" style={{ fontWeight: 500 }}>{item.label}</p>
                        {item.description && (
                          <p className="text-[11px] text-gray-500 mt-1 font-[400] leading-tight" style={{ fontWeight: 400 }}>{item.description}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="px-3 py-4 border-t border-white/5">
              <p className="px-3 mb-3 text-[10px] font-[700] text-gray-400 uppercase tracking-[0.3em]" style={{ fontWeight: 700 }}>
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs text-gray-400 hover:bg-white/5"
                    >
                      <div className="relative">
                        <Icon className="h-5 w-5" />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FFD700] text-[9px] font-bold text-black">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-[500] text-gray-300 mt-1" style={{ fontWeight: 500 }}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="min-h-[calc(100vh-4rem)] lg:min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B]">
          {children}
        </div>
      </main>
    </div>
  );
}