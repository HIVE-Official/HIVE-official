"use client";

import React, { useState } from 'react';
import { Card, ButtonEnhanced } from '@hive/ui';
import { 
  Zap,
  Plus,
  Calendar,
  Users,
  Wrench,
  MessageCircle,
  Search,
  Settings,
  Star,
  Clock,
  MapPin,
  Send,
  Camera,
  Link,
  FileText,
  Share2,
  Bell,
  Shield,
  HelpCircle,
  Compass
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
  category: 'create' | 'connect' | 'explore' | 'manage';
  isPopular?: boolean;
  badge?: string;
}

interface QuickActionsCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function QuickActionsCard({ settings, isEditMode, className }: QuickActionsCardProps) {
  const router = useRouter();
  const [view, setView] = useState<'all' | 'create' | 'connect' | 'explore' | 'manage'>('all');

  const actions: QuickAction[] = [
    // Create Actions
    {
      id: 'create-space',
      label: 'Create Space',
      icon: Users,
      color: 'text-blue-400 hover:bg-blue-500/10',
      category: 'create',
      action: () => router.push('/spaces/create'),
      isPopular: true
    },
    {
      id: 'build-tool',
      label: 'Build Tool',
      icon: Wrench,
      color: 'text-purple-400 hover:bg-purple-500/10',
      category: 'create',
      action: () => router.push('/tools/create'),
      isPopular: true
    },
    {
      id: 'schedule-event',
      label: 'Schedule Event',
      icon: Calendar,
      color: 'text-green-400 hover:bg-green-500/10',
      category: 'create',
      action: () => router.push('/events/create')
    },
    {
      id: 'create-post',
      label: 'Create Post',
      icon: FileText,
      color: 'text-accent hover:bg-accent/10',
      category: 'create',
      action: () => router.push('/feed?action=create')
    },

    // Connect Actions
    {
      id: 'find-study-partner',
      label: 'Find Study Partner',
      icon: Star,
      color: 'text-amber-400 hover:bg-amber-500/10',
      category: 'connect',
      action: () => router.push('/profile/connections?type=study-partners'),
      isPopular: true
    },
    {
      id: 'join-space',
      label: 'Join Space',
      icon: Users,
      color: 'text-blue-400 hover:bg-blue-500/10',
      category: 'connect',
      action: () => router.push('/spaces/browse')
    },
    {
      id: 'message-friend',
      label: 'Message Someone',
      icon: MessageCircle,
      color: 'text-pink-400 hover:bg-pink-500/10',
      category: 'connect',
      action: () => router.push('/profile/connections')
    },
    {
      id: 'share-profile',
      label: 'Share Profile',
      icon: Share2,
      color: 'text-indigo-400 hover:bg-indigo-500/10',
      category: 'connect',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Check out my HIVE profile',
            url: window.location.origin + '/profile/me'
          });
        }
      }
    },

    // Explore Actions
    {
      id: 'discover-spaces',
      label: 'Discover Spaces',
      icon: Compass,
      color: 'text-teal-400 hover:bg-teal-500/10',
      category: 'explore',
      action: () => router.push('/spaces/discovery')
    },
    {
      id: 'browse-tools',
      label: 'Browse Tools',
      icon: Search,
      color: 'text-purple-400 hover:bg-purple-500/10',
      category: 'explore',
      action: () => router.push('/tools/browse')
    },
    {
      id: 'campus-events',
      label: 'Campus Events',
      icon: Calendar,
      color: 'text-green-400 hover:bg-green-500/10',
      category: 'explore',
      action: () => router.push('/events')
    },
    {
      id: 'explore-feed',
      label: 'Explore Feed',
      icon: Search,
      color: 'text-orange-400 hover:bg-orange-500/10',
      category: 'explore',
      action: () => router.push('/feed?view=discover')
    },

    // Manage Actions
    {
      id: 'privacy-settings',
      label: 'Privacy Settings',
      icon: Shield,
      color: 'text-red-400 hover:bg-red-500/10',
      category: 'manage',
      action: () => router.push('/profile/settings?tab=privacy')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      color: 'text-yellow-400 hover:bg-yellow-500/10',
      category: 'manage',
      action: () => router.push('/profile/settings?tab=notifications'),
      badge: '3'
    },
    {
      id: 'calendar-sync',
      label: 'Calendar Sync',
      icon: Link,
      color: 'text-blue-400 hover:bg-blue-500/10',
      category: 'manage',
      action: () => router.push('/profile/integrations?tab=calendar')
    },
    {
      id: 'help-support',
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'text-gray-400 hover:bg-gray-500/10',
      category: 'manage',
      action: () => router.push('/help')
    }
  ];

  const filteredActions = actions.filter(action => {
    if (view === 'all') return true;
    return action.category === view;
  });

  const popularActions = actions.filter(action => action.isPopular);

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
        </div>
      </div>

      {/* View Tabs */}
      {!isEditMode && (
        <div className="flex items-center gap-1 mb-4">
          {(['all', 'create', 'connect', 'explore', 'manage'] as const).map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                view === viewType 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Popular Actions (when view is 'all') */}
      {view === 'all' && !isEditMode && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" />
            Popular Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {popularActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={`popular-${action.id}`}
                  onClick={action.action}
                  className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all group text-left ${action.color}`}
                >
                  <div className="flex items-center gap-2">
                    <ActionIcon className="h-4 w-4" />
                    <span className="text-sm font-medium text-foreground group-hover:text-foreground">
                      {action.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {filteredActions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={action.id}
              onClick={!isEditMode ? action.action : undefined}
              disabled={isEditMode}
              className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all group text-left relative ${
                isEditMode ? 'opacity-50 cursor-not-allowed' : action.color
              }`}
            >
              {action.badge && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-[var(--hive-text-inverse)] text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {action.badge}
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <ActionIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground group-hover:text-foreground block truncate">
                    {action.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Category Description */}
      {view !== 'all' && !isEditMode && (
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            {view === 'create' && 'Build and create new content, spaces, and tools for your campus community.'}
            {view === 'connect' && 'Connect with classmates, find study partners, and build your campus network.'}
            {view === 'explore' && 'Discover new spaces, tools, events, and opportunities on campus.'}
            {view === 'manage' && 'Manage your profile, privacy, notifications, and account settings.'}
          </p>
        </div>
      )}

      {/* Contextual Tips */}
      {!isEditMode && (
        <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-accent font-medium mb-1">
                Quick Tip
              </p>
              <p className="text-xs text-accent/80">
                {view === 'all' && 'Use keyboard shortcuts: C for Create Space, T for Build Tool, S for Search'}
                {view === 'create' && 'Creating content helps build your campus reputation and connects you with like-minded students'}
                {view === 'connect' && 'Strong campus connections lead to better study groups and career opportunities'}
                {view === 'explore' && 'Regular exploration helps you discover new opportunities and stay engaged with campus life'}
                {view === 'manage' && 'Keep your settings updated to get the most relevant recommendations and connections'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customization Notice */}
      {isEditMode && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Settings className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-400 font-medium mb-1">
                Customization Available
              </p>
              <p className="text-xs text-blue-300/80">
                In the full dashboard editor, you can customize which actions appear and their order based on your preferences.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}