import type { Meta, StoryObj } from '@storybook/react';
import { FeedPostCard } from './feed-post-card';

const meta = {
  title: '04-Feed/FeedPostCard',
  component: FeedPostCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Feed Post Card displays a single post in the feed. ' +
          'Shows author info, content (text/media), and engagement actions. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'image', 'video', 'link', 'event', 'poll'],
    },
    variant: {
      control: 'select',
      options: ['default', 'highlighted'],
    },
    size: {
      control: 'select',
      options: ['default', 'full'],
    },
  },
} satisfies Meta<typeof FeedPostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authorName: 'Jane Doe',
    authorHandle: '@janedoe',
    timestamp: '2h ago',
    spaceName: 'UB Computer Science',
    textContent:
      'Just finished my ML project! Really excited to share what we built.',
    likeCount: 24,
    commentCount: 5,
    shareCount: 2,
  },
};

export const TextOnly: Story = {
  args: {
    authorName: 'John Smith',
    authorHandle: '@jsmith',
    timestamp: '5m ago',
    spaceName: 'Campus News',
    contentType: 'text',
    textContent:
      'Quick reminder: Library closes at 10pm tonight! Get your studying in early.',
    likeCount: 12,
    commentCount: 3,
  },
};

export const WithSingleImage: Story = {
  args: {
    authorName: 'Sarah Johnson',
    authorHandle: '@sarahj',
    timestamp: '1h ago',
    spaceName: 'UB Photography Club',
    contentType: 'image',
    textContent: 'Sunrise at Lake LaSalle this morning 🌅',
    images: ['image1.jpg'],
    likeCount: 89,
    commentCount: 12,
    shareCount: 4,
  },
};

export const WithMultipleImages: Story = {
  args: {
    authorName: 'Mike Chen',
    authorHandle: '@mikechen',
    timestamp: '3h ago',
    spaceName: 'Campus Events',
    contentType: 'image',
    textContent: 'Amazing turnout at Fallest! Here are some highlights',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
    likeCount: 156,
    commentCount: 28,
    shareCount: 15,
  },
};

export const WithVideo: Story = {
  args: {
    authorName: 'Alex Rivera',
    authorHandle: '@arivera',
    timestamp: '45m ago',
    spaceName: 'UB Dance Team',
    contentType: 'video',
    textContent: 'Practice highlights from today! We\'re ready for the competition 💪',
    videoUrl: 'video.mp4',
    likeCount: 67,
    commentCount: 14,
  },
};

export const WithLinkPreview: Story = {
  args: {
    authorName: 'Emily Brown',
    authorHandle: '@emilybrown',
    timestamp: '2h ago',
    spaceName: 'Study Resources',
    contentType: 'link',
    textContent: 'Found this amazing resource for studying algorithms!',
    linkPreview: {
      title: 'Visualizing Algorithms',
      description:
        'Interactive visualizations of common algorithms and data structures',
      url: 'https://example.com',
    },
    likeCount: 43,
    commentCount: 8,
    shareCount: 21,
  },
};

export const WithEvent: Story = {
  args: {
    authorName: 'Campus Activities',
    authorHandle: '@ubactivities',
    timestamp: '1h ago',
    spaceName: 'Official UB',
    contentType: 'event',
    textContent: 'Join us for the annual Career Fair!',
    likeCount: 234,
    commentCount: 45,
    shareCount: 89,
  },
};

export const WithPoll: Story = {
  args: {
    authorName: 'Student Government',
    authorHandle: '@ubsg',
    timestamp: '4h ago',
    spaceName: 'UB Student Government',
    contentType: 'poll',
    textContent: 'What should our next campus event be?',
    likeCount: 78,
    commentCount: 22,
  },
};

export const Liked: Story = {
  args: {
    authorName: 'David Lee',
    authorHandle: '@davidlee',
    timestamp: '30m ago',
    spaceName: 'Campus Memes',
    textContent: 'When you realize the final is tomorrow',
    likeCount: 234,
    commentCount: 45,
    shareCount: 12,
    isLiked: true,
  },
};

