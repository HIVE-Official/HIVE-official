"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Eye,
  Star,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Share2,
  BarChart3,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { EventManagerTool } from '../tools/event-manager-tool';
import { type Space } from '@hive/core';

export interface EventManagerWidgetProps {
  space: Space;
  isLeader?: boolean;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
  leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
  showCompact?: boolean;
  maxEvents?: number;
  onEventAction?: (eventId: string, action: string, data?: any) => void;
  authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
  className?: string;
}

export function EventManagerWidget({
  space,
  isLeader = false,
  currentUserRole = 'member',
  leaderMode,
  showCompact = false,
  maxEvents = 6,
  onEventAction,
  authenticatedFetch,
  className
}: EventManagerWidgetProps) {
  const [showFullManager, setShowFullManager] = useState(false);
  const [quickViewMode, setQuickViewMode] = useState<'upcoming' | 'popular' | 'recent'>('upcoming');

  // Mock event data for preview
  const previewEvents = [
    {
      id: '1',
      title: 'CS Study Group - Data Structures',
      description: 'Weekly study session covering binary trees, heaps, and graph algorithms.',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      location: 'Library Study Room 304',
      isVirtual: false,
      currentAttendees: 8,
      maxCapacity: 12,
      status: 'published' as const,
      tags: ['study', 'computer-science'],
      analytics: {
        views: 45,
        clicks: 12,
        conversationRate: 0.67
      }
    },
    {
      id: '2',
      title: 'Virtual Career Fair - Tech Industry',
      description: 'Connect with top tech companies recruiting for internships and full-time positions.',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Zoom Meeting',
      isVirtual: true,
      currentAttendees: 156,
      maxCapacity: 200,
      status: 'published' as const,
      tags: ['career', 'networking'],
      analytics: {
        views: 234,
        clicks: 87,
        conversationRate: 0.82
      }
    },
    {
      id: '3',
      title: 'End of Semester Social',
      description: 'Celebrate the end of finals with food, games, and networking.',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: 'Student Union Ballroom',
      isVirtual: false,
      currentAttendees: 73,
      maxCapacity: 150,
      status: 'draft' as const,
      tags: ['social', 'networking'],
      analytics: {
        views: 12,
        clicks: 4,
        conversationRate: 0.33
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/20 text-gray-400';
      case 'published': return 'bg-green-500/20 text-green-400';
      case 'ongoing': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-purple-500/20 text-purple-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getCapacityColor = (current: number, max?: number) => {
    if (!max) return 'text-gray-400';
    const percentage = current / max;
    if (percentage >= 0.9) return 'text-red-400';
    if (percentage >= 0.7) return 'text-yellow-400';
    return 'text-green-400';
  };

  const filteredEvents = previewEvents
    .filter(event => {
      switch (quickViewMode) {
        case 'upcoming':
          return event.status === 'published' && new Date(event.startDate) > new Date();
        case 'popular':
          return event.analytics.views > 50;
        case 'recent':
          return true; // Show all for recent
        default:
          return true;
      }
    })
    .slice(0, maxEvents);

  if (showCompact) {
    return (
      <div className={cn("space-y-3", className)}>
        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#FFD700]" />
            <span className="text-sm font-medium text-[var(--hive-text-inverse)]">Events</span>
            <Badge variant="secondary" className="text-xs">
              {previewEvents.length}
            </Badge>
          </div>
          <ButtonEnhanced
            variant="ghost"
            size="sm"
            onClick={() => setShowFullManager(true)}
            className="text-xs text-neutral-400 hover:text-[var(--hive-text-inverse)]"
          >
            View All
          </ButtonEnhanced>
        </div>

        {/* Quick View Mode Selector */}
        <div className="flex gap-1">
          {(['upcoming', 'popular', 'recent'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setQuickViewMode(mode)}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors capitalize",
                quickViewMode === mode
                  ? "bg-[#FFD700]/20 text-[#FFD700]"
                  : "text-neutral-400 hover:text-[var(--hive-text-inverse)] hover:bg-white/5"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Compact Event List */}
        <div className="space-y-2">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
              onClick={() => setShowFullManager(true)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[var(--hive-text-inverse)] truncate">{event.title}</span>
                  {event.isVirtual && (
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                      Virtual
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span>{formatDate(event.startDate)}</span>
                  <span>•</span>
                  <span className={getCapacityColor(event.currentAttendees, event.maxCapacity)}>
                    {event.currentAttendees}{event.maxCapacity && `/${event.maxCapacity}`}
                  </span>
                </div>
              </div>

              <div className={cn("px-2 py-1 rounded-full text-xs capitalize", getStatusColor(event.status))}>
                {event.status}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-4 text-neutral-400 text-sm">
            No {quickViewMode} events
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Full Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-[#FFD700]" />
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Event Manager</h3>
          <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
            {previewEvents.length} events
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {isLeader && (
            <>
              <ButtonEnhanced
                variant="secondary"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create
              </ButtonEnhanced>
              <ButtonEnhanced
                variant="secondary"
                size="sm"
                className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </ButtonEnhanced>
            </>
          )}
          <ButtonEnhanced
            variant="secondary"
            size="sm"
            onClick={() => setShowFullManager(true)}
            className="border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10"
          >
            <Eye className="h-4 w-4 mr-1" />
            Manage All
          </ButtonEnhanced>
        </div>
      </div>

      {/* Event Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-green-400">
            {previewEvents.filter(e => e.status === 'published').length}
          </div>
          <div className="text-xs text-neutral-400">Published</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-blue-400">
            {previewEvents.reduce((sum, e) => sum + e.currentAttendees, 0)}
          </div>
          <div className="text-xs text-neutral-400">Total RSVPs</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-purple-400">
            {previewEvents.filter(e => e.status === 'draft').length}
          </div>
          <div className="text-xs text-neutral-400">Drafts</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-yellow-400">
            {Math.round(previewEvents.reduce((sum, e) => sum + (e.analytics?.conversationRate || 0), 0) / previewEvents.length * 100)}%
          </div>
          <div className="text-xs text-neutral-400">Avg Conversion</div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-400">Quick view:</span>
        {(['upcoming', 'popular', 'recent'] as const).map((mode) => (
          <ButtonEnhanced
            key={mode}
            variant={quickViewMode === mode ? "primary" : "secondary"}
            size="sm"
            onClick={() => setQuickViewMode(mode)}
            className={cn(
              "text-xs capitalize",
              quickViewMode === mode && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"
            )}
          >
            {mode === 'upcoming' && <Calendar className="h-3 w-3 mr-1" />}
            {mode === 'popular' && <TrendingUp className="h-3 w-3 mr-1" />}
            {mode === 'recent' && <Activity className="h-3 w-3 mr-1" />}
            {mode}
          </ButtonEnhanced>
        ))}
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer"
            onClick={() => setShowFullManager(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-[var(--hive-text-inverse)] truncate">{event.title}</h4>
                  {event.isVirtual && (
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                      Virtual
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                  {event.description}
                </p>
              </div>
              <div className={cn("px-2 py-1 rounded-full text-xs capitalize ml-2", getStatusColor(event.status))}>
                {event.status}
              </div>
            </div>

            <div className="space-y-2 mb-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span className={getCapacityColor(event.currentAttendees, event.maxCapacity)}>
                  {event.currentAttendees}{event.maxCapacity && `/${event.maxCapacity}`} attending
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {event.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-purple-500/20 text-purple-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Analytics (Insights Mode) */}
            {leaderMode === 'insights' && event.analytics && (
              <motion.div
                className="mb-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-blue-400">{event.analytics.views}</div>
                    <div className="text-xs text-neutral-400">Views</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-400">{event.analytics.clicks}</div>
                    <div className="text-xs text-neutral-400">Clicks</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-purple-400">{Math.round(event.analytics.conversationRate * 100)}%</div>
                    <div className="text-xs text-neutral-400">Conv.</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {event.status === 'published' && (
                  <ButtonEnhanced
                    variant="secondary"
                    size="sm"
                    className="text-xs border-green-500/30 text-green-400 hover:bg-green-500/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventAction?.(event.id, 'rsvp');
                    }}
                  >
                    <UserCheck className="h-3 w-3 mr-1" />
                    RSVP
                  </ButtonEnhanced>
                )}
              </div>

              <div className="flex items-center gap-1">
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventAction?.(event.id, 'share');
                  }}
                >
                  <Share2 className="h-3 w-3" />
                </ButtonEnhanced>
                {isLeader && (
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventAction?.(event.id, 'analytics');
                    }}
                  >
                    <BarChart3 className="h-3 w-3" />
                  </ButtonEnhanced>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Event Manager Modal */}
      <AnimatePresence>
        {showFullManager && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullManager(false)}
          >
            <motion.div
              className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-[#FFD700]" />
                  <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">Event Manager</h2>
                  <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    {space.name}
                  </Badge>
                </div>
                
                <ButtonEnhanced
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowFullManager(false)}
                  className="border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10"
                >
                  ✕
                </ButtonEnhanced>
              </div>

              {/* Full Event Manager Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <EventManagerTool
                  spaceId={space.id}
                  spaceName={space.name}
                  isLeader={isLeader}
                  currentUserRole={currentUserRole}
                  leaderMode={leaderMode}
                  onEventAction={onEventAction}
                  authenticatedFetch={authenticatedFetch}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}