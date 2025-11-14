'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RitualCard } from './organisms/ritual-card';
import { RitualFeedBannerCard } from './organisms/ritual-feed-banner';
import { RitualStrip } from './organisms/ritual-strip';
import { RitualTournamentBracket } from './organisms/ritual-tournament-bracket';
import { RitualBetaLottery } from './organisms/ritual-beta-lottery';
import { RitualFoundingClass } from './organisms/ritual-founding-class';
import { RitualUnlockChallenge } from './organisms/ritual-unlock-challenge';
import { RitualSurvival } from './organisms/ritual-survival';
import { RitualFeatureDrop } from './organisms/ritual-feature-drop';

const meta = {
  title: '06-Rituals/Rituals System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Campus-wide behavioral campaigns. This is the MOAT - creates campus-specific moments that Instagram/TikTok can\'t replicate. "UB only" experiences build community loyalty.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MOCK DATA =====

const mockRituals = [
  {
    id: 'founding-100',
    name: 'Founding 100',
    description: 'Be one of the first 100 UB students to join HIVE and get an exclusive founder badge',
    icon: '🏆',
    progress: 67,
    participantCount: 67,
    timeRemaining: '3d 12h',
    duration: '7 days',
    startDate: 'Dec 1',
    endDate: 'Dec 7',
    frequency: 'One-time',
    isParticipating: true,
    isCompleted: false,
  },
  {
    id: 'campus-madness',
    name: 'Campus Madness',
    description: 'Vote on the best dining hall at UB. 16 matchups, single-elimination tournament',
    icon: '🏀',
    progress: 43,
    participantCount: 842,
    timeRemaining: '2d 5h',
    duration: '2 weeks',
    startDate: 'Dec 5',
    endDate: 'Dec 19',
    frequency: 'Weekly votes',
    isParticipating: false,
    isCompleted: false,
  },
  {
    id: 'beta-lottery',
    name: 'Beta Lottery',
    description: 'Enter for a chance to test new features before everyone else',
    icon: '🎰',
    progress: 25,
    participantCount: 234,
    timeRemaining: '1d 3h',
    duration: '3 days',
    startDate: 'Dec 10',
    endDate: 'Dec 13',
    frequency: 'One-time',
    isParticipating: false,
    isCompleted: false,
  },
  {
    id: 'unlock-challenge',
    name: 'Unlock Challenge: Anonymous Posting',
    description: 'Entire campus works together to reach 500 posts and unlock anonymous posting for 24h',
    icon: '🎭',
    progress: 78,
    participantCount: 1547,
    timeRemaining: 'Ongoing',
    duration: 'Ongoing',
    startDate: 'Dec 1',
    endDate: 'Until unlocked',
    frequency: 'Continuous',
    isParticipating: true,
    isCompleted: false,
  },
];

// ===== RITUAL CARD STORIES =====

export const Card_Default: Story = {
  render: () => (
    <div className="max-w-[360px] p-6">
      <RitualCard
        ritual={mockRituals[1]}
        onJoin={() => console.log('Join clicked')}
        onViewDetails={() => console.log('View details clicked')}
      />
    </div>
  ),
};

export const Card_Featured: Story = {
  render: () => (
    <div className="max-w-[360px] p-6">
      <RitualCard
        ritual={mockRituals[0]}
        variant="featured"
        onJoin={() => console.log('Join clicked')}
        onViewDetails={() => console.log('View details clicked')}
      />
    </div>
  ),
};

export const Card_Participating: Story = {
  render: () => (
    <div className="max-w-[360px] p-6">
      <RitualCard
        ritual={mockRituals[3]}
        onViewDetails={() => console.log('View details clicked')}
      />
    </div>
  ),
};

export const Card_Completed: Story = {
  render: () => (
    <div className="max-w-[360px] p-6">
      <RitualCard
        ritual={{
          ...mockRituals[0],
          progress: 100,
          participantCount: 100,
          isCompleted: true,
        }}
        onViewDetails={() => console.log('View details clicked')}
      />
    </div>
  ),
};

// ===== FEED BANNER =====

export const FeedBanner_Active: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-4">
      <RitualFeedBannerCard
        banner={{
          ritualId: 'founding-100',
          title: 'Founding 100 - Join Now!',
          description: 'First 100 users get exclusive badge. Only 33 spots left!',
          cta: 'Join the Founding 100',
          progress: 67,
          urgency: 'high' as const,
        }}
        onAction={() => console.log('Join clicked')}
      />
    </div>
  ),
};

export const FeedBanner_UrgentProgress: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-4">
      <RitualFeedBannerCard
        banner={{
          ritualId: 'unlock-challenge',
          title: 'Unlock Challenge - Almost There!',
          description: '95% complete - 25 more posts to unlock anonymous mode!',
          cta: 'Contribute Now',
          progress: 95,
          urgency: 'critical' as const,
        }}
        onAction={() => console.log('Contribute clicked')}
      />
    </div>
  ),
};

