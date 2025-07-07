import type { Meta, StoryObj } from '@storybook/react';
import { 
  PostCard, 
  PostCardCompact, 
  PostCardDetailed, 
  PostCardMinimal,
  SpaceCard,
  SpaceCardPreview,
  SpaceCardGrid,
  RitualCard,
  RitualCardCelebration,
  RitualCardCountdown
} from '../components';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'HIVE/Component Variations',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Component Design Library

**Multiple design options for every component type**

This library showcases different design approaches for each component, giving developers and designers options to choose the right variant for their specific use case.

## 🎨 **Design Philosophy: Options with Purpose**

Each variation serves a specific purpose:
- **Compact**: High-density layouts, mobile-first
- **Detailed**: Rich information display, desktop focus  
- **Minimal**: Clean, distraction-free presentation
- **Preview**: Anticipatory states and upcoming features
- **Grid**: Space-efficient browsing experiences
- **Celebration**: Achievement moments and ritual completion
- **Countdown**: Time-sensitive engagement and urgency

## ✅ **HIVE Brand Consistency**

All variations maintain:
- Monochrome + Gold color system
- 180ms timing with cubic-bezier curves
- Surface hierarchy and proper elevation
- Campus energy adaptation
- Accessibility compliance

## 🚀 **Usage Guidelines**

Choose variants based on:
- **Context**: Where will this component live?
- **Density**: How much information needs to be displayed?
- **Interaction**: What actions should users take?
- **Energy**: What's the emotional tone needed?
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
  bio: 'CS Major, Building the future of campus connection',
  yearLevel: 'Junior',
};

const sampleSpace = {
  id: 'cs-majors',
  name: 'CS Majors',
  memberCount: 234,
  type: 'academic' as const,
};

const sampleEngagement = {
  recentLikes: [
    { id: '1', name: 'Alex Kim', avatarUrl: undefined },
    { id: '2', name: 'Marcus Rodriguez', avatarUrl: undefined },
    { id: '3', name: 'Jessica Wang', avatarUrl: undefined },
  ],
  topComments: [
    { id: '1', author: 'Alex Kim', content: 'This is so helpful!' },
  ],
};

export const PostCardVariations: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-display text-foreground">Post Card Variations</h1>
          <p className="text-muted max-w-3xl mx-auto">
            Four different approaches to displaying social content, each optimized for specific use cases and layouts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Original Post Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Original - Balanced</h3>
            <p className="text-caption text-muted">Standard social feed component with all essential features</p>
            <PostCard
              id="post-1"
              author={sampleAuthor}
              content="Just discovered the most amazing study spot in the library! Third floor, window seats overlooking the quad. Perfect for those late-night coding sessions ☕️"
              type="text"
              timestamp="2h ago"
              likes={23}
              comments={5}
              isLiked={false}
              space={sampleSpace}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
            />
          </div>

          {/* Compact Post Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Compact - High Density</h3>
            <p className="text-caption text-muted">Streamlined for mobile and tight spaces with accent left border</p>
            <PostCardCompact
              id="post-2"
              author={sampleAuthor}
              content="Anyone else staying on campus this summer? Let's organize some study groups and social events!"
              type="text"
              timestamp="1h ago"
              likes={12}
              comments={8}
              isLiked={true}
              space={sampleSpace}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
            />
          </div>

          {/* Detailed Post Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Detailed - Rich Context</h3>
            <p className="text-caption text-muted">Maximum information display with engagement preview and expanded author info</p>
            <PostCardDetailed
              id="post-3"
              author={sampleAuthor}
              content="Excited to finally be part of HIVE! Looking forward to connecting with fellow CS majors and building something amazing together. This is my first light! 🔥"
              type="first_light"
              timestamp="5m ago"
              likes={45}
              comments={12}
              shares={3}
              isLiked={false}
              space={sampleSpace}
              engagement={sampleEngagement}
              onLike={fn()}
              onComment={fn()}
              onShare={fn()}
              onBookmark={fn()}
              onViewSpace={fn()}
              onViewProfile={fn()}
            />
          </div>

          {/* Minimal Post Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Minimal - Clean Focus</h3>
            <p className="text-caption text-muted">Distraction-free reading with subtle borders and compact actions</p>
            <PostCardMinimal
              id="post-4"
              author={sampleAuthor}
              content="Quick reminder: CS 220 study group meets tomorrow at 3pm in the library. We'll be covering recursion and dynamic programming!"
              type="text"
              timestamp="30m ago"
              likes={8}
              comments={3}
              isLiked={false}
              onLike={fn()}
              onComment={fn()}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all post card variations showcasing different approaches to content density and visual hierarchy',
      },
    },
  },
};

export const SpaceCardVariations: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-display text-foreground">Space Card Variations</h1>
          <p className="text-muted max-w-3xl mx-auto">
            Three different approaches to community discovery, from preview states to grid layouts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Original Space Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Original - Standard</h3>
            <p className="text-caption text-muted">Balanced information display for active spaces</p>
            <SpaceCard
              id="cs-majors"
              name="CS Majors"
              description="Connect with fellow Computer Science students, share resources, discuss coursework, and collaborate on projects."
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

          {/* Preview Space Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Preview - Anticipatory</h3>
            <p className="text-caption text-muted">For dormant spaces awaiting activation with potential metrics</p>
            <SpaceCardPreview
              id="physics-majors"
              name="Physics Majors"
              description="Connect with fellow Physics students, discuss research opportunities, share study resources, and collaborate on lab projects."
              type="academic"
              potentialMembers={892}
              anticipatedEvents={5}
              category="STEM Academic"
              keywords={['Research', 'Labs', 'Study Groups', 'Quantum', 'Astronomy']}
              onRequestActivation={fn()}
              onLearnMore={fn()}
            />
          </div>

          {/* Grid Space Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Grid - Compact</h3>
            <p className="text-caption text-muted">Space-efficient browsing with activity indicators</p>
            <SpaceCardGrid
              id="ellicott-complex"
              name="Ellicott Complex"
              description="Home to over 2,000 students! Connect with your neighbors, organize floor events, and make the most of dorm life."
              type="residential"
              status="active"
              memberCount={1247}
              upcomingEvents={7}
              recentActivity="Movie night this Friday"
              activityLevel="high"
              leaders={[
                { id: '1', name: 'Jessica Wang' },
                { id: '2', name: 'David Park' },
              ]}
              isJoined={true}
              onJoin={fn()}
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
        story: 'Comparison of space card variations for different contexts: standard active spaces, preview mode, and grid layouts',
      },
    },
  },
};

export const RitualCardVariations: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-display text-foreground">Ritual Card Variations</h1>
          <p className="text-muted max-w-3xl mx-auto">
            Three different approaches to campus ritual engagement, from standard participation to celebration moments.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Original Ritual Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Original - Standard</h3>
            <p className="text-caption text-muted">Clean ritual participation interface</p>
            <RitualCard
              id="ritual-1"
              title="Light Your Flame"
              description="Begin your HIVE journey with your first public words."
              type="first_light"
              participantCount={127}
              isActive={true}
              hasParticipated={false}
              onParticipate={fn()}
            />
          </div>

          {/* Celebration Ritual Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Celebration - Achievement</h3>
            <p className="text-caption text-muted">Enhanced feedback with particle effects and completion states</p>
            <RitualCardCelebration
              id="ritual-2"
              title="Pass the Torch"
              description="Share invitation torches with fellow students to help build our campus community."
              type="torch_pass"
              participantCount={89}
              timeRemaining="2 days"
              isActive={true}
              hasParticipated={true}
              celebrationMoment={true}
              onParticipate={fn()}
            />
          </div>

          {/* Countdown Ritual Card */}
          <div className="space-y-3">
            <h3 className="text-h3 font-display text-foreground">Countdown - Urgency</h3>
            <p className="text-caption text-muted">Time-sensitive engagement with live countdown and urgency indicators</p>
            <RitualCardCountdown
              id="ritual-3"
              title="Campus Vibe Check"
              description="Share what's happening on campus right now. Help us capture the current energy and mood."
              type="wave"
              participantCount={312}
              startTime={new Date(Date.now() - 1000 * 60 * 60)} // Started 1 hour ago
              endTime={new Date(Date.now() + 1000 * 60 * 60 * 6)} // Ends in 6 hours
              isActive={true}
              hasParticipated={false}
              urgencyLevel="high"
              onParticipate={fn()}
              onSetReminder={fn()}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of ritual card variations for different engagement contexts and emotional states',
      },
    },
  },
};

