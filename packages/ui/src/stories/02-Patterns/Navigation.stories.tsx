import type { Meta, StoryObj } from '@storybook/react'
import { Home, Compass, User, Search, Bell, Plus, Menu } from 'lucide-react'

// Official HIVE logo component using the real SVG from public/assets/whitelogo.svg
function HiveLogoStorybook({ size = "lg" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }
  
  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center`}>
      <svg 
        id="Layer_1" 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1500 1500"
        className="w-full h-full"
      >
        <defs>
          <style>
            {`.cls-1 { fill: #fff; }`}
          </style>
        </defs>
        <path 
          className="cls-1" 
          d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
        />
      </svg>
    </div>
  )
}

// Campus Command Strip - The definitive HIVE navigation
function CampusCommandStrip() {
  return (
    <div className="w-full">
      <header className="bg-[var(--hive-background-primary)] border-b border-[var(--hive-gray-700)] sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-180 ease-hive">
            <HiveLogoStorybook size="md" />
            <span 
              className="text-lg font-bold text-[var(--hive-text-primary)] tracking-tight" 
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              HIVE
            </span>
          </button>

          {/* Primary Navigation + HiveLAB */}
          <nav className="flex items-center">
            <div className="flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1">
              <button 
                className="px-4 py-1.5 rounded-md bg-[var(--hive-gray-700)] border border-[var(--hive-gold)] text-[var(--hive-text-primary)] text-sm font-medium transition-all duration-180 ease-hive relative" 
                style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
              >
                Feed
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[var(--hive-gold)] rounded-full"></div>
              </button>
              <button 
                className="px-4 py-1.5 rounded-md text-[var(--hive-text-primary)]/70 hover:text-[var(--hive-text-primary)]/90 hover:bg-[var(--hive-gray-700)] text-sm font-medium transition-all duration-180 ease-hive" 
                style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
              >
                Spaces
              </button>
              <button 
                className="px-4 py-1.5 rounded-md text-[var(--hive-text-primary)]/70 hover:text-[var(--hive-text-primary)]/90 hover:bg-[var(--hive-gray-700)] text-sm font-medium transition-all duration-180 ease-hive" 
                style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
              >
                Profile
              </button>
              <button 
                className="px-4 py-1.5 rounded-md text-[var(--hive-gold)] hover:text-[var(--hive-gold)]/90 hover:bg-[var(--hive-gray-700)] text-sm font-medium transition-all duration-180 ease-hive" 
                style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
              >
                HiveLAB
              </button>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center">
            {/* Command Palette */}
            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)]/50 transition-all duration-180 ease-hive group min-w-[200px]">
              <Search className="w-4 h-4 text-[#6B7280] group-hover:text-[var(--hive-text-primary)]" />
              <span 
                className="text-sm text-[#6B7280] group-hover:text-[var(--hive-text-primary)] flex-1 text-left" 
                style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
              >
                Search or type command...
              </span>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 text-xs text-[#6B7280] bg-[var(--hive-gray-700)] rounded border border-[#3A3A3A]">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-xs text-[#6B7280] bg-[var(--hive-gray-700)] rounded border border-[#3A3A3A]">K</kbd>
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

// Classic navigation variant
function NavigationVariant1() {
  return (
    <div className="w-full">
      <header className="border-b border-[var(--hive-gray-700)] bg-[var(--hive-background-primary)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HiveLogoStorybook size="lg" />
            <span 
              className="text-xl font-bold text-[var(--hive-text-primary)] tracking-tight" 
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              HIVE
            </span>
          </div>
          
          <nav className="flex items-center space-x-8">
            <button 
              className="text-sm font-medium text-[var(--hive-text-primary)] hover:text-[var(--hive-gold)] transition-colors duration-180 ease-hive" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Feed
            </button>
            <button 
              className="text-sm font-medium text-[#6B7280] hover:text-[var(--hive-gold)] transition-colors duration-180 ease-hive" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Spaces
            </button>
            <button 
              className="text-sm font-medium text-[#6B7280] hover:text-[var(--hive-gold)] transition-colors duration-180 ease-hive" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Profile
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="h-8 px-3 bg-[var(--hive-gray-700)] text-[var(--hive-text-primary)] hover:bg-[#3A3A3A] border border-[var(--hive-gray-700)] focus:ring-2 focus:ring-[var(--hive-gold)] focus:ring-offset-2 transition-all duration-180 ease-hive rounded-md flex items-center text-sm font-medium">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--hive-background-secondary)] border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)]/50 transition-colors duration-180 ease-hive flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

