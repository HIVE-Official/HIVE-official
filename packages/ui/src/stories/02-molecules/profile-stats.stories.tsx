import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileStats,
  CompactProfileStats,
  CardProfileStats,
  GridProfileStats,
  StudentProfileStats,
  BuilderProfileStats,
  ActiveUserProfileStats,
  HiveProfileStats
} from '../../atomic/molecules/profile-stats';
import { 
  Users, 
  Zap, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Award, 
  Calendar,
  Target,
  Heart,
  Trophy,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileStats> = {
  title: '02-Molecules/Profile Stats',
  component: ProfileStats,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile statistics molecule component for displaying user metrics and achievements in various layouts and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'grid', 'compact'],
      description: 'Stats layout arrangement',
    },
    columns: {
      control: 'select',
      options: ['auto', '2', '3', '4', '5'],
      description: 'Grid columns (grid layout only)',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'minimal', 'card'],
      description: 'Visual variant',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between stats',
    },
    maxStats: {
      control: 'number',
      description: 'Maximum number of stats to display',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show stat icons',
    },
    showTrends: {
      control: 'boolean',
      description: 'Show trend indicators',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable click interactions',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleStats: HiveProfileStats = {
  spacesJoined: 24,
  spacesActive: 8,
  spacesLed: 3,
  toolsUsed: 12,
  connectionsCount: 156,
  totalActivity: 847,
  currentStreak: 15,
  longestStreak: 42,
  reputation: 2847,
  achievements: 8,
};

const sampleChanges = {
  spacesJoined: 2,
  spacesActive: 1,
  connectionsCount: 12,
  currentStreak: 1,
  reputation: 156,
  totalActivity: 34,
};

// Basic examples
export const Default: Story = {
  args: {
    stats: sampleStats,
    showIcons: true,
    showTrends: false,
    interactive: false,
  },
};

export const WithTrends: Story = {
  args: {
    stats: sampleStats,
    changes: sampleChanges,
    showIcons: true,
    showTrends: true,
    interactive: false,
  },
};

export const Interactive: Story = {
  args: {
    stats: sampleStats,
    changes: sampleChanges,
    showIcons: true,
    showTrends: true,
    interactive: true,
  },
};

export const Loading: Story = {
  args: {
    stats: sampleStats,
    loading: true,
  },
};

// All layouts
export const AllLayouts: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-6xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Horizontal Layout</h4>
        <ProfileStats
          stats={sampleStats}
          layout="horizontal"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Vertical Layout</h4>
        <div className="max-w-md">
          <ProfileStats
            stats={sampleStats}
            layout="vertical"
            showIcons={true}
            showTrends={true}
            changes={sampleChanges}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Grid Layout</h4>
        <ProfileStats
          stats={sampleStats}
          layout="grid"
          columns="4"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Compact Layout</h4>
        <ProfileStats
          stats={sampleStats}
          layout="compact"
          showIcons={false}
          variant="ghost"
          maxStats={6}
        />
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Default Variant</h4>
        <ProfileStats
          stats={sampleStats}
          variant="default"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Ghost Variant</h4>
        <ProfileStats
          stats={sampleStats}
          variant="ghost"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Minimal Variant</h4>
        <ProfileStats
          stats={sampleStats}
          variant="minimal"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Card Variant</h4>
        <ProfileStats
          stats={sampleStats}
          variant="card"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
        />
      </div>
    </div>
  ),
};

