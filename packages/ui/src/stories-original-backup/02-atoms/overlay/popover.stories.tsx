import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Icon } from '../../../atomic/atoms/icon';
import { 
  Settings,
  User,
  Bell,
  Calendar,
  Share,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Info,
  HelpCircle,
  Filter,
  Search,
  Sort,
  Grid,
  List,
  Heart,
  Star,
  Bookmark,
  Tag,
  Clock,
  Map,
  Phone,
  Mail,
  Link,
  Archive,
  Folder,
  File,
  Image,
  Video,
  Music,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Wifi,
  Database,
  Server,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: '02-atoms/Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Popover Component** - Contextual overlay content triggered by user interaction

Part of the HIVE Atomic Design System providing floating content panels that appear relative to trigger elements.

## Features
- **Radix UI Foundation**: Built on @radix-ui/react-popover for robust functionality
- **Flexible Positioning**: Automatic positioning with collision detection
- **Portal Rendering**: Content renders in document root to avoid z-index issues
- **Smooth Animations**: Fade and scale transitions for polished interactions
- **Keyboard Navigation**: Full keyboard support with focus management
- **Accessibility**: ARIA attributes and screen reader support
- **Customizable Styling**: Theme-aware with design token integration
- **Click Outside**: Automatically closes when clicking outside content

## Components Structure
- **Popover**: Root container managing open/close state
- **PopoverTrigger**: Element that triggers the popover (button, link, etc.)
- **PopoverContent**: Floating content panel with positioning logic

## Positioning Options
- **Side**: top, right, bottom, left
- **Align**: start, center, end
- **Offset**: Distance from trigger element
- **Collision Detection**: Automatic repositioning when constrained

## Use Cases
- **Context Menus**: Right-click or action menus with options
- **Form Helpers**: Additional form fields or explanatory content
- **Quick Actions**: Fast access to common operations
- **Information Panels**: Detailed information without navigation
- **Settings Panels**: Inline configuration options
- **User Profiles**: Quick user information and actions

## Accessibility Notes
- Proper ARIA roles and states for screen readers
- Focus management when opening/closing
- Keyboard navigation support (Tab, Escape)
- Visual focus indicators for keyboard users
- Semantic structure for assistive technologies
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Popover doesn't have direct props, but we can document the child components
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Popover
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <Text variant="heading-sm">Popover Content</Text>
          <Text variant="body-sm" color="secondary">
            This is a simple popover with some content. It demonstrates the basic functionality and styling.
          </Text>
        </div>
      </PopoverContent>
    </Popover>
  )
};

