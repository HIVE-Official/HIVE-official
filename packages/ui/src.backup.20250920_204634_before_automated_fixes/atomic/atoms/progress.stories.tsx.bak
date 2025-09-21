import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress, CircularProgress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner } from './progress';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Progress> = {
  title: '01-Atoms/Progress - COMPLETE DEFINITION',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Progress - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated progress indication system for University at Buffalo campus task completion and status tracking.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Colors** - Primary (gold), success, warning, error, info
- **4 Progress Variants** - Default, gradient, striped, circular
- **3 Size Options** - Small, medium, large with perfect visual clarity
- **Advanced Features** - Indeterminate loading, animations, value display
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Gold Brand Progress** - Primary variant uses gold for campus achievements
- **Smart Accessibility** - ARIA compliant, screen reader support, progress announcements
- **Campus Progress Ready** - Optimized for UB academic progress and task completion

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo progress tracking and status indication:
- **Academic Progress** - Course completion, assignment progress, graduation requirements
- **Registration Progress** - Course enrollment steps, housing application status
- **Project Development** - Capstone project milestones, group work completion
- **Campus Activities** - Event planning progress, club membership onboarding
- **Profile Completion** - Student profile setup, verification steps

### 📱 **MOBILE OPTIMIZATION**
- **Visual Clarity** - Clear progress indication on all screen sizes
- **Touch Accessibility** - Progress bars sized for easy viewing while mobile
- **Performance** - Smooth animations without impacting app performance
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'striped', 'circular'],
      description: 'Progress variant style',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Progress color (primary uses gold)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress size',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// Default progress showcase
