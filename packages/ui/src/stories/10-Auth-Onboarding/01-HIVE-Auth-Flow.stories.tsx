import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { motion } from 'framer-motion';

// Real HIVE Auth Flow Components
const HiveWelcomeFlow = () => (
  <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
      className="w-full max-w-md"
    >
      <div 
        className="bg-[var(--hive-background-secondary)] rounded-xl p-8 text-center space-y-6 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
        style={{
          border: '1px solid rgba(var(--hive-gold-rgb), 0.15)',
        }}
      >
        {/* HIVE Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
            HIVE
          </h1>
          <p className="text-gray-300 text-lg">
            The programmable campus layer
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            Find your people, make decisions together, and build tools that spread across campus.
          </p>
        </div>

        {/* CTA Button - Your Transparent Design */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
          >
            Get Started
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500">
          Available at select universities
        </div>
      </div>
    </motion.div>
  </div>
);

// School Selection Flow
const SchoolSelectionFlow = () => (
  <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-gray-700)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-[var(--hive-gold)]">
          Select Your School
        </CardTitle>
        <p className="text-gray-300">
          Choose your university to continue
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {['Stanford University', 'UC Berkeley', 'MIT', 'Harvard University'].map((school) => (
            <Button
              key={school}
              variant="secondary"
              className="w-full justify-start text-left"
            >
              {school}
            </Button>
          ))}
        </div>
        <div className="pt-4">
          <Button
            variant="primary"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Email Gate Flow  
const EmailGateFlow = () => (
  <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-gray-700)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-[var(--hive-gold)]">
          Stanford University
        </CardTitle>
        <p className="text-gray-300">
          Enter your .edu email to continue
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="your.email@stanford.edu"
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[var(--hive-gray-700)] rounded-lg text-[var(--hive-text-primary)] placeholder-gray-500 focus:border-[var(--hive-gold)] focus:outline-none"
            />
          </div>
          <Button
            variant="primary"
            className="w-full"
          >
            Send Magic Link
          </Button>
        </div>
        
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
          >
            ← Back to schools
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardContent>
    </Card>
  </div>
);

const meta: Meta<typeof HiveWelcomeFlow> = {
  title: '10-Auth-Onboarding/HIVE Auth Flow - Real Implementation',
  component: HiveWelcomeFlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🔐 HIVE Authentication Flow - Real Implementation

The actual authentication flow used in HIVE, showcasing your transparent button design and dark-gold visual hierarchy.

## Complete Auth Journey:
1. **Welcome Screen** - Brand introduction with transparent CTA
2. **School Selection** - University picker with secondary buttons  
3. **Email Gate** - Magic link authentication with .edu validation

## Your Design Principles:
- **Transparent buttons** with gold outlines for primary actions
- **Dark surfaces** (var(--hive-background-primary) background, var(--hive-background-secondary) cards)
- **Gold accents** (var(--hive-gold)) for brand and highlights
- **Subtle borders** with rgba(var(--hive-gold-rgb), 0.15) opacity
- **Smooth animations** with cubic-bezier easing

## Real Routes:
- \`/auth\` - Welcome screen or email gate
- \`/auth/school-select\` - University selection
- \`/auth/check-email\` - Magic link verification
        `
      }
    }
  },
  argTypes: {
    flow: {
      control: 'select',
      options: ['welcome', 'school-selection', 'email-gate'],
      description: 'Authentication flow step'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WelcomeScreen: Story = {
  render: () => <HiveWelcomeFlow />,
  parameters: {
    docs: {
      description: {
        story: 'The welcome screen with your transparent button design and HIVE brand presentation.'
      }
    }
  }
};

export const SchoolSelection: Story = {
  render: () => <SchoolSelectionFlow />,
  parameters: {
    docs: {
      description: {
        story: 'University selection screen with secondary button styling for school options.'
      }
    }
  }
};

export const EmailGate: Story = {
  render: () => <EmailGateFlow />,
  parameters: {
    docs: {
      description: {
        story: 'Magic link authentication with .edu email validation and primary button for submission.'
      }
    }
  }
};

export const CompleteFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const flows = [
      <HiveWelcomeFlow key="welcome" />,
      <SchoolSelectionFlow key="school" />,
      <EmailGateFlow key="email" />
    ];
    
    return (
      <div className="relative">
        {flows[currentStep]}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {flows.map((_, index) => (
            <Button
              key={index}
              variant={index === currentStep ? "primary" : "secondary"}
              size="sm"
              onClick={() => setCurrentStep(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete authentication flow with step navigation. Click the numbered buttons to navigate between steps.'
      }
    }
  }
};

