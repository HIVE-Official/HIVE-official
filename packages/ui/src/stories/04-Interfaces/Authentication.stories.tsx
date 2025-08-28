import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/card'
import { Alert } from '../../components/alert'
import { EmailVerification } from '../../components/auth/email-verification'
import { SchoolSearch } from '../../components/auth/school-search'

const meta: Meta = {
  title: '🎭 Interfaces/Authentication',
  parameters: {
    docs: {
      description: {
        component: 'Complete authentication interface flows for HIVE campus platform.'
      }
    },
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj

export const EmailEntry: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 2000)
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              🐝 HIVE
            </h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Welcome to campus</h2>
              <p className="text-muted">
                Your programmable campus layer where students find their people and build tools that spread.
              </p>
            </div>
          </div>

          {/* Auth Form */}
          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>Sign in to HIVE</CardTitle>
              <CardDescription>
                Enter your university email to get started
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">University Email</label>
                <Input
                  type="email"
                  placeholder="yourname@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="primary"
                />
              </div>
              
              <Button 
                variant="primary" 
                className="w-full"
                disabled={!email || isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? 'Sending magic link...' : 'Continue with Email'}
              </Button>
            </CardContent>

            <CardFooter className="flex-col space-y-4">
              <div className="text-xs text-muted text-center">
                By continuing, you agree to HIVE's Terms of Service and Privacy Policy
              </div>
            </CardFooter>
          </Card>

          {/* Campus Info */}
          <Card variant="minimal" padding="md">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-white">New to HIVE?</p>
              <p className="text-xs text-muted">
                Join thousands of students already building connections and tools on their campus
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export const EmailSent: Story = {
  render: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">🐝 HIVE</h1>
        </div>

        <Card variant="elevated" padding="lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We've sent a magic link to maya.student@university.edu
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert variant="info">
              <div className="space-y-2">
                <p className="font-medium">Magic link sent!</p>
                <p className="text-sm">
                  Click the link in your email to sign in. It will expire in 10 minutes.
                </p>
              </div>
            </Alert>

            <div className="space-y-3">
              <Button variant="ghost" className="w-full">
                Open email app
              </Button>
              <Button variant="secondary" className="w-full">
                Resend magic link
              </Button>
            </div>
          </CardContent>

          <CardFooter>
            <Button variant="ghost" className="w-full text-sm">
              ← Try a different email
            </Button>
          </CardFooter>
        </Card>

        <Card variant="minimal" padding="sm">
          <div className="text-center text-xs text-muted">
            Having trouble? Check your spam folder or try again with a different email.
          </div>
        </Card>
      </div>
    </div>
  )
}

