import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '../../../lib/utils';

const ColorSystemDemo = () => (
  <div className="p-6 space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">HIVE Color System</h2>
      <p className="text-muted-foreground">Minimal Surface. Maximal Spark.</p>
    </div>
  </div>
);

const meta = {
  component: ColorSystemDemo,
  title: 'Foundation/Color System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Color System

The HIVE color system follows the "Minimal Surface. Maximal Spark." philosophy with a monochrome foundation and strategic gold accents.

## Inspiration
- **Vercel + Apple Spacing**: Generous whitespace with confident, technical precision
- **Campus Energy**: Colors that adapt to student life cycles and energy states
- **Gold Rings Only**: Gold (var(--hive-gold)) reserved for focus states, achievements, and ritual moments

## Implementation
- Uses CSS custom properties with HSL values for theme flexibility
- Semantic color tokens that work across light/dark themes
- Multiple surface levels for proper visual hierarchy
- Status feedback through icons and motion, not color violations
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Color palette component
const ColorCard = ({ 
  name, 
  value, 
  description, 
  className,
}: { 
  name: string; 
  value: string; 
  description: string; 
  className?: string;
}) => (
  <div className={cn("rounded-lg border p-4 space-y-2", className)}>
    <div className="h-16 rounded-md border" style={{ backgroundColor: value }} />
    <div className="space-y-1">
      <p className="font-mono text-sm font-medium">{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StatusIndicator = ({ 
  type, 
  label, 
  icon,
}: { 
  type: 'success' | 'error' | 'warning' | 'info'; 
  label: string;
  icon: string;
}) => {
  const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium";
  const variants = {
    success: "bg-background border-2 border-accent text-foreground",
    error: "bg-background border border-border text-foreground opacity-75",
    warning: "bg-background border border-border text-foreground",
    info: "bg-surface border border-border text-foreground",
  };
  
  return (
    <div className={cn(baseClasses, variants[type])}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export const ColorPalette: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Primary Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorCard
            name="Primary"
            value="var(--hive-background-primary)"
            description="Primary black - main backgrounds and high contrast elements"
            className="bg-primary text-primary-foreground"
          />
          <ColorCard
            name="Surface"
            value="var(--hive-background-secondary)"
            description="Surface gray - cards, elevated elements, layering"
            className="bg-surface text-foreground"
          />
          <ColorCard
            name="Accent (Gold)"
            value="var(--hive-gold)"
            description="Gold accent - focus rings, achievements, ritual moments only"
            className="bg-accent text-accent-foreground"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Surface Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ColorCard
            name="Background"
            value="hsl(var(--background))"
            description="Base background level"
            className="bg-background text-foreground"
          />
          <ColorCard
            name="Surface"
            value="hsl(var(--surface))"
            description="Elevated surface level 1"
            className="bg-surface text-foreground"
          />
          <ColorCard
            name="Card"
            value="hsl(var(--card))"
            description="Card container level"
            className="bg-card text-card-foreground"
          />
          <ColorCard
            name="Popover"
            value="hsl(var(--popover))"
            description="Floating element level"
            className="bg-popover text-popover-foreground"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorCard
            name="Foreground"
            value="hsl(var(--foreground))"
            description="Primary text color - high contrast"
            className="bg-background text-foreground"
          />
          <ColorCard
            name="Muted"
            value="hsl(var(--muted-foreground))"
            description="Secondary text, descriptions, captions"
            className="bg-background text-muted-foreground"
          />
          <ColorCard
            name="Accent Foreground"
            value="hsl(var(--accent-foreground))"
            description="Text on gold backgrounds"
            className="bg-accent text-accent-foreground"
          />
        </div>
      </div>
    </div>
  ),
};

export const StatusSystem: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Without Color Violations</h2>
        <p className="text-muted-foreground">
          HIVE uses icons, motion, and typography to communicate status instead of green/red/blue colors.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusIndicator
            type="success"
            label="Successfully connected"
            icon="✓"
          />
          <StatusIndicator
            type="error"
            label="Connection failed"
            icon="×"
          />
          <StatusIndicator
            type="warning"
            label="Check your connection"
            icon="⚠"
          />
          <StatusIndicator
            type="info"
            label="Processing request"
            icon="◐"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Focus States</h3>
        <div className="space-y-2">
          <p className="text-muted-foreground">Gold rings (2px) for all focus states:</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
              Primary Button
            </button>
            <input 
              type="text" 
              placeholder="Text input"
              className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CampusEnergyStates: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Adaptation</h2>
        <p className="text-muted-foreground">
          The color system adapts to different campus energy periods through intensity and contrast adjustments.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">High Energy Periods</h3>
          <p className="text-sm text-muted-foreground">Start of semester, events, social peaks</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse" />
              <div className="space-y-2">
                <p className="font-semibold">Increased Gold Presence</p>
                <p className="text-sm text-muted-foreground">More gold accents, brighter contrast</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Focus Periods</h3>
          <p className="text-sm text-muted-foreground">Study time, exams, project deadlines</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/30 rounded-lg" />
              <div className="space-y-2">
                <p className="font-semibold">Muted Gold Presence</p>
                <p className="text-sm text-muted-foreground">Reduced contrast, minimal distractions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Celebration Moments</h3>
          <p className="text-sm text-muted-foreground">Achievements, ritual completion, space activation</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow" />
              <div className="space-y-2">
                <p className="font-semibold">Gold Celebration</p>
                <p className="text-sm text-muted-foreground">Gentle glow effects, achievement feedback</p>
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
        <h2 className="text-2xl font-semibold">Usage Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use gold for focus rings (2px)</li>
            <li>• Use gold for achievement moments</li>
            <li>• Use gold for ritual button fills</li>
            <li>• Use monochrome for status feedback</li>
            <li>• Use generous whitespace (Vercel/Apple inspiration)</li>
            <li>• Use semantic color tokens</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use green/red/blue for status colors</li>
            <li>• Use gold for large surface areas</li>
            <li>• Use gold/white as standard button fill</li>
            <li>• Use hardcoded color values</li>
            <li>• Compromise on contrast ratios</li>
            <li>• Use gold for decoration without meaning</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {`// Use semantic tokens
<button className="bg-primary text-primary-foreground focus:ring-2 focus:ring-accent">
  Primary Action
</button>

// Campus energy adaptation
<div className="bg-accent/30 animate-hive-gold-pulse"> // Focus period
<div className="bg-accent animate-hive-gold-glow">     // Celebration moment`}
          </code>
        </div>
      </div>
    </div>
  ),
};