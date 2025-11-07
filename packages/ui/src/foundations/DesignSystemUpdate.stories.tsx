'use client';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../atomic/atoms/button';
import { Input } from '../../atomic/atoms/input';
import { Textarea } from '../../atomic/atoms/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../atomic/atoms/select';
import { Link } from '../../typography/link';
import { Label } from '../../atomic/atoms/label';

const meta: Meta = {
  title: '00-Foundations/Design System Update — ChatGPT/Vercel Aesthetic',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'hive-dark' },
    docs: {
      description: {
        component: `
# Design System Update — White Glow Focus States

**Updated**: November 2, 2025
**Philosophy**: 95% grayscale, 5% gold — ChatGPT/Vercel/SF/YC startup aesthetic

## What Changed

### Before (Gold Everywhere):
- Focus rings: **Gold** (#FACC15)
- Hover states: **Gold** backgrounds
- Border focus: **Gold**

**Problem**: Visual noise, gold fatigue, not minimal

### After (White Glow):
- Focus rings: **White glow** (rgba(255,255,255,0.20))
- Hover states: **Subtle white** (rgba(255,255,255,0.04))
- Border focus: **White** (rgba(255,255,255,0.40))

**Result**: Clean, professional, timeless

## Gold Usage Rules

### ✅ Allowed (4 Moments Only):
- Primary CTAs (Join Space, Create Tool, Start Ritual)
- Achievement moments (Ritual complete, level unlocked)
- Online presence indicator (147 students online)
- Featured content badges

### ❌ Forbidden:
- Focus rings (use white glow)
- Hover states (use grayscale)
- All borders (use white/gray)
- Secondary buttons (use outline variant)
- Decorative elements

## Components Updated

All form components now use white focus glow:
- Button
- Input
- Textarea
- Select
- Link

**Try it**: Use Tab key to navigate and see white glow focus rings.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WhiteGlowFocusStates: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-12 space-y-12">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-2">
          ChatGPT/Vercel Aesthetic
        </h1>
        <p className="text-lg text-[var(--hive-text-secondary)]">
          95% grayscale, 5% gold — White glow for all focus states
        </p>
        <p className="text-sm text-[var(--hive-text-muted)] mt-2">
          💡 <strong>Try it:</strong> Use Tab key to navigate and see white glow focus rings
        </p>
      </div>

      {/* Button Focus States */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Button Focus States
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ✅ White glow focus ring (NOT gold) — Clean, minimal, professional
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
        <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-xs text-[var(--hive-text-muted)] mb-2 font-mono">
            focus-visible:ring-[var(--hive-interactive-focus)]
          </p>
          <p className="text-xs text-[var(--hive-text-secondary)]">
            White glow: rgba(255, 255, 255, 0.20)
          </p>
        </div>
      </section>

      {/* Gold CTA (Only Use Case) */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Gold CTAs (Primary Actions Only)
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            🏆 Gold reserved for PRIMARY CTAS ONLY — Dopamine hits, not everyday interactions
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="brand">Join This Space →</Button>
          <Button variant="brand">Create Your First Tool</Button>
          <Button variant="brand">Start This Ritual</Button>
        </div>
        <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-xs text-[var(--hive-text-muted)] mb-2">
            ✅ Allowed: Primary CTAs, achievements, online presence, featured badges
          </p>
          <p className="text-xs text-[var(--hive-text-muted)]">
            ❌ Forbidden: Focus rings, hover states, borders, decorative elements
          </p>
        </div>
      </section>

      {/* Input Focus States */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Input Focus States
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ✅ White glow border + ring + shadow (NOT gold)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="input1">Text Input (Default)</Label>
            <Input id="input1" placeholder="Click to focus..." className="mt-2" />
          </div>
          <div>
            <Label htmlFor="input2">Text Input (Subtle)</Label>
            <Input id="input2" variant="subtle" placeholder="Subtle variant..." className="mt-2" />
          </div>
        </div>
        <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-xs text-[var(--hive-text-muted)] mb-2 font-mono">
            focus-visible:border-[var(--hive-border-focus)]
          </p>
          <p className="text-xs text-[var(--hive-text-muted)] mb-2 font-mono">
            focus-visible:ring-[var(--hive-interactive-focus)]
          </p>
          <p className="text-xs text-[var(--hive-text-muted)] font-mono">
            focus-visible:shadow-[0_0_28px_rgba(255,255,255,0.15)]
          </p>
          <p className="text-xs text-[var(--hive-text-secondary)] mt-3">
            Border focus: rgba(255, 255, 255, 0.40) | Ring: rgba(255, 255, 255, 0.20) | Shadow: white glow
          </p>
        </div>
      </section>

      {/* Textarea Focus States */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Textarea Focus States
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ✅ Same white glow treatment as inputs
          </p>
        </div>
        <div>
          <Label htmlFor="textarea1">Message</Label>
          <Textarea id="textarea1" placeholder="Share your thoughts..." className="mt-2" />
        </div>
        <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-xs text-[var(--hive-text-secondary)]">
            Consistent white glow across all form elements — ChatGPT/Vercel minimalism
          </p>
        </div>
      </section>

      {/* Select Focus States */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Select Focus States
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ✅ White glow on focus and interaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="select1">Campus</Label>
            <Select defaultValue="ub">
              <SelectTrigger id="select1" className="mt-2">
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ub">University at Buffalo</SelectItem>
                <SelectItem value="rit">Rochester Institute of Technology</SelectItem>
                <SelectItem value="rutgers">Rutgers University</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="select2">Major</Label>
            <Select>
              <SelectTrigger id="select2" className="mt-2">
                <SelectValue placeholder="Select major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Link Focus States */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Link Focus States
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ✅ White glow focus ring (NOT gold)
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="#" tone="brand">Brand Link</Link>
          <Link href="#" tone="neutral">Neutral Link</Link>
          <Link href="#" tone="muted">Muted Link</Link>
        </div>
        <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-xs text-[var(--hive-text-muted)] font-mono">
            focus-visible:ring-[var(--hive-interactive-focus)]
          </p>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Before/After Comparison
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-3 uppercase tracking-wider">
              ❌ Before (Gold Everywhere)
            </h3>
            <div className="space-y-3 text-sm text-[var(--hive-text-secondary)]">
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Focus Rings:</p>
                <p className="font-mono text-xs text-yellow-400">Gold (#FACC15)</p>
              </div>
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Hover States:</p>
                <p className="font-mono text-xs text-yellow-400">Gold backgrounds</p>
              </div>
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Border Focus:</p>
                <p className="font-mono text-xs text-yellow-400">Gold borders</p>
              </div>
              <p className="text-xs text-red-400 mt-4">
                ⚠️ Problem: Visual noise, gold fatigue
              </p>
            </div>
          </div>

          {/* After */}
          <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border-2 border-green-500/30">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-3 uppercase tracking-wider">
              ✅ After (95% Grayscale, 5% Gold)
            </h3>
            <div className="space-y-3 text-sm text-[var(--hive-text-secondary)]">
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Focus Rings:</p>
                <p className="font-mono text-xs text-white">White glow (rgba(255,255,255,0.20))</p>
              </div>
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Hover States:</p>
                <p className="font-mono text-xs text-white">Subtle white (rgba(255,255,255,0.04))</p>
              </div>
              <div>
                <p className="text-xs text-[var(--hive-text-muted)] mb-1">Border Focus:</p>
                <p className="font-mono text-xs text-white">White (rgba(255,255,255,0.40))</p>
              </div>
              <p className="text-xs text-green-400 mt-4">
                ✅ Result: ChatGPT/Vercel aesthetic
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Variables Reference */}
      <section className="max-w-4xl space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
            CSS Variables Reference
          </h2>
        </div>
        <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)] font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-muted)]">--hive-interactive-focus</span>
            <span className="text-[var(--hive-text-primary)]">rgba(255, 255, 255, 0.20)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-muted)]">--hive-interactive-hover</span>
            <span className="text-[var(--hive-text-primary)]">rgba(255, 255, 255, 0.04)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-muted)]">--hive-interactive-active</span>
            <span className="text-[var(--hive-text-primary)]">rgba(255, 255, 255, 0.08)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-muted)]">--hive-border-focus</span>
            <span className="text-[var(--hive-text-primary)]">rgba(255, 255, 255, 0.40)</span>
          </div>
          <div className="flex justify-between border-t border-[var(--hive-border-default)] pt-2 mt-2">
            <span className="text-[var(--hive-text-muted)]">--hive-gold-cta</span>
            <span className="text-yellow-400">#FFD700 (Primary CTAs only)</span>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="max-w-4xl">
        <div className="p-8 bg-[var(--hive-background-secondary)] rounded-2xl border border-[var(--hive-border-default)]">
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">
            Design Philosophy
          </h2>
          <div className="space-y-4 text-sm text-[var(--hive-text-secondary)]">
            <p>
              <strong className="text-[var(--hive-text-primary)]">HIVE = ChatGPT meets Vercel meets SF startup</strong>
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li><strong>95% grayscale</strong> — Clean, professional, timeless</li>
              <li><strong>5% gold</strong> — Strategic moments only (CTAs, rewards)</li>
              <li><strong>No visual noise</strong> — Subtle hovers, white focus rings</li>
              <li><strong>Motion consistency</strong> — Same easing for same interactions</li>
              <li><strong>Mobile-first</strong> — 80% usage on phones, design accordingly</li>
            </ul>
            <p className="pt-4 border-t border-[var(--hive-border-default)] italic">
              <strong>Brand Rule</strong>: If you're unsure whether to use gold, <strong>use grayscale</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of the ChatGPT/Vercel design system update with white glow focus states.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      campus: '',
      message: '',
    });

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
              Interactive Demo — White Glow Focus
            </h1>
            <p className="text-[var(--hive-text-secondary)]">
              Use Tab key to navigate and see white glow in action
            </p>
          </div>

          <div className="p-8 bg-[var(--hive-background-secondary)] rounded-2xl border border-[var(--hive-border-default)] space-y-6">
            <div>
              <Label htmlFor="demo-name">Full Name</Label>
              <Input
                id="demo-name"
                placeholder="Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="demo-email">Email (@buffalo.edu)</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="alex@buffalo.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="demo-campus">Campus</Label>
              <Select
                value={formData.campus}
                onValueChange={(value) => setFormData({ ...formData, campus: value })}
              >
                <SelectTrigger id="demo-campus" className="mt-2">
                  <SelectValue placeholder="Select your campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ub">University at Buffalo</SelectItem>
                  <SelectItem value="rit">Rochester Institute of Technology</SelectItem>
                  <SelectItem value="rutgers">Rutgers University</SelectItem>
                  <SelectItem value="cornell">Cornell University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="demo-message">Message</Label>
              <Textarea
                id="demo-message"
                placeholder="Tell us about your campus experience..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button variant="brand">Submit →</Button>
            </div>
          </div>

          <div className="p-6 bg-[var(--hive-background-secondary)] rounded-xl border border-green-500/30">
            <p className="text-sm text-[var(--hive-text-secondary)]">
              ✅ <strong className="text-[var(--hive-text-primary)]">Notice:</strong> All form fields have <strong>white glow</strong> focus states, not gold. Only the primary Submit button uses gold (brand variant).
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive form demonstrating white glow focus states in action. Use Tab to navigate.',
      },
    },
  },
};
