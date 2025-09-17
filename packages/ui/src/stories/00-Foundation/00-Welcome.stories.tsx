import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Welcome = () => (
  <div className="max-w-4xl mx-auto p-8 space-y-8 bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] min-h-screen">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-[var(--hive-gold)]">HIVE Design System</h1>
      <p className="text-xl text-gray-300">
        Foundations & Concrete Components
      </p>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Welcome to the HIVE Design System documentation. This Storybook showcases only the foundational 
        design tokens and concrete, working components that power the HIVE platform.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-gray-700)]">
        <h3 className="text-lg font-semibold text-[var(--hive-gold)] mb-3">🏗️ Foundations</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Design Tokens (Colors, Typography, Spacing)</li>
          <li>• Motion & Animation System</li>
          <li>• Dark-First Color Palette</li>
          <li>• Gold Accent Strategy</li>
        </ul>
      </div>

      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-gray-700)]">
        <h3 className="text-lg font-semibold text-[var(--hive-gold)] mb-3">🧱 Components</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Button System (Transparent + Gold Outline)</li>
          <li>• Form Elements</li>
          <li>• Layout Components</li>
          <li>• Navigation Elements</li>
        </ul>
      </div>
    </div>

    <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-gray-700)]">
      <h3 className="text-lg font-semibold text-[var(--hive-gold)] mb-3">✅ Quality Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-green-400 font-medium">✅ Working</div>
          <div className="text-gray-400">Button components with transparent backgrounds and gold outlines</div>
        </div>
        <div>
          <div className="text-green-400 font-medium">✅ Comprehensive</div>
          <div className="text-gray-400">All variants and states included</div>
        </div>
        <div>
          <div className="text-green-400 font-medium">✅ Accessible</div>
          <div className="text-gray-400">WCAG 2.1 AA compliant</div>
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof Welcome> = {
  title: '00-Foundation/Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to the HIVE Design System - showcasing foundations and concrete components'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};