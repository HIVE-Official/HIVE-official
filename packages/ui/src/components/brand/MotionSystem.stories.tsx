import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Heading, Text } from '../ui/typography';
import { Play, Pause, RotateCcw, Zap, Monitor, Smartphone, Timer, Sparkles } from 'lucide-react';

const MotionSystem = () => (
    <div>Motion System</div>
)

const meta: Meta = {
  title: "Brand/Motion System",
  component: MotionSystem,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// HIVE motion demo component
const HiveMotionDemo = ({ 
  children, 
  animation, 
  duration = '120ms',
  easing = 'smooth',
  isGoldAccent = false,
  className = ''
}: {
  children: React.ReactNode;
  animation: string;
  duration?: string;
  easing?: string;
  isGoldAccent?: boolean;
  className?: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), parseInt(duration) + 50);
  };

  const easingMap = {
    'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'snap': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
    'elegant': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'brand': 'cubic-bezier(0.33, 0.65, 0, 1)',
  };

  return (
    <Card className={`w-full border-border/50 bg-card/50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">{animation}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {duration} • HIVE {easing}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isGoldAccent && (
              <Badge variant="secondary" className="text-xs bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Gold Accent
              </Badge>
            )}
            <Button size="sm" variant="outline" onClick={triggerAnimation} className="border-border/50">
              <Play className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className={`
            p-4 rounded-lg border border-border/30
            bg-gradient-to-br from-card via-card to-muted/20
            transition-all duration-[${duration}]
            ${isAnimating ? 'scale-105 shadow-lg' : 'scale-100'}
            ${isGoldAccent && isAnimating ? 'shadow-yellow-400/20 border-yellow-400/30' : ''}
          `}
          style={{
            transitionTimingFunction: easingMap[easing as keyof typeof easingMap] || easing,
          }}
        >
          <div className="flex items-center gap-3">
            <div className={`
              w-3 h-3 rounded-full transition-all duration-[${duration}]
              ${isGoldAccent ? 'bg-yellow-400' : 'bg-muted-foreground/40'}
              ${isAnimating ? 'scale-150' : 'scale-100'}
            `} />
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// HIVE vs Generic comparison
const HiveVsGeneric = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-yellow-400/20 bg-yellow-400/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <CardTitle className="text-sm text-yellow-400">HIVE Custom Motion</CardTitle>
          </div>
          <CardDescription className="text-xs">Dark-first, gold accents, premium easing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <Text size="sm">Smooth (primary)</Text>
            <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">cubic-bezier(0.25, 0.46, 0.45, 0.94)</Badge>
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm">Snap (playful)</Text>
            <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">cubic-bezier(0.68, -0.55, 0.265, 1.55)</Badge>
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm">Brand (special)</Text>
            <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">cubic-bezier(0.33, 0.65, 0, 1)</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-muted-foreground/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-sm text-muted-foreground">Generic Design Systems</CardTitle>
          </div>
          <CardDescription className="text-xs">Material Design, Bootstrap, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <Text size="sm" variant="muted">Material Standard</Text>
            <Badge variant="secondary" className="opacity-60">cubic-bezier(0.4, 0.0, 0.2, 1)</Badge>
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm" variant="muted">CSS Ease</Text>
            <Badge variant="secondary" className="opacity-60">ease-out</Badge>
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm" variant="muted">Bootstrap</Text>
            <Badge variant="secondary" className="opacity-60">ease-in-out</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-background">
      <div className="space-y-2">
        <Heading size="h1" className="text-foreground">HIVE Motion System</Heading>
        <Text variant="muted">
          Custom motion language for dark-first UI with gold accents. Built on Tailwind + shadcn/ui + Radix primitives.
          <strong className="text-yellow-400 ml-1">NO Material Design.</strong>
        </Text>
      </div>

      <Separator className="bg-border/50" />

      <div className="space-y-4">
        <Heading size="h3">HIVE vs Generic Design Systems</Heading>
        <HiveVsGeneric />
      </div>

      <Separator className="bg-border/50" />

      <div className="space-y-4">
        <Heading size="h3">HIVE Motion Examples</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HiveMotionDemo 
            animation="Instant Feedback"
            duration="50ms"
            easing="smooth"
          >
            <Text size="sm">Immediate hover response, focus states</Text>
          </HiveMotionDemo>

          <HiveMotionDemo 
            animation="Micro Interactions"
            duration="120ms"
            easing="snap"
          >
            <Text size="sm">Button clicks, toggles, playful moments</Text>
          </HiveMotionDemo>

          <HiveMotionDemo 
            animation="Content Transitions"
            duration="180ms"
            easing="elegant"
          >
            <Text size="sm">Modal opens, page transitions, reveals</Text>
          </HiveMotionDemo>

          <HiveMotionDemo 
            animation="Ritual Celebrations"
            duration="400ms"
            easing="brand"
            isGoldAccent={true}
          >
            <Text size="sm">Space joins, achievements, special HIVE moments</Text>
          </HiveMotionDemo>
        </div>
      </div>
    </div>
  ),
};

export const HiveEasing: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    const hiveCurves = [
      {
        name: 'Smooth',
        value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        description: 'Primary HIVE easing - confident, premium feel',
        primary: true,
        usage: 'Most UI interactions, cards, buttons',
      },
      {
        name: 'Snap',
        value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        description: 'Playful bounce for micro-interactions',
        primary: false,
        usage: 'Button presses, toggles, fun moments',
      },
      {
        name: 'Elegant',
        value: 'cubic-bezier(0.23, 1, 0.32, 1)',
        description: 'Refined, sophisticated transitions',
        primary: false,
        usage: 'Modals, overlays, content reveals',
      },
      {
        name: 'Brand',
        value: 'cubic-bezier(0.33, 0.65, 0, 1)',
        description: 'Signature HIVE spring for special moments',
        primary: false,
        usage: 'Rituals, celebrations, gold accent states',
        special: true,
      },
    ];

    return (
      <div className="space-y-6 p-6 bg-background">
        <div className="space-y-2">
          <Heading size="h2">HIVE Custom Easing Functions</Heading>
          <Text variant="muted">
            Premium motion curves designed specifically for HIVE's dark-first aesthetic
          </Text>
        </div>

        <div className="grid gap-4">
          {hiveCurves.map((curve) => (
            <Card 
              key={curve.name} 
              className={`
                ${curve.primary ? 'ring-1 ring-yellow-400/30 bg-yellow-400/5' : 'border-border/50'}
                ${curve.special ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5' : ''}
              `}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {curve.name}
                      {curve.primary && (
                        <Badge variant="default" className="bg-yellow-400 text-yellow-950">
                          Primary
                        </Badge>
                      )}
                      {curve.special && (
                        <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Special
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{curve.description}</CardDescription>
                    <Text size="xs" variant="muted" className="mt-1">
                      Usage: {curve.usage}
                    </Text>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveDemo(curve.name);
                      setTimeout(() => setActiveDemo(null), 400);
                    }}
                    className="border-border/50"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Text size="xs" variant="muted" className="font-mono bg-muted/30 p-2 rounded">
                    {curve.value}
                  </Text>
                  <div className="relative overflow-hidden">
                    <div 
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium
                        transition-transform duration-300
                        ${curve.special ? 'bg-yellow-400 text-yellow-950' : 'bg-muted text-muted-foreground'}
                        ${activeDemo === curve.name ? 'translate-x-32' : 'translate-x-0'}
                      `}
                      style={{
                        transitionTimingFunction: curve.value,
                      }}
                    >
                      {curve.name}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const DarkFirstDesign: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-background">
      <div className="space-y-2">
        <Heading size="h2">Dark-First Motion Design</Heading>
        <Text variant="muted">
          How HIVE's motion system enhances dark surfaces with subtle embossing and gold accents
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-card to-muted rounded" />
              Surface Elevation
            </CardTitle>
            <CardDescription>
              Subtle embossing effects for dark surfaces
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-card via-card to-muted/20 border border-border/30 rounded-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20">
                <Text size="sm">Card with subtle hover elevation</Text>
              </div>
              <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30">
                <Text size="sm">Enhanced emboss effect</Text>
              </div>
            </div>
            <Text size="xs" variant="muted">
              Dark surfaces use scale + shadow for depth, not bright highlights
            </Text>
          </CardContent>
        </Card>

        <Card className="border-yellow-400/20 bg-yellow-400/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded" />
              Gold Accent States
            </CardTitle>
            <CardDescription>
              Premium gold highlights for special interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-yellow-400/30 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-200"
              >
                Gold accent button
              </Button>
              <div className="p-4 border border-yellow-400/30 rounded-lg transition-all duration-200 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 hover:bg-yellow-400/10">
                <Text size="sm">Gold accent card</Text>
              </div>
            </div>
            <Text size="xs" variant="muted">
              Gold accents reserved for primary actions and special states
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}; 
