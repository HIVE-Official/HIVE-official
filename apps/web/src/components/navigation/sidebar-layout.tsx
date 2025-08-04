"use client";

import React, { useState } from 'react';
import { useSession } from '@/hooks/use-session';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Home, 
  Users, 
  User, 
  Hexagon,
  Search, 
  Bell, 
  MessageCircle, 
  Calendar,
  Settings,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

// Nav Shell Component with HIVE Design System Integration
interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { user } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [notifications, setNotifications] = useState(3);

  // Determine current destination based on pathname
  const getCurrentDestination = (): 'feed' | 'spaces' | 'profile' | 'hivelab' => {
    if (pathname.startsWith('/spaces')) return 'spaces';
    if (pathname.startsWith('/profile')) return 'profile';
    if (pathname.startsWith('/tools') || pathname.startsWith('/hivelab')) return 'hivelab';
    return 'feed';
  };

  const currentDestination = getCurrentDestination();

  const primaryDestinations = [
    {
      id: 'feed',
      label: 'Feed',
      icon: Home,
      description: 'Your personalized campus feed',
      href: '/',
      badge: null
    },
    {
      id: 'spaces',
      label: 'Spaces',
      icon: Users,
      description: 'Communities & groups',
      href: '/spaces',
      badge: '2' // New activity
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Your profile & dashboard',
      href: '/profile',
      badge: null
    },
    {
      id: 'hivelab',
      label: 'HiveLAB',
      icon: Hexagon,
      description: 'Build & discover tools',
      href: '/tools',
      badge: 'new' // New feature
    }
  ];

  const quickActions = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: notifications },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: '5' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' }
  ];

  const handleNavigate = (destination: string) => {
    const dest = primaryDestinations.find(d => d.id === destination);
    if (dest) {
      router.push(dest.href);
    }
  };

  const handleAction = (actionId: string) => {
    if (actionId === 'notifications') {
      setNotifications(0);
      // TODO: Open notifications panel
    } else if (actionId === 'search') {
      // TODO: Open command palette
    } else if (actionId === 'messages') {
      router.push('/messages');
    } else if (actionId === 'calendar') {
      router.push('/calendar');
    } else if (actionId === 'create') {
      // TODO: Open creation modal
    } else if (actionId === 'settings') {
      router.push('/settings');
    }
  };

  // Mobile detection (simplified)
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Bottom Tab Bar
  if (isMobile) {
    return (
      <div className="min-h-screen bg-hive-background-primary pb-16">
        <main className="h-full">
          {children}
        </main>
        
        {/* Mobile Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-hive-background-secondary border-t border-hive-border-default">
          <div className="flex items-center justify-around px-2 py-2 safe-bottom">
            {primaryDestinations.map((destination) => {
              const Icon = destination.icon;
              const isActive = currentDestination === destination.id;
              
              return (
                <button
                  key={destination.id}
                  onClick={() => handleNavigate(destination.id)}
                  className={`
                    flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 relative
                    ${isActive 
                      ? 'text-hive-brand-secondary bg-hive-brand-secondary/10' 
                      : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-interactive-hover'
                    }
                  `}
                >
                  <div className="relative">
                    <Icon size={20} />
                    {destination.badge && (
                      <div className={`
                        absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium
                        ${destination.badge === 'new' 
                          ? 'bg-hive-brand-secondary text-hive-text-primary' 
                          : 'bg-hive-status-error text-white'
                        }
                        ${destination.badge.length === 1 ? 'w-4 h-4 flex items-center justify-center p-0' : ''}
                      `}>
                        {destination.badge === 'new' ? '●' : destination.badge}
                      </div>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">{destination.label}</span>
                  {isActive && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-hive-brand-secondary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Left Sidebar
  return (
    <div className="min-h-screen bg-hive-background-primary flex">
      <div className={`
        fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}
        bg-hive-background-secondary border-r border-hive-border-default
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header with HIVE Brand & Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-hive-border-default">
            {isExpanded && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/assets/hive-logo-white.svg"
                    alt="HIVE Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-lg font-bold text-hive-text-primary">HIVE</span>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-hive-interactive-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              {isExpanded ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          {/* User Profile Section */}
          {isExpanded && user && (
            <div className="p-4 border-b border-hive-border-default">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatarUrl || '/api/placeholder/40/40'} 
                  alt={user.fullName || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-hive-text-primary truncate">
                    {user.fullName || 'User'}
                  </div>
                  <div className="text-sm text-hive-text-tertiary truncate">
                    @{user.handle || 'user'}
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-hive-brand-secondary/20 text-hive-brand-secondary">
                  {user.userType || 'student'}
                </div>
              </div>
            </div>
          )}

          {/* Primary Navigation */}
          <div className="flex-1 p-2">
            <div className="space-y-1">
              {primaryDestinations.map((destination) => {
                const Icon = destination.icon;
                const isActive = currentDestination === destination.id;
                
                return (
                  <button
                    key={destination.id}
                    onClick={() => handleNavigate(destination.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative group
                      ${isActive 
                        ? 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-l-2 border-hive-brand-secondary' 
                        : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-interactive-hover'
                      }
                    `}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon size={20} />
                      {destination.badge && (
                        <div className={`
                          absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium
                          ${destination.badge === 'new' 
                            ? 'bg-hive-brand-secondary text-hive-text-primary' 
                            : 'bg-hive-status-error text-white'
                          }
                          ${destination.badge.length === 1 ? 'w-4 h-4 flex items-center justify-center p-0' : ''}
                        `}>
                          {destination.badge === 'new' ? '●' : destination.badge}
                        </div>
                      )}
                    </div>
                    
                    {isExpanded && (
                      <div className="flex-1 text-left">
                        <div className="font-medium">{destination.label}</div>
                        <div className="text-xs text-hive-text-tertiary mt-0.5">
                          {destination.description}
                        </div>
                      </div>
                    )}
                    
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-hive-background-secondary border border-hive-border-default rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="text-sm font-medium text-hive-text-primary">{destination.label}</div>
                        <div className="text-xs text-hive-text-tertiary">{destination.description}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-hive-border-default">
              {isExpanded && (
                <div className="text-xs font-medium text-hive-text-tertiary uppercase tracking-wider mb-2 px-3">
                  Quick Actions
                </div>
              )}
              <div className="space-y-1">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-interactive-hover relative group"
                    >
                      <div className="relative flex-shrink-0">
                        <Icon size={18} />
                        {action.badge && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-status-error text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {action.badge}
                          </div>
                        )}
                      </div>
                      
                      {isExpanded && (
                        <span className="font-medium">{action.label}</span>
                      )}
                      
                      {!isExpanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-hive-background-secondary border border-hive-border-default rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="text-sm font-medium text-hive-text-primary whitespace-nowrap">{action.label}</div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-2 border-t border-hive-border-default">
            <button
              onClick={() => handleAction('create')}
              className={`
                w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200
                bg-hive-brand-secondary hover:bg-hive-brand-hover text-hive-text-primary font-medium
              `}
            >
              <PlusCircle size={18} />
              {isExpanded && <span>Create</span>}
            </button>
            
            {isExpanded && (
              <button
                onClick={() => handleAction('settings')}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-interactive-hover mt-1"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <main className="h-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}