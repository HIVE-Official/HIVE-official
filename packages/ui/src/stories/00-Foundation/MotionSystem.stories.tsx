import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const meta = {
  title: 'Foundation/Motion System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Motion System

The HIVE motion system creates organic, campus-energy-inspired interactions that feel authentic to student life.

## Philosophy
- **Organic not Mechanical**: Motion feels natural and responsive
- **Campus Energy**: Animation adapts to different student life periods
- **HIVE Brand Curve**: cubic-bezier(0.33, 0.65, 0, 1) for signature feel

## Duration Scale
- **Instant** (50ms): Immediate feedback
- **Fast** (120ms): Micro-interactions
- **Base** (180ms): Content transitions
- **Slow** (280ms): Complex animations
- **Ritual** (400ms): Special HIVE moments

## HIVE-Specific Animations
Custom animations for campus-specific interactions and celebrations.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const MotionDemo = ({ 
  title, 
  description, 
  duration, 
  easing,
  children,
}: { 
  title: string; 
  description: string; 
  duration: string;
  easing: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4 p-4 border rounded-lg">
    <div className="space-y-2">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex gap-4 text-xs text-muted-foreground font-mono">
        <span>Duration: {duration}</span>
        <span>Easing: {easing}</span>
      </div>
    </div>
    <div className="flex items-center justify-center p-8 bg-surface rounded-lg">
      {children}
    </div>
  </div>
);

const AnimationTrigger = ({ 
  children, 
  className,
}: { 
  children: React.ReactNode; 
  className: string;
}) => {
  const [isTriggered, setIsTriggered] = useState(false);
  
  return (
    <button
      onClick={() => {
        setIsTriggered(true);
        setTimeout(() => setIsTriggered(false), 1000);
      }}
      className={cn(
        "px-4 py-2 rounded-md transition-all",
        isTriggered && className
      )}
    >
      {children}
    </button>
  );
};

export const DurationScale: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Duration Scale</h2>
        <p className="text-muted-foreground">
          The HIVE motion timing system with campus-energy-inspired durations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo
          title="Instant (50ms)"
          description="Immediate feedback for direct manipulation"
          duration="50ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-[50ms] scale-95 bg-accent">
            Click me - Instant
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Fast (120ms)"
          description="Micro-interactions and hover states"
          duration="120ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-[120ms] scale-105 bg-accent">
            Click me - Fast
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Base (180ms)"
          description="Content transitions and standard interactions"
          duration="180ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-base scale-110 bg-accent">
            Click me - Base
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Slow (280ms)"
          description="Complex animations and page transitions"
          duration="280ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-slow scale-125 bg-accent">
            Click me - Slow
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Ritual (400ms)"
          description="Special HIVE moments and celebrations"
          duration="400ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-ritual animate-hive-ritual-burst">
            Click me - Ritual
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
  ),
};

export const EasingFunctions: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Easing Functions</h2>
        <p className="text-muted-foreground">
          HIVE-specific easing curves for different interaction types.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo
          title="Brand (Primary)"
          description="HIVE's signature easing curve"
          duration="180ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="duration-base ease-brand translate-x-8 bg-accent">
            Brand Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Smooth"
          description="Gentle, flowing transitions"
          duration="180ms"
          easing="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        >
          <AnimationTrigger className="duration-base ease-smooth translate-x-8 bg-accent">
            Smooth Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Snap"
          description="Playful, bouncy interactions"
          duration="180ms"
          easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        >
          <AnimationTrigger className="duration-base ease-snap translate-x-8 bg-accent">
            Snap Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Elegant"
          description="Sophisticated, refined motion"
          duration="180ms"
          easing="cubic-bezier(0.23, 1, 0.32, 1)"
        >
          <AnimationTrigger className="duration-base ease-elegant translate-x-8 bg-accent">
            Elegant Curve
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
  ),
};

