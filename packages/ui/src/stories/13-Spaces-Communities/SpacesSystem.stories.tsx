'use client';

import type { Meta, StoryObj } from '@storybook/react';
import {
  HiveCard,
  HiveCardContent,
  HiveCardHeader,
  HiveCardTitle,
  HiveCardDescription,
  HiveCardFooter,
  HiveButton,
  HiveInput,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../atomic/atoms';
import { Search, Users, Crown, Shield, User, Heart, MessageCircle, Share, Settings, Plus, Filter, TrendingUp, Calendar, MapPin } from 'lucide-react';

const meta: Meta = {
  title: '13-Spaces-Communities/Spaces System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete spaces and communities system for campus organization, discovery, and social interaction.',
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

const SpaceCard = ({
  name,
  description,
  members,
  posts,
  color,
  isJoined = false,
  role,
  isPrivate = false,
  recentActivity
}: {
  name: string;
  description: string;
  members: number;
  posts: number;
  color: string;
  isJoined?: boolean;
  role?: 'member' | 'moderator' | 'admin';
  isPrivate?: boolean;
  recentActivity?: string;
}) => (
  <HiveCard>
    <HiveCardContent className="p-0">
      <div className={`h-32 bg-gradient-to-r ${color} rounded-t-lg relative`}>
        <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
        {isPrivate && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/50 border-none text-white">
              Private
            </Badge>
          </div>
        )}
        {role && (
          <div className="absolute top-3 left-3">
            <Badge
              variant={role === 'admin' ? 'default' : 'secondary'}
              className={role === 'admin' ? 'bg-hive-gold text-hive-obsidian' : ''}
            >
              {role === 'admin' && <Crown className="h-3 w-3 mr-1" />}
              {role === 'moderator' && <Shield className="h-3 w-3 mr-1" />}
              {role === 'member' && <User className="h-3 w-3 mr-1" />}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <HiveCardTitle className="text-lg">{name}</HiveCardTitle>
          <button className="text-hive-platinum/60 hover:text-hive-gold">
            <Settings className="h-4 w-4" />
          </button>
        </div>
        <HiveCardDescription className="mb-4 line-clamp-2">
          {description}
        </HiveCardDescription>

        <div className="flex items-center gap-4 mb-4 text-sm text-hive-platinum/60">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{members} members</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{posts} posts</span>
          </div>
        </div>

        {recentActivity && (
          <div className="text-xs text-hive-platinum/50 mb-4">
            {recentActivity}
          </div>
        )}

        <div className="flex gap-2">
          {isJoined ? (
            <>
              <HiveButton size="sm" className="flex-1">View Space</HiveButton>
              <HiveButton variant="outline" size="sm">Leave</HiveButton>
            </>
          ) : (
            <>
              <HiveButton size="sm" className="flex-1">Join Space</HiveButton>
              <HiveButton variant="outline" size="sm">Preview</HiveButton>
            </>
          )}
        </div>
      </div>
    </HiveCardContent>
  </HiveCard>
);

export const SpacesDiscovery: Story = {
  render: () => (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-hive-gold mb-2">Discover Spaces</h1>
            <p className="text-hive-platinum/70">Find communities that match your interests and campus life</p>
          </div>
          <HiveButton>
            <Plus className="h-4 w-4 mr-2" />
            Create Space
          </HiveButton>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
            <HiveInput
              placeholder="Search spaces by name, topic, or description..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <HiveButton variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </HiveButton>
            <HiveButton variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </HiveButton>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'All Spaces',
            'Academic',
            'Social',
            'Sports',
            'Clubs',
            'Study Groups',
            'Food & Dining',
            'Events',
            'Housing',
            'Local'
          ].map((category) => (
            <Badge
              key={category}
              variant={category === 'All Spaces' ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-hive-gold hover:text-hive-obsidian"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="joined">My Spaces</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="discover">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SpaceCard
              name="CS Study Hub"
              description="Late-night coding sessions, algorithm practice, and moral support for Computer Science majors. We share resources, form study groups, and help each other succeed."
              members={234}
              posts={1456}
              color="from-blue-600 to-purple-600"
              recentActivity="12 posts today"
            />
            <SpaceCard
              name="Campus Life"
              description="Everything happening around campus! From dining hall reviews to event announcements, this is your go-to for staying connected with campus life."
              members={1823}
              posts={5678}
              color="from-green-600 to-teal-600"
              recentActivity="45 posts today"
            />
            <SpaceCard
              name="UB Housing & Roommates"
              description="Find roommates, share housing tips, review dorms and apartments. Whether you're looking for someone to split rent or just want to vent about your RA."
              members={567}
              posts={2340}
              color="from-orange-600 to-red-600"
              isPrivate={true}
              recentActivity="8 posts today"
            />
            <SpaceCard
              name="Food & Dining Reviews"
              description="Rate campus dining, discover local restaurants, share food photos, and find dining companions. From Tim Hortons to fancy date spots."
              members={891}
              posts={3245}
              color="from-pink-600 to-rose-600"
              recentActivity="23 posts today"
            />
            <SpaceCard
              name="Sustainability Club"
              description="Making campus greener one initiative at a time. Join us for cleanups, sustainability projects, and environmental awareness events."
              members={156}
              posts={678}
              color="from-emerald-600 to-cyan-600"
              recentActivity="3 posts today"
            />
            <SpaceCard
              name="Intramural Sports"
              description="Find teams, organize pickup games, share scores and highlights. All skill levels welcome - from casual to competitive players."
              members={734}
              posts={1890}
              color="from-indigo-600 to-blue-600"
              recentActivity="15 posts today"
            />
          </div>
        </TabsContent>

        <TabsContent value="joined">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SpaceCard
              name="Business Network"
              description="Connect with fellow business students, share internship opportunities, and discuss case studies."
              members={345}
              posts={1234}
              color="from-blue-600 to-purple-600"
              isJoined={true}
              role="admin"
              recentActivity="You posted 2 hours ago"
            />
            <SpaceCard
              name="Campus Life"
              description="Everything happening around campus! Events, dining, and general campus discussion."
              members={1823}
              posts={5678}
              color="from-green-600 to-teal-600"
              isJoined={true}
              role="member"
              recentActivity="Last active 3 hours ago"
            />
            <SpaceCard
              name="Photography Club"
              description="Share your campus photography, get feedback, and organize photo walks around Buffalo."
              members={203}
              posts={891}
              color="from-pink-600 to-rose-600"
              isJoined={true}
              role="moderator"
              recentActivity="You liked 5 posts today"
            />
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SpaceCard
              name="Fall Festival Planning"
              description="Organize the biggest campus event of the semester! Volunteers needed for setup, coordination, and cleanup."
              members={89}
              posts={234}
              color="from-amber-600 to-orange-600"
              recentActivity="🔥 56 new members this week"
            />
            <SpaceCard
              name="Midterm Support Group"
              description="Survive midterm season together! Share study tips, vent about stress, and motivate each other through the toughest weeks."
              members={456}
              posts={1123}
              color="from-purple-600 to-pink-600"
              recentActivity="🔥 89 posts today"
            />
            <SpaceCard
              name="Buffalo Food Adventures"
              description="Explore Buffalo's amazing food scene! From wings to beef on weck, discover the best local eats with fellow students."
              members={234}
              posts={567}
              color="from-red-600 to-pink-600"
              recentActivity="🔥 23 new posts today"
            />
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SpaceCard
              name="New Student Questions"
              description="Just started at UB? Ask anything! From where to do laundry to which professors to take, we've got answers."
              members={123}
              posts={456}
              color="from-cyan-600 to-blue-600"
              recentActivity="Created 2 days ago"
            />
            <SpaceCard
              name="Study Abroad Returns"
              description="Share your study abroad experiences and help future students prepare for their adventures around the world."
              members={67}
              posts={189}
              color="from-green-600 to-emerald-600"
              recentActivity="Created 1 week ago"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete spaces discovery interface with search, filtering, categories, and different views for exploring campus communities.',
      },
    },
  },
};

export const SpaceDetailView: Story = {
  render: () => (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Space Header */}
      <HiveCard className="mb-6">
        <HiveCardContent className="p-0">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative rounded-t-lg">
            <div className="absolute inset-0 bg-black/30 rounded-t-lg"></div>
            <div className="absolute bottom-4 left-6 right-6">
              <h1 className="text-3xl font-bold text-white mb-2">CS Study Hub</h1>
              <p className="text-white/90">The ultimate destination for Computer Science students at UB</p>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                Public Space
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hive-gold">234</div>
                  <div className="text-sm text-hive-platinum/60">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hive-gold">1,456</div>
                  <div className="text-sm text-hive-platinum/60">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hive-gold">89</div>
                  <div className="text-sm text-hive-platinum/60">Online Now</div>
                </div>
              </div>
              <div className="flex gap-3">
                <HiveButton variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </HiveButton>
                <HiveButton>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </HiveButton>
              </div>
            </div>

            <p className="text-hive-platinum/80 mb-6">
              Late-night coding sessions, algorithm practice, and moral support for Computer Science majors.
              We share resources, form study groups, and help each other succeed in our academic journey.
              Whether you're struggling with data structures or celebrating a successful project deployment, this is your community.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Programming', 'Algorithms', 'Study Groups', 'Project Help', 'Career Prep', 'Internships'].map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </HiveCardContent>
      </HiveCard>

      {/* Space Content */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="posts">Recent Posts</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pinned Post */}
              <HiveCard className="border-hive-gold border-2">
                <HiveCardHeader className="flex flex-row items-center space-y-0 pb-3">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                      <Crown className="h-4 w-4 text-hive-obsidian" />
                    </div>
                    <div>
                      <div className="font-semibold text-hive-platinum">Prof. Johnson (Admin)</div>
                      <div className="text-sm text-hive-platinum/60">Pinned • 1 week ago</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-hive-gold text-hive-gold">
                    Pinned
                  </Badge>
                </HiveCardHeader>
                <HiveCardContent>
                  <p className="text-hive-platinum mb-4">
                    📋 <strong>Space Guidelines & Resources</strong><br/><br/>
                    Welcome to CS Study Hub! Please review our community guidelines and check out the pinned resources document.
                    Remember to be respectful, help your fellow students, and always cite your sources when sharing code solutions.
                  </p>
                  <div className="flex items-center space-x-6 text-hive-platinum/60">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>67</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>12</span>
                    </div>
                  </div>
                </HiveCardContent>
              </HiveCard>

              {/* Recent Posts */}
              <HiveCard>
                <HiveCardHeader className="flex flex-row items-center space-y-0 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-hive-obsidian">SC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-hive-platinum">Sarah Chen</div>
                      <div className="text-sm text-hive-platinum/60">@sarah_c • 2 hours ago</div>
                    </div>
                  </div>
                </HiveCardHeader>
                <HiveCardContent>
                  <p className="text-hive-platinum mb-4">
                    🎉 Just got my first internship offer! Thank you to everyone in this space who helped me with interview prep and resume reviews.
                    This community has been amazing for my growth as a developer. Happy to pay it forward and help other students! 💻
                  </p>
                  <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-hive-platinum/50">[Screenshot: Internship offer email]</span>
                  </div>
                  <div className="flex items-center space-x-6 text-hive-platinum/60">
                    <button className="flex items-center gap-2 hover:text-red-400">
                      <Heart className="h-4 w-4" />
                      <span>45</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-hive-gold">
                      <MessageCircle className="h-4 w-4" />
                      <span>18</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-hive-gold">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </HiveCardContent>
              </HiveCard>

              <HiveCard>
                <HiveCardHeader className="flex flex-row items-center space-y-0 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-hive-obsidian">MR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-hive-platinum">Mike Rodriguez</div>
                      <div className="text-sm text-hive-platinum/60">@mike_r • 4 hours ago</div>
                    </div>
                  </div>
                </HiveCardHeader>
                <HiveCardContent>
                  <p className="text-hive-platinum mb-4">
                    🤔 Anyone else struggling with the dynamic programming assignment in CS 350?
                    I understand the concept but implementing it efficiently is killing me. Would love to form a study group this weekend!
                  </p>
                  <div className="flex items-center space-x-6 text-hive-platinum/60">
                    <button className="flex items-center gap-2 hover:text-red-400">
                      <Heart className="h-4 w-4" />
                      <span>23</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-hive-gold">
                      <MessageCircle className="h-4 w-4" />
                      <span>15</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-hive-gold">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </HiveCardContent>
              </HiveCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Space Stats */}
              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Space Activity</HiveCardTitle>
                </HiveCardHeader>
                <HiveCardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-hive-platinum/70">Posts today</span>
                    <span className="font-semibold text-hive-gold">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-hive-platinum/70">Active members</span>
                    <span className="font-semibold text-hive-gold">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-hive-platinum/70">New members</span>
                    <span className="font-semibold text-hive-gold">12</span>
                  </div>
                </HiveCardContent>
              </HiveCard>

              {/* Online Members */}
              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Online Now (12)</HiveCardTitle>
                </HiveCardHeader>
                <HiveCardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Chen', status: 'Coding' },
                      { name: 'Mike Rodriguez', status: 'Studying' },
                      { name: 'Emma Thompson', status: 'Available' },
                      { name: 'James Kim', status: 'In Class' },
                    ].map((member) => (
                      <div key={member.name} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-hive-gold rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-hive-obsidian">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-hive-platinum">{member.name}</div>
                          <div className="text-xs text-hive-platinum/60">{member.status}</div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </HiveCardContent>
              </HiveCard>

              {/* Related Spaces */}
              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Related Spaces</HiveCardTitle>
                </HiveCardHeader>
                <HiveCardContent className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="font-medium text-hive-platinum">Web Development</div>
                    <div className="text-sm text-hive-platinum/60">156 members</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="font-medium text-hive-platinum">Data Science</div>
                    <div className="text-sm text-hive-platinum/60">89 members</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="font-medium text-hive-platinum">Career Prep</div>
                    <div className="text-sm text-hive-platinum/60">234 members</div>
                  </div>
                </HiveCardContent>
              </HiveCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HiveCard>
              <HiveCardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <HiveCardTitle>Algorithm Study Session</HiveCardTitle>
                    <HiveCardDescription>Tomorrow at 7:00 PM</HiveCardDescription>
                  </div>
                  <Badge variant="outline" className="border-hive-gold text-hive-gold">
                    Tomorrow
                  </Badge>
                </div>
              </HiveCardHeader>
              <HiveCardContent>
                <p className="text-hive-platinum/80 mb-4">
                  Focused study session on graph algorithms and dynamic programming. Bring your textbook and problem sets!
                </p>
                <div className="flex items-center space-x-4 text-sm text-hive-platinum/60 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Davis Hall, Room 101</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>12 going</span>
                  </div>
                </div>
              </HiveCardContent>
              <HiveCardFooter>
                <HiveButton className="w-full">I'm Going</HiveButton>
              </HiveCardFooter>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <HiveCardTitle>Hackathon Prep</HiveCardTitle>
                    <HiveCardDescription>Friday at 6:00 PM</HiveCardDescription>
                  </div>
                  <Badge variant="outline">
                    This Week
                  </Badge>
                </div>
              </HiveCardHeader>
              <HiveCardContent>
                <p className="text-hive-platinum/80 mb-4">
                  Get ready for the upcoming UB Hacks! We'll form teams, brainstorm ideas, and plan our tech stack.
                </p>
                <div className="flex items-center space-x-4 text-sm text-hive-platinum/60 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Student Union, Room 202</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>34 going</span>
                  </div>
                </div>
              </HiveCardContent>
              <HiveCardFooter>
                <HiveButton className="w-full">Join Event</HiveButton>
              </HiveCardFooter>
            </HiveCard>

            <HiveCard>
              <HiveCardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <HiveCardTitle>Career Fair Prep</HiveCardTitle>
                    <HiveCardDescription>Next Tuesday at 5:00 PM</HiveCardDescription>
                  </div>
                  <Badge variant="secondary">
                    Next Week
                  </Badge>
                </div>
              </HiveCardHeader>
              <HiveCardContent>
                <p className="text-hive-platinum/80 mb-4">
                  Practice interviewing, review resumes, and prepare for the engineering career fair. Bring printed resumes!
                </p>
                <div className="flex items-center space-x-4 text-sm text-hive-platinum/60 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Career Services Center</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>8 going</span>
                  </div>
                </div>
              </HiveCardContent>
              <HiveCardFooter>
                <HiveButton className="w-full" variant="outline">Maybe Going</HiveButton>
              </HiveCardFooter>
            </HiveCard>
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: 'Prof. Johnson', role: 'admin', major: 'Faculty', joined: '2 years ago' },
              { name: 'Sarah Chen', role: 'moderator', major: 'CS \'25', joined: '1 year ago' },
              { name: 'Mike Rodriguez', role: 'member', major: 'CS \'26', joined: '8 months ago' },
              { name: 'Emma Thompson', role: 'member', major: 'CS/Math \'24', joined: '1 year ago' },
              { name: 'James Kim', role: 'member', major: 'CS \'27', joined: '3 months ago' },
              { name: 'Lisa Wang', role: 'member', major: 'CS \'25', joined: '6 months ago' },
            ].map((member) => (
              <HiveCard key={member.name}>
                <HiveCardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-hive-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-lg font-bold text-hive-obsidian">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <HiveCardTitle className="text-base mb-1">{member.name}</HiveCardTitle>
                  <p className="text-sm text-hive-platinum/60 mb-2">{member.major}</p>
                  <Badge
                    variant={member.role === 'admin' ? 'default' : 'secondary'}
                    className={`mb-3 ${member.role === 'admin' ? 'bg-hive-gold text-hive-obsidian' : ''}`}
                  >
                    {member.role === 'admin' && <Crown className="h-3 w-3 mr-1" />}
                    {member.role === 'moderator' && <Shield className="h-3 w-3 mr-1" />}
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                  <p className="text-xs text-hive-platinum/50 mb-3">Joined {member.joined}</p>
                  <HiveButton size="sm" variant="outline" className="w-full">
                    View Profile
                  </HiveButton>
                </HiveCardContent>
              </HiveCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed space view with posts, member management, events, and community features.',
      },
    },
  },
};

