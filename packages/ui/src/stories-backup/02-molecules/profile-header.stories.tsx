import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileHeader,
  CompactProfileHeader,
  CardProfileHeader,
  MinimalProfileHeader,
  ProfileUser
} from '../../atomic/molecules/profile-header';
import { 
  MapPin, 
  Calendar, 
  GraduationCap,
  Link as LinkIcon,
  Users,
  Star,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileHeader> = {
  title: '02-Molecules/Profile Header',
  component: ProfileHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile header molecule displaying comprehensive user identity, metadata, badges, and contextual actions with multiple layout options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'compact'],
      description: 'Header layout arrangement',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'card', 'minimal'],
      description: 'Visual variant',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between elements',
    },
    avatarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Avatar size',
    },
    isOwnProfile: {
      control: 'boolean',
      description: 'Whether viewing own profile',
    },
    showOnlineStatus: {
      control: 'boolean',
      description: 'Show online status indicator',
    },
    showMeta: {
      control: 'boolean',
      description: 'Show metadata (location, school, etc.)',
    },
    showBio: {
      control: 'boolean',
      description: 'Show user bio',
    },
    showBadges: {
      control: 'boolean',
      description: 'Show user badges',
    },
    maxBioLength: {
      control: 'number',
      description: 'Maximum bio character length',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data
const sampleUser: ProfileUser = {
  id: 'user-1',
  name: 'Alex Rodriguez',
  handle: 'alexr',
  avatar: '',
  bio: 'Computer Science junior passionate about building tools that help students succeed. Love organizing study groups and making campus life better through technology.',
  location: 'San Francisco, CA',
  website: 'https://alexr.dev',
  school: 'University of California',
  major: 'Computer Science',
  gradYear: '2025',
  joinedAt: '2022-09-15T00:00:00Z',
  isBuilder: true,
  isVerified: true,
  ghostMode: false,
  onlineStatus: 'online',
};

const builderUser: ProfileUser = {
  id: 'user-2',
  name: 'Sarah Chen',
  handle: 'sarahc',
  avatar: '',
  bio: 'Full-stack developer and campus tool creator. Built 15+ tools used by thousands of students. Always looking for new ways to improve the student experience.',
  location: 'Boston, MA',
  website: 'https://sarahchen.com',
  school: 'MIT',
  major: 'Electrical Engineering & Computer Science',
  gradYear: '2024',
  joinedAt: '2021-08-20T00:00:00Z',
  isBuilder: true,
  isVerified: true,
  ghostMode: false,
  onlineStatus: 'online',
};

const studentUser: ProfileUser = {
  id: 'user-3',
  name: 'Marcus Johnson',
  handle: 'marcusj',
  avatar: '',
  bio: 'Mathematics major and study group enthusiast. Leading 3 active study groups and helping fellow students excel in their courses.',
  location: 'Austin, TX',
  school: 'University of Texas at Austin',
  major: 'Mathematics',
  gradYear: '2026',
  joinedAt: '2023-01-10T00:00:00Z',
  isBuilder: false,
  isVerified: false,
  ghostMode: false,
  onlineStatus: 'away',
};

// Basic examples
export const Default: Story = {
  args: {
    user: sampleUser,
    isOwnProfile: false,
    showOnlineStatus: true,
    showMeta: true,
    showBio: true,
    showBadges: true,
    avatarSize: 'lg',
  },
};

export const OwnProfile: Story = {
  args: {
    user: sampleUser,
    isOwnProfile: true,
    showOnlineStatus: true,
    showMeta: true,
    showBio: true,
    showBadges: true,
    avatarSize: 'lg',
    onEditProfile: () => alert('Opening profile editor...'),
    onEditAvatar: () => alert('Opening avatar editor...'),
    onShareProfile: () => alert('Sharing profile...'),
  },
};

export const CompactLayout: Story = {
  args: {
    user: sampleUser,
    layout: 'compact',
    isOwnProfile: false,
    avatarSize: 'md',
  },
};

export const VerticalLayout: Story = {
  args: {
    user: sampleUser,
    layout: 'vertical',
    isOwnProfile: true,
    avatarSize: 'xl',
    onEditProfile: () => alert('Edit profile'),
    onEditAvatar: () => alert('Edit avatar'),
  },
};

export const MinimalVariant: Story = {
  args: {
    user: sampleUser,
    variant: 'minimal',
    isOwnProfile: false,
    showMeta: false,
  },
};

// All layouts
export const AllLayouts: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Horizontal Layout</h4>
        <ProfileHeader
          user={sampleUser}
          layout="horizontal"
          isOwnProfile={true}
          onEditProfile={() => alert('Edit profile')}
          onEditAvatar={() => alert('Edit avatar')}
          onShareProfile={() => alert('Share profile')}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Vertical Layout</h4>
        <div className="max-w-md mx-auto">
          <ProfileHeader
            user={sampleUser}
            layout="vertical"
            isOwnProfile={false}
            avatarSize="xl"
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Compact Layout</h4>
        <ProfileHeader
          user={sampleUser}
          layout="compact"
          isOwnProfile={false}
          avatarSize="md"
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
        <ProfileHeader
          user={sampleUser}
          variant="default"
          isOwnProfile={true}
          onEditProfile={() => alert('Edit')}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Ghost Variant</h4>
        <ProfileHeader
          user={sampleUser}
          variant="ghost"
          isOwnProfile={false}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Card Variant</h4>
        <ProfileHeader
          user={sampleUser}
          variant="card"
          isOwnProfile={false}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Minimal Variant</h4>
        <ProfileHeader
          user={sampleUser}
          variant="minimal"
          isOwnProfile={false}
          showMeta={false}
        />
      </div>
    </div>
  ),
};

