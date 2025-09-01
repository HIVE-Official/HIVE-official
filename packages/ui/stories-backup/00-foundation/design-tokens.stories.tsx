import type { Meta, StoryObj } from '@storybook/react';

// Mock component for Storybook CSF compliance
const DesignTokensFoundation = () => <div>Design Tokens Foundation</div>;

const meta: Meta<typeof DesignTokensFoundation> = {
  title: '00-Foundation/Design Tokens',
  component: DesignTokensFoundation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Design Tokens

Complete semantic token system powering the HIVE platform design system.

## Token Categories

### Colors
- **Brand Colors**: Primary blue (#0070F3), secondary gold (#FFD700)
- **Surface Colors**: Background, foreground, and surface variations
- **Text Colors**: Primary, secondary, tertiary, and disabled states
- **Status Colors**: Success, warning, error, and info states
- **Border Colors**: Default, muted, and interactive borders

### Typography
- **Font Families**: Sans, mono, and display fonts
- **Font Sizes**: 12px to 48px responsive scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: Optimized for readability and density

### Spacing
- **Scale**: 4px base unit (0.25rem) with powers of 2
- **Breakpoints**: Mobile-first responsive design
- **Layout**: Container, section, and component spacing

### Elevation
- **Shadows**: Subtle depth for cards and overlays
- **Z-Index**: Layering system for modals, dropdowns, and overlays

## Usage Guidelines

All HIVE components use semantic tokens exclusively. Never use hardcoded values.

**Good**: \`var(--hive-brand-primary)\`
**Bad**: \`#0070F3\`

This ensures consistency, theming support, and maintainability across the platform.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const ColorTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Brand Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-brand-primary)] rounded-lg border"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Primary</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-brand-primary</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-brand-secondary)] rounded-lg border"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Secondary</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-brand-secondary</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-brand-hover)] rounded-lg border"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Hover</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-brand-hover</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-interactive-focus)] rounded-lg border"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Focus</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-interactive-focus</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Surface Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-background-primary)] border rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Background Primary</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-background-primary</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-background-secondary)] border rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Background Secondary</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-background-secondary</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-background-tertiary)] border rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Background Tertiary</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-background-tertiary</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Status Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-status-success)] rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Success</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-status-success</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-status-warning)] rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Warning</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-status-warning</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-status-error)] rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Error</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-status-error</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-[var(--hive-status-info)] rounded-lg"></div>
            <div className="text-sm">
              <div className="font-medium text-[var(--hive-text-primary)]">Info</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-xs">--hive-status-info</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete color token system with semantic naming for consistent theming.',
      },
    },
  },
};

export const TypographyTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Text Colors</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[var(--hive-text-primary)] rounded border"></div>
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Primary Text</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-sm">--hive-text-primary</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[var(--hive-text-secondary)] rounded border"></div>
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Secondary Text</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-sm">--hive-text-secondary</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[var(--hive-text-tertiary)] rounded border"></div>
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Tertiary Text</div>
              <div className="text-[var(--hive-text-secondary)] font-mono text-sm">--hive-text-tertiary</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Typography Scale</h3>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-[var(--hive-text-primary)]">Display Large (36px)</div>
          <div className="text-3xl font-semibold text-[var(--hive-text-primary)]">Heading 1 (30px)</div>
          <div className="text-2xl font-semibold text-[var(--hive-text-primary)]">Heading 2 (24px)</div>
          <div className="text-xl font-semibold text-[var(--hive-text-primary)]">Heading 3 (20px)</div>
          <div className="text-lg font-medium text-[var(--hive-text-primary)]">Heading 4 (18px)</div>
          <div className="text-base text-[var(--hive-text-primary)]">Body Large (16px)</div>
          <div className="text-sm text-[var(--hive-text-secondary)]">Body Small (14px)</div>
          <div className="text-xs text-[var(--hive-text-tertiary)]">Caption (12px)</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Font Weights</h3>
        <div className="space-y-2">
          <div className="text-lg font-normal text-[var(--hive-text-primary)]">Normal (400)</div>
          <div className="text-lg font-medium text-[var(--hive-text-primary)]">Medium (500)</div>
          <div className="text-lg font-semibold text-[var(--hive-text-primary)]">Semibold (600)</div>
          <div className="text-lg font-bold text-[var(--hive-text-primary)]">Bold (700)</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography system with semantic text colors and consistent scale.',
      },
    },
  },
};

export const SpacingTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Spacing Scale</h3>
        <div className="space-y-4">
          {[
            { size: '0.25rem', name: '1', class: 'w-1' },
            { size: '0.5rem', name: '2', class: 'w-2' },
            { size: '0.75rem', name: '3', class: 'w-3' },
            { size: '1rem', name: '4', class: 'w-4' },
            { size: '1.25rem', name: '5', class: 'w-5' },
            { size: '1.5rem', name: '6', class: 'w-6' },
            { size: '2rem', name: '8', class: 'w-8' },
            { size: '3rem', name: '12', class: 'w-12' },
            { size: '4rem', name: '16', class: 'w-16' },
            { size: '6rem', name: '24', class: 'w-24' },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className={`${item.class} h-6 bg-[var(--hive-brand-primary)] rounded`}></div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">Space {item.name}</div>
                <div className="text-[var(--hive-text-secondary)] font-mono text-sm">{item.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Consistent spacing scale based on 4px (0.25rem) units.',
      },
    },
  },
};

export const BorderRadiusTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Border Radius Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'None', class: 'rounded-none', value: '0px' },
            { name: 'Small', class: 'rounded-sm', value: '2px' },
            { name: 'Default', class: 'rounded', value: '4px' },
            { name: 'Medium', class: 'rounded-md', value: '6px' },
            { name: 'Large', class: 'rounded-lg', value: '8px' },
            { name: 'XLarge', class: 'rounded-xl', value: '12px' },
            { name: '2XLarge', class: 'rounded-2xl', value: '16px' },
            { name: 'Full', class: 'rounded-full', value: '9999px' },
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <div className={`w-full h-16 bg-[var(--hive-surface-primary)] border ${item.class}`}></div>
              <div className="text-sm">
                <div className="font-medium text-[var(--hive-text-primary)]">{item.name}</div>
                <div className="text-[var(--hive-text-secondary)] font-mono text-xs">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Border radius system from sharp to fully rounded corners.',
      },
    },
  },
};

export const ElevationTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Shadow Elevation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Small', class: 'shadow-sm', description: 'Subtle depth for buttons and inputs' },
            { name: 'Default', class: 'shadow', description: 'Standard cards and components' },
            { name: 'Medium', class: 'shadow-md', description: 'Elevated panels and dropdowns' },
            { name: 'Large', class: 'shadow-lg', description: 'Modals and important overlays' },
            { name: 'XLarge', class: 'shadow-xl', description: 'Major floating elements' },
            { name: '2XLarge', class: 'shadow-2xl', description: 'Maximum elevation for focus' },
          ].map((item) => (
            <div key={item.name} className="space-y-3">
              <div className={`w-full h-24 bg-[var(--hive-background-secondary)] border rounded-lg ${item.class}`}></div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">{item.name}</div>
                <div className="text-[var(--hive-text-secondary)] text-sm">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Elevation system using shadows to create visual hierarchy.',
      },
    },
  },
};

export const MotionTokens: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">Motion System</h3>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          HIVE's motion system creates campus-first animations that feel responsive and premium.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Duration Tokens */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Duration Tokens</h4>
            <div className="space-y-3">
              {[
                { name: 'Fast', value: '150ms', token: '--hive-duration-fast', desc: 'Micro-interactions' },
                { name: 'Base', value: '200ms', token: '--hive-duration-base', desc: 'Standard transitions' },
                { name: 'Slow', value: '300ms', token: '--hive-duration-slow', desc: 'Modal appearances' },
                { name: 'Slower', value: '500ms', token: '--hive-duration-slower', desc: 'Complex changes' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded border">
                  <div>
                    <div className="font-medium text-[var(--hive-text-primary)]">{item.name}</div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">{item.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-[var(--hive-text-primary)]">{item.value}</div>
                    <div className="font-mono text-xs text-[var(--hive-text-secondary)]">{item.token}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Easing Tokens */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Easing Functions</h4>
            <div className="space-y-3">
              {[
                { name: 'Ease Out', value: 'cubic-bezier(0.0, 0.0, 0.2, 1)', token: '--hive-ease-out', desc: 'Natural deceleration' },
                { name: 'Ease In-Out', value: 'cubic-bezier(0.4, 0.0, 0.2, 1)', token: '--hive-ease-in-out', desc: 'Symmetric motion' },
                { name: 'Ease Smooth', value: 'cubic-bezier(0.4, 0.0, 0.6, 1)', token: '--hive-ease-smooth', desc: 'HIVE signature' },
              ].map((item) => (
                <div key={item.name} className="p-3 bg-[var(--hive-background-secondary)] rounded border">
                  <div className="font-medium text-[var(--hive-text-primary)]">{item.name}</div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-2">{item.desc}</div>
                  <div className="font-mono text-xs text-[var(--hive-text-tertiary)]">{item.token}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Liquid Metal Motion */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Liquid Metal Motion</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Subtle', token: '--hive-liquid-subtle', desc: 'Gentle premium feel' },
              { name: 'Smooth', token: '--hive-liquid-smooth', desc: 'Fluid major transitions' },
              { name: 'Bouncy', token: '--hive-liquid-bouncy', desc: 'Playful positive feedback' },
            ].map((item) => (
              <div key={item.name} className="p-3 bg-[var(--hive-background-secondary)] rounded border">
                <div className="font-medium text-[var(--hive-text-primary)]">{item.name}</div>
                <div className="text-sm text-[var(--hive-text-secondary)] mb-2">{item.desc}</div>
                <div className="font-mono text-xs text-[var(--hive-text-tertiary)]">{item.token}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg border-l-4 border-[var(--hive-brand-primary)]">
          <p className="text-sm text-[var(--hive-text-secondary)]">
            <strong className="text-[var(--hive-text-primary)]">Pro Tip:</strong> For interactive motion examples and detailed usage, 
            check the dedicated <strong>Motion System</strong> story in the Foundation section.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete motion token system with durations, easing functions, and HIVE Liquid Metal Motion.',
      },
    },
  },
};