"use client";

import { useQuery } from "@tanstack/react-query";
import { type Space } from "@hive/core/src/domain/firestore/space";
import { SpaceCard } from "@hive/ui";
import { useAuth } from "@hive/hooks";
// Removed unused Loader2 import

async function fetchMySpaces(token: string | null): Promise<Space[]> {
  if (!token) return [];
  const response = await fetch("/api/profile/my-spaces", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user's spaces");
  }
  return response.json();
}

export function MySpaces() {
  const { user, isLoading: authLoading } = useAuth();

  const {
    data: spaces,
    isLoading,
    error,
  } = useQuery<Space[]>({
    queryKey: ["my-spaces"],
    queryFn: async () => {
      const token = user ? await user.getIdToken() : null;
      return fetchMySpaces(token);
    },
    enabled: !authLoading && !!user,
  });

  if (isLoading || authLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-neutral-900"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Could not load your spaces.</p>;
  }

  if (!spaces || spaces.length === 0) {
    return (
      <p className="text-neutral-400">
        You haven&apos;t joined any spaces yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-white">My Spaces</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {spaces.map((space) => (
          <SpaceCard
            key={space.id}
            space={space}
            href={`/spaces/${space.id}`}
          />
        ))}
      </div>
    </div>
  );
}
