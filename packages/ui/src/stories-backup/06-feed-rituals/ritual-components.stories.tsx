import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RitualActionButton, MilestoneCelebration } from '../../atomic/molecules';

// Ritual Action Button Stories
const ActionButtonMeta: Meta<typeof RitualActionButton> = {
  title: '06-Feed-Rituals/Ritual Components/Action Button',
  component: RitualActionButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Ritual Action Button

Interactive button component for ritual actions with visual feedback, progress tracking, and contextual information.

## Features

- **Ritual-Specific Styling**: Each ritual type has unique colors and gradients
- **Action States**: Start, Continue, Complete, Retry with appropriate icons
- **Progress Visualization**: Progress bars for ongoing rituals
- **Hover Effects**: Smooth animations with glow and scale effects
- **Contextual Info**: Estimated time and participant counts
- **Loading States**: Spinner animations for async actions

## Business Logic

Used throughout the ritual system for primary actions:
- Starting new rituals from the Rituals Hub
- Continuing in-progress rituals
- Completing final ritual steps
- Retrying failed or incomplete rituals
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ritualType: {
      control: { type: 'select' },
      options: ['initialize', 'discover', 'connect', 'launch'],
      description: 'Type of ritual determining visual theme',
    },
    actionType: {
      control: { type: 'select' },
      options: ['start', 'continue', 'complete', 'retry'],
      description: 'Action state determining button behavior',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Progress percentage for continue/complete actions',
    },
    estimatedTime: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Estimated completion time in minutes',
    },
    participantCount: {
      control: { type: 'number', min: 0, max: 10000 },
      description: 'Number of active participants',
    },
  },
};

export default ActionButtonMeta;
type ActionButtonStory = StoryObj<typeof RitualActionButton>;

export const InitializeStart: ActionButtonStory = {
  args: {
    ritualType: 'initialize',
    actionType: 'start',
    estimatedTime: 12,
    participantCount: 1247,
    onClick: () => console.log('Start Initialize ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Initialize ritual start button with gold gradient and foundation-building theme.',
      },
    },
  },
};

export const DiscoverContinue: ActionButtonStory = {
  args: {
    ritualType: 'discover',
    actionType: 'continue',
    progress: 65,
    estimatedTime: 8,
    participantCount: 892,
    onClick: () => console.log('Continue Discover ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Discover ritual continue button showing 65% progress with purple gradient theme.',
      },
    },
  },
};

export const ConnectComplete: ActionButtonStory = {
  args: {
    ritualType: 'connect',
    actionType: 'complete',
    progress: 90,
    estimatedTime: 3,
    participantCount: 543,
    onClick: () => console.log('Complete Connect ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Connect ritual completion button near 100% progress with pink-purple gradient.',
      },
    },
  },
};

export const LaunchRetry: ActionButtonStory = {
  args: {
    ritualType: 'launch',
    actionType: 'retry',
    estimatedTime: 5,
    participantCount: 234,
    onClick: () => console.log('Retry Launch ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Launch ritual retry button with green-blue gradient for failed attempts.',
      },
    },
  },
};

export const LoadingState: ActionButtonStory = {
  args: {
    ritualType: 'initialize',
    actionType: 'start',
    isLoading: true,
    estimatedTime: 12,
    participantCount: 1247,
    onClick: () => console.log('Loading...')
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner animation while processing ritual action.',
      },
    },
  },
};

export const DisabledState: ActionButtonStory = {
  args: {
    ritualType: 'discover',
    actionType: 'start',
    isDisabled: true,
    estimatedTime: 15,
    participantCount: 0,
    onClick: () => console.log('Disabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for unavailable rituals (e.g., prerequisites not met).',
      },
    },
  },
};

// Milestone Celebration Stories
const CelebrationMeta: Meta<typeof MilestoneCelebration> = {
  title: '06-Feed-Rituals/Ritual Components/Milestone Celebration',
  component: MilestoneCelebration,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Milestone Celebration Modal

Celebratory modal that appears when users achieve significant milestones during their ritual journey.

## Features

- **Animated Entrance**: Smooth scale and fade animations
- **Rarity System**: Different colors and effects based on milestone importance
- **Particle Effects**: Sparkles and confetti during celebration phase
- **Community Stats**: Shows how many others achieved the milestone
- **Feature Unlocks**: Displays newly unlocked platform features
- **Sharing Integration**: Built-in sharing functionality

## Rarity System

- **Common**: Gray - Basic milestones (first profile setup)
- **Uncommon**: Green - Regular achievements (space joining)  
- **Rare**: Blue - Notable accomplishments (ritual completion)
- **Epic**: Purple - Major achievements (all rituals complete)
- **Legendary**: Gold - Exceptional milestones (community leadership)

## Business Logic

Celebrates key moments in the user journey:
- Profile completion milestones
- Space joining achievements  
- Friend invitation successes
- Ritual completion celebrations
- Platform feature unlocks
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
      description: 'Controls modal visibility',
    },
  },
};

