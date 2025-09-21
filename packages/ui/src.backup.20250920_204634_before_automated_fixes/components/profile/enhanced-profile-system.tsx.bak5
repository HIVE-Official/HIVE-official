'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Save, X, Plus, RotateCcw } from 'lucide-react';
import { GridLayoutEngine, LayoutPersistence, WidgetConfiguration, WidgetType, CoordinationOpportunity } from './bento-grid';
import { PriorityCoordinationWidget } from './widgets/priority-coordination-widget';
import { PrivacyControlWidget } from './widgets/privacy-control-widget';
import { PersonalToolsPreviewWidget } from './widgets/personal-tools-preview-widget';
import { HiveButton } from '../hive-button';
import { HiveCard } from '../hive-card';
import { cn } from '../lib/utils';

// Extended user interface for enhanced profile
export interface EnhancedProfileUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isBuilder: boolean;
  isVerifiedStudent: boolean;
  campus: string;
  gradYear: string;
  major: string;
  ghostMode?: boolean;
  stats: {
    spacesJoined: number;
    toolsUsed: number;
    connectionsCount: number;
    toolsCreated: number;
    spacesLed: number;
  };
}

export interface ProfileCompletionStatus {
  overall: number;
  avatar: number;
  profile: number;
  verification: number;
  privacy: number;
  missing: string[];
}

interface EnhancedProfileSystemProps {
  user: EnhancedProfileUser;
  spaces: any[];
  events: any[];
  connections: any[];
  hiveLab: any;
  completionStatus: ProfileCompletionStatus;
  isLoading?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
  onSpaceClick?: (spaceId: string) => void;
  onEventClick?: (eventId: string) => void;
  onConnectionClick?: (connectionId: string) => void;
  onJoinSpace?: (spaceId: string) => void;
  onCreateTool?: () => void;
}

