"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@hive/ui';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Save, 
  Edit3, 
  Grid3X3,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { CardLayout, DashboardLayout } from '@/lib/firebase-collections';

// Import all card components
import { AvatarIdentityCard } from '../cards/avatar-identity-card';
import { PersonalCalendarCard } from '../cards/personal-calendar-card';
import { PersonalToolsCard } from '../personal-tools-card';
import { UserSpacesCard } from '../cards/user-spaces-card';
import { ActivityHistoryCard } from '../cards/activity-history-card';
import { GhostModeCard } from '../cards/ghost-mode-card';
import { SocialConnectionsCard } from '../cards/social-connections-card';
import { PersonalAnalyticsCard } from '../cards/personal-analytics-card';
import { CampusDiscoveryCard } from '../cards/campus-discovery-card';
import { QuickActionsCard } from '../cards/quick-actions-card';

interface CustomizableGridProps {
  layout?: DashboardLayout;
  isEditMode?: boolean;
  device: 'mobile' | 'tablet' | 'desktop';
  onLayoutChange?: (newLayout: DashboardLayout) => void;
  onEditModeChange?: (editMode: boolean) => void;
}

// Card type mappings
const CARD_COMPONENTS = {
  avatar: AvatarIdentityCard,
  calendar: PersonalCalendarCard,
  tools: PersonalToolsCard,
  spaces: UserSpacesCard,
  activity: ActivityHistoryCard,
  privacy: GhostModeCard,
  social: SocialConnectionsCard,
  analytics: PersonalAnalyticsCard,
  discovery: CampusDiscoveryCard,
  'quick-actions': QuickActionsCard
} as const;

const CARD_LABELS = {
  avatar: 'Avatar & Identity',
  calendar: 'Personal Calendar',
  tools: 'Personal Tools',
  spaces: 'Your Spaces',
  activity: 'Activity History',
  privacy: 'Ghost Mode Privacy',
  social: 'Social Connections',
  analytics: 'Personal Analytics',
  discovery: 'Campus Discovery',
  'quick-actions': 'Quick Actions'
} as const;

// Grid configuration for different devices
const GRID_CONFIG = {
  mobile: { columns: 1, gap: 16, cardMinHeight: 200 },
  tablet: { columns: 2, gap: 20, cardMinHeight: 240 },
  desktop: { columns: 4, gap: 24, cardMinHeight: 280 }
} as const;

