import type { RitualUnion, RitualArchetype, RitualPhase, RitualPresentation, RitualMetricsSnapshot } from "../../domain/rituals/archetypes";
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
    stats: Array<{
        label: string;
        value: string;
    }>;
    accentColor?: string;
    icon?: string;
    startsAt: string;
    endsAt: string;
    campusId: string;
}
export type RitualDetailStatus = "draft" | "upcoming" | "active" | "cooldown" | "ended";
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
export declare function toFeedBanner(ritual: RitualUnion): RitualFeedBanner;
export declare function toDetailView(ritual: RitualUnion): RitualDetailView;
//# sourceMappingURL=ritual-presenter.d.ts.map