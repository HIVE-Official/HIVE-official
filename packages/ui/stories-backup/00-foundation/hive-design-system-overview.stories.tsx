import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { ProfileAvatar } from '../../atomic/atoms/profile-avatar';
import { Progress } from '../../atomic/atoms/progress';
import { Card } from '../../atomic/molecules/card';
import { ProfileHeader } from '../../atomic/molecules/profile-header';
import { ProfileStats } from '../../atomic/molecules/profile-stats';

// Mock data for design system showcase
const mockUser = {
  name: 'Alex Rodriguez',
  handle: 'alexr',
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  bio: 'Computer Science major passionate about building tools that help students succeed.',
  university: 'Tech University',
  major: 'Computer Science',
  year: 'Junior',
  isVerified: true,
};

const mockStats = {
  spacesJoined: 12,
  toolsUsed: 8,
  connectionsCount: 89,
  currentStreak: 23,
  totalActivity: 456,
  reputation: 892,
};

const DesignSystemOverview = () => (
  <div className="min-h-screen bg-hive-background-primary text-hive-text-primary">
    {/* Header */}
    <div className="border-b border-hive-border-default bg-hive-background-overlay">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-hive-text-primary mb-2">
            HIVE Design System
          </h1>
          <p className="text-xl text-hive-text-mutedLight mb-6">
            Complete atomic design system for the campus social utility platform
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Components
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Design Principles */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-hive-obsidian">U</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Utility-First</h3>
            <p className="text-hive-text-mutedLight">
              Every design decision prioritizes practical functionality that helps students succeed.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-hive-obsidian">S</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Social Connection</h3>
            <p className="text-hive-text-mutedLight">
              Designed to foster meaningful relationships and community building.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-hive-obsidian">A</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Accessible</h3>
            <p className="text-hive-text-mutedLight">
              Inclusive design that works for everyone, regardless of ability or device.
            </p>
          </Card>
        </div>
      </section>

      {/* Color System */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Color System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'HIVE Gold', class: 'bg-hive-gold', hex: '#FFD700', text: 'text-hive-obsidian' },
            { name: 'HIVE Champagne', class: 'bg-hive-champagne', hex: '#F7E7CE', text: 'text-hive-obsidian' },
            { name: 'HIVE Obsidian', class: 'bg-hive-obsidian', hex: '#0A0A0B', text: 'text-hive-text-primary' },
            { name: 'Background Primary', class: 'bg-hive-background-primary', hex: '#0A0A0B', text: 'text-hive-text-primary' },
            { name: 'Background Overlay', class: 'bg-hive-background-overlay', hex: '#111113', text: 'text-hive-text-primary' },
            { name: 'Background Tertiary', class: 'bg-hive-background-tertiary', hex: '#1A1A1C', text: 'text-hive-text-primary' },
            { name: 'Text Primary', class: 'bg-hive-text-primary', hex: '#E5E5E7', text: 'text-hive-obsidian' },
            { name: 'Text Muted', class: 'bg-hive-text-mutedLight', hex: '#9CA3AF', text: 'text-hive-obsidian' },
          ].map((color) => (
            <div key={color.name} className={`${color.class} p-4 rounded-lg border border-hive-border-default`}>
              <div className={`${color.text} font-semibold mb-1`}>{color.name}</div>
              <div className={`${color.text} text-sm opacity-75`}>{color.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Typography</h2>
        <Card className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-hive-text-primary">Heading 1 - Bold Impact</h1>
            <p className="text-sm text-hive-text-mutedLight mt-1">4xl • Bold • Primary headings</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-hive-text-primary">Heading 2 - Section Headers</h2>
            <p className="text-sm text-hive-text-mutedLight mt-1">3xl • Semibold • Section divisions</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-hive-text-primary">Heading 3 - Subsections</h3>
            <p className="text-sm text-hive-text-mutedLight mt-1">xl • Medium • Card titles</p>
          </div>
          <div>
            <p className="text-base text-hive-text-primary">Body Text - Readable content for descriptions and longer text blocks.</p>
            <p className="text-sm text-hive-text-mutedLight mt-1">base • Regular • Body content</p>
          </div>
          <div>
            <p className="text-sm text-hive-text-mutedLight">Small Text - Secondary information, captions, and metadata.</p>
            <p className="text-xs text-hive-text-mutedLight mt-1">sm • Regular • Secondary info</p>
          </div>
        </Card>
      </section>

      {/* Atomic Components Showcase */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Atomic Components</h2>
        
        {/* Atoms */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-hive-text-primary mb-6">01 • Atoms</h3>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Buttons */}
              <div>
                <h4 className="font-semibold text-hive-text-primary mb-4">Buttons</h4>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">Primary Action</Button>
                  <Button variant="secondary" className="w-full">Secondary Action</Button>
                  <Button variant="outline" className="w-full">Outline Style</Button>
                  <Button variant="ghost" className="w-full">Ghost Style</Button>
                </div>
              </div>
              
              {/* Avatars */}
              <div>
                <h4 className="font-semibold text-hive-text-primary mb-4">Profile Avatars</h4>
                <div className="flex items-center space-x-3">
                  <ProfileAvatar
                    src={mockUser.profilePhoto}
                    alt={mockUser.name}
                    size="sm"
                    fallback="AR"
                  />
                  <ProfileAvatar
                    src={mockUser.profilePhoto}
                    alt={mockUser.name}
                    size="md"
                    fallback="AR"
                  />
                  <ProfileAvatar
                    src={mockUser.profilePhoto}
                    alt={mockUser.name}
                    size="lg"
                    fallback="AR"
                  />
                  <ProfileAvatar
                    src=""
                    alt="Fallback"
                    size="md"
                    fallback="FB"
                  />
                </div>
              </div>
              
              {/* Progress */}
              <div>
                <h4 className="font-semibold text-hive-text-primary mb-4">Progress Indicators</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} variant="default" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>GPA Goal</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} variant="success" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Molecules */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-hive-text-primary mb-6">02 • Molecules</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h4 className="font-semibold text-hive-text-primary mb-4">Profile Header</h4>
              <ProfileHeader
                user={mockUser}
                isOwnProfile={true}
                onEditProfile={() => {}}
                onToggleGhostMode={() => {}}
              />
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold text-hive-text-primary mb-4">Profile Statistics</h4>
              <ProfileStats stats={mockStats} />
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Scenarios */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Campus-Specific Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Study Group Coordination</h3>
            <p className="text-hive-text-mutedLight mb-4">
              Components designed for organizing and managing study sessions, homework groups, and academic collaboration.
            </p>
            <Button variant="outline" size="sm">Explore Study Tools</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Dorm Life Management</h3>
            <p className="text-hive-text-mutedLight mb-4">
              Interface elements for floor communities, roommate coordination, and residential life activities.
            </p>
            <Button variant="outline" size="sm">View Dorm Features</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Campus Tool Building</h3>
            <p className="text-hive-text-mutedLight mb-4">
              Builder interface components for students creating and sharing productivity tools with their peers.
            </p>
            <Button variant="outline" size="sm">Try HiveLab</Button>
          </Card>
        </div>
      </section>

      {/* Responsive Design */}
      <section>
        <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Responsive Design</h2>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-20 bg-hive-background-tertiary border-2 border-hive-border-default rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-12 bg-hive-gold rounded"></div>
              </div>
              <h3 className="font-semibold mb-2">Mobile First</h3>
              <p className="text-sm text-hive-text-mutedLight">Optimized for campus life on-the-go</p>
            </div>
            
            <div>
              <div className="w-20 h-16 bg-hive-background-tertiary border-2 border-hive-border-default rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-12 h-8 bg-hive-gold rounded"></div>
              </div>
              <h3 className="font-semibold mb-2">Tablet Ready</h3>
              <p className="text-sm text-hive-text-mutedLight">Perfect for study sessions and collaboration</p>
            </div>
            
            <div>
              <div className="w-24 h-16 bg-hive-background-tertiary border-2 border-hive-border-default rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-8 bg-hive-gold rounded"></div>
              </div>
              <h3 className="font-semibold mb-2">Desktop Enhanced</h3>
              <p className="text-sm text-hive-text-mutedLight">Full productivity for serious builders</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Getting Started */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-hive-text-primary mb-6">Ready to Build?</h2>
        <p className="text-xl text-hive-text-mutedLight mb-8 max-w-2xl mx-auto">
          Start exploring the HIVE design system components and build the future of campus collaboration.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg">
            Browse Components
          </Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
          <Button variant="secondary" size="lg">
            Join Community
          </Button>
        </div>
      </section>
    </div>
  </div>
);

const meta: Meta = {
  title: '00-Foundation/HIVE Design System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the HIVE design system with all components, principles, and campus-specific scenarios.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignSystemShowcase: Story = {
  render: () => <DesignSystemOverview />,
};

// Individual sections for focused viewing
export const ColorSystemOnly: Story = {
  render: () => (
    <div className="p-8 bg-hive-background-primary">
      <h2 className="text-3xl font-bold text-hive-text-primary mb-8">HIVE Color System</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'HIVE Gold', class: 'bg-hive-gold', hex: '#FFD700', text: 'text-hive-obsidian' },
          { name: 'HIVE Champagne', class: 'bg-hive-champagne', hex: '#F7E7CE', text: 'text-hive-obsidian' },
          { name: 'HIVE Obsidian', class: 'bg-hive-obsidian', hex: '#0A0A0B', text: 'text-hive-text-primary' },
          { name: 'Background Primary', class: 'bg-hive-background-primary', hex: '#0A0A0B', text: 'text-hive-text-primary' },
          { name: 'Background Overlay', class: 'bg-hive-background-overlay', hex: '#111113', text: 'text-hive-text-primary' },
          { name: 'Background Tertiary', class: 'bg-hive-background-tertiary', hex: '#1A1A1C', text: 'text-hive-text-primary' },
          { name: 'Text Primary', class: 'bg-hive-text-primary', hex: '#E5E5E7', text: 'text-hive-obsidian' },
          { name: 'Text Muted', class: 'bg-hive-text-mutedLight', hex: '#9CA3AF', text: 'text-hive-obsidian' },
        ].map((color) => (
          <div key={color.name} className={`${color.class} p-6 rounded-lg border border-hive-border-default`}>
            <div className={`${color.text} font-semibold mb-2`}>{color.name}</div>
            <div className={`${color.text} text-sm opacity-75`}>{color.hex}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TypographyShowcase: Story = {
  render: () => (
    <div className="p-8 bg-hive-background-primary">
      <h2 className="text-3xl font-bold text-hive-text-primary mb-8">Typography System</h2>
      <Card className="p-8 space-y-8">
        <div>
          <h1 className="text-6xl font-bold text-hive-text-primary mb-2">Display</h1>
          <p className="text-hive-text-mutedLight">6xl • Bold • Hero text and major announcements</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-hive-text-primary mb-2">Heading 1</h1>
          <p className="text-hive-text-mutedLight">4xl • Bold • Page titles and primary headings</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-hive-text-primary mb-2">Heading 2</h2>
          <p className="text-hive-text-mutedLight">3xl • Semibold • Section headers</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-hive-text-primary mb-2">Heading 3</h3>
          <p className="text-hive-text-mutedLight">2xl • Semibold • Subsection headers</p>
        </div>
        <div>
          <h4 className="text-xl font-medium text-hive-text-primary mb-2">Heading 4</h4>
          <p className="text-hive-text-mutedLight">xl • Medium • Card titles and smaller headers</p>
        </div>
        <div>
          <p className="text-lg text-hive-text-primary mb-2">Large Body Text</p>
          <p className="text-hive-text-mutedLight">lg • Regular • Emphasized body content</p>
        </div>
        <div>
          <p className="text-base text-hive-text-primary mb-2">Body Text - The quick brown fox jumps over the lazy dog.</p>
          <p className="text-hive-text-mutedLight">base • Regular • Standard body text</p>
        </div>
        <div>
          <p className="text-sm text-hive-text-mutedLight mb-2">Small Text - Secondary information and captions</p>
          <p className="text-hive-text-mutedLight">sm • Regular • Metadata and labels</p>
        </div>
        <div>
          <p className="text-xs text-hive-text-mutedLight mb-2">Extra Small - Fine print and micro-copy</p>
          <p className="text-hive-text-mutedLight">xs • Regular • Legal text and tiny labels</p>
        </div>
      </Card>
    </div>
  ),
};