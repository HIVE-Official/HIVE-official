import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RitualActionButton } from './ritual-action-button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof RitualActionButton> = {
  title: '02-Molecules/Ritual Action Button - COMPLETE DEFINITION',
  component: RitualActionButton,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Ritual Action Button - Complete Molecule Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive ritual action interface for University at Buffalo HIVE platform student journey coordination and campus integration workflows.

### 🎯 **COMPONENT EXCELLENCE**
- **4 Ritual Types** - Initialize, discover, connect, launch for complete student journey;
- **4 Action States** - Start, continue, complete, retry for flexible workflow management;
- **Progress Tracking** - Visual progress indicators with percentage completion display;
- **Social Context** - Participant counts and estimated time requirements;
- **Interactive Design** - Hover effects, loading states, and accessibility support;
- **Gradient Theming** - Distinct visual identity for each ritual type and campus context;
- **Time Estimation** - Built-in time tracking for student planning and commitment;
- **Campus Integration** - Built for University at Buffalo student onboarding and community building;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student journey coordination:
- **Initialize Ritual** - Academic foundation building, profile setup, goal setting;
- **Discover Ritual** - Campus community exploration, space discovery, interest matching;
- **Connect Ritual** - Peer networking, study partner matching, social circle building;
- **Launch Ritual** - Campus life preparation, semester planning, success strategy development;
- **Progress Tracking** - Visual feedback for multi-step campus integration workflows;
- **Social Proof** - Participant counts showing community engagement and peer activity;
- **Time Management** - Estimated completion times for busy student schedule planning;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large ritual buttons optimized for mobile interaction;
- **Responsive Layout** - Adaptive button sizing for different screen orientations;
- **Gesture Support** - Swipe and tap interactions for seamless mobile ritual navigation;
- **Loading States** - Clear visual feedback during ritual transitions and API calls;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ritualType: {
      control: 'select',
      options: ['initialize', 'discover', 'connect', 'launch'],
      description: 'Type of ritual workflow',
    },
    actionType: {
      control: 'select',
      options: ['start', 'continue', 'complete', 'retry'],
      description: 'Current action state',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress percentage (0-100)',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    estimatedTime: {
      control: 'number',
      description: 'Estimated completion time in minutes',
    },
    participantCount: {
      control: 'number',
      description: 'Number of active participants',
    },
    onClick: {
      action: 'ritual-action',
      description: 'Ritual action handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RitualActionButton>;

// Default ritual action button showcase;
export const Default: Story = {
  args: {
    ritualType: 'initialize',
    actionType: 'start',
    progress: 0,
    isDisabled: false,
    isLoading: false,
    estimatedTime: 15,
    participantCount: 1247,
    onClick: action('ritual-started'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE ritual action button for University at Buffalo student journey coordination:
          </Text>
          <RitualActionButton {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive ritual workflow with progress tracking, social context, and time estimation;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Ritual Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 RITUAL TYPES</Badge>
            Student Journey Workflows;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 comprehensive ritual types for University at Buffalo HIVE platform student integration and campus success;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Ritual System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Initialize Ritual:</Text>
                    <RitualActionButton;
                      ritualType="initialize"
                      actionType="start"
                      estimatedTime={15}
                      participantCount={2847}
                      onClick={action('initialize-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Academic foundation building: profile setup, goal setting, academic planning, campus orientation;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Discover Ritual:</Text>
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="start"
                      estimatedTime={20}
                      participantCount={1934}
                      onClick={action('discover-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Campus community exploration: space discovery, interest matching, academic resource finding;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Connect Ritual:</Text>
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="start"
                      estimatedTime={25}
                      participantCount={1523}
                      onClick={action('connect-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Peer networking: study partner matching, social circle building, collaboration formation;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Launch Ritual:</Text>
                    <RitualActionButton;
                      ritualType="launch"
                      actionType="start"
                      estimatedTime={30}
                      participantCount={987}
                      onClick={action('launch-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Campus life preparation: semester planning, success strategy development, life optimization;
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Action States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚡ ACTION STATES</Badge>
            Workflow Progress Management;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 action states for flexible ritual workflow management and student progress tracking;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Action State Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Start Action:</Text>
                    <RitualActionButton;
                      ritualType="initialize"
                      actionType="start"
                      estimatedTime={15}
                      participantCount={1247}
                      onClick={action('start-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Begin new ritual workflow with time estimation and participant context;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Continue Action:</Text>
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="continue"
                      progress={67}
                      estimatedTime={8}
                      participantCount={934}
                      onClick={action('continue-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Resume interrupted ritual with progress tracking and remaining time estimation;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Complete Action:</Text>
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="complete"
                      progress={95}
                      estimatedTime={2}
                      participantCount={523}
                      onClick={action('complete-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Finalize ritual workflow with near-complete progress and final step estimation;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Retry Action:</Text>
                    <RitualActionButton;
                      ritualType="launch"
                      actionType="retry"
                      estimatedTime={30}
                      participantCount={287}
                      onClick={action('retry-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Restart failed or incomplete ritual with fresh attempt and renewed community context;
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🔄 INTERACTIVE STATES</Badge>
            Button States and Feedback;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive ritual button states for user feedback and accessibility;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">State Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Loading State:</Text>
                    <RitualActionButton;
                      ritualType="initialize"
                      actionType="continue"
                      progress={45}
                      isLoading={true}
                      estimatedTime={12}
                      participantCount={1567}
                      onClick={action('loading-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Loading state with spinner animation during ritual processing and API calls;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="start"
                      isDisabled={true}
                      estimatedTime={25}
                      participantCount={234}
                      onClick={action('disabled-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Disabled state for prerequisites not met or ritual unavailable conditions;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Progress Tracking:</Text>
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="continue"
                      progress={78}
                      estimatedTime={5}
                      participantCount={1123}
                      onClick={action('progress-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Visual progress indicator with percentage completion and remaining time display;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Near Completion:</Text>
                    <RitualActionButton;
                      ritualType="launch"
                      actionType="complete"
                      progress={98}
                      estimatedTime={1}
                      participantCount={456}
                      onClick={action('near-complete-action')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Final completion state with maximum progress and minimal remaining effort;
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
            Real Campus Ritual Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Ritual action button usage in actual University at Buffalo student journey and campus integration contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* New Student Onboarding */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New UB Student Onboarding Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Freshman Academic Foundation Building - Initialize Ritual;
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Profile Setup:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <RitualActionButton;
                        ritualType="initialize"
                        actionType="start"
                        estimatedTime={15}
                        participantCount={1247}
                        onClick={action('academic-setup')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Complete academic profile with major selection, course preferences, and study goals;
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Campus Integration Planning:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <RitualActionButton;
                        ritualType="initialize"
                        actionType="continue"
                        progress={34}
                        estimatedTime={10}
                        participantCount={987}
                        onClick={action('campus-integration')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Set up campus life preferences, dining plan, residence hall coordination;
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Academic Community Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Community Discovery Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Course Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="start"
                      estimatedTime={20}
                      participantCount={2134}
                      onClick={action('course-discovery')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Find CSE 331, MTH 241, and PHY 207 study groups and course-specific communities;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Interest-Based Spaces:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="continue"
                      progress={56}
                      estimatedTime={12}
                      participantCount={1567}
                      onClick={action('interest-discovery')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Explore programming clubs, research groups, and technology interest communities;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="complete"
                      progress={89}
                      estimatedTime={3}
                      participantCount={934}
                      onClick={action('residential-discovery')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Complete Ellicott Complex floor integration and residential life coordination;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Social Network Building */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Network Building Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Partner Network:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="start"
                      estimatedTime={25}
                      participantCount={1823}
                      onClick={action('study-network')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Build study partnership network for CSE courses, algorithm practice, and exam preparation;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Circle Formation:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="continue"
                      progress={72}
                      estimatedTime={8}
                      participantCount={1245}
                      onClick={action('social-network')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Expand social connections through shared interests, campus events, and collaboration;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Life Optimization */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Life Launch Preparation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Semester Success Strategy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="launch"
                      actionType="start"
                      estimatedTime={30}
                      participantCount={756}
                      onClick={action('semester-strategy')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Develop comprehensive strategy for academic success, time management, and goal achievement;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Life Optimization:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="launch"
                      actionType="retry"
                      estimatedTime={30}
                      participantCount={423}
                      onClick={action('life-optimization')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Restart campus optimization with refined approach and lessons learned;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Ritual Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Ritual Experience:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized ritual actions for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Ritual Access:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="connect"
                      actionType="continue"
                      progress={45}
                      estimatedTime={15}
                      participantCount={1567}
                      onClick={action('mobile-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Continue ritual workflows while walking between classes, during breaks, or studying;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Context Rituals:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <RitualActionButton;
                      ritualType="discover"
                      actionType="start"
                      estimatedTime={10}
                      participantCount={892}
                      onClick={action('location-ritual')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Location-aware ritual suggestions based on current campus position and activity;
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
    ritualType: 'initialize',
    actionType: 'start',
    progress: 0,
    isDisabled: false,
    isLoading: false,
    estimatedTime: 15,
    participantCount: 1247,
    onClick: action('playground-ritual'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Ritual Action Button Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different ritual action configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <RitualActionButton {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive ritual action testing for University at Buffalo HIVE platform workflow design;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};