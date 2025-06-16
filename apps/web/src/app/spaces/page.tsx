"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@hive/ui";
import { Search, AlertCircle, Compass } from "lucide-react";
import { SpaceFilterPills } from "./components/space-filter-pills";
import { type SpaceType, type Space } from "@hive/core";
import { SpaceCard } from "@hive/ui";
import { useDebounce } from "@hive/hooks";
import { Button } from "@hive/ui";

async function fetchSpaces(
  filter: SpaceType | "all",
  searchTerm: string
): Promise<Space[]> {
  const params = new URLSearchParams();
  if (filter !== "all") {
    params.set("type", filter);
  }
  if (searchTerm) {
    params.set("q", searchTerm);
  }
  const response = await fetch(`/api/spaces/browse?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch spaces");
  }
  const data = (await response.json()) as { spaces?: Space[] };
  return data.spaces || [];
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="h-32 bg-neutral-800/50 rounded-t-xl" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-neutral-800/50 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-neutral-800/30 rounded w-full" />
                <div className="h-3 bg-neutral-800/30 rounded w-2/3" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-neutral-800/30 rounded w-20" />
                <div className="h-3 bg-neutral-800/30 rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">
        Failed to load spaces
      </h3>
      <p className="text-neutral-400 text-center mb-6 max-w-md">
        We couldn&apos;t fetch the spaces right now. Please check your
        connection and try again.
      </p>
      <Button
        onClick={onRetry}
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        Try Again
      </Button>
    </div>
  );
}

function EmptyState({
  searchTerm,
  activeFilter,
}: {
  searchTerm: string;
  activeFilter: SpaceType | "all";
}) {
  const isFiltered = activeFilter !== "all" || searchTerm.length > 0;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Compass className="h-12 w-12 text-neutral-500 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">
        {isFiltered ? "No spaces found" : "No spaces yet"}
      </h3>
      <p className="text-neutral-400 text-center max-w-md">
        {isFiltered
          ? "Try adjusting your search terms or filters to find what you&apos;re looking for."
          : "Spaces are being created. Check back soon to discover new communities."}
      </p>
      {isFiltered && (
        <Button
          onClick={() => {
            window.location.reload();
          }}
          variant="ghost"
          className="mt-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
}

export default function SpacesDiscoveryPage() {
  const [activeFilter, setActiveFilter] = useState<SpaceType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: spaces,
    isLoading,
    error,
    refetch,
  } = useQuery<Space[]>({
    queryKey: ["spaces", activeFilter, debouncedSearchTerm],
    queryFn: () => fetchSpaces(activeFilter, debouncedSearchTerm),
    staleTime: 30000, // 30 seconds
    retry: 2,
  });

  const handleFilterChange = (filter: SpaceType | "all") => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveFilter("all");
  };

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return <ErrorState onRetry={() => refetch()} />;
    }

    if (!spaces || spaces.length === 0) {
      return (
        <EmptyState
          searchTerm={debouncedSearchTerm}
          activeFilter={activeFilter}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {spaces.map((space) => (
          <SpaceCard
            key={space.id}
            space={space}
            href={`/spaces/${space.id}`}
          />
        ))}
      </div>
    );
  }, [isLoading, error, spaces, debouncedSearchTerm, activeFilter, refetch]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Discover Spaces
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            Find communities, join conversations, and build with others at your
            campus.
          </p>
        </header>

        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-neutral-500" aria-hidden="true" />
            </div>
            <Input
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-xl border-0 bg-white/[0.02] border border-white/[0.06] pl-10 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm sm:leading-6 transition-colors"
              placeholder="Search by name, description, or keyword..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <span className="text-sm">Clear</span>
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <SpaceFilterPills
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results count */}
        {!isLoading && spaces && (
          <div className="mb-6">
            <p className="text-sm text-neutral-500">
              {spaces.length === 0
                ? "No spaces found"
                : `${spaces.length} ${spaces.length === 1 ? "space" : "spaces"} found`}
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {activeFilter !== "all" && ` in ${activeFilter}`}
            </p>
          </div>
        )}

        <main>{renderContent}</main>
      </div>
    </div>
  );
}
