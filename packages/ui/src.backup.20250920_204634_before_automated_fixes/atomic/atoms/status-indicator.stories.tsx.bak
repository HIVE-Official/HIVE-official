import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  StatusIndicator, 
  OnlineIndicator, 
  OfflineIndicator, 
  BusyIndicator, 
  AwayIndicator,
  ErrorIndicator,
  SuccessIndicator,
  WarningIndicator,
  PulseIndicator,
  GlowIndicator,
  StatusBadge
} from './status-indicator';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Avatar } from './avatar';
import { Button } from './button-enhanced';
import '../../hive-tokens.css';

const meta: Meta<typeof StatusIndicator> = {
  title: '01-Atoms/Status Indicator - COMPLETE DEFINITION',
  component: StatusIndicator,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Status Indicator - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated status indication system for University at Buffalo campus real-time status display and user presence.

### 🏆 **COMPONENT EXCELLENCE**
- **8 Status Types** - Online, offline, away, busy, error, success, warning, pending
- **4 Visual Variants** - Dot, pulse, glow, ring with smooth animations
- **5 Size Options** - XS to XL with perfect scaling and visibility
- **8 Position Options** - Complete positioning system for badge overlays
- **Advanced Features** - Labels, animations, status badges with count display
- **Perfect Semantic Tokens** - 100% semantic token usage with sophisticated color-mix effects
- **Smart Accessibility** - ARIA compliant, tooltips, screen reader support
- **Campus Status Ready** - Optimized for UB student presence and system status indication

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo status indication and presence display:
- **Student Presence** - Online status for study groups, virtual office hours, collaboration
- **System Status** - Course registration systems, campus services, network connectivity
- **Academic Progress** - Assignment completion, grade processing, enrollment status
- **Campus Services** - Dining hall capacity, library availability, lab equipment status
- **Event Status** - Registration status, attendance confirmation, waitlist position

### 📱 **MOBILE OPTIMIZATION**
- **Touch Visibility** - Clear status indication on mobile devices
- **Animation Performance** - Smooth animations without battery drain
- **Responsive Sizing** - Appropriate scaling for mobile interfaces
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'error', 'success', 'warning', 'pending'],
      description: 'Status type to display',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Indicator size',
    },
    variant: {
      control: 'select',
      options: ['dot', 'pulse', 'glow', 'ring'],
      description: 'Visual style variant',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position for badge overlay',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show status label text',
    },
    animate: {
      control: 'boolean',
      description: 'Enable animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

// Default status indicator showcase
export const Default: Story = {
  args: {
    status: 'online',
    size: 'md',
    variant: 'dot',
    showLabel: true,
    animate: true,
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Status Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ STATUS TYPES</Badge>
            Status Types - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 status types using 100% semantic tokens with sophisticated color-mix glow effects
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Presence Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Available for collaboration</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="away" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Temporarily unavailable</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="busy" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Do not disturb</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="offline" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Not currently active</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">System Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="success" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Operation completed successfully</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="warning" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Attention required</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="error" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Error or failure state</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="pending" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Processing or waiting</span>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Visual Variants - Animation & Style Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants with sophisticated animations and effects for different campus contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Static Variants:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="dot" size="lg" />
                  <span className="text-sm font-medium">Dot - Clean solid indicator</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="ring" size="lg" />
                  <span className="text-sm font-medium">Ring - Outlined style with background</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated Variants:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="pulse" size="lg" animate />
                  <span className="text-sm font-medium">Pulse - Breathing animation effect</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="glow" size="lg" animate />
                  <span className="text-sm font-medium">Glow - Radiant glow with pulse</span>
                </div>
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
            Status Indicator Sizes - Perfect Scaling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 sizes optimized for different campus interface contexts and visibility needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="flex items-center gap-8 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="xs" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">XS: 6px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="sm" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">SM: 8px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="md" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">MD: 10px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="lg" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">LG: 12px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="xl" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">XL: 16px</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Usage Context:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="xs" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Compact lists, inline text</p>
                </div>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="md" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Standard interface elements</p>
                </div>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="xl" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Prominent status display</p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Position & Badge Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📍 POSITIONING</Badge>
            Position Options & Status Badges
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 position options for badge overlays and notification counts on campus profile elements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Avatar Status Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Profile Status:</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="online" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Alex Martinez</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Computer Science</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="away" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Maria Rodriguez</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Mathematics</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="busy" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">David Kim</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Engineering</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="offline" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Business</p>
                </div>
              </div>
            </div>

            {/* Notification Badges */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Notification Badges:</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <StatusBadge status="error" count={3}>
                    <Button variant="outline" size="lg">
                      Messages
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Unread messages</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="warning" count={12}>
                    <Button variant="outline" size="lg">
                      Assignments
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Due assignments</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="success" count={150} max={99}>
                    <Button variant="outline" size="lg">
                      Achievements
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Earned points</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="pending">
                    <Button variant="outline" size="lg">
                      Sync Status
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Processing update</p>
                </div>
              </div>
            </div>

            {/* Position Grid */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">All Position Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg">
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                  
                  {/* Top Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="online" position="top-left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">TL</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="warning" position="top" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">T</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="error" position="top-right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">TR</span>
                  </div>
                  
                  {/* Middle Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="away" position="left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">L</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg flex items-center justify-center text-xs">
                    Center
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="success" position="right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">R</span>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="pending" position="bottom-left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">BL</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="busy" position="bottom" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">B</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="offline" position="bottom-right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">BR</span>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">🎯 PRESETS</Badge>
            Status Indicator Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built indicator components for common campus status and presence scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Presence Indicators:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <OnlineIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Available for study groups</span>
                </div>
                <div className="flex items-center gap-4">
                  <AwayIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">In class or meeting</span>
                </div>
                <div className="flex items-center gap-4">
                  <BusyIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Focused study time</span>
                </div>
                <div className="flex items-center gap-4">
                  <OfflineIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Not available</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">System Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <SuccessIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Registration completed</span>
                </div>
                <div className="flex items-center gap-4">
                  <WarningIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Action required</span>
                </div>
                <div className="flex items-center gap-4">
                  <ErrorIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Registration failed</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="pending" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Processing request</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated Variants:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <PulseIndicator status="online" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Active collaboration</span>
                </div>
                <div className="flex items-center gap-4">
                  <GlowIndicator status="success" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Featured achievement</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Labels:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <StatusIndicator status="online" label="Study Group Active" showLabel />
                <StatusIndicator status="away" label="In Office Hours" showLabel />
                <StatusIndicator status="busy" label="Taking Exam" showLabel />
                <StatusIndicator status="success" label="Assignment Submitted" showLabel />
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
            Real Campus Status Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Status indicators in actual University at Buffalo academic and campus contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Collaboration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Study Group Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-4">
                <h5 className="font-medium text-[var(--hive-text-primary)]">CSE 331 Study Group - Algorithm Analysis</h5>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Group Members:</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <OnlineIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Alex Martinez (Leader)</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">Available now</p>
                        </div>
                        <GlowIndicator status="online" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <AwayIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Maria Rodriguez</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">In CSE 250 lecture</p>
                        </div>
                        <StatusIndicator status="away" label="In Class" showLabel />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <BusyIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">David Kim</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">Taking midterm exam</p>
                        </div>
                        <PulseIndicator status="busy" label="Do Not Disturb" showLabel />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Session Progress:</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">Dynamic Programming Review</span>
                        <SuccessIndicator label="Completed" showLabel />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">Graph Algorithms Practice</span>
                        <PulseIndicator status="warning" label="In Progress" showLabel />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">NP-Completeness Discussion</span>
                        <StatusIndicator status="pending" label="Pending" showLabel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* System Status Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Systems Status:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Systems</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">UBLearns</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HUB Student Center</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Course Registration</span>
                      <WarningIndicator label="High Load" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grade Portal</span>
                      <StatusIndicator status="pending" label="Maintenance" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Services</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dining Services</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Library Systems</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campus WiFi</span>
                      <GlowIndicator status="success" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parking System</span>
                      <ErrorIndicator label="Outage" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">HIVE Platform</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile Sync</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Updates</span>
                      <PulseIndicator status="online" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Backup</span>
                      <StatusIndicator status="pending" label="Running" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile App</span>
                      <SuccessIndicator showLabel />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Academic Progress */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Progress Tracking:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Fall 2024 Courses</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">CSE 331 - Algorithm Analysis</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">Final project due Dec 15</p>
                      </div>
                      <WarningIndicator label="Due Soon" showLabel />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">MTH 241 - Calculus III</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">All assignments submitted</p>
                      </div>
                      <SuccessIndicator label="Complete" showLabel />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">PHI 237 - Ethics</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">Essay grading in progress</p>
                      </div>
                      <PulseIndicator status="pending" label="Grading" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Degree Requirements</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Core CS Courses</span>
                      <SuccessIndicator label="27/30 Complete" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Math Requirements</span>
                      <SuccessIndicator label="Complete" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">General Education</span>
                      <WarningIndicator label="18/24 Credits" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Capstone Project</span>
                      <StatusIndicator status="pending" label="Spring 2025" showLabel />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Notification Center */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Notifications:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Notification Center</h5>
                <div className="flex gap-4">
                  <StatusBadge status="error" count={3}>
                    <Button variant="ghost" size="sm">Urgent</Button>
                  </StatusBadge>
                  <StatusBadge status="warning" count={8}>
                    <Button variant="ghost" size="sm">Important</Button>
                  </StatusBadge>
                  <StatusBadge status="success" count={12}>
                    <Button variant="ghost" size="sm">Updates</Button>
                  </StatusBadge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <ErrorIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment Overdue</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Spring 2025 tuition payment is past due</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <WarningIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Registration Reminder</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Course registration for Summer 2025 opens tomorrow</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <SuccessIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Grade Posted</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Your CSE 331 midterm grade is now available</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">3 days ago</p>
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
    status: 'online',
    size: 'md',
    variant: 'dot',
    showLabel: true,
    animate: true,
    label: 'Campus Activity Status',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Status Indicator Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different status indicator configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md text-center">
            <StatusIndicator {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};