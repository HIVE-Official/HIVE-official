import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeStep } from '../../../components/onboarding/welcome-step';

const meta: Meta<typeof WelcomeStep> = {
  title: '🎓 Onboarding/Steps/WelcomeStep',
  component: WelcomeStep,
  parameters: {
    docs: {
      description: {
        component: 'Welcome introduction step for new HIVE users.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeStep>;

export const Default: Story = {
  args: {
    userEmail: 'sarah.chen@buffalo.edu',
    university: 'University at Buffalo',
  },
};

export const UBWelcome: Story = {
  name: 'UB Student Welcome',
  render: () => (
    <div className="max-w-2xl mx-auto p-6">
      <WelcomeStep
        userEmail="alex.rodriguez@buffalo.edu"
        university="University at Buffalo"
        title="Welcome to HIVE, Alex!"
        subtitle="The social utility platform built for UB students"
        description="HIVE is where you'll discover campus communities, build helpful tools, and connect with classmates who share your interests and goals."
        features={[
          {
            icon: "🏢",
            title: "Join Spaces",
            description: "Find your dorm floor, major, clubs, and study groups"
          },
          {
            icon: "🛠️",
            title: "Build Tools",
            description: "Create solutions that help your campus communities"
          },
          {
            icon: "📱",
            title: "Stay Connected",
            description: "Real-time feeds and coordination with your peers"
          },
          {
            icon: "👤",
            title: "Your Profile",
            description: "Your campus command center and reputation builder"
          }
        ]}
        nextButtonText="Let's Get Started"
      />
    </div>
  ),
};

export const WithAnimation: Story = {
  name: 'With Welcome Animation',
  render: () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        {/* HIVE Logo Animation */}
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-black">🐝</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Welcome to HIVE</h1>
        <p className="text-xl text-gray-600 mb-2">University at Buffalo</p>
        <p className="text-sm text-gray-500">sarah.chen@buffalo.edu</p>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">You're about to join...</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">👥</div>
            <div className="font-bold text-lg">1,247</div>
            <div className="text-sm text-gray-600">UB Students</div>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <div className="font-bold text-lg">89</div>
            <div className="text-sm text-gray-600">Active Spaces</div>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🛠️</div>
            <div className="font-bold text-lg">156</div>
            <div className="text-sm text-gray-600">Student Tools</div>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-bold text-lg">2,341</div>
            <div className="text-sm text-gray-600">Daily Posts</div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Join the UB HIVE →
          </button>
        </div>
      </div>
    </div>
  ),
};