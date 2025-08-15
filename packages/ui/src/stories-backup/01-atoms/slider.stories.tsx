import type { Meta, StoryObj } from '@storybook/react';
import { Slider, RangeSlider, VerticalSlider, PrimarySlider, SuccessSlider, WarningSlider, ErrorSlider } from '../../atomic/atoms/slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: '01-Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE slider component for selecting values from a range, with support for single values, ranges, marks, and campus-specific use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step size',
    },
    value: {
      control: 'number',
      description: 'Current value (controlled)',
    },
    defaultValue: {
      control: 'number',
      description: 'Default value (uncontrolled)',
    },
    range: {
      control: 'boolean',
      description: 'Enable range selection',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Slider size',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'gold', 'emerald', 'sapphire'],
      description: 'Color theme',
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
    },
    showMarks: {
      control: 'boolean',
      description: 'Show marks/labels',
    },
    vertical: {
      control: 'boolean',
      description: 'Vertical orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    defaultValue: 50,
    label: 'Volume Level',
    showValue: true,
  },
};

export const Range: Story = {
  args: {
    range: true,
    defaultValue: [25, 75],
    label: 'Price Range',
    showValue: true,
  },
};

export const WithMarks: Story = {
  args: {
    defaultValue: 3,
    min: 1,
    max: 5,
    step: 1,
    marks: {
      1: 'Poor',
      2: 'Fair', 
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    },
    label: 'Rating',
    showValue: true,
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <Slider 
        size="sm" 
        defaultValue={30} 
        label="Small Slider"
        showValue
      />
      <Slider 
        size="md" 
        defaultValue={50} 
        label="Medium Slider"
        showValue
      />
      <Slider 
        size="lg" 
        defaultValue={70} 
        label="Large Slider"
        showValue
      />
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider color="primary" defaultValue={40} label="Primary" showValue />
      <Slider color="success" defaultValue={45} label="Success" showValue />
      <Slider color="warning" defaultValue={50} label="Warning" showValue />
      <Slider color="error" defaultValue={55} label="Error" showValue />
      <Slider color="gold" defaultValue={60} label="Gold" showValue />
      <Slider color="emerald" defaultValue={65} label="Emerald" showValue />
      <Slider color="sapphire" defaultValue={70} label="Sapphire" showValue />
    </div>
  ),
};

// Range sliders
export const RangeSliders: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider 
        range 
        defaultValue={[20, 80]} 
        label="Price Range ($)"
        showValue
        formatValue={(val) => `$${val}`}
      />
      <Slider 
        range 
        defaultValue={[2.5, 3.8]} 
        min={0} 
        max={4} 
        step={0.1}
        label="GPA Range"
        showValue
        color="success"
      />
      <Slider 
        range 
        defaultValue={[18, 25]} 
        min={16} 
        max={30}
        label="Age Range"
        showValue
        color="gold"
      />
    </div>
  ),
};

