import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveButton, HiveCard } from '../../components';

// Temporary placeholder component for debugging
const PlaceholderMotion = ({ children }: { children: React.ReactNode }) => <div className="motion-wrapper">{children}</div>;

const meta: Meta<typeof PlaceholderMotion> = {
  title: '04-Hive/Hive Motion Wrapper',
  component: PlaceholderMotion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Advanced motion wrapper with liquid metal effects (Debugging Mode)**

Specialized motion wrapper component that applies HIVE's signature liquid metal physics and magnetic interactions to any content. Core component for creating premium campus infrastructure feel.

## When to Use
- Wrapping tool components for magnetic assembly
- Adding liquid metal interactions to Space elements
- Creating ripple effects on touch interactions
- Orchestrated animations for Builder workflows

## Design Principles
- **Liquid Metal Physics**: Smooth, substantial motion that feels premium
- **Magnetic Interactions**: Elements attract and snap with realistic physics
- **Ripple Effects**: Touch feedback that spreads like liquid metal
- **Orchestrated Timing**: Coordinated animations across multiple elements

## Accessibility
- WCAG 2.1 AA compliant motion with reduced motion support
- Meaningful motion that enhances rather than distracts
- Clear visual feedback for interactive states
- Keyboard interaction support
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMotion: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="font-semibold">Motion Components (Debugging)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <PlaceholderMotion>
          <HiveButton className="w-full h-16">
            Button Motion
          </HiveButton>
        </PlaceholderMotion>
        
        <PlaceholderMotion>
          <HiveCard className="p-4 cursor-pointer hover:border-hive-accent transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm">Card Motion</div>
            </div>
          </HiveCard>
        </PlaceholderMotion>
        
        <PlaceholderMotion>
          <div className="h-16 bg-hive-accent rounded-lg flex items-center justify-center cursor-pointer">
            <span className="text-[var(--hive-background-primary)] font-medium">Custom Element</span>
          </div>
        </PlaceholderMotion>
      </div>
      
      <div className="mt-8 p-4 bg-hive-background-muted rounded-lg">
        <p className="text-sm text-hive-foreground-muted">
          <strong>Note:</strong> This story is in debugging mode. The actual motion components are temporarily disabled 
          while we resolve import issues with the Framer Motion dependencies.
        </p>
      </div>
    </div>
  )
};

export const PlaceholderDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="font-semibold">Motion System Development</h3>
      <div className="p-6 border border-hive-border rounded-lg">
        <h4 className="font-medium mb-4">Available Motion Components</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-2">Core Components:</h5>
            <ul className="space-y-1 text-hive-foreground-muted">
              <li>• HiveRipple - Touch feedback</li>
              <li>• HiveMagneticHover - Hover interactions</li>
              <li>• HiveCascade - Sequential reveals</li>
              <li>• HiveFloat - Weightless animations</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Advanced Effects:</h5>
            <ul className="space-y-1 text-hive-foreground-muted">
              <li>• HiveShimmer - Loading states</li>
              <li>• HiveGlowPulse - Status indicators</li>
              <li>• HivePageTransition - View changes</li>
              <li>• HiveToolPlant - Tool dropping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};