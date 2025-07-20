"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@hive/auth-logic';
import { Button } from '@hive/ui';
import { 
  Command, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Home,
  Users,
  Zap,
  Calendar,
  BookOpen,
  ArrowRight,
  Hash,
  Clock,
  Star,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CommandNavLayoutProps {
  children: React.ReactNode;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category: 'navigation' | 'actions' | 'tools' | 'spaces' | 'recent';
  keywords: string[];
}

export function CommandNavLayout({ children }: CommandNavLayoutProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock command items
  const commandItems: CommandItem[] = [
    // Navigation
    { 
      id: 'nav-feed', 
      title: 'Go to Feed', 
      icon: Home, 
      action: () => router.push('/'),
      category: 'navigation',
      keywords: ['home', 'feed', 'dashboard']
    },
    { 
      id: 'nav-spaces', 
      title: 'Browse Spaces', 
      icon: Users, 
      action: () => router.push('/spaces'),
      category: 'navigation',
      keywords: ['spaces', 'communities', 'groups']
    },
    { 
      id: 'nav-build', 
      title: 'Build Tools', 
      icon: Zap, 
      action: () => router.push('/build'),
      category: 'navigation',
      keywords: ['build', 'create', 'tools', 'hivelab']
    },
    { 
      id: 'nav-events', 
      title: 'Events', 
      icon: Calendar, 
      action: () => router.push('/events'),
      category: 'navigation',
      keywords: ['events', 'calendar', 'meetings']
    },
    { 
      id: 'nav-resources', 
      title: 'Resources', 
      icon: BookOpen, 
      action: () => router.push('/resources'),
      category: 'navigation',
      keywords: ['resources', 'docs', 'help', 'documentation']
    },
    
    // Actions
    { 
      id: 'action-new-tool', 
      title: 'Create New Tool', 
      subtitle: 'Start building with HiveLab',
      icon: Plus, 
      action: () => router.push('/build'),
      category: 'actions',
      keywords: ['create', 'new', 'tool', 'build']
    },
    { 
      id: 'action-profile', 
      title: 'View Profile', 
      icon: User, 
      action: () => router.push('/profile'),
      category: 'actions',
      keywords: ['profile', 'account', 'user']
    },
    { 
      id: 'action-settings', 
      title: 'Settings', 
      icon: Settings, 
      action: () => router.push('/settings'),
      category: 'actions',
      keywords: ['settings', 'preferences', 'config']
    },
    
    // Recent/Popular
    { 
      id: 'tool-gpa', 
      title: 'GPA Calculator', 
      subtitle: 'Calculate your semester GPA',
      icon: Hash, 
      action: () => console.log('Open GPA Calculator'),
      category: 'tools',
      keywords: ['gpa', 'calculator', 'grades']
    },
    { 
      id: 'space-cs', 
      title: 'CS Study Group', 
      subtitle: '234 members',
      icon: Users, 
      action: () => router.push('/spaces/cs-study'),
      category: 'spaces',
      keywords: ['cs', 'computer science', 'study', 'group']
    },
  ];

  const filteredItems = searchQuery.length > 0 
    ? commandItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : commandItems;

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
      }

      if (isCommandOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
        
        if (e.key === 'Enter') {
          e.preventDefault();
          const selectedItem = filteredItems[selectedIndex];
          if (selectedItem) {
            selectedItem.action();
            setIsCommandOpen(false);
            setSearchQuery('');
            setSelectedIndex(0);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, filteredItems, selectedIndex]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'navigation': return 'Navigation';
      case 'actions': return 'Actions';
      case 'tools': return 'Tools';
      case 'spaces': return 'Spaces';
      case 'recent': return 'Recent';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Minimal Top Bar */}
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#FFD700] rounded-md flex items-center justify-center">
                <span className="text-[#0A0A0A] font-bold text-xs">H</span>
              </div>
              <span className="text-white font-bold">HIVE</span>
            </Link>

            {/* Command Trigger */}
            <Button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 hover:border-[#FFD700] text-zinc-400 hover:text-white transition-colors px-4 py-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:block">Search or jump to...</span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 border border-zinc-600 rounded text-xs">
                <Command className="w-3 h-3 mr-1" />
                K
              </kbd>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative text-zinc-400 hover:text-white">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              <Link href="/profile">
                <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Command Palette Modal */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCommandOpen(false)}
            />
            
            <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl">
              {/* Search Input */}
              <div className="flex items-center border-b border-zinc-800 px-4">
                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search commands, tools, spaces..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full py-4 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="px-3 py-1 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {getCategoryLabel(category)}
                    </div>
                    <div className="space-y-1">
                      {items.map((item, index) => {
                        const globalIndex = filteredItems.indexOf(item);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = item.icon;
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              item.action();
                              setIsCommandOpen(false);
                              setSearchQuery('');
                              setSelectedIndex(0);
                            }}
                            className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                              isSelected 
                                ? 'bg-[#FFD700] text-[#0A0A0A]' 
                                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.title}</div>
                              {item.subtitle && (
                                <div className={`text-xs truncate ${
                                  isSelected ? 'text-[#0A0A0A]/70' : 'text-zinc-500'
                                }`}>
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0 opacity-50" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="px-3 py-8 text-center text-zinc-500">
                    <Search className="w-8 h-8 mx-auto mb-3" />
                    <p>No results found</p>
                    <p className="text-sm">Try searching for something else</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-zinc-800 px-4 py-3 text-xs text-zinc-500 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 border border-zinc-600 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 border border-zinc-600 rounded text-xs">K</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating Command Hint */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsCommandOpen(true)}
          className="bg-zinc-800 border border-zinc-700 hover:border-[#FFD700] text-zinc-400 hover:text-white shadow-lg"
        >
          <Command className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Quick Actions</span>
        </Button>
      </div>
    </div>
  );
}