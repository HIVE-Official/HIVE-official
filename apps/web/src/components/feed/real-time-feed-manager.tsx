'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, Timestamp, Query, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, RefreshCw, Settings, Filter, TrendingUp } from 'lucide-react';
import { Badge, Button } from '@hive/ui';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface FeedItem {
  id: string;
  type: 'post' | 'event' | 'ritual' | 'tool' | 'coordination';
  spaceId: string;
  spaceName: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: any;
  timestamp: Date;
  isNew?: boolean;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  metrics?: {
    views: number;
    reactions: number;
    comments: number;
    shares: number;
  };
}

interface RealTimeFeedManagerProps {
  userId: string;
  userSpaces: string[];
  onNewItems?: (count: number) => void;
  onItemClick?: (item: FeedItem) => void;
  filterSettings?: {
    types?: string[];
    spaces?: string[];
    priority?: string[];
    timeRange?: 'today' | 'week' | 'month' | 'all';
  };
  className?: string;
}

export function RealTimeFeedManager({
  userId,
  userSpaces,
  onNewItems,
  onItemClick,
  filterSettings = {},
  className = ''
}: RealTimeFeedManagerProps) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [newItemsCount, setNewItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const unsubscribers = useRef<(() => void)[]>([]);
  const seenItems = useRef<Set<string>>(new Set());

  // Setup real-time listeners for each space
  useEffect(() => {
    if (!userSpaces.length) return;

    const setupListeners = async () => {
      setLoading(true);

      // Clear existing listeners
      unsubscribers.current.forEach(unsub => unsub());
      unsubscribers.current = [];

      // Create queries for each type of content
      const queries: { query: Query<DocumentData>; type: string }[] = [];

      userSpaces.forEach(spaceId => {
        // Posts query
        const postsQuery = query(
          collection(db, 'spaces', spaceId, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        queries.push({ query: postsQuery, type: 'post' });

        // Events query
        const eventsQuery = query(
          collection(db, 'spaces', spaceId, 'events'),
          where('startDate', '>=', Timestamp.now()),
          orderBy('startDate', 'asc'),
          limit(5)
        );
        queries.push({ query: eventsQuery, type: 'event' });

        // Rituals query
        const ritualsQuery = query(
          collection(db, 'spaces', spaceId, 'rituals'),
          where('isActive', '==', true),
          orderBy('nextOccurrence', 'asc'),
          limit(3)
        );
        queries.push({ query: ritualsQuery, type: 'ritual' });
      });

      // Setup listeners for each query
      queries.forEach(({ query: q, type }) => {
        const unsubscribe = onSnapshot(q, (snapshot: any) => {
          const newItems: FeedItem[] = [];
          let hasNewItems = false;

          snapshot.docChanges().forEach((change: any) => {
            if (change.type === 'added' || change.type === 'modified') {
              const data = change.doc.data();
              const itemId = `${type}-${change.doc.id}`;
              
              // Check if this is a new item
              if (!seenItems.current.has(itemId)) {
                hasNewItems = true;
                seenItems.current.add(itemId);
              }

              const item: FeedItem = {
                id: itemId,
                type: type as FeedItem['type'],
                spaceId: data.spaceId || '',
                spaceName: data.spaceName || 'Unknown Space',
                authorId: data.authorId || data.createdBy || '',
                authorName: data.authorName || 'Anonymous',
                authorAvatar: data.authorAvatar,
                content: data,
                timestamp: data.createdAt?.toDate() || new Date(),
                isNew: !seenItems.current.has(itemId),
                priority: determinePriority(type, data),
                metrics: data.metrics
              };

              // Apply filters
              if (shouldIncludeItem(item, filterSettings)) {
                newItems.push(item);
              }
            }
          });

          if (newItems.length > 0) {
            setFeedItems(prev => {
              // Merge new items with existing, avoiding duplicates
              const merged = [...newItems, ...prev];
              const unique = Array.from(
                new Map(merged.map(item => [item.id, item])).values()
              );
              
              // Sort by priority and timestamp
              return unique.sort((a, b) => {
                const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
                const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                if (priorityDiff !== 0) return priorityDiff;
                return b.timestamp.getTime() - a.timestamp.getTime();
              }).slice(0, 50); // Keep only top 50 items
            });

            if (hasNewItems && autoRefresh) {
              setNewItemsCount(prev => prev + newItems.length);
              onNewItems?.(newItems.length);
            }
          }
        });

        unsubscribers.current.push(unsubscribe);
      });

      setLoading(false);
      setLastRefresh(new Date());
    };

    setupListeners();

    return () => {
      unsubscribers.current.forEach(unsub => unsub());
      unsubscribers.current = [];
    };
  }, [userSpaces, filterSettings, autoRefresh]);

  // Determine priority based on content type and data
  const determinePriority = (type: string, data: any): FeedItem['priority'] => {
    // Urgent: Coordinations happening soon, emergency announcements
    if (type === 'coordination' && data.startTime) {
      const startTime = data.startTime?.toDate ? startTime.toDate() : new Date(startTime);
      const hoursUntil = (startTime.getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursUntil < 2) return 'urgent';
    }

    // High: Events today, trending posts, active rituals
    if (type === 'event' && data.startDate) {
      const eventDate = data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate);
      const isToday = new Date().toDateString() === eventDate.toDateString();
      if (isToday) return 'high';
    }

    if (type === 'post' && data.metrics?.engagement > 50) return 'high';
    if (type === 'ritual' && data.participantCount > 20) return 'high';

    // Normal: Regular posts and activities
    return 'normal';
  };

  // Filter items based on settings
  const shouldIncludeItem = (item: FeedItem, filters: typeof filterSettings): boolean => {
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(item.type)) return false;
    }

    if (filters.spaces && filters.spaces.length > 0) {
      if (!filters.spaces.includes(item.spaceId)) return false;
    }

    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(item.priority)) return false;
    }

    if (filters.timeRange && filters.timeRange !== 'all') {
      const now = Date.now();
      const itemTime = item.timestamp.getTime();
      const dayMs = 24 * 60 * 60 * 1000;

      switch (filters.timeRange) {
        case 'today':
          if (now - itemTime > dayMs) return false;
          break;
        case 'week':
          if (now - itemTime > 7 * dayMs) return false;
          break;
        case 'month':
          if (now - itemTime > 30 * dayMs) return false;
          break;
      }
    }

    return true;
  };

  // Manual refresh
  const handleRefresh = useCallback(() => {
    setNewItemsCount(0);
    setLastRefresh(new Date());
    // Trigger re-render by toggling autoRefresh
    setAutoRefresh(false);
    setTimeout(() => setAutoRefresh(true), 100);
  }, []);

  // Get priority color
  const getPriorityColor = (priority: FeedItem['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'normal': return 'text-blue-400 bg-blue-400/10';
      case 'low': return 'text-neutral-400 bg-neutral-400/10';
    }
  };

  // Get type icon
  const getTypeIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'coordination': return '🤝';
      case 'event': return '📅';
      case 'ritual': return '🔄';
      case 'tool': return '🛠️';
      default: return '📝';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            {newItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {newItemsCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--hive-text-inverse)]">
              Real-Time Feed
            </h3>
            <p className="text-xs text-neutral-400">
              Last updated {formatDistanceToNow(lastRefresh, { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="text-neutral-400 hover:text-[var(--hive-text-inverse)]"
          >
            <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(
              'text-neutral-400 hover:text-[var(--hive-text-inverse)]',
              autoRefresh && 'text-green-400'
            )}
          >
            <Zap className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* New Items Alert */}
      <AnimatePresence>
        {newItemsCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[var(--hive-brand-secondary)]/20 border border-[var(--hive-brand-secondary)]/30 rounded-lg p-3 cursor-pointer"
            onClick={handleRefresh}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--hive-brand-secondary)]">
                {newItemsCount} new {newItemsCount === 1 ? 'item' : 'items'} available
              </span>
              <TrendingUp className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Items */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : feedItems.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No feed items yet</p>
          <p className="text-sm text-neutral-500 mt-1">
            Join more spaces to see activity
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {feedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ x: 4 }}
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'p-4 bg-white/[0.02] border rounded-lg cursor-pointer transition-all',
                  item.isNew ? 'border-[var(--hive-brand-secondary)]/30' : 'border-white/10',
                  'hover:bg-white/[0.05]'
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={cn('text-xs', getPriorityColor(item.priority))}>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-neutral-400">
                        {item.spaceName}
                      </span>
                      {item.isNew && (
                        <Badge className="bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] text-xs">
                          New
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-medium text-[var(--hive-text-inverse)] mb-1 line-clamp-1">
                      {item.content.title || item.content.text || 'Untitled'}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <span>{item.authorName}</span>
                      <span>{formatDistanceToNow(item.timestamp, { addSuffix: true })}</span>
                      {item.metrics && (
                        <>
                          <span>{item.metrics.reactions} reactions</span>
                          <span>{item.metrics.comments} comments</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}