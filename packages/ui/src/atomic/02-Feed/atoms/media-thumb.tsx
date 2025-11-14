"use client";

import * as React from "react";
import { Play, Image as ImageIcon, Video, Music } from "lucide-react";
import { cn } from "../../../lib/utils";

export type MediaThumbType = "image" | "video" | "audio";

export interface MediaThumbProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: MediaThumbType;
  src?: string;
  alt?: string;
  badges?: Array<{ label: string } | string>;
  ratio?: "1:1" | "4:3" | "16:9";
  onActivate?: () => void;
  disabled?: boolean;
}

/**
 * Lightweight media thumbnail for images/video/audio with overlay badges.
 * Button-based for keyboard accessibility; surface-agnostic.
 */
export function MediaThumb({
  type = "image",
  src,
  alt = "",
  badges = [],
  ratio = "16:9",
  onActivate,
  className,
  disabled,
  ...props
}: MediaThumbProps) {
  const padding = ratio === "1:1" ? "pb-[100%]" : ratio === "4:3" ? "pb-[75%]" : "pb-[56.25%]";
  const Icon = type === "audio" ? Music : type === "video" ? Video : ImageIcon;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onActivate}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]",
        "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]",
        "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_30%,transparent)]",
        className
      )}
      {...props}
    >
      {/* Aspect box */}
      <div className={cn("relative w-full", padding)}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--hive-text-secondary)]">
            <Icon className="h-7 w-7" aria-hidden />
          </div>
        )}

        {/* overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />

        {/* badges */}
        {badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
              >
                {typeof b === "string" ? b : b.label}
              </span>
            ))}
          </div>
        )}

        {/* playback affordance for video/audio */}
        {type !== "image" && (
          <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white/90">
            <Play className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">Play {type}</span>
            <span className="hidden sm:inline">Play</span>
          </span>
        )}
      </div>
    </button>
  );
}

