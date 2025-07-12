import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardStatus } from '../../components/card';
import { Button } from '../../components/button';
import { Badge } from '../../components/badge';
import { Avatar } from '../../components/avatar';
import { Users, Calendar, MessageCircle, Heart, Share, MoreHorizontal, Star, Zap, Coffee, BookOpen, AlertCircle, CheckCircle, Loader2, FolderOpen } from 'lucide-react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Card System

Clean, tech social platform cards with minimal gold usage and Vercel-inspired precision.

## Design Principles:
- **Tech Social**: Clean, modern container design
- **Minimal Gold**: Gold only for accents and key highlights
- **Modular**: Flexible composition with Header, Content, Footer
- **Scalable**: From minimal to interactive variants

## Core Variants:
- **Default**: Clean card with subtle border
- **Elevated**: More prominent with subtle elevation
- **Accent**: Minimal gold accent for key cards
- **Interactive**: Clear interactive affordance with hover effects
- **Minimal**: Ultra-clean for secondary content

## Composition:
Cards use a flexible composition pattern with CardHeader, CardContent, and CardFooter components that can be mixed and matched.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'accent', 'interactive', 'minimal'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Campus Study Group</CardTitle>
          <CardDescription>Join students for collaborative learning sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            Weekly study sessions covering advanced algorithms and data structures. 
            Open to all CS majors and coding enthusiasts.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Join Group</Button>
          <Button variant="ghost" size="sm" className="ml-2">Learn More</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Featured Space</CardTitle>
          <CardDescription>Trending campus community</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            The most active space this week with 247 members sharing resources and organizing events.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">HIVE Card System</h1>
          <p className="text-white/70 text-lg">Clean, modular cards for tech social platform</p>
        </div>

        {/* Basic Variants */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Clean card with subtle border</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    Standard card styling for most content containers.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" padding="md">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Enhanced prominence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    More prominent styling for important content.
                  </p>
                </CardContent>
              </Card>

              <Card variant="accent" padding="md">
                <CardHeader>
                  <CardTitle>Accent Card</CardTitle>
                  <CardDescription>Minimal gold highlighting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    Gold accent for featured or special content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Interactive Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="interactive" padding="md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle>CS Study Hub</CardTitle>
                        <CardDescription>Active • 47 members</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-accent border-accent/30">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-4">
                    Algorithm study session starting in 20 minutes. Join us for collaborative problem solving.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>47 joined</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>8:00 PM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card variant="minimal" padding="md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-base">Sarah Chen</CardTitle>
                      <CardDescription>Posted 2 minutes ago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm">
                    Just finished the machine learning assignment! The neural network finally converged 🎉
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <button className="flex items-center gap-1 hover:text-accent transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>12</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-accent transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>3</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-accent transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Stats & Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="accent" padding="md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Campus Energy</CardTitle>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">87%</div>
                    <p className="text-xs text-white/60">Peak activity in Library & CS Building</p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" padding="md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Active Spaces</CardTitle>
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">24</div>
                    <p className="text-xs text-white/60">12 study groups, 8 events, 4 social</p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="default" padding="md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Your Impact</CardTitle>
                    <Coffee className="w-4 h-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">156</div>
                    <p className="text-xs text-white/60">Students connected this week</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Status Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Status Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <CardStatus
                status="loading"
                icon={<Loader2 className="w-8 h-8 animate-spin" />}
                title="Loading Spaces"
                description="Fetching your campus data..."
              />
              
              <CardStatus
                status="success"
                icon={<CheckCircle className="w-8 h-8" />}
                title="Connected!"
                description="Successfully joined campus network"
                action={<Button variant="accent" size="sm">Explore Spaces</Button>}
              />
              
              <CardStatus
                status="empty"
                icon={<FolderOpen className="w-8 h-8" />}
                title="No Spaces Yet"
                description="Be the first to create a space for your major"
                action={<Button variant="primary" size="sm">Create Space</Button>}
              />
              
              <CardStatus
                status="error"
                icon={<AlertCircle className="w-8 h-8" />}
                title="Connection Issue"
                description="Unable to connect to campus network"
                action={<Button variant="secondary" size="sm">Try Again</Button>}
              />
            </div>
          </div>

          {/* Padding Variants */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Padding Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card variant="default" padding="none" className="border-2 border-dashed border-white/20">
                <div className="p-4">
                  <CardTitle className="text-sm">No Padding</CardTitle>
                  <CardDescription className="text-xs">padding="none"</CardDescription>
                </div>
              </Card>
              
              <Card variant="default" padding="sm">
                <CardTitle className="text-sm">Small</CardTitle>
                <CardDescription className="text-xs">padding="sm"</CardDescription>
              </Card>
              
              <Card variant="default" padding="md">
                <CardTitle className="text-sm">Medium</CardTitle>
                <CardDescription className="text-xs">padding="md"</CardDescription>
              </Card>
              
              <Card variant="default" padding="lg">
                <CardTitle className="text-sm">Large</CardTitle>
                <CardDescription className="text-xs">padding="lg"</CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CampusFeed: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-white">Campus Feed</h1>
          <p className="text-white/60">Real-time activity from your spaces</p>
        </div>
        
        <div className="space-y-4">
          <Card variant="interactive" padding="md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">Late Night Coding Session</CardTitle>
                  <CardDescription>CS Study Hub • 8 members joined</CardDescription>
                </div>
                <Badge variant="outline" className="border-accent/30 text-accent">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-3">
                Working on final projects together. Pizza arriving soon! 🍕
              </p>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span>Started 2 hours ago</span>
                <span>•</span>
                <span>Library 3rd Floor</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="accent" size="sm">Join Session</Button>
              </div>
            </CardFooter>
          </Card>

          <Card variant="minimal" padding="md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8" />
                <div>
                  <CardTitle className="text-sm">Alex Rodriguez</CardTitle>
                  <CardDescription>Engineering Study Group • 45 min ago</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Anyone have notes from Professor Kim's thermodynamics lecture? I missed the derivation for entropy.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-white/60 hover:text-accent transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>3</span>
                </button>
                <button className="flex items-center gap-1 text-white/60 hover:text-accent transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>5 replies</span>
                </button>
              </div>
            </CardFooter>
          </Card>

          <Card variant="accent" padding="md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-black" />
                </div>
                <div>
                  <CardTitle className="text-base">Weekly Campus Ritual</CardTitle>
                  <CardDescription>Dining Hall Wars begins in 2 hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Vote for your favorite dining hall! The winning hall gets bragging rights and a special menu next week.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="accent" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Join Ritual
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  ),
};