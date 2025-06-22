"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { User } from "@hive/core";
import { ProfileSidebar } from "./profile-sidebar";
import { CalendarWidget } from "./calendar-widget";
import { AboutSection } from "./about-section";
import { ProgressSection } from "./progress-section";
import { ActionCard } from "./action-card";

interface ProfileDashboardProps {
  user: User;
}

export const ProfileDashboard = ({ user }: ProfileDashboardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to allow for smooth entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-h1 font-semibold text-white mb-2">
          Profile Dashboard
        </h1>
        <p className="font-sans text-body text-zinc-400">
          Manage your profile, track progress, and stay connected.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div
        className={`
          grid gap-6 transition-all duration-200 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          
          /* Mobile: 1 column stack */
          grid-cols-1
          
          /* Desktop: 4|5|3 column layout */
          lg:grid-cols-12 lg:gap-8
        `}
      >
        {/* Left Sidebar - Profile Info */}
        <div className="lg:col-span-4">
          <ProfileSidebar user={user} />
        </div>

        {/* Center Column - Calendar */}
        <div className="lg:col-span-5">
          <CalendarWidget />
        </div>

        {/* Right Column - About & Progress */}
        <div className="space-y-6 lg:col-span-3">
          <AboutSection user={user} />
          <ProgressSection user={user} />
          <ActionCard user={user} />
        </div>
      </div>
    </div>
  );
};
