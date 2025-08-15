/**
 * HIVE Social Feed: Post Card Component
 * Individual post card component showcasing all post types and states
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { 
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Pin,
  Bookmark,
  Calendar,
  MapPin,
  Users,
  Copy,
  CheckCircle,
  Award,
  Zap,
  Flame,
  Target,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import '../../hive-tokens.css';

// Mock Post Card Component for Storybook
const PostCard = ({ post, currentUserId, onLike, onComment, onShare, onVote, showComments = true }: any) => {
  const handleLike = () => onLike?.(post.id);
  const handleComment = () => onComment?.(post.id, 'Great post!');
  const handleShare = () => onShare?.(post.id);
  const handleVote = (optionId: string) => onVote?.(post.id, optionId);
  const handleCopyLink = () => navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'announcement': return <Pin className="h-4 w-4 text-hive-gold" />;
      case 'poll': return <Badge className="text-xs bg-blue-500/20 text-blue-400">Poll</Badge>;
      case 'event': return <Badge className="text-xs bg-purple-500/20 text-purple-400">Event</Badge>;
      case 'tool': return <Badge className="text-xs bg-green-500/20 text-green-400">Tool</Badge>;
      case 'ritual': return <Badge className="text-xs bg-orange-500/20 text-orange-400">Ritual</Badge>;
      default: return null;
    }
  };

  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case 'space': return <Users className="h-3 w-3 text-hive-text-mutedLight" />;
      case 'private': return <Users className="h-3 w-3 text-gray-400" />;
      default: return null;
    }
  };

  const renderPoll = () => {
    if (!post.poll) return null;

    return (
      <div className="mt-3 p-4 bg-gray-800 rounded-lg">
        <h4 className="font-medium text-white mb-3">{post.poll.question}</h4>
        
        <div className="space-y-2">
          {post.poll.options.map((option: any) => (
            <div key={option.id} className="space-y-1">
              <button
                onClick={() => handleVote(option.id)}
                disabled={post.poll.hasVoted}
                className={`w-full p-2 rounded text-left transition-colors ${
                  post.poll.hasVoted
                    ? 'cursor-default'
                    : 'hover:bg-gray-700 cursor-pointer'
                } ${
                  post.poll.userVotes?.includes(option.id)
                    ? 'bg-hive-gold/20 border border-hive-gold'
                    : 'bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{option.text}</span>
                  <span className="text-sm text-gray-400">
                    {option.percentage}% ({option.votes})
                  </span>
                </div>
                {post.poll.hasVoted && (
                  <Progress value={option.percentage} className="h-1 mt-1" />
                )}
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
          <span>{post.poll.totalVotes} votes</span>
          {post.poll.expiresAt && (
            <span>Ends {formatDistanceToNow(new Date(post.poll.expiresAt), { addSuffix: true })}</span>
          )}
        </div>
      </div>
    );
  };

  const renderEvent = () => {
    if (!post.event) return null;

    return (
      <div className="mt-3 p-4 bg-gray-800 rounded-lg border" style={{ borderColor: 'var(--hive-border-gold)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
            <h4 className="text-white font-semibold">{post.event.title}</h4>
          </div>
          <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
            RSVP ({post.event.rsvpCount})
          </Button>
        </div>
        <div className="flex items-center text-gray-400 text-sm space-x-4">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(post.event.date).toLocaleString()}
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {post.event.location}
          </span>
        </div>
      </div>
    );
  };

  const renderTool = () => {
    if (!post.tool) return null;

    return (
      <div className="mt-3 p-4 bg-gray-800 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold">{post.tool.name}</h4>
              <p className="text-gray-400 text-sm">{post.tool.description}</p>
              <div className="flex items-center mt-1">
                <Badge className="bg-blue-500/20 text-blue-400 mr-2">{post.tool.category}</Badge>
                <span className="text-gray-400 text-xs">{post.tool.usageCount} uses</span>
              </div>
            </div>
          </div>
          <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
            Try Tool
          </Button>
        </div>
      </div>
    );
  };

  const renderRitual = () => {
    if (!post.ritual) return null;

    return (
      <div className="mt-3 p-4 bg-gray-800 rounded-lg border border-green-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold">{post.ritual.name}</h4>
              <div className="flex items-center mt-1">
                <Badge className="bg-green-500/20 text-green-400 mr-2">{post.ritual.category}</Badge>
                <span className="font-semibold" style={{ color: 'var(--hive-brand-primary)' }}>{post.ritual.streak} day streak!</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {post.ritual.participants} students participating
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
            Join Challenge
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className={`${
                post.author.role === 'Builder' ? '' :
                post.author.role === 'Space Leader' ? 'bg-blue-500 text-white' :
                'bg-gradient-to-r from-green-500 to-teal-500 text-white'
              }`}>
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h4 className="text-white font-medium mr-2">{post.author.name}</h4>
                {post.author.isVerified && <Award className="w-4 h-4" style={{ color: 'var(--hive-brand-primary)' }} />}
                {getPostTypeIcon()}
              </div>
              <p className="text-gray-400 text-sm">
                {post.author.handle}
                {post.space && <> • {post.space.name}</>}
                <> • {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</>
                {getVisibilityIcon()}
              </p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>

        {/* Post Content */}
        <p className="text-gray-300 mb-4">{post.content.text}</p>

        {/* Dynamic Content */}
        {post.content.event && renderEvent()}
        {post.content.tool && renderTool()}
        {post.content.ritual && renderRitual()}
        {post.content.poll && renderPoll()}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleLike}
              className={`${post.engagement.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${post.engagement.isLiked ? 'fill-current' : ''}`} />
              {post.engagement.likes}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleComment} className="text-gray-400 hover:text-white">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.engagement.comments}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleShare} className="text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4 mr-1" />
              {post.engagement.shares}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" onClick={handleCopyLink} className="text-gray-400 hover:text-white">
              <Copy className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className={`${post.engagement.hasBookmarked ? 'text-hive-gold' : 'text-gray-400 hover:text-hive-gold'}`}>
              <Bookmark className={`w-4 h-4 ${post.engagement.hasBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const meta = {
  title: '07-Social-Feed-Components/Post Card',
  component: PostCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for different post types
const mockUser = {
  id: 'user_1',
  name: 'Sarah Chen',
  handle: '@sarahc',
  avatar: 'SC',
  isVerified: true,
  role: 'Builder'
};

const basePost = {
  id: 'post_1',
  author: mockUser,
  timestamp: new Date().toISOString(),
  visibility: 'public' as const,
  space: { name: 'CS 101 Study Group', id: 'cs101' },
  tags: ['campus-life', 'study-session'],
  engagement: {
    likes: 23,
    comments: 8,
    shares: 4,
    isLiked: false,
    hasBookmarked: false
  }
};

export const TextPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'text',
      content: {
        text: 'Just finished an amazing study session in the library! The collaborative learning environment here at UB is incredible. Anyone else finding that group study really helps with understanding complex algorithms? 🧠✨'
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};

export const EventPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'event',
      content: {
        text: 'Emergency study session tonight at 8 PM in Lockwood Library! We\'re going over the midterm review and working through practice problems. Bring your laptops!',
        event: {
          title: 'Midterm Review Session',
          date: '2024-11-15T20:00:00Z',
          location: 'Lockwood Library, Room 204',
          rsvpCount: 12
        }
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};

export const ToolPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'tool',
      content: {
        text: 'Just built a study room finder for UB! Check availability across campus in real-time. Perfect for finding quiet spots during finals season 📚',
        tool: {
          name: 'Study Room Finder',
          description: 'Find available study rooms across campus',
          usageCount: 847,
          category: 'Productivity'
        }
      },
      engagement: {
        ...basePost.engagement,
        likes: 156,
        comments: 32,
        shares: 28,
        isLiked: true
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};

export const RitualPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'ritual',
      content: {
        text: 'Just completed my 7-day morning gym streak! 💪 Starting to feel more energized during lectures. Who wants to join the challenge?',
        ritual: {
          name: 'Morning Gym Ritual',
          streak: 7,
          participants: 23,
          category: 'Health & Wellness'
        }
      },
      engagement: {
        ...basePost.engagement,
        likes: 45,
        comments: 12,
        shares: 6
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};

export const PollPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'poll',
      content: {
        text: 'Floor movie night this Friday! We\'re watching The Social Network (how fitting 😄). Bring snacks and we\'ll provide the popcorn!',
        poll: {
          question: 'What time works best for everyone?',
          options: [
            { id: 'opt1', text: '7:00 PM', votes: 8, percentage: 35 },
            { id: 'opt2', text: '8:00 PM', votes: 12, percentage: 52 },
            { id: 'opt3', text: '9:00 PM', votes: 3, percentage: 13 }
          ],
          totalVotes: 23,
          hasVoted: false,
          userVotes: [],
          expiresAt: '2024-11-20T23:59:59Z'
        }
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId)),
    onVote: (postId: string, optionId: string) => Promise.resolve(console.log('Voted on poll:', postId, optionId))
  }
};

export const LikedPost: Story = {
  args: {
    post: {
      ...basePost,
      content: {
        text: 'Beautiful sunset over the campus today! Sometimes you need to take a moment to appreciate where you are in life. UB really is a special place 🌅'
      },
      engagement: {
        ...basePost.engagement,
        isLiked: true,
        hasBookmarked: true,
        likes: 89,
        comments: 15,
        shares: 7
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};

export const AnnouncementPost: Story = {
  args: {
    post: {
      ...basePost,
      type: 'announcement',
      author: {
        ...mockUser,
        name: 'Dr. Maria Rodriguez',
        handle: '@mrodriguez',
        avatar: 'MR',
        role: 'Space Leader'
      },
      content: {
        text: '🚨 IMPORTANT: Midterm exam has been rescheduled to next Friday due to the campus-wide power outage today. Please check your email for updated study materials and office hours.'
      },
      engagement: {
        ...basePost.engagement,
        likes: 156,
        comments: 45,
        shares: 89
      }
    },
    currentUserId: 'current_user',
    onLike: (postId: string) => Promise.resolve(console.log('Liked post:', postId)),
    onComment: (postId: string, content: string) => Promise.resolve(console.log('Commented on post:', postId, content)),
    onShare: (postId: string) => Promise.resolve(console.log('Shared post:', postId))
  }
};