// Preset variations
export const PresetVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Compact Profile Header</h4>
        <CompactProfileHeader
          user={sampleUser}
          isOwnProfile={true}
          onEditProfile={() => alert('Edit')}
          onShareProfile={() => alert('Share')}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Card Profile Header</h4>
        <CardProfileHeader
          user={builderUser}
          isOwnProfile={false}
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Minimal Profile Header</h4>
        <MinimalProfileHeader
          user={studentUser}
          isOwnProfile={false}
        />
      </div>
    </div>
  ),
};

// Campus profile header scenarios
export const CampusProfileHeaderScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Views</h3>
        <div className="space-y-6">
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Own Profile - Full View</h4>
            <ProfileHeader
              user={{
                ...sampleUser,
                bio: 'Computer Science junior passionate about building tools that help students succeed. Currently working on my senior capstone project and leading two study groups.',
              }}
              isOwnProfile={true}
              layout="horizontal"
              variant="card"
              avatarSize="xl"
              onEditProfile={() => alert('Opening profile editor with academic info, social links, and privacy settings...')}
              onEditAvatar={() => alert('Opening avatar editor with photo upload and positioning...')}
              onShareProfile={() => alert('Generating shareable profile link...')}
            />
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Viewing Another Student</h4>
            <ProfileHeader
              user={studentUser}
              isOwnProfile={false}
              layout="horizontal"
              variant="default"
              avatarSize="lg"
            />
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Compact View in Sidebar</h4>
            <CompactProfileHeader
              user={sampleUser}
              isOwnProfile={true}
              onEditProfile={() => alert('Quick edit')}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Profiles</h3>
        <div className="space-y-6">
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Featured Builder Profile</h4>
            <ProfileHeader
              user={builderUser}
              isOwnProfile={false}
              layout="vertical"
              variant="card"
              avatarSize="xxl"
              spacing="loose"
            />
            
            <div className="mt-6 p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Builder Achievements</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-hive-gold">15</div>
                  <div className="text-sm text-hive-text-secondary">Tools Built</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hive-emerald">4.8k</div>
                  <div className="text-sm text-hive-text-secondary">Total Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hive-sapphire">4.9</div>
                  <div className="text-sm text-hive-text-secondary">Avg Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hive-text-primary">2.5k</div>
                  <div className="text-sm text-hive-text-secondary">Connections</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Builder Tool Showcase</h4>
            <ProfileHeader
              user={{
                ...builderUser,
                name: 'Emma Davis',
                handle: 'emmad',
                bio: 'UI/UX designer turned full-stack developer. Creating beautiful and functional tools for campus communities.',
                major: 'Design & Computer Science',
                onlineStatus: 'online',
              }}
              isOwnProfile={false}
              layout="horizontal"
              variant="default"
              avatarSize="lg"
            />
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">Top Tools</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Campus Event Planner</span>
                    <span className="text-sm font-medium text-hive-text-primary">1.2k users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Study Room Finder</span>
                    <span className="text-sm font-medium text-hive-text-primary">890 users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Course Planner Pro</span>
                    <span className="text-sm font-medium text-hive-text-primary">756 users</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">Community Impact</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Students Helped</span>
                    <span className="text-sm font-medium text-hive-text-primary">2.8k+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Tools Rating</span>
                    <span className="text-sm font-medium text-hive-text-primary">4.9/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Community Rank</span>
                    <span className="text-sm font-medium text-hive-text-primary">Top 5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Leader Profiles</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="font-semibold text-hive-text-primary mb-4">Group Leader Dashboard</h4>
          <ProfileHeader
            user={{
              ...studentUser,
              name: 'David Park',
              handle: 'davidp',
              bio: 'Chemistry major and study group coordinator. Leading 5 active study groups with 150+ participants. Always happy to help fellow students succeed.',
              major: 'Chemistry',
              school: 'Stanford University',
              onlineStatus: 'online',
            }}
            isOwnProfile={false}
            layout="horizontal"
            variant="card"
            avatarSize="lg"
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Leadership Stats</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Groups Led</span>
                  <span className="text-sm font-medium text-hive-text-primary">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Total Members</span>
                  <span className="text-sm font-medium text-hive-text-primary">152</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Sessions Led</span>
                  <span className="text-sm font-medium text-hive-text-primary">47</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Success Metrics</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Group Rating</span>
                  <span className="text-sm font-medium text-hive-text-primary">4.8/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Attendance Rate</span>
                  <span className="text-sm font-medium text-hive-text-primary">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-hive-text-secondary">Success Stories</span>
                  <span className="text-sm font-medium text-hive-text-primary">23</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-3">Active Groups</h5>
              <div className="space-y-1">
                <div className="text-sm text-hive-text-secondary">• Organic Chemistry I</div>
                <div className="text-sm text-hive-text-secondary">• Physical Chemistry</div>
                <div className="text-sm text-hive-text-secondary">• Lab Techniques</div>
                <div className="text-sm text-hive-text-secondary">• Research Methods</div>
                <div className="text-sm text-hive-text-secondary">• MCAT Prep</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive profile header examples
