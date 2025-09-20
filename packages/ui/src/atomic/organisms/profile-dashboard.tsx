'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  Loader2
} from 'lucide-react';

// Import our sophisticated molecules
import { CampusIdentityHeader } from '../molecules/campus-identity-header';
import { CampusSpacesCard } from '../molecules/campus-spaces-card';
import { CampusActivityFeed } from '../molecules/campus-activity-feed';
import { CampusBuilderTools } from '../molecules/campus-builder-tools';

// Types from our molecules
import type { CampusIdentityHeaderProps } from '../molecules/campus-identity-header';
import type { CampusSpacesCardProps } from '../molecules/campus-spaces-card';
import type { CampusActivityFeedProps } from '../molecules/campus-activity-feed';
import type { CampusBuilderToolsProps } from '../molecules/campus-builder-tools';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  status: 'confirmed' | 'tentative' | 'cancelled'
}

interface CalendarConflict {
  id: string;
  type: 'overlap' | 'double_booking' | 'travel_time';
  severity: 'high' | 'medium' | 'low';
  eventIds: string[];
  description: string;
  suggestion: string
}

export interface ProfileDashboardProps {
  // Profile data
  user: CampusIdentityHeaderProps['user'];
  
  // Spaces data
  spaces: CampusSpacesCardProps['spaces'];
  
  // Activity data
  activities: CampusActivityFeedProps['activities'];
  
  // Builder tools data
  availableTools: CampusBuilderToolsProps['availableTools'];
  createdTools: CampusBuilderToolsProps['createdTools'];
  
  // Calendar data
  calendarEvents?: CalendarEvent[];
  calendarConflicts?: CalendarConflict[];
  
  // Layout configuration
  layout?: 'desktop' | 'tablet' | 'mobile';
  variant?: 'default' | 'compact' | 'focused';
  showBuilder?: boolean;
  showCalendar?: boolean;
  
  // Loading states
  isLoading?: {
    profile?: boolean;
    spaces?: boolean;
    activities?: boolean;
    tools?: boolean;
    calendar?: boolean
  };
  
  // Interactive callbacks
  onAvatarClick?: () => void;
  onEditProfile?: () => void;
  onSpaceClick?: (spaceId: string) => void;
  onActivityClick?: (activityId: string) => void;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: (toolType: string) => void;
  onBecomeBuilder?: () => void;
  onJoinSpace?: () => void;
  onViewAllSpaces?: () => void;
  onViewAllActivities?: () => void;
  
  // Space management callbacks
  onMuteSpace?: (spaceId: string, muted: boolean) => void;
  onPinSpace?: (spaceId: string, pinned: boolean) => void;
  onLeaveSpace?: (spaceId: string) => void;
  onQuickPost?: (spaceId: string, message: string) => void;
  onJoinToolsWaitlist?: () => void;
  
  // Calendar callbacks
  onCreateEvent?: (event: Partial<CalendarEvent>) => void;
  onUpdateEvent?: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent?: (id: string) => void;
  onResolveConflict?: (conflictId: string, resolution: string, eventId?: string) => void;
  
  className?: string
}