// ===== RITUAL STRIP =====

export const Strip_HorizontalScroll: Story = {
  render: () => (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {mockRituals.map((ritual) => (
          <RitualStrip
            key={ritual.id}
            ritual={ritual}
            onJoin={() => console.log('Join:', ritual.id)}
            onViewDetails={() => console.log('Details:', ritual.id)}
            variant="compact"
            showProgress={true}
          />
        ))}
      </div>
    </div>
  ),
};

// ===== TOURNAMENT BRACKET =====

export const Tournament_CampusMadness: Story = {
  render: () => (
    <div className="p-6">
      <RitualTournamentBracket
        title="Campus Madness: Best Dining Hall"
        matchups={[
          {
            id: 'match-1',
            round: 1,
            a: 'Pigeon Dining',
            b: 'Ellicott Dining',
            votesA: 234,
            votesB: 156,
          },
          {
            id: 'match-2',
            round: 1,
            a: 'Governors Dining',
            b: 'C3 Crossroads',
            votesA: 189,
            votesB: 278,
          },
          {
            id: 'match-3',
            round: 2,
            a: 'Pigeon Dining',
            b: 'C3 Crossroads',
            votesA: 0,
            votesB: 0,
          },
        ]}
        currentRound={2}
        onVote={(matchupId, choice) => console.log('Vote:', matchupId, choice)}
      />
    </div>
  ),
};

// ===== BETA LOTTERY =====

export const BetaLottery_Entry: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualBetaLottery
        title="Beta Access Lottery"
        description="Enter for early access to new features"
        feature={{
          id: 'feature-1',
          name: 'Advanced Analytics Dashboard',
          description: 'Track your campus engagement with detailed metrics',
          teaser: {
            images: ['https://api.dicebear.com/7.x/shapes/svg?seed=analytics'],
          },
        }}
        slots={50}
        applicants={234}
        entryDeadline="Dec 13 at 6:00 PM"
        drawingDate="Dec 14 at 8:00 PM"
        hasEntered={false}
        onEnter={() => console.log('Enter lottery')}
      />
    </div>
  ),
};

export const BetaLottery_Entered: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualBetaLottery
        title="Beta Access Lottery"
        description="You're entered for early access!"
        feature={{
          id: 'feature-1',
          name: 'Advanced Analytics Dashboard',
          description: 'Track your campus engagement with detailed metrics',
          teaser: {
            images: ['https://api.dicebear.com/7.x/shapes/svg?seed=analytics'],
          },
        }}
        slots={50}
        applicants={235}
        entryDeadline="Dec 13 at 6:00 PM"
        drawingDate="Dec 14 at 8:00 PM"
        hasEntered={true}
        onEnter={() => console.log('Already entered')}
      />
    </div>
  ),
};

// ===== FOUNDING CLASS =====

export const FoundingClass_Members: Story = {
  render: () => (
    <div className="max-w-[800px] mx-auto p-6">
      <RitualFoundingClass
        title="Founding 100 Members"
        members={Array.from({ length: 67 }, (_, i) => ({
          id: `member-${i}`,
          name: `Student ${i + 1}`,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
        }))}
      />
    </div>
  ),
};

// ===== UNLOCK CHALLENGE =====

export const UnlockChallenge_InProgress: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualUnlockChallenge
        title="Unlock Anonymous Posting"
        description="Entire campus works together to reach 500 posts"
        goalMetric="Posts"
        targetValue={500}
        currentValue={389}
        reward={{
          type: 'feature',
          name: 'Anonymous Posting',
          description: '24 hours of anonymous posting unlocked campus-wide',
          teaser: 'Post without your name showing - perfect for hot takes!',
        }}
        milestones={[
          { threshold: 100, unlock: 'Unlocked gold badges', message: 'First milestone reached!', completed: true },
          { threshold: 250, unlock: 'Unlocked custom themes', message: 'Halfway there!', completed: true },
          { threshold: 500, unlock: 'Anonymous posting', message: 'Final goal!', completed: false },
        ]}
        onContribute={() => console.log('Contribute to unlock')}
        encouragement="Keep posting! We're 78% of the way there"
      />
    </div>
  ),
};

export const UnlockChallenge_NearComplete: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualUnlockChallenge
        title="Unlock Anonymous Posting"
        description="Almost there! Just 10 more posts needed"
        goalMetric="Posts"
        targetValue={500}
        currentValue={490}
        reward={{
          type: 'feature',
          name: 'Anonymous Posting',
          description: '24 hours of anonymous posting unlocked campus-wide',
          teaser: 'Post without your name showing - perfect for hot takes!',
        }}
        milestones={[
          { threshold: 100, unlock: 'Unlocked gold badges', message: 'First milestone reached!', completed: true },
          { threshold: 250, unlock: 'Unlocked custom themes', message: 'Halfway there!', completed: true },
          { threshold: 500, unlock: 'Anonymous posting', message: 'Final goal!', completed: false },
        ]}
        onContribute={() => console.log('Contribute to unlock')}
        encouragement="SO CLOSE! Just 10 more posts!"
      />
    </div>
  ),
};

