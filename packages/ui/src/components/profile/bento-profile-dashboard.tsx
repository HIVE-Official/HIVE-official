"use client";

import React from "react";
import { BentoGrid, type BentoCard } from "./bento-grid";
import { ProfileHeaderCard } from "./profile-header-card";
import { HiveLabCard } from "./hivelab-card";
import { ToolsCard } from "./tools-card";
import { CalendarCard } from "./calendar-card";
import { GhostModeCard } from "./ghost-mode-card";
import { RequestAccessCard } from "./request-access-card";

// Define static components outside of render
const SocialPreviewCard = React.memo(() => (
  <div className="h-full flex flex-col items-center justify-center text-center">
    <div className="w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center mb-3">
      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    </div>
    <h4 className="text-sm font-semibold text-foreground mb-1">Social Features</h4>
    <p className="text-xs text-muted">Build privately, share when ready</p>
  </div>
));

SocialPreviewCard.displayName = 'SocialPreviewCard';

interface BentoProfileDashboardProps {
  user: {
    fullName: string;
    handle?: string;
    avatarUrl?: string;
    major?: string;
    graduationYear?: number;
    isBuilder?: boolean;
    builderAchievements?: {
      toolsCreated: number;
      totalEngagement: number;
    };
  };
  className?: string;
}

export function BentoProfileDashboard({ user, className }: BentoProfileDashboardProps) {
  const [ghostMode, setGhostMode] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const mockTools = [
    { id: "1", name: "Study Timer", category: "Productivity", users: 1247, icon: "⏱️" },
    { id: "2", name: "GPA Calc", category: "Academic", users: 892, icon: "📊" },
    { id: "3", name: "Campus Map", category: "Navigation", users: 2156, icon: "🗺️" }
  ];

  const mockEvents = [
    {
      id: "1",
      title: "CS 250 Exam",
      date: new Date(2024, 6, 15),
      type: "academic" as const
    },
    {
      id: "2", 
      title: "Study Group",
      date: new Date(2024, 6, 18),
      type: "personal" as const
    }
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Create components with props bound
  const ProfileHeaderCardWithProps = React.useMemo(() => 
    () => (
      <ProfileHeaderCard
        fullName={user.fullName}
        handle={user.handle}
        avatarUrl={user.avatarUrl}
        major={user.major}
        graduationYear={user.graduationYear}
        isBuilder={user.isBuilder}
      />
    ), [user]
  );

  const HiveLabCardWithProps = React.useMemo(() => 
    () => (
      <HiveLabCard
        isBuilder={user.isBuilder || false}
        toolsCreated={user.builderAchievements?.toolsCreated || 0}
        totalEngagement={user.builderAchievements?.totalEngagement || 0}
        countdownDate={user.isBuilder ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
      />
    ), [user]
  );

  const ToolsCardWithProps = React.useMemo(() => 
    () => (
      <ToolsCard tools={mockTools} />
    ), []
  );

  const CalendarCardWithProps = React.useMemo(() => 
    () => (
      <CalendarCard events={mockEvents} />
    ), []
  );

  const GhostModeCardWithProps = React.useMemo(() => 
    () => (
      <GhostModeCard 
        isGhostMode={ghostMode}
        onToggle={setGhostMode}
      />
    ), [ghostMode]
  );

  const RequestAccessCardWithProps = React.useMemo(() => 
    () => (
      <RequestAccessCard />
    ), []
  );

  const cards: BentoCard[] = [
    {
      id: "profile-header",
      size: "2x1",
      priority: 1,
      component: ProfileHeaderCardWithProps
    },
    {
      id: "hivelab",
      size: "1x2",
      priority: 2,
      component: HiveLabCardWithProps
    },
    {
      id: "calendar",
      size: "1x2", 
      priority: 3,
      component: CalendarCardWithProps
    },
    {
      id: "tools",
      size: "2x2",
      priority: 4,
      component: ToolsCardWithProps
    },
    {
      id: "ghost-mode",
      size: "1x1",
      priority: 5,
      component: GhostModeCardWithProps
    },
    {
      id: "request-access",
      size: "1x2",
      priority: 6,
      component: RequestAccessCardWithProps
    },
    {
      id: "social-preview",
      size: "1x1",
      priority: 7,
      isLocked: true,
      component: SocialPreviewCard
    }
  ];

  return (
    <div className={className}>
      <div 
        className={`transition-all duration-[400ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <BentoGrid cards={cards} />
      </div>
    </div>
  );
}