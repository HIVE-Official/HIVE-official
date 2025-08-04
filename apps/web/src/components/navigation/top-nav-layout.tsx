"use client";

import React, { useState } from 'react';
import { useSession } from '@/hooks/use-session';
import Image from 'next/image';
import { Button } from "@hive/ui";
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Command,
  Home,
  Users,
  Zap,
  Calendar,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TopNavLayoutProps {
  children: React.ReactNode;
}

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/spaces', label: 'Spaces', icon: Users },
  { href: '/tools', label: 'Build', icon: Zap },
  { href: '/rituals', label: 'Rituals', icon: Calendar },
  { href: '/events', label: 'Events', icon: Calendar },
];

export function TopNavLayout({ children }: TopNavLayoutProps) {
  const { user } = useSession();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top Navigation Bar */}
      <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/assets/hive-logo-white.svg"
                    alt="HIVE Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-white font-bold text-xl">HIVE</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1 ml-10">
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#FFD700] text-[#0A0A0A]'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-lg mx-8 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tools, spaces, or people..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-400 focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <kbd className="inline-flex items-center px-2 py-1 border border-zinc-600 rounded text-xs text-zinc-400">
                    <Command className="w-3 h-3 mr-1" />
                    K
                  </kbd>
                </div>
              </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-zinc-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-zinc-300 hover:text-white"
                >
                  <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.fullName || 'User'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm">
                    {user?.fullName?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50">
                    <div className="p-3 border-b border-zinc-700">
                      <p className="text-sm font-medium text-white">{user?.fullName}</p>
                      <p className="text-sm text-zinc-400">@{user?.handle}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white">
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-zinc-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-[#FFD700] text-[#0A0A0A]'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-400 focus:border-[#FFD700] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}