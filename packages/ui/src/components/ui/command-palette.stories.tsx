import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  Search, 
  Calendar, 
  Users, 
  MessageCircle, 
  Plus, 
  Settings,
  User,
  MapPin,
  Clock,
  Hash,
  BookOpen,
  Coffee,
  Globe,
  Heart,
  Music,
  Camera,
  Code,
  Palette
} from 'lucide-react';
import { CommandPalette, useCommandPalette, type Command } from './command-palette';

const meta: Meta<typeof CommandPalette> = {
  title: 'UI/Command Palette',
  component: CommandPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A powerful command palette component for HIVE's programmable campus OS. Provides quick access to navigation, actions, and search with full keyboard support.

**Key Features:**
- Perfect HIVE brand compliance (monochrome + yellow, exact motion timing)
- Comprehensive keyboard navigation (⌘K to open, arrow keys, enter, escape)
- Intelligent search with keyword matching
- Categorized commands with visual grouping
- Extensible command system for campus functionality
- Built-in accessibility and responsive design

**Brand Standards:**
- Uses exact HIVE motion timing (90ms micro, 220ms content)
- Space Grotesk + Geist Sans typography system
- Monochrome + yellow color palette only
- Standard cubic-bezier easing curve
        `,
      },
    },
  },
  argTypes: {
    open: {
      description: 'Controls whether the command palette is visible',
      control: 'boolean',
    },
    commands: {
      description: 'Array of available commands',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text for the search input',
      control: 'text',
    },
    emptyState: {
      description: 'Custom empty state content',
      control: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

// Enhanced Campus Commands for demonstration
const campusCommands: Command[] = [
  // Navigation
  {
    id: 'nav-dashboard',
    title: 'Dashboard',
    subtitle: 'Your personal HIVE overview',
    category: 'navigation',
    icon: <User className="w-4 h-4" />,
    shortcut: ['⌘', 'D'],
    keywords: ['home', 'overview', 'dashboard', 'profile'],
    action: () => console.log('Navigate to dashboard'),
  },
  {
    id: 'nav-explore',
    title: 'Explore Spaces',
    subtitle: 'Discover communities and interests',
    category: 'navigation',
    icon: <Hash className="w-4 h-4" />,
    shortcut: ['⌘', 'E'],
    keywords: ['spaces', 'explore', 'discover', 'communities', 'browse'],
    action: () => console.log('Navigate to explore'),
  },
  {
    id: 'nav-events',
    title: 'Campus Events',
    subtitle: 'What\'s happening around campus',
    category: 'navigation',
    icon: <Calendar className="w-4 h-4" />,
    shortcut: ['⌘', 'C'],
    keywords: ['events', 'calendar', 'happenings', 'activities'],
    action: () => console.log('Navigate to events'),
  },
  {
    id: 'nav-map',
    title: 'Campus Map',
    subtitle: 'Find buildings and locations',
    category: 'navigation',
    icon: <MapPin className="w-4 h-4" />,
    shortcut: ['⌘', 'M'],
    keywords: ['map', 'buildings', 'locations', 'navigate', 'directions'],
    action: () => console.log('Open campus map'),
  },

  // Quick Actions
  {
    id: 'action-create-event',
    title: 'Create Event',
    subtitle: 'Plan something amazing',
    category: 'actions',
    icon: <Plus className="w-4 h-4" />,
    shortcut: ['⌘', 'N', 'E'],
    keywords: ['create', 'new', 'event', 'plan', 'organize'],
    action: () => console.log('Create event'),
  },
  {
    id: 'action-create-space',
    title: 'Create Space',
    subtitle: 'Start a new community',
    category: 'actions',
    icon: <Plus className="w-4 h-4" />,
    shortcut: ['⌘', 'N', 'S'],
    keywords: ['create', 'new', 'space', 'community', 'group'],
    action: () => console.log('Create space'),
  },
  {
    id: 'action-create-post',
    title: 'Create Post',
    subtitle: 'Share with your community',
    category: 'actions',
    icon: <Plus className="w-4 h-4" />,
    shortcut: ['⌘', 'N', 'P'],
    keywords: ['create', 'new', 'post', 'share', 'content'],
    action: () => console.log('Create post'),
  },
  {
    id: 'action-message',
    title: 'Send Message',
    subtitle: 'Connect with someone',
    category: 'actions',
    icon: <MessageCircle className="w-4 h-4" />,
    shortcut: ['⌘', 'T'],
    keywords: ['message', 'chat', 'dm', 'connect', 'talk'],
    action: () => console.log('Send message'),
  },

  // People & Spaces
  {
    id: 'space-study-group',
    title: 'CS Study Group',
    subtitle: '847 members • Computer Science',
    category: 'spaces',
    icon: <Code className="w-4 h-4" />,
    keywords: ['computer science', 'study', 'programming', 'cs'],
    action: () => console.log('Open CS Study Group'),
  },
  {
    id: 'space-art-collective',
    title: 'Art Collective',
    subtitle: '234 members • Creative Arts',
    category: 'spaces',
    icon: <Palette className="w-4 h-4" />,
    keywords: ['art', 'creative', 'design', 'visual'],
    action: () => console.log('Open Art Collective'),
  },
  {
    id: 'space-music-lounge',
    title: 'Music Lounge',
    subtitle: '456 members • Music & Performance',
    category: 'spaces',
    icon: <Music className="w-4 h-4" />,
    keywords: ['music', 'performance', 'band', 'concert'],
    action: () => console.log('Open Music Lounge'),
  },

  // Recent Events
  {
    id: 'event-hackathon',
    title: 'Spring Hackathon 2024',
    subtitle: 'Tomorrow at 9:00 AM • Tech Building',
    category: 'events',
    icon: <Code className="w-4 h-4" />,
    keywords: ['hackathon', 'coding', 'programming', 'tech'],
    action: () => console.log('View hackathon details'),
  },
  {
    id: 'event-coffee-chat',
    title: 'Coffee & Code',
    subtitle: 'Today at 3:00 PM • Student Center',
    category: 'events',
    icon: <Coffee className="w-4 h-4" />,
    keywords: ['coffee', 'networking', 'casual', 'meet'],
    action: () => console.log('Join coffee chat'),
  },
  {
    id: 'event-photo-walk',
    title: 'Campus Photo Walk',
    subtitle: 'This weekend • Meet at Library',
    category: 'events',
    icon: <Camera className="w-4 h-4" />,
    keywords: ['photography', 'walk', 'campus', 'creative'],
    action: () => console.log('RSVP to photo walk'),
  },

  // People
  {
    id: 'person-alex',
    title: 'Alex Chen',
    subtitle: 'Computer Science • Class of 2025',
    category: 'people',
    icon: <User className="w-4 h-4" />,
    keywords: ['alex', 'chen', 'computer science', 'student'],
    action: () => console.log('View Alex\'s profile'),
  },
  {
    id: 'person-sarah',
    title: 'Sarah Johnson',
    subtitle: 'Art Major • Photography Club President',
    category: 'people',
    icon: <User className="w-4 h-4" />,
    keywords: ['sarah', 'johnson', 'art', 'photography'],
    action: () => console.log('View Sarah\'s profile'),
  },

  // Settings
  {
    id: 'settings-profile',
    title: 'Profile Settings',
    subtitle: 'Manage your HIVE identity',
    category: 'navigation',
    icon: <Settings className="w-4 h-4" />,
    shortcut: ['⌘', ','],
    keywords: ['settings', 'profile', 'preferences', 'account'],
    action: () => console.log('Open settings'),
  },
];

// Story Template Component
const StoryTemplate = ({ commands, ...args }: { commands?: Command[] } & Parameters<typeof CommandPalette>[0]) => {
  const [isOpen, setIsOpen] = React.useState(args.open || false);

  React.useEffect(() => {
    setIsOpen(args.open || false);
  }, [args.open]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-semibold text-foreground">
            HIVE Command Palette Demo
          </h1>
          <p className="text-muted font-sans">
            Press <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-surface px-1.5 font-mono text-xs text-muted">⌘K</kbd> or click the button below to open the command palette
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-foreground hover:bg-accent/5 transition-colors duration-[90ms]"
          >
            <Search className="w-4 h-4" />
            Open Command Palette
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h3 className="font-display font-medium text-foreground mb-2">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm text-muted">
              <div>⌘K - Open/Close</div>
              <div>↑/↓ - Navigate</div>
              <div>Enter - Execute</div>
              <div>Esc - Close</div>
            </div>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h3 className="font-display font-medium text-foreground mb-2">Features</h3>
            <div className="space-y-2 text-sm text-muted">
              <div>• Intelligent search</div>
              <div>• Categorized commands</div>
              <div>• Keyboard navigation</div>
              <div>• HIVE brand compliant</div>
            </div>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h3 className="font-display font-medium text-foreground mb-2">Campus OS</h3>
            <div className="space-y-2 text-sm text-muted">
              <div>• Navigate spaces</div>
              <div>• Create content</div>
              <div>• Find people</div>
              <div>• Discover events</div>
            </div>
          </div>
        </div>
      </div>

      <CommandPalette
        {...args}
        open={isOpen}
        onOpenChange={setIsOpen}
        commands={commands || campusCommands}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: false,
    placeholder: "Type a command or search...",
  },
};

export const Open: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    placeholder: "Type a command or search...",
  },
};

export const BasicCommands: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    commands: [
      {
        id: 'nav-home',
        title: 'Home',
        subtitle: 'Return to dashboard',
        category: 'navigation',
        icon: <User className="w-4 h-4" />,
        shortcut: ['⌘', 'H'],
        keywords: ['home', 'dashboard'],
        action: () => console.log('Go home'),
      },
      {
        id: 'action-create',
        title: 'Create Post',
        subtitle: 'Share something new',
        category: 'actions',
        icon: <Plus className="w-4 h-4" />,
        shortcut: ['⌘', 'N'],
        keywords: ['create', 'new', 'post'],
        action: () => console.log('Create post'),
      },
      {
        id: 'settings',
        title: 'Settings',
        subtitle: 'Customize your experience',
        category: 'navigation',
        icon: <Settings className="w-4 h-4" />,
        shortcut: ['⌘', ','],
        keywords: ['settings', 'preferences'],
        action: () => console.log('Open settings'),
      },
    ],
  },
};

export const EmptyState: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    commands: [],
    emptyState: (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Globe className="w-8 h-8 text-muted mb-3" />
        <h3 className="font-display font-semibold text-foreground mb-1">
          No commands available
        </h3>
        <p className="text-sm text-muted">
          Commands will appear here when available
        </p>
      </div>
    ),
  },
};

export const SearchDemo: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    commands: campusCommands,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try searching for terms like "create", "music", "computer science", or "event" to see the intelligent filtering in action.',
      },
    },
  },
};

export const WithDisabledCommands: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    commands: [
      ...campusCommands.slice(0, 3),
      {
        id: 'disabled-feature',
        title: 'Premium Feature',
        subtitle: 'Upgrade to access',
        category: 'actions',
        icon: <Heart className="w-4 h-4" />,
        keywords: ['premium', 'upgrade'],
        action: () => console.log('Premium feature'),
        disabled: true,
      },
      {
        id: 'maintenance',
        title: 'Analytics Dashboard',
        subtitle: 'Currently under maintenance',
        category: 'navigation',
        icon: <Search className="w-4 h-4" />,
        keywords: ['analytics', 'stats'],
        action: () => console.log('Analytics'),
        disabled: true,
      },
    ],
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <StoryTemplate {...args} />,
  args: {
    open: true,
    placeholder: "Search HIVE campus...",
    commands: campusCommands,
  },
}; 