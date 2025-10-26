"use client";

import { useMemo, useState, useTransition } from "react";
import { Checkbox, Button, Badge, Switch, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@hive/ui";
import { toast } from "@hive/ui";

export type UIFlag = {
  key: string;
  label?: string;
  description?: string;
  enabled: boolean;
  audience?: string;
  rolloutPercentage?: number;
  segments?: { campuses?: string[]; roles?: string[] };
  updatedAt?: Date | null;
};

async function toggleFlag(key: string, enabled: boolean) {
  const res = await fetch(`/api/features/${encodeURIComponent(key)}/toggle`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ enabled })
  });
  const json = await res.json();
  if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Toggle failed");
  return json?.data as { persisted: boolean };
}

export function FlagsTable({ flags }: { flags: readonly UIFlag[] }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [local, setLocal] = useState(() => Object.fromEntries(flags.map((f) => [f.key, f.enabled])) as Record<string, boolean>);
  const [isPending, start] = useTransition();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, { label?: string; description?: string; audience?: string }>>(() => {
    const initial: Record<string, { label?: string; description?: string; audience?: string }> = {};
    for (const f of flags) initial[f.key] = { label: f.label, description: f.description, audience: f.audience };
    return initial;
  });

  const allSelected = useMemo(() => flags.length > 0 && flags.every((f) => selected[f.key]), [flags, selected]);
  const selectedKeys = useMemo(() => flags.filter((f) => selected[f.key]).map((f) => f.key), [flags, selected]);

  const setAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    for (const f of flags) next[f.key] = checked;
    setSelected(next);
  };

  const bulk = (enabled: boolean) => {
    if (selectedKeys.length === 0) return;
    if (!confirm(`${enabled ? "Enable" : "Disable"} ${selectedKeys.length} selected feature(s)?`)) return;
    start(async () => {
      let ok = 0;
      for (const key of selectedKeys) {
        setLocal((s) => ({ ...s, [key]: enabled }));
        try {
          await toggleFlag(key, enabled);
          ok++;
        } catch (_e) {
          setLocal((s) => ({ ...s, [key]: !enabled }));
        }
      }
      toast({ title: "Bulk update", description: `${ok}/${selectedKeys.length} succeeded` });
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Checkbox checked={allSelected} onCheckedChange={(v) => setAll(Boolean(v))} aria-label="Select all" />
          <span className="text-caption text-muted-foreground">Select all</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled={isPending || selectedKeys.length === 0} onClick={() => bulk(true)}>
            Enable selected
          </Button>
          <Button size="sm" variant="secondary" disabled={isPending || selectedKeys.length === 0} onClick={() => bulk(false)}>
            Disable selected
          </Button>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-8 gap-2 px-3 py-2 text-caption text-muted-foreground">
        <div className="flex items-center gap-2"><span className="sr-only">Select</span></div>
        <div className="col-span-2">Flag</div>
        <div>Status</div>
        <div>Audience</div>
        <div>Updated</div>
        <div>Rollout</div>
        <div>Segments</div>
        <div className="text-right">Actions</div>
      </div>

      <div className="divide-y divide-border rounded-md border border-border bg-card">
        {flags.length === 0 ? (
          <div className="p-4 text-muted-foreground">No feature flags set yet.</div>
        ) : (
          flags.map((f) => (
            <div key={f.key} className="grid grid-cols-1 md:grid-cols-8 gap-2 px-3 py-3">
              <div className="flex items-center">
                <Checkbox checked={!!selected[f.key]} onCheckedChange={(v) => setSelected((s) => ({ ...s, [f.key]: Boolean(v) }))} aria-label={`Select ${f.key}`} />
              </div>
              <div className="md:col-span-2">
                <div className="font-medium">{f.label ?? f.key}</div>
                <div className="text-caption text-muted-foreground truncate">{f.description ?? f.key}</div>
              </div>
              <div>{local[f.key] ? <Badge variant="secondary">Enabled</Badge> : <Badge variant="destructive">Disabled</Badge>}</div>
              <div className="truncate text-muted-foreground">{f.audience ?? "All"}</div>
              <div className="text-muted-foreground">
                {f.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(f.updatedAt) : "—"}
              </div>
              <div className="text-muted-foreground">{typeof f.rolloutPercentage === "number" ? `${f.rolloutPercentage}%` : "—"}</div>
              <div className="truncate text-muted-foreground">
                {(() => {
                  const c = f.segments?.campuses?.length || 0;
                  const r = f.segments?.roles?.length || 0;
                  return c + r === 0 ? "—" : `campus:${c} roles:${r}`;
                })()}
              </div>
              <div className="flex md:justify-end">
                <Switch
                  checked={!!local[f.key]}
                  onCheckedChange={async (next) => {
                    const prev = local[f.key];
                    setLocal((s) => ({ ...s, [f.key]: next }));
                    try {
                      const { persisted } = await toggleFlag(f.key, next);
                      if (!persisted) toast({ title: "No-op in dev", description: "Feature state not persisted (Firebase not configured)." });
                    } catch (e: any) {
                      setLocal((s) => ({ ...s, [f.key]: prev }));
                      toast({ title: "Toggle failed", description: String(e?.message || e), variant: "destructive" });
                    }
                  }}
                  aria-label={`Toggle ${f.key}`}
                />
                <Button size="sm" variant="outline" className="ml-2" onClick={() => setOpenKey(f.key)}>Edit</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <Dialog open={!!openKey} onOpenChange={(o) => !o && setOpenKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit feature</DialogTitle>
          </DialogHeader>
          {openKey && (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <div className="text-caption mb-1">Label</div>
                <Input value={draft[openKey]?.label ?? ""} onChange={(e) => setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], label: e.target.value } }))} />
              </div>
              <div>
                <div className="text-caption mb-1">Audience</div>
                <Input placeholder="e.g., campus:ub-buffalo" value={draft[openKey]?.audience ?? ""} onChange={(e) => setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], audience: e.target.value } }))} />
              </div>
              <div>
                <div className="text-caption mb-1">Rollout Percentage</div>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0..100"
                  value={(draft[openKey] as any)?.rolloutPercentage ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    const n = v === "" ? undefined : Math.max(0, Math.min(100, Number(v)));
                    setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], rolloutPercentage: (Number.isFinite(n as number) ? (n as number) : undefined) as any } }));
                  }}
                />
              </div>
              <div>
                <div className="text-caption mb-1">Campuses (comma separated)</div>
                <Input
                  placeholder="ub-buffalo, mit, ucla"
                  value={((draft[openKey] as any)?.segments?.campuses || []).join(", ")}
                  onChange={(e) => {
                    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                    setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], segments: { ...((d[openKey!] as any)?.segments || {}), campuses: arr } } }));
                  }}
                />
              </div>
              <div>
                <div className="text-caption mb-1">Roles (comma separated)</div>
                <Input
                  placeholder="leader, admin, student"
                  value={((draft[openKey] as any)?.segments?.roles || []).join(", ")}
                  onChange={(e) => {
                    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                    setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], segments: { ...((d[openKey!] as any)?.segments || {}), roles: arr } } }));
                  }}
                />
              </div>
              <div>
                <div className="text-caption mb-1">Description</div>
                <Textarea rows={3} value={draft[openKey]?.description ?? ""} onChange={(e) => setDraft((d) => ({ ...d, [openKey!]: { ...d[openKey!], description: e.target.value } }))} />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (!openKey) return;
                const raw: any = draft[openKey] || {};
                const payload: any = {
                  label: raw.label,
                  description: raw.description,
                  audience: raw.audience,
                  rolloutPercentage: typeof raw.rolloutPercentage === "number" ? raw.rolloutPercentage : undefined,
                  segments: raw.segments ? {
                    campuses: (raw.segments.campuses || []).filter(Boolean),
                    roles: (raw.segments.roles || []).filter(Boolean)
                  } : undefined
                };
                start(async () => {
                  try {
                    const res = await fetch(`/api/features/${encodeURIComponent(openKey)}`, {
                      method: "PATCH",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify(payload)
                    });
                    const json = await res.json();
                    if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Update failed");
                    toast({ title: "Saved", description: "Flag details updated" });
                    setOpenKey(null);
                  } catch (e: any) {
                    toast({ title: "Save failed", description: String(e?.message || e), variant: "destructive" });
                  }
                });
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
