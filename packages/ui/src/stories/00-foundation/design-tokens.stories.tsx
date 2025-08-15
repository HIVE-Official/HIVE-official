/**
 * DESIGN TOKENS - HIVE FOUNDATION SYSTEM
 * 
 * The DNA of HIVE design system - colors, typography, spacing, shadows, and motion
 * that create consistent visual language across the entire University at Buffalo platform.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  Palette,
  Type,
  Ruler,
  Layers,
  Zap,
  Search,
  Copy,
  CheckCircle,
  Eye,
  Lightbulb,
  Monitor,
  Smartphone,
  Contrast
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🎨 01-Foundation/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🎨 Design Tokens - HIVE Foundation System

**The visual DNA that creates consistent University at Buffalo campus platform experiences**

Design tokens are the foundational elements that ensure visual consistency across every component, screen, and interaction in HIVE. These atomic design decisions create the cohesive experience that makes HIVE feel like a unified platform designed specifically for campus social utility.

## 🧬 TOKEN PHILOSOPHY

### **Campus-First Design Language**
Every token reflects authentic university experiences:
- **Color System** - Warm, approachable colors that feel both professional and social
- **Typography** - Clear, accessible type that works for academic and social content
- **Spacing System** - Consistent rhythm that creates scannable, organized interfaces
- **Shadow System** - Subtle depth that enhances usability without distraction

### **Semantic Token Architecture**
- **Primitive Tokens** - Raw values (hex colors, pixel measurements)
- **Semantic Tokens** - Contextual usage (text-primary, background-secondary)
- **Component Tokens** - Component-specific overrides (button-primary-bg)
- **Theme Tokens** - Mode variations (dark-text-primary, light-background)

## 🎨 COLOR SYSTEM

### **Brand Colors**
- **Primary Gold** - \`#D4A574\` - HIVE's signature warmth and approachability
- **Accent Copper** - \`#B8956A\` - Complementary richness for highlights
- **Secondary Navy** - \`#2D3748\` - Professional depth for text and structure

### **Semantic Color Palette**
- **Text Colors** - Primary, secondary, muted, inverse with 4.5:1+ contrast
- **Background Colors** - Primary, secondary, tertiary for layered interfaces
- **Border Colors** - Default, accent, focus for clear visual hierarchy
- **Status Colors** - Success, warning, error, info with campus context

### **Campus Context Colors**
- **Academic** - Blue tones for educational content and tools
- **Social** - Warm tones for community features and interactions
- **Administrative** - Professional grays for official functions
- **Seasonal** - Subtle variations that reflect campus calendar

## 📝 TYPOGRAPHY SYSTEM

### **Font Family**
- **Inter Variable** - Modern, highly legible sans-serif optimized for screens
- **Monospace** - JetBrains Mono for code snippets and technical content
- **System Fallbacks** - Robust fallback stack for any device

### **Type Scale**
- **Display** - 48px/52px - Hero sections, major headings
- **Heading 1** - 36px/40px - Page titles, section headers
- **Heading 2** - 30px/36px - Subsection headers
- **Heading 3** - 24px/32px - Component titles
- **Body Large** - 18px/28px - Important body text, introductions
- **Body** - 16px/24px - Default body text, descriptions
- **Body Small** - 14px/20px - Secondary text, captions
- **Caption** - 12px/16px - Labels, metadata, timestamps

### **Font Weights**
- **400 Regular** - Body text, descriptions
- **500 Medium** - Emphasis, important labels
- **600 Semibold** - Headings, component titles
- **700 Bold** - Major headings, call-to-action text

## 📏 SPACING SYSTEM

### **Base Unit: 4px**
All spacing follows 4px base unit for pixel-perfect alignment:
- **xs** - 4px - Tight spacing, inline elements
- **sm** - 8px - Close relationships, form fields
- **md** - 16px - Standard spacing, component padding
- **lg** - 24px - Section spacing, card padding
- **xl** - 32px - Major section breaks
- **2xl** - 48px - Page section spacing
- **3xl** - 64px - Large breakpoint spacing

### **Campus Layout Patterns**
- **Content Width** - 1200px max-width for readability
- **Sidebar Width** - 280px for navigation and tools
- **Mobile Margins** - 16px minimum for thumb accessibility
- **Touch Targets** - 44px minimum for mobile interactions

## 🌊 SHADOW SYSTEM

### **Elevation Hierarchy**
- **Level 0** - No shadow - Flat elements, backgrounds
- **Level 1** - Subtle shadow - Cards, form inputs
- **Level 2** - Medium shadow - Dropdowns, tooltips
- **Level 3** - Strong shadow - Modals, floating panels
- **Level 4** - Maximum shadow - Critical alerts, overlays

### **Campus Context Shadows**
- **Academic** - Cooler shadow tones for educational interfaces
- **Social** - Warmer shadow tones for community features
- **Interactive** - Enhanced shadows for hover and focus states
- **Accessibility** - High contrast shadows for visibility needs

## ⚡ MOTION SYSTEM

### **Animation Durations**
- **Immediate** - 100ms - Hover states, micro-interactions
- **Quick** - 200ms - State changes, toggles
- **Standard** - 300ms - Page transitions, drawer open/close
- **Deliberate** - 500ms - Modal appearances, major state changes

### **Easing Functions**
- **Linear** - Constant speed for progress indicators
- **Ease-out** - Natural deceleration for UI entrances
- **Ease-in** - Natural acceleration for UI exits
- **Bounce** - Playful emphasis for success states

### **Campus Motion Patterns**
- **Academic Focus** - Smooth, professional transitions
- **Social Energy** - Slightly more playful, engaging animations
- **Mobile Context** - Optimized for touch interactions and gestures
- **Accessibility** - Reduced motion options for user preferences
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// COLOR SYSTEM DATA
// =============================================================================

const colorCategories = [
  {
    id: 'brand',
    title: 'Brand Colors',
    description: 'Core HIVE brand identity colors',
    colors: [
      { name: 'Primary Gold', var: '--hive-brand-primary', hex: '#D4A574', usage: 'Primary actions, brand elements' },
      { name: 'Accent Copper', var: '--hive-brand-accent', hex: '#B8956A', usage: 'Highlights, secondary actions' },
      { name: 'Secondary Navy', var: '--hive-brand-secondary', hex: '#2D3748', usage: 'Professional elements, structure' }
    ]
  },
  {
    id: 'text',
    title: 'Text Colors',
    description: 'Semantic text color hierarchy',
    colors: [
      { name: 'Primary Text', var: '--hive-text-primary', hex: '#FFFFFF', usage: 'Main content, headings' },
      { name: 'Secondary Text', var: '--hive-text-secondary', hex: '#A0A0A0', usage: 'Supporting text, descriptions' },
      { name: 'Muted Text', var: '--hive-text-muted', hex: '#6B7280', usage: 'Placeholder text, disabled states' },
      { name: 'Inverse Text', var: '--hive-text-inverse', hex: '#000000', usage: 'Text on brand backgrounds' }
    ]
  },
  {
    id: 'background',
    title: 'Background Colors',
    description: 'Layered background system',
    colors: [
      { name: 'Primary Background', var: '--hive-background-primary', hex: '#0A0A0A', usage: 'Main app background' },
      { name: 'Secondary Background', var: '--hive-background-secondary', hex: '#1A1A1A', usage: 'Card backgrounds, panels' },
      { name: 'Tertiary Background', var: '--hive-background-tertiary', hex: '#2A2A2A', usage: 'Input fields, subtle areas' }
    ]
  },
  {
    id: 'border',
    title: 'Border Colors',
    description: 'Visual hierarchy and structure',
    colors: [
      { name: 'Default Border', var: '--hive-border-default', hex: '#333333', usage: 'Standard borders, dividers' },
      { name: 'Accent Border', var: '--hive-border-accent', hex: '--hive-brand-primary', usage: 'Highlighted borders' },
      { name: 'Focus Border', var: '--hive-border-focus', hex: '--hive-brand-primary', usage: 'Focus indicators' },
      { name: 'Gold Border', var: '--hive-border-gold', hex: '--hive-brand-primary', usage: 'Premium elements' }
    ]
  }
];

const typographyScale = [
  { name: 'Display', size: '48px', lineHeight: '52px', weight: '700', usage: 'Hero sections, major headings' },
  { name: 'Heading 1', size: '36px', lineHeight: '40px', weight: '600', usage: 'Page titles, section headers' },
  { name: 'Heading 2', size: '30px', lineHeight: '36px', weight: '600', usage: 'Subsection headers' },
  { name: 'Heading 3', size: '24px', lineHeight: '32px', weight: '600', usage: 'Component titles' },
  { name: 'Body Large', size: '18px', lineHeight: '28px', weight: '400', usage: 'Important body text' },
  { name: 'Body', size: '16px', lineHeight: '24px', weight: '400', usage: 'Default body text' },
  { name: 'Body Small', size: '14px', lineHeight: '20px', weight: '400', usage: 'Secondary text' },
  { name: 'Caption', size: '12px', lineHeight: '16px', weight: '400', usage: 'Labels, metadata' }
];

const spacingScale = [
  { name: 'xs', value: '4px', usage: 'Tight spacing, inline elements' },
  { name: 'sm', value: '8px', usage: 'Close relationships, form fields' },
  { name: 'md', value: '16px', usage: 'Standard spacing, component padding' },
  { name: 'lg', value: '24px', usage: 'Section spacing, card padding' },
  { name: 'xl', value: '32px', usage: 'Major section breaks' },
  { name: '2xl', value: '48px', usage: 'Page section spacing' },
  { name: '3xl', value: '64px', usage: 'Large breakpoint spacing' }
];

const shadowLevels = [
  { level: 0, name: 'None', shadow: 'none', usage: 'Flat elements, backgrounds' },
  { level: 1, name: 'Subtle', shadow: '0 1px 3px rgba(0, 0, 0, 0.12)', usage: 'Cards, form inputs' },
  { level: 2, name: 'Medium', shadow: '0 4px 6px rgba(0, 0, 0, 0.15)', usage: 'Dropdowns, tooltips' },
  { level: 3, name: 'Strong', shadow: '0 8px 25px rgba(0, 0, 0, 0.18)', usage: 'Modals, floating panels' },
  { level: 4, name: 'Maximum', shadow: '0 16px 40px rgba(0, 0, 0, 0.25)', usage: 'Critical alerts, overlays' }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const ColorShowcase = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        HIVE Color System
      </h3>
      
      {colorCategories.map((category) => (
        <Card key={category.id} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
              <Palette className="w-5 h-5" />
              {category.title}
            </CardTitle>
            <p className="text-sm text-[var(--hive-text-secondary)]">{category.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
                  <div 
                    className="w-12 h-12 rounded-lg border border-[var(--hive-border-default)] flex-shrink-0"
                    style={{ backgroundColor: color.hex.startsWith('#') ? color.hex : `var(${color.hex})` }}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[var(--hive-text-primary)] mb-1">{color.name}</div>
                    <div className="text-xs text-[var(--hive-text-muted)] mb-1">{color.usage}</div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-[var(--hive-text-secondary)] bg-[var(--hive-background-tertiary)] px-2 py-1 rounded">
                        {color.var}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(color.var, color.name)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedColor === color.name ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TypographyShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Typography System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Type className="w-5 h-5" />
            Type Scale & Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {typographyScale.map((type, index) => (
            <div key={index} className="border-b border-[var(--hive-border-default)] pb-4 last:border-b-0">
              <div 
                className="text-[var(--hive-text-primary)] mb-2"
                style={{ 
                  fontSize: type.size, 
                  lineHeight: type.lineHeight, 
                  fontWeight: type.weight 
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]">
                <span className="font-medium">{type.name}</span>
                <span>{type.size}/{type.lineHeight}</span>
                <span>Weight {type.weight}</span>
                <span className="text-[var(--hive-text-muted)]">{type.usage}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const SpacingShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Spacing System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Ruler className="w-5 h-5" />
            4px Base Unit System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spacingScale.map((spacing, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm font-mono text-[var(--hive-text-primary)]">
                  {spacing.name}
                </div>
                <div 
                  className="bg-[var(--hive-brand-primary)] h-8 rounded"
                  style={{ width: spacing.value }}
                />
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  {spacing.value}
                </div>
                <div className="text-sm text-[var(--hive-text-muted)]">
                  {spacing.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ShadowShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Shadow System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Layers className="w-5 h-5" />
            Elevation Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shadowLevels.map((shadow, index) => (
              <div key={index} className="space-y-2">
                <div 
                  className="h-24 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg flex items-center justify-center"
                  style={{ boxShadow: shadow.shadow }}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                      Level {shadow.level}
                    </div>
                    <div className="text-xs text-[var(--hive-text-secondary)]">
                      {shadow.name}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[var(--hive-text-muted)]">
                  {shadow.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// DESIGN TOKENS MAIN COMPONENT
// =============================================================================

const DesignTokensSystem = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Ruler },
    { id: 'shadows', label: 'Shadows', icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Lightbulb className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Design Tokens
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Foundation System
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The visual DNA that creates consistent University at Buffalo campus platform experiences. 
            Every color, spacing, and typography decision designed for authentic campus social utility.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
            <Input
              type="text"
              placeholder="Search design tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]"
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {activeSection === 'colors' && <ColorShowcase />}
          {activeSection === 'typography' && <TypographyShowcase />}
          {activeSection === 'spacing' && <SpacingShowcase />}
          {activeSection === 'shadows' && <ShadowShowcase />}
        </div>

        {/* Campus Context */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Monitor className="w-5 h-5" />
              Campus Platform Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Accessibility Standards
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• WCAG 2.1 AA color contrast (4.5:1+)</div>
                  <div>• 44px+ touch targets for mobile</div>
                  <div>• High contrast mode support</div>
                  <div>• Screen reader optimized hierarchy</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Campus Usage
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Between-class quick interactions</div>
                  <div>• One-handed thumb navigation</div>
                  <div>• Poor WiFi performance optimization</div>
                  <div>• Thumb-reachable UI elements</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Contrast className="w-4 h-4" />
                  Campus Context
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• University at Buffalo branding</div>
                  <div>• Academic calendar awareness</div>
                  <div>• Campus social dynamics</div>
                  <div>• Professional + social balance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const CompleteDesignSystem: Story = {
  render: () => <DesignTokensSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete HIVE design token system with interactive showcases for colors, typography, spacing, and shadows optimized for University at Buffalo campus usage.'
      }
    }
  }
};

export const ColorSystem: Story = {
  render: () => <ColorShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'HIVE color system with brand colors, semantic hierarchy, and campus context optimizations.'
      }
    }
  }
};

export const TypographySystem: Story = {
  render: () => <TypographyShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Typography scale and hierarchy designed for campus content readability and accessibility.'
      }
    }
  }
};

export const SpacingSystem: Story = {
  render: () => <SpacingShowcase />,
  parameters: {
    docs: {
      description: {
        story: '4px base unit spacing system that creates consistent rhythm across all HIVE interfaces.'
      }
    }
  }
};

export const ShadowSystem: Story = {
  render: () => <ShadowShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Five-level elevation system that creates clear visual hierarchy and depth in campus interfaces.'
      }
    }
  }
};