// ===== SURVIVAL =====

export const Survival_Active: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualSurvival
        title="Dining Hall Survival"
        description="Vote out one dining hall each day until only one remains"
        contestants={[
          { id: '1', name: 'Pigeon Dining', eliminated: false, votes: 23 },
          { id: '2', name: 'Ellicott Dining', eliminated: false, votes: 45 },
          { id: '3', name: 'Governors Dining', eliminated: false, votes: 12 },
          { id: '4', name: 'C3 Crossroads', eliminated: false, votes: 67 },
          { id: '5', name: 'Hadley Dining', eliminated: true, votes: 89 },
        ]}
        round={2}
        totalRounds={4}
        deadline="Today at 11:59 PM"
        onVote={(contestantId) => console.log('Vote to eliminate:', contestantId)}
      />
    </div>
  ),
};

// ===== FEATURE DROP =====

export const FeatureDrop_Announcement: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <RitualFeatureDrop
        title="New Feature Drop: Voice Messages"
        description="Record and send voice messages in any space"
        featureName="Voice Messages"
        icon="🎤"
        availableFor="24 hours"
        expiresAt="Tomorrow at 6:00 PM"
        onTryNow={() => console.log('Try voice messages')}
        onDismiss={() => console.log('Dismiss')}
      />
    </div>
  ),
};

// ===== THE MOAT =====

export const Rituals_TheMoat: Story = {
  render: () => (
    <div className="max-w-[900px] mx-auto p-6">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Rituals: The Campus Moat</h1>
          <p className="text-xl text-muted-foreground">
            Campus-specific behavioral campaigns that Instagram/TikTok can't replicate
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <RitualCard
            ritual={mockRituals[0]}
            variant="featured"
            onJoin={() => console.log('Join')}
            onViewDetails={() => console.log('Details')}
          />
          <RitualCard
            ritual={mockRituals[1]}
            onJoin={() => console.log('Join')}
            onViewDetails={() => console.log('Details')}
          />
          <RitualCard
            ritual={mockRituals[2]}
            onJoin={() => console.log('Join')}
            onViewDetails={() => console.log('Details')}
          />
          <RitualCard
            ritual={mockRituals[3]}
            onJoin={() => console.log('Join')}
            onViewDetails={() => console.log('Details')}
          />
        </div>

        <div className="mt-12 p-8 bg-primary/10 rounded-2xl border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Why Instagram Can't Copy This</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <strong>Instagram is global</strong> (1 billion users) - They can't create "UB only" moments
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong>HIVE is campus-specific</strong> (10,000 users at UB) - We create tight-knit community experiences
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <strong>Campus-wide moments</strong> - "Founding 100" badge only 100 UB students will ever have
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <strong>Community ownership</strong> - Students feel "This is OUR campus app" vs "Global app I use"
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💪</span>
              <div>
                <strong>Network effects</strong> - More engaged 10K students {'>'} 1M disengaged users globally
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">9 Ritual Archetypes</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div><strong>🏀 Tournament:</strong> Campus Madness bracket</div>
            <div><strong>🎁 Feature Drop:</strong> Limited-time unlock</div>
            <div><strong>🔄 Rule Inversion:</strong> Temporary rule suspension</div>
            <div><strong>🏆 Founding Class:</strong> First 100 users</div>
            <div><strong>⏱️ Launch Countdown:</strong> Pre-launch hype</div>
            <div><strong>🎰 Beta Lottery:</strong> Random early access</div>
            <div><strong>🎭 Unlock Challenge:</strong> Group goals</div>
            <div><strong>👑 Survival:</strong> Vote people out</div>
            <div><strong>🔍 Leak:</strong> Mystery reveals</div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong>✅ All ritual components are now available!</strong> This includes Tournament brackets, Beta lottery, Founding class, Unlock challenges, Survival games, and Feature drops.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Rituals are HIVE\'s competitive moat. Campus-specific behavioral campaigns create "UB only" moments that build community loyalty. Instagram (global platform) can\'t replicate this campus-specific engagement.',
      },
    },
  },
};

// ===== MOBILE VIEW =====

export const Rituals_Mobile: Story = {
  render: () => (
    <div className="max-w-[375px] mx-auto">
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Active Rituals</h2>
        {mockRituals.slice(0, 3).map((ritual) => (
          <RitualCard
            key={ritual.id}
            ritual={ritual}
            onJoin={() => console.log('Join:', ritual.id)}
            onViewDetails={() => console.log('Details:', ritual.id)}
          />
        ))}
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
