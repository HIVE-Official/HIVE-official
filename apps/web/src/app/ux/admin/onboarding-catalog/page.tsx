"use client";

import { useEffect, useMemo, useState } from 'react';
import { useCSRF } from '@/hooks/use-csrf';

type InterestCategory = { id: string; title: string; items: string[] };
type Catalog = { majors: string[]; yearRange: { startYear: number; endYear: number }; interests: InterestCategory[] };

export default function OnboardingCatalogAdminUX() {
  const [campusId, setCampusId] = useState('ub');
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [majorsText, setMajorsText] = useState('');
  const [yearStart, setYearStart] = useState<number | ''>('' as any);
  const [yearEnd, setYearEnd] = useState<number | ''>('' as any);
  const [interestsText, setInterestsText] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const { token } = useCSRF();

  const load = async (campus: string) => {
    setStatus('Loading…');
    const res = await fetch(`/api/onboarding/catalog?campusId=${encodeURIComponent(campus)}`, { credentials: 'include' });
    const json = await res.json();
    const data = json.data ?? json;
    setCatalog(data);
    setMajorsText((data.majors || []).join('\n'));
    setYearStart(data.yearRange?.startYear || new Date().getFullYear());
    setYearEnd(data.yearRange?.endYear || new Date().getFullYear() + 6);
    setInterestsText(
      (data.interests || [])
        .map((cat: InterestCategory) => `# ${cat.id} | ${cat.title}\n${cat.items.join('\n')}`)
        .join('\n\n')
    );
    setStatus(null);
  };

  useEffect(() => {
    load(campusId).catch((e) => setStatus(String(e)));
  }, []);

  const parsedInterests: InterestCategory[] = useMemo(() => {
    const blocks = interestsText.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
    const categories: InterestCategory[] = [];
    for (const block of blocks) {
      const lines = block.split('\n');
      const header = lines[0] || '';
      const match = header.match(/^#\s*([^|]+)\|(.+)$/);
      if (!match) continue;
      const id = match[1].trim();
      const title = match[2].trim();
      const items = lines.slice(1).map((l) => l.trim()).filter(Boolean);
      if (!id || !title || items.length === 0) continue;
      categories.push({ id, title, items });
    }
    return categories;
  }, [interestsText]);

  async function save() {
    setStatus('Saving…');
    const body = {
      majors: majorsText.split('\n').map((s) => s.trim()).filter(Boolean),
      yearRange: { startYear: Number(yearStart), endYear: Number(yearEnd) },
      interests: parsedInterests,
    };
    const res = await fetch(`/api/admin/onboarding/catalog?campusId=${encodeURIComponent(campusId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token || '',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setStatus(`Save failed: ${j.error || res.statusText}`);
      return;
    }
    setStatus('Saved');
    await load(campusId);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Onboarding Catalog Admin (UX)</h1>
        <p className="text-white/60">Dev‑only prototype. Controls are per campus.</p>

        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-sm text-white/60">Campus ID</label>
            <input value={campusId} onChange={(e) => setCampusId(e.target.value)} className="rounded border border-white/20 bg-transparent px-3 py-2" />
          </div>
          <button className="rounded border border-white/20 px-3 py-2" onClick={() => load(campusId)}>Load</button>
          <a className="text-sm underline underline-offset-2" href={`/ux/onboarding/catalog-demo?campusId=${encodeURIComponent(campusId)}`}>Open demo</a>
          {status ? <div className="text-sm text-white/60">{status}</div> : null}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <section>
            <h2 className="text-lg font-medium mb-2">Majors</h2>
            <textarea value={majorsText} onChange={(e) => setMajorsText(e.target.value)} rows={12} className="w-full rounded border border-white/20 bg-transparent p-3 font-mono text-sm" />
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2">Interests</h2>
            <p className="text-xs text-white/50 mb-2">Format: first line as # id | Title, followed by items. Separate categories by a blank line.</p>
            <textarea value={interestsText} onChange={(e) => setInterestsText(e.target.value)} rows={12} className="w-full rounded border border-white/20 bg-transparent p-3 font-mono text-xs" />
          </section>
        </div>

        <section className="flex gap-4 items-end">
          <div>
            <label className="block text-sm text-white/60">Start Year</label>
            <input type="number" value={yearStart} onChange={(e) => setYearStart(Number(e.target.value) || '')} className="rounded border border-white/20 bg-transparent px-3 py-2 w-32" />
          </div>
          <div>
            <label className="block text-sm text-white/60">End Year</label>
            <input type="number" value={yearEnd} onChange={(e) => setYearEnd(Number(e.target.value) || '')} className="rounded border border-white/20 bg-transparent px-3 py-2 w-32" />
          </div>
          <button className="rounded bg-white text-black px-4 py-2 disabled:opacity-50" onClick={save} disabled={!token}>Save</button>
        </section>
      </div>
    </div>
  );
}