// Context Menus
export const ContextMenus: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Context Menu Examples</Text>
      
      <div className="flex flex-wrap gap-4">
        {/* File Actions Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-1">
              <Text variant="body-xs" color="secondary" className="px-2 py-1">File Actions</Text>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Copy className="h-4 w-4" />
                Duplicate
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Download className="h-4 w-4" />
                Download
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Share className="h-4 w-4" />
                Share
              </button>
              <div className="border-t border-[var(--hive-border-default)] my-1"></div>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium">
                  JD
                </div>
                <div>
                  <Text variant="body-sm" className="font-medium">John Doe</Text>
                  <Text variant="body-xs" color="secondary">john@example.com</Text>
                </div>
              </div>
              <div className="border-t border-[var(--hive-border-default)] pt-2 space-y-1">
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <User className="h-4 w-4" />
                  View Profile
                </button>
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <Bell className="h-4 w-4" />
                  Notifications
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Quick Actions Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="space-y-1">
              <Text variant="body-xs" color="secondary" className="px-2 py-1">Create New</Text>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <File className="h-4 w-4" />
                Document
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Folder className="h-4 w-4" />
                Folder
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Image className="h-4 w-4" />
                Image Gallery
              </button>
              <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                <Database className="h-4 w-4" />
                Database
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
};

// Form Helpers
export const FormHelpers: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Form Helper Popovers</Text>
      
      <div className="space-y-4">
        {/* Password Requirements */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Password</label>
          <div className="flex gap-2">
            <Input type="password" placeholder="Enter secure password" className="flex-1" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <Text variant="heading-sm">Password Requirements</Text>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <Text variant="body-sm">At least 8 characters</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                      <Text variant="body-sm" color="secondary">Include uppercase letter</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                      <Text variant="body-sm" color="secondary">Include number</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                      <Text variant="body-sm" color="secondary">Include special character</Text>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Text variant="body-xs" className="text-blue-300">
                      Use a password manager for better security
                    </Text>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Date Picker Helper */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Event Date</label>
          <div className="flex gap-2">
            <Input placeholder="Select date" className="flex-1" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-3">
                  <Text variant="heading-sm">Quick Date Selection</Text>
                  <div className="space-y-2">
                    <button className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                      <span>Today</span>
                      <Text variant="body-xs" color="secondary">Jan 26, 2025</Text>
                    </button>
                    <button className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                      <span>Tomorrow</span>
                      <Text variant="body-xs" color="secondary">Jan 27, 2025</Text>
                    </button>
                    <button className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                      <span>Next Week</span>
                      <Text variant="body-xs" color="secondary">Feb 2, 2025</Text>
                    </button>
                    <button className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                      <span>Next Month</span>
                      <Text variant="body-xs" color="secondary">Feb 26, 2025</Text>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Theme Color</label>
          <div className="flex gap-2">
            <Input placeholder="var(--hive-status-info)" className="flex-1" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="px-3">
                  <div className="h-4 w-4 bg-blue-500 rounded border border-gray-600"></div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-3">
                  <Text variant="heading-sm">Brand Colors</Text>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      'var(--hive-status-error)', '#F97316', '#EAB308', '#22C55E', 
                      'var(--hive-status-info)', 'var(--hive-status-info)', '#EC4899', '#06B6D4'
                    ].map((color, index) => (
                      <button 
                        key={index}
                        className="h-8 w-8 rounded border border-gray-600 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[var(--hive-border-default)]">
                    <Text variant="body-xs" color="secondary">
                      Click a color to apply, or enter a custom hex value above
                    </Text>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
};

// Quick Actions
export const QuickActions: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Text variant="heading-sm">Quick Action Panels</Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Quick Actions */}
        <HiveCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text variant="heading-sm">HIVE Platform</Text>
              <Text variant="body-sm" color="secondary">UI Component Library</Text>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-3">
                  <Text variant="heading-sm">Project Actions</Text>
                  <div className="space-y-1">
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Edit className="h-4 w-4" />
                      Edit Details
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Share className="h-4 w-4" />
                      Share Project
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Archive className="h-4 w-4" />
                      Archive
                    </button>
                  </div>
                  <div className="border-t border-[var(--hive-border-default)] pt-2">
                    <div className="px-2 py-1">
                      <Text variant="body-xs" color="secondary">Quick Stats</Text>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Text variant="body-sm" className="font-medium">24</Text>
                          <Text variant="body-xs" color="secondary">Files</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" className="font-medium">3</Text>
                          <Text variant="body-xs" color="secondary">Contributors</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">Active</Badge>
            <Badge variant="secondary" size="sm">React</Badge>
          </div>
        </HiveCard>

        {/* User Management Quick Actions */}
        <HiveCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium">
              AS
            </div>
            <div className="flex-1">
              <Text variant="heading-sm">Alex Smith</Text>
              <Text variant="body-sm" color="secondary">alex@hiveplatform.com</Text>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium">
                      AS
                    </div>
                    <div>
                      <Text variant="body-sm" className="font-medium">Alex Smith</Text>
                      <Text variant="body-xs" color="secondary">Senior Developer</Text>
                      <Badge variant="success" size="sm">Online</Badge>
                    </div>
                  </div>
                  <div className="border-t border-[var(--hive-border-default)] pt-2 space-y-1">
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Mail className="h-4 w-4" />
                      Send Message
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Phone className="h-4 w-4" />
                      Start Call
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <User className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                      <Settings className="h-4 w-4" />
                      Manage Permissions
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Admin</Badge>
            <Badge variant="secondary" size="sm">Frontend</Badge>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

