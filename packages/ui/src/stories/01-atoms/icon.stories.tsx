import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../atomic/atoms/icon';
import { 
  User, Settings, Search, Bell, MessageCircle, Calendar, BookOpen, Users, 
  Zap, Star, Heart, Shield, Award, Clock, MapPin, Home, Mail, Phone,
  ChevronRight, ChevronDown, Plus, Minus, X, Check, AlertCircle,
  Info, HelpCircle, Eye, EyeOff, Download, Upload, Share, Copy,
  Edit, Trash2, Play, Pause, Volume2, VolumeOff, Wifi, WifiOff,
  Battery, BatteryLow, Sun, Moon, Camera, Image, FileText, Folder,
  Code, Terminal, Database, Server, Cloud, Cpu, HardDrive, Monitor
} from 'lucide-react';

const meta: Meta<typeof Icon> = {
  title: '01-Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE icon component for consistent iconography using Lucide React icons with various sizes, colors, and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Lucide React icon component',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'gold', 'ruby', 'emerald', 'sapphire'],
      description: 'Icon color theme',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Icon style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    icon: User,
    size: 'md',
    color: 'primary',
  },
};

export const Large: Story = {
  args: {
    icon: Star,
    size: 'xl',
    color: 'gold',
  },
};

export const Outlined: Story = {
  args: {
    icon: Heart,
    size: 'lg',
    color: 'ruby',
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    icon: Shield,
    size: 'lg',
    color: 'emerald',
    variant: 'filled',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <div className="text-center">
        <Icon icon={Star} size="xs" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XS</p>
      </div>
      <div className="text-center">
        <Icon icon={Star} size="sm" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">SM</p>
      </div>
      <div className="text-center">
        <Icon icon={Star} size="md" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">MD</p>
      </div>
      <div className="text-center">
        <Icon icon={Star} size="lg" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">LG</p>
      </div>
      <div className="text-center">
        <Icon icon={Star} size="xl" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XL</p>
      </div>
      <div className="text-center">
        <Icon icon={Star} size="2xl" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">2XL</p>
      </div>
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      <div className="text-center">
        <Icon icon={User} size="lg" color="primary" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Primary</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="secondary" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Secondary</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="muted" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Muted</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="gold" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Gold</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="ruby" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Ruby</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="emerald" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Emerald</p>
      </div>
      <div className="text-center">
        <Icon icon={User} size="lg" color="sapphire" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Sapphire</p>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-4">
      <div className="text-center">
        <Icon icon={Heart} size="2xl" color="ruby" variant="default" />
        <p className="mt-4 text-sm text-hive-text-secondary">Default</p>
        <p className="text-xs text-hive-text-mutedLight">Standard appearance</p>
      </div>
      <div className="text-center">
        <Icon icon={Heart} size="2xl" color="ruby" variant="outlined" />
        <p className="mt-4 text-sm text-hive-text-secondary">Outlined</p>
        <p className="text-xs text-hive-text-mutedLight">Stroke only, no fill</p>
      </div>
      <div className="text-center">
        <Icon icon={Heart} size="2xl" color="ruby" variant="filled" />
        <p className="mt-4 text-sm text-hive-text-secondary">Filled</p>
        <p className="text-xs text-hive-text-mutedLight">Solid fill</p>
      </div>
    </div>
  ),
};

