import type { Meta, StoryObj } from '@storybook/react';
import { RitualCard } from '../components/ritual/ritual-card';
import { PostCard } from '../components/feed/post-card';
import { SpaceCard } from '../components/spaces/space-card';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'HIVE/Design System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Design System 2.0
**The Complete Design System for Campus Connection**

## 🎯 **Design Philosophy: "Minimal Surface. Maximal Spark."**

HIVE's design system balances technical precision with moments of delight, creating interfaces that feel both sophisticated and alive with student energy.

### ✅ **Core Principles**
- **Monochrome + Gold**: Pure black/white system with strategic gold accents (≤10% usage)
- **Motion-Based Feedback**: Animations replace color-based status indicators
- **Surface Hierarchy**: Proper depth through elevation, not shadows
- **HIVE Typography**: Space Grotesk for display, Geist Sans for body text
- **180ms Timing**: Brand-specific motion curves for consistency

### 🚫 **Forbidden Patterns**
- ❌ Red/green/blue status colors
- ❌ Gold button fills (except ritual moments)
- ❌ Non-HIVE motion timing
- ❌ Hardcoded spacing values

### 🏗️ **Built-in Enforcement**
- **ESLint Rules**: Automatically catch violations at build time
- **CSS Variables**: Platform-wide design tokens
- **Motion System**: Consistent timing and easing curves
- **Component API**: Design-compliant interfaces by default
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAuthor = {
  id: 'user-1',
  displayName: 'Sarah Chen',
  handle: 'sarah.chen',
  avatarUrl: undefined,
  verificationLevel: 'verified+' as const,
};

export const DesignSystemOverview: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-display font-display text-foreground">
          HIVE Design System 2.0
        </h1>
        <p className="text-body text-muted max-w-2xl mx-auto">
          Complete design system for campus connection, automatically enforcing 
          brand consistency across every component and interaction.
        </p>
      </div>

      {/* Color System */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">🎨 Color System</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-background border border-border rounded-lg flex items-center justify-center">
              <span className="text-foreground text-sm font-mono">#0A0A0A</span>
            </div>
            <p className="text-caption text-muted text-center">Background</p>
          </div>
          
          <div className="space-y-2">
            <div className="h-16 bg-surface border border-border rounded-lg flex items-center justify-center">
              <span className="text-foreground text-sm font-mono">#111111</span>
            </div>
            <p className="text-caption text-muted text-center">Surface</p>
          </div>
          
          <div className="space-y-2">
            <div className="h-16 bg-border border border-border rounded-lg flex items-center justify-center">
              <span className="text-foreground text-sm font-mono">#2A2A2A</span>
            </div>
            <p className="text-caption text-muted text-center">Border</p>
          </div>
          
          <div className="space-y-2">
            <div className="h-16 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-background text-sm font-mono">#FFD700</span>
            </div>
            <p className="text-caption text-muted text-center">Accent (Gold)</p>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">📝 Typography System</h2>
        
        <div className="space-y-4 p-6 bg-surface border border-border rounded-lg">
          <div className="text-display font-display text-foreground">Display Text - Space Grotesk</div>
          <div className="text-h1 font-display text-foreground">Heading 1 - Space Grotesk</div>
          <div className="text-h2 font-display text-foreground">Heading 2 - Space Grotesk</div>
          <div className="text-body font-body text-foreground">Body text - Geist Sans with proper line height</div>
          <div className="text-caption font-body text-muted">Caption text - Geist Sans muted</div>
          <div className="text-code font-mono text-muted">Code text - Geist Mono for technical content</div>
        </div>
      </div>

      {/* Button System */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">🔘 Button Variants</h2>
        
        <div className="flex flex-wrap gap-4 p-6 bg-surface border border-border rounded-lg">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ritual">Ritual (Gold Fill)</Button>
          <Button variant="surface">Surface</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Badge System */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">🏷️ Badge Variants</h2>
        
        <div className="flex flex-wrap gap-4 p-6 bg-surface border border-border rounded-lg">
          <Badge variant="chip">Chip</Badge>
          <Badge variant="pill">Pill</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="ritual">Ritual</Badge>
          <Badge variant="interactive">Interactive</Badge>
          <Badge variant="floating">Floating</Badge>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">🧩 Component Examples</h2>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Ritual Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Ritual Card</h3>
            <RitualCard
              id="showcase-ritual"
              title="Light Your Flame"
              description="Begin your HIVE journey with your first public words."
              type="first_light"
              participantCount={127}
              isActive={true}
              hasParticipated={false}
              onParticipate={fn()}
            />
          </div>

          {/* Post Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Post Card</h3>
            <PostCard
              id="showcase-post"
              author={sampleAuthor}
              content="Just discovered the most amazing study spot! Perfect for late-night coding sessions ☕️"
              type="text"
              timestamp="2h ago"
              likes={23}
              comments={5}
              isLiked={false}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
            />
          </div>

          {/* Space Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Space Card</h3>
            <SpaceCard
              id="showcase-space"
              name="CS Majors"
              description="Connect with fellow Computer Science students and collaborate on projects."
              type="academic"
              status="active"
              memberCount={234}
              upcomingEvents={3}
              recentActivity="Hackathon planning discussion"
              leaders={[
                { id: '1', name: 'Sarah Chen' },
                { id: '2', name: 'Marcus Rodriguez' },
              ]}
              isJoined={false}
              onJoin={fn()}
              onViewSpace={fn()}
            />
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">⚡ Motion & Interaction</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-surface border border-border rounded-lg space-y-2">
            <h4 className="text-body font-medium text-foreground">180ms Standard</h4>
            <p className="text-caption text-muted">All transitions use HIVE brand timing</p>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg space-y-2">
            <h4 className="text-body font-medium text-foreground">Cubic Bezier Curves</h4>
            <p className="text-caption text-muted">Custom easing for organic feel</p>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg space-y-2">
            <h4 className="text-body font-medium text-foreground">Motion-Based Status</h4>
            <p className="text-caption text-muted">Animations replace color feedback</p>
          </div>
        </div>
      </div>

      {/* Enforcement */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-h2 font-display text-foreground">🛡️ Automatic Enforcement</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 bg-surface border border-border rounded-lg space-y-3">
            <h4 className="text-body font-medium text-foreground">Build-Time Validation</h4>
            <p className="text-caption text-muted">ESLint rules catch violations before they reach production</p>
            <div className="text-xs font-mono text-muted bg-surface-02 p-2 rounded">
              ❌ text-red-500 → Use motion feedback<br/>
              ❌ bg-green-400 → Use surface variants<br/>
              ❌ 500ms → Use 180ms timing
            </div>
          </div>
          
          <div className="p-6 bg-surface border border-border rounded-lg space-y-3">
            <h4 className="text-body font-medium text-foreground">Design Token System</h4>
            <p className="text-caption text-muted">CSS variables ensure consistency across the platform</p>
            <div className="text-xs font-mono text-muted bg-surface-02 p-2 rounded">
              ✅ var(--accent) → #FFD700<br/>
              ✅ var(--motion-standard) → 180ms<br/>
              ✅ var(--surface-02) → #181818
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center pt-8 border-t border-border">
        <p className="text-muted text-sm">
          🎯 <strong>Result:</strong> Every new component automatically follows HIVE brand guidelines.<br/>
          <strong>Zero violations</strong> reach production thanks to automated enforcement.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of the HIVE design system with all components and principles',
      },
    },
  },
};

