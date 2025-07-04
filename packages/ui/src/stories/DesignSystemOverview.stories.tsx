import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card';
import { Input } from '../components/input';
import { Badge } from '../components/badge';
import { Switch } from '../components/switch';
import { Label } from '../components/label';
import { Typography } from '../components/typography';
import { 
  Palette, 
  Type, 
  MousePointer, 
  Layers, 
  Zap,
  Star,
  Award,
  Heart,
  Users,
  Settings,
  Eye,
  CheckCircle
} from 'lucide-react';

const meta: Meta = {
  title: 'Design System/🏠 Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the HIVE design system components, following gold-first principles and campus energy patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

// === DESIGN SYSTEM OVERVIEW ===
export const DesignSystemOverview: Story = {
  name: "🏠 HIVE Design System",
  render: () => (
    <div className="min-h-screen bg-background p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Typography variant="display" className="text-accent">HIVE Design System</Typography>
        <Typography variant="lead" className="max-w-2xl mx-auto">
          "Minimal Surface. Maximal Spark." — A comprehensive design system built for campus energy with gold-first principles.
        </Typography>
        <div className="flex justify-center gap-4 mt-6">
          <Badge variant="ritual">
            <Star className="mr-1 h-3 w-3" />
            v2.0 Ready
          </Badge>
          <Badge variant="pill">50+ Components</Badge>
          <Badge variant="outline">Campus Optimized</Badge>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="accent">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-accent" />
              Gold-First System
            </CardTitle>
            <CardDescription>
              Monochrome foundation with strategic gold accents for focus, achievements, and ritual moments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Primary Black</span>
                <span className="text-accent">#0A0A0A</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Gold Accent</span>
                <span className="text-accent">#FFD700</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Surface</span>
                <span className="text-muted">#111111</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-accent" />
              Campus Energy
            </CardTitle>
            <CardDescription>
              Interface adapts to student energy cycles: high energy events, focus periods, and transitions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>🎉 High Energy: Enhanced animations, bold contrasts</div>
              <div>📚 Focus: Reduced motion, cleaner layouts</div>
              <div>🌅 Transition: Gentle animations, progressive reveal</div>
            </div>
          </CardContent>
        </Card>

        <Card variant="featured">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-accent" />
              Motion System
            </CardTitle>
            <CardDescription>
              HIVE motion curve with consistent timing for organic, campus-life interactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>Curve: cubic-bezier(0.33, 0.65, 0, 1)</div>
              <div>Micro: 90ms • Standard: 180ms</div>
              <div>Complex: 240ms • Cinematic: 400ms+</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Categories */}
      <div className="space-y-8">
        <Typography variant="h1" className="text-center">Component Library</Typography>
        
        {/* Interaction Components */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <MousePointer className="h-6 w-6 text-accent" />
            <Typography variant="h2">Interaction Components</Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="interactive">
              <CardHeader>
                <CardTitle className="text-lg">Button</CardTitle>
                <CardDescription>9 variants for every campus interaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm">Default</Button>
                <Button variant="accent" size="sm">Accent</Button>
                <Button variant="ritual" size="sm">Ritual</Button>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle className="text-lg">Input</CardTitle>
                <CardDescription>Forms with gold focus states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Default input" inputSize="sm" />
                <Input variant="accent" placeholder="Gold accent" inputSize="sm" />
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle className="text-lg">Switch</CardTitle>
                <CardDescription>Toggle controls with smooth transitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch id="demo-switch" defaultChecked />
                  <Label htmlFor="demo-switch" className="text-sm">Notifications</Label>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle className="text-lg">Badge</CardTitle>
                <CardDescription>Status indicators with ritual moments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge size="sm">Active</Badge>
                <Badge variant="ritual" size="sm">
                  <Award className="mr-1 h-2.5 w-2.5" />
                  Verified
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Layout Components */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-accent" />
            <Typography variant="h2">Layout & Surfaces</Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg">Card System</CardTitle>
                <CardDescription>11 variants for content hierarchy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm flex justify-between">
                    <span>Default</span>
                    <span className="text-muted">Clean borders</span>
                  </div>
                  <div className="text-sm flex justify-between">
                    <span>Accent</span>
                    <span className="text-accent">Gold borders</span>
                  </div>
                  <div className="text-sm flex justify-between">
                    <span>Featured</span>
                    <span className="text-accent">Full treatment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="surface-02">
              <CardHeader>
                <CardTitle className="text-lg">Surface Levels</CardTitle>
                <CardDescription>Elevation system for depth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>Surface 01: Base elevation</div>
                  <div>Surface 02: Mid elevation</div>
                  <div>Surface 03: High elevation</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Glass Effects</CardTitle>
                <CardDescription>Modern glassmorphism overlays</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body-sm">
                  Backdrop blur with subtle transparency for modern overlay effects.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Typography System */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Type className="h-6 w-6 text-accent" />
            <Typography variant="h2">Typography</Typography>
          </div>
          
          <Card variant="outline">
            <CardHeader>
              <CardTitle>Font Family System</CardTitle>
              <CardDescription>Three carefully chosen fonts for different content types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Typography variant="h4">Space Grotesk</Typography>
                  <Typography variant="body-sm" className="text-muted">Display & Headlines</Typography>
                  <Typography variant="h3">Headlines</Typography>
                  <Typography variant="h4">Subheadings</Typography>
                </div>
                
                <div className="space-y-2">
                  <Typography variant="h4">Geist Sans</Typography>
                  <Typography variant="body-sm" className="text-muted">Body Text & UI</Typography>
                  <Typography variant="body">Body paragraphs and interface elements</Typography>
                  <Typography variant="body-sm">Secondary information</Typography>
                </div>
                
                <div className="space-y-2">
                  <Typography variant="h4">Geist Mono</Typography>
                  <Typography variant="body-sm" className="text-muted">Code & Data</Typography>
                  <Typography variant="code">inline code</Typography>
                  <Typography variant="code-block" className="text-xs">Code blocks</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campus Examples */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-accent" />
            <Typography variant="h2">Campus Content Examples</Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Study Event */}
            <Card variant="interactive">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Study Group Tonight</CardTitle>
                    <CardDescription>Computer Science 101</CardDescription>
                  </div>
                  <Badge variant="pill">Tonight</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Typography variant="body-sm" className="text-muted mb-3">
                  7:00 PM - 9:00 PM • Library Room 204
                </Typography>
                <Button variant="accent" size="sm" className="w-full">
                  Join Study Group
                </Button>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card variant="featured">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Achievement!</CardTitle>
                    <CardDescription>7-Day Study Streak</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ritual" size="sm" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Celebrate
                </Button>
              </CardContent>
            </Card>

            {/* Settings Panel */}
            <Card variant="surface-02">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your campus experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-settings">Push Notifications</Label>
                  <Switch id="notif-settings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="location-settings">Share Location</Label>
                  <Switch id="location-settings" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-border space-y-4">
        <Typography variant="h3">Ready to build with HIVE?</Typography>
        <Typography variant="body" className="text-muted max-w-xl mx-auto">
          Explore individual component stories to see all variants, states, and usage examples.
        </Typography>
        <div className="flex justify-center gap-4">
          <Button variant="accent">
            <Eye className="mr-2 h-4 w-4" />
            Browse Components
          </Button>
          <Button variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  ),
};

