import type { Meta, StoryObj } from '@storybook/react';
import { HiveCard, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { 
  User, 
  Settings, 
  Share, 
  Heart, 
  MessageCircle, 
  Star,
  Calendar,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Eye,
  BookOpen,
  Zap,
  Crown
} from 'lucide-react';

const meta: Meta<typeof HiveCard> = {
  title: '04-HIVE/Hive Card',
  component: HiveCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The consolidated HIVE Card system featuring 20+ variants, liquid metal motion, magnetic interactions, and all semantic design tokens. Includes CardHeader, CardTitle, CardDescription, CardContent, and CardFooter components for structured card layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'minimal', 'gold-accent', 'gold-featured', 'gold-premium', 'builder', 'student', 'space', 'tool', 'online', 'building', 'studying', 'clickable', 'selectable', 'selected', 'post', 'announcement', 'featured-post'],
      description: 'Comprehensive HIVE card variants for all platform use cases'
    },
    size: {
      control: 'select',
      options: ['compact', 'sm', 'default', 'lg', 'xl'],
      description: 'Card padding and size variants'
    },
    rounded: {
      control: 'select', 
      options: ['sm', 'default', 'lg', 'full'],
      description: 'Border radius variants with luxury heavy radii'
    },
    magneticHover: {
      control: 'boolean',
      description: 'Enable magnetic hover interactions for premium cards'
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HiveCard>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-medium mb-2">Default Card</h3>
        <p className="text-muted-foreground">
          This is a default HIVE card with standard styling.
        </p>
      </div>
    ),
  },
};

export const CoreVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveCard variant="default">
        <HiveCardContent>
          <HiveCardTitle>Default</HiveCardTitle>
          <HiveCardDescription>Standard HIVE card styling</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="elevated">
        <HiveCardContent>
          <HiveCardTitle>Elevated</HiveCardTitle>
          <HiveCardDescription>Enhanced shadow and elevation</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="minimal">
        <HiveCardContent>
          <HiveCardTitle>Minimal</HiveCardTitle>
          <HiveCardDescription>Clean transparent styling</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="gold-accent">
        <HiveCardContent>
          <HiveCardTitle>Gold Accent</HiveCardTitle>
          <HiveCardDescription>Premium gold border highlights</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="builder">
        <HiveCardContent>
          <HiveCardTitle>Builder</HiveCardTitle>
          <HiveCardDescription>For tool builders and creators</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="space">
        <HiveCardContent>
          <HiveCardTitle>Space</HiveCardTitle>
          <HiveCardDescription>Campus space containers</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Core HIVE card variants showcasing the primary styling patterns for campus infrastructure'
      }
    }
  }
};

export const StructuredCard: Story = {
  render: () => (
    <div className="max-w-md">
      <HiveCard variant="elevated">
        <HiveCardHeader>
          <HiveCardTitle>Tool Creation Workshop</HiveCardTitle>
          <HiveCardDescription>
            Learn how to build custom tools using HIVE's Element system
          </HiveCardDescription>
        </HiveCardHeader>
        <HiveCardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[var(--hive-text-secondary)]" />
              <span>Tuesday, March 15th at 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-[var(--hive-text-secondary)]" />
              <span>24 attending • 6 spots left</span>
            </div>
          </div>
        </HiveCardContent>
        <HiveCardFooter>
          <HiveButton className="flex-1">Register</HiveButton>
          <HiveButton variant="outline">
            <Share className="w-4 h-4" />
          </HiveButton>
        </HiveCardFooter>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Structured card using HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, and HiveCardFooter components'
      }
    }
  }
};

export const StatusVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveCard variant="online" interactive>
        <HiveCardContent>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-[var(--hive-status-success)] rounded-full"></div>
            <HiveCardTitle>Online</HiveCardTitle>
          </div>
          <HiveCardDescription>User is currently active in space</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="building" interactive>
        <HiveCardContent>
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-[var(--hive-status-info)]" />
            <HiveCardTitle>Building</HiveCardTitle>
          </div>
          <HiveCardDescription>Currently working on a tool</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="studying" interactive>
        <HiveCardContent>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <HiveCardTitle>Studying</HiveCardTitle>
          </div>
          <HiveCardDescription>In focus mode for deep work</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status card variants for user activity states and space engagement'
      }
    }
  }
};

