import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Home, User, Bell, Search, MessageCircle, Compass, Plus } from 'lucide-react'
import { BottomNavBar } from '../components/BottomNavBar'
import { AppHeader } from '../components/AppHeader'
import { HiveLogo } from '../components/HiveLogo'

const meta: Meta = {
  title: '2025 AI/Modern Navigation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modern navigation components with floating docks, adaptive headers, and 2025 AI feel.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

// Bottom Navigation Stories
export const FloatingDock: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home')
    
    const navItems = [
      { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
      { id: 'explore', icon: <Compass className="w-6 h-6" />, label: 'Explore', badge: 3 },
      { id: 'create', icon: <Plus className="w-6 h-6" />, label: 'Create' },
      { id: 'messages', icon: <MessageCircle className="w-6 h-6" />, label: 'Messages', badge: 12 },
      { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
    ]
    
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Floating Dock Navigation</h1>
          <p className="text-muted">Modern 2025 AI-style floating dock</p>
        </div>
        
        <BottomNavBar.Root variant="floating">
          <BottomNavBar.Content itemCount={navItems.length}>
            {navItems.map((item) => (
              <BottomNavBar.Item
                key={item.id}
                isActive={activeTab === item.id}
                variant="bubble"
                badge={item.badge}
                onClick={() => setActiveTab(item.id)}
              >
                <BottomNavBar.Icon>{item.icon}</BottomNavBar.Icon>
                {activeTab === item.id && (
                  <BottomNavBar.Indicator variant="dot" />
                )}
              </BottomNavBar.Item>
            ))}
          </BottomNavBar.Content>
        </BottomNavBar.Root>
      </div>
    )
  },
}

