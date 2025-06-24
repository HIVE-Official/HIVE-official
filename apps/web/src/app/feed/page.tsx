"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/hooks";
import { TopStrip, createSampleTopStripItems } from "@hive/ui";
import { Button } from "@hive/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import {
  Home,
  Users,
  Calendar,
  Settings,
  Search,
  Plus,
  Bell,
  User,
} from "lucide-react";
import { MainFeed } from "@hive/ui/components/feed/main-feed";

// Define proper interface for top strip items
interface TopStripItem {
  id: string;
  type: "ritual" | "space-unlock" | "tool-reveal" | "campus-event";
  title: string;
  // Add other properties as needed
}

// TODO: Replace with actual data fetching once API is built
const mockTopStripItems = [
  { id: "1", type: "ritual", name: "Sunrise Photo Walk" },
  { id: "2", type: "event", name: "Campus Movie Night" },
  { id: "3", type: "space", name: "#design-talks" },
];

// TODO: Replace with actual data fetching once API is built
const mockFeedItems = [
  {
    id: "p1",
    type: "post",
    author: "Sarah J.",
    content: "Just saw the most amazing sunset from the library window!",
  },
  {
    id: "r1",
    type: "ritual",
    name: "Sunrise Photo Walk",
    participantCount: 12,
  },
  {
    id: "p2",
    type: "post",
    author: "Mike P.",
    content: "Anyone else struggling with the new physics problem set? 😅",
  },
];

export default function FeedPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/");
    }
  }, [mounted, isLoading, user, router]);

  const handleTopStripItemClick = (item: TopStripItem) => {
    // TODO: Navigate to appropriate detail page based on item type
    switch (item.type) {
      case "ritual":
        router.push(`/rituals/${item.id}`);
        break;
      case "space-unlock":
        router.push(`/spaces/${item.id}`);
        break;
      case "tool-reveal":
        router.push(`/tools/${item.id}`);
        break;
      case "campus-event":
        router.push(`/events/${item.id}`);
        break;
    }
  };

  const handleTopStripItemLongPress = (_item: TopStripItem) => {
    // The long press preview is handled by the TopStrip component itself
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display">Feed</h1>
        <p className="text-muted">What-s happening on campus right now.</p>
      </header>

      <main className="space-y-8">
        {/* Placeholder for Top Strip with horizontal scroll */}
        <section aria-labelledby="top-strip-heading">
          <h2 id="top-strip-heading" className="sr-only">
            Happening Now
          </h2>
          {/* <TopStrip items={mockTopStripItems} /> */}
          <div className="h-24 bg-surface-01 rounded-lg flex items-center justify-center text-muted">
            TopStrip Placeholder
          </div>
        </section>

        {/* Placeholder for Main Feed */}
        <section aria-labelledby="main-feed-heading">
          <h2 id="main-feed-heading" className="sr-only">
            Latest Posts
          </h2>
          {/* <MainFeed items={mockFeedItems} /> */}
          <div className="space-y-4">
            <div className="h-48 bg-surface-01 rounded-lg flex items-center justify-center text-muted">
              PostCard Placeholder
            </div>
            <div className="h-32 bg-surface-01 rounded-lg flex items-center justify-center text-muted">
              RitualCard Placeholder
            </div>
            <div className="h-48 bg-surface-01 rounded-lg flex items-center justify-center text-muted">
              PostCard Placeholder
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
