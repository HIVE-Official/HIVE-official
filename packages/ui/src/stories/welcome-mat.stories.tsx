import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeMat } from '../components/welcome/welcome-mat';
import { useState } from 'react';

const meta = {
  title: 'Components/Welcome/WelcomeMat',
  component: WelcomeMat,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dismissible overlay that welcomes new users to HIVE after onboarding completion.',
      },
    },
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Whether the welcome mat is visible',
    },
    userName: {
      control: 'text',
      description: 'User name for personalization',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when the welcome mat is dismissed',
    },
  },
} satisfies Meta<typeof WelcomeMat>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for stories
const WelcomeMatWrapper = ({ 
  initialVisible = true, 
  userName,
}: { 
  initialVisible?: boolean;
  userName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold text-white">HIVE Feed</h1>
        <p className="text-zinc-400">
          This is the main feed content. The welcome mat will overlay on top when visible.
        </p>
        
        <button
          onClick={() => setIsVisible(true)}
          className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
        >
          Show Welcome Mat
        </button>

        <WelcomeMat
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
          userName={userName}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <WelcomeMatWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Default welcome mat with standard messaging and CTAs.',
      },
    },
  },
};

export const WithUserName: Story = {
  render: () => <WelcomeMatWrapper userName="Alex Chen" />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat with personalized greeting using the user\'s name.',
      },
    },
  },
};

export const Hidden: Story = {
  render: () => <WelcomeMatWrapper initialVisible={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat in hidden state. Click the button to show it.',
      },
    },
  },
};

// Static version for design review
export const StaticVisible: Story = {
  args: {
    isVisible: true,
    userName: 'Jordan Smith',
    onDismiss: () => console.log('Dismissed'),
  },
  render: (args) => (
    <div className="min-h-screen bg-zinc-900">
      <WelcomeMat {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Static version of the welcome mat for design review and testing.',
      },
    },
  },
};

// Animation showcase component
const AnimationShowcaseComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('Demo User');

    return (
      <div className="min-h-screen bg-zinc-900 p-8">
        <div className="mx-auto max-w-md space-y-4">
          <h2 className="text-xl font-bold text-white">Animation Test</h2>
          
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400">
              User Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full rounded bg-zinc-800 px-3 py-2 text-white"
              />
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsVisible(true)}
              disabled={isVisible}
              className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Show
            </button>
            <button
              onClick={() => setIsVisible(false)}
              disabled={!isVisible}
              className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Hide
            </button>
          </div>

          <WelcomeMat
            isVisible={isVisible}
            onDismiss={() => setIsVisible(false)}
            userName={userName || undefined}
          />
        </div>
      </div>
    );
};

export const AnimationShowcase: Story = {
  render: () => <AnimationShowcaseComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo to test animations and different user names.',
      },
    },
  },
};

// Accessibility test
export const AccessibilityTest: Story = {
  render: () => <WelcomeMatWrapper userName="Screen Reader User" />,
  parameters: {
    docs: {
      description: {
        story: 'Test version for accessibility features like keyboard navigation and screen reader support.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
}; 
