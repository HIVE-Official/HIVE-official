import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardStatus } from '../components/card';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Avatar } from '../components/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  Trophy,
  Calendar,
  Book,
  Coffee,
  Loader2,
  AlertCircle,
  CheckCircle,
  Inbox
} from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE card component with comprehensive variants, gold accents, and proper elevation system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'elevated', 'outline', 'ghost', 'glass', 'interactive', 'featured', 'surface-01', 'surface-02', 'surface-03'],
      description: 'Card variant following HIVE design system',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Card size variants',
    },
    spacing: {
      control: 'select',
      options: ['none', 'compact', 'comfortable', 'spacious'],
      description: 'Card spacing variants',
    },
  },
  subcomponents: { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardStatus },
};

export default meta;

type Story = StoryObj<typeof Card>;

// Basic Card Variants
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[320px]">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>A clean card with subtle borders and gold hover accents.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This is the default card variant with hover effects that reveal gold accents.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Accent: Story = {
  render: () => (
    <Card variant="accent" className="w-[320px]">
      <CardHeader>
        <CardTitle>Accent Card</CardTitle>
        <CardDescription>Featured content with gold border treatment.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This card has a gold border and shadow for highlighting important content.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[320px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>Enhanced elevation with lift animation.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This card has enhanced shadows and lifts on hover for depth.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-[320px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Clickable card with press animation.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This card responds to clicks with scale and lift animations.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Featured: Story = {
  render: () => (
    <Card variant="featured" className="w-[320px]">
      <CardHeader>
        <CardTitle>Featured Card</CardTitle>
        <CardDescription>Special treatment with gold ring and enhanced shadows.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This card is for the most important content with full gold treatment.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="bg-gradient-to-br from-surface-02 to-surface p-8 rounded-lg">
      <Card variant="glass" className="w-[320px]">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>Glassmorphism effect with backdrop blur.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            This card uses glassmorphism with backdrop blur for modern overlay effects.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Size Variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <Card size="sm" className="w-[240px]">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact size for lists</CardDescription>
        </CardHeader>
      </Card>
      <Card size="default" className="w-[320px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard size for most content</CardDescription>
        </CardHeader>
      </Card>
      <Card size="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Larger size for detailed content</CardDescription>
        </CardHeader>
      </Card>
      <Card size="xl" className="w-[480px]">
        <CardHeader>
          <CardTitle>Extra Large Card</CardTitle>
          <CardDescription>Maximum size for hero content</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

// Surface Elevation Levels
export const SurfaceLevels: Story = {
  render: () => (
    <div className="flex gap-6">
      <Card variant="surface-01" className="w-[200px]">
        <CardHeader>
          <CardTitle>Surface 01</CardTitle>
          <CardDescription>Base elevation</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="surface-02" className="w-[200px]">
        <CardHeader>
          <CardTitle>Surface 02</CardTitle>
          <CardDescription>Mid elevation</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="surface-03" className="w-[200px]">
        <CardHeader>
          <CardTitle>Surface 03</CardTitle>
          <CardDescription>High elevation</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

// Campus Content Examples
export const CampusContentCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Event Card */}
      <Card variant="interactive" className="w-[300px]">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Study Group Session</CardTitle>
              <CardDescription>Computer Science 101</CardDescription>
            </div>
            <Badge variant="pill">Tonight</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted">
              <Clock className="mr-2 h-4 w-4" />
              7:00 PM - 9:00 PM
            </div>
            <div className="flex items-center text-sm text-muted">
              <MapPin className="mr-2 h-4 w-4" />
              Library Room 204
            </div>
            <div className="flex items-center text-sm text-muted">
              <Users className="mr-2 h-4 w-4" />
              12 attending
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="accent" size="sm" className="w-full">
            Join Study Group
          </Button>
        </CardFooter>
      </Card>

      {/* Achievement Card */}
      <Card variant="featured" className="w-[300px]">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div>
              <CardTitle>Achievement Unlocked!</CardTitle>
              <CardDescription>Study Streak Champion</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            You've maintained a 7-day study streak! Keep up the great work.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="ritual" size="sm" className="w-full">
            Celebrate Achievement
          </Button>
        </CardFooter>
      </Card>

      {/* Social Post Card */}
      <Card variant="default" className="w-[300px]">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Avatar>
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Book className="h-5 w-5 text-accent" />
              </div>
            </Avatar>
            <div>
              <CardTitle className="text-base">@sarah_studies</CardTitle>
              <CardDescription>2 hours ago</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            Just finished my midterm prep! The campus coffee shop was the perfect study spot ☕️
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            24
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            5
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>

      {/* Course Card */}
      <Card variant="outline" className="w-[300px]">
        <CardHeader>
          <CardTitle>Introduction to Psychology</CardTitle>
          <CardDescription>PSY 101 • Prof. Johnson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted">
              <Calendar className="mr-2 h-4 w-4" />
              Mon, Wed, Fri 10:00 AM
            </div>
            <div className="flex items-center text-sm text-muted">
              <MapPin className="mr-2 h-4 w-4" />
              Psychology Building 101
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Progress</span>
              <span className="text-sm text-accent">75%</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View Course
          </Button>
        </CardFooter>
      </Card>

      {/* Campus Event Card */}
      <Card variant="elevated" className="w-[300px]">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Spring Fair 2025</CardTitle>
              <CardDescription>Annual campus celebration</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">15</div>
              <div className="text-xs text-muted">DAYS</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            Join us for food trucks, live music, and student organization booths!
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="accent" size="sm" className="w-full">
            <Star className="mr-2 h-4 w-4" />
            Save Event
          </Button>
        </CardFooter>
      </Card>

      {/* Space Card */}
      <Card variant="ghost" className="w-[300px]">
        <CardHeader>
          <CardTitle>Engineering Study Lounge</CardTitle>
          <CardDescription>Quiet workspace for STEM students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Current occupancy</span>
              <span className="text-accent">12/30</span>
            </div>
            <div className="flex items-center text-sm text-muted">
              <Coffee className="mr-2 h-4 w-4" />
              Coffee available • Whiteboards • Power outlets
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="default" size="sm" className="w-full">
            Check In
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Status Cards
export const StatusCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardStatus
        status="loading"
        title="Loading your schedule..."
        description="We're gathering your classes and events."
        icon={<Loader2 className="h-8 w-8 animate-spin" />}
      />
      <CardStatus
        status="error"
        title="Connection issue"
        description="We're having trouble connecting to the server. Please try again."
        icon={<AlertCircle className="h-8 w-8" />}
        action={<Button variant="default" size="sm">Try Again</Button>}
      />
      <CardStatus
        status="success"
        title="Profile updated!"
        description="Your changes have been saved successfully."
        icon={<CheckCircle className="h-8 w-8" />}
        action={<Button variant="ghost" size="sm">Continue</Button>}
      />
      <CardStatus
        status="empty"
        title="No events scheduled"
        description="You don't have any upcoming events. Why not browse what's happening on campus?"
        icon={<Inbox className="h-8 w-8" />}
        action={<Button variant="accent" size="sm">Explore Events</Button>}
      />
    </div>
  ),
};

// Grocery Store Showcase
export const GroceryShowcase: Story = {
  name: "🛒 Card Grocery Store",
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">HIVE Card Grocery Store</h2>
        <p className="text-gray-400">Pick your perfect card variant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Default */}
        <Card variant="default" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Default</CardTitle>
            <CardDescription className="text-xs">Clean with gold hover</CardDescription>
          </CardHeader>
        </Card>

        {/* Accent */}
        <Card variant="accent" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Accent</CardTitle>
            <CardDescription className="text-xs">Gold border featured</CardDescription>
          </CardHeader>
        </Card>

        {/* Elevated */}
        <Card variant="elevated" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Elevated</CardTitle>
            <CardDescription className="text-xs">Enhanced shadows</CardDescription>
          </CardHeader>
        </Card>

        {/* Interactive */}
        <Card variant="interactive" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Interactive</CardTitle>
            <CardDescription className="text-xs">Clickable with lift</CardDescription>
          </CardHeader>
        </Card>

        {/* Featured */}
        <Card variant="featured" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Featured</CardTitle>
            <CardDescription className="text-xs">Full gold treatment</CardDescription>
          </CardHeader>
        </Card>

        {/* Glass */}
        <div className="bg-gradient-to-br from-surface-02 to-surface p-4 rounded-lg">
          <Card variant="glass" className="w-[200px]">
            <CardHeader>
              <CardTitle className="text-sm">Glass</CardTitle>
              <CardDescription className="text-xs">Glassmorphism blur</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Outline */}
        <Card variant="outline" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Outline</CardTitle>
            <CardDescription className="text-xs">Transparent with border</CardDescription>
          </CardHeader>
        </Card>

        {/* Ghost */}
        <Card variant="ghost" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Ghost</CardTitle>
            <CardDescription className="text-xs">Minimal styling</CardDescription>
          </CardHeader>
        </Card>

        {/* Surface 01 */}
        <Card variant="surface-01" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Surface 01</CardTitle>
            <CardDescription className="text-xs">Base elevation</CardDescription>
          </CardHeader>
        </Card>

        {/* Surface 02 */}
        <Card variant="surface-02" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Surface 02</CardTitle>
            <CardDescription className="text-xs">Mid elevation</CardDescription>
          </CardHeader>
        </Card>

        {/* Surface 03 */}
        <Card variant="surface-03" className="w-[200px]">
          <CardHeader>
            <CardTitle className="text-sm">Surface 03</CardTitle>
            <CardDescription className="text-xs">High elevation</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          🏆 Following HIVE Design System - Layered surfaces with gold interaction accents
        </p>
      </div>
    </div>
  ),
};
