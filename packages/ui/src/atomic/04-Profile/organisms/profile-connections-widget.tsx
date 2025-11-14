"use client";

import * as React from "react";
import { Link2, UserPlus } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Card } from "../../00-Global/atoms/card";
import {
  PrivacyControl,
  type PrivacyLevel,
} from "../../00-Global/molecules/privacy-control";

export interface ProfileConnectionItem {
  id: string;
  name: string;
  avatarUrl?: string | null;
  isFriend?: boolean;
  sharedSpaces?: string[];
  connectionStrength?: number;
}

export interface ProfileConnectionsWidgetProps {
  connections: ProfileConnectionItem[];
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  className?: string;
}

const connectionLabel = (item: ProfileConnectionItem) => {
  if (item.sharedSpaces?.length) {
    return `${item.sharedSpaces.length} shared spaces`;
  }
  if (item.connectionStrength) {
    return `Strength ${item.connectionStrength}`;
  }
  return "Campus connection";
};

export function ProfileConnectionsWidget({
  connections,
  isOwnProfile = false,
  privacyLevel = "public",
  onPrivacyChange,
  className,
}: ProfileConnectionsWidgetProps) {
  const visible = connections.slice(0, 6);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 58%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 88%,transparent)] p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)] p-2">
            <Link2 className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]">Connections</h3>
        </div>
        {isOwnProfile && onPrivacyChange ? (
          <PrivacyControl level={privacyLevel} onLevelChange={onPrivacyChange} compact />
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center">
          <UserPlus className="h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]" aria-hidden />
          <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
            {isOwnProfile
              ? "Grow your network by joining new spaces and connecting with peers."
              : "No public connections yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visible.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 50%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 18%,transparent)] text-sm font-semibold text-[var(--hive-background-primary,#090a14)]">
                {(connection.name || "UB").
                  split(" ")
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[var(--hive-text-primary,#f7f7ff)]">
                  {connection.name}
                </p>
                <p className="text-xs text-[var(--hive-text-muted,#8d90a2)]">{connectionLabel(connection)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
