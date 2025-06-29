/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck

import type { Meta, StoryObj } from "@storybook/react-vite";
import { HiveLogo } from "../components/HiveLogo";
import React from "react";

const meta: Meta<typeof HiveLogo> = {
  title: "Brand/HiveLogo",
  component: HiveLogo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#F0F0F0" },
      ],
    },
    docs: {
      description: {
        component: `
The HIVE logo is the core visual element of our brand identity. It should be used consistently across all interfaces while maintaining proper clear space and appropriate sizing.

**Key Brand Guidelines:**
- Always use proper variant for background (white on dark, black on light)
- Maintain minimum clear space of 1× logo height on all sides
- Use gentle animations sparingly for special moments
- Never distort, skew, or apply unauthorized effects
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["white", "black", "gold"],
      description: "Logo color variant - choose based on background",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Logo size following design system scale",
    },
    animationType: {
      control: { type: "select" },
      options: ["none", "pulse", "spin", "gentle-float"],
      description: "Animation style - use sparingly for special moments",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "white",
    size: "xl",
    animationType: "none",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "The default HIVE logo in white variant for dark backgrounds."
      },
    },
  },
};

export const GentleFloat: Story = {
  args: {
    variant: "white",
    size: "2xl",
    animationType: "gentle-float",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Logo with gentle floating animation, perfect for landing pages and hero sections."
      },
    },
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="p-8 bg-neutral-800 rounded-lg">
      <div className="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-900 rounded-lg mb-4">
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="white" size="xl" />
          <p className="text-sm text-white">White</p>
        </div>
        <div className="text-center space-y-2">
          <div className="bg-white p-4 rounded">
            <HiveLogo {...args} variant="black" size="xl" />
          </div>
          <p className="text-sm text-white">Black</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="gold" size="xl" />
          <p className="text-sm text-white">Gold (Special)</p>
        </div>
      </div>
      <p className="text-xs text-neutral-400 text-center">
        Choose variant based on background contrast
      </p>
    </div>
  ),
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "All logo variants showing proper usage on different backgrounds."
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 p-8 bg-neutral-900 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="sm" />
        <p className="text-white text-xs">sm (20px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="md" />
        <p className="text-white text-xs">md (24px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="lg" />
        <p className="text-white text-xs">lg (32px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="xl" />
        <p className="text-white text-xs">xl (48px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="2xl" />
        <p className="text-white text-xs">2xl (96px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="3xl" />
        <p className="text-white text-xs">3xl (192px)</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Logo size scale from small UI elements to hero sections."
      },
    },
  },
};

export const NavigationUsage: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      {/* Header Example */}
      <div className="bg-black border-b border-neutral-800 p-4 mb-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HiveLogo variant="white" size="lg" />
            <span className="text-xl font-bold text-white tracking-tight">HIVE</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-neutral-400 hover:text-yellow-400 transition-colors">Feed</a>
            <a href="#" className="text-neutral-400 hover:text-yellow-400 transition-colors">Campus</a>
            <a href="#" className="text-neutral-400 hover:text-yellow-400 transition-colors">Spaces</a>
          </div>
        </div>
      </div>

      {/* Landing Hero Example */}
      <div className="bg-black p-12 rounded-lg text-center">
        <div className="space-y-6">
          <HiveLogo variant="white" size="3xl" animationType="gentle-float" />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">HIVE</h1>
            <p className="text-xl text-neutral-400">Your Campus OS</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Examples of logo usage in navigation and hero sections."
      },
    },
  },
};

export const BrandCompliance: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
        <h3 className="text-green-400 font-semibold mb-2">✅ Correct Usage</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black p-4 rounded flex items-center justify-center">
            <HiveLogo variant="white" size="xl" />
          </div>
          <div className="bg-white p-4 rounded flex items-center justify-center">
            <HiveLogo variant="black" size="xl" />
          </div>
        </div>
        <p className="text-green-300 text-sm mt-2">Proper contrast on backgrounds</p>
      </div>

      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <h3 className="text-red-400 font-semibold mb-2">❌ Incorrect Usage</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-400 p-4 rounded flex items-center justify-center">
            <HiveLogo variant="white" size="xl" className="opacity-40" />
          </div>
          <div className="bg-yellow-200 p-4 rounded flex items-center justify-center">
            <HiveLogo variant="black" size="xl" className="opacity-30" />
          </div>
        </div>
        <p className="text-red-300 text-sm mt-2">Poor contrast, unreadable</p>
      </div>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h3 className="text-blue-400 font-semibold mb-2">💡 Brand Guidelines</h3>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Maintain 1× logo height clear space on all sides</li>
          <li>• Use white variant on dark backgrounds (#0A0A0A)</li>
          <li>• Use black variant on light backgrounds</li>
          <li>• Gold variant only for special accent moments</li>
          <li>• Animations should be subtle and purposeful</li>
          <li>• Never distort, skew, or apply unauthorized effects</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Brand compliance examples showing correct and incorrect usage."
      },
    },
  },
};
