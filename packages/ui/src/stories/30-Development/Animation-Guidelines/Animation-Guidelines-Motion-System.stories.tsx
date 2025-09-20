/**
 * HIVE Animation Guidelines: Motion System
 * Comprehensive documentation of HIVE's premium motion system and easing curves
 */

import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence, useAnimation } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Waves, 
  Wind, 
  Shield, 
  Flame, 
  MousePointer,
  Smartphone,
  Users,
  ArrowRight,
  Heart,
  Star,
  MessageSquare,
  Share
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../../hive-tokens.css';

const meta = {
  title: '08-Animation-Guidelines/Motion System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Animation Guidelines: Premium Motion System

Comprehensive motion design documentation showcasing HIVE's sophisticated easing curves and animation patterns optimized for campus social utility experiences.

## Motion Philosophy
- **Purposeful**: Every animation serves user understanding or delight
- **Campus Context**: Motion that feels right for university social dynamics  
- **Performance First**: 60fps animations optimized for mobile devices
- **Accessibility Aware**: Respects reduced motion preferences

## Easing Curve System
HIVE uses a sophisticated easing curve system inspired by premium tech products:
- **Magnetic**: Gentle attraction with soft settle
- **Liquid**: Fluid, water-like motion 
- **Silk**: Ultra-smooth, luxurious transitions
- **Steel**: Precise, mechanical feedback
- **Molten**: Organic, lava-like flow
- **Snap**: Quick, decisive actions
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const AnimationShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<string>('easing-curves');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEasing, setSelectedEasing] = useState<string>('magnetic');
  const [animationProgress, setAnimationProgress] = useState(0);
  const controls = useAnimation();

  // Premium Easing Curves with Descriptions
  const easingCurves = {
    magnetic: {
      name: 'Magnetic',
      description: 'Gentle attraction with soft settle - perfect for UI elements that feel naturally drawn to their position',
      curve: [0.23, 1, 0.32, 1],
      cssFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      usage: 'Hover states, gentle transitions, social interactions',
      personality: 'Welcoming, approachable, campus-friendly',
      examples: ['Button hover', 'Space card expansion', 'Profile photo updates'],
      color: '#4F46E5'
    },
    liquid: {
      name: 'Liquid',
      description: 'Fluid, water-like motion that creates organic, natural feeling animations',
      curve: [0.25, 0.46, 0.45, 0.94],
      cssFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      usage: 'Content flowing, feed updates, organic state changes',
      personality: 'Natural, flowing, community-like',
      examples: ['Feed refresh', 'Content appearing', 'Notification flow'],
      color: '#06B6D4'
    },
    silk: {
      name: 'Silk',
      description: 'Ultra-smooth, luxurious transitions that feel premium and polished',
      curve: [0.16, 1, 0.3, 1],
      cssFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      usage: 'Page transitions, modal appearances, premium interactions',
      personality: 'Sophisticated, polished, high-quality',
      examples: ['Modal entry', 'Page navigation', 'Tool launch'],
      color: '#8B5CF6'
    },
    steel: {
      name: 'Steel',
      description: 'Precise, mechanical feedback for actions that need to feel decisive and reliable',
      curve: [0.4, 0, 0.6, 1],
      cssFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
      usage: 'Button clicks, confirmations, system feedback',
      personality: 'Reliable, precise, trustworthy',
      examples: ['Button press', 'Form submission', 'Join/Leave actions'],
      color: '#64748B'
    },
    molten: {
      name: 'Molten',
      description: 'Organic, lava-like flow perfect for creative tools and dynamic content',
      curve: [0.68, -0.55, 0.265, 1.55],
      cssFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      usage: 'Creative tools, dynamic layouts, playful interactions',
      personality: 'Creative, dynamic, energetic',
      examples: ['Tool creation', 'Dynamic layouts', 'Creative feedback'],
      color: '#F59E0B'
    },
    snap: {
      name: 'Snap',
      description: 'Quick, decisive actions that provide immediate feedback and feel responsive',
      curve: [0.25, 0, 0.75, 1],
      cssFunction: 'cubic-bezier(0.25, 0, 0.75, 1)',
      usage: 'Quick actions, micro-interactions, immediate feedback',
      personality: 'Responsive, immediate, efficient',
      examples: ['Like button', 'Quick toggles', 'Micro-feedback'],
      color: '#EF4444'
    }
  };

  // Duration Guidelines
  const durationGuidelines = {
    'hive-duration-instant': {
      value: '100ms',
      usage: 'Immediate feedback, hover states, focus changes',
      examples: ['Button hover', 'Input focus', 'Toggle states']
    },
    'hive-duration-quick': {
      value: '200ms', 
      usage: 'Quick UI responses, micro-interactions',
      examples: ['Dropdown open', 'Tooltip appear', 'Badge updates']
    },
    'hive-duration-smooth': {
      value: '300ms',
      usage: 'Standard transitions, content changes',
      examples: ['Modal fade', 'Content swap', 'Layout shifts']
    },
    'hive-duration-flowing': {
      value: '500ms',
      usage: 'Flowing content, feed updates, organic changes', 
      examples: ['Feed refresh', 'Page navigation', 'Content flow']
    },
    'hive-duration-cinematic': {
      value: '800ms',
      usage: 'Premium entrances, onboarding, special moments',
      examples: ['Onboarding flow', 'Achievement unlock', 'First-time experiences']
    }
  };

  // Campus Animation Patterns
  const campusPatterns = [
    {
      title: 'Social Proof Cascade',
      description: 'Sequential revelation of social information to build trust and engagement',
      components: ['Avatar appearance', 'Member count', 'Activity indicators', 'Join prompts'],
      timing: 'Staggered with 100ms delays',
      easing: 'Magnetic'
    },
    {
      title: 'Feed Content Flow',
      description: 'Organic appearance of new content that feels natural and non-intrusive',
      components: ['New posts', 'Comments', 'Reactions', 'Shared content'],
      timing: 'Liquid flow with 200ms intervals',
      easing: 'Liquid'
    },
    {
      title: 'Tool Creation Journey',
      description: 'Step-by-step tool building with clear progression and momentum',
      components: ['Step transitions', 'Progress indicators', 'Preview updates', 'Completion celebration'],
      timing: 'Smooth progression with silk transitions',
      easing: 'Silk'
    },
    {
      title: 'Campus Connection Building',
      description: 'Progressive trust building through graduated information revelation',
      components: ['Profile glimpses', 'Mutual connections', 'Shared interests', 'Contact options'],
      timing: 'Gentle cascade with magnetic attraction',
      easing: 'Magnetic'
    }
  ];

  // Interactive Demo Component
  const EasingDemo = ({ easingKey, easingData }: { easingKey: string; easingData: any }) => {
    const [isDemoActive, setIsDemoActive] = useState(false);
    
    const demoVariants = {
      initial: { x: 0, scale: 1 },
      animate: { 
        x: 200, 
        scale: 1.1,
        transition: {
          duration: 1,
          ease: easingData.curve
        }
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: easingData.color }}
              />
              {easingData.name}
            </h4>
            <p className="text-sm mt-1" style={{ color: 'var(--hive-text-muted)' }}>
              {easingData.description}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setIsDemoActive(!isDemoActive);
              setTimeout(() => setIsDemoActive(false), 1200)
            }}
            style={{ backgroundColor: easingData.color, color: 'white' }}
          >
            <Play className="w-4 h-4 mr-1" />
            Demo
          </Button>
        </div>

        {/* Demo Animation Area */}
        <div className="relative h-16 rounded-lg border" 
             style={{ backgroundColor: 'var(--hive-background-tertiary)', borderColor: 'var(--hive-border-primary)' }}>
          <motion.div
            className="absolute left-2 top-1/2 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: easingData.color,
              color: 'white',
              y: '-50%'
            }}
            variants={demoVariants}
            initial="initial"
            animate={isDemoActive ? "animate" : "initial"}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          
          {/* Timeline markers */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div key={percent} className="w-0.5 h-2" 
                   style={{ backgroundColor: 'var(--hive-border-subtle)' }} />
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium mb-1" style={{ color: 'var(--hive-text-secondary)' }}>CSS Function</div>
            <code className="p-2 rounded text-xs block" 
                  style={{ backgroundColor: 'var(--hive-background-secondary)', color: 'var(--hive-text-primary)' }}>
              {easingData.cssFunction}
            </code>
          </div>
          <div>
            <div className="font-medium mb-1" style={{ color: 'var(--hive-text-secondary)' }}>Personality</div>
            <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
              {easingData.personality}
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <div className="font-medium mb-2 text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
            Campus Use Cases
          </div>
          <div className="flex flex-wrap gap-2">
            {easingData.examples.map((example: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs"
                     style={{ borderColor: easingData.color, color: easingData.color }}>
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  };

  // Campus Component Demo
  const CampusComponentDemo = () => {
    const [likeCount, setLikeCount] = useState(24);
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    return (
      <Card className="hive-glass border max-w-md"
            style={{
              background: 'var(--hive-overlay-glass)',
              borderColor: 'var(--hive-border-subtle)'
            }}>
        <CardContent className="p-4">
          {/* Space Header */}
          <motion.div 
            className="flex items-center mb-3"
            variants={hiveVariants.feedCascade}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
              style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              variants={hiveVariants.feedCascade}
              custom={0}
            >
              CS
            </motion.div>
            <motion.div variants={hiveVariants.feedCascade} custom={1}>
              <div className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                CS 101 Study Group
              </div>
              <div className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                24 members • Very Active
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="mb-4"
            variants={hiveVariants.feedCascade}
            custom={2}
          >
            <p className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
              Weekly study sessions every Tuesday at 7pm in Lockwood Library. Come prepared with questions and we'll work through problem sets together! 📚
            </p>
          </motion.div>

          {/* Social Actions */}
          <motion.div 
            className="flex items-center justify-between"
            variants={hiveVariants.feedCascade}
            custom={3}
          >
            <div className="flex items-center space-x-4">
              <motion.button
                className="flex items-center space-x-1 text-sm hive-interactive"
                style={{ 
                  color: isLiked ? '#EF4444' : 'var(--hive-text-muted)',
                  transition: 'color var(--hive-duration-quick) var(--hive-easing-snap)'
                }}
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </motion.div>
                <span>{likeCount}</span>
              </motion.button>

              <button 
                className="flex items-center space-x-1 text-sm hive-interactive"
                style={{ color: 'var(--hive-text-muted)' }}
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>8</span>
              </button>

              <button 
                className="flex items-center space-x-1 text-sm hive-interactive"
                style={{ color: 'var(--hive-text-muted)' }}
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            <Button size="sm" 
                    style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
              Join Group
            </Button>
          </motion.div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-4 pt-4 border-t space-y-3"
                style={{ borderColor: 'var(--hive-border-subtle)' }}
              >
                {[1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    className="flex space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="w-6 h-6 rounded-full" 
                         style={{ backgroundColor: `hsl(${i * 60}, 60%, 60%)` }} />
                    <div className="flex-1">
                      <div className="text-xs font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                        Student {i}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                        {i === 1 ? 'This really helped me understand pointers!' : 'Count me in for next week! 🙋‍♀️'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
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
              <Zap className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Animation Guidelines
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            HIVE's premium motion system with sophisticated easing curves designed for campus social utility experiences.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">60fps Optimized</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile Performance</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Accessibility Aware</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Premium Feeling</Badge>
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
            {[
              { key: 'easing-curves', label: 'Easing Curves', icon: Waves },
              { key: 'campus-patterns', label: 'Campus Patterns', icon: Users },
              { key: 'live-demo', label: 'Live Demo', icon: Play }
            ].map(map}) => {
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
                  {label}
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeDemo === 'easing-curves' && (
            <motion.div
              key="easing-curves"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Premium Easing Curves
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    HIVE's sophisticated easing system inspired by premium tech products
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Object.entries(easingCurves).map(([key, data]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Object.keys(easingCurves).indexOf(key) * 0.1 }}
                        className="p-6 rounded-lg border hive-interactive"
                        style={{
                          backgroundColor: 'var(--hive-background-secondary)',
                          borderColor: 'var(--hive-border-primary)'
                        }}
                      >
                        <EasingDemo easingKey={key} easingData={data} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Duration Guidelines */}
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Duration Guidelines
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Standardized timing for consistent motion across the platform
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(durationGuidelines).map(([token, data], index) => (
                      <motion.div
                        key={token}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: 'var(--hive-background-secondary)' }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <code className="px-2 py-1 rounded text-sm mr-3"
                                  style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-brand-primary)' }}>
                              {token}
                            </code>
                            <Badge style={{ backgroundColor: 'var(--hive-overlay-gold-subtle)', color: 'var(--hive-brand-primary)' }}>
                              {data.value}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2" style={{ color: 'var(--hive-text-muted)' }}>
                            {data.usage}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {data.examples.map((example, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs"
                                     style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                                {example}
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
          )}

          {activeDemo === 'campus-patterns' && (
            <motion.div
              key="campus-patterns"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Campus Animation Patterns
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Motion patterns designed specifically for campus social utility experiences
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campusPatterns.map((pattern, index) => (
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
                          {pattern.title}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: 'var(--hive-text-muted)' }}>
                          {pattern.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                              Components:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pattern.components.map((component, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs"
                                       style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                                  {component}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                Timing:
                              </span>
                              <div style={{ color: 'var(--hive-text-muted)' }}>
                                {pattern.timing}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                Easing:
                              </span>
                              <div style={{ color: 'var(--hive-text-muted)' }}>
                                {pattern.easing}
                              </div>
                            </div>
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
                    Live Campus Component Demo
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Interactive demonstration of HIVE's motion system in a real campus social component
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <CampusComponentDemo />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Implementation Guide */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Technical implementation of HIVE's animation system
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Framer Motion Integration
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-2"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>import &#123; hiveVariants, hiveEasing &#125; from '@hive/motion'</div>
                      <div className="mt-2">// Use HIVE variants</div>
                      <div>&lt;motion.div</div>
                      <div className="pl-4">variants=&#123;hiveVariants.feedCascade&#125;</div>
                      <div className="pl-4">initial="hidden"</div>
                      <div className="pl-4">animate="visible"</div>
                      <div>/&gt;</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      CSS Custom Properties
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>transition: all var(--hive-duration-smooth)</div>
                      <div className="pl-12">var(--hive-easing-magnetic);</div>
                      <div className="mt-2">/* Available easing curves */</div>
                      <div>--hive-easing-magnetic</div>
                      <div>--hive-easing-liquid</div>
                      <div>--hive-easing-silk</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Performance Guidelines
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Prefer transform and opacity for 60fps performance
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Use will-change sparingly and remove after animation
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Respect prefers-reduced-motion user preference
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Test animations on low-end mobile devices
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Accessibility Considerations
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>@media (prefers-reduced-motion: reduce) &#123;</div>
                      <div className="pl-4">* &#123;</div>
                      <div className="pl-8">animation-duration: 0.01ms !important;</div>
                      <div className="pl-8">transition-duration: 0.01ms !important;</div>
                      <div className="pl-4">&#125;</div>
                      <div>&#125;</div>
                    </div>
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

export const AnimationGuidelinesMotionSystem: Story = {
  render: () => <AnimationShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};