// Campus-specific scenarios
export const CampusScenarios: Story = {
  render: () => {
    const [studyTime, setStudyTime] = useState(4);
    const [gpaTarget, setGpaTarget] = useState(3.5);
    const [budgetRange, setBudgetRange] = useState<[number, number]>([200, 800]);
    const [difficultyRating, setDifficultyRating] = useState(3);

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Academic Planning Tools</h3>
          
          <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Slider
              value={studyTime}
              onChange={(val) => setStudyTime(val as number)}
              min={0}
              max={12}
              step={0.5}
              label="Daily Study Hours"
              showValue
              formatValue={(val) => `${val}h`}
              color="primary"
              marks={{
                0: '0h',
                3: '3h',
                6: '6h',
                9: '9h',
                12: '12h'
              }}
            />
            
            <Slider
              value={gpaTarget}
              onChange={(val) => setGpaTarget(val as number)}
              min={2.0}
              max={4.0}
              step={0.1}
              label="Target GPA"
              showValue
              color="success"
              marks={{
                2.0: '2.0',
                2.5: '2.5',
                3.0: '3.0',
                3.5: '3.5',
                4.0: '4.0'
              }}
            />
            
            <Slider
              range
              value={budgetRange}
              onChange={(val) => setBudgetRange(val as [number, number])}
              min={0}
              max={1500}
              step={50}
              label="Monthly Budget Range"
              showValue
              formatValue={(val) => `$${val}`}
              color="gold"
              marks={{
                0: '$0',
                500: '$500',
                1000: '$1K',
                1500: '$1.5K'
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course & Tool Ratings</h3>
          
          <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Slider
              value={difficultyRating}
              onChange={(val) => setDifficultyRating(val as number)}
              min={1}
              max={5}
              step={1}
              label="Course Difficulty Rating"
              showValue
              color="warning"
              marks={{
                1: 'Very Easy',
                2: 'Easy',
                3: 'Moderate',
                4: 'Hard',
                5: 'Very Hard'
              }}
            />
            
            <Slider
              defaultValue={4}
              min={1}
              max={5}
              step={1}
              label="Tool Usefulness"
              showValue
              color="emerald"
              marks={{
                1: '⭐',
                2: '⭐⭐',
                3: '⭐⭐⭐',
                4: '⭐⭐⭐⭐',
                5: '⭐⭐⭐⭐⭐'
              }}
            />
            
            <Slider
              defaultValue={85}
              min={0}
              max={100}
              step={5}
              label="Assignment Progress"
              showValue
              formatValue={(val) => `${val}%`}
              color="sapphire"
              marks={{
                0: '0%',
                25: '25%',
                50: '50%',
                75: '75%',
                100: '100%'
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Session Settings</h3>
          
          <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Slider
              defaultValue={25}
              min={15}
              max={60}
              step={5}
              label="Focus Session Length"
              showValue
              formatValue={(val) => `${val} min`}
              color="primary"
              marks={{
                15: '15m',
                25: '25m',
                45: '45m',
                60: '60m'
              }}
            />
            
            <Slider
              defaultValue={5}
              min={5}
              max={20}
              step={5}
              label="Break Duration"
              showValue
              formatValue={(val) => `${val} min`}
              color="success"
            />
            
            <Slider
              range
              defaultValue={[9, 17]}
              min={6}
              max={24}
              step={1}
              label="Available Study Hours"
              showValue
              formatValue={(val) => `${val}:00`}
              color="gold"
              marks={{
                6: '6 AM',
                12: '12 PM',
                18: '6 PM',
                24: '12 AM'
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Settings</h3>
          
          <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Slider
              defaultValue={3}
              min={1}
              max={5}
              step={1}
              label="Tool Complexity Level"
              showValue
              color="ruby"
              marks={{
                1: 'Basic',
                2: 'Simple',
                3: 'Moderate',
                4: 'Advanced',
                5: 'Expert'
              }}
            />
            
            <Slider
              range
              defaultValue={[1, 50]}
              min={1}
              max={1000}
              step={1}
              label="Expected User Range"
              showValue
              formatValue={(val) => val > 1 ? `${val} users` : `${val} user`}
              color="emerald"
            />
            
            <Slider
              defaultValue={80}
              min={0}
              max={100}
              step={10}
              label="Build Progress"
              showValue
              formatValue={(val) => `${val}%`}
              color="sapphire"
              marks={{
                0: 'Start',
                25: 'Planning',
                50: 'Development',
                75: 'Testing',
                100: 'Complete'
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Interactive controls demo
export const InteractiveControlsDemo: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(60);
    const [temperatureRange, setTemperatureRange] = useState<[number, number]>([68, 72]);
    const [quality, setQuality] = useState(3);

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-lg">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus App Settings</h3>
          
          <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="text-center">
              <p className="text-sm text-hive-text-secondary mb-4">
                Use the sliders below to adjust your campus app preferences
              </p>
            </div>
            
            <Slider
              value={volume}
              onChange={(val) => setVolume(val as number)}
              min={0}
              max={100}
              label="Notification Volume"
              showValue
              formatValue={(val) => `${val}%`}
              color="primary"
            />
            
            <Slider
              value={brightness}
              onChange={(val) => setBrightness(val as number)}
              min={0}
              max={100}
              label="Screen Brightness"
              showValue
              formatValue={(val) => `${val}%`}
              color="gold"
            />
            
            <Slider
              range
              value={temperatureRange}
              onChange={(val) => setTemperatureRange(val as [number, number])}
              min={60}
              max={80}
              label="Preferred Room Temperature"
              showValue
              formatValue={(val) => `${val}°F`}
              color="emerald"
            />
            
            <Slider
              value={quality}
              onChange={(val) => setQuality(val as number)}
              min={1}
              max={5}
              step={1}
              label="Video Call Quality"
              showValue
              color="sapphire"
              marks={{
                1: 'Low',
                2: 'Medium',
                3: 'High',
                4: 'HD',
                5: '4K'
              }}
            />
            
            <div className="pt-4 border-t border-hive-border-subtle">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-hive-text-primary">Current Settings:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-hive-text-secondary">
                  <div>Volume: {volume}%</div>
                  <div>Brightness: {brightness}%</div>
                  <div>Temperature: {temperatureRange[0]}°F - {temperatureRange[1]}°F</div>
                  <div>Quality: {['', 'Low', 'Medium', 'High', 'HD', '4K'][quality]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Vertical slider examples
export const VerticalSliderExamples: Story = {
  render: () => (
    <div className="flex items-start space-x-8 p-6 bg-hive-background-primary">
      <div className="text-center">
        <VerticalSlider
          defaultValue={60}
          label="Volume"
          showValue
          color="primary"
          formatValue={(val) => `${val}%`}
        />
      </div>
      
      <div className="text-center">
        <VerticalSlider
          defaultValue={75}
          min={0}
          max={100}
          label="Bass"
          showValue
          color="success"
          size="lg"
        />
      </div>
      
      <div className="text-center">
        <VerticalSlider
          range
          defaultValue={[30, 80]}
          label="EQ Range"
          showValue
          color="gold"
          formatValue={(val) => `${val}dB`}
        />
      </div>
    </div>
  ),
};

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider
        defaultValue={50}
        label="Disabled Single Slider"
        showValue
        disabled
      />
      
      <Slider
        range
        defaultValue={[25, 75]}
        label="Disabled Range Slider"
        showValue
        disabled
      />
      
      <Slider
        defaultValue={3}
        min={1}
        max={5}
        step={1}
        label="Disabled with Marks"
        showValue
        disabled
        marks={{
          1: 'Low',
          3: 'Medium',
          5: 'High'
        }}
      />
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <RangeSlider
        defaultValue={[20, 80]}
        label="Range Slider Preset"
        showValue
      />
      
      <PrimarySlider
        defaultValue={40}
        label="Primary Slider"
        showValue
      />
      
      <SuccessSlider
        defaultValue={50}
        label="Success Slider"
        showValue
      />
      
      <WarningSlider
        defaultValue={60}
        label="Warning Slider"
        showValue
      />
      
      <ErrorSlider
        defaultValue={70}
        label="Error Slider"
        showValue
      />
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: 'Interactive Slider - Use controls to customize →',
    showValue: true,
    color: 'primary',
    size: 'md',
  },
};