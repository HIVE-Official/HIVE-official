import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveSlider,
  Slider,
  HiveVolumeSlider,
  HiveBrightnessSlider,
  HiveProgressSlider,
  HivePriceRangeSlider,
  HiveTemperatureSlider
} from '../../../components/hive-slider';
import { HiveCard } from '../../../components/hive-card';
import { Volume2, Sun, DollarSign, Thermometer, Settings } from 'lucide-react';

const meta: Meta<typeof HiveSlider> = {
  title: '02-atoms/Form Controls/Slider',
  component: HiveSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Slider Component** - A luxury range input with glass morphism and liquid metal motion

Part of the HIVE Atomic Design System with PRD-aligned styling, enhanced accessibility, and premium interactions.

## Features
- **4 Variants**: Default, gold, success, minimal with glass morphism styling
- **4 Sizes**: sm, default, lg, xl with proper touch targets
- **Liquid Motion**: Premium spring animations with customizable motion system
- **Value Display**: Optional value formatting and display
- **Glass Morphism**: Backdrop blur effects with semantic design tokens
- **Touch-Friendly**: 44px+ touch targets for mobile accessibility
- **Keyboard Support**: Arrow keys, Home, End, Page Up/Down navigation
- **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA support

## Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-brand-*\`, \`hive-status-*\` tokens exclusively.

## Pre-built Variants
- **HiveVolumeSlider**: For audio controls (0-100%)
- **HiveBrightnessSlider**: For display settings with gold styling
- **HiveProgressSlider**: For progress indication (disabled state)
- **HivePriceRangeSlider**: For price filtering with currency formatting
- **HiveTemperatureSlider**: For temperature controls with unit display
- **Slider**: Simple version for basic use cases
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gold', 'success', 'minimal'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Slider size variant'
    },
    label: {
      control: 'text',
      description: 'Label text above the slider'
    },
    description: {
      control: 'text',
      description: 'Helper text below the slider'
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value next to label'
    },
    liquidMotion: {
      control: 'boolean',
      description: 'Enable liquid metal motion animations'
    },
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Slider
export const Default: Story = {
  args: {
    label: 'Default Slider',
    value: [50],
    showValue: true
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="Default"
        description="Standard glass morphism styling"
        variant="default"
        value={[60]}
        showValue
      />
      
      <HiveSlider
        label="Gold Premium"
        description="Enhanced gold styling with stronger glow"
        variant="gold"
        value={[75]}
        showValue
      />
      
      <HiveSlider
        label="Success"
        description="Success state with green accent"
        variant="success"
        value={[90]}
        showValue
      />
      
      <HiveSlider
        label="Minimal"
        description="Clean minimal design"
        variant="minimal"
        value={[45]}
        showValue
      />
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="Small"
        size="sm"
        value={[25]}
        description="Compact slider for tight spaces"
        showValue
      />
      
      <HiveSlider
        label="Default"
        size="default"
        value={[50]}
        description="Standard size for most use cases"
        showValue
      />
      
      <HiveSlider
        label="Large"
        size="lg"
        value={[75]}
        description="Larger size for enhanced touch targets"
        showValue
      />
      
      <HiveSlider
        label="Extra Large"
        size="xl"
        value={[90]}
        description="Maximum size for accessibility"
        showValue
      />
    </div>
  )
};

// Custom Value Formatters
export const CustomFormatters: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="Percentage"
        value={[65]}
        showValue
        valueFormatter={(value) => `${value}%`}
        description="Percentage formatting"
      />
      
      <HiveSlider
        label="Currency"
        value={[250]}
        min={0}
        max={500}
        showValue
        valueFormatter={(value) => `$${value}`}
        description="Currency formatting"
        variant="gold"
      />
      
      <HiveSlider
        label="Temperature"
        value={[72]}
        min={60}
        max={80}
        showValue
        valueFormatter={(value) => `${value}°F`}
        description="Temperature with units"
        variant="success"
      />
      
      <HiveSlider
        label="File Size"
        value={[1500]}
        min={0}
        max={2000}
        showValue
        valueFormatter={(value) => `${(value / 1000).toFixed(1)}GB`}
        description="File size formatting"
        variant="minimal"
      />
    </div>
  )
};

// Motion Variants
export const MotionVariants: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="With Liquid Motion"
        value={[60]}
        showValue
        liquidMotion={true}
        description="Smooth spring animations enabled"
        variant="gold"
      />
      
      <HiveSlider
        label="Without Motion"
        value={[60]}
        showValue
        liquidMotion={false}
        description="Static interactions for performance"
        variant="minimal"
      />
    </div>
  )
};