export const DesignLibraryShowcase: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-display font-display text-foreground">
            HIVE Component Design Library
          </h1>
          <p className="text-body text-muted max-w-4xl mx-auto leading-relaxed">
            A comprehensive collection of component variations designed for campus energy and student connection. 
            Each variant serves specific use cases while maintaining brand consistency and accessibility standards.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-h2 font-display text-accent">12</div>
              <div className="text-caption text-muted">Component Variations</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-display text-accent">3</div>
              <div className="text-caption text-muted">Core Categories</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-display text-accent">100%</div>
              <div className="text-caption text-muted">Brand Compliant</div>
            </div>
          </div>
        </div>

        {/* Component Grid */}
        <div className="space-y-12">
          {/* Posts Section */}
          <section>
            <h2 className="text-h2 font-display text-foreground mb-6">Social Feed Components</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">Standard</h4>
                <PostCard
                  id="showcase-1"
                  author={{...sampleAuthor, displayName: 'Alex'}}
                  content="Building something amazing with HIVE!"
                  type="text"
                  timestamp="1h"
                  likes={12}
                  comments={3}
                  isLiked={false}
                  onLike={fn()}
                  onComment={fn()}
                  onShare={fn()}
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">Compact</h4>
                <PostCardCompact
                  id="showcase-2"
                  author={{...sampleAuthor, displayName: 'Sarah'}}
                  content="Study group forming for finals!"
                  type="text"
                  timestamp="30m"
                  likes={8}
                  comments={5}
                  isLiked={true}
                  onLike={fn()}
                  onComment={fn()}
                  onShare={fn()}
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">Detailed</h4>
                <PostCardDetailed
                  id="showcase-3"
                  author={{...sampleAuthor, displayName: 'Marcus'}}
                  content="My first light moment! 🔥"
                  type="first_light"
                  timestamp="5m"
                  likes={23}
                  comments={7}
                  isLiked={false}
                  onLike={fn()}
                  onComment={fn()}
                  onShare={fn()}
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">Minimal</h4>
                <PostCardMinimal
                  id="showcase-4"
                  author={{...sampleAuthor, displayName: 'Jessica'}}
                  content="Quick reminder about today's event"
                  type="text"
                  timestamp="2h"
                  likes={5}
                  comments={1}
                  isLiked={false}
                  onLike={fn()}
                  onComment={fn()}
                />
              </div>
            </div>
          </section>

          {/* Note about the comprehensive nature */}
          <div className="text-center p-6 bg-surface border border-border rounded-lg">
            <p className="text-muted font-body">
              <strong>Design Philosophy:</strong> Each variation maintains HIVE's "Minimal Surface. Maximal Spark" philosophy 
              while optimizing for different contexts, information density, and user goals. All components are built with 
              accessibility, performance, and campus energy in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of the HIVE component design library with all variations and their use cases',
      },
    },
  },
};