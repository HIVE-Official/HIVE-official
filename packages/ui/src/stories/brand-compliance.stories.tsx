import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, RitualBadge } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Trophy, Zap, Check, X, AlertTriangle } from "lucide-react";

const meta: Meta = {
  title: "HIVE/Brand Compliance",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ============================================================================
// BRAND SYSTEM OVERVIEW
// ============================================================================

export const BrandSystemOverview: Story = {
  name: "HIVE Brand System v1.0",
  render: () => (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1
            className="text-[48px] leading-[56px] font-semibold text-[#FFFFFF]"
            style={{ fontFamily: "Space Grotesk Variable" }}
          >
            HIVE Brand System v1.0
          </h1>
          <p
            className="text-[16px] leading-[24px] text-[#6B7280]"
            style={{ fontFamily: "Geist Sans Variable" }}
          >
            Production standard for monochrome + yellow design system
          </p>
        </div>

        {/* Brand Rules */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              ✅ CORRECTED Brand Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Typography */}
              <div className="space-y-3">
                <h3
                  className="text-[20px] leading-[28px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  Typography
                </h3>
                <div
                  className="space-y-2 text-[14px] leading-[20px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">
                      Space Grotesk Variable (headlines)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">
                      Geist Sans Variable (body text)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-[#6B7280] line-through">
                      General Sans + Inter
                    </span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <h3
                  className="text-[20px] leading-[28px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  Colors
                </h3>
                <div
                  className="space-y-2 text-[14px] leading-[20px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">Border: #2A2A2A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">Gold hover: #EAC200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-[#6B7280] line-through">
                      Border: #374151
                    </span>
                  </div>
                </div>
              </div>

              {/* Motion */}
              <div className="space-y-3">
                <h3
                  className="text-[20px] leading-[28px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  Motion
                </h3>
                <div
                  className="space-y-2 text-[14px] leading-[20px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">90ms / 220ms / 300ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">
                      cubic-bezier(0.22,0.61,0.36,1)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-[#6B7280] line-through">
                      150ms / 200ms timings
                    </span>
                  </div>
                </div>
              </div>

              {/* Button Rules */}
              <div className="space-y-3">
                <h3
                  className="text-[20px] leading-[28px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  Button Rules
                </h3>
                <div
                  className="space-y-2 text-[14px] leading-[20px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">
                      NO gold fills (except ritual badges)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[#FFFFFF]">
                      Motion-based error feedback
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-[#6B7280] line-through">
                      Red/green status colors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              Color Palette (CORRECTED)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Surfaces */}
              <div className="space-y-2">
                <div className="h-16 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">Background</div>
                  <div className="text-[#6B7280]">#0A0A0A</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-16 bg-[#111111] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">Surface</div>
                  <div className="text-[#6B7280]">#111111</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-16 bg-[#2A2A2A] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">
                    Border (FIXED)
                  </div>
                  <div className="text-[#6B7280]">#2A2A2A</div>
                </div>
              </div>

              {/* Accent Colors */}
              <div className="space-y-2">
                <div className="h-16 bg-[#FFD700] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">Accent</div>
                  <div className="text-[#6B7280]">#FFD700</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-16 bg-[#EAC200] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">
                    Hover (FIXED)
                  </div>
                  <div className="text-[#6B7280]">#EAC200</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-16 bg-[#C4A500] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">
                    Active (FIXED)
                  </div>
                  <div className="text-[#6B7280]">#C4A500</div>
                </div>
              </div>

              {/* Text Colors */}
              <div className="space-y-2">
                <div className="h-16 bg-[#6B7280] border border-[#2A2A2A] rounded-lg"></div>
                <div
                  className="text-[12px] leading-[18px]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <div className="text-[#FFFFFF] font-medium">Muted</div>
                  <div className="text-[#6B7280]">#6B7280</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Demonstrations */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              Button System (CORRECTED)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary Buttons - NO GOLD FILLS */}
            <div className="space-y-4">
              <h3
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                Primary Buttons (NO Gold Fills)
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Continue</Button>
                <Button variant="default" loading>
                  Processing...
                </Button>
                <Button
                  variant="default"
                  leftIcon={<Star className="h-4 w-4" />}
                >
                  With Icon
                </Button>
              </div>
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                ✅ Surface background (#111111) + Gold text/border (#FFD700). NO
                gold fills.
              </p>
            </div>

            {/* Ritual Badges - ONLY Gold Fill Allowed */}
            <div className="space-y-4">
              <h3
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                Ritual Badges (ONLY Gold Fill Allowed)
              </h3>
              <div className="flex flex-wrap gap-4">
                <RitualBadge leftIcon={<Trophy className="h-3 w-3" />}>
                  Achievement
                </RitualBadge>
                <RitualBadge leftIcon={<Star className="h-3 w-3" />}>
                  Milestone
                </RitualBadge>
                <RitualBadge leftIcon={<Zap className="h-3 w-3" />}>
                  Special
                </RitualBadge>
              </div>
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                ⚠️ ONLY place for gold background. Reserved for achievements and
                special moments.
              </p>
            </div>

            {/* Secondary Actions */}
            <div className="space-y-4">
              <h3
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                Secondary Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost">Cancel</Button>
                <Button variant="outline">Learn More</Button>
                <Button variant="link">Terms & Conditions</Button>
              </div>
            </div>

            {/* Motion-Based Feedback */}
            <div className="space-y-4">
              <h3
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                Motion-Based Status Feedback
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" shake>
                  Error State (Shake Animation)
                </Button>
                <Button variant="default">Success (No Color Change)</Button>
              </div>
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                ✅ Motion-based feedback instead of red/green status colors
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Input Demonstrations */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              Input System (CORRECTED)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Standard Input
                </h4>
                <Input placeholder="Type something..." />
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Border: #2A2A2A, Focus: #FFD700
                </p>
              </div>

              <div className="space-y-4">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Error State (Motion-Based)
                </h4>
                <Input placeholder="Invalid input..." error shake />
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Shake animation instead of red colors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Showcase */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              Typography System (CORRECTED)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h1
                  className="text-[48px] leading-[56px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  Display Heading
                </h1>
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Space Grotesk Variable, 48px/56px, 600 weight
                </p>
              </div>

              <div>
                <h2
                  className="text-[32px] leading-[40px] font-semibold text-[#FFFFFF]"
                  style={{ fontFamily: "Space Grotesk Variable" }}
                >
                  H1 Heading
                </h2>
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Space Grotesk Variable, 32px/40px, 600 weight
                </p>
              </div>

              <div>
                <p
                  className="text-[16px] leading-[24px] text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  This is body text using Geist Sans Variable. It's optimized
                  for readability and provides excellent legibility at all
                  sizes. Perfect for paragraphs, descriptions, and UI text.
                </p>
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Geist Sans Variable, 16px/24px, 400 weight
                </p>
              </div>

              <div>
                <code
                  className="text-[14px] leading-[20px] text-[#FFD700] bg-[#181818] px-2 py-1 rounded"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  const brandCompliance = true;
                </code>
                <p
                  className="text-[12px] leading-[18px] text-[#6B7280] mt-2"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  JetBrains Mono, 14px/20px, monospace
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Violations */}
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[24px] leading-[32px] font-semibold text-[#FFFFFF] flex items-center gap-2"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              <AlertTriangle className="h-6 w-6 text-[#FFD700]" />
              Brand Violations to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  ❌ Typography Violations
                </h4>
                <ul
                  className="space-y-1 text-[14px] leading-[20px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <li>
                    • Using General Sans + Inter instead of Space Grotesk +
                    Geist Sans
                  </li>
                  <li>• Wrong font weights or sizes</li>
                  <li>• Using non-Variable font versions</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  ❌ Color Violations
                </h4>
                <ul
                  className="space-y-1 text-[14px] leading-[20px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <li>• Gold fills on primary buttons</li>
                  <li>• Using #374151 or #262626 for borders</li>
                  <li>• Red/green/blue status colors</li>
                  <li>
                    • Wrong gold hover states (#E6C200 instead of #EAC200)
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  ❌ Motion Violations
                </h4>
                <ul
                  className="space-y-1 text-[14px] leading-[20px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <li>• Using 150ms, 200ms, or other non-approved timings</li>
                  <li>• Multiple easing curves instead of single standard</li>
                  <li>• Ignoring prefers-reduced-motion</li>
                  <li>• Color-based status feedback instead of motion</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4
                  className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  ❌ Button Violations
                </h4>
                <ul
                  className="space-y-1 text-[14px] leading-[20px] text-[#6B7280]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  <li>• Gold background on primary buttons</li>
                  <li>• Success/error colored buttons</li>
                  <li>• Multiple button variants with gold fills</li>
                  <li>• Wrong hover/active color values</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

// ============================================================================
// INDIVIDUAL COMPONENT SHOWCASES
// ============================================================================

export const MotionShowcase: Story = {
  name: "Motion System (90ms/220ms/300ms)",
  render: () => (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1
          className="text-[32px] leading-[40px] font-semibold text-[#FFFFFF] text-center"
          style={{ fontFamily: "Space Grotesk Variable" }}
        >
          CORRECTED Motion Timing
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                90ms - Fast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                Micro-interactions: hover, focus, press
              </p>
              <Button
                variant="default"
                className="transition-all duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              >
                Hover Me (90ms)
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                220ms - Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                Content transitions, page changes
              </p>
              <div className="h-16 bg-[#181818] border border-[#2A2A2A] rounded-lg transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-[#1F1F1F] cursor-pointer flex items-center justify-center">
                <span
                  className="text-[14px] text-[#FFFFFF]"
                  style={{ fontFamily: "Geist Sans Variable" }}
                >
                  Hover for 220ms transition
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle
                className="text-[18px] leading-[26px] font-semibold text-[#FFFFFF]"
                style={{ fontFamily: "Space Grotesk Variable" }}
              >
                300ms - Slow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                Ritual theatrics ONLY
              </p>
              <RitualBadge
                leftIcon={<Trophy className="h-3 w-3" />}
                className="transition-all duration-[300ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              >
                Achievement (300ms)
              </RitualBadge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle
              className="text-[20px] leading-[28px] font-semibold text-[#FFFFFF]"
              style={{ fontFamily: "Space Grotesk Variable" }}
            >
              Single Easing Curve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <code
                className="text-[16px] bg-[#181818] px-4 py-2 rounded text-[#FFD700]"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                cubic-bezier(0.22, 0.61, 0.36, 1)
              </code>
              <p
                className="text-[14px] leading-[20px] text-[#6B7280]"
                style={{ fontFamily: "Geist Sans Variable" }}
              >
                ✅ Single approved easing for ALL animations (no multiple
                curves)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
