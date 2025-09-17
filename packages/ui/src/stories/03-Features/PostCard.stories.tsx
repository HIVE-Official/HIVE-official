import type { Meta, StoryObj } from '@storybook/react';
import { PostCard, type PostCardProps } from '../../components/feed/post-card';
import { fn } from '@storybook/test';

const meta: Meta<typeof PostCard> = {
  title: 'HIVE/Feed/PostCard',
  component: PostCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Post Card** - Core social interaction component for HIVE feed

### Design System Features
- ✅ **HIVE Typography**: Space Grotesk for names, Geist Sans for content
- ✅ **Gold Accent System**: Verification badges and interaction states
- ✅ **Motion Feedback**: Like animations with HIVE timing curves
- ✅ **Surface Hierarchy**: Proper content elevation
- ✅ **Monochrome Base**: No unauthorized colors

### Post Types
- **Text**: Standard community posts
- **First Light**: User's inaugural post  
- **Ritual Response**: Participation in campus rituals
- **Space Update**: Community announcements
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'first_light', 'ritual_response', 'space_update'],
    },
    isLiked: {
      control: 'boolean',
    },
  },
  args: {
    onLike: fn(),
    onComment: fn(),
    onShare: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAuthor = {
  id: 'user-1',
  displayName: 'Sarah Chen',
  handle: 'sarah.chen',
  avatarUrl: undefined,
  verificationLevel: 'verified' as const,
};

const verifiedPlusAuthor = {
  ...sampleAuthor,
  displayName: 'Marcus Rodriguez',
  handle: 'marcus.r',
  verificationLevel: 'verified+' as const,
};

export const TextPost: Story = {
  args: {
    id: 'post-1',
    author: sampleAuthor,
    content: "Just discovered the most amazing study spot in the library! Third floor, window seats overlooking the quad. Perfect for those late-night cramming sessions ☕️",
    type: 'text',
    timestamp: '2h ago',
    likes: 23,
    comments: 5,
    isLiked: false,
  },
};

export const LikedPost: Story = {
  args: {
    ...TextPost.args,
    likes: 24,
    isLiked: true,
  },
};

export const FirstLightPost: Story = {
  args: {
    id: 'post-2',
    author: {
      ...sampleAuthor,
      displayName: 'Alex Kim',
      handle: 'alex.kim',
    },
    content: "Excited to finally be part of HIVE! Looking forward to connecting with fellow CS majors and building something amazing together. This is my first light! 🔥",
    type: 'first_light',
    timestamp: '5m ago',
    likes: 12,
    comments: 8,
    isLiked: false,
  },
};

export const RitualResponse: Story = {
  args: {
    id: 'post-3',
    author: verifiedPlusAuthor,
    content: "One thing I wish I knew before starting here: the dining halls close earlier than you think! Stock up on snacks for those late study sessions.",
    type: 'ritual_response',
    timestamp: '1h ago',
    likes: 45,
    comments: 12,
    isLiked: true,
    ritual: {
      id: 'ritual-1',
      name: 'Orientation Q&A',
      type: 'weekly_question',
    },
  },
};

export const SpaceUpdate: Story = {
  args: {
    id: 'post-4',
    author: {
      ...verifiedPlusAuthor,
      displayName: 'CS Student Association',
      handle: 'cs.ub',
    },
    content: "🚀 Hackathon registrations are now open! Join us April 15-17 for 48 hours of coding, pizza, and prizes. Theme: 'Building for Campus Community'. Register at the link in our bio!",
    type: 'space_update',
    timestamp: '3h ago',
    likes: 67,
    comments: 23,
    isLiked: false,
    space: {
      id: 'space-1',
      name: 'CS Majors',
    },
  },
};

export const WithSpace: Story = {
  args: {
    ...TextPost.args,
    space: {
      id: 'space-2',
      name: 'Ellicott Residents',
    },
    content: "Anyone else hear the fire alarm at 3am? Apparently someone burnt popcorn in the microwave again 😅",
  },
};

// Showcase different verification levels
export const VerificationLevels: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <div className="space-y-2">
        <h4 className="text-body font-medium text-foreground">Verified Student</h4>
        <PostCard {...(TextPost.args as PostCardProps)} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-body font-medium text-foreground">Verified+ Leader</h4>
        <PostCard {...(RitualResponse.args as PostCardProps)} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different verification levels with appropriate visual indicators',
      },
    },
  },
};

// Feed simulation
export const FeedSimulation: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <PostCard {...(FirstLightPost.args as PostCardProps)} />
      <PostCard {...(RitualResponse.args as PostCardProps)} />
      <PostCard {...(SpaceUpdate.args as PostCardProps)} />
      <PostCard {...(WithSpace.args as PostCardProps)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simulated feed showing various post types and interactions',
      },
    },
  },
};

// Design system validation
export const DesignSystemValidation: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-h3 font-display text-foreground">Design System Compliance</h3>
        <p className="text-muted font-body">
          Every post card follows HIVE brand guidelines automatically:
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">✅ Typography Hierarchy</h4>
          <p className="text-caption text-muted">Space Grotesk for names, Geist Sans for content, proper sizing scale</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">✅ Gold Accent Usage</h4>
          <p className="text-caption text-muted">Verification badges, like states, and hover effects use gold sparingly</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">✅ Motion System</h4>
          <p className="text-caption text-muted">Like animations use 180ms timing with HIVE brand curves</p>
        </div>
      </div>
      
      <PostCard {...(LikedPost.args as PostCardProps)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validates that the component follows all HIVE design system rules',
      },
    },
  },
};