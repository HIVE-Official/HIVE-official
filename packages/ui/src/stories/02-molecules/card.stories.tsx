import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from '../../atomic/molecules/card';
import { 
  Users, 
  Calendar, 
  Star, 
  Heart, 
  MessageCircle, 
  Bookmark,
  TrendingUp,
  Award,
  MapPin,
  Clock,
  User,
  Settings,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Card> = {
  title: '02-Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE card molecule component for containing and organizing content with various visual styles, interactions, and compositions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'glass', 'interactive', 'bordered'],
      description: 'Card visual variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card internal padding',
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Card border radius',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    rounded: 'xl',
    hoverable: false,
    children: (
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Default Card</h3>
        <p className="text-hive-text-secondary">
          This is a default card with standard styling and medium padding.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    padding: 'md',
    rounded: 'xl',
    hoverable: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Interactive Card</h3>
        <p className="text-hive-text-secondary">
          This card responds to hover interactions with animations and visual feedback.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    rounded: 'xl',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Elevated Card</h3>
        <p className="text-hive-text-secondary">
          This card has a shadow to create depth and visual hierarchy.
        </p>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    padding: 'md',
    rounded: 'xl',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Glass Card</h3>
        <p className="text-hive-text-secondary">
          This card has a translucent glass effect with backdrop blur.
        </p>
      </div>
    ),
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-4xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Default Variant</h4>
        <Card variant="default" padding="md">
          <h5 className="font-semibold text-hive-text-primary mb-2">Standard Card</h5>
          <p className="text-hive-text-secondary">Basic card styling with border and background.</p>
        </Card>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Elevated Variant</h4>
        <Card variant="elevated" padding="md">
          <h5 className="font-semibold text-hive-text-primary mb-2">Elevated Card</h5>
          <p className="text-hive-text-secondary">Card with shadow for depth and importance.</p>
        </Card>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Glass Variant</h4>
        <Card variant="glass" padding="md">
          <h5 className="font-semibold text-hive-text-primary mb-2">Glass Card</h5>
          <p className="text-hive-text-secondary">Translucent card with backdrop blur effect.</p>
        </Card>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Interactive Variant</h4>
        <Card variant="interactive" padding="md" hoverable>
          <h5 className="font-semibold text-hive-text-primary mb-2">Interactive Card</h5>
          <p className="text-hive-text-secondary">Card with hover effects and cursor pointer.</p>
        </Card>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Bordered Variant</h4>
        <Card variant="bordered" padding="md">
          <h5 className="font-semibold text-hive-text-primary mb-2">Bordered Card</h5>
          <p className="text-hive-text-secondary">Transparent card with strong border emphasis.</p>
        </Card>
      </div>
    </div>
  ),
};

// Card compositions
export const CardCompositions: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-4xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Basic Composition</h4>
        <Card variant="default" padding="md">
          <CardHeader>
            <h3 className="text-xl font-semibold text-hive-text-primary">Card Title</h3>
            <p className="text-hive-text-secondary">Card subtitle or description</p>
          </CardHeader>
          <CardContent>
            <p className="text-hive-text-primary">
              This is the main content area of the card where you can place any content you need.
            </p>
          </CardContent>
          <CardFooter>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Action
            </button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Rich Content Composition</h4>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-hive-background-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-hive-text-primary">Study Group</h3>
                  <p className="text-hive-text-secondary">Computer Science • 12 members</p>
                </div>
              </div>
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-hive-text-primary mb-4">
              Join our weekly study sessions for CS fundamentals. We cover algorithms, data structures, 
              and practice coding interviews together.
            </p>
            <div className="flex items-center space-x-4 text-sm text-hive-text-secondary">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Tuesdays 7PM</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Library Room 201</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-hive-text-secondary hover:text-hive-gold transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">24</span>
                </button>
                <button className="flex items-center space-x-1 text-hive-text-secondary hover:text-hive-gold transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">8</span>
                </button>
                <button className="flex items-center space-x-1 text-hive-text-secondary hover:text-hive-gold transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
                Join Group
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
};

