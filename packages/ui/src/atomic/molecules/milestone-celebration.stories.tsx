import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MilestoneCelebration } from './milestone-celebration';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof MilestoneCelebration> = {
  title: '02-Molecules/Milestone Celebration - COMPLETE DEFINITION',
  component: MilestoneCelebration,
  parameters: {
    docs: {
      description: {
        component: `
## 🏆 HIVE Milestone Celebration - Complete Molecule Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive achievement celebration interface for University at Buffalo HIVE platform student success recognition.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Rarity Levels** - Common, uncommon, rare, epic, legendary for progressive achievement
- **Animated Celebration** - Multi-phase animation with enter, celebrate, and settle states
- **Perfect Icon Integration** - Dynamic icon mapping with animated sparkle effects
- **Community Context** - Social proof with achievement statistics and peer comparison
- **Feature Unlocking** - Visual representation of new platform capabilities gained
- **Sharing Integration** - Built-in social sharing for achievement broadcasting
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and screen reader support
- **Campus Achievement** - Built for University at Buffalo student academic and social milestones

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform achievement recognition:
- **Academic Milestones** - First semester completion, GPA achievements, course mastery
- **Social Achievements** - Study group leadership, community building, peer mentoring
- **Platform Mastery** - Tool creation milestones, space coordination, collaboration leadership
- **Ritual Completion** - Study session streaks, exam preparation achievements, project completion
- **Community Recognition** - Most helpful student, top contributor, collaboration champion
- **Skill Development** - Programming milestones, presentation skills, research achievements
- **Campus Engagement** - Event attendance, organization participation, leadership roles

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large celebration interface with clear action buttons
- **Responsive Animations** - Optimized celebration effects for mobile performance
- **Social Sharing** - Mobile-friendly sharing integration for achievement broadcasting
- **Portrait Orientation** - Perfect celebration display in all mobile orientations
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    milestone: {
      control: 'object',
      description: 'Milestone achievement data',
    },
    isVisible: {
      control: 'boolean',
      description: 'Controls celebration visibility',
    },
    onClose: {
      action: 'closed',
      description: 'Celebration close handler',
    },
    onShare: {
      action: 'shared',
      description: 'Achievement share handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MilestoneCelebration>;

// Default milestone celebration showcase
export const Default: Story = {
  args: {
    milestone: {
      id: 'first-study-group',
      name: 'Study Group Leader',
      description: 'You successfully organized your first CSE 331 study group and helped classmates master algorithm concepts!',
      type: 'community',
      icon: 'users',
      rarity: 'uncommon',
      unlockedFeatures: ['Study Group Analytics', 'Advanced Coordination Tools'],
      communityStats: {
        totalAchievers: 1247,
        percentageComplete: 23.4
      }
    },
    isVisible: true,
    onClose: action('celebration-closed'),
    onShare: action('achievement-shared'),
  },
  render: (args) => (
    <div className="relative h-screen bg-[var(--hive-background-primary)]">
      <Text variant="body-md" color="primary" className="p-6">
        HIVE milestone celebration for University at Buffalo student achievement recognition:
      </Text>
      <MilestoneCelebration {...args} />
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Achievement Rarity Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🏆 ACHIEVEMENT RARITIES</Badge>
            Progressive Milestone Recognition
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 rarity levels for University at Buffalo HIVE platform achievement recognition and student engagement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rarity Progression System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Common Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                          <Text variant="body-xs" color="white">C</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">Profile Setup Complete</Text>
                          <Text variant="body-xs" color="secondary">Complete your UB student profile</Text>
                        </div>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Entry-level achievements for platform onboarding and basic engagement
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Uncommon Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                          <Text variant="body-xs" color="white">U</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">First Study Session</Text>
                          <Text variant="body-xs" color="secondary">Successfully coordinate a study group</Text>
                        </div>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Active participation achievements for community building and collaboration
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Rare Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                          <Text variant="body-xs" color="white">R</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">Algorithm Master</Text>
                          <Text variant="body-xs" color="secondary">Help 10+ students with CSE 331 concepts</Text>
                        </div>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Skill mastery achievements for academic excellence and peer mentoring
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Epic Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center">
                          <Text variant="body-xs" color="white">E</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">Community Builder</Text>
                          <Text variant="body-xs" color="secondary">Create 5 successful campus spaces</Text>
                        </div>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Leadership achievements for significant community impact and platform contribution
                      </Text>
                    </div>
                  </div>

                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Legendary Achievements:</Text>
                  <div className="p-4 bg-gradient-to-r from-[var(--hive-gold)]/10 to-yellow-500/10 rounded-lg border border-[var(--hive-gold)]/20 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--hive-gold)] flex items-center justify-center">
                        <Text variant="body-xs" color="black">L</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Campus Legend</Text>
                        <Text variant="body-xs" color="secondary">Transform campus life through HIVE leadership</Text>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Exceptional achievements for transformative campus impact and platform innovation
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Achievement Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 ACHIEVEMENT TYPES</Badge>
            Milestone Categories
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different types of achievements for comprehensive University at Buffalo student recognition
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Achievement Categories:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-3 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Personal Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Text variant="body-sm" weight="medium" color="primary">Academic Excellence</Text>
                      <Text variant="body-xs" color="secondary">
                        Individual academic milestones: GPA achievements, course completion, skill mastery, research participation
                      </Text>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">First Dean's List</Badge>
                        <Badge variant="secondary" className="text-xs">Research Assistant</Badge>
                        <Badge variant="secondary" className="text-xs">Coding Streak</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Community Achievements:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Text variant="body-sm" weight="medium" color="primary">Social Leadership</Text>
                      <Text variant="body-xs" color="secondary">
                        Community building milestones: space creation, member coordination, peer mentoring, collaboration
                      </Text>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">Space Leader</Badge>
                        <Badge variant="secondary" className="text-xs">Mentor</Badge>
                        <Badge variant="secondary" className="text-xs">Connector</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Ritual Completion:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Text variant="body-sm" weight="medium" color="primary">Consistent Excellence</Text>
                      <Text variant="body-xs" color="secondary">
                        Habit formation milestones: study streaks, event attendance, platform engagement, goal completion
                      </Text>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">30-Day Streak</Badge>
                        <Badge variant="secondary" className="text-xs">Event Regular</Badge>
                        <Badge variant="secondary" className="text-xs">Goal Crusher</Badge>
                      </div>
                    </div>
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
            Real Campus Achievement Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Milestone celebrations in actual University at Buffalo student success and academic achievement contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Milestone Celebrations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Excellence Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 Algorithm Analysis Mastery Achievement
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Semester Excellence:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center">
                          <Text variant="body-xs" color="white">🏆</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">Algorithm Analysis Master</Text>
                          <Text variant="body-xs" color="secondary">Achieved A+ in CSE 331 with perfect attendance</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text variant="body-xs" color="secondary">
                          <strong>Unlocked Features:</strong>
                        </Text>
                        <div className="space-y-1">
                          <Text variant="body-xs" color="secondary">• Advanced Algorithm Study Tools</Text>
                          <Text variant="body-xs" color="secondary">• Peer Tutoring Certification</Text>
                          <Text variant="body-xs" color="secondary">• Research Lab Access</Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research Participation:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                          <Text variant="body-xs" color="white">🔬</Text>
                        </div>
                        <div>
                          <Text variant="body-sm" weight="medium" color="primary">Undergraduate Researcher</Text>
                          <Text variant="body-xs" color="secondary">Joined UB Machine Learning Research Lab</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text variant="body-xs" color="secondary">
                          <strong>Community Impact:</strong> 347 students have achieved this milestone (12.3%)
                        </Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Social Leadership Achievements */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Community Leadership Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Space Leadership:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                        <Text variant="body-xs" color="white">👥</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Community Builder</Text>
                        <Text variant="body-xs" color="secondary">Created Ellicott Complex Study Hub</Text>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Successfully organized residential study space with 50+ active members
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Peer Mentoring:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--hive-gold)] to-yellow-500 flex items-center justify-center">
                        <Text variant="body-xs" color="black">⭐</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Study Partner Champion</Text>
                        <Text variant="body-xs" color="secondary">Helped 25+ students improve grades</Text>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Provided academic support leading to measurable GPA improvements
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tool Innovation:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center">
                        <Text variant="body-xs" color="white">🛠️</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Tool Creator</Text>
                        <Text variant="body-xs" color="secondary">Built viral UB course planner</Text>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Created tool used by 1,000+ UB students for schedule optimization
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Ritual & Habit Formation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Consistency & Habit Recognition:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Streak Achievements:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                        <Text variant="body-xs" color="white">🔥</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Study Streak Legend</Text>
                        <Text variant="body-xs" color="secondary">100 consecutive days of study session attendance</Text>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-xs" color="secondary">
                        <strong>Unlocked:</strong> Priority study room booking, streak protection passes
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        <strong>Rarity:</strong> Only 23 students have achieved this milestone
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Engagement Excellence:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                        <Text variant="body-xs" color="white">🌱</Text>
                      </div>
                      <div>
                        <Text variant="body-sm" weight="medium" color="primary">Campus Connector</Text>
                        <Text variant="body-xs" color="secondary">Attended 50+ campus events via HIVE coordination</Text>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-xs" color="secondary">
                        Exceptional campus engagement through platform-coordinated activities
                      </Text>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Celebration Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Achievement Experience:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized milestone celebrations for on-campus achievement recognition:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Instant Recognition:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Real-Time Achievement Pop-ups</Text>
                    <Text variant="body-xs" color="secondary">
                      Celebrations trigger immediately upon milestone completion while students are active on campus
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Animated Celebration</Badge>
                      <Badge variant="secondary" className="text-xs">Social Sharing</Badge>
                      <Badge variant="secondary" className="text-xs">Feature Unlocks</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Achievement Broadcasting:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Campus Achievement Feed</Text>
                    <Text variant="body-xs" color="secondary">
                      Share achievements with study groups, spaces, and broader UB HIVE community for recognition
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Space Announcements</Badge>
                      <Badge variant="secondary" className="text-xs">Peer Recognition</Badge>
                      <Badge variant="secondary" className="text-xs">Inspiration</Badge>
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
    milestone: {
      id: 'test-achievement',
      name: 'Test Achievement',
      description: 'This is a test milestone celebration for University at Buffalo students.',
      type: 'personal',
      icon: 'trophy',
      rarity: 'rare',
      unlockedFeatures: ['Test Feature 1', 'Test Feature 2'],
      communityStats: {
        totalAchievers: 500,
        percentageComplete: 15.2
      }
    },
    isVisible: true,
    onClose: action('playground-close'),
    onShare: action('playground-share'),
  },
  render: (args) => (
    <div className="relative h-screen bg-[var(--hive-background-primary)]">
      <Card className="m-6">
        <CardHeader>
          <CardTitle>Milestone Celebration Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different achievement celebration configurations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="body-sm" color="secondary">
            Interactive milestone testing for University at Buffalo HIVE platform achievement recognition
          </Text>
        </CardContent>
      </Card>
      <MilestoneCelebration {...args} />
    </div>
  ),
};