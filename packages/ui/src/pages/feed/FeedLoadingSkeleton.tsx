import * as React from "react";

import { Skeleton } from "../../atomic/00-Global/atoms/skeleton";
import { Surface } from "../../layout";

/**
 * FeedLoadingSkeleton renders the loading experience for the campus feed.
 * It mirrors the FeedPage layout with shimmering placeholders.
 */
export const FeedLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#07080d)]">
      <div className="border-b border-[var(--hive-border-subtle,#1d1f2c)] bg-[var(--hive-background-secondary,#10111a)]/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-3 w-48 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-full" />
            <Skeleton className="h-4 w-80 rounded-full" />
          </div>
          <Skeleton className="h-11 w-40 rounded-full" />
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Surface className="rounded-3xl bg-[var(--hive-background-secondary,#10111a)] px-6 py-5">
            <Skeleton className="h-10 w-80 rounded-full" />
            <div className="mt-6 grid gap-2 md:grid-cols-2">
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
            </div>
          </Surface>

          {Array.from({ length: 3 }).map((_, index) => (
            <Surface
              key={index}
              className="space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-40 rounded-full" />
                  <Skeleton className="h-3 w-48 rounded-full" />
                  <Skeleton className="h-3 w-24 rounded-full" />
                </div>
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>
              <Skeleton className="h-20 w-full rounded-2xl" />
              <div className="grid gap-2 md:grid-cols-2">
                <Skeleton className="h-3 rounded-full" />
                <Skeleton className="h-3 rounded-full" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
              </div>
            </Surface>
          ))}
        </div>

        <aside className="space-y-6">
          <Surface className="space-y-4 rounded-3xl bg-[var(--hive-background-secondary,#11131f)] p-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-3 w-56 rounded-full" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-10 rounded-2xl" />
              ))}
            </div>
          </Surface>
          <Surface className="space-y-4 rounded-3xl bg-[var(--hive-background-secondary,#10111a)] p-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-3 w-56 rounded-full" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-48 rounded-full" />
                  <Skeleton className="h-3 w-40 rounded-full" />
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="space-y-4 rounded-3xl bg-[var(--hive-background-secondary,#10111a)] p-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-8 w-44 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </Surface>
        </aside>
      </main>
    </div>
  );
};

FeedLoadingSkeleton.displayName = "FeedLoadingSkeleton";

