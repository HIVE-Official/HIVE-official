"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchInput, SpaceDiscoveryGrid, type SpaceDiscoveryCardProps, Text } from "@hive/ui";

type SpaceSummary = { id: string; name: string; description: string };

export default function SpacesSearchPage(): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState<string>(params.get("q") || "");
  const [results, setResults] = useState<SpaceSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/spaces/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
      const data = await res.json();
      setResults((data.results as any[]).map((s) => ({ id: s.id, name: s.name, description: s.description })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = params.get("q") || "";
    setQuery(q);
    if (q) void runSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const items: SpaceDiscoveryCardProps[] = useMemo(
    () =>
      results.map((s) => ({
        id: s.id,
        name: s.name,
        tagline: s.description,
        category: "Space",
        memberCount: 0,
        eventsThisWeek: 0,
        isVerified: false,
        onPreview: (spaceId) => { window.location.assign(`/spaces/${spaceId}`); }
      })),
    [results]
  );

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-5xl space-y-6">
        <div className="text-caption">
          <Link className="text-primary underline-offset-4 hover:underline" href="/spaces">Back to spaces</Link>
        </div>
        <div className="max-w-xl">
          <SearchInput
            value={query}
            onChange={(val) => setQuery(val)}
            onSubmit={(val) => router.replace(`/spaces/search?q=${encodeURIComponent(val)}`)}
            placeholder="Search spaces…"
          />
        </div>
        {loading ? (
          <Text variant="muted">Searching…</Text>
        ) : (
          <SpaceDiscoveryGrid filters={[{ id: "results", label: `Results (${items.length})` }]} spaces={items} />
        )}
      </div>
    </main>
  );
}

