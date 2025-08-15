import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStatistic } from '../../atomic/atoms/profile-statistic';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Star, 
  Clock, 
  Zap, 
  Calendar, 
  Award,
  TrendingUp,
  Heart,
  MessageCircle,
  Download,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileStatistic> = {
  title: '01-Atoms/Profile Statistic',
  component: ProfileStatistic,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile statistic component for displaying key metrics, achievements, and progress with trend indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Statistic card size',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'highlight', 'compact'],
      description: 'Visual variant',
    },
    emphasis: {
      control: 'select',
      options: ['normal', 'gold', 'secondary'],
      description: 'Value emphasis styling',
    },
    iconColor: {
      control: 'select',
      options: ['default', 'gold', 'secondary', 'success', 'warning', 'error'],
      description: 'Icon color theme',
    },
    trend: {
      control: 'select',
      options: ['none', 'up', 'down', 'neutral'],
      description: 'Trend direction',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    showTrend: {
      control: 'boolean',
      description: 'Show trend indicators',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    value: '3.8',
    label: 'Current GPA',
    icon: GraduationCap,
  },
};

export const WithTrend: Story = {
  args: {
    value: '15',
    label: 'Study Groups',
    icon: Users,
    iconColor: 'success',
    showTrend: true,
    change: 3,
    changeLabel: '+3 this week',
  },
};

export const Highlighted: Story = {
  args: {
    variant: 'highlight',
    emphasis: 'gold',
    value: '8',
    label: 'Tools Published',
    icon: Zap,
    iconColor: 'gold',
  },
};

export const Interactive: Story = {
  args: {
    value: '2,456',
    label: 'Profile Views',
    icon: Eye,
    interactive: true,
    showTrend: true,
    change: 156,
    trend: 'up',
  },
};

export const Loading: Story = {
  args: {
    value: '0',
    label: 'Loading...',
    loading: true,
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <ProfileStatistic
        size="xs"
        value="4.0"
        label="GPA"
        icon={GraduationCap}
        iconColor="gold"
      />
      
      <ProfileStatistic
        size="sm"
        value="12"
        label="Courses"
        icon={BookOpen}
        iconColor="secondary"
      />
      
      <ProfileStatistic
        size="md"
        value="156"
        label="Study Hours"
        icon={Clock}
        iconColor="success"
      />
      
      <ProfileStatistic
        size="lg"
        value="8"
        label="Achievements"
        icon={Trophy}
        iconColor="gold"
      />
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 max-w-2xl">
      <ProfileStatistic
        variant="default"
        value="3.85"
        label="Default Variant"
        icon={Star}
        iconColor="gold"
      />
      
      <ProfileStatistic
        variant="ghost"
        value="24"
        label="Ghost Variant"
        icon={Users}
        iconColor="secondary"
      />
      
      <ProfileStatistic
        variant="highlight"
        value="12"
        label="Highlight Variant"
        icon={Trophy}
        iconColor="gold"
        emphasis="gold"
      />
      
      <ProfileStatistic
        variant="compact"
        value="156"
        label="Compact Variant"
        icon={Target}
        iconColor="success"
      />
    </div>
  ),
};

