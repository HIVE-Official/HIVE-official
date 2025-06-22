import type { Meta, StoryObj } from "@storybook/react";

// Mock the welcome page component for Storybook
const WelcomePageComponent = ({
  userName = null,
  animationStep = 3,
  loading = false,
}: {
  userName?: string | null;
  animationStep?: number;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Welcome Header */}
          <div
            className={`space-y-4 transition-all duration-1000 ${
              animationStep >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 text-yellow-400 text-sm font-medium">
              <span>✨</span>
              <span>Successfully Authenticated</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                HIVE
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed max-w-xl mx-auto">
              {userName ? `Hey ${userName}! ` : ""}
              You're now part of the exclusive college social platform. Let's
              get you set up.
            </p>
          </div>

          {/* Next Steps */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              animationStep >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Choose your path
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Complete Profile */}
              <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <span className="text-yellow-500 text-xl">⭐</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      Complete Your Profile
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      Add your photo, interests, and academic info to help
                      others find and connect with you.
                    </p>
                    <div className="inline-flex items-center text-yellow-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Get Started
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explore Spaces */}
              <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <span className="text-purple-500 text-xl">👥</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      Explore Campus Spaces
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      Browse student organizations, study groups, and
                      communities on your campus.
                    </p>
                    <div className="inline-flex items-center text-purple-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Explore Now
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              animationStep >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                What you can do on HIVE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">📚</span>
                  </div>
                  <span>Join study groups</span>
                </div>

                <div className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📅</span>
                  </div>
                  <span>Discover events</span>
                </div>

                <div className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400">⚡</span>
                  </div>
                  <span>Create content</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              animationStep >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button className="bg-surface-01 hover:bg-surface-01-hover border border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600 font-semibold px-8 py-4 text-lg rounded-lg inline-flex items-center transition-all duration-90">
              Complete Your Profile
              <span className="ml-2">→</span>
            </button>

            <p className="text-zinc-500 text-sm mt-3">
              Takes about 2 minutes • Unlock the full HIVE experience
            </p>
          </div>

          {/* Skip Option */}
          <div className="pt-4">
            <button className="text-zinc-400 hover:text-white text-sm transition-colors inline-flex items-center group">
              Skip for now and explore spaces
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                ›
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof WelcomePageComponent> = {
  title: "Pages/Welcome",
  component: WelcomePageComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Welcome page that greets authenticated users and guides them through next steps with beautiful animations and clear CTAs.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WelcomePageComponent>;

export const Default: Story = {
  args: {
    animationStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: "Default welcome page with full animations completed.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state while checking authentication status.",
      },
    },
  },
};

export const WithUserName: Story = {
  args: {
    userName: "Sarah",
    animationStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: "Welcome page personalized with user's name.",
      },
    },
  },
};

export const AnimationStep1: Story = {
  args: {
    animationStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: "Welcome page showing only the header animation (step 1).",
      },
    },
  },
};

export const AnimationStep2: Story = {
  args: {
    animationStep: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Welcome page showing header + next steps (step 2).",
      },
    },
  },
};

export const NoAnimation: Story = {
  args: {
    animationStep: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Welcome page with no animations (all content hidden initially).",
      },
    },
  },
};

export const PersonalizedComplete: Story = {
  args: {
    userName: "Marcus",
    animationStep: 3,
  },
  render: (args) => <WelcomePageComponent {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete welcome experience with personalization for returning users.",
      },
    },
  },
};
