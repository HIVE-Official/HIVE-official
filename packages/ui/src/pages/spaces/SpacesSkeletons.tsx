import * as React from "react";

import { Skeleton } from "../../atomic/00-Global/atoms/skeleton";
import { Surface } from "../../layout";

export const SpacesDiscoverySkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--hive-background-page,#07080d)]">
    <div className="border-b border-[var(--hive-border-subtle,#1d1f2c)] bg-[var(--hive-background-secondary,#10111a)]/85">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8">
        <Skeleton className="h-3 w-40 rounded-full" />
        <Skeleton className="h-8 w-72 rounded-full" />
        <Skeleton className="h-4 w-96 rounded-full" />
      </div>
    </div>
    <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {Array.from({ length: 4 }).map((_, index) => (
        <Surface
          key={index}
          className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6"
        >
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-5 w-48 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-10 w-40 rounded-full" />
        </Surface>
      ))}
    </main>
  </div>
);

SpacesDiscoverySkeleton.displayName = "SpacesDiscoverySkeleton";

export const SpaceDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--hive-background-page,#07080d)]">
    <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6">
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="h-4 w-5/6 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-2xl" />
          ))}
        </div>
      </Surface>
      <div className="space-y-4">
        <Surface className="space-y-3 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6">
          <Skeleton className="h-4 w-40 rounded-full" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-10 rounded-2xl" />
          ))}
        </Surface>
        <Surface className="space-y-3 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6">
          <Skeleton className="h-4 w-40 rounded-full" />
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-2xl" />
          ))}
        </Surface>
      </div>
    </main>
  </div>
);

SpaceDetailSkeleton.displayName = "SpaceDetailSkeleton";

export const SpaceCreationSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--hive-background-page,#07080d)]">
    <main className="mx-auto max-w-4xl space-y-5 px-6 pb-24 pt-14">
      <Skeleton className="h-8 w-72 rounded-full" />
      <Surface className="space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-48 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        ))}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </Surface>
    </main>
  </div>
);

SpaceCreationSkeleton.displayName = "SpaceCreationSkeleton";

