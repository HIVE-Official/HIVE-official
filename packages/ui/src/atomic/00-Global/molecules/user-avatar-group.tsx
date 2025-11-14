"use client";

import { CSSProperties } from "react";

import { SimpleAvatar } from "../atoms/simple-avatar";
import { cn } from "../../../lib/utils";

export interface UserAvatarGroupUser {
  id: string;
  name?: string | null;
  imageUrl?: string | null;
}

export interface UserAvatarGroupProps {
  users: UserAvatarGroupUser[];
  max?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}

/**
 * Overlapping avatar group with optional "+N" overflow indicator.
 */
export function UserAvatarGroup({
  users,
  max = 5,
  size = "sm",
  className,
}: UserAvatarGroupProps) {
  const display = users.slice(0, max);
  const extra = users.length - display.length;

  const sizePx = size === "xs" ? 20 : size === "sm" ? 28 : 36;

  const avatarStyle: CSSProperties = {
    width: sizePx,
    height: sizePx,
  };

  return (
    <div className={cn("flex -space-x-2", className)}>
      {display.map((user) => (
        <SimpleAvatar
          key={user.id}
          src={user.imageUrl ?? undefined}
          fallback={(user.name?.[0] || "?").toUpperCase()}
          className="ring-2 ring-[var(--hive-background-secondary)]"
          style={avatarStyle}
          title={user.name ?? undefined}
        />
      ))}

      {extra > 0 ? (
        <div
          className="inline-flex items-center justify-center rounded-full bg-hive-background-tertiary text-hive-text-secondary ring-2 ring-[var(--hive-background-secondary)]"
          style={avatarStyle}
          aria-label={`+${extra} more`}
        >
          +{extra}
        </div>
      ) : null}
    </div>
  );
}

