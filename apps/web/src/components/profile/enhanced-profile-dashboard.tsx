"use client";

import React, { useState, useMemo } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  AvatarIdentityCard,
  PersonalCalendarCard,
  UserSpacesCard,
  ActivityHistoryCard,
  GhostModeCard,
  SocialConnectionsCard,
  PersonalAnalyticsCard,
  CampusDiscoveryCard,
  ContextualQuickActionsCard,
  StudyGroupMatcherCard,
  ResourceSharingCard,
  PersonalToolsCard
} from './cards';
import { useSession } from '@/hooks/use-session';
import { useProfileModern } from '@hive/hooks';
import { 
  Grid3x3,
  Maximize2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Package,
  Brain,
  Shield,
  Calendar,
  Activity
} from 'lucide-react';

type CardSize = 'small' | 'medium' | 'large' | 'full';
type ViewMode = 'grid' | 'focus' | 'list';

interface CardConfig {
  id: string;
  component: React.ComponentType<any>;
  title: string;
  icon: React.ComponentType<any>;
  size: CardSize;
  category: 'identity' | 'social' | 'utility' | 'analytics' | 'settings';
  isLocked?: boolean;
  unlockRequirement?: string;
  priority: number;
}

export function EnhancedProfileDashboard() {
  const { user } = useSession();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Use the modern profile hook
  const {
    profile,
    spaces,
    unlocks,
    loading,
    errors,
    completionPercentage,
    nextSteps,
    updateProfile,
  } = useProfileModern();
  
  // Get contextual information
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : currentHour < 21 ? 'evening' : 'night';
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  
  // Define all available cards with their configurations
  const allCards: CardConfig[] = [
    // Core Identity Cards
    {
      id: 'identity',
      component: AvatarIdentityCard,
      title: 'Identity',
      icon: Users,
      size: 'medium',
      category: 'identity',
      priority: 1
    },
    {
      id: 'quick-actions',
      component: ContextualQuickActionsCard,
      title: 'Campus Command Center',
      icon: Target,
      size: 'large',
      category: 'utility',
      priority: 2
    },
    
    // Social Utility Cards
    {
      id: 'study-groups',
      component: StudyGroupMatcherCard,
      title: 'Study Groups',
      icon: Brain,
      size: 'large',
      category: 'social',
      priority: 3
    },
    {
      id: 'resources',
      component: ResourceSharingCard,
      title: 'Resource Network',
      icon: Package,
      size: 'large',
      category: 'utility',
      priority: 4
    },
    
    // Activity & Analytics
    {
      id: 'calendar',
      component: PersonalCalendarCard,
      title: 'Calendar',
      icon: Calendar,
      size: 'medium',
      category: 'utility',
      priority: 5
    },
    {
      id: 'spaces',
      component: UserSpacesCard,
      title: 'My Spaces',
      icon: Users,
      size: 'medium',
      category: 'social',
      priority: 6
    },
    {
      id: 'analytics',
      component: PersonalAnalyticsCard,
      title: 'Analytics',
      icon: TrendingUp,
      size: 'medium',
      category: 'analytics',
      priority: 7,
      isLocked: completionPercentage < 50,
      unlockRequirement: 'Complete 50% of your profile'
    },
    {
      id: 'connections',
      component: SocialConnectionsCard,
      title: 'Connections',
      icon: Users,
      size: 'medium',
      category: 'social',
      priority: 8
    },
    
    // Tools & Discovery
    {
      id: 'tools',
      component: PersonalToolsCard,
      title: 'My Tools',
      icon: Activity,
      size: 'medium',
      category: 'utility',
      priority: 9,
      isLocked: !profile?.isBuilder,
      unlockRequirement: 'Become a builder'
    },
    {
      id: 'discovery',
      component: CampusDiscoveryCard,
      title: 'Discover',
      icon: Sparkles,
      size: 'small',
      category: 'social',
      priority: 10
    },
    
    // Settings & Privacy
    {
      id: 'activity',
      component: ActivityHistoryCard,
      title: 'Activity',
      icon: Activity,
      size: 'small',
      category: 'analytics',
      priority: 11
    },
    {
      id: 'privacy',
      component: GhostModeCard,
      title: 'Privacy',
      icon: Shield,
      size: 'small',
      category: 'settings',
      priority: 12
    }
  ];
  
  // Filter and sort cards based on user state and context
  const visibleCards = useMemo(() => {
    let cards = allCards;
    
    // Filter out locked cards unless in edit mode
    if (!isEditMode) {
      cards = cards.filter(card => !card.isLocked);
    }
    
    // Sort by priority and contextual relevance
    cards.sort((a, b) => {
      // Prioritize utility cards during study periods
      if ((timeOfDay === 'evening' || timeOfDay === 'night') && !isWeekend) {
        if (a.category === 'utility' && b.category !== 'utility') return -1;
        if (b.category === 'utility' && a.category !== 'utility') return 1;
      }
      
      // Prioritize social cards on weekends
      if (isWeekend) {
        if (a.category === 'social' && b.category !== 'social') return -1;
        if (b.category === 'social' && a.category !== 'social') return 1;
      }
      
      return a.priority - b.priority;
    });
    
    return cards;
  }, [allCards, isEditMode, timeOfDay, isWeekend]);
  
  // Get card size classes
  const getCardClasses = (size: CardSize, isGrid: boolean) => {
    if (!isGrid) return 'w-full';
    
    switch(size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-1 lg:col-span-2';
      case 'large': return 'col-span-1 lg:col-span-3';
      case 'full': return 'col-span-1 lg:col-span-4';
      default: return 'col-span-1';
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Sign in to view your profile</h2>
          <p className="text-sm text-muted-foreground">Access your Campus Command Center</p>
        </Card>
      </div>
    );
  }
  
  if (loading.profile) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 col-span-1 lg:col-span-2">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Campus Command Center</h1>
              <p className="text-sm text-muted-foreground">
                {timeOfDay === 'morning' && 'Good morning! Ready to conquer the day?'}
                {timeOfDay === 'afternoon' && 'Good afternoon! Stay productive!'}
                {timeOfDay === 'evening' && 'Good evening! Time for focused work.'}
                {timeOfDay === 'night' && 'Late night grind mode activated.'}
              </p>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-2">
              {/* Completion Score */}
              <div className="text-right mr-4">
                <div className="text-sm text-muted-foreground">Profile Strength</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold text-accent">{completionPercentage}%</div>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-accent-foreground transition-all"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('focus')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'focus' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
              
              {/* Edit Mode Toggle */}
              <Button
                onClick={() => setIsEditMode(!isEditMode)}
                variant={isEditMode ? 'default' : 'outline'}
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditMode ? 'Done' : 'Customize'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {visibleCards.map((card) => {
              const CardComponent = card.component;
              const cardClasses = getCardClasses(card.size, true);
              
              return (
                <div key={card.id} className={`${cardClasses} relative group`}>
                  {card.isLocked && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Locked</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {card.unlockRequirement}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <CardComponent 
                    isEditMode={isEditMode}
                    userContext={{
                      spacesJoined: spaces.length,
                      recentActions: []
                    }}
                  />
                  
                  {/* Focus Mode Button */}
                  {!isEditMode && (
                    <button
                      onClick={() => {
                        setViewMode('focus');
                        setFocusedCard(card.id);
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-background/80 rounded backdrop-blur-sm"
                    >
                      <Maximize2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Focus View */}
        {viewMode === 'focus' && focusedCard && (
          <div className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => {
                  const currentIndex = visibleCards.findIndex(c => c.id === focusedCard);
                  const prevCard = visibleCards[currentIndex - 1];
                  if (prevCard) setFocusedCard(prevCard.id);
                }}
                variant="ghost"
                size="sm"
                disabled={visibleCards.findIndex(c => c.id === focusedCard) === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {visibleCards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setFocusedCard(card.id)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      card.id === focusedCard ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={() => {
                  const currentIndex = visibleCards.findIndex(c => c.id === focusedCard);
                  const nextCard = visibleCards[currentIndex + 1];
                  if (nextCard) setFocusedCard(nextCard.id);
                }}
                variant="ghost"
                size="sm"
                disabled={visibleCards.findIndex(c => c.id === focusedCard) === visibleCards.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {/* Focused Card */}
            <div className="max-w-4xl mx-auto">
              {(() => {
                const card = visibleCards.find(c => c.id === focusedCard);
                if (!card) return null;
                const CardComponent = card.component;
                return (
                  <CardComponent 
                    isEditMode={isEditMode}
                    userContext={{
                      spacesJoined: spaces.length,
                      recentActions: []
                    }}
                  />
                );
              })()}
            </div>
          </div>
        )}
        
        {/* Next Steps Prompt */}
        {nextSteps.length > 0 && !isEditMode && (
          <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              Next Steps to Unlock More Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {nextSteps.slice(0, 3).map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}