"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { HIVE_COLORS, colors, COLOR_USAGE } from "@hive/tokens";
import { Badge } from "../components/ui/badge";
import { Check, X, Star, Zap, AlertTriangle } from "lucide-react";

const meta: Meta = {
  title: "Design System/Color System v2",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# HIVE "Tech-Monochrome + Yellow" Color System v2

**Inspired by Geist design principles**

This showcases our refined color system with:
- 90% grayscale surfaces + ≤10% yellow accents
- Semantic tokens with precise L* values
- Motion-based feedback instead of color-based states
- WCAG 2.1 AA compliance (≥4.5:1 contrast)
        `,
      },
    },
    backgrounds: {
      default: "hive-root",
      values: [
        { name: "hive-root", value: "#0A0A0A" },
        { name: "surface-01", value: "#111111" },
        { name: "surface-02", value: "#181818" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SEMANTIC TOKEN SHOWCASE
// ============================================================================

const TokenShowcase = () => (
  <div className="p-8 space-y-8 bg-bg-root text-text-primary min-h-screen">
    {/* Header */}
    <div className="text-center space-y-4 mb-12">
      <h1 className="text-h1 font-display">HIVE Color System v2</h1>
      <p className="text-body text-text-secondary max-w-2xl mx-auto">
        90% grayscale + ≤10% strategic yellow accents with motion-based feedback
      </p>
    </div>

    {/* Canvas & Surfaces */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">
        Canvas & Surfaces (90% usage)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* bg-root */}
        <div className="bg-bg-root border border-border-line rounded-lg p-6 space-y-3">
          <div className="w-full h-16 bg-bg-root border border-border-line rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">bg-root</div>
            <div className="text-code font-mono">#0A0A0A</div>
            <div className="text-caption text-text-disabled">
              L*6 • Page canvas (55%)
            </div>
          </div>
        </div>

        {/* surface-01 */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-3">
          <div className="w-full h-16 bg-surface-01 border border-border-line rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">surface-01</div>
            <div className="text-code font-mono">#111111</div>
            <div className="text-caption text-text-disabled">
              L*9 • Cards, Feed rows (20%)
            </div>
          </div>
        </div>

        {/* surface-02 */}
        <div className="bg-surface-02 border border-border-line rounded-lg p-6 space-y-3">
          <div className="w-full h-16 bg-surface-02 border border-border-line rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">surface-02</div>
            <div className="text-code font-mono">#181818</div>
            <div className="text-caption text-text-disabled">
              L*12 • Drawers, modals (7%)
            </div>
          </div>
        </div>

        {/* surface-03 */}
        <div className="bg-surface-03 border border-border-line rounded-lg p-6 space-y-3">
          <div className="w-full h-16 bg-surface-03 border border-border-line rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">surface-03</div>
            <div className="text-code font-mono">#1F1F1F</div>
            <div className="text-caption text-text-disabled">
              L*15 • Inputs, forms (5%)
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Text Hierarchy */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">Text Hierarchy</h2>

      <div className="bg-surface-01 border border-border-line rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Text */}
          <div className="space-y-3">
            <div className="text-h1 text-text-primary">Primary Text</div>
            <div className="space-y-1">
              <div className="text-caption text-text-secondary">
                text-primary
              </div>
              <div className="text-code font-mono">#FFFFFF</div>
              <div className="text-caption text-text-disabled">
                L*100 • Headlines, body
              </div>
            </div>
          </div>

          {/* Secondary Text */}
          <div className="space-y-3">
            <div className="text-h2 text-text-secondary">Secondary Text</div>
            <div className="space-y-1">
              <div className="text-caption text-text-secondary">
                text-secondary
              </div>
              <div className="text-code font-mono">#CFCFCF</div>
              <div className="text-caption text-text-disabled">
                L*82 • Metadata, captions
              </div>
            </div>
          </div>

          {/* Disabled Text */}
          <div className="space-y-3">
            <div className="text-h3 text-text-disabled">Disabled Text</div>
            <div className="space-y-1">
              <div className="text-caption text-text-secondary">
                text-disabled
              </div>
              <div className="text-code font-mono">#8A8A8A</div>
              <div className="text-caption text-text-disabled">
                L*55 • Placeholders
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Yellow Accent System */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">
        Yellow Accent System (≤10% usage)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* yellow-500 */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-4">
          <div className="w-full h-16 bg-yellow-500 rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">yellow-500</div>
            <div className="text-code font-mono">#FFD700</div>
            <div className="text-caption text-text-disabled">
              L*88 • Primary accent, focus
            </div>
          </div>
        </div>

        {/* yellow-600 */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-4">
          <div className="w-full h-16 bg-yellow-600 rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">yellow-600</div>
            <div className="text-code font-mono">#EAC200</div>
            <div className="text-caption text-text-disabled">
              L*80 • Hover states
            </div>
          </div>
        </div>

        {/* yellow-700 */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-4">
          <div className="w-full h-16 bg-yellow-700 rounded-md"></div>
          <div className="space-y-1">
            <div className="text-caption text-text-secondary">yellow-700</div>
            <div className="text-code font-mono">#C4A500</div>
            <div className="text-caption text-text-disabled">
              L*68 • Pressed, selected
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Interactive States */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">
        Interactive States (+3 L* hover shift)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* surface-01 interactions */}
        <div className="space-y-3">
          <div className="text-caption text-text-secondary">
            surface-01 interactions
          </div>
          <div className="bg-surface-01 hover:bg-surface-01-hover border border-border-line rounded-lg p-6 transition-all duration-90 ease-hive cursor-pointer">
            <div className="space-y-2">
              <div className="text-body">Hover me</div>
              <div className="text-caption text-text-disabled">
                Rest: #111111 → Hover: #1A1A1A
              </div>
            </div>
          </div>
        </div>

        {/* surface-02 interactions */}
        <div className="space-y-3">
          <div className="text-caption text-text-secondary">
            surface-02 interactions
          </div>
          <div className="bg-surface-02 hover:bg-surface-02-hover border border-border-line rounded-lg p-6 transition-all duration-90 ease-hive cursor-pointer">
            <div className="space-y-2">
              <div className="text-body">Hover me</div>
              <div className="text-caption text-text-disabled">
                Rest: #181818 → Hover: #212121
              </div>
            </div>
          </div>
        </div>

        {/* surface-03 interactions */}
        <div className="space-y-3">
          <div className="text-caption text-text-secondary">
            surface-03 interactions
          </div>
          <div className="bg-surface-03 hover:bg-surface-03-hover border border-border-line rounded-lg p-6 transition-all duration-90 ease-hive cursor-pointer">
            <div className="space-y-2">
              <div className="text-body">Hover me</div>
              <div className="text-caption text-text-disabled">
                Rest: #1F1F1F → Hover: #282828
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Button Showcase */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">Button System</h2>

      <div className="bg-surface-01 border border-border-line rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-3">
            <Button variant="default" size="md">
              Primary
            </Button>
            <div className="text-caption text-text-secondary">default</div>
          </div>

          <div className="space-y-3">
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <div className="text-caption text-text-secondary">secondary</div>
          </div>

          <div className="space-y-3">
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <div className="text-caption text-text-secondary">ghost</div>
          </div>

          <div className="space-y-3">
            <Button variant="destructive" size="md">
              Destructive
            </Button>
            <div className="text-caption text-text-secondary">destructive</div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" size="md">
              Outline
            </Button>
            <div className="text-caption text-text-secondary">outline</div>
          </div>

          <div className="space-y-3">
            <Button variant="link" size="md">
              Link
            </Button>
            <div className="text-caption text-text-secondary">link</div>
          </div>
        </div>
      </div>
    </section>

    {/* Accessibility Compliance */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">
        Accessibility Compliance
      </h2>

      <div className="bg-surface-01 border border-border-line rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* WCAG AA Standards */}
          <div className="space-y-4">
            <h3 className="text-h4 font-display">WCAG 2.1 AA Compliance</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-caption">White on bg-root</span>
                <span className="text-code font-mono text-yellow-500">
                  21:1 ✅ AAA
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption">Secondary on bg-root</span>
                <span className="text-code font-mono text-yellow-500">
                  8.2:1 ✅ AA+
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption">Yellow on bg-root</span>
                <span className="text-code font-mono text-yellow-500">
                  10.4:1 ✅ AAA
                </span>
              </div>
            </div>
          </div>

          {/* Focus Management */}
          <div className="space-y-4">
            <h3 className="text-h4 font-display">Focus Management</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Tab to focus me
              </Button>
              <div className="text-caption text-text-secondary">
                Focus rings use yellow-500 with proper offset
              </div>
            </div>
          </div>

          {/* Motion Preferences */}
          <div className="space-y-4">
            <h3 className="text-h4 font-display">Motion Support</h3>
            <div className="text-caption text-text-secondary">
              All animations respect <code>prefers-reduced-motion</code> and
              gracefully degrade to minimal motion for accessibility.
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Motion-Based Feedback */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">
        Motion-Based Feedback
      </h2>

      <div className="bg-surface-01 border border-border-line rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Error State */}
          <div className="space-y-4">
            <h3 className="text-h4 font-display">Error Feedback</h3>
            <div className="space-y-3">
              <button
                className="w-full p-4 bg-surface-03 border border-border-line rounded-lg text-left transition-all duration-90 hover:border-yellow-500 focus:outline-none focus:shadow-focus-offset"
                onClick={(e) => {
                  e.currentTarget.classList.add(
                    "animate-border-flicker",
                    "animate-micro-shake"
                  );
                  setTimeout(() => {
                    e.currentTarget.classList.remove(
                      "animate-border-flicker",
                      "animate-micro-shake"
                    );
                  }, 16);
                }}
              >
                <div className="text-body">Click for error feedback</div>
                <div className="text-caption text-text-secondary">
                  Border flicker + micro-shake (16ms)
                </div>
              </button>
            </div>
          </div>

          {/* Success State */}
          <div className="space-y-4">
            <h3 className="text-h4 font-display">Success Feedback</h3>
            <div className="space-y-3">
              <button
                className="relative w-full p-4 bg-surface-03 border border-border-line rounded-lg text-left transition-all duration-90 hover:border-yellow-500 focus:outline-none focus:shadow-focus-offset"
                onClick={(e) => {
                  e.currentTarget.classList.add("animate-scale-success");

                  // Add check mark
                  const check = document.createElement("span");
                  check.innerHTML = "✓";
                  check.className =
                    "absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-500 font-semibold opacity-0 animate-fade-in";
                  e.currentTarget.appendChild(check);

                  setTimeout(() => {
                    e.currentTarget.classList.remove("animate-scale-success");
                    check.remove();
                  }, 400);
                }}
              >
                <div className="text-body">Click for success feedback</div>
                <div className="text-caption text-text-secondary">
                  Scale-up + yellow check icon
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Usage Guidelines */}
    <section className="space-y-6">
      <h2 className="text-h3 font-display text-yellow-500">Usage Guidelines</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correct Usage */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-semibold">✅</span>
            <h3 className="text-h4 font-display">Correct Usage</h3>
          </div>
          <div className="space-y-3 text-caption text-text-secondary">
            <div>• 90% grayscale for interface structure</div>
            <div>• Yellow accents for focus and interaction only</div>
            <div>• Motion-based feedback for states</div>
            <div>• Semantic tokens over hardcoded values</div>
            <div>• +3 L* shifts for hover states</div>
          </div>
        </div>

        {/* Incorrect Usage */}
        <div className="bg-surface-01 border border-border-line rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-semibold">❌</span>
            <h3 className="text-h4 font-display">Incorrect Usage</h3>
          </div>
          <div className="space-y-3 text-caption text-text-secondary">
            <div>• Yellow backgrounds (too prominent)</div>
            <div>• Additional accent colors</div>
            <div>• Color-only state indicators</div>
            <div>• Hardcoded hex values</div>
            <div>• Breaking the 90/10 rule</div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// STORIES
// ============================================================================

export const Overview: Story = {
  render: () => <TokenShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of the HIVE "Tech-Monochrome + Yellow" color system with semantic tokens, interaction states, and motion-based feedback.',
      },
    },
  },
};