// Preset variations
export const PresetVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-5xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Student Profile Stats</h4>
        <StudentProfileStats
          stats={sampleStats}
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
          interactive={true}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Builder Profile Stats</h4>
        <BuilderProfileStats
          stats={sampleStats}
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
          interactive={true}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Active User Profile Stats</h4>
        <ActiveUserProfileStats
          stats={sampleStats}
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
          interactive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-semibold text-hive-text-primary mb-4">Compact Profile Stats</h5>
          <CompactProfileStats
            stats={sampleStats}
            changes={sampleChanges}
            interactive={true}
          />
        </div>
        
        <div>
          <h5 className="font-semibold text-hive-text-primary mb-4">Card Profile Stats</h5>
          <CardProfileStats
            stats={sampleStats}
            showIcons={true}
            showTrends={true}
            changes={sampleChanges}
            maxStats={3}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Grid Profile Stats</h4>
        <GridProfileStats
          stats={sampleStats}
          columns="3"
          showIcons={true}
          showTrends={true}
          changes={sampleChanges}
          maxStats={6}
        />
      </div>
    </div>
  ),
};

// Campus profile stats scenarios
export const CampusProfileStatsScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Dashboard Profile</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-hive-background-primary">AR</span>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-hive-text-primary">Alex Rodriguez</h4>
              <p className="text-hive-text-secondary">Computer Science Junior • Class of 2025</p>
            </div>
          </div>
          
          <StudentProfileStats
            stats={{
              spacesJoined: 24,
              connectionsCount: 156,
              currentStreak: 15,
              reputation: 2847,
              spacesActive: 8,
              achievements: 5,
            }}
            showIcons={true}
            showTrends={true}
            changes={{
              spacesJoined: 2,
              connectionsCount: 12,
              currentStreak: 1,
              reputation: 156,
            }}
            interactive={true}
            layout="grid"
            columns="4"
            onStatClick={(key, value) => alert(`Clicked ${key}: ${value}`)}
          />
          
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-4">Recent Activity Summary</h5>
            <CompactProfileStats
              stats={{
                spacesJoined: 2,
                connectionsCount: 12,
                currentStreak: 7,
                totalActivity: 45,
                spacesActive: 3,
              }}
              priority={['totalActivity', 'spacesActive', 'connectionsCount']}
              interactive={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Profile</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-hive-emerald rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">SC</span>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-hive-text-primary">Sarah Chen</h4>
                <p className="text-hive-text-secondary">Computer Science Senior • Tool Creator</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-hive-gold/20 text-hive-gold text-sm rounded-full font-medium">Builder</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full font-medium">Verified</span>
            </div>
          </div>
          
          <BuilderProfileStats
            stats={{
              toolsUsed: 23,
              spacesLed: 5,
              reputation: 4250,
              totalActivity: 1247,
              spacesJoined: 18,
              achievements: 12,
            }}
            showIcons={true}
            showTrends={true}
            changes={{
              toolsUsed: 3,
              spacesLed: 1,
              reputation: 245,
              totalActivity: 89,
            }}
            interactive={true}
            variant="card"
            onStatClick={(key, value) => alert(`Builder stat clicked - ${key}: ${value}`)}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Top Tool Performance</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">GPA Calculator Pro</span>
                  <span className="text-sm font-medium text-hive-text-primary">2.8k users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Study Planner</span>
                  <span className="text-sm font-medium text-hive-text-primary">1.2k users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Campus Events</span>
                  <span className="text-sm font-medium text-hive-text-primary">847 users</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Community Impact</h5>
              <ProfileStats
                stats={{
                  connectionsCount: 234,
                  spacesJoined: 18,
                  totalActivity: 567,
                  currentStreak: 23,
                }}
                priority={['connectionsCount', 'totalActivity']}
                maxStats={2}
                layout="vertical"
                variant="ghost"
                showIcons={true}
                showTrends={true}
                changes={{
                  connectionsCount: 23,
                  totalActivity: 45,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Leader Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-hive-sapphire rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">MJ</span>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-hive-text-primary">Marcus Johnson</h4>
              <p className="text-hive-text-secondary">Mathematics Major • Group Leader</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Leadership Stats</h5>
              <ProfileStats
                stats={{
                  spacesLed: 7,
                  spacesActive: 12,
                  connectionsCount: 189,
                  reputation: 3456,
                }}
                priority={['spacesLed', 'spacesActive', 'connectionsCount', 'reputation']}
                layout="grid"
                columns="2"
                showIcons={true}
                showTrends={true}
                changes={{
                  spacesLed: 1,
                  spacesActive: 2,
                  connectionsCount: 15,
                  reputation: 124,
                }}
                interactive={true}
                onStatClick={(key, value) => alert(`Leadership stat: ${key} = ${value}`)}
              />
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Activity Overview</h5>
              <ActiveUserProfileStats
                stats={{
                  spacesActive: 12,
                  currentStreak: 28,
                  totalActivity: 945,
                  achievements: 9,
                  spacesJoined: 15,
                  longestStreak: 45,
                }}
                showIcons={true}
                showTrends={true}
                changes={{
                  spacesActive: 2,
                  currentStreak: 1,
                  totalActivity: 34,
                  achievements: 1,
                }}
                layout="vertical"
                variant="minimal"
              />
            </div>
          </div>
          
          <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-3">Group Impact Summary</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-gold">156</div>
                <div className="text-sm text-hive-text-secondary">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-emerald">89%</div>
                <div className="text-sm text-hive-text-secondary">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-sapphire">4.8</div>
                <div className="text-sm text-hive-text-secondary">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-text-primary">67</div>
                <div className="text-sm text-hive-text-secondary">Sessions Led</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Profile Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Emma Davis',
              role: 'Physics Major',
              color: 'bg-purple-500',
              stats: {
                spacesJoined: 18,
                connectionsCount: 123,
                currentStreak: 12,
                reputation: 1890,
                spacesActive: 6,
                achievements: 4,
              },
              changes: {
                spacesJoined: 1,
                connectionsCount: 8,
                currentStreak: 1,
                reputation: 67,
              }
            },
            {
              name: 'David Park',
              role: 'Chemistry Major',
              color: 'bg-green-500',
              stats: {
                spacesJoined: 22,
                connectionsCount: 167,
                currentStreak: 8,
                reputation: 2156,
                spacesActive: 9,
                achievements: 6,
              },
              changes: {
                spacesJoined: 3,
                connectionsCount: 12,
                reputation: 89,
              }
            },
            {
              name: 'Lisa Wang',
              role: 'Biology Major',
              color: 'bg-blue-500',
              stats: {
                spacesJoined: 16,
                connectionsCount: 134,
                currentStreak: 19,
                reputation: 2367,
                spacesActive: 7,
                achievements: 7,
              },
              changes: {
                spacesJoined: 2,
                connectionsCount: 15,
                currentStreak: 2,
                reputation: 134,
              }
            }
          ].map((student, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${student.color} rounded-full flex items-center justify-center`}>
                  <span className="font-bold text-white">{student.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-hive-text-primary">{student.name}</h4>
                  <p className="text-sm text-hive-text-secondary">{student.role}</p>
                </div>
              </div>
              
              <StudentProfileStats
                stats={student.stats}
                changes={student.changes}
                showIcons={false}
                showTrends={true}
                layout="vertical"
                variant="ghost"
                maxStats={4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Interactive profile stats examples
export const InteractiveProfileStatsExamples: Story = {
  render: () => {
    const [selectedLayout, setSelectedLayout] = useState<'horizontal' | 'vertical' | 'grid' | 'compact'>('horizontal');
    const [showTrends, setShowTrends] = useState(true);
    const [showIcons, setShowIcons] = useState(true);
    const [interactive, setInteractive] = useState(true);
    const [maxStats, setMaxStats] = useState(4);

    const [currentStats, setCurrentStats] = useState<HiveProfileStats>({
      spacesJoined: 24,
      spacesActive: 8,
      spacesLed: 3,
      toolsUsed: 12,
      connectionsCount: 156,
      totalActivity: 847,
      currentStreak: 15,
      longestStreak: 42,
      reputation: 2847,
      achievements: 8,
    });

    const incrementStat = (key: keyof HiveProfileStats) => {
      setCurrentStats(prev => ({
        ...prev,
        [key]: (prev[key] || 0) + 1
      }));
    };

    const handleStatClick = (statKey: string, value: number) => {
      alert(`Clicked ${statKey}: ${value}`);
      incrementStat(statKey as keyof HiveProfileStats);
    };

    return (
      <div className="space-y-6 p-6 max-w-6xl bg-hive-background-primary">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Profile Stats Demo</h3>
            <p className="text-hive-text-secondary">Customize the stats display and click on stats to see interactions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Configuration</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Layout</label>
                <select 
                  value={selectedLayout} 
                  onChange={(e) => setSelectedLayout(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="grid">Grid</option>
                  <option value="compact">Compact</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Max Stats: {maxStats}</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={maxStats}
                  onChange={(e) => setMaxStats(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showTrends}
                    onChange={(e) => setShowTrends(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Show Trends</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showIcons}
                    onChange={(e) => setShowIcons(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Show Icons</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={interactive}
                    onChange={(e) => setInteractive(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Interactive</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Quick Actions</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => incrementStat('spacesJoined')}
                  className="px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm"
                >
                  +1 Space
                </button>
                <button 
                  onClick={() => incrementStat('connectionsCount')}
                  className="px-3 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors text-sm"
                >
                  +1 Connection
                </button>
                <button 
                  onClick={() => incrementStat('currentStreak')}
                  className="px-3 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors text-sm"
                >
                  +1 Streak
                </button>
                <button 
                  onClick={() => incrementStat('achievements')}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-500/90 transition-colors text-sm"
                >
                  +1 Achievement
                </button>
              </div>
              
              <button 
                onClick={() => setCurrentStats({
                  spacesJoined: 24,
                  spacesActive: 8,
                  spacesLed: 3,
                  toolsUsed: 12,
                  connectionsCount: 156,
                  totalActivity: 847,
                  currentStreak: 15,
                  longestStreak: 42,
                  reputation: 2847,
                  achievements: 8,
                })}
                className="w-full px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors text-sm"
              >
                Reset Stats
              </button>
            </div>
          </div>
        </div>
        
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="font-semibold text-hive-text-primary mb-4">Live Preview</h4>
          
          <ProfileStats
            stats={currentStats}
            changes={sampleChanges}
            layout={selectedLayout}
            showIcons={showIcons}
            showTrends={showTrends}
            interactive={interactive}
            maxStats={maxStats}
            onStatClick={handleStatClick}
            columns={selectedLayout === 'grid' ? '4' : 'auto'}
          />
          
          <div className="mt-4 p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
            <p className="text-sm text-hive-text-secondary">
              Configuration: <strong>{selectedLayout}</strong> layout • 
              <strong> {maxStats}</strong> max stats • 
              Icons: <strong>{showIcons ? 'On' : 'Off'}</strong> • 
              Trends: <strong>{showTrends ? 'On' : 'Off'}</strong> • 
              Interactive: <strong>{interactive ? 'On' : 'Off'}</strong>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-3">Student Preset</h5>
            <StudentProfileStats
              stats={currentStats}
              showIcons={showIcons}
              showTrends={showTrends}
              changes={sampleChanges}
              interactive={interactive}
              layout="compact"
            />
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-3">Builder Preset</h5>
            <BuilderProfileStats
              stats={currentStats}
              showIcons={showIcons}
              showTrends={showTrends}
              changes={sampleChanges}
              interactive={interactive}
              layout="compact"
            />
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-3">Active User Preset</h5>
            <ActiveUserProfileStats
              stats={currentStats}
              showIcons={showIcons}
              showTrends={showTrends}
              changes={sampleChanges}
              interactive={interactive}
              layout="compact"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    stats: sampleStats,
    changes: sampleChanges,
    showIcons: true,
    showTrends: true,
    interactive: false,
    layout: 'horizontal',
    variant: 'default',
    maxStats: 4,
  },
};