// Campus profile statistics scenarios
export const CampusProfileScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Academic Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Alex Rodriguez - CS Junior</h4>
            <p className="text-hive-text-secondary">Academic performance and engagement metrics</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProfileStatistic
              variant="highlight"
              emphasis="gold"
              value="3.87"
              label="Cumulative GPA"
              icon={GraduationCap}
              iconColor="gold"
              showTrend
              change={0.12}
              changeLabel="+0.12 this semester"
            />
            
            <ProfileStatistic
              value="89"
              label="Credit Hours"
              icon={BookOpen}
              iconColor="secondary"
              showTrend
              change={15}
              changeLabel="+15 this semester"
            />
            
            <ProfileStatistic
              value="12"
              label="Courses Completed"
              icon={CheckCircle}
              iconColor="success"
              showTrend
              change={4}
              trend="up"
            />
            
            <ProfileStatistic
              value="94%"
              label="Attendance Rate"
              icon={Calendar}
              iconColor="success"
              emphasis="secondary"
            />
          </div>
          
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-4">Community Engagement</h5>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <ProfileStatistic
                size="sm"
                variant="compact"
                value="8"
                label="Tools Built"
                icon={Zap}
                iconColor="gold"
                interactive
              />
              
              <ProfileStatistic
                size="sm"
                variant="compact"
                value="24"
                label="Study Groups"
                icon={Users}
                iconColor="secondary"
                interactive
              />
              
              <ProfileStatistic
                size="sm"
                variant="compact"
                value="156"
                label="Study Hours"
                icon={Clock}
                iconColor="success"
                showTrend
                change={23}
                trend="up"
              />
              
              <ProfileStatistic
                size="sm"
                variant="compact"
                value="1.2k"
                label="Helped Students"
                icon={Heart}
                iconColor="error"
                interactive
              />
              
              <ProfileStatistic
                size="sm"
                variant="compact"
                value="5"
                label="Achievements"
                icon={Award}
                iconColor="gold"
                emphasis="gold"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Performance Analytics</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">GPA Calculator Pro - Analytics</h4>
            <p className="text-hive-text-secondary">Usage statistics and community engagement</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Usage Metrics</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  size="sm"
                  value="2,847"
                  label="Total Users"
                  icon={Users}
                  iconColor="secondary"
                  showTrend
                  change={234}
                  changeLabel="+234 this month"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="12.4k"
                  label="Calculations Run"
                  icon={Target}
                  iconColor="success"
                  showTrend
                  change={1200}
                  trend="up"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="4.8"
                  label="Average Rating"
                  icon={Star}
                  iconColor="gold"
                  emphasis="gold"
                  showTrend
                  change={0.2}
                  changeLabel="+0.2 this week"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Engagement</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  size="sm"
                  value="456"
                  label="Comments"
                  icon={MessageCircle}
                  iconColor="secondary"
                  showTrend
                  change={45}
                  trend="up"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="1,234"
                  label="Likes Received"
                  icon={Heart}
                  iconColor="error"
                  showTrend
                  change={89}
                  trend="up"
                  interactive
                />
                
                <ProfileStatistic
                  size="sm"
                  value="89"
                  label="Shares"
                  icon={TrendingUp}
                  iconColor="success"
                  showTrend
                  change={12}
                  trend="up"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Technical</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  size="sm"
                  value="99.8%"
                  label="Uptime"
                  icon={CheckCircle}
                  iconColor="success"
                  emphasis="secondary"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="1.2s"
                  label="Avg Response"
                  icon={Zap}
                  iconColor="gold"
                  showTrend
                  change={-0.3}
                  changeLabel="-0.3s improved"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="847"
                  label="Downloads"
                  icon={Download}
                  iconColor="secondary"
                  showTrend
                  change={67}
                  trend="up"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Leadership Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">CS 101 Study Group - Leadership Stats</h4>
            <p className="text-hive-text-secondary">Track your group's progress and engagement</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <ProfileStatistic
              variant="highlight"
              value="28"
              label="Active Members"
              icon={Users}
              iconColor="secondary"
              emphasis="secondary"
              showTrend
              change={5}
              changeLabel="+5 this week"
            />
            
            <ProfileStatistic
              value="156"
              label="Study Sessions"
              icon={Calendar}
              iconColor="success"
              showTrend
              change={12}
              trend="up"
            />
            
            <ProfileStatistic
              value="89%"
              label="Attendance Rate"
              icon={CheckCircle}
              iconColor="success"
              emphasis="secondary"
            />
            
            <ProfileStatistic
              value="4.7"
              label="Group Rating"
              icon={Star}
              iconColor="gold"
              emphasis="gold"
              showTrend
              change={0.3}
              trend="up"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Recent Activity</h5>
              <div className="grid grid-cols-2 gap-3">
                <ProfileStatistic
                  size="xs"
                  variant="ghost"
                  value="24"
                  label="Messages Today"
                  icon={MessageCircle}
                  iconColor="secondary"
                />
                
                <ProfileStatistic
                  size="xs"
                  variant="ghost"
                  value="8"
                  label="Files Shared"
                  icon={Download}
                  iconColor="success"
                />
                
                <ProfileStatistic
                  size="xs"
                  variant="ghost"
                  value="3"
                  label="New Members"
                  icon={Users}
                  iconColor="gold"
                />
                
                <ProfileStatistic
                  size="xs"
                  variant="ghost"
                  value="12"
                  label="Questions Asked"
                  icon={BookOpen}
                  iconColor="secondary"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Academic Impact</h5>
              <div className="space-y-2">
                <ProfileStatistic
                  size="sm"
                  variant="compact"
                  value="3.6"
                  label="Group Avg GPA"
                  icon={GraduationCap}
                  iconColor="gold"
                  showTrend
                  change={0.4}
                  changeLabel="+0.4 improvement"
                  interactive
                />
                
                <ProfileStatistic
                  size="sm"
                  variant="compact"
                  value="94%"
                  label="Pass Rate"
                  icon={Trophy}
                  iconColor="success"
                  emphasis="secondary"
                  interactive
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Group Settings
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Schedule Session
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Achievement Showcase</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Personal Milestones</h4>
            <p className="text-hive-text-secondary">Track your academic and community achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Academic Excellence</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  variant="highlight"
                  size="sm"
                  value="Dean's List"
                  label="3 Semesters"
                  icon={Award}
                  iconColor="gold"
                  emphasis="gold"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="4.0"
                  label="Perfect Semester"
                  icon={Star}
                  iconColor="gold"
                  emphasis="gold"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="Top 5%"
                  label="Class Ranking"
                  icon={Trophy}
                  iconColor="gold"
                  emphasis="gold"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Community Impact</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  variant="highlight"
                  size="sm"
                  value="500+"
                  label="Students Helped"
                  icon={Heart}
                  iconColor="error"
                  emphasis="secondary"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="Most Helpful"
                  label="CS Department"
                  icon={Users}
                  iconColor="secondary"
                  emphasis="secondary"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="Top Creator"
                  label="Study Tools"
                  icon={Zap}
                  iconColor="gold"
                  emphasis="gold"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Leadership</h5>
              <div className="space-y-3">
                <ProfileStatistic
                  size="sm"
                  value="5"
                  label="Groups Led"
                  icon={Users}
                  iconColor="secondary"
                  showTrend
                  change={2}
                  trend="up"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="95%"
                  label="Success Rate"
                  icon={Target}
                  iconColor="success"
                  emphasis="secondary"
                />
                
                <ProfileStatistic
                  size="sm"
                  value="4.9"
                  label="Leader Rating"
                  icon={Star}
                  iconColor="gold"
                  emphasis="gold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive statistics
