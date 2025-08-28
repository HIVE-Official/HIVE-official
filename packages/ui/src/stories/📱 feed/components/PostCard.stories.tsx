import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '../../../components/feed/post-card';

const meta: Meta<typeof PostCard> = {
  title: '📱 Feed/Components/PostCard',
  component: PostCard,
  parameters: {
    docs: {
      description: {
        component: 'Individual post cards for the HIVE campus feed.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    post: {
      id: 'post-1',
      author: {
        name: 'Sarah Chen',
        handle: '@sarah_chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
      },
      content: 'Just finished building a study group matcher for CS 250! It automatically pairs students based on availability and strengths. Try it out and let me know what you think! 🚀',
      timestamp: '2h ago',
      space: {
        name: 'UB Computer Science',
        id: 'ub-cs',
      },
      engagement: {
        likes: 12,
        comments: 3,
        shares: 1,
      },
      tags: ['#HiveLab', '#CS250', '#StudyTools'],
    },
  },
};

export const WithMedia: Story = {
  args: {
    post: {
      id: 'post-2',
      author: {
        name: 'Alex Rodriguez',
        handle: '@alex_codes',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true,
      },
      content: 'Our robotics team just won first place at the regional competition! Couldn\'t have done it without the amazing collaboration tools we built in HIVE. Team coordination made all the difference! 🤖🏆',
      timestamp: '4h ago',
      space: {
        name: 'UB Robotics Club',
        id: 'ub-robotics',
      },
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop',
        alt: 'Robotics competition trophy',
      },
      engagement: {
        likes: 47,
        comments: 12,
        shares: 8,
      },
      tags: ['#Robotics', '#Competition', '#TeamWork'],
    },
  },
};

export const ToolAnnouncement: Story = {
  args: {
    post: {
      id: 'post-3',
      author: {
        name: 'Emma Wilson',
        handle: '@emma_builds',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b667c99a?w=150&h=150&fit=crop&crop=face',
        verified: false,
      },
      content: 'New tool alert! 🛠️ Just deployed a laundry tracker for our dorm floor. No more wondering if machines are free - get real-time notifications when your preferred machines are available!',
      timestamp: '6h ago',
      space: {
        name: 'Governors 5th Floor',
        id: 'governors-5th',
      },
      engagement: {
        likes: 23,
        comments: 7,
        shares: 4,
      },
      tags: ['#DormLife', '#LaundryTracker', '#HiveLab'],
      toolAttachment: {
        name: 'Laundry Tracker',
        description: 'Real-time washing machine availability',
        icon: '🧺',
        usageCount: 15,
      },
    },
  },
};

export const EventCoordination: Story = {
  args: {
    post: {
      id: 'post-4',
      author: {
        name: 'Mike Johnson',
        handle: '@mike_organizes',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
      },
      content: 'Study session for tomorrow\'s Calc 2 exam! 📚 Using our group study planner to coordinate. We have spots for 3 more people - join if you need help with integration techniques!',
      timestamp: '1h ago',
      space: {
        name: 'Calc 2 Study Group',
        id: 'calc-2-study',
      },
      engagement: {
        likes: 8,
        comments: 5,
        shares: 2,
      },
      tags: ['#StudyGroup', '#Calc2', '#Exam'],
      eventAttachment: {
        title: 'Calc 2 Study Session',
        date: 'Tomorrow 7:00 PM',
        location: 'Library Group Room B',
        attendees: 7,
        capacity: 10,
      },
    },
  },
};

export const CampusFeedMobile: Story = {
  name: 'Campus Feed Mobile View',
  render: () => (
    <div className="max-w-sm mx-auto space-y-4 p-4 bg-gray-50">
      <div className="bg-white rounded-lg">
        <PostCard
          post={{
            id: 'mobile-1',
            author: {
              name: 'Sarah Chen',
              handle: '@sarah_chen',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            },
            content: 'CS 250 study group forming! Need 2 more people for project collaboration.',
            timestamp: '30m ago',
            space: { name: 'UB Computer Science', id: 'ub-cs' },
            engagement: { likes: 5, comments: 2, shares: 1 },
          }}
        />
      </div>
      
      <div className="bg-white rounded-lg">
        <PostCard
          post={{
            id: 'mobile-2',
            author: {
              name: 'Alex Rodriguez',
              handle: '@alex_codes',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            },
            content: 'New laundry app is working great! No more trips to check machines 🎉',
            timestamp: '1h ago',
            space: { name: 'Ellicott Complex', id: 'ellicott' },
            engagement: { likes: 12, comments: 4, shares: 0 },
            toolAttachment: {
              name: 'Laundry Tracker',
              description: 'Check machine availability',
              icon: '🧺',
              usageCount: 28,
            },
          }}
        />
      </div>
    </div>
  ),
};