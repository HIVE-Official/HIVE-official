import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationPreferences, NavigationStyle } from './navigation-preferences';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Monitor, Sidebar, MoreHorizontal, Smartphone, Tablet, Laptop } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof NavigationPreferences> = {
  title: '01-Atoms/Navigation Preferences - COMPLETE DEFINITION',
  component: NavigationPreferences,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Navigation Preferences - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The intelligent navigation preference selector for University at Buffalo adaptive interface customization.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Navigation Modes** - Auto, sidebar, top tabs for different user workflow preferences
- **Smart Selection Interface** - Radio button design with clear visual feedback
- **Adaptive Intelligence** - Auto mode adapts to screen size and usage patterns
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Responsive Design** - Optimized for all screen sizes and device types
- **Accessibility Ready** - Proper radio button semantics and keyboard navigation
- **Visual Feedback** - Clear active states and hover interactions
- **Campus Workflow** - Built for University at Buffalo student interface preferences

### 🎓 **UB ACADEMIC CONTEXT**
Perfect for University at Buffalo interface customization:
- **Study Preferences** - Sidebar for focused academic work, tabs for quick switching
- **Device Adaptation** - Auto mode for students switching between phone/laptop/tablet
- **Workflow Optimization** - Different navigation for different academic tasks
- **Accessibility Needs** - Customizable interface for diverse student requirements
- **Campus Mobility** - Navigation that adapts to on-the-go vs seated study sessions
- **Multi-tasking Support** - Interface preferences for managing multiple courses

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Controls** - Large, accessible radio buttons for mobile selection
- **Clear Visual Hierarchy** - Easy-to-scan options with descriptions
- **Responsive Layout** - Adapts beautifully from mobile to desktop
- **Smart Defaults** - Auto mode provides intelligent navigation for mobile users
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['auto', 'sidebar', 'tabs'],
      description: 'Current navigation preference',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationPreferences>;

// Interactive component wrapper for stories
const NavigationPreferencesWrapper = ({ initialValue = 'auto' }: { initialValue?: NavigationStyle }) => {
  const [value, setValue] = useState<NavigationStyle>(initialValue);
  
  return (
    <NavigationPreferences 
      value={value} 
      onChange={setValue}
    />
  );
};

// Default navigation preferences showcase
export const Default: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Navigation Preferences</CardTitle>
          <Text variant="body-sm" color="secondary">
            Choose how you'd like to navigate the HIVE platform
          </Text>
        </CardHeader>
        <CardContent>
          <NavigationPreferencesWrapper />
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Navigation Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🧭 NAVIGATION OPTIONS</Badge>
            Navigation Preference Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 distinct navigation modes for different University at Buffalo student workflows and preferences
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Automatic Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Smart Adaptation:</Text>
                  <NavigationPreferencesWrapper initialValue="auto" />
                  <Text variant="body-sm" color="secondary">
                    Automatically adapts to your screen size and usage patterns for optimal UB student experience
                  </Text>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Mobile</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Bottom tabs for thumb navigation</Text>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Tablet className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Tablet</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Collapsible sidebar for portrait/landscape</Text>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Desktop</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Full sidebar for productivity workflows</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Sidebar Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Persistent Sidebar:</Text>
                  <NavigationPreferencesWrapper initialValue="sidebar" />
                  <Text variant="body-sm" color="secondary">
                    Always show navigation in a side panel for consistent access to academic tools
                  </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Sidebar className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Benefits</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Quick course switching</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Persistent tool access</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Efficient for multi-tasking</Text></li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Best For</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Desktop study sessions</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Research workflows</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Large screen productivity</Text></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Top Tabs Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Horizontal Tabs:</Text>
                  <NavigationPreferencesWrapper initialValue="tabs" />
                  <Text variant="body-sm" color="secondary">
                    Show navigation as tabs at the top for clean, focused academic interface
                  </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <MoreHorizontal className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Benefits</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Maximized content area</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Clean, minimal interface</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Browser-like navigation</Text></li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Best For</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Reading-focused tasks</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Single-task workflows</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Presentation mode</Text></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VISUAL STATES</Badge>
            Preference Selection States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Clear visual feedback for different selection and interaction states
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Selection States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Auto Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="auto" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Sidebar Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="sidebar" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tabs Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="tabs" />
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
            Real Campus Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Navigation preferences in actual University at Buffalo student workflow contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Workflow Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Workflow Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Session (Desktop):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="sidebar" />
                    <Text variant="body-xs" color="secondary">
                      Research workflow with multiple course spaces, academic tools, and library resources
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Between Classes (Mobile):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Quick access to notifications, messages, and schedule while walking across campus
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Reading Assignment (Tablet):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="tabs" />
                    <Text variant="body-xs" color="secondary">
                      Focused reading with minimal distractions and maximized content area
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Academic Task Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Task Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Navigation Preferences by Academic Activity
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Research & Writing:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="sidebar" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Sidebar preferred for quick access to research tools, citation managers, and academic databases
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Course Reading:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="tabs" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Tabs preferred for distraction-free reading with full content focus
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Group Projects:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="sidebar" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Sidebar for managing multiple project spaces, team communications, and shared tools
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Mobile Campus Life:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="auto" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Auto mode adapts to device orientation and context while moving between classes
                        </Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Accessibility Considerations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Accessibility & Customization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Navigation preferences support diverse University at Buffalo student needs and accessibility requirements:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Motor Accessibility:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="sidebar" />
                    <Text variant="body-xs" color="secondary">
                      Persistent sidebar reduces navigation gestures and provides consistent target locations
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Visual Focus:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="tabs" />
                    <Text variant="body-xs" color="secondary">
                      Top tabs minimize visual clutter for students with attention or visual processing needs
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Cognitive Load:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Auto mode provides contextual navigation without requiring preference decisions
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Device Switching:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Seamless experience across phone, tablet, and laptop for campus mobility
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Context Examples */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Real Campus Context Examples:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Daily UB Student Scenarios
                </Text>
                
                <div className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">8:00 AM - Breakfast at Student Union</Text>
                      <NavigationPreferencesWrapper initialValue="auto" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Phone in portrait: Auto mode shows bottom tabs for checking today's schedule and assignments
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">10:30 AM - CSE 331 Lecture</Text>
                      <NavigationPreferencesWrapper initialValue="tabs" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Tablet in landscape: Tabs for distraction-free note-taking and slide viewing
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">2:00 PM - Lockwood Library Study</Text>
                      <NavigationPreferencesWrapper initialValue="sidebar" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Laptop: Sidebar for research workflow with course spaces, library databases, citation tools
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">6:00 PM - Dorm Room Assignment</Text>
                      <NavigationPreferencesWrapper initialValue="tabs" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Personal laptop: Tabs for focused writing with minimized navigation distractions
                      </Text>
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
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Navigation Preferences Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Try different navigation preference selections
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <NavigationPreferencesWrapper />
            <Text variant="body-sm" color="secondary">
              Interactive navigation preference testing for University at Buffalo interface customization
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};