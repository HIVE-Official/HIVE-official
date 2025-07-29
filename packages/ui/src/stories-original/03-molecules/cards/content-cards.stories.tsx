import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { 
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Calendar,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Eye,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  MoreHorizontal,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Mic,
  Link as LinkIcon,
  Award,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react';

// Content Card Molecules for HIVE Student Platform
interface ContentCardProps {
  className?: string;
  interactive?: boolean;
  expandable?: boolean;
}

// Post Card - Student social posts and updates
const PostCard: React.FC<ContentCardProps & {
  post: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar: string;
      verified: boolean;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    tags?: string[];
    media?: {
      type: 'image' | 'video';
      url: string;
      caption?: string;
    };
    isLiked: boolean;
    isBookmarked: boolean;
  }
}> = ({ post, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(post.isLiked);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);

  return (
    <HiveCard className={`w-125 ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Post Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] p-0.5">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-full h-full rounded-full object-cover bg-[var(--hive-background-secondary)]"
                />
              </div>
              {post.author.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-[var(--hive-text-primary)]" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Text variant="body-md" className="font-semibold">{post.author.name}</Text>
                <Text variant="body-sm" color="secondary">@{post.author.username}</Text>
              </div>
              <Text variant="body-xs" color="secondary">{post.timestamp}</Text>
            </div>
          </div>
          
          {interactive && (
            <button className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <Text variant="body-md" className={expandable && !expanded ? "line-clamp-3" : ""}>
            {post.content}
          </Text>

          {/* Media */}
          {post.media && (
            <div className="rounded-lg overflow-hidden bg-[var(--hive-background-secondary)]">
              {post.media.type === 'image' ? (
                <img 
                  src={post.media.url} 
                  alt={post.media.caption || "Post image"}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="relative h-64 bg-[var(--hive-background-primary)] flex items-center justify-center">
                  <Play className="w-12 h-12 text-[var(--hive-text-primary)] opacity-70" />
                  <video 
                    src={post.media.url}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMTExODI3Ii8+Cjwvc3ZnPgo="
                  />
                </div>
              )}
              {post.media.caption && (
                <div className="p-3">
                  <Text variant="body-sm" color="secondary">{post.media.caption}</Text>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" size="sm">#{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Content */}
        {expandable && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-3 border-t border-[var(--hive-border-primary)]"
              >
                <div className="space-y-3">
                  <Text variant="body-sm" className="font-medium">Engagement Insights</Text>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Text variant="body-lg" className="font-bold">{post.likes}</Text>
                      <Text variant="body-xs" color="secondary">Likes</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="body-lg" className="font-bold">{post.comments}</Text>
                      <Text variant="body-xs" color="secondary">Comments</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="body-lg" className="font-bold">{post.shares}</Text>
                      <Text variant="body-xs" color="secondary">Shares</Text>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Actions */}
        {interactive && (
          <div className="flex items-center justify-between pt-2 border-t border-[var(--hive-border-primary)]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
              >
                <Heart className={`w-4 h-4 ${liked ? 'text-red-400 fill-red-400' : 'text-gray-400'}`} />
                <Text variant="body-sm" color="secondary">{post.likes + (liked && !post.isLiked ? 1 : 0)}</Text>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <Text variant="body-sm" color="secondary">{post.comments}</Text>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
                <Text variant="body-sm" color="secondary">{post.shares}</Text>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
              </button>
              {expandable && (
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
                >
                  {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </HiveCard>
  );
};

// Resource Card - Academic resources and study materials
const ResourceCard: React.FC<ContentCardProps & {
  resource: {
    title: string;
    description: string;
    type: 'document' | 'video' | 'audio' | 'link';
    author: string;
    course?: string;
    downloads: number;
    rating: number;
    tags: string[];
    fileSize?: string;
    duration?: string;
    uploadDate: string;
    thumbnail?: string;
  }
}> = ({ resource, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'document': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'video': return <Video className="w-5 h-5 text-red-400" />;
      case 'audio': return <Music className="w-5 h-5 text-green-400" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Resource Header */}
        <div className="flex items-start gap-3">
          <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            {getTypeIcon()}
          </div>
          <div className="flex-1">
            <Text variant="body-lg" className="font-bold line-clamp-2">{resource.title}</Text>
            <div className="flex items-center gap-2 mt-1">
              <Text variant="body-sm" color="secondary">by {resource.author}</Text>
              {resource.course && (
                <>
                  <span className="text-gray-600">•</span>
                  <Badge variant="secondary" size="sm">{resource.course}</Badge>
                </>
              )}
            </div>
          </div>
          
          {interactive && (
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>

        {/* Thumbnail */}
        {resource.thumbnail && (
          <div className="relative rounded-lg overflow-hidden bg-[var(--hive-background-secondary)] h-48">
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--hive-background-primary)]/20 flex items-center justify-center">
              {resource.type === 'video' ? (
                <Play className="w-12 h-12 text-[var(--hive-text-primary)] opacity-70" />
              ) : resource.type === 'audio' ? (
                <Mic className="w-12 h-12 text-[var(--hive-text-primary)] opacity-70" />
              ) : null}
            </div>
          </div>
        )}

        {/* Description */}
        <Text variant="body-sm" className={expandable && !expanded ? "line-clamp-2" : ""}>
          {resource.description}
        </Text>

        {/* Resource Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4 text-blue-400" />
            <Text variant="body-sm" color="secondary">{resource.downloads} downloads</Text>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <Text variant="body-sm" color="secondary">{resource.rating.toFixed(1)}</Text>
          </div>
          {resource.fileSize && (
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-gray-400" />
              <Text variant="body-sm" color="secondary">{resource.fileSize}</Text>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <Text variant="body-sm" color="secondary">{resource.duration}</Text>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" size="sm">{tag}</Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" size="sm">+{resource.tags.length - 3}</Badge>
          )}
        </div>

        {/* Expandable Content */}
        {expandable && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-3 pt-3 border-t border-[var(--hive-border-primary)]"
              >
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Resource Details</Text>
                  <div className="space-y-1">
                    <Text variant="body-xs" color="secondary">• Uploaded on {resource.uploadDate}</Text>
                    <Text variant="body-xs" color="secondary">• Compatible with all devices</Text>
                    <Text variant="body-xs" color="secondary">• Updated with latest information</Text>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" size="sm">{tag}</Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Actions */}
        {interactive && (
          <div className="flex items-center gap-2 pt-2">
            <HiveButton variant="premium" size="sm" className="flex-1">
              {resource.type === 'link' ? (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Link
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </>
              )}
            </HiveButton>
            <HiveButton variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </HiveButton>
            {expandable && (
              <HiveButton 
                variant="ghost" 
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </HiveButton>
            )}
          </div>
        )}
      </motion.div>
    </HiveCard>
  );
};

// Achievement Card - Student accomplishments and milestones
const AchievementCard: React.FC<ContentCardProps & {
  achievement: {
    title: string;
    description: string;
    type: 'academic' | 'social' | 'project' | 'milestone';
    earnedDate: string;
    points: number;
    rarity: 'common' | 'rare' | 'legendary';
    category: string;
    requirements?: string[];
    progress?: {
      current: number;
      total: number;
    };
    badge?: string;
  }
}> = ({ achievement, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);

  const getRarityColor = () => {
    switch (achievement.rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      case 'common': return 'from-blue-400 to-green-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <HiveCard className={`w-[350px] ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Achievement Header */}
        <div className="text-center space-y-3">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${getRarityColor()} p-1`}>
            <div className="w-full h-full bg-[var(--hive-background-primary)] rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-[var(--hive-text-primary)]" />
            </div>
          </div>
          
          <div className="space-y-1">
            <Text variant="heading-md" className="font-bold">{achievement.title}</Text>
            <Badge 
              variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'} 
              size="sm"
              className={achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-[var(--hive-background-primary)]' : ''}
            >
              {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Text variant="body-sm" className="text-center line-clamp-2">
          {achievement.description}
        </Text>

        {/* Achievement Stats */}
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <Text variant="body-lg" className="font-bold text-[var(--hive-primary)]">
              {achievement.points}
            </Text>
            <Text variant="body-xs" color="secondary">Points</Text>
          </div>
          <div className="text-center">
            <Text variant="body-md" className="font-semibold">{achievement.category}</Text>
            <Text variant="body-xs" color="secondary">Category</Text>
          </div>
        </div>

        {/* Progress Bar (if applicable) */}
        {achievement.progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Text variant="body-sm">Progress</Text>
              <Text variant="body-sm" color="secondary">
                {achievement.progress.current}/{achievement.progress.total}
              </Text>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Expandable Content */}
        {expandable && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-3 pt-3 border-t border-[var(--hive-border-primary)]"
              >
                {achievement.requirements && (
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Requirements</Text>
                    <div className="space-y-1">
                      {achievement.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[var(--hive-primary)] rounded-full" />
                          <Text variant="body-xs" color="secondary">{req}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Text variant="body-xs" color="secondary">
                    Earned on {achievement.earnedDate}
                  </Text>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Actions */}
        {interactive && (
          <div className="flex items-center gap-2 pt-2">
            <HiveButton variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share Achievement
            </HiveButton>
            {expandable && (
              <HiveButton 
                variant="ghost" 
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </HiveButton>
            )}
          </div>
        )}
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Cards/Content Cards',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Content Cards** - Rich content display for campus social platform

Molecular-level content cards designed specifically for the HIVE student platform experience. These cards handle various content types from social posts to academic resources, creating engaging content discovery and interaction patterns.

## Card Philosophy
- **Content-First**: Optimized display for different media types and content formats
- **Social Engagement**: Built-in interaction patterns for likes, comments, and sharing
- **Academic Context**: Specialized layouts for educational resources and achievements
- **Progressive Enhancement**: Expandable content reveals deeper engagement opportunities

## Components
- **PostCard**: Social media posts with rich media support and engagement metrics
- **ResourceCard**: Academic resources with download tracking and rating systems
- **AchievementCard**: Student accomplishments with progress tracking and rarity indicators

## Design Patterns
- **Adaptive Layouts**: Cards adjust based on content type and available media
- **Engagement Metrics**: Clear display of social proof and interaction data
- **Rich Media Support**: Optimized handling of images, videos, and documents
- **Accessibility First**: Screen reader friendly with proper ARIA support

## Interaction States
- **Default**: Clean content presentation with key engagement metrics
- **Expanded**: Additional context, full descriptions, and detailed metadata
- **Interactive**: Hover states, action feedback, and micro-interactions
- **Engaged**: Visual feedback for likes, bookmarks, and other user actions

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton variants for contextual actions
- Atomic Text and Badge components for content organization
- Framer Motion for smooth expand/collapse animations
- Lucide React for consistent iconography across content types
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Post Card Stories
export const PostCardDefault: Story = {
  name: 'Social Post - Text Only',
  render: () => (
    <PostCard 
      post={{
        id: "1",
        author: {
          name: "Alex Chen",
          username: "alexc_cs",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          verified: true
        },
        content: "Just finished my final project for CS 142! Really excited about the web application we built - it's a study group matching platform that uses machine learning to connect students with similar learning styles and schedules. Can't wait to deploy it for the whole campus to use! 🚀",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        shares: 3,
        tags: ["CS142", "WebDev", "MachineLearning", "StudyGroups"],
        isLiked: false,
        isBookmarked: false
      }}
    />
  )
};

export const PostCardWithImage: Story = {
  name: 'Social Post - With Image',
  render: () => (
    <PostCard 
      post={{
        id: "2",
        author: {
          name: "Sarah Kim",
          username: "sarahk_design",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=400&h=400&fit=crop&crop=face",
          verified: false
        },
        content: "Beautiful sunset from the library roof! Sometimes you need to take a break from studying and appreciate the campus views. Who else is pulling an all-nighter for finals?",
        timestamp: "4 hours ago",
        likes: 67,
        comments: 15,
        shares: 12,
        tags: ["CampusLife", "Finals", "Photography"],
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          caption: "Sunset view from the main library"
        },
        isLiked: true,
        isBookmarked: false
      }}
    />
  )
};

export const PostCardExpandable: Story = {
  name: 'Social Post - Expandable',
  render: () => (
    <PostCard 
      expandable={true}
      post={{
        id: "3",
        author: {
          name: "Marcus Johnson",
          username: "marcus_biz",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
          verified: true
        },
        content: "Incredible turnout at today's entrepreneurship workshop! We had over 100 students attend and the energy was amazing. Special thanks to our guest speakers from Y Combinator who shared their insights on building successful startups. The Q&A session went way over time because everyone had such great questions. Already planning the next event for next month - thinking about focusing on fundraising strategies. What topics would you all like to see covered?",
        timestamp: "6 hours ago",
        likes: 89,
        comments: 23,
        shares: 18,
        tags: ["Entrepreneurship", "Workshop", "YCombinator", "Startups"],
        isLiked: false,
        isBookmarked: true
      }}
    />
  )
};

// Resource Card Stories
export const ResourceCardDocument: Story = {
  name: 'Academic Resource - Document',
  render: () => (
    <ResourceCard 
      resource={{
        title: "Calculus II Final Exam Study Guide",
        description: "Comprehensive study guide covering all topics from integration techniques to series convergence. Includes practice problems with detailed solutions and key formula references.",
        type: "document",
        author: "Professor Martinez",
        course: "MATH 152",
        downloads: 245,
        rating: 4.8,
        tags: ["Calculus", "Final Exam", "Study Guide", "Mathematics"],
        fileSize: "2.3 MB",
        uploadDate: "March 10, 2024",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
      }}
    />
  )
};

export const ResourceCardVideo: Story = {
  name: 'Academic Resource - Video',
  render: () => (
    <ResourceCard 
      resource={{
        title: "Introduction to React Hooks",
        description: "Complete tutorial covering useState, useEffect, and custom hooks with practical examples. Perfect for CS students learning modern React development patterns.",
        type: "video",
        author: "Teaching Assistant Emily",
        course: "CS 142",
        downloads: 156,
        rating: 4.9,
        tags: ["React", "Hooks", "JavaScript", "WebDev", "Tutorial"],
        duration: "45:32",
        uploadDate: "March 12, 2024",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
      }}
    />
  )
};

export const ResourceCardExpandable: Story = {
  name: 'Academic Resource - Expandable',
  render: () => (
    <ResourceCard 
      expandable={true}
      resource={{
        title: "Data Structures & Algorithms Cheat Sheet",
        description: "Quick reference guide for common data structures and algorithms including time/space complexity analysis, implementation tips, and interview preparation notes.",
        type: "document",
        author: "CS Study Group",
        course: "CS 161",
        downloads: 1247,
        rating: 4.7,
        tags: ["DataStructures", "Algorithms", "CheatSheet", "Interview", "BigO", "Programming"],
        fileSize: "1.8 MB",
        uploadDate: "February 28, 2024"
      }}
    />
  )
};

// Achievement Card Stories
export const AchievementCardCommon: Story = {
  name: 'Achievement - Common',
  render: () => (
    <AchievementCard 
      achievement={{
        title: "First Post",
        description: "Welcome to HIVE! You've shared your first post with the campus community.",
        type: "social",
        earnedDate: "March 15, 2024",
        points: 50,
        rarity: "common",
        category: "Social",
        requirements: ["Create your first post", "Get at least one interaction"]
      }}
    />
  )
};

export const AchievementCardRare: Story = {
  name: 'Achievement - Rare',
  render: () => (
    <AchievementCard 
      achievement={{
        title: "Study Group Leader",
        description: "You've successfully organized and led multiple study groups, helping fellow students achieve academic success.",
        type: "academic",
        earnedDate: "March 10, 2024",
        points: 200,
        rarity: "rare",
        category: "Academic",
        requirements: [
          "Organize 5 study groups",
          "Maintain 4.5+ rating from participants",
          "Help 20+ students improve their grades"
        ]
      }}
    />
  )
};

export const AchievementCardLegendary: Story = {
  name: 'Achievement - Legendary',
  render: () => (
    <AchievementCard 
      expandable={true}
      achievement={{
        title: "Campus Innovation Champion",
        description: "Your student-built tools have positively impacted over 1000 fellow students, revolutionizing how our campus community learns and connects.",
        type: "project",
        earnedDate: "March 1, 2024",
        points: 1000,
        rarity: "legendary",
        category: "Innovation",
        requirements: [
          "Build tool used by 1000+ students",
          "Maintain 4.8+ average rating",
          "Create positive campus impact",
          "Receive recognition from faculty"
        ]
      }}
    />
  )
};

export const AchievementCardProgress: Story = {
  name: 'Achievement - With Progress',
  render: () => (
    <AchievementCard 
      achievement={{
        title: "Event Organizer",
        description: "On your way to becoming a master event organizer by successfully hosting engaging campus events.",
        type: "social",
        earnedDate: "In Progress",
        points: 150,
        rarity: "rare",
        category: "Leadership",
        progress: {
          current: 3,
          total: 5
        },
        requirements: [
          "Organize 5 successful events",
          "Achieve 80+ average attendance",
          "Receive positive feedback from attendees"
        ]
      }}
    />
  )
};

// Campus Content Feed
export const CampusContentFeed: Story = {
  name: 'Campus Content Feed',
  render: () => {
    const [filter, setFilter] = useState<'all' | 'posts' | 'resources' | 'achievements'>('all');

    return (
      <div className="flex flex-col items-center gap-6 max-w-4xl">
        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-[var(--hive-background-secondary)] rounded-lg">
          {[
            { key: 'all', label: 'All Content' },
            { key: 'posts', label: 'Posts' },
            { key: 'resources', label: 'Resources' },
            { key: 'achievements', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === tab.key 
                  ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]' 
                  : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {(filter === 'all' || filter === 'posts') && (
              <motion.div
                key="post-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PostCard 
                  expandable
                  post={{
                    id: "feed-1",
                    author: {
                      name: "Jordan Park",
                      username: "jordanp_cs",
                      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                      verified: false
                    },
                    content: "Working late in the lab on our machine learning project. The neural network is finally converging! 🧠✨",
                    timestamp: "1 hour ago",
                    likes: 12,
                    comments: 4,
                    shares: 2,
                    tags: ["MachineLearning", "LateNight", "Projects"],
                    isLiked: false,
                    isBookmarked: false
                  }}
                />
              </motion.div>
            )}
            
            {(filter === 'all' || filter === 'resources') && (
              <motion.div
                key="resource-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ResourceCard 
                  expandable
                  resource={{
                    title: "Python Data Analysis Toolkit",
                    description: "Complete collection of Python scripts for data analysis, visualization, and statistical modeling. Perfect for research projects.",
                    type: "document",
                    author: "Data Science Club",
                    course: "CS 229",
                    downloads: 89,
                    rating: 4.6,
                    tags: ["Python", "DataScience", "Analysis", "Research"],
                    fileSize: "5.2 MB",
                    uploadDate: "March 8, 2024"
                  }}
                />
              </motion.div>
            )}

            {(filter === 'all' || filter === 'achievements') && (
              <motion.div
                key="achievement-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="lg:col-span-2 flex justify-center"
              >
                <AchievementCard 
                  expandable
                  achievement={{
                    title: "Knowledge Sharer",
                    description: "Your shared resources have helped fellow students succeed in their studies.",
                    type: "academic",
                    earnedDate: "March 14, 2024",
                    points: 300,
                    rarity: "rare",
                    category: "Academic",
                    requirements: [
                      "Share 10 high-quality resources",
                      "Receive 100+ downloads",
                      "Maintain 4.0+ rating average"
                    ]
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
};

// Mobile Content Cards
export const MobileContentCards: Story = {
  name: 'Mobile-First Content Experience',
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <PostCard 
        className="w-full max-w-sm"
        post={{
          id: "mobile-1",
          author: {
            name: "Riley Chen",
            username: "riley_design",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
            verified: true
          },
          content: "Quick sketch break between classes! 🎨",
          timestamp: "30 min ago",
          likes: 18,
          comments: 5,
          shares: 2,
          tags: ["Art", "Break"],
          media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop"
          },
          isLiked: true,
          isBookmarked: false
        }}
      />
      <ResourceCard 
        className="w-full max-w-sm"
        resource={{
          title: "Quick Math Reference",
          description: "Essential formulas for midterm",
          type: "document",
          author: "Study Group",
          downloads: 45,
          rating: 4.5,
          tags: ["Math", "Reference"],
          fileSize: "0.8 MB",
          uploadDate: "Today"
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