export const InteractiveStatistics: Story = {
  render: () => {
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
    const [refreshCount, setRefreshCount] = useState(0);

    const metrics = [
      { id: 'gpa', value: 3.87, label: 'Current GPA', icon: GraduationCap, color: 'gold' as const, change: 0.12 },
      { id: 'courses', value: 15, label: 'Courses', icon: BookOpen, color: 'secondary' as const, change: 3 },
      { id: 'tools', value: 8, label: 'Tools Built', icon: Zap, color: 'gold' as const, change: 2 },
      { id: 'groups', value: 24, label: 'Study Groups', icon: Users, color: 'secondary' as const, change: -1 },
      { id: 'hours', value: 156, label: 'Study Hours', icon: Clock, color: 'success' as const, change: 23 },
      { id: 'rating', value: 4.8, label: 'Peer Rating', icon: Star, color: 'gold' as const, change: 0.3 },
    ];

    const handleRefresh = () => {
      setRefreshCount(prev => prev + 1);
      setSelectedMetric(null);
    };

    return (
      <div className="space-y-6 p-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Profile Statistics</h3>
          <button 
            onClick={handleRefresh}
            className="px-3 py-1.5 text-sm bg-hive-gold text-hive-background-primary rounded hover:bg-hive-gold/90 transition-colors"
          >
            Refresh Data
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <ProfileStatistic
              key={`${metric.id}-${refreshCount}`}
              value={metric.value}
              label={metric.label}
              icon={metric.icon}
              iconColor={metric.color}
              emphasis={metric.color === 'gold' ? 'gold' : metric.color === 'secondary' ? 'secondary' : 'normal'}
              showTrend
              change={metric.change}
              interactive
              variant={selectedMetric === metric.id ? 'highlight' : 'default'}
              onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
            />
          ))}
        </div>
        
        {selectedMetric && (
          <div className="mt-4 p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary mb-2">
              {metrics.find(m => m.id === selectedMetric)?.label} Details
            </h4>
            <p className="text-sm text-hive-text-secondary">
              You selected {metrics.find(m => m.id === selectedMetric)?.label} with a value of{' '}
              {metrics.find(m => m.id === selectedMetric)?.value}. 
              {metrics.find(m => m.id === selectedMetric)?.change && (
                <span>
                  {' '}This represents a change of{' '}
                  {metrics.find(m => m.id === selectedMetric)!.change > 0 ? '+' : ''}
                  {metrics.find(m => m.id === selectedMetric)?.change} from the previous period.
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    value: '3.8',
    label: 'Interactive Statistic - Use controls to customize →',
    icon: GraduationCap,
    iconColor: 'gold',
    size: 'md',
    variant: 'default',
    emphasis: 'normal',
    interactive: false,
    showTrend: false,
    loading: false,
    change: 0.2,
    changeLabel: '+0.2 this semester',
  },
};