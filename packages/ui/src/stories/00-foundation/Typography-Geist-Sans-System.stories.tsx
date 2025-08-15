/**
 * HIVE Typography System: Geist Sans
 * Comprehensive documentation of Geist Sans typography system for campus-first social utility
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Copy, Check, Type, Smartphone, Monitor, Tablet } from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '05-Typography/Geist Sans System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Typography System: Geist Sans

Comprehensive typography documentation showcasing Geist Sans implementation across HIVE's campus-first social utility platform.

## Typography Philosophy
- **Campus Readability**: Optimized for mobile-first campus life
- **Social Hierarchy**: Clear information architecture for social content
- **Utility First**: Typography that serves both connection and function
- **Performance**: System fonts with Geist Sans as premium enhancement

## Implementation
- Primary: Geist Sans (when available)
- Fallback: Inter, system-ui, sans-serif
- Mobile-first responsive scaling
- Dark theme optimized contrast ratios
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TypographyShowcase = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Geist Sans Typography Scale with Campus Context
  const typographyScale = {
    display: {
      '2xl': {
        name: 'Display 2XL - Platform Branding',
        size: 'clamp(3.5rem, 8vw, 4.5rem)',
        weight: '700',
        lineHeight: '1.1',
        usage: 'HIVE logo, major platform announcements',
        example: 'Welcome to HIVE'
      },
      'xl': {
        name: 'Display XL - Hero Headlines',
        size: 'clamp(2.5rem, 6vw, 3.5rem)',
        weight: '700',
        lineHeight: '1.2',
        usage: 'Landing pages, onboarding flow headers',
        example: 'Join Your Campus Community'
      },
      'lg': {
        name: 'Display LG - Section Headers',
        size: 'clamp(2rem, 5vw, 2.5rem)',
        weight: '600',
        lineHeight: '1.3',
        usage: 'Page section headers, modal titles',
        example: 'Discover Spaces'
      }
    },
    heading: {
      'xl': {
        name: 'Heading XL - Page Titles',
        size: 'clamp(1.75rem, 4vw, 2rem)',
        weight: '600',
        lineHeight: '1.3',
        usage: 'Main page titles, profile headers',
        example: 'CS 101 Study Group'
      },
      'lg': {
        name: 'Heading LG - Card Titles',
        size: 'clamp(1.5rem, 3.5vw, 1.75rem)',
        weight: '600',
        lineHeight: '1.4',
        usage: 'Space cards, tool cards, major components',
        example: 'Weekly Study Sessions'
      },
      'md': {
        name: 'Heading MD - Widget Headers',
        size: 'clamp(1.25rem, 3vw, 1.5rem)',
        weight: '500',
        lineHeight: '1.4',
        usage: 'Widget titles, form section headers',
        example: 'Recent Activity'
      },
      'sm': {
        name: 'Heading SM - Component Labels',
        size: 'clamp(1.125rem, 2.5vw, 1.25rem)',
        weight: '500',
        lineHeight: '1.5',
        usage: 'Component headers, navigation labels',
        example: 'Your Spaces'
      }
    },
    body: {
      'lg': {
        name: 'Body LG - Primary Content',
        size: 'clamp(1.125rem, 2.5vw, 1.25rem)',
        weight: '400',
        lineHeight: '1.6',
        usage: 'Main content, post descriptions, bios',
        example: 'Join our weekly study sessions every Tuesday at 7pm in the library. We cover programming fundamentals and work on problem sets together.'
      },
      'md': {
        name: 'Body MD - Standard Text',
        size: 'clamp(1rem, 2vw, 1.125rem)',
        weight: '400',
        lineHeight: '1.6',
        usage: 'Standard interface text, descriptions',
        example: 'Connect with classmates and coordinate study sessions for better academic success.'
      },
      'sm': {
        name: 'Body SM - Secondary Info',
        size: 'clamp(0.875rem, 1.8vw, 1rem)',
        weight: '400',
        lineHeight: '1.5',
        usage: 'Secondary information, metadata, captions',
        example: '24 members • Active • Computer Science'
      },
      'xs': {
        name: 'Body XS - Micro Text',
        size: 'clamp(0.75rem, 1.5vw, 0.875rem)',
        weight: '400',
        lineHeight: '1.4',
        usage: 'Timestamps, fine print, micro interactions',
        example: '2 minutes ago • @buffalo.edu'
      }
    }
  };

  const campusUseCases = [
    {
      title: 'Space Discovery Feed',
      description: 'Typography hierarchy for browsing campus communities',
      components: [
        { level: 'Heading XL', text: 'Discover Spaces', usage: 'Page title' },
        { level: 'Heading LG', text: 'CS 101 Study Group', usage: 'Space name' },
        { level: 'Body MD', text: 'Weekly programming sessions with peer support', usage: 'Description' },
        { level: 'Body SM', text: '24 members • Computer Science', usage: 'Metadata' }
      ]
    },
    {
      title: 'User Profile System',
      description: 'Personal identity and social proof display',
      components: [
        { level: 'Heading XL', text: 'Sarah Chen', usage: 'Profile name' },
        { level: 'Body LG', text: 'CS Major building tools for better campus life', usage: 'Bio' },
        { level: 'Heading SM', text: 'Recent Activity', usage: 'Section header' },
        { level: 'Body SM', text: 'Joined "Database Design Workshop"', usage: 'Activity item' }
      ]
    },
    {
      title: 'Tool Builder Interface',
      description: 'Creating and sharing campus utilities',
      components: [
        { level: 'Display LG', text: 'Build Your Tool', usage: 'Hero title' },
        { level: 'Heading LG', text: 'Study Room Finder', usage: 'Tool name' },
        { level: 'Body MD', text: 'Help students find available study spaces across campus', usage: 'Purpose' },
        { level: 'Body XS', text: 'Last updated 5 minutes ago', usage: 'Timestamp' }
      ]
    }
  ];

  const deviceScaling = {
    mobile: {
      icon: Smartphone,
      name: 'Mobile First',
      description: 'Primary campus experience - thumbs and walking',
      viewport: '320px - 768px',
      considerations: [
        'Thumb-reachable tap targets (44px minimum)',
        'High contrast for outdoor reading',
        'Condensed information hierarchy',
        'Single-column layouts prioritized'
      ]
    },
    tablet: {
      icon: Tablet,
      name: 'Tablet Adaptation',
      description: 'Study sessions and collaborative work',
      viewport: '768px - 1024px',
      considerations: [
        'Two-column layouts for efficiency',
        'Larger typography for group viewing',
        'Touch-friendly with precision interactions',
        'Landscape-optimized reading flows'
      ]
    },
    desktop: {
      icon: Monitor,
      name: 'Desktop Experience',
      description: 'Full-featured creation and administration',
      viewport: '1024px+',
      considerations: [
        'Multi-column complex layouts',
        'Keyboard navigation optimization',
        'Dense information display capability',
        'Creator tools and advanced features'
      ]
    }
  };

  const TypeScaleExample = ({ 
    category, 
    examples, 
    index 
  }: { 
    category: string; 
    examples: any; 
    index: number;
  }) => (
    <motion.div
      variants={hiveVariants.feedCascade}
      custom={index}
      className="space-y-6"
    >
      <Card className="hive-glass border hive-interactive cursor-pointer"
            style={{
              background: 'var(--hive-overlay-glass)',
              borderColor: 'var(--hive-border-subtle)',
              transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
              e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
        <CardHeader>
          <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
            <Type className="w-5 h-5 mr-2" />
            {category.charAt(0).toUpperCase() + category.slice(1)} Scale
          </CardTitle>
          <p style={{ color: 'var(--hive-text-muted)' }}>
            {category === 'display' ? 'Hero typography for major platform moments' :
             category === 'heading' ? 'Structural hierarchy for information organization' :
             'Body text optimized for campus reading conditions'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(examples).map(([size, config]: [string, any]) => (
            <motion.div 
              key={size}
              className="space-y-3"
              onHoverStart={() => setHoveredSection(`${category}-${size}`)}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                      {config.name}
                    </h4>
                    <Badge variant="outline" 
                           className="text-xs"
                           style={{ 
                             borderColor: 'var(--hive-border-subtle)',
                             color: 'var(--hive-text-muted)'
                           }}>
                      {config.size}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(`font-size: ${config.size}; font-weight: ${config.weight}; line-height: ${config.lineHeight};`)}
                    >
                      {copiedText?.includes(config.size) ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  
                  <div 
                    className="mb-3 cursor-pointer hive-interactive group"
                    style={{
                      fontSize: config.size,
                      fontWeight: config.weight,
                      lineHeight: config.lineHeight,
                      color: 'var(--hive-text-primary)',
                      fontFamily: 'Geist Sans, Inter, system-ui, sans-serif',
                      transition: 'color var(--hive-duration-quick) var(--hive-easing-smooth)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--hive-brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--hive-text-primary)';
                    }}
                    onClick={() => copyToClipboard(config.example)}
                  >
                    {config.example}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                      <strong>Usage:</strong> {config.usage}
                    </p>
                    <div className="flex space-x-4 text-xs" style={{ color: 'var(--hive-text-disabled)' }}>
                      <span>Weight: {config.weight}</span>
                      <span>Line Height: {config.lineHeight}</span>
                      <span>Responsive: {config.size.includes('clamp') ? 'Yes' : 'Fixed'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-8" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <Type className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent"
                style={{ fontFamily: 'Geist Sans, Inter, system-ui, sans-serif' }}>
              Geist Sans Typography
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            HIVE's typography system built on Geist Sans - optimized for campus-first social utility experiences across all devices.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">Geist Sans Primary</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile First</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Readable</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Social Hierarchy</Badge>
          </div>
          
          {copiedText && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-lg border" 
              style={{ 
                backgroundColor: 'var(--hive-status-success)',
                borderColor: 'var(--hive-border-gold)',
                color: 'var(--hive-text-inverse)'
              }}
            >
              ✓ Typography copied to clipboard
            </motion.div>
          )}
        </motion.div>

        {/* Device Context Switcher */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Campus Device Context
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Typography scales responsively across the devices students use throughout their campus day
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(deviceScaling).map(([device, config]) => {
                  const IconComponent = config.icon;
                  const isActive = activeDevice === device;
                  return (
                    <Button
                      key={device}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className="hive-interactive"
                      style={isActive ? {
                        backgroundColor: 'var(--hive-brand-primary)',
                        color: 'var(--hive-text-inverse)',
                        borderColor: 'var(--hive-border-gold)'
                      } : {
                        borderColor: 'var(--hive-border-primary)',
                        color: 'var(--hive-text-secondary)'
                      }}
                      onClick={() => setActiveDevice(device as any)}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {config.name}
                    </Button>
                  );
                })}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDevice}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                      {deviceScaling[activeDevice].name} - {deviceScaling[activeDevice].viewport}
                    </h4>
                    <p className="text-sm mb-4" style={{ color: 'var(--hive-text-secondary)' }}>
                      {deviceScaling[activeDevice].description}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                      Typography Considerations:
                    </h5>
                    <ul className="space-y-1">
                      {deviceScaling[activeDevice].considerations.map((consideration, idx) => (
                        <li key={idx} className="text-sm flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                          <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                               style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Typography Scale Sections */}
        <motion.div 
          className="space-y-8"
          variants={hiveVariants.feedCascade}
          initial="hidden"
          animate="visible"
        >
          <TypeScaleExample category="display" examples={typographyScale.display} index={0} />
          <TypeScaleExample category="heading" examples={typographyScale.heading} index={1} />
          <TypeScaleExample category="body" examples={typographyScale.body} index={2} />
        </motion.div>

        {/* Campus Use Cases */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Campus Use Case Examples
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                See how typography hierarchy creates clear information architecture for campus social utility
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {campusUseCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    className="space-y-4 p-4 rounded-lg border hive-interactive"
                    style={{
                      backgroundColor: 'var(--hive-background-secondary)',
                      borderColor: 'var(--hive-border-primary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    }}
                  >
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                        {useCase.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                        {useCase.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {useCase.components.map((component, idx) => {
                        const scale = typographyScale[component.level.toLowerCase().split(' ')[0] as keyof typeof typographyScale];
                        const size = component.level.toLowerCase().split(' ')[1] || 'md';
                        const config = scale?.[size as keyof typeof scale] as any;
                        
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" 
                                     className="text-xs"
                                     style={{ 
                                       borderColor: 'var(--hive-border-subtle)',
                                       color: 'var(--hive-text-muted)'
                                     }}>
                                {component.level}
                              </Badge>
                              <span className="text-xs" style={{ color: 'var(--hive-text-disabled)' }}>
                                {component.usage}
                              </span>
                            </div>
                            <div 
                              className="cursor-pointer"
                              style={{
                                fontSize: config?.size || '1rem',
                                fontWeight: config?.weight || '400',
                                lineHeight: config?.lineHeight || '1.5',
                                color: 'var(--hive-text-primary)',
                                fontFamily: 'Geist Sans, Inter, system-ui, sans-serif'
                              }}
                              onClick={() => copyToClipboard(component.text)}
                            >
                              {component.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Technical requirements for implementing HIVE's Geist Sans typography system
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                    Font Stack & Loading
                  </h4>
                  <div className="p-3 rounded-lg font-mono text-sm"
                       style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                    <div>font-family: 'Geist Sans',</div>
                    <div className="pl-12">Inter,</div>
                    <div className="pl-12">system-ui,</div>
                    <div className="pl-12">sans-serif;</div>
                  </div>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                    <li>• Geist Sans via Vercel font optimization</li>
                    <li>• Inter as premium fallback</li>
                    <li>• System fonts for performance</li>
                    <li>• Preload critical font weights (400, 500, 600)</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                    Responsive Strategy
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 rounded text-sm font-mono"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      clamp(min, preferred, max)
                    </div>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                      <li>• Mobile-first minimum sizes</li>
                      <li>• Viewport-based preferred scaling</li>
                      <li>• Desktop maximum limits</li>
                      <li>• Fluid typography for all devices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const GeistSansTypography: Story = {
  render: () => <TypographyShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};