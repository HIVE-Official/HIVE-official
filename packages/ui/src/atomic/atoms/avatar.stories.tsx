import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Avatar> = {
  title: '01-Atoms/Avatar - COMPLETE DEFINITION',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Avatar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated avatar system for University at Buffalo campus social coordination.

### 🏆 **COMPONENT EXCELLENCE**
- **6 Size Options** - From tiny (24px) to profile hero (80px)
- **5 Status Indicators** - Online, offline, away (gold outline), busy, ghost
- **Campus Privacy Modes** - Public, ghost mode, anonymous coordination
- **Social Platform Features** - Student roles, residential affiliations
- **Perfect Fallback System** - Image → Initials → Custom → Default icon
- **Interactive States** - Hover, focus, click with gold outline accent
- **Mobile Optimized** - All sizes work perfectly on touch devices

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student coordination:
- **Student Identification** - Profile pictures for study groups and spaces
- **Status Awareness** - Know when classmates are available for coordination
- **Privacy Controls** - Ghost mode for low-key campus presence
- **Residential Coordination** - Dorm floor avatars and wing identification
- **Academic Collaboration** - Class project team member identification
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size (all optimized for mobile touch)',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'ghost'],
      description: 'Status indicator (away uses gold outline)',
    },
    privacy: {
      control: 'select',
      options: ['public', 'ghost', 'anonymous'],
      description: 'Privacy mode for campus coordination',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover and click interactions',
    },
    initials: {
      control: 'text',
      description: 'Fallback initials when no image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Default avatar showcase
export const Default: Story = {
  args: {
    initials: 'JS',
    size: 'md',
    status: 'online',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">✅ SIZES</Badge>
            Avatar Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 sizes optimized for different campus coordination contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center space-y-2">
              <Avatar size="xs" initials="XS" />
              <p className="text-xs text-[var(--hive-text-muted)]">XS (24px)<br/>Compact lists</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="sm" initials="SM" />
              <p className="text-xs text-[var(--hive-text-muted)]">SM (32px)<br/>Small cards</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="md" initials="MD" />
              <p className="text-xs text-[var(--hive-text-muted)]">MD (40px)<br/>Default size</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="lg" initials="LG" />
              <p className="text-xs text-[var(--hive-text-muted)]">LG (48px)<br/>Member cards</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="xl" initials="XL" />
              <p className="text-xs text-[var(--hive-text-muted)]">XL (64px)<br/>Profile headers</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="2xl" initials="2XL" />
              <p className="text-xs text-[var(--hive-text-muted)]">2XL (80px)<br/>Hero profiles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🟢 STATUS</Badge>
            Status Indicators - Campus Availability
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Status indicators for coordinating with other UB students (away uses gold outline only)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Online student"
                size="lg" 
                status="online" 
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Online</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Available for coordination</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                alt="Away student"
                size="lg" 
                status="away" 
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Away</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Gold outline (never fill)</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Busy student"
                size="lg" 
                status="busy" 
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Busy</p>
                <p className="text-xs text-[var(--hive-text-muted)]">In class/studying</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                alt="Offline student"
                size="lg" 
                status="offline" 
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Offline</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Not available</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                alt="Ghost mode student"
                size="lg" 
                status="ghost" 
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Ghost</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Low-key presence</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔒 PRIVACY</Badge>
            Privacy Modes - Campus Coordination Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Privacy controls for different levels of campus visibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Public profile"
                size="lg" 
                privacy="public"
                status="online"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Public</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Full visibility in spaces</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                alt="Ghost mode"
                size="lg" 
                privacy="ghost"
                status="away"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Ghost Mode</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Reduced opacity for low-key presence</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                initials="AN"
                size="lg" 
                privacy="anonymous"
                status="online"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Anonymous</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Dashed border for anonymous coordination</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fallback System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔄 FALLBACKS</Badge>
            Fallback System - Graceful Degradation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smart fallback system: Image → Initials → Custom → Default icon
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Profile image"
                size="lg" 
                status="online"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Image</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Primary: Profile photo</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                initials="JS"
                size="lg" 
                status="away"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Initials</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Fallback: User initials</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                placeholder={<span className="text-2xl">🦌</span>}
                size="lg" 
                status="online"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Custom</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Custom: UB mascot</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                size="lg" 
                status="offline"
              />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Default</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Final: User icon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">👆 INTERACTIVE</Badge>
            Interactive States - Gold Outline Hover
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive avatars with hover effects and gold outline focus states
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Interactive avatar"
                size="lg" 
                status="online"
                interactive={true}
              />
              <p className="text-sm text-[var(--hive-text-muted)]">Hover me!</p>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                initials="CS"
                size="lg" 
                status="away"
                interactive={true}
              />
              <p className="text-sm text-[var(--hive-text-muted)]">Click to view profile</p>
            </div>
            <div className="text-center space-y-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                alt="Interactive avatar"
                size="lg" 
                status="busy"
                interactive={true}
              />
              <p className="text-sm text-[var(--hive-text-muted)]">Focus for accessibility</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Coordination Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Avatar usage in actual University at Buffalo student coordination contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Study Group Members */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Study Group Members:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="John Smith"
                    size="md" 
                    status="online"
                    interactive={true}
                  />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">John S.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Group Leader</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                    alt="Emily Chen"
                    size="md" 
                    status="away"
                    interactive={true}
                  />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Emily C.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">CS Major</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar 
                    initials="MR"
                    size="md" 
                    status="busy"
                    interactive={true}
                  />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Mike R.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">In class</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Sarah Wilson"
                    size="md" 
                    status="offline"
                    interactive={true}
                  />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Sarah W.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Offline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dorm Floor Residents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Hadley Village 2nd Floor East:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                <div className="text-center space-y-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Room 201"
                    size="sm" 
                    status="online"
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">201A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar 
                    initials="JD"
                    size="sm" 
                    status="away"
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">201B</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                    alt="Room 202"
                    size="sm" 
                    status="busy"
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">202A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar 
                    initials="KL"
                    size="sm" 
                    status="offline"
                    privacy="ghost"
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">202B</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Room 203"
                    size="sm" 
                    status="online"
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">203A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar 
                    initials="RA"
                    size="sm" 
                    status="online"
                    placeholder={<span className="text-lg">🔑</span>}
                    interactive={true}
                  />
                  <p className="text-xs text-[var(--hive-text-muted)]">RA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Project Team */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Capstone Project Team - Smart Campus Tool:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="flex gap-6 items-center flex-wrap">
                <div className="text-center space-y-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Project lead"
                    size="xl" 
                    status="online"
                    interactive={true}
                  />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Alex K.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Project Lead</p>
                    <p className="text-xs text-[var(--hive-brand-secondary)]">Frontend Dev</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face"
                      alt="Backend dev"
                      size="lg" 
                      status="busy"
                      interactive={true}
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">Maria L.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">Backend</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Avatar 
                      initials="DW"
                      size="lg" 
                      status="away"
                      interactive={true}
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">David W.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">UI/UX</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                      alt="Data analyst"
                      size="lg" 
                      status="online"
                      interactive={true}
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">Lisa P.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">Data</p>
                    </div>
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
    initials: 'UB',
    size: 'lg',
    status: 'online',
    privacy: 'public',
    interactive: true,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Avatar Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different avatar configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Avatar {...args} />
        </CardContent>
      </Card>
    </div>
  ),
};