// Mobile navigation variant
function MobileNavigationVariant1() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[var(--hive-gray-700)] bg-[var(--hive-background-primary)]/95 backdrop-blur-lg">
        <div className="flex">
          <button className="flex-1 flex flex-col items-center py-2 px-1 min-h-[64px] relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[var(--hive-gold)] rounded-full"></div>
            <Home className="w-5 h-5 text-[var(--hive-gold)] mb-1" />
            <span 
              className="text-xs font-medium text-[var(--hive-gold)]" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Feed
            </span>
          </button>
          <button className="flex-1 flex flex-col items-center py-2 px-1 min-h-[64px] hover:bg-[var(--hive-background-secondary)] transition-colors duration-180">
            <Compass className="w-5 h-5 text-[#6B7280] mb-1" />
            <span 
              className="text-xs font-medium text-[#6B7280]" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Spaces
            </span>
          </button>
          <button className="flex-1 flex flex-col items-center py-2 px-1 min-h-[64px] hover:bg-[var(--hive-background-secondary)] transition-colors duration-180">
            <User className="w-5 h-5 text-[#6B7280] mb-1" />
            <span 
              className="text-xs font-medium text-[#6B7280]" 
              style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}
            >
              Profile
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}

const meta: Meta<typeof React.Fragment> = {
  title: '02-Patterns/Navigation Variations',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'var(--hive-background-primary)' },
        { name: 'light', value: '#FFFFFF' }
      ]
    },
    docs: {
      description: {
        component: 'Navigation variations for HIVE structure: Feed | Spaces | Profile. All variations follow HIVE design system with proper color palette (var(--hive-background-primary), var(--hive-gold), #6B7280) and motion timing (180ms, cubic-bezier).'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const CampusCommandStripStory: Story = {
  name: '⭐ Campus Command Strip (RECOMMENDED)',
  render: () => <CampusCommandStrip />,
  parameters: {
    docs: {
      description: {
        story: 'The definitive HIVE navigation design. Features: consistent pill-style nav with HiveLAB as gold text, command palette with keyboard shortcuts (⌘K), and clean visual hierarchy. HiveLAB integrates seamlessly with only text color differentiation.'
      }
    }
  }
}

export const DesktopVariant1: Story = {
  name: 'Desktop: Classic Header',
  render: () => <NavigationVariant1 />,
  parameters: {
    docs: {
      description: {
        story: 'Traditional header layout with logo left, navigation center-left, actions right. Clean and familiar with proper HIVE brand colors and hover states.'
      }
    }
  }
}

export const MobileVariant1: Story = {
  name: 'Mobile: Standard Bottom Nav',
  render: () => <MobileNavigationVariant1 />,
  parameters: {
    docs: {
      description: {
        story: 'Classic bottom navigation with gold indicator line. Standard mobile pattern with HIVE brand colors and proper active states.'
      }
    }
  }
}

export const ResponsiveComparison: Story = {
  name: 'Responsive: Desktop + Mobile Comparison',
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 
          className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]" 
          style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
        >
          Desktop: Campus Command Strip (Recommended)
        </h3>
        <CampusCommandStrip />
      </div>
      <div>
        <h3 
          className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]" 
          style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
        >
          Mobile: Standard Bottom Nav (Recommended)
        </h3>
        <MobileNavigationVariant1 />
      </div>
      <div className="mt-8 p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-gray-700)]">
        <h4 
          className="text-sm font-medium text-[var(--hive-text-primary)] mb-2" 
          style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
        >
          HIVE Navigation Principles
        </h4>
        <ul className="text-xs text-[#6B7280] space-y-1">
          <li>• Clean Feed | Spaces | Profile structure (no Tools until Builder status)</li>
          <li>• Gold (var(--hive-gold)) reserved for active states and focus rings only</li>
          <li>• 180ms transitions with cubic-bezier(0.33,0.65,0,1) timing</li>
          <li>• Space Grotesk typography for brand consistency</li>
          <li>• Web-first design with responsive mobile adaptation</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recommended navigation patterns with HIVE design principles and implementation notes.'
      }
    }
  }
}