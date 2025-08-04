import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveLogo, 
  Icon, 
  PlatformIcons,
  // Navigation icons
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Menu, X, Home, Search,
  // Action icons
  Plus, Edit, Trash2, Save, Share2, Settings, MoreHorizontal,
  // Status icons
  Check, CheckCircle, XCircle, AlertTriangle, Loader2,
  // Platform icons
  User, Users, Building, Calendar, Bell, MessageCircle, Heart,
  // Tool icons
  Wrench, Hammer, Code, Palette,
  // University icons
  GraduationCap, Book, School,
  // Social icons
  ThumbsUp, Star, Send
} from '../../atomic/atoms/hive-brand';
import { useState } from 'react';

const meta: Meta<typeof HiveLogo> = {
  title: '01-Atoms/HIVE Brand',
  component: HiveLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE brand system components including logos, icons, and platform-specific visual elements with consistent theming and sizing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Logo size',
    },
    color: {
      control: 'select',
      options: ['black', 'gold', 'white', 'auto'],
      description: 'Logo color variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Logo examples
export const LogoDefault: Story = {
  args: {
    size: 'default',
    color: 'auto',
  },
};

export const LogoSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-4">
      <div className="text-center">
        <HiveLogo size="xs" />
        <p className="text-xs text-hive-text-secondary mt-2">XS</p>
      </div>
      <div className="text-center">
        <HiveLogo size="sm" />
        <p className="text-xs text-hive-text-secondary mt-2">SM</p>
      </div>
      <div className="text-center">
        <HiveLogo size="default" />
        <p className="text-xs text-hive-text-secondary mt-2">Default</p>
      </div>
      <div className="text-center">
        <HiveLogo size="md" />
        <p className="text-xs text-hive-text-secondary mt-2">MD</p>
      </div>
      <div className="text-center">
        <HiveLogo size="lg" />
        <p className="text-xs text-hive-text-secondary mt-2">LG</p>
      </div>
      <div className="text-center">
        <HiveLogo size="xl" />
        <p className="text-xs text-hive-text-secondary mt-2">XL</p>
      </div>
    </div>
  ),
};

export const LogoColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
        <div className="flex items-center space-x-4 mb-4">
          <HiveLogo size="lg" color="gold" />
          <div>
            <h4 className="font-semibold text-hive-text-primary">Gold Logo</h4>
            <p className="text-sm text-hive-text-secondary">Primary brand color</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
        <div className="flex items-center space-x-4 mb-4">
          <HiveLogo size="lg" color="black" />
          <div>
            <h4 className="font-semibold text-hive-text-primary">Black Logo</h4>
            <p className="text-sm text-hive-text-secondary">High contrast variant</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <HiveLogo size="lg" color="white" />
          <div>
            <h4 className="font-semibold text-white">White Logo</h4>
            <p className="text-sm text-gray-300">Dark background variant</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
        <div className="flex items-center space-x-4 mb-4">
          <HiveLogo size="lg" color="auto" />
          <div>
            <h4 className="font-semibold text-hive-text-primary">Auto Logo</h4>
            <p className="text-sm text-hive-text-secondary">Theme adaptive</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Icon examples
