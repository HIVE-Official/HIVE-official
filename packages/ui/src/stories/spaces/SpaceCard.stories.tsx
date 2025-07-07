import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCard } from '../../components/spaces/space-card';
import { fn } from '@storybook/test';

const meta: Meta<typeof SpaceCard> = {
  title: 'HIVE/Spaces/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Space Card** - Community discovery and preview component

### Design System Features
- ✅ **Surface Hierarchy**: Multiple elevation levels
- ✅ **Gold Leadership**: Academic and Greek spaces get accent treatment  
- ✅ **Preview Mode**: Shows potential vs actual members
- ✅ **Motion States**: Hover and interaction animations
- ✅ **Status System**: Motion-based instead of color-based

### Space Types
- **Academic**: Department and major-based communities
- **Residential**: Dorm and housing communities
- **Interest**: Hobby and passion-based groups
- **Organization**: Official student organizations
- **Greek**: Fraternity and sorority chapters

### Space Status
- **Preview**: Dormant, waiting for leader activation
- **Active**: Live community with members
- **Invite Only**: Exclusive access required
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['academic', 'residential', 'interest', 'organization', 'greek'],
    },
    status: {
      control: 'select', 
      options: ['preview', 'active', 'invite_only'],
    },
    isJoined: {
      control: 'boolean',
    },
    canRequest: {
      control: 'boolean',
    },
  },
  args: {
    onJoin: fn(),
    onRequestAccess: fn(),
    onViewSpace: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLeaders = [
  { id: '1', name: 'Sarah Chen', avatarUrl: undefined },
  { id: '2', name: 'Marcus Rodriguez', avatarUrl: undefined },
  { id: '3', name: 'Alex Kim', avatarUrl: undefined },
];

export const AcademicPreview: Story = {
  args: {
    id: 'cs-majors',
    name: 'CS Majors',
    description: 'Connect with fellow Computer Science students, share resources, discuss coursework, and collaborate on projects.',
    type: 'academic',
    status: 'preview',
    potentialMembers: 1247,
    upcomingEvents: 3,
    recentActivity: 'Course registration opens Monday',
    leaders: [],
    isJoined: false,
    canRequest: true,
  },
};

export const AcademicActive: Story = {
  args: {
    ...AcademicPreview.args,
    status: 'active',
    memberCount: 234,
    potentialMembers: undefined,
    leaders: sampleLeaders,
    recentActivity: 'Hackathon planning discussion',
  },
};

export const ResidentialActive: Story = {
  args: {
    id: 'ellicott-complex',
    name: 'Ellicott Complex',
    description: 'Home to over 2,000 students! Connect with your neighbors, organize floor events, and make the most of dorm life.',
    type: 'residential',
    status: 'active',
    memberCount: 892,
    upcomingEvents: 5,
    recentActivity: 'Movie night this Friday',
    leaders: sampleLeaders.slice(0, 2),
    isJoined: true,
    canRequest: true,
  },
};

export const InterestGroup: Story = {
  args: {
    id: 'photography-club',
    name: 'Photography Enthusiasts',
    description: 'Capture campus life, share techniques, and explore photography together. All skill levels welcome!',
    type: 'interest',
    status: 'active',
    memberCount: 156,
    upcomingEvents: 2,
    recentActivity: 'Golden hour shoot tomorrow',
    leaders: [sampleLeaders[0]],
    isJoined: false,
    canRequest: true,
  },
};

export const GreekLife: Story = {
  args: {
    id: 'alpha-phi-alpha',
    name: 'Alpha Phi Alpha',
    description: 'The first intercollegiate Greek-letter fraternity established for African Americans. Brotherhood, scholarship, service.',
    type: 'greek',
    status: 'invite_only',
    memberCount: 45,
    upcomingEvents: 1,
    recentActivity: 'Community service planning',
    leaders: sampleLeaders,
    isJoined: false,
    canRequest: true,
  },
};

export const Organization: Story = {
  args: {
    id: 'student-government',
    name: 'Student Association',
    description: 'The official student government representing undergraduate students. Get involved in campus decision-making.',
    type: 'organization',
    status: 'active',
    memberCount: 78,
    upcomingEvents: 4,
    recentActivity: 'Budget proposal meeting',
    leaders: sampleLeaders.slice(0, 3),
    isJoined: false,
    canRequest: true,
  },
};

export const JoinedSpace: Story = {
  args: {
    ...ResidentialActive.args,
    isJoined: true,
  },
};

// Showcase preview mode concept
export const PreviewModeShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-h3 font-display text-foreground">Preview Mode - HIVE's Pre-Seeded Communities</h3>
        <p className="text-muted font-body">
          Spaces start in preview mode, showing potential membership until a leader activates them.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-body font-medium text-foreground">📊 Preview Mode</h4>
          <SpaceCard {...AcademicPreview.args!} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-body font-medium text-foreground">🚀 Activated</h4>
          <SpaceCard {...AcademicActive.args!} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how spaces evolve from preview to active state',
      },
    },
  },
};

// Different space types
export const SpaceTypesShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-h3 font-display text-foreground">HIVE Space Categories</h3>
        <p className="text-muted font-body">
          Different types of campus communities with appropriate styling and features.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SpaceCard {...AcademicActive.args!} />
        <SpaceCard {...ResidentialActive.args!} />
        <SpaceCard {...InterestGroup.args!} />
        <SpaceCard {...GreekLife.args!} />
        <SpaceCard {...Organization.args!} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all space types with their unique characteristics',
      },
    },
  },
};

// Design system compliance
export const DesignSystemCompliance: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-h3 font-display text-foreground">Design System Enforcement</h3>
        <p className="text-muted font-body">
          Every space card automatically follows HIVE guidelines:
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">🎯 Gold Usage Rules</h4>
          <p className="text-caption text-muted">Academic and Greek spaces get accent treatment for leadership hierarchy</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">🏗️ Surface System</h4>
          <p className="text-caption text-muted">Proper elevation with surface-01 and surface-02 variants</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface-01">
          <h4 className="text-body font-medium text-foreground mb-2">⚡ Motion Feedback</h4>
          <p className="text-caption text-muted">Hover states and interactions use motion instead of color changes</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <SpaceCard {...AcademicActive.args!} />
        <SpaceCard {...GreekLife.args!} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validates design system compliance across all space variants',
      },
    },
  },
};