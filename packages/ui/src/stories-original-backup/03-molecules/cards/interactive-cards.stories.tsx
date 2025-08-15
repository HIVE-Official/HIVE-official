import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { 
  Plus,
  Minus,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Eye,
  Bookmark,
  Settings,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Zap,
  Target,
  Award,
  Timer,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

// Interactive Card Molecules for HIVE Student Platform
interface InteractiveCardProps {
  className?: string;
}

// Quick Action Card - Floating action interface
const QuickActionCard: React.FC<InteractiveCardProps & {
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    color: string;
    action: () => void;
  }>;
}> = ({ actions, className }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`fixed bottom-6 right-6 ${className}`}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={गति.slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mb-4 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.1 }}
              >
                <HiveCard className="p-3 cursor-pointer hover:scale-105 transition-transform" size="sm">
                  <div 
                    onClick={action.action}
                    className="flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      {action.icon}
                    </div>
                    <Text variant="body-sm" className="font-medium">{action.label}</Text>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6 text-[var(--hive-text-primary)]" />
        </motion.div>
      </motion.button>
    </div>
  );
};

// Media Player Card - Audio/video controls
const MediaPlayerCard: React.FC<InteractiveCardProps & {
  media: {
    title: string;
    artist: string;
    album?: string;
    duration: number;
    currentTime: number;
    thumbnail?: string;
    isPlaying: boolean;
  };
}> = ({ media, className }) => {
  const [isPlaying, setIsPlaying] = useState(media.isPlaying);
  const [currentTime, setCurrentTime] = useState(media.currentTime);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / media.duration) * 100;

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Media Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] overflow-hidden">
            {media.thumbnail ? (
              <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-8 h-8 text-[var(--hive-text-primary)]" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Text variant="body-lg" className="font-bold truncate">{media.title}</Text>
            <Text variant="body-md" color="secondary" className="truncate">{media.artist}</Text>
            {media.album && (
              <Text variant="body-sm" color="secondary" className="truncate">{media.album}</Text>
            )}
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-2 bg-[var(--hive-background-secondary)] rounded-full cursor-pointer">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="absolute w-4 h-4 bg-[var(--hive-text-primary)] rounded-full shadow-lg transform -translate-y-1 transition-all duration-300"
              style={{ left: `calc(${progressPercentage}% - 2)` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <Text variant="body-sm" color="secondary">{formatTime(currentTime)}</Text>
            <Text variant="body-sm" color="secondary">{formatTime(media.duration)}</Text>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center justify-center gap-4">
          <button className="p-3 hover:bg-[var(--hive-background-secondary)] rounded-full transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-[var(--hive-text-primary)]" />
            ) : (
              <Play className="w-6 h-6 text-[var(--hive-text-primary)] ml-0.5" />
            )}
          </button>
          
          <button className="p-3 hover:bg-[var(--hive-background-secondary)] rounded-full transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value);
                setVolume(newVolume);
                if (newVolume > 0) setIsMuted(false);
              }}
              className="w-full h-2 bg-[var(--hive-background-secondary)] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--hive-primary) 0%, var(--hive-primary) ${isMuted ? 0 : volume}%, var(--hive-background-secondary) ${isMuted ? 0 : volume}%, var(--hive-background-secondary) 100%)`
              }}
            />
          </div>
          <Text variant="body-sm" color="secondary" className="w-8 text-right">
            {isMuted ? 0 : volume}
          </Text>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Poll Card - Interactive voting interface
