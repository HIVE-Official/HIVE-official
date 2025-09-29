'use client';

import type { Meta, StoryObj } from '@storybook/react';
import {
  HiveCard,
  HiveCardContent,
  HiveCardHeader,
  HiveCardTitle,
  HiveButton,
  HiveInput,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../atomic/atoms';
import { Search, Filter, TrendingUp, Users, Heart, MessageCircle, Share, MoreVertical, Plus, Image, MapPin } from 'lucide-react';

const meta: Meta = {
  title: '07-Complete-Systems/Feed System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete campus feed system with asymmetric layouts, real-time updates, and social interactions optimized for college life.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-hive-obsidian min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const PostCard = ({
  author,
  content,
  space,
  timeAgo,
  likes,
  comments,
  hasImage = false,
  size = 'normal'
}: {
  author: { name: string; handle: string; avatar: string };
  content: string;
  space: string;
  timeAgo: string;
  likes: number;
  comments: number;
  hasImage?: boolean;
  size?: 'normal' | 'large' | 'compact';
}) => (
  <HiveCard className={size === 'large' ? 'row-span-2' : size === 'compact' ? 'h-fit' : ''}>
    <HiveCardHeader className="flex flex-row items-center space-y-0 pb-3">
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-hive-obsidian">
            {author.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-hive-platinum truncate">{author.name}</div>
          <div className="text-sm text-hive-platinum/60">
            {timeAgo} in {space}
          </div>
        </div>
      </div>
      <button className="text-hive-platinum/60 hover:text-hive-gold">
        <MoreVertical className="h-4 w-4" />
      </button>
    </HiveCardHeader>
    <HiveCardContent>
      <p className="text-hive-platinum mb-4 leading-relaxed">{content}</p>
      {hasImage && (
        <div className={`w-full ${size === 'large' ? 'h-64' : 'h-32'} bg-slate-800 rounded-lg mb-4 flex items-center justify-center`}>
          <span className="text-hive-platinum/50">[Image content]</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-red-400 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold transition-colors">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </HiveCardContent>
  </HiveCard>
);

const SpaceCard = ({ name, members, color, description }: {
  name: string;
  members: number;
  color: string;
  description: string;
}) => (
  <HiveCard className="h-fit">
    <HiveCardContent className="p-0">
      <div className={`h-20 bg-gradient-to-r ${color} rounded-t-lg`}></div>
      <div className="p-4">
        <HiveCardTitle className="text-base mb-2">{name}</HiveCardTitle>
        <p className="text-sm text-hive-platinum/70 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-hive-platinum/60">
            <Users className="h-3 w-3" />
            <span>{members}</span>
          </div>
          <HiveButton size="sm" variant="outline">Join</HiveButton>
        </div>
      </div>
    </HiveCardContent>
  </HiveCard>
);

export const CompleteFeedLayout: Story = {
  render: () => (
    <div className="min-h-screen">
      {/* Top Navigation Space */}
      <div className="sticky top-0 z-10 bg-hive-obsidian/95 backdrop-blur-sm border-b border-hive-platinum/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-hive-gold">Campus Feed</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
              <HiveInput
                placeholder="Search posts, spaces, people..."
                className="pl-10 w-80"
              />
            </div>
            <HiveButton size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Post
            </HiveButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="spaces">My Spaces</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Asymmetric Masonry Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Feed - Large Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* Post Creation */}
                <HiveCard>
                  <HiveCardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-hive-obsidian">YU</span>
                      </div>
                      <div className="flex-1">
                        <HiveInput
                          placeholder="What's happening on campus?"
                          className="mb-3"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold">
                              <Image className="h-4 w-4" />
                              <span className="text-sm">Photo</span>
                            </button>
                            <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">Location</span>
                            </button>
                          </div>
                          <HiveButton size="sm">Post</HiveButton>
                        </div>
                      </div>
                    </div>
                  </HiveCardContent>
                </HiveCard>

                {/* Feed Posts */}
                <PostCard
                  author={{ name: 'Sarah Chen', handle: '@sarah_c', avatar: '' }}
                  content="Just finished my CS 250 project and I'm honestly proud of what I built! 💻 A full-stack app that helps students find study groups. Anyone interested in collaborating on more projects this semester?"
                  space="CS Study Hub"
                  timeAgo="2h ago"
                  likes={34}
                  comments={8}
                  hasImage={true}
                  size="large"
                />

                <PostCard
                  author={{ name: 'Mike Rodriguez', handle: '@mike_r', avatar: '' }}
                  content="Coffee run to Starbucks before my 2pm lecture. Anyone want anything? ☕"
                  space="Campus Life"
                  timeAgo="45m ago"
                  likes={12}
                  comments={5}
                />

                <PostCard
                  author={{ name: 'Emma Thompson', handle: '@emma_t', avatar: '' }}
                  content="PSA: The library's third floor is perfect for group study right now. Not too crowded and all the whiteboards are available! 📚"
                  space="Study Spots"
                  timeAgo="1h ago"
                  likes={28}
                  comments={6}
                />

                <PostCard
                  author={{ name: 'Alex Morgan', handle: '@alex_morgan', avatar: '' }}
                  content="Sustainability fair this Friday in the Student Union! Come learn about eco-friendly initiatives on campus and how you can get involved 🌱"
                  space="Green Campus"
                  timeAgo="3h ago"
                  likes={45}
                  comments={12}
                  hasImage={true}
                />
              </div>

              {/* Sidebar - Smaller Column */}
              <div className="lg:col-span-4 space-y-6">
                {/* Trending Topics */}
                <HiveCard>
                  <HiveCardHeader>
                    <HiveCardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-hive-gold" />
                      Trending on Campus
                    </HiveCardTitle>
                  </HiveCardHeader>
                  <HiveCardContent className="space-y-3">
                    {[
                      { topic: '#MidtermSeason', posts: '234 posts' },
                      { topic: '#CampusEats', posts: '156 posts' },
                      { topic: '#StudyGroup', posts: '89 posts' },
                      { topic: '#UBFootball', posts: '67 posts' },
                      { topic: '#WeekendPlans', posts: '45 posts' },
                    ].map((trend) => (
                      <div key={trend.topic} className="flex items-center justify-between py-2">
                        <div>
                          <div className="font-medium text-hive-gold">{trend.topic}</div>
                          <div className="text-sm text-hive-platinum/60">{trend.posts}</div>
                        </div>
                      </div>
                    ))}
                  </HiveCardContent>
                </HiveCard>

                {/* Suggested Spaces */}
                <HiveCard>
                  <HiveCardHeader>
                    <HiveCardTitle>Discover Spaces</HiveCardTitle>
                  </HiveCardHeader>
                  <HiveCardContent className="space-y-4">
                    <SpaceCard
                      name="UB Photography"
                      members={203}
                      color="from-pink-600 to-rose-600"
                      description="Share your campus photography and learn from fellow photographers"
                    />
                    <SpaceCard
                      name="Intramural Sports"
                      members={456}
                      color="from-green-600 to-teal-600"
                      description="Join teams, find pickup games, and stay active on campus"
                    />
                    <SpaceCard
                      name="Food Reviews"
                      members={789}
                      color="from-orange-600 to-red-600"
                      description="Rate and discover the best food spots around campus"
                    />
                  </HiveCardContent>
                </HiveCard>

                {/* Quick Events */}
                <HiveCard>
                  <HiveCardHeader>
                    <HiveCardTitle>Upcoming Events</HiveCardTitle>
                  </HiveCardHeader>
                  <HiveCardContent className="space-y-3">
                    {[
                      { name: 'Study Hall Night', time: 'Tonight 8PM', attendees: 23 },
                      { name: 'Campus Cleanup', time: 'Sat 10AM', attendees: 45 },
                      { name: 'Movie Night', time: 'Fri 7PM', attendees: 67 },
                    ].map((event) => (
                      <div key={event.name} className="p-3 bg-slate-900/50 rounded-lg">
                        <div className="font-medium text-hive-platinum">{event.name}</div>
                        <div className="text-sm text-hive-platinum/60">{event.time}</div>
                        <div className="text-sm text-hive-gold">{event.attendees} going</div>
                      </div>
                    ))}
                  </HiveCardContent>
                </HiveCard>

                {/* Quick Stats */}
                <HiveCard>
                  <HiveCardHeader>
                    <HiveCardTitle>Your Activity</HiveCardTitle>
                  </HiveCardHeader>
                  <HiveCardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xl font-bold text-hive-gold">12</div>
                        <div className="text-sm text-hive-platinum/60">Posts</div>
                      </div>
                      <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xl font-bold text-hive-gold">156</div>
                        <div className="text-sm text-hive-platinum/60">Likes</div>
                      </div>
                      <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xl font-bold text-hive-gold">8</div>
                        <div className="text-sm text-hive-platinum/60">Spaces</div>
                      </div>
                      <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xl font-bold text-hive-gold">34</div>
                        <div className="text-sm text-hive-platinum/60">Friends</div>
                      </div>
                    </div>
                  </HiveCardContent>
                </HiveCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <PostCard
                author={{ name: 'Campus Events', handle: '@ub_events', avatar: '' }}
                content="🔥 TRENDING: Fall Festival this weekend! Food trucks, live music, and student org booths. Don't miss the biggest campus event of the semester!"
                space="Official UB"
                timeAgo="1h ago"
                likes={156}
                comments={45}
                hasImage={true}
              />
              <PostCard
                author={{ name: 'Study Tips', handle: '@study_guru', avatar: '' }}
                content="Viral study method going around campus: The Pomodoro Technique + collaborative note-taking. Has anyone tried this? Drop your results below! 📚⏰"
                space="Academic Success"
                timeAgo="3h ago"
                likes={89}
                comments={23}
              />
              <PostCard
                author={{ name: 'Food Reviews', handle: '@ub_eats', avatar: '' }}
                content="This new bubble tea place near South Campus is AMAZING! 🧋 Already has a line around the block. Worth the wait though!"
                space="Food & Dining"
                timeAgo="2h ago"
                likes={234}
                comments={67}
                hasImage={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="following">
            <div className="space-y-6">
              <PostCard
                author={{ name: 'Sarah Chen', handle: '@sarah_c', avatar: '' }}
                content="Late night coding session in the library. The wifi is surprisingly good on the 5th floor! Who else is pulling an all-nighter?"
                space="CS Study Hub"
                timeAgo="30m ago"
                likes={18}
                comments={7}
              />
              <PostCard
                author={{ name: 'Alex Morgan', handle: '@alex_morgan', avatar: '' }}
                content="Just submitted my final business plan for entrepreneurship class! Feeling nervous but excited. Thanks to everyone who gave me feedback 💼"
                space="Business Network"
                timeAgo="1h ago"
                likes={42}
                comments={11}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete feed system with asymmetric layout, trending content, space discovery, and real-time campus activity.',
      },
    },
  },
};

export const MobileFeed: Story = {
  render: () => (
    <div className="max-w-md mx-auto min-h-screen">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-hive-obsidian/95 backdrop-blur-sm border-b border-hive-platinum/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-hive-gold">Feed</h1>
          <HiveButton size="sm">
            <Plus className="h-4 w-4" />
          </HiveButton>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
          <HiveInput
            placeholder="Search..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Mobile Post Creation */}
        <HiveCard>
          <HiveCardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-hive-gold rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-hive-obsidian">YU</span>
              </div>
              <HiveInput
                placeholder="What's happening?"
                className="flex-1"
                size="sm"
              />
            </div>
          </HiveCardContent>
        </HiveCard>

        {/* Mobile Feed Posts */}
        <PostCard
          author={{ name: 'Sarah Chen', handle: '@sarah_c', avatar: '' }}
          content="Just finished my CS project! Anyone want to see the demo? 💻"
          space="CS Study Hub"
          timeAgo="2h ago"
          likes={34}
          comments={8}
          size="compact"
        />

        <PostCard
          author={{ name: 'Mike Rodriguez', handle: '@mike_r', avatar: '' }}
          content="Coffee run before class ☕ DM me your order!"
          space="Campus Life"
          timeAgo="45m ago"
          likes={12}
          comments={5}
          size="compact"
        />

        <PostCard
          author={{ name: 'Emma Thompson', handle: '@emma_t', avatar: '' }}
          content="Library 3rd floor = perfect study spot right now! 📚"
          space="Study Spots"
          timeAgo="1h ago"
          likes={28}
          comments={6}
          size="compact"
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized feed with condensed posts and touch-friendly interactions.',
      },
    },
  },
};