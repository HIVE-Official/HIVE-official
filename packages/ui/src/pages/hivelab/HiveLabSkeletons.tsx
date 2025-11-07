import * as React from "react";

import { Skeleton } from "../../atomic/00-Global/atoms/skeleton";
import { Surface } from "../../layout";

export const ToolsLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--hive-background-page,#05060b)]">
    <div className="border-b border-[var(--hive-border-subtle,#161827)] bg-[var(--hive-background-secondary,#0e1019)]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8">
        <Skeleton className="h-3 w-44 rounded-full" />
        <Skeleton className="h-8 w-80 rounded-full" />
        <Skeleton className="h-4 w-96 rounded-full" />
      </div>
    </div>
    <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
      <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
        <Skeleton className="h-10 w-72 rounded-full" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Surface
            key={index}
            className="space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] p-4"
          >
            <Skeleton className="h-5 w-56 rounded-full" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </Surface>
        ))}
      </Surface>
      <div className="space-y-4">
        <Surface className="space-y-3 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
          <Skeleton className="h-4 w-40 rounded-full" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-8 rounded-full" />
          ))}
        </Surface>
        <Surface className="space-y-3 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
          <Skeleton className="h-4 w-40 rounded-full" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-10 rounded-2xl" />
          ))}
        </Surface>
      </div>
    </main>
  </div>
);

ToolsLoadingSkeleton.displayName = "ToolsLoadingSkeleton";

