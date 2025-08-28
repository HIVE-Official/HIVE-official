import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BentoGrid, BentoCardProps, CAMPUS_CARD_PRESETS, createBentoCard } from '../../../components/bento-grid';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Calendar, Users, Wrench, Activity, BarChart3, MessageSquare, Zap } from 'lucide-react';

const meta: Meta<typeof BentoGrid> = {
  title: '👤 Profile/Systems/BentoGrid',
  component: BentoGrid,
  parameters: {
    docs: {
      description: {
        component: 'Unified, production-ready Bento Grid system for HIVE campus profiles. Mobile-first, customizable, with proper responsive behavior.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

// Sample card content components
const AvatarCard = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <Avatar className="w-16 h-16 mb-2">
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Sarah Chen" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
    <p className="text-xs text-[var(--hive-text-secondary)] text-center">@sarah_chen</p>
  </div>
);

const CalendarCard = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <Calendar className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
      <span className="text-xs font-medium">Today's Schedule</span>
    </div>
    <div className="space-y-2 flex-1">
      <div className="p-2 bg-[var(--hive-background-subtle)] rounded text-xs">
        <div className="font-medium">CS 250 Lecture</div>
        <div className="text-[var(--hive-text-tertiary)]">10:00 AM - Davis 101</div>
      </div>
      <div className="p-2 bg-[var(--hive-brand-secondary)]/10 rounded text-xs">
        <div className="font-medium">Study Group</div>
        <div className="text-[var(--hive-text-tertiary)]">2:00 PM - Library</div>
      </div>
    </div>
  </div>
);

const SpacesCard = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <Users className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
      <span className="text-xs font-medium">Active Spaces</span>
      <Badge variant="secondary" className="text-xs">3</Badge>
    </div>
    <div className="grid grid-cols-1 gap-2 flex-1">
      <div className="p-3 bg-[var(--hive-background-subtle)] rounded">
        <div className="text-sm font-medium mb-1">CS Study Group</div>
        <div className="text-xs text-[var(--hive-text-secondary)] flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full border border-white"></div>
          </div>
          <span>12 members</span>
        </div>
      </div>
      <div className="p-3 bg-[var(--hive-background-subtle)] rounded">
        <div className="text-sm font-medium mb-1">Robotics Club</div>
        <div className="text-xs text-[var(--hive-text-secondary)]">Workshop today 3PM</div>
      </div>
    </div>
  </div>
);

const ToolsCard = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <Wrench className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
      <span className="text-xs font-medium">Built Tools</span>
    </div>
    <div className="space-y-2 flex-1">
      <div className="flex items-center gap-2 p-2 bg-[var(--hive-background-subtle)] rounded">
        <div className="text-lg">📚</div>
        <div>
          <div className="text-sm font-medium">Study Matcher</div>
          <div className="text-xs text-[var(--hive-text-tertiary)]">23 users this week</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 bg-[var(--hive-background-subtle)] rounded">
        <div className="text-lg">🧺</div>
        <div>
          <div className="text-sm font-medium">Laundry Tracker</div>
          <div className="text-xs text-[var(--hive-text-tertiary)]">8 dorms using</div>
        </div>
      </div>
    </div>
  </div>
);

const ActivityCard = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <Activity className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
      <span className="text-xs font-medium">Recent Activity</span>
    </div>
    <div className="grid grid-cols-3 gap-4 text-center flex-1">
      <div>
        <div className="text-lg font-semibold text-[var(--hive-brand-secondary)]">7</div>
        <div className="text-xs text-[var(--hive-text-tertiary)]">Tools Built</div>
      </div>
      <div>
        <div className="text-lg font-semibold text-[var(--hive-brand-secondary)]">156</div>
        <div className="text-xs text-[var(--hive-text-tertiary)]">Students Helped</div>
      </div>
      <div>
        <div className="text-lg font-semibold text-[var(--hive-brand-secondary)]">12</div>
        <div className="text-xs text-[var(--hive-text-tertiary)]">Spaces Joined</div>
      </div>
    </div>
  </div>
);

const AnalyticsCard = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <BarChart3 className="h-6 w-6 text-[var(--hive-brand-secondary)] mb-2" />
    <div className="text-center">
      <div className="text-lg font-semibold text-[var(--hive-brand-secondary)]">94%</div>
      <div className="text-xs text-[var(--hive-text-tertiary)]">Tool Success Rate</div>
    </div>
  </div>
);

const SocialCard = () => (
  <div className="h-full flex flex-col items-center justify-center opacity-60">
    <MessageSquare className="h-6 w-6 text-[var(--hive-text-tertiary)] mb-2" />
    <div className="text-center">
      <div className="text-sm font-medium text-[var(--hive-text-primary)]">Social Feed</div>
      <div className="text-xs text-[var(--hive-text-tertiary)]">Real-time campus activity</div>
    </div>
  </div>
);

