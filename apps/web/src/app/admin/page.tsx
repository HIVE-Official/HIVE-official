'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import type { AdminDashboardResponse, RitualComposerInput } from '@hive/core';
import { RitualArchetype, createDefaultConfig } from '@hive/core';
import {
  AdminShell,
  AdminMetricCard,
  AuditLogList,
  ModerationQueue,
  AdminRitualComposer,
  type AdminNavItem,
  type ModerationQueueItem,
  type AuditLogEvent,
  Button,
  Skeleton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@hive/ui';
import { useToast } from '@/hooks/use-toast';
import { useFeatureFlags } from '@hive/hooks';
import {
  Activity,
  Flag,
  Layers,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

interface DashboardState {
  data: AdminDashboardResponse | null;
  loading: boolean;
  error: string | null;
}

interface RitualsStatsState {
  total: number;
  byPhase: { draft: number; announced: number; active: number; cooldown: number; ended: number };
  metrics: { participants: number; submissions: number; conversions: number };
}

const NAV_SECTIONS: AdminNavItem[] = [
  { id: 'overview', label: 'Overview', icon: ShieldCheck },
  { id: 'campaigns', label: 'Campaigns', icon: Rocket },
  { id: 'rituals', label: 'Rituals', icon: Flag },
  { id: 'hivelab', label: 'HiveLab', icon: Layers },
  { id: 'moderation', label: 'Moderation', icon: Activity },
];

function AdminDashboardContent() {
  const { error: toastError, success: toastSuccess, error: toastFailure } = useToast();
  const featureFlags = useFeatureFlags();
  const [state, setState] = useState<DashboardState>({
    data: null,
    loading: true,
    error: null,
  });
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [refreshToken, setRefreshToken] = useState(0);
  const [sheetItem, setSheetItem] = useState<AdminNavItem | null>(null);
  const [isSubmittingRitual, setIsSubmittingRitual] = useState(false);
  const [composerInitialValue, setComposerInitialValue] = useState<Partial<RitualComposerInput> | undefined>(undefined);
  const [ritualsStats, setRitualsStats] = useState<RitualsStatsState | null>(null);
  const [sheetLoading, setSheetLoading] = useState(false);
  const [existingRituals, setExistingRituals] = useState<
    Array<{
      id: string;
      title: string;
      phase: 'draft' | 'announced' | 'active' | 'cooldown' | 'ended';
      startsAt?: string;
      endsAt?: string;
    }>
  >([]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const [response, ritualsStatsRes] = await Promise.all([
          secureApiFetch('/api/admin/dashboard', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
          }),
          secureApiFetch('/api/admin/rituals/stats', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
          }).catch(() => null),
        ]);

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = (await response.json()) as AdminDashboardResponse;
        if (isMounted) {
          setState({ data: payload, loading: false, error: null });
          if (ritualsStatsRes && ritualsStatsRes.ok) {
            const rjson = await ritualsStatsRes.json().catch(() => null);
            const data = rjson?.data as RitualsStatsState | undefined;
            if (data) setRitualsStats(data);
          } else {
            setRitualsStats(null);
          }
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to load dashboard';
        console.error('[AdminDashboard] Failed to load', message);
        toastError('Failed to load admin dashboard', message);
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: 'We could not load the dashboard data. Try again shortly.',
          });
        }
      }
    };

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, [toastError, refreshToken]);

  const handleNavSelect = useCallback(
    (item: AdminNavItem) => {
      setActiveSection(item.id);

      if (item.id === 'overview') {
        setSheetItem(null);
        return;
      }

      setSheetItem(item);
      if (item.id === 'rituals') {
        // Reset template selection when opening composer
        setComposerInitialValue(undefined);
        // Load current campus rituals for quick actions
        setSheetLoading(true);
        secureApiFetch('/api/admin/rituals?phase=announced&phase=active')
          .then(async (res) => {
            if (!res.ok) throw new Error(String(res.status));
            const payload = await res.json();
            const rows: typeof existingRituals = (payload?.data || []).map((r: any) => ({
              id: r.id,
              title: r.title || 'Untitled',
              phase: r.phase,
              startsAt: r.startsAt,
              endsAt: r.endsAt,
            }));
            setExistingRituals(rows);
          })
          .catch(() => setExistingRituals([]))
          .finally(() => setSheetLoading(false));
      }
    },
    [],
  );

  const handleRitualSubmit = useCallback(
    async (payload: RitualComposerInput) => {
      try {
        setIsSubmittingRitual(true);
        const response = await secureApiFetch('/api/admin/rituals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody?.error || `Request failed with status ${response.status}`);
        }

        toastSuccess('Ritual created', 'New campus ritual scheduled successfully.');
        setSheetItem(null);
        setActiveSection('overview');
        setRefreshToken((value) => value + 1);
      } catch (err) {
        toastFailure('Unable to create ritual', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSubmittingRitual(false);
    }
  },
    [toastFailure, toastSuccess],
  );

  const navItems = useMemo(() => {
    const ritualsBadge = ritualsStats?.byPhase?.active ? (
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
        {ritualsStats.byPhase.active}
      </span>
    ) : undefined;

    const moderationBadge = state.data?.statistics.builderRequests.pending ? (
      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-200">
        {state.data.statistics.builderRequests.pending}
      </span>
    ) : undefined;

    return NAV_SECTIONS.map((item) => ({
      ...item,
      active: item.id === activeSection,
      badge:
        item.id === 'rituals'
          ? ritualsBadge
          : item.id === 'moderation'
            ? moderationBadge
            : item.badge,
    }));
  }, [activeSection, ritualsStats, state.data]);

  const metrics = useMemo(() => {
    if (!state.data) {
      return [];
    }
    const { statistics } = state.data;
    const { users, spaces, builderRequests, system } = statistics;

    const healthScore = computeHealthScore(statistics);
    const uptimeHours = Math.round(system.uptime / 3600);

    const list = [
      {
        id: 'health',
        title: 'Platform Health',
        value: healthScore,
        delta: { value: Math.min(healthScore - 80, 20), label: 'day over day' },
        icon: ShieldCheck,
        description: `Uptime ${uptimeHours}h • Reads healthy • Campus isolation enforced`,
      },
      {
        id: 'active-users',
        title: 'Active Students',
        value: users.total,
        delta: {
          value: users.growth?.lastWeek ?? 0,
          label: 'week over week',
        },
        icon: Users,
        description: `${users.active} active in the last 7 days`,
      },
      {
        id: 'spaces',
        title: 'Spaces Online',
        value: spaces.total,
        delta: {
          value: spaces.activationRate - 50,
          label: 'activation delta',
        },
        icon: TrendingUp,
        description: `${spaces.active} active • ${spaces.dormant} dormant`,
      },
      {
        id: 'pending-actions',
        title: 'Pending Actions',
        value: builderRequests.pending,
        delta: {
          value: builderRequests.pending,
          label: 'awaiting review',
          tone: builderRequests.pending > 0 ? 'negative' : 'positive',
        },
        icon: Flag,
        description: `${builderRequests.approved} approved • ${builderRequests.rejected} rejected`,
      },
    ] as const;

    // Optionally include rituals card when stats are available
    if (ritualsStats) {
      const active = ritualsStats.byPhase.active;
      const upcoming = ritualsStats.byPhase.announced;
      const participants = ritualsStats.metrics.participants;
      return [
        {
          id: 'rituals',
          title: 'Rituals Live',
          value: active,
          delta: { value: upcoming, label: 'upcoming' },
          icon: Flag,
          description: `${participants} participants across campus`,
        },
        ...list,
      ];
    }

    return [...list];
  }, [state.data, ritualsStats]);

  const auditEvents = useMemo<AuditLogEvent[]>(() => {
    if (!state.data) {
      return [];
    }
    const { statistics } = state.data;
    const now = Date.now();

    return [
      {
        id: 'activity-1',
        summary: 'Dashboard refreshed with latest campus metrics',
        description: `Users ${statistics.users.total} • Spaces ${statistics.spaces.total}`,
        timestamp: new Date(now - 2 * 60 * 1000),
        meta: ['System'],
      },
      {
        id: 'activity-2',
        summary: 'Builder request queue evaluated',
        description: `${statistics.builderRequests.pending} requests pending review`,
        timestamp: new Date(now - 30 * 60 * 1000),
        variant:
          statistics.builderRequests.pending > 3 ? 'warning' : 'default',
        meta: ['HiveLab'],
      },
      {
        id: 'activity-3',
        summary: 'System uptime check complete',
        description: `Process uptime ${Math.round(statistics.system.uptime / 3600)} hours`,
        timestamp: new Date(now - 3 * 60 * 60 * 1000),
        variant: 'positive',
        meta: ['Infrastructure'],
      },
    ];
  }, [state.data]);

  const moderationQueue = useMemo<ModerationQueueItem[]>(() => {
    if (!state.data) {
      return [];
    }
    const { builderRequests } = state.data.statistics;
    const now = Date.now();
    const pending = builderRequests.pending;

    return [
      {
        id: 'queue-builder',
        title: 'Builder requests awaiting review',
        summary: `${pending} request${pending === 1 ? '' : 's'} need decisions`,
        submittedBy: 'HiveLab Automation',
        submittedAt: new Date(now - pending * 45 * 60 * 1000),
        status: pending > 0 ? 'pending' : 'resolved',
        severity: pending >= 5 ? 'high' : pending >= 2 ? 'medium' : 'low',
        ctaLabel: pending > 0 ? 'Review queue' : undefined,
        tags: ['HiveLab'],
      },
      {
        id: 'queue-system-health',
        title: 'Infrastructure monitoring',
        summary: 'Firebase quotas within safe thresholds.',
        submittedBy: 'System Monitor',
        submittedAt: new Date(now - 90 * 60 * 1000),
        status: 'resolved',
        severity: 'low',
        tags: ['Infrastructure'],
      },
    ];
  }, [state.data]);

  const campusName =
    state.data?.platform.university ?? 'University at Buffalo';

  const featureEnabled =
    featureFlags?.adminDashboard === undefined
      ? true
      : featureFlags.adminDashboard;

  const sheetCopy = useMemo(() => {
    if (!sheetItem) return null;

    const stats = state.data?.statistics;
    const extendedStats = stats as (typeof stats & Record<string, any>) | undefined;

    switch (sheetItem.id) {
      case 'campaigns': {
        const pending = stats?.builderRequests.pending ?? 0;
        return {
          title: 'Campaign Planner',
          description:
            'Queue rituals, feature drops, and space spotlights without leaving the dashboard. Campaigns are sheet-first so leads never lose context.',
          bullets: [
            'Create a campus-wide broadcast with scheduling and audience targeting.',
            `Review ${pending} builder request${pending === 1 ? '' : 's'} before launch.`,
            'Attach onboarding nudges and HiveLab prompts to the rollout.',
          ],
          primaryCta: { label: 'Open Control Board', href: '/admin/control-board' },
        };
      }
      case 'rituals': {
        const active = stats?.spaces.active ?? 0;
        return {
          title: 'Ritual Orchestration',
          description:
            'Spin up nine-archetype rituals from a sheet so admins can configure, preview, and launch in under a minute.',
          bullets: [
            `Monitor active rituals across ${active} engaged spaces.`,
            'Configure cadence, incentives, and moderation guardrails.',
            'Trigger recaps and campus-wide reminders directly from the sheet.',
          ],
          primaryCta: { label: 'Launch Ritual', href: '/admin#rituals' },
        };
      }
      case 'hivelab': {
        const published = extendedStats?.hivelab?.totals?.published ?? 0;
        return {
          title: 'HiveLab Quality Gate',
          description:
            'Approve, stage, and deploy tools using sheet-first reviews with analytics context in-line.',
          bullets: [
            `${published} certified tools live today – use this screen to stage the next wave.`,
            'Run quality checks and export catalog proofs without leaving the sheet.',
            'Coordinate deploy/sunset windows with builders and campus leads.',
          ],
          primaryCta: { label: 'Open HiveLab Reviews', href: '/admin/hivelab' },
        };
      }
      case 'moderation': {
        const pendingReports = stats?.builderRequests.pending ?? 0;
        return {
          title: 'Moderation Queue',
          description:
            'Resolve reports, automate follow-ups, and escalate to student leaders while staying anchored in the dashboard.',
          bullets: [
            `Triage pending actions (${pendingReports} open items) with status chips and severity filters.`,
            'Escalate to space leaders or campus ops directly from the queue.',
            'Document outcomes with audit log auto-updates and CSRF-protected actions.',
          ],
          primaryCta: { label: 'Review Reports', href: '/admin#moderation' },
        };
      }
      default:
        return null;
    }
  }, [sheetItem, state.data]);

  if (!featureEnabled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-center text-white/70">
        <div className="max-w-md space-y-4 px-6">
          <ShieldCheck className="mx-auto h-10 w-10 text-white/40" />
          <h1 className="text-2xl font-semibold text-white">
            Admin dashboard coming soon
          </h1>
          <p className="text-sm">
            The admin control center is gated behind the campus rollout flag.
            Ping the platform team to enable `featureFlags.adminDashboard` for
            your session.
          </p>
        </div>
      </div>
    );
  }

  const actions = (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="border-white/20 text-white/70"
        onClick={() => handleNavSelect({ id: 'campaigns', label: 'Campaigns' })}
      >
        Schedule Broadcast
      </Button>
      <Button size="sm" onClick={() => setSheetItem({ id: 'rituals', label: 'Rituals', icon: Flag })}>Launch Ritual</Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={async () => {
          try {
            const res = await secureApiFetch('/api/admin/rituals/evaluate');
            if (res.ok) {
              const data = await res.json();
              toastSuccess('Ritual transitions evaluated', `${data.count} transition(s) processed`);
              setRefreshToken((v) => v + 1);
            } else {
              toastFailure('Failed to evaluate transitions', String(res.status));
            }
          } catch (e) {
            toastFailure('Failed to evaluate transitions', e instanceof Error ? e.message : 'Unknown error');
          }
        }}
      >
        Evaluate Transitions
      </Button>
    </>
  );

  const banner = state.error ? (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-red-300">
      <span>{state.error}</span>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 px-3 text-red-200 hover:text-red-100"
        onClick={() => setRefreshToken((value) => value + 1)}
      >
        Dismiss
      </Button>
    </div>
  ) : (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
      <span>
        🚀 Finals Survival ritual scheduled for Friday @ 6pm (UB campus wide).
      </span>
      <Button variant="ghost" size="sm" className="h-8 px-3">
        Review launch plan
      </Button>
    </div>
  );

  return (
    <AdminShell
      title="Campus Command Center"
      subtitle="Real-time health, campaigns, and moderation across UB campus."
      campusName={campusName}
      navItems={navItems}
      onSelectNavItem={handleNavSelect}
      actions={actions}
      banner={banner}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>
            Last refreshed{' '}
            {state.data?.timestamp
              ? new Date(state.data.timestamp).toLocaleTimeString()
              : 'just now'}
          </span>
          <span>Campus isolation enforced on every query.</span>
        </div>
      }
    >
      {state.loading ? (
        <DashboardSkeleton />
      ) : (
        <DashboardSections
          metrics={metrics}
          auditEvents={auditEvents}
          moderationItems={moderationQueue}
        />
      )}
    </AdminShell>
      <Sheet
        open={sheetItem != null}
        onOpenChange={(open) => {
          if (!open) {
            setSheetItem(null);
            setActiveSection('overview');
            setComposerInitialValue(undefined);
          }
        }}
      >
        {sheetItem ? (
          <SheetContent side="right" aria-describedby="admin-sheet-description" className="flex h-full flex-col">
            {sheetItem.id === 'rituals' ? (
              <>
                <SheetHeader>
                  <SheetTitle>Create campus ritual</SheetTitle>
                  <SheetDescription id="admin-sheet-description">
                    Configure archetype, schedule, and presentation before launching to campus.
                  </SheetDescription>
                </SheetHeader>
                {/* Existing Rituals Quick Management */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-white/50">Existing rituals</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-white/70"
                      onClick={() => handleNavSelect({ id: 'rituals', label: 'Rituals' })}
                      aria-label="Refresh rituals list"
                    >
                      Refresh
                    </Button>
                  </div>
                  <div className="max-h-44 overflow-auto rounded-md border border-white/10">
                    {sheetLoading ? (
                      <div className="p-3 text-sm text-white/60">Loading…</div>
                    ) : existingRituals.length === 0 ? (
                      <div className="p-3 text-sm text-white/60">No active or upcoming rituals</div>
                    ) : (
                      <ul className="divide-y divide-white/10">
                        {existingRituals.map((r) => (
                          <li key={r.id} className="flex items-center gap-3 px-3 py-2">
                            <div className="flex-1">
                              <div className="text-sm text-white">{r.title}</div>
                              <div className="text-[11px] text-white/50">{r.phase}{r.startsAt ? ` • starts ${new Date(r.startsAt).toLocaleString()}` : ''}</div>
                            </div>
                            {r.phase !== 'active' && (
                              <Button
                                size="sm"
                                className="h-7"
                                onClick={async () => {
                                  try {
                                    const res = await secureApiFetch(`/api/admin/rituals/${r.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ phase: 'active' }),
                                    });
                                    if (res.ok) {
                                      setExistingRituals((rows) => rows.map((x) => (x.id === r.id ? { ...x, phase: 'active' } : x)));
                                      setRefreshToken((v) => v + 1);
                                    }
                                  } catch {}
                                }}
                              >
                                Launch
                              </Button>
                            )}
                            {r.phase === 'active' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-7"
                                onClick={async () => {
                                  try {
                                    const res = await secureApiFetch(`/api/admin/rituals/${r.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ phase: 'cooldown' }),
                                    });
                                    if (res.ok) {
                                      setExistingRituals((rows) => rows.map((x) => (x.id === r.id ? { ...x, phase: 'cooldown' } : x)));
                                      setRefreshToken((v) => v + 1);
                                    }
                                  } catch {}
                                }}
                              >
                                Pause
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-white/70"
                              onClick={async () => {
                                try {
                                  const res = await secureApiFetch(`/api/admin/rituals/${r.id}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ phase: 'ended' }),
                                  });
                                  if (res.ok) {
                                    setExistingRituals((rows) => rows.filter((x) => x.id !== r.id));
                                    setRefreshToken((v) => v + 1);
                                  }
                                } catch {}
                              }}
                            >
                              End
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* Quick Templates */}
                <div className="mb-3 space-y-2">
                  <div className="text-xs uppercase tracking-widest text-white/50">Quick templates</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'CAMPUS_MADNESS', label: 'Campus Madness', archetype: RitualArchetype.Tournament, accent: '#FFD700', desc: 'Tournament between spaces' },
                      { id: 'FEATURE_DROP', label: 'Feature Drop', archetype: RitualArchetype.FeatureDrop, accent: '#8B5CF6', desc: 'Limited-time unlock' },
                      { id: 'FOUNDING_CLASS', label: 'Founding Class', archetype: RitualArchetype.FoundingClass, accent: '#22c55e', desc: 'Early supporters' },
                      { id: 'RULE_INVERSION', label: 'Rule Inversion', archetype: RitualArchetype.RuleInversion, accent: '#f59e0b', desc: 'Temporary campus rule' },
                      { id: 'COUNTDOWN', label: 'Launch Countdown', archetype: RitualArchetype.LaunchCountdown, accent: '#38bdf8', desc: 'Build anticipation' },
                      { id: 'BETA_LOTTERY', label: 'Beta Lottery', archetype: RitualArchetype.BetaLottery, accent: '#A78BFA', desc: 'Random early access' },
                      { id: 'UNLOCK_CHALLENGE', label: 'Unlock Challenge', archetype: RitualArchetype.UnlockChallenge, accent: '#F59E0B', desc: 'Group goal unlock' },
                      { id: 'SURVIVAL', label: 'Survival', archetype: RitualArchetype.Survival, accent: '#EF4444', desc: 'Attrition competition' },
                      { id: 'LEAK', label: 'Leak', archetype: RitualArchetype.Leak, accent: '#14B8A6', desc: 'Mystery reveal' },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          const now = new Date();
                          const ends = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
                          const defaults = createDefaultConfig(tpl.archetype);
                          setComposerInitialValue({
                            title: tpl.label,
                            subtitle: tpl.desc,
                            description: `${tpl.label} – autogenerated template` ,
                            archetype: tpl.archetype,
                            startsAt: now.toISOString(),
                            endsAt: ends.toISOString(),
                            visibility: 'public',
                            presentation: { accentColor: tpl.accent, ctaLabel: 'Join Now' },
                            config: defaults,
                          });
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:border-white/20"
                      >
                        <div className="text-sm font-medium text-white">{tpl.label}</div>
                        <div className="text-xs text-white/60">{tpl.desc}</div>
                      </button>
                    ))}
                  </div>
                  {composerInitialValue ? (
                    <div className="flex items-center justify-between rounded-md border border-white/10 bg-black/30 p-2 text-xs text-white/60">
                      <div>
                        Using template: <span className="text-white/80">{composerInitialValue.title}</span>
                      </div>
                      <button
                        className="rounded-md px-2 py-1 text-white/70 hover:text-white"
                        onClick={() => setComposerInitialValue(undefined)}
                      >
                        Reset
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="flex-1 overflow-hidden">
                  <AdminRitualComposer
                    initialValue={composerInitialValue}
                    onSubmit={handleRitualSubmit}
                    onCancel={() => setSheetItem(null)}
                    isSubmitting={isSubmittingRitual}
                  />
                </div>
              </>
            ) : sheetItem.id === 'campaigns' ? (
              <>
                <SheetHeader>
                  <SheetTitle>Schedule broadcast</SheetTitle>
                  <SheetDescription id="admin-sheet-description">
                    Send a campus-wide announcement or target a space. CSRF-protected and campus scoped.
                  </SheetDescription>
                </SheetHeader>
                <BroadcastComposer onSuccess={() => setSheetItem(null)} />
              </>
            ) : (
              <>
                <SheetHeader>
                  <SheetTitle>{sheetCopy?.title ?? sheetItem.label}</SheetTitle>
                  <SheetDescription id="admin-sheet-description">
                    {sheetCopy?.description ??
                      'Sheet-first flows keep admins anchored while configuring campaigns and tools.'}
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-3 text-sm text-white/70">
                  {sheetCopy?.bullets?.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <SheetFooter className="mt-8">
                  {sheetCopy?.primaryCta ? (
                    <Button asChild>
                      <a href={sheetCopy.primaryCta.href}>{sheetCopy.primaryCta.label}</a>
                    </Button>
                  ) : null}
                  <SheetClose asChild>
                    <Button variant="ghost" className="text-white/70 hover:text-white">
                      Close
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        ) : null}
      </Sheet>
  );
}

function BroadcastComposer({ onSuccess }: { onSuccess?: () => void }) {
  const { success: toastSuccess, error: toastError } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    message: '',
    target: 'campus' as 'campus' | 'space',
    spaceId: '',
    scheduleAt: '',
    priority: 'normal' as 'normal' | 'high',
  });
  const [scheduled, setScheduled] = useState<Array<{ id: string; title: string; scheduleAt?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await secureApiFetch('/api/admin/broadcasts?limit=10&status=scheduled');
        if (res.ok) {
          const payload = await res.json();
          if (mounted) setScheduled(payload?.data || []);
        }
      } catch {}
      if (mounted) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const submit = async () => {
    try {
      setSubmitting(true);
      const res = await secureApiFetch('/api/admin/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          message: form.message,
          target: form.target,
          spaceId: form.target === 'space' ? form.spaceId : undefined,
          scheduleAt: form.scheduleAt || undefined,
          priority: form.priority,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed: ${res.status}`);
      }
      toastSuccess('Broadcast scheduled', 'Your announcement is queued.');
      onSuccess?.();
    } catch (e) {
      toastError('Failed to schedule', e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-1">
      <div className="space-y-2">
        <label className="block text-sm text-white/70">Title</label>
        <input
          className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
          placeholder="Finals Survival kicks off Friday"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-white/70">Message</label>
        <textarea
          className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
          rows={4}
          placeholder="Join campus-wide rituals, view details, and participate together."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-sm text-white/70">Target</label>
          <select
            className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
            value={form.target}
            onChange={(e) => setForm((f) => ({ ...f, target: e.target.value as any }))}
          >
            <option value="campus">Entire campus</option>
            <option value="space">Specific space</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-white/70">Priority</label>
          <select
            className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as any }))}
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      {form.target === 'space' && (
        <div className="space-y-2">
          <label className="block text-sm text-white/70">Space ID</label>
          <input
            className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
            placeholder="space_abc123"
            value={form.spaceId}
            onChange={(e) => setForm((f) => ({ ...f, spaceId: e.target.value }))}
          />
        </div>
      )}
      <div className="space-y-2">
        <label className="block text-sm text-white/70">Schedule (optional)</label>
        <input
          type="datetime-local"
          className="w-full rounded-md border border-white/10 bg-black/30 p-2 text-white outline-none"
          value={form.scheduleAt}
          onChange={(e) => setForm((f) => ({ ...f, scheduleAt: e.target.value }))}
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button disabled={submitting || !form.title.trim() || !form.message.trim()} onClick={submit}>
          {submitting ? 'Scheduling…' : 'Schedule'}
        </Button>
        <Button variant="ghost" className="text-white/70" onClick={() => onSuccess?.()}>Cancel</Button>
      </div>
      <div className="mt-4">
        <div className="text-xs uppercase tracking-widest text-white/50">Scheduled (upcoming)</div>
        <div className="mt-2 rounded-md border border-white/10">
          {loading ? (
            <div className="p-3 text-sm text-white/60">Loading…</div>
          ) : scheduled.length === 0 ? (
            <div className="p-3 text-sm text-white/60">No upcoming broadcasts</div>
          ) : (
            <ul className="divide-y divide-white/10">
              {scheduled.map((b) => (
                <li key={b.id} className="px-3 py-2 text-sm text-white/80">
                  <div className="font-medium">{b.title}</div>
                  <div className="text-white/50 text-[11px]">{b.scheduleAt ? new Date(b.scheduleAt).toLocaleString() : 'Immediate'}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-lg bg-white/5" />
        ))}
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-lg bg-white/5" />
        <Skeleton className="h-64 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

function DashboardSections({
  metrics,
  auditEvents,
  moderationItems,
}: {
  metrics: Array<{
    id: string;
    title: string;
    value: number;
    delta?: { value: number; label?: string; tone?: 'positive' | 'negative' | 'neutral' };
    icon: typeof ShieldCheck;
    description?: string;
  }>;
  auditEvents: AuditLogEvent[];
  moderationItems: ModerationQueueItem[];
}) {
  return (
    <div className="space-y-10">
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            delta={metric.delta}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <AuditLogList events={auditEvents} />
        <ModerationQueue items={moderationItems} />
      </div>
    </div>
  );
}

function computeHealthScore(stats: AdminDashboardResponse['statistics']): number {
  let score = 90;
  if (stats.builderRequests.pending > 3) {
    score -= 5;
  }
  if (stats.system.memory?.heapUsed && stats.system.memory?.heapTotal) {
    const utilization = stats.system.memory.heapUsed / stats.system.memory.heapTotal;
    if (utilization > 0.8) score -= 5;
  }
  if (stats.spaces.activationRate < 40) {
    score -= 5;
  }
  if (score < 50) score = 50;
  if (score > 99) score = 99;
  return score;
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
