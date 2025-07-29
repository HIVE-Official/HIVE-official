import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../../atomic/atoms/icon';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { 
  Home,
  User,
  Settings,
  Search,
  Heart,
  Star,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  MapPin,
  Camera,
  Image,
  Video,
  Music,
  Download,
  Upload,
  Share,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Copy,
  Save,
  Refresh,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Zap,
  Target,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Database,
  Server,
  Code,
  Terminal,
  Github,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle
} from 'lucide-react';

const meta: Meta<typeof Icon> = {
  title: '02-atoms/Content Media/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Icon Component** - Consistent icon rendering with semantic colors and sizing

Part of the HIVE Atomic Design System providing standardized icon usage across the platform.

## Features
- **6 Sizes**: xs (3), sm (16px), md (5), lg (24px), xl (32px), 2xl (10)
- **7 Semantic Colors**: Primary, secondary, muted, and accent colors (gold, ruby, emerald, sapphire)
- **3 Visual Variants**: Default, outlined, filled styles
- **Lucide Integration**: Full compatibility with Lucide React icon library
- **Consistent Sizing**: Standardized dimensions for visual harmony
- **Semantic Colors**: Uses HIVE design tokens for consistent theming
- **Performance**: Optimized SVG rendering with flex-shrink-0

## Icon Library
Uses Lucide React icons for consistent, high-quality SVG icons with:
- Over 1000+ icons available
- Consistent stroke width and styling
- Tree-shakable for optimal bundle size
- Accessibility-ready with proper attributes

## Use Cases
- **Navigation**: Menu items, buttons, and interactive elements
- **Status Indicators**: Success, error, warning, and info states
- **Actions**: Save, edit, delete, and other user actions
- **Content**: Media, documents, and content type indicators
- **System**: Settings, notifications, and system states
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Lucide icon component to render'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size variant'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'gold', 'ruby', 'emerald', 'sapphire'],
      description: 'Semantic color variant'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual style variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Icon
export const Default: Story = {
  args: {
    icon: Home,
    size: 'md',
    color: 'primary'
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center space-y-2">
        <Icon icon={Star} size="xs" />
        <Text variant="body-xs" color="secondary">XS (3)</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Star} size="sm" />
        <Text variant="body-xs" color="secondary">SM (16px)</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Star} size="md" />
        <Text variant="body-xs" color="secondary">MD (5)</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Star} size="lg" />
        <Text variant="body-xs" color="secondary">LG (24px)</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Star} size="xl" />
        <Text variant="body-xs" color="secondary">XL (32px)</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Star} size="2xl" />
        <Text variant="body-xs" color="secondary">2XL (10)</Text>
      </div>
    </div>
  )
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="primary" size="lg" />
        <Text variant="body-sm" color="secondary">Primary</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="secondary" size="lg" />
        <Text variant="body-sm" color="secondary">Secondary</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="muted" size="lg" />
        <Text variant="body-sm" color="secondary">Muted</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="gold" size="lg" />
        <Text variant="body-sm" color="secondary">Gold</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="ruby" size="lg" />
        <Text variant="body-sm" color="secondary">Ruby</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="emerald" size="lg" />
        <Text variant="body-sm" color="secondary">Emerald</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Heart} color="sapphire" size="lg" />
        <Text variant="body-sm" color="secondary">Sapphire</Text>
      </div>
    </div>
  )
};

// Visual Variants
export const VisualVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center space-y-2">
        <Icon icon={Shield} variant="default" size="xl" color="primary" />
        <Text variant="body-sm" color="secondary">Default</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Shield} variant="outlined" size="xl" color="primary" />
        <Text variant="body-sm" color="secondary">Outlined</Text>
      </div>
      
      <div className="text-center space-y-2">
        <Icon icon={Shield} variant="filled" size="xl" color="primary" />
        <Text variant="body-sm" color="secondary">Filled</Text>
      </div>
    </div>
  )
};

// Common Icons Collection
export const CommonIcons: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Navigation Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={Home} size="lg" />
            <Text variant="body-xs" color="secondary">Home</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={User} size="lg" />
            <Text variant="body-xs" color="secondary">User</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Settings} size="lg" />
            <Text variant="body-xs" color="secondary">Settings</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Search} size="lg" />
            <Text variant="body-xs" color="secondary">Search</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Bell} size="lg" />
            <Text variant="body-xs" color="secondary">Bell</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Mail} size="lg" />
            <Text variant="body-xs" color="secondary">Mail</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Calendar} size="lg" />
            <Text variant="body-xs" color="secondary">Calendar</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={MessageSquare} size="lg" />
            <Text variant="body-xs" color="secondary">Message</Text>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Action Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={Plus} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Add</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Edit} size="lg" color="sapphire" />
            <Text variant="body-xs" color="secondary">Edit</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Trash2} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Delete</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Save} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Save</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Copy} size="lg" />
            <Text variant="body-xs" color="secondary">Copy</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Share} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Share</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Download} size="lg" color="sapphire" />
            <Text variant="body-xs" color="secondary">Download</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Upload} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Upload</Text>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Status Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={CheckCircle} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Success</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={XCircle} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Error</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={AlertTriangle} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Warning</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Info} size="lg" color="sapphire" />
            <Text variant="body-xs" color="secondary">Info</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Clock} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Pending</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Zap} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Active</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Shield} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Secure</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Target} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Target</Text>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Media Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={Play} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Play</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Pause} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Pause</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Camera} size="lg" />
            <Text variant="body-xs" color="secondary">Camera</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Image} size="lg" />
            <Text variant="body-xs" color="secondary">Image</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Video} size="lg" />
            <Text variant="body-xs" color="secondary">Video</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Music} size="lg" />
            <Text variant="body-xs" color="secondary">Music</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Volume2} size="lg" />
            <Text variant="body-xs" color="secondary">Volume</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={VolumeX} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Muted</Text>
          </div>
        </div>
      </div>
    </div>
  )
};

