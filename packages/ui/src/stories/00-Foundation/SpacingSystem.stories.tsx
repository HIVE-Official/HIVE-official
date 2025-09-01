import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '../../../lib/utils';

const SpacingSystemDemo = () => (
  <div className="p-6 space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">HIVE Spacing System</h2>
      <p className="text-muted-foreground">8px base grid with generous whitespace</p>
    </div>
  </div>
);

const meta = {
  component: SpacingSystemDemo,
  title: 'Foundation/Spacing System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Spacing System

The HIVE spacing system is inspired by Vercel and Apple's generous whitespace approach, using an 8px base grid for consistent, confident layouts.

## Philosophy
- **Generous Whitespace**: Never cramped, always room to breathe
- **8px Base Grid**: Consistent mathematical relationship between elements
- **Vercel + Apple Inspired**: Technical precision meets human-centered design
- **Campus Energy**: Spacing can adapt to different student energy states

## Scale System
From 4px micro-spacing to 64px major layout gaps, all following the 8px base grid.

## Responsive Behavior
Spacing adapts intelligently across different screen sizes and contexts.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const SpacingDemo = ({ 
  title, 
  value, 
  className,
  description,
}: { 
  title: string; 
  value: string; 
  className: string;
  description: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm font-medium">{title}</span>
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    </div>
    <div className="border rounded-lg p-4 bg-surface">
      <div className={cn("bg-accent rounded", className)} />
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

const LayoutDemo = ({ 
  title, 
  children, 
  description,
}: { 
  title: string; 
  children: React.ReactNode; 
  description: string;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="border rounded-lg p-4 bg-surface">
      {children}
    </div>
  </div>
);

export const SpacingScale: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing Scale</h2>
        <p className="text-muted-foreground">
          The HIVE spacing system follows an 8px base grid for consistent, mathematical relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SpacingDemo
          title="XS"
          value="4px"
          className="w-1 h-8"
          description="Icon padding, micro-spacing"
        />
        <SpacingDemo
          title="SM"
          value="8px"
          className="w-2 h-8"
          description="Form field padding, tight spacing"
        />
        <SpacingDemo
          title="MD"
          value="12px"
          className="w-3 h-8"
          description="Button padding, small gaps"
        />
        <SpacingDemo
          title="LG"
          value="16px"
          className="w-4 h-8"
          description="Card padding, section spacing"
        />
        <SpacingDemo
          title="XL"
          value="24px"
          className="w-6 h-8"
          description="Large section spacing"
        />
        <SpacingDemo
          title="2XL"
          value="32px"
          className="w-8 h-8"
          description="Major layout gaps"
        />
        <SpacingDemo
          title="3XL"
          value="48px"
          className="w-12 h-8"
          description="Hero section spacing"
        />
        <SpacingDemo
          title="4XL"
          value="64px"
          className="w-16 h-8"
          description="Page-level spacing"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tailwind Scale Integration</h3>
        <p className="text-muted-foreground">
          HIVE also extends Tailwind's standard spacing scale for more granular control.
        </p>
        <div className="grid grid-cols-8 gap-2 text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="text-center space-y-1">
              <div className={`bg-accent rounded h-${i} w-full`} />
              <span className="font-mono">{i}</span>
              <span className="text-muted-foreground">{i * 4}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ComponentSpacing: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Component Spacing</h2>
        <p className="text-muted-foreground">
          How spacing is applied to different component types.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo
          title="Button Spacing"
          description="Comfortable touch targets with generous padding"
        >
          <div className="flex gap-4">
            <button className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm">
              Small (px-3 py-1.5)
            </button>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
              Default (px-4 py-2)
            </button>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md text-lg">
              Large (px-6 py-3)
            </button>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Card Spacing"
          description="Consistent internal spacing for content containers"
        >
          <div className="bg-background border rounded-lg p-4 space-y-3">
            <h4 className="font-semibold">Card Title</h4>
            <p className="text-sm text-muted-foreground">
              Card content with comfortable padding (p-4) and internal spacing (space-y-3).
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm">
                Action
              </button>
              <button className="px-3 py-1 bg-surface text-foreground rounded text-sm">
                Secondary
              </button>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Form Spacing"
          description="Logical grouping and comfortable field spacing"
        >
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your email"
              />
            </div>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
              Submit
            </button>
          </form>
        </LayoutDemo>
      </div>
    </div>
  ),
};

export const LayoutPrinciples: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Layout Principles</h2>
        <p className="text-muted-foreground">
          Vercel + Apple inspired layout principles for confident, spacious interfaces.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo
          title="Generous Whitespace"
          description="Never cramped, always room to breathe"
        >
          <div className="max-w-md mx-auto text-center space-y-6">
            <h3 className="text-2xl font-semibold">Welcome to HIVE</h3>
            <p className="text-muted-foreground">
              Your campus community awaits. Connect with classmates, join spaces, and build together.
            </p>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
              Get Started
            </button>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Visual Hierarchy"
          description="Clear relationships through consistent spacing"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">CS Majors Space</h3>
              <p className="text-muted-foreground">247 members • Active community</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm">
                Connect with fellow computer science students, share resources, and collaborate on projects.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
                  Join Space
                </button>
                <button className="px-4 py-2 bg-surface text-foreground rounded-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Consistent Rhythms"
          description="Predictable spacing patterns create comfort"
        >
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-background border rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-semibold">
                  {i}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">Space Title {i}</h4>
                  <p className="text-sm text-muted-foreground">Brief description of the space</p>
                </div>
                <button className="px-3 py-1 bg-surface text-foreground rounded text-sm">
                  Join
                </button>
              </div>
            ))}
          </div>
        </LayoutDemo>
      </div>
    </div>
  ),
};

