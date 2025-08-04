"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '../../hooks/use-session';
import Image from 'next/image';
import { Button } from "@hive/ui";
import { 
  Command, 
  Search, 
  Bell, 
  User, 
  Settings,
  Home,
  Users,
  Zap,
  Calendar,
  ArrowRight,
  Hash,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

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
  const { user } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Navigation command items - UTILITY-FIRST hierarchy
  const commandItems: CommandItem[] = [
    // Navigation - Utility-First Four Pillars
    { 
      id: 'nav-profile', 
      title: 'Command Center', 
      subtitle: 'Your personal campus dashboard & home base',
      icon: Home, 
      action: () => router.push('/profile'),
      category: 'navigation',
      keywords: ['home', 'profile', 'dashboard', 'personal', 'command', 'center']
    },
    { 
      id: 'nav-spaces', 
      title: 'Communities', 
      subtitle: 'Campus spaces & coordination groups',
      icon: Users, 
      action: () => router.push('/spaces'),
      category: 'navigation',
      keywords: ['spaces', 'communities', 'groups', 'organizations', 'coordination']
    },
    { 
      id: 'nav-tools', 
      title: 'Creation Lab', 
      subtitle: 'Build & discover campus utilities',
      icon: Zap, 
      action: () => router.push('/tools'),
      category: 'navigation',
      keywords: ['tools', 'build', 'create', 'hivelab', 'utilities', 'lab']
    },
    { 
      id: 'nav-feed', 
      title: 'Campus Pulse', 
      subtitle: 'Live coordination & activity updates',
      icon: Bell, 
      action: () => router.push('/feed'),
      category: 'navigation',
      keywords: ['feed', 'pulse', 'activity', 'updates', 'coordination']
    },
    { 
      id: 'nav-rituals', 
      title: 'Campus Rituals', 
      subtitle: 'Shared experiences that build campus culture',
      icon: Calendar, 
      action: () => router.push('/rituals'),
      category: 'navigation',
      keywords: ['rituals', 'experiences', 'culture', 'campus', 'community', 'shared']
    },
    { 
      id: 'nav-events', 
      title: 'Events', 
      subtitle: 'Campus activities & coordination',
      icon: Calendar, 
      action: () => router.push('/events'),
      category: 'navigation',
      keywords: ['events', 'activities', 'coordination', 'campus']
    },
    { 
      id: 'nav-calendar', 
      title: 'Calendar', 
      subtitle: 'Personal schedule & planning',
      icon: Calendar, 
      action: () => router.push('/calendar'),
      category: 'navigation',
      keywords: ['calendar', 'schedule', 'planning', 'personal']
    },
    
    // Actions
    { 
      id: 'action-new-tool', 
      title: 'Create New Tool', 
      subtitle: 'Start building with HiveLab',
      icon: Plus, 
      action: () => router.push('/hivelab'),
      category: 'actions',
      keywords: ['create', 'new', 'tool', 'build', 'hivelab']
    },
    { 
      id: 'action-join-space', 
      title: 'Join a Space', 
      subtitle: 'Find & join communities',
      icon: Users, 
      action: () => router.push('/spaces?view=browse'),
      category: 'actions',
      keywords: ['join', 'space', 'community', 'group']
    },
    { 
      id: 'action-settings', 
      title: 'Settings', 
      subtitle: 'Account & preferences',
      icon: Settings, 
      action: () => router.push('/settings'),
      category: 'actions',
      keywords: ['settings', 'preferences', 'config', 'account']
    },
    
    // Popular Tools
    { 
      id: 'tool-gpa', 
      title: 'GPA Calculator', 
      subtitle: 'Calculate your semester GPA',
      icon: Hash, 
      action: () => router.push('/tools/grade-calculator/run'),
      category: 'tools',
      keywords: ['gpa', 'calculator', 'grades', 'academic']
    },
    { 
      id: 'tool-study-timer', 
      title: 'Study Timer', 
      subtitle: 'Pomodoro-style focus timer',
      icon: Hash, 
      action: () => router.push('/tools/study-timer/run'),
      category: 'tools',
      keywords: ['timer', 'study', 'pomodoro', 'focus', 'productivity']
    },
    { 
      id: 'tool-poll-maker', 
      title: 'Poll Maker', 
      subtitle: 'Create interactive polls',
      icon: Hash, 
      action: () => router.push('/tools/poll-maker/run'),
      category: 'tools',
      keywords: ['poll', 'survey', 'voting', 'engagement']
    },
    
    // Popular Spaces
    { 
      id: 'space-cs', 
      title: 'CS Study Group', 
      subtitle: '234 members',
      icon: Users, 
      action: () => router.push('/spaces/cs-study'),
      category: 'spaces',
      keywords: ['cs', 'computer science', 'study', 'group', 'programming']
    },
    { 
      id: 'space-housing', 
      title: 'Ellicott Complex', 
      subtitle: '1,892 members',
      icon: Users, 
      action: () => router.push('/spaces/ellicott-complex'),
      category: 'spaces',
      keywords: ['housing', 'dorm', 'ellicott', 'residential']
    },
    { 
      id: 'space-events', 
      title: 'Campus Events', 
      subtitle: 'Official events & announcements',
      icon: Users, 
      action: () => router.push('/spaces/campus-events'),
      category: 'spaces',
      keywords: ['events', 'campus', 'official', 'announcements']
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

            {/* Global Search Bar */}
            <div className="flex-1 max-w-xl mx-2 sm:mx-4">
              <Button
                onClick={() => setIsCommandOpen(true)}
                className="w-full flex items-center justify-between bg-zinc-800 border border-zinc-700 hover:border-[#FFD700] text-zinc-400 hover:text-white transition-colors px-2 sm:px-4 py-2 h-10"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Search className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    <span className="hidden sm:inline">Search tools, spaces, people...</span>
                    <span className="sm:hidden">Search...</span>
                  </span>
                </div>
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 border border-zinc-600 rounded text-xs">
                  <Command className="w-3 h-3 mr-1" />
                  K
                </kbd>
              </Button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <Button variant="ghost" size="sm" className="relative text-zinc-400 hover:text-white p-2">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              <Link href="/profile" className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.fullName || 'User'}
                      width={32}
                      height={32}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Persistent Navigation Tabs - Four Pillars */}
      <nav className="bg-zinc-900/50 border-b border-zinc-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 h-12 overflow-x-auto">
            <Link 
              href="/feed" 
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === '/feed' || pathname === '/' 
                  ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20' 
                  : 'text-zinc-400 hover:text-[#FFD700] hover:bg-zinc-800/50'
              }`}
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Feed</span>
            </Link>
            <Link 
              href="/profile" 
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === '/profile' || pathname.startsWith('/profile') 
                  ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20' 
                  : 'text-zinc-400 hover:text-[#FFD700] hover:bg-zinc-800/50'
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Link 
              href="/spaces" 
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === '/spaces' || pathname.startsWith('/spaces') 
                  ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20' 
                  : 'text-zinc-400 hover:text-[#FFD700] hover:bg-zinc-800/50'
              }`}
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Spaces</span>
            </Link>
            <Link 
              href="/tools" 
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === '/tools' || pathname.startsWith('/tools') || pathname === '/hivelab' || pathname.startsWith('/hivelab')
                  ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20' 
                  : 'text-zinc-400 hover:text-[#FFD700] hover:bg-zinc-800/50'
              }`}
            >
              <Zap className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Tools</span>
            </Link>
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
                  placeholder="Search anything... (tools, spaces, people, commands)"
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
                      {items.map((item, _index) => {
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