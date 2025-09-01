import type { Meta, StoryObj } from '@storybook/react'

const ColorSystem = () => (
  <div className="bg-background p-8 space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">HIVE Color System</h2>
      <p className="text-muted mb-8">Our monochromatic foundation with strategic gold accents creates sophistication with purposeful moments of celebration.</p>
    </div>
  </div>
)

const meta: Meta<typeof ColorSystem> = {
  component: ColorSystem,
  title: '🏛️ Foundation/Colors',
  parameters: {
    docs: {
      description: {
        component: 'HIVE color system with strategic gold accent usage. Minimal surface, maximal spark.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ColorSystem>

const ColorSwatch = ({ color, name, hex, usage }: { 
  color: string
  name: string
  hex: string
  usage: string
}) => (
  <div className="space-y-3">
    <div 
      className="w-full h-24 rounded-lg border border-border"
      style={{ backgroundColor: color }}
    />
    <div>
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="text-sm text-muted font-mono">{hex}</p>
      <p className="text-xs text-muted/70 mt-1">{usage}</p>
    </div>
  </div>
)

export const ColorPalette: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">HIVE Color System</h2>
        <p className="text-muted mb-8">Our monochromatic foundation with strategic gold accents creates sophistication with purposeful moments of celebration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ColorSwatch
          color="#0A0A0A"
          name="Primary Black"
          hex="#0A0A0A"
          usage="Main background, primary surfaces"
        />
        <ColorSwatch
          color="#111111"
          name="Surface"
          hex="#111111"
          usage="Cards, elevated elements"
        />
        <ColorSwatch
          color="#2A2A2A"
          name="Border"
          hex="#2A2A2A"
          usage="Subtle divisions, component borders"
        />
        <ColorSwatch
          color="#FFD700"
          name="Gold Accent"
          hex="#FFD700"
          usage="Focus rings, achievements, highlights"
        />
        <ColorSwatch
          color="#6B7280"
          name="Muted Text"
          hex="#6B7280"
          usage="Secondary text, descriptions"
        />
      </div>

      <div className="border border-accent rounded-xl p-6 bg-accent/5">
        <h3 className="text-lg font-semibold text-white mb-4">Gold Usage Strategy</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-accent font-medium mb-2">✅ DO Use Gold For:</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Focus rings on interactive elements</li>
              <li>• Hover/click borders on buttons and cards</li>
              <li>• Success states and achievements</li>
              <li>• Active states in tabs and selections</li>
              <li>• Special/elevated component variants</li>
            </ul>
          </div>
          <div>
            <h4 className="text-red-400 font-medium mb-2">❌ DON'T Use Gold For:</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Large surface areas or backgrounds</li>
              <li>• Default states or decorative elements</li>
              <li>• Primary text color (except special cases)</li>
              <li>• Overuse that diminishes impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DesignTokens: Story = {
  render: () => (
    <div className="bg-background p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Design Tokens</h2>
      
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">CSS Custom Properties</h3>
          <pre className="text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto">
{`:root {
  /* Colors */
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-border: #2A2A2A;
  --color-accent: #FFD700;
  --color-muted: #6B7280;
  
  /* Motion */
  --motion-curve: cubic-bezier(0.33, 0.65, 0, 1);
  --motion-duration: 180ms;
}`}
          </pre>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Tailwind Classes</h3>
          <pre className="text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto">
{`/* Color Classes */
bg-background     /* #0A0A0A */
bg-surface        /* #111111 */
border-border     /* #2A2A2A */
border-accent     /* #FFD700 */
text-muted        /* #6B7280 */

/* Motion Classes */
duration-[180ms]
ease-[cubic-bezier(0.33,0.65,0,1)]`}
          </pre>
        </div>
      </div>
    </div>
  )
}