export const InteractiveProfileHeaderExamples: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<'own' | 'other'>('own');
    const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'compact'>('horizontal');
    const [variant, setVariant] = useState<'default' | 'ghost' | 'card' | 'minimal'>('default');
    const [avatarSize, setAvatarSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>('lg');
    const [showMeta, setShowMeta] = useState(true);
    const [showBio, setShowBio] = useState(true);
    const [showBadges, setShowBadges] = useState(true);

    const [currentUser, setCurrentUser] = useState<ProfileUser>(sampleUser);

    const toggleBuilder = () => {
      setCurrentUser(prev => ({ ...prev, isBuilder: !prev.isBuilder }));
    };

    const toggleVerified = () => {
      setCurrentUser(prev => ({ ...prev, isVerified: !prev.isVerified }));
    };

    const toggleGhostMode = () => {
      setCurrentUser(prev => ({ ...prev, ghostMode: !prev.ghostMode }));
    };

    const cycleOnlineStatus = () => {
      const statuses: ('online' | 'offline' | 'away' | 'busy')[] = ['online', 'away', 'busy', 'offline'];
      const currentIndex = statuses.indexOf(currentUser.onlineStatus || 'offline');
      const nextIndex = (currentIndex + 1) % statuses.length;
      setCurrentUser(prev => ({ ...prev, onlineStatus: statuses[nextIndex] }));
    };

    return (
      <div className="space-y-6 p-6 max-w-6xl bg-hive-background-primary">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Profile Header Demo</h3>
            <p className="text-hive-text-secondary">Customize layout, variant, and user properties to see how the header adapts</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Layout & Style</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Layout</label>
                <select 
                  value={layout} 
                  onChange={(e) => setLayout(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="compact">Compact</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Variant</label>
                <select 
                  value={variant} 
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="default">Default</option>
                  <option value="ghost">Ghost</option>
                  <option value="card">Card</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Avatar Size</label>
                <select 
                  value={avatarSize} 
                  onChange={(e) => setAvatarSize(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="xxl">2X Large</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">View Mode</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('own')}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'own'
                        ? 'bg-hive-gold text-hive-background-primary'
                        : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                    }`}
                  >
                    Own Profile
                  </button>
                  <button
                    onClick={() => setViewMode('other')}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'other'
                        ? 'bg-hive-gold text-hive-background-primary'
                        : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                    }`}
                  >
                    Other Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">User Properties & Options</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showMeta}
                    onChange={(e) => setShowMeta(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Show Metadata</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showBio}
                    onChange={(e) => setShowBio(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Show Bio</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showBadges}
                    onChange={(e) => setShowBadges(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-hive-text-primary">Show Badges</span>
                </label>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={toggleBuilder}
                  className={`w-full px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentUser.isBuilder
                      ? 'bg-hive-gold text-hive-background-primary'
                      : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                  }`}
                >
                  {currentUser.isBuilder ? '✓ Builder' : 'Toggle Builder'}
                </button>
                
                <button 
                  onClick={toggleVerified}
                  className={`w-full px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentUser.isVerified
                      ? 'bg-blue-500 text-white'
                      : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                  }`}
                >
                  {currentUser.isVerified ? '✓ Verified' : 'Toggle Verified'}
                </button>
                
                <button 
                  onClick={toggleGhostMode}
                  className={`w-full px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentUser.ghostMode
                      ? 'bg-gray-600 text-white'
                      : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                  }`}
                >
                  {currentUser.ghostMode ? '👻 Ghost Mode' : 'Toggle Ghost Mode'}
                </button>
                
                <button 
                  onClick={cycleOnlineStatus}
                  className="w-full px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors"
                >
                  Status: {currentUser.onlineStatus || 'offline'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="font-semibold text-hive-text-primary mb-4">Live Preview</h4>
          
          <ProfileHeader
            user={currentUser}
            isOwnProfile={viewMode === 'own'}
            layout={layout}
            variant={variant}
            avatarSize={avatarSize}
            showMeta={showMeta}
            showBio={showBio}
            showBadges={showBadges}
            onEditProfile={() => alert('Edit profile clicked')}
            onEditAvatar={() => alert('Edit avatar clicked')}
            onShareProfile={() => alert('Share profile clicked')}
          />
          
          <div className="mt-4 p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
            <p className="text-sm text-hive-text-secondary">
              <strong>Configuration:</strong> {layout} layout • {variant} variant • {avatarSize} avatar • 
              {viewMode === 'own' ? 'Own profile' : 'Other profile'} • 
              Builder: {currentUser.isBuilder ? 'Yes' : 'No'} • 
              Verified: {currentUser.isVerified ? 'Yes' : 'No'} • 
              Status: {currentUser.onlineStatus}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    user: sampleUser,
    isOwnProfile: true,
    layout: 'horizontal',
    variant: 'default',
    avatarSize: 'lg',
    showOnlineStatus: true,
    showMeta: true,
    showBio: true,
    showBadges: true,
    onEditProfile: () => alert('Edit profile'),
    onEditAvatar: () => alert('Edit avatar'),
    onShareProfile: () => alert('Share profile'),
  },
};