import type { Meta, StoryObj } from '@storybook/react'
import { NavigationShell, type NavigationItem } from './navigation-shell'
import { Home, Users, User, Wrench, Calendar, Sparkles, MessageCircle, Bell } from 'lucide-react'

const meta = {
  title: 'Organisms/NavigationShell',
  component: NavigationShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete 2025 top bar navigation shell with responsive behavior, search integration, and premium glass morphism effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'solid', 'floating']
    },
    blur: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl']
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full']
    },
    logoVariant: {
      control: 'select',
      options: ['default', 'compact', 'icon']
    }
  }
} satisfies Meta<typeof NavigationShell>

export default meta
type Story = StoryObj<typeof meta>

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'feed',
    label: 'Feed',
    icon: <Home className="h-4 w-4" />,
    href: '/feed',
    tier: 1
  },
  {
    id: 'spaces',
    label: 'Spaces',
    icon: <Users className="h-4 w-4" />,
    href: '/spaces',
    tier: 1
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-4 w-4" />,
    href: '/profile',
    tier: 1
  },
  {
    id: 'hivelab',
    label: 'HiveLab',
    icon: <Wrench className="h-4 w-4" />,
    href: '/hivelab',
    tier: 3
  },
  {
    id: 'events',
    label: 'Events',
    icon: <Calendar className="h-4 w-4" />,
    href: '/events',
    tier: 3
  },
  {
    id: 'rituals',
    label: 'Rituals',
    icon: <Sparkles className="h-4 w-4" />,
    href: '/rituals',
    tier: 3
  }
]

export const Default: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/feed',
    notificationCount: 5,
    messageCount: 3
  }
}

export const GlassMorphism: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/spaces',
    variant: 'glass',
    blur: 'xl',
    notificationCount: 12,
    messageCount: 7
  },
  parameters: {
    backgrounds: {
      default: 'gradient'
    }
  }
}

export const FloatingNavigation: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/profile',
    variant: 'floating',
    maxWidth: 'lg',
    notificationCount: 2
  }
}

export const SolidVariant: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/hivelab',
    variant: 'solid',
    blur: 'none'
  }
}

export const CompactLogo: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/feed',
    logoVariant: 'compact',
    maxWidth: 'md'
  }
}

export const NoSearch: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/spaces',
    showSearch: false,
    notificationCount: 8,
    messageCount: 15
  }
}

export const MobileView: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/feed',
    notificationCount: 3,
    messageCount: 7
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}

export const TabletView: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/spaces',
    variant: 'glass',
    notificationCount: 5,
    messageCount: 2
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const WithActiveStates: Story = {
  args: {
    items: [
      ...defaultNavigationItems.slice(0, 2),
      {
        ...defaultNavigationItems[2],
        isActive: true
      },
      ...defaultNavigationItems.slice(3)
    ],
    currentPath: '/profile',
    notificationCount: 10,
    messageCount: 5
  }
}

export const HighNotificationCount: Story = {
  args: {
    items: defaultNavigationItems,
    currentPath: '/feed',
    notificationCount: 99,
    messageCount: 50
  }
}

export const InteractiveDemo: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('/feed')
    const [notificationCount, setNotificationCount] = React.useState(5)
    const [messageCount, setMessageCount] = React.useState(3)

    const handleItemClick = (item: NavigationItem) => {
      setCurrentPath(item.href)
    }

    const handleNotificationsClick = () => {
      setNotificationCount(0)
    }

    const handleMessagesClick = () => {
      setMessageCount(0)
    }

    const handleSearch = (query: string) => {
      console.log('Search:', query)
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
        <NavigationShell
          items={defaultNavigationItems.map(item => ({
            ...item,
            onClick: () => handleItemClick(item)
          }))}
          currentPath={currentPath}
          variant="glass"
          notificationCount={notificationCount}
          messageCount={messageCount}
          onNotificationsClick={handleNotificationsClick}
          onMessagesClick={handleMessagesClick}
          onSearch={handleSearch}
        />

        <main className="pt-16 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">HIVE Navigation Demo</h1>
            <p className="text-muted-foreground mb-8">
              Experience the premium 2025 navigation system with glass morphism effects and responsive behavior.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Current Page</h3>
                <p className="text-muted-foreground">{currentPath}</p>
              </div>

              <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <p className="text-muted-foreground">
                  {notificationCount} unread notifications
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Messages</h3>
                <p className="text-muted-foreground">
                  {messageCount} unread messages
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Glass morphism effects</li>
                  <li>• Responsive breakpoints</li>
                  <li>• Mobile menu system</li>
                  <li>• Badge notifications</li>
                  <li>• Search integration</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}