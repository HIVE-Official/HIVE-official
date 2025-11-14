"use client";

import * as React from "react";
import { Users, Globe, Lock, Ghost } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button } from "../atoms/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";

type PrivacyLevel = "public" | "connections" | "private" | "ghost";

const PRIVACY_LEVELS: Array<{
  value: PrivacyLevel;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}> = [
  {
    value: "public",
    label: "Public",
    description: "Visible to everyone at UB",
    icon: Globe,
    tone: "text-emerald-400",
  },
  {
    value: "connections",
    label: "Connections",
    description: "Only your connections can view",
    icon: Users,
    tone: "text-sky-400",
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can view",
    icon: Lock,
    tone: "text-amber-400",
  },
  {
    value: "ghost",
    label: "Ghost",
    description: "Hidden across Hive",
    icon: Ghost,
    tone: "text-purple-400",
  },
];

export interface PrivacyControlProps {
  level: PrivacyLevel;
  onLevelChange: (level: PrivacyLevel) => void;
  widgetName?: string;
  compact?: boolean;
  showDescription?: boolean;
  className?: string;
}

export function PrivacyControl({
  level,
  onLevelChange,
  widgetName,
  compact = false,
  showDescription = false,
  className,
}: PrivacyControlProps) {
  const current = React.useMemo(
    () => PRIVACY_LEVELS.find((item) => item.value === level) ?? PRIVACY_LEVELS[0],
    [level],
  );

  const Icon = current.icon;

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const index = PRIVACY_LEVELS.findIndex((item) => item.value === level);
          const next = PRIVACY_LEVELS[(index + 1) % PRIVACY_LEVELS.length];
          onLevelChange(next.value);
        }}
        className={cn("h-8 gap-1 px-2 text-xs", current.tone, className)}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        <span>{current.label}</span>
      </Button>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {widgetName ? (
        <span className="text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 90%,transparent)]">
          {widgetName}
        </span>
      ) : null}
      <Select value={level} onValueChange={(value) => onLevelChange(value as PrivacyLevel)}>
        <SelectTrigger className="w-full bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 88%,transparent)]">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Icon className={cn("h-4 w-4", current.tone)} aria-hidden />
              <span>{current.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[color-mix(in_srgb,var(--hive-background-primary,#090a14) 96%,transparent)] border-[color-mix(in_srgb,var(--hive-border-default,#242736) 75%,transparent)]">
          {PRIVACY_LEVELS.map((item) => {
            const ItemIcon = item.icon;
            return (
              <SelectItem
                key={item.value}
                value={item.value}
                className="flex cursor-pointer gap-2 px-3"
              >
                <ItemIcon className={cn("h-4 w-4", item.tone)} aria-hidden />
                <div className="flex flex-col text-left">
                  <span className="text-sm text-[var(--hive-text-primary,#f7f7ff)]">{item.label}</span>
                  {showDescription ? (
                    <span className="text-xs text-[var(--hive-text-muted,#9194a8)]">
                      {item.description}
                    </span>
                  ) : null}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {showDescription ? (
        <p className="text-xs text-[var(--hive-text-muted,#9194a8)]">{current.description}</p>
      ) : null}
    </div>
  );
}

export interface BulkPrivacyControlWidget {
  id: string;
  name: string;
  level: PrivacyLevel;
}

export interface BulkPrivacyControlProps {
  widgets: BulkPrivacyControlWidget[];
  onBulkChange: (levels: Record<string, PrivacyLevel>) => void;
  className?: string;
}

export function BulkPrivacyControl({ widgets, onBulkChange, className }: BulkPrivacyControlProps) {
  const [pending, setPending] = React.useState<Record<string, PrivacyLevel>>({});

  const applyAll = (level: PrivacyLevel) => {
    const updates = widgets.reduce<Record<string, PrivacyLevel>>((acc, widget) => {
      acc[widget.id] = level;
      return acc;
    }, {});
    setPending(updates);
    onBulkChange(updates);
  };

  const updateWidget = (widgetId: string, level: PrivacyLevel) => {
    setPending((prev) => ({ ...prev, [widgetId]: level }));
  };

  const hasChanges = Object.keys(pending).length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2b2e3f) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 88%,transparent)] p-3">
        <span className="text-xs uppercase tracking-[0.32em] text-[var(--hive-text-muted,#8d90a2)]">
          Set all widgets to
        </span>
        <div className="flex gap-2">
          {PRIVACY_LEVELS.map((item) => {
            const ItemIcon = item.icon;
            return (
              <Button
                key={item.value}
                variant="ghost"
                size="sm"
                onClick={() => applyAll(item.value)}
                className={cn("gap-1 px-2", item.tone)}
              >
                <ItemIcon className="h-3.5 w-3.5" aria-hidden />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2b2e3f) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 82%,transparent)] p-3"
          >
            <span className="text-sm text-[var(--hive-text-primary,#f7f7ff)]">{widget.name}</span>
            <PrivacyControl
              level={pending[widget.id] ?? widget.level}
              onLevelChange={(value) => updateWidget(widget.id, value)}
              compact
            />
          </div>
        ))}
      </div>

      {hasChanges ? (
        <Button
          onClick={() => {
            onBulkChange(pending);
            setPending({});
          }}
          className="w-full"
        >
          Save privacy settings
        </Button>
      ) : null}
    </div>
  );
}

export type { PrivacyLevel };
