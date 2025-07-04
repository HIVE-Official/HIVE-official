import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Checkbox } from '../components/checkbox';
import { Switch } from '../components/switch';
import { Label } from '../components/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card';
import { Badge } from '../components/badge';
import { Typography } from '../components/typography';
import { 
  Focus, 
  Eye, 
  Zap,
  Target,
  Award
} from 'lucide-react';

const meta: Meta = {
  title: 'Design System/🎯 Focus States',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Gold focus rings and states demonstration. Use Tab key to navigate and see the gold focus indicators.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

// === FOCUS STATES DEMO ===
export const FocusStatesDemo: Story = {
  name: "🎯 Gold Focus Rings",
  render: () => (
    <div className="space-y-8 p-8 max-w-4xl">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-accent" />
          HIVE Focus States
        </Typography>
        <Typography variant="lead">
          Press <kbd className="px-2 py-1 bg-surface-02 rounded text-sm font-mono">Tab</kbd> to navigate and see gold focus rings
        </Typography>
        <Badge variant="ritual">
          <Focus className="mr-1 h-3 w-3" />
          Gold Focus System Active
        </Badge>
      </div>

      {/* Interactive Focus Demo */}
      <Card variant="accent">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-accent" />
            Interactive Focus Demo
          </CardTitle>
          <CardDescription>
            Click in this area and use Tab/Shift+Tab to navigate between elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buttons */}
          <div className="space-y-4">
            <Typography variant="h4">Buttons with Gold Focus</Typography>
            <div className="flex flex-wrap gap-4">
              <Button tabIndex={0}>Default Button</Button>
              <Button variant="accent" tabIndex={0}>Accent Button</Button>
              <Button variant="ritual" tabIndex={0}>Ritual Button</Button>
              <Button variant="outline" tabIndex={0}>Outline Button</Button>
              <Button variant="ghost" tabIndex={0}>Ghost Button</Button>
            </div>
          </div>

          {/* Form Elements */}
          <div className="space-y-4">
            <Typography variant="h4">Form Elements with Gold Focus</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="focus-input-1">Default Input</Label>
                <Input id="focus-input-1" placeholder="Focus me to see gold ring" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="focus-input-2">Accent Input</Label>
                <Input id="focus-input-2" variant="accent" placeholder="Gold accent input" />
              </div>
            </div>
          </div>

          {/* Checkboxes and Switches */}
          <div className="space-y-4">
            <Typography variant="h4">Controls with Gold Focus</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Typography variant="body" weight="medium">Checkboxes</Typography>
                <div className="flex items-center space-x-2">
                  <Checkbox id="focus-check-1" />
                  <Label htmlFor="focus-check-1">Focus me for gold ring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="focus-check-2" defaultChecked />
                  <Label htmlFor="focus-check-2">Checked with focus</Label>
                </div>
              </div>
              <div className="space-y-3">
                <Typography variant="body" weight="medium">Switches</Typography>
                <div className="flex items-center space-x-2">
                  <Switch id="focus-switch-1" />
                  <Label htmlFor="focus-switch-1">Focus me for gold ring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="focus-switch-2" defaultChecked />
                  <Label htmlFor="focus-switch-2">Active with focus</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Focus Ring Specifications */}
      <Card variant="surface-02">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5 text-accent" />
            Focus Ring Specifications
          </CardTitle>
          <CardDescription>
            Technical details of HIVE's gold focus system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Typography variant="body" weight="semibold">Visual Properties</Typography>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Color:</span>
                  <span className="text-accent font-mono">#FFD700</span>
                </div>
                <div className="flex justify-between">
                  <span>Ring Width:</span>
                  <span className="font-mono">2px</span>
                </div>
                <div className="flex justify-between">
                  <span>Ring Offset:</span>
                  <span className="font-mono">2px</span>
                </div>
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="font-mono">100%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Typography variant="body" weight="semibold">CSS Implementation</Typography>
              <div className="bg-surface-03 p-3 rounded text-xs font-mono">
                <div>focus-visible:outline-none</div>
                <div>focus-visible:ring-2</div>
                <div>focus-visible:ring-accent</div>
                <div>focus-visible:ring-offset-2</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Navigation Guide */}
      <Card variant="outline">
        <CardHeader>
          <CardTitle>🎹 Keyboard Navigation Guide</CardTitle>
          <CardDescription>How to test focus states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Typography variant="body" weight="semibold">Navigation Keys</Typography>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface-02 rounded text-xs font-mono">Tab</kbd>
                  <span>Move to next focusable element</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface-02 rounded text-xs font-mono">Shift + Tab</kbd>
                  <span>Move to previous focusable element</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface-02 rounded text-xs font-mono">Enter</kbd>
                  <span>Activate focused button</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface-02 rounded text-xs font-mono">Space</kbd>
                  <span>Toggle checkbox/switch</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Typography variant="body" weight="semibold">Focus Indicators</Typography>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span>Gold ring around focused element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border-2 border-accent"></div>
                  <span>2px solid gold outline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent/20 rounded"></div>
                  <span>Subtle gold background on some elements</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Force Focus Demo */}
      <Card variant="featured">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-accent" />
            Always-Visible Focus Demo
          </CardTitle>
          <CardDescription>
            These elements show focus states without requiring keyboard navigation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Typography variant="body" weight="semibold">Simulated Focus States</Typography>
              <div className="space-y-3">
                {/* Force focus styles */}
                <Button className="ring-2 ring-accent ring-offset-2 ring-offset-background">
                  Button with Forced Focus Ring
                </Button>
                <Input 
                  placeholder="Input with forced focus ring" 
                  className="ring-2 ring-accent/20 border-accent"
                />
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Checkbox id="forced-focus-check" className="ring-2 ring-accent ring-offset-2 ring-offset-background" />
                  </div>
                  <Label htmlFor="forced-focus-check">Checkbox with forced focus</Label>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Typography variant="body" weight="semibold">CSS Used</Typography>
              <div className="bg-surface-03 p-3 rounded text-xs font-mono space-y-1">
                <div>ring-2 ring-accent</div>
                <div>ring-offset-2</div>
                <div>ring-offset-background</div>
                <div className="text-muted mt-2">{/* For inputs: */}</div>
                <div>border-accent</div>
                <div>ring-accent/20</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// === ACCESSIBILITY DEMO ===
export const AccessibilityDemo: Story = {
  name: "♿ Accessibility Features",
  render: () => (
    <div className="space-y-6 p-8 max-w-2xl">
      <div className="text-center space-y-2">
        <Typography variant="h2">Accessibility & Focus</Typography>
        <Typography variant="body" className="text-muted">
          HIVE components are built with accessibility in mind
        </Typography>
      </div>

      <Card variant="accent">
        <CardHeader>
          <CardTitle>Focus Management Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Typography variant="body" weight="semibold">✅ Keyboard Navigation</Typography>
            <Typography variant="body-sm" className="text-muted">
              All interactive elements are keyboard accessible with proper tab order
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="body" weight="semibold">✅ Visible Focus Indicators</Typography>
            <Typography variant="body-sm" className="text-muted">
              Gold focus rings are always visible and meet accessibility contrast requirements
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="body" weight="semibold">✅ Screen Reader Support</Typography>
            <Typography variant="body-sm" className="text-muted">
              Proper ARIA labels and semantic HTML structure for assistive technologies
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="body" weight="semibold">✅ High Contrast</Typography>
            <Typography variant="body-sm" className="text-muted">
              Gold (#FFD700) on dark backgrounds exceeds WCAG contrast requirements
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};