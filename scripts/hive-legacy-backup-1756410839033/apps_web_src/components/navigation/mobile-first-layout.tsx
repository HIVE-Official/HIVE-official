/**
 * Mobile-First Layout for UB Students
 * 
 * RUTHLESS REDESIGN based on actual campus usage:
 * - Students walk between classes with phones (80% mobile usage)
 * - Students need quick access to spaces, not complex navigation
 * - Students coordinate in groups, not consume individual content
 * - Students have small laptop screens in lecture halls
 * 
 * This layout ELIMINATES:
 * ❌ Fixed sidebar stealing screen width
 * ❌ Complex collapsible navigation
 * ❌ Generic dashboard grids
 * ❌ Desktop-first thinking
 * 
 * This layout OPTIMIZES for:
 * ✅ Thumb-reachable navigation
 * ✅ Vertical information scanning
 * ✅ Quick space/tool access
 * ✅ Campus coordination workflows
 */

"use client";

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Users, 
  User, 
  Zap,
  Bell,
  Search,
  Plus,
  MessageCircle
} from 'lucide-react';

interface MobileFirstLayoutProps {
  children: React.ReactNode;
}

export function MobileFirstLayout({ children }: MobileFirstLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadNotifications] = useState(2);

  // Primary campus workflows - what students actually do
  const primaryTabs = [
    { 
      id: 'feed', 
      path: '/', 
      label: 'Feed', 
      icon: Home,
      description: 'Campus activity and coordination'
    },
    { 
      id: 'spaces', 
      path: '/spaces', 
      label: 'Spaces', 
      icon: Users,
      description: 'Join communities and coordinate'
    },
    { 
      id: 'tools', 
      path: '/tools', 
      label: 'Tools', 
      icon: Zap,
      description: 'Student-built campus solutions'
    },
    { 
      id: 'profile', 
      path: '/profile', 
      label: 'Profile', 
      icon: User,
      description: 'Your campus command center'
    }
  ];

  const getCurrentTab = () => {
    return primaryTabs.find(tab => 
      pathname === tab.path || (tab.path !== '/' && pathname.startsWith(tab.path))
    )?.id || 'feed';
  };

  const currentTab = getCurrentTab();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Bar - Only on mobile for essential actions */}
      <div className="lg:hidden sticky top-0 z-40 bg-[var(--hive-background-primary)]/95 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-[var(--hive-text-inverse)]">HIVE</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/search')}
              className="p-2 text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => router.push('/notifications')}
              className="relative p-2 text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium text-[var(--hive-text-inverse)]">
                  {unreadNotifications}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full width, no sidebar stealing space */}
      <main className="pb-16 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation - Thumb-reachable */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--hive-background-primary)]/95 backdrop-blur border-t border-gray-800 safe-bottom">
        <div className="grid grid-cols-4 h-16">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => router.push(tab.path)}
                className={`
                  flex flex-col items-center justify-center gap-1 transition-colors
                  ${isActive 
                    ? 'text-amber-400' 
                    : 'text-gray-500 hover:text-gray-300 active:text-gray-200'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation - Simple top bar, no sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-[var(--hive-background-primary)]/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => router.push('/')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-[var(--hive-text-primary)] font-bold">H</span>
              </div>
              <span className="text-xl font-bold text-[var(--hive-text-inverse)]">HIVE</span>
            </div>
            
            {/* Primary Navigation */}
            <nav className="flex items-center space-x-1">
              {primaryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => router.push(tab.path)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative
                      ${isActive 
                        ? 'text-amber-400 bg-amber-400/10' 
                        : 'text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
            
            {/* Secondary Actions */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => router.push('/search')}
                className="p-2 text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => router.push('/notifications')}
                className="relative p-2 text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium text-[var(--hive-text-inverse)]">
                    {unreadNotifications}
                  </div>
                )}
              </button>
              
              <button 
                onClick={() => router.push('/messages')}
                className="p-2 text-gray-400 hover:text-[var(--hive-text-inverse)] hover:bg-gray-800 rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => router.push('/spaces/create')}
                className="ml-2 flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[var(--hive-text-primary)] font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop content padding */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          main {
            padding-top: 4rem;
          }
        }
      `}</style>
    </div>
  );
}