export const CampusEnergyAdaptation: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Spacing</h2>
        <p className="text-muted-foreground">
          Spacing adapts to different campus energy states and student needs.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo
          title="High Energy Periods"
          description="Tighter spacing for dynamic, active periods"
        >
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">🎉 Campus Events Today</h3>
            <div className="space-y-2">
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">CS Department Mixer</h4>
                <p className="text-sm text-muted-foreground">4:00 PM - Davis Hall</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">Study Group Formation</h4>
                <p className="text-sm text-muted-foreground">6:00 PM - Library</p>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Focus Periods"
          description="More generous spacing for calm, focused work"
        >
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Study Tools</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background border rounded-lg">
                <h4 className="font-medium">Pomodoro Timer</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  25-minute focused work sessions
                </p>
              </div>
              <div className="p-4 bg-background border rounded-lg">
                <h4 className="font-medium">Study Group Finder</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect with classmates for quiet study
                </p>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Celebration Moments"
          description="Expansive spacing for special achievements"
        >
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center text-2xl animate-hive-gold-pulse">
                🎉
              </div>
              <h3 className="text-2xl font-semibold">Space Activated!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You've successfully activated the CS Majors space. Welcome to your new campus community!
              </p>
            </div>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
              Explore Your Space
            </button>
          </div>
        </LayoutDemo>
      </div>
    </div>
  ),
};

export const ResponsiveSpacing: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Responsive Spacing</h2>
        <p className="text-muted-foreground">
          How spacing adapts across different screen sizes and contexts.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo
          title="Mobile (390px+)"
          description="Compact but comfortable spacing for mobile devices"
        >
          <div className="max-w-xs mx-auto">
            <div className="p-4 bg-background border rounded-lg space-y-3">
              <h4 className="font-semibold">Join CS Majors</h4>
              <p className="text-sm text-muted-foreground">
                Connect with 247 computer science students
              </p>
              <button className="w-full py-2 bg-accent text-accent-foreground rounded-md">
                Join Space
              </button>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Tablet (768px+)"
          description="Increased spacing for comfortable tablet interaction"
        >
          <div className="max-w-lg mx-auto">
            <div className="p-6 bg-background border rounded-lg space-y-4">
              <h4 className="text-lg font-semibold">Join CS Majors</h4>
              <p className="text-muted-foreground">
                Connect with 247 computer science students, share resources, and collaborate on projects.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
                  Join Space
                </button>
                <button className="px-4 py-2 bg-surface text-foreground rounded-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo
          title="Desktop (1024px+)"
          description="Generous spacing for desktop interfaces"
        >
          <div className="p-8 bg-background border rounded-lg space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xl font-semibold">
                CS
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-xl font-semibold">CS Majors Space</h4>
                <p className="text-muted-foreground">
                  Connect with 247 computer science students, share resources, collaborate on projects, 
                  and build tools that help the entire campus community.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
                    Join Space
                  </button>
                  <button className="px-6 py-3 bg-surface text-foreground rounded-md">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LayoutDemo>
      </div>
    </div>
  ),
};

export const UsageGuidelines: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use 8px base grid for consistency</li>
            <li>• Follow Vercel/Apple generous spacing</li>
            <li>• Use semantic spacing classes (space-y-4, gap-6)</li>
            <li>• Adapt spacing to campus energy states</li>
            <li>• Maintain consistent rhythms</li>
            <li>• Consider mobile touch targets (44px min)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use random spacing values</li>
            <li>• Cram elements together</li>
            <li>• Ignore responsive spacing needs</li>
            <li>• Use inconsistent spacing patterns</li>
            <li>• Forget about touch accessibility</li>
            <li>• Override spacing system randomly</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {`// Use semantic spacing classes
<div className="space-y-4">           // 16px vertical spacing
  <div className="p-6">              // 24px padding
    <div className="flex gap-4">     // 16px gap between items
      <button className="px-4 py-2"> // 16px horizontal, 8px vertical
        Action
      </button>
    </div>
  </div>
</div>

// Campus energy adaptation
<div className="space-y-3">  // High energy - tighter spacing
<div className="space-y-6">  // Focus period - generous spacing
<div className="space-y-8">  // Celebration - expansive spacing`}
          </code>
        </div>
      </div>
    </div>
  ),
};