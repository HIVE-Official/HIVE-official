import type {
  RitualUnion,
  RitualArchetype,
  RitualPhase,
  RitualPresentation,
  RitualMetricsSnapshot,
} from "../../domain/rituals/archetypes";

export interface RitualFeedBanner {
  id: string;
  title: string;
  subtitle?: string;
  archetype: RitualArchetype;
  phase: RitualPhase;
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  stats: Array<{ label: string; value: string }>;
  accentColor?: string;
  icon?: string;
  startsAt: string;
  endsAt: string;
  campusId: string;
}

export type RitualDetailStatus =
  | "draft"
  | "upcoming"
  | "active"
  | "cooldown"
  | "ended";

export interface RitualDetailView {
  id: string;
  slug?: string;
  campusId: string;
  title: string;
  subtitle?: string;
  description?: string;
  archetype: RitualArchetype;
  phase: RitualPhase;
  status: RitualDetailStatus;
  presentation?: RitualPresentation;
  metrics: RitualMetricsSnapshot;
  schedule: {
    startsAt: string;
    endsAt: string;
    durationMinutes: number;
    isLive: boolean;
    hasEnded: boolean;
    countdownLabel: string;
    countdownTarget: "start" | "end" | "ended";
  };
  cta: RitualFeedBanner["cta"];
  config: Record<string, unknown>;
}

export function toFeedBanner(ritual: RitualUnion): RitualFeedBanner {
  const baseStats: Array<{ label: string; value: string }> = [];

  if (ritual.metrics?.participants) {
    baseStats.push({
      label: "Participants",
      value: ritual.metrics.participants.toLocaleString(),
    });
  }

  if (ritual.metrics?.submissions) {
    baseStats.push({
      label: "Submissions",
      value: ritual.metrics.submissions.toLocaleString(),
    });
  }

  return {
    id: ritual.id,
    title: ritual.title,
    subtitle: ritual.subtitle,
    archetype: ritual.archetype,
    phase: ritual.phase,
    cta: deriveCta(ritual),
    stats: baseStats,
    accentColor: ritual.presentation?.accentColor,
    icon: ritual.presentation?.icon,
    startsAt: ritual.startsAt,
    endsAt: ritual.endsAt,
    campusId: ritual.campusId,
  };
}

export function toDetailView(ritual: RitualUnion): RitualDetailView {
  const startsAt = new Date(ritual.startsAt);
  const endsAt = new Date(ritual.endsAt);
  const now = Date.now();
  const durationMinutes = Math.max(
    1,
    Math.round((endsAt.getTime() - startsAt.getTime()) / (1000 * 60)),
  );

  const status = deriveStatus(ritual.phase);
  const countdown = deriveCountdown(status, startsAt, endsAt, now);

  return {
    id: ritual.id,
    slug: ritual.slug,
    campusId: ritual.campusId,
    title: ritual.title,
    subtitle: ritual.subtitle,
    description: ritual.description,
    archetype: ritual.archetype,
    phase: ritual.phase,
    status,
    presentation: ritual.presentation,
    metrics: ritual.metrics ?? {},
    schedule: {
      startsAt: ritual.startsAt,
      endsAt: ritual.endsAt,
      durationMinutes,
      isLive: status === "active" || status === "cooldown",
      hasEnded: status === "ended",
      countdownLabel: countdown.label,
      countdownTarget: countdown.target,
    },
    cta: deriveCta(ritual),
    config: ritual.config,
  };
}

function deriveCta(ritual: RitualUnion): RitualFeedBanner["cta"] {
  const defaultHref = ritual.presentation?.ctaLink ?? `/rituals/${ritual.slug ?? ritual.id}`;

  switch (ritual.phase) {
    case "announced":
      return {
        label: ritual.presentation?.ctaLabel ?? "View Details",
        href: defaultHref,
        variant: "primary",
      };
    case "active":
      return {
        label: ritual.presentation?.ctaLabel ?? "Join Now",
        href: defaultHref,
        variant: "primary",
      };
    case "cooldown":
      return {
        label: "See Highlights",
        href: defaultHref,
        variant: "secondary",
      };
    case "ended":
      return {
        label: "View Recap",
        href: defaultHref,
        variant: "secondary",
      };
    default:
      return {
        label: "View Details",
        href: defaultHref,
        variant: "secondary",
      };
  }
}

function deriveStatus(phase: RitualPhase): RitualDetailStatus {
  switch (phase) {
    case "draft":
      return "draft";
    case "announced":
      return "upcoming";
    case "active":
      return "active";
    case "cooldown":
      return "cooldown";
    case "ended":
      return "ended";
    default:
      return "draft";
  }
}

function deriveCountdown(
  status: RitualDetailStatus,
  startsAt: Date,
  endsAt: Date,
  nowMs: number,
): { label: string; target: RitualDetailView["schedule"]["countdownTarget"] } {
  const msUntilStart = startsAt.getTime() - nowMs;
  const msUntilEnd = endsAt.getTime() - nowMs;

  if (status === "ended") {
    return { label: "Ended", target: "ended" };
  }

  if (status === "draft") {
    return { label: "Draft", target: "start" };
  }

  if (status === "upcoming") {
    return {
      label: msUntilStart > 0 ? formatDuration(msUntilStart) + " until start" : "Starting soon",
      target: "start",
    };
  }

  // Active or cooldown phases
  return {
    label: msUntilEnd > 0 ? formatDuration(msUntilEnd) + " remaining" : "Wrapping up",
    target: "end",
  };
}

function formatDuration(ms: number): string {
  if (ms <= 0) return "0m";
  const totalMinutes = Math.round(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}
