import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  ArrowRight,
  Star,
  Heart,
  Download,
  Plus,
  Settings,
  Users,
  Calendar,
} from "lucide-react";

const meta: Meta<{}> = {
  title: "HIVE/Design System",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hive-dark",
      values: [
        { name: "hive-dark", value: "#0A0A0A" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HIVEDesignSystem: Story = {
  render: () => (
    <div className="min-h-screen bg-bg-canvas text-text-primary font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="text-center">
            <h1 className="text-h1 text-foreground mb-4 font-display">
              HIVE Design System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Vercel-inspired depth, Apple-grade polish, HIVE soul
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Star className="h-5 w-5" />}
                iconPosition="left"
              >
                Explore Components
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 space-y-16">
        {/* Color System */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Color System</h2>
            <p className="text-body text-muted-foreground">
              HIVE brand colors with semantic meaning and accessibility
              compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <Card elevation="2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Primary</CardTitle>
                <CardDescription>Canvas & Core</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-bg-canvas border border-border" />
                  <div className="text-sm text-muted-foreground">
                    #0A0A0A - Canvas
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-primary" />
                  <div className="text-sm text-muted-foreground">
                    #FAFAFA - Primary
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card elevation="2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Accent</CardTitle>
                <CardDescription>HIVE Gold</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-accent-gold" />
                  <div className="text-sm text-muted-foreground">
                    #FFD700 - Gold
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-accent-gold-hover" />
                  <div className="text-sm text-muted-foreground">
                    #FFE255 - Hover
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Semantic Colors */}
            <Card elevation="2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Semantic</CardTitle>
                <CardDescription>Feedback & States</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-destructive" />
                  <div className="text-sm text-muted-foreground">
                    Destructive
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-muted" />
                  <div className="text-sm text-muted-foreground">Muted</div>
                </div>
              </CardContent>
            </Card>

            {/* Text Colors */}
            <Card elevation="2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Typography</CardTitle>
                <CardDescription>Text Hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-foreground">Primary Text</div>
                <div className="text-muted-foreground">Muted Text</div>
                <div className="text-accent">Accent Text</div>
                <div className="text-destructive">Error Text</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography System */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Typography</h2>
            <p className="text-body text-muted-foreground">
              Three-font system: General Sans for display, Inter for text,
              JetBrains Mono for code
            </p>
          </div>

          <Card elevation="3" className="p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-h1 text-foreground">Display Heading 1</h1>
                <p className="text-caption">General Sans · Bold · 48px/56px</p>
              </div>
              <div>
                <h2 className="text-h2 text-foreground">Display Heading 2</h2>
                <p className="text-caption">
                  General Sans · Semibold · 36px/44px
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-foreground">Display Heading 3</h3>
                <p className="text-caption">
                  General Sans · Semibold · 24px/32px
                </p>
              </div>
              <div>
                <h4 className="text-h4 text-foreground">Display Heading 4</h4>
                <p className="text-caption">
                  General Sans · Semibold · 20px/28px
                </p>
              </div>
              <div>
                <p className="text-body text-foreground">
                  Body text uses Inter Variable for optimal readability across
                  all devices and contexts. It maintains excellent legibility
                  while supporting the full range of weights and styles.
                </p>
                <p className="text-caption">
                  Inter Variable · Regular · 16px/24px
                </p>
              </div>
              <div>
                <p className="text-caption text-muted-foreground">
                  Caption text for metadata, timestamps, and supporting
                  information.
                </p>
                <p className="text-caption">
                  Inter Variable · Regular · 14px/20px
                </p>
              </div>
              <div>
                <code className="text-code bg-muted px-2 py-1 rounded">
                  const hive = "production-ready";
                </code>
                <p className="text-caption mt-1">
                  JetBrains Mono · Regular · 14px/20px
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Elevation System */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">
              Elevation & Shadows
            </h2>
            <p className="text-body text-muted-foreground">
              Vercel-inspired shadow system with four elevation levels for
              visual hierarchy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card elevation="1" className="p-6 text-center">
              <h4 className="text-h4 mb-2">Elevation 1</h4>
              <p className="text-caption text-muted-foreground">
                Subtle lift for basic cards and buttons
              </p>
            </Card>
            <Card elevation="2" className="p-6 text-center">
              <h4 className="text-h4 mb-2">Elevation 2</h4>
              <p className="text-caption text-muted-foreground">
                Standard depth for important elements
              </p>
            </Card>
            <Card elevation="3" className="p-6 text-center">
              <h4 className="text-h4 mb-2">Elevation 3</h4>
              <p className="text-caption text-muted-foreground">
                Higher prominence for key components
              </p>
            </Card>
            <Card elevation="4" className="p-6 text-center">
              <h4 className="text-h4 mb-2">Elevation 4</h4>
              <p className="text-caption text-muted-foreground">
                Maximum depth for modals and overlays
              </p>
            </Card>
          </div>
        </section>

        {/* Button System */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Button System</h2>
            <p className="text-body text-muted-foreground">
              Consistent interaction patterns with HIVE branding and
              micro-animations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card elevation="2" className="p-6">
              <h4 className="text-h4 mb-4">Primary Actions</h4>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Button variant="primary" size="lg">
                    Join HIVE
                  </Button>
                  <Button variant="primary" size="md">
                    Continue
                  </Button>
                  <Button variant="primary" size="sm">
                    Save
                  </Button>
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" loading>
                    Loading...
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            </Card>

            <Card elevation="2" className="p-6">
              <h4 className="text-h4 mb-4">Secondary Actions</h4>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<Star className="h-5 w-5" />}
                    iconPosition="left"
                  >
                    Get Premium
                  </Button>
                  <Button variant="secondary" size="md">
                    Learn More
                  </Button>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">View Details</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="link">Terms</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Card System */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Card System</h2>
            <p className="text-body text-muted-foreground">
              Flexible container system with variants and interactive states
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card elevation="2" hoverable>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Default Card
                </CardTitle>
                <CardDescription>
                  Standard card with hover effects and elevation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Interactive card with subtle micro-animations and proper focus
                  states.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass" elevation="3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Glass Card
                </CardTitle>
                <CardDescription>
                  Subtle transparency with backdrop blur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Glass morphism effect for layered interfaces and overlays.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="outline" elevation="1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-accent" />
                  Outline Card
                </CardTitle>
                <CardDescription>
                  Minimal style with border emphasis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Clean, minimal approach for secondary content areas.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Motion & Animation */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Motion System</h2>
            <p className="text-body text-muted-foreground">
              Refined timing functions and transitions that feel Apple-native
            </p>
          </div>

          <Card elevation="3" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-h4 mb-4">Timing Functions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-body">HIVE Standard</span>
                    <code className="text-code bg-muted px-2 py-1 rounded text-sm">
                      cubic-bezier(0.16, 1, 0.3, 1)
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">HIVE Bounce</span>
                    <code className="text-code bg-muted px-2 py-1 rounded text-sm">
                      cubic-bezier(0.68, -0.55, 0.265, 1.55)
                    </code>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-h4 mb-4">Durations</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-body">Quick Interactions</span>
                    <span className="text-caption text-muted-foreground">
                      90ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">Standard Transitions</span>
                    <span className="text-caption text-muted-foreground">
                      150ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body">Complex Animations</span>
                    <span className="text-caption text-muted-foreground">
                      200ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Brand Elements */}
        <section>
          <div className="mb-8">
            <h2 className="text-h2 text-foreground mb-2">Brand Elements</h2>
            <p className="text-body text-muted-foreground">
              Signature HIVE effects and animations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card elevation="3" className="p-8 text-center">
              <h3 className="hive-gradient-text text-h3 mb-4">
                HIVE Gradient Text
              </h3>
              <p className="text-body text-muted-foreground">
                Animated gradient for brand moments and special emphasis
              </p>
            </Card>

            <Card elevation="3" className="p-8 text-center hive-glow">
              <h3 className="text-h3 text-accent mb-4">HIVE Glow Effect</h3>
              <p className="text-body text-muted-foreground">
                Subtle gold glow for premium features and special states
              </p>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center">
          <p className="text-body text-muted-foreground">
            HIVE Design System • Built with precision, designed for delight
          </p>
        </div>
      </div>
    </div>
  ),
};

// Individual component demonstrations
export const ColorPalette: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-bg-canvas">
      <h2 className="text-h2 text-foreground">HIVE Color Palette</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <div className="h-20 bg-bg-canvas border border-border rounded-lg"></div>
          <p className="text-sm text-muted-foreground">Canvas</p>
          <p className="text-xs text-muted-foreground">#0A0A0A</p>
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-primary rounded-lg"></div>
          <p className="text-sm text-muted-foreground">Primary</p>
          <p className="text-xs text-muted-foreground">#FAFAFA</p>
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-accent-gold rounded-lg"></div>
          <p className="text-sm text-muted-foreground">Accent Gold</p>
          <p className="text-xs text-muted-foreground">#FFD700</p>
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-muted rounded-lg"></div>
          <p className="text-sm text-muted-foreground">Muted</p>
          <p className="text-xs text-muted-foreground">#27272A</p>
        </div>
      </div>
    </div>
  ),
};

export const ShadowSystem: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-bg-canvas">
      <h2 className="text-h2 text-foreground">Shadow System</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`p-6 bg-card rounded-hive shadow-elevation-${level}`}
          >
            <h4 className="text-h4 text-foreground mb-2">Level {level}</h4>
            <p className="text-caption text-muted-foreground">
              Shadow elevation {level}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};
