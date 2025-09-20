import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStatistic } from './profile-statistic';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  BookOpen,
  Calendar,
  Trophy,
  Target,
  Clock,
  Heart,
  Share2,
  Download,
  Upload,
  Star,
  Award,
  Zap,
  Code,
  GraduationCap,
  MapPin,
  Coffee,
  Building,
  Wifi
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileStatistic> = {
  title: '01-Atoms/Profile Statistic - COMPLETE DEFINITION',
  component: ProfileStatistic,
  parameters: {
    docs: {
      description: {
        component: `
## 📊 HIVE Profile Statistic - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive statistic display system for University at Buffalo student metrics, achievements, and activity tracking.

### 🎯 **COMPONENT EXCELLENCE**
- **Flexible Value Display** - Support for text, numbers, formatted values (1.2k, 5.6M) for comprehensive data representation
- **4 Visual Variants** - Default, ghost, highlight, compact for different interface contexts
- **4 Size Options** - XS, SM, MD, LG for scalable interface integration
- **Trend Tracking** - Up, down, neutral indicators with color-coded visual feedback
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Interactive States** - Click handling, hover effects, and accessibility compliance
- **Icon Integration** - Custom icons with 6 color variants for visual categorization
- **Loading States** - Built-in skeleton loading with size-appropriate animations
- **Campus Analytics** - Built for University at Buffalo student activity and achievement tracking

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student analytics and achievement tracking:
- **Academic Performance** - GPA tracking, credit hours, semester progress, course completion
- **Social Engagement** - Connection counts, space memberships, event participation, collaboration metrics
- **Campus Activity** - Study session tracking, library visits, tool usage, platform engagement
- **Achievement Progress** - Badge counts, streak tracking, milestone completion, recognition metrics
- **Course Analytics** - Assignment submissions, participation rates, study group activity
- **Organization Metrics** - Leadership positions, event organization, community building statistics

### 📱 **MOBILE OPTIMIZATION**
- **Clear Data Display** - Easy reading of statistics on small screens
- **Touch Interactions** - Proper spacing and interaction areas for mobile
- **Visual Hierarchy** - Clear emphasis on important metrics
- **Trend Recognition** - Immediate visual understanding of progress and changes
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Statistic value (number or string)',
    },
    label: {
      control: 'text',
      description: 'Statistic label',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'highlight', 'compact'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Statistic size',
    },
    emphasis: {
      control: 'select',
      options: ['normal', 'gold', 'secondary'],
      description: 'Value emphasis color',
    },
    showTrend: {
      control: 'boolean',
      description: 'Show trend indicator',
    },
    interactive: {
      control: 'boolean',
      description: 'Interactive hover effects',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileStatistic>;

// Default profile statistic showcase
export const Default: Story = {
  args: {
    value: 42,
    label: 'Study Sessions',
    size: 'md',
    variant: 'default',
    emphasis: 'normal',
    showTrend: false,
    interactive: false,
    loading: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Student statistic display for University at Buffalo activity tracking:
          </Text>
          <ProfileStatistic {...args} />
          <Text variant="body-sm" color="secondary">
            Campus engagement and achievement metric display
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
      
      {/* Basic Statistic Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📊 STATISTIC TYPES</Badge>
            Profile Statistic Display Variants
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive statistic display system for University at Buffalo student metrics and achievement tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Card Style):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={156} label="Connections" icon={Users} iconColor="gold" variant="default" />
                    <ProfileStatistic value="3.8" label="GPA" icon={GraduationCap} iconColor="success" variant="default" />
                    <ProfileStatistic value={23} label="Tools Created" icon={Code} iconColor="secondary" variant="default" />
                    <ProfileStatistic value="12.5k" label="Study Hours" icon={Clock} iconColor="gold" variant="default" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Highlight (Emphasized):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={1250} label="HIVE Points" icon={Star} iconColor="gold" variant="highlight" emphasis="gold" />
                    <ProfileStatistic value={8} label="Leadership Roles" icon={Trophy} iconColor="success" variant="highlight" emphasis="secondary" />
                    <ProfileStatistic value={45} label="Day Streak" icon={Zap} iconColor="warning" variant="highlight" />
                    <ProfileStatistic value={95} label="Attendance %" icon={Target} iconColor="success" variant="highlight" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Compact (Space Efficient):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <ProfileStatistic value={42} label="Events" variant="compact" size="sm" />
                    <ProfileStatistic value={18} label="Spaces" variant="compact" size="sm" />
                    <ProfileStatistic value={156} label="Posts" variant="compact" size="sm" />
                    <ProfileStatistic value={89} label="Tools" variant="compact" size="sm" />
                    <ProfileStatistic value="4.2k" label="Views" variant="compact" size="sm" />
                    <ProfileStatistic value={234} label="Likes" variant="compact" size="sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Minimal):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={34} label="Followers" variant="ghost" />
                    <ProfileStatistic value={67} label="Following" variant="ghost" />
                    <ProfileStatistic value={12} label="Groups" variant="ghost" />
                    <ProfileStatistic value={5} label="Projects" variant="ghost" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Trend Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📈 TREND TRACKING</Badge>
            Progress and Change Indicators
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Visual trend indicators for tracking progress, changes, and performance over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Trending Statistics:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Positive Trends (Up):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic 
                      value="3.8" 
                      label="GPA" 
                      icon={GraduationCap} 
                      iconColor="success"
                      showTrend 
                      change={12} 
                      changeLabel="+0.2 this semester"
                    />
                    <ProfileStatistic 
                      value={156} 
                      label="Connections" 
                      icon={Users} 
                      iconColor="gold"
                      showTrend 
                      change={24} 
                      changeLabel="+24 this month"
                    />
                    <ProfileStatistic 
                      value={89} 
                      label="Study Hours" 
                      icon={Clock} 
                      iconColor="secondary"
                      showTrend 
                      change={15} 
                      changeLabel="+15 this week"
                    />
                    <ProfileStatistic 
                      value={23} 
                      label="Tools Created" 
                      icon={Code} 
                      iconColor="gold"
                      showTrend 
                      change={3} 
                      changeLabel="+3 this month"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Negative Trends (Down):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic 
                      value={67} 
                      label="Missed Classes" 
                      icon={Calendar} 
                      iconColor="error"
                      showTrend 
                      change={-8} 
                      changeLabel="-8 this month"
                    />
                    <ProfileStatistic 
                      value={234} 
                      label="Procrastination" 
                      icon={Clock} 
                      iconColor="warning"
                      showTrend 
                      change={-45} 
                      changeLabel="-45 min/day"
                    />
                    <ProfileStatistic 
                      value={12} 
                      label="Late Submissions" 
                      icon={Upload} 
                      iconColor="error"
                      showTrend 
                      change={-5} 
                      changeLabel="-5 this semester"
                    />
                    <ProfileStatistic 
                      value={3} 
                      label="Missed Deadlines" 
                      icon={Target} 
                      iconColor="error"
                      showTrend 
                      change={-2} 
                      changeLabel="-2 this month"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Neutral Trends (Stable):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic 
                      value={45} 
                      label="Library Visits" 
                      icon={BookOpen} 
                      iconColor="default"
                      showTrend 
                      change={0} 
                      changeLabel="Consistent"
                    />
                    <ProfileStatistic 
                      value={89} 
                      label="Attendance %" 
                      icon={Target} 
                      iconColor="success"
                      showTrend 
                      change={0} 
                      changeLabel="Steady"
                    />
                    <ProfileStatistic 
                      value={12} 
                      label="Study Groups" 
                      icon={Users} 
                      iconColor="secondary"
                      showTrend 
                      change={0} 
                      changeLabel="Maintained"
                    />
                    <ProfileStatistic 
                      value={156} 
                      label="Course Load" 
                      icon={BookOpen} 
                      iconColor="default"
                      showTrend 
                      change={0} 
                      changeLabel="Stable"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Statistic Size Options
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
                  <div className="flex gap-3">
                    <ProfileStatistic value={42} label="Events" size="xs" />
                    <ProfileStatistic value="3.8" label="GPA" size="xs" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="xs" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Compact dashboard widgets and inline metrics</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="sm" />
                    <ProfileStatistic value="3.8" label="GPA" size="sm" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="sm" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Sidebar statistics and card components</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="md" />
                    <ProfileStatistic value="3.8" label="GPA" size="md" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="md" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Standard profile statistics and main dashboard</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="lg" />
                    <ProfileStatistic value="3.8" label="GPA" size="lg" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="lg" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Hero sections and prominent achievement displays</Text>
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
            Statistic Interaction and Emphasis
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive states, emphasis colors, loading states, and icon customization
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Clickable Statistics:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic 
                      value={156} 
                      label="View Connections" 
                      icon={Users} 
                      interactive 
                      onClick={() => alert('Navigate to connections')}
                    />
                    <ProfileStatistic 
                      value={23} 
                      label="View Tools" 
                      icon={Code} 
                      interactive 
                      onClick={() => alert('Navigate to tools')}
                    />
                    <ProfileStatistic 
                      value={89} 
                      label="View Calendar" 
                      icon={Calendar} 
                      interactive 
                      onClick={() => alert('Navigate to calendar')}
                    />
                    <ProfileStatistic 
                      value={12} 
                      label="View Achievements" 
                      icon={Trophy} 
                      interactive 
                      onClick={() => alert('Navigate to achievements')}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading States:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={0} label="Loading..." loading size="xs" />
                    <ProfileStatistic value={0} label="Loading..." loading size="sm" />
                    <ProfileStatistic value={0} label="Loading..." loading size="md" />
                    <ProfileStatistic value={0} label="Loading..." loading size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Emphasis Colors:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <ProfileStatistic 
                      value={1250} 
                      label="HIVE Points" 
                      icon={Star} 
                      emphasis="gold" 
                      variant="highlight"
                    />
                    <ProfileStatistic 
                      value={8} 
                      label="Leadership Roles" 
                      icon={Trophy} 
                      emphasis="secondary" 
                      variant="highlight"
                    />
                    <ProfileStatistic 
                      value={156} 
                      label="Standard Metric" 
                      icon={Target} 
                      emphasis="normal"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Customization:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Color Variants:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <ProfileStatistic value={42} label="Default" icon={Target} iconColor="default" size="sm" />
                    <ProfileStatistic value={42} label="Gold" icon={Star} iconColor="gold" size="sm" />
                    <ProfileStatistic value={42} label="Secondary" icon={Code} iconColor="secondary" size="sm" />
                    <ProfileStatistic value={42} label="Success" icon={Trophy} iconColor="success" size="sm" />
                    <ProfileStatistic value={42} label="Warning" icon={Zap} iconColor="warning" size="sm" />
                    <ProfileStatistic value={42} label="Error" icon={Target} iconColor="error" size="sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Icons:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={89} label="Coffee Breaks" icon={Coffee} iconColor="warning" />
                    <ProfileStatistic value={156} label="WiFi Sessions" icon={Wifi} iconColor="secondary" />
                    <ProfileStatistic value={23} label="Building Visits" icon={Building} iconColor="default" />
                    <ProfileStatistic value={67} label="Campus Events" icon={MapPin} iconColor="gold" />
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
            Real Campus Student Analytics Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile statistics in actual University at Buffalo student academic and social engagement contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Performance Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Performance Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - Computer Science Senior
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Metrics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic 
                          value="3.87" 
                          label="Cumulative GPA" 
                          icon={GraduationCap} 
                          iconColor="success"
                          variant="highlight"
                          emphasis="gold"
                          showTrend 
                          change={5} 
                          changeLabel="+0.12 this semester"
                        />
                        <ProfileStatistic 
                          value={118} 
                          label="Credit Hours" 
                          icon={BookOpen} 
                          iconColor="secondary"
                          showTrend 
                          change={15} 
                          changeLabel="+15 this semester"
                        />
                        <ProfileStatistic 
                          value="92%" 
                          label="Attendance Rate" 
                          icon={Target} 
                          iconColor="success"
                          showTrend 
                          change={3} 
                          changeLabel="+3% this month"
                        />
                        <ProfileStatistic 
                          value={28} 
                          label="Assignments Completed" 
                          icon={Award} 
                          iconColor="gold"
                          showTrend 
                          change={4} 
                          changeLabel="+4 this week"
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Fall 2024 semester progress tracking for School of Engineering and Applied Sciences
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Engagement:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic 
                          value={156} 
                          label="Study Hours" 
                          icon={Clock} 
                          iconColor="secondary"
                          showTrend 
                          change={24} 
                          changeLabel="+24 this month"
                        />
                        <ProfileStatistic 
                          value={67} 
                          label="Library Sessions" 
                          icon={BookOpen} 
                          iconColor="gold"
                          showTrend 
                          change={8} 
                          changeLabel="+8 this month"
                        />
                        <ProfileStatistic 
                          value={23} 
                          label="Study Groups" 
                          icon={Users} 
                          iconColor="secondary"
                          showTrend 
                          change={3} 
                          changeLabel="+3 this semester"
                        />
                        <ProfileStatistic 
                          value={45} 
                          label="Day Streak" 
                          icon={Zap} 
                          iconColor="warning"
                          variant="highlight"
                          emphasis="gold"
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Lockwood Library and campus study space utilization tracking
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Social Engagement Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Engagement Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">HIVE Platform Activity:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic 
                        value={234} 
                        label="Connections" 
                        icon={Users} 
                        iconColor="gold"
                        showTrend 
                        change={18} 
                        changeLabel="+18 this month"
                        interactive
                      />
                      <ProfileStatistic 
                        value={67} 
                        label="Spaces Joined" 
                        icon={Building} 
                        iconColor="secondary"
                        showTrend 
                        change={3} 
                        changeLabel="+3 this semester"
                        interactive
                      />
                      <ProfileStatistic 
                        value={156} 
                        label="Posts Shared" 
                        icon={Share2} 
                        iconColor="default"
                        showTrend 
                        change={12} 
                        changeLabel="+12 this week"
                        interactive
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      HIVE social utility platform engagement metrics
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Events & Organizations:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic 
                        value={23} 
                        label="Events Attended" 
                        icon={Calendar} 
                        iconColor="gold"
                        showTrend 
                        change={5} 
                        changeLabel="+5 this month"
                      />
                      <ProfileStatistic 
                        value={8} 
                        label="Organizations" 
                        icon={Building} 
                        iconColor="secondary"
                        showTrend 
                        change={1} 
                        changeLabel="+1 this semester"
                      />
                      <ProfileStatistic 
                        value={4} 
                        label="Leadership Roles" 
                        icon={Trophy} 
                        iconColor="success"
                        variant="highlight"
                        emphasis="secondary"
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      UB student organization participation and campus event engagement
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tool Building & Creation:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic 
                        value={15} 
                        label="Tools Created" 
                        icon={Code} 
                        iconColor="gold"
                        variant="highlight"
                        emphasis="gold"
                        showTrend 
                        change={3} 
                        changeLabel="+3 this month"
                      />
                      <ProfileStatistic 
                        value="2.4k" 
                        label="Tool Downloads" 
                        icon={Download} 
                        iconColor="success"
                        showTrend 
                        change={456} 
                        changeLabel="+456 this week"
                      />
                      <ProfileStatistic 
                        value={89} 
                        label="Community Likes" 
                        icon={Heart} 
                        iconColor="error"
                        showTrend 
                        change={23} 
                        changeLabel="+23 this week"
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Platform contribution and community impact tracking
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Course Space Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Space Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis Course Engagement
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-3">
                      <Text variant="body-sm" color="gold" weight="medium">Course Performance:</Text>
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic 
                          value="94%" 
                          label="Assignment Score" 
                          icon={Target} 
                          iconColor="success"
                          showTrend 
                          change={8} 
                          changeLabel="+8% this assignment"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value={12} 
                          label="Submissions" 
                          icon={Upload} 
                          iconColor="gold"
                          showTrend 
                          change={1} 
                          changeLabel="On time"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value="87%" 
                          label="Participation" 
                          icon={Users} 
                          iconColor="secondary"
                          showTrend 
                          change={5} 
                          changeLabel="+5% this week"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value={8} 
                          label="Questions Asked" 
                          icon={BookOpen} 
                          iconColor="gold"
                          showTrend 
                          change={3} 
                          changeLabel="+3 this week"
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Text variant="body-sm" color="gold" weight="medium">Collaboration Metrics:</Text>
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic 
                          value={23} 
                          label="Study Partners" 
                          icon={Users} 
                          iconColor="secondary"
                          showTrend 
                          change={4} 
                          changeLabel="+4 this semester"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value={67} 
                          label="Peer Helps" 
                          icon={Heart} 
                          iconColor="success"
                          showTrend 
                          change={12} 
                          changeLabel="+12 this month"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value={34} 
                          label="Resources Shared" 
                          icon={Share2} 
                          iconColor="gold"
                          showTrend 
                          change={6} 
                          changeLabel="+6 this week"
                          size="sm"
                        />
                        <ProfileStatistic 
                          value={15} 
                          label="Group Projects" 
                          icon={Code} 
                          iconColor="secondary"
                          showTrend 
                          change={1} 
                          changeLabel="Current project"
                          size="sm"
                        />
                      </div>
                    </div>

                  </div>
                  
                  <Text variant="body-sm" color="secondary">
                    Real-time analytics for CSE 331 student engagement, performance tracking, and collaborative learning metrics
                  </Text>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Dashboard Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Analytics Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized statistic display for quick campus activity overview:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Overview (Compact):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <ProfileStatistic value={12} label="Today's Events" variant="compact" size="xs" />
                      <ProfileStatistic value="3.8" label="GPA" variant="compact" size="xs" emphasis="gold" />
                      <ProfileStatistic value={45} label="Streak" variant="compact" size="xs" />
                      <ProfileStatistic value={156} label="Connections" variant="compact" size="xs" />
                      <ProfileStatistic value={23} label="Tools" variant="compact" size="xs" />
                      <ProfileStatistic value={67} label="Points" variant="compact" size="xs" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Quick overview panel for mobile dashboard home screen
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Featured Metrics (Highlighted):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-3">
                      <ProfileStatistic 
                        value={1250} 
                        label="HIVE Points" 
                        icon={Star} 
                        iconColor="gold"
                        variant="highlight"
                        emphasis="gold"
                        size="sm"
                        interactive
                      />
                      <ProfileStatistic 
                        value={45} 
                        label="Study Streak" 
                        icon={Zap} 
                        iconColor="warning"
                        variant="highlight"
                        size="sm"
                        showTrend 
                        change={1} 
                        changeLabel="Keep it up!"
                        interactive
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Prominent achievement display for mobile motivation and engagement
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
    value: 156,
    label: 'Study Sessions',
    size: 'md',
    variant: 'default',
    emphasis: 'normal',
    showTrend: false,
    interactive: false,
    loading: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Statistic Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different statistic configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileStatistic {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive statistic testing for University at Buffalo campus analytics and achievement tracking
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};