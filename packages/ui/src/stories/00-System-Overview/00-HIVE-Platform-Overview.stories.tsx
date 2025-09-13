import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../components/ui/container';
import { Text as Typography } from '../../atomic/atoms/typography';
import { HiveLogo } from '../../components/hive-logo';

/**
 * # HIVE Platform Overview
 * 
 * **The first social platform where connections form around solving real problems together.**
 * 
 * HIVE is social utility for college campuses - where every connection has purpose, 
 * every community solves problems, and every interaction moves your life forward.
 * 
 * ## Core Platform Components
 * 
 * - **Profile System**: Your campus command center connecting calendar, tools, communities, and goals
 * - **Spaces System**: () => voidal communities where students collaborate and coordinate
 * - **Tools System**: Solutions you build and share with your community
 * - **Feed System**: Real coordination, collaboration, and community building happening around you
 * - **Navigation System**: Intuitive command palette and responsive navigation
 */

const HivePlatformOverview = () => {
  const coreFeatures = [
    {
      title: "Profile System",
      description: "Your campus command center - not a highlight reel, but your personalized dashboard that actually runs your life",
      color: "hive-orange",
      status: "Production Ready"
    },
    {
      title: "Spaces System", 
      description: "Functional communities where CS majors share interview prep, dorms coordinate events, clubs get things done",
      color: "hive-blue",
      status: "Production Ready"
    },
    {
      title: "Tools System",
      description: "Solutions you build and share - creating connections around solving real problems together",
      color: "hive-green",
      status: "Production Ready"
    },
    {
      title: "Feed System",
      description: "Surfaces the coordination, collaboration, and community building actually happening around you",
      color: "hive-purple",
      status: "Production Ready"
    },
    {
      title: "Navigation System",
      description: "Command palette interface with responsive navigation patterns optimized for campus life",
      color: "hive-teal",
      status: "Production Ready"
    },
    {
      title: "Authentication",
      description: "UB-only (@buffalo.edu) authentication with comprehensive onboarding for campus context",
      color: "hive-red",
      status: "Production Ready"
    }
  ];

  const designSystemLayers = [
    {
      layer: "Foundation",
      description: "Design tokens, color system, typography, spacing, motion principles",
      components: "40+ foundation elements"
    },
    {
      layer: "Atoms",
      description: "Core UI building blocks - buttons, inputs, badges, avatars, icons",
      components: "35+ atomic components"
    },
    {
      layer: "Molecules", 
      description: "Combined elements - cards, forms, search bars, navigation items",
      components: "25+ molecular components"
    },
    {
      layer: "Organisms",
      description: "Complex systems - profile widgets, space browsers, tool builders",
      components: "15+ organism systems"
    },
    {
      layer: "Templates",
      description: "Complete page layouts and system integrations",
      components: "10+ page templates"
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <HiveLogo size="large" showWordmark />
        </div>
        <Typography variant="h1" className="text-4xl font-bold">
          HIVE Platform Overview
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The first social platform where connections form around solving real problems together.
          Built for University at Buffalo students.
        </Typography>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">v1.0 Beta</Badge>
          <Badge variant="secondary">University at Buffalo</Badge>
          <Badge variant="destructive">@buffalo.edu Only</Badge>
        </div>
      </div>

      {/* Mission Statement */}
      <Card className="border-hive-orange/20 bg-gradient-to-r from-hive-orange/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-hive-orange">Platform Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" className="text-lg leading-relaxed">
            <strong>Most social platforms are entertainment dressed up as connection</strong> — endless scrolling, 
            artificial engagement, dopamine hits that leave you emptier than before. Campus life deserves better 
            than another app that fragments your attention and wastes your time.
          </Typography>
          <Typography variant="body1" className="text-lg leading-relaxed mt-4">
            <strong>HIVE is social utility</strong> — where every connection has purpose, every community solves problems, 
            and every interaction moves your life forward. This is social media that actually makes your life better.
          </Typography>
        </CardContent>
      </Card>

      {/* Core Features Grid */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">
          Core Platform Features
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className={`border-${feature.color}/20 hover:border-${feature.color}/40 transition-colors`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Design System Architecture */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">
          Design System Architecture
        </Typography>
        <div className="space-y-4">
          {designSystemLayers.map((layer, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{layer.layer}</CardTitle>
                  <Badge variant="secondary">{layer.components}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{layer.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h3" className="font-semibold mb-2">Frontend Stack</Typography>
              <ul className="space-y-1 text-sm">
                <li>• Next.js 15 App Router</li>
                <li>• TypeScript (Strict Mode)</li>
                <li>• Tailwind CSS</li>
                <li>• Radix UI Components</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div>
              <Typography variant="h3" className="font-semibold mb-2">Backend Services</Typography>
              <ul className="space-y-1 text-sm">
                <li>• Firebase Firestore</li>
                <li>• Firebase Authentication</li>
                <li>• Vercel Serverless Functions</li>
                <li>• Firebase Storage</li>
                <li>• Real-time Updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Navigation */}
      <Card className="bg-gradient-to-r from-hive-blue/5 to-hive-purple/5">
        <CardHeader>
          <CardTitle>Explore the Design System</CardTitle>
          <CardDescription>
            Navigate through our comprehensive component library and system documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">01 Foundation</Button>
            <Button variant="secondary" size="sm">02 Atoms</Button>
            <Button variant="secondary" size="sm">03 Molecules</Button>
            <Button variant="secondary" size="sm">04 Organisms</Button>
            <Button variant="secondary" size="sm">Profile System</Button>
            <Button variant="secondary" size="sm">Spaces System</Button>
            <Button variant="secondary" size="sm">Tools System</Button>
            <Button variant="secondary" size="sm">Feed System</Button>
            <Button variant="secondary" size="sm">Navigation System</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const meta: Meta<typeof HivePlatformOverview> = {
  title: '00-Platform Overview/HIVE Platform Overview',
  component: HivePlatformOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Platform Overview

This is the complete overview of the HIVE platform - the first social platform where connections form around solving real problems together.

## What Makes HIVE Different

- **Social Utility**: Every feature serves both social connection and practical utility
- **Campus-First**: Built specifically for university life and student needs  
- **Problem Solving**: Communities form around solving real problems together
- **Production Ready**: Complete design system with 100+ components

## Design System Structure

The HIVE design system follows atomic design principles with campus-specific patterns and social utility at its core.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'HIVE Platform Overview',
  render: () => <HivePlatformOverview />,
};

export const DesignSystemShowcase: Story = {
  render: () => (
    <Container className="py-8">
      <Typography variant="h1" className="text-3xl font-bold mb-8 text-center">
        HIVE Design System Showcase
      </Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="secondary">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>

      <div className="flex gap-4 mb-8">
        <Badge variant="primary">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Important</Badge>
        <Badge variant="secondary">Outline</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile System</CardTitle>
            <CardDescription>Campus command center</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Your personalized dashboard that actually runs your campus life.
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spaces System</CardTitle>
            <CardDescription>Functional communities</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Where students collaborate and coordinate around real problems.
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tools System</CardTitle>
            <CardDescription>Collaborative solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Build and share tools that create connections through problem-solving.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
  ),
};