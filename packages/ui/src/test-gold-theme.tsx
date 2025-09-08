/**
 * Test component to verify HIVE design system with correct brand colors
 * Gold (var(--hive-gold)), Black (var(--hive-black)), White (#FFFFFF)
 */

import React from 'react';

export function TestGoldTheme() {
  return (
    <div className="min-h-screen bg-[var(--hive-black)]">
      {/* Header Section */}
      <div className="border-b border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-[var(--hive-gold)]">
            HIVE Design System
          </h1>
          <p className="text-[var(--hive-text-secondary)]">
            Gold, Black & White Brand Colors
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6 space-y-6">
        {/* Color Palette */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            Brand Colors
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-[var(--hive-gold)] rounded-lg shadow-lg" />
              <p className="text-sm text-[var(--hive-text-secondary)]">Gold Primary</p>
              <code className="text-xs text-[var(--hive-text-muted)]">var(--hive-gold)</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[var(--hive-black)] border border-[var(--hive-border-default)] rounded-lg" />
              <p className="text-sm text-[var(--hive-text-secondary)]">Black</p>
              <code className="text-xs text-[var(--hive-text-muted)]">var(--hive-black)</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[var(--hive-white)] rounded-lg shadow-lg" />
              <p className="text-sm text-[var(--hive-text-secondary)]">White</p>
              <code className="text-xs text-[var(--hive-text-muted)]">#FFFFFF</code>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            Interactive Elements
          </h2>
          
          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-[var(--hive-gold)] text-[var(--hive-black)] font-semibold rounded-md hover:bg-[var(--hive-gold-light)] transition-colors">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-transparent text-[var(--hive-gold)] border-2 border-[var(--hive-gold)] font-semibold rounded-md hover:bg-[var(--hive-overlay-gold-subtle)] transition-colors">
              Secondary Button
            </button>
            <button className="px-6 py-3 bg-[var(--hive-gray-800)] text-[var(--hive-text-secondary)] font-semibold rounded-md hover:bg-[var(--hive-gray-700)] transition-colors">
              Tertiary Button
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg hover:border-[var(--hive-border-gold)] transition-colors">
              <h3 className="text-lg font-semibold text-[var(--hive-gold)] mb-2">
                Gold Accent Card
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                This card uses gold as an accent color for hierarchy and emphasis.
              </p>
            </div>
            <div className="p-6 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg hover:shadow-[var(--hive-shadow-gold)] transition-shadow">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                Standard Card
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                This card uses standard text colors with gold hover glow effect.
              </p>
            </div>
          </div>

          {/* Form Elements */}
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Input with gold focus"
              className="w-full px-4 py-3 bg-[var(--hive-background-elevated)] text-[var(--hive-text-primary)] border border-[var(--hive-border-default)] rounded-md focus:border-[var(--hive-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)] focus:ring-opacity-30"
            />
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[var(--hive-gray-700)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[var(--hive-white)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--hive-white)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-gold)]"></div>
                <span className="ml-3 text-[var(--hive-text-secondary)]">Toggle with gold active state</span>
              </label>
            </div>
          </div>
        </div>

        {/* Status Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            Status Colors
          </h2>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-[var(--hive-status-success)] bg-opacity-20 text-[var(--hive-status-success)] rounded-md">
              Success State
            </div>
            <div className="px-4 py-2 bg-[var(--hive-gold)] bg-opacity-20 text-[var(--hive-gold)] rounded-md">
              Warning (Gold)
            </div>
            <div className="px-4 py-2 bg-[var(--hive-status-error)] bg-opacity-20 text-[var(--hive-status-error)] rounded-md">
              Error State
            </div>
            <div className="px-4 py-2 bg-[var(--hive-status-info)] bg-opacity-20 text-[var(--hive-status-info)] rounded-md">
              Info State
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}