export const InteractionVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveCard variant="selectable" interactive>
        <HiveCardContent>
          <HiveCardTitle>Selectable</HiveCardTitle>
          <HiveCardDescription>Hover for selection preview</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="selected">
        <HiveCardContent>
          <HiveCardTitle>Selected</HiveCardTitle>
          <HiveCardDescription>Currently selected state</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
      
      <HiveCard variant="clickable" interactive onClick={() => alert('Card clicked!')}>
        <HiveCardContent>
          <HiveCardTitle>Clickable</HiveCardTitle>
          <HiveCardDescription>Click me for action</HiveCardDescription>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive card variants for selection and action patterns'
      }
    }
  }
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <HiveCard interactive>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">Interactive Card</h3>
          <p className="text-muted-foreground mb-4">
            This card has hover effects and is clickable.
          </p>
          <HiveButton size="sm">Click me</HiveButton>
        </div>
      </HiveCard>
      
      <HiveCard variant="glass" interactive>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">Interactive Glass</h3>
          <p className="text-muted-foreground mb-4">
            Glass morphism with interactive effects.
          </p>
          <HiveButton variant="outline" size="sm">Action</HiveButton>
        </div>
      </HiveCard>
    </div>
  ),
};

export const PostCard: Story = {
  render: () => (
    <HiveCard interactive className="max-w-md">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--hive-text-primary)]" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Sarah Chen</h4>
            <p className="text-sm text-muted-foreground">Computer Science • 2h ago</p>
          </div>
          <HiveBadge variant="premium" size="sm">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </HiveBadge>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">New Study Group Tool Available!</h3>
          <p className="text-sm text-muted-foreground">
            Just built a collaborative study planner that syncs with your calendar. 
            Perfect for organizing group study sessions and tracking progress.
          </p>
        </div>
        
        {/* Post Tags */}
        <div className="flex gap-2 mb-4">
          <HiveBadge variant="outline" size="sm">Study Tools</HiveBadge>
          <HiveBadge variant="outline" size="sm">Calendar</HiveBadge>
          <HiveBadge variant="outline" size="sm">Collaboration</HiveBadge>
        </div>
        
        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" />
              <span>24</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>8</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          <HiveButton size="sm" variant="ghost">
            Try Tool
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  ),
};

export const SpaceCard: Story = {
  render: () => (
    <HiveCard variant="elevated" interactive className="max-w-sm">
      <div className="p-6">
        {/* Space Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[var(--hive-text-primary)]" />
            </div>
            <div>
              <h3 className="font-medium">CS Study Hub</h3>
              <p className="text-sm text-muted-foreground">Computer Science</p>
            </div>
          </div>
          <HiveBadge variant="success" size="sm">Active</HiveBadge>
        </div>
        
        {/* Space Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-medium">156</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">23</div>
            <div className="text-xs text-muted-foreground">Tools</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">4.8</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              Rating
            </div>
          </div>
        </div>
        
        {/* Space Description */}
        <p className="text-sm text-muted-foreground mb-4">
          Collaborative space for CS students to share study materials, 
          build tools, and connect with peers across all CS courses.
        </p>
        
        {/* Space Actions */}
        <div className="flex gap-2">
          <HiveButton className="flex-1">Join Space</HiveButton>
          <HiveButton variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  ),
};

export const EventCard: Story = {
  render: () => (
    <HiveCard variant="glass" className="max-w-md">
      <div className="p-6">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium mb-1">HiveLAB Workshop</h3>
            <p className="text-sm text-muted-foreground">Tool Building Fundamentals</p>
          </div>
          <HiveBadge variant="warning" size="sm">Tomorrow</HiveBadge>
        </div>
        
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Tuesday, March 15th</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>2:00 PM - 4:00 PM EST</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>Engineering Building, Room 204</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>24 attending • 6 spots left</span>
          </div>
        </div>
        
        {/* Event Description */}
        <p className="text-sm text-muted-foreground mb-4">
          Learn the basics of creating tools in HIVE's LAB environment. 
          We'll cover Element composition, testing, and deployment.
        </p>
        
        {/* Event Actions */}
        <div className="flex gap-2">
          <HiveButton className="flex-1">Register</HiveButton>
          <HiveButton variant="outline">
            <Share className="w-4 h-4" />
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  ),
};