export const ComponentGallery: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-display text-foreground">HIVE Component Gallery</h1>
          <p className="text-muted">All components built with the HIVE design system</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Rituals */}
          <div className="space-y-4">
            <h2 className="text-h2 font-display text-foreground">Rituals</h2>
            <RitualCard
              id="first-light"
              title="Light Your Flame"
              description="Begin your HIVE journey with your first public words."
              type="first_light"
              participantCount={127}
              isActive={true}
              hasParticipated={false}
              onParticipate={fn()}
            />
            <RitualCard
              id="torch-pass"
              title="Pass the Torch"
              description="Share invitation torches with fellow students."
              type="torch_pass"
              participantCount={89}
              timeRemaining="2 days"
              isActive={true}
              hasParticipated={true}
              onParticipate={fn()}
            />
          </div>

          {/* Feed */}
          <div className="space-y-4">
            <h2 className="text-h2 font-display text-foreground">Feed</h2>
            <PostCard
              id="post-1"
              author={{
                id: 'user-1',
                displayName: 'Sarah Chen',
                handle: 'sarah.chen',
                verificationLevel: 'verified+',
              }}
              content="Excited to finally be part of HIVE! This is my first light! 🔥"
              type="first_light"
              timestamp="5m ago"
              likes={12}
              comments={8}
              isLiked={false}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
            />
            <PostCard
              id="post-2"
              author={{
                id: 'user-2',
                displayName: 'Marcus Rodriguez',
                handle: 'marcus.r',
                verificationLevel: 'verified',
              }}
              content="Study group forming for CS 220! Anyone interested?"
              type="text"
              timestamp="1h ago"
              likes={5}
              comments={12}
              isLiked={true}
              space={{ id: 'cs-majors', name: 'CS Majors' }}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
            />
          </div>

          {/* Spaces */}
          <div className="space-y-4">
            <h2 className="text-h2 font-display text-foreground">Spaces</h2>
            <SpaceCard
              id="cs-majors"
              name="CS Majors"
              description="Connect with fellow Computer Science students."
              type="academic"
              status="active"
              memberCount={234}
              upcomingEvents={3}
              recentActivity="Hackathon planning"
              leaders={[{ id: '1', name: 'Sarah Chen' }]}
              isJoined={false}
              onJoin={fn()}
            />
            <SpaceCard
              id="ellicott"
              name="Ellicott Complex"
              description="Connect with your dorm neighbors."
              type="residential"
              status="active"
              memberCount={892}
              upcomingEvents={5}
              recentActivity="Movie night Friday"
              isJoined={true}
              onViewSpace={fn()}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery view of all HIVE components working together',
      },
    },
  },
};