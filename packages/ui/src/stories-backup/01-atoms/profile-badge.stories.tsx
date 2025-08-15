import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileBadge, 
  BuilderBadge, 
  VerifiedBadge, 
  LeaderBadge, 
  GhostBadge, 
  StreakBadge, 
  AchievementBadge,
  BADGE_TYPES 
} from '../../atomic/atoms/profile-badge';
import { 
  Crown, 
  Shield, 
  Star, 
  Award, 
  Zap, 
  Users, 
  BookOpen, 
  Trophy, 
  Heart, 
  Flame,
  Clock,
  Target,
  Coffee,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileBadge> = {
  title: '01-Atoms/Profile Badge',
  component: ProfileBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile badge component for displaying achievements, status, and recognition with various themes and interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge size',
    },
    variant: {
      control: 'select',
      options: ['builder', 'verified', 'leader', 'ghost', 'achievement', 'streak', 'academic', 'social', 'default'],
      description: 'Badge visual variant',
    },
    type: {
      control: 'select',
      options: ['builder', 'verified', 'leader', 'ghost', 'achievement', 'streak', 'academic', 'social'],
      description: 'Predefined badge type',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    pulsing: {
      control: 'boolean',
      description: 'Pulsing animation',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show badge icon',
    },
    showValue: {
      control: 'boolean',
      description: 'Show badge value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Student',
    icon: BookOpen,
  },
};

export const Builder: Story = {
  args: {
    type: 'builder',
  },
};

export const Verified: Story = {
  args: {
    type: 'verified',
  },
};

export const WithValue: Story = {
  args: {
    type: 'streak',
    value: 15,
    showValue: true,
  },
};

export const Interactive: Story = {
  args: {
    type: 'achievement',
    interactive: true,
    value: 8,
    showValue: true,
  },
};

export const Pulsing: Story = {
  args: {
    type: 'leader',
    pulsing: true,
  },
};

// All predefined types
export const AllBadgeTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {Object.entries(BADGE_TYPES).map(([key, config]) => (
        <ProfileBadge
          key={key}
          type={key as any}
          interactive
        />
      ))}
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <ProfileBadge size="xs" type="builder" />
      <ProfileBadge size="sm" type="verified" />
      <ProfileBadge size="md" type="leader" />
      <ProfileBadge size="lg" type="achievement" />
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <ProfileBadge variant="builder" label="Builder" icon={Crown} />
      <ProfileBadge variant="verified" label="Verified" icon={Shield} />
      <ProfileBadge variant="leader" label="Leader" icon={Star} />
      <ProfileBadge variant="ghost" label="Ghost" icon={Users} />
      <ProfileBadge variant="achievement" label="Achiever" icon={Award} />
      <ProfileBadge variant="streak" label="Streak" icon={Zap} />
      <ProfileBadge variant="academic" label="Scholar" icon={BookOpen} />
      <ProfileBadge variant="social" label="Social" icon={Users} />
      <ProfileBadge variant="default" label="Default" icon={Target} />
    </div>
  ),
};

