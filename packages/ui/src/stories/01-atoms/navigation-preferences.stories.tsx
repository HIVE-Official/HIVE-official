import type { Meta, StoryObj } from '@storybook/react';
import { NavigationPreferences, NavigationStyle } from '../../atomic/atoms/navigation-preferences';
import { 
  Settings, 
  Layout, 
  Sidebar, 
  Navigation,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  MousePointer,
  Zap
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof NavigationPreferences> = {
  title: '01-Atoms/Navigation Preferences',
  component: NavigationPreferences,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE navigation preferences component for users to customize their navigation experience with different layout options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['auto', 'sidebar', 'tabs'],
      description: 'Currently selected navigation style',
    },
    onChange: {
      action: 'navigation style changed',
      description: 'Handler for navigation style changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    value: 'auto',
    onChange: (value: NavigationStyle) => console.log('Navigation style changed to:', value),
  },
};

export const SidebarSelected: Story = {
  args: {
    value: 'sidebar',
    onChange: (value: NavigationStyle) => console.log('Navigation style changed to:', value),
  },
};

export const TabsSelected: Story = {
  args: {
    value: 'tabs',
    onChange: (value: NavigationStyle) => console.log('Navigation style changed to:', value),
  },
};

// Campus navigation preference scenarios
export const CampusNavigationPreferenceScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Settings - Navigation Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-12 h-12 bg-hive-gold rounded-lg flex items-center justify-center">
              <Layout className="h-6 w-6 text-hive-background-primary" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Customize Your Navigation</h4>
              <p className="text-hive-text-secondary mb-4">
                Choose how you want to navigate HIVE. This affects how you move between your feed, spaces, tools, and profile.
              </p>
            </div>
          </div>
          
          <NavigationPreferences
            value="auto"
            onChange={(value) => alert(`Navigation preference changed to: ${value}`)}
          />
          
          <div className="mt-6 p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
            <h5 className="font-semibold text-hive-text-primary mb-2">Preview Your Choice</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
                <Monitor className="h-8 w-8 text-hive-text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium text-hive-text-primary">Desktop</p>
                <p className="text-xs text-hive-text-secondary">Sidebar navigation</p>
              </div>
              
              <div className="p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
                <Tablet className="h-8 w-8 text-hive-text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium text-hive-text-primary">Tablet</p>
                <p className="text-xs text-hive-text-secondary">Collapsible sidebar</p>
              </div>
              
              <div className="p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
                <Smartphone className="h-8 w-8 text-hive-text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium text-hive-text-primary">Mobile</p>
                <p className="text-xs text-hive-text-secondary">Bottom tab bar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Power User Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Advanced Navigation Setup</h4>
            <p className="text-hive-text-secondary">
              Fine-tune your HIVE experience for maximum productivity. These settings affect how you interact with spaces, tools, and your academic workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4 flex items-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Navigation Style</span>
              </h5>
              <NavigationPreferences
                value="sidebar"
                onChange={(value) => alert(`Advanced navigation set to: ${value}`)}
              />
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Additional Options</h5>
              <div className="space-y-3">
                <div className="p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-hive-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-hive-text-primary">Quick Peek</p>
                        <p className="text-xs text-hive-text-secondary">Hover to preview spaces and tools</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-hive-gold rounded-full flex items-center justify-end pr-1">
                      <div className="w-4 h-4 bg-hive-background-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MousePointer className="h-5 w-5 text-hive-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-hive-text-primary">Click to Navigate</p>
                        <p className="text-xs text-hive-text-secondary">Single-click navigation (vs hover)</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-hive-surface-elevated rounded-full flex items-center justify-start pl-1">
                      <div className="w-4 h-4 bg-hive-text-secondary rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-hive-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-hive-text-primary">Smart Shortcuts</p>
                        <p className="text-xs text-hive-text-secondary">Keyboard shortcuts for power users</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-hive-gold rounded-full flex items-center justify-end pr-1">
                      <div className="w-4 h-4 bg-hive-background-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Leader Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Group Management Interface</h4>
            <p className="text-hive-text-secondary">
              Optimize your navigation for managing multiple study groups and coordinating with students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h5 className="font-semibold text-hive-text-primary mb-4">Recommended Setup</h5>
              <NavigationPreferences
                value="tabs"
                onChange={(value) => alert(`Group leader navigation set to: ${value}`)}
              />
              
              <div className="mt-4 p-3 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <p className="text-sm text-hive-text-primary font-medium mb-2">Why tabs work best for group leaders:</p>
                <ul className="text-sm text-hive-text-secondary space-y-1">
                  <li>• Quick switching between groups and tools</li>
                  <li>• More screen space for member management</li>
                  <li>• Easy access to shared resources</li>
                  <li>• Better for multi-tasking during sessions</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Quick Actions</h5>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors text-sm">
                  Apply to All Groups
                </button>
                <button className="w-full px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg font-medium hover:bg-hive-interactive-hover transition-colors text-sm">
                  Reset to Default
                </button>
                <button className="w-full px-3 py-2 bg-hive-emerald text-white rounded-lg font-medium hover:bg-hive-emerald/90 transition-colors text-sm">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Workspace</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Development Environment</h4>
            <p className="text-hive-text-secondary">
              Configure navigation for optimal tool building and testing workflows.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Primary Navigation</h5>
              <NavigationPreferences
                value="sidebar"
                onChange={(value) => alert(`Builder navigation set to: ${value}`)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <h6 className="font-semibold text-hive-text-primary mb-3">Development Benefits</h6>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-hive-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Persistent access to tool management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-hive-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Quick switching between development and testing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-hive-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Easy access to analytics and user feedback</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-hive-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Integrated documentation and resources</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
                <h6 className="font-semibold text-hive-text-primary mb-3">Workspace Stats</h6>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Tools in Development</span>
                    <span className="text-sm font-medium text-hive-text-primary">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Published Tools</span>
                    <span className="text-sm font-medium text-hive-text-primary">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Total Users</span>
                    <span className="text-sm font-medium text-hive-text-primary">2.8k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-hive-text-secondary">Avg. Rating</span>
                    <span className="text-sm font-medium text-hive-text-primary">4.7</span>
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

// Interactive navigation preferences
export const InteractiveNavigationPreferences: Story = {
  render: () => {
    const [currentStyle, setCurrentStyle] = useState<NavigationStyle>('auto');
    const [previewMode, setPreviewMode] = useState<'student' | 'leader' | 'builder'>('student');

    const handleStyleChange = (style: NavigationStyle) => {
      setCurrentStyle(style);
    };

    const getPreviewContent = (mode: string, style: NavigationStyle) => {
      const previews = {
        student: {
          title: 'Student Dashboard',
          description: 'Navigate between classes, assignments, and study groups',
          benefits: [
            'Quick access to upcoming classes',
            'Easy study group coordination',
            'Streamlined assignment tracking',
            'Social features integration'
          ]
        },
        leader: {
          title: 'Group Leader Dashboard',
          description: 'Manage multiple study groups and coordinate activities',
          benefits: [
            'Multi-group management',
            'Member activity tracking',
            'Resource sharing tools',
            'Session scheduling'
          ]
        },
        builder: {
          title: 'Tool Builder Workspace',
          description: 'Develop, test, and deploy campus tools',
          benefits: [
            'Development environment',
            'Real-time testing tools',
            'User analytics dashboard',
            'Community feedback system'
          ]
        }
      };

      return previews[mode] || previews.student;
    };

    const currentPreview = getPreviewContent(previewMode, currentStyle);

    return (
      <div className="space-y-6 p-6 max-w-5xl bg-hive-background-primary">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Navigation Preferences</h3>
            <p className="text-hive-text-secondary">Try different navigation styles and see how they work for different user types</p>
          </div>
          
          <div className="flex space-x-2">
            {[
              { key: 'student', label: 'Student', icon: '🎓' },
              { key: 'leader', label: 'Leader', icon: '👑' },
              { key: 'builder', label: 'Builder', icon: '🛠️' }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setPreviewMode(mode.key as any)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  previewMode === mode.key
                    ? 'bg-hive-gold text-hive-background-primary'
                    : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                }`}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-hive-text-primary mb-4">Navigation Preferences</h4>
            <NavigationPreferences
              value={currentStyle}
              onChange={handleStyleChange}
            />
            
            <div className="mt-4 p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
              <h5 className="font-semibold text-hive-text-primary mb-2">Current Selection</h5>
              <p className="text-sm text-hive-text-secondary">
                <strong>Style:</strong> {currentStyle.charAt(0).toUpperCase() + currentStyle.slice(1)} • 
                <strong> Mode:</strong> {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-hive-text-primary mb-4">{currentPreview.title} Preview</h4>
            <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <p className="text-sm text-hive-text-secondary mb-4">{currentPreview.description}</p>
              
              <div className="space-y-3">
                <h6 className="font-semibold text-hive-text-primary">Benefits with {currentStyle} navigation:</h6>
                <ul className="space-y-2">
                  {currentPreview.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-hive-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm text-hive-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-3 bg-hive-background-tertiary rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-hive-text-secondary">Navigation Style Impact</span>
                  <div className="flex items-center space-x-2">
                    {currentStyle === 'auto' && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Adaptive</span>
                    )}
                    {currentStyle === 'sidebar' && (
                      <span className="px-2 py-1 bg-hive-emerald/20 text-hive-emerald text-xs rounded-full">Always Visible</span>
                    )}
                    {currentStyle === 'tabs' && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Space Efficient</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
            <h6 className="font-semibold text-hive-text-primary mb-2">Automatic</h6>
            <p className="text-sm text-hive-text-secondary mb-3">Best for most users</p>
            <div className="text-xs text-hive-text-secondary">
              Adapts to screen size and usage patterns
            </div>
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
            <h6 className="font-semibold text-hive-text-primary mb-2">Sidebar</h6>
            <p className="text-sm text-hive-text-secondary mb-3">Best for power users</p>
            <div className="text-xs text-hive-text-secondary">
              Always visible navigation for quick access
            </div>
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle text-center">
            <h6 className="font-semibold text-hive-text-primary mb-2">Top Tabs</h6>
            <p className="text-sm text-hive-text-secondary mb-3">Best for focus mode</p>
            <div className="text-xs text-hive-text-secondary">
              Maximizes content space while staying accessible
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// All preference states
export const AllPreferenceStates: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <h3 className="text-lg font-semibold text-hive-text-primary mb-6">All Navigation Preference States</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Automatic Selected</p>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <NavigationPreferences
              value="auto"
              onChange={(value) => alert(`Changed to: ${value}`)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Sidebar Selected</p>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <NavigationPreferences
              value="sidebar"
              onChange={(value) => alert(`Changed to: ${value}`)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Tabs Selected</p>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <NavigationPreferences
              value="tabs"
              onChange={(value) => alert(`Changed to: ${value}`)}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  render: () => {
    const [value, setValue] = useState<NavigationStyle>('auto');
    
    return (
      <div className="space-y-4 p-6 max-w-md">
        <h4 className="font-semibold text-hive-text-primary">Interactive Navigation Preferences</h4>
        <NavigationPreferences
          value={value}
          onChange={setValue}
        />
        <div className="p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
          <p className="text-sm text-hive-text-secondary">
            Current selection: <strong className="text-hive-text-primary">{value}</strong>
          </p>
        </div>
      </div>
    );
  },
};