import type { Meta, StoryObj } from "@storybook/react";

// Mock the landing page component for Storybook
const LandingPageComponent = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center lg:pt-32">
            {/* Brand */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  HIVE
                </span>
              </h1>
              <p className="mt-4 text-xl lg:text-2xl text-zinc-400 font-light">
                Where your campus comes alive
              </p>
            </div>

            {/* Hero Copy */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Connect. Create.{" "}
                <span className="text-yellow-500">Belong.</span>
              </h2>
              <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8">
                The social platform built exclusively for college students.
                Discover spaces, join conversations, and build meaningful
                connections with your campus community.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="bg-surface-01 hover:bg-surface-01-hover border border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600 font-semibold px-8 py-4 text-lg rounded-md transition-all duration-90">
                Get Inside →
              </button>
              <p className="text-sm text-zinc-500">
                Exclusive to verified .edu students
              </p>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  50+
                </div>
                <div className="text-zinc-400">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  10K+
                </div>
                <div className="text-zinc-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  100+
                </div>
                <div className="text-zinc-400">Active Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              More than just another social app
            </h3>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              HIVE is designed specifically for the college experience, with
              features that help you thrive academically and socially.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Campus Feed */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">💬</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Campus Feed</h4>
              <p className="text-zinc-400">
                Stay connected with what's happening on your campus. Smart
                algorithms surface the most relevant content for you.
              </p>
            </div>

            {/* Spaces */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">👥</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Student Spaces</h4>
              <p className="text-zinc-400">
                Find your tribe in student organizations, Greek life, academic
                groups, and interest-based communities.
              </p>
            </div>

            {/* Privacy First */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">🔒</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Privacy First</h4>
              <p className="text-zinc-400">
                Your data stays yours. Campus-only visibility ensures your
                content is shared only with fellow students.
              </p>
            </div>

            {/* Academic Tools */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">📚</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Study Tools</h4>
              <p className="text-zinc-400">
                Collaborative study groups, resource sharing, and academic
                support integrated into your social experience.
              </p>
            </div>

            {/* Events & Activities */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">✨</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Campus Events</h4>
              <p className="text-zinc-400">
                Never miss out on campus activities, from study sessions to
                social events and everything in between.
              </p>
            </div>

            {/* Wellbeing */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-500">❤️</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Wellbeing Focus</h4>
              <p className="text-zinc-400">
                Mental health resources, stress management tools, and a
                supportive community that cares about your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by students everywhere
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
              <p className="text-zinc-300 mb-4 italic">
                "HIVE helped me find my study group for organic chemistry. We
                went from strangers to best friends, and I actually passed the
                class!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-500 font-semibold">S</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah M.</div>
                  <div className="text-sm text-zinc-500">
                    UCLA, Biochemistry
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
              <p className="text-zinc-300 mb-4 italic">
                "Finally, a social app that actually understands college life.
                No algorithms pushing random content - just my campus
                community."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-500 font-semibold">M</span>
                </div>
                <div>
                  <div className="font-semibold">Marcus T.</div>
                  <div className="text-sm text-zinc-500">
                    Stanford, Computer Science
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
              <p className="text-zinc-300 mb-4 italic">
                "I was so overwhelmed freshman year until I found my people on
                HIVE. Now I can't imagine college without this community."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-500 font-semibold">A</span>
                </div>
                <div>
                  <div className="font-semibold">Aisha K.</div>
                  <div className="text-sm text-zinc-500">NYU, Psychology</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to find your campus community?
          </h3>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of students already connecting on HIVE.
          </p>
          <button className="bg-surface-01 hover:bg-surface-01-hover border border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600 font-semibold px-12 py-4 text-lg rounded-md transition-all duration-90">
            Get Started →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-yellow-500">HIVE</span>
              <p className="text-sm text-zinc-500 mt-1">
                © 2024 HIVE. Built for students, by students.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/legal/privacy"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="/legal/terms"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="/legal/community-guidelines"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Community Guidelines
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const meta: Meta<typeof LandingPageComponent> = {
  title: "Pages/Landing Page",
  component: LandingPageComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main landing page for HIVE - introduces the platform, showcases features, and drives campus selection.",
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
type Story = StoryObj<typeof LandingPageComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default landing page with hero section, features preview, testimonials, and call-to-action.",
      },
    },
  },
};

export const HeroSection: Story = {
  render: () => (
    <section className="relative overflow-hidden bg-black text-white min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          {/* Brand */}
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                HIVE
              </span>
            </h1>
            <p className="mt-4 text-xl lg:text-2xl text-zinc-400 font-light">
              Where your campus comes alive
            </p>
          </div>

          {/* Hero Copy */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Connect. Create. <span className="text-yellow-500">Belong.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8">
              The social platform built exclusively for college students.
              Discover spaces, join conversations, and build meaningful
              connections with your campus community.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-surface-01 hover:bg-surface-01-hover border border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600 font-semibold px-8 py-4 text-lg rounded-md transition-all duration-90">
              Get Inside →
            </button>
            <p className="text-sm text-zinc-500">
              Exclusive to verified .edu students
            </p>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
              <div className="text-zinc-400">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                10K+
              </div>
              <div className="text-zinc-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                100+
              </div>
              <div className="text-zinc-400">Active Spaces</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hero section only - showcases the main value proposition and call-to-action.",
      },
    },
  },
};

export const FeaturesSection: Story = {
  render: () => (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            More than just another social app
          </h3>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            HIVE is designed specifically for the college experience, with
            features that help you thrive academically and socially.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Campus Feed */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">💬</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Campus Feed</h4>
            <p className="text-zinc-400">
              Stay connected with what's happening on your campus. Smart
              algorithms surface the most relevant content for you.
            </p>
          </div>

          {/* Spaces */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">👥</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Student Spaces</h4>
            <p className="text-zinc-400">
              Find your tribe in student organizations, Greek life, academic
              groups, and interest-based communities.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">🔒</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Privacy First</h4>
            <p className="text-zinc-400">
              Your data stays yours. Campus-only visibility ensures your content
              is shared only with fellow students.
            </p>
          </div>

          {/* Academic Tools */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">📚</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Study Tools</h4>
            <p className="text-zinc-400">
              Collaborative study groups, resource sharing, and academic support
              integrated into your social experience.
            </p>
          </div>

          {/* Events & Activities */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">✨</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Campus Events</h4>
            <p className="text-zinc-400">
              Never miss out on campus activities, from study sessions to social
              events and everything in between.
            </p>
          </div>

          {/* Wellbeing */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-500">❤️</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Wellbeing Focus</h4>
            <p className="text-zinc-400">
              Mental health resources, stress management tools, and a supportive
              community that cares about your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Features section showcasing the six core value propositions of HIVE.",
      },
    },
  },
};
