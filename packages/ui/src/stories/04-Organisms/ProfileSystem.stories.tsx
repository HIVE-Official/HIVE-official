'use client';

import type { Meta, StoryObj } from '@storybook/react';
import {
  HiveCard,
  HiveCardContent,
  HiveCardHeader,
  HiveCardTitle,
  HiveButton,
  Badge,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../atomic/atoms';
import { ProfileBentoGrid } from '../../atomic/organisms/profile-bento-grid';
import { MessageCircle, UserPlus, Settings, MapPin, Calendar, GraduationCap, Users, Heart, BookOpen, Camera } from 'lucide-react';

const meta: Meta = {
  title: '04-Organisms/Profile System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete profile system with bento grid layout, social features, and campus-specific information display.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-hive-obsidian min-h-screen p-4 md:p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteProfile: Story = {
  render: () => (
    <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="mb-8">
        <HiveCard>
          <HiveCardContent className="p-0">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="-mt-16 relative">
                  <div className="w-32 h-32 bg-hive-gold rounded-full border-4 border-hive-obsidian flex items-center justify-center">
                    <span className="text-3xl font-bold text-hive-obsidian">AM</span>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-hive-gold rounded-full text-hive-obsidian hover:bg-yellow-400">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-hive-platinum">Alex Morgan</h1>
                      <p className="text-lg text-hive-platinum/70">@alex_morgan</p>
                      <div className="flex items-center gap-4 mt-2 text-hive-platinum/60">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>Business Admin '25</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Buffalo, NY</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined Sep 2024</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <HiveButton variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </HiveButton>
                      <HiveButton size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Friend
                      </HiveButton>
                      <HiveButton variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </HiveButton>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">156</div>
                      <div className="text-sm text-hive-platinum/60">Friends</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">12</div>
                      <div className="text-sm text-hive-platinum/60">Spaces</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">89</div>
                      <div className="text-sm text-hive-platinum/60">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">342</div>
                      <div className="text-sm text-hive-platinum/60">Likes</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mt-4">
                    <p className="text-hive-platinum/80">
                      Senior studying Business Administration with a focus on entrepreneurship.
                      Passionate about sustainability and campus life. Always down for coffee and good conversations! ☕
                    </p>
                  </div>

                  {/* Interests */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {['Entrepreneurship', 'Sustainability', 'Coffee', 'Photography', 'Travel', 'Music'].map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HiveCardContent>
        </HiveCard>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="spaces">Spaces</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid gap-6">
            {/* Recent Posts */}
            <HiveCard>
              <HiveCardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-hive-obsidian">AM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-hive-platinum">Alex Morgan</div>
                    <div className="text-sm text-hive-platinum/60">2 hours ago in Business Network</div>
                  </div>
                </div>
              </HiveCardHeader>
              <HiveCardContent>
                <p className="text-hive-platinum mb-4">
                  Just finished my presentation on sustainable business practices! Thanks to everyone who attended and asked great questions.
                  The future of business is definitely green 🌱
                </p>
                <div className="flex items-center gap-6 text-hive-platinum/60">
                  <button className="flex items-center gap-2 hover:text-hive-gold">
                    <Heart className="h-4 w-4" />
                    <span>23</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-hive-gold">
                    <MessageCircle className="h-4 w-4" />
                    <span>5</span>
                  </button>
                </div>
              </HiveCardContent>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-hive-obsidian">AM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-hive-platinum">Alex Morgan</div>
                    <div className="text-sm text-hive-platinum/60">1 day ago in Campus Life</div>
                  </div>
                </div>
              </HiveCardHeader>
              <HiveCardContent>
                <p className="text-hive-platinum mb-4">
                  Coffee study session at Starbucks this afternoon! Bringing my accounting textbook and probably too much caffeine ☕📚
                </p>
                <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-hive-platinum/50">[Photo: Coffee and textbooks]</span>
                </div>
                <div className="flex items-center gap-6 text-hive-platinum/60">
                  <button className="flex items-center gap-2 hover:text-hive-gold">
                    <Heart className="h-4 w-4" />
                    <span>18</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-hive-gold">
                    <MessageCircle className="h-4 w-4" />
                    <span>3</span>
                  </button>
                </div>
              </HiveCardContent>
            </HiveCard>
          </div>
        </TabsContent>

        <TabsContent value="spaces" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Business Network', members: 234, role: 'Admin', color: 'from-blue-600 to-purple-600' },
              { name: 'Campus Life', members: 1456, role: 'Member', color: 'from-green-600 to-teal-600' },
              { name: 'Sustainability Club', members: 89, role: 'Moderator', color: 'from-emerald-600 to-cyan-600' },
              { name: 'Coffee Lovers', members: 156, role: 'Member', color: 'from-amber-600 to-orange-600' },
              { name: 'UB Photography', members: 203, role: 'Member', color: 'from-pink-600 to-rose-600' },
              { name: 'Study Groups', members: 78, role: 'Member', color: 'from-indigo-600 to-blue-600' },
            ].map((space) => (
              <HiveCard key={space.name}>
                <HiveCardContent className="p-0">
                  <div className={`h-24 bg-gradient-to-r ${space.color} rounded-t-lg`}></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <HiveCardTitle className="text-lg">{space.name}</HiveCardTitle>
                      <Badge variant={space.role === 'Admin' ? 'default' : 'secondary'} className="text-xs">
                        {space.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-hive-platinum/60">
                      <Users className="h-4 w-4" />
                      <span>{space.members} members</span>
                    </div>
                  </div>
                </HiveCardContent>
              </HiveCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="friends" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Chen', handle: '@sarah_c', major: 'CS \'25', mutual: 12 },
              { name: 'Mike Rodriguez', handle: '@mike_r', major: 'Engineering \'24', mutual: 8 },
              { name: 'Emma Thompson', handle: '@emma_t', major: 'Psychology \'26', mutual: 15 },
              { name: 'James Kim', handle: '@james_k', major: 'Biology \'25', mutual: 6 },
              { name: 'Lisa Wang', handle: '@lisa_w', major: 'Business \'24', mutual: 20 },
              { name: 'David Park', handle: '@david_p', major: 'Art \'27', mutual: 4 },
            ].map((friend, index) => (
              <HiveCard key={friend.name}>
                <HiveCardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-hive-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-lg font-bold text-hive-obsidian">
                      {friend.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <HiveCardTitle className="text-base mb-1">{friend.name}</HiveCardTitle>
                  <p className="text-sm text-hive-platinum/60 mb-1">{friend.handle}</p>
                  <p className="text-sm text-hive-platinum/60 mb-3">{friend.major}</p>
                  <p className="text-xs text-hive-platinum/50 mb-3">{friend.mutual} mutual friends</p>
                  <HiveButton size="sm" className="w-full">
                    <MessageCircle className="h-3 w-3 mr-2" />
                    Message
                  </HiveButton>
                </HiveCardContent>
              </HiveCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-hive-platinum/50">Photo {index + 1}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <HiveCard>
              <HiveCardHeader>
                <HiveCardTitle>Academic Information</HiveCardTitle>
              </HiveCardHeader>
              <HiveCardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Major</div>
                  <div className="text-hive-platinum">Business Administration</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Minor</div>
                  <div className="text-hive-platinum">Environmental Studies</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Graduation Year</div>
                  <div className="text-hive-platinum">Class of 2025</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">GPA</div>
                  <div className="text-hive-platinum">3.7 / 4.0</div>
                </div>
              </HiveCardContent>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader>
                <HiveCardTitle>Contact Information</HiveCardTitle>
              </HiveCardHeader>
              <HiveCardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Email</div>
                  <div className="text-hive-platinum">alex.morgan@buffalo.edu</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Phone</div>
                  <div className="text-hive-platinum">+1 (716) 555-0123</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Location</div>
                  <div className="text-hive-platinum">Buffalo, NY</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-hive-platinum/60">Residence</div>
                  <div className="text-hive-platinum">Ellicott Complex</div>
                </div>
              </HiveCardContent>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader>
                <HiveCardTitle>Interests & Activities</HiveCardTitle>
              </HiveCardHeader>
              <HiveCardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-hive-platinum/60 mb-2">Clubs & Organizations</div>
                    <div className="flex flex-wrap gap-2">
                      {['Sustainability Club', 'Business Society', 'Photography Club'].map((club) => (
                        <Badge key={club} variant="outline">
                          {club}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-hive-platinum/60 mb-2">Hobbies</div>
                    <div className="flex flex-wrap gap-2">
                      {['Photography', 'Coffee', 'Travel', 'Reading', 'Hiking'].map((hobby) => (
                        <Badge key={hobby} variant="secondary">
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </HiveCardContent>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader>
                <HiveCardTitle>Recent Activity</HiveCardTitle>
              </HiveCardHeader>
              <HiveCardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-hive-gold" />
                  <div className="flex-1">
                    <div className="text-sm text-hive-platinum">Joined Study Groups</div>
                    <div className="text-xs text-hive-platinum/60">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-hive-gold" />
                  <div className="flex-1">
                    <div className="text-sm text-hive-platinum">Liked a post in Business Network</div>
                    <div className="text-xs text-hive-platinum/60">4 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-hive-gold" />
                  <div className="flex-1">
                    <div className="text-sm text-hive-platinum">Added 3 new friends</div>
                    <div className="text-xs text-hive-platinum/60">1 day ago</div>
                  </div>
                </div>
              </HiveCardContent>
            </HiveCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete profile page with cover photo, avatar, stats, tabs, and detailed content sections.',
      },
    },
  },
};

export const ProfileBentoLayout: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto">
      <ProfileBentoGrid
        user={{
          id: '1',
          name: 'Alex Morgan',
          handle: 'alex_morgan',
          email: 'alex.morgan@buffalo.edu',
          avatar: '',
          bio: 'Senior studying Business Administration with a focus on entrepreneurship.',
          major: 'Business Administration',
          graduationYear: '2025',
          location: 'Buffalo, NY',
          interests: ['Entrepreneurship', 'Sustainability', 'Coffee', 'Photography'],
          stats: {
            friends: 156,
            spaces: 12,
            posts: 89,
            likes: 342,
          },
          isOnline: true,
          joinedAt: new Date('2021-09-01'),
        }}
        isOwnProfile={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bento grid layout for profile information with responsive design and campus-specific widgets.',
      },
    },
  },
};

export const MobileProfile: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <HiveCard>
        <HiveCardContent className="p-4">
          {/* Mobile-optimized profile header */}
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-hive-gold rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl font-bold text-hive-obsidian">AM</span>
            </div>
            <HiveCardTitle className="text-xl mb-1">Alex Morgan</HiveCardTitle>
            <p className="text-hive-platinum/70">@alex_morgan</p>
            <p className="text-sm text-hive-platinum/60">Business Admin '25</p>
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-hive-gold">156</div>
              <div className="text-xs text-hive-platinum/60">Friends</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-hive-gold">12</div>
              <div className="text-xs text-hive-platinum/60">Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-hive-gold">89</div>
              <div className="text-xs text-hive-platinum/60">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-hive-gold">342</div>
              <div className="text-xs text-hive-platinum/60">Likes</div>
            </div>
          </div>

          {/* Mobile bio */}
          <p className="text-sm text-hive-platinum/80 mb-4 text-center">
            Senior studying Business Administration. Passionate about sustainability and campus life! ☕
          </p>

          {/* Mobile actions */}
          <div className="flex gap-2">
            <HiveButton size="sm" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </HiveButton>
            <HiveButton variant="outline" size="sm" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Friend
            </HiveButton>
          </div>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized profile card with condensed information and touch-friendly actions.',
      },
    },
  },
};