export function CustomizableGrid({ 
  layout, 
  isEditMode = false, 
  device,
  onLayoutChange,
  onEditModeChange
}: CustomizableGridProps) {
  const [currentLayout, setCurrentLayout] = useState<CardLayout[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize layout from props
  useEffect(() => {
    if (layout?.layouts?.[device]) {
      setCurrentLayout(layout.layouts[device]);
    }
    setIsLoading(false);
  }, [layout, device]);

  // Handle drag end
  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCurrentLayout((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newLayout = arrayMove(items, oldIndex, newIndex);
        
        // Update positions based on new order
        const updatedLayout = newLayout.map((item, index) => {
          const gridConfig = GRID_CONFIG[device];
          const row = Math.floor(index / gridConfig.columns);
          const col = index % gridConfig.columns;
          
          return {
            ...item,
            position: { x: col, y: row }
          };
        });

        setHasUnsavedChanges(true);
        return updatedLayout;
      });
    }
  }, [device]);

  // Toggle card visibility
  const toggleCardVisibility = useCallback((cardId: string) => {
    setCurrentLayout(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { ...card, visible: !card.visible }
          : card
      )
    );
    setHasUnsavedChanges(true);
  }, []);

  // Reset layout to defaults
  const resetLayout = useCallback(async () => {
    try {
      const response = await fetch('/api/profile/dashboard/layout/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentLayout(data.layout.layouts[device]);
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error('Error resetting layout:', error);
    }
  }, [device]);

  // Save layout changes
  const saveLayout = useCallback(async () => {
    if (!layout || !hasUnsavedChanges) return;

    try {
      const updatedLayout = {
        ...layout,
        layouts: {
          ...layout.layouts,
          [device]: currentLayout
        }
      };

      const response = await fetch('/api/profile/dashboard/layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLayout)
      });

      if (response.ok) {
        const data = await response.json();
        onLayoutChange?.(data.layout);
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  }, [layout, currentLayout, device, hasUnsavedChanges, onLayoutChange]);

  // Device icon component
  const DeviceIcon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Edit Mode Header */}
      {isEditMode && (
        <Card className="mb-6 p-4 border-accent bg-accent/5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <DeviceIcon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">
                  {device.charAt(0).toUpperCase() + device.slice(1)} Layout
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Grid3X3 className="h-4 w-4" />
                {GRID_CONFIG[device].columns} columns
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={resetLayout}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              
              {hasUnsavedChanges && (
                <button
                  onClick={saveLayout}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              )}
              
              <button
                onClick={() => onEditModeChange?.(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                Exit Edit
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Card Visibility Controls */}
      {isEditMode && (
        <Card className="mb-6 p-4">
          <h3 className="font-medium mb-3 text-foreground">Card Visibility</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {currentLayout.map((card) => (
              <button
                key={card.id}
                onClick={() => toggleCardVisibility(card.id)}
                className={`flex items-center gap-2 p-2 text-sm rounded-lg border transition-colors ${
                  card.visible
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-muted/30 text-muted-foreground'
                }`}
              >
                {card.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {CARD_LABELS[card.type as keyof typeof CARD_LABELS]}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Dashboard Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={currentLayout.map(card => card.id)} 
          strategy={rectSortingStrategy}
        >
          <div 
            className={`grid gap-${GRID_CONFIG[device].gap / 4} grid-cols-${GRID_CONFIG[device].columns} auto-rows-min`}
            style={{
              gridTemplateColumns: `repeat(${GRID_CONFIG[device].columns}, 1fr)`,
              gap: `${GRID_CONFIG[device].gap}px`
            }}
          >
            {currentLayout
              .filter(card => card.visible || isEditMode)
              .map((card) => (
                <SortableGridItem
                  key={card.id}
                  card={card}
                  isEditMode={isEditMode}
                  device={device}
                />
              ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Empty State */}
      {currentLayout.filter(card => card.visible).length === 0 && !isEditMode && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No cards visible</h3>
            <p className="text-sm mb-4">
              Enable edit mode to customize your dashboard and show cards.
            </p>
            <button
              onClick={() => onEditModeChange?.(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              Customize Dashboard
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

// Sortable grid item component
interface SortableGridItemProps {
  card: CardLayout;
  isEditMode: boolean;
  device: 'mobile' | 'tablet' | 'desktop';
}

function SortableGridItem({ card, isEditMode, device }: SortableGridItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    minHeight: `${GRID_CONFIG[device].cardMinHeight}px`,
    gridColumn: `span ${card.size.width}`,
    gridRow: `span ${card.size.height}`
  };

  const CardComponent = CARD_COMPONENTS[card.type as keyof typeof CARD_COMPONENTS];

  if (!CardComponent) {
    return (
      <Card 
        ref={setNodeRef} 
        style={style} 
        className="p-4 border-dashed border-2 border-muted-foreground/30"
      >
        <div className="text-center text-muted-foreground">
          <div className="text-sm">Unknown card type: {card.type}</div>
        </div>
      </Card>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${
        isEditMode ? 'cursor-move' : ''
      } ${!card.visible ? 'opacity-50' : ''}`}
      {...attributes}
      {...(isEditMode ? listeners : {})}
    >
      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 z-10 bg-accent/10 border-2 border-accent rounded-lg flex items-center justify-center">
          <div className="bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-medium">
            {CARD_LABELS[card.type as keyof typeof CARD_LABELS]}
          </div>
        </div>
      )}
      
      {/* Card Component */}
      <CardComponent 
        settings={card.settings} 
        isEditMode={isEditMode}
        className={isEditMode ? 'pointer-events-none' : ''}
      />
    </div>
  );
}