// Campus profile badge scenarios
export const CampusProfileBadgeScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Showcase</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-hive-background-primary">AR</span>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-hive-text-primary">Alex Rodriguez</h4>
              <p className="text-hive-text-secondary mb-2">Computer Science Junior • Class of 2025</p>
              <div className="flex flex-wrap gap-2">
                <VerifiedBadge />
                <BuilderBadge />
                <LeaderBadge />
                <ProfileBadge
                  variant="academic"
                  label="Dean's List"
                  icon={Trophy}
                  interactive
                />
                <StreakBadge value={47} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Academic Achievements</h5>
              <div className="flex flex-wrap gap-2">
                <ProfileBadge
                  variant="academic"
                  label="3.9 GPA"
                  icon={BookOpen}
                  size="sm"
                />
                <ProfileBadge
                  variant="achievement"
                  label="Honor Roll"
                  icon={Award}
                  size="sm"
                />
                <ProfileBadge
                  variant="academic"
                  label="Top 5%"
                  icon={Star}
                  size="sm"
                />
                <ProfileBadge
                  variant="streak"
                  label="Perfect Attendance"
                  icon={Calendar}
                  size="sm"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Community Recognition</h5>
              <div className="flex flex-wrap gap-2">
                <ProfileBadge
                  variant="social"
                  label="Most Helpful"
                  icon={Heart}
                  size="sm"
                />
                <ProfileBadge
                  variant="leader"
                  label="Group Leader"
                  icon={Users}
                  size="sm"
                />
                <ProfileBadge
                  variant="achievement"
                  label="Mentor"
                  icon={Target}
                  size="sm"
                />
                <ProfileBadge
                  variant="social"
                  label="Active Member"
                  icon={Zap}
                  size="sm"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Tool Building</h5>
              <div className="flex flex-wrap gap-2">
                <ProfileBadge
                  variant="builder"
                  label="8 Tools Published"
                  icon={Crown}
                  size="sm"
                  value={8}
                  showValue
                />
                <ProfileBadge
                  variant="achievement"
                  label="Top Creator"
                  icon={Trophy}
                  size="sm"
                />
                <ProfileBadge
                  variant="streak"
                  label="Daily Builder"
                  icon={Flame}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Leadership Board</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-4">
            {[
              { 
                name: 'Sarah Chen', 
                role: 'CS 101 Lead', 
                badges: [
                  { type: 'leader' as const },
                  { type: 'verified' as const },
                  { variant: 'academic' as const, label: '4.0 GPA', icon: Star },
                  { type: 'streak', value: 23 }
                ]
              },
              { 
                name: 'Marcus Johnson', 
                role: 'Math Tutor', 
                badges: [
                  { type: 'achievement' as const },
                  { type: 'verified' as const },
                  { variant: 'social' as const, label: 'Helper', icon: Heart },
                  { variant: 'streak' as const, label: 'Daily', icon: Clock }
                ]
              },
              { 
                name: 'Emma Davis', 
                role: 'Physics Group', 
                badges: [
                  { type: 'leader' as const },
                  { type: 'builder' as const },
                  { variant: 'achievement' as const, label: 'Innovator', icon: Zap },
                  { type: 'streak', value: 15 }
                ]
              },
              { 
                name: 'David Park', 
                role: 'Chemistry Lab', 
                badges: [
                  { type: 'verified' as const },
                  { variant: 'academic' as const, label: 'Scholar', icon: BookOpen },
                  { variant: 'social' as const, label: 'Mentor', icon: Users }
                ]
              }
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-hive-background-tertiary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hive-emerald rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">{student.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-hive-text-primary">{student.name}</h4>
                    <p className="text-sm text-hive-text-secondary">{student.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {student.badges.map((badge, badgeIndex) => (
                    <ProfileBadge
                      key={badgeIndex}
                      size="xs"
                      interactive
                      {...badge}
                      showValue={badge.value !== undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Creator Showcase</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Featured Tools & Creators</h4>
            <p className="text-hive-text-secondary">Top-performing tools and their creators' achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tool: 'GPA Calculator Pro',
                creator: 'Alex Rodriguez',
                users: '2.8k',
                rating: 4.9,
                badges: [
                  { type: 'builder' as const },
                  { type: 'verified' as const },
                  { variant: 'achievement' as const, label: 'Top Tool', icon: Trophy },
                  { variant: 'social' as const, label: '2.8k users', icon: Users, value: 2800, showValue: true }
                ]
              },
              {
                tool: 'Study Schedule Optimizer',
                creator: 'Sarah Chen',
                users: '1.5k',
                rating: 4.7,
                badges: [
                  { type: 'builder' as const },
                  { type: 'leader' as const },
                  { variant: 'streak' as const, label: '30 day streak', icon: Flame },
                  { variant: 'achievement' as const, label: 'Featured Tool', icon: Star }
                ]
              },
              {
                tool: 'Campus Event Tracker',
                creator: 'Emma Davis',
                users: '987',
                rating: 4.8,
                badges: [
                  { type: 'builder' as const },
                  { type: 'verified' as const },
                  { variant: 'social' as const, label: 'Community Fav', icon: Heart },
                  { variant: 'achievement' as const, label: 'Rising Star', icon: Zap }
                ]
              },
              {
                tool: 'Grade Predictor',
                creator: 'Marcus Johnson',
                users: '756',
                rating: 4.6,
                badges: [
                  { type: 'achievement' as const },
                  { type: 'verified' as const },
                  { variant: 'academic' as const, label: 'Math Expert', icon: BookOpen },
                  { variant: 'builder' as const, label: 'New Creator', icon: Crown }
                ]
              }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-hive-background-tertiary rounded-lg">
                <div className="mb-3">
                  <h5 className="font-semibold text-hive-text-primary">{item.tool}</h5>
                  <p className="text-sm text-hive-text-secondary">by {item.creator}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-hive-text-mutedLight">
                    <span>{item.users} users</span>
                    <span>★ {item.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.badges.map((badge, badgeIndex) => (
                    <ProfileBadge
                      key={badgeIndex}
                      size="xs"
                      interactive
                      {...badge}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Achievement Gallery</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Unlockable Campus Achievements</h4>
            <p className="text-hive-text-secondary">Special recognition badges for outstanding contributions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Academic Excellence</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="academic"
                    size="md"
                    label="Summa Cum Laude"
                    icon={Trophy}
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Summa Cum Laude</p>
                    <p className="text-xs text-hive-text-secondary">4.0 GPA for 4 consecutive semesters</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg opacity-60">
                  <ProfileBadge
                    variant="academic"
                    size="md"
                    label="Perfect Score"
                    icon={Star}
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Perfect Score</p>
                    <p className="text-xs text-hive-text-secondary">100% on final exam • Locked</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="streak"
                    size="md"
                    label="Never Miss"
                    icon={Calendar}
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Never Miss</p>
                    <p className="text-xs text-hive-text-secondary">Perfect attendance all semester</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Community Impact</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="social"
                    size="md"
                    label="Super Helper"
                    icon={Heart}
                    pulsing
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Super Helper</p>
                    <p className="text-xs text-hive-text-secondary">Helped 100+ students this semester</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="leader"
                    size="md"
                    label="Group Founder"
                    icon={Crown}
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Group Founder</p>
                    <p className="text-xs text-hive-text-secondary">Created and led 5+ study groups</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg opacity-60">
                  <ProfileBadge
                    variant="social"
                    size="md"
                    label="Campus Legend"
                    icon={Users}
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Campus Legend</p>
                    <p className="text-xs text-hive-text-secondary">Known by 500+ students • Locked</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Builder Recognition</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="builder"
                    size="md"
                    label="Tool Master"
                    icon={Crown}
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Tool Master</p>
                    <p className="text-xs text-hive-text-secondary">10+ tools with 4.5+ star rating</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="achievement"
                    size="md"
                    label="Viral Creator"
                    icon={Zap}
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Viral Creator</p>
                    <p className="text-xs text-hive-text-secondary">Tool used by 1000+ students</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                  <ProfileBadge
                    variant="streak"
                    size="md"
                    label="Daily Builder"
                    icon={Coffee}
                    pulsing
                    interactive
                  />
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">Daily Builder</p>
                    <p className="text-xs text-hive-text-secondary">30 day building streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive badge examples
export const InteractiveBadgeExamples: Story = {
  render: () => {
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [streakCount, setStreakCount] = useState(15);
    const [achievementCount, setAchievementCount] = useState(8);

    const toggleBadge = (badgeId: string) => {
      setSelectedBadges(prev => 
        prev.includes(badgeId) 
          ? prev.filter(id => id !== badgeId)
          : [...prev, badgeId]
      );
    };

    const incrementStreak = () => setStreakCount(prev => prev + 1);
    const incrementAchievements = () => setAchievementCount(prev => prev + 1);

    return (
      <div className="space-y-8 p-6 max-w-4xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Badge Collection</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <p className="text-sm text-hive-text-secondary mb-4">Click badges to toggle selection:</p>
            <div className="flex flex-wrap gap-3 mb-4">
              {Object.entries(BADGE_TYPES).map(([key, config]) => (
                <ProfileBadge
                  key={key}
                  type={key as any}
                  interactive
                  variant={selectedBadges.includes(key) ? config.variant : 'default'}
                  onClick={() => toggleBadge(key)}
                />
              ))}
            </div>
            <p className="text-sm text-hive-text-secondary">
              Selected: {selectedBadges.length} badge{selectedBadges.length !== 1 ? 's' : ''}
              {selectedBadges.length > 0 && ` (${selectedBadges.join(', ')})`}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Dynamic Value Badges</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <StreakBadge 
                value={streakCount} 
                size="md" 
                interactive 
                onClick={incrementStreak}
              />
              <AchievementBadge 
                value={achievementCount} 
                size="md" 
                interactive 
                onClick={incrementAchievements}
              />
              <ProfileBadge
                variant="social"
                label={`${selectedBadges.length} Active`}
                icon={Users}
                size="md"
                value={selectedBadges.length}
                showValue
                interactive
              />
            </div>
            <div className="space-x-2">
              <button 
                onClick={incrementStreak}
                className="px-3 py-1.5 text-sm bg-hive-gold text-hive-background-primary rounded hover:bg-hive-gold/90 transition-colors"
              >
                +1 Streak Day
              </button>
              <button 
                onClick={incrementAchievements}
                className="px-3 py-1.5 text-sm bg-hive-emerald text-white rounded hover:bg-hive-emerald/90 transition-colors"
              >
                +1 Achievement
              </button>
              <button 
                onClick={() => {
                  setStreakCount(15);
                  setAchievementCount(8);
                  setSelectedBadges([]);
                }}
                className="px-3 py-1.5 text-sm border border-hive-border-default text-hive-text-primary rounded hover:bg-hive-interactive-hover transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Preset Badge Components</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <BuilderBadge size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">BuilderBadge</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <VerifiedBadge size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">VerifiedBadge</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <LeaderBadge size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">LeaderBadge</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <GhostBadge size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">GhostBadge</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <StreakBadge value={25} size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">StreakBadge</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <AchievementBadge value={12} size="md" interactive />
                <p className="text-xs text-hive-text-secondary mt-2">AchievementBadge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Badge - Use controls to customize →',
    icon: Crown,
    type: 'builder',
    size: 'md',
    variant: 'builder',
    interactive: false,
    pulsing: false,
    showIcon: true,
    showValue: false,
    value: 10,
  },
};