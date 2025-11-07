"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Badge, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Textarea } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Server, Settings, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ToolsOverview = {
  totals: { tools: number; published: number; pendingReviews: number };
  lifecycle: { totalInstalls: number; activeDeployments: number; recentErrors7d: number };
};

export default function HivelabAdminPage() {
  const [overview, setOverview] = useState<ToolsOverview | null>(null);
  const [deployments, setDeployments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [catStatus, setCatStatus] = useState<'all'|'published'|'draft'|'hidden'|'rejected'|'paused'>('all');
  const [catPage, setCatPage] = useState(0);
  const [revPage, setRevPage] = useState(0);
  const [depPage, setDepPage] = useState(0);
  const [depStatus, setDepStatus] = useState<'all'|'active'|'paused'|'disabled'>('active');
  const [depTarget, setDepTarget] = useState<'all'|'profile'|'space'>('all');
  const [tab, setTab] = useState<'catalog' | 'reviews' | 'deployments'>('catalog');
  const pageSize = 25;
  const [runningQuality, setRunningQuality] = useState<Record<string, boolean>>({});
  // Owner filter (autocomplete)
  const [catOwner, setCatOwner] = useState(''); // selected owner userId
  const [ownerInput, setOwnerInput] = useState(''); // input text
  const [ownerSuggestions, setOwnerSuggestions] = useState<any[]>([]);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const ownerBoxRef = useRef<HTMLDivElement | null>(null);
  const { success, error: toastError, info } = useToast();
  const [showChanges, setShowChanges] = useState(false);
  const [changeNotes, setChangeNotes] = useState('');
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const inited = useRef(false);

  // Helper to download CSV via authenticated fetch
  const downloadCsv = async (url: string, filename: string) => {
    try {
      const res = await secureApiFetch(url);
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      success('Export started');
    } catch (e: any) {
      toastError('CSV export failed', e?.message);
    }
  };

  // Initialize state from URL params once on mount
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    const get = (key: string) => sp.get(key);
    const initialTab = (get('tab') as any) || 'catalog';
    if (['catalog', 'reviews', 'deployments'].includes(initialTab)) setTab(initialTab);
    const cstatus = get('cstatus') as any; if (cstatus) setCatStatus(cstatus);
    const qParam = get('q'); if (qParam) setSearch(qParam);
    const owner = get('owner'); if (owner) { setCatOwner(owner); setOwnerInput(owner); }
    const cpage = parseInt(get('cpage') || '0'); if (!isNaN(cpage) && cpage>0) setCatPage(cpage);
    const rpage = parseInt(get('rpage') || '0'); if (!isNaN(rpage) && rpage>0) setRevPage(rpage);
    const dpage = parseInt(get('dpage') || '0'); if (!isNaN(dpage) && dpage>0) setDepPage(dpage);
    const dstatus = get('dstatus') as any; if (dstatus) setDepStatus(dstatus);
    const dtarget = get('dtarget') as any; if (dtarget) setDepTarget(dtarget);
  }, [sp]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ownerBoxRef.current && !ownerBoxRef.current.contains(e.target as Node)) {
        setOwnerOpen(false);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  // Debounced owner suggestions search
  useEffect(() => {
    if (!ownerInput || ownerInput.length < 2) {
      setOwnerSuggestions([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        setOwnerLoading(true);
        const res = await secureApiFetch(`/api/admin/users?search=${encodeURIComponent(ownerInput)}&limit=5`);
        if (res.ok) {
          const json = await res.json();
          setOwnerSuggestions(json.users || []);
          setOwnerOpen(true);
        }
      } finally {
        setOwnerLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [ownerInput]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    params.set('tab', tab);
    params.set('cstatus', catStatus);
    if (search) params.set('q', search); else params.delete('q');
    if (catOwner) params.set('owner', catOwner); else params.delete('owner');
    if (catPage) params.set('cpage', String(catPage)); else params.delete('cpage');
    if (revPage) params.set('rpage', String(revPage)); else params.delete('rpage');
    if (depPage) params.set('dpage', String(depPage)); else params.delete('dpage');
    if (depStatus !== 'all') params.set('dstatus', depStatus); else params.delete('dstatus');
    if (depTarget !== 'all') params.set('dtarget', depTarget); else params.delete('dtarget');
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, catStatus, search, catOwner, catPage, revPage, depPage, depStatus, depTarget]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const depStatusParam = depStatus !== 'all' ? `&status=${depStatus}` : '';
        const depTargetParam = depTarget !== 'all' ? `&deployedTo=${depTarget}` : '';
        const ownerParam = catOwner ? `&ownerId=${encodeURIComponent(catOwner)}` : '';
        const [o, d, r, t] = await Promise.all([
          secureApiFetch('/api/admin/tools/overview').then(res => res.json()),
          secureApiFetch(`/api/admin/tools/deployments/list?limit=${pageSize}&offset=${depPage*pageSize}${depStatusParam}${depTargetParam}`).then(res => res.json()),
          secureApiFetch(`/api/admin/tools/reviews/list?status=pending&limit=${pageSize}&offset=${revPage*pageSize}`).then(res => res.json()),
          secureApiFetch(`/api/admin/tools/catalog/list?status=${catStatus}&limit=${pageSize}&offset=${catPage*pageSize}&q=${encodeURIComponent(search)}${ownerParam}`).then(res => res.json()),
        ]);
        setOverview(o.overview || null);
        setDeployments(d.deployments || []);
        setReviews(r.reviews || []);
        setTools(t.tools || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load Hivelab admin');
        toastError('Failed to load Hivelab', e?.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [catStatus, catPage, revPage, depPage, search, depStatus, depTarget]);

  const filteredTools = useMemo(() => {
    if (!search) return tools;
    const q = search.toLowerCase();
    return tools.filter((t: any) => (t.name || '').toLowerCase().includes(q) || (t.id || '').toLowerCase().includes(q));
  }, [tools, search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--hive-brand-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-red-400"><AlertTriangle className="h-5 w-5" /> {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hivelab</h1>
          <p className="text-white/60">Tools, deployments, reviews, and quality</p>
        </div>
      </div>

      {/* Overview cards */}
      {overview && (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tools</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totals.tools}</div>
              <p className="text-xs text-muted-foreground">{overview.totals.published} published • {overview.totals.pendingReviews} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deployments</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.lifecycle.activeDeployments}</div>
              <p className="text-xs text-muted-foreground">{overview.lifecycle.totalInstalls} installs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Errors (7d)</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.lifecycle.recentErrors7d}</div>
              <p className="text-xs text-muted-foreground">Recent tool errors</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Tool Catalog</h2>
            <div className="flex items-center gap-2">
              <select value={catStatus} onChange={(e) => { setCatPage(0); setCatStatus(e.target.value as any); }} className="bg-transparent border border-white/15 rounded px-2 py-1 text-sm">
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
                <option value="rejected">Rejected</option>
                <option value="paused">Paused</option>
              </select>
              <Input placeholder="Search tools..." value={search} onChange={(e) => { setCatPage(0); setSearch(e.target.value); }} className="w-64 bg-transparent border-white/15" />
              <div ref={ownerBoxRef} className="relative">
                <Input
                  placeholder="Owner (name, email, handle, or UID)"
                  value={ownerInput}
                  onChange={(e) => { setCatPage(0); setOwnerInput(e.target.value); setCatOwner(''); }}
                  className="w-64 bg-transparent border-white/15 pr-16"
                  onFocus={() => ownerSuggestions.length > 0 && setOwnerOpen(true)}
                />
                {ownerInput && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white"
                    onClick={() => { setOwnerInput(''); setCatOwner(''); setOwnerSuggestions([]); setOwnerOpen(false); setCatPage(0); }}
                    aria-label="Clear owner filter"
                  >
                    Clear
                  </button>
                )}
                {ownerOpen && ownerSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-white/15 bg-black/90 backdrop-blur p-1 text-sm max-h-64 overflow-auto">
                    {ownerSuggestions.map((u: any) => {
                      const label = u.displayName || u.email || u.handle || u.id;
                      const sub = [u.email, u.handle].filter(Boolean).join(' • ');
                      return (
                        <button
                          key={u.id}
                          className="w-full text-left px-2 py-1 rounded hover:bg-white/10"
                          onClick={() => {
                            setCatOwner(u.id);
                            setOwnerInput(label);
                            setOwnerOpen(false);
                            setCatPage(0);
                          }}
                        >
                          <div className="font-medium">{label}</div>
                          {sub && <div className="text-white/60 text-xs">{sub}</div>}
                        </button>
                      );
                    })}
                    {ownerLoading && (
                      <div className="px-2 py-1 text-white/60">Searching…</div>
                    )}
                  </div>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={() => {
                const ownerParam = catOwner ? `&ownerId=${encodeURIComponent(catOwner)}` : '';
                const url = `/api/admin/tools/catalog/export?status=${catStatus}&q=${encodeURIComponent(search)}${ownerParam}`;
                downloadCsv(url, `hivelab_catalog_${catStatus}.csv`);
              }}>Export CSV</Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Version</th>
                  <th className="px-3 py-2 text-left">Installs</th>
                  <th className="px-3 py-2 text-left">Updated</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.map((t: any) => (
                  <tr key={t.id} className="border-t border-white/10">
                    <td className="px-3 py-2">
                      <Link href={`/admin/hivelab/${encodeURIComponent(t.id)}`} className="text-[var(--hive-brand-primary)] hover:underline">
                        {t.name || t.id}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={async () => {
                        const newStatus = t.status === 'published' ? 'hidden' : 'published';
                        const res = await secureApiFetch('/api/admin/tools/catalog/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolId: t.id, status: newStatus }) });
                        if (res.ok) {
                          setTools(prev => prev.map((x: any) => x.id === t.id ? { ...x, status: newStatus } : x));
                          success('Tool status updated', `${t.name || t.id} -> ${newStatus}`);
                        } else {
                          toastError('Failed to update status');
                        }
                      }}>
                        <Badge variant={t.status === 'published' ? 'default' : 'secondary'}>{t.status || 'unknown'}</Badge>
                      </button>
                    </td>
                    <td className="px-3 py-2">{t.currentVersion || '-'}</td>
                    <td className="px-3 py-2">{t.installCount ?? 0}</td>
                    <td className="px-3 py-2 text-white/60">{typeof t.updatedAt === 'string' ? t.updatedAt.split('T')[0] : '-'}</td>
                    <td className="px-3 py-2 text-right">
                      <Button size="sm" variant="outline" disabled={!!runningQuality[t.id]} onClick={async () => {
                        setRunningQuality(prev => ({ ...prev, [t.id]: true }));
                        try {
                          const res = await secureApiFetch('/api/admin/tools/quality/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolId: t.id }) });
                          if (!res.ok) {
                            toastError('Quality run failed');
                          } else {
                            info('Quality run requested', t.name || t.id);
                          }
                        } finally {
                          setTimeout(() => setRunningQuality(prev => ({ ...prev, [t.id]: false })), 1200);
                        }
                      }}>Run Quality</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" disabled={catPage===0} onClick={() => setCatPage(p => Math.max(0, p-1))}>Prev</Button>
            <Button size="sm" variant="outline" onClick={() => setCatPage(p => p+1)}>Next</Button>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending Reviews</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => {
                const url = `/api/admin/tools/reviews/export?status=pending`;
                downloadCsv(url, `hivelab_reviews_pending.csv`);
              }}>Export CSV</Button>
              <Button size="sm" variant="outline" disabled={revPage===0} onClick={() => setRevPage(p => Math.max(0, p-1))}>Prev</Button>
              <Button size="sm" variant="outline" onClick={() => setRevPage(p => p+1)}>Next</Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">Tool</th>
                  <th className="px-3 py-2 text-left">Requester</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Requested</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r: any) => (
                  <tr key={r.id} className="border-t border-white/10">
                    <td className="px-3 py-2">{r.tool?.name || r.tool?.id || '-'}</td>
                    <td className="px-3 py-2">{r.requester?.displayName || r.requester?.email || r.requester?.id || '-'}</td>
                    <td className="px-3 py-2">{r.category || '-'}</td>
                    <td className="px-3 py-2 text-white/60">{typeof r.requestedAt === 'string' ? r.requestedAt.split('T')[0] : '-'}</td>
                    <td className="px-3 py-2"><Badge>{r.status}</Badge></td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" onClick={async () => {
                          const res = await secureApiFetch('/api/admin/tools/reviews/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId: r.id, action: 'approve' }) });
                          if (res.ok) {
                            setReviews(prev => prev.filter(x => x.id !== r.id));
                            success('Review approved', r.tool?.name || r.id);
                          } else {
                            toastError('Failed to approve');
                          }
                        }}>Approve</Button>
                        <Button size="sm" variant="outline" onClick={async () => {
                          const res = await secureApiFetch('/api/admin/tools/reviews/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId: r.id, action: 'reject' }) });
                          if (res.ok) {
                            setReviews(prev => prev.filter(x => x.id !== r.id));
                            success('Review rejected', r.tool?.name || r.id);
                          } else {
                            toastError('Failed to reject');
                          }
                        }}>Reject</Button>
                        <Button size="sm" variant="outline" onClick={() => { setSelectedReview(r); setChangeNotes(''); setShowChanges(true); }}>Request Changes</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="deployments" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Active Deployments</h2>
            <div className="flex items-center gap-2">
              <select value={depStatus} onChange={(e) => { setDepPage(0); setDepStatus(e.target.value as any); }} className="bg-transparent border border-white/15 rounded px-2 py-1 text-sm">
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="disabled">Disabled</option>
              </select>
              <select value={depTarget} onChange={(e) => { setDepPage(0); setDepTarget(e.target.value as any); }} className="bg-transparent border border-white/15 rounded px-2 py-1 text-sm">
                <option value="all">All targets</option>
                <option value="space">Space</option>
                <option value="profile">Profile</option>
              </select>
              <Button size="sm" variant="outline" onClick={() => {
                const depStatusParam = depStatus !== 'all' ? `&status=${depStatus}` : '';
                const depTargetParam = depTarget !== 'all' ? `&deployedTo=${depTarget}` : '';
                const url = `/api/admin/tools/deployments/export?limit=2000${depStatusParam}${depTargetParam}`;
                downloadCsv(url, `hivelab_deployments_${depStatus}_${depTarget}.csv`);
              }}>Export CSV</Button>
              <Button size="sm" variant="outline" disabled={depPage===0} onClick={() => setDepPage(p => Math.max(0, p-1))}>Prev</Button>
              <Button size="sm" variant="outline" onClick={() => setDepPage(p => p+1)}>Next</Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">Tool</th>
                  <th className="px-3 py-2 text-left">Target</th>
                  <th className="px-3 py-2 text-left">Surface</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Deployed</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d: any) => (
                  <tr key={d.id} className="border-t border-white/10">
                    <td className="px-3 py-2">{d.tool?.name || d.toolId}</td>
                    <td className="px-3 py-2">{d.deployedTo}:{d.targetId}</td>
                    <td className="px-3 py-2">{d.surface || '-'}</td>
                    <td className="px-3 py-2"><Badge variant={d.status === 'active' ? 'default' : 'secondary'}>{d.status}</Badge></td>
                    <td className="px-3 py-2 text-white/60">{typeof d.deployedAt === 'string' ? d.deployedAt.split('T')[0] : '-'}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {d.status === 'active' ? (
                          <Button size="sm" variant="outline" onClick={async () => {
                            const res = await secureApiFetch('/api/admin/tools/deployments/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deploymentId: d.id, action: 'pause' }) });
                            if (res.ok) {
                              setDeployments(prev => prev.map(x => x.id === d.id ? { ...x, status: 'paused' } : x));
                              success('Deployment paused', d.tool?.name || d.id);
                            } else {
                              toastError('Failed to pause');
                            }
                          }}>Pause</Button>
                        ) : (
                          <Button size="sm" onClick={async () => {
                            const res = await secureApiFetch('/api/admin/tools/deployments/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deploymentId: d.id, action: 'resume' }) });
                            if (res.ok) {
                              setDeployments(prev => prev.map(x => x.id === d.id ? { ...x, status: 'active' } : x));
                              success('Deployment resumed', d.tool?.name || d.id);
                            } else {
                              toastError('Failed to resume');
                            }
                          }}>Resume</Button>
                        )}
                        <Button size="sm" variant="destructive" onClick={async () => {
                          const res = await secureApiFetch('/api/admin/tools/deployments/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deploymentId: d.id, action: 'disable' }) });
                          if (res.ok) {
                            setDeployments(prev => prev.map(x => x.id === d.id ? { ...x, status: 'disabled' } : x));
                            success('Deployment disabled', d.tool?.name || d.id);
                          } else {
                            toastError('Failed to disable');
                          }
                        }}>Disable</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Catalog actions */}
        <TabsContent value="catalog">
          <div className="mt-2 text-xs text-white/50">Click tool status badge to publish/hide.</div>
        </TabsContent>
      </Tabs>

      {/* Request Changes Dialog */}
      <Dialog open={showChanges} onOpenChange={setShowChanges}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-white/70">Provide feedback for the tool owner.</p>
            <Textarea placeholder="Describe required changes..." value={changeNotes} onChange={(e) => setChangeNotes(e.target.value)} className="min-h-[120px] bg-transparent border-white/15" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChanges(false)}>Cancel</Button>
            <Button onClick={async () => {
              if (!selectedReview) return;
              const res = await secureApiFetch('/api/admin/tools/reviews/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId: selectedReview.id, action: 'request_changes', notes: changeNotes }) });
              if (res.ok) {
                success('Changes requested', selectedReview.tool?.name || selectedReview.id);
                setReviews(prev => prev.filter(x => x.id !== selectedReview.id));
                setShowChanges(false);
              } else {
                toastError('Failed to request changes');
              }
            }}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
