import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { motion } from '../../design-system/tokens/motion';

// Mock component for Storybook CSF compliance
const MotionSystemFoundation = () => <div>Motion System Foundation</div>;

const meta: Meta<typeof MotionSystemFoundation> = {
  title: '00-Foundation/Motion System',
  component: MotionSystemFoundation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Motion System

The HIVE motion system creates campus-first animations that feel responsive, premium, and accessible. Our motion language reflects the dynamic energy of college life while maintaining professional polish.

## Motion Principles

### 1. Liquid Metal Motion
Inspired by premium materials, our motion feels fluid yet purposeful - like liquid mercury flowing through campus corridors.

### 2. Campus Energy
Quick, responsive interactions that match the fast-paced nature of student life while remaining calm and focused.

### 3. Accessibility First
All animations respect user preferences and provide meaningful feedback without being overwhelming.

## Token System

### Duration Tokens
- **Fast (150ms)**: Micro-interactions, hovers, quick feedback
- **Base (200ms)**: Standard transitions, button presses
- **Slow (300ms)**: Modal appearances, page transitions
- **Slower (500ms)**: Complex state changes, loading states

### Easing Functions
- **Ease Out**: Natural deceleration for most interactions
- **Ease In-Out**: Smooth start and end for modals and overlays
- **Ease Smooth**: HIVE's signature gentle motion

### Liquid Metal Easing
- **Subtle**: Gentle premium feel for cards and surfaces
- **Smooth**: Fluid motion for modals and major transitions
- **Bouncy**: Playful feedback for positive interactions

## Usage Guidelines

Always use semantic tokens, never hardcode timing values. The motion system automatically adapts for mobile devices and accessibility preferences.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Interactive Motion Demo Component
const MotionDemo = ({ 
  duration, 
  easing, 
  children 
}: { 
  duration: string; 
  easing: string; 
  children: React.ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        {isActive ? 'Reset' : 'Animate'}
      </button>
      <div 
        className="relative w-full h-32 bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden border"
      >
        <div
          className={`absolute top-1/2 left-4 -translate-y-1/2 w-16 h-16 bg-[var(--hive-brand-primary)] rounded-lg shadow-lg transition-transform ${
            isActive ? 'translate-x-[calc(100vw-200px)]' : 'translate-x-0'
          }`}
          style={{
            transitionDuration: duration,
            transitionTimingFunction: easing,
          }}
        />
      </div>
      <div className="text-sm text-[var(--hive-text-secondary)] font-mono">
        Duration: {duration} | Easing: {easing}
      </div>
      {children}
    </div>
  );
};

export const DurationTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Duration Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionDemo duration="150ms" easing="var(--hive-ease-out)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Fast (150ms)</strong> - Perfect for micro-interactions like button hovers, 
              tooltip appearances, and quick feedback that should feel instant.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="200ms" easing="var(--hive-ease-out)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Base (200ms)</strong> - The standard duration for most UI transitions, 
              form interactions, and component state changes.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="300ms" easing="var(--hive-ease-smooth)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Slow (300ms)</strong> - Used for more dramatic transitions like modal 
              appearances, drawer slides, and page transitions.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="500ms" easing="var(--hive-ease-smooth)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Slower (500ms)</strong> - Reserved for complex state changes, 
              loading animations, and storytelling moments.
            </div>
          </MotionDemo>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of all duration tokens with real-time animation examples.',
      },
    },
  },
};

export const EasingFunctions: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Easing Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-ease-out)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Ease Out</strong><br />
              <code className="text-xs">cubic-bezier(0.0, 0.0, 0.2, 1)</code><br />
              Natural deceleration - starts fast, ends gently. Perfect for most interactions.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-ease-in-out)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Ease In-Out</strong><br />
              <code className="text-xs">cubic-bezier(0.4, 0.0, 0.2, 1)</code><br />
              Symmetric acceleration - smooth start and finish for modals and overlays.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-ease-smooth)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Ease Smooth</strong><br />
              <code className="text-xs">cubic-bezier(0.4, 0.0, 0.6, 1)</code><br />
              HIVE's signature gentle motion - premium feeling for key interactions.
            </div>
          </MotionDemo>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compare different easing functions and their use cases in the HIVE design system.',
      },
    },
  },
};

export const LiquidMetalMotion: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          HIVE Liquid Metal Motion
        </h3>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Campus-first animations that feel premium and energetic, inspired by liquid mercury 
          flowing through modern college spaces.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-liquid-subtle)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Liquid Subtle</strong><br />
              <code className="text-xs">cubic-bezier(0.4, 0, 0.2, 1)</code><br />
              Gentle premium feel for cards, surfaces, and background elements.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-liquid-smooth)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Liquid Smooth</strong><br />
              <code className="text-xs">cubic-bezier(0.4, 0, 0.1, 1)</code><br />
              Fluid motion for modals, major transitions, and page changes.
            </div>
          </MotionDemo>
          
          <MotionDemo duration="var(--hive-duration-base)" easing="var(--hive-liquid-bouncy)">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Liquid Bouncy</strong><br />
              <code className="text-xs">cubic-bezier(0.68, -0.55, 0.265, 1.55)</code><br />
              Playful feedback for positive interactions, celebrations, and achievements.
            </div>
          </MotionDemo>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HIVE\'s signature liquid metal motion system for campus-first interactions.',
      },
    },
  },
};