export const SpaceCreation: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6">
      <HiveCard>
        <HiveCardHeader>
          <HiveCardTitle>Create a New Space</HiveCardTitle>
          <HiveCardDescription>
            Build a community around your interests and connect with fellow students
          </HiveCardDescription>
        </HiveCardHeader>
        <HiveCardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-hive-platinum mb-2 block">
              Space Name *
            </label>
            <HiveInput
              placeholder="e.g., CS Study Group, Photography Club, Food Reviews"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-hive-platinum mb-2 block">
              Description *
            </label>
            <textarea
              className="w-full p-3 bg-slate-900 border border-hive-platinum/20 rounded-lg text-hive-platinum placeholder-hive-platinum/50 focus:border-hive-gold focus:outline-none min-h-24"
              placeholder="What's this space about? What kind of content and discussions will happen here?"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-hive-platinum mb-2 block">
              Category
            </label>
            <select className="w-full p-3 bg-slate-900 border border-hive-platinum/20 rounded-lg text-hive-platinum focus:border-hive-gold focus:outline-none">
              <option value="">Select a category</option>
              <option value="academic">Academic & Study</option>
              <option value="social">Social & Events</option>
              <option value="sports">Sports & Recreation</option>
              <option value="clubs">Clubs & Organizations</option>
              <option value="housing">Housing & Roommates</option>
              <option value="food">Food & Dining</option>
              <option value="local">Local Buffalo</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-hive-platinum mb-2 block">
              Tags
            </label>
            <HiveInput
              placeholder="Add tags separated by commas (e.g., programming, algorithms, study)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-hive-platinum mb-2 block">
              Privacy Level
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="privacy" value="public" className="text-hive-gold" defaultChecked />
                <div>
                  <div className="font-medium text-hive-platinum">Public</div>
                  <div className="text-sm text-hive-platinum/60">Anyone can discover and join this space</div>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="privacy" value="invite" className="text-hive-gold" />
                <div>
                  <div className="font-medium text-hive-platinum">Invite Only</div>
                  <div className="text-sm text-hive-platinum/60">Members can only join with an invitation</div>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="privacy" value="private" className="text-hive-gold" />
                <div>
                  <div className="font-medium text-hive-platinum">Private</div>
                  <div className="text-sm text-hive-platinum/60">Space is hidden from search and discovery</div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="moderated" className="text-hive-gold" />
            <label htmlFor="moderated" className="text-sm text-hive-platinum">
              Enable post moderation (recommended for large spaces)
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <HiveButton variant="outline">Save as Draft</HiveButton>
            <HiveButton>Create Space</HiveButton>
          </div>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space creation form with privacy settings, categorization, and moderation options.',
      },
    },
  },
};