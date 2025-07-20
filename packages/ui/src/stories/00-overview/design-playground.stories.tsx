import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveButton, 
  HiveCard, 
  HiveInput, 
  HiveBadge
} from '../../components';
import { Play, Palette, Sliders, Eye, Code } from 'lucide-react';

const meta: Meta = {
  title: '00-Overview/Design Playground',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive playground to experiment with HIVE design tokens and see live results.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InteractivePlayground: Story = {
  render: () => {
    const [selectedTokens, setSelectedTokens] = useState({
      primaryColor: '#FFD700',
      backgroundColor: '#0A0A0B',
      textColor: '#E5E5E7',
      borderRadius: '1rem',
      spacing: '1.5rem',
      motionDuration: '0.4s',
    });

    const [currentComponent, setCurrentComponent] = useState('button');

    const tokenOptions = {
      primaryColor: ['#FFD700', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'],
      backgroundColor: ['#0A0A0B', '#111113', '#1A1A1C', '#222225'],
      textColor: ['#E5E5E7', '#C1C1C4', '#9B9B9F', '#FFD700'],
      borderRadius: ['0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'],
      spacing: ['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem'],
      motionDuration: ['0.2s', '0.4s', '0.6s', '0.8s', '1.2s'],
    };

    return (
      <div className="bg-[#0A0A0B] min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4 flex items-center justify-center">
              <Palette className="w-10 h-10 mr-4 text-[#FFD700]" />
              Design Token Playground
            </h1>
            <p className="text-lg text-[#C1C1C4] max-w-3xl mx-auto">
              Experiment with HIVE design tokens in real-time. Adjust colors, spacing, motion, 
              and see how they affect components instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <div className="xl:col-span-1">
              <HiveCard variant="default" size="lg">
                <h2 className="text-xl font-semibold text-[#E5E5E7] mb-6 flex items-center">
                  <Sliders className="w-5 h-5 mr-2 text-[#FFD700]" />
                  Design Controls
                </h2>

                {/* Component Selector */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-[#C1C1C4] mb-3 block">
                    Component Type
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['button', 'card', 'input', 'badge'].map((comp) => (
                      <HiveButton
                        key={comp}
                        variant={currentComponent === comp ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentComponent(comp)}
                      >
                        {comp.charAt(0).toUpperCase() + comp.slice(1)}
                      </HiveButton>
                    ))}
                  </div>
                </div>

                {/* Token Controls */}
                <div className="space-y-6">
                  {Object.entries(tokenOptions).map(([tokenName, options]) => (
                    <div key={tokenName}>
                      <label className="text-sm font-medium text-[#C1C1C4] mb-3 block capitalize">
                        {tokenName.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {options.map((option) => (
                          <button
                            key={option}
                            className={`
                              h-8 rounded-lg border transition-all
                              ${selectedTokens[tokenName as keyof typeof selectedTokens] === option
                                ? 'border-[#FFD700] ring-2 ring-[#FFD700]/30'
                                : 'border-[#2A2A2D] hover:border-[#FFD700]/50'
                              }
                            `}
                            style={{
                              backgroundColor: tokenName.includes('Color') ? option : '#1A1A1C',
                              color: tokenName === 'textColor' ? option : '#9B9B9F'
                            }}
                            onClick={() => setSelectedTokens(prev => ({
                              ...prev,
                              [tokenName]: option
                            }))}
                          >
                            {tokenName.includes('Color') ? '' : option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reset Button */}
                <div className="mt-8 pt-6 border-t border-[#2A2A2D]">
                  <HiveButton
                    variant="outline"
                    onClick={() => setSelectedTokens({
                      primaryColor: '#FFD700',
                      backgroundColor: '#0A0A0B',
                      textColor: '#E5E5E7',
                      borderRadius: '1rem',
                      spacing: '1.5rem',
                      motionDuration: '0.4s',
                    })}
                    className="w-full"
                  >
                    Reset to Defaults
                  </HiveButton>
                </div>
              </HiveCard>
            </div>

            {/* Preview Panel */}
            <div className="xl:col-span-2">
              <HiveCard variant="elevated" size="lg">
                <h2 className="text-xl font-semibold text-[#E5E5E7] mb-6 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-[#FFD700]" />
                  Live Preview
                </h2>

                {/* Preview Container */}
                <div 
                  className="min-h-[400px] rounded-xl border border-[#2A2A2D] p-8 flex items-center justify-center"
                  style={{ 
                    backgroundColor: selectedTokens.backgroundColor,
                    padding: selectedTokens.spacing 
                  }}
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* Component Preview */}
                    {currentComponent === 'button' && (
                      <div className="flex flex-col gap-4 items-center">
                        <button
                          className="px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: selectedTokens.primaryColor,
                            color: selectedTokens.backgroundColor,
                            borderRadius: selectedTokens.borderRadius,
                            transitionDuration: selectedTokens.motionDuration,
                          }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-6 py-3 font-medium transition-all duration-300 hover:scale-105 border-2"
                          style={{
                            backgroundColor: 'transparent',
                            color: selectedTokens.primaryColor,
                            borderColor: selectedTokens.primaryColor,
                            borderRadius: selectedTokens.borderRadius,
                            transitionDuration: selectedTokens.motionDuration,
                          }}
                        >
                          Outline Button
                        </button>
                      </div>
                    )}

                    {currentComponent === 'card' && (
                      <div
                        className="w-80 p-6 border border-[#2A2A2D] backdrop-blur-sm"
                        style={{
                          backgroundColor: `${selectedTokens.primaryColor}10`,
                          borderColor: `${selectedTokens.primaryColor}30`,
                          borderRadius: selectedTokens.borderRadius,
                          padding: selectedTokens.spacing,
                        }}
                      >
                        <h3 
                          className="text-lg font-semibold mb-2"
                          style={{ color: selectedTokens.textColor }}
                        >
                          Sample Card
                        </h3>
                        <p 
                          className="text-sm opacity-80"
                          style={{ color: selectedTokens.textColor }}
                        >
                          This card demonstrates how the selected tokens affect component appearance.
                        </p>
                        <div className="mt-4">
                          <span
                            className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: selectedTokens.primaryColor,
                              color: selectedTokens.backgroundColor,
                              borderRadius: selectedTokens.borderRadius,
                            }}
                          >
                            Tag
                          </span>
                        </div>
                      </div>
                    )}

                    {currentComponent === 'input' && (
                      <div className="w-80">
                        <input
                          type="text"
                          placeholder="Enter some text..."
                          className="w-full px-4 py-3 border border-[#2A2A2D] focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: `${selectedTokens.backgroundColor}80`,
                            color: selectedTokens.textColor,
                            borderRadius: selectedTokens.borderRadius,
                            borderColor: `${selectedTokens.primaryColor}30`,
                            transitionDuration: selectedTokens.motionDuration,
                          }}
                        />
                      </div>
                    )}

                    {currentComponent === 'badge' && (
                      <div className="flex gap-3 flex-wrap justify-center">
                        {['Default', 'Success', 'Warning', 'Error'].map((type, index) => (
                          <span
                            key={type}
                            className="inline-flex items-center px-3 py-1 text-sm font-medium"
                            style={{
                              backgroundColor: index === 0 ? selectedTokens.primaryColor : 
                                             index === 1 ? '#10B981' :
                                             index === 2 ? '#F59E0B' : '#EF4444',
                              color: selectedTokens.backgroundColor,
                              borderRadius: selectedTokens.borderRadius,
                            }}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Token Values Display */}
                    <div className="mt-8 p-4 bg-[#111113] rounded-lg border border-[#2A2A2D] w-full max-w-md">
                      <h4 className="text-sm font-medium text-[#C1C1C4] mb-3">Current Values</h4>
                      <div className="space-y-2 text-xs font-mono">
                        {Object.entries(selectedTokens).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-[#9B9B9F]">{key}:</span>
                            <span className="text-[#FFD700]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generated CSS */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-[#FFD700]" />
                    Generated CSS Custom Properties
                  </h3>
                  <div className="bg-[#111113] border border-[#2A2A2D] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-[#C1C1C4]">
{`:root {
  --hive-brand-primary: ${selectedTokens.primaryColor};
  --hive-background-primary: ${selectedTokens.backgroundColor};
  --hive-text-primary: ${selectedTokens.textColor};
  --hive-radius-default: ${selectedTokens.borderRadius};
  --hive-spacing-default: ${selectedTokens.spacing};
  --hive-duration-smooth: ${selectedTokens.motionDuration};
}`}
                    </pre>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 text-center">
              Real-World Usage Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HiveCard variant="gold-accent" size="default">
                <h3 className="text-lg font-semibold text-[#E5E5E7] mb-3">Campus Infrastructure</h3>
                <p className="text-[#C1C1C4] text-sm mb-4">
                  These tokens create the foundation for premium campus infrastructure that 
                  students trust and rely on daily.
                </p>
                <HiveBadge variant="gold" size="sm">Infrastructure</HiveBadge>
              </HiveCard>

              <HiveCard variant="default" size="default">
                <h3 className="text-lg font-semibold text-[#E5E5E7] mb-3">Tool Building</h3>
                <p className="text-[#C1C1C4] text-sm mb-4">
                  Consistent tokens ensure all student-created Tools feel native to the 
                  HIVE platform and maintain quality standards.
                </p>
                <HiveBadge variant="success" size="sm">Tools</HiveBadge>
              </HiveCard>

              <HiveCard variant="default" size="default">
                <h3 className="text-lg font-semibold text-[#E5E5E7] mb-3">Space Activation</h3>
                <p className="text-[#C1C1C4] text-sm mb-4">
                  Motion and color tokens create smooth transitions during Space 
                  activation and community growth phases.
                </p>
                <HiveBadge variant="info" size="sm">Spaces</HiveBadge>
              </HiveCard>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};