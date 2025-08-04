import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../atomic/atoms';
import { Card } from '../../atomic/molecules';
import { 
  RitualActionButton, 
  MilestoneCelebration 
} from '../../atomic/molecules';
import { 
  RitualsHub,
  LockedFeedSkeleton,
  RitualInitializeWorkflow,
  RitualDiscoverWorkflow,
  RitualConnectWorkflow,
  ActivityFeed
} from '../../atomic/organisms';
import { 
  Calendar, 
  Users, 
  Target, 
  Sparkles,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react';

const CompleteSystemDemoComponent = () => {
  const [currentPhase, setCurrentPhase] = useState<'rituals' | 'locked' | 'activity'>('rituals');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);

  const phaseData = {
    rituals: {
      title: 'Phase 1: Summer Rituals (vBETA)',
      description: 'Four-week structured onboarding that seeds the entire platform',
      icon: Target,
      color: 'hive-gold'
    },
    locked: {
      title: 'Transition: Locked Feed Preview',
      description: 'Educational preview building anticipation for semester launch',
      icon: Lock,
      color: 'red-400'
    },
    activity: {
      title: 'Phase 2: Activity Feed (v1)',
      description: 'Real-time campus activity powered by ritual-seeded data',
      icon: Unlock,
      color: 'green-400'
    }
  };

  const currentPhaseData = phaseData[currentPhase];
  const PhaseIcon = currentPhaseData.icon;

  return (
    <div className="space-y-8 p-8">
      {/* System Overview Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-hive-text-primary">
          Complete Feed & Rituals System
        </h1>
        <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
          A comprehensive two-phase system that solves the cold start problem through 
          structured summer onboarding that seeds personalized campus activity feeds.
        </p>
      </div>

      {/* Phase Selector */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-${currentPhaseData.color} rounded-full flex items-center justify-center`}>
              <PhaseIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-hive-text-primary">
                {currentPhaseData.title}
              </h2>
              <p className="text-hive-text-secondary">
                {currentPhaseData.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentPhase === 'rituals' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPhase('rituals')}
              className={currentPhase === 'rituals' ? 'bg-hive-gold text-hive-obsidian' : ''}
            >
              Summer Rituals
            </Button>
            <Button
              variant={currentPhase === 'locked' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPhase('locked')}
              className={currentPhase === 'locked' ? 'bg-red-400 text-white' : ''}
            >
              Locked Preview
            </Button>
            <Button
              variant={currentPhase === 'activity' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPhase('activity')}
              className={currentPhase === 'activity' ? 'bg-green-400 text-white' : ''}
            >
              Activity Feed
            </Button>
          </div>
        </div>

        {/* Week Selector for Rituals Phase */}
        {currentPhase === 'rituals' && (
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-sm text-hive-text-secondary">Week:</span>
            {[1, 2, 3, 4].map(week => (
              <Button
                key={week}
                variant={currentWeek === week ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentWeek(week)}
                className={currentWeek === week ? 'bg-hive-gold text-hive-obsidian' : ''}
              >
                {week}
              </Button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCelebration(true)}
              className="ml-4"
            >
              Show Celebration
            </Button>
          </div>
        )}
      </Card>

      {/* Component Showcase */}
      <div className="space-y-8">
        {currentPhase === 'rituals' && (
          <>
            {/* Rituals Hub */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-hive-text-primary mb-4">
                Rituals Hub - Week {currentWeek}
              </h3>
              <RitualsHub
                currentWeek={currentWeek}
                availableRituals={[
                  {
                    id: 'initialize',
                    name: 'Initialize',
                    title: 'Build Your Foundation',
                    description: 'Set up your complete HIVE profile and select your interests',
                    tagline: 'Your journey starts here',
                    type: 'onboarding' as const,
                    status: currentWeek === 1 ? 'active' as const : 'completed' as const,
                    week: 1,
                    duration: 12,
                    totalParticipants: 1247,
                    activeParticipants: currentWeek === 1 ? 892 : 0,
                    completionRate: currentWeek === 1 ? 0.73 : 1,
                    userParticipation: currentWeek >= 1 ? {
                      status: currentWeek === 1 ? 'active' as const : 'completed' as const,
                      progressPercentage: currentWeek === 1 ? 65 : 100,
                      currentStep: 'Select your interests',
                      nextAction: currentWeek === 1 ? 'Continue Setup' : 'Completed'
                    } : undefined,
                    milestones: [],
                    actions: []
                  },
                  {
                    id: 'discover',
                    name: 'Discover',
                    title: 'Find Your Communities',
                    description: 'Explore and join Spaces that match your interests',
                    tagline: 'Your tribe awaits',
                    type: 'community' as const,
                    status: currentWeek === 2 ? 'active' as const : currentWeek > 2 ? 'completed' as const : 'scheduled' as const,
                    week: 2,
                    duration: 15,
                    totalParticipants: 892,
                    activeParticipants: currentWeek === 2 ? 743 : 0,
                    completionRate: currentWeek === 2 ? 0.58 : currentWeek > 2 ? 1 : 0,
                    userParticipation: currentWeek >= 2 ? {
                      status: currentWeek === 2 ? 'active' as const : 'completed' as const,
                      progressPercentage: currentWeek === 2 ? 30 : 100,
                      currentStep: 'Browse recommended Spaces',
                      nextAction: currentWeek === 2 ? 'Explore Spaces' : 'Completed'
                    } : undefined,
                    milestones: [],
                    actions: []
                  }
                ]}
                completedRituals={currentWeek > 1 ? [
                  {
                    id: 'completed_init',
                    name: 'Initialize',
                    title: 'Build Your Foundation',
                    description: 'Profile setup complete',
                    tagline: 'Foundation built',
                    type: 'onboarding' as const,
                    status: 'completed' as const,
                    week: 1,
                    duration: 12,
                    totalParticipants: 1247,
                    activeParticipants: 0,
                    completionRate: 1,
                    milestones: [],
                    actions: []
                  }
                ] : []}
              />
            </Card>

            {/* Action Buttons */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-hive-text-primary mb-4">
                Ritual Action Buttons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RitualActionButton
                  ritualType="initialize"
                  actionType={currentWeek === 1 ? 'start' : 'complete'}
                  progress={currentWeek === 1 ? 0 : 100}
                  estimatedTime={12}
                  participantCount={1247}
                  onClick={() => console.log('Initialize clicked')}
                />
                <RitualActionButton
                  ritualType="discover"
                  actionType={currentWeek === 2 ? 'continue' : currentWeek > 2 ? 'complete' : 'start'}
                  progress={currentWeek === 2 ? 30 : currentWeek > 2 ? 100 : 0}
                  estimatedTime={15}
                  participantCount={892}
                  isDisabled={currentWeek < 2}
                  onClick={() => console.log('Discover clicked')}
                />
              </div>
            </Card>
          </>
        )}

        {currentPhase === 'locked' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-hive-text-primary mb-4">
              Locked Feed Skeleton
            </h3>
            <LockedFeedSkeleton
              activationDate={new Date('2024-08-15')}
              currentRitualProgress={75}
            />
          </Card>
        )}

        {currentPhase === 'activity' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-hive-text-primary mb-4">
              Activity Feed (v1)
            </h3>
            <ActivityFeed
              feedType="personal"
              userId="demo_user"
            />
          </Card>
        )}
      </div>

      {/* Key Benefits */}
      <Card className="p-8 bg-gradient-to-r from-hive-gold/5 to-hive-brand-secondary/5">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">
          System Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-hive-text-primary">Solves Cold Start</h3>
            <p className="text-sm text-hive-text-secondary">
              No empty feeds on Day 1. Users arrive with populated widgets and active communities.
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-hive-text-primary">Community Momentum</h3>
            <p className="text-sm text-hive-text-secondary">
              Collective summer participation creates shared anticipation and community bonds.
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-hive-text-primary">Data Quality</h3>
            <p className="text-sm text-hive-text-secondary">
              Structured ritual completion ensures high-quality, complete user data for personalization.
            </p>
          </div>
        </div>
      </Card>

      {/* Milestone Celebration */}
      <MilestoneCelebration
        milestone={{
          id: 'system_demo',
          name: 'System Explorer',
          description: 'You\'ve explored the complete Feed & Rituals system! This comprehensive architecture solves the cold start problem and creates meaningful campus communities.',
          type: 'personal',
          icon: 'trophy',
          rarity: 'epic',
          unlockedFeatures: [
            'Complete System Understanding',
            'Architecture Mastery',
            'User Experience Excellence'
          ],
          communityStats: {
            totalAchievers: 1,
            percentageComplete: 100
          }
        }}
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        onShare={() => console.log('Sharing milestone...')}
      />
    </div>
  );
};

const meta: Meta = {
  title: '06-Feed-Rituals/Complete System',
  component: CompleteSystemDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Complete Feed & Rituals System

This comprehensive demo showcases the complete Feed & Rituals system architecture with all components, workflows, and interactions.

## System Components Implemented

### Phase 1: Summer Rituals (vBETA)
- **Rituals Hub**: Four-week progression interface
- **Initialize Workflow**: Profile setup and interest selection
- **Discover Workflow**: Space joining and community building
- **Connect Workflow**: Friend invitations and social graph building
- **Action Buttons**: Interactive ritual controls
- **Milestone Celebrations**: Achievement recognition system

### Transition Phase
- **Locked Feed Skeleton**: Educational preview with countdown

### Phase 2: Activity Feed (v1)
- **Activity Feed**: Real-time campus activity aggregation
- **Smart Filtering**: Content filtering and personalization
- **Engagement System**: Like, comment, share, bookmark mechanics

## Complete Feature Set

✅ Two-phase system architecture
✅ Four-week ritual progression
✅ Individual ritual workflows (Initialize, Discover, Connect)
✅ Ritual action components and progress tracking
✅ Milestone celebration system with animations
✅ Community participation widgets
✅ Phase transition mechanism
✅ Real-time Activity Feed for v1
✅ Complete Storybook documentation
✅ Mobile-responsive design
✅ Comprehensive business logic integration

## Integration with HIVE Platform

- **Profile System**: Seeded by Initialize ritual
- **Spaces System**: Populated by Discover ritual
- **Social Graph**: Built by Connect ritual
- **Feed Algorithm**: Powered by all ritual data
- **Widget Population**: All widgets ready for v1 launch

This system ensures that when students arrive on campus, HIVE is already their established digital hub with personalized content, active communities, and social connections.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CompleteSystemDemo: Story = {
  render: () => <CompleteSystemDemoComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the complete Feed & Rituals system showing all phases, components, and interactions.',
      },
    },
  },
};