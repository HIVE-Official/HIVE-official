"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageContainer, Button, Card } from "@hive/ui";
import { Heart, Users, Settings, Star, Clock, Activity, Plus, Crown, Shield } from "lucide-react";
import { type Space } from "@hive/core";
import { UnifiedSpaceCard } from "../components/unified-space-card";

async function fetchMySpaces(): Promise<{
  joined: Space[];
  favorited: Space[];
  owned: Space[];
  recent: Space[];
}> {
  const headers: Record<string, string> = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    console.warn('Could not get auth token, using test token');
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch('/api/profile/my-spaces', { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch my spaces: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Transform API response to match component expectations
  if (data.success && data.spaces) {
    // For now, put all spaces in joined category
    // In production, you'd categorize based on membership.role and user preferences
    return {
      joined: data.spaces,
      favorited: [], // Would come from user preferences
      owned: data.spaces.filter((space: any) => space.membership?.role === 'admin' || space.membership?.role === 'owner'),
      recent: data.spaces.slice(0, 3) // Most recent 3
    };
  }
  
  return {
    joined: [],
    favorited: [],
    owned: [],
    recent: []
  };
}

export default function MySpacesPage() {
  const [activeTab, setActiveTab] = useState<"joined" | "favorited" | "owned" | "recent">("joined");

  const { data: spacesData, isLoading, error } = useQuery({
    queryKey: ["my-spaces"],
    queryFn: fetchMySpaces,
  });

  const tabs = [
    { id: "joined", label: "Joined", icon: Users, count: spacesData?.joined.length || 0 },
    { id: "favorited", label: "Favorited", icon: Heart, count: spacesData?.favorited.length || 0 },
    { id: "owned", label: "Owned", icon: Crown, count: spacesData?.owned.length || 0 },
    { id: "recent", label: "Recent", icon: Clock, count: spacesData?.recent.length || 0 },
  ];

  const currentSpaces = spacesData?.[activeTab] || [];

  return (
    <PageContainer
      title="My Spaces"
      subtitle="Manage your spaces and discover where you belong"
      breadcrumbs={[
        { label: "Spaces", href: "/spaces" },
        { label: "My Spaces" }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/20 text-white">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
          <Button 
            className="bg-yellow-400 text-neutral-950 hover:bg-yellow-300"
            onClick={() => window.location.href = "/spaces/browse"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Browse Spaces
          </Button>
        </div>
      }
      maxWidth="xl"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">{spacesData?.joined.length || 0}</div>
          <div className="text-sm text-neutral-400">Joined</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
          <Heart className="h-8 w-8 mx-auto mb-2 text-red-400" />
          <div className="text-2xl font-bold text-white">{spacesData?.favorited.length || 0}</div>
          <div className="text-sm text-neutral-400">Favorited</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{spacesData?.owned.length || 0}</div>
          <div className="text-sm text-neutral-400">Owned</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-white">
            {(spacesData?.joined.length || 0) + (spacesData?.owned.length || 0)}
          </div>
          <div className="text-sm text-neutral-400">Total Active</div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-white/10 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-neutral-400 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  activeTab === tab.id
                    ? "bg-yellow-400 text-neutral-950"
                    : "bg-white/10 text-neutral-400"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-white">Loading your spaces...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-8 text-center border-red-500/20 bg-red-500/5">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Unable to load your spaces</h3>
          <p className="text-neutral-400 mb-4">There was an error loading your spaces. Please try again.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </Card>
      )}

      {/* Widget Experience Info */}
      {!isLoading && !error && currentSpaces.length > 0 && (
        <Card className="p-4 mb-6 bg-gradient-to-r from-yellow-400/[0.05] to-transparent border-yellow-400/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Enhanced Space Experience</p>
              <p className="text-xs text-neutral-400">Each of your spaces now features interactive widget dashboards with post boards, events, and tools</p>
            </div>
          </div>
        </Card>
      )}

      {/* Spaces Grid */}
      {!isLoading && !error && (
        <>
          {currentSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSpaces.map((space) => (
                <UnifiedSpaceCard 
                  key={space.id} 
                  space={space} 
                  variant="grid"
                  showMembership={true}
                  membershipRole={activeTab === "owned" ? "owner" : "member"}
                  onAction={(action) => console.log(`${action} space:`, space.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState activeTab={activeTab} />
          )}
        </>
      )}
    </PageContainer>
  );
}


// Empty State Component
function EmptyState({ activeTab }: { activeTab: string }) {
  const getEmptyContent = () => {
    switch (activeTab) {
      case "joined":
        return {
          icon: Users,
          title: "No spaces joined yet",
          description: "Start by browsing and joining spaces that interest you.",
          action: "Browse Spaces",
          href: "/spaces/browse"
        };
      case "favorited":
        return {
          icon: Heart,
          title: "No favorite spaces",
          description: "Heart spaces you love to keep them easily accessible.",
          action: "Browse Spaces",
          href: "/spaces/browse"
        };
      case "owned":
        return {
          icon: Crown,
          title: "No spaces owned",
          description: "Space creation is coming in v1. For now, browse and join existing communities.",
          action: "Browse Spaces",
          href: "/spaces/browse"
        };
      case "recent":
        return {
          icon: Clock,
          title: "No recent activity",
          description: "Your recent space activity will appear here.",
          action: "Browse Spaces",
          href: "/spaces/browse"
        };
      default:
        return {
          icon: Users,
          title: "No spaces found",
          description: "Get started by joining or creating spaces.",
          action: "Browse Spaces",
          href: "/spaces/browse"
        };
    }
  };

  const { icon: Icon, title, description, action, href } = getEmptyContent();

  return (
    <Card className="p-12 text-center">
      <Icon className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 mb-6">{description}</p>
      <Button 
        onClick={() => window.location.href = href}
        className="bg-yellow-400 text-neutral-950 hover:bg-yellow-300"
      >
        {action}
      </Button>
    </Card>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}