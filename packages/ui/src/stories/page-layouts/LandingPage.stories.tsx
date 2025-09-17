import type { Meta, StoryObj } from '@storybook/react'
import { HiveLandingPage } from '../../components/landing/hive-landing-page'
import { CountdownTimer } from '../../components/landing/countdown-timer'

const meta: Meta<typeof HiveLandingPage> = {
  component: HiveLandingPage,
  title: '📄 Page Layouts/Landing Page',
  parameters: {
    docs: {
      description: {
        component: 'Complete HIVE landing page with countdown timer, waitlist signup, and brand showcasing.'
      }
    },
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof HiveLandingPage>

export const CompleteLandingPage: Story = {
  render: () => {
    const handleEmailSignup = async (email: string) => {

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // Set launch date to 30 days from now
    const launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    return (
      <HiveLandingPage
        launchDate={launchDate}
        onEmailSignup={handleEmailSignup}
      />
    )
  }
}

export const CountdownTimerShowcase: Story = {
  render: () => {
    const launchDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center space-y-12 max-w-4xl">
          {/* HIVE Logo */}
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center border-2 border-accent/50 hover:border-accent transition-all duration-180 ease-hive hover:scale-105">
                <span className="text-5xl">🐝</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white">HIVE</h1>
            <p className="text-xl text-muted">The Programmable Campus Layer</p>
          </div>

          {/* Timer Variants */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Large Accent Timer</h2>
              <CountdownTimer 
                targetDate={launchDate}
                size="lg"
                variant="secondary"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Medium Default Timer</h2>
              <CountdownTimer 
                targetDate={launchDate}
                size="md"
                variant="primary"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Small Minimal Timer</h2>
              <CountdownTimer 
                targetDate={launchDate}
                size="sm"
                variant="minimal"
              />
            </div>
          </div>

          {/* Completed State */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Completed State</h2>
            <CountdownTimer 
              targetDate={new Date(Date.now() - 1000)} // Past date
              size="lg"
              variant="secondary"
              onComplete={() => console.log('Timer completed!')}
            />
          </div>
        </div>
      </div>
    )
  }
}

export const HeroSection: Story = {
  render: () => (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          {/* Logo & Brand */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center border-2 border-accent/50 hover:border-accent transition-all duration-180 ease-hive hover:scale-105">
                <span className="text-5xl">🐝</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  HIVE
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-accent">
                The Programmable Campus Layer
              </h2>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              Where students find their people, make decisions together, and build tools that spread across campus.
            </p>
            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
              Not another chat app or course manager—this is where your dorm votes on late-night food, 
              your major shares actually useful resources, and someone creative makes tools that the whole campus adopts.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-accent">Launching Soon</h3>
            <CountdownTimer 
              targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              size="lg"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const WaitlistSection: Story = {
  render: () => {
    const handleEmailSignup = async (email: string) => {

      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* HIVE Branding */}
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30">
                <span className="text-2xl">🐝</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">Join the HIVE</h1>
            <p className="text-lg text-muted">
              Be the first to experience the programmable campus layer when it launches at your university.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-4">
            <h3 className="text-accent font-medium">Coming Soon</h3>
            <CountdownTimer 
              targetDate={new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)}
              size="md"
              variant="secondary"
            />
          </div>

          {/* Campus Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">10K+</div>
              <div className="text-sm text-muted">Students Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">100+</div>
              <div className="text-sm text-muted">Tools Built</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const FeatureShowcase: Story = {
  render: () => {
    const features = [
      {
        icon: '👥',
        title: "Find Your People",
        description: "Connect with students in your dorm, major, clubs, and interests"
      },
      {
        icon: '⚡',
        title: "Build Tools Together", 
        description: "Create custom tools that help your community coordinate and thrive"
      },
      {
        icon: '🏢',
        title: "Campus-Wide Moments",
        description: "Participate in rituals and events that bring your whole campus together"
      }
    ]

    return (
      <div className="min-h-screen bg-background py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🐝</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">Built for Campus Life</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              HIVE understands that campus communities are unique. We've designed every feature 
              around how students actually connect, coordinate, and create together.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface border border-border rounded-xl p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 space-y-6">
            <h3 className="text-2xl font-semibold text-white">Ready to transform your campus?</h3>
            <CountdownTimer 
              targetDate={new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)}
              size="md"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    )
  }
}