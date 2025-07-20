import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveSpaceDirectory, HiveSpaceCard, HiveSpaceLayout, HiveButton, HiveCard, HiveBadge } from '../../components';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '07-Spaces/User Journeys',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space User Journeys

Complete user workflows that demonstrate the full HIVE spaces experience from discovery to active participation.

## User Journey Stages

1. **Discovery** - Finding relevant spaces through search and recommendations
2. **Evaluation** - Reviewing space details, members, and activity
3. **Joining** - Becoming a member of a space
4. **Onboarding** - First-time experience and orientation
5. **Participation** - Active engagement and content creation
6. **Growth** - Becoming a builder and contributing to space development

## Design Principles

- **Progressive Disclosure** - Information revealed at appropriate stages
- **Contextual Guidance** - Help when and where users need it
- **Smooth Transitions** - Seamless flow between stages
- **Feedback Loops** - Clear confirmation of actions and progress
- **Personalization** - Tailored experience based on user context

## When to Use

- **New User Onboarding** - Guide new users through their first space experience
- **Feature Discovery** - Help users discover space capabilities
- **User Research** - Understanding user behavior and pain points
- **Design Validation** - Test complete user workflows
- **Documentation** - Comprehensive user experience documentation
        `,
      },
    },
  },
};

export default meta;

// Mock data for user journeys
const mockSpaces = [
  {
    id: '1',
    name: 'Stanford CS Study Group',
    description: 'Collaborative study space for Computer Science students at Stanford University',
    memberCount: 156,
    isActive: true,
    activityScore: 0.92,
    type: 'academic' as const,
    bannerUrl: '/api/placeholder/400/200',
    tags: ['computer-science', 'study-group', 'collaboration'],
    status: 'activated' as const,
    trending: true,
    isJoined: false,
  },
  {
    id: '2',
    name: 'Wilbur Hall Community',
    description: 'Connect with your dorm neighbors and organize fun activities',
    memberCount: 89,
    isActive: true,
    activityScore: 0.78,
    type: 'residential' as const,
    bannerUrl: '/api/placeholder/400/200',
    tags: ['residential', 'community', 'social'],
    status: 'activated' as const,
    trending: false,
    isJoined: false,
  },
  {
    id: '3',
    name: 'Entrepreneurship Club',
    description: 'Stanford student entrepreneurs building the future',
    memberCount: 234,
    isActive: true,
    activityScore: 0.85,
    type: 'social' as const,
    bannerUrl: '/api/placeholder/400/200',
    tags: ['entrepreneurship', 'business', 'networking'],
    status: 'activated' as const,
    trending: true,
    isJoined: false,
  },
];

const mockUser = {
  id: 'user123',
  name: 'Alex Chen',
  email: 'alex.chen@stanford.edu',
  avatar: '/api/placeholder/40/40',
  school: 'Stanford University',
  major: 'Computer Science',
  year: 'Sophomore',
  interests: ['computer-science', 'entrepreneurship', 'design'],
  joinedSpaces: [],
};

// Journey Step Component
const JourneyStep = ({ 
  step, 
  title, 
  description, 
  isActive, 
  isCompleted,
  children 
}: {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-4">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
        ${isCompleted ? 'bg-green-500 text-white' : 
          isActive ? 'bg-hive-gold text-black' : 'bg-gray-300 text-gray-600'}
      `}>
        {isCompleted ? '✓' : step}
      </div>
      <div className="flex-1">
        <h3 className={`text-lg font-bold ${isActive ? 'text-hive-gold' : 'text-gray-700'}`}>
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

// Journey Tracker Component
const JourneyTracker = ({ 
  steps, 
  currentStep 
}: { 
  steps: string[];
  currentStep: number;
}) => (
  <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">User Journey Progress</h3>
    <div className="flex items-center gap-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
            ${index < currentStep ? 'bg-green-500 text-white' : 
              index === currentStep ? 'bg-hive-gold text-black' : 'bg-gray-200 text-gray-600'}
          `}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`
              w-8 h-px mx-1
              ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
    <div className="mt-2 text-xs text-gray-600">
      Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
    </div>
  </div>
);

