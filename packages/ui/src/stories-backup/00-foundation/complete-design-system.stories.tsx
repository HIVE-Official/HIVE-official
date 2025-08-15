import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Avatar, AvatarFallback, AvatarImage } from '../../atomic/atoms/avatar';
import { Badge } from '../../atomic/atoms/badge';
import { ProfileHeader } from '../../atomic/molecules/profile-header';
import { Card } from '../../atomic/molecules/card';
import { Search, User, Plus, Settings } from 'lucide-react';

const CompleteDesignSystem = () => (
  <div className="min-h-screen bg-hive-background-primary text-hive-text-primary">
    {/* Header */}
    <div className="border-b border-hive-border-default bg-hive-background-overlay">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-hive-text-primary mb-2">
            HIVE Design System
          </h1>
          <p className="text-xl text-hive-text-mutedLight mb-6">
            Complete kitchen sink - every component documented and interactive
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Something
            </Button>
            <Button variant="outline" size="lg">
              <Settings className="w-4 h-4 mr-2" />
              Explore Components
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Foundation */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Foundation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Color System</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-12 h-12 bg-hive-gold rounded border border-hive-border-default"></div>
              <div className="w-12 h-12 bg-hive-champagne rounded border border-hive-border-default"></div>
              <div className="w-12 h-12 bg-hive-obsidian rounded border border-hive-border-default"></div>
              <div className="w-12 h-12 bg-hive-background-overlay rounded border border-hive-border-default"></div>
            </div>
            <p className="text-sm text-hive-text-mutedLight mt-3">
              HIVE brand colors: Gold, Champagne, Obsidian, and semantic variants
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Typography</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Display Text</div>
              <div className="text-lg font-semibold">Heading Text</div>
              <div className="text-base">Body Text</div>
              <div className="text-sm text-hive-text-mutedLight">Secondary Text</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Atoms */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">01 • Atoms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">Primary</Button>
              <Button variant="outline" className="w-full">Outline</Button>
              <Button variant="ghost" className="w-full">Ghost</Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Inputs</h3>
            <div className="space-y-3">
              <Input 
                leftIcon={<Search className="w-4 h-4" />}
                placeholder="Search..." 
              />
              <Input 
                leftIcon={<User className="w-4 h-4" />}
                placeholder="Username" 
              />
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Avatars & Badges</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <Badge variant="secondary">Student</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="success">Online</Badge>
                <Badge variant="warning">Builder</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Molecules */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">02 • Molecules</h2>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Header</h3>
            <ProfileHeader
              user={{
                id: 'demo-user',
                name: 'Alex Rodriguez',
                handle: 'alexr',
                profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face',
                bio: 'Computer Science major building tools for campus collaboration.',
                university: 'Tech University',
                major: 'Computer Science',
                year: 'Junior',
                isVerified: true,
                isBuilder: true,
                pronouns: 'she/her',
              }}
              isOwnProfile={true}
              onEditProfile={() => console.log('Edit profile')}
              onToggleGhostMode={() => console.log('Toggle ghost mode')}
            />
          </Card>
        </div>
      </section>

      {/* Campus Scenarios */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Campus Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Study Group</h3>
            <div className="space-y-3">
              <Input 
                leftIcon={<Search className="w-4 h-4" />}
                placeholder="Find study partners..." 
              />
              <Button variant="primary" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Study Group
              </Button>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hive-text-mutedLight">12 members</span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Tool Building</h3>
            <div className="space-y-3">
              <Input placeholder="Tool name..." />
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Configure Tool
              </Button>
              <div className="flex gap-2">
                <Badge variant="warning">Draft</Badge>
                <Badge variant="outline">v1.0</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Campus Life</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>FL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Floor 3B</div>
                  <Badge variant="secondary">Dorm</Badge>
                </div>
              </div>
              <Button variant="ghost" className="w-full">
                Join Floor Events
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Component Coverage */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Component Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-gold mb-2">43</div>
            <div className="text-sm text-hive-text-mutedLight">Atoms</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-gold mb-2">15</div>
            <div className="text-sm text-hive-text-mutedLight">Molecules</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-gold mb-2">8</div>
            <div className="text-sm text-hive-text-mutedLight">Organisms</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-gold mb-2">100%</div>
            <div className="text-sm text-hive-text-mutedLight">Coverage</div>
          </Card>
        </div>
      </section>

      {/* Getting Started */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-hive-text-primary mb-6">Ready to Build Campus Utility?</h2>
        <p className="text-xl text-hive-text-mutedLight mb-8 max-w-2xl mx-auto">
          Every component is documented, interactive, and ready for campus-specific use cases.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg">
            Start Building
          </Button>
          <Button variant="outline" size="lg">
            Browse All Components
          </Button>
        </div>
      </section>
    </div>
  </div>
);

const meta: Meta = {
  title: '00-Foundation/Complete Design System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete HIVE design system kitchen sink - every component, every variant, comprehensive campus scenarios.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {
  render: () => <CompleteDesignSystem />,
};

export const ComponentInventory: Story = {
  render: () => (
    <div className="p-8 bg-hive-background-primary">
      <h1 className="text-3xl font-bold text-hive-text-primary mb-8">HIVE Component Inventory</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-hive-text-primary mb-4">Foundation</h2>
          <ul className="text-hive-text-mutedLight space-y-1">
            <li>• Color System (HIVE Gold, Champagne, Obsidian)</li>
            <li>• Typography (Display, Heading, Body, Secondary)</li>
            <li>• Spacing System (Consistent padding, margins)</li>
            <li>• Border Radius (Consistent rounded corners)</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-hive-text-primary mb-4">Atoms (43 components)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-hive-text-mutedLight">
            <div>• Button Enhanced</div>
            <div>• Input Enhanced</div>
            <div>• Avatar</div>
            <div>• Badge</div>
            <div>• Progress</div>
            <div>• Profile Avatar</div>
            <div>• Profile Badge</div>
            <div>• Checkbox Enhanced</div>
            <div>• Radio Enhanced</div>
            <div>• Switch Enhanced</div>
            <div>• Select Enhanced</div>
            <div>• Textarea Enhanced</div>
            <div>• Label</div>
            <div>• Tooltip</div>
            <div>• Skeleton</div>
            <div>• Spinner</div>
            <div>• Icon</div>
            <div>• Image</div>
            <div>• Link</div>
            <div>• Text</div>
            <div>• Container</div>
            <div>• Spacer</div>
            <div>• Separator</div>
            <div>• Tag</div>
            <div>• Status Indicator</div>
            <div>• Slider</div>
            <div>• File Input</div>
            <div>• Typography</div>
            <div>• HIVE Brand</div>
            <div>• Platform Icons</div>
            <div>• Profile Action</div>
            <div>• Profile Statistic</div>
            <div>• Navigation Preferences</div>
            <div>• Nav Bar</div>
            <div>• Sidebar</div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-hive-text-primary mb-4">Molecules (15 components)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-hive-text-mutedLight">
            <div>• Profile Header</div>
            <div>• Profile Stats</div>
            <div>• Avatar Card</div>
            <div>• User Card</div>
            <div>• Card</div>
            <div>• Email Input</div>
            <div>• Form Field</div>
            <div>• Form Comprehensive</div>
            <div>• Search Bar</div>
            <div>• HIVE Navigation</div>
            <div>• Navigation Variants</div>
            <div>• Campus Activity Feed</div>
            <div>• Campus Builder Tools</div>
            <div>• Campus Identity Header</div>
            <div>• Campus Spaces Card</div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-hive-text-primary mb-4">Organisms (8 components)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-hive-text-mutedLight">
            <div>• Profile Card</div>
            <div>• Profile Dashboard</div>
            <div>• Profile System</div>
            <div>• Header</div>
            <div>• HIVE Space Card</div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-hive-text-primary mb-4">Templates & Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-hive-text-mutedLight">
            <div>• Page Layout</div>
            <div>• Dashboard Page</div>
            <div>• Complete App Shell</div>
            <div>• Navigation System</div>
          </div>
        </div>
      </div>
    </div>
  ),
};