"use client";

import * as React from "react";
import { Hammer, PlusCircle } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Card } from "../../00-Global/atoms/card";
import { Button } from "../../00-Global/atoms/button";

export interface HiveLabWidgetProps {
  hasAccess?: boolean;
  isSpaceLeader?: boolean;
  toolsCreated?: number;
  toolsUsed?: number;
  leadingSpaces?: Array<{ id: string; name: string }>;
  onRequestAccess?: () => void;
  onOpenStudio?: () => void;
  className?: string;
}

export function HiveLabWidget({
  hasAccess = false,
  isSpaceLeader = false,
  toolsCreated = 0,
  toolsUsed = 0,
  leadingSpaces = [],
  onRequestAccess,
  onOpenStudio,
  className,
}: HiveLabWidgetProps) {
  const description = hasAccess
    ? "Create campus tools with HiveLab Studio. Publish workflows, forms, and automation for your spaces."
    : "HiveLab Studio lets space leaders launch tools for their communities. Request access to start building.";

  return (
    <Card
      className={cn(
        "border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 55%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 92%,transparent)] p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 14%,transparent)] p-2">
          <Hammer className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]">HiveLab Studio</h3>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d90a2)]">
            Builders • Tools • Automations
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-[var(--hive-text-secondary,#c0c2cc)]">{description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 48%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 70%,transparent)] p-3">
          <div className="text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]">{toolsCreated}</div>
          <div className="mt-1 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]">Tools created</div>
        </div>
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 48%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 70%,transparent)] p-3">
          <div className="text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]">{toolsUsed}</div>
          <div className="mt-1 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]">Spaces using tools</div>
        </div>
      </div>

      {leadingSpaces.length > 0 ? (
        <div className="mt-4 space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d90a2)]">
            Spaces you lead
          </p>
          <ul className="space-y-1 text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
            {leadingSpaces.slice(0, 3).map((space) => (
              <li key={space.id}>{space.name}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        {hasAccess ? (
          <Button onClick={onOpenStudio} className="justify-center">
            Open HiveLab Studio
          </Button>
        ) : (
          <Button onClick={onRequestAccess} className="justify-center">
            <PlusCircle className="mr-2 h-4 w-4" aria-hidden />
            Request access
          </Button>
        )}
        {hasAccess ? (
          <p className="text-center text-xs text-[var(--hive-text-muted,#8d90a2)]">
            You have full builder access {isSpaceLeader ? "as a space leader" : "granted by an admin"}.
          </p>
        ) : (
          <p className="text-center text-xs text-[var(--hive-text-muted,#8d90a2)]">
            Access is granted to campus builders and space leaders.
          </p>
        )}
      </div>
    </Card>
  );
}
