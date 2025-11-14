import * as React from "react";

import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Button } from "../../atomic/00-Global/atoms/button";
import { Surface } from "../../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/00-Global/atoms/tabs";
import { cn } from "@/lib/utils";

export interface HiveLabWorkflow {
  id: string;
  name: string;
  description: string;
  status: "draft" | "live" | "paused";
  updatedAt: string;
  owner: string;
  metrics: Array<{ label: string; value: string }>;
  tags?: string[];
}

export interface HiveLabExperiment {
  id: string;
  title: string;
  summary: string;
  author: string;
  campusSpace: string;
  createdAt: string;
}

export interface HiveLabToolsPageProps {
  campusName?: string;
  workflows?: HiveLabWorkflow[];
  experiments?: HiveLabExperiment[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLaunchClick?: () => void;
}

const STATUS_TONE: Record<HiveLabWorkflow["status"], string> = {
  draft: "bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-secondary,#c5c7d8)]",
  live: "bg-[rgba(34,197,94,0.15)] text-[var(--hive-status-success-text,#bff3cb)]",
  paused: "bg-[rgba(244,114,182,0.15)] text-[var(--hive-status-warning-text,#fddbe8)]",
};

const DEFAULT_WORKFLOWS: HiveLabWorkflow[] = [
  {
    id: "wf-campus-shuttle",
    name: "Campus shuttle board",
    description: "Live shuttle tracking with alerts for slow routes. Syncs to Spaces.",
    status: "live",
    updatedAt: "Updated 2h ago",
    owner: "Laney Fraass",
    metrics: [
      { label: "Active riders", value: "312" },
      { label: "Response time", value: "1.2s" },
    ],
    tags: ["Transit", "Realtime"],
  },
  {
    id: "wf-supply-drop",
    name: "Activity supply drop",
    description: "Automated checkout of tools across labs and makerspaces.",
    status: "draft",
    updatedAt: "Draft saved 35m ago",
    owner: "UB Founders",
    metrics: [
      { label: "Requests", value: "42" },
      { label: "Approvers", value: "5" },
    ],
    tags: ["Logistics"],
  },
  {
    id: "wf-event-feedback",
    name: "Event feedback ritual",
    description: "Collects live responses during rituals with positive nudges.",
    status: "paused",
    updatedAt: "Paused yesterday",
    owner: "Cultural Mosaic",
    metrics: [
      { label: "Sessions", value: "18" },
      { label: "Avg response", value: "2m" },
    ],
    tags: ["Rituals"],
  },
];

const DEFAULT_EXPERIMENTS: HiveLabExperiment[] = [
  {
    id: "exp-ritual-reminders",
    title: "Ritual reminder sequences",
    summary: "Tests cadence for multi-phase events across builder spaces.",
    author: "UB Robotics",
    campusSpace: "Robotics Collective",
    createdAt: "Today",
  },
  {
    id: "exp-civic-hud",
    title: "Civic service HUD",
    summary: "Aggregates campus service projects with campus-owned opt-in flows.",
    author: "Sustainability Studio",
    campusSpace: "Impact & Civic",
    createdAt: "2 days ago",
  },
];

export function HiveLabToolsPage({
  campusName = "UB",
  workflows = DEFAULT_WORKFLOWS,
  experiments = DEFAULT_EXPERIMENTS,
  activeTab = "workflows",
  onTabChange,
  onLaunchClick,
}: HiveLabToolsPageProps) {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#05060b)] text-[var(--hive-text-primary,#f7f7ff)]">
      <div className="border-b border-[var(--hive-border-subtle,#161827)] bg-[var(--hive-background-secondary,#0e1019)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--hive-text-muted,#8d93a7)]">
              HiveLab · {campusName} campus
            </p>
            <h1 className="text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
              Ship campus tools with student energy
            </h1>
            <p className="text-sm text-[var(--hive-text-secondary,#c5c8d8)]">
              Manage workflows, launch experiments, and link everything to campus spaces.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">Import flow</Button>
            <Button variant="primary">Create workflow</Button>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <section className="space-y-6">
          <Surface className="rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
              <TabsList className="bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#8d93a7)]" variant="pills">
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="experiments">Experiments</TabsTrigger>
                <TabsTrigger value="library">Library</TabsTrigger>
              </TabsList>
              <TabsContent value="workflows">
                <div className="mt-6 space-y-5">
                  {workflows.map((workflow) => (
                    <article
                      key={workflow.id}
                      className="space-y-4 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] px-5 py-4"
                    >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                            {workflow.name}
                          </h3>
                          <p className="text-xs text-[var(--hive-text-secondary,#c5c7d8)]">{workflow.description}</p>
                        </div>
                        <Badge
                          tone="contrast"
                          className={cn(
                            "border-none text-xs font-semibold uppercase tracking-[0.24em]",
                            STATUS_TONE[workflow.status],
                          )}
                        >
                          {workflow.status}
                        </Badge>
                      </header>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--hive-text-muted,#8d93a7)]">
                        <span>{workflow.updatedAt}</span>
                        <span>Owner · {workflow.owner}</span>
                        {workflow.tags?.map((tag) => (
                          <Badge key={tag} tone="muted" variant="pill">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {workflow.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-2xl bg-[rgba(255,255,255,0.03)] px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]">
                              {metric.label}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="secondary">
                          Edit flow
                        </Button>
                        <Button size="sm" variant="ghost">
                          View analytics
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="experiments">
                <div className="mt-6 space-y-4">
                  {experiments.map((experiment) => (
                    <article
                      key={experiment.id}
                      className="space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] px-5 py-4"
                    >
                      <header className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                            {experiment.title}
                          </h3>
                          <p className="text-xs text-[var(--hive-text-secondary,#c5c7d8)]">{experiment.summary}</p>
                        </div>
                        <Badge tone="muted" variant="pill">
                          {experiment.campusSpace}
                        </Badge>
                      </header>
                      <div className="flex flex-wrap gap-4 text-xs text-[var(--hive-text-muted,#8d93a7)]">
                        <span>Author · {experiment.author}</span>
                        <span>Created · {experiment.createdAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          Review experiment
                        </Button>
                        <Button size="sm" variant="ghost">
                          Duplicate
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="library">
                <div className="mt-6 space-y-3 text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
                  <p>Browse student-built templates, automations, and rituals ready for campus deployment.</p>
                  <Button variant="secondary">Open template library</Button>
                </div>
              </TabsContent>
            </Tabs>
          </Surface>
        </section>

        <aside className="space-y-6">
          <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Quick actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-between" variant="secondary" onClick={onLaunchClick}>
                Launch on campus
              </Button>
              <Button className="w-full justify-between" variant="ghost">
                Configure data source
              </Button>
              <Button className="w-full justify-between" variant="ghost">
                Share with space
              </Button>
            </div>
          </Surface>

          <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Workflow health</h3>
            <div className="space-y-3 text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
              <p>Live flows healthy: <strong className="text-[var(--hive-text-primary,#f5f5ff)]">4</strong></p>
              <p>Alerts: <strong className="text-[var(--hive-text-primary,#f5f5ff)]">0</strong></p>
              <p>Queue time: <strong className="text-[var(--hive-text-primary,#f5f5ff)]">1.2s</strong></p>
            </div>
            <Button variant="secondary" className="w-full">
              View analytics
            </Button>
          </Surface>
        </aside>
      </main>
    </div>
  );
}
