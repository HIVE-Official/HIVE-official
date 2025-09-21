import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileToolsWidget, PersonalTool } from './profile-tools-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileToolsWidget> = {
  title: '03-Organisms/Profile Tools Widget - COMPLETE DEFINITION',
  component: ProfileToolsWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🛠️ HIVE Profile Tools Widget - Complete Organism Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal tool portfolio widget for University at Buffalo HIVE platform student tool creation and HiveLAB integration.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Tool Categories** - Academic, productivity, social, utility, experimental with distinct styling;
- **4 Tool Status States** - Active, draft, published, archived with proper lifecycle management;
- **Featured Tool Display** - Highlighted showcase for most successful or important tools;
- **Usage Analytics** - Total usage counts, likes received, and collaboration metrics;
- **Development Activity** - Weekly tool development progress with visual indicators;
- **Interactive Management** - Create, edit, view, and share tools with seamless workflows;
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming;
- **Mobile Optimized** - Touch-friendly design with responsive tool portfolio management;
- **Campus Integration** - Built for University at Buffalo student tool sharing and collaboration;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student tool creation:
- **Academic Tools** - GPA calculators, course planners, algorithm visualizers, study timers;
- **Productivity Tools** - Assignment trackers, schedule optimizers, deadline managers;
- **Social Tools** - Study group finders, roommate matchers, event coordinators;
- **Utility Tools** - Laundry trackers, dining hall menus, campus navigation, weather alerts;
- **Experimental Tools** - Creative projects, research prototypes, hackathon submissions;
- **Tool Sharing** - Public tool marketplace for campus-wide utility and collaboration;
- **Collaboration Features** - Multi-student tool development and version management;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large tool cards and clear interaction zones;
- **Quick Tool Access** - One-touch tool launching and editing while on campus;
- **Gesture Support** - Swipe interactions for tool navigation and management;
- **Responsive Portfolio** - Adaptive tool display for mobile development workflow;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User profile data',
    },
    personalTools: {
      control: 'object',
      description: 'Array of personal tools created',
    },
    totalToolsCreated: {
      control: 'number',
      description: 'Total number of tools created',
    },
    totalUsage: {
      control: 'number',
      description: 'Total usage across all tools',
    },
    featuredTool: {
      control: 'object',
      description: 'Featured tool to highlight',
    },
    weeklyActivity: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Weekly development activity percentage',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing controls',
    },
    onCreateTool: {
      action: 'create-tool',
      description: 'Create new tool handler',
    },
    onViewTool: {
      action: 'view-tool',
      description: 'View tool handler',
    },
    onEditTool: {
      action: 'edit-tool',
      description: 'Edit tool handler',
    },
    onViewAllTools: {
      action: 'view-all-tools',
      description: 'View all tools handler',
    },
    onToolMarketplace: {
      action: 'tool-marketplace',
      description: 'Tool marketplace handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileToolsWidget>;

// Sample tool data for stories;
const sampleTools = {
  activeCreator: [
    {
      id: 'ub-gpa-calculator',
      name: 'UB GPA Calculator',
      description: 'Smart GPA calculator that accounts for UB credit hours and helps plan your academic goals with semester projections.',
      category: 'academic' as const,
      status: 'published' as const,
      usageCount: 2847,
      likes: 156,
      collaborators: 3,
      lastUsed: '2 hours ago',
      isPublic: true,
      isFeatured: true;
    },
    {
      id: 'study-group-matcher',
      name: 'CSE Study Group Matcher',
      description: 'Find perfect study partners for computer science courses based on schedule, location, and learning style.',
      category: 'social' as const,
      status: 'active' as const,
      usageCount: 1234,
      likes: 89,
      collaborators: 2,
      lastUsed: '1 day ago',
      isPublic: true;
    },
    {
      id: 'lockwood-availability',
      name: 'Lockwood Study Room Finder',
      description: 'Real-time availability checker for Lockwood Library study rooms with booking integration.',
      category: 'utility' as const,
      status: 'published' as const,
      usageCount: 5672,
      likes: 234,
      lastUsed: '3 hours ago',
      isPublic: true;
    },
    {
      id: 'algorithm-visualizer',
      name: 'Algorithm Visualization Tool',
      description: 'Interactive visualizations for CSE 331 algorithms including sorting, search, and graph algorithms.',
      category: 'academic' as const,
      status: 'draft' as const,
      usageCount: 45,
      likes: 12,
      collaborators: 4,
      lastUsed: '1 hour ago',
      isPublic: false;
    },
    {
      id: 'campus-weather-alerts',
      name: 'UB Campus Weather Alerts',
      description: 'Smart weather notifications for outdoor activities and campus events with Buffalo microclimate data.',
      category: 'utility' as const,
      status: 'active' as const,
      usageCount: 892,
      likes: 67,
      lastUsed: '12 hours ago',
      isPublic: true;
    }
  ],
  newCreator: [
    {
      id: 'first-tool-schedule',
      name: 'My Course Schedule',
      description: 'Personal course schedule with notifications and assignment tracking for freshman year.',
      category: 'productivity' as const,
      status: 'draft' as const,
      usageCount: 12,
      likes: 3,
      lastUsed: '30 minutes ago',
      isPublic: false;
    }
  ],
  experimentalCreator: [
    {
      id: 'neural-network-demo',
      name: 'Neural Network Playground',
      description: 'Interactive neural network builder for machine learning course demonstrations and experiments.',
      category: 'experimental' as const,
      status: 'published' as const,
      usageCount: 567,
      likes: 45,
      collaborators: 8,
      lastUsed: '4 hours ago',
      isPublic: true,
      isFeatured: true;
    },
    {
      id: 'ar-campus-navigation',
      name: 'AR Campus Navigation',
      description: 'Augmented reality campus navigation using WebXR for immersive UB building and classroom finding.',
      category: 'experimental' as const,
      status: 'draft' as const,
      usageCount: 23,
      likes: 8,
      collaborators: 3,
      lastUsed: '2 days ago',
      isPublic: false;
    }
  ]
};

const sampleUser = {
  id: 'sarah-chen-tools',
  name: 'Sarah Chen'
};

// Default profile tools widget showcase;
export const Default: Story = {
  args: {
    user: sampleUser,
    personalTools: sampleTools.activeCreator,
    totalToolsCreated: 12,
    totalUsage: 15847,
    featuredTool: sampleTools.activeCreator[0],
    weeklyActivity: 78,
    isEditable: true,
    onCreateTool: action('create-tool-clicked'),
    onViewTool: action('view-tool-clicked'),
    onEditTool: action('edit-tool-clicked'),
    onViewAllTools: action('view-all-tools-clicked'),
    onToolMarketplace: action('tool-marketplace-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile tools widget for University at Buffalo student tool portfolio:
      </Text>
      <ProfileToolsWidget {...args} />
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Tool Creator Profiles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🛠️ TOOL CREATOR PROFILES</Badge>
            Student Development Levels;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Tool widget variations for different University at Buffalo student development levels and creation experiences;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Creator Development Stages:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Active Tool Creator:</Text>
                    <ProfileToolsWidget;
                      user={sampleUser}
                      personalTools={sampleTools.activeCreator}
                      totalToolsCreated={12}
                      totalUsage={15847}
                      featuredTool={sampleTools.activeCreator[0]}
                      weeklyActivity={78}
                      isEditable={true}
                      onCreateTool={action('active-creator-create')}
                      onViewTool={action('active-creator-view')}
                      onEditTool={action('active-creator-edit')}
                      onViewAllTools={action('active-creator-all')}
                      onToolMarketplace={action('active-creator-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Experienced creator with multiple published tools and high campus usage;
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">New Tool Creator:</Text>
                    <ProfileToolsWidget;
                      user={{
                        id: 'jamie-new-creator',
                        name: 'Jamie Park'
                      }}
                      personalTools={sampleTools.newCreator}
                      totalToolsCreated={1}
                      totalUsage={12}
                      featuredTool={sampleTools.newCreator[0]}
                      weeklyActivity={45}
                      isEditable={true}
                      onCreateTool={action('new-creator-create')}
                      onViewTool={action('new-creator-view')}
                      onEditTool={action('new-creator-edit')}
                      onViewAllTools={action('new-creator-all')}
                      onToolMarketplace={action('new-creator-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Beginning creator working on first tool, learning development workflow;
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Experimental Creator:</Text>
                    <ProfileToolsWidget;
                      user={{
                        id: 'alex-experimental',
                        name: 'Alex Rivera'
                      }}
                      personalTools={sampleTools.experimentalCreator}
                      totalToolsCreated={8}
                      totalUsage={3456}
                      featuredTool={sampleTools.experimentalCreator[0]}
                      weeklyActivity={92}
                      isEditable={true}
                      onCreateTool={action('experimental-creator-create')}
                      onViewTool={action('experimental-creator-view')}
                      onEditTool={action('experimental-creator-edit')}
                      onViewAllTools={action('experimental-creator-all')}
                      onToolMarketplace={action('experimental-creator-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Advanced creator focusing on experimental technologies and research projects;
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Empty State:</Text>
                    <ProfileToolsWidget;
                      user={{
                        id: 'david-empty',
                        name: 'David Kim'
                      }}
                      personalTools={[]}
                      totalToolsCreated={0}
                      totalUsage={0}
                      weeklyActivity={0}
                      isEditable={true}
                      onCreateTool={action('empty-create-first')}
                      onViewTool={action('empty-view')}
                      onEditTool={action('empty-edit')}
                      onViewAllTools={action('empty-all')}
                      onToolMarketplace={action('empty-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      New student ready to create their first tool with empty state encouragement;
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Tool Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 TOOL CATEGORIES</Badge>
            Development Focus Areas;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 tool categories for comprehensive University at Buffalo student tool development and campus utility;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Tool Development Categories:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Tools:</Text>
                    <ProfileToolsWidget;
                      user={sampleUser}
                      personalTools={[
                        {
                          id: 'academic-tool-1',
                          name: 'UB GPA Calculator Pro',
                          description: 'Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.',
                          category: 'academic',
                          status: 'published',
                          usageCount: 3456,
                          likes: 189,
                          collaborators: 4,
                          isPublic: true,
                          isFeatured: true;
                        },
                        {
                          id: 'academic-tool-2',
                          name: 'Algorithm Complexity Analyzer',
                          description: 'Visual tool for analyzing time and space complexity of algorithms in CSE courses.',
                          category: 'academic',
                          status: 'active',
                          usageCount: 1234,
                          likes: 67,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={8}
                      totalUsage={12456}
                      featuredTool={{
                        id: 'academic-tool-1',
                        name: 'UB GPA Calculator Pro',
                        description: 'Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.',
                        category: 'academic',
                        status: 'published',
                        usageCount: 3456,
                        likes: 189,
                        collaborators: 4,
                        isPublic: true,
                        isFeatured: true;
                      }}
                      weeklyActivity={65}
                      isEditable={true}
                      onCreateTool={action('academic-create')}
                      onViewTool={action('academic-view')}
                      onEditTool={action('academic-edit')}
                      onViewAllTools={action('academic-all')}
                      onToolMarketplace={action('academic-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Tools for academic success: calculators, visualizers, course planners, study aids;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Productivity Tools:</Text>
                    <ProfileToolsWidget;
                      user={sampleUser}
                      personalTools={[
                        {
                          id: 'productivity-tool-1',
                          name: 'Smart Assignment Tracker',
                          description: 'AI-powered assignment tracker that integrates with UB Learn and predicts workload.',
                          category: 'productivity',
                          status: 'published',
                          usageCount: 2891,
                          likes: 145,
                          collaborators: 2,
                          isPublic: true,
                          isFeatured: true;
                        },
                        {
                          id: 'productivity-tool-2',
                          name: 'Study Schedule Optimizer',
                          description: 'Optimizes study schedules based on course difficulty, personal energy levels, and deadlines.',
                          category: 'productivity',
                          status: 'active',
                          usageCount: 856,
                          likes: 43,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={6}
                      totalUsage={8945}
                      featuredTool={{
                        id: 'productivity-tool-1',
                        name: 'Smart Assignment Tracker',
                        description: 'AI-powered assignment tracker that integrates with UB Learn and predicts workload.',
                        category: 'productivity',
                        status: 'published',
                        usageCount: 2891,
                        likes: 145,
                        collaborators: 2,
                        isPublic: true,
                        isFeatured: true;
                      }}
                      weeklyActivity={82}
                      isEditable={true}
                      onCreateTool={action('productivity-create')}
                      onViewTool={action('productivity-view')}
                      onEditTool={action('productivity-edit')}
                      onViewAllTools={action('productivity-all')}
                      onToolMarketplace={action('productivity-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Tools for efficiency: schedulers, trackers, organizers, automation utilities;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Social Tools:</Text>
                    <ProfileToolsWidget;
                      user={sampleUser}
                      personalTools={[
                        {
                          id: 'social-tool-1',
                          name: 'Study Group Matchmaker',
                          description: 'Smart matching for study partners based on courses, schedules, and learning styles.',
                          category: 'social',
                          status: 'published',
                          usageCount: 4567,
                          likes: 234,
                          collaborators: 6,
                          isPublic: true,
                          isFeatured: true;
                        },
                        {
                          id: 'social-tool-2',
                          name: 'Campus Event Coordinator',
                          description: 'Easy event creation and coordination for student organizations and study groups.',
                          category: 'social',
                          status: 'active',
                          usageCount: 1892,
                          likes: 98,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={10}
                      totalUsage={18934}
                      featuredTool={{
                        id: 'social-tool-1',
                        name: 'Study Group Matchmaker',
                        description: 'Smart matching for study partners based on courses, schedules, and learning styles.',
                        category: 'social',
                        status: 'published',
                        usageCount: 4567,
                        likes: 234,
                        collaborators: 6,
                        isPublic: true,
                        isFeatured: true;
                      }}
                      weeklyActivity={91}
                      isEditable={true}
                      onCreateTool={action('social-create')}
                      onViewTool={action('social-view')}
                      onEditTool={action('social-edit')}
                      onViewAllTools={action('social-all')}
                      onToolMarketplace={action('social-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Tools for connection: matchmakers, coordinators, communication enhancers;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Utility Tools:</Text>
                    <ProfileToolsWidget;
                      user={sampleUser}
                      personalTools={[
                        {
                          id: 'utility-tool-1',
                          name: 'UB Laundry Tracker',
                          description: 'Real-time laundry machine availability across all UB residence halls with notifications.',
                          category: 'utility',
                          status: 'published',
                          usageCount: 8934,
                          likes: 456,
                          collaborators: 3,
                          isPublic: true,
                          isFeatured: true;
                        },
                        {
                          id: 'utility-tool-2',
                          name: 'Campus Navigation GPS',
                          description: 'Indoor and outdoor navigation for UB campus with accessibility route options.',
                          category: 'utility',
                          status: 'active',
                          usageCount: 3456,
                          likes: 178,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={15}
                      totalUsage={34567}
                      featuredTool={{
                        id: 'utility-tool-1',
                        name: 'UB Laundry Tracker',
                        description: 'Real-time laundry machine availability across all UB residence halls with notifications.',
                        category: 'utility',
                        status: 'published',
                        usageCount: 8934,
                        likes: 456,
                        collaborators: 3,
                        isPublic: true,
                        isFeatured: true;
                      }}
                      weeklyActivity={73}
                      isEditable={true}
                      onCreateTool={action('utility-create')}
                      onViewTool={action('utility-view')}
                      onEditTool={action('utility-edit')}
                      onViewAllTools={action('utility-all')}
                      onToolMarketplace={action('utility-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Tools for campus life: navigation, services, facilities, daily essentials;
                    </Text>
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
            Real Campus Tool Development Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile tools widget usage in actual University at Buffalo student tool creation and campus utility contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Student - Academic Tool Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - CS Junior Tool Portfolio (Algorithm & Data Structure Focus)
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Published Academic Tools:</Text>
                    <ProfileToolsWidget;
                      user={{
                        id: 'sarah-cs-academic',
                        name: 'Sarah Chen',
                      }}
                      personalTools={[
                        {
                          id: 'cse331-visualizer',
                          name: 'CSE 331 Algorithm Visualizer',
                          description: 'Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.',
                          category: 'academic',
                          status: 'published',
                          usageCount: 2847,
                          likes: 156,
                          collaborators: 4,
                          isPublic: true,
                          isFeatured: true;
                        },
                        {
                          id: 'data-structure-tester',
                          name: 'Data Structure Performance Tester',
                          description: 'Benchmark and compare performance of different data structures for CSE 250 assignments.',
                          category: 'academic',
                          status: 'published',
                          usageCount: 1456,
                          likes: 89,
                          collaborators: 2,
                          isPublic: true;
                        },
                        {
                          id: 'complexity-calculator',
                          name: 'Big O Complexity Calculator',
                          description: 'Analyze code snippets and calculate time/space complexity for algorithm design courses.',
                          category: 'academic',
                          status: 'active',
                          usageCount: 892,
                          likes: 45,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={8}
                      totalUsage={12456}
                      featuredTool={{
                        id: 'cse331-visualizer',
                        name: 'CSE 331 Algorithm Visualizer',
                        description: 'Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.',
                        category: 'academic',
                        status: 'published',
                        usageCount: 2847,
                        likes: 156,
                        collaborators: 4,
                        isPublic: true,
                        isFeatured: true;
                      }}
                      weeklyActivity={85}
                      isEditable={true}
                      onCreateTool={action('cs-academic-create')}
                      onViewTool={action('cs-academic-view')}
                      onEditTool={action('cs-academic-edit')}
                      onViewAllTools={action('cs-academic-all')}
                      onToolMarketplace={action('cs-academic-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Academic tools helping CSE students visualize and understand complex algorithms;
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research & Experimental:</Text>
                    <ProfileToolsWidget;
                      user={{
                        id: 'sarah-cs-research',
                        name: 'Sarah Chen',
                      }}
                      personalTools={[
                        {
                          id: 'ml-playground',
                          name: 'Machine Learning Playground',
                          description: 'Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.',
                          category: 'experimental',
                          status: 'draft',
                          usageCount: 234,
                          likes: 23,
                          collaborators: 6,
                          isPublic: false,
                          isFeatured: true;
                        },
                        {
                          id: 'neural-net-builder',
                          name: 'Neural Network Architecture Builder',
                          description: 'Drag-and-drop neural network designer for understanding deep learning concepts in AI courses.',
                          category: 'experimental',
                          status: 'active',
                          usageCount: 567,
                          likes: 34,
                          collaborators: 3,
                          isPublic: true;
                        }
                      ]}
                      totalToolsCreated={12}
                      totalUsage={8934}
                      featuredTool={{
                        id: 'ml-playground',
                        name: 'Machine Learning Playground',
                        description: 'Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.',
                        category: 'experimental',
                        status: 'draft',
                        usageCount: 234,
                        likes: 23,
                        collaborators: 6,
                        isPublic: false,
                        isFeatured: true;
                      }}
                      weeklyActivity={92}
                      isEditable={true}
                      onCreateTool={action('cs-research-create')}
                      onViewTool={action('cs-research-view')}
                      onEditTool={action('cs-research-edit')}
                      onViewAllTools={action('cs-research-all')}
                      onToolMarketplace={action('cs-research-marketplace')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Experimental tools for AI/ML research and advanced computer science exploration;
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Engineering Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Student - Project & Collaboration Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Senior Design Tools:</Text>
                  <ProfileToolsWidget;
                    user={{
                      id: 'alex-engineering-design',
                      name: 'Alex Rivera',
                    }}
                    personalTools={[
                      {
                        id: 'drone-controller-sim',
                        name: 'Autonomous Drone Simulator',
                        description: 'Flight simulation and control testing environment for senior design autonomous drone project.',
                        category: 'experimental',
                        status: 'published',
                        usageCount: 892,
                        likes: 67,
                        collaborators: 5,
                        isPublic: true,
                        isFeatured: true;
                      },
                      {
                        id: 'sensor-data-visualizer',
                        name: 'Real-Time Sensor Dashboard',
                        description: 'Live sensor data visualization for robotics projects with multi-device synchronization.',
                        category: 'utility',
                        status: 'active',
                        usageCount: 456,
                        likes: 34,
                        collaborators: 4,
                        isPublic: true;
                      }
                    ]}
                    totalToolsCreated={6}
                    totalUsage={4567}
                    featuredTool={{
                      id: 'drone-controller-sim',
                      name: 'Autonomous Drone Simulator',
                      description: 'Flight simulation and control testing environment for senior design autonomous drone project.',
                      category: 'experimental',
                      status: 'published',
                      usageCount: 892,
                      likes: 67,
                      collaborators: 5,
                      isPublic: true,
                      isFeatured: true;
                    }}
                    weeklyActivity={78}
                    isEditable={true}
                    onCreateTool={action('engineering-design-create')}
                    onViewTool={action('engineering-design-view')}
                    onEditTool={action('engineering-design-edit')}
                    onViewAllTools={action('engineering-design-all')}
                    onToolMarketplace={action('engineering-design-marketplace')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Senior design project tools for autonomous systems and robotics development;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Organization Tools:</Text>
                  <ProfileToolsWidget;
                    user={{
                      id: 'alex-organization-tools',
                      name: 'Alex Rivera',
                    }}
                    personalTools={[
                      {
                        id: 'robotics-club-manager',
                        name: 'Robotics Club Project Manager',
                        description: 'Project coordination tool for UB Robotics Club with task assignment and progress tracking.',
                        category: 'social',
                        status: 'published',
                        usageCount: 234,
                        likes: 45,
                        collaborators: 12,
                        isPublic: true,
                        isFeatured: true;
                      },
                      {
                        id: 'hackathon-team-builder',
                        name: 'UB Hackathon Team Builder',
                        description: 'Smart team formation for UB hackathons based on skills, interests, and availability.',
                        category: 'social',
                        status: 'active',
                        usageCount: 567,
                        likes: 89,
                        collaborators: 8,
                        isPublic: true;
                      }
                    ]}
                    totalToolsCreated={9}
                    totalUsage={3456}
                    featuredTool={{
                      id: 'robotics-club-manager',
                      name: 'Robotics Club Project Manager',
                      description: 'Project coordination tool for UB Robotics Club with task assignment and progress tracking.',
                      category: 'social',
                      status: 'published',
                      usageCount: 234,
                      likes: 45,
                      collaborators: 12,
                      isPublic: true,
                      isFeatured: true;
                    }}
                    weeklyActivity={65}
                    isEditable={true}
                    onCreateTool={action('organization-tools-create')}
                    onViewTool={action('organization-tools-view')}
                    onEditTool={action('organization-tools-edit')}
                    onViewAllTools={action('organization-tools-all')}
                    onToolMarketplace={action('organization-tools-marketplace')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Leadership tools for student organizations and campus event coordination;
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Pre-Med Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Pre-Med Student - Academic & Research Tool Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">MCAT Preparation Tools:</Text>
                  <ProfileToolsWidget;
                    user={{
                      id: 'jamie-premed-mcat',
                      name: 'Jamie Park',
                    }}
                    personalTools={[
                      {
                        id: 'mcat-physics-simulator',
                        name: 'MCAT Physics Problem Simulator',
                        description: 'Interactive physics simulations for MCAT preparation with step-by-step solutions.',
                        category: 'academic',
                        status: 'published',
                        usageCount: 1456,
                        likes: 123,
                        collaborators: 3,
                        isPublic: true,
                        isFeatured: true;
                      },
                      {
                        id: 'biochemistry-pathways',
                        name: 'Biochemical Pathways Visualizer',
                        description: 'Interactive metabolic pathway diagrams for organic chemistry and biochemistry study.',
                        category: 'academic',
                        status: 'active',
                        usageCount: 789,
                        likes: 56,
                        isPublic: true;
                      }
                    ]}
                    totalToolsCreated={5}
                    totalUsage={3456}
                    featuredTool={{
                      id: 'mcat-physics-simulator',
                      name: 'MCAT Physics Problem Simulator',
                      description: 'Interactive physics simulations for MCAT preparation with step-by-step solutions.',
                      category: 'academic',
                      status: 'published',
                      usageCount: 1456,
                      likes: 123,
                      collaborators: 3,
                      isPublic: true,
                      isFeatured: true;
                    }}
                    weeklyActivity={89}
                    isEditable={true}
                    onCreateTool={action('premed-mcat-create')}
                    onViewTool={action('premed-mcat-view')}
                    onEditTool={action('premed-mcat-edit')}
                    onViewAllTools={action('premed-mcat-all')}
                    onToolMarketplace={action('premed-mcat-marketplace')}
                  />
                  <Text variant="body-xs" color="secondary">
                    MCAT preparation tools for physics, chemistry, and biological sciences;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research & Clinical Tools:</Text>
                  <ProfileToolsWidget;
                    user={{
                      id: 'jamie-premed-research',
                      name: 'Jamie Park',
                    }}
                    personalTools={[
                      {
                        id: 'clinical-data-tracker',
                        name: 'Clinical Research Data Tracker',
                        description: 'Patient data tracking tool for clinical research at Erie County Medical Center internship.',
                        category: 'productivity',
                        status: 'draft',
                        usageCount: 45,
                        likes: 8,
                        collaborators: 4,
                        isPublic: false,
                        isFeatured: true;
                      },
                      {
                        id: 'anatomy-study-cards',
                        name: 'Interactive Anatomy Study Cards',
                        description: 'Flashcard system with 3D anatomical models for human anatomy and physiology courses.',
                        category: 'academic',
                        status: 'published',
                        usageCount: 892,
                        likes: 67,
                        isPublic: true;
                      }
                    ]}
                    totalToolsCreated={7}
                    totalUsage={2345}
                    featuredTool={{
                      id: 'clinical-data-tracker',
                      name: 'Clinical Research Data Tracker',
                      description: 'Patient data tracking tool for clinical research at Erie County Medical Center internship.',
                      category: 'productivity',
                      status: 'draft',
                      usageCount: 45,
                      likes: 8,
                      collaborators: 4,
                      isPublic: false,
                      isFeatured: true;
                    }}
                    weeklyActivity={76}
                    isEditable={true}
                    onCreateTool={action('premed-research-create')}
                    onViewTool={action('premed-research-view')}
                    onEditTool={action('premed-research-edit')}
                    onViewAllTools={action('premed-research-all')}
                    onToolMarketplace={action('premed-research-marketplace')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Research and clinical tools for medical school preparation and healthcare experience;
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Tool Development */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Tool Development Experience:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized tools widget for on-campus development and management:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Development Workflow:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Tool Management</Text>
                    <Text variant="body-xs" color="secondary">
                      Quick tool editing and testing while walking between Davis Hall and lab sessions;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch tool publishing for immediate campus sharing and feedback;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Real-time usage analytics viewing during study breaks and between classes;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Mobile-first tool creation with responsive preview and testing capabilities;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus-Integrated Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Location-Aware Tool Development</Text>
                    <Text variant="body-xs" color="secondary">
                      Building-specific tools with automatic UB location integration and services;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Campus API integration for dining, transportation, and facility services;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Collaborative development with real-time sharing among project teammates;
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Tool marketplace discovery with campus usage analytics and peer feedback;
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

// Interactive playground;
export const Playground: Story = {
  args: {
    user: sampleUser,
    personalTools: sampleTools.activeCreator.slice(0, 3),
    totalToolsCreated: 8,
    totalUsage: 12456,
    featuredTool: sampleTools.activeCreator[0],
    weeklyActivity: 65,
    isEditable: true,
    onCreateTool: action('playground-create-tool'),
    onViewTool: action('playground-view-tool'),
    onEditTool: action('playground-edit-tool'),
    onViewAllTools: action('playground-view-all-tools'),
    onToolMarketplace: action('playground-tool-marketplace'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Tools Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different tools widget configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileToolsWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive tools widget testing for University at Buffalo HIVE platform student tool development;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};