export const HIVEAnimations: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">HIVE Animations</h2>
        <p className="text-muted-foreground">
          Custom animations for campus-specific interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo
          title="Fade In"
          description="Gentle content appearance"
          duration="180ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="animate-hive-fade-in bg-accent">
            Fade In
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Slide Up"
          description="Content entering from below"
          duration="180ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="animate-hive-slide-up bg-accent">
            Slide Up
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Scale In"
          description="Gentle scale entrance"
          duration="180ms"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <AnimationTrigger className="animate-hive-scale-in bg-accent">
            Scale In
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Gold Pulse"
          description="Achievement moment indicator"
          duration="2s infinite"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse">
            <span className="sr-only">Gold Pulse</span>
          </div>
        </MotionDemo>

        <MotionDemo
          title="Gold Glow"
          description="Celebration effect"
          duration="1.5s infinite"
          easing="cubic-bezier(0.33, 0.65, 0, 1)"
        >
          <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow">
            <span className="sr-only">Gold Glow</span>
          </div>
        </MotionDemo>

        <MotionDemo
          title="Ritual Burst"
          description="Special HIVE ritual moments"
          duration="400ms"
          easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        >
          <AnimationTrigger className="animate-hive-ritual-burst bg-accent">
            Ritual Burst
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Space Join"
          description="Joining a space celebration"
          duration="400ms"
          easing="cubic-bezier(0.23, 1, 0.32, 1)"
        >
          <AnimationTrigger className="animate-hive-space-join bg-accent">
            Space Join
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo
          title="Surface Rise"
          description="Elevated surface appearing"
          duration="280ms"
          easing="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        >
          <AnimationTrigger className="animate-hive-surface-rise bg-surface border">
            Surface Rise
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
  ),
};

export const CampusEnergyAdaptation: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Motion</h2>
        <p className="text-muted-foreground">
          Motion adapts to different campus energy states and student life cycles.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">High Energy Periods</h3>
          <p className="text-sm text-muted-foreground">Start of semester, events, social peaks</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-fast scale-110 bg-accent animate-hive-gold-pulse">
                Faster Motion
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                120ms duration, more dynamic animations, increased energy
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Focus Periods</h3>
          <p className="text-sm text-muted-foreground">Study time, exams, project deadlines</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-slow scale-105 bg-accent/50">
                Calmer Motion
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                280ms duration, reduced animations, minimal distractions
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Celebration Moments</h3>
          <p className="text-sm text-muted-foreground">Achievements, ritual completion, space activation</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-ritual animate-hive-ritual-burst bg-accent">
                Celebration
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                400ms duration, special animations, moment of delight
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageGuidelines: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Motion Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use HIVE brand curve for signature feel</li>
            <li>• Respect duration scale (instant to ritual)</li>
            <li>• Use HIVE-specific animations</li>
            <li>• Adapt motion to campus energy states</li>
            <li>• Respect prefers-reduced-motion</li>
            <li>• Use consistent easing functions</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use random easing functions</li>
            <li>• Ignore accessibility preferences</li>
            <li>• Overuse complex animations</li>
            <li>• Use motion without purpose</li>
            <li>• Mix inconsistent durations</li>
            <li>• Create jarring transitions</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {`// Use semantic duration classes
<button className="transition-all duration-base ease-brand hover:scale-105">
  Standard Button
</button>

// Campus energy adaptation
<div className="duration-fast animate-hive-gold-pulse">    // High energy
<div className="duration-slow animate-hive-fade-in">      // Focus period
<div className="duration-ritual animate-hive-ritual-burst"> // Celebration

// HIVE animations
<div className="animate-hive-slide-up">Content entering</div>
<div className="animate-hive-space-join">Space activation</div>`}
          </code>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility</h3>
        <div className="p-4 bg-surface rounded-lg space-y-2">
          <p className="text-sm">• Respect `prefers-reduced-motion` settings</p>
          <p className="text-sm">• Provide fallback transitions for reduced motion</p>
          <p className="text-sm">• Avoid motion that could trigger vestibular disorders</p>
          <p className="text-sm">• Use motion purposefully, not decoratively</p>
        </div>
      </div>
    </div>
  ),
};