export const SpaceDiscoveryFlow: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpace, setSelectedSpace] = useState<any>(null);
    
    const steps = [
      'Landing & Search',
      'Browse Results',
      'Space Preview',
      'Join Decision',
      'Joined Success'
    ];

    const handleSpaceSelect = (space: any) => {
      setSelectedSpace(space);
      setCurrentStep(2);
    };

    const handleJoinSpace = () => {
      setCurrentStep(4);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Space Discovery Flow
            </h1>
            <p className="text-gray-600">
              Complete user journey from discovering spaces to joining and participating
            </p>
          </div>

          <JourneyTracker steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Welcome to HIVE Spaces</h2>
                    <p className="text-gray-600 mb-6">
                      Discover spaces where your Stanford community comes together to learn, collaborate, and grow.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          What are you interested in?
                        </label>
                        <input
                          type="text"
                          placeholder="Search spaces..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        />
                      </div>
                      <HiveButton
                        onClick={() => setCurrentStep(1)}
                        className="w-full"
                      >
                        Explore Spaces
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="browse"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                      <h2 className="text-xl font-bold mb-4">Browse Spaces</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockSpaces.map((space) => (
                          <div
                            key={space.id}
                            onClick={() => handleSpaceSelect(space)}
                            className="cursor-pointer transform hover:scale-105 transition-transform"
                          >
                            <HiveSpaceCard
                              space={space}
                              variant="default"
                              onClick={() => handleSpaceSelect(space)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && selectedSpace && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">{selectedSpace.name}</h2>
                      <HiveBadge variant="secondary">
                        {selectedSpace.memberCount} members
                      </HiveBadge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">About this space</h3>
                        <p className="text-gray-600 mb-4">{selectedSpace.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSpace.tags.map((tag) => (
                            <HiveBadge key={tag} variant="outline" size="sm">
                              {tag}
                            </HiveBadge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Recent Activity</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>12 new posts this week</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>3 upcoming events</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Active discussions</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <HiveButton
                        onClick={handleJoinSpace}
                        className="flex-1"
                      >
                        Join Space
                      </HiveButton>
                      <HiveButton
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back to Browse
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg shadow-sm border p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Welcome to {selectedSpace?.name}!</h2>
                    <p className="text-gray-600 mb-6">
                      You've successfully joined the space. Start exploring and connecting with your community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-2">Explore Posts</h3>
                        <p className="text-sm text-gray-600">
                          Check out recent discussions and announcements
                        </p>
                      </HiveCard>
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-2">Meet Members</h3>
                        <p className="text-sm text-gray-600">
                          Connect with other members in the community
                        </p>
                      </HiveCard>
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-2">Join Events</h3>
                        <p className="text-sm text-gray-600">
                          Participate in upcoming space activities
                        </p>
                      </HiveCard>
                    </div>
                    <HiveButton
                      onClick={() => setCurrentStep(0)}
                      variant="outline"
                    >
                      Start Over
                    </HiveButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold mb-4">Journey Context</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">User:</span> {mockUser.name}
                  </div>
                  <div>
                    <span className="font-medium">School:</span> {mockUser.school}
                  </div>
                  <div>
                    <span className="font-medium">Major:</span> {mockUser.major}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {mockUser.year}
                  </div>
                  <div>
                    <span className="font-medium">Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mockUser.interests.map((interest) => (
                        <HiveBadge key={interest} variant="outline" size="sm">
                          {interest}
                        </HiveBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const NewMemberOnboarding: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userProfile, setUserProfile] = useState({
      bio: '',
      interests: [],
      notifications: true,
    });

    const steps = [
      'Welcome',
      'Profile Setup',
      'Space Orientation',
      'First Interaction',
      'Engagement Ready'
    ];

    const spaceIntro = {
      name: 'Stanford CS Study Group',
      welcomeMessage: 'Welcome to our collaborative learning community!',
      quickTips: [
        'Share your study notes and resources',
        'Ask questions in our discussion threads',
        'Join study sessions and group projects',
        'Connect with classmates in your courses'
      ],
      guidelines: [
        'Be respectful and inclusive',
        'Share knowledge freely',
        'Help others learn and grow',
        'Keep discussions relevant to CS topics'
      ]
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              New Member Onboarding
            </h1>
            <p className="text-gray-600">
              First-time experience for new space members
            </p>
          </div>

          <JourneyTracker steps={steps} currentStep={currentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-8 text-center"
              >
                <div className="w-20 h-20 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black text-3xl font-bold">🎉</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to {spaceIntro.name}!
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {spaceIntro.welcomeMessage}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Let's get you set up to make the most of this space
                </p>
                <HiveButton
                  onClick={() => setCurrentStep(1)}
                  size="lg"
                >
                  Get Started
                </HiveButton>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Complete Your Profile</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tell us about yourself
                    </label>
                    <textarea
                      placeholder="Share your academic interests, what you're working on, or what you hope to get from this space..."
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your CS Interests
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['AI/ML', 'Web Development', 'Systems', 'Theory', 'HCI', 'Security', 'Mobile', 'Data Science', 'Graphics'].map((interest) => (
                        <label key={interest} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserProfile({
                                  ...userProfile,
                                  interests: [...userProfile.interests, interest]
                                });
                              } else {
                                setUserProfile({
                                  ...userProfile,
                                  interests: userProfile.interests.filter(i => i !== interest)
                                });
                              }
                            }}
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={userProfile.notifications}
                        onChange={(e) => setUserProfile({...userProfile, notifications: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      Get notified about new posts and events
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <HiveButton
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                      disabled={!userProfile.bio.trim() || userProfile.interests.length === 0}
                    >
                      Continue
                    </HiveButton>
                    <HiveButton
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                    >
                      Back
                    </HiveButton>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="orientation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Space Orientation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">What you can do here</h3>
                    <div className="space-y-3">
                      {spaceIntro.quickTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-hive-gold rounded-full flex items-center justify-center text-xs font-bold text-black">
                            {index + 1}
                          </div>
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Community Guidelines</h3>
                    <div className="space-y-3">
                      {spaceIntro.guidelines.map((guideline, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                            ✓
                          </div>
                          <span className="text-sm">{guideline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Space Layout</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This space is organized into 6 surfaces for different types of content:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Posts & Discussions
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Events & Calendar
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Tools & Resources
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Members Directory
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Pinned Content
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Chat (Coming Soon)
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <HiveButton
                    onClick={() => setCurrentStep(3)}
                    className="flex-1"
                  >
                    Start Exploring
                  </HiveButton>
                  <HiveButton
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </HiveButton>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="first-interaction"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Make Your First Interaction</h2>
                <p className="text-gray-600 mb-6">
                  Great! Now let's help you make your first contribution to the space.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">✍️ Create a Post</h3>
                    <p className="text-sm text-gray-600">
                      Share a question, insight, or introduce yourself
                    </p>
                  </HiveCard>
                  <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">👥 Meet Members</h3>
                    <p className="text-sm text-gray-600">
                      Browse member profiles and connect with peers
                    </p>
                  </HiveCard>
                  <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">📅 Join an Event</h3>
                    <p className="text-sm text-gray-600">
                      Sign up for an upcoming study session or event
                    </p>
                  </HiveCard>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Suggested First Post</h3>
                  <p className="text-sm text-blue-800">
                    "Hi everyone! I'm {mockUser.name}, a {mockUser.year} studying {mockUser.major}. 
                    I'm excited to join this community and looking forward to collaborating on CS projects. 
                    What are some of your favorite resources for learning algorithms?"
                  </p>
                </div>

                <div className="flex gap-3">
                  <HiveButton
                    onClick={() => setCurrentStep(4)}
                    className="flex-1"
                  >
                    I'm Ready to Participate
                  </HiveButton>
                  <HiveButton
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </HiveButton>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-sm border p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Welcome to the {spaceIntro.name} community. You now have everything you need to start participating and contributing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Quick Access</h3>
                    <div className="space-y-2 text-sm">
                      <div>📝 Create your first post</div>
                      <div>👥 Browse member directory</div>
                      <div>📅 Check upcoming events</div>
                      <div>🔧 Explore available tools</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <div className="space-y-2 text-sm">
                      <div>💬 Ask questions in the main feed</div>
                      <div>📖 Check the pinned resources</div>
                      <div>👨‍💻 Contact space builders</div>
                      <div>🎯 Review community guidelines</div>
                    </div>
                  </div>
                </div>

                <HiveButton
                  onClick={() => setCurrentStep(0)}
                  variant="outline"
                >
                  Start Over
                </HiveButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
};

export const SpaceParticipationFlow: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userActions, setUserActions] = useState({
      postsCreated: 0,
      commentsPosted: 0,
      eventsJoined: 0,
      reactionsGiven: 0,
      toolsUsed: 0,
    });

    const steps = [
      'Daily Browse',
      'Content Creation',
      'Community Interaction',
      'Event Participation',
      'Active Contributor'
    ];

    const incrementAction = (action: keyof typeof userActions) => {
      setUserActions(prev => ({
        ...prev,
        [action]: prev[action] + 1
      }));
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Space Participation Flow
            </h1>
            <p className="text-gray-600">
              Regular space usage and community engagement patterns
            </p>
          </div>

          <JourneyTracker steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="browse"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Daily Space Browse</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            AC
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Alex Chen</div>
                            <div className="text-xs text-gray-500">2 hours ago</div>
                          </div>
                        </div>
                        <p className="text-sm mb-3">
                          Anyone working on the algorithms assignment? I'm stuck on the dynamic programming part...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button 
                            onClick={() => incrementAction('reactionsGiven')}
                            className="flex items-center gap-1 hover:text-red-500"
                          >
                            ❤️ {userActions.reactionsGiven + 5}
                          </button>
                          <button 
                            onClick={() => incrementAction('commentsPosted')}
                            className="flex items-center gap-1 hover:text-blue-500"
                          >
                            💬 {userActions.commentsPosted + 3}
                          </button>
                          <span>🔗 Share</span>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            SM
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Sarah Miller</div>
                            <div className="text-xs text-gray-500">4 hours ago</div>
                          </div>
                        </div>
                        <p className="text-sm mb-3">
                          📚 Shared a great resource: "Introduction to Algorithms" study guide with solved examples
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button 
                            onClick={() => incrementAction('reactionsGiven')}
                            className="flex items-center gap-1 hover:text-red-500"
                          >
                            ❤️ {userActions.reactionsGiven + 12}
                          </button>
                          <button 
                            onClick={() => incrementAction('commentsPosted')}
                            className="flex items-center gap-1 hover:text-blue-500"
                          >
                            💬 {userActions.commentsPosted + 7}
                          </button>
                          <span>🔗 Share</span>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">📅 Upcoming Events</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>CS106B Study Session</span>
                            <button 
                              onClick={() => {
                                incrementAction('eventsJoined');
                                setCurrentStep(3);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Join
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Algorithms Workshop</span>
                            <button 
                              onClick={() => incrementAction('eventsJoined')}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Join
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <HiveButton
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Create Content
                      </HiveButton>
                      <HiveButton
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                      >
                        Interact with Community
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="create"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Create Content</h2>
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Create a Post</h3>
                        <textarea
                          placeholder="Share your thoughts, questions, or resources..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          rows={3}
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-2">
                            <button className="text-sm text-gray-500 hover:text-gray-700">📎 Attach</button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">🏷️ Tag</button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">📊 Poll</button>
                          </div>
                          <HiveButton
                            size="sm"
                            onClick={() => {
                              incrementAction('postsCreated');
                              setCurrentStep(2);
                            }}
                          >
                            Post
                          </HiveButton>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Share a Resource</h3>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Resource title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          />
                          <input
                            type="url"
                            placeholder="Resource URL"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          />
                          <textarea
                            placeholder="Why is this resource helpful?"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                            rows={2}
                          />
                          <HiveButton
                            size="sm"
                            onClick={() => {
                              incrementAction('postsCreated');
                              setCurrentStep(2);
                            }}
                          >
                            Share Resource
                          </HiveButton>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Ask a Question</h3>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="What's your question?"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          />
                          <textarea
                            placeholder="Provide more details..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <HiveBadge variant="outline" size="sm">CS106B</HiveBadge>
                            <HiveBadge variant="outline" size="sm">Algorithms</HiveBadge>
                            <HiveBadge variant="outline" size="sm">Help Needed</HiveBadge>
                          </div>
                          <HiveButton
                            size="sm"
                            onClick={() => {
                              incrementAction('postsCreated');
                              setCurrentStep(2);
                            }}
                          >
                            Ask Question
                          </HiveButton>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <HiveButton
                        onClick={() => setCurrentStep(0)}
                        variant="outline"
                      >
                        Back to Browse
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="interact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Community Interaction</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            JD
                          </div>
                          <div>
                            <div className="font-semibold text-sm">John Doe</div>
                            <div className="text-xs text-gray-500">1 hour ago</div>
                          </div>
                        </div>
                        <p className="text-sm mb-3">
                          Can someone explain the difference between DFS and BFS? I keep getting confused...
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <textarea
                            placeholder="Share your knowledge..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end mt-2">
                            <HiveButton
                              size="sm"
                              onClick={() => {
                                incrementAction('commentsPosted');
                                setCurrentStep(4);
                              }}
                            >
                              Reply
                            </HiveButton>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button 
                            onClick={() => incrementAction('reactionsGiven')}
                            className="flex items-center gap-1 hover:text-red-500"
                          >
                            ❤️ {userActions.reactionsGiven + 8}
                          </button>
                          <span>💬 {userActions.commentsPosted + 5}</span>
                          <span>🔗 Share</span>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Helpful Members to Follow</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                TA
                              </div>
                              <div>
                                <div className="font-semibold text-sm">Teaching Assistant</div>
                                <div className="text-xs text-gray-500">CS106B TA • Active contributor</div>
                              </div>
                            </div>
                            <HiveButton size="sm" variant="outline">
                              Follow
                            </HiveButton>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                SM
                              </div>
                              <div>
                                <div className="font-semibold text-sm">Study Group Leader</div>
                                <div className="text-xs text-gray-500">Algorithms expert • Helpful resources</div>
                              </div>
                            </div>
                            <HiveButton size="sm" variant="outline">
                              Follow
                            </HiveButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <HiveButton
                        onClick={() => setCurrentStep(3)}
                        className="flex-1"
                      >
                        Join Events
                      </HiveButton>
                      <HiveButton
                        variant="outline"
                        onClick={() => setCurrentStep(0)}
                      >
                        Back to Browse
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Event Participation</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">📅 Upcoming Events</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <div className="font-semibold text-sm">CS106B Study Session</div>
                              <div className="text-xs text-gray-500">Tomorrow 2:00 PM • Green Library</div>
                              <div className="text-xs text-gray-500">15 members attending</div>
                            </div>
                            <HiveButton
                              size="sm"
                              onClick={() => incrementAction('eventsJoined')}
                            >
                              Join
                            </HiveButton>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <div className="font-semibold text-sm">Algorithms Workshop</div>
                              <div className="text-xs text-gray-500">Friday 4:00 PM • Gates Building</div>
                              <div className="text-xs text-gray-500">23 members attending</div>
                            </div>
                            <HiveButton
                              size="sm"
                              onClick={() => incrementAction('eventsJoined')}
                            >
                              Join
                            </HiveButton>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div>
                              <div className="font-semibold text-sm">Group Project Matching</div>
                              <div className="text-xs text-gray-500">Next Week • Virtual</div>
                              <div className="text-xs text-gray-500">8 members attending</div>
                            </div>
                            <HiveButton
                              size="sm"
                              onClick={() => incrementAction('eventsJoined')}
                            >
                              Join
                            </HiveButton>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">🎯 Suggest an Event</h3>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Event title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          />
                          <textarea
                            placeholder="Event description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                            rows={2}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="datetime-local"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                            />
                            <input
                              type="text"
                              placeholder="Location"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                            />
                          </div>
                          <HiveButton
                            size="sm"
                            onClick={() => setCurrentStep(4)}
                          >
                            Suggest Event
                          </HiveButton>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <HiveButton
                        onClick={() => setCurrentStep(4)}
                        className="flex-1"
                      >
                        Continue to Growth
                      </HiveButton>
                      <HiveButton
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </HiveButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="contributor"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Active Contributor</h2>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black text-2xl">⭐</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Congratulations! You're now an active contributor
                      </h3>
                      <p className="text-gray-600">
                        Your engagement helps make this space valuable for everyone
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">{userActions.postsCreated}</div>
                        <div className="text-xs text-gray-600">Posts Created</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">{userActions.commentsPosted}</div>
                        <div className="text-xs text-gray-600">Comments</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">{userActions.eventsJoined}</div>
                        <div className="text-xs text-gray-600">Events Joined</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">{userActions.reactionsGiven}</div>
                        <div className="text-xs text-gray-600">Reactions</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">{userActions.toolsUsed}</div>
                        <div className="text-xs text-gray-600">Tools Used</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-hive-gold">5</div>
                        <div className="text-xs text-gray-600">Helpful Votes</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">🚀 Ready for More?</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        You've shown great engagement! Consider applying to become a space builder to help shape the community.
                      </p>
                      <HiveButton size="sm" variant="outline">
                        Apply to be a Builder
                      </HiveButton>
                    </div>

                    <HiveButton
                      onClick={() => setCurrentStep(0)}
                      variant="outline"
                      className="w-full"
                    >
                      Start Over
                    </HiveButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold mb-4">Activity Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Posts Created</span>
                    <span className="font-semibold text-hive-gold">{userActions.postsCreated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Comments Posted</span>
                    <span className="font-semibold text-hive-gold">{userActions.commentsPosted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Events Joined</span>
                    <span className="font-semibold text-hive-gold">{userActions.eventsJoined}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reactions Given</span>
                    <span className="font-semibold text-hive-gold">{userActions.reactionsGiven}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tools Used</span>
                    <span className="font-semibold text-hive-gold">{userActions.toolsUsed}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">Engagement Level</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (userActions.postsCreated + userActions.commentsPosted + userActions.eventsJoined + userActions.reactionsGiven) * 5)}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.min(100, (userActions.postsCreated + userActions.commentsPosted + userActions.eventsJoined + userActions.reactionsGiven) * 5)}% Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const MemberToBuilderJourney: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [application, setApplication] = useState({
      motivation: '',
      experience: '',
      ideas: '',
      commitment: '',
    });

    const steps = [
      'Recognition',
      'Application',
      'Review Process',
      'Onboarding',
      'Builder Tools'
    ];

    const builderCapabilities = [
      'Moderate content and discussions',
      'Manage space settings and permissions',
      'Organize events and activities',
      'Deploy and configure tools',
      'Invite and manage members',
      'Customize space layout and surfaces',
      'Access detailed analytics',
      'Create and manage space guidelines'
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Member to Builder Journey
            </h1>
            <p className="text-gray-600">
              Growth path from active member to space builder
            </p>
          </div>

          <JourneyTracker steps={steps} currentStep={currentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="recognition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Builder Recognition</h2>
                <div className="bg-gradient-to-r from-hive-gold/20 to-yellow-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
                      <span className="text-black text-xl">⭐</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">You're making a difference!</h3>
                      <p className="text-sm text-gray-600">
                        Your contributions to Stanford CS Study Group have been noticed
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">24</div>
                      <div className="text-xs text-gray-600">Helpful Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">156</div>
                      <div className="text-xs text-gray-600">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">8</div>
                      <div className="text-xs text-gray-600">Events Organized</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">4.9</div>
                      <div className="text-xs text-gray-600">Helpfulness Rating</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">What Builders Do</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {builderCapabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-hive-gold rounded-full"></div>
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Ready to take the next step?</h3>
                    <p className="text-sm text-blue-800 mb-3">
                      Based on your engagement, we think you'd make a great builder for this space. 
                      Builders help shape the community and enhance the experience for all members.
                    </p>
                    <div className="flex gap-2">
                      <HiveButton
                        size="sm"
                        onClick={() => setCurrentStep(1)}
                      >
                        Apply to be a Builder
                      </HiveButton>
                      <HiveButton
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentStep(0)}
                      >
                        Maybe Later
                      </HiveButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="application"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Builder Application</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Why do you want to become a builder for this space?
                    </label>
                    <textarea
                      value={application.motivation}
                      onChange={(e) => setApplication({...application, motivation: e.target.value})}
                      placeholder="Share your motivation and vision for the space..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What experience do you have leading or organizing communities?
                    </label>
                    <textarea
                      value={application.experience}
                      onChange={(e) => setApplication({...application, experience: e.target.value})}
                      placeholder="Describe your leadership experience, projects, or initiatives..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What ideas do you have for improving this space?
                    </label>
                    <textarea
                      value={application.ideas}
                      onChange={(e) => setApplication({...application, ideas: e.target.value})}
                      placeholder="Share specific ideas for events, features, or improvements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How much time can you commit to builder responsibilities?
                    </label>
                    <select
                      value={application.commitment}
                      onChange={(e) => setApplication({...application, commitment: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    >
                      <option value="">Select your availability</option>
                      <option value="2-3 hours/week">2-3 hours per week</option>
                      <option value="4-6 hours/week">4-6 hours per week</option>
                      <option value="7-10 hours/week">7-10 hours per week</option>
                      <option value="10+ hours/week">10+ hours per week</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Application Review Process</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Current builders review your application</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Optional interview or discussion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Trial period with mentorship</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Full builder access and responsibilities</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <HiveButton
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                      disabled={!application.motivation || !application.experience || !application.ideas || !application.commitment}
                    >
                      Submit Application
                    </HiveButton>
                    <HiveButton
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                    >
                      Back
                    </HiveButton>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Review Process</h2>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">📋</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-4">
                      Your application has been submitted and is being reviewed by the current builders.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-3">Review Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                        <span className="text-sm">Application received</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          2
                        </div>
                        <span className="text-sm">Builder team review (2-3 days)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                          3
                        </div>
                        <span className="text-sm">Discussion with current builders (if needed)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                          4
                        </div>
                        <span className="text-sm">Decision and onboarding</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">What to Expect</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-hive-gold rounded-full mt-2"></div>
                        <span>
                          <strong>Email notification:</strong> You'll receive updates on your application status
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-hive-gold rounded-full mt-2"></div>
                        <span>
                          <strong>Builder meeting:</strong> If selected, you'll be invited to meet the team
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-hive-gold rounded-full mt-2"></div>
                        <span>
                          <strong>Trial period:</strong> Start with limited builder access and mentorship
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-hive-gold rounded-full mt-2"></div>
                        <span>
                          <strong>Full access:</strong> After successful trial, gain full builder capabilities
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">While You Wait</h3>
                      <div className="space-y-2 text-sm">
                        <div>• Continue being an active member</div>
                        <div>• Help new members get oriented</div>
                        <div>• Participate in discussions</div>
                        <div>• Attend space events</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Current Builders</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          <span>Alex Chen (Founder)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span>Sarah Miller (TA)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          <span>Mike Johnson (Senior)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <HiveButton
                      onClick={() => setCurrentStep(3)}
                      className="flex-1"
                    >
                      Simulate Approval
                    </HiveButton>
                    <HiveButton
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back to Application
                    </HiveButton>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Builder Onboarding</h2>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎉</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Congratulations!</h3>
                    <p className="text-gray-600 mb-4">
                      You've been approved as a builder for Stanford CS Study Group!
                    </p>
                    <HiveBadge variant="default" className="bg-hive-gold text-black">
                      Builder
                    </HiveBadge>
                  </div>

                  <div className="bg-hive-gold/20 border border-hive-gold/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Welcome to the Builder Team!</h3>
                    <p className="text-sm mb-3">
                      You're now part of a dedicated team working to make this space valuable for all members. 
                      Let's get you started with your new responsibilities.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Mentor:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span>Sarah Miller (TA)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Your New Capabilities</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Moderate posts and comments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Pin important content</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Create and manage events</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Invite new members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Access space analytics</span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Trial Period (2 weeks)</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Limited moderation powers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Weekly check-ins with mentor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Learning builder best practices</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Feedback and guidance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Getting Started Checklist</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Complete builder training modules</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Read space guidelines and policies</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Schedule first mentor meeting</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Introduce yourself to the builder team</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Set up builder dashboard access</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <HiveButton
                      onClick={() => setCurrentStep(4)}
                      className="flex-1"
                    >
                      Access Builder Tools
                    </HiveButton>
                    <HiveButton
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </HiveButton>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Builder Tools & Dashboard</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-hive-gold/20 to-yellow-100 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🛠️ Welcome to your Builder Dashboard</h3>
                    <p className="text-sm text-gray-600">
                      You now have access to powerful tools to help manage and grow the space.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">📊 Space Analytics</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        View detailed insights about member engagement, content performance, and space growth.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-bold text-hive-gold">156</div>
                          <div className="text-gray-600">Members</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-hive-gold">89%</div>
                          <div className="text-gray-600">Active</div>
                        </div>
                      </div>
                    </HiveCard>

                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">👥 Member Management</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Invite new members, manage roles, and handle member requests.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• 3 pending join requests</div>
                        <div>• 2 builder applications</div>
                        <div>• 12 members invited this week</div>
                      </div>
                    </HiveCard>

                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">🎯 Content Moderation</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Moderate posts, manage reported content, and maintain community standards.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• 0 items need review</div>
                        <div>• 24 posts moderated this week</div>
                        <div>• 5 posts pinned</div>
                      </div>
                    </HiveCard>

                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">📅 Event Management</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Create events, manage RSVPs, and coordinate space activities.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• 3 upcoming events</div>
                        <div>• 67 total RSVPs</div>
                        <div>• 1 event needs approval</div>
                      </div>
                    </HiveCard>

                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">🔧 Space Settings</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Configure space privacy, permissions, and surface layout.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• 6 surfaces configured</div>
                        <div>• Public space</div>
                        <div>• Auto-join enabled</div>
                      </div>
                    </HiveCard>

                    <HiveCard className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">🛠️ Tool Deployment</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Deploy and manage tools to enhance space functionality.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• 4 tools deployed</div>
                        <div>• 2 tools pending approval</div>
                        <div>• 156 total tool uses</div>
                      </div>
                    </HiveCard>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <HiveButton size="sm" variant="outline">
                        Create Event
                      </HiveButton>
                      <HiveButton size="sm" variant="outline">
                        Invite Members
                      </HiveButton>
                      <HiveButton size="sm" variant="outline">
                        Pin Content
                      </HiveButton>
                      <HiveButton size="sm" variant="outline">
                        View Analytics
                      </HiveButton>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">🎓 Builder Resources</h3>
                    <div className="space-y-2 text-sm">
                      <div>📚 <a href="#" className="text-blue-600 hover:text-blue-700">Builder Handbook</a></div>
                      <div>🎥 <a href="#" className="text-blue-600 hover:text-blue-700">Video Tutorials</a></div>
                      <div>💬 <a href="#" className="text-blue-600 hover:text-blue-700">Builder Community Chat</a></div>
                      <div>📞 <a href="#" className="text-blue-600 hover:text-blue-700">Weekly Builder Office Hours</a></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <HiveButton
                      onClick={() => setCurrentStep(0)}
                      variant="outline"
                      className="flex-1"
                    >
                      Start Over
                    </HiveButton>
                    <HiveButton
                      onClick={() => setCurrentStep(0)}
                      className="flex-1"
                    >
                      Start Building
                    </HiveButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
};