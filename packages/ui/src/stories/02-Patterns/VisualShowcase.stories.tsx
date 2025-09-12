import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EnhancedCard } from '../../components/visual-improvements/enhanced-card';
import { EnhancedButton } from '../../components/visual-improvements/enhanced-button';
import { 
  EnhancedTypography, 
  HeroText, 
  EnergyText, 
  HandwrittenText, 
  NeonText, 
  StickerText 
} from '../../components/visual-improvements/enhanced-typography';
import { 
  GoldParticles,
  EnergyRipple,
  GlowAura,
  EnergyMeter,
  MagneticField,
  HolographicBorder,
  RetroScanLines,
  CampusMesh,
  EnergyBurst,
  FloatingElement
} from '../../components/visual-improvements/visual-effects';
import { Heart, Zap, Sparkles, Star, Users, Coffee } from 'lucide-react';

const meta = {
  title: 'Visual Improvements/🎨 Enhanced UI Showcase',
  component: EnhancedCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Enhanced Visual Components

This showcase demonstrates how to make HIVE's UI distinctive and memorable instead of generic.

## What's Different:
- **Bold Visual Personality**: Components have character and energy
- **Campus-Specific Design**: UI that feels like campus life, not corporate software
- **Meaningful Animations**: Motion that enhances the experience
- **Gold That Glows**: Strategic use of accent color for maximum impact
- **Distinctive Typography**: Text that has personality and hierarchy

## Philosophy:
Stop designing like every other React app. Create something Gen Z will remember.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const VisualShowcase: Story = {
  render: () => {
    const [energy, setEnergy] = useState(75);
    const [burstTrigger, setBurstTrigger] = useState(false);
    const [rippleTrigger, setRippleTrigger] = useState(false);

    const triggerBurst = () => {
      setBurstTrigger(true);
      setTimeout(() => setBurstTrigger(false), 1000);
    };

    const triggerRipple = () => {
      setRippleTrigger(true);
      setTimeout(() => setRippleTrigger(false), 2000);
    };

    return (
      <div className="min-h-screen bg-black text-white p-8 space-y-16 overflow-hidden relative">
        {/* Background Effects */}
        <CampusMesh opacity={0.05} />
        <GoldParticles density={15} />

        {/* Hero Section */}
        <div className="text-center space-y-8 relative">
          <HeroText className="relative">
            HIVE Enhanced UI
            <GlowAura intensity="high" />
          </HeroText>
          
          <EnergyText>Where Basic UI Goes to Die</EnergyText>
          
          <div className="flex justify-center gap-4">
            <EnergyMeter level={energy} />
            <div className="flex gap-2">
              <EnhancedButton 
                variant="chunky" 
                size="sm"
                onClick={() => setEnergy(Math.min(100, energy + 10))}
              >
                + Energy
              </EnhancedButton>
              <EnhancedButton 
                variant="neon" 
                size="sm"
                onClick={() => setEnergy(Math.max(0, energy - 10))}
              >
                - Energy
              </EnhancedButton>
            </div>
          </div>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="space-y-8">
          <NeonText>Enhanced Cards</NeonText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedCard variant="signature" elevation="high" className="p-6 relative">
              <RetroScanLines />
              <h3 className="text-xl font-bold text-accent mb-3">Signature Style</h3>
              <p className="text-foreground mb-4">Angled corners + thick gold accent = instant recognition</p>
              <EnhancedButton variant="signature" size="sm">
                Get Started
              </EnhancedButton>
            </EnhancedCard>

            <EnhancedCard variant="bulletin" className="p-6 relative">
              <div className="bulletin-pin" />
              <h3 className="text-xl font-bold mb-3">Bulletin Board</h3>
              <HandwrittenText>Feels like real campus life</HandwrittenText>
              <p className="text-foreground mt-2">Posted 2 hours ago</p>
            </EnhancedCard>

            <EnhancedCard variant="pulse" className="p-6 relative">
              <GlowAura intensity="medium" />
              <h3 className="text-xl font-bold text-accent mb-3">Energy Pulse</h3>
              <p className="text-foreground mb-4">Living, breathing interface</p>
              <div className="flex items-center gap-2 text-accent">
                <Zap className="w-4 h-4" />
                <span className="text-sm">High Activity</span>
              </div>
            </EnhancedCard>

            <EnhancedCard variant="neon" className="p-6 relative">
              <h3 className="text-xl font-bold text-accent mb-3">Neon Glow</h3>
              <p className="text-foreground mb-4">Cyberpunk meets campus</p>
              <EnhancedButton variant="neon" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Activate
              </EnhancedButton>
            </EnhancedCard>

            <HolographicBorder className="p-6">
              <h3 className="text-xl font-bold text-accent mb-3">Holographic</h3>
              <p className="text-foreground mb-4">Future-tech aesthetic</p>
              <div className="flex gap-2">
                <Star className="w-5 h-5 text-accent" />
                <Star className="w-5 h-5 text-accent" />
                <Star className="w-5 h-5 text-accent" />
              </div>
            </HolographicBorder>

            <EnhancedCard variant="mesh" className="p-6 relative">
              <h3 className="text-xl font-bold mb-3">Campus Mesh</h3>
              <p className="text-foreground mb-4">Technical meets organic</p>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">247 online</span>
              </div>
            </EnhancedCard>
          </div>
        </div>

        {/* Enhanced Buttons */}
        <div className="space-y-8">
          <NeonText>Enhanced Buttons</NeonText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Bold & Chunky</h4>
              <div className="space-y-3">
                <EnhancedButton variant="chunky" className="w-full">
                  Join the Chaos
                </EnhancedButton>
                <EnhancedButton variant="sticker" className="w-full">
                  <Coffee className="w-4 h-4 mr-2" />
                  Study Group
                </EnhancedButton>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Neon Energy</h4>
              <div className="space-y-3">
                <MagneticField active>
                  <EnhancedButton variant="neon" className="w-full" onClick={triggerBurst}>
                    <Zap className="w-4 h-4 mr-2" />
                    Energy Burst
                  </EnhancedButton>
                </MagneticField>
                <EnhancedButton variant="magnetic" className="w-full" onClick={triggerRipple}>
                  Create Ripple
                </EnhancedButton>
                <EnergyRipple trigger={rippleTrigger} />
                <EnergyBurst trigger={burstTrigger} />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Signature Style</h4>
              <div className="space-y-3">
                <EnhancedButton variant="signature" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Connect
                </EnhancedButton>
                <EnhancedButton variant="pulse" className="w-full">
                  Live Campus Feed
                </EnhancedButton>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="space-y-8">
          <NeonText>Typography with Personality</NeonText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <EnergyText>Campus Energy Text</EnergyText>
              <HandwrittenText>Personal, authentic messaging</HandwrittenText>
              <StickerText>Sticker Bomb Style</StickerText>
              
              <EnhancedTypography variant="chalk" as="h3">
                Chalk Board Announcements
              </EnhancedTypography>
            </div>
            
            <div className="space-y-6">
              <EnhancedTypography variant="gradient" as="h3">
                Smooth Gradient Flow
              </EnhancedTypography>
              
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Regular boring text vs:</p>
                <EnhancedTypography variant="energy">
                  TEXT WITH ACTUAL ENERGY
                </EnhancedTypography>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Effects Demo */}
        <div className="space-y-8">
          <NeonText>Interactive Effects</NeonText>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingElement delay={0} duration={3}>
              <EnhancedCard variant="pulse" className="p-6 text-center">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-bold">Floating Elements</h4>
                <p className="text-sm text-muted-foreground">Subtle motion brings life</p>
              </EnhancedCard>
            </FloatingElement>

            <FloatingElement delay={1} duration={4}>
              <EnhancedCard variant="neon" className="p-6 text-center">
                <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-bold">Energy States</h4>
                <p className="text-sm text-muted-foreground">Interface adapts to mood</p>
              </EnhancedCard>
            </FloatingElement>

            <FloatingElement delay={2} duration={3.5}>
              <EnhancedCard variant="mesh" className="p-6 text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-bold">Campus Vibes</h4>
                <p className="text-sm text-muted-foreground">Feels like your campus</p>
              </EnhancedCard>
            </FloatingElement>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="space-y-8">
          <NeonText>Before vs After</NeonText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BEFORE - Generic */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-muted-foreground">❌ Generic & Boring</h4>
              <div className="bg-surface border border-border rounded-lg p-4">
                <h5 className="font-medium mb-2">Study Group</h5>
                <p className="text-sm text-muted-foreground mb-3">Join our study session</p>
                <button className="bg-surface border border-border text-foreground px-4 py-2 rounded text-sm">
                  Join
                </button>
              </div>
            </div>

            {/* AFTER - Enhanced */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">✅ HIVE Enhanced</h4>
              <EnhancedCard variant="signature" className="p-4 relative">
                <div className="bulletin-pin" />
                <HandwrittenText className="text-lg">Study Group Tonight!</HandwrittenText>
                <p className="text-foreground text-sm mt-2 mb-4">Coffee, chaos, and calculus ☕️</p>
                <MagneticField active>
                  <EnhancedButton variant="chunky" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Join the Chaos
                  </EnhancedButton>
                </MagneticField>
                <GlowAura intensity="low" />
              </EnhancedCard>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-16 border-t border-accent/20">
          <EnergyText>Stop Being Basic. Be HIVE.</EnergyText>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            These enhanced components transform generic UI into memorable, campus-native experiences 
            that Gen Z will actually want to use.
          </p>
        </div>
      </div>
    );
  },
};

export const ComponentComparison: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <HeroText>Before vs After Comparison</HeroText>
          <p className="text-muted-foreground text-lg">See the difference visual personality makes</p>
        </div>

        {/* Cards Comparison */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-accent text-center">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg text-muted-foreground">❌ Basic Card</h3>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-2">CS Study Group</h4>
                <p className="text-muted-foreground text-sm mb-4">Join us for algorithm review</p>
                <button className="bg-surface hover:bg-surface-01 px-4 py-2 rounded text-sm transition-colors">
                  Join Group
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-accent">✅ HIVE Enhanced</h3>
              <EnhancedCard variant="bulletin" className="p-6 relative">
                <h4 className="font-bold text-accent mb-2">CS Study Group</h4>
                <HandwrittenText>Algorithm madness tonight! 🤯</HandwrittenText>
                <p className="text-foreground text-sm mt-2 mb-4">Library 3rd floor, bring coffee</p>
                <EnhancedButton variant="sticker" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Count Me In!
                </EnhancedButton>
                <FloatingElement delay={0}>
                  <div className="absolute top-2 right-2">
                    <StickerText className="text-xs">HOT!</StickerText>
                  </div>
                </FloatingElement>
              </EnhancedCard>
            </div>
          </div>
        </div>

        {/* Buttons Comparison */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-accent text-center">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg text-muted-foreground">❌ Basic Buttons</h3>
              <div className="space-y-3">
                <button className="w-full bg-surface hover:bg-surface-01 text-foreground px-4 py-2 rounded transition-colors">
                  Primary Action
                </button>
                <button className="w-full border border-border text-foreground px-4 py-2 rounded hover:bg-surface transition-colors">
                  Secondary Action
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-accent">✅ HIVE Enhanced</h3>
              <div className="space-y-3">
                <MagneticField active>
                  <EnhancedButton variant="chunky" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join the Energy
                  </EnhancedButton>
                </MagneticField>
                <EnhancedButton variant="signature" className="w-full">
                  Explore Campus
                </EnhancedButton>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Comparison */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-accent text-center">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg text-muted-foreground">❌ Basic Typography</h3>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Welcome to Campus</h4>
                <h5 className="text-lg font-medium">Find Your Community</h5>
                <p className="text-muted-foreground">Connect with students</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-accent">✅ HIVE Enhanced</h3>
              <div className="space-y-3">
                <EnergyText>Welcome to Campus</EnergyText>
                <HandwrittenText>Find your tribe ✨</HandwrittenText>
                <EnhancedTypography variant="gradient">
                  Where connections happen
                </EnhancedTypography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};