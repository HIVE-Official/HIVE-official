import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../atomic/atoms/container';
import { Text as Typography } from '../../atomic/atoms/text';
import { HiveLogo } from '../../atomic/atoms/hive-brand';

/**
 * # HIVE Design System Foundation
 * 
 * The foundational principles, tokens, and guidelines that power the entire HIVE platform.
 * 
 * ## Core Principles
 * 
 * - **Campus-First**: Every design decision considers university student life
 * - **Social Utility**: Balance between social connection and practical functionality
 * - **Mobile Excellence**: Thumb-friendly interactions optimized for walking between classes
 * - **Systematic Design**: Consistent patterns that scale across the entire platform
 * - **Accessibility**: Inclusive design that works for everyone
 */

const DesignSystemFoundation = () => {
  const colorTokens = [
    { name: 'Primary Orange', value: 'hsl(22, 100%, 50%)', class: 'bg-hive-orange', description: 'Primary brand color for CTAs and highlights' },
    { name: 'Secondary Blue', value: 'hsl(210, 100%, 50%)', class: 'bg-hive-blue', description: 'Trust and reliability for system elements' },
    { name: 'Success Green', value: 'hsl(120, 60%, 45%)', class: 'bg-hive-green', description: 'Positive actions and confirmations' },
    { name: 'Warning Yellow', value: 'hsl(45, 100%, 55%)', class: 'bg-hive-yellow', description: 'Caution and pending states' },
    { name: 'Error Red', value: 'hsl(0, 80%, 60%)', class: 'bg-hive-red', description: 'Errors and destructive actions' },
    { name: 'Purple Accent', value: 'hsl(270, 70%, 60%)', class: 'bg-hive-purple', description: 'Creative tools and special features' },
    { name: 'Teal Accent', value: 'hsl(180, 60%, 50%)', class: 'bg-hive-teal', description: 'Navigation and organizational elements' }
  ];

  const typographyScale = [
    { name: 'Heading 1', class: 'text-4xl font-bold', sample: 'Platform Headlines' },
    { name: 'Heading 2', class: 'text-3xl font-semibold', sample: 'Section Headers' },
    { name: 'Heading 3', class: 'text-2xl font-medium', sample: 'Component Titles' },
    { name: 'Heading 4', class: 'text-xl font-medium', sample: 'Card Headers' },
    { name: 'Body Large', class: 'text-lg', sample: 'Important body text and descriptions' },
    { name: 'Body Regular', class: 'text-base', sample: 'Standard body text for general content' },
    { name: 'Body Small', class: 'text-sm', sample: 'Secondary information and metadata' },
    { name: 'Caption', class: 'text-xs', sample: 'Labels and micro-copy' }
  ];

  const spacingScale = [
    { name: 'Space 1', value: '4px', class: 'w-1 h-1', description: 'Micro spacing' },
    { name: 'Space 2', value: '8px', class: 'w-2 h-2', description: 'Small gaps' },
    { name: 'Space 3', value: '12px', class: 'w-3 h-3', description: 'Component padding' },
    { name: 'Space 4', value: '16px', class: 'w-4 h-4', description: 'Standard spacing' },
    { name: 'Space 6', value: '24px', class: 'w-6 h-6', description: 'Section spacing' },
    { name: 'Space 8', value: '32px', class: 'w-8 h-8', description: 'Large gaps' },
    { name: 'Space 12', value: '48px', class: 'w-12 h-12', description: 'Page sections' },
    { name: 'Space 16', value: '64px', class: 'w-16 h-16', description: 'Major sections' }
  ];

  const designPrinciples = [
    {
      title: "Campus-First Design",
      description: "Every component considers university student life - walking between classes, studying in groups, coordinating events",
      examples: ["Thumb-friendly touch targets", "Quick access patterns", "Context-aware interfaces"]
    },
    {
      title: "Social Utility Balance", 
      description: "Perfect harmony between social connection and practical functionality - not entertainment disguised as utility",
      examples: ["Collaboration tools", "Problem-solving focus", "Meaningful interactions"]
    },
    {
      title: "Mobile Excellence",
      description: "Mobile-first design with desktop enhancement - optimized for students always on their phones",
      examples: ["44px minimum touch targets", "Swipe gestures", "Bottom navigation"]
    },
    {
      title: "Systematic Consistency",
      description: "Predictable patterns that scale - students learn once and apply everywhere on the platform",
      examples: ["Consistent spacing", "Unified color usage", "Standardized interactions"]
    }
  ];

  return (
    <Container className="py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <HiveLogo size="large" />
        </div>
        <Typography variant="h1" className="text-4xl font-bold">
          Design System Foundation
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The core principles, tokens, and guidelines that ensure consistency, 
          accessibility, and campus-first design across the entire HIVE platform.
        </Typography>
      </div>

      {/* Design Principles */}
      <section>
        <Typography variant="h2" className="text-3xl font-bold mb-8">Design Principles</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designPrinciples.map((principle, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {principle.description}
                </CardDescription>
                <div className="space-y-2">
                  <Typography variant="body2" className="font-medium">Examples:</Typography>
                  <ul className="space-y-1">
                    {principle.examples.map((example, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {example}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Color System */}
      <section>
        <Typography variant="h2" className="text-3xl font-bold mb-8">Color System</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorTokens.map((color, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className={`${color.class} w-full h-16 rounded-lg mb-4 shadow-sm`}></div>
                <Typography variant="h4" className="font-semibold mb-2">{color.name}</Typography>
                <Typography variant="body2" className="text-muted-foreground mb-2 font-mono text-xs">
                  {color.value}
                </Typography>
                <Typography variant="body2" className="text-sm">
                  {color.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section>
        <Typography variant="h2" className="text-3xl font-bold mb-8">Typography Scale</Typography>
        <Card>
          <CardContent className="p-6 space-y-6">
            {typographyScale.map((type, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="body2" className="font-medium text-muted-foreground">
                    {type.name}
                  </Typography>
                  <Typography variant="body2" className="font-mono text-xs text-muted-foreground">
                    {type.class}
                  </Typography>
                </div>
                <Typography className={type.class}>
                  {type.sample}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Spacing Scale */}
      <section>
        <Typography variant="h2" className="text-3xl font-bold mb-8">Spacing Scale</Typography>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {spacingScale.map((space, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`${space.class} bg-hive-orange rounded`}></div>
                  </div>
                  <Typography variant="body2" className="font-medium">{space.name}</Typography>
                  <Typography variant="caption" className="text-muted-foreground">{space.value}</Typography>
                  <Typography variant="caption" className="block text-xs text-muted-foreground mt-1">
                    {space.description}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Component Categories */}
      <section>
        <Typography variant="h2" className="text-3xl font-bold mb-8">Component Architecture</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-hive-blue/20">
            <CardHeader>
              <CardTitle className="text-hive-blue">Atoms</CardTitle>
              <CardDescription>35+ components</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className="mb-4">
                Core building blocks that can't be broken down further.
              </Typography>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full">Button</Button>
                <Badge variant="secondary">Badge</Badge>
                <div className="w-8 h-8 bg-muted rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-hive-green/20">
            <CardHeader>
              <CardTitle className="text-hive-green">Molecules</CardTitle>
              <CardDescription>25+ components</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className="mb-4">
                Simple groups of atoms functioning together.
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted rounded"></div>
                  <Typography variant="body2">User Card</Typography>
                </div>
                <div className="p-2 border rounded text-xs">Form Field</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-hive-purple/20">
            <CardHeader>
              <CardTitle className="text-hive-purple">Organisms</CardTitle>
              <CardDescription>15+ components</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className="mb-4">
                Complex UI components made of molecules and atoms.
              </Typography>
              <div className="space-y-2">
                <div className="p-3 border rounded">
                  <Typography variant="caption">Profile Widget</Typography>
                </div>
                <div className="p-3 border rounded">
                  <Typography variant="caption">Space Browser</Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-hive-teal/20">
            <CardHeader>
              <CardTitle className="text-hive-teal">Templates</CardTitle>
              <CardDescription>10+ layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className="mb-4">
                Complete page layouts combining all components.
              </Typography>
              <div className="space-y-2">
                <div className="p-3 border rounded">
                  <Typography variant="caption">Dashboard</Typography>
                </div>
                <div className="p-3 border rounded">
                  <Typography variant="caption">Profile Page</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Container>
  );
};

const meta: Meta<typeof DesignSystemFoundation> = {
  title: '01 Foundation/Design System Foundation',
  component: DesignSystemFoundation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Design System Foundation

The foundational elements that ensure consistency and quality across the entire HIVE platform.

## Design Principles

1. **Campus-First**: Every design decision considers university student life
2. **Social Utility**: Balance between social connection and practical functionality  
3. **Mobile Excellence**: Optimized for students always on their phones
4. **Systematic Consistency**: Predictable patterns that scale

## Token System

- **Colors**: Semantic color system with campus-friendly palette
- **Typography**: Readable scale optimized for mobile and desktop
- **Spacing**: Consistent spatial relationships
- **Motion**: Purposeful animations that enhance UX
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Foundation: Story = {
  name: 'Design System Foundation',
  render: () => <DesignSystemFoundation />,
};

export const ColorPalette: Story = {
  name: 'Color Palette',
  render: () => (
    <Container className="py-8">
      <Typography variant="h2" className="text-2xl font-bold mb-8">HIVE Color Palette</Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-orange rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Orange</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-blue rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Blue</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-green rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Green</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-yellow rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Yellow</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-red rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Red</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-purple rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Purple</Typography>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-hive-teal rounded-lg mb-2 mx-auto"></div>
          <Typography variant="caption">Teal</Typography>
        </div>
      </div>
    </Container>
  ),
};

export const TypographyScale: Story = {
  name: 'Typography Scale',
  render: () => (
    <Container className="py-8">
      <Typography variant="h1" className="mb-8">Typography Scale Showcase</Typography>
      <Typography variant="h2" className="mb-6">Section Headers (H2)</Typography>
      <Typography variant="h3" className="mb-4">Component Titles (H3)</Typography>
      <Typography variant="h4" className="mb-4">Card Headers (H4)</Typography>
      <Typography variant="body1" className="mb-4">
        This is body text (large) used for important descriptions and main content areas. 
        It's readable and comfortable for extended reading sessions.
      </Typography>
      <Typography variant="body2" className="mb-4">
        This is standard body text used for general content, descriptions, and most text on the platform.
        It balances readability with space efficiency.
      </Typography>
      <Typography variant="caption" className="block text-muted-foreground">
        Caption text for labels, metadata, and secondary information that provides context.
      </Typography>
    </Container>
  ),
};