export const IconSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Icon Sizes</h4>
        <div className="flex items-center space-x-6">
          {['xs', 'sm', 'default', 'md', 'lg', 'xl', '2xl'].map(size => (
            <div key={size} className="text-center">
              <Icon icon={Home} size={size as any} color="brand" />
              <p className="text-xs text-hive-text-secondary mt-2">{size}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const IconColors: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Icon Colors</h4>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { color: 'primary', label: 'Primary', icon: User },
            { color: 'secondary', label: 'Secondary', icon: Users },
            { color: 'tertiary', label: 'Tertiary', icon: Calendar },
            { color: 'brand', label: 'Brand', icon: Star },
            { color: 'success', label: 'Success', icon: CheckCircle },
            { color: 'error', label: 'Error', icon: XCircle },
            { color: 'warning', label: 'Warning', icon: AlertTriangle },
            { color: 'info', label: 'Info', icon: Bell },
            { color: 'disabled', label: 'Disabled', icon: Settings },
            { color: 'current', label: 'Current', icon: Home },
          ].map(({ color, label, icon }) => (
            <div key={color} className="text-center p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
              <Icon icon={icon} size="lg" color={color as any} />
              <p className="text-xs text-hive-text-secondary mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const PlatformIconsShowcase: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-6xl">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Platform Icons</h4>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {Object.entries(PlatformIcons).map(([name, IconComponent]) => (
            <div key={name} className="text-center p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle hover:bg-hive-interactive-hover transition-colors">
              <Icon icon={IconComponent} size="lg" color="brand" />
              <p className="text-xs text-hive-text-secondary mt-2">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Campus brand scenarios
export const CampusBrandScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Application Headers</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3">
              <HiveLogo size="md" />
              <div>
                <h4 className="font-semibold text-hive-text-primary">HIVE</h4>
                <p className="text-sm text-hive-text-secondary">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Search} size="sm" color="secondary" interactive />
              <Icon icon={Bell} size="sm" color="secondary" interactive />
              <Icon icon={User} size="sm" color="brand" interactive />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3">
              <HiveLogo size="sm" />
              <span className="font-bold text-hive-text-primary">HIVE</span>
              <span className="text-hive-text-tertiary">•</span>
              <span className="text-sm text-hive-text-secondary">Tool Builder</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Code} size="sm" color="brand" />
              <Icon icon={Hammer} size="sm" color="secondary" />
              <Icon icon={Settings} size="sm" color="secondary" interactive />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3">
              <HiveLogo size="lg" />
              <div>
                <h4 className="text-xl font-bold text-hive-text-primary">HIVE</h4>
                <p className="text-sm text-hive-text-secondary">Campus Social Utility Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Navigation Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Sidebar Navigation</h4>
            <div className="space-y-2">
              {[
                { icon: Home, label: 'Feed', active: true },
                { icon: User, label: 'Profile', active: false },
                { icon: Users, label: 'Spaces', active: false },
                { icon: Wrench, label: 'Tools', active: false },
                { icon: Calendar, label: 'Calendar', active: false },
              ].map(({ icon, label, active }) => (
                <div key={label} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  active ? 'bg-hive-gold/10 border border-hive-gold/20' : 'hover:bg-hive-background-tertiary'
                }`}>
                  <Icon 
                    icon={icon} 
                    size="sm" 
                    color={active ? 'brand' : 'secondary'} 
                  />
                  <span className={`text-sm font-medium ${
                    active ? 'text-hive-gold' : 'text-hive-text-secondary'
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Tab Navigation</h4>
            <div className="flex border-b border-hive-border-subtle">
              {[
                { icon: Home, label: 'Feed', active: true },
                { icon: Users, label: 'Spaces', active: false },
                { icon: Wrench, label: 'Tools', active: false },
                { icon: User, label: 'Profile', active: false },
              ].map(({ icon, label, active }) => (
                <div key={label} className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  active 
                    ? 'border-hive-gold text-hive-gold' 
                    : 'border-transparent text-hive-text-secondary hover:text-hive-text-primary'
                }`}>
                  <Icon 
                    icon={icon} 
                    size="sm" 
                    color={active ? 'brand' : 'secondary'} 
                  />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Feature Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                <Icon icon={Users} size="md" color="brand" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Study Spaces</h4>
                <p className="text-sm text-hive-text-secondary">Connect & collaborate</p>
              </div>
            </div>
            <p className="text-sm text-hive-text-secondary mb-4">
              Join study groups, coordinate sessions, and build lasting academic relationships.
            </p>
            <button className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
              Explore Spaces
            </button>
          </div>
          
          <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-hive-emerald/20 rounded-lg flex items-center justify-center">
                <Icon icon={Wrench} size="md" color="success" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Campus Tools</h4>
                <p className="text-sm text-hive-text-secondary">Build & share utilities</p>
              </div>
            </div>
            <p className="text-sm text-hive-text-secondary mb-4">
              Create helpful tools for your campus community and discover what others have built.
            </p>
            <button className="w-full px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors font-medium">
              Browse Tools
            </button>
          </div>
          
          <div className="p-6 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-hive-sapphire/20 rounded-lg flex items-center justify-center">
                <Icon icon={Calendar} size="md" color="info" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Academic Calendar</h4>
                <p className="text-sm text-hive-text-secondary">Stay organized</p>
              </div>
            </div>
            <p className="text-sm text-hive-text-secondary mb-4">
              Sync your class schedule, track assignments, and never miss important deadlines.
            </p>
            <button className="w-full px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors font-medium">
              View Calendar
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Interactive Elements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Action Buttons</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                  <Icon icon={Plus} size="sm" />
                  <span className="font-medium">Create</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                  <Icon icon={Edit} size="sm" />
                  <span className="font-medium">Edit</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                  <Icon icon={Trash2} size="sm" />
                  <span className="font-medium">Delete</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
                  <Icon icon={Save} size="sm" />
                  <span className="font-medium">Save</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
                  <Icon icon={Share2} size="sm" />
                  <span className="font-medium">Share</span>
                </button>
                <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                  <Icon icon={MoreHorizontal} size="sm" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Status Indicators</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Icon icon={CheckCircle} size="sm" color="success" />
                  <span className="text-sm text-hive-text-primary">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={XCircle} size="sm" color="error" />
                  <span className="text-sm text-hive-text-primary">Unavailable</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Icon icon={Loader2} size="sm" color="brand" className="animate-spin" />
                  <span className="text-sm text-hive-text-primary">Loading</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={AlertTriangle} size="sm" color="warning" />
                  <span className="text-sm text-hive-text-primary">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive brand examples
export const InteractiveBrandExamples: Story = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = useState<string>('Home');
    const [iconSize, setIconSize] = useState<string>('default');
    const [iconColor, setIconColor] = useState<string>('brand');
    const [logoSize, setLogoSize] = useState<string>('default');

    const iconMap = {
      Home, User, Users, Calendar, Bell, MessageCircle, Heart, Star,
      Search, Settings, Plus, Edit, Save, Share2, CheckCircle, Wrench
    };

    const SelectedIcon = iconMap[selectedIcon as keyof typeof iconMap] || Home;

    return (
      <div className="space-y-8 p-6 max-w-5xl bg-hive-background-primary">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Brand Elements</h3>
          <p className="text-hive-text-secondary mb-6">Customize logos and icons to see how they work across the HIVE platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Logo Customization</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Size</label>
                <select 
                  value={logoSize} 
                  onChange={(e) => setLogoSize(e.target.value)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  <option value="xs">XS</option>
                  <option value="sm">SM</option>
                  <option value="default">Default</option>
                  <option value="md">MD</option>
                  <option value="lg">LG</option>
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                </select>
              </div>
              
              <div className="flex justify-center p-6 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <HiveLogo size={logoSize as any} />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-hive-text-secondary">
                  Current size: <strong>{logoSize}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Icon Customization</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Icon</label>
                <select 
                  value={selectedIcon} 
                  onChange={(e) => setSelectedIcon(e.target.value)}
                  className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                >
                  {Object.keys(iconMap).map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-hive-text-primary mb-2">Size</label>
                  <select 
                    value={iconSize} 
                    onChange={(e) => setIconSize(e.target.value)}
                    className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                  >
                    <option value="xs">XS</option>
                    <option value="sm">SM</option>
                    <option value="default">Default</option>
                    <option value="md">MD</option>
                    <option value="lg">LG</option>
                    <option value="xl">XL</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-hive-text-primary mb-2">Color</label>
                  <select 
                    value={iconColor} 
                    onChange={(e) => setIconColor(e.target.value)}
                    className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-hive-text-primary"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="brand">Brand</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center p-6 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <Icon 
                  icon={SelectedIcon} 
                  size={iconSize as any} 
                  color={iconColor as any} 
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-hive-text-secondary">
                  {selectedIcon} • {iconSize} • {iconColor}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="font-semibold text-hive-text-primary mb-4">Preview in Context</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <div className="flex items-center space-x-3">
                <HiveLogo size={logoSize as any} />
                <span className="font-bold text-hive-text-primary">HIVE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon={Search} size="sm" color="secondary" />
                <Icon icon={Bell} size="sm" color="secondary" />
                <Icon icon={SelectedIcon} size={iconSize as any} color={iconColor as any} />
              </div>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
              <div className="flex items-center space-x-3 mb-3">
                <Icon icon={SelectedIcon} size={iconSize as any} color={iconColor as any} />
                <div>
                  <h5 className="font-semibold text-hive-text-primary">Campus Feature</h5>
                  <p className="text-sm text-hive-text-secondary">Using your selected icon and styling</p>
                </div>
              </div>
              <p className="text-sm text-hive-text-secondary">
                This preview shows how your customized icon would appear in a typical HIVE interface element.
              </p>
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
    size: 'lg',
    color: 'auto',
  },
};