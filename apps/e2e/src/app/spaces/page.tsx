"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@auth";
import { CardTitle, Text, Button } from "@hive/ui";
import type { SpaceDiscoveryCardProps } from "@hive/ui";
import { SpaceDiscoveryCard } from "@hive/ui";

type SpaceSummary = { id: string; name: string; description: string };
type Section = { id: "student_org" | "university_org" | "residential" | "greek"; title: string; description: string; spaces: SpaceSummary[] };

export default function SpacesPage(): JSX.Element {
  const { state } = useAuth();

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState<SpaceSummary[]>([]);
  const [recommended, setRecommended] = useState<SpaceSummary[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const load = async () => {
      const pid = state.profileId ?? "demo";
      setLoading(true);
      try {
        const res = await fetch(`/api/spaces/catalog?profileId=${encodeURIComponent(pid)}`, { cache: "no-store" });
        const data = await res.json();
        setJoined((data.joined as SpaceSummary[]) ?? []);
        setRecommended((data.recommended as SpaceSummary[]) ?? []);
        setSections((data.sections as Section[]) ?? []);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [state.profileId]);

  const toCard = (s: SpaceSummary): SpaceDiscoveryCardProps => ({
    id: s.id,
    name: s.name,
    tagline: s.description,
    category: "Space",
    memberCount: s.id === "space-robotics" ? 64 : 42,
    eventsThisWeek: s.id === "space-robotics" ? 1 : 0,
    isVerified: s.id === "space-robotics",
    onJoin: async (spaceId) => {
      await fetch(`/api/spaces/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId, profileId: state.profileId ?? "demo" })
      });
      // Reload catalog to reflect new membership and prune from recommended
      const pid = state.profileId ?? "demo";
      const next = await fetch(`/api/spaces/catalog?profileId=${encodeURIComponent(pid)}`, { cache: "no-store" }).then((r) => r.json());
      setJoined(next.joined ?? []);
      setRecommended(next.recommended ?? []);
      setSections(next.sections ?? []);
    },
    onPreview: (spaceId) => { window.location.assign(`/spaces/${spaceId}`); }
  });

  const joinedCards = useMemo(() => joined.map((s) => ({ ...(toCard(s) as any), onJoin: undefined } as SpaceDiscoveryCardProps)), [joined]);
  const recommendedCards = useMemo(() => recommended.slice(0, 6).map(toCard), [recommended]);

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Spaces</CardTitle>
            <Text variant="muted">Join your campus communities and jump back in fast.</Text>
          </div>
          <Button asChild variant="ghost">
            <a href="/spaces/search">Find more spaces</a>
          </Button>
        </div>

        {loading ? (
          <Text variant="muted">Loading…</Text>
        ) : (
          <div className="space-y-10">
            {/* Joined-first */}
            {joinedCards.length > 0 ? (
              <section className="space-y-4">
                <div className="flex items-baseline justify-between"><h2 className="text-lg font-semibold">Joined ({joinedCards.length})</h2></div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {joinedCards.map((card) => (
                    <SpaceDiscoveryCard key={card.id} {...card} />
                  ))}
                </div>
              </section>
            ) : null}

            {/* First-time/low-join: show four category sections above the fold until 3 joins */}
            {joinedCards.length < 3 ? (
              <section className="space-y-10">
                {sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold">{section.title}</h2>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                      <Button asChild variant="ghost">
                        <a href="/spaces/search">Explore</a>
                      </Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                      {section.spaces.slice(0, 4).map((s) => (
                        <SpaceDiscoveryCard key={s.id} {...toCard(s)} />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            {/* Small Recommended strip */}
            {recommendedCards.length > 0 ? (
              <section className="space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-semibold">Recommended</h2>
                  <Button asChild variant="ghost"><a href="/spaces/search">See more</a></Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {recommendedCards.map((card) => (
                    <SpaceDiscoveryCard key={card.id} {...card} />
                  ))}
                </div>
              </section>
            ) : null}

            <Text variant="muted" className="text-xs">Session: {state.status}. Demo data; UI and motion match production.</Text>
          </div>
        )}
      </div>
    </main>
  );
}
