/**
 * HIVE Responsive System: Breakpoints & Device Strategy
 * Comprehensive responsive design documentation for campus-first mobile experiences
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Watch,
  Wifi,
  Battery,
  Sun,
  Moon,
  Users,
  MapPin,
  Calendar,
  Zap,
  Eye,
  Hand,
  Navigation,
  Layers
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '07-Responsive/Breakpoints & Device Strategy',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Responsive System: Campus Device Strategy

Mobile-first responsive design documentation optimized for the real way students use devices throughout their campus day.

## Campus Device Context
- **Primary**: Mobile (walking, between classes, social moments)
- **Secondary**: Tablet (study sessions, collaborative work)
- **Tertiary**: Desktop (creation tools, administration)

## Responsive Philosophy
1. **Mobile First**: Start with thumbs and constraints
2. **Context Aware**: Different devices serve different campus moments
3. **Progressive Enhancement**: Add capability as screen real estate grows
4. **Touch Native**: All interactions optimized for touch first
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ResponsiveShowcase = () => {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [viewportWidth, setViewportWidth] = useState(375);
  const [hoveredBreakpoint, setHoveredBreakpoint] = useState<string | null>(null);

  // HIVE Responsive Breakpoints
  const breakpoints = {
    'xs': {
      name: 'Mobile Small',
      range: '320px - 375px',
      context: 'Walking between classes, quick interactions',
      primaryUse: 'Essential tasks only - notifications, quick messages, space discovery',
      layoutCols: 1,
      navPattern: 'Bottom tab bar',
      contentDensity: 'Minimal',
      touchTargets: '44px minimum',
      examples: ['iPhone SE', 'Small Android phones'],
      considerations: [
        'Single thumb operation',
        'High contrast for outdoor use',  
        'Minimal cognitive load',
        'Essential actions only'
      ]
    },
    'sm': {
      name: 'Mobile Standard',
      range: '375px - 640px',
      context: 'Primary campus device - walking, sitting, social moments',
      primaryUse: 'Full social utility experience - browsing, connecting, coordinating',
      layoutCols: 1,
      navPattern: 'Bottom tab bar + top context',
      contentDensity: 'Comfortable',
      touchTargets: '44px standard',
      examples: ['iPhone 12/13/14', 'Standard Android phones'],
      considerations: [
        'Thumb-friendly navigation',
        'Social content browsing',
        'Quick task completion',
        'Notification management'
      ]
    },
    'md': {
      name: 'Large Mobile / Small Tablet',
      range: '640px - 768px',
      context: 'Large phones, small tablets - study sessions, content creation',
      primaryUse: 'Enhanced interaction - longer content, basic creation tools',
      layoutCols: '1-2 flexible',
      navPattern: 'Side drawer available',
      contentDensity: 'Enhanced',
      touchTargets: '40px comfortable',
      examples: ['iPhone 12 Pro Max', 'iPad Mini', 'Large Android phones'],
      considerations: [
        'Two-handed usage patterns',
        'Longer content consumption',
        'Basic content creation',
        'Group viewing scenarios'
      ]
    },
    'lg': {
      name: 'Tablet Portrait',
      range: '768px - 1024px',
      context: 'Study groups, collaborative work, note-taking',
      primaryUse: 'Collaborative features - shared screens, content creation, presentations',
      layoutCols: '2-3 adaptive',
      navPattern: 'Side navigation + contextual',
      contentDensity: 'Rich',
      touchTargets: '38px efficient',
      examples: ['iPad', 'Android tablets', 'Laptop touchscreens'],
      considerations: [
        'Multi-column layouts',
        'Collaborative interfaces',
        'Content creation tools',
        'Landscape optimization'
      ]
    },
    'xl': {
      name: 'Desktop / Laptop',
      range: '1024px - 1280px',
      context: 'Dorm room, library workstations - creation and administration',
      primaryUse: 'Full-featured tools - complex creation, data analysis, admin interfaces',
      layoutCols: '3-4 complex',
      navPattern: 'Persistent side + top navigation',
      contentDensity: 'Dense',
      touchTargets: 'Mouse/trackpad optimized',
      examples: ['MacBook Air', '13" laptops', 'Desktop monitors'],
      considerations: [
        'Keyboard navigation',
        'Complex data visualization',
        'Multi-tasking workflows',
        'Creator tool interfaces'
      ]
    },
    '2xl': {
      name: 'Large Desktop',
      range: '1280px+',
      context: 'Lab computers, large monitors - advanced creation and analysis',
      primaryUse: 'Advanced features - complex dashboards, data analysis, content management',
      layoutCols: '4+ grid systems',
      navPattern: 'Full navigation hierarchy',
      contentDensity: 'Maximum',
      touchTargets: 'Precision mouse/trackpad',
      examples: ['iMac', 'External monitors', 'Lab workstations'],
      considerations: [
        'Multiple column layouts',
        'Advanced data visualization',
        'Power user workflows',
        'Administrative interfaces'
      ]
    }
  };

  // Campus Usage Scenarios
  const campusScenarios = [
    {
      scenario: 'Walking to Class',
      device: 'mobile',
      context: 'One-handed use, outdoor lighting, time pressure',
      needs: ['Quick notifications', 'Next class info', 'Friend locations'],
      design: 'High contrast, large touch targets, minimal cognitive load'
    },
    {
      scenario: 'Study Group Session',
      device: 'tablet',
      context: 'Shared screen, collaborative work, note-taking',
      needs: ['Group coordination', 'Shared documents', 'Task assignment'],
      design: 'Multi-column layouts, collaborative interfaces, clear hierarchy'
    },
    {
      scenario: 'Dorm Room Creation',
      device: 'desktop',
      context: 'Focused work, complex tasks, unlimited time',
      needs: ['Tool building', 'Content creation', 'Data analysis'],
      design: 'Complex interfaces, keyboard shortcuts, dense information'
    }
  ];

  // Responsive Layout Examples
  const layoutExamples = {
    'space-discovery': {
      mobile: {
        layout: 'Single column, large cards',
        components: ['Search bar', 'Filter chips', 'Space cards (full width)', 'Bottom navigation'],
        interactions: ['Scroll to refresh', 'Tap to expand', 'Swipe actions']
      },
      tablet: {
        layout: 'Two columns, compact cards',
        components: ['Search + filters bar', 'Space grid (2 columns)', 'Side drawer', 'Context panel'],
        interactions: ['Pinch to zoom', 'Drag to reorder', 'Two-finger scroll']
      },
      desktop: {
        layout: 'Three columns + sidebar',
        components: ['Persistent navigation', 'Filter panel', 'Space grid (3+ columns)', 'Detail sidebar'],
        interactions: ['Hover states', 'Keyboard navigation', 'Right-click menus']
      }
    },
    'profile-dashboard': {
      mobile: {
        layout: 'Vertical stack, collapsible sections',
        components: ['Header with avatar', 'Stats cards', 'Activity feed', 'Quick actions'],
        interactions: ['Pull to refresh', 'Expandable sections', 'Quick tap actions']
      },
      tablet: {
        layout: 'Card grid, sidebar details',
        components: ['Header banner', 'Widget grid (2x2)', 'Activity panel', 'Navigation drawer'],
        interactions: ['Drag and drop widgets', 'Resize panels', 'Split screen']
      },
      desktop: {
        layout: 'Dashboard grid, multiple panels',
        components: ['Full navigation', 'Widget dashboard', 'Activity stream', 'Settings panel'],
        interactions: ['Customizable layout', 'Keyboard shortcuts', 'Multiple selections']
      }
    }
  };

  const DevicePreview = ({ device, breakpoint }: { device: string; breakpoint: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* Device Frame */}
      <div className="relative mx-auto" style={{
        width: device === 'mobile' ? '320px' : device === 'tablet' ? '400px' : '500px',
        height: device === 'mobile' ? '568px' : device === 'tablet' ? '300px' : '280px',
        backgroundColor: '#1f1f1f',
        borderRadius: device === 'mobile' ? '24px' : device === 'tablet' ? '16px' : '8px',
        border: '3px solid #333',
        padding: device === 'mobile' ? '20px' : device === 'tablet' ? '16px' : '12px'
      }}>
        {/* Screen Content */}
        <div className="w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--hive-background-primary)' }}>
          {/* Header */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--hive-border-primary)' }}>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                HIVE • {breakpoint.name}
              </h4>
              <Badge className="text-xs" style={{ 
                backgroundColor: 'var(--hive-overlay-gold-subtle)',
                color: 'var(--hive-brand-primary)'
              }}>
                {breakpoint.range}
              </Badge>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 space-y-3">
            {/* Space Cards */}
            <div className={`grid gap-3 ${
              device === 'mobile' ? 'grid-cols-1' : 
              device === 'tablet' ? 'grid-cols-2' : 
              'grid-cols-3'
            }`}>
              {[1, 2, device === 'desktop' ? 3 : null].filter(Boolean).map((i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ 
                  backgroundColor: 'var(--hive-background-secondary)',
                  borderColor: 'var(--hive-border-primary)'
                }}>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: 'var(--hive-brand-primary)' }} />
                    <div className="flex-1">
                      <div className="h-2 rounded mb-1" style={{ backgroundColor: 'var(--hive-text-primary)', width: '60%' }} />
                      <div className="h-1.5 rounded" style={{ backgroundColor: 'var(--hive-text-muted)', width: '40%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 rounded" style={{ backgroundColor: 'var(--hive-text-secondary)', width: '100%' }} />
                    <div className="h-1 rounded" style={{ backgroundColor: 'var(--hive-text-secondary)', width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Touch Target Visualization */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="rounded flex items-center justify-center text-xs font-medium"
                    style={{ 
                      width: breakpoint.touchTargets.includes('44px') ? '44px' : '40px',
                      height: breakpoint.touchTargets.includes('44px') ? '44px' : '40px',
                      backgroundColor: 'var(--hive-brand-primary)',
                      color: 'var(--hive-text-inverse)'
                    }}
                  >
                    {breakpoint.touchTargets.split('px')[0]}
                  </div>
                ))}
              </div>
              <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                {breakpoint.touchTargets}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Icon */}
      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center"
           style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
        {device === 'mobile' ? <Smartphone className="w-4 h-4" /> :
         device === 'tablet' ? <Tablet className="w-4 h-4" /> :
         <Monitor className="w-4 h-4" />}
      </div>
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
              <Layers className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Responsive Breakpoints
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Campus device strategy and responsive breakpoints optimized for how students actually use technology throughout their day.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile First</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Touch Native</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Context Aware</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Optimized</Badge>
          </div>
        </motion.div>

        {/* Device Context Selector */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {(['mobile', 'tablet', 'desktop'] as const).map((device) => {
              const isActive = activeDevice === device;
              const IconComponent = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;
              
              return (
                <Button
                  key={device}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className="hive-interactive"
                  style={isActive ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)',
                    borderColor: 'var(--hive-border-gold)'
                  } : {
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-secondary)'
                  }}
                  onClick={() => setActiveDevice(device)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </Button>
              );
            })}
          </div>

          <Card className="hive-glass border border-gray-700">
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDevice}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Current device context */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
                        {activeDevice.charAt(0).toUpperCase() + activeDevice.slice(1)} Campus Context
                      </h3>
                      <div className="space-y-4">
                        {campusScenarios
                          .filter(s => s.device === activeDevice)
                          .map((scenario, idx) => (
                            <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--hive-background-secondary)' }}>
                              <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                                {scenario.scenario}
                              </h4>
                              <p className="text-sm mb-3" style={{ color: 'var(--hive-text-muted)' }}>
                                {scenario.context}
                              </p>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-xs font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                    Primary Needs:
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {scenario.needs.map((need, i) => (
                                      <Badge key={i} variant="outline" className="text-xs"
                                             style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                                        {need}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                    Design Focus:
                                  </span>
                                  <p className="text-xs mt-1" style={{ color: 'var(--hive-text-muted)' }}>
                                    {scenario.design}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
                        Layout Example
                      </h3>
                      {/* Show relevant device preview */}
                      <DevicePreview 
                        device={activeDevice} 
                        breakpoint={breakpoints[activeDevice === 'mobile' ? 'sm' : activeDevice === 'tablet' ? 'lg' : 'xl']} 
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Breakpoint Reference */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                HIVE Responsive Breakpoints
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Complete breakpoint system designed for campus device usage patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(breakpoints).map(([key, breakpoint], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="border rounded-lg p-4 hive-interactive cursor-pointer"
                    style={{
                      backgroundColor: 'var(--hive-background-secondary)',
                      borderColor: hoveredBreakpoint === key ? 'var(--hive-border-gold)' : 'var(--hive-border-primary)',
                      transition: 'all var(--hive-duration-quick) var(--hive-easing-smooth)'
                    }}
                    onMouseEnter={() => setHoveredBreakpoint(key)}
                    onMouseLeave={() => setHoveredBreakpoint(null)}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                            {breakpoint.name}
                          </h4>
                          <Badge style={{ 
                            backgroundColor: 'var(--hive-overlay-gold-subtle)',
                            color: 'var(--hive-brand-primary)'
                          }}>
                            {breakpoint.range}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--hive-text-muted)' }}>
                          {breakpoint.context}
                        </p>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span style={{ color: 'var(--hive-text-secondary)' }}>Primary Use:</span>
                            <p style={{ color: 'var(--hive-text-muted)' }}>{breakpoint.primaryUse}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Layout Specifications
                        </h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--hive-text-secondary)' }}>Columns:</span>
                            <span style={{ color: 'var(--hive-text-primary)' }}>{breakpoint.layoutCols}</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--hive-text-secondary)' }}>Navigation:</span>
                            <span style={{ color: 'var(--hive-text-primary)' }}>{breakpoint.navPattern}</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--hive-text-secondary)' }}>Density:</span>
                            <span style={{ color: 'var(--hive-text-primary)' }}>{breakpoint.contentDensity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--hive-text-secondary)' }}>Touch Targets:</span>
                            <span style={{ color: 'var(--hive-text-primary)' }}>{breakpoint.touchTargets}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Design Considerations
                        </h5>
                        <ul className="space-y-1">
                          {breakpoint.considerations.map((consideration, idx) => (
                            <li key={idx} className="text-xs flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                              <div className="w-1 h-1 rounded-full mr-2 mt-1.5 flex-shrink-0"
                                   style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                              {consideration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--hive-border-subtle)' }}>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs" style={{ color: 'var(--hive-text-secondary)' }}>
                          Common Devices:
                        </span>
                        {breakpoint.examples.map((device, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs"
                                 style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                            {device}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Technical implementation of HIVE's responsive system
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Tailwind CSS Breakpoints
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-2"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>sm: '640px'  // Mobile Standard</div>
                      <div>md: '768px'  // Large Mobile/Small Tablet</div>
                      <div>lg: '1024px' // Desktop/Laptop</div>
                      <div>xl: '1280px' // Large Desktop</div>
                      <div>2xl: '1536px' // Ultra-wide</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Mobile-First Approach
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>// Base styles (mobile first)</div>
                      <div>.space-card &#123;</div>
                      <div className="pl-4">width: 100%;</div>
                      <div className="pl-4">padding: 1rem;</div>
                      <div>&#125;</div>
                      <div className="mt-2">// Enhanced for larger screens</div>
                      <div>@media (min-width: 768px) &#123;</div>
                      <div className="pl-4">.space-card &#123;</div>
                      <div className="pl-8">width: 50%;</div>
                      <div className="pl-4">&#125;</div>
                      <div>&#125;</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Campus Context Classes
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 rounded" style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>.campus-mobile</code>
                        <span style={{ color: 'var(--hive-text-muted)' }}> - Walking, one-handed use</span>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>.campus-study</code>
                        <span style={{ color: 'var(--hive-text-muted)' }}> - Focused work, collaboration</span>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>.campus-creation</code>
                        <span style={{ color: 'var(--hive-text-muted)' }}> - Complex tools, admin interfaces</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Touch Target Standards
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded flex items-center justify-center text-sm font-medium"
                             style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                          44
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                            Mobile Primary Actions
                          </div>
                          <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                            44px minimum for thumb operation
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded flex items-center justify-center text-sm font-medium"
                             style={{ backgroundColor: 'var(--hive-status-info)', color: 'var(--hive-text-inverse)' }}>
                          40
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                            Tablet/Desktop Touch
                          </div>
                          <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                            40px comfortable for precision touch
                          </div>
                        </div>
                      </div>
                    </div>
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

export const ResponsiveBreakpoints: Story = {
  render: () => <ResponsiveShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};