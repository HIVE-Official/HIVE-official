import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button } from '../../atomic/atoms';
import { 
  Calendar, 
  Users, 
  Target, 
  Sparkles, 
  ArrowRight, 
  Lock,
  Unlock,
  Clock,
  UserPlus,
  Compass
} from 'lucide-react';

const SystemOverview = () => {
  return (
    <div className="space-y-12 p-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-hive-text-primary">
          Feed & Rituals System Architecture
        </h1>
        <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
          A two-phase system that solves the cold start problem by using structured summer onboarding 
          to seed all platform systems before campus activation.
        </p>
      </div>

      {/* Phase Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phase 1: Summer Rituals */}
        <Card className="p-8 bg-gradient-to-br from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/30">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-hive-obsidian" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 1: Summer Rituals</h2>
              <p className="text-hive-gold font-medium">vBETA • Feed Tab = Rituals Hub</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-hive-text-secondary">
              During summer, the Feed tab becomes the Rituals Hub - a structured four-week onboarding 
              experience that seeds the entire platform with user data.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-hive-gold" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Initialize (Week 1)</p>
                  <p className="text-sm text-hive-text-secondary">Profile setup → Avatar Widget seeding</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center">
                  <Compass className="h-4 w-4 text-hive-brand-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Discover (Week 2)</p>
                  <p className="text-sm text-hive-text-secondary">Space joining → My Spaces Widget seeding</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <UserPlus className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Connect (Week 3)</p>
                  <p className="text-sm text-hive-text-secondary">Friend invites → Social graph building</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Launch (Week 4)</p>
                  <p className="text-sm text-hive-text-secondary">Final prep → Platform activation ready</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-hive-gold">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Feed locked during this phase</span>
          </div>
        </Card>

        {/* Phase 2: Activity Feed */}
        <Card className="p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 2: Activity Feed</h2>
              <p className="text-green-400 font-medium">v1 • Feed Tab = Real-time Activity</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-hive-text-secondary">
              When semester begins, the Feed tab transforms into a personalized real-time activity feed, 
              powered by all the data collected during summer rituals.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Space Content</p>
                  <p className="text-sm text-hive-text-secondary">Posts, events, discussions from joined spaces</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Tool Activity</p>
                  <p className="text-sm text-hive-text-secondary">Success stories, collaborative projects</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-hive-text-primary">Campus Updates</p>
                  <p className="text-sm text-hive-text-secondary">Relevant posts from campus community</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-green-400">
            <Unlock className="h-4 w-4" />
            <span className="text-sm font-medium">Feed activated when semester starts</span>
          </div>
        </Card>
      </div>

      {/* System Integration Flow */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">
          How Rituals Seed the Entire Platform
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Integration */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-hive-gold/20 rounded-xl flex items-center justify-center">
              <Target className="h-8 w-8 text-hive-gold" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Rituals → Profile
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Initialize ritual guides profile setup, interest selection, and campus objectives. 
              This data directly populates the Avatar Widget's Focus View and powers all personalization algorithms.
            </p>
            <div className="flex items-center justify-center space-x-2 text-hive-gold text-sm">
              <span>Initialize</span>
              <ArrowRight className="h-3 w-3" />
              <span>Avatar Widget</span>
            </div>
          </div>

          {/* Spaces Integration */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-hive-brand-secondary/20 rounded-xl flex items-center justify-center">
              <Compass className="h-8 w-8 text-hive-brand-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Rituals → Spaces
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Discover ritual provides structured missions for finding and joining pre-seeded Spaces. 
              Ensures My Spaces Widget is populated and users have active communities on Day 1.
            </p>
            <div className="flex items-center justify-center space-x-2 text-hive-brand-secondary text-sm">
              <span>Discover</span>
              <ArrowRight className="h-3 w-3" />
              <span>My Spaces</span>
            </div>
          </div>

          {/* Social Integration */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-400/20 rounded-xl flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Rituals → Social
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Connect ritual gives limited friend invitations to build initial social graph. 
              Creates scarcity value while populating Connections Widget and social discovery.
            </p>
            <div className="flex items-center justify-center space-x-2 text-purple-400 text-sm">
              <span>Connect</span>
              <ArrowRight className="h-3 w-3" />
              <span>Social Graph</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Feed Aggregation */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">
          How the Feed Aggregates the Platform
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Spaces → Feed
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Space Post Boards are the primary content source. Events, discussions, and activities 
              from joined spaces are ingested by the feed algorithm.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Target className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Tools → Feed
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Tool usage generates success stories that become feed content. New groups formed, 
              events reaching capacity, collaborative achievements.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary">
              Profile → Feed
            </h3>
            <p className="text-hive-text-secondary text-sm">
              Profile provides personalization data for feed algorithm. Joined spaces, interests, 
              and connections determine content ranking and filtering.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Benefits */}
      <Card className="p-8 bg-gradient-to-r from-hive-gold/5 to-hive-brand-secondary/5">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">
          Architectural Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-hive-gold/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-hive-gold" />
            </div>
            <h3 className="font-semibold text-hive-text-primary">Perfect Timing</h3>
            <p className="text-sm text-hive-text-secondary">
              Summer prep period aligns with natural campus preparation cycle.
            </p>
          </div>
        </div>
      </Card>

      {/* Implementation Status */}
      <Card className="p-8 border border-hive-border-subtle">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6">
          Implementation Status
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium text-hive-text-primary">Rituals Hub Component</span>
            </div>
            <span className="text-sm text-green-400">Complete</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium text-hive-text-primary">Locked Feed Skeleton</span>
            </div>
            <span className="text-sm text-green-400">Complete</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚡</span>
              </div>
              <span className="font-medium text-hive-text-primary">Individual Ritual Workflows</span>
            </div>
            <span className="text-sm text-yellow-500">In Progress</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">○</span>
              </div>
              <span className="font-medium text-hive-text-primary">Phase Transition System</span>
            </div>
            <span className="text-sm text-blue-400">Planned</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">○</span>
              </div>
              <span className="font-medium text-hive-text-primary">Activity Feed Aggregation</span>
            </div>
            <span className="text-sm text-blue-400">Planned</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const meta: Meta = {
  title: '06-Feed-Rituals/System Overview',
  component: SystemOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Feed & Rituals System - Complete Architecture

This overview explains the complete two-phase Feed & Rituals system that forms the backbone of HIVE's user onboarding and content strategy.

## The Challenge Solved

Traditional social platforms suffer from the "cold start problem" - new users see empty feeds and have no established communities. HIVE solves this through time-bound summer rituals that seed the entire platform before campus activation.

## Key Innovation

The Feed tab serves dual purposes:
- **Summer (vBETA)**: Structured ritual onboarding experience
- **Semester (v1)**: Personalized real-time activity feed

This creates a seamless progression from onboarding to active platform usage, with no cold start issues.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CompleteArchitecture: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete system overview showing both phases, integration points, and implementation status of the Feed & Rituals architecture.',
      },
    },
  },
};