import type { Meta, StoryObj } from '@storybook/react';
import { LockedFeedSkeleton } from '../../atomic/organisms/locked-feed-skeleton';

const meta: Meta<typeof LockedFeedSkeleton> = {
  title: '06-Feed-Rituals/Locked Feed Skeleton',
  component: LockedFeedSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Locked Feed Skeleton - vBETA State

The Locked Feed Skeleton is displayed when users navigate to what will become the Activity Feed during the vBETA summer period. It serves multiple strategic purposes:

## Business Logic

**Educational Purpose:**
- Teaches users what the Activity Feed will contain
- Shows preview content to build anticipation
- Explains the value proposition of completing rituals

**Motivation System:**
- Countdown timer creates urgency for semester start
- Progress tracking shows ritual completion benefits
- Call-to-action drives users back to ritual completion

**User Experience:**
- Prevents confusion about "missing" feed functionality
- Sets expectations for v1 launch features
- Maintains engagement during the waiting period

## Design Principles

- **Transparency**: Clearly communicates when and why the feed is locked
- **Education**: Shows exactly what users will get when unlocked
- **Motivation**: Connects ritual completion to feed personalization
- **Anticipation**: Builds excitement for the full platform experience

The skeleton creates a seamless transition story: "Complete rituals → Get personalized feed"
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activationDate: {
      control: { type: 'date' },
      description: 'Date when the Activity Feed will activate',
    },
    currentRitualProgress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'User\'s current ritual completion percentage',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LockedFeedSkeleton>;

export const DefaultState: Story = {
  args: {
    activationDate: new Date('2024-08-15'),
    currentRitualProgress: 45
  },
  parameters: {
    docs: {
      description: {
        story: 'Default locked state with semester countdown and moderate ritual progress. Shows the primary experience most users will see during vBETA.',
      },
    },
  },
};

export const EarlyInSummer: Story = {
  args: {
    activationDate: new Date('2024-08-20'),
    currentRitualProgress: 15
  },
  parameters: {
    docs: {
      description: {
        story: 'Early summer state with low ritual progress. Emphasizes the time available and encourages ritual engagement.',
      },
    },
  },
};

export const AlmostReady: Story = {
  args: {
    activationDate: new Date('2024-08-12'),
    currentRitualProgress: 85
  },
  parameters: {
    docs: {
      description: {
        story: 'Near-completion state with high ritual progress and close activation date. Builds excitement for imminent launch.',
      },
    },
  },
};

export const JustStarting: Story = {
  args: {
    activationDate: new Date('2024-09-01'),
    currentRitualProgress: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Just started state with minimal progress and longer countdown. Maximum motivation potential.',
      },
    },
  },
};

export const LaunchWeek: Story = {
  args: {
    activationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    currentRitualProgress: 75
  },
  parameters: {
    docs: {
      description: {
        story: 'Launch week countdown with high progress. Creates anticipation and urgency for final ritual completion.',
      },
    },
  },
};

export const RitualsMaster: Story = {
  args: {
    activationDate: new Date('2024-08-15'),
    currentRitualProgress: 100
  },
  parameters: {
    docs: {
      description: {
        story: 'Completed rituals state. User has finished all summer preparations and is fully ready for feed activation.',
      },
    },
  },
};

// Mobile responsive view
export const MobileView: Story = {
  args: {
    activationDate: new Date('2024-08-15'),
    currentRitualProgress: 45
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile-optimized view with responsive countdown display and touch-friendly interactions.',
      },
    },
  },
};

// Tablet view
export const TabletView: Story = {
  args: {
    activationDate: new Date('2024-08-15'),
    currentRitualProgress: 60
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    docs: {
      description: {
        story: 'Tablet view with balanced layout between mobile and desktop experiences.',
      },
    },
  },
};

// Long countdown scenario
export const LongCountdown: Story = {
  args: {
    activationDate: new Date('2024-12-15'), // Far future date
    currentRitualProgress: 25
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended countdown scenario for testing with longer time periods. Shows how the component handles larger numbers.',
      },
    },
  },
};

// Past date scenario (should still show content appropriately)
export const PostActivation: Story = {
  args: {
    activationDate: new Date('2024-01-15'), // Past date
    currentRitualProgress: 90
  },
  parameters: {
    docs: {
      description: {
        story: 'Post-activation scenario where the date has passed. Component should handle gracefully and potentially show different messaging.',
      },
    },
  },
};