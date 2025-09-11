import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileBadge, 
  BuilderBadge, 
  VerifiedBadge, 
  LeaderBadge, 
  GhostBadge, 
  StreakBadge, 
  AchievementBadge,
  BADGE_TYPES,
  type BadgeType 
} from './profile-badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Avatar } from './avatar';
import { 
  Crown, 
  Shield, 
  Star, 
  Award, 
  Zap, 
  Users, 
  BookOpen,
  Eye,
  EyeOff,
  Verified,
  GraduationCap,
  Code,
  Calendar,
  Heart
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileBadge> = {
  title: '01-Atoms/Profile Badge - COMPLETE DEFINITION',
  component: ProfileBadge,
  parameters: {
    docs: {
      description: {
        component: `
## 🏆 HIVE Profile Badge - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive badge system for University at Buffalo student recognition, achievements, and profile status indicators.

### 🎯 **COMPONENT EXCELLENCE**
- **8+ Predefined Badge Types** - Builder, verified, leader, ghost, achievement, streak, academic, social for complete recognition
- **9 Visual Variants** - Builder gold, verified blue, leader secondary, achievement green, streak orange, academic primary, etc.
- **4 Size Options** - XS, SM, MD, LG for flexible interface integration
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Interactive States** - Hover effects, click handling, and pulse animations
- **Value Display** - Numeric values with smart formatting (1.2k for 1200+)
- **Preset Components** - Pre-configured badge components for common campus recognition
- **Accessibility Ready** - Proper tooltips, descriptions, and ARIA compliance
- **Campus Recognition** - Built for University at Buffalo student achievement tracking

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student recognition and achievement tracking:
- **Academic Recognition** - Dean's list, honor roll, academic excellence badges
- **Builder Status** - Tool creators, innovators, platform contributors
- **Leadership Roles** - Student government, organization leaders, club officers
- **Social Engagement** - Active community members, connectors, social coordinators
- **Achievement Tracking** - Milestone completions, streak tracking, goal achievements
- **Privacy Indicators** - Ghost mode, visibility controls, privacy status
- **Verification Status** - Student verification, faculty verification, organization verification

### 📱 **MOBILE OPTIMIZATION**
- **Clear Recognition** - Easily readable badges on small screens
- **Touch Interactions** - Proper spacing and interaction areas
- **Smart Sizing** - Appropriate badge sizes for mobile interface
- **Quick Status** - Instant visual recognition of achievement and status
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(BADGE_TYPES),
      description: 'Predefined badge type',
    },
    variant: {
      control: 'select',
      options: ['builder', 'verified', 'leader', 'ghost', 'achievement', 'streak', 'academic', 'social', 'default'],
      description: 'Badge visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge size',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show badge icon',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric value',
    },
    interactive: {
      control: 'boolean',
      description: 'Interactive hover effects',
    },
    pulsing: {
      control: 'boolean',
      description: 'Pulsing animation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileBadge>;

// Default profile badge showcase
export const Default: Story = {
  args: {
    type: 'builder',
    size: 'sm',
    showIcon: true,
    showValue: false,
    interactive: false,
    pulsing: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Recognition badge for University at Buffalo student achievements:
          </Text>
          <ProfileBadge {...args} />
          <Text variant="body-sm" color="secondary">
            Campus achievement and status recognition badge system
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
      
      {/* Badge Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🏆 BADGE TYPES</Badge>
            Predefined Recognition Badges
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8+ predefined badge types for comprehensive University at Buffalo student recognition and achievement tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Recognition Types:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Platform Recognition:</Text>
                  <div className="flex flex-wrap gap-3">
                    <BuilderBadge />
                    <VerifiedBadge />
                    <LeaderBadge />
                    <GhostBadge />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Achievement Tracking:</Text>
                  <div className="flex flex-wrap gap-3">
                    <AchievementBadge value={12} />
                    <StreakBadge value={7} />
                    <ProfileBadge type="academic" />
                    <ProfileBadge type="social" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Badges:</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge icon={GraduationCap} label="Dean's List" variant="achievement" />
                    <ProfileBadge icon={Code} label="Developer" variant="builder" />
                    <ProfileBadge icon={Calendar} label="Event Organizer" variant="leader" />
                    <ProfileBadge icon={Heart} label="Community Helper" variant="social" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Badge Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Badge Visual Variants
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            9 visual variants for clear recognition hierarchy and achievement categorization
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Builder (Gold):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="builder" />
                    <ProfileBadge type="builder" size="md" />
                    <ProfileBadge type="builder" size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Verified (Blue):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="verified" />
                    <ProfileBadge type="verified" size="md" />
                    <ProfileBadge type="verified" size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Leader (Secondary):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="leader" />
                    <ProfileBadge type="leader" size="md" />
                    <ProfileBadge type="leader" size="lg" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Achievement Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Achievement (Green):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="achievement" />
                    <ProfileBadge type="achievement" value={25} showValue />
                    <AchievementBadge value={5} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Streak (Orange):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="streak" />
                    <ProfileBadge type="streak" value={14} showValue />
                    <StreakBadge value={30} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic (Primary):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="academic" />
                    <ProfileBadge type="academic" size="md" />
                    <ProfileBadge type="academic" size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social (Accent):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="social" />
                    <ProfileBadge type="social" size="md" />
                    <ProfileBadge type="social" size="lg" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Special Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost Mode (Muted):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge type="ghost" />
                    <ProfileBadge type="ghost" size="md" />
                    <ProfileBadge type="ghost" size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Neutral):</Text>
                  <div className="flex flex-wrap gap-3">
                    <ProfileBadge label="Custom Badge" />
                    <ProfileBadge label="Custom Badge" size="md" />
                    <ProfileBadge label="Custom Badge" size="lg" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Badge Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Badge Size Options
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
                    <ProfileBadge type="builder" size="xs" />
                    <ProfileBadge type="verified" size="xs" />
                    <StreakBadge value={5} size="xs" />
                    <Text variant="body-xs" color="secondary">Compact inline badges</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm - default):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileBadge type="builder" size="sm" />
                    <ProfileBadge type="verified" size="sm" />
                    <StreakBadge value={5} size="sm" />
                    <Text variant="body-xs" color="secondary">Standard profile badges</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileBadge type="builder" size="md" />
                    <ProfileBadge type="verified" size="md" />
                    <StreakBadge value={5} size="md" />
                    <Text variant="body-xs" color="secondary">Prominent achievement display</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="flex items-center gap-3">
                    <ProfileBadge type="builder" size="lg" />
                    <ProfileBadge type="verified" size="lg" />
                    <StreakBadge value={5} size="lg" />
                    <Text variant="body-xs" color="secondary">Hero section recognition</Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE FEATURES</Badge>
            Badge Interaction and Animation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive states, animations, and value display features
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Hover Effects:</Text>
                  <div className="flex gap-3">
                    <ProfileBadge type="builder" interactive />
                    <ProfileBadge type="verified" interactive />
                    <ProfileBadge type="achievement" interactive />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Pulsing Animation:</Text>
                  <div className="flex gap-3">
                    <ProfileBadge type="builder" pulsing />
                    <ProfileBadge type="streak" pulsing />
                    <ProfileBadge type="achievement" pulsing />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Value Display:</Text>
                  <div className="flex gap-3">
                    <StreakBadge value={42} />
                    <AchievementBadge value={156} />
                    <ProfileBadge type="social" value={1250} showValue label="Connections" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Customization:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Without Icons:</Text>
                  <div className="flex gap-3">
                    <ProfileBadge type="builder" showIcon={false} />
                    <ProfileBadge type="verified" showIcon={false} />
                    <ProfileBadge type="achievement" showIcon={false} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Icons:</Text>
                  <div className="flex gap-3">
                    <ProfileBadge icon={GraduationCap} label="Honor Roll" variant="achievement" />
                    <ProfileBadge icon={Code} label="Developer" variant="builder" />
                    <ProfileBadge icon={Calendar} label="Event Host" variant="leader" />
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
            Real Campus Badge Recognition Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Badge usage in actual University at Buffalo student achievement tracking and recognition contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Achievement Badges */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Achievement Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Academic Excellence Recognition
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Honors:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex gap-2">
                        <ProfileBadge icon={GraduationCap} label="Dean's List" variant="achievement" />
                        <ProfileBadge icon={Star} label="Magna Cum Laude" variant="achievement" />
                        <ProfileBadge icon={Award} label="Honor Roll" variant="achievement" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Semester and cumulative academic achievement recognition for UB students
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Department Recognition:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex gap-2">
                        <ProfileBadge icon={Code} label="CS Outstanding" variant="academic" />
                        <ProfileBadge icon={BookOpen} label="Engineering Scholar" variant="academic" />
                        <ProfileBadge icon={Crown} label="Research Excellence" variant="academic" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        School of Engineering and Applied Sciences department-specific recognition
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Student Leadership Badges */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Leadership & Engagement:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Government:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ProfileBadge type="leader" />
                      <ProfileBadge icon={Users} label="Senator" variant="leader" />
                      <ProfileBadge icon={Crown} label="President" variant="leader" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Student Association leadership positions and elected roles
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Organization Leadership:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ProfileBadge icon={Users} label="Club President" variant="leader" />
                      <ProfileBadge icon={Calendar} label="Event Coordinator" variant="social" />
                      <ProfileBadge icon={BookOpen} label="Study Group Leader" variant="academic" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      UB student organization leadership roles and coordination positions
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Engagement:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex gap-2">
                      <ProfileBadge type="social" />
                      <StreakBadge value={45} />
                      <AchievementBadge value={8} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Active campus community participation and engagement tracking
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* HIVE Platform Badges */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">HIVE Platform Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Platform Contribution & Verification
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Builder Recognition:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/32/32" alt="Alex Chen" name="Alex Chen" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Alex Chen - CSE Senior</Text>
                            <Text variant="body-xs" color="secondary">Created 15 study tools</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <BuilderBadge />
                          <VerifiedBadge />
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/32/32" alt="Maria Rodriguez" name="Maria Rodriguez" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Maria Rodriguez - Engineering</Text>
                            <Text variant="body-xs" color="secondary">Active tool creator</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <BuilderBadge />
                          <AchievementBadge value={23} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Verification & Privacy:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/32/32" alt="Jordan Kim" name="Jordan Kim" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Jordan Kim - Pre-Med</Text>
                            <Text variant="body-xs" color="secondary">Verified UB student</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <VerifiedBadge />
                          <ProfileBadge type="academic" />
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/32/32" alt="Sam Taylor" name="Sam Taylor" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Sam Taylor - Business</Text>
                            <Text variant="body-xs" color="secondary">Privacy mode enabled</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <GhostBadge />
                          <VerifiedBadge />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Course Space Achievement Tracking */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Space Achievement Tracking:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis Achievement Tracking
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Student Progress & Recognition:</Text>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/24/24" alt="Lisa Wang" name="Lisa Wang" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Lisa Wang</Text>
                            <Text variant="body-xs" color="secondary">Top performer this week</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <StreakBadge value={12} size="xs" />
                          <AchievementBadge value={5} size="xs" />
                          <ProfileBadge icon={Star} label="Top Student" variant="achievement" size="xs" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/24/24" alt="Mike Johnson" name="Mike Johnson" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Mike Johnson</Text>
                            <Text variant="body-xs" color="secondary">Consistent study partner</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <StreakBadge value={8} size="xs" />
                          <ProfileBadge type="social" size="xs" />
                          <ProfileBadge icon={Users} label="Helper" variant="social" size="xs" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar src="/api/placeholder/24/24" alt="Emma Davis" name="Emma Davis" size="xs" />
                          <div>
                            <Text variant="body-sm" weight="medium">Emma Davis</Text>
                            <Text variant="body-xs" color="secondary">Study group leader</Text>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <ProfileBadge type="leader" size="xs" />
                          <ProfileBadge icon={BookOpen} label="Tutor" variant="academic" size="xs" />
                          <AchievementBadge value={3} size="xs" />
                        </div>
                      </div>
                    </div>

                  </div>
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="secondary">
                      Real-time achievement tracking for course participation, study consistency, and peer collaboration
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Badge Display */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Badge Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Optimized badge display for mobile campus interaction and quick recognition:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Header Recognition:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar src="/api/placeholder/40/40" alt="Student Profile" name="Taylor Kim" size="sm" />
                      <div className="flex-1">
                        <Text variant="body-sm" weight="medium">Taylor Kim</Text>
                        <Text variant="body-xs" color="secondary">Computer Science • Junior</Text>
                      </div>
                      <div className="flex gap-1">
                        <BuilderBadge size="xs" />
                        <VerifiedBadge size="xs" />
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Quick recognition badges in mobile profile headers
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Achievement Notifications:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AchievementBadge value={10} size="sm" pulsing />
                        <Text variant="body-sm">10 achievements unlocked!</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <StreakBadge value={21} size="sm" pulsing />
                        <Text variant="body-sm">21 day study streak!</Text>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Animated achievement notifications for milestone celebrations
                    </Text>
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
    type: 'builder',
    size: 'sm',
    showIcon: true,
    showValue: false,
    interactive: false,
    pulsing: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Badge Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different badge configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileBadge {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive badge testing for University at Buffalo campus recognition and achievement tracking
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};