// Icon in Context
export const IconInContext: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Navigation Menu</Text>
        <HiveCard className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
              <Icon icon={Home} size="sm" />
              <Text>Dashboard</Text>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
              <Icon icon={User} size="sm" />
              <Text>Profile</Text>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
              <Icon icon={Settings} size="sm" />
              <Text>Settings</Text>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
              <Icon icon={Bell} size="sm" />
              <Text>Notifications</Text>
              <Badge variant="primary" count={3} className="ml-auto" />
            </div>
          </div>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Status Cards</Text>
        <div className="grid grid-cols-2 gap-4">
          <HiveCard className="p-4">
            <div className="flex items-center gap-3">
              <Icon icon={CheckCircle} size="lg" color="emerald" />
              <div>
                <Text variant="heading-sm">System Online</Text>
                <Text variant="body-sm" color="secondary">All services operational</Text>
              </div>
            </div>
          </HiveCard>
          
          <HiveCard className="p-4">
            <div className="flex items-center gap-3">
              <Icon icon={AlertTriangle} size="lg" color="gold" />
              <div>
                <Text variant="heading-sm">Maintenance</Text>
                <Text variant="body-sm" color="secondary">Scheduled downtime at 2AM</Text>
              </div>
            </div>
          </HiveCard>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Action Buttons</Text>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-blue-700 transition-colors">
            <Icon icon={Plus} size="sm" />
            Create New
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-gray-700 transition-colors">
            <Icon icon={Download} size="sm" />
            Export
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-red-700 transition-colors">
            <Icon icon={Trash2} size="sm" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Data Visualization</Text>
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Text variant="heading-sm">Analytics Dashboard</Text>
            <Icon icon={BarChart3} size="lg" color="gold" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Icon icon={TrendingUp} size="xl" color="emerald" className="mx-auto mb-2" />
              <Text variant="display-sm" color="emerald">+23%</Text>
              <Text variant="body-sm" color="secondary">Growth</Text>
            </div>
            
            <div className="text-center">
              <Icon icon={Activity} size="xl" color="sapphire" className="mx-auto mb-2" />
              <Text variant="display-sm" color="sapphire">1.2K</Text>
              <Text variant="body-sm" color="secondary">Active Users</Text>
            </div>
            
            <div className="text-center">
              <Icon icon={Server} size="xl" color="gold" className="mx-auto mb-2" />
              <Text variant="display-sm" color="gold">99.9%</Text>
              <Text variant="body-sm" color="secondary">Uptime</Text>
            </div>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

// Technical Icons
export const TechnicalIcons: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Development Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={Code} size="lg" />
            <Text variant="body-xs" color="secondary">Code</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Terminal} size="lg" />
            <Text variant="body-xs" color="secondary">Terminal</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Github} size="lg" />
            <Text variant="body-xs" color="secondary">GitHub</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Database} size="lg" />
            <Text variant="body-xs" color="secondary">Database</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Server} size="lg" />
            <Text variant="body-xs" color="secondary">Server</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Globe} size="lg" />
            <Text variant="body-xs" color="secondary">Web</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Wifi} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Connected</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={WifiOff} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Offline</Text>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">System Icons</Text>
        <div className="grid grid-cols-8 gap-4">
          <div className="text-center space-y-2">
            <Icon icon={Battery} size="lg" color="emerald" />
            <Text variant="body-xs" color="secondary">Battery</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={BatteryLow} size="lg" color="ruby" />
            <Text variant="body-xs" color="secondary">Low Battery</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Lock} size="lg" />
            <Text variant="body-xs" color="secondary">Locked</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Unlock} size="lg" color="gold" />
            <Text variant="body-xs" color="secondary">Unlocked</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Eye} size="lg" />
            <Text variant="body-xs" color="secondary">Visible</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={EyeOff} size="lg" color="muted" />
            <Text variant="body-xs" color="secondary">Hidden</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={Refresh} size="lg" color="sapphire" />
            <Text variant="body-xs" color="secondary">Refresh</Text>
          </div>
          <div className="text-center space-y-2">
            <Icon icon={ExternalLink} size="lg" />
            <Text variant="body-xs" color="secondary">External</Text>
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="p-8">
      <Icon {...args} />
    </div>
  ),
  args: {
    icon: Star,
    size: 'lg',
    color: 'primary',
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different icon configurations including size, color, and visual variants. Note: The icon prop requires selecting from the available Lucide icons.'
      }
    }
  }
};