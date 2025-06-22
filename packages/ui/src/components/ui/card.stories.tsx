import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Users,
  Calendar,
  Settings,
  Star,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Clock,
  Trophy,
  Zap,
} from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "HIVE/Card",
  component: Card,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [
        { name: "hive-dark", value: "#0A0A0A" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "select" },
      options: ["1", "2", "3", "4"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "glass", "outline"],
    },
    hoverable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card Variants
export const Default: Story = {
  args: {
    elevation: "2",
    variant: "default",
    hoverable: false,
    className: "w-80",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>
          A standard card with clean styling and subtle elevation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body">
          This is the default card variant with standard HIVE styling.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Glass: Story = {
  args: {
    elevation: "3",
    variant: "glass",
    className: "w-80",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Glass Card</CardTitle>
        <CardDescription>
          Subtle transparency with backdrop blur effect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body">
          Glass morphism effect for layered interfaces and modern aesthetics.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Explore</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outline: Story = {
  args: {
    elevation: "1",
    variant: "outline",
    className: "w-80",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>Minimal styling with border emphasis</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body">
          Clean, minimal approach perfect for secondary content areas.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Configure</Button>
      </CardFooter>
    </Card>
  ),
};

// Interactive Card
export const Interactive: Story = {
  render: () => (
    <Card elevation="2" hoverable className="w-80 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          Interactive Card
        </CardTitle>
        <CardDescription>
          Hover and click interactions with micro-animations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body">
          This card responds to hover and click events with smooth HIVE
          animations.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Interact
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Elevation System Showcase
export const ElevationSystem: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
      {[1, 2, 3, 4].map((level) => (
        <Card
          key={level}
          elevation={level.toString() as any}
          className="p-6 text-center"
        >
          <h4 className="text-h4 text-foreground mb-2">Level {level}</h4>
          <p className="text-caption text-muted-foreground">
            Elevation {level}
          </p>
          <div className="mt-4">
            <Button variant="secondary" size="sm">
              Action
            </Button>
          </div>
        </Card>
      ))}
    </div>
  ),
};

// Real-world Examples
export const PostCard: Story = {
  render: () => (
    <Card elevation="2" className="w-96">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-base">Student Union</CardTitle>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body mb-4">
          Just announced: HIVE Winter Festival! Join us for live music, food
          trucks, and networking with fellow students. Don't miss this amazing
          event! 🎉
        </p>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Event</Badge>
          <Badge variant="outline">Music</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Campus Quad
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Dec 15, 6 PM
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              24
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />8
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const SpaceCard: Story = {
  render: () => (
    <Card elevation="2" hoverable className="w-80">
      <CardContent className="p-0">
        <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-hive flex items-center justify-center">
          <Trophy className="h-8 w-8 text-accent" />
        </div>
      </CardContent>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Computer Science Hub</CardTitle>
          <Badge variant="default">Premium</Badge>
        </div>
        <CardDescription>
          Connect with CS students, share projects, and collaborate on code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            2,847 members
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Very Active
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">
            A
          </div>
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">
            B
          </div>
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">
            C
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            +2,844 more
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          fullWidth
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
        >
          Join Space
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Complete HIVE Card Showcase
export const HIVECardShowcase: Story = {
  render: () => (
    <div className="max-w-6xl space-y-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-h1 text-foreground mb-2">HIVE Card System</h1>
        <p className="text-body text-muted-foreground">
          Flexible containers with Vercel-inspired depth and HIVE branding
        </p>
      </div>

      {/* Elevation System */}
      <section>
        <h2 className="text-h2 text-foreground mb-4">Elevation System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((level) => (
            <Card
              key={level}
              elevation={level.toString() as any}
              className="p-4 text-center"
            >
              <h4 className="text-h4 mb-2">Level {level}</h4>
              <p className="text-caption text-muted-foreground">
                Shadow elevation {level}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section>
        <h2 className="text-h2 text-foreground mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" elevation="2" className="p-4">
            <h4 className="text-h4 mb-2">Default</h4>
            <p className="text-body text-muted-foreground">
              Standard card styling
            </p>
          </Card>
          <Card variant="glass" elevation="3" className="p-4">
            <h4 className="text-h4 mb-2">Glass</h4>
            <p className="text-body text-muted-foreground">
              Translucent with blur
            </p>
          </Card>
          <Card variant="outline" elevation="1" className="p-4">
            <h4 className="text-h4 mb-2">Outline</h4>
            <p className="text-body text-muted-foreground">
              Minimal border design
            </p>
          </Card>
        </div>
      </section>

      {/* Interactive States */}
      <section>
        <h2 className="text-h2 text-foreground mb-4">Interactive States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card elevation="2" className="p-4">
            <h4 className="text-h4 mb-2">Static Card</h4>
            <p className="text-body text-muted-foreground">
              No hover interactions
            </p>
          </Card>
          <Card elevation="2" hoverable className="p-4">
            <h4 className="text-h4 mb-2">Hoverable Card</h4>
            <p className="text-body text-muted-foreground">
              Lift on hover with smooth animation
            </p>
          </Card>
        </div>
      </section>
    </div>
  ),
};
