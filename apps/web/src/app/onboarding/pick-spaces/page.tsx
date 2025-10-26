// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardDescription, CardTitle, Heading, Text } from "@hive/ui";
import { GradientBackdrop } from "../../../components/layout/GradientBackdrop";
import { Container } from "../../../components/layout/Container";
import { useAuth } from "@auth";

interface PickSpace {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type?: string;
  readonly membership: { role: string | null } | null;
  readonly pattern?: string | null;
}

export default function PickStarterSpacesPage(): JSX.Element {
  const { state: auth } = useAuth();
  const router = useRouter();
  const enabled = process.env.NEXT_PUBLIC_ONBOARDING_PICK_SPACES === "true";
  const [spaces, setSpaces] = useState<PickSpace[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const profileId = auth.profileId ?? "";

  useEffect(() => {
    if (!enabled) {
      router.replace("/spaces");
    }
  }, [enabled, router]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const url = new URL("/api/spaces/recommended", window.location.origin);
        if (profileId) url.searchParams.set("profileId", profileId);
        url.searchParams.set("limit", "9");
        const res = await fetch(url.toString(), { signal: controller.signal, cache: "no-store" });
        if (!res.ok) return;
        const json: unknown = await res.json();
        const items = (json as { data?: { items?: unknown[] } })?.data?.items ?? [];
        const mapped: PickSpace[] = items.map((it: any) => ({
          id: String(it.id ?? it.spaceId ?? ""),
          name: String(it.name ?? "Untitled"),
          description: String(it.description ?? it.tagline ?? ""),
          type: typeof it.type === "string" ? it.type : undefined,
          membership: it.membership && typeof it.membership === "object" ? { role: String((it.membership as any).role ?? "") } : null,
          pattern: typeof it.pattern === "string" ? it.pattern : null
        }));
        setSpaces(mapped);
      } catch { /* ignore */ }
    };
    void load();
    return () => controller.abort();
  }, [profileId]);

  const selectedCount = selectedIds.length;
  const canAddMore = selectedCount < 3;

  const toggleJoin = (space: PickSpace) => {
    startTransition(async () => {
      const isSelected = selectedIds.includes(space.id) || Boolean(space.membership);
      if (isSelected) {
        // leave
        try {
          const res = await fetch("/api/spaces/leave", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spaceId: space.id, profileId })
          });
          if (res.ok) {
            setSelectedIds((prev) => prev.filter((id) => id !== space.id));
            setSpaces((prev) => prev.map((s) => (s.id === space.id ? { ...s, membership: null } : s)));
          }
        } catch { /* ignore */ }
        return;
      }

      if (!canAddMore) return;
      try {
        const res = await fetch("/api/spaces/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spaceId: space.id, profileId })
        });
        if (res.ok) {
          setSelectedIds((prev) => [...prev, space.id]);
          setSpaces((prev) => prev.map((s) => (s.id === space.id ? { ...s, membership: { role: "member" } } : s)));
        }
      } catch { /* ignore */ }
    });
  };

  const done = () => {
    router.replace("/spaces");
  };

  const skip = () => {
    router.replace("/spaces");
  };

  const headerLabel = useMemo(() => (selectedCount > 0 ? `${selectedCount}/3 selected` : "Pick 3 Spaces to start"), [selectedCount]);

  return (
    <GradientBackdrop>
      <Container className="flex min-h-screen flex-col gap-8 py-16">
        <div className="text-center">
          <Heading level="h1" className="sm:text-4xl">{headerLabel}</Heading>
          <Text variant="muted" className="mt-2">We’ll tune your feed and recommendations instantly. You can join more later.</Text>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => {
            const isSelected = selectedIds.includes(space.id) || Boolean(space.membership);
            return (
              <Card key={space.id} className="overflow-hidden border-border/70 bg-card/90">
                <div
                  className="h-1.5 w-full"
                  style={{ background: space.pattern ?? "linear-gradient(90deg, rgba(148,163,184,0.4) 0%, rgba(100,116,139,0.4) 100%)" }}
                />
                <div className="p-5 space-y-2">
                  <CardTitle className="text-base font-semibold text-foreground">{space.name}</CardTitle>
                  <CardDescription className="line-clamp-3 text-xs text-muted-foreground">{space.description}</CardDescription>
                  <div className="pt-2">
                    <Button
                      size="sm"
                      onClick={() => toggleJoin(space)}
                      disabled={isPending || (!isSelected && !canAddMore)}
                      variant={isSelected ? "outline" : "default"}
                      aria-label={isSelected ? "Undo join" : "Join space"}
                    >
                      {isSelected ? "Undo join" : "Join"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={done} size="lg" className="px-8" disabled={isPending}>
            Continue
          </Button>
          <Button onClick={skip} size="lg" variant="ghost" className="px-8" disabled={isPending}>
            Skip for now
          </Button>
        </div>
      </Container>
    </GradientBackdrop>
  );
}
