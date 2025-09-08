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
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  {
    label: 'Feed',
    href: '/feed',
    icon: Home,
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
    icon: Calendar,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    badge: 5,
  },
];

export function HiveAppShellV2({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]" style={{ fontFamily: "'Geist Sans', system-ui, sans-serif" }}>
      {/* Compact Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[240px] lg:flex-col bg-[#0D0D0E] border-r border-[var(--hive-white)]/[0.08]">
        
        {/* Logo Header */}
        <div className="h-16 flex items-center px-5 border-b border-[var(--hive-white)]/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[var(--hive-black)] rounded-lg flex items-center justify-center">
              <Image 
                src="/assets/hive-logo-white.svg"
                alt="HIVE"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="text-[20px] font-[800] text-[var(--hive-text-primary)] tracking-[-0.02em]" style={{ fontWeight: 800 }}>
              HIVE
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {mainNavItems.map((item) => {
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
                  <span className="text-[14px] font-[500] flex-1" style={{ fontWeight: 500 }}>
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

          {/* Lab Section */}
          <div className="mt-6 pt-6 border-t border-[var(--hive-white)]/[0.08]">
            <div className="px-3 mb-3 flex items-center justify-between">
              <span className="text-[11px] font-[600] text-gray-500 uppercase tracking-[0.15em]">
                Lab
              </span>
              <button className="text-gray-500 hover:text-[var(--hive-text-primary)] transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Link
              href="/lab"
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                isActiveRoute('/lab')
                  ? "bg-[var(--hive-gold)]/15 text-[var(--hive-gold)]" 
                  : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06]"
              )}
            >
              <Beaker className="h-[18px] w-[18px]" />
              <span className="text-[14px] font-[500]" style={{ fontWeight: 500 }}>
                HiveLAB
              </span>
            </Link>
          </div>

          {/* Your Spaces */}
          <div className="mt-6 pt-6 border-t border-[var(--hive-white)]/[0.08]">
            <div className="px-3 mb-3 flex items-center justify-between">
              <span className="text-[11px] font-[600] text-gray-500 uppercase tracking-[0.15em]">
                Your Spaces
              </span>
              <button className="text-gray-500 hover:text-[var(--hive-text-primary)] transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              <Link href="/spaces/study-group" className="group flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06] transition-all">
                <Hash className="h-3.5 w-3.5" />
                <span className="text-[13px] font-[400] truncate">study-group</span>
              </Link>
              <Link href="/spaces/cs-442" className="group flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06] transition-all">
                <Hash className="h-3.5 w-3.5" />
                <span className="text-[13px] font-[400] truncate">cs-442</span>
              </Link>
              <Link href="/spaces/hackathon" className="group flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.06] transition-all">
                <Hash className="h-3.5 w-3.5" />
                <span className="text-[13px] font-[400] truncate">hackathon-2024</span>
              </Link>
            </div>
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
            <div className="mt-2 py-1 bg-[var(--hive-background-primary)] border border-[var(--hive-white)]/[0.08] rounded-lg">
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

      {/* Top Bar - Desktop */}
      <div className="hidden lg:block lg:pl-[240px]">
        <header className="h-16 border-b border-[var(--hive-white)]/[0.08] bg-[var(--hive-background-primary)]/80 backdrop-blur-xl">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search HIVE..."
                  className="w-full h-9 pl-10 pr-4 bg-[var(--hive-white)]/[0.06] border border-[var(--hive-white)]/[0.08] rounded-lg text-[13px] text-[var(--hive-text-primary)] placeholder-gray-500 focus:outline-none focus:border-[var(--hive-gold)]/40 focus:bg-[var(--hive-white)]/[0.08] transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button className="relative p-2 rounded-lg hover:bg-[var(--hive-white)]/[0.06] transition-all">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[var(--hive-gold)] rounded-full" />
              </button>
              <button className="p-2 rounded-lg hover:bg-[var(--hive-white)]/[0.06] transition-all">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <header className="h-14 border-b border-[var(--hive-white)]/[0.08] bg-[var(--hive-background-primary)]/95 backdrop-blur-xl">
          <div className="h-full px-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 -ml-1.5"
            >
              <Menu className="h-5 w-5 text-[var(--hive-text-primary)]" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[var(--hive-black)] rounded-lg flex items-center justify-center">
                <Image 
                  src="/assets/hive-logo-white.svg"
                  alt="HIVE"
                  width={16}
                  height={16}
                  className="w-4 h-4"
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-[var(--hive-black)]/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0D0D0E] border-r border-[var(--hive-white)]/[0.08]">
            {/* Mobile menu content - similar to desktop but adapted */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--hive-white)]/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[var(--hive-black)] rounded-lg flex items-center justify-center">
                  <Image 
                    src="/assets/hive-logo-white.svg"
                    alt="HIVE"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
                <span className="text-[18px] font-[800] text-[var(--hive-text-primary)]">HIVE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 -mr-1.5"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Similar nav structure as desktop */}
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg mb-1",
                      isActive 
                        ? "bg-[var(--hive-gold)]/15 text-[var(--hive-gold)]" 
                        : "text-gray-400"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[15px] font-[500]">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[11px] font-[600] px-2 py-0.5 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-[240px] lg:pt-16">
        <div className="min-h-[calc(100vh-4rem)] bg-[var(--hive-background-primary)]">
          {children}
        </div>
      </main>
    </div>
  );
}