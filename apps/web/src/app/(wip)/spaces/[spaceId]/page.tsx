"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { type Space } from "@hive/core";
import Image from "next/image";
import { 
  Button,
  Badge,
} from "@hive/ui";
import {
  Users,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { CreatePost } from "./components/create-post";
import { Feed } from "./components/feed";
import { SpaceActionButton } from "./components/space-action-button";

async function fetchSpaceById(spaceId: string): Promise<Space> {
  const response = await fetch(`/api/spaces/${spaceId}`);
  if (response.status === 404) {
    throw new Error("Space not found");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch space");
  }
  return response.json();
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
        <p className="text-neutral-400">Loading space...</p>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  const isNotFound = error.message === "Space not found";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          {isNotFound ? "Space Not Found" : "Something Went Wrong"}
        </h1>
        <p className="text-neutral-400 mb-8">
          {isNotFound
            ? "This space doesn't exist or may have been removed."
            : "We encountered an error loading this space. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/spaces">
            <Button variant="outline" className="w-full sm:w-auto">
              Browse Spaces
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

function SpaceStatusBadge({ status }: { status: Space["status"] }) {
  const statusConfig = {
    dormant: { label: "Coming Soon", variant: "secondary" as const },
    frozen: { label: "View Only", variant: "outline" as const },
    activated: { label: "Active", variant: "default" as const },
  };

  const config = statusConfig[status] || statusConfig.activated;

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}

export default function SpaceDetailPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const [spaceId, setSpaceId] = React.useState<string | null>(null);

  React.useEffect(() => {
    void params.then(({ spaceId }) => setSpaceId(spaceId));
  }, [params]);

  const {
    data: space,
    isLoading,
    error,
  } = useQuery<Space>({
    queryKey: ["space", spaceId],
    queryFn: () => fetchSpaceById(spaceId!),
    enabled: !!spaceId,
    retry: (failureCount, error) => {
      if (error.message === "Space not found") return false;
      return failureCount < 3;
    },
  });

  if (!spaceId || isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!space) {
    return <ErrorState error={new Error("Space not found")} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="container mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/spaces"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Spaces
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48 w-full md:h-64 lg:h-80">
        {space.bannerUrl ? (
          <Image
            src={space.bannerUrl}
            alt={`${space.name} banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white truncate">
                  {space.name}
                </h1>
                <SpaceStatusBadge status={space.status} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{space.memberCount.toLocaleString()} members</span>
                </div>

                <Badge variant="secondary" className="capitalize text-xs">
                  {space.type}
                </Badge>

                {space.tags.length > 0 && (
                  <Badge variant="outline" className="capitalize text-xs">
                    {space.tags[0].sub_type}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <SpaceActionButton _spaceId={spaceId} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 pb-12">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">About</h2>
              <p className="text-neutral-300 leading-relaxed">
                {space.description || "No description available."}
              </p>
            </div>

            {/* Additional space info could go here */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-4">
                Space Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Type</span>
                  <span className="text-white capitalize">{space.type}</span>
                </div>
                {space.tags.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Category</span>
                    <span className="text-white capitalize">
                      {space.tags[0].sub_type}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Status</span>
                  <SpaceStatusBadge status={space.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePost _spaceId={spaceId} _onPostCreated={() => {}} />
            <Feed spaceId={spaceId} />
          </div>
        </div>
      </div>
    </div>
  );
}
