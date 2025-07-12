import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '../../lib/utils';

const meta = {
  title: 'Foundation/Typography System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Typography System

The HIVE typography system creates clear hierarchy and personality while maintaining technical precision.

## Font Stack
- **Space Grotesk Variable**: Headlines, hero text, call-to-action buttons
- **Geist Sans Variable**: Body text, menus, micro-copy, interface elements
- **Geist Mono Variable**: Code snippets, countdown numerals, data display

## Scale System
From 64px display headlines down to 12px caption text with proper line heights and spacing.

## Campus Energy Adaptation
Typography can adapt to different campus energy states through weight and spacing variations.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const TypeSample = ({ 
  title, 
  className, 
  text, 
  specs,
}: { 
  title: string; 
  className: string; 
  text: string; 
  specs: string;
}) => (
  <div className="space-y-2 p-4 border rounded-lg">
    <div className="flex items-center justify-between">
      <h4 className="font-mono text-sm font-medium">{title}</h4>
      <span className="font-mono text-xs text-muted-foreground">{specs}</span>
    </div>
    <p className={cn("text-foreground", className)}>{text}</p>
  </div>
);

export const TypeScale: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography Scale</h2>
        <p className="text-muted-foreground">
          The complete HIVE typography scale with proper hierarchy and spacing.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Display & Headlines</h3>
        <div className="space-y-4">
          <TypeSample
            title="Display"
            className="text-display font-display"
            text="Build your campus story"
            specs="64px / 72px / 600 / Space Grotesk"
          />
          <TypeSample
            title="H1"
            className="text-h1 font-display"
            text="Welcome to HIVE"
            specs="48px / 56px / 600 / Space Grotesk"
          />
          <TypeSample
            title="H2"
            className="text-h2 font-display"
            text="Find your people"
            specs="32px / 40px / 600 / Space Grotesk"
          />
          <TypeSample
            title="H3"
            className="text-h3 font-display"
            text="Space activation"
            specs="24px / 32px / 600 / Space Grotesk"
          />
          <TypeSample
            title="H4"
            className="text-h4 font-display"
            text="Ritual participation"
            specs="20px / 28px / 600 / Space Grotesk"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Body Text</h3>
        <div className="space-y-4">
          <TypeSample
            title="Body"
            className="text-body font-sans"
            text="HIVE is the programmable campus layer where students find their people, make decisions together, and build tools that spread across the entire campus community."
            specs="16px / 24px / 400 / Geist Sans"
          />
          <TypeSample
            title="Body Small"
            className="text-body-sm font-sans"
            text="Connect with classmates in your major, residence hall, and interest groups. Create tools that help your community thrive."
            specs="14px / 20px / 400 / Geist Sans"
          />
          <TypeSample
            title="Caption"
            className="text-caption font-sans"
            text="Last updated 2 hours ago"
            specs="12px / 18px / 400 / Geist Sans"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Interface Elements</h3>
        <div className="space-y-4">
          <TypeSample
            title="Button"
            className="text-button font-sans font-medium"
            text="Join Space"
            specs="14px / 20px / 500 / Geist Sans"
          />
          <TypeSample
            title="Code"
            className="text-code font-mono"
            text="handleSpaceJoin(spaceId)"
            specs="14px / 20px / 400 / Geist Mono"
          />
        </div>
      </div>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Families</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Space Grotesk</h3>
          <p className="text-sm text-muted-foreground">Headlines, hero text, CTAs</p>
          <div className="space-y-2">
            <p className="font-display font-light">Light 300</p>
            <p className="font-display font-normal">Regular 400</p>
            <p className="font-display font-medium">Medium 500</p>
            <p className="font-display font-semibold">Semibold 600</p>
            <p className="font-display font-bold">Bold 700</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Geist Sans</h3>
          <p className="text-sm text-muted-foreground">Body text, interface elements</p>
          <div className="space-y-2">
            <p className="font-sans font-light">Light 300</p>
            <p className="font-sans font-normal">Regular 400</p>
            <p className="font-sans font-medium">Medium 500</p>
            <p className="font-sans font-semibold">Semibold 600</p>
            <p className="font-sans font-bold">Bold 700</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Geist Mono</h3>
          <p className="text-sm text-muted-foreground">Code, data, countdown</p>
          <div className="space-y-2">
            <p className="font-mono font-light">Light 300</p>
            <p className="font-mono font-normal">Regular 400</p>
            <p className="font-mono font-medium">Medium 500</p>
            <p className="font-mono font-semibold">Semibold 600</p>
            <p className="font-mono font-bold">Bold 700</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CampusEnergyAdaptation: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Typography</h2>
        <p className="text-muted-foreground">
          Typography adapts to different campus energy states through weight and spacing variations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">High Energy Periods</h3>
          <p className="text-sm text-muted-foreground">Start of semester, events, social peaks</p>
          <div className="p-4 bg-background border rounded-lg space-y-2">
            <h4 className="text-h3 font-display font-bold">Join the CS Majors Space</h4>
            <p className="text-body font-sans font-medium">
              247 students are building amazing tools together. Your next collaboration starts here.
            </p>
            <div className="text-sm text-muted-foreground">
              Bolder weights, increased contrast, more excitement
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Focus Periods</h3>
          <p className="text-sm text-muted-foreground">Study time, exams, project deadlines</p>
          <div className="p-4 bg-background border rounded-lg space-y-2">
            <h4 className="text-h3 font-display font-normal">Study Group Tools</h4>
            <p className="text-body font-sans font-normal text-muted-foreground">
              Quiet collaboration tools for focused work sessions.
            </p>
            <div className="text-sm text-muted-foreground">
              Lighter weights, reduced contrast, less distraction
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Celebration Moments</h3>
          <p className="text-sm text-muted-foreground">Achievements, ritual completion</p>
          <div className="p-4 bg-background border rounded-lg space-y-2">
            <h4 className="text-h3 font-display font-bold">🎉 Space Activated!</h4>
            <p className="text-body font-sans font-medium">
              You've successfully activated the CS Majors space. Welcome to your new campus community!
            </p>
            <div className="text-sm text-muted-foreground">
              Bold weights, celebratory tone, clear hierarchy
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
        <h2 className="text-2xl font-semibold">Typography Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use Space Grotesk for headlines and CTAs</li>
            <li>• Use Geist Sans for body text and interface</li>
            <li>• Use Geist Mono for code and data</li>
            <li>• Follow the established scale system</li>
            <li>• Maintain proper line heights</li>
            <li>• Use CSS custom properties (--font-display, --font-sans, --font-mono)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Mix font families randomly</li>
            <li>• Use hardcoded font sizes</li>
            <li>• Ignore line height specifications</li>
            <li>• Use too many font weights</li>
            <li>• Compromise on contrast ratios</li>
            <li>• Override CSS custom properties</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {`// Use semantic classes
<h1 className="text-h1 font-display">Welcome to HIVE</h1>
<p className="text-body font-sans">Join your campus community</p>
<code className="text-code font-mono">handleSpaceJoin()</code>

// Campus energy adaptation
<h2 className="text-h2 font-display font-bold">     // High energy
<h2 className="text-h2 font-display font-normal">   // Focus period`}
          </code>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility</h3>
        <div className="p-4 bg-surface rounded-lg space-y-2">
          <p className="text-sm">• Minimum 16px body text size</p>
          <p className="text-sm">• Proper contrast ratios (4.5:1 minimum)</p>
          <p className="text-sm">• Line heights optimized for readability</p>
          <p className="text-sm">• Clear hierarchy for screen readers</p>
        </div>
      </div>
    </div>
  ),
};