// Campus icon categories
export const CampusIconCategories: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">User & Social Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
          {[
            { icon: User, name: 'User' },
            { icon: Users, name: 'Users' },
            { icon: MessageCircle, name: 'Message' },
            { icon: Bell, name: 'Bell' },
            { icon: Heart, name: 'Heart' },
            { icon: Star, name: 'Star' },
            { icon: Shield, name: 'Shield' },
            { icon: Award, name: 'Award' },
            { icon: Mail, name: 'Mail' },
            { icon: Phone, name: 'Phone' },
          ].map((item, index) => (
            <div key={index} className="text-center p-3 border border-hive-border-subtle rounded-lg bg-hive-background-secondary hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color="primary" />
              <p className="mt-2 text-xs text-hive-text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Academic & Learning Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
          {[
            { icon: BookOpen, name: 'Book', color: 'emerald' },
            { icon: Calendar, name: 'Calendar', color: 'sapphire' },
            { icon: Clock, name: 'Clock', color: 'gold' },
            { icon: Search, name: 'Search', color: 'primary' },
            { icon: FileText, name: 'File', color: 'secondary' },
            { icon: Folder, name: 'Folder', color: 'gold' },
            { icon: Download, name: 'Download', color: 'emerald' },
            { icon: Upload, name: 'Upload', color: 'sapphire' },
            { icon: Share, name: 'Share', color: 'primary' },
            { icon: Copy, name: 'Copy', color: 'secondary' },
          ].map((item, index) => (
            <div key={index} className="text-center p-3 border border-hive-border-subtle rounded-lg bg-hive-background-secondary hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color={item.color as any} />
              <p className="mt-2 text-xs text-hive-text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Building & Tech Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
          {[
            { icon: Code, name: 'Code', color: 'emerald' },
            { icon: Terminal, name: 'Terminal', color: 'primary' },
            { icon: Zap, name: 'Zap', color: 'gold' },
            { icon: Settings, name: 'Settings', color: 'secondary' },
            { icon: Database, name: 'Database', color: 'sapphire' },
            { icon: Server, name: 'Server', color: 'ruby' },
            { icon: Cloud, name: 'Cloud', color: 'sapphire' },
            { icon: Cpu, name: 'CPU', color: 'emerald' },
            { icon: HardDrive, name: 'Storage', color: 'primary' },
            { icon: Monitor, name: 'Monitor', color: 'secondary' },
          ].map((item, index) => (
            <div key={index} className="text-center p-3 border border-hive-border-subtle rounded-lg bg-hive-background-secondary hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color={item.color as any} />
              <p className="mt-2 text-xs text-hive-text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Navigation & Action Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
          {[
            { icon: Home, name: 'Home', color: 'gold' },
            { icon: ChevronRight, name: 'Next', color: 'primary' },
            { icon: ChevronDown, name: 'Down', color: 'primary' },
            { icon: Plus, name: 'Add', color: 'emerald' },
            { icon: Minus, name: 'Remove', color: 'ruby' },
            { icon: X, name: 'Close', color: 'secondary' },
            { icon: Check, name: 'Check', color: 'emerald' },
            { icon: Edit, name: 'Edit', color: 'sapphire' },
            { icon: Trash2, name: 'Delete', color: 'ruby' },
            { icon: MapPin, name: 'Location', color: 'gold' },
          ].map((item, index) => (
            <div key={index} className="text-center p-3 border border-hive-border-subtle rounded-lg bg-hive-background-secondary hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color={item.color as any} />
              <p className="mt-2 text-xs text-hive-text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Status & Feedback Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
          {[
            { icon: AlertCircle, name: 'Alert', color: 'ruby' },
            { icon: Info, name: 'Info', color: 'sapphire' },
            { icon: HelpCircle, name: 'Help', color: 'primary' },
            { icon: Eye, name: 'View', color: 'secondary' },
            { icon: EyeOff, name: 'Hide', color: 'muted' },
            { icon: Wifi, name: 'Online', color: 'emerald' },
            { icon: WifiOff, name: 'Offline', color: 'ruby' },
            { icon: Battery, name: 'Battery', color: 'emerald' },
          ].map((item, index) => (
            <div key={index} className="text-center p-3 border border-hive-border-subtle rounded-lg bg-hive-background-secondary hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color={item.color as any} />
              <p className="mt-2 text-xs text-hive-text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Campus interface examples
export const CampusInterfaceExamples: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Navigation Bar</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon icon={Zap} size="lg" color="gold" />
                <span className="font-bold text-hive-text-primary">HIVE</span>
              </div>
              
              <nav className="flex items-center space-x-4">
                <a href="#" className="flex items-center space-x-2 text-hive-text-primary hover:text-hive-gold transition-colors">
                  <Icon icon={Home} size="sm" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-hive-text-primary hover:text-hive-gold transition-colors">
                  <Icon icon={Code} size="sm" />
                  <span>Tools</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-hive-text-primary hover:text-hive-gold transition-colors">
                  <Icon icon={Users} size="sm" />
                  <span>Spaces</span>
                </a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Icon icon={Search} size="md" />
              </button>
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors relative">
                <Icon icon={Bell} size="md" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-hive-ruby rounded-full"></div>
              </button>
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Icon icon={User} size="md" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'GPA Calculator', icon: Calculator, color: 'emerald', users: '1.2k' },
            { name: 'Study Planner', icon: Calendar, color: 'sapphire', users: '847' },
            { name: 'Grade Tracker', icon: BookOpen, color: 'gold', users: '2.1k' },
          ].map((tool, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-3 rounded-lg bg-${tool.color === 'emerald' ? 'hive-emerald' : tool.color === 'sapphire' ? 'hive-sapphire' : 'hive-gold'}`}>
                  <Icon icon={tool.icon} size="lg" color="primary" className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-hive-text-primary">{tool.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-hive-text-mutedLight">
                    <Icon icon={Users} size="xs" />
                    <span>{tool.users} users</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon icon={Star} size="sm" color="gold" />
                  <span className="text-sm text-hive-text-secondary">4.{7 + index}</span>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                  <Icon icon={Play} size="xs" />
                  <span className="text-sm">Use Tool</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Interface</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon icon={Users} size="lg" color="emerald" />
              <div>
                <h4 className="font-semibold text-hive-text-primary">CS 101 Study Group</h4>
                <p className="text-sm text-hive-text-secondary">Final exam preparation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Icon icon={Settings} size="sm" />
              </button>
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Icon icon={Share} size="sm" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <Icon icon={MapPin} size="xs" color="ruby" />
              <span className="text-sm text-hive-text-secondary">Library Room 201</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Clock} size="xs" color="gold" />
              <span className="text-sm text-hive-text-secondary">Today 3:00 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Users} size="xs" color="emerald" />
              <span className="text-sm text-hive-text-secondary">15 members</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              <Icon icon={Calendar} size="sm" />
              <span>Join Session</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={MessageCircle} size="sm" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">System Status</h4>
            <div className="space-y-3">
              {[
                { service: 'Tool Builder', status: 'online', icon: Code, color: 'emerald' },
                { service: 'Study Spaces', status: 'maintenance', icon: Users, color: 'gold' },
                { service: 'Grade Sync', status: 'error', icon: BookOpen, color: 'ruby' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon icon={item.icon} size="sm" color="secondary" />
                    <span className="text-sm text-hive-text-primary">{item.service}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      icon={item.status === 'online' ? Check : item.status === 'maintenance' ? Clock : AlertCircle} 
                      size="xs" 
                      color={item.color as any} 
                    />
                    <span className="text-xs text-hive-text-mutedLight capitalize">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Quick Actions</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { action: 'New Tool', icon: Plus, color: 'emerald' },
                { action: 'Join Space', icon: Users, color: 'sapphire' },
                { action: 'Schedule', icon: Calendar, color: 'gold' },
                { action: 'Messages', icon: MessageCircle, color: 'primary' },
                { action: 'Settings', icon: Settings, color: 'secondary' },
                { action: 'Help', icon: HelpCircle, color: 'muted' },
              ].map((item, index) => (
                <button key={index} className="flex flex-col items-center p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
                  <Icon icon={item.icon} size="md" color={item.color as any} />
                  <span className="text-xs text-hive-text-secondary mt-1">{item.action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Media and control icons
export const MediaAndControlIcons: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Media Controls</h3>
        <div className="flex items-center space-x-4 p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <button className="p-3 bg-hive-gold text-hive-background-primary rounded-full hover:bg-hive-gold/90 transition-colors">
            <Icon icon={Play} size="md" />
          </button>
          <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
            <Icon icon={Pause} size="md" />
          </button>
          <div className="flex items-center space-x-2">
            <Icon icon={Volume2} size="sm" color="secondary" />
            <div className="w-20 h-1 bg-hive-background-tertiary rounded-full">
              <div className="w-12 h-1 bg-hive-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">File Operations</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: FileText, label: 'Document', color: 'primary' },
            { icon: Image, label: 'Image', color: 'emerald' },
            { icon: Download, label: 'Download', color: 'sapphire' },
            { icon: Upload, label: 'Upload', color: 'gold' },
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center p-4 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={item.icon} size="lg" color={item.color as any} />
              <span className="text-sm text-hive-text-secondary mt-2">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Theme Toggle</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <Icon icon={Sun} size="sm" color="gold" />
            <span className="text-sm text-hive-text-primary">Light Mode</span>
          </button>
          <button className="flex items-center space-x-2 p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <Icon icon={Moon} size="sm" color="sapphire" />
            <span className="text-sm text-hive-text-primary">Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    icon: Star,
    size: 'md',
    color: 'gold',
    variant: 'default',
  },
};