const HiveLabCard = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <Zap className="h-6 w-6 text-[var(--hive-brand-secondary)] mb-2" />
    <div className="text-center">
      <div className="text-sm font-medium text-[var(--hive-brand-secondary)]">HiveLab</div>
      <div className="text-xs text-[var(--hive-text-tertiary)]">Advanced tool builder</div>
    </div>
  </div>
);

// Create sample cards with content
const createSampleCards = (): BentoCardProps[] => [
  {
    ...CAMPUS_CARD_PRESETS.avatar,
    children: <AvatarCard />,
    icon: <Avatar className="w-4 h-4"><AvatarFallback className="text-xs">SC</AvatarFallback></Avatar>
  },
  {
    ...CAMPUS_CARD_PRESETS.calendar,
    children: <CalendarCard />,
    icon: <Calendar className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.spaces,
    children: <SpacesCard />,
    icon: <Users className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.tools,
    children: <ToolsCard />,
    icon: <Wrench className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.activity,
    children: <ActivityCard />,
    icon: <Activity className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.analytics,
    children: <AnalyticsCard />,
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.social,
    children: <SocialCard />,
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    ...CAMPUS_CARD_PRESETS.hivelab,
    children: <HiveLabCard />,
    icon: <Zap className="h-4 w-4" />,
    badge: { text: 'Builder' }
  }
];

export const Default: Story = {
  args: {
    cards: createSampleCards(),
    isCustomizable: false
  }
};

export const Customizable: Story = {
  render: () => {
    const [cards, setCards] = useState(createSampleCards());
    const [isEditMode, setIsEditMode] = useState(false);

    const handleCardUpdate = (cardId: string, updates: Partial<BentoCardProps>) => {
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, ...updates } : card
      ));
    };

    const handleToggleEditMode = () => {
      setIsEditMode(prev => !prev);
    };

    return (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
        <BentoGrid
          cards={cards}
          isCustomizable={true}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          onCardUpdate={handleCardUpdate}
        />
      </div>
    );
  }
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    cards: createSampleCards().slice(0, 5), // Show fewer cards on mobile
    isCustomizable: true
  }
};

export const DifferentSizes: Story = {
  render: () => {
    const sizeDemoCards: BentoCardProps[] = [
      createBentoCard('small-demo', 'Small Card', 'small', 'high', {
        children: <div className="h-full flex items-center justify-center text-sm text-[var(--hive-text-secondary)]">Small (1x1)</div>
      }),
      createBentoCard('medium-demo', 'Medium Card', 'medium', 'high', {
        children: <div className="h-full flex items-center justify-center text-sm text-[var(--hive-text-secondary)]">Medium (2x1)</div>
      }),
      createBentoCard('large-demo', 'Large Card', 'large', 'high', {
        children: <div className="h-full flex items-center justify-center text-sm text-[var(--hive-text-secondary)]">Large (2x2)</div>
      }),
      createBentoCard('wide-demo', 'Wide Card', 'wide', 'high', {
        children: <div className="h-full flex items-center justify-center text-sm text-[var(--hive-text-secondary)]">Wide (3x1)</div>
      }),
      createBentoCard('tall-demo', 'Tall Card', 'tall', 'high', {
        children: <div className="h-full flex items-center justify-center text-sm text-[var(--hive-text-secondary)]">Tall (1x3)</div>
      }),
      createBentoCard('hero-demo', 'Hero Card', 'hero', 'high', {
        children: <div className="h-full flex items-center justify-center text-lg font-semibold text-[var(--hive-brand-secondary)]">Hero (4x2)</div>
      })
    ];

    return (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">All Card Sizes</h2>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Different card sizes available in the Bento Grid system
          </p>
        </div>
        <BentoGrid
          cards={sizeDemoCards}
          isCustomizable={false}
          columns={{ mobile: 1, tablet: 3, desktop: 4 }}
        />
      </div>
    );
  }
};

export const CampusProfile: Story = {
  name: 'Sarah\'s Campus Profile',
  render: () => {
    const sarahCards = createSampleCards().map(card => {
      // Customize some cards for Sarah's profile
      if (card.id === 'spaces') {
        return {
          ...card,
          badge: { text: '3 Active' },
          description: 'Leading CS Study Group, member of Robotics Club'
        };
      }
      if (card.id === 'tools') {
        return {
          ...card,
          badge: { text: '7 Built' },
          description: 'Study Matcher used by 23 students this week'
        };
      }
      return card;
    });

    return (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Sarah Chen</h1>
              <p className="text-[var(--hive-text-secondary)]">CS Junior • Tool Builder • Study Group Leader</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div>
              <span className="font-semibold text-[var(--hive-brand-secondary)]">156</span>
              <span className="text-[var(--hive-text-tertiary)] ml-1">students helped</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--hive-brand-secondary)]">7</span>
              <span className="text-[var(--hive-text-tertiary)] ml-1">tools built</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--hive-brand-secondary)]">3</span>
              <span className="text-[var(--hive-text-tertiary)] ml-1">active spaces</span>
            </div>
          </div>
        </div>
        
        <BentoGrid
          cards={sarahCards}
          isCustomizable={true}
        />
      </div>
    );
  }
};