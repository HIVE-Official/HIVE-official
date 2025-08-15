import type { Meta, StoryObj } from '@storybook/react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Icon } from '../../../atomic/atoms/icon';
import { 
  MoreHorizontal,
  Settings,
  User,
  LogOut,
  Plus,
  Edit,
  Copy,
  Trash2,
  Download,
  Upload,
  Share,
  Archive,
  Star,
  Heart,
  Bookmark,
  Tag,
  Folder,
  File,
  Image,
  Video,
  Music,
  Database,
  Code,
  Terminal,
  Globe,
  Mail,
  Phone,
  Calendar,
  Clock,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Filter,
  Sort,
  Search,
  Grid,
  List,
  Map,
  BarChart,
  PieChart,
  TrendingUp,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  ChevronRight,
  Check
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof DropdownMenu> = {
  title: '02-atoms/Overlay/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Dropdown Menu Component** - Context menus and action lists with hierarchical organization

Part of the HIVE Atomic Design System providing comprehensive dropdown functionality for navigation, actions, and selections.

## Features
- **Context Management**: Internal state management for open/close behavior
- **Rich Item Types**: Standard items, checkboxes, radio groups, labels, and separators
- **Keyboard Navigation**: Full keyboard support with arrow keys and shortcuts
- **Nested Menus**: Submenu support for hierarchical organization
- **Auto-close**: Automatically closes when clicking outside or selecting items
- **Flexible Positioning**: Configurable alignment (start, center, end)
- **Custom Styling**: Theme-aware with design token integration
- **Accessibility**: ARIA support and screen reader compatibility

## Components Structure
- **DropdownMenu**: Root container managing state and context
- **DropdownMenuTrigger**: Button or element that opens the menu
- **DropdownMenuContent**: Container for menu items with positioning
- **DropdownMenuItem**: Clickable menu item with automatic close
- **DropdownMenuLabel**: Section headers and labels
- **DropdownMenuSeparator**: Visual dividers between menu sections
- **DropdownMenuShortcut**: Keyboard shortcuts display
- **DropdownMenuCheckboxItem**: Checkable menu items with state
- **DropdownMenuRadioGroup**: Radio button groups for single selection
- **DropdownMenuRadioItem**: Individual radio options
- **DropdownMenuSub**: Submenu containers for nested content
- **DropdownMenuSubTrigger**: Triggers for opening submenus
- **DropdownMenuSubContent**: Content containers for submenus

## Use Cases
- **Context Actions**: Right-click menus and action lists
- **Navigation Menus**: Hierarchical navigation structures
- **Settings Panels**: Configuration options and preferences
- **Selection Lists**: Single and multi-select options
- **Tool Palettes**: Creative tools and utility collections
- **User Profiles**: Account actions and user management

## Accessibility Notes
- Proper ARIA roles and states for screen readers
- Keyboard navigation with arrow keys and Tab
- Focus management when opening/closing menus
- Escape key support for closing menus
- Visual focus indicators for keyboard users
- Semantic structure for assistive technologies
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // DropdownMenu doesn't have direct props, but we can document the child components
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Dropdown Menu
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share className="mr-2 h-4 w-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

// Context Actions
export const ContextActions: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Context Action Menus</Text>
      
      <div className="flex flex-wrap gap-4">
        {/* File Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>File Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
              <DropdownMenuShortcut>⌘↓</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Create Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuItem>
              <File className="mr-2 h-4 w-4" />
              Document
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Folder className="mr-2 h-4 w-4" />
              Folder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              Database
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Image className="mr-2 h-4 w-4" />
              Image Gallery
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Video className="mr-2 h-4 w-4" />
              Video Project
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              Code Snippet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
};

// Selection Menus
export const SelectionMenus: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = useState(false);
    const [starred, setStarred] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');

    return (
      <div className="space-y-6 max-w-2xl">
        <Text variant="heading-sm">Selection & Settings Menus</Text>
        
        <div className="flex flex-wrap gap-4">
          {/* Checkbox Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Favorites</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={bookmarked}
                onCheckedChange={setBookmarked}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmarked
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={starred}
                onCheckedChange={setStarred}
              >
                <Star className="mr-2 h-4 w-4" />
                Starred
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Options Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4 mr-2" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                <DropdownMenuRadioItem value="grid">
                  <Grid className="mr-2 h-4 w-4" />
                  Grid View
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">
                  <List className="mr-2 h-4 w-4" />
                  List View
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="map">
                  <Map className="mr-2 h-4 w-4" />
                  Map View
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Options Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Sort className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="name">
                  Name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">
                  Date Modified
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="size">
                  File Size
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="type">
                  File Type
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TrendingUp className="mr-2 h-4 w-4" />
                Ascending
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrendingUp className="mr-2 h-4 w-4 rotate-180" />
                Descending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }
};

// Nested Submenus
export const NestedSubmenus: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="heading-sm">Nested Submenu Examples</Text>
      
      <div className="flex flex-wrap gap-4">
        {/* Tools Menu with Submenus */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Tools
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
            <DropdownMenuItem>
              <Terminal className="mr-2 h-4 w-4" />
              Terminal
              <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Code className="mr-2 h-4 w-4" />
                Code Tools
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Code Inspector
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search className="mr-2 h-4 w-4" />
                  Find & Replace
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Zap className="mr-2 h-4 w-4" />
                  Format Code
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Performance
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PieChart className="mr-2 h-4 w-4" />
                  Usage Stats
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* File Types Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <File className="h-4 w-4 mr-2" />
              File Types
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Create File</DropdownMenuLabel>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Code className="mr-2 h-4 w-4" />
                Code Files
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>JavaScript (.js)</DropdownMenuItem>
                <DropdownMenuItem>TypeScript (.ts)</DropdownMenuItem>
                <DropdownMenuItem>React (.jsx)</DropdownMenuItem>
                <DropdownMenuItem>Python (.py)</DropdownMenuItem>
                <DropdownMenuItem>CSS (.css)</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Image className="mr-2 h-4 w-4" />
                Media Files
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Image className="mr-2 h-4 w-4" />
                  Image
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Music className="mr-2 h-4 w-4" />
                  Audio
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <File className="mr-2 h-4 w-4" />
              Text Document
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Folder className="mr-2 h-4 w-4" />
              New Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
};

// Theme & Settings Menu
export const ThemeSettings: Story = {
  render: () => {
    const [theme, setTheme] = useState('dark');
    const [volume, setVolume] = useState(75);
    const [autoSave, setAutoSave] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [wifi, setWifi] = useState(true);

    return (
      <div className="space-y-6 max-w-2xl">
        <Text variant="heading-sm">Theme & Settings Menus</Text>
        
        <div className="flex flex-wrap gap-4">
          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Palette className="h-4 w-4 mr-2" />
                Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <Sun className="mr-2 h-4 w-4" />
                  Light Theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Monitor className="mr-2 h-4 w-4" />
                  System Default
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Monitor className="mr-2 h-4 w-4" />
                  Device View
                  <ChevronRight className="ml-auto h-4 w-4" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Tablet className="mr-2 h-4 w-4" />
                    Tablet
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* System Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>System Settings</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={autoSave}
                onCheckedChange={setAutoSave}
              >
                <Clock className="mr-2 h-4 w-4" />
                Auto-save
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={wifi}
                onCheckedChange={setWifi}
              >
                {wifi ? <Wifi className="mr-2 h-4 w-4" /> : <WifiOff className="mr-2 h-4 w-4" />}
                Wi-Fi
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Audio
                  <ChevronRight className="ml-auto h-4 w-4" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Volume: {volume}%
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <VolumeX className="mr-2 h-4 w-4" />
                    Mute All
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Privacy & Security
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Media Player Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Player
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Media Controls</DropdownMenuLabel>
              <DropdownMenuItem>
                <Play className="mr-2 h-4 w-4" />
                Play
                <DropdownMenuShortcut>Space</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SkipBack className="mr-2 h-4 w-4" />
                Previous
                <DropdownMenuShortcut>←</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SkipForward className="mr-2 h-4 w-4" />
                Next
                <DropdownMenuShortcut>→</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Repeat className="mr-2 h-4 w-4" />
                Repeat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }
};

// Application Context
export const ApplicationContext: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Project Management Context</Text>
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-[var(--hive-text-primary)]" />
              </div>
              <div>
                <Text variant="heading-md">HIVE Platform</Text>
                <Text variant="body-sm" color="secondary">
                  Complete UI/UX design system and component library
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success" size="sm">Active</Badge>
                  <Badge variant="secondary" size="sm">React</Badge>
                  <Badge variant="primary" size="sm">TypeScript</Badge>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Export as ZIP</DropdownMenuItem>
                    <DropdownMenuItem>Export to GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Export Documentation</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Text variant="heading-sm">24</Text>
              <Text variant="body-xs" color="secondary">Components</Text>
            </div>
            <div>
              <Text variant="heading-sm">156</Text>
              <Text variant="body-xs" color="secondary">Design Tokens</Text>
            </div>
            <div>
              <Text variant="heading-sm">3</Text>
              <Text variant="body-xs" color="secondary">Contributors</Text>
            </div>
          </div>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Team Member Management</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Alex Smith', email: 'alex@hive.com', role: 'Admin', avatar: 'AS', color: 'bg-blue-600' },
            { name: 'Sarah Chen', email: 'sarah@hive.com', role: 'Developer', avatar: 'SC', color: 'bg-purple-600' },
          ].map((member) => (
            <HiveCard key={member.email} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 ${member.color} rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium`}>
                    {member.avatar}
                  </div>
                  <div>
                    <Text variant="body-sm" className="font-medium">{member.name}</Text>
                    <Text variant="body-xs" color="secondary">{member.email}</Text>
                    <Badge variant="secondary" size="sm">{member.role}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Settings className="mr-2 h-4 w-4" />
                        Change Role
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Admin</DropdownMenuItem>
                        <DropdownMenuItem>Developer</DropdownMenuItem>
                        <DropdownMenuItem>Designer</DropdownMenuItem>
                        <DropdownMenuItem>Viewer</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </HiveCard>
          ))}
        </div>
      </div>
    </div>
  )
};

// Kitchen Sink
export const KitchenSink: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: true,
      autoSave: false,
      darkMode: true,
      compactView: false
    });

    return (
      <div className="space-y-8 max-w-4xl">
        <Text variant="heading-lg">Dropdown Menu Kitchen Sink</Text>
        <Text variant="body-md" color="secondary">
          Comprehensive showcase of all DropdownMenu components and configurations
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Menu */}
          <div className="space-y-3">
            <Text variant="heading-sm">Basic Menu</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Basic Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Menu with Icons & Shortcuts */}
          <div className="space-y-3">
            <Text variant="heading-sm">Icons & Shortcuts</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <File className="h-4 w-4 mr-2" />
                  File Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                  <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Menu with Labels & Separators */}
          <div className="space-y-3">
            <Text variant="heading-sm">Labels & Separators</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  User Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Support</DropdownMenuLabel>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Checkbox Menu */}
          <div className="space-y-3">
            <Text variant="heading-sm">Checkbox Items</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Display</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, notifications: checked }))
                  }
                >
                  Show Notifications
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, autoSave: checked }))
                  }
                >
                  Auto-save
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={preferences.compactView}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, compactView: checked }))
                  }
                >
                  Compact View
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Radio Group Menu */}
          <div className="space-y-3">
            <Text variant="heading-sm">Radio Groups</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Grid className="h-4 w-4 mr-2" />
                  Layout
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Layout Mode</DropdownMenuLabel>
                <DropdownMenuRadioGroup value="grid">
                  <DropdownMenuRadioItem value="grid">
                    Grid View
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="list">
                    List View
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="kanban">
                    Kanban View
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Nested Submenu */}
          <div className="space-y-3">
            <Text variant="heading-sm">Nested Submenus</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Code className="h-4 w-4 mr-2" />
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Terminal className="mr-2 h-4 w-4" />
                  Terminal
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Code className="mr-2 h-4 w-4" />
                    Code Tools
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Format Code</DropdownMenuItem>
                    <DropdownMenuItem>Lint Code</DropdownMenuItem>
                    <DropdownMenuItem>Find & Replace</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Interactive Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Interactive Demo</DropdownMenuLabel>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit Item
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy Item
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share className="mr-2 h-4 w-4" />
            Share Item
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-400">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - test the DropdownMenu component with various item types and interactions. The menu automatically closes when items are selected or when clicking outside.'
      }
    }
  }
};