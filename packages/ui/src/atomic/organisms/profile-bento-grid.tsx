'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
  Search,
  Zap,
  Settings,
  GripVertical,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import type {
  BentoCard,
  BentoGridLayout,
  GridSize,
  ProfileSystem
} from '@hive/core/types/profile-system';

interface ProfileBentoGridProps {
  profile: ProfileSystem;
  editable?: boolean;
  onLayoutChange?: (layout: BentoGridLayout) => void;
  className?: string;
}

/**
 * Mobile-first responsive Bento Grid
 * - Mobile: 2 columns max, vertical scroll
 * - Tablet: 3 columns
 * - Desktop: 4 columns full grid
 */
export const ProfileBentoGrid: React.FC<ProfileBentoGridProps> = ({
  profile,
  editable = false,
  onLayoutChange,
  className = ''
}) => {
  const [layout, setLayout] = useState<BentoGridLayout>(profile.grid);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Detect mobile/tablet/desktop
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Get the appropriate cards based on device
  const activeCards = isMobile ? layout.mobileLayout : layout.cards;

  // Card type configurations
  const cardConfigs: Record<string, any> = {
    spaces_hub: {
      title: 'My Spaces',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20'
    },
    friends_network: {
      title: 'Friends Network',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10',
      borderColor: 'border-purple-500/20'
    },
    schedule_overlap: {
      title: 'Schedule Overlap',
      icon: Calendar,
      color: 'bg-gradient-to-br from-green-500/10 to-green-600/10',
      borderColor: 'border-green-500/20'
    },
    active_now: {
      title: 'Active Now',
      icon: Activity,
      color: 'bg-gradient-to-br from-orange-500/10 to-orange-600/10',
      borderColor: 'border-orange-500/20'
    },
    discovery: {
      title: 'Discover',
      icon: Search,
      color: 'bg-gradient-to-br from-pink-500/10 to-pink-600/10',
      borderColor: 'border-pink-500/20'
    },
    vibe_check: {
      title: 'Campus Vibe',
      icon: Zap,
      color: 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/10',
      borderColor: 'border-yellow-500/20'
    },
    tools_created: {
      title: 'Tools',
      icon: Zap,
      color: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10',
      borderColor: 'border-indigo-500/20'
    },
    rituals_active: {
      title: 'Rituals',
      icon: Activity,
      color: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10',
      borderColor: 'border-emerald-500/20'
    },
    reputation: {
      title: 'Reputation',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-amber-500/10 to-amber-600/10',
      borderColor: 'border-amber-500/20'
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    if (!editable) return;
    setIsDragging(true);
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetPosition: { x: number; y: number }) => {
    e.preventDefault();
    if (!draggedCard || !editable) return;

    const updatedCards = activeCards.map(card => {
      if (card.id === draggedCard) {
        return { ...card, position: targetPosition };
      }
      return card;
    });

    const updatedLayout = {
      ...layout,
      [isMobile ? 'mobileLayout' : 'cards']: updatedCards,
      lastModified: new Date()
    };

    setLayout(updatedLayout);
    onLayoutChange?.(updatedLayout);
    setIsDragging(false);
    setDraggedCard(null);
  };

  // Toggle card size
  const toggleCardSize = (cardId: string) => {
    if (!editable) return;

    const updatedCards = activeCards.map(card => {
      if (card.id === cardId) {
        const newSize: GridSize = card.size === '1x1' ? '2x1' :
                                  card.size === '2x1' ? '2x2' :
                                  card.size === '2x2' ? '1x1' : '1x1';
        return { ...card, size: newSize };
      }
      return card;
    });

    const updatedLayout = {
      ...layout,
      [isMobile ? 'mobileLayout' : 'cards']: updatedCards,
      lastModified: new Date()
    };

    setLayout(updatedLayout);
    onLayoutChange?.(updatedLayout);
  };

  // Render individual card
  const renderCard = (card: BentoCard) => {
    // Handle custom card types
    const cardType = card.type === 'custom' ? (card as any).customType : card.type;
    const config = cardConfigs[cardType] || {};
    const Icon = config.icon || Settings;

    // Calculate grid span based on size
    const sizeClasses = {
      '1x1': 'col-span-1 row-span-1',
      '2x1': 'col-span-2 row-span-1',
      '2x2': 'col-span-2 row-span-2',
      '1x2': 'col-span-1 row-span-2'
    };

    // Mobile overrides - max 2 columns
    const mobileSizeClasses = {
      '1x1': 'col-span-1 row-span-1',
      '2x1': 'col-span-2 row-span-1',
      '2x2': 'col-span-2 row-span-2',
      '1x2': 'col-span-1 row-span-2'
    };

    return (
      <div
        key={card.id}
        className={`
          ${isMobile ? mobileSizeClasses[card.size] : sizeClasses[card.size]}
          ${isDragging && draggedCard === card.id ? 'opacity-50' : ''}
          transition-all duration-200
        `}
        draggable={editable}
        onDragStart={(e) => handleDragStart(e, card.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, card.position)}
      >
        <Card className={`
          h-full relative group cursor-pointer
          ${config.color} ${config.borderColor}
          border backdrop-blur-sm
          hover:shadow-lg transition-all duration-200
          ${editable ? 'hover:ring-2 hover:ring-hive-accent/50' : ''}
        `}>
          {/* Card Header */}
          <div className="p-4 pb-2 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon size={18} className="text-hive-text-primary" />
              <h3 className="font-semibold text-sm text-hive-text-primary">
                {config.title}
              </h3>
            </div>

            {editable && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => toggleCardSize(card.id)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {card.size === '2x2' ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button className="p-1 hover:bg-white/10 rounded cursor-move">
                  <GripVertical size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Card Content - Dynamic based on type */}
          <div className="px-4 pb-4">
            {renderCardContent(card, profile)}
          </div>
        </Card>
      </div>
    );
  };

  // Render card content based on type
  const renderCardContent = (card: BentoCard, profile: ProfileSystem) => {
    // Handle extended card types and custom types
    const cardType = card.type === 'custom' ? (card as any).customType : (card.type as string);

    switch (cardType) {
      case 'spaces_hub': {
        const activeSpaces = profile.connections?.connections?.filter(c => c.sharedSpaces?.length > 0) || [];
        return (
          <div className="space-y-2 mt-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {activeSpaces.length || 0}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Active spaces
            </div>
            {card.size !== '1x1' && activeSpaces.length > 0 && (
              <div className="mt-3 space-y-1">
                <div className="text-xs text-hive-text-secondary mb-1">Recent activity</div>
                {activeSpaces.slice(0, 3).map((conn, idx) => (
                  <div key={idx} className="text-xs text-hive-text-primary truncate">
                    {conn.sharedSpaces[0]}
                  </div>
                ))}
              </div>
            )}
            {card.size === '2x2' && (
              <Button size="sm" className="mt-3 w-full" variant="outline">
                Browse Spaces
              </Button>
            )}
          </div>
        );
      }

      case 'friends_network': {
        const friendCount = profile.connections?.friends?.length || 0;
        const connectionCount = profile.connections?.connections?.length || 0;
        return (
          <div className="space-y-2 mt-2">
            <div className="flex gap-4">
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {friendCount}
                </div>
                <div className="text-xs text-hive-text-secondary">Friends</div>
              </div>
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {connectionCount}
                </div>
                <div className="text-xs text-hive-text-secondary">Connections</div>
              </div>
            </div>
            {card.size === '2x2' && (friendCount > 0 || connectionCount > 0) && (
              <div className="mt-3">
                <div className="text-xs text-hive-text-secondary mb-2">Recently connected</div>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(5, friendCount + connectionCount))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-hive-accent/40 to-hive-accent/20 border-2 border-hive-background-primary" />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'active_now': {
        const allFriends = profile.connections?.friends || [];
        // Simulate online status - in production, use real-time presence
        const activeFriends = allFriends.filter((_, idx) => idx % 2 === 0);
        const isUserOnline = profile.presence?.isOnline || (profile as any).isOnline || false;

        return (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-hive-text-primary">
                {activeFriends.length}
              </div>
              {isUserOnline && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
            <div className="text-xs text-hive-text-secondary">Friends online now</div>
            {card.size !== '1x1' && activeFriends.length > 0 && (
              <div className="mt-2">
                <div className="flex -space-x-2">
                  {activeFriends.slice(0, 5).map((friend, i) => (
                    <div key={i} className="relative">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 border border-hive-background-primary" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-hive-background-primary" />
                    </div>
                  ))}
                  {activeFriends.length > 5 && (
                    <div className="w-6 h-6 rounded-full bg-hive-background-secondary border border-hive-background-primary flex items-center justify-center">
                      <span className="text-xs text-hive-text-secondary">+{activeFriends.length - 5}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'vibe_check': {
        const currentVibe = profile.presence?.vibe || '🚀 Building';
        const vibeOptions = ['🎯 Focused', '🚀 Building', '📚 Studying', '🤝 Connecting', '⚡ Energized', '😴 Resting'];

        return (
          <div className="space-y-2 mt-2">
            <div className="text-lg font-semibold text-hive-text-primary">
              {currentVibe}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Campus vibe • Tap to update
            </div>
            {card.size === '2x2' && (
              <div className="mt-3 grid grid-cols-2 gap-1">
                {vibeOptions.slice(0, 4).map((vibe, idx) => (
                  <button
                    key={idx}
                    className="text-xs p-2 rounded bg-hive-background-secondary hover:bg-hive-background-tertiary transition-colors"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'schedule_overlap': {
        const overlaps = profile.intelligence?.overlaps || [];
        const beaconActive = profile.presence?.beacon?.active || false;
        const beaconLocation = (profile.presence?.beacon as any)?.location || 'Campus';

        return (
          <div className="space-y-2 mt-2">
            <div className="text-sm text-hive-text-primary">
              {overlaps.length > 0 ? `${overlaps.length} overlaps today` : 'No overlaps today'}
            </div>
            {beaconActive ? (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Beacon at {beaconLocation}
              </div>
            ) : (
              <div className="text-xs text-hive-text-secondary">
                Enable beacon to find friends
              </div>
            )}
            {card.size !== '1x1' && overlaps.length > 0 && (
              <div className="mt-2 space-y-1">
                {overlaps.slice(0, 2).map((overlap, idx) => (
                  <div key={idx} className="text-xs text-hive-text-primary">
                    {(overlap as any).time || 'TBD'} • {(overlap as any).name || 'Event'}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'discovery': {
        const suggestions = profile.intelligence?.suggestions || [];
        const hasSuggestions = suggestions.length > 0;

        return (
          <div className="space-y-2 mt-2">
            <div className="text-sm text-hive-text-primary">
              {hasSuggestions ? `${suggestions.length} new suggestions` : 'Explore HIVE'}
            </div>
            <div className="text-xs text-hive-text-secondary">
              {hasSuggestions ? 'Based on your interests' : 'Discover spaces & tools'}
            </div>
            {card.size !== '1x1' && (
              <div className="mt-3">
                {hasSuggestions ? (
                  <div className="space-y-2">
                    {suggestions.slice(0, 2).map((sug, idx) => (
                      <div key={idx} className="p-2 bg-hive-background-secondary rounded">
                        <div className="text-xs font-medium text-hive-text-primary">{(sug as any).name || 'Suggestion'}</div>
                        <div className="text-xs text-hive-text-secondary">{(sug as any).reason || sug.reasons?.[0] || 'Recommended for you'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="w-full">
                    <Search size={12} className="mr-1" />
                    Discover
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      }

      case 'tools_created': {
        const toolsCount = (profile as any).stats?.toolsCreated || 0;
        return (
          <div className="space-y-2 mt-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {toolsCount}
            </div>
            <div className="text-xs text-hive-text-secondary">Tools created</div>
            {card.size !== '1x1' && (
              <div className="mt-3">
                <Button size="sm" variant="outline" className="w-full">
                  <Zap size={12} className="mr-1" />
                  Create Tool
                </Button>
              </div>
            )}
          </div>
        );
      }

      case 'rituals_active': {
        const activeRituals = (profile as any).stats?.activeRituals || 0;
        return (
          <div className="space-y-2 mt-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {activeRituals}
            </div>
            <div className="text-xs text-hive-text-secondary">Active rituals</div>
            {card.size !== '1x1' && (
              <div className="mt-2">
                <div className="text-xs text-hive-accent">Current streak: {(profile as any).stats?.currentStreak || 0} days</div>
              </div>
            )}
          </div>
        );
      }

      case 'reputation': {
        const reputation = (profile as any).stats?.reputation || 0;
        return (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-hive-text-primary">
                {reputation}
              </div>
              <TrendingUp size={14} className="text-green-400" />
            </div>
            <div className="text-xs text-hive-text-secondary">Reputation score</div>
            {card.size !== '1x1' && (
              <div className="mt-2">
                <div className="w-full bg-hive-background-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-hive-accent to-green-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${Math.min(100, reputation)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      }

      default:
        return (
          <div className="space-y-2 mt-2">
            <div className="text-sm text-hive-text-secondary">
              Widget coming soon
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={gridRef}
      className={`
        grid gap-4 p-4
        ${isMobile ? 'grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
        ${className}
      `}
    >
      {activeCards.filter(card => card.visible).map(renderCard)}

      {/* Edit mode controls */}
      {editable && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="default"
            size="sm"
            onClick={() => onLayoutChange?.(layout)}
            className="shadow-lg"
          >
            Save Layout
          </Button>
        </div>
      )}
    </div>
  );
};