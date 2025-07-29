import type { Meta, StoryObj } from '@storybook/react';
import { Text, Heading, Caption } from '../../atomic/atoms';

const meta: Meta = {
  title: '00-Overview/HIVE Design System',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Design System Overview

This is the complete HIVE design system - a clean, atomic approach to building our student social platform.

## Our Philosophy
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Zero Hardcoded Values**: 100% semantic tokens (var(--hive-*))
- **Mobile-First**: Web-first experience that runs beautifully on mobile
- **Student-Focused**: Built for university social experiences

## Color System
- **Monochrome Foundation**: Vercel-inspired blacks, grays, whites
- **Single Gold Accent**: #FFD700 only - no champagne or other metals
- **High Contrast**: Optimized for accessibility and dark-mode preference

## Typography
- **Space Grotesk**: Display font for headings and impact
- **Geist Sans**: Body font for readability and interface

## Components Architecture
Our system follows strict atomic design principles with 100% token compliance.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Welcome: StoryObj = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <Heading level={1} className="bg-gradient-to-r from-[var(--hive-text-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent">
          HIVE Design System
        </Heading>
        <Text size="lg" color="secondary" className="max-w-2xl mx-auto">
          Complete atomic design system for student social experiences. 
          Built with zero hardcoded values and 100% semantic token compliance.
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]">
          <Heading level={3} color="brand" className="mb-3">Foundation</Heading>
          <Text size="sm" color="secondary">Colors, typography, logos, and icons</Text>
        </div>
        
        <div className="border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]">
          <Heading level={3} color="brand" className="mb-3">Atoms</Heading>
          <Text size="sm" color="secondary">Basic building blocks - buttons, inputs, text</Text>
        </div>
        
        <div className="border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]">
          <Heading level={3} color="brand" className="mb-3">Molecules</Heading>
          <Text size="sm" color="secondary">Simple combinations - forms, cards, navigation</Text>
        </div>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-8 bg-[var(--hive-background-secondary)]">
        <Heading level={3} className="mb-4">Design Principles</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text weight="medium" className="mb-2">🎯 Student-First</Text>
            <Caption>Every component optimized for university social experiences</Caption>
          </div>
          <div>
            <Text weight="medium" className="mb-2">⚡ Zero Hardcoded</Text>
            <Caption>100% semantic tokens ensure perfect consistency</Caption>
          </div>
          <div>
            <Text weight="medium" className="mb-2">📱 Mobile-Ready</Text>
            <Caption>Web-first that runs beautifully on mobile devices</Caption>
          </div>
          <div>
            <Text weight="medium" className="mb-2">🎨 Atomic Design</Text>
            <Caption>Clean component hierarchy following atomic principles</Caption>
          </div>
        </div>
      </div>
    </div>
  ),
};