export const SchoolSelection: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

    const schools = [
      { id: '1', name: 'Stanford University', location: 'Stanford, CA', students: '17,249' },
      { id: '2', name: 'MIT', location: 'Cambridge, MA', students: '11,858' },
      { id: '3', name: 'UC Berkeley', location: 'Berkeley, CA', students: '45,057' },
      { id: '4', name: 'University of Washington', location: 'Seattle, WA', students: '47,400' }
    ]

    const filteredSchools = schools.filter(school =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">🐝 HIVE</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Select your school</h2>
              <p className="text-muted">
                Help us set up your campus experience
              </p>
            </div>
          </div>

          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>Find your university</CardTitle>
              <CardDescription>
                Search for your school to get started with HIVE
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Input
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="search"
              />

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredSchools.map((school) => (
                  <Card
                    key={school.id}
                    variant={selectedSchool === school.id ? "accent" : "interactive"}
                    padding="sm"
                    className="cursor-pointer"
                    onClick={() => setSelectedSchool(school.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{school.name}</h3>
                        <p className="text-sm text-muted">{school.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted">{school.students} students</p>
                        {selectedSchool === school.id && (
                          <span className="text-accent text-sm">✓</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button 
                variant="primary" 
                className="w-full"
                disabled={!selectedSchool}
              >
                Continue to HIVE
              </Button>
            </CardContent>

            <CardFooter>
              <div className="text-xs text-muted text-center w-full">
                Don't see your school? <button className="text-accent hover:text-accent/80">Request to add it</button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }
}

export const AuthExpired: Story = {
  render: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">🐝 HIVE</h1>
        </div>

        <Card variant="elevated" padding="lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <CardTitle>Link expired</CardTitle>
            <CardDescription>
              Your magic link has expired or has already been used
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Alert variant="warning">
              <div className="space-y-2">
                <p className="font-medium">Session expired</p>
                <p className="text-sm">
                  Magic links expire after 10 minutes for security. Request a new one to continue.
                </p>
              </div>
            </Alert>
          </CardContent>

          <CardFooter>
            <Button variant="primary" className="w-full">
              Get new magic link
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export const EmailVerificationFlow: Story = {
  render: () => {
    const handleResend = async () => {
      console.log('Resending email...')
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    const handleBack = () => {
      console.log('Going back to email entry...')
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">🐝 HIVE</h1>
          </div>

          <EmailVerification
            email="maya.student@stanford.edu"
            schoolName="Stanford University"
            onResend={handleResend}
            onBack={handleBack}
            expirationMinutes={10}
          />
        </div>
      </div>
    )
  }
}

export const SchoolSearchFlow: Story = {
  render: () => {
    const handleSchoolSelect = (school: { id: string; name: string }) => {
      console.log('Selected school:', school)
    }

    const handleRequestSchool = (schoolName: string) => {
      console.log('Requesting school:', schoolName)
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">🐝 HIVE</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Find your campus</h2>
              <p className="text-muted">
                Search for your university to join the HIVE community
              </p>
            </div>
          </div>

          <SchoolSearch
            onSchoolSelect={handleSchoolSelect}
            onRequestSchool={handleRequestSchool}
          />
        </div>
      </div>
    )
  }
}

export const CompleteAuthFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState<'school' | 'email' | 'verification'>('school')
    const [selectedSchool, setSelectedSchool] = useState<{ id: string; name: string } | null>(null)
    const [emailAddress, setEmailAddress] = useState('')

    const handleSchoolSelect = (school: { id: string; name: string }) => {
      setSelectedSchool(school)
      setCurrentStep('email')
    }

    const handleEmailSubmit = (email: string) => {
      setEmailAddress(email)
      setCurrentStep('verification')
    }

    const handleBackToSchool = () => {
      setCurrentStep('school')
    }

    const handleBackToEmail = () => {
      setCurrentStep('email')
    }

    const handleResend = async () => {
      console.log('Resending email to:', emailAddress)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    const renderStep = () => {
      switch (currentStep) {
        case 'school':
          return (
            <SchoolSearch
              onSchoolSelect={handleSchoolSelect}
              onRequestSchool={(name) => console.log('Requesting:', name)}
            />
          )

        case 'email':
          return (
            <Card variant="elevated" padding="lg" className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Join {selectedSchool?.name}</CardTitle>
                <CardDescription>
                  Enter your {selectedSchool?.domain} email to continue
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">University Email</label>
                  <Input
                    type="email"
                    placeholder={`you@${selectedSchool?.domain}`}
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    variant="primary"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleBackToSchool}>
                    Back
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    disabled={!emailAddress}
                    onClick={() => handleEmailSubmit(emailAddress)}
                  >
                    Send Magic Link
                  </Button>
                </div>
              </CardContent>

              <CardFooter>
                <div className="text-xs text-muted text-center w-full">
                  By continuing, you agree to HIVE's Terms of Service and Privacy Policy
                </div>
              </CardFooter>
            </Card>
          )

        case 'verification':
          return (
            <EmailVerification
              email={emailAddress}
              schoolName={selectedSchool?.name}
              onResend={handleResend}
              onBack={handleBackToEmail}
              expirationMinutes={10}
            />
          )

        default:
          return null
      }
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">🐝 HIVE</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                {currentStep === 'school' && 'Find your campus'}
                {currentStep === 'email' && 'Sign in to HIVE'}
                {currentStep === 'verification' && 'Check your email'}
              </h2>
              <p className="text-muted">
                {currentStep === 'school' && 'Search for your university to join the HIVE community'}
                {currentStep === 'email' && 'Enter your university email to get started'}
                {currentStep === 'verification' && 'Click the magic link we sent to continue'}
              </p>
            </div>
          </div>

          {renderStep()}

          {/* Progress indicator */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentStep === 'school' ? 'bg-accent' : 'bg-accent/30'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'email' ? 'bg-accent' : 'bg-accent/30'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'verification' ? 'bg-accent' : 'bg-accent/30'}`} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}