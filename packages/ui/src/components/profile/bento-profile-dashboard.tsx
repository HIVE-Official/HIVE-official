"use client";

import React from "react";
import { BentoGrid, type BentoCard } from "./bento-grid";
import { ProfileHeaderCard } from "./profile-header-card";
import { HiveLabCard } from "./hivelab-card";
import { ToolsCard } from "./tools-card";
import { CalendarCard } from "./calendar-card";
import { GhostModeCard } from "./ghost-mode-card";

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

  // Simulate loading and trigger staggered animations
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration
  const mockTools = [
    { id: "1", name: "Study Timer" },
    { id: "2", name: "GPA Calc" },
    { id: "3", name: "Schedule" }
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

  // Define bento cards
  const cards: BentoCard[] = [
    {
      id: "profile-header",
      size: "2x1",
      priority: 1,
      component: () => (
        <ProfileHeaderCard
          fullName={user.fullName}
          handle={user.handle}
          avatarUrl={user.avatarUrl}
          major={user.major}
          graduationYear={user.graduationYear}
          isBuilder={user.isBuilder}
        />
      )
    },
    {
      id: "hivelab",
      size: "1x2",
      priority: 2,
      component: () => (
        <HiveLabCard
          isBuilder={user.isBuilder || false}
          toolsCreated={user.builderAchievements?.toolsCreated || 0}
          totalEngagement={user.builderAchievements?.totalEngagement || 0}
          countdownDate={new Date(2025, 7, 8)} // August 8, 2025
        />
      )
    },
    {
      id: "calendar",
      size: "1x2", 
      priority: 3,
      component: () => <CalendarCard events={mockEvents} />
    },
    {
      id: "tools",
      size: "2x2",
      priority: 4,
      component: () => <ToolsCard tools={mockTools} />
    },
    {
      id: "ghost-mode",
      size: "1x1",
      priority: 5,
      component: () => (
        <GhostModeCard
          isGhostMode={ghostMode}
          onToggle={setGhostMode}
        />
      )
    },
    {
      id: "social-preview",
      size: "1x1",
      priority: 6,
      isLocked: true,
      component: () => (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">Social Features</h4>
          <p className="text-xs text-muted">Build privately, share when ready</p>
        </div>
      )
    }
  ];

  return (
    <div className={className}>
      {/* Fade in animation for entire dashboard */}
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