// Component-specific motion examples
const ComponentMotionExample = ({ 
  component, 
  children 
}: { 
  component: keyof typeof motion.components; 
  children: React.ReactNode; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const componentConfig = motion.components[component];
  
  return (
    <div className="space-y-4">
      <div
        className={`inline-flex items-center justify-center px-6 py-3 rounded-lg cursor-pointer select-none transform transition-all ${
          component === 'button' 
            ? 'bg-[var(--hive-brand-primary)] text-white hover:scale-105 active:scale-95' 
            : component === 'modal'
            ? 'bg-[var(--hive-background-secondary)] border-2 border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)]'
            : 'bg-[var(--hive-background-tertiary)] hover:bg-[var(--hive-background-elevated)]'
        }`}
        style={{
          transitionDuration: componentConfig.duration,
          transitionTimingFunction: componentConfig.easing,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {component.charAt(0).toUpperCase() + component.slice(1)} Component
      </div>
      <div className="text-sm text-[var(--hive-text-secondary)] font-mono">
        Duration: {componentConfig.duration}<br />
        Easing: {componentConfig.easing}
      </div>
      {children}
    </div>
  );
};

export const ComponentMotion: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Component-Specific Motion
        </h3>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Each component type has optimized motion settings for its specific use case and user expectations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentMotionExample component="button">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Button Motion</strong> - Fast response for immediate feedback on user actions.
            </div>
          </ComponentMotionExample>
          
          <ComponentMotionExample component="modal">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Modal Motion</strong> - Smooth liquid motion for focus-shifting interactions.
            </div>
          </ComponentMotionExample>
          
          <ComponentMotionExample component="tooltip">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Tooltip Motion</strong> - Quick appearance for contextual information.
            </div>
          </ComponentMotionExample>
          
          <ComponentMotionExample component="page">
            <div className="p-3 bg-[var(--hive-background-tertiary)] rounded text-sm">
              <strong>Page Motion</strong> - Slower, subtle transitions for navigation changes.
            </div>
          </ComponentMotionExample>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured motion settings for common component types in the HIVE design system.',
      },
    },
  },
};

export const AccessibilityFeatures: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Motion Accessibility
        </h3>
        
        <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-[var(--hive-text-primary)]">Reduced Motion Support</strong>
              <p className="text-[var(--hive-text-secondary)] text-sm mt-1">
                Automatically respects <code>prefers-reduced-motion</code> settings, disabling 
                animations for users who prefer less motion.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-[var(--hive-text-primary)]">Mobile Optimization</strong>
              <p className="text-[var(--hive-text-secondary)] text-sm mt-1">
                Slightly slower durations on mobile devices to account for touch interactions 
                and varying performance capabilities.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-[var(--hive-text-primary)]">Performance Conscious</strong>
              <p className="text-[var(--hive-text-secondary)] text-sm mt-1">
                All animations use CSS transforms and opacity for optimal performance, 
                avoiding layout thrashing.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg">
          <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">Testing Reduced Motion</h4>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            To test reduced motion preferences:
          </p>
          <ol className="list-decimal list-inside text-sm text-[var(--hive-text-secondary)] mt-2 space-y-1">
            <li>Open DevTools → Rendering tab</li>
            <li>Find "Emulate CSS media feature prefers-reduced-motion"</li>
            <li>Select "reduce" to see animations disabled</li>
          </ol>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features built into the HIVE motion system for inclusive user experiences.',
      },
    },
  },
};

export const UsageExamples: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Usage Examples
        </h3>
        
        <div className="space-y-6">
          {/* CSS Example */}
          <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">CSS Usage</h4>
            <pre className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-tertiary)] p-3 rounded overflow-x-auto">
{`/* Button hover transition */
.hive-button {
  transition: all var(--hive-duration-fast) var(--hive-ease-out);
}

/* Modal entrance animation */
.hive-modal {
  animation: slideIn var(--hive-duration-base) var(--hive-liquid-smooth);
}

/* Card hover effect */
.hive-card:hover {
  transform: translateY(-2px);
  transition: transform var(--hive-duration-base) var(--hive-liquid-subtle);
}`}
            </pre>
          </div>
          
          {/* TypeScript Example */}
          <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">TypeScript Usage</h4>
            <pre className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-tertiary)] p-3 rounded overflow-x-auto">
{`import { motion } from '@hive/ui/design-system/tokens/motion';

// Using component-specific motion
const buttonConfig = motion.components.button;

// Using individual tokens
const fastDuration = motion.duration.fast;
const smoothEasing = motion.liquidMetal.smooth;

// Framer Motion example
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: parseFloat(motion.duration.base), 
    ease: motion.easing.out 
  }}
>
  Content
</motion.div>`}
            </pre>
          </div>
          
          {/* Tailwind CSS Example */}
          <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">Inline Styles</h4>
            <pre className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-tertiary)] p-3 rounded overflow-x-auto">
{`// React inline styles
<div
  style={{
    transitionDuration: 'var(--hive-duration-base)',
    transitionTimingFunction: 'var(--hive-liquid-smooth)',
    transitionProperty: 'transform, opacity'
  }}
>
  Animated content
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code examples showing how to use the motion system in various contexts.',
      },
    },
  },
};