const CelebrationStoryComponent = (args: any) => {
  const [isVisible, setIsVisible] = useState(args.isVisible || false);
  
  return (
    <div className="p-8">
      <button 
        onClick={() => setIsVisible(true)}
        className="px-4 py-2 bg-hive-gold text-hive-obsidian rounded-lg hover:bg-hive-gold/90"
      >
        Show Celebration
      </button>
      
      <MilestoneCelebration
        {...args}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onShare={() => console.log('Sharing milestone...')}
      />
    </div>
  );
};

const CelebrationStory: StoryObj<typeof MilestoneCelebration> = {
  render: CelebrationStoryComponent,
};

export const ProfileComplete: CelebrationStory = {
  args: {
    milestone: {
      id: 'profile_complete',
      name: 'Profile Master',
      description: 'You\'ve completed your HIVE profile with all the essential information. Your Avatar Widget is now fully populated and ready to help you navigate campus life.',
      type: 'personal',
      icon: 'target',
      rarity: 'uncommon',
      unlockedFeatures: [
        'Avatar Widget Focus View',
        'Personalized Space Recommendations',
        'Interest-Based Matching'
      ],
      communityStats: {
        totalAchievers: 1247,
        percentageComplete: 73
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Celebration for completing the Initialize ritual profile setup with feature unlocks.',
      },
    },
  },
};

export const RitualComplete: CelebrationStory = {
  args: {
    milestone: {
      id: 'discover_complete',
      name: 'Community Explorer',
      description: 'Amazing! You\'ve successfully joined your first communities on HIVE. Your spaces are now ready for the semester launch, and you\'ll receive personalized content from these communities.',
      type: 'ritual_complete',
      icon: 'trophy',
      rarity: 'rare',
      unlockedFeatures: [
        'My Spaces Widget',
        'Space Event Notifications',
        'Community Feed Access',
        'Space-Specific Tools'
      ],
      communityStats: {
        totalAchievers: 892,
        percentageComplete: 58
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Major celebration for completing the Discover ritual with community stats.',
      },
    },
  },
};

export const LegendaryAchievement: CelebrationStory = {
  args: {
    milestone: {
      id: 'all_rituals_complete',
      name: 'HIVE Pioneer',
      description: 'Incredible! You\'ve completed all summer rituals and are fully prepared for campus life. You\'re among the first students ready for the full HIVE experience when semester begins.',
      type: 'ritual_complete',
      icon: 'award',
      rarity: 'legendary',
      unlockedFeatures: [
        'Full Platform Access',
        'Priority Feed Algorithm',
        'Early Feature Access',
        'Community Builder Badge',
        'Exclusive Campus Events'
      ],
      communityStats: {
        totalAchievers: 156,
        percentageComplete: 12
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Legendary celebration for completing all summer rituals - the ultimate achievement.',
      },
    },
  },
};

export const CommunityMilestone: CelebrationStory = {
  args: {
    milestone: {
      id: 'friend_inviter',
      name: 'Community Builder',
      description: 'You\'ve successfully invited friends to join HIVE! Your invitations help grow our campus community and ensure you\'ll have your crew ready for semester launch.',
      type: 'community',
      icon: 'users',
      rarity: 'uncommon',
      unlockedFeatures: [
        'Friend Invite Tracking',
        'Social Connection Widgets',
        'Group Formation Tools'
      ],
      communityStats: {
        totalAchievers: 634,
        percentageComplete: 41
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Community-focused celebration for successful friend invitations during Connect ritual.',
      },
    },
  },
};

export const EpicMilestone: CelebrationStory = {
  args: {
    milestone: {
      id: 'space_leader',
      name: 'Space Catalyst',
      description: 'Outstanding! You\'ve become a leader in multiple spaces, helping to organize events and build community connections. Your leadership is helping shape campus culture.',
      type: 'community',
      icon: 'star',
      rarity: 'epic',
      unlockedFeatures: [
        'Space Leadership Tools',
        'Event Creation Access',
        'Advanced Community Analytics',
        'Cross-Space Collaboration'
      ],
      communityStats: {
        totalAchievers: 89,
        percentageComplete: 7
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Epic rarity celebration for exceptional community leadership achievements.',
      },
    },
  },
};

// Show different animation phases
export const CelebrationPhases: CelebrationStory = {
  args: {
    milestone: {
      id: 'animation_demo',
      name: 'Animation Demo',
      description: 'This celebration shows the full animation sequence with particle effects and smooth transitions.',
      type: 'personal',
      icon: 'sparkles',
      rarity: 'rare',
      unlockedFeatures: ['Demo Feature'],
      communityStats: {
        totalAchievers: 500,
        percentageComplete: 50
      }
    },
    isVisible: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of the full celebration animation sequence with particle effects.',
      },
    },
  },
};