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
    const config = cardConfigs[card.type] || {};
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
    switch (card.type) {
      case 'spaces_hub':
        return (
          <div className="space-y-2 mt-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {profile.connections.connections.length}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Active in {profile.connections.connections.filter(c => c.sharedSpaces.length > 0).length} spaces
            </div>
            {card.size !== '1x1' && (
              <div className="mt-3 space-y-1">
                {/* Mini space list for larger cards */}
                <div className="text-xs text-hive-text-secondary">Recent activity</div>
              </div>
            )}
          </div>
        );

      case 'friends_network':
        return (
          <div className="space-y-2 mt-2">
            <div className="flex gap-4">
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {profile.connections.friends.length}
                </div>
                <div className="text-xs text-hive-text-secondary">Friends</div>
              </div>
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {profile.connections.connections.length}
                </div>
                <div className="text-xs text-hive-text-secondary">Connections</div>
              </div>
            </div>
          </div>
        );

      case 'active_now':
        const activeFriends = profile.connections.friends.filter(f =>
          // In real app, check real-time presence
          Math.random() > 0.5
        );
        return (
          <div className="space-y-2 mt-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {activeFriends.length}
            </div>
            <div className="text-xs text-hive-text-secondary">Friends online</div>
            {card.size !== '1x1' && (
              <div className="flex -space-x-2 mt-2">
                {/* Avatar stack for larger cards */}
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-hive-accent/20 border border-hive-background-primary" />
                ))}
              </div>
            )}
          </div>
        );

      case 'vibe_check':
        return (
          <div className="space-y-2 mt-2">
            <div className="text-lg font-semibold text-hive-text-primary">
              {profile.presence.vibe}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Tap to update your vibe
            </div>
          </div>
        );

      case 'schedule_overlap':
        return (
          <div className="space-y-2 mt-2">
            <div className="text-sm text-hive-text-primary">
              {profile.intelligence.overlaps.length} overlaps today
            </div>
            {profile.presence.beacon?.active && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Beacon active
              </div>
            )}
          </div>
        );

      case 'discovery':
        return (
          <div className="space-y-2 mt-2">
            <div className="text-sm text-hive-text-primary">
              {profile.intelligence.suggestions.length} new suggestions
            </div>
            <div className="text-xs text-hive-text-secondary">
              Based on your interests
            </div>
          </div>
        );

      default:
        return null;
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