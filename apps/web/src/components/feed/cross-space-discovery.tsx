'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  TrendingUp,
  Users,
  Hash,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Filter,
  ChevronRight,
  Eye,
  UserPlus,
  Calendar,
  MapPin,
  Zap,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface DiscoverableContent {
  id: string;
  type: 'post' | 'event' | 'space' | 'ritual' | 'tool';
  title: string;
  description?: string;
  spaceName: string;
  spaceId: string;
  spaceType: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metrics: {
    views: number;
    engagement: number;
    participants?: number;
    crossSpaceReach: number;
  };
  tags: string[];
  timestamp: Date;
  featured?: boolean;
  trending?: boolean;
  mediaUrl?: string;
  eventDate?: Date;
  location?: string;
}

interface CrossSpaceDiscoveryProps {
  userId: string;
  currentSpaceId?: string;
  onItemClick?: (item: DiscoverableContent) => void;
  className?: string;
}

const DISCOVERY_CATEGORIES = [
  { id: 'trending', label: 'Trending Now', icon: TrendingUp, color: 'text-green-400' },
  { id: 'nearby', label: 'Nearby Spaces', icon: MapPin, color: 'text-blue-400' },
  { id: 'similar', label: 'Similar Interests', icon: Sparkles, color: 'text-purple-400' },
  { id: 'events', label: 'Upcoming Events', icon: Calendar, color: 'text-orange-400' },
  { id: 'new', label: 'New & Rising', icon: Zap, color: 'text-yellow-400' }
];

export function CrossSpaceDiscovery({
  userId,
  currentSpaceId,
  onItemClick,
  className = ''
}: CrossSpaceDiscoveryProps) {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [discoverableContent, setDiscoverableContent] = useState<DiscoverableContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedView, setExpandedView] = useState(false);

  useEffect(() => {
    fetchDiscoverableContent();
  }, [selectedCategory, currentSpaceId]);

  const fetchDiscoverableContent = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory,
        excludeSpace: currentSpaceId || '',
        limit: expandedView ? '20' : '6'
      });

      const response = await authenticatedFetch(`/api/discovery?${params}`);
      const data = await response.json();
      
      setDiscoverableContent(data.content || getMockDiscoverableContent());
    } catch (error) {
      logger.error('Error fetching discoverable content:', { error: String(error) });
      setDiscoverableContent(getMockDiscoverableContent());
    } finally {
      setLoading(false);
    }
  };

  const getMockDiscoverableContent = (): DiscoverableContent[] => [
    {
      id: '1',
      type: 'event',
      title: 'Campus Hackathon 2024',
      description: 'Build something amazing in 48 hours',
      spaceName: 'Engineering Hub',
      spaceId: 'eng-hub',
      spaceType: 'academic',
      metrics: {
        views: 2341,
        engagement: 89,
        participants: 156,
        crossSpaceReach: 12
      },
      tags: ['hackathon', 'coding', 'prizes'],
      timestamp: new Date(),
      trending: true,
      eventDate: new Date(Date.now() + 86400000 * 7),
      location: 'Student Union'
    },
    {
      id: '2',
      type: 'post',
      title: 'Study Group for Finals Week',
      description: 'Looking for people to study CS220 together',
      spaceName: 'Computer Science',
      spaceId: 'cs-dept',
      spaceType: 'academic',
      author: {
        id: 'user1',
        name: 'Alex Chen',
        avatar: undefined
      },
      metrics: {
        views: 567,
        engagement: 34,
        crossSpaceReach: 3
      },
      tags: ['study', 'cs220', 'finals'],
      timestamp: new Date(Date.now() - 3600000),
      featured: true
    },
    {
      id: '3',
      type: 'space',
      title: 'Midnight Food Runs',
      description: 'Coordinating late-night food adventures',
      spaceName: 'Midnight Food Runs',
      spaceId: 'food-runs',
      spaceType: 'social',
      metrics: {
        views: 892,
        engagement: 156,
        participants: 234,
        crossSpaceReach: 8
      },
      tags: ['food', 'social', 'late-night'],
      timestamp: new Date(Date.now() - 7200000),
      trending: true
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'space': return Hash;
      case 'ritual': return Sparkles;
      case 'tool': return Zap;
      default: return MessageCircle;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case 'event': return 'text-orange-400 bg-orange-400/10';
      case 'space': return 'text-blue-400 bg-blue-400/10';
      case 'ritual': return 'text-purple-400 bg-purple-400/10';
      case 'tool': return 'text-green-400 bg-green-400/10';
      default: return 'text-neutral-400 bg-white/10';
    }
  };

  const renderContentCard = (item: DiscoverableContent) => {
    const ContentIcon = getContentIcon(item.type);
    const contentColor = getContentColor(item.type);

    return (
      <motion.div
        key={item.id}
        whileHover={{ y: -2 }}
        onClick={() => onItemClick?.(item)}
        className="bg-white/[0.02] border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/[0.05] transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn('p-2 rounded-lg', contentColor)}>
              <ContentIcon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 capitalize">
                {item.type}
              </span>
              {item.trending && (
                <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">
                  Trending
                </Badge>
              )}
              {item.featured && (
                <Badge className="ml-2 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </div>

        <h4 className="font-medium text-[var(--hive-text-inverse)] mb-1 line-clamp-1">
          {item.title}
        </h4>
        
        {item.description && (
          <p className="text-sm text-neutral-300 mb-2 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Hash className="h-3 w-3" />
              {item.spaceName}
            </span>
            {item.author && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {item.author.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs">
          <span className="flex items-center gap-1 text-neutral-400">
            <Eye className="h-3 w-3" />
            {item.metrics.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Heart className="h-3 w-3" />
            {item.metrics.engagement}
          </span>
          {item.metrics.participants && (
            <span className="flex items-center gap-1 text-neutral-400">
              <Users className="h-3 w-3" />
              {item.metrics.participants}
            </span>
          )}
          <span className="flex items-center gap-1 text-blue-400">
            <Globe className="h-3 w-3" />
            {item.metrics.crossSpaceReach} spaces
          </span>
        </div>

        {item.eventDate && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">
                {formatDistanceToNow(item.eventDate, { addSuffix: true })}
              </span>
              {item.location && (
                <span className="flex items-center gap-1 text-neutral-300">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
              )}
            </div>
          </div>
        )}

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/10 text-xs text-neutral-300 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          <h3 className="font-semibold text-[var(--hive-text-inverse)]">
            Discover Across Campus
          </h3>
        </div>

        <button
          onClick={() => setExpandedView(!expandedView)}
          className="text-sm text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors"
        >
          {expandedView ? 'Show Less' : 'See All'}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DISCOVERY_CATEGORIES.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all text-sm',
                selectedCategory === category.id
                  ? 'bg-white/10 border-white/20 text-[var(--hive-text-inverse)]'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', category.color)} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : discoverableContent.length === 0 ? (
        <div className="text-center py-8">
          <Compass className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No content found in this category</p>
          <p className="text-sm text-neutral-500 mt-1">
            Try exploring other categories or check back later
          </p>
        </div>
      ) : (
        <div className={cn(
          'grid gap-4',
          expandedView 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          <AnimatePresence>
            {discoverableContent.map(item => renderContentCard(item))}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Actions */}
      {!expandedView && discoverableContent.length > 0 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
            onClick={() => setExpandedView(true)}
          >
            <Compass className="h-4 w-4 mr-2" />
            Explore More
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      )}
    </div>
  );
}