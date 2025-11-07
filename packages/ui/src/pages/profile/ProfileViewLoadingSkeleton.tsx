import * as React from "react";

import { Skeleton } from "../../atomic/00-Global/atoms/skeleton";
import { Surface } from "../../layout";

/**
 * ProfileViewLoadingSkeleton mirrors the profile overview layout with shimmering placeholders.
 */
export const ProfileViewLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#07080d)]">
      <div className="h-52 w-full bg-[radial-gradient(circle_at_top,#2f2160,transparent)]" aria-hidden />
      <div className="relative -mt-20">
        <Surface className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-8">
          <div className="flex flex-wrap items-end gap-6">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-3 w-48 rounded-full" />
              <Skeleton className="h-8 w-56 rounded-full" />
              <Skeleton className="h-4 w-72 rounded-full" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-24 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>
        </Surface>
      </div>

      <main className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Surface className="space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
          <Skeleton className="h-10 w-64 rounded-full" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4">
              <Skeleton className="h-4 w-40 rounded-full" />
              <Skeleton className="h-4 w-56 rounded-full" />
              <Skeleton className="h-3 w-full rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </Surface>

        <aside className="space-y-6">
          <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-2xl" />
              ))}
            </div>
          </Surface>
          <Surface className="space-y-3 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-full" />
          </Surface>
        </aside>
      </main>
    </div>
  );
};

ProfileViewLoadingSkeleton.displayName = "ProfileViewLoadingSkeleton";

