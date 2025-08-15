/**
 * HIVE Foundation: Design Tokens
 * Core design system foundation - colors, typography, spacing, motion
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Copy, Check } from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '01-Foundation/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Design Foundation

The foundational design tokens that power HIVE's dark luxury aesthetic and campus-first experience.
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DesignTokens = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const hiveColors = {
    brand: {
      'Primary Gold': 'var(--hive-brand-primary)',
      'Secondary Gold': 'var(--hive-brand-secondary)',
      'Gold Accent': 'var(--hive-brand-accent)',
      'Gold Muted': 'var(--hive-brand-muted)',
    },
    backgrounds: {
      'Primary': 'var(--hive-background-primary)',
      'Secondary': 'var(--hive-background-secondary)',
      'Tertiary': 'var(--hive-background-tertiary)',
      'Overlay': 'var(--hive-background-overlay)',
      'Interactive': 'var(--hive-background-interactive)',
    },
    text: {
      'Primary': 'var(--hive-text-primary)',
      'Secondary': 'var(--hive-text-secondary)',
      'Muted': 'var(--hive-text-muted)',
      'Disabled': 'var(--hive-text-disabled)',
      'Inverse': 'var(--hive-text-inverse)',
      'Placeholder': 'var(--hive-text-placeholder)',
    },
    borders: {
      'Primary': 'var(--hive-border-primary)',
      'Secondary': 'var(--hive-border-secondary)',
      'Subtle': 'var(--hive-border-subtle)',
      'Interactive': 'var(--hive-border-interactive)',
      'Focus': 'var(--hive-border-focus)',
      'Gold': 'var(--hive-border-gold)',
      'Gold Strong': 'var(--hive-border-gold-strong)',
    },
    status: {
      'Success': 'var(--hive-status-success)',
      'Warning': 'var(--hive-status-warning)',  
      'Error': 'var(--hive-status-error)',
      'Info': 'var(--hive-status-info)',
    }
  };

  const typography = {
    fonts: {
      'Sans': 'Inter, system-ui, sans-serif',
      'Mono': 'JetBrains Mono, monospace',
    },
    sizes: {
      'Display 2XL': 'var(--hive-font-size-2xl)',
      'Display XL': 'var(--hive-font-size-xl)',
      'Display LG': 'var(--hive-font-size-lg)',
      'Display MD': 'var(--hive-font-size-md)',
      'Heading XL': 'var(--hive-font-size-heading-xl)',
      'Heading LG': 'var(--hive-font-size-heading-lg)', 
      'Heading MD': 'var(--hive-font-size-heading-md)',
      'Heading SM': 'var(--hive-font-size-heading-sm)',
      'Body LG': 'var(--hive-font-size-body-lg)',
      'Body MD': 'var(--hive-font-size-body-md)',
      'Body SM': 'var(--hive-font-size-body-sm)',
      'Body XS': 'var(--hive-font-size-body-xs)',
    },
    weights: {
      'Light': 'var(--hive-font-weight-light)',
      'Normal': 'var(--hive-font-weight-normal)',
      'Medium': 'var(--hive-font-weight-medium)',
      'Semibold': 'var(--hive-font-weight-semibold)',
      'Bold': 'var(--hive-font-weight-bold)',
    }
  };

  const spacing = {
    'XS': 'var(--hive-spacing-xs)',
    'SM': 'var(--hive-spacing-sm)',
    'MD': 'var(--hive-spacing-md)',
    'LG': 'var(--hive-spacing-lg)',
    'XL': 'var(--hive-spacing-xl)',
    '2XL': 'var(--hive-spacing-2xl)',
  };

  const effects = {
    shadows: {
      'Small': 'var(--hive-shadow-sm)',
      'Medium': 'var(--hive-shadow-md)',
      'Large': 'var(--hive-shadow-lg)',
      'Extra Large': 'var(--hive-shadow-xl)',
      '2X Large': 'var(--hive-shadow-2xl)',
      'Gold Glow': 'var(--hive-shadow-gold-glow)',
      'Gold Glow Strong': 'var(--hive-shadow-gold-glow-strong)',
    },
    motion: {
      'Instant': 'var(--hive-duration-instant)',
      'Quick': 'var(--hive-duration-quick)',
      'Smooth': 'var(--hive-duration-smooth)',
      'Flowing': 'var(--hive-duration-flowing)',
      'Dramatic': 'var(--hive-duration-dramatic)',
    }
  };

  const ColorSwatch = ({ name, value, textColor = 'white' }: { name: string; value: string; textColor?: string }) => (
    <div className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300 cursor-pointer hive-interactive"
         onClick={() => copyToClipboard(value)}>
      <div 
        className="w-16 h-16 rounded-lg border flex-shrink-0 hive-interactive"
        style={{ borderColor: 'var(--hive-border-primary)', backgroundColor: value }}
      />
      <div className="flex-1">
        <div className="text-white font-medium">{name}</div>
        <div className="font-mono text-sm" style={{ color: 'var(--hive-text-secondary)' }}>{value}</div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-white"
        style={{ color: 'var(--hive-text-secondary)' }}
        onClick={(e) => {
          e.stopPropagation();
          copyToClipboard(value);
        }}
      >
        {copiedToken === value ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  const TokenDisplay = ({ 
    name, 
    value, 
    preview, 
    description 
  }: { 
    name: string; 
    value: string; 
    preview?: React.ReactNode;
    description?: string;
  }) => (
    <motion.div 
      variants={hiveVariants.hoverScale}
      initial="rest"
      whileHover="hover"
      whileTap="press"
      className="group flex items-center justify-between p-3 rounded-lg cursor-pointer relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(31, 41, 55, 0.3)',
        willChange: 'transform, background-color',
        transformOrigin: 'center',
      }}
      onClick={() => copyToClipboard(value)}
      onHoverStart={() => {
        // Subtle shimmer effect on hover
      }}
    >
      <div className="flex items-center space-x-3 relative z-10">
        {preview}
        <div>
          <div className="text-white font-medium">{name}</div>
          {description && <div className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>{description}</div>}
        </div>
      </div>
      <div className="flex items-center space-x-2 relative z-10">
        <motion.span 
          className="font-mono text-sm"
          style={{ color: 'var(--hive-text-secondary)' }}
          animate={copiedToken === value ? { color: 'var(--hive-brand-primary)' } : {}}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: copiedToken === value ? 1 : 0,
            scale: copiedToken === value ? 1 : 0.8
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <Button
            size="sm"
            variant="ghost"
            className="hover:text-white h-8 w-8 p-0"
            style={{ color: 'var(--hive-text-secondary)' }}
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(value);
            }}
          >
            <AnimatePresence mode="wait">
              {copiedToken === value ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Check className="h-4 w-4 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
      
      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{ transform: 'translateX(100%)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto p-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <svg viewBox="0 0 1500 1500" className="w-full h-full">
                <path fill="var(--hive-brand-primary)" d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              HIVE Design Tokens
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            The foundational design system that powers HIVE's dark luxury aesthetic and campus-first social utility platform.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Semantic Tokens</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Dark Luxury</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Campus Optimized</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Interactive</Badge>
          </div>
          {copiedToken && (
            <div className="mt-4 p-3 rounded-lg border" style={{ 
              backgroundColor: 'var(--hive-status-success)',
              borderColor: 'var(--hive-border-gold)',
              color: 'var(--hive-text-inverse)'
            }}>
              ✓ Copied {copiedToken} to clipboard
            </div>
          )}
        </div>

        <motion.div 
          className="space-y-12"
          variants={hiveVariants.feedCascade}
          initial="hidden"
          animate="visible"
        >
          
          {/* Brand Colors */}
          <motion.div
            variants={hiveVariants.feedCascade}
            custom={0}
          >
            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                Brand Colors
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Core HIVE brand identity - the golden thread that connects our campus communities
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(hiveColors.brand).map(([name, value]) => (
                  <ColorSwatch key={name} name={name} value={value} />
                ))}
              </div>
            </CardContent>
            </Card>
          </motion.div>

          {/* Backgrounds & Text */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={hiveVariants.feedCascade}
            custom={1}
          >
            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Background System
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Dark luxury layers that create depth and hierarchy
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(hiveColors.backgrounds).map(([name, value]) => (
                    <ColorSwatch key={name} name={name} value={value} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Text Hierarchy
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Typography colors for clear information architecture
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(hiveColors.text).map(([name, value]) => (
                    <ColorSwatch key={name} name={name} value={value} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Borders & Status */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={hiveVariants.feedCascade}
            custom={2}
          >
            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Interactive Borders
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Border states that guide user interactions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(hiveColors.borders).map(([name, value]) => (
                    <ColorSwatch key={name} name={name} value={value} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Status Colors
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Semantic colors for system feedback and states
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(hiveColors.status).map(([name, value]) => (
                    <ColorSwatch key={name} name={name} value={value} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Typography System */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={hiveVariants.feedCascade}
            custom={3}
          >
            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Typography Scale
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Semantic font sizes that scale beautifully across devices
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(typography.sizes).map(([name, value]) => (
                    <TokenDisplay
                      key={name}
                      name={name}
                      value={value}
                      preview={<span style={{ fontSize: value, color: 'var(--hive-text-primary)' }}>Ag</span>}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Font Weights
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Weight scale for visual hierarchy and emphasis
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(typography.weights).map(([name, value]) => (
                    <TokenDisplay
                      key={name}
                      name={name}
                      value={value}
                      preview={
                        <span style={{ 
                          fontWeight: value, 
                          color: 'var(--hive-text-primary)',
                          fontSize: '1.125rem'
                        }}>
                          Campus
                        </span>
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Spacing & Effects */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={hiveVariants.feedCascade}
            custom={4}
          >
            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Spacing System
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Consistent 8px grid system for perfect alignment
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(spacing).map(([name, value]) => (
                    <TokenDisplay
                      key={name}
                      name={name}
                      value={value}
                      preview={
                        <div 
                          className="h-4 rounded"
                          style={{ 
                            width: value, 
                            backgroundColor: 'var(--hive-brand-primary)',
                            minWidth: '8px'
                          }}
                        />
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
                  Motion & Effects
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Smooth animations that feel premium and responsive
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 style={{ color: 'var(--hive-text-primary)' }} className="font-medium mb-2">
                      Duration Tokens
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(effects.motion).map(([name, value]) => (
                        <TokenDisplay
                          key={name}
                          name={name}
                          value={value}
                          preview={
                            <div 
                              className="w-8 h-8 rounded-full hive-interactive"
                              style={{ 
                                backgroundColor: 'var(--hive-brand-primary)',
                                transition: `transform ${value} ease-out`
                              }}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--hive-text-primary)' }} className="font-medium mb-2">
                      Shadow Tokens
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(effects.shadows).slice(0, 3).map(([name, value]) => (
                        <TokenDisplay
                          key={name}
                          name={name}
                          value={value}
                          preview={
                            <div 
                              className="w-8 h-8 rounded-lg"
                              style={{ 
                                backgroundColor: 'var(--hive-background-tertiary)',
                                boxShadow: value
                              }}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Live Component Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="hive-glass border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-gold)] transition-all duration-300 mt-12">
          <CardHeader>
            <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-xl">
              Live Component Examples
            </CardTitle>
            <p style={{ color: 'var(--hive-text-muted)' }}>
              See how these tokens create HIVE's signature campus-first experience
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Campus Space Card */}
              <div className="hive-interactive rounded-lg p-4 cursor-pointer border"
                   style={{ 
                     backgroundColor: 'var(--hive-background-secondary)',
                     borderColor: 'var(--hive-border-primary)',
                     transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                     e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 hive-interactive"
                       style={{ 
                         backgroundColor: 'var(--hive-brand-primary)',
                         color: 'var(--hive-text-inverse)'
                       }}>
                    <span className="font-bold">CS</span>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--hive-text-primary)' }} className="font-medium">
                      CS 101 Study Group
                    </h4>
                    <p style={{ color: 'var(--hive-text-muted)' }} className="text-sm">
                      24 members active
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--hive-text-secondary)' }} className="text-sm">
                  Weekly study sessions for intro programming. Join us in the library!
                </p>
                <Button 
                  size="sm" 
                  className="mt-3 w-full"
                  style={{ 
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  }}>
                  Join Space
                </Button>
              </div>

              {/* Profile Preview */}
              <div className="hive-interactive rounded-lg p-4 cursor-pointer border"
                   style={{ 
                     backgroundColor: 'var(--hive-background-secondary)',
                     borderColor: 'var(--hive-border-primary)',
                     transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                     e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full mr-3 hive-interactive"
                       style={{ 
                         background: `linear-gradient(135deg, var(--hive-brand-primary), var(--hive-brand-accent))`
                       }}>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--hive-text-primary)' }} className="font-medium">
                      Sarah Chen
                    </h4>
                    <p style={{ color: 'var(--hive-brand-primary)' }} className="text-sm">
                      Builder • CS Major
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                  <span>12 Spaces</span>
                  <span>5 Tools Built</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  style={{ 
                    borderColor: 'var(--hive-border-gold)',
                    color: 'var(--hive-brand-primary)'
                  }}>
                  View Profile
                </Button>
              </div>

              {/* Tool Card */}
              <div className="hive-interactive rounded-lg p-4 cursor-pointer border"
                   style={{ 
                     backgroundColor: 'var(--hive-background-secondary)',
                     borderColor: 'var(--hive-border-primary)',
                     transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                     e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <h4 style={{ color: 'var(--hive-text-primary)' }} className="font-medium mb-2">
                  Study Room Finder
                </h4>
                <p style={{ color: 'var(--hive-text-secondary)' }} className="text-sm mb-3">
                  Find available study rooms across UB campus in real-time.
                </p>
                <div className="flex justify-between items-center">
                  <Badge style={{ 
                    backgroundColor: 'var(--hive-overlay-gold-subtle)',
                    color: 'var(--hive-brand-primary)',
                    border: '1px solid var(--hive-border-gold)'
                  }}>
                    Popular
                  </Badge>
                  <span style={{ color: 'var(--hive-text-muted)' }} className="text-sm">
                    847 uses
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 w-full hover:bg-[var(--hive-background-interactive)]"
                  style={{ color: 'var(--hive-brand-primary)' }}>
                  Use Tool
                </Button>
              </div>
            </div>
          </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const DesignTokensShowcase: Story = {
  render: () => <DesignTokens />,
  parameters: {
    layout: 'fullscreen'
  }
};