export const ToolCard: Story = {
  render: () => (
    <HiveCard interactive className="max-w-sm">
      <div className="p-6">
        {/* Tool Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[var(--hive-text-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">GPA Calculator Pro</h3>
            <p className="text-sm text-muted-foreground">by Alex Johnson</p>
          </div>
          <HiveBadge variant="premium" size="sm">Pro</HiveBadge>
        </div>
        
        {/* Tool Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div>
            <div className="text-sm font-medium">4.9</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div>
            <div className="text-sm font-medium">1.2k</div>
            <div className="text-xs text-muted-foreground">Uses</div>
          </div>
          <div>
            <div className="text-sm font-medium">v2.1</div>
            <div className="text-xs text-muted-foreground">Version</div>
          </div>
        </div>
        
        {/* Tool Description */}
        <p className="text-sm text-muted-foreground mb-4">
          Advanced GPA calculator with semester tracking, grade predictions, 
          and goal setting. Supports weighted grades and credit hours.
        </p>
        
        {/* Tool Tags */}
        <div className="flex gap-2 mb-4">
          <HiveBadge variant="outline" size="sm">Academic</HiveBadge>
          <HiveBadge variant="outline" size="sm">Calculator</HiveBadge>
        </div>
        
        {/* Tool Actions */}
        <div className="flex gap-2">
          <HiveButton className="flex-1">Use Tool</HiveButton>
          <HiveButton variant="outline" size="sm">
            <Heart className="w-4 h-4" />
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  ),
};

export const ComprehensiveShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">HIVE Card System</h3>
        <p className="text-[var(--hive-text-secondary)]">Comprehensive card variants for campus infrastructure</p>
      </div>
      
      {/* Platform-Specific Variants */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Platform Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HiveCard variant="builder" interactive magneticHover>
            <HiveCardContent>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                <HiveCardTitle>Builder</HiveCardTitle>
              </div>
              <HiveCardDescription>For tool creators</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="space" interactive>
            <HiveCardContent>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-[var(--hive-text-primary)]" />
                <HiveCardTitle>Space</HiveCardTitle>
              </div>
              <HiveCardDescription>Campus containers</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="tool" interactive>
            <HiveCardContent>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-[var(--hive-text-primary)]" />
                <HiveCardTitle>Tool</HiveCardTitle>
              </div>
              <HiveCardDescription>Student-built tools</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="student" interactive>
            <HiveCardContent>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-[var(--hive-text-primary)]" />
                <HiveCardTitle>Student</HiveCardTitle>
              </div>
              <HiveCardDescription>Profile cards</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
        </div>
      </div>
      
      {/* Premium Gold Variants */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Premium Gold Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HiveCard variant="gold-accent" interactive magneticHover>
            <HiveCardContent>
              <HiveCardTitle>Gold Accent</HiveCardTitle>
              <HiveCardDescription>Subtle gold highlights</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="gold-featured" interactive magneticHover>
            <HiveCardContent>
              <HiveCardTitle>Gold Featured</HiveCardTitle>
              <HiveCardDescription>Featured content styling</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="gold-premium" interactive magneticHover>
            <HiveCardContent>
              <HiveCardTitle>Gold Premium</HiveCardTitle>
              <HiveCardDescription>Maximum premium styling</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
        </div>
      </div>
      
      {/* Content Variants */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Content Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HiveCard variant="post" interactive>
            <HiveCardContent>
              <HiveCardTitle>Post</HiveCardTitle>
              <HiveCardDescription>Social feed posts</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="announcement">
            <HiveCardContent>
              <HiveCardTitle>Announcement</HiveCardTitle>
              <HiveCardDescription>Important notices</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
          
          <HiveCard variant="featured-post" interactive>
            <HiveCardContent>
              <HiveCardTitle>Featured Post</HiveCardTitle>
              <HiveCardDescription>Highlighted content</HiveCardDescription>
            </HiveCardContent>
          </HiveCard>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all HIVE card variants demonstrating the full system capabilities for campus infrastructure'
      }
    }
  }
};

// Re-export for migration compatibility
export { HiveCard as Card } from '../../components/hive-card';