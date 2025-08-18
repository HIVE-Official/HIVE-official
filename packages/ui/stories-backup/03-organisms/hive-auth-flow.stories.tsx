import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveAuthFlow } from '../../components/auth/hive-auth-flow';
import { Mail, Lock, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * # HiveAuthFlow - Campus Authentication System
 * 
 * The HiveAuthFlow organism is the foundational authentication experience in the HIVE Design System.
 * It provides secure, accessible campus login and registration flows with premium aesthetics and
 * seamless integration with university identity systems.
 * 
 * ## Social Media Features
 * - Social login integration (Google, Microsoft)
 * - Profile picture and campus identity setup
 * - Campus community introduction
 * - Friend and connection discovery
 * 
 * ## Utility Features  
 * - University email verification
 * - Multi-factor authentication support
 * - Academic system integration
 * - Security and privacy controls
 * 
 * ## Campus Integration
 * Designed for organism-level authentication that bridges social platform access
 * with academic utility integration, ensuring secure campus community participation.
 */

const meta: Meta<typeof HiveAuthFlow> = {
  title: '03-Organisms/HiveAuthFlow',
  component: HiveAuthFlow,
  parameters: {
    docs: {
      description: {
        component: `
# HiveAuthFlow - Campus Authentication System

This organism component exemplifies HIVE's social media + utility platform approach for secure campus access:

## Social Media Integration
- Social login providers (Google, Microsoft)
- Campus identity verification
- Profile setup and customization
- Community welcome flows

## Campus Utility Features
- University email verification
- Academic system integration
- Multi-factor authentication
- Privacy and security controls

## Student Engagement Patterns
- Streamlined university-based signup
- Social validation and verification
- Academic credential integration
- Campus community onboarding

The HiveAuthFlow ensures secure access while introducing students to both social and utility features.
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    initialStep: {
      control: { type: 'select' },
      options: ['login', 'register', 'verify', 'forgot-password', 'reset-password'],
      description: 'Initial authentication step'
    },
    allowSocialLogin: {
      control: 'boolean',
      description: 'Enable social login options'
    },
    requireEmailVerification: {
      control: 'boolean',
      description: 'Require email verification'
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Login form
export const Default: Story = {
  args: {
    initialStep: 'login',
    allowSocialLogin: true,
    onAuthSuccess: (user) => console.log('Authentication success:', user),
    onAuthError: (error) => console.log('Authentication error:', error)
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    initialStep: 'login',
    allowSocialLogin: true,
    requireEmailVerification: true,
    showForgotPassword: true,
    onAuthSuccess: (user) => console.log('Authentication success:', user),
    onAuthError: (error) => console.log('Authentication error:', error),
    onStepChange: (step) => console.log('Step changed to:', step)
  }
};

// 3. ALL STEPS STORY - Complete authentication flow
export const AllSteps: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Complete Authentication Flow
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          All steps in the campus authentication experience
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)] flex items-center gap-2">
              <User className="h-5 w-5" />
              Login Step
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">University Email</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)] flex items-center px-3 text-sm text-[var(--hive-text-secondary)]">
                  student@university.edu
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)] flex items-center px-3 text-sm text-[var(--hive-text-secondary)]">
                  ••••••••
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-4 h-4 border border-[var(--hive-border-primary)] rounded"></div>
                <span className="text-sm">Remember me</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)] flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Registration Step
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University Email</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">School</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)] flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Email Verification
            </h3>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Check Your Email</h4>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  We've sent a verification link to your university email address
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-[var(--hive-text-secondary)]">
                  Didn't receive the email? Check your spam folder or resend
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)] flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Reset
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">University Email</label>
                <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
              </div>
              <div className="text-center pt-2">
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Enter your university email to receive reset instructions
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)] flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success State
            </h3>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Welcome to HIVE!</h4>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Successfully logged in to your campus community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 4. SPECIFIC FLOWS STORY - Individual authentication scenarios
export const Registration: Story = {
  args: {
    initialStep: 'register',
    allowSocialLogin: true,
    requireEmailVerification: true
  }
};

export const EmailVerification: Story = {
  args: {
    initialStep: 'verify',
    userEmail: 'sarah.chen@stanford.edu'
  }
};

export const ForgotPassword: Story = {
  args: {
    initialStep: 'forgot-password',
    allowSocialLogin: false
  }
};

// 5. SOCIAL LOGIN STORY - Third-party authentication
export const SocialLogin: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Continue with Campus Account</h3>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Sign in using your university credentials
          </p>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 p-3 bg-white text-gray-900 rounded-lg border hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 bg-blue-500 rounded"></div>
            <span className="font-medium">Continue with University Google</span>
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 p-3 bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] rounded-lg border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-tertiary)] transition-colors">
            <div className="w-5 h-5 bg-blue-600 rounded"></div>
            <span className="font-medium">Continue with Microsoft 365</span>
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--hive-border-primary)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]">
                or continue with email
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">University Email</label>
              <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. ERROR STATES STORY - Authentication errors
export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Authentication Error States
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different error scenarios and user feedback
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Invalid Credentials
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">
                Invalid email or password. Please check your credentials and try again.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">University Email</label>
              <div className="h-10 bg-[var(--hive-background-primary)] rounded border-2 border-red-500/50 flex items-center px-3 text-sm">
                wrong@email.com
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="h-10 bg-[var(--hive-background-primary)] rounded border-2 border-red-500/50 flex items-center px-3 text-sm text-[var(--hive-text-secondary)]">
                ••••••••
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Email Not Verified
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-400">
                Please verify your university email address before continuing.
              </p>
            </div>
            <div className="text-center">
              <button className="text-sm text-[var(--hive-brand-primary)] hover:underline">
                Resend verification email
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Account Locked
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">
                Your account has been temporarily locked due to multiple failed login attempts.
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--hive-text-secondary)]">
                Try again in 15 minutes or reset your password
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-blue-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Required
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-400">
                Please enter the verification code from your authenticator app.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Verification Code</label>
              <div className="h-10 bg-[var(--hive-background-primary)] rounded border border-[var(--hive-border-primary)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. CAMPUS SCENARIOS STORY - Different university integrations
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Integration Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different university authentication setups
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Stanford University</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
                <div>
                  <p className="font-medium">Stanford SSO</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Single sign-on integration</p>
                </div>
              </div>
              <p className="text-sm">
                Students can use their Stanford credentials (@stanford.edu) with university Google Workspace integration.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">MIT</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">MIT</div>
                <div>
                  <p className="font-medium">MIT Kerberos</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Academic authentication</p>
                </div>
              </div>
              <p className="text-sm">
                Integration with MIT's Kerberos system for secure academic authentication with @mit.edu addresses.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">UC Berkeley</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">UCB</div>
                <div>
                  <p className="font-medium">CalNet ID</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">UC system integration</p>
                </div>
              </div>
              <p className="text-sm">
                UC Berkeley students authenticate through CalNet ID system with @berkeley.edu email verification.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Generic University</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">U</div>
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Standard .edu verification</p>
                </div>
              </div>
              <p className="text-sm">
                Universities without SSO integration use email domain verification with standard authentication flows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};