// Campus card scenarios
export const CampusCardScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Tool Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'GPA Calculator',
              description: 'Calculate your semester and cumulative GPA with course credits.',
              icon: TrendingUp,
              users: '2.4k',
              rating: '4.8',
              category: 'Academic',
              color: 'bg-hive-emerald'
            },
            {
              title: 'Study Planner',
              description: 'Plan your study schedule and track progress across all courses.',
              icon: Calendar,
              users: '1.8k',
              rating: '4.9',
              category: 'Productivity',
              color: 'bg-hive-sapphire'
            },
            {
              title: 'Group Finder',
              description: 'Find and join study groups for your classes and interests.',
              icon: Users,
              users: '3.2k',
              rating: '4.7',
              category: 'Social',
              color: 'bg-hive-gold'
            }
          ].map((tool, index) => (
            <Card key={index} variant="interactive" padding="md" hoverable>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-hive-text-primary">{tool.title}</h4>
                    <p className="text-sm text-hive-text-secondary">{tool.category}</p>
                  </div>
                  <button className="p-1 text-hive-text-secondary hover:text-hive-gold transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-hive-text-secondary mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between text-xs text-hive-text-secondary">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{tool.users} users</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-hive-gold fill-current" />
                    <span>{tool.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
                  Use Tool
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Space Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'CS Study Group',
              type: 'Academic',
              members: 24,
              description: 'Weekly study sessions for computer science courses. We tackle algorithms, data structures, and prepare for technical interviews together.',
              schedule: 'Tuesdays & Thursdays, 7:00 PM',
              location: 'Engineering Library',
              status: 'Active',
              leader: 'Sarah Chen',
              color: 'bg-blue-500'
            },
            {
              name: 'Floor 3 Community',
              type: 'Residential',
              members: 48,
              description: 'Building community on the third floor of West Hall. Coordinate events, share resources, and stay connected with your floor neighbors.',
              schedule: 'Events weekly',
              location: 'West Hall Floor 3',
              status: 'Very Active',
              leader: 'Marcus Johnson',
              color: 'bg-green-500'
            }
          ].map((space, index) => (
            <Card key={index} variant="elevated" padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-16 h-16 ${space.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">
                        {space.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-hive-text-primary">{space.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-hive-text-secondary">{space.type}</span>
                        <span className="text-hive-text-tertiary">•</span>
                        <span className="text-sm text-hive-text-secondary">{space.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      space.status === 'Very Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-hive-gold/20 text-hive-gold'
                    }`}>
                      {space.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-hive-text-primary mb-4">
                  {space.description}
                </p>
                <div className="space-y-2 text-sm text-hive-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{space.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{space.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Led by {space.leader}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-3 w-full">
                  <button className="flex-1 px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
                    Join Space
                  </button>
                  <button className="flex-1 px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Profile Achievement Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Community Builder',
              description: 'Created 5+ spaces that brought students together',
              icon: Users,
              progress: 85,
              unlocked: true,
              rarity: 'Rare'
            },
            {
              title: 'Tool Creator',
              description: 'Built tools used by 1000+ students',
              icon: Settings,
              progress: 67,
              unlocked: true,
              rarity: 'Epic'
            },
            {
              title: 'Study Streak',
              description: 'Maintained 30-day study streak',
              icon: Award,
              progress: 23,
              unlocked: false,
              rarity: 'Common'
            }
          ].map((achievement, index) => (
            <Card 
              key={index} 
              variant={achievement.unlocked ? 'elevated' : 'bordered'}
              padding="md"
              className={achievement.unlocked ? '' : 'opacity-60'}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-hive-gold text-hive-background-primary' 
                      : 'bg-hive-background-tertiary text-hive-text-secondary'
                  }`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-hive-text-primary">{achievement.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.rarity === 'Epic' 
                        ? 'bg-purple-500/20 text-purple-400'
                        : achievement.rarity === 'Rare'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-hive-text-secondary mb-3">
                  {achievement.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-hive-text-secondary">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.unlocked ? 'bg-hive-gold' : 'bg-hive-text-secondary'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Interactive card examples
export const InteractiveCardExamples: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState<'default' | 'elevated' | 'glass' | 'interactive' | 'bordered'>('default');
    const [selectedPadding, setSelectedPadding] = useState<'none' | 'sm' | 'md' | 'lg'>('md');
    const [selectedRounded, setSelectedRounded] = useState<'sm' | 'md' | 'lg' | 'xl'>('xl');
    const [hoverable, setHoverable] = useState(false);

    return (
      <div className="space-y-6 p-6 max-w-5xl bg-hive-background-primary">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Card Demo</h3>
          <p className="text-hive-text-secondary mb-6">Customize card properties to see how they affect appearance and behavior</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Card Configuration</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Variant</label>
                <select 
                  value={selectedVariant} 
                  onChange={(e) => setSelectedVariant(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="default">Default</option>
                  <option value="elevated">Elevated</option>
                  <option value="glass">Glass</option>
                  <option value="interactive">Interactive</option>
                  <option value="bordered">Bordered</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Padding</label>
                <select 
                  value={selectedPadding} 
                  onChange={(e) => setSelectedPadding(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Rounded</label>
                <select 
                  value={selectedRounded} 
                  onChange={(e) => setSelectedRounded(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hoverable}
                    onChange={(e) => setHoverable(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Enable Hover Animations</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Live Preview</h4>
            
            <Card 
              variant={selectedVariant}
              padding={selectedPadding}
              rounded={selectedRounded}
              hoverable={hoverable}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-hive-gold rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-hive-background-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hive-text-primary">Sample Card</h4>
                    <p className="text-sm text-hive-text-secondary">Interactive preview</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-hive-text-primary">
                  This card updates in real-time as you change the configuration options.
                </p>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
                  Test Action
                </button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                <strong>Current:</strong> {selectedVariant} variant • {selectedPadding} padding • {selectedRounded} rounded • 
                Hover: {hoverable ? 'enabled' : 'disabled'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    variant: 'interactive',
    padding: 'md',
    rounded: 'xl',
    hoverable: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Interactive Card</h3>
        <p className="text-hive-text-secondary">
          Hover over this card to see the animation effects in action.
        </p>
      </div>
    ),
  },
};