const PollCard: React.FC<InteractiveCardProps & {
  poll: {
    question: string;
    options: Array<{
      text: string;
      votes: number;
      color: string;
    }>;
    totalVotes: number;
    timeLeft: string;
    hasVoted: boolean;
    userVote?: number;
  };
}> = ({ poll, className }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(poll.userVote || null);
  const [hasVoted, setHasVoted] = useState(poll.hasVoted);

  const handleVote = () => {
    if (selectedOption !== null) {
      setHasVoted(true);
    }
  };

  return (
    <HiveCard className={`w-[450px] ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Poll Header */}
        <div className="space-y-2">
          <Text variant="heading-md" className="font-bold">{poll.question}</Text>
          <div className="flex items-center gap-4">
            <Text variant="body-sm" color="secondary">{poll.totalVotes} votes total</Text>
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4 text-orange-400" />
              <Text variant="body-sm" color="secondary">{poll.timeLeft} left</Text>
            </div>
          </div>
        </div>

        {/* Poll Options */}
        <div className="space-y-3">
          {poll.options.map((option, index) => {
            const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
            const isSelected = selectedOption === index;
            const isUserVote = hasVoted && poll.userVote === index;

            return (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer ${
                  isSelected && !hasVoted
                    ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/5'
                    : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-primary)]/50'
                } ${hasVoted ? 'cursor-default' : ''}`}
                onClick={() => !hasVoted && setSelectedOption(index)}
                whileHover={!hasVoted ? { scale: 1.02 } : {}}
                whileTap={!hasVoted ? { scale: 0.98 } : {}}
              >
                {/* Vote Percentage Background */}
                {hasVoted && (
                  <motion.div
                    className={`absolute inset-0 ${option.color}/20`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                )}

                <div className="relative p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      isSelected && !hasVoted
                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]'
                        : isUserVote
                        ? `${option.color} bg-current`
                        : 'border-gray-400'
                    }`}>
                      {(isSelected && !hasVoted) || isUserVote ? (
                        <div className="w-full h-full rounded-full bg-[var(--hive-text-primary)] scale-50" />
                      ) : null}
                    </div>
                    <Text variant="body-md" className="font-medium">{option.text}</Text>
                  </div>
                  
                  {hasVoted && (
                    <div className="flex items-center gap-2">
                      <Text variant="body-sm" className="font-bold">{percentage.toFixed(1)}%</Text>
                      <Text variant="body-sm" color="secondary">({option.votes})</Text>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vote Button */}
        {!hasVoted && (
          <HiveButton
            onClick={handleVote}
            disabled={selectedOption === null}
            variant="premium"
            size="lg"
            className="w-full"
          >
            Cast Your Vote
          </HiveButton>
        )}

        {/* Poll Results Summary */}
        {hasVoted && (
          <motion.div
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            className="p-4 bg-[var(--hive-background-secondary)] rounded-lg"
          >
            <Text variant="body-sm" className="font-medium mb-2">Poll Results</Text>
            <div className="space-y-1">
              {poll.options
                .map((option, index) => ({ ...option, index }))
                .sort((a, b) => b.votes - a.votes)
                .map((option, rank) => (
                  <div key={option.index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs">#{rank + 1}</Text>
                      <Text variant="body-xs" className="truncate">{option.text}</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">{option.votes} votes</Text>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </HiveCard>
  );
};

// Live Stats Card - Real-time data display
const LiveStatsCard: React.FC<InteractiveCardProps & {
  stats: {
    title: string;
    metrics: Array<{
      label: string;
      value: number;
      change: number;
      icon: React.ReactNode;
      color: string;
    }>;
    lastUpdated: string;
  };
}> = ({ stats, className }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <HiveCard className={`w-125 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Text variant="heading-md" className="font-bold">{stats.title}</Text>
            <Text variant="body-sm" color="secondary">Last updated: {stats.lastUpdated}</Text>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <Activity className="w-5 h-5" />
            </motion.div>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={गति.fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[var(--hive-background-secondary)] rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 ${metric.color}/20 rounded-lg`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 ${
                  metric.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                  <Text variant="body-xs">
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </Text>
                </div>
              </div>
              <Text variant="body-lg" className="font-bold">{metric.value.toLocaleString()}</Text>
              <Text variant="body-sm" color="secondary">{metric.label}</Text>
            </motion.div>
          ))}
        </div>

        {/* Mini Chart Placeholder */}
        <div className="h-32 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <BarChart3 className="w-8 h-8 mx-auto text-gray-400" />
            <Text variant="body-sm" color="secondary">Live activity chart</Text>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Filter Control Card - Advanced filtering interface
const FilterControlCard: React.FC<InteractiveCardProps & {
  filters: {
    search: string;
    categories: string[];
    dateRange: { start: string; end: string };
    sortBy: string;
    viewMode: 'grid' | 'list';
  };
  onFiltersChange: (filters: any) => void;
}> = ({ filters, onFiltersChange, className }) => {
  const [expanded, setExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'Academic', 'Social', 'Sports', 'Arts', 'Technology', 'Health'
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setExpanded(false);
  };

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Quick Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <HiveInput
              placeholder="Search..."
              value={localFilters.search}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
          <div className="flex border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
            <button
              onClick={() => setLocalFilters(prev => ({ ...prev, viewMode: 'grid' }))}
              className={`p-2 transition-colors ${
                localFilters.viewMode === 'grid'
                  ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                  : 'hover:bg-[var(--hive-background-secondary)]'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocalFilters(prev => ({ ...prev, viewMode: 'list' }))}
              className={`p-2 transition-colors ${
                localFilters.viewMode === 'list'
                  ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                  : 'hover:bg-[var(--hive-background-secondary)]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={गति.fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4 pt-4 border-t border-[var(--hive-border-primary)]"
            >
              {/* Categories */}
              <div className="space-y-2">
                <Text variant="body-sm" className="font-medium">Categories</Text>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        const newCategories = localFilters.categories.includes(category)
                          ? localFilters.categories.filter(c => c !== category)
                          : [...localFilters.categories, category];
                        setLocalFilters(prev => ({ ...prev, categories: newCategories }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        localFilters.categories.includes(category)
                          ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                          : 'bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-primary)]/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Text variant="body-sm" className="font-medium">Sort By</Text>
                <select
                  value={localFilters.sortBy}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <HiveButton onClick={applyFilters} variant="premium" size="sm" className="flex-1">
                  Apply Filters
                </HiveButton>
                <HiveButton
                  onClick={() => {
                    setLocalFilters({
                      search: '',
                      categories: [],
                      dateRange: { start: '', end: '' },
                      sortBy: 'recent',
                      viewMode: 'grid'
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Reset
                </HiveButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Cards/Interactive Cards',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Interactive Cards** - Dynamic, stateful cards for enhanced user engagement

Molecular-level interactive cards designed specifically for the HIVE student platform experience. These cards go beyond static content to provide rich, interactive experiences that respond to user input and provide real-time feedback.

## Card Philosophy
- **Responsive Interaction**: Cards that adapt and respond to user actions in real-time
- **Progressive Enhancement**: Interfaces that reveal functionality as users engage
- **Campus Integration**: Interactive patterns designed for student workflows and behaviors
- **Micro-Interaction Rich**: Smooth animations and feedback for every user action

## Components
- **QuickActionCard**: Floating action interface for common campus tasks
- **MediaPlayerCard**: Full-featured audio/video controls for campus content
- **PollCard**: Interactive voting interface for student engagement
- **LiveStatsCard**: Real-time data display with refresh capabilities
- **FilterControlCard**: Advanced filtering and search interface

## Design Patterns
- **Contextual Actions**: Interactive elements that appear based on user context
- **Real-time Feedback**: Immediate visual response to user interactions
- **Progressive Disclosure**: Complex interfaces that reveal functionality gradually
- **State Management**: Cards that remember and respond to user preferences

## Interaction States
- **Idle**: Clean, inviting interface that hints at interactive capabilities
- **Active**: Rich feedback and animation during user interaction
- **Loading**: Smooth loading states that maintain user engagement
- **Success**: Clear confirmation of completed actions

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton and HiveInput for interactive elements
- Framer Motion for rich micro-interactions and state transitions
- Atomic Text and Badge components for consistent information display
- Advanced state management for complex interactive behaviors
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Quick Action Card Stories
export const QuickActionDefault: Story = {
  name: 'Quick Action - Campus Tasks',
  render: () => (
    <div className="h-96 relative">
      <QuickActionCard 
        actions={[
          {
            label: 'Create Event',
            icon: <Calendar className="w-5 h-5 text-[var(--hive-text-primary)]" />,
            color: 'bg-blue-500',
            action: () => console.log('Create Event')
          },
          {
            label: 'Join Study Group',
            icon: <Users className="w-5 h-5 text-[var(--hive-text-primary)]" />,
            color: 'bg-green-500',
            action: () => console.log('Join Study Group')
          },
          {
            label: 'Share Resource',
            icon: <Share2 className="w-5 h-5 text-[var(--hive-text-primary)]" />,
            color: 'bg-purple-500',
            action: () => console.log('Share Resource')
          },
          {
            label: 'Quick Note',
            icon: <Edit3 className="w-5 h-5 text-[var(--hive-text-primary)]" />,
            color: 'bg-orange-500',
            action: () => console.log('Quick Note')
          }
        ]}
      />
    </div>
  )
};

// Media Player Card Stories
export const MediaPlayerDefault: Story = {
  name: 'Media Player - Lecture Recording',
  render: () => (
    <MediaPlayerCard 
      media={{
        title: "Advanced Algorithms Lecture 15",
        artist: "Professor Johnson",
        album: "CS 161 - Spring 2024",
        duration: 3420, // 57 minutes
        currentTime: 1250,
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop",
        isPlaying: false
      }}
    />
  )
};

export const MediaPlayerPodcast: Story = {
  name: 'Media Player - Campus Podcast',
  render: () => (
    <MediaPlayerCard 
      media={{
        title: "Campus Innovation Stories",
        artist: "HIVE Podcast Network",
        album: "Student Spotlight Series",
        duration: 2145, // 35 minutes
        currentTime: 856,
        thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
        isPlaying: true
      }}
    />
  )
};

// Poll Card Stories
export const PollCardActive: Story = {
  name: 'Poll - Active Voting',
  render: () => (
    <PollCard 
      poll={{
        question: "What's the best time for our CS study group meetup?",
        options: [
          { text: "7:00 PM - 9:00 PM", votes: 23, color: "text-blue-500" },
          { text: "8:00 PM - 10:00 PM", votes: 31, color: "text-green-500" },
          { text: "6:00 PM - 8:00 PM", votes: 18, color: "text-purple-500" },
          { text: "Weekend afternoons", votes: 12, color: "text-orange-500" }
        ],
        totalVotes: 84,
        timeLeft: "2 days",
        hasVoted: false
      }}
    />
  )
};

export const PollCardCompleted: Story = {
  name: 'Poll - Completed Results',
  render: () => (
    <PollCard 
      poll={{
        question: "Which programming language should we focus on next semester?",
        options: [
          { text: "Python", votes: 156, color: "text-blue-500" },
          { text: "JavaScript", votes: 134, color: "text-yellow-500" },
          { text: "Go", votes: 89, color: "text-cyan-500" },
          { text: "Rust", votes: 67, color: "text-orange-500" }
        ],
        totalVotes: 446,
        timeLeft: "Closed",
        hasVoted: true,
        userVote: 1
      }}
    />
  )
};

// Live Stats Card Stories
export const LiveStatsDefault: Story = {
  name: 'Live Stats - Campus Activity',
  render: () => (
    <LiveStatsCard 
      stats={{
        title: "Campus Activity Dashboard",
        metrics: [
          {
            label: "Active Students",
            value: 1247,
            change: 12.3,
            icon: <Users className="w-5 h-5 text-blue-500" />,
            color: "text-blue-500"
          },
          {
            label: "Events Today",
            value: 18,
            change: -5.2,
            icon: <Calendar className="w-5 h-5 text-green-500" />,
            color: "text-green-500"
          },
          {
            label: "Study Groups",
            value: 89,
            change: 8.7,
            icon: <BookOpen className="w-5 h-5 text-purple-500" />,
            color: "text-purple-500"
          },
          {
            label: "Resources Shared",
            value: 234,
            change: 15.6,
            icon: <Share2 className="w-5 h-5 text-orange-500" />,
            color: "text-orange-500"
          }
        ],
        lastUpdated: "2 minutes ago"
      }}
    />
  )
};

// Filter Control Card Stories  
export const FilterControlDefault: Story = {
  name: 'Filter Control - Content Discovery',
  render: () => {
    const [filters, setFilters] = useState({
      search: '',
      categories: ['Academic'],
      dateRange: { start: '', end: '' },
      sortBy: 'recent',
      viewMode: 'grid' as 'grid' | 'list'
    });

    return (
      <FilterControlCard 
        filters={filters}
        onFiltersChange={setFilters}
      />
    );
  }
};

// Interactive Campus Dashboard
export const InteractiveCampusDashboard: Story = {
  name: 'Interactive Campus Dashboard',
  render: () => {
    const [filters, setFilters] = useState({
      search: '',
      categories: [],
      dateRange: { start: '', end: '' },
      sortBy: 'recent',
      viewMode: 'grid' as 'grid' | 'list'
    });

    return (
      <div className="relative min-h-screen p-6 space-y-6">
        {/* Top Row - Stats and Controls */}
        <div className="flex flex-wrap gap-6">
          <LiveStatsCard 
            stats={{
              title: "Live Campus Metrics",
              metrics: [
                {
                  label: "Online Now",
                  value: 892,
                  change: 5.2,
                  icon: <Activity className="w-5 h-5 text-green-500" />,
                  color: "text-green-500"
                },
                {
                  label: "Events This Week",
                  value: 47,
                  change: 23.1,
                  icon: <Calendar className="w-5 h-5 text-blue-500" />,
                  color: "text-blue-500"
                }
              ],
              lastUpdated: "30 seconds ago"
            }}
          />
          
          <FilterControlCard 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Middle Row - Media and Poll */}
        <div className="flex flex-wrap gap-6">
          <MediaPlayerCard 
            media={{
              title: "Campus Radio Live",
              artist: "HIVE FM",
              duration: 7200,
              currentTime: 3420,
              isPlaying: true
            }}
          />
          
          <PollCard 
            poll={{
              question: "What should our next campus event focus on?",
              options: [
                { text: "Career Fair", votes: 45, color: "text-blue-500" },
                { text: "Tech Conference", votes: 38, color: "text-green-500" },
                { text: "Social Mixer", votes: 29, color: "text-purple-500" },
                { text: "Study Marathon", votes: 22, color: "text-orange-500" }
              ],
              totalVotes: 134,
              timeLeft: "3 hours",
              hasVoted: false
            }}
          />
        </div>

        {/* Quick Actions */}
        <QuickActionCard 
          actions={[
            {
              label: 'New Post',
              icon: <Plus className="w-5 h-5 text-[var(--hive-text-primary)]" />,
              color: 'bg-blue-500',
              action: () => console.log('New Post')
            },
            {
              label: 'Create Poll',
              icon: <BarChart3 className="w-5 h-5 text-[var(--hive-text-primary)]" />,
              color: 'bg-green-500',
              action: () => console.log('Create Poll')
            },
            {
              label: 'Schedule Event',
              icon: <Calendar className="w-5 h-5 text-[var(--hive-text-primary)]" />,
              color: 'bg-purple-500',
              action: () => console.log('Schedule Event')
            }
          ]}
        />
      </div>
    );
  }
};

// Mobile Interactive Experience
export const MobileInteractiveExperience: Story = {
  name: 'Mobile-First Interactive Cards',
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <PollCard 
        className="w-full max-w-sm"
        poll={{
          question: "Best study spot on campus?",
          options: [
            { text: "Main Library", votes: 67, color: "text-blue-500" },
            { text: "Student Center", votes: 23, color: "text-green-500" },
            { text: "Coffee Shop", votes: 45, color: "text-purple-500" }
          ],
          totalVotes: 135,
          timeLeft: "1 day",
          hasVoted: false
        }}
      />
      
      <MediaPlayerCard 
        className="w-full max-w-sm"
        media={{
          title: "Study Music Mix",
          artist: "Lo-Fi Campus Beats",
          duration: 1800,
          currentTime: 720,
          isPlaying: true
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};