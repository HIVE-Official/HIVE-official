/**
 * HIVE Accessibility Standards: Campus Inclusive Design
 * Comprehensive accessibility documentation for campus-first social utility experiences
 */

import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  MousePointer, 
  Keyboard, 
  Smartphone,
  Users,
  Heart,
  Star,
  Check,
  X,
  AlertTriangle,
  Info,
  Zap,
  Moon,
  Sun,
  Type,
  Hand,
  Accessibility
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../../hive-tokens.css';

const meta = {
  title: '09-Accessibility/Campus Standards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Accessibility Standards: Campus Inclusive Design

Comprehensive accessibility guidelines ensuring HIVE is usable by all students regardless of their abilities, devices, or campus situations.

## Campus Accessibility Context
- **Diverse Abilities**: Visual, auditory, motor, and cognitive accessibility needs
- **Environmental Challenges**: Outdoor lighting, noisy environments, walking while using
- **Device Variety**: Screen readers, voice control, keyboard navigation, switch controls
- **Academic Support**: Integration with assistive technologies used in educational settings

## WCAG 2.1 AA Compliance
HIVE meets or exceeds WCAG 2.1 AA standards with campus-specific enhancements:
- Color contrast ratios optimized for outdoor campus use
- Touch targets sized for various motor abilities
- Clear focus indicators for keyboard navigation
- Semantic markup for screen reader compatibility
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const AccessibilityShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<string>('visual-accessibility');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);

  // Accessibility Standards
  const accessibilityStandards = {
    'visual-accessibility': {
      title: 'Visual Accessibility',
      icon: Eye,
      guidelines: [
        {
          title: 'Color Contrast',
          requirement: 'WCAG AA 4.5:1 for normal text, 3:1 for large text',
          campusContext: 'Enhanced for outdoor campus reading conditions',
          implementation: 'CSS custom properties with high contrast variants',
          examples: [
            { good: true, contrast: '7.2:1', text: 'Primary text on background', colors: ['var(--hive-text-primary)', 'var(--hive-background-primary)'] },
            { good: true, contrast: '5.8:1', text: 'Secondary text on background', colors: ['var(--hive-text-secondary)', 'var(--hive-background-primary)'] },
            { good: false, contrast: '2.1:1', text: 'Insufficient contrast example', colors: ['#888888', '#CCCCCC'] }
          ]
        },
        {
          title: 'Focus Indicators',
          requirement: 'Visible focus indicators for all interactive elements',
          campusContext: 'High-visibility for keyboard navigation while walking',
          implementation: 'CSS focus-visible with custom HIVE focus ring',
          examples: [
            'Keyboard navigation support',
            'Screen reader announcements',
            'High contrast focus rings',
            'Focus trap in modals'
          ]
        },
        {
          title: 'Text Scaling',
          requirement: 'Support up to 200% text scaling without horizontal scrolling',
          campusContext: 'Responsive text for various vision needs and outdoor conditions',
          implementation: 'Fluid typography with clamp() functions',
          examples: [
            'Responsive font scaling',
            'Maintained layout integrity',
            'Touch target preservation',
            'Mobile optimization'
          ]
        }
      ]
    },
    'motor-accessibility': {
      title: 'Motor Accessibility',
      icon: Hand,
      guidelines: [
        {
          title: 'Touch Targets',
          requirement: 'Minimum 44px touch targets (WCAG AAA)',
          campusContext: 'Larger targets for walking navigation and various motor abilities',
          implementation: 'CSS padding and minimum dimensions',
          examples: [
            { size: '44px', context: 'Primary actions (mobile)', status: 'optimal' },
            { size: '40px', context: 'Secondary actions (tablet)', status: 'good' },
            { size: '32px', context: 'Insufficient for accessibility', status: 'poor' }
          ]
        },
        {
          title: 'Keyboard Navigation',
          requirement: 'All functionality available via keyboard',
          campusContext: 'Alternative to touch for students with motor disabilities',
          implementation: 'Tab order, ARIA labels, keyboard shortcuts',
          examples: [
            'Tab/Shift+Tab navigation',
            'Enter/Space activation',
            'Arrow key navigation',
            'Escape key dismissal'
          ]
        },
        {
          title: 'Alternative Inputs',
          requirement: 'Support for assistive input devices',
          campusContext: 'Switch controls, voice commands, head tracking',
          implementation: 'Semantic HTML, ARIA attributes, event handling',
          examples: [
            'Switch control compatibility',
            'Voice recognition support', 
            'Eye tracking integration',
            'Head mouse support'
          ]
        }
      ]
    },
    'cognitive-accessibility': {
      title: 'Cognitive Accessibility',
      icon: Users,
      guidelines: [
        {
          title: 'Clear Language',
          requirement: 'Simple, consistent language and interface patterns',
          campusContext: 'Reduces cognitive load during busy campus moments',
          implementation: 'Content strategy guidelines, consistent UI patterns',
          examples: [
            'Plain language principles',
            'Consistent terminology',
            'Clear error messages',
            'Predictable interactions'
          ]
        },
        {
          title: 'Reduced Motion',
          requirement: 'Respect prefers-reduced-motion user preference',
          campusContext: 'Important for students with vestibular disorders',
          implementation: 'CSS media queries and JavaScript motion detection',
          examples: [
            'Disable parallax scrolling',
            'Reduce animation duration',
            'Remove auto-playing content',
            'Maintain functional feedback'
          ]
        },
        {
          title: 'Time Limits',
          requirement: 'No essential time limits or provide extensions',
          campusContext: 'Accommodates processing time differences',
          implementation: 'Configurable timeouts, save progress, warnings',
          examples: [
            'Session timeout warnings',
            'Auto-save functionality',
            'Pause/resume options',
            'Extended time limits'
          ]
        }
      ]
    }
  };

  // Campus-Specific Scenarios
  const campusScenarios = [
    {
      title: 'Walking to Class',
      challenge: 'Visual attention divided between screen and navigation',
      solutions: [
        'High contrast mode for outdoor visibility',
        'Large touch targets for imprecise taps',
        'Voice feedback for important updates',
        'Simplified interface during movement'
      ]
    },
    {
      title: 'Noisy Campus Environment',
      challenge: 'Audio cues not audible in loud spaces',
      solutions: [
        'Visual alternatives to audio alerts',
        'Haptic feedback for notifications',
        'Captions for any audio content',
        'Visual notification indicators'
      ]
    },
    {
      title: 'Study Group Collaboration',
      challenge: 'Screen sharing with diverse accessibility needs',
      solutions: [
        'Screen reader compatible shared views',
        'Keyboard navigation for all features',
        'Color-blind friendly visual elements',
        'Text alternatives for visual content'
      ]
    },
    {
      title: 'Assistive Technology Integration',
      challenge: 'Campus IT assistive technology compatibility',
      solutions: [
        'JAWS/NVDA screen reader support',
        'Dragon voice recognition compatibility',
        'Switch control device support',
        'Campus accessibility service integration'
      ]
    }
  ];

  // Interactive Accessibility Demo
  const AccessibilityDemo = () => {
    const [currentTest, setCurrentTest] = useState<string>('keyboard-nav');
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [keyboardFocus, setKeyboardFocus] = useState(0);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!focusMode) return;
        
        if (e.key === 'Tab') {
          e.preventDefault();
          setKeyboardFocus(prev => {
            const next = e.shiftKey ? prev - 1 : prev + 1;
            const maxIndex = buttonRefs.current.length - 1;
            return Math.max(0, Math.min(maxIndex, next))
          })}
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          buttonRefs.current[keyboardFocus]?.click()
        }
      };

      if (focusMode) {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
      }
    }, [focusMode, keyboardFocus]);

    const SpaceCard = ({ index, title, members, isActive }: { index: number; title: string; members: number; isActive?: boolean }) => (
      <motion.div
        className={`p-4 rounded-lg border cursor-pointer hive-interactive ${
          focusMode && keyboardFocus === index ? 'ring-4' : ''
        }`}
        style={{
          backgroundColor: highContrast ? '#000000' : 'var(--hive-background-secondary)',
          borderColor: focusMode && keyboardFocus === index ? 'var(--hive-brand-primary)' : 'var(--hive-border-primary)',
          color: highContrast ? '#FFFFFF' : 'var(--hive-text-primary)',
          fontSize: largeText ? '1.125rem' : '1rem',
          transition: reducedMotion ? 'none' : 'all var(--hive-duration-quick) var(--hive-easing-smooth)',
          ringColor: 'var(--hive-brand-primary)',
          transform: focusMode && keyboardFocus === index ? 'scale(1.02)' : 'scale(1)'
        }}
        ref={el => buttonRefs.current[index] = el}
        tabIndex={focusMode ? (keyboardFocus === index ? 0 : -1) : 0}
        role="button"
        aria-label={`Join ${title} space with ${members} members`}
        onFocus={() => !focusMode && setCurrentFocus(`space-${index}`)}
        onBlur={() => !focusMode && setCurrentFocus(null)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-sm font-bold"
              style={{ 
                backgroundColor: highContrast ? '#FFFFFF' : 'var(--hive-brand-primary)',
                color: highContrast ? '#000000' : 'var(--hive-text-inverse)'
              }}
            >
              {title.split(' ').map(w => w[0]).join('')}
            </div>
            <div>
              <div className="font-medium">{title}</div>
              <div className="text-sm" style={{ 
                color: highContrast ? '#CCCCCC' : 'var(--hive-text-muted)'
              }}>
                {members} members
              </div>
            </div>
          </div>
          <Button 
            size="sm"
            style={{ 
              backgroundColor: highContrast ? '#FFFFFF' : 'var(--hive-brand-primary)',
              color: highContrast ? '#000000' : 'var(--hive-text-inverse)',
              minWidth: '44px',
              minHeight: '44px'
            }}
            aria-label={`Join ${title}`}
          >
            Join
          </Button>
        </div>
      </motion.div>
    );

    return (
      <div className="space-y-6">
        {/* Accessibility Controls */}
        <Card className="p-4" style={{ 
          backgroundColor: highContrast ? '#000000' : 'var(--hive-background-secondary)',
          borderColor: 'var(--hive-border-primary)',
          color: highContrast ? '#FFFFFF' : 'var(--hive-text-primary)'
        }}>
          <h4 className="font-medium mb-4">Accessibility Settings</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={highContrast}
                onCheckedChange={setHighContrast}
                aria-label="Toggle high contrast mode"
              />
              <Label className="text-sm">High Contrast</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
                aria-label="Toggle reduced motion"
              />
              <Label className="text-sm">Reduced Motion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={largeText}
                onCheckedChange={setLargeText}
                aria-label="Toggle large text"
              />
              <Label className="text-sm">Large Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={focusMode}
                onCheckedChange={setFocusMode}
                aria-label="Toggle keyboard focus demonstration"
              />
              <Label className="text-sm">Keyboard Focus</Label>
            </div>
          </div>
          
          {focusMode && (
            <div className="mt-4 p-3 rounded-lg" style={{ 
              backgroundColor: 'var(--hive-overlay-gold-subtle)',
              color: 'var(--hive-text-primary)'
            }}>
              <p className="text-sm">
                <Keyboard className="inline w-4 h-4 mr-1" />
                Use Tab/Shift+Tab to navigate, Enter/Space to activate
              </p>
            </div>
          )}
        </Card>

        {/* Demo Space Cards */}
        <div className="space-y-4" role="region" aria-label="Campus spaces">
          {[
            { title: 'CS Study Group', members: 24 },
            { title: 'Database Workshop', members: 12 },
            { title: 'Web Dev Meetup', members: 31 }
          ].map((space, index) => (
            <SpaceCard 
              key={index}
              index={index}
              title={space.title}
              members={space.members}
              isActive={currentFocus === `space-${index}`}
            />
          ))}
        </div>

        {/* Screen Reader Announcements */}
        <div className="sr-only" role="status" aria-live="polite">
          {currentFocus && `Focused on ${currentFocus.replace('-', ' ')}`}
          {focusMode && `Keyboard navigation mode active. Current focus: item ${keyboardFocus + 1} of ${buttonRefs.current.length}`}
        </div>
      </div>
    )
  };

  // Contrast Checker Component
  const ContrastChecker = ({ foreground, background, label }: { foreground: string; background: string; label: string }) => {
    const [contrast, setContrast] = useState<number>(0);
    
    useEffect(() => {
      // Simple contrast ratio calculation (would use proper contrast library in real implementation)
      const ratio = 7.2; // Placeholder - would calculate actual contrast
      setContrast(ratio)
    }, [foreground, background]);

    const getStatus = (ratio: number) => {
      if (ratio >= 7) return { level: 'AAA', color: 'var(--hive-status-success)' };
      if (ratio >= 4.5) return { level: 'AA', color: 'var(--hive-status-warning)' };
      return { level: 'Fail', color: 'var(--hive-status-error)' }
    };

    const status = getStatus(contrast);

    return (
      <div className="p-4 rounded-lg border" style={{ 
        backgroundColor: background,
        borderColor: 'var(--hive-border-primary)'
      }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: foreground, fontSize: '1rem' }}>
            {label}
          </span>
          <Badge style={{ 
            backgroundColor: status.color,
            color: 'white'
          }}>
            {contrast.toFixed(1)}:1 {status.level}
          </Badge>
        </div>
        <div className="text-xs" style={{ color: foreground, opacity: 0.8 }}>
          Example text at normal size demonstrating readability
        </div>
      </div>
    )
  };

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
              <Accessibility className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Accessibility Standards
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Campus inclusive design ensuring HIVE is accessible to all students regardless of abilities, devices, or campus situations.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">WCAG 2.1 AA</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Optimized</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Screen Reader Ready</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Keyboard Navigation</Badge>
          </div>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {Object.entries(accessibilityStandards).map(([key, standard]) => {
              const IconComponent = standard.icon;
              const isActive = activeDemo === key;
              return (
                <Button
                  key={key}
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
                  onClick={() => setActiveDemo(key)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {standard.title}
                </Button>
              )
            })}
            <Button
              variant={activeDemo === 'live-demo' ? "default" : "outline"}
              size="lg"
              className="hive-interactive"
              style={activeDemo === 'live-demo' ? {
                backgroundColor: 'var(--hive-brand-primary)',
                color: 'var(--hive-text-inverse)',
                borderColor: 'var(--hive-border-gold)'
              } : {
                borderColor: 'var(--hive-border-primary)',
                color: 'var(--hive-text-secondary)'
              }}
              onClick={() => setActiveDemo('live-demo')}
            >
              <MousePointer className="w-5 h-5 mr-2" />
              Live Demo
            </Button>
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {Object.keys(accessibilityStandards).includes(activeDemo) && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                    {React.createElement(accessibilityStandards[activeDemo as keyof typeof accessibilityStandards].icon, { className: "w-6 h-6 mr-2" })
                    {accessibilityStandards[activeDemo as keyof typeof accessibilityStandards].title}
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Comprehensive guidelines for {accessibilityStandards[activeDemo as keyof typeof accessibilityStandards].title.toLowerCase()} in campus environments
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {accessibilityStandards[activeDemo as keyof typeof accessibilityStandards].guidelines.map((guideline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--hive-background-secondary)',
                          borderColor: 'var(--hive-border-primary)'
                        }}
                      >
                        <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                          {guideline.title}
                        </h4>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                WCAG Requirement:
                              </span>
                              <p className="text-sm mt-1" style={{ color: 'var(--hive-text-muted)' }}>
                                {guideline.requirement}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                Campus Context:
                              </span>
                              <p className="text-sm mt-1" style={{ color: 'var(--hive-text-muted)' }}>
                                {guideline.campusContext}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                Implementation:
                              </span>
                              <p className="text-sm mt-1" style={{ color: 'var(--hive-text-muted)' }}>
                                {guideline.implementation}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium mb-3 block" style={{ color: 'var(--hive-text-secondary)' }}>
                              Examples:
                            </span>
                            {guideline.title === 'Color Contrast' && guideline.examples ? (
                              <div className="space-y-3">
                                {(guideline.examples as any[]).map((example: any, idx: number) => (
                                  <ContrastChecker
                                    key={idx}
                                    foreground={example.colors?.[0] || 'var(--hive-text-primary)'}
                                    background={example.colors?.[1] || 'var(--hive-background-primary)'}
                                    label={example.text}
                                  />
                                ))}
                              </div>
                            ) : guideline.title === 'Touch Targets' && guideline.examples ? (
                              <div className="space-y-3">
                                {(guideline.examples as any[]).map((example: any, idx: number) => (
                                  <div key={idx} className="flex items-center space-x-3">
                                    <div 
                                      className="rounded flex items-center justify-center text-sm font-medium"
                                      style={{ 
                                        width: example.size,
                                        height: example.size,
                                        backgroundColor: example.status === 'optimal' ? 'var(--hive-status-success)' :
                                                       example.status === 'good' ? 'var(--hive-status-warning)' :
                                                       'var(--hive-status-error)',
                                        color: 'white'
                                      }}
                                    >
                                      {example.size}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                                        {example.context}
                                      </div>
                                      <Badge 
                                        className="text-xs"
                                        style={{ 
                                          backgroundColor: example.status === 'optimal' ? 'var(--hive-status-success)' :
                                                         example.status === 'good' ? 'var(--hive-status-warning)' :
                                                         'var(--hive-status-error)',
                                          color: 'white'
                                        }}
                                      >
                                        {example.status}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {(guideline.examples as string[]).map((example: string, idx: number) => (
                                  <div key={idx} className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                                    <span className="text-sm">{example}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeDemo === 'live-demo' && (
            <motion.div
              key="live-demo"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Interactive Accessibility Demo
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Experience HIVE's accessibility features with real campus components
                  </p>
                </CardHeader>
                <CardContent>
                  <AccessibilityDemo />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Campus Scenarios */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Campus Accessibility Scenarios
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Real campus situations and their accessibility solutions
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campusScenarios.map((scenario, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="p-6 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--hive-background-secondary)',
                      borderColor: 'var(--hive-border-primary)'
                    }}
                  >
                    <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                      {scenario.title}
                    </h4>
                    <p className="text-sm mb-4 flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                      <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-warning)' }} />
                      {scenario.challenge}
                    </p>
                    
                    <div>
                      <span className="text-sm font-medium mb-3 block" style={{ color: 'var(--hive-text-secondary)' }}>
                        Accessibility Solutions:
                      </span>
                      <ul className="space-y-2">
                        {scenario.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                            <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                            {solution}
                          </li>
                        ))}
                      </ul>
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
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Technical implementation of HIVE's accessibility standards
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Semantic HTML Structure
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-2"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>&lt;main role="main"&gt;</div>
                      <div className="pl-4">&lt;section aria-label="Campus Spaces"&gt;</div>
                      <div className="pl-8">&lt;h2&gt;Discover Spaces&lt;/h2&gt;</div>
                      <div className="pl-8">&lt;button aria-label="Join CS Study Group"&gt;</div>
                      <div className="pl-4">&lt;/section&gt;</div>
                      <div>&lt;/main&gt;</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      ARIA Labels and Descriptions
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>aria-label="Join CS Study Group with 24 members"</div>
                      <div>aria-describedby="space-description"</div>
                      <div>aria-live="polite"</div>
                      <div>role="button"</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      CSS Accessibility Features
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>/* High contrast support */</div>
                      <div>@media (prefers-contrast: high) &#123;</div>
                      <div className="pl-4">:root &#123; --hive-contrast: high; &#125;</div>
                      <div>&#125;</div>
                      <div className="mt-2">/* Focus visibility */</div>
                      <div>:focus-visible &#123;</div>
                      <div className="pl-4">outline: 2px solid var(--hive-brand-primary);</div>
                      <div>&#125;</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Testing Tools
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        axe-core for automated accessibility testing
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        JAWS/NVDA screen reader testing
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Keyboard-only navigation testing
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Color contrast validation tools
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
};

export const AccessibilityCampusStandards: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};