// Information Panels
export const InformationPanels: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Information Panel Examples</Text>
      
      <div className="space-y-4">
        {/* System Status */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <Text variant="body-sm" className="font-medium">System Status</Text>
              <Text variant="body-xs" color="secondary">All systems operational</Text>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <Text variant="heading-sm">System Health</Text>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <Text variant="body-sm">API Services</Text>
                    </div>
                    <Badge variant="success" size="sm">99.9%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <Text variant="body-sm">Database</Text>
                    </div>
                    <Badge variant="success" size="sm">100%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <Text variant="body-sm">CDN</Text>
                    </div>
                    <Badge variant="warning" size="sm">98.2%</Badge>
                  </div>
                </div>
                <div className="border-t border-[var(--hive-border-default)] pt-3">
                  <Text variant="body-xs" color="secondary">
                    Last updated: 2 minutes ago
                  </Text>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Performance Metrics */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-yellow-500" />
            <div>
              <Text variant="body-sm" className="font-medium">Performance</Text>
              <Text variant="body-xs" color="secondary">Response time: 142ms</Text>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <Text variant="heading-sm">Performance Metrics</Text>
                <div className="space-y-3">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <Text variant="body-sm">Response Time</Text>
                      <Text variant="body-sm" className="font-medium">142ms</Text>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <Text variant="body-sm">CPU Usage</Text>
                      <Text variant="body-sm" className="font-medium">23%</Text>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <Text variant="body-sm">Memory</Text>
                      <Text variant="body-sm" className="font-medium">67%</Text>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Notifications Panel */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-500" />
            <div>
              <Text variant="body-sm" className="font-medium">Notifications</Text>
              <Text variant="body-xs" color="secondary">3 unread messages</Text>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text variant="heading-sm">Recent Notifications</Text>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Bell className="h-4 w-4 text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <Text variant="body-sm" className="font-medium">New team member</Text>
                      <Text variant="body-xs" color="secondary">Sarah joined the Frontend team</Text>
                      <Text variant="body-xs" color="secondary" className="mt-1">2 minutes ago</Text>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 hover:bg-gray-800 rounded-lg">
                    <Upload className="h-4 w-4 text-green-400 mt-0.5" />
                    <div className="flex-1">
                      <Text variant="body-sm" className="font-medium">Deploy successful</Text>
                      <Text variant="body-xs" color="secondary">Version 2.1.0 is now live</Text>
                      <Text variant="body-xs" color="secondary" className="mt-1">1 hour ago</Text>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 hover:bg-gray-800 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-400 mt-0.5" />
                    <div className="flex-1">
                      <Text variant="body-sm" className="font-medium">Meeting reminder</Text>
                      <Text variant="body-xs" color="secondary">Design review in 30 minutes</Text>
                      <Text variant="body-xs" color="secondary" className="mt-1">3 hours ago</Text>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
};

