/**
 * HIVE Design System Overview
 * Complete showcase of HIVE's social utility platform design system
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button-enhanced';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  component: HiveOverview,
  title: '00-HIVE-Overview/Platform Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Design System

**Where connections form around solving real problems together.**

HIVE is the first social platform built for campus communities that blends social connection with practical utility. Our design system reflects this vision through:

## 🏗️ Architecture
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Social Utility First**: Every component serves both connection and functionality
- **Mobile-First**: Optimized for campus life on-the-go
- **Dark Luxury**: Premium aesthetic with HIVE gold accents

## 🎯 Core Principles
1. **Effortless Engagement**: Students don't need instructions
2. **Campus Context**: Built for university social dynamics  
3. **Viral Mechanics**: Growth through authentic usefulness
4. **Community Building**: Strengthening real relationships

## 📱 Platform Components
This Storybook showcases our complete frontend system as it appears in production.
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HiveOverview = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <svg viewBox="0 0 1500 1500" className="w-full h-full">
                <path fill="var(--hive-brand-primary)" d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              HIVE Design System
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--hive-text-secondary)' }}>
            Social utility platform for campus communities • Built for UB students, scaling to universities nationwide
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Social Utility</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Campus Communities</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Mobile First</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Dark Luxury</Badge>
          </div>
        </motion.div>

        {/* Design System Navigation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={hiveVariants.feedCascade}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: "01 • Foundation",
              description: "Colors, typography, spacing, and core design tokens",
              category: "Design Tokens",
              items: ["Brand Colors", "Typography Scale", "Spacing System", "Motion Design"]
            },
            {
              title: "02 • Atoms",
              description: "Basic building blocks of the HIVE interface",
              category: "Components",
              items: ["Buttons", "Inputs", "Icons", "Badges", "Avatars"]
            },
            {
              title: "03 • Molecules",
              description: "Combined atoms creating functional components",
              category: "Components", 
              items: ["Form Fields", "Cards", "Navigation Items", "User Info"]
            },
            {
              title: "04 • Organisms",
              description: "Complex UI sections and complete features",
              category: "Systems",
              items: ["Headers", "Sidebars", "Profile Dashboards", "Space Cards"]
            },
            {
              title: "05 • Templates",
              description: "Page layouts and structural patterns",
              category: "Layouts",
              items: ["Dashboard Layout", "Profile Layout", "Feed Layout", "Onboarding"]
            },
            {
              title: "06 • Live Frontend",
              description: "Complete pages as they appear in production",
              category: "Production",
              items: ["Profile System", "Spaces System", "Feed & Rituals", "Tools Builder"]
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              variants={hiveVariants.feedCascade}
              custom={index}
              onHoverStart={() => setHoveredSection(section.title)}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <motion.div
                variants={hiveVariants.hoverScale}
                initial="rest"
                whileHover="hover"
                whileTap="press"
              >
                <Card className="hive-glass border border-gray-700 hive-interactive cursor-pointer"
                  style={{ 
                    transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle style={{ color: 'var(--hive-brand-primary)' }} className="text-lg">
                      {section.title}
                    </CardTitle>
                    <Badge variant="secondary" 
                           className="text-xs mt-2"
                           style={{ 
                             borderColor: 'var(--hive-border-subtle)',
                             color: 'var(--hive-text-muted)'
                           }}>
                      {section.category}
                    </Badge>
                  </div>
                </div>
                <p style={{ color: 'var(--hive-text-muted)' }} className="text-sm mt-3">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} 
                        className="text-sm flex items-center hive-interactive p-2 rounded hover:bg-[var(--hive-background-interactive)] transition-colors duration-200"
                        style={{ color: 'var(--hive-text-secondary)' }}>
                      <div className="w-1.5 h-1.5 rounded-full mr-3"
                           style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          {[
            { label: "Components", value: "120+" },
            { label: "Stories", value: "300+" },
            { label: "Pages", value: "25+" },
            { label: "Universities", value: "1→∞" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 1.4 + index * 0.1, 
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1] // steel spring for satisfying bounce
              }}
              onHoverStart={() => setHoveredStat(stat.label)}
              onHoverEnd={() => setHoveredStat(null)}
              variants={hiveVariants.hoverScale}
              whileHover="hover"
              className="text-center p-6 rounded-lg hive-interactive cursor-pointer"
              style={{ 
                background: 'var(--hive-overlay-glass)',
                border: '1px solid var(--hive-border-subtle)',
                transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)',
                transformOrigin: 'center',
                willChange: 'transform, border-color'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
              }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--hive-brand-primary)' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--hive-text-muted)' }} className="text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ color: 'var(--hive-text-muted)' }} className="mb-6">
            Explore the complete HIVE design system and see how we're building the future of campus communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" 
                    className="hive-interactive"
                    style={{ 
                      backgroundColor: 'var(--hive-brand-primary)',
                      color: 'var(--hive-text-inverse)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow-strong)';
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
              Start Exploring
            </Button>
            <Button variant="secondary" 
                    size="lg" 
                    className="hive-interactive"
                    style={{ 
                      borderColor: 'var(--hive-border-gold)',
                      color: 'var(--hive-brand-primary)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.backgroundColor = 'var(--hive-overlay-gold-subtle)';
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}>
              View Live Platform
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Overview: Story = {
  render: () => <HiveOverview />,
  parameters: {
    layout: 'fullscreen'
  }
};