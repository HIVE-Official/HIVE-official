import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';
import { Heart, Star, Plus, Download, ArrowRight, Settings, Trash2, User, MessageCircle } from 'lucide-react';
import React from 'react';

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE button component following the gold-first design system. Gold usage is reserved for focus states, achievements, and ritual moments.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'accent', 'ritual', 'surface', 'link', 'nav', 'destructive'],
      description: 'Button variant following HIVE design system',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
      description: 'Button size variants',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Stories - The main button variants
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent Button',
  },
};

export const Ritual: Story = {
  args: {
    variant: 'ritual',
    children: 'Complete Ritual',
  },
};

export const Surface: Story = {
  args: {
    variant: 'surface',
    children: 'Surface Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Nav: Story = {
  args: {
    variant: 'nav',
    children: 'Navigation',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

// Size Variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// Icon Buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="icon-sm" variant="ghost">
        <Heart className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="default">
        <Star className="h-4 w-4" />
      </Button>
      <Button size="icon-lg" variant="accent">
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  ),
};

// Buttons with Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Button variant="default">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="accent">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="surface">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Button loading>Loading...</Button>
      <Button variant="accent" loading>Processing Ritual</Button>
      <Button variant="outline" loading>Saving...</Button>
    </div>
  ),
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Button disabled>Disabled Default</Button>
      <Button variant="accent" disabled>Disabled Accent</Button>
      <Button variant="destructive" disabled>Disabled Destructive</Button>
    </div>
  ),
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Button fullWidth>Full Width Default</Button>
      <Button variant="accent" fullWidth>Full Width Accent</Button>
      <Button variant="ritual" fullWidth>Complete Your Ritual</Button>
    </div>
  ),
};

// Campus Energy Showcase - Different energy states
export const CampusEnergy: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">High Energy (Club Rush, Events)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="accent">Join Event</Button>
          <Button variant="ritual">Complete Challenge</Button>
          <Button variant="default">
            <Star className="mr-2 h-4 w-4" />
            Star Project
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Focus Period (Study Time)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="ghost">View Notes</Button>
          <Button variant="outline">Study Group</Button>
          <Button variant="surface">Resources</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Transition (Breaks, Orientation)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="nav">Explore</Button>
          <Button variant="link">Learn More</Button>
          <Button variant="ghost">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Social Actions
export const SocialActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Community Interactions</h3>
      <div className="flex gap-4 flex-wrap">
        <Button variant="ghost">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost">
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment
        </Button>
        <Button variant="accent">
          <Plus className="mr-2 h-4 w-4" />
          Join Space
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </div>
    </div>
  ),
};

// Grocery Store Showcase - All variants laid out
export const GroceryShowcase: Story = {
  name: "🛒 Grocery Store - All Variants",
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">HIVE Button Grocery Store</h2>
        <p className="text-gray-400">Pick your perfect button variant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Default (Gold Border)</h3>
          <div className="space-y-2">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Outline Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Outline (Subtle)</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm">Small</Button>
            <Button variant="outline">Default</Button>
            <Button variant="outline" size="lg">Large</Button>
          </div>
        </div>

        {/* Ghost Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Ghost (Minimal)</h3>
          <div className="space-y-2">
            <Button variant="ghost" size="sm">Small</Button>
            <Button variant="ghost">Default</Button>
            <Button variant="ghost" size="lg">Large</Button>
          </div>
        </div>

        {/* Accent Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Accent (Gold Glow)</h3>
          <div className="space-y-2">
            <Button variant="accent" size="sm">Small</Button>
            <Button variant="accent">Default</Button>
            <Button variant="accent" size="lg">Large</Button>
          </div>
        </div>

        {/* Ritual Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Ritual (Special)</h3>
          <div className="space-y-2">
            <Button variant="ritual" size="sm">Small</Button>
            <Button variant="ritual">Default</Button>
            <Button variant="ritual" size="lg">Large</Button>
          </div>
        </div>

        {/* Surface Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Surface (Elevated)</h3>
          <div className="space-y-2">
            <Button variant="surface" size="sm">Small</Button>
            <Button variant="surface">Default</Button>
            <Button variant="surface" size="lg">Large</Button>
          </div>
        </div>

        {/* Link Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Link (Text Only)</h3>
          <div className="space-y-2">
            <Button variant="link" size="sm">Small</Button>
            <Button variant="link">Default</Button>
            <Button variant="link" size="lg">Large</Button>
          </div>
        </div>

        {/* Nav Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Nav (Navigation)</h3>
          <div className="space-y-2">
            <Button variant="nav" size="sm">Small</Button>
            <Button variant="nav">Default</Button>
            <Button variant="nav" size="lg">Large</Button>
          </div>
        </div>

        {/* Destructive Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Destructive (Danger)</h3>
          <div className="space-y-2">
            <Button variant="destructive" size="sm">Small</Button>
            <Button variant="destructive">Default</Button>
            <Button variant="destructive" size="lg">Large</Button>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          🏆 Following HIVE Design System - Gold only for focus, achievements, and rituals
        </p>
      </div>
    </div>
  ),
};