// Settings Panels
export const SettingsPanels: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Settings Panel Examples</Text>
      
      <div className="space-y-4">
        {/* View Settings */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <Text variant="body-sm" className="font-medium">View Options</Text>
            <Text variant="body-xs" color="secondary">Customize your workspace layout</Text>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4 mr-2" />
                Grid View
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <Text variant="heading-sm">View Settings</Text>
                <div className="space-y-2">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                    <Grid className="h-4 w-4" />
                    <span className="flex-1 text-left">Grid View</span>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-800 rounded">
                    <List className="h-4 w-4" />
                    <span className="flex-1 text-left">List View</span>
                  </button>
                </div>
                <div className="border-t border-[var(--hive-border-default)] pt-2">
                  <Text variant="body-xs" color="secondary" className="px-3 py-1">Display Options</Text>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 px-3 py-1 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Show file sizes
                    </label>
                    <label className="flex items-center gap-2 px-3 py-1 text-sm">
                      <input type="checkbox" className="rounded" />
                      Show modification dates
                    </label>
                    <label className="flex items-center gap-2 px-3 py-1 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Show thumbnails
                    </label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Filter Settings */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <Text variant="body-sm" className="font-medium">Filters & Sorting</Text>
            <Text variant="body-xs" color="secondary">2 filters active</Text>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <Text variant="heading-sm">Filter & Sort</Text>
                
                <div className="space-y-3">
                  <div>
                    <Text variant="body-sm" className="font-medium mb-2">File Type</Text>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Documents
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Images
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Videos
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Audio
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-t border-[var(--hive-border-default)] pt-3">
                    <Text variant="body-sm" className="font-medium mb-2">Sort By</Text>
                    <div className="space-y-1">
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Name</span>
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      </button>
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Date Modified</span>
                      </button>
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Size</span>
                      </button>
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Type</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-default)]">
                  <Button variant="ghost" size="sm" className="flex-1">Clear</Button>
                  <Button size="sm" className="flex-1">Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Theme Settings */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <Text variant="body-sm" className="font-medium">Appearance</Text>
            <Text variant="body-xs" color="secondary">Dark theme, compact density</Text>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <Text variant="heading-sm">Appearance Settings</Text>
                
                <div className="space-y-3">
                  <div>
                    <Text variant="body-sm" className="font-medium mb-2">Theme</Text>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex flex-col items-center gap-2 p-3 bg-gray-900 border border-blue-500 rounded-lg">
                        <div className="w-8 h-6 bg-gray-800 rounded border"></div>
                        <Text variant="body-xs">Dark</Text>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg hover:border-gray-600">
                        <div className="w-8 h-6 bg-[var(--hive-text-primary)] rounded border"></div>
                        <Text variant="body-xs">Light</Text>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Text variant="body-sm" className="font-medium mb-2">Density</Text>
                    <div className="space-y-1">
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Comfortable</span>
                      </button>
                      <button className="flex items-center justify-between w-full px-2 py-1 text-sm hover:bg-gray-800 rounded">
                        <span>Compact</span>
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Text variant="body-sm" className="font-medium mb-2">Accent Color</Text>
                    <div className="flex gap-2">
                      {['var(--hive-status-info)', 'var(--hive-status-info)', '#EC4899', '#06B6D4', '#22C55E', '#EAB308', '#F97316', 'var(--hive-status-error)'].map((color, index) => (
                        <button 
                          key={index}
                          className={`h-6 w-6 rounded border-2 ${index === 0 ? 'border-white' : 'border-gray-600'} hover:scale-110 transition-transform`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
};

// Kitchen Sink
export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <Text variant="heading-lg">Popover Kitchen Sink</Text>
      <Text variant="body-md" color="secondary">
        Comprehensive showcase of all Popover variants, positioning options, and use cases
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simple Content */}
        <div className="space-y-3">
          <Text variant="heading-sm">Simple Content</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <Info className="h-4 w-4 mr-2" />
                Information
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <Text variant="heading-sm">Quick Info</Text>
                <Text variant="body-sm" color="secondary">
                  This is a simple popover with basic information content.
                </Text>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Rich Content */}
        <div className="space-y-3">
          <Text variant="heading-sm">Rich Content</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default" className="w-full">
                <User className="h-4 w-4 mr-2" />
                User Profile
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium">
                    JD
                  </div>
                  <div>
                    <Text variant="body-sm" className="font-medium">John Doe</Text>
                    <Text variant="body-xs" color="secondary">Product Designer</Text>
                    <Badge variant="success" size="sm">Available</Badge>
                  </div>
                </div>
                <div className="border-t border-[var(--hive-border-default)] pt-2">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <Text variant="body-sm" className="font-medium">24</Text>
                      <Text variant="body-xs" color="secondary">Projects</Text>
                    </div>
                    <div>
                      <Text variant="body-sm" className="font-medium">156</Text>
                      <Text variant="body-xs" color="secondary">Designs</Text>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Form Content */}
        <div className="space-y-3">
          <Text variant="heading-sm">Form Content</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Quick Search
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <Text variant="heading-sm">Advanced Search</Text>
                <div className="space-y-2">
                  <Input placeholder="Search term..." />
                  <div className="flex gap-2">
                    <select className="flex-1 px-3 py-2 bg-gray-800 border border-[var(--hive-border-default)] rounded text-sm">
                      <option>All files</option>
                      <option>Documents</option>
                      <option>Images</option>
                    </select>
                    <select className="flex-1 px-3 py-2 bg-gray-800 border border-[var(--hive-border-default)] rounded text-sm">
                      <option>Any date</option>
                      <option>Last week</option>
                      <option>Last month</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="flex-1">Clear</Button>
                    <Button size="sm" className="flex-1">Search</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Menu Actions */}
        <div className="space-y-3">
          <Text variant="heading-sm">Menu Actions</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-1">
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </button>
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
                  <Share className="h-4 w-4" />
                  Share
                </button>
                <div className="border-t border-[var(--hive-border-default)] my-1"></div>
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Settings Panel */}
        <div className="space-y-3">
          <Text variant="heading-sm">Settings Panel</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <Text variant="heading-sm">Quick Settings</Text>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm">
                    <span>Dark mode</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>Auto-save</span>
                    <input type="checkbox" className="rounded" />
                  </label>
                </div>
                <div className="border-t border-[var(--hive-border-default)] pt-2">
                  <Button variant="ghost" size="sm" className="w-full">
                    Open Settings
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Status Information */}
        <div className="space-y-3">
          <Text variant="heading-sm">Status Information</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  Online
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <Text variant="heading-sm">System Status</Text>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <Text variant="body-sm">API</Text>
                    </div>
                    <Badge variant="success" size="sm">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <Text variant="body-sm">Database</Text>
                    </div>
                    <Badge variant="success" size="sm">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <Text variant="body-sm">Storage</Text>
                    </div>
                    <Badge variant="warning" size="sm">Limited</Badge>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-[var(--hive-border-default)]">
                  <Text variant="body-xs" color="secondary">
                    Last updated: 1 min ago
                  </Text>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Interactive Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-3">
            <Text variant="heading-sm">Interactive Demo</Text>
            <Text variant="body-sm" color="secondary">
              This is an interactive Popover demo. The content can be customized and the popover supports various positioning options.
            </Text>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - test the Popover component with different content and positioning options. The popover automatically handles positioning and collision detection.'
      }
    }
  }
};