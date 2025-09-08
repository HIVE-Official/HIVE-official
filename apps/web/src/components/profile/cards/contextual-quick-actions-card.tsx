"use client";

import React, { useState, useMemo } from 'react';
import { Card } from '@hive/ui';
import { 
  Zap,
  Calendar,
  Users,
  Wrench,
  MessageCircle,
  Search,
  Settings,
  Star,
  Clock,
  FileText,
  Share2,
  Bell,
  Shield,
  HelpCircle,
  Compass,
  BookOpen,
  Coffee,
  Moon,
  Sun,
  AlertCircle,
  Package,
  Home,
  Utensils,
  Activity,
  Target,
  Sparkles,
  TrendingUp,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
  category: 'create' | 'connect' | 'explore' | 'manage' | 'solve';
  isPopular?: boolean;
  badge?: string;
  contextual?: boolean;
}

interface ContextualQuickActionsCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
  userContext?: {
    location?: string;
    currentActivity?: string;
    academicSchedule?: any;
    recentActions?: string[];
    spacesJoined?: number;
  };
}

export function ContextualQuickActionsCard({ 
  settings, 
  isEditMode, 
  className, 
  userContext 
}: ContextualQuickActionsCardProps) {
  const router = useRouter();
  const { user } = useSession();
  const [view, setView] = useState<'all' | 'create' | 'connect' | 'explore' | 'manage' | 'solve'>('all');
  
  // Get contextual information
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  const isWeekend = currentDay === 0 || currentDay === 6;
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : currentHour < 21 ? 'evening' : 'night';
  
  // Helper function to determine academic period
  function getAcademicPeriod() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // UB Buffalo academic calendar approximation
    if ((month === 11 && day > 10) || (month === 4 && day > 10)) return 'finals';
    if ((month === 9 && day > 15) || (month === 2 && day > 15)) return 'midterms';
    if (month === 0 || month === 5 || month === 6 || month === 7) return 'break';
    return 'regular';
  }
  
  const academicPeriod = getAcademicPeriod();

  // Context-aware actions based on time, location, and academic calendar
  const contextualActions = useMemo(() => {
    const actions: QuickAction[] = [];
    
    // Time-based contextual actions
    if (timeOfDay === 'morning' && !isWeekend) {
      actions.push({
        id: 'morning-coffee-group',
        label: 'Morning Coffee Group',
        icon: Coffee,
        color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
        category: 'connect',
        action: () => router.push('/spaces/browse?tag=morning-coffee'),
        badge: 'Live',
        contextual: true
      });
    }
    
    if (timeOfDay === 'evening' && (academicPeriod === 'midterms' || academicPeriod === 'finals')) {
      actions.push({
        id: 'late-night-study',
        label: 'Find Study Room',
        icon: Moon,
        color: 'text-indigo-400 hover:bg-indigo-500/10',
        category: 'solve',
        action: () => router.push('/tools/study-room-finder'),
        isPopular: true,
        contextual: true
      });
    }
    
    // Academic period specific actions
    if (academicPeriod === 'finals') {
      actions.push(
        {
          id: 'stress-relief',
          label: 'Stress Relief Resources',
          icon: Activity,
          color: 'text-green-400 hover:bg-green-500/10',
          category: 'explore',
          action: () => router.push('/resources/wellness'),
          badge: 'Finals Week',
          contextual: true
        },
        {
          id: 'study-materials',
          label: 'Share Study Materials',
          icon: Package,
          color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
          category: 'create',
          action: () => router.push('/resources/share'),
          isPopular: true,
          contextual: true
        }
      );
    }
    
    if (academicPeriod === 'midterms') {
      actions.push({
        id: 'form-study-group',
        label: 'Form Study Group',
        icon: Users,
        color: 'text-blue-400 hover:bg-blue-500/10',
        category: 'connect',
        action: () => router.push('/study-groups/create'),
        badge: 'Midterms',
        contextual: true
      });
    }
    
    if (academicPeriod === 'break') {
      actions.push({
        id: 'summer-opportunities',
        label: 'Summer Opportunities',
        icon: Sun,
        color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
        category: 'explore',
        action: () => router.push('/opportunities/summer'),
        contextual: true
      });
    }
    
    // Meal-time specific actions
    const isMealTime = (currentHour >= 11 && currentHour <= 13) || 
                      (currentHour >= 17 && currentHour <= 19);
    if (isMealTime) {
      actions.push({
        id: 'meal-buddy',
        label: 'Find Meal Buddy',
        icon: Utensils,
        color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
        category: 'connect',
        action: () => router.push('/social/meal-buddy'),
        badge: 'Now',
        contextual: true
      });
    }
    
    // Weekend specific actions
    if (isWeekend) {
      actions.push({
        id: 'weekend-events',
        label: 'Weekend Events',
        icon: Sparkles,
        color: 'text-pink-400 hover:bg-pink-500/10',
        category: 'explore',
        action: () => router.push('/events?filter=weekend'),
        contextual: true
      });
    }
    
    return actions;
  }, [timeOfDay, isWeekend, academicPeriod, currentHour, router]);

  // Problem-solving marketplace actions (always available)
  const solvingActions: QuickAction[] = [
    {
      id: 'need-help',
      label: 'I Need Help With...',
      icon: AlertCircle,
      color: 'text-red-400 hover:bg-red-500/10',
      category: 'solve',
      action: () => router.push('/help/request'),
      isPopular: true
    },
    {
      id: 'offer-help',
      label: 'I Can Help With...',
      icon: Sparkles,
      color: 'text-emerald-400 hover:bg-emerald-500/10',
      category: 'solve',
      action: () => router.push('/help/offer')
    },
    {
      id: 'textbook-exchange',
      label: 'Textbook Exchange',
      icon: BookOpen,
      color: 'text-blue-400 hover:bg-blue-500/10',
      category: 'solve',
      action: () => router.push('/resources/textbooks')
    },
    {
      id: 'ride-share',
      label: 'Campus Ride Share',
      icon: Home,
      color: 'text-teal-400 hover:bg-teal-500/10',
      category: 'solve',
      action: () => router.push('/resources/rides')
    },
    {
      id: 'find-tutor',
      label: 'Find a Tutor',
      icon: GraduationCap,
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
      category: 'solve',
      action: () => router.push('/tutoring/find')
    },
    {
      id: 'career-advice',
      label: 'Career Advice',
      icon: Briefcase,
      color: 'text-gray-400 hover:bg-gray-500/10',
      category: 'solve',
      action: () => router.push('/career/advice')
    }
  ];

  // Core static actions
  const staticActions: QuickAction[] = [
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
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
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
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
      category: 'connect',
      action: () => router.push('/profile/connections?type=study-partners'),
      isPopular: academicPeriod !== 'break'
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
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
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
      id: 'trending-now',
      label: 'Trending Now',
      icon: TrendingUp,
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
      category: 'explore',
      action: () => router.push('/feed?view=trending')
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
      color: 'text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10',
      category: 'manage',
      action: () => router.push('/profile/settings?tab=notifications'),
      badge: '3'
    },
    {
      id: 'profile-settings',
      label: 'Profile Settings',
      icon: Settings,
      color: 'text-gray-400 hover:bg-gray-500/10',
      category: 'manage',
      action: () => router.push('/profile/settings')
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

  // Combine all actions
  const allActions = [...contextualActions, ...solvingActions, ...staticActions];
  
  const filteredActions = allActions.filter(action => {
    if (view === 'all') return true;
    return action.category === view;
  });

  const popularActions = allActions.filter(action => action.isPopular);
  
  // Smart action recommendations based on user patterns
  const recommendedActions = useMemo(() => {
    if (!user) return [];
    
    const recommendations: string[] = [];
    
    // If user hasn't joined many spaces, recommend discovery
    if (!userContext?.spacesJoined || userContext.spacesJoined < 3) {
      recommendations.push('discover-spaces', 'join-space');
    }
    
    // During study periods, recommend study-related actions
    if (academicPeriod === 'midterms' || academicPeriod === 'finals') {
      recommendations.push('find-study-partner', 'study-materials', 'find-tutor');
    }
    
    // Time-based recommendations
    if (timeOfDay === 'evening' && !isWeekend) {
      recommendations.push('schedule-event', 'find-study-partner');
    }
    
    // If user hasn't created content, encourage creation
    if (!userContext?.recentActions?.some(a => a.includes('create'))) {
      recommendations.push('create-space', 'build-tool');
    }
    
    return allActions.filter(action => recommendations.includes(action.id));
  }, [allActions, user, userContext, academicPeriod, timeOfDay, isWeekend]);

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
          <h3 className="font-semibold text-foreground">Campus Command Center</h3>
        </div>
        {contextualActions.length > 0 && (
          <span className="text-xs text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">
            {timeOfDay === 'morning' && '☀️ Morning'}
            {timeOfDay === 'afternoon' && '🌤️ Afternoon'}
            {timeOfDay === 'evening' && '🌆 Evening'}
            {timeOfDay === 'night' && '🌙 Night'}
          </span>
        )}
      </div>

      {/* View Tabs */}
      {!isEditMode && (
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {(['all', 'solve', 'create', 'connect', 'explore', 'manage'] as const).map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                view === viewType 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {viewType === 'solve' ? '🔧 Solve' : viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Contextual Actions Section */}
      {view === 'all' && !isEditMode && contextualActions.length > 0 && (
        <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            Right Now
            {academicPeriod === 'finals' && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Finals Week</span>}
            {academicPeriod === 'midterms' && <span className="text-[10px] bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] px-2 py-0.5 rounded-full">Midterms</span>}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {contextualActions.slice(0, 4).map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={`context-${action.id}`}
                  onClick={action.action}
                  className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all group text-left relative ${action.color}`}
                >
                  {action.badge && (
                    <div className="absolute -top-1 -right-1 bg-accent text-[var(--hive-text-inverse)] text-[10px] font-bold rounded-full px-2 py-0.5">
                      {action.badge}
                    </div>
                  )}
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

      {/* Recommended Actions (for new users) */}
      {view === 'all' && !isEditMode && recommendedActions.length > 0 && userContext?.spacesJoined && userContext.spacesJoined < 3 && (
        <div className="mb-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            Recommended for You
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {recommendedActions.slice(0, 2).map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={`rec-${action.id}`}
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
      
      {/* Popular Actions */}
      {view === 'all' && !isEditMode && popularActions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-[var(--hive-gold)]" />
            Popular Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {popularActions.slice(0, 4).map((action) => {
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
            {view === 'solve' && '🔧 Find solutions to campus problems. Get help, offer help, exchange resources.'}
            {view === 'create' && '✨ Build and create new content, spaces, and tools for your campus community.'}
            {view === 'connect' && '🤝 Connect with classmates, find study partners, and build your campus network.'}
            {view === 'explore' && '🔍 Discover new spaces, tools, events, and opportunities on campus.'}
            {view === 'manage' && '⚙️ Manage your profile, privacy, notifications, and account settings.'}
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
                {timeOfDay === 'morning' && 'Good Morning!'}
                {timeOfDay === 'afternoon' && 'Good Afternoon!'}
                {timeOfDay === 'evening' && 'Good Evening!'}
                {timeOfDay === 'night' && 'Late Night Mode'}
              </p>
              <p className="text-xs text-accent/80">
                {view === 'all' && academicPeriod === 'finals' && '📚 Finals week actions prioritized. Find study groups, share materials, and access wellness resources.'}
                {view === 'all' && academicPeriod === 'midterms' && '📖 Midterm season! Connect with study partners and find quiet study spaces.'}
                {view === 'all' && timeOfDay === 'night' && '🌙 Late night? Find 24/7 study spaces, connect with night owls, or schedule tomorrow\'s activities.'}
                {view === 'all' && timeOfDay === 'morning' && !isWeekend && '☀️ Start your day right! Join morning groups, check today\'s events, or plan your schedule.'}
                {view === 'solve' && '🛠️ Every problem is an opportunity to strengthen your campus community.'}
                {view === 'create' && '✨ Creating content helps build your campus reputation and connects you with like-minded students.'}
                {view === 'connect' && '🤝 Strong campus connections lead to better study groups and career opportunities.'}
                {view === 'explore' && '🔍 Regular exploration helps you discover new opportunities and stay engaged with campus life.'}
                {view === 'manage' && '⚙️ Keep your settings updated to get the most relevant recommendations and connections.'}
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
                This card adapts to your schedule, academic calendar, and usage patterns. Actions change throughout the day to match your needs.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}