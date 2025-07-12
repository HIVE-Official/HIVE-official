import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: '🏛️ Foundation/Typography',
  parameters: {
    docs: {
      description: {
        component: 'HIVE typography system using Space Grotesk for display and Geist Sans for body text.'
      }
    }
  }
}

export default meta
type Story = StoryObj

const TypeScale = ({ 
  size, 
  weight, 
  font, 
  usage, 
  className 
}: { 
  size: string
  weight: string
  font: string
  usage: string
  className: string
}) => (
  <div className="border border-border rounded-lg p-6 space-y-3">
    <div className={className}>
      The quick brown fox jumps over the lazy dog
    </div>
    <div className="space-y-1">
      <div className="text-sm font-mono text-accent">{size} • {weight}</div>
      <div className="text-xs text-muted">{font}</div>
      <div className="text-xs text-muted/70">{usage}</div>
    </div>
  </div>
)

export const TypeSystem: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">HIVE Typography</h1>
        <p className="text-lg text-muted mb-6">
          Our typography system creates hierarchy and rhythm that reflects the energy of campus life.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Display & Headlines</h2>
          <div className="space-y-4">
            <TypeScale
              size="4xl"
              weight="bold"
              font="Space Grotesk"
              usage="Hero headlines, major section headers"
              className="text-4xl font-bold text-white"
            />
            <TypeScale
              size="3xl"
              weight="bold"
              font="Space Grotesk"
              usage="Page titles, modal headers"
              className="text-3xl font-bold text-white"
            />
            <TypeScale
              size="2xl"
              weight="semibold"
              font="Space Grotesk"
              usage="Section headers, card titles"
              className="text-2xl font-semibold text-white"
            />
            <TypeScale
              size="xl"
              weight="semibold"
              font="Space Grotesk"
              usage="Component headers, large buttons"
              className="text-xl font-semibold text-white"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Body Text</h2>
          <div className="space-y-4">
            <TypeScale
              size="lg"
              weight="medium"
              font="Geist Sans"
              usage="Large body text, important content"
              className="text-lg font-medium text-white"
            />
            <TypeScale
              size="base"
              weight="normal"
              font="Geist Sans"
              usage="Default body text, paragraphs"
              className="text-base text-white"
            />
            <TypeScale
              size="sm"
              weight="normal"
              font="Geist Sans"
              usage="Captions, secondary text"
              className="text-sm text-muted"
            />
            <TypeScale
              size="xs"
              weight="normal"
              font="Geist Sans"
              usage="Labels, metadata, timestamps"
              className="text-xs text-muted"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Code & Mono</h2>
          <div className="space-y-4">
            <TypeScale
              size="sm"
              weight="normal"
              font="Geist Mono"
              usage="Code snippets, design tokens"
              className="text-sm font-mono text-accent bg-surface/50 px-2 py-1 rounded"
            />
          </div>
        </div>
      </div>

      <div className="border border-accent rounded-xl p-6 bg-accent/5">
        <h3 className="text-lg font-semibold text-white mb-4">Typography Principles</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-accent font-medium mb-2">Hierarchy</h4>
            <p className="text-sm text-muted">
              Clear visual hierarchy guides users through content naturally.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Readability</h4>
            <p className="text-sm text-muted">
              Optimized for screen reading with appropriate contrast and spacing.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Personality</h4>
            <p className="text-sm text-muted">
              Space Grotesk brings modern, technical personality to headlines.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Performance</h4>
            <p className="text-sm text-muted">
              System fonts ensure fast loading and consistent rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CampusContent: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">CS Study Group</h1>
        <p className="text-muted">Active • 47 members • Engineering</p>
      </div>

      <div className="space-y-6">
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Data Structures Midterm Prep</h2>
          <p className="text-muted mb-4">Tomorrow • 7:00 PM • Library Study Room B</p>
          <p className="text-white leading-relaxed">
            Join us for our weekly study session! We'll be covering binary trees, hash tables, 
            and graph algorithms. Bring your laptops and practice problems.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">algorithms</span>
            <span className="text-xs bg-surface text-muted px-2 py-1 rounded">study-group</span>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-semibold text-black">
              M
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white">maya_codes</span>
                <span className="text-xs text-muted">CS '25</span>
                <span className="text-xs text-muted">•</span>
                <span className="text-xs text-muted">2 hours ago</span>
              </div>
              <p className="text-white leading-relaxed">
                Does anyone have notes from today's lecture on AVL trees? I missed the rotation examples 😅
              </p>
              <div className="mt-3 flex gap-4 text-sm text-muted">
                <button className="hover:text-accent transition-colors">Reply</button>
                <button className="hover:text-accent transition-colors">React</button>
                <span>3 replies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted">Showing 1-5 of 23 posts</p>
        <button className="text-accent hover:text-accent/80 transition-colors text-sm">
          Load more posts
        </button>
      </div>
    </div>
  )
}