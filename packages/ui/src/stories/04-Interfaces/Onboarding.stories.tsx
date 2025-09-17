import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { OnboardingLayout } from '../../components/onboarding/onboarding-layout'
import { RoleStep } from '../../components/onboarding/role-step'
import { InterestsStepNew } from '../../components/onboarding/interests-step-new'
import { SpacesDiscoveryStep } from '../../components/onboarding/spaces-discovery-step'
import { Button } from '../../atomic/atoms/button-enhanced'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/card'

// Create a component wrapper for the story
const OnboardingInterface = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Onboarding Interface</h2>
    <p className="text-muted-foreground">Complete onboarding flow for new HIVE users</p>
  </div>
);

const meta: Meta<typeof OnboardingInterface> = {
  component: OnboardingInterface,
  title: '🎭 Interfaces/Onboarding',
  parameters: {
    docs: {
      description: {
        component: 'Complete onboarding flow for new HIVE campus users.'
      }
    },
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj

const ONBOARDING_STEPS = [
  'Welcome',
  'Role Selection', 
  'Academic Info',
  'Interests',
  'Discover Spaces',
  'Complete'
]

export const RoleSelection: Story = {
  render: () => {
    const [selectedRole, setSelectedRole] = useState('')

    const handleRoleSelect = (roleId: string) => {
      setSelectedRole(roleId)
    }

    const handleContinue = () => {
    }

    return (
      <div className="min-h-screen bg-background">
        <OnboardingLayout
          currentStep={2}
          totalSteps={6}
          stepLabels={ONBOARDING_STEPS}
          showProgress={true}
        >
          <RoleStep
            onRoleSelect={handleRoleSelect}
            onContinue={handleContinue}
            selectedRole={selectedRole}
          />
        </OnboardingLayout>
      </div>
    )
  }
}

export const InterestSelection: Story = {
  render: () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])

    const handleInterestsChange = (interests: string[]) => {
      setSelectedInterests(interests)
    }

    const handleContinue = () => {
    }

    return (
      <div className="min-h-screen bg-background">
        <OnboardingLayout
          currentStep={4}
          totalSteps={6}
          stepLabels={ONBOARDING_STEPS}
          showProgress={true}
        >
          <InterestsStepNew
            onInterestsChange={handleInterestsChange}
            onContinue={handleContinue}
            selectedInterests={selectedInterests}
          />
        </OnboardingLayout>
      </div>
    )
  }
}

export const SpaceDiscovery: Story = {
  render: () => {
    const [selectedSpaces, setSelectedSpaces] = useState<string[]>([])

    const handleSpacesChange = (spaces: string[]) => {
      setSelectedSpaces(spaces)
    }

    const handleContinue = () => {
    }

    return (
      <div className="min-h-screen bg-background">
        <OnboardingLayout
          currentStep={5}
          totalSteps={6}
          stepLabels={ONBOARDING_STEPS}
          showProgress={true}
        >
          <SpacesDiscoveryStep
            onSpacesChange={handleSpacesChange}
            onContinue={handleContinue}
            selectedSpaces={selectedSpaces}
            userInterests={['computer-science', 'photography', 'fitness']}
            userRole="undergraduate"
          />
        </OnboardingLayout>
      </div>
    )
  }
}

