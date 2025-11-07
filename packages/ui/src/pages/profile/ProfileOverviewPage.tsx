import * as React from "react";

import { Badge } from "../../atomic/atoms/badge";
import { Button } from "../../atomic/atoms/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../atomic/atoms/avatar";
import { Surface } from "../../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/atoms/tabs";
import { cn } from "../../lib/utils";

export interface ProfileHighlight {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  icon?: string;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileExperience {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface ProfileOverviewPageProps {
  campusName?: string;
  userName?: string;
  handle?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  pronouns?: string;
  program?: string;
  badges?: string[];
  stats?: ProfileStat[];
  highlights?: ProfileHighlight[];
  experiences?: ProfileExperience[];
  spaces?: Array<{ id: string; name: string; role: string }>;
}

const DEFAULT_STATS: ProfileStat[] = [
  { label: "Spaces", value: "12" },
  { label: "Rituals hosted", value: "38" },
  { label: "Tools launched", value: "5" },
  { label: "Mentors", value: "3" },
];

const DEFAULT_HIGHLIGHTS: ProfileHighlight[] = [
  {
    id: "highlight-1",
    title: "Launched nightly robotics lab",
    description: "Scaled to 45 students per sprint with HiveLab automations.",
    timestamp: "This week",
    category: "Ritual",
    icon: "🤖",
  },
  {
    id: "highlight-2",
    title: "Published campus service board tool",
    description: "500+ students tracking service opportunities.",
    timestamp: "2 weeks ago",
    category: "HiveLab",
    icon: "🛠️",
  },
];

const DEFAULT_EXPERIENCES: ProfileExperience[] = [
  {
    id: "exp-1",
    title: "Student Lead · UB Robotics Collective",
    subtitle: "Tonight at UB · Campus builder program",
    period: "2023 — Present",
    description: "Scaled the Robotics Collective with weekly rituals, mobile-first scheduling, and sponsor integrations.",
    tags: ["Ritual Host", "Builder", "Live"],
  },
  {
    id: "exp-2",
    title: "Fellow · HiveLab Campus Tools",
    subtitle: "HiveLab Studio",
    period: "2024 — Present",
    description: "Designed and shipped student-run automation flows for campus housing, scholarships, and rideshare boards.",
    tags: ["HiveLab", "Automation"],
  },
];

const DEFAULT_SPACES = [
  { id: "space-robotics", name: "UB Robotics Collective", role: "Lead" },
  { id: "space-founders", name: "UB Founders", role: "Co-lead" },
  { id: "space-service", name: "Campus Service Lab", role: "Mentor" },
];

export function ProfileOverviewPage({
  campusName = "UB",
  userName = "Laney Fraass",
  handle = "laney",
  avatarUrl,
  avatarFallback = "LF",
  pronouns = "she/her",
  program = "Student Lead · Robotics & HiveLab Fellow",
  badges = ["Builder", "Verified Host", "Student-run"],
  stats = DEFAULT_STATS,
  highlights = DEFAULT_HIGHLIGHTS,
  experiences = DEFAULT_EXPERIENCES,
  spaces = DEFAULT_SPACES,
}: ProfileOverviewPageProps) {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)]">
      <div className="h-52 w-full bg-[radial-gradient(circle_at_top,#2f2160,transparent)]" aria-hidden />
      <div className="relative -mt-20">
        <Surface className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-8 md:flex-row md:items-end">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-5">
              <Avatar className="h-28 w-28 border-4 border-[rgba(255,214,102,0.35)] shadow-xl">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={userName} />
                ) : (
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8d93a7)]">
                  {campusName} campus profile
                </p>
                <h1 className="text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{userName}</h1>
                <p className="text-sm text-[var(--hive-text-secondary,#c4c7d8)]">
                  @{handle} · {pronouns}
                </p>
                <p className="mt-2 text-sm text-[var(--hive-text-secondary,#c4c7d8)]">{program}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge} tone="contrast" variant="pill">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Message</Button>
            <Button variant="ghost">Share profile</Button>
            <Button variant="primary">Invite to ritual</Button>
          </div>
        </Surface>
      </div>

      <main className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <section className="space-y-6">
          <Surface className="rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <Tabs defaultValue="highlights">
              <TabsList className="bg-[var(--hive-background-tertiary,#181a27)] text-[var(--hive-text-muted,#8d93a7)]" variant="pills">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="highlights">
                <ul className="mt-6 space-y-5">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight.id}
                      className="flex items-start gap-4 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4"
                    >
                      <span aria-hidden className="text-xl">
                        {highlight.icon ?? "✨"}
                      </span>
                      <div className="flex-1 space-y-2">
                        <header className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                            {highlight.title}
                          </h3>
                          <Badge tone="muted" variant="pill">
                            {highlight.category}
                          </Badge>
                        </header>
                        <p className="text-sm text-[var(--hive-text-secondary,#c5c7d6)]">
                          {highlight.description}
                        </p>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8d93a7)]">
                          {highlight.timestamp}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="timeline">
                <ul className="mt-6 space-y-6">
                  {experiences.map((experience) => (
                    <li
                      key={experience.id}
                      className="space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4"
                    >
                      <header className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                            {experience.title}
                          </h3>
                          <p className="text-xs text-[var(--hive-text-secondary,#c3c5d6)]">{experience.subtitle}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8d93a7)]">
                          {experience.period}
                        </p>
                      </header>
                      <p className="text-sm text-[var(--hive-text-secondary,#c5c7d6)]">{experience.description}</p>
                      {experience.tags && experience.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {experience.tags.map((tag) => (
                            <Badge key={tag} tone="muted" variant="pill">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="activity">
                <div className="mt-6 space-y-4 text-sm text-[var(--hive-text-secondary,#c5c7d6)]">
                  <p>Laney has been active in HiveLab, Robotics Collective, and UB Founders this week.</p>
                  <p>Campus prompts: responded to 4 onboarding nudges · Mentoring 3 new tool builders.</p>
                </div>
              </TabsContent>
            </Tabs>
          </Surface>
        </section>

        <aside className="space-y-6">
          <Surface className="rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Campus stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Spaces</h3>
            <ul className="space-y-3">
              {spaces.map((space) => (
                <li
                  key={space.id}
                  className="flex items-center justify-between rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{space.name}</p>
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]">{space.role}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs uppercase tracking-[0.24em]">
                    View
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full">
              Manage spaces
            </Button>
          </Surface>
        </aside>
      </main>
    </div>
  );
}

