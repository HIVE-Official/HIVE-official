import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHiveLabWidget } from './profile-hivelab-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileHiveLabWidget> = {
  title: '04-Organisms/Profile System/Profile HiveLab Widget - COMPLETE DEFINITION',
  component: ProfileHiveLabWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Profile HiveLab Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive builder tools and development workspace interface for University at Buffalo HIVE platform student innovation and tool creation tracking.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Tool Categories** - Academic, productivity, social, utility, experimental for complete development coverage
- **5 Build Statuses** - Concept, prototype, testing, published, archived for comprehensive project lifecycle
- **4 Builder Levels** - Novice, apprentice, expert, master for skill progression and community recognition
- **Project Management** - Individual, team, hackathon, academic project tracking with progress monitoring
- **Deployment Pipeline** - Testing to production deployment with collaboration and version control
- **Builder Analytics** - Build time tracking, collaboration metrics, and skill development insights
- **Campus Innovation** - University at Buffalo specific tool development for academic and social utility
- **Technology Integration** - Stack tracking, framework usage, and technical skill development

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student innovation and tool development:
- **Academic Tools** - Course utilities, study aids, academic planning tools for UB curriculum
- **Campus Utilities** - Residence hall tools, dining coordination, campus navigation solutions
- **Social Innovation** - Community building tools, event coordination, peer collaboration platforms
- **Professional Development** - Portfolio builders, career tools, networking utilities for UB students
- **Research Projects** - Academic research tools, data analysis utilities, experiment coordination
- **Hackathon Development** - Competition projects, innovation challenges, collaborative development
- **Skill Building** - Progressive builder levels with mentorship and peer learning opportunities

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Builder Interface** - Large build action buttons optimized for mobile development workflow
- **Responsive Project Management** - Adaptive layout for code editing and project coordination on mobile
- **Quick Deploy Actions** - One-tap deployment and collaboration features for on-the-go development
- **Mobile Development Support** - Campus-based mobile app development with location-aware features
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    builderTools: {
      control: 'object',
      description: 'Array of builder tool projects',
    },
    activeProjects: {
      control: 'object',
      description: 'Array of active development projects',
    },
    totalBuilds: {
      control: 'number',
      description: 'Total number of tools built',
    },
    totalDeployments: {
      control: 'number',
      description: 'Total successful deployments',
    },
    totalCollaborations: {
      control: 'number',
      description: 'Total collaborative projects',
    },
    builderScore: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Builder skill score percentage',
    },
    weeklyBuildTime: {
      control: 'number',
      description: 'Hours spent building this week',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing capabilities',
    },
    onCreateTool: {
      action: 'create-tool',
      description: 'Create new tool handler',
    },
    onViewTool: {
      action: 'view-tool',
      description: 'View tool details handler',
    },
    onEditTool: {
      action: 'edit-tool',
      description: 'Edit tool handler',
    },
    onDeployTool: {
      action: 'deploy-tool',
      description: 'Deploy tool handler',
    },
    onViewAllBuilds: {
      action: 'view-all-builds',
      description: 'View all builds handler',
    },
    onViewBuildLab: {
      action: 'view-build-lab',
      description: 'Open build lab handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileHiveLabWidget>;

// Mock builder tools for University at Buffalo scenarios
const mockBuilderToolsNovice = [
  {
    id: 'tool-001',
    name: 'UB GPA Calculator',
    description: 'Simple GPA calculation tool for UB students',
    category: 'academic' as const,
    buildStatus: 'prototype' as const,
    progress: 45,
    collaborators: 1,
    deployments: 0,
    lastWorkedOn: '2024-01-15T10:30:00Z',
    isPublic: false,
    technologyStack: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'tool-002',
    name: 'Study Group Finder',
    description: 'Find and join study groups for UB courses',
    category: 'social' as const,
    buildStatus: 'concept' as const,
    progress: 15,
    collaborators: 2,
    deployments: 0,
    lastWorkedOn: '2024-01-15T09:15:00Z',
    isPublic: false,
    technologyStack: ['React', 'Node.js']
  }
];

const mockBuilderToolsAdvanced = [
  {
    id: 'tool-101',
    name: 'UB Course Scheduler Pro',
    description: 'Advanced course scheduling with conflict detection and optimization',
    category: 'academic' as const,
    buildStatus: 'published' as const,
    progress: 100,
    collaborators: 4,
    deployments: 12,
    lastWorkedOn: '2024-01-15T11:30:00Z',
    isPublic: true,
    isFeatured: true,
    technologyStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'tool-102',
    name: 'Campus Event Coordination System',
    description: 'Comprehensive event planning and coordination platform for UB organizations',
    category: 'social' as const,
    buildStatus: 'testing' as const,
    progress: 85,
    collaborators: 6,
    deployments: 3,
    lastWorkedOn: '2024-01-15T11:00:00Z',
    isPublic: true,
    technologyStack: ['Vue.js', 'Express', 'MongoDB', 'Socket.io']
  },
  {
    id: 'tool-103',
    name: 'Research Data Analysis Tool',
    description: 'Statistical analysis and visualization for UB research projects',
    category: 'academic' as const,
    buildStatus: 'published' as const,
    progress: 100,
    collaborators: 3,
    deployments: 8,
    lastWorkedOn: '2024-01-15T10:45:00Z',
    isPublic: true,
    technologyStack: ['Python', 'Django', 'D3.js', 'NumPy']
  },
  {
    id: 'tool-104',
    name: 'Ellicott Complex Utilities Hub',
    description: 'Integrated utilities for residence hall coordination and community building',
    category: 'utility' as const,
    buildStatus: 'testing' as const,
    progress: 70,
    collaborators: 5,
    deployments: 2,
    lastWorkedOn: '2024-01-15T10:15:00Z',
    isPublic: false,
    technologyStack: ['React Native', 'Firebase', 'Google Maps API']
  },
  {
    id: 'tool-105',
    name: 'AI Study Assistant',
    description: 'Machine learning powered study recommendations and progress tracking',
    category: 'experimental' as const,
    buildStatus: 'prototype' as const,
    progress: 60,
    collaborators: 7,
    deployments: 1,
    lastWorkedOn: '2024-01-15T09:30:00Z',
    isPublic: false,
    technologyStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis']
  }
];

const mockActiveProjectsBasic = [
  {
    id: 'project-001',
    name: 'CSE 442 Group Project',
    description: 'Software engineering team project for course requirement',
    type: 'academic' as const,
    deadline: '2024-02-15T23:59:59Z',
    progress: 65,
    teamSize: 4,
    isActive: true
  }
];

const mockActiveProjectsAdvanced = [
  {
    id: 'project-101',
    name: 'UB Hackathon 2024 - Campus AI',
    description: 'Artificial intelligence solutions for campus life optimization',
    type: 'hackathon' as const,
    deadline: '2024-01-20T18:00:00Z',
    progress: 78,
    teamSize: 5,
    isActive: true
  },
  {
    id: 'project-102',
    name: 'NSF Research Tool Development',
    description: 'National Science Foundation funded research platform development',
    type: 'academic' as const,
    deadline: '2024-03-30T23:59:59Z',
    progress: 45,
    teamSize: 8,
    isActive: true
  },
  {
    id: 'project-103',
    name: 'HIVE Platform Core Development',
    description: 'Contributing to main HIVE platform feature development',
    type: 'team' as const,
    progress: 92,
    teamSize: 12,
    isActive: true
  }
];

// Default HiveLab widget showcase
export const Default: Story = {
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen',
      builderLevel: 'apprentice'
    },
    builderTools: mockBuilderToolsNovice,
    activeProjects: mockActiveProjectsBasic,
    totalBuilds: 5,
    totalDeployments: 2,
    totalCollaborations: 8,
    builderScore: 65,
    weeklyBuildTime: 12,
    featuredBuild: mockBuilderToolsNovice[0],
    isEditable: true,
    onCreateTool: action('create-tool'),
    onViewTool: action('view-tool'),
    onEditTool: action('edit-tool'),
    onDeployTool: action('deploy-tool'),
    onViewAllBuilds: action('view-all-builds'),
    onViewBuildLab: action('view-build-lab'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile HiveLab widget for University at Buffalo student innovation and tool development:
          </Text>
          <ProfileHiveLabWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive builder workspace with tool development tracking, collaboration features, and UB campus innovation focus
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
      
      {/* HiveLab Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🎯 HIVELAB WIDGET SYSTEM</Badge>
            Builder Tools & Innovation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile HiveLab widget system for University at Buffalo HIVE platform student innovation and tool development tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">HiveLab Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Novice Builder:</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-001', name: 'Sarah Johnson', builderLevel: 'novice' }}
                      builderTools={mockBuilderToolsNovice}
                      activeProjects={mockActiveProjectsBasic}
                      totalBuilds={2}
                      totalDeployments={0}
                      totalCollaborations={3}
                      builderScore={35}
                      weeklyBuildTime={8}
                      featuredBuild={mockBuilderToolsNovice[0]}
                      onCreateTool={action('novice-create-tool')}
                      onViewTool={action('novice-view-tool')}
                      onEditTool={action('novice-edit-tool')}
                      onDeployTool={action('novice-deploy-tool')}
                      onViewAllBuilds={action('novice-view-all')}
                      onViewBuildLab={action('novice-view-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Beginning builder learning tool development with first projects and academic focus
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Master Builder:</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-002', name: 'Marcus Rodriguez', builderLevel: 'master' }}
                      builderTools={mockBuilderToolsAdvanced}
                      activeProjects={mockActiveProjectsAdvanced}
                      totalBuilds={28}
                      totalDeployments={45}
                      totalCollaborations={67}
                      builderScore={96}
                      weeklyBuildTime={25}
                      featuredBuild={mockBuilderToolsAdvanced[0]}
                      onCreateTool={action('master-create-tool')}
                      onViewTool={action('master-view-tool')}
                      onEditTool={action('master-edit-tool')}
                      onDeployTool={action('master-deploy-tool')}
                      onViewAllBuilds={action('master-view-all')}
                      onViewBuildLab={action('master-view-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Advanced builder with extensive portfolio, leadership roles, and research contributions
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Builder Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🚀 BUILDER LEVELS</Badge>
            Skill Progression System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 builder levels for University at Buffalo student skill development and community recognition in tool creation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Builder Level Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Novice Builder (0-25 points):</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-novice', name: 'Emma Martinez', builderLevel: 'novice' }}
                      builderTools={[mockBuilderToolsNovice[0]]}
                      activeProjects={[mockActiveProjectsBasic[0]]}
                      totalBuilds={1}
                      totalDeployments={0}
                      totalCollaborations={1}
                      builderScore={18}
                      weeklyBuildTime={5}
                      onCreateTool={action('novice-level-create')}
                      onViewTool={action('novice-level-view')}
                      onEditTool={action('novice-level-edit')}
                      onDeployTool={action('novice-level-deploy')}
                      onViewAllBuilds={action('novice-level-all')}
                      onViewBuildLab={action('novice-level-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Starting journey with first tools and learning fundamental development skills
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Apprentice Builder (26-50 points):</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-apprentice', name: 'David Park', builderLevel: 'apprentice' }}
                      builderTools={mockBuilderToolsNovice}
                      activeProjects={mockActiveProjectsBasic}
                      totalBuilds={4}
                      totalDeployments={1}
                      totalCollaborations={6}
                      builderScore={42}
                      weeklyBuildTime={10}
                      featuredBuild={mockBuilderToolsNovice[1]}
                      onCreateTool={action('apprentice-level-create')}
                      onViewTool={action('apprentice-level-view')}
                      onEditTool={action('apprentice-level-edit')}
                      onDeployTool={action('apprentice-level-deploy')}
                      onViewAllBuilds={action('apprentice-level-all')}
                      onViewBuildLab={action('apprentice-level-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Building competency with multiple projects and first successful deployments
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Expert Builder (51-75 points):</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-expert', name: 'Lisa Thompson', builderLevel: 'expert' }}
                      builderTools={mockBuilderToolsAdvanced.slice(0, 3)}
                      activeProjects={mockActiveProjectsAdvanced.slice(0, 2)}
                      totalBuilds={12}
                      totalDeployments={18}
                      totalCollaborations={25}
                      builderScore={68}
                      weeklyBuildTime={18}
                      featuredBuild={mockBuilderToolsAdvanced[1]}
                      onCreateTool={action('expert-level-create')}
                      onViewTool={action('expert-level-view')}
                      onEditTool={action('expert-level-edit')}
                      onDeployTool={action('expert-level-deploy')}
                      onViewAllBuilds={action('expert-level-all')}
                      onViewBuildLab={action('expert-level-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Advanced skills with complex projects and significant community contributions
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Master Builder (76-100 points):</Text>
                    <ProfileHiveLabWidget
                      user={{ id: 'user-master', name: 'Jordan Lee', builderLevel: 'master' }}
                      builderTools={mockBuilderToolsAdvanced}
                      activeProjects={mockActiveProjectsAdvanced}
                      totalBuilds={25}
                      totalDeployments={40}
                      totalCollaborations={55}
                      builderScore={89}
                      weeklyBuildTime={22}
                      featuredBuild={mockBuilderToolsAdvanced[0]}
                      onCreateTool={action('master-level-create')}
                      onViewTool={action('master-level-view')}
                      onEditTool={action('master-level-edit')}
                      onDeployTool={action('master-level-deploy')}
                      onViewAllBuilds={action('master-level-all')}
                      onViewBuildLab={action('master-level-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Master level expertise with platform contributions and mentorship leadership
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
            <Badge variant="primary">🛠️ TOOL CATEGORIES</Badge>
            Development Focus Areas
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 tool categories for comprehensive University at Buffalo campus innovation and student utility development
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Tool Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Development Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Academic Tools</Text>
                        <Text variant="body-xs" color="secondary">Course utilities, study aids, research tools, academic planning</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Productivity Tools</Text>
                        <Text variant="body-xs" color="secondary">Time management, task organization, workflow optimization</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Social Tools</Text>
                        <Text variant="body-xs" color="secondary">Community building, event coordination, peer collaboration</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Specialized Development Areas:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Utility Tools</Text>
                        <Text variant="body-xs" color="secondary">Campus navigation, dining coordination, residence hall utilities</Text>
                      </div>
                      <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Experimental Tools</Text>
                        <Text variant="body-xs" color="secondary">AI/ML projects, research prototypes, innovative solutions</Text>
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
            Real Campus Builder Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile HiveLab widget usage in actual University at Buffalo student innovation and tool development contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE Student Innovation Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Computer Science Students Building Campus Solutions
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">CSE 442 - Software Engineering Focus:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget
                        user={{ id: 'user-cse-001', name: 'Alex Chen', builderLevel: 'expert' }}
                        builderTools={[
                          {
                            id: 'cse-001',
                            name: 'UB Course Dependency Mapper',
                            description: 'Visualize prerequisite chains for computer science courses',
                            category: 'academic',
                            buildStatus: 'testing',
                            progress: 88,
                            collaborators: 4,
                            deployments: 2,
                            lastWorkedOn: '2024-01-15T11:30:00Z',
                            isPublic: true,
                            technologyStack: ['React', 'D3.js', 'Node.js', 'MongoDB']
                          },
                          {
                            id: 'cse-002',
                            name: 'Algorithm Complexity Visualizer',
                            description: 'Interactive big-O notation learning tool',
                            category: 'academic',
                            buildStatus: 'published',
                            progress: 100,
                            collaborators: 2,
                            deployments: 8,
                            lastWorkedOn: '2024-01-15T10:15:00Z',
                            isPublic: true,
                            isFeatured: true,
                            technologyStack: ['Vue.js', 'TypeScript', 'Canvas API']
                          }
                        ]}
                        activeProjects={[
                          {
                            id: 'cse-project-001',
                            name: 'CSE 442 - Campus Navigation App',
                            description: 'Senior capstone project for indoor campus navigation',
                            type: 'academic',
                            deadline: '2024-05-15T23:59:59Z',
                            progress: 75,
                            teamSize: 5,
                            isActive: true
                          }
                        ]}
                        totalBuilds={8}
                        totalDeployments={15}
                        totalCollaborations={12}
                        builderScore={82}
                        weeklyBuildTime={20}
                        featuredBuild={{
                          id: 'cse-002',
                          name: 'Algorithm Complexity Visualizer',
                          description: 'Interactive big-O notation learning tool',
                          category: 'academic',
                          buildStatus: 'published',
                          progress: 100,
                          collaborators: 2,
                          deployments: 8,
                          lastWorkedOn: '2024-01-15T10:15:00Z',
                          isPublic: true,
                          isFeatured: true,
                          technologyStack: ['Vue.js', 'TypeScript', 'Canvas API']
                        }}
                        onCreateTool={action('cse-create-tool')}
                        onViewTool={action('cse-view-tool')}
                        onEditTool={action('cse-edit-tool')}
                        onDeployTool={action('cse-deploy-tool')}
                        onViewAllBuilds={action('cse-view-all')}
                        onViewBuildLab={action('cse-view-lab')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student building academic tools with focus on visualization and campus utility
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research Focus Development:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget
                        user={{ id: 'user-research-001', name: 'Maya Patel', builderLevel: 'master' }}
                        builderTools={[
                          {
                            id: 'research-001',
                            name: 'ML-Powered Study Pattern Analyzer',
                            description: 'Machine learning tool analyzing student study effectiveness',
                            category: 'experimental',
                            buildStatus: 'testing',
                            progress: 92,
                            collaborators: 6,
                            deployments: 3,
                            lastWorkedOn: '2024-01-15T12:00:00Z',
                            isPublic: false,
                            technologyStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL']
                          },
                          {
                            id: 'research-002',
                            name: 'Academic Performance Predictor',
                            description: 'Predictive analytics for course success based on engagement patterns',
                            category: 'academic',
                            buildStatus: 'prototype',
                            progress: 65,
                            collaborators: 8,
                            deployments: 1,
                            lastWorkedOn: '2024-01-15T11:45:00Z',
                            isPublic: false,
                            technologyStack: ['Python', 'Scikit-learn', 'Django', 'Redis']
                          }
                        ]}
                        activeProjects={[
                          {
                            id: 'research-project-001',
                            name: 'NSF Research Grant - Educational AI',
                            description: 'National Science Foundation funded educational technology research',
                            type: 'academic',
                            deadline: '2024-08-30T23:59:59Z',
                            progress: 58,
                            teamSize: 12,
                            isActive: true
                          }
                        ]}
                        totalBuilds={15}
                        totalDeployments={22}
                        totalCollaborations={35}
                        builderScore={94}
                        weeklyBuildTime={28}
                        featuredBuild={{
                          id: 'research-001',
                          name: 'ML-Powered Study Pattern Analyzer',
                          description: 'Machine learning tool analyzing student study effectiveness',
                          category: 'experimental',
                          buildStatus: 'testing',
                          progress: 92,
                          collaborators: 6,
                          deployments: 3,
                          lastWorkedOn: '2024-01-15T12:00:00Z',
                          isPublic: false,
                          technologyStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL']
                        }}
                        onCreateTool={action('research-create-tool')}
                        onViewTool={action('research-view-tool')}
                        onEditTool={action('research-edit-tool')}
                        onDeployTool={action('research-deploy-tool')}
                        onViewAllBuilds={action('research-view-all')}
                        onViewBuildLab={action('research-view-lab')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Graduate researcher building AI/ML tools for educational technology and student success
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Hackathon Development */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">UB Hackathon Innovation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">48-Hour Sprint Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget
                      user={{ id: 'user-hack-001', name: 'Jordan Kim', builderLevel: 'apprentice' }}
                      builderTools={[
                        {
                          id: 'hack-001',
                          name: 'Campus Crisis Response System',
                          description: 'Emergency coordination platform for campus safety',
                          category: 'utility',
                          buildStatus: 'prototype',
                          progress: 85,
                          collaborators: 4,
                          deployments: 1,
                          lastWorkedOn: '2024-01-15T18:30:00Z',
                          isPublic: true,
                          technologyStack: ['React', 'Socket.io', 'Express', 'MongoDB']
                        }
                      ]}
                      activeProjects={[
                        {
                          id: 'hack-project-001',
                          name: 'UB Hackathon 2024 - Emergency Response',
                          description: 'Campus safety innovation challenge',
                          type: 'hackathon',
                          deadline: '2024-01-20T18:00:00Z',
                          progress: 85,
                          teamSize: 4,
                          isActive: true
                        }
                      ]}
                      totalBuilds={3}
                      totalDeployments={1}
                      totalCollaborations={7}
                      builderScore={58}
                      weeklyBuildTime={35}
                      featuredBuild={{
                        id: 'hack-001',
                        name: 'Campus Crisis Response System',
                        description: 'Emergency coordination platform for campus safety',
                        category: 'utility',
                        buildStatus: 'prototype',
                        progress: 85,
                        collaborators: 4,
                        deployments: 1,
                        lastWorkedOn: '2024-01-15T18:30:00Z',
                        isPublic: true,
                        technologyStack: ['React', 'Socket.io', 'Express', 'MongoDB']
                      }}
                      onCreateTool={action('hack-create-tool')}
                      onViewTool={action('hack-view-tool')}
                      onEditTool={action('hack-edit-tool')}
                      onDeployTool={action('hack-deploy-tool')}
                      onViewAllBuilds={action('hack-view-all')}
                      onViewBuildLab={action('hack-view-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Hackathon team member building emergency response system with intensive development timeline
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Sustainability Challenge:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget
                      user={{ id: 'user-sustain-001', name: 'Sam Wilson', builderLevel: 'expert' }}
                      builderTools={[
                        {
                          id: 'sustain-001',
                          name: 'UB Carbon Footprint Tracker',
                          description: 'Track and reduce campus environmental impact',
                          category: 'utility',
                          buildStatus: 'testing',
                          progress: 92,
                          collaborators: 5,
                          deployments: 2,
                          lastWorkedOn: '2024-01-15T17:45:00Z',
                          isPublic: true,
                          technologyStack: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js']
                        }
                      ]}
                      activeProjects={[
                        {
                          id: 'sustain-project-001',
                          name: 'Green Campus Innovation Challenge',
                          description: 'Sustainability focused development sprint',
                          type: 'hackathon',
                          deadline: '2024-01-22T20:00:00Z',
                          progress: 92,
                          teamSize: 5,
                          isActive: true
                        }
                      ]}
                      totalBuilds={9}
                      totalDeployments={12}
                      totalCollaborations={18}
                      builderScore={74}
                      weeklyBuildTime={30}
                      onCreateTool={action('sustain-create-tool')}
                      onViewTool={action('sustain-view-tool')}
                      onEditTool={action('sustain-edit-tool')}
                      onDeployTool={action('sustain-deploy-tool')}
                      onViewAllBuilds={action('sustain-view-all')}
                      onViewBuildLab={action('sustain-view-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Environmental engineering student building sustainability tracking tools for campus green initiatives
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Innovation Focus:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget
                      user={{ id: 'user-social-001', name: 'Riley Martinez', builderLevel: 'novice' }}
                      builderTools={[
                        {
                          id: 'social-001',
                          name: 'International Student Buddy System',
                          description: 'Connect international and domestic students for cultural exchange',
                          category: 'social',
                          buildStatus: 'concept',
                          progress: 25,
                          collaborators: 3,
                          deployments: 0,
                          lastWorkedOn: '2024-01-15T16:20:00Z',
                          isPublic: false,
                          technologyStack: ['React', 'Firebase']
                        }
                      ]}
                      activeProjects={[
                        {
                          id: 'social-project-001',
                          name: 'Diversity & Inclusion Hackathon',
                          description: 'Building inclusive campus community tools',
                          type: 'hackathon',
                          deadline: '2024-01-21T19:00:00Z',
                          progress: 40,
                          teamSize: 6,
                          isActive: true
                        }
                      ]}
                      totalBuilds={1}
                      totalDeployments={0}
                      totalCollaborations={3}
                      builderScore={22}
                      weeklyBuildTime={15}
                      onCreateTool={action('social-create-tool')}
                      onViewTool={action('social-view-tool')}
                      onEditTool={action('social-edit-tool')}
                      onDeployTool={action('social-deploy-tool')}
                      onViewAllBuilds={action('social-view-all')}
                      onViewBuildLab={action('social-view-lab')}
                    />
                    <Text variant="body-xs" color="secondary">
                      First-time hackathon participant building social connection tools for campus diversity initiatives
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Builder - Getting Started:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time HiveLab experience with empty builder portfolio:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Builder:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget
                        user={{ id: 'user-empty-001', name: 'Taylor Wilson', builderLevel: 'novice' }}
                        builderTools={[]}
                        activeProjects={[]}
                        totalBuilds={0}
                        totalDeployments={0}
                        totalCollaborations={0}
                        builderScore={0}
                        weeklyBuildTime={0}
                        onCreateTool={action('empty-create-tool')}
                        onViewTool={action('empty-view-tool')}
                        onEditTool={action('empty-edit-tool')}
                        onDeployTool={action('empty-deploy-tool')}
                        onViewAllBuilds={action('empty-view-all')}
                        onViewBuildLab={action('empty-view-lab')}
                      />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first tool development and HiveLab exploration
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget
                        user={{ id: 'user-readonly-001', name: 'Casey Johnson', builderLevel: 'apprentice' }}
                        builderTools={mockBuilderToolsNovice}
                        activeProjects={mockActiveProjectsBasic}
                        totalBuilds={3}
                        totalDeployments={1}
                        totalCollaborations={4}
                        builderScore={45}
                        weeklyBuildTime={8}
                        isEditable={false}
                        featuredBuild={mockBuilderToolsNovice[0]}
                        onViewTool={action('readonly-view-tool')}
                        onViewAllBuilds={action('readonly-view-all')}
                        onViewBuildLab={action('readonly-view-lab')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities for public portfolio viewing
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
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen',
      builderLevel: 'apprentice'
    },
    builderTools: mockBuilderToolsNovice,
    activeProjects: mockActiveProjectsBasic,
    totalBuilds: 5,
    totalDeployments: 2,
    totalCollaborations: 8,
    builderScore: 65,
    weeklyBuildTime: 12,
    featuredBuild: mockBuilderToolsNovice[0],
    isEditable: true,
    onCreateTool: action('playground-create-tool'),
    onViewTool: action('playground-view-tool'),
    onEditTool: action('playground-edit-tool'),
    onDeployTool: action('playground-deploy-tool'),
    onViewAllBuilds: action('playground-view-all'),
    onViewBuildLab: action('playground-view-lab'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile HiveLab Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different HiveLab builder configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileHiveLabWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive HiveLab widget testing for University at Buffalo HIVE platform builder tool development design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};