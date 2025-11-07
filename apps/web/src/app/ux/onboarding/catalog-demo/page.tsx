"use client";

import { useEffect, useState } from 'react';

type InterestCategory = { id: string; title: string; items: string[] };
type Catalog = { majors: string[]; yearRange: { startYear: number; endYear: number }; interests: InterestCategory[] };

export default function CatalogDemoPage() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const campusId = url.searchParams.get('campusId');
    const qs = campusId ? `?campusId=${encodeURIComponent(campusId)}` : '';
    fetch(`/api/onboarding/catalog${qs}`, { credentials: 'include' })
      .then(async (r) => {
        const json = await r.json();
        setCatalog(json.data ?? json);
      })
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Onboarding Catalog Demo</h1>
        <p className="text-white/60">Live values from /api/onboarding/catalog</p>

        {error ? <div className="text-red-400">{error}</div> : null}

        {!catalog ? (
          <div>Loading…</div>
        ) : (
          <div className="space-y-6" data-testid="catalog-root">
            <div className="text-sm text-white/60">Campus: {new URL(window.location.href).searchParams.get('campusId') || 'default'}</div>
            <section>
              <h2 className="text-lg font-medium">Majors</h2>
              <ul className="mt-2 flex flex-wrap gap-2" data-testid="catalog-majors">
                {catalog.majors.map((m) => (
                  <li key={m} className="rounded border border-white/15 px-3 py-1 text-sm">{m}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium">Graduation Years</h2>
              <div className="mt-2 text-sm" data-testid="catalog-years">
                {catalog.yearRange.startYear}–{catalog.yearRange.endYear}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium">Interests</h2>
              <div className="mt-2 grid sm:grid-cols-2 gap-3" data-testid="catalog-interests">
                {catalog.interests.map((cat) => (
                  <div key={cat.id} className="rounded-xl border border-white/10 p-3">
                    <div className="font-medium">{cat.title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cat.items.map((i) => (
                        <span key={i} className="rounded border border-white/15 px-2 py-0.5 text-xs">{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