export const Default: Story = {
  args: {
    value: 65,
    label: 'Course Progress',
    showValue: true,
    color: 'primary',
    variant: 'default',
    size: 'md',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Color Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ COLORS</Badge>
            Progress Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 semantic colors using 100% semantic tokens (primary uses gold for campus achievements)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Progress 
              value={85} 
              label="Primary (Gold Brand)" 
              color="primary" 
              showValue 
            />
            <Progress 
              value={75} 
              label="Success - Course Completed" 
              color="success" 
              showValue 
            />
            <Progress 
              value={45} 
              label="Warning - Attention Needed" 
              color="warning" 
              showValue 
            />
            <Progress 
              value={25} 
              label="Error - Critical Issue" 
              color="error" 
              showValue 
            />
            <Progress 
              value={60} 
              label="Info - General Progress" 
              color="info" 
              showValue 
            />
          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Progress Variants - Visual Style Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants for different campus progress indication contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Progress 
              value={70} 
              label="Default - Clean Progress Bar" 
              variant="default" 
              color="primary" 
              showValue 
            />
            <Progress 
              value={70} 
              label="Gradient - Premium Visual Effect" 
              variant="gradient" 
              color="primary" 
              showValue 
            />
            <Progress 
              value={70} 
              label="Striped - Dynamic Pattern" 
              variant="striped" 
              color="primary" 
              showValue 
              animated 
            />
            <div className="flex items-center gap-4">
              <CircularProgress 
                value={70} 
                label="Circular" 
                color="primary" 
                showValue 
                size="lg"
              />
              <div className="text-sm text-[var(--hive-text-muted)]">
                Circular variant for compact spaces
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES</Badge>
            Progress Sizes - Visual Hierarchy
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for different visual emphasis and space requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Linear Progress Sizes:</h4>
              <Progress 
                value={80} 
                label="Small - Compact Display" 
                size="sm" 
                color="primary" 
                showValue 
              />
              <Progress 
                value={80} 
                label="Medium - Standard Size" 
                size="md" 
                color="primary" 
                showValue 
              />
              <Progress 
                value={80} 
                label="Large - Prominent Display" 
                size="lg" 
                color="primary" 
                showValue 
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Circular Progress Sizes:</h4>
              <div className="flex items-center gap-8">
                <CircularProgress 
                  value={80} 
                  label="Small" 
                  size="sm" 
                  color="primary" 
                  showValue 
                />
                <CircularProgress 
                  value={80} 
                  label="Medium" 
                  size="md" 
                  color="primary" 
                  showValue 
                />
                <CircularProgress 
                  value={80} 
                  label="Large" 
                  size="lg" 
                  color="primary" 
                  showValue 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ FEATURES</Badge>
            Advanced Features - Loading States, Animations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced progress features for enhanced campus status indication
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Indeterminate Loading */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Indeterminate Loading:</h4>
              <div className="space-y-4">
                <LoadingProgress 
                  label="Loading course data..." 
                  color="primary" 
                />
                <LoadingProgress 
                  label="Processing registration..." 
                  color="info" 
                />
                <div className="flex items-center gap-6">
                  <CircularSpinner 
                    label="Submitting..." 
                    color="primary" 
                    size="md" 
                  />
                  <CircularSpinner 
                    label="Uploading..." 
                    color="success" 
                    size="sm" 
                  />
                </div>
              </div>
            </div>

            {/* Animated Progress */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated Progress:</h4>
              <div className="space-y-4">
                <Progress 
                  value={60} 
                  label="Animated Striped Progress" 
                  variant="striped" 
                  animated 
                  color="primary" 
                  showValue 
                />
                <Progress 
                  value={40} 
                  label="Animated Gradient Progress" 
                  variant="gradient" 
                  animated 
                  color="success" 
                  showValue 
                />
              </div>
            </div>

            {/* Progress with Different States */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Status-Based Progress:</h4>
              <div className="space-y-4">
                <SuccessProgress 
                  value={100} 
                  label="Assignment Completed" 
                  showValue 
                />
                <ErrorProgress 
                  value={25} 
                  label="Failed - Retry Required" 
                  showValue 
                />
                <Progress 
                  value={90} 
                  label="Nearly Complete - Review Needed" 
                  color="warning" 
                  showValue 
                />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Progress Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Progress usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Progress Tracking */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Course Progress:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">CSE 331 - Algorithm Analysis:</h5>
                  <Progress 
                    value={78} 
                    label="Overall Course Progress" 
                    color="primary" 
                    showValue 
                  />
                  <Progress 
                    value={85} 
                    label="Assignments Completed (11/13)" 
                    color="success" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={60} 
                    label="Exam Average" 
                    color="warning" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={90} 
                    label="Lab Participation" 
                    color="success" 
                    showValue 
                    size="sm"
                  />
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">MTH 241 - Calculus III:</h5>
                  <Progress 
                    value={82} 
                    label="Overall Course Progress" 
                    color="primary" 
                    showValue 
                  />
                  <Progress 
                    value={70} 
                    label="Homework Sets (14/20)" 
                    color="info" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={88} 
                    label="Quiz Average" 
                    color="success" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={45} 
                    label="Midterm Performance" 
                    color="error" 
                    showValue 
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Graduation Requirements */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Graduation Requirements Progress:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <CircularProgress 
                    value={85} 
                    label="Total Credits" 
                    color="primary" 
                    showValue 
                    size="lg"
                  />
                  <p className="text-xs text-[var(--hive-text-muted)] mt-2">102/120 credits</p>
                </div>
                <div className="text-center">
                  <CircularProgress 
                    value={90} 
                    label="Major Requirements" 
                    color="success" 
                    showValue 
                    size="lg"
                  />
                  <p className="text-xs text-[var(--hive-text-muted)] mt-2">27/30 courses</p>
                </div>
                <div className="text-center">
                  <CircularProgress 
                    value={75} 
                    label="General Education" 
                    color="info" 
                    showValue 
                    size="lg"
                  />
                  <p className="text-xs text-[var(--hive-text-muted)] mt-2">18/24 credits</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <Progress 
                  value={95} 
                  label="Core CS Courses (Required)" 
                  color="success" 
                  showValue 
                  size="sm"
                />
                <Progress 
                  value={80} 
                  label="Technical Electives" 
                  color="primary" 
                  showValue 
                  size="sm"
                />
                <Progress 
                  value={60} 
                  label="Capstone Project Progress" 
                  color="warning" 
                  showValue 
                  size="sm"
                />
                <Progress 
                  value={100} 
                  label="Math Requirements" 
                  color="success" 
                  showValue 
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Registration Process */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration - Spring 2025:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="space-y-4">
                <Progress 
                  value={100} 
                  label="Step 1: Academic Advising Complete" 
                  color="success" 
                  showValue 
                />
                <Progress 
                  value={100} 
                  label="Step 2: Registration Time Slot Assigned" 
                  color="success" 
                  showValue 
                />
                <Progress 
                  value={75} 
                  label="Step 3: Course Selection (9/12 courses selected)" 
                  color="primary" 
                  showValue 
                />
                <LoadingProgress 
                  label="Step 4: Registration in Progress..." 
                  color="info" 
                />
                <Progress 
                  value={0} 
                  label="Step 5: Schedule Confirmation" 
                  color="info" 
                  showValue 
                />
              </div>
            </div>
          </div>

          {/* Project Development */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Senior Capstone Project - Smart Campus Tool:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Development Phases:</h5>
                  <Progress 
                    value={100} 
                    label="Research & Planning" 
                    color="success" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={85} 
                    label="Backend Development" 
                    color="primary" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={70} 
                    label="Frontend Development" 
                    color="primary" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={30} 
                    label="Testing & QA" 
                    color="warning" 
                    showValue 
                    size="sm"
                  />
                  <Progress 
                    value={0} 
                    label="Documentation" 
                    color="error" 
                    showValue 
                    size="sm"
                  />
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Team Contributions:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alex K. (Lead)</span>
                      <CircularProgress 
                        value={88} 
                        showValue 
                        size="sm" 
                        color="primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Maria L. (Backend)</span>
                      <CircularProgress 
                        value={92} 
                        showValue 
                        size="sm" 
                        color="success"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">David W. (Frontend)</span>
                      <CircularProgress 
                        value={75} 
                        showValue 
                        size="sm" 
                        color="primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lisa P. (Data)</span>
                      <CircularProgress 
                        value={82} 
                        showValue 
                        size="sm" 
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading States for Campus Operations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus System Loading States:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Systems:</h5>
                  <LoadingProgress 
                    label="Loading UBLearns courses..." 
                    color="primary" 
                  />
                  <LoadingProgress 
                    label="Syncing grades from HUB..." 
                    color="info" 
                  />
                  <LoadingProgress 
                    label="Checking degree audit..." 
                    color="success" 
                  />
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Services:</h5>
                  <div className="flex items-center gap-4">
                    <CircularSpinner 
                      color="primary" 
                      size="sm" 
                    />
                    <span className="text-sm">Connecting to campus WiFi...</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CircularSpinner 
                      color="info" 
                      size="sm" 
                    />
                    <span className="text-sm">Loading dining hall menus...</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CircularSpinner 
                      color="success" 
                      size="sm" 
                    />
                    <span className="text-sm">Checking bus schedules...</span>
                  </div>
                </div>
              </div>
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
    value: 75,
    label: 'UB Course Progress',
    showValue: true,
    color: 'primary',
    variant: 'default',
    size: 'md',
    animated: false,
    indeterminate: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Progress Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different progress configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Progress {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};