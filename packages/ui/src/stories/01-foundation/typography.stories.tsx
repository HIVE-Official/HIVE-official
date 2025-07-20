import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '@hive/tokens';
import { Heading, Text } from '../../components/Typography';
import { Stack } from '../../components';

const meta: Meta = {
  title: '01-Foundation/Typography',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Typography System - Inter font family with luxury dark theme hierarchy',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Complete Typography Scale
export const TypographyScale: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Typography System</h1>
      
      {/* Display Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Display Scale - Hero & Marketing</h2>
        <div className="space-y-4">
          <div className="flex items-baseline gap-6">
            <div className="text-[72px] font-bold text-[#E5E5E7] leading-tight">Display 2XL</div>
            <div className="text-[#9B9B9F] font-mono text-sm">72px / display-2xl</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[60px] font-bold text-[#E5E5E7] leading-tight">Display XL</div>
            <div className="text-[#9B9B9F] font-mono text-sm">60px / display-xl</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[48px] font-bold text-[#E5E5E7] leading-tight">Display LG</div>
            <div className="text-[#9B9B9F] font-mono text-sm">48px / display-lg</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[36px] font-bold text-[#E5E5E7] leading-tight">Display MD</div>
            <div className="text-[#9B9B9F] font-mono text-sm">36px / display-md</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[30px] font-bold text-[#E5E5E7] leading-tight">Display SM</div>
            <div className="text-[#9B9B9F] font-mono text-sm">30px / display-sm</div>
          </div>
        </div>
      </section>

      {/* Heading Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Heading Scale - Interface Headers</h2>
        <div className="space-y-3">
          <div className="flex items-baseline gap-6">
            <div className="text-[24px] font-semibold text-[#E5E5E7]">Heading XL - Main headings</div>
            <div className="text-[#9B9B9F] font-mono text-sm">24px / heading-xl</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[20px] font-semibold text-[#E5E5E7]">Heading LG - Section headings</div>
            <div className="text-[#9B9B9F] font-mono text-sm">20px / heading-lg</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[18px] font-semibold text-[#E5E5E7]">Heading MD - Subsection headings</div>
            <div className="text-[#9B9B9F] font-mono text-sm">18px / heading-md</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[16px] font-semibold text-[#E5E5E7]">Heading SM - Small headings</div>
            <div className="text-[#9B9B9F] font-mono text-sm">16px / heading-sm</div>
          </div>
        </div>
      </section>

      {/* Body Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Body Scale - Content Text</h2>
        <div className="space-y-3">
          <div className="flex items-baseline gap-6">
            <div className="text-[18px] text-[#E5E5E7]">Body LG - Large body text for emphasis</div>
            <div className="text-[#9B9B9F] font-mono text-sm">18px / body-lg</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[16px] text-[#E5E5E7]">Body MD - Standard body text for most content</div>
            <div className="text-[#9B9B9F] font-mono text-sm">16px / body-md</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[14px] text-[#E5E5E7]">Body SM - Small body text for secondary content</div>
            <div className="text-[#9B9B9F] font-mono text-sm">14px / body-sm</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[12px] text-[#E5E5E7]">Body XS - Small text for labels and captions</div>
            <div className="text-[#9B9B9F] font-mono text-sm">12px / body-xs</div>
          </div>
          <div className="flex items-baseline gap-6">
            <div className="text-[10px] text-[#E5E5E7]">Body 2XS - Tiny captions and metadata</div>
            <div className="text-[#9B9B9F] font-mono text-sm">10px / body-2xs</div>
          </div>
        </div>
      </section>

      {/* Color Hierarchy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Text Color Hierarchy</h2>
        <div className="space-y-3">
          <div className="text-[#E5E5E7] text-lg">Primary Text - Main content (#E5E5E7 / Platinum)</div>
          <div className="text-[#C1C1C4] text-lg">Secondary Text - Supporting content (#C1C1C4 / Silver)</div>
          <div className="text-[#9B9B9F] text-lg">Muted Text - Less important content (#9B9B9F / Mercury)</div>
          <div className="text-[#6B6B70] text-lg">Disabled Text - Inactive content (#6B6B70 / Pewter)</div>
          <div className="text-[#FFD700] text-lg">Brand Gold - HIVE accent (#FFD700 / Gold)</div>
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Font Weight System</h2>
        <div className="space-y-3">
          <div className="text-[#E5E5E7] text-lg font-light">Light (300) - Subtle, elegant text</div>
          <div className="text-[#E5E5E7] text-lg font-normal">Normal (400) - Standard body text</div>
          <div className="text-[#E5E5E7] text-lg font-medium">Medium (500) - Emphasized text</div>
          <div className="text-[#E5E5E7] text-lg font-semibold">Semibold (600) - Headings and importance</div>
          <div className="text-[#E5E5E7] text-lg font-bold">Bold (700) - Strong emphasis and impact</div>
        </div>
      </section>

      {/* Real Usage Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Usage Examples</h2>
        
        {/* Card Example */}
        <div className="bg-[#111113] border border-[#2A2A2D] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-[#E5E5E7] mb-3">Space Card Example</h3>
          <p className="text-[#C1C1C4] text-sm mb-4">Computer Science • 247 members</p>
          <p className="text-[#E5E5E7] mb-4">Join our vibrant community of CS students. Share projects, get help with coursework, and connect with peers who share your passion for technology.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-xs font-medium">Active</span>
            <span className="text-[#9B9B9F] text-xs">Last updated 2 hours ago</span>
          </div>
        </div>

        {/* Tool Example */}
        <div className="bg-[#1A1A1C] border border-[#2A2A2D] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">GPA Calculator</h3>
          <p className="text-[#C1C1C4] text-sm mb-4">Track your academic performance with precision</p>
          <div className="flex items-center justify-between">
            <span className="text-[#E5E5E7] font-mono text-lg">Current GPA: <span className="text-[#10B981] font-bold">3.7</span></span>
            <span className="text-[#9B9B9F] text-xs">Updated daily</span>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Font Loading and Performance
export const FontSystem: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Font System</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Font Families</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Primary: Inter</h3>
            <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
              <p className="text-[#E5E5E7] font-sans text-lg mb-2">The quick brown fox jumps over the lazy dog</p>
              <p className="text-[#9B9B9F] text-sm font-mono">font-family: 'Inter', system-ui, sans-serif</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Monospace: JetBrains Mono</h3>
            <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
              <p className="text-[#E5E5E7] font-mono text-lg mb-2">const hive = &#123; theme: &#39;dark-luxury&#39; &#125;;</p>
              <p className="text-[#9B9B9F] text-sm font-mono">font-family: 'JetBrains Mono', monospace</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Performance Features</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
            <h3 className="text-[#E5E5E7] font-medium mb-2">Font Features</h3>
            <ul className="text-[#C1C1C4] text-sm space-y-1">
              <li>• Ligatures enabled (rlig, calt)</li>
              <li>• Optimized for screen reading</li>
              <li>• Variable font support</li>
              <li>• Reduced motion compatibility</li>
            </ul>
          </div>
          
          <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
            <h3 className="text-[#E5E5E7] font-medium mb-2">Loading Strategy</h3>
            <ul className="text-[#C1C1C4] text-sm space-y-1">
              <li>• System font fallbacks</li>
              <li>• Progressive enhancement</li>
              <li>• FOUT prevention</li>
              <li>• Self-hosted for performance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Typography Component Examples
export const ComponentExamples: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Typography Components</h1>
      
      <Stack>
        <Heading level={1}>Display Heading (H1)</Heading>
        <Heading level={2}>Section Heading (H2)</Heading>
        <Heading level={3}>Subsection Heading (H3)</Heading>
        <Heading level={4}>Minor Heading (H4)</Heading>
        <Text>
          This is a paragraph of body text using the Inter font family. It's designed for maximum readability
          on dark backgrounds while maintaining the luxury feel of the HIVE design system.
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text className="text-[#C1C1C4]">
          This is secondary text, used for supporting information and less critical content.
        </Text>
        <Text className="text-[#9B9B9F] text-sm">
          This is muted text for captions, metadata, and less important information.
        </Text>
      </Stack>
    </div>
  ),
};

