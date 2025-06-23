"use client";

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

// Define proper interface for top strip items
interface TopStripItem {
  id: string;
  type: 'ritual' | 'space-unlock' | 'tool-reveal' | 'campus-event';
  title: string;
  // Add other properties as needed
}

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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-white">HIVE</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Feed
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Spaces
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <User className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Top Strip - Primary Engagement Surface */}
      <div className="bg-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <TopStrip
            items={createSampleTopStripItems()}
            onItemClick={handleTopStripItemClick}
            onItemLongPress={handleTopStripItemLongPress}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Welcome, {user.fullName?.split(" ")[0]}!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-zinc-400">
                  You&apos;re now part of the HIVE community. Start exploring and
                  connecting!
                </p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first post
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-400 hover:text-white"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Join a space
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-400 hover:text-white"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Find events
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-400 hover:text-white"
                >
                  <Search className="w-4 h-4 mr-3" />
                  Discover people
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feed Content Placeholder */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Home className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Your feed is ready!
                </h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                  This is where you&apos;ll see posts from your spaces, campus
                  events, and updates from people you follow.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    Share something
                  </Button>
                  <Button variant="outline" className="border-zinc-700">
                    <Users className="w-4 h-4 mr-2" />
                    Explore spaces
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder posts */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Sarah Chen</p>
                    <p className="text-zinc-400 text-sm">2 hours ago</p>
                  </div>
                </div>
                <p className="text-zinc-300 mb-4">
                  Just finished my first day of classes! The campus is
                  absolutely beautiful. Can&apos;t wait to explore more spaces and
                  meet new people.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-400">
                    👍 12
                  </span>
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-400">
                    💬 3
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Mike Rodriguez</p>
                    <p className="text-zinc-400 text-sm">4 hours ago</p>
                  </div>
                </div>
                <p className="text-zinc-300 mb-4">
                  Anyone interested in forming a study group for CS 101? Looking
                  for motivated students to tackle this semester together.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-400">
                    👍 8
                  </span>
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-400">
                    💬 7
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
