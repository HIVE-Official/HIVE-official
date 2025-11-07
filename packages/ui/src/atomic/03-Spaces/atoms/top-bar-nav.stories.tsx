'use client';

import type { Meta, StoryObj } from '@storybook/react'
import { TopBarNav } from './top-bar-nav'
import { Home, Users, User, Bell, MessageCircle, Search } from 'lucide-react'

const meta = {
  title: 'Atoms/TopBarNav',
  component: TopBarNav,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sleek 2025 navigation item component for top bar navigation with advanced hover effects and responsive behavior.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active', 'ghost', 'minimal']
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon']
    },
    responsive: {
      control: 'select',
      options: ['desktop', 'mobile', 'always']
    },
    labelVisibility: {
      control: 'select',
      options: ['always', 'desktop', 'mobile', 'never']
    },
    iconState: {
      control: 'select',
      options: ['default', 'active', 'pulse']
    }
  }
} satisfies Meta<typeof TopBarNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Home className="h-4 w-4" />,
    label: 'Feed',
    variant: 'default'
  }
}

export const Active: Story = {
  args: {
    icon: <Users className="h-4 w-4" />,
    label: 'Spaces',
    variant: 'active',
    isActive: true
  }
}

export const WithBadge: Story = {
  args: {
    icon: <MessageCircle className="h-4 w-4" />,
    label: 'Messages',
    badge: '3',
    variant: 'default'
  }
}

export const IconOnly: Story = {
  args: {
    icon: <Bell className="h-4 w-4" />,
    size: 'icon',
    badge: '12'
  }
}

export const Minimal: Story = {
  args: {
    icon: <User className="h-4 w-4" />,
    label: 'Profile',
    variant: 'minimal'
  }
}

export const Ghost: Story = {
  args: {
    icon: <Search className="h-4 w-4" />,
    label: 'Search',
    variant: 'ghost'
  }
}

export const MobileVisible: Story = {
  args: {
    icon: <Home className="h-4 w-4" />,
    label: 'Feed',
    responsive: 'mobile',
    labelVisibility: 'mobile'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TopBarNav
        icon={<Home className="h-3 w-3" />}
        label="Small"
        size="sm"
      />
      <TopBarNav
        icon={<Home className="h-4 w-4" />}
        label="Default"
        size="default"
      />
      <TopBarNav
        icon={<Home className="h-5 w-5" />}
        label="Large"
        size="lg"
      />
    </div>
  )
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-4 bg-background">
      <TopBarNav
        icon={<Home className="h-4 w-4" />}
        label="Default"
        variant="default"
      />
      <TopBarNav
        icon={<Users className="h-4 w-4" />}
        label="Active"
        variant="active"
        isActive
      />
      <TopBarNav
        icon={<User className="h-4 w-4" />}
        label="Ghost"
        variant="ghost"
      />
      <TopBarNav
        icon={<Search className="h-4 w-4" />}
        label="Minimal"
        variant="minimal"
      />
    </div>
  )
}

export const InteractiveDemo: Story = {
  render: () => {
    const [activeItem, setActiveItem] = React.useState('feed')

    return (
      <div className="flex items-center gap-1 p-4 bg-muted/50 rounded-lg">
        {[
          { id: 'feed', icon: <Home className="h-4 w-4" />, label: 'Feed' },
          { id: 'spaces', icon: <Users className="h-4 w-4" />, label: 'Spaces' },
          { id: 'profile', icon: <User className="h-4 w-4" />, label: 'Profile' },
          { id: 'messages', icon: <MessageCircle className="h-4 w-4" />, label: 'Messages', badge: '3' }
        ].map((item) => (
          <TopBarNav
            key={item.id}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </div>
    )
  }
}