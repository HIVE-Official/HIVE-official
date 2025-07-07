import type { Meta, StoryObj } from '@storybook/react';
import { RitualCard } from '../../components/ritual/ritual-card';
import { fn } from '@storybook/test';

const meta: Meta<typeof RitualCard> = {
  title: 'HIVE/Ritual/RitualCard',
  component: RitualCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Ritual Card** - Showcases HIVE's special campus-wide experiences

### Design System Features
- ✅ **Monochrome + Gold**: Pure HIVE color system
- ✅ **Motion-Based Feedback**: Animations instead of color states  
- ✅ **Brand Typography**: Space Grotesk + Geist Sans
- ✅ **180ms Timing**: HIVE brand motion curves
- ✅ **Surface Hierarchy**: Proper depth system

### Ritual Types
- **First Light**: User's first public post
- **Torch Pass**: Invitation distribution 
- **Space Hunt**: Community discovery
- **Builder Spotlight**: Feature creators
- **Wave**: Viral campus challenges
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['first_light', 'torch_pass', 'space_hunt', 'builder_spotlight', 'wave'],
    },
    isActive: {
      control: 'boolean',
    },
    hasParticipated: {
      control: 'boolean',
    },
    participantCount: {
      control: { type: 'number', min: 0, max: 10000 },
    },
  },
  args: {
    onParticipate: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstLight: Story = {
  args: {
    id: 'first-light-1',
    title: 'Light Your Flame',
    description: 'Welcome to HIVE. Before you can build, you must begin. Light your flame with your first public words.',
    type: 'first_light',
    participantCount: 127,
    isActive: true,
    hasParticipated: false,
  },
};

export const FirstLightCompleted: Story = {
  args: {
    ...FirstLight.args,
    hasParticipated: true,
    participantCount: 128,
  },
};

export const TorchPass: Story = {
  args: {
    id: 'torch-pass-1',
    title: 'Pass the Torch',
    description: "You've been granted 3 invitation torches. Pass them to students who'll help build our campus community.",
    type: 'torch_pass',
    participantCount: 89,
    timeRemaining: '47:23:16',
    isActive: true,
    hasParticipated: false,
  },
};

export const SpaceHunt: Story = {
  args: {
    id: 'space-hunt-1',
    title: 'Space Hunt',
    description: 'Discover and activate 3 spaces that match your interests. Help bring communities to life.',
    type: 'space_hunt',
    participantCount: 156,
    timeRemaining: '2 days',
    isActive: true,
    hasParticipated: false,
  },
};

export const BuilderSpotlight: Story = {
  args: {
    id: 'builder-spotlight-1',
    title: 'Builder Spotlight',
    description: 'Nominate a student who has created something amazing for the campus community.',
    type: 'builder_spotlight',
    participantCount: 234,
    isActive: false,
    hasParticipated: false,
  },
};

export const Wave: Story = {
  args: {
    id: 'wave-1',
    title: 'Study Wave',
    description: 'Share your best study spot photo and tag someone to continue the wave.',
    type: 'wave',
    participantCount: 445,
    timeRemaining: '12 hours',
    isActive: true,
    hasParticipated: true,
  },
};

export const Inactive: Story = {
  args: {
    id: 'upcoming-ritual',
    title: 'Campus Vibe Check',
    description: 'Rate your campus mood and see how the community is feeling this week.',
    type: 'wave',
    participantCount: 0,
    isActive: false,
    hasParticipated: false,
  },
};

// Showcase multiple rituals
export const RitualFeed: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <RitualCard {...FirstLight.args!} />
      <RitualCard {...TorchPass.args!} />
      <RitualCard {...SpaceHunt.args!} />
      <RitualCard {...Wave.args!} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple ritual cards showing the variety of HIVE experiences',
      },
    },
  },
};

// Design system showcase
export const DesignSystemShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-h3 font-display text-foreground">HIVE Design System in Action</h3>
        <p className="text-muted font-body">
          All components automatically follow HIVE brand guidelines:
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="text-body font-medium text-foreground">🎨 Monochrome + Gold System</h4>
          <RitualCard {...FirstLight.args!} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-body font-medium text-foreground">✨ Motion-Based States</h4>
          <RitualCard {...TorchPass.args!} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-body font-medium text-foreground">🏆 Completed State</h4>
          <RitualCard {...Wave.args!} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the design system ensures consistency across all ritual types',
      },
    },
  },
};