export const Highlighted: Story = {
  args: {
    variant: 'highlighted',
    authorName: 'Featured Post',
    authorHandle: '@featured',
    timestamp: '1d ago',
    spaceName: 'Important Announcements',
    textContent:
      'This is a highlighted/featured post that needs extra attention!',
    likeCount: 456,
    commentCount: 89,
    shareCount: 34,
  },
};

export const NoEngagement: Story = {
  args: {
    authorName: 'New User',
    authorHandle: '@newuser',
    timestamp: 'just now',
    spaceName: 'General',
    textContent: 'My first post on HIVE!',
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
  },
};

export const WithoutSpace: Story = {
  args: {
    authorName: 'Personal Post',
    authorHandle: '@user',
    timestamp: '1h ago',
    spaceName: undefined,
    textContent: 'This is a personal post not associated with any space',
    likeCount: 12,
    commentCount: 3,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load post. Please try again.',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-[600px]">
      <div>
        <h3 className="font-semibold mb-2">Text Only</h3>
        <FeedPostCard
          authorName="User Name"
          authorHandle="@username"
          spaceName="Space Name"
          textContent="Simple text post"
          likeCount={10}
          commentCount={2}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Image</h3>
        <FeedPostCard
          authorName="User Name"
          authorHandle="@username"
          contentType="image"
          textContent="Post with image"
          images={['img.jpg']}
          likeCount={25}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Liked State</h3>
        <FeedPostCard
          authorName="User Name"
          authorHandle="@username"
          textContent="Liked post"
          isLiked={true}
          likeCount={100}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedPostCard isLoading={true} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedPostCard error="Failed to load" />
      </div>
    </div>
  ),
};

export const AllContentTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-[600px]">
      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Text Post
        </h3>
        <FeedPostCard
          contentType="text"
          authorName="User"
          textContent="Text only post"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Image Post
        </h3>
        <FeedPostCard
          contentType="image"
          authorName="User"
          textContent="Post with image"
          images={['img.jpg']}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Video Post
        </h3>
        <FeedPostCard
          contentType="video"
          authorName="User"
          textContent="Post with video"
          videoUrl="video.mp4"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Link Post
        </h3>
        <FeedPostCard
          contentType="link"
          authorName="User"
          textContent="Post with link"
          linkPreview={{
            title: 'Link Title',
            description: 'Link description',
            url: 'https://example.com',
          }}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Event Post
        </h3>
        <FeedPostCard
          contentType="event"
          authorName="User"
          textContent="Event post"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-[var(--hive-text-primary)]">
          Poll Post
        </h3>
        <FeedPostCard
          contentType="poll"
          authorName="User"
          textContent="Poll question"
        />
      </div>
    </div>
  ),
};

export const MobileView: Story = {
  args: {
    size: 'full',
    authorName: 'Mobile User',
    authorHandle: '@mobileuser',
    spaceName: 'Mobile Space',
    textContent: 'This is how the post looks on mobile devices',
    likeCount: 42,
    commentCount: 7,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [liked, setLiked] = React.useState(false);
    const [likes, setLikes] = React.useState(24);
    const [comments, setComments] = React.useState(5);

    return (
      <div className="max-w-[600px]">
        <p className="mb-4 text-[var(--hive-text-secondary)] text-sm">
          Try clicking the action buttons below
        </p>
        <FeedPostCard
          authorName="Interactive Demo"
          authorHandle="@demo"
          spaceName="Demo Space"
          textContent="Click the like button to see the interaction!"
          likeCount={likes}
          commentCount={comments}
          isLiked={liked}
          onLike={() => {
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
          }}
          onComment={() => {
            setComments(comments + 1);
            alert('Comment button clicked! (Feature to be designed)');
          }}
          onShare={() => {
            alert('Share button clicked! (Feature to be designed)');
          }}
          onMenuClick={() => {
            alert('Menu button clicked! (Feature to be designed)');
          }}
        />
      </div>
    );
  },
};

// Import React for interactive demo
import React from 'react';