// Range and Step Variations
export const RangeAndStep: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="Fine Control"
        value={[5.5]}
        min={0}
        max={10}
        step={0.1}
        showValue
        valueFormatter={(value) => value.toFixed(1)}
        description="Step: 0.1 for precise control"
      />
      
      <HiveSlider
        label="Coarse Steps"
        value={[50]}
        min={0}
        max={100}
        step={10}
        showValue
        description="Step: 10 for quick selection"
        variant="gold"
      />
      
      <HiveSlider
        label="Large Range"
        value={[5000]}
        min={0}
        max={10000}
        step={100}
        showValue
        valueFormatter={(value) => value.toLocaleString()}
        description="Large range with formatted display"
        variant="success"
      />
    </div>
  )
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <HiveSlider
        label="Disabled Slider"
        value={[60]}
        disabled
        showValue
        description="Cannot be interacted with"
      />
      
      <HiveSlider
        label="Progress Indicator"
        value={[75]}
        disabled
        showValue
        variant="success"
        description="Used for showing progress"
      />
    </div>
  )
};

// Pre-built Variants
export const PrebuiltVariants: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div className="flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <HiveVolumeSlider value={[80]} />
      </div>
      
      <div className="flex items-center gap-3">
        <Sun className="w-5 h-5 text-yellow-400" />
        <HiveBrightnessSlider value={[65]} />
      </div>
      
      <HiveProgressSlider value={[45]} />
      
      <div className="flex items-center gap-3">
        <DollarSign className="w-5 h-5 text-green-400" />
        <HivePriceRangeSlider value={[350]} />
      </div>
      
      <div className="flex items-center gap-3">
        <Thermometer className="w-5 h-5 text-blue-400" />
        <HiveTemperatureSlider value={[72]} />
      </div>
    </div>
  )
};

// Settings Panel Example
export const SettingsPanel: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-[var(--hive-text-primary)]" />
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Audio Settings</h3>
      </div>
      
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-gray-400" />
        <HiveVolumeSlider 
          value={[75]}
          description="Master volume control"
        />
      </div>
      
      <HiveSlider
        label="Bass"
        value={[60]}
        min={0}
        max={100}
        showValue
        valueFormatter={(value) => `${value}%`}
        description="Bass frequency enhancement"
        variant="gold"
      />
      
      <HiveSlider
        label="Treble"
        value={[55]}
        min={0}
        max={100}
        showValue
        valueFormatter={(value) => `${value}%`}
        description="High frequency clarity"
        variant="gold"
      />
      
      <HiveSlider
        label="Balance"
        value={[0]}
        min={-100}
        max={100}
        showValue
        valueFormatter={(value) => {
          if (value === 0) return 'Center';
          return value > 0 ? `R${value}` : `L${Math.abs(value)}`;
        }}
        description="Left/right audio balance"
      />
    </HiveCard>
  )
};

// Simple Slider
export const SimpleSlider: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Simple Slider</h4>
        <Slider value={[40]} />
        <p className="text-xs text-gray-400 mt-1">Basic slider without labels or motion</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Advanced Slider</h4>
        <HiveSlider
          label="Advanced Controls"
          value={[40]}
          showValue
          description="Full-featured slider with all enhancements"
        />
      </div>
    </div>
  )
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Accessibility Features</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Arrow keys, Home, End, Page Up/Down)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with ARIA labels</p>
        <p className="text-sm text-gray-300">✅ Focus indicators and management</p>
        <p className="text-sm text-gray-300">✅ Touch-friendly targets (44px+ thumb size)</p>
        <p className="text-sm text-gray-300">✅ Value announcements on change</p>
        <p className="text-sm text-gray-300">✅ Proper role and state attributes</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Try keyboard navigation:</h4>
        
        <HiveSlider
          label="Accessible Slider"
          value={[50]}
          showValue
          description="Use Tab to focus, Arrow keys to adjust, Home/End for min/max"
          aria-describedby="slider-help"
        />
        
        <p id="slider-help" className="text-xs text-gray-400">
          Tab to focus, Left/Right arrows for fine adjustment, Home for minimum, End for maximum
        </p>
        
        <HiveSlider
          label="Step Navigation"
          value={[30]}
          min={0}
          max={100}
          step={10}
          showValue
          description="Page Up/Down for larger steps when step size is defined"
          variant="gold"
        />
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="w-80">
      <HiveSlider {...args} />
    </div>
  ),
  args: {
    label: 'Interactive Demo',
    description: 'Use the controls below to customize this slider',
    variant: 'default',
    size: 'default',
    showValue: true,
    liquidMotion: true,
    value: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different slider configurations and see how they affect the behavior and appearance.'
      }
    }
  }
};