// Accessibility and Readability
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Typography Accessibility</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Contrast Ratios</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
            <h3 className="text-[#E5E5E7] font-medium mb-3">AA Compliant</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#E5E5E7]">Primary on Background</span>
                <span className="text-[#FFD700] font-mono text-sm">12.8:1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#C1C1C4]">Secondary on Background</span>
                <span className="text-[#FFD700] font-mono text-sm">8.5:1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9B9B9F]">Muted on Background</span>
                <span className="text-[#FFD700] font-mono text-sm">5.2:1</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4">
            <h3 className="text-[#E5E5E7] font-medium mb-3">Reading Optimization</h3>
            <ul className="text-[#C1C1C4] text-sm space-y-1">
              <li>• Optimal line height (1.5-1.625)</li>
              <li>• Comfortable line length (45-75 chars)</li>
              <li>• Sufficient letter spacing</li>
              <li>• Focus indicators for navigation</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Responsive Behavior</h2>
        <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#E5E5E7] mb-4">Mobile-First Typography</h3>
          <p className="text-[#C1C1C4] mb-4">
            All typography scales appropriately across device sizes. Display text reduces on mobile 
            while maintaining readability. Body text remains at optimal sizes for on-campus mobile usage.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#0A0A0B] p-3 rounded border border-[#2A2A2D]">
              <div className="text-[#FFD700] font-mono text-sm mb-1">Mobile</div>
              <div className="text-[#E5E5E7] text-sm">Optimized for thumb navigation</div>
            </div>
            <div className="bg-[#0A0A0B] p-3 rounded border border-[#2A2A2D]">
              <div className="text-[#FFD700] font-mono text-sm mb-1">Tablet</div>
              <div className="text-[#E5E5E7] text-sm">Balanced for reading</div>
            </div>
            <div className="bg-[#0A0A0B] p-3 rounded border border-[#2A2A2D]">
              <div className="text-[#FFD700] font-mono text-sm mb-1">Desktop</div>
              <div className="text-[#E5E5E7] text-sm">Full luxury experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};