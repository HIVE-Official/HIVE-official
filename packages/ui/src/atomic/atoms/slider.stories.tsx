import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Slider, 
  RangeSlider, 
  VerticalSlider, 
  PrimarySlider, 
  SuccessSlider, 
  WarningSlider, 
  ErrorSlider 
} from './slider';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Slider> = {
  title: '01-Atoms/Slider - COMPLETE DEFINITION',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Slider - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated slider system for University at Buffalo campus value selection and range input.

### 🏆 **COMPONENT EXCELLENCE**
- **7 Color Variants** - Primary (gold), success, warning, error, gold, emerald, sapphire
- **3 Size Options** - Small, medium, large with perfect touch targets
- **Advanced Features** - Single values, ranges, vertical sliders, marks, formatting
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Gold Brand Sliders** - Primary variant uses UB gold for campus value selection
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Input Ready** - Optimized for UB preference selection and value input

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo value selection and preference input:
- **Academic Settings** - Course difficulty, study time preferences, grade targets
- **Campus Preferences** - Notification frequency, privacy levels, activity ranges
- **Housing Selection** - Budget ranges, room preferences, meal plan spending
- **Event Planning** - Capacity limits, time ranges, participation levels
- **Profile Configuration** - Visibility settings, engagement levels, social preferences

### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch requirements
- **Thumb Interaction** - Optimized for single-thumb slider manipulation
- **Visual Feedback** - Clear value indication with smooth animations
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
      description: 'Minimum slider value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum slider value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
    },
    value: {
      control: { type: 'number' },
      description: 'Current slider value',
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
      description: 'Slider color variant',
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
    },
    showMarks: {
      control: 'boolean',
      description: 'Show scale marks',
    },
    vertical: {
      control: 'boolean',
      description: 'Vertical orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Default slider showcase
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
    label: 'Study Hours Per Week',
    showValue: true,
    size: 'md',
    color: 'primary',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Color Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ COLORS</Badge>
            Slider Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            7 semantic color variants using 100% semantic tokens with sophisticated color-mix shadows
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Slider 
              min={0} 
              max={100} 
              value={85} 
              label="Primary (UB Gold)" 
              color="primary" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={75} 
              label="Success - Course Completion" 
              color="success" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={45} 
              label="Warning - Attention Needed" 
              color="warning" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={25} 
              label="Error - Critical Level" 
              color="error" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={60} 
              label="Gold - Brand Emphasis" 
              color="gold" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={70} 
              label="Emerald - Natural Success" 
              color="emerald" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={80} 
              label="Sapphire - Information Level" 
              color="sapphire" 
              showValue 
            />
          </div>
        </CardContent>
      </Card>

      {/* Size Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Slider Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes optimized for different campus interface contexts and mobile touch targets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Slider 
              min={0} 
              max={100} 
              value={70} 
              label="Small - Compact Interface" 
              size="sm" 
              color="primary" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={70} 
              label="Medium - Standard Interface" 
              size="md" 
              color="primary" 
              showValue 
            />
            <Slider 
              min={0} 
              max={100} 
              value={70} 
              label="Large - Prominent Interface" 
              size="lg" 
              color="primary" 
              showValue 
            />
          </div>
        </CardContent>
      </Card>

      {/* Range Sliders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 RANGES</Badge>
            Range Sliders - Dual Value Selection
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Range selection sliders for campus value ranges and preference spans
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RangeSlider 
              min={0} 
              max={24} 
              value={[9, 17]} 
              label="Available Study Hours" 
              color="primary" 
              showValue
              formatValue={(val: any) => `${val}:00`}
            />
            <RangeSlider 
              min={18} 
              max={30} 
              value={[20, 24]} 
              label="Age Range for Events" 
              color="success" 
              showValue
              formatValue={(val: any) => `${val} years`}
            />
            <RangeSlider 
              min={0} 
              max={500} 
              value={[150, 350]} 
              label="Budget Range (Monthly)" 
              color="gold" 
              showValue
              formatValue={(val: any) => `$${val}`}
            />
            <RangeSlider 
              min={0} 
              max={4} 
              value={[2.5, 3.8]} 
              step={0.1}
              label="Target GPA Range" 
              color="emerald" 
              showValue
              formatValue={(val: any) => val.toFixed(1)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ FEATURES</Badge>
            Advanced Features - Marks, Vertical, Formatting
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced slider features for enhanced campus value selection UX
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Sliders with Marks */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Sliders with Scale Marks:</h4>
              <div className="space-y-6">
                <Slider 
                  min={0} 
                  max={100} 
                  value={75} 
                  label="Course Difficulty Level" 
                  color="primary" 
                  showValue
                  marks={{
                    0: 'Beginner',
                    25: 'Easy',
                    50: 'Moderate',
                    75: 'Hard',
                    100: 'Expert'
                  }}
                />
                <Slider 
                  min={1} 
                  max={5} 
                  value={3} 
                  step={1}
                  label="Priority Level" 
                  color="warning" 
                  showValue
                  marks={{
                    1: '1 - Low',
                    2: '2',
                    3: '3 - Med',
                    4: '4',
                    5: '5 - High'
                  }}
                />
              </div>
            </div>

            {/* Vertical Sliders */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Sliders:</h4>
              <div className="flex items-start gap-8 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="text-center space-y-2">
                  <VerticalSlider 
                    min={0} 
                    max={100} 
                    value={80} 
                    color="primary" 
                    size="md"
                  />
                  <p className="text-sm text-[var(--hive-text-secondary)]">Engagement</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">80%</p>
                </div>
                <div className="text-center space-y-2">
                  <VerticalSlider 
                    min={0} 
                    max={100} 
                    value={60} 
                    color="success" 
                    size="md"
                  />
                  <p className="text-sm text-[var(--hive-text-secondary)]">Participation</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">60%</p>
                </div>
                <div className="text-center space-y-2">
                  <VerticalSlider 
                    min={0} 
                    max={100} 
                    value={90} 
                    color="emerald" 
                    size="md"
                  />
                  <p className="text-sm text-[var(--hive-text-secondary)]">Satisfaction</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">90%</p>
                </div>
                <div className="text-center space-y-2">
                  <VerticalSlider 
                    min={0} 
                    max={100} 
                    value={40} 
                    color="warning" 
                    size="md"
                  />
                  <p className="text-sm text-[var(--hive-text-secondary)]">Stress</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">40%</p>
                </div>
              </div>
            </div>

            {/* Custom Formatting */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Value Formatting:</h4>
              <div className="space-y-6">
                <Slider 
                  min={0} 
                  max={24} 
                  value={14} 
                  label="Study Session Duration" 
                  color="sapphire" 
                  showValue
                  formatValue={(val: any) => `${val} hours`}
                />
                <Slider 
                  min={0} 
                  max={1000} 
                  value={450} 
                  step={50}
                  label="Monthly Dining Budget" 
                  color="gold" 
                  showValue
                  formatValue={(val: any) => `$${val}.00`}
                />
                <Slider 
                  min={0} 
                  max={100} 
                  value={87} 
                  label="Assignment Completion" 
                  color="success" 
                  showValue
                  formatValue={(val: any) => `${val}% complete`}
                />
              </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Disabled State:</h4>
              <div className="space-y-4">
                <Slider 
                  min={0} 
                  max={100} 
                  value={65} 
                  label="Locked Setting (Admin Only)" 
                  color="primary" 
                  showValue
                  disabled
                />
                <RangeSlider 
                  min={0} 
                  max={100} 
                  value={[30, 70]} 
                  label="System Maintenance Window" 
                  color="error" 
                  showValue
                  disabled
                />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Slider Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built slider components for common campus value selection scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Slider:</h4>
              <PrimarySlider 
                min={0} 
                max={100} 
                value={75} 
                label="Overall Campus Engagement" 
                showValue
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Success Slider:</h4>
              <SuccessSlider 
                min={0} 
                max={4} 
                value={3.4} 
                step={0.1}
                label="Current GPA" 
                showValue
                formatValue={(val: any) => val.toFixed(1)}
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Warning Slider:</h4>
              <WarningSlider 
                min={0} 
                max={10} 
                value={7} 
                label="Stress Level" 
                showValue
                formatValue={(val: any) => `${val}/10`}
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Error Slider:</h4>
              <ErrorSlider 
                min={0} 
                max={5} 
                value={2} 
                label="Assignment Overdue Count" 
                showValue
                formatValue={(val: any) => `${val} assignments`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Slider Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Slider usage in actual University at Buffalo academic and campus contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <Slider 
                min={8} 
                max={22} 
                value={10} 
                label="Preferred Class Start Time" 
                color="primary" 
                showValue
                formatValue={(val: any) => `${val}:00 AM`}
                marks={{
                  8: '8 AM',
                  10: '10 AM',
                  12: '12 PM',
                  14: '2 PM',
                  16: '4 PM',
                  18: '6 PM',
                  20: '8 PM',
                  22: '10 PM'
                }}
              />
              <RangeSlider 
                min={1} 
                max={7} 
                value={[2, 5]} 
                label="Preferred Days (Monday=1, Sunday=7)" 
                color="success" 
                showValue
                formatValue={(val: any) => {
                  const days = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                  return days[val];
                }}
              />
              <Slider 
                min={12} 
                max={18} 
                value={15} 
                label="Maximum Credit Hours" 
                color="warning" 
                showValue
                formatValue={(val: any) => `${val} credits`}
              />
            </div>
          </div>

          {/* Study Group Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Study Group Coordination:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <Slider 
                min={2} 
                max={8} 
                value={4} 
                label="Ideal Group Size" 
                color="emerald" 
                showValue
                formatValue={(val: any) => `${val} students`}
                marks={{
                  2: '2',
                  3: '3',
                  4: '4',
                  5: '5',
                  6: '6',
                  7: '7',
                  8: '8+'
                }}
              />
              <RangeSlider 
                min={30} 
                max={240} 
                value={[60, 120]} 
                step={15}
                label="Session Duration Range" 
                color="sapphire" 
                showValue
                formatValue={(val: any) => `${Math.floor(val/60)}h ${val%60}m`}
              />
              <Slider 
                min={1} 
                max={5} 
                value={3} 
                label="Preferred Noise Level" 
                color="primary" 
                showValue
                marks={{
                  1: 'Silent',
                  2: 'Quiet',
                  3: 'Normal',
                  4: 'Active',
                  5: 'Social'
                }}
              />
            </div>
          </div>

          {/* Housing & Dining Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Housing & Dining Budget Planning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <RangeSlider 
                min={200} 
                max={800} 
                value={[350, 550]} 
                step={25}
                label="Monthly Dining Budget" 
                color="gold" 
                showValue
                formatValue={(val: any) => `$${val}`}
              />
              <RangeSlider 
                min={8000} 
                max={15000} 
                value={[10000, 13000]} 
                step={500}
                label="Annual Housing Budget" 
                color="success" 
                showValue
                formatValue={(val: any) => `$${val.toLocaleString()}`}
              />
              <Slider 
                min={1} 
                max={10} 
                value={7} 
                label="Social Activity Level" 
                color="primary" 
                showValue
                marks={{
                  1: 'Minimal',
                  3: 'Low',
                  5: 'Moderate',
                  7: 'Active',
                  10: 'Maximum'
                }}
              />
            </div>
          </div>

          {/* Academic Performance Tracking */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Performance & Goals:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <Slider 
                min={2.0} 
                max={4.0} 
                value={3.2} 
                step={0.1}
                label="Current Semester GPA" 
                color="emerald" 
                showValue
                formatValue={(val: any) => val.toFixed(1)}
              />
              <Slider 
                min={2.0} 
                max={4.0} 
                value={3.5} 
                step={0.1}
                label="Target Graduation GPA" 
                color="primary" 
                showValue
                formatValue={(val: any) => val.toFixed(1)}
              />
              <RangeSlider 
                min={0} 
                max={40} 
                value={[15, 25]} 
                label="Weekly Study Hours" 
                color="sapphire" 
                showValue
                formatValue={(val: any) => `${val} hours`}
              />
              <Slider 
                min={0} 
                max={100} 
                value={85} 
                label="Course Completion Progress" 
                color="success" 
                showValue
                formatValue={(val: any) => `${val}% complete`}
              />
            </div>
          </div>

          {/* Campus Event Planning */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Event Planning & Coordination:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <RangeSlider 
                min={10} 
                max={500} 
                value={[50, 150]} 
                step={10}
                label="Expected Attendance" 
                color="primary" 
                showValue
                formatValue={(val: any) => `${val} people`}
              />
              <Slider 
                min={0} 
                max={5000} 
                value={800} 
                step={100}
                label="Event Budget" 
                color="gold" 
                showValue
                formatValue={(val: any) => `$${val}`}
              />
              <RangeSlider 
                min={18} 
                max={23} 
                value={[19, 22]} 
                label="Event Time Window" 
                color="warning" 
                showValue
                formatValue={(val: any) => `${val}:00`}
              />
              <Slider 
                min={1} 
                max={10} 
                value={6} 
                label="Formality Level" 
                color="sapphire" 
                showValue
                marks={{
                  1: 'Casual',
                  3: 'Relaxed',
                  5: 'Semi-formal',
                  7: 'Business',
                  10: 'Formal'
                }}
              />
            </div>
          </div>

          {/* Privacy & Notification Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Privacy & Notification Controls:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              <Slider 
                min={1} 
                max={5} 
                value={3} 
                label="Profile Visibility Level" 
                color="warning" 
                showValue
                marks={{
                  1: 'Private',
                  2: 'Friends',
                  3: 'Campus',
                  4: 'Public',
                  5: 'Open'
                }}
              />
              <Slider 
                min={0} 
                max={4} 
                value={2} 
                label="Notification Frequency" 
                color="primary" 
                showValue
                marks={{
                  0: 'Off',
                  1: 'Daily',
                  2: 'Real-time',
                  3: 'Hourly',
                  4: 'Instant'
                }}
              />
              <RangeSlider 
                min={6} 
                max={24} 
                value={[8, 22]} 
                label="Quiet Hours (No Notifications)" 
                color="sapphire" 
                showValue
                formatValue={(val: any) => `${val}:00`}
              />
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
    label: 'UB Campus Engagement Level',
    showValue: true,
    size: 'md',
    color: 'primary',
    range: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Slider Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different slider configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Slider {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};