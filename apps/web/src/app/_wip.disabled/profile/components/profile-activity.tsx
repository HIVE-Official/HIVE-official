"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@hive/ui";
import {
  Calendar,
  Clock,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { type User, logger } from "@hive/core";

interface ProfileActivityProps {
  user: User;
}

// Mock activity data - will be replaced with real data from Team 2/3
const mockActivities = [
  {
    id: "1",
    type: "login",
    description: "Logged into HIVE",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    icon: Clock,
  },
  {
    id: "2",
    type: "space_join",
    description: "Joined Computer Science Majors",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    icon: Users,
  },
  {
    id: "3",
    type: "post",
    description: "Posted in Computer Science Majors",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    icon: MessageSquare,
  },
];

export const ProfileActivity = ({ user }: ProfileActivityProps) => {
  // TODO: Use user data for personalized activity
  logger.info("Profile activity for user:", { userId: user.uid });

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <Card className="border-gray-700 bg-[var(--hive-background-primary)]/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-inverse)]">
            <TrendingUp className="h-5 w-5" />
            Activity Summary (Last 90 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">12</div>
              <div className="text-sm text-gray-400">Logins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">3</div>
              <div className="text-sm text-gray-400">Spaces Joined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">8</div>
              <div className="text-sm text-gray-400">Posts Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">2</div>
              <div className="text-sm text-gray-400">Tools Created</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motion Log - Stub Implementation */}
      <Card className="border-gray-700 bg-[var(--hive-background-primary)]/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-inverse)]">
            <Calendar className="h-5 w-5" />
            Motion Log
          </CardTitle>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-700 p-3"
                >
                  <div className="rounded-full bg-[var(--hive-brand-secondary)]/10 p-2">
                    <IconComponent className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Placeholder for more activities */}
            <div className="rounded-lg border border-dashed border-gray-600 p-6 text-center">
              <Calendar className="mx-auto h-8 w-8 text-gray-500" />
              <p className="mt-2 text-sm text-gray-400">
                More activity data will appear as you use HIVE
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Daily batch aggregation • Real data coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Events Strip - Placeholder */}
      <Card className="border-gray-700 bg-[var(--hive-background-primary)]/50">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-inverse)]">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dayNumber = date.getDate();

              return (
                <div
                  key={i}
                  className="rounded-lg border border-gray-700 p-3 text-center"
                >
                  <div className="text-xs text-gray-400">{dayName}</div>
                  <div className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                    {dayNumber}
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-[var(--hive-brand-secondary)]"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {Math.floor(Math.random() * 5)} events
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
