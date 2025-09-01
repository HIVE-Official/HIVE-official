import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverDescription, PopoverFooter, PopoverHeader, PopoverTitle, PopoverTrigger } from '../../components/popover';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';
import { Badge } from '../../components/badge';
import { Card, CardContent } from '../../components/card';
import { Settings, Users, Calendar, Bell, Search, Filter, Plus, Share, BookOpen, MapPin, Clock, Star } from 'lucide-react';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Popover System

Clean, accessible popover components for tech social platform with minimal gold usage.

## Design Principles:
- **Tech Social Feel**: Clean, modern popover styling
- **Minimal Gold**: Gold only for accent variant and focus states
- **Flexible Positioning**: Smart positioning with collision detection
- **Accessible**: Full keyboard navigation and screen reader support

## Variants:
- **Default**: Standard popover with white border
- **Elevated**: Enhanced shadow and border for important content
- **Minimal**: Subtle styling with backdrop blur
- **Accent**: Gold accent border for special interactions

## Use Cases:
- User profile previews
- Quick action menus
- Settings panels
- Information tooltips
- Form helpers
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Campus Settings</PopoverTitle>
          <PopoverDescription>
            Manage your campus preferences and notifications
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Push Notifications</Label>
            <Button variant="ghost" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="privacy">Privacy Mode</Label>
            <Button variant="ghost" size="sm">Configure</Button>
          </div>
        </div>
        <PopoverFooter>
          <Button variant="secondary" size="sm">Save Changes</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">HIVE Popover System</h1>
          <p className="text-white/60">Contextual overlays for campus interactions</p>
        </div>

        {/* Basic Variants */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Popover Variants</h2>
            <div className="flex flex-wrap gap-4">
              
              {/* Default */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Default Popover</Button>
                </PopoverTrigger>
                <PopoverContent variant="primary">
                  <PopoverHeader>
                    <PopoverTitle>Campus Update</PopoverTitle>
                    <PopoverDescription>Standard popover styling</PopoverDescription>
                  </PopoverHeader>
                  <p className="text-white/80 text-sm">
                    This is the default popover variant with clean white borders.
                  </p>
                </PopoverContent>
              </Popover>

              {/* Elevated */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Elevated Popover</Button>
                </PopoverTrigger>
                <PopoverContent variant="elevated">
                  <PopoverHeader>
                    <PopoverTitle>Important Notice</PopoverTitle>
                    <PopoverDescription>Enhanced visibility styling</PopoverDescription>
                  </PopoverHeader>
                  <p className="text-white/80 text-sm">
                    Elevated variant with stronger shadows and borders.
                  </p>
                </PopoverContent>
              </Popover>

              {/* Minimal */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">Minimal Popover</Button>
                </PopoverTrigger>
                <PopoverContent variant="minimal">
                  <PopoverHeader>
                    <PopoverTitle>Quick Info</PopoverTitle>
                    <PopoverDescription>Subtle backdrop styling</PopoverDescription>
                  </PopoverHeader>
                  <p className="text-white/80 text-sm">
                    Minimal variant with subtle borders and backdrop blur.
                  </p>
                </PopoverContent>
              </Popover>

              {/* Accent */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Accent Popover</Button>
                </PopoverTrigger>
                <PopoverContent variant="secondary">
                  <PopoverHeader>
                    <PopoverTitle>Special Action</PopoverTitle>
                    <PopoverDescription>Gold accent styling</PopoverDescription>
                  </PopoverHeader>
                  <p className="text-white/80 text-sm">
                    Accent variant with gold borders for special interactions.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Size Variants */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Size Variants</h2>
            <div className="flex flex-wrap gap-4">
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="sm">Small</Button>
                </PopoverTrigger>
                <PopoverContent size="sm">
                  <PopoverTitle>Small Popover</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">Compact size for quick actions.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Medium</Button>
                </PopoverTrigger>
                <PopoverContent size="md">
                  <PopoverTitle>Medium Popover</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">Standard size for most use cases.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="lg">Large</Button>
                </PopoverTrigger>
                <PopoverContent size="lg">
                  <PopoverTitle>Large Popover</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">Extended size for detailed content and forms.</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Campus Use Cases */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-white">Campus Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* User Profile Preview */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-auto p-3 text-left">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8" />
                    <div>
                      <div className="font-medium text-white">Alex Chen</div>
                      <div className="text-white/60 text-sm">CS Major</div>
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent variant="elevated" size="lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12" />
                    <div>
                      <h3 className="font-semibold text-white">Alex Chen</h3>
                      <p className="text-white/60 text-sm">Computer Science • Senior</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                        <Badge variant="secondary" className="text-xs">3 Spaces</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-white/60" />
                      <span className="text-white/80">Main Library • Study Room B</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="text-white/80">Active 2 hours ago</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">Connect</Button>
                    <Button variant="ghost" size="sm" className="flex-1">Message</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Quick Actions Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Actions
                </Button>
              </PopoverTrigger>
              <PopoverContent variant="primary" size="md">
                <PopoverHeader>
                  <PopoverTitle>Create New</PopoverTitle>
                  <PopoverDescription>Start something on campus</PopoverDescription>
                </PopoverHeader>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-3" />
                    Study Group
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Calendar className="w-4 h-4 mr-3" />
                    Campus Event
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-3" />
                    Resource Share
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Share className="w-4 h-4 mr-3" />
                    Discussion Post
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Space Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Spaces
                </Button>
              </PopoverTrigger>
              <PopoverContent variant="minimal" size="lg">
                <PopoverHeader>
                  <PopoverTitle>Filter Campus Spaces</PopoverTitle>
                  <PopoverDescription>Find the perfect study community</PopoverDescription>
                </PopoverHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search" className="text-sm font-medium text-white/80">Search</Label>
                    <Input 
                      id="search"
                      placeholder="Search spaces..." 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-white/80">Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-black">Study Groups</Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-black">Social</Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-black">Academic</Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-black">Recreation</Badge>
                    </div>
                  </div>
                </div>
                <PopoverFooter>
                  <Button variant="ghost" size="sm">Clear</Button>
                  <Button variant="secondary" size="sm">Apply Filters</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            {/* Notification Settings */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="relative">
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                </Button>
              </PopoverTrigger>
              <PopoverContent variant="secondary" size="lg">
                <PopoverHeader>
                  <PopoverTitle>Notification Center</PopoverTitle>
                  <PopoverDescription>3 new campus updates</PopoverDescription>
                </PopoverHeader>
                <div className="space-y-3">
                  <Card variant="minimal">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-white text-sm font-medium">New member joined CS Study Hub</p>
                          <p className="text-white/60 text-xs">Sarah joined your study group</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card variant="minimal">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-white text-sm font-medium">Campus ritual starting soon</p>
                          <p className="text-white/60 text-xs">Weekly energy boost in 10 minutes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <PopoverFooter>
                  <Button variant="ghost" size="sm">Mark All Read</Button>
                  <Button variant="secondary" size="sm">View All</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            {/* Space Preview */}
            <Popover>
              <PopoverTrigger asChild>
                <Card variant="interactive" className="cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">ML Study Group</h3>
                        <p className="text-white/60 text-sm">47 members</p>
                      </div>
                      <Star className="w-5 h-5 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </PopoverTrigger>
              <PopoverContent variant="elevated" size="lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Machine Learning Study Group</h3>
                    <p className="text-white/60 text-sm">Active community exploring neural networks and deep learning</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-white/60" />
                      <span className="text-white/80">47 members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <span className="text-white/80">3 events this week</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Recent activity: Neural network workshop scheduled for Friday</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">Join Space</Button>
                    <Button variant="ghost" size="sm" className="flex-1">Preview</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Campus Search */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Search className="w-4 h-4 mr-2" />
                  Search Campus
                </Button>
              </PopoverTrigger>
              <PopoverContent variant="minimal" size="lg">
                <div className="space-y-4">
                  <Input 
                    placeholder="Search students, spaces, events..." 
                    className="w-full"
                  />
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-xs font-medium mb-2">RECENT SEARCHES</p>
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-white/80">
                          CS Study Hub
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-white/80">
                          Algorithm Workshop
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium mb-2">SUGGESTIONS</p>
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-white/80">
                          Machine Learning Group
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-white/80">
                          Study Room Finder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Positioning Examples */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Smart Positioning</h2>
          <p className="text-white/60 text-sm">Popovers automatically adjust position to stay in viewport</p>
          
          <div className="grid grid-cols-3 gap-8 py-8">
            <div className="text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Top Side</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                  <PopoverTitle>Top Positioned</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">This popover appears above the trigger.</p>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Left Side</Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <PopoverTitle>Left Positioned</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">This popover appears to the left.</p>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Right Side</Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                  <PopoverTitle>Right Positioned</PopoverTitle>
                  <p className="text-white/80 text-sm mt-2">This popover appears to the right.</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};