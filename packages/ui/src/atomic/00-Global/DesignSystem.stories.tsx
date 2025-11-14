'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from './atoms/button';
import { Input } from './atoms/input';
import { Card } from './atoms/card';
import { Badge } from './atoms/badge';
import { Avatar } from './atoms/avatar';
import { Progress } from './atoms/progress';
import { Skeleton } from './atoms/skeleton';
import { Alert } from './atoms/alert';

const meta = {
  title: '00-Global/Design System Foundation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Design System - Vercel-inspired monochrome with single gold accent. Mobile-first, 4px grid, production-ready tokens.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== COLOR PALETTE =====

export const Colors_GrayScale: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Color System</h1>
      <p className="text-muted-foreground mb-8">Vercel-inspired monochrome foundation with single gold accent</p>

      <div className="space-y-8">
        {/* Gray Scale */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Gray Scale (Monochrome Foundation)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-black rounded-lg border border-gray-700 mb-2"></div>
              <p className="text-sm font-mono">black</p>
              <p className="text-xs text-muted-foreground">#000000</p>
            </div>
            <div>
              <div className="h-24 bg-gray-900 rounded-lg border border-gray-700 mb-2"></div>
              <p className="text-sm font-mono">gray-900</p>
              <p className="text-xs text-muted-foreground">#171717</p>
            </div>
            <div>
              <div className="h-24 bg-gray-800 rounded-lg border border-gray-700 mb-2"></div>
              <p className="text-sm font-mono">gray-800</p>
              <p className="text-xs text-muted-foreground">#262626</p>
            </div>
            <div>
              <div className="h-24 bg-gray-700 rounded-lg border border-gray-600 mb-2"></div>
              <p className="text-sm font-mono">gray-700</p>
              <p className="text-xs text-muted-foreground">#404040</p>
            </div>
            <div>
              <div className="h-24 bg-gray-600 rounded-lg border border-gray-500 mb-2"></div>
              <p className="text-sm font-mono">gray-600</p>
              <p className="text-xs text-muted-foreground">#525252</p>
            </div>
            <div>
              <div className="h-24 bg-gray-400 rounded-lg border border-gray-300 mb-2"></div>
              <p className="text-sm font-mono">gray-400</p>
              <p className="text-xs text-muted-foreground">#A3A3A3</p>
            </div>
            <div>
              <div className="h-24 bg-gray-200 rounded-lg border border-gray-300 mb-2"></div>
              <p className="text-sm font-mono">gray-200</p>
              <p className="text-xs text-muted-foreground">#E5E5E5</p>
            </div>
            <div>
              <div className="h-24 bg-white rounded-lg border border-gray-300 mb-2"></div>
              <p className="text-sm font-mono">white</p>
              <p className="text-xs text-muted-foreground">#FFFFFF</p>
            </div>
          </div>
        </div>

        {/* Gold Accent */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Gold Accent (Brand Primary)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="h-24 bg-[#FFD700] rounded-lg mb-2"></div>
              <p className="text-sm font-mono">gold-500</p>
              <p className="text-xs text-muted-foreground">#FFD700 - Primary gold</p>
            </div>
            <div className="md:col-span-2">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Usage Guidelines</h3>
                <ul className="text-sm space-y-1">
                  <li>✅ Primary CTAs (Join Space, Create Tool, Start Ritual)</li>
                  <li>✅ Achievement moments (Ritual completion, level up)</li>
                  <li>✅ Online presence indicators</li>
                  <li>✅ Featured content badges</li>
                  <li>❌ NOT for hover states (use white/grayscale)</li>
                  <li>❌ NOT for focus rings (use white)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Colors */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Semantic Colors (Status)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-green-500 rounded-lg mb-2"></div>
              <p className="text-sm font-mono">green-500</p>
              <p className="text-xs text-muted-foreground">#00D46A - Success</p>
            </div>
            <div>
              <div className="h-24 bg-yellow-500 rounded-lg mb-2"></div>
              <p className="text-sm font-mono">yellow-500</p>
              <p className="text-xs text-muted-foreground">#FFB800 - Warning</p>
            </div>
            <div>
              <div className="h-24 bg-red-500 rounded-lg mb-2"></div>
              <p className="text-sm font-mono">red-500</p>
              <p className="text-xs text-muted-foreground">#FF3737 - Error</p>
            </div>
            <div>
              <div className="h-24 bg-blue-600 rounded-lg mb-2"></div>
              <p className="text-sm font-mono">blue-600</p>
              <p className="text-xs text-muted-foreground">#0070F3 - Info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ===== TYPOGRAPHY =====

export const Typography_Scale: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Typography System</h1>
      <p className="text-muted-foreground mb-8">Mobile-optimized type scale with Geist Sans and Space Grotesk</p>

      <div className="space-y-12">
        {/* Display Scale */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Display Scale (Hero/Marketing)</h2>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-display-2xl font-bold">Display 2XL - Hero Headlines</p>
              <p className="text-xs text-muted-foreground mt-1">40px / 2.5rem - font-bold</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-display-xl font-bold">Display XL - Large Headlines</p>
              <p className="text-xs text-muted-foreground mt-1">36px / 2.25rem - font-bold</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-display-lg font-bold">Display LG - Section Headlines</p>
              <p className="text-xs text-muted-foreground mt-1">32px / 2rem - font-bold</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-display-md font-semibold">Display MD - Page Titles</p>
              <p className="text-xs text-muted-foreground mt-1">28px / 1.75rem - font-semibold</p>
            </div>
          </div>
        </div>

        {/* Heading Scale */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Heading Scale</h2>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <p className="text-heading-xl font-semibold">Heading XL - Main Headings</p>
              <p className="text-xs text-muted-foreground mt-1">20px / 1.25rem - font-semibold</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-heading-lg font-semibold">Heading LG - Section Headings</p>
              <p className="text-xs text-muted-foreground mt-1">18px / 1.125rem - font-semibold</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-heading-md font-medium">Heading MD - Subsection Headings</p>
              <p className="text-xs text-muted-foreground mt-1">16px / 1rem - font-medium</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-heading-sm font-medium">Heading SM - Small Headings</p>
              <p className="text-xs text-muted-foreground mt-1">14px / 0.875rem - font-medium</p>
            </div>
          </div>
        </div>

        {/* Body Scale */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Body Scale</h2>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <p className="text-body-lg">Body LG - Large body text for readability</p>
              <p className="text-xs text-muted-foreground mt-1">16px / 1rem - font-normal</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-body-md">Body MD - Standard body text (most common)</p>
              <p className="text-xs text-muted-foreground mt-1">14px / 0.875rem - font-normal</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-body-sm">Body SM - Small body text for metadata</p>
              <p className="text-xs text-muted-foreground mt-1">12px / 0.75rem - font-normal</p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <p className="text-body-xs">Body XS - Captions and labels</p>
              <p className="text-xs text-muted-foreground mt-1">10px / 0.625rem - font-normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ===== SPACING =====

export const Spacing_Grid: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Spacing System</h1>
      <p className="text-muted-foreground mb-8">Mobile-optimized 4px grid (base unit: 4px)</p>

      <div className="space-y-8">
        {/* Core Spacing */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Core 4px Grid</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { token: 'space-1', size: '4px', rem: '0.25rem', usage: 'Tight gaps, icon padding' },
              { token: 'space-2', size: '8px', rem: '0.5rem', usage: 'Small gaps, button padding' },
              { token: 'space-3', size: '12px', rem: '0.75rem', usage: 'Compact spacing' },
              { token: 'space-4', size: '16px', rem: '1rem', usage: 'Standard spacing (most common)' },
              { token: 'space-6', size: '24px', rem: '1.5rem', usage: 'Section gaps' },
              { token: 'space-8', size: '32px', rem: '2rem', usage: 'Large section gaps' },
              { token: 'space-12', size: '48px', rem: '3rem', usage: 'Major section spacing' },
              { token: 'space-16', size: '64px', rem: '4rem', usage: 'Hero spacing' },
            ].map((item) => (
              <div key={item.token} className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="bg-primary"
                    style={{
                      width: item.rem,
                      height: item.rem,
                    }}
                  />
                  <div>
                    <p className="text-sm font-mono">{item.token}</p>
                    <p className="text-xs text-muted-foreground">{item.size} / {item.rem}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{item.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing Example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Spacing in Practice</h2>
          <div className="p-6 border border-border rounded-lg space-y-4">
            <div className="space-y-1">
              <div className="h-8 bg-primary rounded" />
              <p className="text-xs text-muted-foreground">space-1 gap (4px) - Tight</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-primary rounded" />
              <div className="h-8 bg-primary rounded" />
              <p className="text-xs text-muted-foreground">space-2 gap (8px) - Small</p>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-primary rounded" />
              <div className="h-8 bg-primary rounded" />
              <p className="text-xs text-muted-foreground">space-4 gap (16px) - Standard (most common)</p>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-primary rounded" />
              <div className="h-8 bg-primary rounded" />
              <p className="text-xs text-muted-foreground">space-6 gap (24px) - Section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ===== BORDER RADIUS =====

export const Radius_Scale: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Border Radius System</h1>
      <p className="text-muted-foreground mb-8">Heavy radius design for modern, friendly feel</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { name: 'radius-sm', value: '8px', usage: 'Small elements, badges' },
          { name: 'radius-md', value: '12px', usage: 'Standard elements, inputs' },
          { name: 'radius-lg', value: '16px', usage: 'Cards, buttons (most common)' },
          { name: 'radius-xl', value: '24px', usage: 'Large cards, modals' },
          { name: 'radius-2xl', value: '32px', usage: 'Hero elements' },
          { name: 'radius-full', value: '9999px', usage: 'Perfect circles, pills' },
        ].map((item) => (
          <div key={item.name} className="p-4 border border-border rounded-lg">
            <div
              className="h-24 bg-primary mb-3"
              style={{
                borderRadius: item.value,
              }}
            />
            <p className="text-sm font-mono">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.usage}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ===== MOTION =====

export const Motion_System: Story = {
  render: () => {
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="max-w-[1200px] mx-auto p-8">
        <h1 className="text-3xl font-bold mb-2">Motion System</h1>
        <p className="text-muted-foreground mb-8">Liquid metal motion - smooth, natural, performance-optimized</p>

        <div className="space-y-12">
          {/* Easing Curves */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Easing Curves</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Default (90% of animations)</h3>
                <p className="text-xs font-mono text-muted-foreground mb-3">cubic-bezier(0.23, 1, 0.32, 1)</p>
                <div
                  className="h-16 bg-primary rounded-lg transition-transform duration-300"
                  style={{
                    transform: hoveredId === 'default' ? 'translateX(20px)' : 'translateX(0)',
                    transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={() => setHoveredId('default')}
                  onMouseLeave={() => setHoveredId(null)}
                />
                <p className="text-xs text-muted-foreground mt-2">Smooth, natural (Vercel-inspired)</p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Snap (Quick feedback)</h3>
                <p className="text-xs font-mono text-muted-foreground mb-3">cubic-bezier(0.25, 0.1, 0.25, 1)</p>
                <div
                  className="h-16 bg-primary rounded-lg transition-transform duration-200"
                  style={{
                    transform: hoveredId === 'snap' ? 'translateX(20px)' : 'translateX(0)',
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  onMouseEnter={() => setHoveredId('snap')}
                  onMouseLeave={() => setHoveredId(null)}
                />
                <p className="text-xs text-muted-foreground mt-2">Quick, decisive (toggles, checkboxes)</p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Dramatic (Special moments)</h3>
                <p className="text-xs font-mono text-muted-foreground mb-3">cubic-bezier(0.165, 0.84, 0.44, 1)</p>
                <div
                  className="h-16 bg-primary rounded-lg transition-transform duration-500"
                  style={{
                    transform: hoveredId === 'dramatic' ? 'translateX(20px)' : 'translateX(0)',
                    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  onMouseEnter={() => setHoveredId('dramatic')}
                  onMouseLeave={() => setHoveredId(null)}
                />
                <p className="text-xs text-muted-foreground mt-2">Cinematic (achievements, rituals)</p>
              </div>
            </div>
          </div>

          {/* Duration Scale */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Duration Scale</h2>
            <div className="space-y-3">
              {[
                { name: 'instant', value: '0.1s', usage: 'Micro-interactions' },
                { name: 'quick', value: '0.2s', usage: 'Button press, toggle' },
                { name: 'smooth', value: '0.25s', usage: 'Hover states (most common)' },
                { name: 'liquid', value: '0.35s', usage: 'Card movements' },
                { name: 'flowing', value: '0.5s', usage: 'Layout changes' },
                { name: 'dramatic', value: '1.0s', usage: 'Space activation, major state change' },
              ].map((item) => (
                <div key={item.name} className="p-3 border border-border rounded-lg flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-mono">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value} - {item.usage}</p>
                  </div>
                  <div className="w-48 h-8 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${progress}%`,
                        transition: `width ${item.value} cubic-bezier(0.23, 1, 0.32, 1)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Example */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Interactive Motion Demo</h2>
            <div className="p-6 border border-border rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="default">Hover Me (Smooth)</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="default" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">Gold CTA</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ===== COMPONENT ATOMS =====

export const Atoms_Showcase: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Component Atoms</h1>
      <p className="text-muted-foreground mb-8">33 foundational atoms built with Radix UI + shadcn/ui</p>

      <div className="space-y-12">
        {/* Buttons */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button variant="default" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">Gold CTA</Button>
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input placeholder="Default input" />
            <Input placeholder="With icon" type="search" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Error state" className="border-red-500" />
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">Gold Badge</Badge>
            <Badge className="bg-green-500 text-white">Success</Badge>
            <Badge className="bg-yellow-500 text-black">Warning</Badge>
          </div>
        </div>

        {/* Avatars */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Avatars</h2>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=small" alt="Small" />
            </Avatar>
            <Avatar className="h-10 w-10">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=medium" alt="Medium" />
            </Avatar>
            <Avatar className="h-12 w-12">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=large" alt="Large" />
            </Avatar>
            <Avatar className="h-16 w-16">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=xlarge" alt="X-Large" />
            </Avatar>
          </div>
        </div>

        {/* Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-sm text-muted-foreground">Standard card with padding and border</p>
            </Card>
            <Card className="p-6 border-[#FFD700]">
              <h3 className="font-semibold mb-2">Gold Accent</h3>
              <p className="text-sm text-muted-foreground">Featured content with gold border</p>
            </Card>
            <Card className="p-6 bg-muted">
              <h3 className="font-semibold mb-2">Elevated</h3>
              <p className="text-sm text-muted-foreground">Secondary background for hierarchy</p>
            </Card>
          </div>
        </div>

        {/* Progress */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Progress Indicators</h2>
          <div className="space-y-4 max-w-2xl">
            <div>
              <p className="text-sm mb-2">25% Complete</p>
              <Progress value={25} />
            </div>
            <div>
              <p className="text-sm mb-2">50% Complete</p>
              <Progress value={50} />
            </div>
            <div>
              <p className="text-sm mb-2">75% Complete</p>
              <Progress value={75} />
            </div>
            <div>
              <p className="text-sm mb-2">100% Complete</p>
              <Progress value={100} />
            </div>
          </div>
        </div>

        {/* Skeletons */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Loading Skeletons</h2>
          <div className="space-y-4 max-w-2xl">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Alerts</h2>
          <div className="space-y-4 max-w-2xl">
            <Alert>
              <p className="text-sm">Default alert - informational message</p>
            </Alert>
            <Alert className="border-green-500 bg-green-500/10">
              <p className="text-sm text-green-700 dark:text-green-300">Success - operation completed successfully</p>
            </Alert>
            <Alert className="border-yellow-500 bg-yellow-500/10">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Warning - please review before continuing</p>
            </Alert>
            <Alert className="border-red-500 bg-red-500/10">
              <p className="text-sm text-red-700 dark:text-red-300">Error - something went wrong</p>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ===== COMPLETE ATOMS LIST =====

export const Atoms_Inventory: Story = {
  render: () => (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Complete Atoms Inventory</h1>
      <p className="text-muted-foreground mb-8">33 foundational components in packages/ui/src/atomic/00-Global/atoms/</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Alert', desc: 'Status messages, notifications', file: 'alert.tsx' },
          { name: 'Aria Live Region', desc: 'Screen reader announcements', file: 'aria-live-region.tsx' },
          { name: 'Avatar', desc: 'User profile pictures', file: 'avatar.tsx' },
          { name: 'Badge', desc: 'Labels, tags, status indicators', file: 'badge.tsx' },
          { name: 'Button', desc: 'Primary interactive element', file: 'button.tsx' },
          { name: 'Card', desc: 'Content containers', file: 'card.tsx' },
          { name: 'Check Icon', desc: 'Checkmark graphics', file: 'check-icon.tsx' },
          { name: 'Checkbox', desc: 'Boolean input', file: 'checkbox.tsx' },
          { name: 'Command', desc: 'Command palette (Cmd+K)', file: 'command.tsx' },
          { name: 'Context Menu', desc: 'Right-click menus', file: 'context-menu.tsx' },
          { name: 'Date Time Picker', desc: 'Date/time selection', file: 'date-time-picker.tsx' },
          { name: 'Dialog', desc: 'Modal overlays', file: 'dialog.tsx' },
          { name: 'File Upload', desc: 'File input', file: 'file-upload.tsx' },
          { name: 'Grid', desc: 'Layout grid system', file: 'grid.tsx' },
          { name: 'Hive Card', desc: 'HIVE-branded card variant', file: 'hive-card.tsx' },
          { name: 'Hive Confirm Modal', desc: 'Confirmation dialogs', file: 'hive-confirm-modal.tsx' },
          { name: 'Hive Logo', desc: 'Brand logo component', file: 'hive-logo.tsx' },
          { name: 'Hive Modal', desc: 'HIVE-styled modal', file: 'hive-modal.tsx' },
          { name: 'Icon Library', desc: 'SVG icon collection', file: 'icon-library.tsx' },
          { name: 'Input', desc: 'Text input fields', file: 'input.tsx' },
          { name: 'Label', desc: 'Form labels', file: 'label.tsx' },
          { name: 'Popover', desc: 'Floating content', file: 'popover.tsx' },
          { name: 'Progress', desc: 'Progress bars', file: 'progress.tsx' },
          { name: 'Select', desc: 'Dropdown selection', file: 'select.tsx' },
          { name: 'Sheet', desc: 'Side panel / drawer', file: 'sheet.tsx' },
          { name: 'Simple Avatar', desc: 'Lightweight avatar', file: 'simple-avatar.tsx' },
          { name: 'Skeleton', desc: 'Loading placeholders', file: 'skeleton.tsx' },
          { name: 'Slider', desc: 'Range input', file: 'slider.tsx' },
          { name: 'Switch', desc: 'Toggle switch', file: 'switch.tsx' },
          { name: 'Tabs', desc: 'Tab navigation', file: 'tabs.tsx' },
          { name: 'Textarea', desc: 'Multi-line text input', file: 'textarea.tsx' },
          { name: 'Toast', desc: 'Notification toasts', file: 'toast.tsx' },
          { name: 'Tooltip', desc: 'Hover hints', file: 'tooltip.tsx' },
        ].map((atom) => (
          <div key={atom.name} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
            <h3 className="font-semibold mb-1">{atom.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{atom.desc}</p>
            <p className="text-xs font-mono text-muted-foreground">{atom.file}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Design System Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">33</p>
            <p className="text-sm text-muted-foreground">Atom Components</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">5</p>
            <p className="text-sm text-muted-foreground">Design Token Sets</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">4px</p>
            <p className="text-sm text-muted-foreground">Base Grid Unit</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">1</p>
            <p className="text-sm text-muted-foreground">Gold Accent Color</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