export const CompleteFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
      role: '',
      interests: [] as string[],
      spaces: [] as string[]
    })

    const handleNext = () => {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1)
      }
    }

    const handlePrev = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
      }
    }

    const handleRoleSelect = (role: string) => {
      setFormData(prev => ({ ...prev, role }))
    }

    const handleInterestsChange = (interests: string[]) => {
      setFormData(prev => ({ ...prev, interests }))
    }

    const handleSpacesChange = (spaces: string[]) => {
      setFormData(prev => ({ ...prev, spaces }))
    }

    const renderStepContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Welcome to HIVE 🐝</h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  The programmable campus layer where students find their people, make decisions together, and build tools that spread.
                </p>
              </div>
              
              <Card variant="elevated" padding="lg" className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Let's get you started</CardTitle>
                  <CardDescription>
                    We'll help you set up your campus experience in just a few steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          )

        case 2:
          return (
            <RoleStep
              onRoleSelect={handleRoleSelect}
              onContinue={handleNext}
              selectedRole={formData.role}
            />
          )

        case 3:
          return (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">Academic Information</h1>
                <p className="text-lg text-muted">
                  Tell us about your academic focus to help us customize your experience
                </p>
              </div>
              
              <Card variant="elevated" padding="lg" className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Academic Details</CardTitle>
                  <CardDescription>
                    This helps us recommend relevant spaces and content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-left space-y-2">
                    <label className="text-sm font-medium text-white">Major/Field of Study</label>
                    <select className="w-full p-3 bg-surface border border-border rounded-lg text-white">
                      <option value="">Select your major...</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="engineering">Engineering</option>
                      <option value="business">Business</option>
                      <option value="pre-med">Pre-Med</option>
                      <option value="liberal-arts">Liberal Arts</option>
                    </select>
                  </div>
                  <div className="text-left space-y-2">
                    <label className="text-sm font-medium text-white">Year</label>
                    <select className="w-full p-3 bg-surface border border-border rounded-lg text-white">
                      <option value="">Select your year...</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                  <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          )

        case 4:
          return (
            <InterestsStepNew
              onInterestsChange={handleInterestsChange}
              onContinue={handleNext}
              selectedInterests={formData.interests}
            />
          )

        case 5:
          return (
            <SpacesDiscoveryStep
              onSpacesChange={handleSpacesChange}
              onContinue={handleNext}
              selectedSpaces={formData.spaces}
              userInterests={formData.interests}
              userRole={formData.role}
            />
          )

        case 6:
          return (
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🎉</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">Welcome to HIVE!</h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  You're all set up and ready to start connecting with your campus community.
                </p>
              </div>

              <Card variant="secondary" padding="lg" className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Your Setup Complete</CardTitle>
                  <CardDescription>
                    Here's what you've set up:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div>
                    <div className="text-sm font-medium text-white">Role</div>
                    <div className="text-sm text-muted capitalize">{formData.role || 'Not selected'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Interests</div>
                    <div className="text-sm text-muted">{formData.interests.length} selected</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Spaces</div>
                    <div className="text-sm text-muted">{formData.spaces.length} joined</div>
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Enter HIVE
                  </Button>
                </CardContent>
              </Card>
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div className="min-h-screen bg-background">
        <OnboardingLayout
          currentStep={currentStep}
          totalSteps={6}
          stepLabels={ONBOARDING_STEPS}
          onNext={currentStep < 6 ? handleNext : undefined}
          onPrev={currentStep > 1 ? handlePrev : undefined}
          nextDisabled={
            (currentStep === 2 && !formData.role) ||
            (currentStep === 4 && formData.interests.length < 3) ||
            (currentStep === 5 && formData.spaces.length < 2)
          }
          showProgress={true}
          hideNavigation={currentStep === 1 || currentStep === 6}
        >
          {renderStepContent()}
        </OnboardingLayout>
      </div>
    )
  }
}

export const OnboardingComplete: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <OnboardingLayout
        currentStep={6}
        totalSteps={6}
        stepLabels={ONBOARDING_STEPS}
        showProgress={true}
        hideNavigation={true}
      >
        <div className="text-center space-y-8">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🐝</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">You're officially part of HIVE!</h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Your campus community is waiting. Start exploring spaces, connecting with students, and building tools that spread.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card variant="elevated" padding="md">
              <CardHeader>
                <CardTitle className="text-lg">Discover Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">
                  Explore dorms, clubs, and academic communities on your campus.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="md">
              <CardHeader>
                <CardTitle className="text-lg">Build Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">
                  Create custom tools that help your community coordinate and connect.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="md">
              <CardHeader>
                <CardTitle className="text-lg">Join Rituals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">
                  Participate in campus-wide moments and build lasting connections.
                </p>
              </CardContent>
            </Card>
          </div>

          <Button variant="primary" size="lg" className="px-8">
            Enter Your Campus
          </Button>
        </div>
      </OnboardingLayout>
    </div>
  )
}