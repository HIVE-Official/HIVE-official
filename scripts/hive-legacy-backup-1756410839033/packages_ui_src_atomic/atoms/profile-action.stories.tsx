import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileAction, 
  EditAction, 
  ShareAction, 
  MessageAction, 
  ConnectAction, 
  SettingsAction,
  CameraAction,
  MoreAction,
  ACTION_TYPES,
  type ActionType 
} from './profile-action';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { 
  Edit3, 
  Share2, 
  MessageSquare, 
  UserPlus, 
  Settings, 
  Camera,
  Heart,
  Bookmark,
  Download,
  Upload,
  Bell
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileAction> = {
  title: '01-Atoms/Profile Action - COMPLETE DEFINITION',
  component: ProfileAction,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Profile Action - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive action button system for University at Buffalo student profile interactions and social engagement.

### 🏆 **COMPONENT EXCELLENCE**
- **14+ Predefined Actions** - Edit, share, message, connect, settings, and more for complete profile interaction
- **6 Visual Variants** - Primary, secondary, outline, ghost, destructive, success for clear action hierarchy
- **4 Size Options** - XS, SM, MD, LG for flexible interface integration
- **3 Shape Variants** - Rounded, pill, square for different design contexts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Loading States** - Built-in loading spinner with proper interaction blocking
- **Badge Support** - Notification and count badges for action feedback
- **Accessibility Ready** - Proper ARIA labels, tooltips, and keyboard navigation
- **Campus Social** - Built for University at Buffalo student social interactions

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student profile actions:
- **Academic Networking** - Connect with classmates, message study partners, follow faculty
- **Profile Management** - Edit profile, change photo, privacy settings, visibility controls
- **Social Engagement** - Share achievements, bookmark resources, like academic content
- **Course Collaboration** - Message project partners, share study materials, connect for group work
- **Campus Community** - Follow student organizations, bookmark campus events, share experiences
- **Academic Tools** - Upload assignments, download resources, share study guides

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Appropriate button sizes for thumb interaction
- **Clear Visual Feedback** - Distinct states for touch interactions
- **Icon Recognition** - Universal icons for quick action recognition
- **Badge Visibility** - Clear notification indicators for mobile screens
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    actionType: {
      control: 'select',
      options: Object.keys(ACTION_TYPES),
      description: 'Predefined action type',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success'],
      description: 'Action button variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Action button size',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
      description: 'Action button shape',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only icon without label',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileAction>;

// Default profile action showcase
export const Default: Story = {
  args: {
    actionType: 'edit',
    size: 'md',
    variant: 'outline',
    shape: 'rounded',
    iconOnly: false,
    loading: false,
    disabled: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Profile action button for University at Buffalo student interactions:
          </Text>
          <ProfileAction {...args} />
          <Text variant="body-sm" color="secondary">
            Standard profile action for UB campus social and academic engagement
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Predefined Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 ACTION TYPES</Badge>
            Predefined Profile Actions
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            14+ predefined action types for comprehensive University at Buffalo student profile interactions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Actions:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Management:</Text>
                  <div className="flex flex-wrap gap-3">
                    <EditAction />
                    <CameraAction />
                    <SettingsAction />
                    <ProfileAction actionType="privacy" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Interactions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <MessageAction />
                    <ConnectAction />
                    <ProfileAction actionType="follow" />
                    <ShareAction />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Tools:</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="bookmark" />
                    <ProfileAction actionType="download" />
                    <ProfileAction actionType="upload" />
                    <ProfileAction actionType="copy" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variants Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Action Button Variants
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 visual variants for clear action hierarchy and visual feedback
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Primary (Call-to-Action):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="message" variant="primary" />
                    <ProfileAction actionType="connect" variant="primary" />
                    <ProfileAction actionType="follow" variant="primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Secondary (Standard):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="edit" variant="secondary" />
                    <ProfileAction actionType="camera" variant="secondary" />
                    <ProfileAction actionType="upload" variant="secondary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Outline (Subtle):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="edit" variant="secondary" />
                    <ProfileAction actionType="connect" variant="secondary" />
                    <ProfileAction actionType="follow" variant="secondary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Minimal):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="share" variant="ghost" />
                    <ProfileAction actionType="bookmark" variant="ghost" />
                    <ProfileAction actionType="more" variant="ghost" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Status Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Success Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction actionType="download" variant="success" label="Download Complete" />
                    <ProfileAction actionType="bookmark" variant="success" label="Saved" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Destructive Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileAction icon={UserPlus} variant="destructive" label="Remove Connection" />
                    <ProfileAction icon={Bell} variant="destructive" label="Block Notifications" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Sizes Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Action Button Sizes
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes for different interface contexts and layout requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Extra Small (xs):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileAction actionType="edit" size="xs" />
                    <ProfileAction actionType="share" size="xs" />
                    <ProfileAction actionType="bookmark" size="xs" iconOnly />
                    <Text variant="body-xs" color="secondary">Compact interface elements</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileAction actionType="edit" size="sm" />
                    <ProfileAction actionType="share" size="sm" />
                    <ProfileAction actionType="bookmark" size="sm" iconOnly />
                    <Text variant="body-xs" color="secondary">Sidebar and card actions</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileAction actionType="edit" size="md" />
                    <ProfileAction actionType="share" size="md" />
                    <ProfileAction actionType="bookmark" size="md" iconOnly />
                    <Text variant="body-xs" color="secondary">Standard profile actions</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileAction actionType="edit" size="lg" />
                    <ProfileAction actionType="share" size="lg" />
                    <ProfileAction actionType="bookmark" size="lg" iconOnly />
                    <Text variant="body-xs" color="secondary">Prominent mobile actions</Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Shapes & Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🔵 SHAPES & FEATURES</Badge>
            Action Button Shapes and Advanced Features
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different shapes, loading states, badges, and interaction features
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Button Shapes:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Rounded (default):</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="edit" shape="rounded" />
                    <ProfileAction actionType="message" shape="rounded" variant="primary" />
                    <ProfileAction actionType="share" shape="rounded" iconOnly />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Pill:</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="edit" shape="pill" />
                    <ProfileAction actionType="message" shape="pill" variant="primary" />
                    <ProfileAction actionType="share" shape="pill" iconOnly />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Square:</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="edit" shape="square" />
                    <ProfileAction actionType="message" shape="square" variant="primary" />
                    <ProfileAction actionType="share" shape="square" iconOnly />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading States:</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="edit" loading />
                    <ProfileAction actionType="upload" loading variant="primary" />
                    <ProfileAction actionType="download" loading variant="secondary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Badge Notifications:</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="notifications" badge={3} />
                    <ProfileAction actionType="message" badge={12} variant="primary" />
                    <ProfileAction actionType="more" badge="99+" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled States:</Text>
                  <div className="flex gap-3">
                    <ProfileAction actionType="edit" disabled />
                    <ProfileAction actionType="message" disabled variant="primary" />
                    <ProfileAction actionType="connect" disabled variant="secondary" />
                  </div>
                </div>

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
            Real Campus Profile Action Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile action usage in actual University at Buffalo student social and academic contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Profile Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Personal Profile Actions
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Profile Editing:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex gap-2">
                        <EditAction size="sm" />
                        <CameraAction size="sm" />
                        <ProfileAction actionType="upload" size="sm" label="Upload Resume" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Update academic information, change profile photo, upload resume for career services
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Privacy & Settings:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex gap-2">
                        <SettingsAction size="sm" />
                        <ProfileAction actionType="privacy" size="sm" />
                        <ProfileAction actionType="visibility" size="sm" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Manage account settings, control profile visibility, adjust privacy for academic information
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Academic Networking */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Networking & Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Partner Connections:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ConnectAction size="sm" variant="primary" />
                      <MessageAction size="sm" />
                      <ProfileAction actionType="follow" size="sm" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Connect with CSE 331 classmates for algorithm study groups and project collaboration
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Faculty Interaction:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ProfileAction actionType="follow" size="sm" variant="secondary" />
                      <MessageAction size="sm" label="Office Hours" />
                      <ProfileAction actionType="bookmark" size="sm" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Follow professor updates, request office hours, bookmark academic resources
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research Collaboration:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ConnectAction size="sm" label="Collaborate" />
                      <ShareAction size="sm" />
                      <ProfileAction actionType="download" size="sm" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Connect for research projects, share academic papers, download collaboration tools
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Course Space Interactions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Space Profile Interactions:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis Course Space
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Classmate Profiles:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div>
                          <Text variant="body-sm" weight="medium">Sarah Chen - Computer Science</Text>
                          <Text variant="body-xs" color="secondary">Strong in dynamic programming</Text>
                        </div>
                        <div className="flex gap-1">
                          <MessageAction size="xs" />
                          <ConnectAction size="xs" />
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div>
                          <Text variant="body-sm" weight="medium">Marcus Johnson - Math/CS</Text>
                          <Text variant="body-xs" color="secondary">Excellent at graph algorithms</Text>
                        </div>
                        <div className="flex gap-1">
                          <MessageAction size="xs" />
                          <ProfileAction actionType="follow" size="xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">TA & Professor:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div>
                          <Text variant="body-sm" weight="medium">Dr. Emily Rodriguez - Professor</Text>
                          <Text variant="body-xs" color="secondary">Office Hours: Tue/Thu 2-4pm</Text>
                        </div>
                        <div className="flex gap-1">
                          <ProfileAction actionType="follow" size="xs" />
                          <ProfileAction actionType="bookmark" size="xs" />
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div>
                          <Text variant="body-sm" weight="medium">Alex Kim - Teaching Assistant</Text>
                          <Text variant="body-xs" color="secondary">Lab Sessions: Wed 6-8pm</Text>
                        </div>
                        <div className="flex gap-1">
                          <MessageAction size="xs" />
                          <ProfileAction actionType="follow" size="xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Campus Actions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Profile Actions:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Quick profile actions optimized for mobile use while moving around campus:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Social Actions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <MessageAction size="lg" shape="pill" />
                      <ConnectAction size="lg" shape="pill" />
                      <ShareAction size="lg" shape="pill" iconOnly />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Large, thumb-friendly actions for quick interaction between classes
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Management:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ProfileAction actionType="notifications" badge={5} size="lg" />
                      <SettingsAction size="lg" iconOnly />
                      <ProfileAction actionType="privacy" size="lg" iconOnly />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Check notifications, access settings, manage privacy on the go
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Event Profile Actions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event & Organization Profile Actions:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  UB Engineering Society Profile
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="body-md" weight="medium">UB Engineering Society</Text>
                      <Text variant="body-sm" color="secondary">Student Organization • 450 members</Text>
                    </div>
                    <div className="flex gap-2">
                      <ProfileAction actionType="follow" variant="primary" size="sm" />
                      <ProfileAction actionType="notifications" badge={3} size="sm" />
                      <ShareAction size="sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Text variant="body-sm" color="secondary">Recent Activity:</Text>
                    <div className="flex gap-2">
                      <ProfileAction actionType="bookmark" size="xs" label="Save Event" />
                      <ProfileAction actionType="download" size="xs" label="Download Resources" />
                      <ProfileAction actionType="copy" size="xs" label="Share Link" />
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
    actionType: 'edit',
    variant: 'secondary',
    size: 'md',
    shape: 'rounded',
    iconOnly: false,
    loading: false,
    disabled: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Action Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different profile action configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileAction {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive profile action testing for University at Buffalo campus social interactions
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};