// Interactive Calendar Widget Component
const InteractiveCalendarWidget: React.FC<{
  events: CalendarEvent[];
  conflicts: CalendarConflict[];
  isLoading?: boolean;
  onCreateEvent?: (event: Partial<CalendarEvent>) => void;
  onUpdateEvent?: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent?: (id: string) => void;
  onResolveConflict?: (conflictId: string, resolution: string, eventId?: string) => void
}> = ({
  events,
  conflicts,
  isLoading = false,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onResolveConflict
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<{
    title: string;
    startDate: string;
    endDate: string;
    type: CalendarEvent['type'];
    location: string
  }>({
    title: '',
    startDate: '',
    endDate: '',
    type: 'personal',
    location: ''
  });

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'study': return 'bg-green-500';
      case 'meeting': return 'bg-purple-500';
      case 'personal': return 'bg-orange-500';
      default: return 'bg-gray-500'
    }
  };

  const handleCreateEvent = () => {
    if (!createForm.title || !createForm.startDate || !createForm.endDate) return;

    onCreateEvent?.({
      title: createForm.title,
      startDate: new Date(createForm.startDate).toISOString(),
      endDate: new Date(createForm.endDate).toISOString(),
      type: createForm.type,
      location: createForm.location
    });

    setCreateForm({
      title: '',
      startDate: '',
      endDate: '',
      type: 'personal',
      location: ''
    });
    setShowCreateForm(false)
  };

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div className="bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-hive-text-primary flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Calendar</span>
        </h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="p-2 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-tertiary rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-yellow-600">
              {conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} detected
            </span>
          </div>
          {conflicts.slice(0, 2).map(conflict => (
            <div key={conflict.id} className="mt-2 text-xs text-yellow-600">
              <p>{conflict.description}</p>
              <div className="flex space-x-2 mt-1">
                <button
                  onClick={() => onResolveConflict?.(conflict.id, 'reschedule', conflict.eventIds[0])}
                  className="px-2 py-1 bg-yellow-500/20 rounded text-yellow-700 hover:bg-yellow-500/30"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => onResolveConflict?.(conflict.id, 'ignore')}
                  className="px-2 py-1 bg-gray-500/20 rounded text-gray-600 hover:bg-gray-500/30"
                >
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="mb-4 p-4 bg-hive-background-tertiary rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Event title"
            value={createForm.title}
            onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="datetime-local"
              value={createForm.startDate}
              onChange={(e) => setCreateForm(prev => ({ ...prev, startDate: e.target.value }))}
              className="px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm"
            />
            <input
              type="datetime-local"
              value={createForm.endDate}
              onChange={(e) => setCreateForm(prev => ({ ...prev, endDate: e.target.value }))}
              className="px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={createForm.type}
              onChange={(e) => setCreateForm(prev => ({ ...prev, type: e.target.value as CalendarEvent['type'] }))}
              className="px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm"
            >
              <option value="personal">Personal</option>
              <option value="class">Class</option>
              <option value="study">Study</option>
              <option value="meeting">Meeting</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={createForm.location}
              onChange={(e) => setCreateForm(prev => ({ ...prev, location: e.target.value }))}
              className="px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleCreateEvent}
              className="flex-1 px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm font-medium"
            >
              Create Event
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-3 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:bg-hive-interactive-hover transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-hive-text-secondary" />
        </div>
      ) : upcomingEvents.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-hive-text-secondary mx-auto mb-3" />
          <p className="text-hive-text-secondary text-sm mb-3">No upcoming events</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm font-medium"
          >
            Add Your First Event
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg hover:bg-hive-interactive-hover transition-colors group"
            >
              <div className={`w-3 h-8 ${getEventTypeColor(event.type)} rounded`} />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-hive-text-primary text-sm truncate">
                  {event.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-hive-text-secondary">
                  <span>{formatDate(event.startDate)}</span>
                  <span>•</span>
                  <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                  {event.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button
                  onClick={() => onUpdateEvent?.(event.id, { status: event.status === 'confirmed' ? 'cancelled' : 'confirmed' }}
                  className="p-1 text-hive-text-secondary hover:text-hive-text-primary transition-colors"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  onClick={() => onDeleteEvent?.(event.id)}
                  className="p-1 text-hive-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  user,
  spaces,
  activities,
  availableTools,
  createdTools,
  calendarEvents = [],
  calendarConflicts = [],
  layout = 'desktop',
  showBuilder = true,
  showCalendar = true,
  isLoading = {},
  onAvatarClick,
  onEditProfile,
  onSpaceClick,
  onActivityClick,
  onToolClick,
  onCreateTool,
  onBecomeBuilder,
  onJoinSpace,
  onViewAllSpaces,
  onViewAllActivities,
  onMuteSpace,
  onPinSpace,
  onLeaveSpace,
  onQuickPost,
  onJoinToolsWaitlist,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onResolveConflict,
  className
}) => {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  const handleSectionLoad = (section: string) => {
    setLoadedSections(prev => new Set([...prev, section]))
  };

  // Desktop BentoGrid Layout
  const DesktopLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area - 3 columns */}
      <div className="lg:col-span-3 space-y-6">
        {/* Campus Identity Header - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('identity')}
        >
          <CampusIdentityHeader
            user={user}
            showStatus={true}
            onAvatarClick={onAvatarClick}
            onEditClick={onEditProfile}
          />
        </motion.div>

        {/* Campus Activity Feed - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('activity')}
        >
          <CampusActivityFeed
            activities={activities}
            isLoading={isLoading.activities}
            maxItems={6}
            onActivityClick={onActivityClick}
            onViewAll={onViewAllActivities}
          />
        </motion.div>
      </div>

      {/* Sidebar - 1 column */}
      <div className="lg:col-span-1 space-y-6">
        {/* Campus Spaces */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('spaces')}
        >
          <CampusSpacesCard
            spaces={spaces}
            isLoading={isLoading.spaces}
            onSpaceClick={onSpaceClick}
            onJoinSpace={onJoinSpace}
            onViewAll={onViewAllSpaces}
            onMuteSpace={onMuteSpace}
            onPinSpace={onPinSpace}
            onLeaveSpace={onLeaveSpace}
            onQuickPost={onQuickPost}
          />
        </motion.div>

        {/* Interactive Calendar Widget */}
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => handleSectionLoad('calendar')}
          >
            <InteractiveCalendarWidget
              events={calendarEvents}
              conflicts={calendarConflicts}
              isLoading={isLoading.calendar}
              onCreateEvent={onCreateEvent}
              onUpdateEvent={onUpdateEvent}
              onDeleteEvent={onDeleteEvent}
              onResolveConflict={onResolveConflict}
            />
          </motion.div>
        )}

        {/* Builder Tools - Subtle Sidebar Treatment */}
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => handleSectionLoad('tools')}
          >
            <CampusBuilderTools
              availableTools={availableTools}
              createdTools={createdTools}
              isBuilder={user?.isBuilder ?? false}
              isLoading={isLoading.tools}
              isLocked={true}
              onToolClick={onToolClick}
              onCreateTool={onCreateTool}
              onBecomeBuilder={onBecomeBuilder}
              onJoinWaitlist={onJoinToolsWaitlist}
            />
          </motion.div>
        )}
      </div>
    </div>
  );

  // Tablet Layout - 2 Column
  const TabletLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Campus Identity Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusIdentityHeader
            user={user}
            variant="compact"
            showStatus={true}
            onAvatarClick={onAvatarClick}
            onEditClick={onEditProfile}
          />
        </motion.div>

        {/* Campus Spaces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusSpacesCard
            spaces={spaces}
            isLoading={isLoading.spaces}
            onSpaceClick={onSpaceClick}
            onJoinSpace={onJoinSpace}
            onViewAll={onViewAllSpaces}
            onMuteSpace={onMuteSpace}
            onPinSpace={onPinSpace}
            onLeaveSpace={onLeaveSpace}
            onQuickPost={onQuickPost}
          />
        </motion.div>

        {/* Builder Tools */}
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <CampusBuilderTools
              availableTools={availableTools}
              createdTools={createdTools}
              isBuilder={user?.isBuilder ?? false}
              isLoading={isLoading.tools}
              variant="compact"
              isLocked={true}
              onToolClick={onToolClick}
              onCreateTool={onCreateTool}
              onBecomeBuilder={onBecomeBuilder}
              onJoinWaitlist={onJoinToolsWaitlist}
            />
          </motion.div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Campus Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusActivityFeed
            activities={activities}
            isLoading={isLoading.activities}
            variant="compact"
            maxItems={8}
            onActivityClick={onActivityClick}
            onViewAll={onViewAllActivities}
          />
        </motion.div>
      </div>
    </div>
  );

  // Mobile Layout - Single Column Stack
  const MobileLayout = () => (
    <div className="space-y-6">
      {/* Campus Identity Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusIdentityHeader
          user={user}
          variant="compact"
          showStatus={true}
          onAvatarClick={onAvatarClick}
          onEditClick={onEditProfile}
        />
      </motion.div>

      {/* Campus Activity Feed - Priority on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusActivityFeed
          activities={activities}
          isLoading={isLoading.activities}
          variant="compact"
          maxItems={5}
          onActivityClick={onActivityClick}
          onViewAll={onViewAllActivities}
        />
      </motion.div>

      {/* Campus Spaces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusSpacesCard
          spaces={spaces}
          isLoading={isLoading.spaces}
          variant="compact"
          onSpaceClick={onSpaceClick}
          onJoinSpace={onJoinSpace}
          onViewAll={onViewAllSpaces}
          onMuteSpace={onMuteSpace}
          onPinSpace={onPinSpace}
          onLeaveSpace={onLeaveSpace}
          onQuickPost={onQuickPost}
        />
      </motion.div>

      {/* Builder Tools - Most subtle on mobile */}
      {showBuilder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusBuilderTools
            availableTools={availableTools}
            createdTools={createdTools}
            isBuilder={user?.isBuilder ?? false}
            isLoading={isLoading.tools}
            variant="subtle"
            isLocked={true}
            onToolClick={onToolClick}
            onCreateTool={onCreateTool}
            onBecomeBuilder={onBecomeBuilder}
            onJoinWaitlist={onJoinToolsWaitlist}
          />
        </motion.div>
      )}
    </div>
  );

  const getLayout = () => {
    switch (layout) {
      case 'mobile':
        return <MobileLayout />;
      case 'tablet':
        return <TabletLayout />;
      default:
        return <DesktopLayout />
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        // HIVE Foundation
        'min-h-screen bg-obsidian',
        // Responsive padding with HIVE spacing
        'p-4 md:p-6 lg:p-8',
        // Maximum width constraint
        'max-w-7xl mx-auto',
        className
      )}
    >
      {/* Background Pattern - Subtle HIVE Aesthetic */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Profile Dashboard Layout */}
      <div className="relative z-10">
        {getLayout()}
      </div>

      {/* Loading Progress Indicator */}
      <AnimatePresence>
        {Object.values(isLoading).some(Boolean) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-gold to-champagne"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
          }}
                  transition={{
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
                />
                <span className="text-platinum text-sm font-medium">
                  Loading campus data...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast - Sections Loaded */}
      <AnimatePresence>
        {loadedSections.size >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl border border-emerald-500/20 px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]" />
                <span className="text-emerald-400 text-sm font-medium">
                  Profile loaded successfully
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
};

// Compound components for specific use cases
export const CompactProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant'>> = (props) => (
  <ProfileDashboard {...props} variant="compact" />
);

export const FocusedProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant' | 'showBuilder'>> = (props) => (
  <ProfileDashboard {...props} variant="focused" showBuilder={false} />
);

export default ProfileDashboard;