import type { Meta, StoryObj } from '@storybook/react';
import { colors, semantic, gradients, shadows, overlay, radius, spacing, typography, motion, effects } from '@hive/tokens';
import { liquidMetal, motionDurations, cascadeTiming, magneticSnap } from '../../motion/hive-motion-system';

const meta: Meta = {
  title: '01-Foundation/Design Tokens',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Design System Tokens - Dark luxury color palette, motion system, and design foundations',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Color Palette Showcase
export const ColorPalette: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Color System</h1>
      
      {/* Core Dark Luxury Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Core Dark Luxury Palette</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Object.entries(colors).map(([name, value]) => {
            if (typeof value === 'object') return null;
            return (
              <div key={name} className="flex flex-col items-center">
                <div 
                  className="w-20 h-20 rounded-lg border border-[#2A2A2D] mb-2"
                  style={{ backgroundColor: value }}
                />
                <span className="text-sm text-[#C1C1C4] font-mono">{name}</span>
                <span className="text-xs text-[#9B9B9F] font-mono">{value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Semantic Color System</h2>
        
        {Object.entries(semantic).map(([category, categoryColors]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4 capitalize">{category}</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(categoryColors).map(([name, value]) => (
                <div key={name} className="flex flex-col items-center">
                  <div 
                    className="w-16 h-16 rounded-lg border border-[#2A2A2D] mb-2"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-sm text-[#C1C1C4] font-mono">{name}</span>
                  <span className="text-xs text-[#9B9B9F] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Gradient System */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Luxury Gradients</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(gradients).map(([name, value]) => (
            <div key={name} className="flex flex-col">
              <div 
                className="w-full h-24 rounded-lg border border-[#2A2A2D] mb-2"
                style={{ background: value }}
              />
              <span className="text-sm text-[#C1C1C4] font-mono">{name}</span>
              <span className="text-xs text-[#9B9B9F] font-mono break-all">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadow System */}
      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Shadow System</h2>
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center">
              <div 
                className="w-20 h-20 bg-[#1A1A1C] rounded-lg mb-2"
                style={{ boxShadow: value }}
              />
              <span className="text-sm text-[#C1C1C4] font-mono">{name}</span>
              <span className="text-xs text-[#9B9B9F] font-mono text-center">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

// Motion System Showcase
export const MotionSystem: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Motion System</h1>
      
      {/* Liquid Metal Physics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Liquid Metal Physics</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Easing Function</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <code className="text-[#FFD700] font-mono">
                cubic-bezier({liquidMetal.easing.join(', ')})
              </code>
              <p className="text-[#9B9B9F] text-sm mt-2">
                Premium smooth operator easing for liquid metal feel
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Physics Constants</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              {Object.entries(liquidMetal.physics).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="text-[#C1C1C4] font-mono">{key}:</span>
                  <span className="text-[#FFD700] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motion Durations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Orchestrated Timing</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(motionDurations).map(([name, duration]) => (
            <div key={name} className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-[#C1C1C4] font-mono font-medium mb-2">{name}</h3>
              <div className="text-[#FFD700] font-mono text-xl mb-2">{duration}s</div>
              <div className="text-[#9B9B9F] text-sm">
                {name === 'instant' && 'Micro-interactions'}
                {name === 'quick' && 'Button press, toggle'}
                {name === 'smooth' && 'Signature HIVE duration'}
                {name === 'flowing' && 'Card transitions, form reveals'}
                {name === 'dramatic' && 'Space activation, major state'}
                {name === 'orchestrated' && 'Full sequences, achievements'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cascade Timing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Cascade Timing System</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(cascadeTiming).map(([name, timing]) => (
            <div key={name} className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-[#C1C1C4] font-mono font-medium mb-2">{name}</h3>
              <div className="text-[#FFD700] font-mono text-lg mb-2">{timing}s</div>
              <div className="text-[#9B9B9F] text-sm">
                {name === 'stagger' && '50ms between elements'}
                {name === 'ripple' && 'Faster ripple effects'}
                {name === 'sequence' && 'Deliberate sequences'}
                {name === 'wave' && 'Ultra-fast wave effects'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Magnetic Snap System */}
      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Magnetic Snap System</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Detection Zones</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              {Object.entries(magneticSnap.zones).map(([zone, distance]) => (
                <div key={zone} className="flex justify-between mb-2">
                  <span className="text-[#C1C1C4] font-mono">{zone}:</span>
                  <span className="text-[#FFD700] font-mono">{distance}px</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Snap Animation</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              {Object.entries(magneticSnap.snapAnimation).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="text-[#C1C1C4] font-mono">{key}:</span>
                  <span className="text-[#FFD700] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Pull Animation</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              {Object.entries(magneticSnap.pullAnimation).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="text-[#C1C1C4] font-mono">{key}:</span>
                  <span className="text-[#FFD700] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Glass Morphism Showcase
export const GlassMorphism: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Glass Morphism System</h1>
      
      {/* Overlay Effects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Transparent Overlays</h2>
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(overlay).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center">
              <div 
                className="w-24 h-24 rounded-lg border border-[#2A2A2D] mb-3 backdrop-blur-sm"
                style={{ backgroundColor: value }}
              />
              <span className="text-sm text-[#C1C1C4] font-mono text-center">{name}</span>
              <span className="text-xs text-[#9B9B9F] font-mono text-center">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Glass Effect Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Glass Effect Examples</h2>
        <div className="grid grid-cols-3 gap-6">
          <div 
            className="p-6 rounded-lg backdrop-blur-md border border-white/5"
            style={{ backgroundColor: overlay.glass }}
          >
            <h3 className="text-[#E5E5E7] font-medium mb-2">Subtle Glass</h3>
            <p className="text-[#C1C1C4] text-sm">Perfect for card backgrounds and overlay elements</p>
          </div>
          
          <div 
            className="p-6 rounded-lg backdrop-blur-md border border-white/8"
            style={{ backgroundColor: overlay['glass-medium'] }}
          >
            <h3 className="text-[#E5E5E7] font-medium mb-2">Medium Glass</h3>
            <p className="text-[#C1C1C4] text-sm">Interactive elements and elevated surfaces</p>
          </div>
          
          <div 
            className="p-6 rounded-lg backdrop-blur-md border border-white/12"
            style={{ backgroundColor: overlay['glass-strong'] }}
          >
            <h3 className="text-[#E5E5E7] font-medium mb-2">Strong Glass</h3>
            <p className="text-[#C1C1C4] text-sm">Modal backgrounds and focused elements</p>
          </div>
        </div>
      </section>

      {/* Additional Token Systems */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Complete Token System</h2>
        
        {/* Spacing */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Spacing Scale</h3>
          <div className="grid grid-cols-8 gap-2">
            {Object.entries(spacing).slice(0, 16).map(([name, value]) => (
              <div key={name} className="text-center">
                <div 
                  className="bg-[#FFD700] mx-auto mb-2"
                  style={{ width: value, height: '8px' }}
                />
                <span className="text-xs text-[#C1C1C4] font-mono">{name}</span>
                <div className="text-xs text-[#9B9B9F] font-mono">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Typography Scale</h3>
          <div className="space-y-2">
            {Object.entries(typography.fontSize).map(([name, [size, props]]) => (
              <div key={name} className="flex items-center gap-4">
                <div 
                  className="text-[#E5E5E7]"
                  style={{ fontSize: size, lineHeight: props.lineHeight }}
                >
                  {name} - The quick brown fox
                </div>
                <div className="text-xs text-[#9B9B9F] font-mono">
                  {size} / {props.lineHeight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Border Radius</h3>
          <div className="grid grid-cols-6 gap-4">
            {Object.entries(radius).map(([name, value]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-16 h-16 bg-[#1A1A1C] border border-[#2A2A2D] mx-auto mb-2"
                  style={{ borderRadius: value }}
                />
                <span className="text-xs text-[#C1C1C4] font-mono">{name}</span>
                <div className="text-xs text-[#9B9B9F] font-mono">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Effects Showcase */}
        <div>
          <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Shadow Effects</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(effects.boxShadow).slice(0, 8).map(([name, value]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-16 h-16 bg-[#1A1A1C] mx-auto mb-2 rounded-lg"
                  style={{ boxShadow: value }}
                />
                <span className="text-xs text-[#C1C1C4] font-mono">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ),
};