// === QUICK COMPONENT REFERENCE ===
export const QuickReference: Story = {
  name: "📚 Quick Reference",
  render: () => (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-2">
        <Typography variant="h1">Component Quick Reference</Typography>
        <Typography variant="lead">All HIVE components at a glance</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Buttons */}
        <Card variant="outline" className="p-4">
          <Typography variant="h4" className="mb-3">Buttons</Typography>
          <div className="space-y-2">
            <Button size="sm" className="w-full">Default</Button>
            <Button variant="accent" size="sm" className="w-full">Accent</Button>
            <Button variant="ritual" size="sm" className="w-full">Ritual</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card variant="outline" className="p-4">
          <Typography variant="h4" className="mb-3">Badges</Typography>
          <div className="space-y-2">
            <Badge>Default</Badge>
            <Badge variant="ritual">
              <Star className="mr-1 h-2.5 w-2.5" />
              Ritual
            </Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Card>

        {/* Inputs */}
        <Card variant="outline" className="p-4">
          <Typography variant="h4" className="mb-3">Inputs</Typography>
          <div className="space-y-2">
            <Input placeholder="Default" inputSize="sm" />
            <Input variant="accent" placeholder="Accent" inputSize="sm" />
          </div>
        </Card>

        {/* Typography */}
        <Card variant="outline" className="p-4">
          <Typography variant="h4" className="mb-3">Typography</Typography>
          <div className="space-y-1">
            <Typography variant="h4">Heading</Typography>
            <Typography variant="body">Body text</Typography>
            <Typography variant="caption">Caption</Typography>
            <Typography variant="code">code</Typography>
          </div>
        </Card>
      </div>
    </div>
  ),
};