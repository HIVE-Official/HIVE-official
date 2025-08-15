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
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Calendar,
  MapPin,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Star,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  Plus,
  Eye,
  ThumbsUp,
  MoreHorizontal,
  Settings,
  Flag,
  UserCheck,
  TrendingUp
} from 'lucide-react';

// Social Card Molecules for HIVE Student Platform
interface CardProps {
  className?: string;
  interactive?: boolean;
  expandable?: boolean;
}

// Student Profile Card - Campus social connection
const StudentProfileCard: React.FC<CardProps & { 
  student: {
    name: string;
    major: string;
    year: string;
    university: string;
    avatar: string;
    verified: boolean;
    mutualConnections: number;
    bio?: string;
    interests: string[];
    joinedDate: string;
  }
}> = ({ student, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <HiveCard className={`w-[350px] ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] p-0.5">
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-full h-full rounded-full object-cover bg-[var(--hive-background-secondary)]"
                />
              </div>
              {student.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <UserCheck className="w-3 h-3 text-[var(--hive-text-primary)]" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Text variant="body-md" className="font-semibold">{student.name}</Text>
                <Badge variant="secondary" size="sm">{student.year}</Badge>
              </div>
              <Text variant="body-sm" color="secondary">{student.major}</Text>
              <Text variant="body-xs" color="secondary">{student.university}</Text>
            </div>
          </div>
          
          {interactive && (
            <button className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            <Text variant="body-sm" color="secondary">{student.mutualConnections} mutual</Text>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <Text variant="body-sm" color="secondary">Joined {student.joinedDate}</Text>
          </div>
        </div>

        {/* Bio Preview */}
        {student.bio && (
          <Text variant="body-sm" className="line-clamp-2">{student.bio}</Text>
        )}

        {/* Interests Preview */}
        <div className="flex flex-wrap gap-1">
          {student.interests.slice(0, 3).map((interest, index) => (
            <Badge key={index} variant="outline" size="sm">{interest}</Badge>
          ))}
          {student.interests.length > 3 && expandable && (
            <Badge variant="outline" size="sm">+{student.interests.length - 3}</Badge>
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
                {/* Full Interests */}
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Interests</Text>
                  <div className="flex flex-wrap gap-1">
                    {student.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" size="sm">{interest}</Badge>
                    ))}
                  </div>
                </div>

                {/* Campus Activity */}
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Campus Activity</Text>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-green-400" />
                      <Text variant="body-sm" color="secondary">Active in 3 study groups</Text>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <Text variant="body-sm" color="secondary">Attended 12 campus events</Text>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Actions */}
        {interactive && (
          <div className="flex items-center gap-2 pt-2">
            <HiveButton
              variant={following ? "outline" : "premium"}
              size="sm"
              className="flex-1"
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </HiveButton>
            <HiveButton variant="outline" size="sm">
              <MessageCircle className="w-4 h-4" />
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

// Event Card - Campus event discovery
const EventCard: React.FC<CardProps & {
  event: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    attendees: number;
    maxAttendees?: number;
    tags: string[];
    image?: string;
    isAttending: boolean;
    price?: string;
  }
}> = ({ event, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [attending, setAttending] = useState(event.isAttending);
  const [interested, setInterested] = useState(false);

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="overflow-hidden"
      >
        {/* Event Image */}
        {event.image && (
          <div className="h-48 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] relative">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant={event.price ? "default" : "success"}>
                {event.price || "Free"}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => setInterested(!interested)}
                className="p-2 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm rounded-full hover:bg-[var(--hive-background-primary)]/30 transition-colors"
              >
                <Heart className={`w-4 h-4 ${interested ? 'text-red-400 fill-red-400' : 'text-[var(--hive-text-primary)]'}`} />
              </button>
            </div>
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Event Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Text variant="heading-md" className="font-bold line-clamp-2 flex-1">
                {event.title}
              </Text>
            </div>
            <Text variant="body-sm" color="secondary" className="line-clamp-2">
              {event.description}
            </Text>
          </div>

          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <Text variant="body-sm">{event.date} at {event.time}</Text>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-400" />
              <Text variant="body-sm">{event.location}</Text>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <Text variant="body-sm">
                {event.attendees} attending
                {event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`}
              </Text>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">{tag}</Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" size="sm">+{event.tags.length - 3}</Badge>
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
                    <Text variant="body-sm" className="font-medium">About this event</Text>
                    <Text variant="body-sm" color="secondary">
                      Join us for an incredible evening of networking, learning, and campus community building. 
                      This event is perfect for students looking to connect with peers in their field and explore 
                      new opportunities on campus.
                    </Text>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Organizer</Text>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full" />
                      <Text variant="body-sm">{event.organizer}</Text>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Actions */}
          {interactive && (
            <div className="flex items-center gap-2 pt-2">
              <HiveButton
                variant={attending ? "outline" : "premium"}
                size="sm"
                className="flex-1"
                onClick={() => setAttending(!attending)}
              >
                {attending ? "Attending" : "Attend Event"}
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
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Tool Card - Student-built campus tools
const ToolCard: React.FC<CardProps & {
  tool: {
    name: string;
    description: string;
    creator: string;
    category: string;
    usage: number;
    rating: number;
    tags: string[];
    lastUpdated: string;
    featured: boolean;
    screenshots?: string[];
  }
}> = ({ tool, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <HiveCard className={`w-[380px] ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-5 space-y-4"
      >
        {/* Tool Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-[var(--hive-text-primary)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Text variant="body-md" className="font-bold">{tool.name}</Text>
                {tool.featured && (
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                )}
              </div>
              <Text variant="body-sm" color="secondary">by {tool.creator}</Text>
              <Badge variant="secondary" size="sm">{tool.category}</Badge>
            </div>
          </div>
          
          {interactive && (
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors"
            >
              <Star className={`w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>

        {/* Description */}
        <Text variant="body-sm" className="line-clamp-2">{tool.description}</Text>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-blue-400" />
            <Text variant="body-sm" color="secondary">{tool.usage} uses</Text>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <Text variant="body-sm" color="secondary">{tool.rating.toFixed(1)}</Text>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-green-400" />
            <Text variant="body-sm" color="secondary">{tool.lastUpdated}</Text>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" size="sm">{tag}</Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" size="sm">+{tool.tags.length - 3}</Badge>
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
                  <Text variant="body-sm" className="font-medium">How it works</Text>
                  <Text variant="body-sm" color="secondary">
                    This tool helps students streamline their campus experience by providing 
                    automated solutions for common academic and social tasks. Built with modern 
                    web technologies and designed specifically for student workflows.
                  </Text>
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Recent Updates</Text>
                  <div className="space-y-1">
                    <Text variant="body-xs" color="secondary">• Added dark mode support</Text>
                    <Text variant="body-xs" color="secondary">• Improved mobile responsiveness</Text>
                    <Text variant="body-xs" color="secondary">• Fixed calendar integration</Text>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag, index) => (
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
              <Zap className="w-4 h-4 mr-2" />
              Use Tool
            </HiveButton>
            <HiveButton variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
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

// Space Card - Campus community discovery
const SpaceCard: React.FC<CardProps & {
  space: {
    name: string;
    description: string;
    category: string;
    members: number;
    activity: string;
    privacy: 'public' | 'private';
    image?: string;
    moderators: string[];
    tags: string[];
    isJoined: boolean;
    trending: boolean;
  }
}> = ({ space, className, interactive = true, expandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [joined, setJoined] = useState(space.isJoined);

  return (
    <HiveCard className={`w-[360px] ${className}`} variant="elevated" size="md">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="overflow-hidden"
      >
        {/* Space Image/Header */}
        <div className="h-32 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] relative p-4 flex items-end">
          {space.image ? (
            <img src={space.image} alt={space.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--hive-primary)]/80 to-[var(--hive-accent)]/80" />
          )}
          
          <div className="relative z-10 flex items-center justify-between w-full">
            <div>
              <div className="flex items-center gap-2">
                <Text variant="body-lg" className="font-bold text-[var(--hive-text-primary)]">{space.name}</Text>
                {space.trending && (
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                )}
              </div>
              <Badge variant={space.privacy === 'private' ? 'default' : 'secondary'} size="sm">
                {space.privacy === 'private' ? 'Private' : 'Public'} Space
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Space Info */}
          <div className="space-y-2">
            <Text variant="body-sm" className="line-clamp-2">{space.description}</Text>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-400" />
                <Text variant="body-sm" color="secondary">{space.members} members</Text>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-400" />
                <Text variant="body-sm" color="secondary">{space.activity}</Text>
              </div>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="space-y-2">
            <Badge variant="secondary" size="sm">{space.category}</Badge>
            <div className="flex flex-wrap gap-1">
              {space.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" size="sm">{tag}</Badge>
              ))}
              {space.tags.length > 2 && (
                <Badge variant="outline" size="sm">+{space.tags.length - 2}</Badge>
              )}
            </div>
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
                    <Text variant="body-sm" className="font-medium">Moderators</Text>
                    <div className="flex flex-wrap gap-2">
                      {space.moderators.map((mod, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full" />
                          <Text variant="body-xs">{mod}</Text>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Recent Activity</Text>
                    <div className="space-y-1">
                      <Text variant="body-xs" color="secondary">• New event: Study Group Meetup</Text>
                      <Text variant="body-xs" color="secondary">• 15 new members this week</Text>
                      <Text variant="body-xs" color="secondary">• Updated community guidelines</Text>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {space.tags.map((tag, index) => (
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
              <HiveButton
                variant={joined ? "outline" : "premium"}
                size="sm"
                className="flex-1"
                onClick={() => setJoined(!joined)}
              >
                {joined ? "Joined" : "Join Space"}
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
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Cards/Social Cards',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Social Cards** - Expandable, modular social cards for campus community

Molecular-level card components designed specifically for the HIVE student platform experience. These cards combine multiple atomic components to create rich, interactive social experiences that drive campus engagement and community building.

## Card Philosophy
- **Campus-Centric**: Every card emphasizes university context and peer connections
- **Progressive Disclosure**: Expandable content reveals deeper engagement opportunities
- **Social Actions**: Built-in interaction patterns for following, joining, and sharing
- **Mobile-First**: Optimized for mobile-first student usage patterns

## Components
- **StudentProfileCard**: Campus social profiles with verification and mutual connections
- **EventCard**: Campus event discovery with attendance tracking and rich details
- **ToolCard**: Student-built campus tools with usage stats and community ratings
- **SpaceCard**: Campus community discovery with member activity and trending indicators

## Design Patterns
- **Liquid Motion**: Smooth expand/collapse using HIVE's गति motion system
- **Contextual Actions**: Smart action buttons that adapt to user state
- **Visual Hierarchy**: Clear information architecture optimized for scanning
- **Accessibility First**: Screen reader friendly with proper ARIA support

## Interaction States
- **Default**: Clean, scannable card layout with key information
- **Expanded**: Rich detail view with additional context and actions
- **Interactive**: Hover states, button feedback, and micro-interactions
- **Connected**: Social proof through mutual connections and community activity

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton variants for contextual actions
- Atomic Text components for consistent typography  
- Framer Motion for smooth expand/collapse animations
- Lucide React for consistent iconography across campus features
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Student Profile Card Stories
export const StudentProfileDefault: Story = {
  name: 'Student Profile - Default',
  render: () => (
    <StudentProfileCard 
      student={{
        name: "Sarah Chen",
        major: "Computer Science",
        year: "Junior",
        university: "Stanford University",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=400&h=400&fit=crop&crop=face",
        verified: true,
        mutualConnections: 12,
        bio: "Passionate about AI and machine learning. Always looking to collaborate on cool projects and meet fellow CS students!",
        interests: ["Machine Learning", "React", "Startups", "Design", "Photography"],
        joinedDate: "Sep 2023"
      }}
    />
  )
};

export const StudentProfileExpandable: Story = {
  name: 'Student Profile - Expandable',
  render: () => (
    <StudentProfileCard 
      expandable={true}
      student={{
        name: "Marcus Johnson",
        major: "Business Administration",
        year: "Senior",
        university: "UC Berkeley",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        verified: true,
        mutualConnections: 8,
        bio: "Entrepreneur building the next big thing. Love connecting with innovative minds and exploring new business opportunities.",
        interests: ["Entrepreneurship", "Finance", "Networking", "Basketball", "Travel", "Blockchain", "Sustainability"],
        joinedDate: "Aug 2022"
      }}
    />
  )
};

// Event Card Stories
export const EventCardDefault: Story = {
  name: 'Campus Event - Default',
  render: () => (
    <EventCard 
      event={{
        title: "CS Department Networking Night",
        description: "Join fellow computer science students for an evening of networking, pizza, and career discussions. Industry professionals will be present!",
        date: "March 15, 2024",
        time: "6:00 PM",
        location: "Gates Building, Room 104",
        organizer: "CS Student Association",
        attendees: 47,
        maxAttendees: 100,
        tags: ["Networking", "Computer Science", "Career", "Free Food"],
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
        isAttending: false,
        price: undefined
      }}
    />
  )
};

export const EventCardExpandable: Story = {
  name: 'Campus Event - Expandable',
  render: () => (
    <EventCard 
      expandable={true}
      event={{
        title: "Spring Career Fair 2024",
        description: "The biggest career fair of the year! Connect with top tech companies, startups, and consulting firms actively recruiting students.",
        date: "April 22, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Memorial Auditorium",
        organizer: "Career Services Center",
        attendees: 234,
        maxAttendees: 500,
        tags: ["Career Fair", "Recruiting", "Tech", "Business", "Internships"],
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
        isAttending: true,
        price: undefined
      }}
    />
  )
};

export const EventCardPaid: Story = {
  name: 'Campus Event - Paid Event',
  render: () => (
    <EventCard 
      event={{
        title: "Spring Formal Dance",
        description: "Celebrate the end of finals with an elegant evening of dancing, dinner, and entertainment at the historic Grand Ballroom.",
        date: "May 10, 2024",
        time: "7:00 PM - 12:00 AM",
        location: "Grand Ballroom, Downtown",
        organizer: "Student Activities Board",
        attendees: 156,
        maxAttendees: 300,
        tags: ["Formal", "Dance", "Social", "End of Year"],
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop",
        isAttending: false,
        price: "$45"
      }}
    />
  )
};

// Tool Card Stories
export const ToolCardDefault: Story = {
  name: 'Campus Tool - Default',
  render: () => (
    <ToolCard 
      tool={{
        name: "Schedule Optimizer",
        description: "AI-powered course scheduling tool that finds the perfect class combinations while avoiding conflicts and optimizing your daily routine.",
        creator: "Alex Rivera",
        category: "Academic",
        usage: 1247,
        rating: 4.8,
        tags: ["Scheduling", "AI", "Academic", "Productivity"],
        lastUpdated: "2 hours ago",
        featured: true
      }}
    />
  )
};

export const ToolCardExpandable: Story = {
  name: 'Campus Tool - Expandable',
  render: () => (
    <ToolCard 
      expandable={true}
      tool={{
        name: "Campus Ride Share",
        description: "Connect with fellow students for shared rides to campus, events, and around the city. Save money and make new friends!",
        creator: "Transportation Club",
        category: "Transportation",
        usage: 892,
        rating: 4.6,
        tags: ["Transportation", "Social", "Money Saving", "Sustainability", "Community"],
        lastUpdated: "1 day ago",
        featured: false
      }}
    />
  )
};

// Space Card Stories
export const SpaceCardDefault: Story = {
  name: 'Campus Space - Default',
  render: () => (
    <SpaceCard 
      space={{
        name: "Stanford Startup Founders",
        description: "A community for aspiring entrepreneurs and startup founders. Share ideas, find co-founders, and get mentorship from successful alumni.",
        category: "Entrepreneurship",
        members: 342,
        activity: "Very active",
        privacy: "public",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=150&fit=crop",
        moderators: ["Sarah Kim", "David Chen"],
        tags: ["Startups", "Entrepreneurship", "Networking"],
        isJoined: false,
        trending: true
      }}
    />
  )
};

export const SpaceCardExpandable: Story = {
  name: 'Campus Space - Expandable',
  render: () => (
    <SpaceCard 
      expandable={true}
      space={{
        name: "CS Study Group Hub",
        description: "Central hub for computer science students to form study groups, share resources, and collaborate on projects. All skill levels welcome!",
        category: "Academic",
        members: 156,
        activity: "Daily posts",
        privacy: "public",
        moderators: ["Prof. Johnson", "Teaching Assistant Maya"],
        tags: ["Computer Science", "Study Groups", "Collaboration", "Projects", "Resources"],
        isJoined: true,
        trending: false
      }}
    />
  )
};

export const SpaceCardPrivate: Story = {
  name: 'Campus Space - Private Community',
  render: () => (
    <SpaceCard 
      space={{
        name: "Honors Program Network",
        description: "Exclusive community for honors program students. Share opportunities, collaborate on research, and connect with high-achieving peers.",
        category: "Academic",
        members: 89,
        activity: "Weekly posts",
        privacy: "private",
        moderators: ["Dr. Martinez", "Academic Advisor"],
        tags: ["Honors Program", "Research", "Academic Excellence"],
        isJoined: true,
        trending: false
      }}
    />
  )
};

// Interactive Campus Feed
export const CampusSocialFeed: Story = {
  name: 'Campus Social Feed',
  render: () => {
    const [filter, setFilter] = useState<'all' | 'events' | 'people' | 'tools' | 'spaces'>('all');

    const students = [
      {
        name: "Emma Rodriguez",
        major: "Environmental Science",
        year: "Sophomore",
        university: "UC Berkeley",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        verified: true,
        mutualConnections: 5,
        bio: "Passionate about sustainability and environmental justice.",
        interests: ["Climate Change", "Research", "Activism"],
        joinedDate: "Jan 2024"
      }
    ];

    const events = [
      {
        title: "Weekly Study Session",
        description: "Join us for collaborative studying in the library!",
        date: "Today",
        time: "7:00 PM",
        location: "Main Library",
        organizer: "Study Group",
        attendees: 12,
        tags: ["Study", "Library"],
        isAttending: false
      }
    ];

    return (
      <div className="flex flex-col items-center gap-6 max-w-4xl">
        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-[var(--hive-background-secondary)] rounded-lg">
          {[
            { key: 'all', label: 'All' },
            { key: 'people', label: 'People' },
            { key: 'events', label: 'Events' },
            { key: 'tools', label: 'Tools' },
            { key: 'spaces', label: 'Spaces' }
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

        {/* Feed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {(filter === 'all' || filter === 'people') && (
              <motion.div
                key="student-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <StudentProfileCard student={students[0]} expandable />
              </motion.div>
            )}
            
            {(filter === 'all' || filter === 'events') && (
              <motion.div
                key="event-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <EventCard event={events[0]} expandable />
              </motion.div>
            )}

            {(filter === 'all' || filter === 'tools') && (
              <motion.div
                key="tool-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ToolCard 
                  expandable
                  tool={{
                    name: "Study Buddy Finder",
                    description: "Match with students in your classes for study sessions and project collaboration.",
                    creator: "Academic Success Team",
                    category: "Academic",
                    usage: 456,
                    rating: 4.7,
                    tags: ["Study", "Collaboration", "Academic"],
                    lastUpdated: "3 hours ago",
                    featured: false
                  }}
                />
              </motion.div>
            )}

            {(filter === 'all' || filter === 'spaces') && (
              <motion.div
                key="space-card"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SpaceCard 
                  expandable
                  space={{
                    name: "Photography Club",
                    description: "Capture campus life and improve your photography skills with fellow students.",
                    category: "Arts & Creative",
                    members: 78,
                    activity: "Weekly meetups",
                    privacy: "public",
                    moderators: ["Photo Club President"],
                    tags: ["Photography", "Arts", "Creative"],
                    isJoined: false,
                    trending: false
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

// Mobile-First Cards
export const MobileSocialCards: Story = {
  name: 'Mobile-First Card Experience',
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <StudentProfileCard 
        className="w-full max-w-sm"
        student={{
          name: "Jordan Park",
          major: "Psychology",
          year: "Junior",
          university: "UCLA",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
          verified: false,
          mutualConnections: 3,
          interests: ["Psychology", "Research"],
          joinedDate: "Oct 2023"
        }}
      />
      <EventCard 
        className="w-full max-w-sm"
        event={{
          title: "Campus Coffee Chat",
          description: "Casual networking over coffee!",
          date: "Tomorrow",
          time: "3:00 PM",
          location: "Student Center",
          organizer: "Networking Club",
          attendees: 8,
          maxAttendees: 15,
          tags: ["Networking", "Social"],
          isAttending: false
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