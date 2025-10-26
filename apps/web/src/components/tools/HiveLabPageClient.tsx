// Bounded Context Owner: HiveLab Guild
"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text
} from "@hive/ui";

export interface ClientTool {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: "draft" | "limited_run" | "certified" | "archived";
  readonly visibility: "private" | "space" | "campus" | "public";
  readonly deployedTo: readonly string[];
  readonly uses: number;
  readonly limitedRunEndsAt?: string | null;
  readonly version: number;
  readonly lastTest?: {
    readonly health: "looks_good" | "heads_up" | "fix_required";
    readonly blockingIssueCount: number;
    readonly lastRunAt?: string | null;
  } | null;
}

export interface ClientToolTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category?: string;
}

export interface ToolDashboardState {
  readonly owned: readonly ClientTool[];
  readonly drafts: readonly ClientTool[];
  readonly published: readonly ClientTool[];
  readonly templates: readonly ClientToolTemplate[];
}

interface HiveLabPageClientProps {
  readonly profileId: string;
  readonly campusId: string;
  readonly initialDashboard: ToolDashboardState;
}

const ToolApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(""),
  status: z.union([z.literal("draft"), z.literal("limited_run"), z.literal("certified"), z.literal("archived")]).or(z.string()),
  visibility: z.union([z.literal("private"), z.literal("space"), z.literal("campus"), z.literal("public")]).or(z.string()),
  deployedTo: z.array(z.string()).default([]),
  analytics: z.object({ uses: z.number().default(0) }).partial().default({}),
  limitedRunEndsAt: z.string().nullable().optional(),
  version: z.number().default(0),
  lastTest: z.object({
    health: z.union([z.literal("looks_good"), z.literal("heads_up"), z.literal("fix_required")]).or(z.string()),
    blockingIssueCount: z.number().default(0),
    lastRunAt: z.string().nullable().optional()
  }).nullable().optional()
});

const mapTool = (payload: unknown): ClientTool => {
  const p = ToolApiSchema.parse(payload);
  const status = (p.status === "draft" || p.status === "limited_run" || p.status === "certified" || p.status === "archived") ? p.status : "draft";
  const visibility: ClientTool["visibility"] = (p.visibility === "private" || p.visibility === "space" || p.visibility === "campus" || p.visibility === "public") ? p.visibility : "private";
  const lastTest = p.lastTest
    ? {
        health: ((p.lastTest.health === "looks_good" || p.lastTest.health === "heads_up" || p.lastTest.health === "fix_required")
          ? p.lastTest.health
          : "heads_up") as "looks_good" | "heads_up" | "fix_required",
        blockingIssueCount: p.lastTest.blockingIssueCount ?? 0,
        lastRunAt: p.lastTest.lastRunAt ?? null,
      }
    : null;
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    status,
    visibility,
    deployedTo: p.deployedTo,
    uses: typeof p.analytics.uses === "number" ? p.analytics.uses : 0,
    limitedRunEndsAt: p.limitedRunEndsAt ?? null,
    version: p.version ?? 0,
    lastTest
  };
};