export const EnhancedProfileSystem: React.FC<EnhancedProfileSystemProps> = ({
  user,
  spaces = [],
  events = [],
  connections = [],
  hiveLab,
  completionStatus,
  isLoading = false,
  isMobile = false,
  isTablet = false,
  onEditProfile,
  onPrivacySettings,
  onSpaceClick,
  onEventClick,
  onConnectionClick,
  onJoinSpace,
  onCreateTool
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgets, setWidgets] = useState<WidgetConfiguration[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock coordination data - replace with real API
  const mockPriorities: CoordinationOpportunity[] = [
    {
      id: '1',
      type: 'urgent',
      source: 'community',
      title: 'CS study group needs coordinator',
      description: 'Weekly study session needs someone to book room and send reminders',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: 90,
      actions: [
        { id: '1', label: 'Take Lead', type: 'primary', action: () => {} },
        { id: '2', label: 'Suggest Someone', type: 'secondary', action: () => {} }
      ],
      context: {
        communityId: 'cs-majors',
        participants: ['user1', 'user2', 'user3'],
        socialImpact: 85,
        personalRelevance: 70
      }
    },
    {
      id: '2',
      type: 'today',
      source: 'calendar',
      title: 'Team project meeting prep',
      description: 'Gather materials and agenda for 3pm project meeting',
      deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
      priority: 75,
      actions: [
        { id: '1', label: 'Prepare Now', type: 'primary', action: () => {} },
        { id: '2', label: 'Set Reminder', type: 'secondary', action: () => {} }
      ],
      context: {
        eventId: 'project-meeting-1',
        participants: ['teammate1', 'teammate2'],
        socialImpact: 60,
        personalRelevance: 90
      }
    },
    {
      id: '3',
      type: 'this_week',
      source: 'social',
      title: 'Weekend plans coordination',
      description: 'Emma asked about weekend movie night - need to confirm attendance',
      priority: 45,
      actions: [
        { id: '1', label: 'RSVP Yes', type: 'primary', action: () => {} },
        { id: '2', label: 'Maybe Later', type: 'secondary', action: () => {} }
      ],
      context: {
        participants: ['emma', 'friends'],
        socialImpact: 40,
        personalRelevance: 60
      }
    }
  ];

  // Mock privacy settings - replace with real data
  const mockPrivacySettings = {
    ghostMode: {
      enabled: user.ghostMode || false,
      scheduledPrivacy: [],
      exceptions: [],
      partialVisibility: {
        showInMemberLists: true,
        showInSearchResults: true,
        showActivityStatus: true,
        showLastSeen: true
      }
    },
    socialBoundaries: {
      studyMode: false,
      officeHours: [
        { start: '14:00', end: '16:00', days: ['monday', 'wednesday', 'friday'] }
      ],
      socialEnergyLevel: 'high' as const,
      coordinationPreferences: {
        preferredContactMethods: ['hive-message', 'email'],
        responseTimeExpectation: 'hourly' as const,
        availableForEmergencies: true
      }
    },
    dataControl: {
      activitySharing: {
        shareSpaceActivity: true,
        shareCalendarBusy: true,
        shareLocationStatus: false,
        shareToolUsage: true
      },
      crossCommunityVisibility: true,
      searchableProfile: true,
      analyticsOptOut: false
    }
  };

  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  const handleLayoutChange = useCallback((newWidgets: WidgetConfiguration[]) => {
    setWidgets(newWidgets);
    setHasUnsavedChanges(true);
  }, []);

  const handleWidgetSettings = useCallback((widgetId: string, settings: any) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, settings } : widget
    ));
    setHasUnsavedChanges(true);
  }, []);

  const handleAddWidget = useCallback((type: WidgetType) => {
    const newWidget: WidgetConfiguration = {
      id: `widget-${Date.now()}`,
      type,
      title: getWidgetTitle(type),
      position: findNextAvailablePosition(),
      size: getDefaultWidgetSize(type),
      settings: getDefaultWidgetSettings(),
      isVisible: true
    };
    
    setWidgets(prev => [...prev, newWidget]);
    setHasUnsavedChanges(true);
  }, [widgets]);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
    setHasUnsavedChanges(true);
  }, []);

  const findNextAvailablePosition = () => {
    // Simple positioning logic - place at first available spot
    const gridColumns = deviceType === 'mobile' ? 1 : deviceType === 'tablet' ? 2 : 4;
    const occupiedPositions = new Set(
      widgets.map(w => `${w.position.x},${w.position.y}`)
    );

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < gridColumns; x++) {
        if (!occupiedPositions.has(`${x},${y}`)) {
          return { x, y };
        }
      }
    }
    return { x: 0, y: 0 };
  };

  const getWidgetTitle = (type: WidgetType): string => {
    const titles = {
      'social-avatar': 'Profile',
      'priority-coordination': 'Priorities',
      'community-coordination': 'Communities',
      'social-calendar': 'Calendar',
      'privacy-control': 'Privacy',
      'personal-tools': 'Tools',
      'profile-stats': 'Stats',
      'campus-connections': 'Connections'
    };
    return titles[type] || 'Widget';
  };

  const getDefaultWidgetSize = (type: WidgetType) => {
    const sizes = {
      'social-avatar': { width: 1 as const, height: 1 as const },
      'priority-coordination': { width: 1 as const, height: 2 as const },
      'community-coordination': { width: 2 as const, height: 1 as const },
      'social-calendar': { width: 2 as const, height: 1 as const },
      'privacy-control': { width: 1 as const, height: 1 as const },
      'personal-tools': { width: 2 as const, height: 2 as const },
      'profile-stats': { width: 2 as const, height: 1 as const },
      'campus-connections': { width: 1 as const, height: 1 as const }
    };
    return sizes[type] || { width: 1 as const, height: 1 as const };
  };

  const getDefaultWidgetSettings = () => ({
    displayOptions: {
      showHeader: true,
      compactMode: false,
      updateFrequency: 'real-time' as const
    },
    dataFilters: {},
    privacy: {
      visibility: 'community' as const,
      dataSharing: false
    }
  });

  const handleSaveLayout = async () => {
    setHasUnsavedChanges(false);
    setIsEditing(false);
    // Here you would save to backend
    console.log('Saving layout:', widgets);
  };

  const handleCancelEdit = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmed) return;
    }
    setIsEditing(false);
    setHasUnsavedChanges(false);
    // Revert to last saved state
  };

  const renderWidget = (widget: WidgetConfiguration) => {
    const baseProps = {
      id: widget.id,
      title: widget.title,
      size: widget.size,
      position: widget.position,
      settings: widget.settings,
      isEditing,
      onSettingsChange: (settings: any) => handleWidgetSettings(widget.id, settings),
      onSizeChange: (size: any) => {
        const updatedWidgets = widgets.map(w => 
          w.id === widget.id ? { ...w, size } : w
        );
        handleLayoutChange(updatedWidgets);
      },
      onPositionChange: (position: any) => {
        const updatedWidgets = widgets.map(w => 
          w.id === widget.id ? { ...w, position } : w
        );
        handleLayoutChange(updatedWidgets);
      },
      onRemove: () => handleRemoveWidget(widget.id)
    };

    switch (widget.type) {
      case 'priority-coordination':
        return (
          <PriorityCoordinationWidget
            key={widget.id}
            {...baseProps}
            priorities={mockPriorities}
            onActionTaken={(priorityId, actionId) => {
              console.log('Action taken:', priorityId, actionId);
            }}
            onPriorityClick={(priorityId) => {
              console.log('Priority clicked:', priorityId);
            }}
            onViewAll={() => {
              console.log('View all priorities');
            }}
          />
        );
      
      case 'privacy-control':
        return (
          <PrivacyControlWidget
            key={widget.id}
            {...baseProps}
            privacySettings={mockPrivacySettings}
            onPrivacyChange={(settings) => {
              console.log('Privacy settings changed:', settings);
            }}
            onOpenFullSettings={() => {
              if (onPrivacySettings) onPrivacySettings();
            }}
          />
        );
      
      case 'personal-tools':
        return (
          <PersonalToolsPreviewWidget
            key={widget.id}
            {...baseProps}
            isV1Unlocked={user.isBuilder} // Builders get early access
            onJoinWaitlist={() => {
              console.log('Join v1 waitlist');
              window.open('https://hive.ai/waitlist', '_blank');
            }}
            onViewToolCategory={(category) => {
              console.log('View tool category:', category);
              if (onCreateTool) onCreateTool();
            }}
          />
        );
      
      default:
        // Placeholder for other widgets
        return (
          <div key={widget.id} className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">🚧</div>
              <p className="text-sm text-hive-text-secondary">
                {getWidgetTitle(widget.type)} Widget
              </p>
              <p className="text-xs text-hive-text-tertiary">Coming soon</p>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hive-gold mx-auto mb-4" />
          <p className="text-hive-text-primary">Loading your HIVE Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-steel"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-charcoal border-2 border-steel flex items-center justify-center">
                  <span className="text-xl font-bold text-platinum">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              {user.ghostMode && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👻</span>
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-platinum">{user.name}</h1>
              <p className="text-silver">
                {user.major} • {user.gradYear} • {user.campus}
              </p>
              {user.isBuilder && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                    🏗️ Builder
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <HiveButton
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </HiveButton>
                <HiveButton
                  onClick={handleSaveLayout}
                  className="gap-2"
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="h-4 w-4" />
                  Save Layout
                </HiveButton>
              </>
            ) : (
              <HiveButton
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Customize
              </HiveButton>
            )}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <GridLayoutEngine
          widgets={widgets}
          isEditing={isEditing}
          isMobile={isMobile}
          isTablet={isTablet}
          onLayoutChange={handleLayoutChange}
          onWidgetSettings={handleWidgetSettings}
          onAddWidget={handleAddWidget}
          onRemoveWidget={handleRemoveWidget}
        />

        {/* Layout Persistence */}
        <LayoutPersistence
          currentLayout={widgets}
          deviceType={deviceType}
          onLayoutLoad={setWidgets}
          onLayoutSave={async (layout) => {
            // Save to backend
            console.log('Saving layout to backend:', layout);
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedProfileSystem;