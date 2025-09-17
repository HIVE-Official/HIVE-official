import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../components/badge';
import { Input } from '../../components/input';
import { Avatar } from '../../components/avatar';
import { Users, Calendar, MessageCircle, Settings, Bell, Heart, Search, Filter, Plus } from 'lucide-react';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Tabs System

Clean, accessible tab navigation for tech social platform with minimal gold usage.

## Design Principles:
- **Tech Social Feel**: Clean, modern tab styling
- **Minimal Gold**: Gold only for active states and accents
- **Flexible Variants**: Multiple styles for different use cases
- **Accessible**: Full keyboard navigation and screen reader support

## Variants:
- **Default**: Contained tabs with background and border
- **Underline**: Clean underlined tabs for content sections
- **Pills**: Individual pill-style tabs with borders
- **Minimal**: Simple text-based tabs with gold accents

## Use Cases:
- Dashboard sections (Spaces, Feed, Profile)
- Settings categories
- Content organization
- Campus navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "dashboard",
    children: (
      <>
        <TabsList variant="primary">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="spaces">Spaces</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Campus Dashboard</CardTitle>
              <CardDescription>Your overview of campus activity and spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">Welcome to your campus dashboard. Here you can see recent activity, join spaces, and connect with other students.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="spaces">
          <Card>
            <CardHeader>
              <CardTitle>Your Spaces</CardTitle>
              <CardDescription>Study groups and communities you've joined</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">Manage your spaces, discover new communities, and see what's happening in your groups.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feed">
          <Card>
            <CardHeader>
              <CardTitle>Campus Feed</CardTitle>
              <CardDescription>Real-time activity from your network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">Stay updated with posts, events, and activities from students in your spaces and across campus.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your campus presence and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">Update your profile, adjust preferences, and control your privacy settings.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">HIVE Tabs System</h1>
          <p className="text-white/60">Flexible tab navigation for different contexts</p>
        </div>

        {/* Default Variant */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Default Tabs</h2>
            <p className="text-white/60 text-sm">Contained style with background and borders</p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="primary">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Campus Overview</h3>
                      <p className="text-white/60 text-sm">247 active students across 12 spaces</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Campus Analytics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border border-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent">87%</div>
                        <div className="text-sm text-white/60">Campus Energy</div>
                      </div>
                      <div className="text-center p-4 border border-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-white">24</div>
                        <div className="text-sm text-white/60">Active Spaces</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Campus Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Notifications</span>
                        <Button variant="ghost" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Privacy</span>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Underline Variant */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Underline Tabs</h2>
            <p className="text-white/60 text-sm">Clean underlined style for content sections</p>
          </div>
          
          <Tabs defaultValue="posts" className="w-full">
            <TabsList variant="underline">
              <TabsTrigger variant="underline" value="posts">Posts</TabsTrigger>
              <TabsTrigger variant="underline" value="events">Events</TabsTrigger>
              <TabsTrigger variant="underline" value="members">Members</TabsTrigger>
              <TabsTrigger variant="underline" value="tools">Tools</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Recent Posts</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i: any) => (
                    <Card key={i} variant="minimal">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white text-sm">Alex Chen</span>
                              <span className="text-white/40 text-xs">2h ago</span>
                            </div>
                            <p className="text-white/80 text-sm">Just finished the ML assignment! The neural network finally converged 🎉</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                              <button className="flex items-center gap-1 hover:text-accent">
                                <Heart className="w-3 h-3" />
                                <span>12</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-accent">
                                <MessageCircle className="w-3 h-3" />
                                <span>3</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="events" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Upcoming Events</h3>
                <div className="space-y-3">
                  {['Study Session', 'Workshop', 'Social'].map((event, i) => (
                    <Card key={i} variant="interactive">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-accent" />
                            <div>
                              <h4 className="font-medium text-white">{event} - Algorithm Review</h4>
                              <p className="text-white/60 text-sm">Tomorrow at 7:00 PM</p>
                            </div>
                          </div>
                          <Badge variant="secondary">12 joined</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="members" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Space Members</h3>
                  <Input placeholder="Search members..." className="w-64" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Sarah Johnson', 'Mike Chen', 'Elena Rodriguez', 'David Kim'].map((name, i) => (
                    <Card key={i} variant="minimal">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8" />
                          <div className="flex-1">
                            <div className="font-medium text-white text-sm">{name}</div>
                            <div className="text-white/60 text-xs">Computer Science</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tools" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Space Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Study Timer', 'Poll Creator', 'Resource Share'].map((tool, i) => (
                    <Card key={i} variant="interactive">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Settings className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="font-medium text-white mb-1">{tool}</h4>
                        <p className="text-white/60 text-xs mb-3">Collaborative tool for study groups</p>
                        <Button variant="secondary" size="sm" className="w-full">Open Tool</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Pills Variant */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Pills Tabs</h2>
            <p className="text-white/60 text-sm">Individual pill-style tabs with gold active states</p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList variant="pills">
              <TabsTrigger variant="pills" value="all">All Spaces</TabsTrigger>
              <TabsTrigger variant="pills" value="study">Study Groups</TabsTrigger>
              <TabsTrigger variant="pills" value="social">Social</TabsTrigger>
              <TabsTrigger variant="pills" value="academic">Academic</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['CS Study Hub', 'Library Squad', 'Coffee Chat', 'Exam Prep'].map((space, i) => (
                  <Card key={i} variant="elevated">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{space}</h4>
                        <Badge variant="secondary">47 members</Badge>
                      </div>
                      <p className="text-white/60 text-sm mb-3">Active study community with great discussions and resources</p>
                      <Button variant="secondary" size="sm" className="w-full">Join Space</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="study" className="mt-6">
              <div className="text-center py-8">
                <h3 className="font-semibold text-white mb-2">Study Groups</h3>
                <p className="text-white/60">Focused academic collaboration spaces</p>
              </div>
            </TabsContent>
            <TabsContent value="social" className="mt-6">
              <div className="text-center py-8">
                <h3 className="font-semibold text-white mb-2">Social Spaces</h3>
                <p className="text-white/60">Casual hangout and community spaces</p>
              </div>
            </TabsContent>
            <TabsContent value="academic" className="mt-6">
              <div className="text-center py-8">
                <h3 className="font-semibold text-white mb-2">Academic Resources</h3>
                <p className="text-white/60">Course-specific study materials and discussions</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Minimal Variant */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Minimal Tabs</h2>
            <p className="text-white/60 text-sm">Simple text-based tabs with gold accent highlights</p>
          </div>
          
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList variant="minimal">
              <TabsTrigger variant="minimal" value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger variant="minimal" value="privacy">Privacy</TabsTrigger>
              <TabsTrigger variant="minimal" value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive campus updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Space Activity</div>
                      <div className="text-white/60 text-sm">Get notified about posts and events in your spaces</div>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Campus Rituals</div>
                      <div className="text-white/60 text-sm">Notifications for weekly campus-wide activities</div>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="privacy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Controls</CardTitle>
                  <CardDescription>Control your visibility and data sharing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">Manage your privacy settings and control who can see your activity.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">Update your profile, change your email, and manage account security.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Size Variants */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Size Variants</h2>
            <p className="text-white/60 text-sm">Different sizes for different contexts</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-white/80 mb-3">Small</h3>
              <Tabs defaultValue="tab1">
                <TabsList variant="primary" size="sm">
                  <TabsTrigger value="tab1" size="sm">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2" size="sm">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3" size="sm">Tab 3</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white/80 mb-3">Medium (Default)</h3>
              <Tabs defaultValue="tab1">
                <TabsList variant="primary" size="md">
                  <TabsTrigger value="tab1" size="md">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2" size="md">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3" size="md">Tab 3</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white/80 mb-3">Large</h3>
              <Tabs defaultValue="tab1">
                <TabsList variant="primary" size="lg">
                  <TabsTrigger value="tab1" size="lg">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2" size="lg">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3" size="lg">Tab 3</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};