export const BottomNavVariants: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home')
    
    const navItems = [
      { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
      { id: 'search', icon: <Search className="w-5 h-5" />, label: 'Search' },
      { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
    ]
    
    return (
      <div className="space-y-8 p-8 bg-background min-h-screen">
        <div className="space-y-8">
          {/* Floating Dock */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4">Floating Dock</h3>
            <div className="relative h-24 flex items-end justify-center">
              <BottomNavBar.Root variant="floating">
                <BottomNavBar.Content>
                  {navItems.map((item) => (
                    <BottomNavBar.Item
                      key={item.id}
                      isActive={activeTab === item.id}
                      variant="bubble"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <BottomNavBar.Icon>{item.icon}</BottomNavBar.Icon>
                    </BottomNavBar.Item>
                  ))}
                </BottomNavBar.Content>
              </BottomNavBar.Root>
            </div>
          </div>
          
          {/* Dock Style */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4">Dock Style</h3>
            <div className="relative h-20 flex items-end justify-center">
              <BottomNavBar.Root variant="dock">
                <BottomNavBar.Content>
                  {navItems.map((item) => (
                    <BottomNavBar.Item
                      key={item.id}
                      isActive={activeTab === item.id}
                      variant="chip"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <BottomNavBar.Icon>{item.icon}</BottomNavBar.Icon>
                    </BottomNavBar.Item>
                  ))}
                </BottomNavBar.Content>
              </BottomNavBar.Root>
            </div>
          </div>
          
          {/* Traditional Fixed */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4">Fixed Style</h3>
            <div className="relative h-16 flex items-end">
              <BottomNavBar.Root variant="fixed" className="relative">
                <BottomNavBar.Content>
                  {navItems.map((item) => (
                    <BottomNavBar.Item
                      key={item.id}
                      isActive={activeTab === item.id}
                      variant="minimal"
                      showLabel
                      onClick={() => setActiveTab(item.id)}
                    >
                      <BottomNavBar.Icon>{item.icon}</BottomNavBar.Icon>
                      <BottomNavBar.Label>{item.label}</BottomNavBar.Label>
                    </BottomNavBar.Item>
                  ))}
                </BottomNavBar.Content>
              </BottomNavBar.Root>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const WithBadgesAndStates: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home')
    
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Navigation with Badges</h1>
          <p className="text-muted">Different states and notifications</p>
        </div>
        
        <BottomNavBar.Root variant="floating">
          <BottomNavBar.Content itemCount={4}>
            <BottomNavBar.Item
              isActive={activeTab === 'home'}
              variant="bubble"
              onClick={() => setActiveTab('home')}
            >
              <BottomNavBar.Icon>
                <Home className="w-6 h-6" />
              </BottomNavBar.Icon>
            </BottomNavBar.Item>
            
            <BottomNavBar.Item
              isActive={activeTab === 'messages'}
              variant="bubble"
              badge={5}
              onClick={() => setActiveTab('messages')}
            >
              <BottomNavBar.Icon>
                <MessageCircle className="w-6 h-6" />
              </BottomNavBar.Icon>
            </BottomNavBar.Item>
            
            <BottomNavBar.Item
              isActive={activeTab === 'notifications'}
              variant="bubble"
              badge={99}
              onClick={() => setActiveTab('notifications')}
            >
              <BottomNavBar.Icon>
                <Bell className="w-6 h-6" />
              </BottomNavBar.Icon>
            </BottomNavBar.Item>
            
            <BottomNavBar.Item
              isActive={activeTab === 'profile'}
              variant="bubble"
              onClick={() => setActiveTab('profile')}
            >
              <BottomNavBar.Icon>
                <User className="w-6 h-6" />
              </BottomNavBar.Icon>
            </BottomNavBar.Item>
          </BottomNavBar.Content>
        </BottomNavBar.Root>
      </div>
    )
  },
}

// App Header Stories
export const ModernHeader: StoryObj = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false)
    
    return (
      <div className="min-h-screen bg-background">
        <AppHeader.Root>
          <AppHeader.Content>
            <AppHeader.Logo>
              <HiveLogo className="h-8 w-auto" />
            </AppHeader.Logo>
            
            <AppHeader.Nav className="hidden md:flex">
              <a href="#" className="text-foreground hover:text-accent">Home</a>
              <a href="#" className="text-muted hover:text-accent">Explore</a>
              <a href="#" className="text-muted hover:text-accent">Communities</a>
            </AppHeader.Nav>
            
            <AppHeader.Actions>
              <AppHeader.Search 
                placeholder="Search HIVE..."
                onSearchClick={() => console.log('Search clicked')}
              />
              <AppHeader.Notifications count={3} />
              <AppHeader.MenuButton 
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </AppHeader.Actions>
          </AppHeader.Content>
        </AppHeader.Root>
        
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Modern App Header</h1>
          <p className="text-muted mb-8">
            Adaptive header with search, notifications, and responsive design
          </p>
          
          {/* Scroll content */}
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => ({ id: `content-block-${i}`, index: i })).map((block) => (
              <div key={block.id} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold">Content Block {block.index + 1}</h3>
                <p className="text-muted">This is sample content to demonstrate scrolling behavior.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const HeaderVariants: StoryObj = {
  render: () => {
    return (
      <div className="space-y-8">
        {/* Default Header */}
        <div className="relative bg-background border border-border rounded-lg overflow-hidden">
          <AppHeader.Root variant="default">
            <AppHeader.Content>
              <AppHeader.Logo>
                <HiveLogo className="h-8 w-auto" />
              </AppHeader.Logo>
              <AppHeader.Actions>
                <AppHeader.Search variant="chip" />
                <AppHeader.Notifications showDot />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
          <div className="p-4">
            <h3 className="font-semibold">Default Header</h3>
            <p className="text-sm text-muted">Standard sticky header with backdrop blur</p>
          </div>
        </div>
        
        {/* Minimal Header */}
        <div className="relative bg-background border border-border rounded-lg overflow-hidden">
          <AppHeader.Root variant="minimal" transparent>
            <AppHeader.Content>
              <AppHeader.Logo>
                <HiveLogo className="h-8 w-auto" />
              </AppHeader.Logo>
              <AppHeader.Actions>
                <AppHeader.Search variant="minimal" />
                <AppHeader.Notifications variant="minimal" count={5} />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
          <div className="p-4">
            <h3 className="font-semibold">Minimal Header</h3>
            <p className="text-sm text-muted">Clean, transparent design</p>
          </div>
        </div>
        
        {/* Floating Header */}
        <div className="relative bg-background border border-border rounded-lg overflow-hidden min-h-32 flex items-center justify-center">
          <AppHeader.Root variant="floating" className="relative">
            <AppHeader.Content>
              <AppHeader.Logo>
                <HiveLogo className="h-6 w-auto" />
              </AppHeader.Logo>
              <AppHeader.Actions>
                <AppHeader.Search variant="command" />
                <AppHeader.Notifications variant="chip" count={12} />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
        </div>
      </div>
    )
  },
}

export const SearchVariants: StoryObj = {
  render: () => {
    return (
      <div className="space-y-6 p-8 max-w-2xl">
        <h2 className="text-2xl font-bold">Search Component Variants</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted mb-2">Chip Style</h3>
            <AppHeader.Search 
              variant="chip"
              placeholder="Search with chip style..."
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted mb-2">Command Style</h3>
            <AppHeader.Search 
              variant="command"
              placeholder="Search everything..."
              shortcut="⌘K"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted mb-2">Minimal Style</h3>
            <AppHeader.Search 
              variant="minimal"
              placeholder="Minimal search..."
            />
          </div>
        </div>
      </div>
    )
  },
}