export function HiveLabPageClient({ profileId, campusId, initialDashboard }: HiveLabPageClientProps): JSX.Element {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [isPending, startTransition] = useTransition();

  const formatLimitedRunCountdown = (iso?: string | null): string | null => {
    if (!iso) return null;
    const end = new Date(iso);
    if (Number.isNaN(end.getTime())) return null;
    const diffMs = end.getTime() - Date.now();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (!Number.isFinite(daysLeft)) return null;
    if (daysLeft <= 0) return "Limited run ended";
    return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
  };

  const formatLastTest = (tool: ClientTool): string => {
    if (!tool.lastTest?.lastRunAt) return "Run Test required";
    const date = new Date(tool.lastTest.lastRunAt);
    if (Number.isNaN(date.getTime())) return "Run Test required";
    return `Last test ${date.toLocaleString()}`;
  };

  const refreshDashboardWithTool = (tool: ClientTool): void => {
    setDashboard((prev) => {
      const updatedOwned = [tool, ...prev.owned.filter((existing) => existing.id !== tool.id)];
      return {
        owned: updatedOwned,
        drafts: updatedOwned.filter((item) => item.status === "draft"),
        published: updatedOwned.filter((item) => item.status === "limited_run" || item.status === "certified"),
        templates: prev.templates
      };
    });
  };

  const createTool = (templateId?: string): void => {
    startTransition(async () => {
      const response = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: templateId ? `Copy of ${templateId}` : "New Tool",
          description: templateId ? "Created from template" : "Untitled draft",
          templateId,
          createdBy: profileId,
          campusId
        })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      const ok = (v: unknown): v is { success: true; data: unknown } => typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      if (!ok(json)) {
        return;
      }

      refreshDashboardWithTool(mapTool((json as { data: unknown }).data));
    });
  };

  const publishTool = (toolId: string, stage: "limited_run" | "certified" = "limited_run"): void => {
    startTransition(async () => {
      const response = await fetch(`/api/tools/${toolId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage })
      });
      if (!response.ok) {
        return;
      }
      const json: unknown = await response.json();
      const ok = (v: unknown): v is { success: true; data: unknown } => typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      if (!ok(json)) {
        return;
      }
      refreshDashboardWithTool(mapTool((json as { data: unknown }).data));
    });
  };

  const setVisibility = (toolId: string, visibility: ClientTool["visibility"]): void => {
    startTransition(async () => {
      const response = await fetch(`/api/tools/${toolId}/visibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility })
      });
      if (!response.ok) {
        return;
      }
      const json: unknown = await response.json();
      const ok = (v: unknown): v is { success: true; data: unknown } => typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      if (!ok(json)) {
        return;
      }
      refreshDashboardWithTool(mapTool((json as { data: unknown }).data));
    });
  };

  const isPublishGateSatisfied = (tool: ClientTool): { ok: true } | { ok: false; reason: string } => {
    const meta = tool.lastTest ?? null;
    if (!meta || !meta.lastRunAt) {
      return { ok: false, reason: "Run Test required (no recent test)" };
    }
    const age = Date.now() - new Date(meta.lastRunAt).getTime();
    if (!Number.isFinite(age) || age > 10 * 60 * 1000) {
      return { ok: false, reason: "Run Test is older than 10 minutes" };
    }
    if (meta.blockingIssueCount > 0 || meta.health === "fix_required") {
      return { ok: false, reason: "Fix blocking issues before publishing" };
    }
    return { ok: true };
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">HiveLab</h1>
          <p className="text-muted-foreground">Create and manage tools to help your spaces coordinate.</p>
        </div>
        <Button onClick={() => createTool()} disabled={isPending}>
          New Tool
        </Button>
      </div>

      <Tabs defaultValue="owned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="owned">My Tools ({dashboard.owned.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({dashboard.drafts.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({dashboard.templates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="owned">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dashboard.owned.map((tool) => {
              const publishGate = isPublishGateSatisfied(tool);
              return (
                <Card key={tool.id} className="border-border/70 bg-card/90">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{tool.name}</span>
                      <Badge variant="outline">{tool.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Text variant="muted">{tool.description}</Text>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Visibility: {tool.visibility}</span>
                      <span>Uses: {tool.uses}</span>
                      <span>Version v{tool.version ?? 0}</span>
                      {tool.status === "limited_run" && formatLimitedRunCountdown(tool.limitedRunEndsAt) ? (
                        <span>{formatLimitedRunCountdown(tool.limitedRunEndsAt)}</span>
                      ) : null}
                      {tool.lastTest ? <span>{formatLastTest(tool)}</span> : <span>Run Test required</span>}
                    </div>
                    <div className="flex gap-2">
                      {tool.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() => publishTool(tool.id, "limited_run")}
                          disabled={isPending || !publishGate.ok}
                          title={!publishGate.ok ? publishGate.reason : undefined}
                        >
                          Start limited run
                        </Button>
                      )}
                      {tool.status === "limited_run" && (
                        <Button
                          size="sm"
                          onClick={() => publishTool(tool.id, "certified")}
                          disabled={isPending || !publishGate.ok}
                          title={!publishGate.ok ? publishGate.reason : undefined}
                        >
                          Certify tool
                        </Button>
                      )}
                      {tool.status !== "draft" && (
                        <Button size="sm" variant="secondary" disabled>
                          {tool.status === "limited_run" ? "Limited run" : "Certified"}
                        </Button>
                      )}
                      {(tool.status === "limited_run" || tool.status === "certified") && tool.visibility !== "public" && (
                        <Button size="sm" variant="ghost" onClick={() => setVisibility(tool.id, "public")} disabled={isPending}>
                          Make Public
                        </Button>
                      )}
                    </div>
                    {!publishGate.ok ? (
                      <div className="text-xs text-red-500">{publishGate.reason}</div>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
            {dashboard.owned.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  Start with a template to build your first tool.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dashboard.drafts.map((tool) => (
              <Card key={tool.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{tool.name}</span>
                    <Badge variant="outline">draft</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Text variant="muted">{tool.description}</Text>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => publishTool(tool.id, "limited_run")} disabled={isPending}>
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dashboard.templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    {template.category ? <Badge variant="outline">{template.category}</Badge> : null}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Text variant="muted">{template.description}</Text>
                  <Button size="sm" onClick={() => createTool(template.id)} disabled={isPending}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
