"use client";
// Bounded Context Owner: HiveLab Guild
import { useMemo, useState } from "react";
import type { HTMLAttributes } from "react";
import { Star, Users, Clock, Layers, Tag, Wand2 } from "lucide-react";
import { Card } from "@/atoms/card";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { Input } from "@/atoms/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import type { HiveLabTemplate, HiveLabToolCategory } from "./types";
import { HIVELAB_CATEGORIES } from "./types";

export interface TemplateBrowserProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  readonly templates: readonly HiveLabTemplate[];
  readonly onSelectTemplate?: (template: HiveLabTemplate) => void;
  readonly featuredTemplateIds?: readonly string[];
  readonly defaultCategory?: HiveLabToolCategory | "all";
  readonly onCreateBlank?: () => void;
  readonly onGenerateTemplate?: () => void;
}

const complexityBadge: Record<NonNullable<HiveLabTemplate["complexity"]>, string> = {
  starter: "bg-success/15 text-success border-success/30",
  intermediate: "bg-warning/15 text-warning border-warning/30",
  advanced: "bg-destructive/12 text-destructive border-destructive/30",
};

const categoryLabel = (category: HiveLabToolCategory) => HIVELAB_CATEGORIES.find((entry) => entry.id === category)?.label ?? category;

const formatRelativeDate = (value?: Date | string) => {
  if (!value) {
    return "Recently updated";
  }
  if (value instanceof Date) {
    return `Updated ${value.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
  }
  return value;
};

export function TemplateBrowser({
  templates,
  onSelectTemplate,
  featuredTemplateIds = [],
  defaultCategory = "all",
  onCreateBlank,
  onGenerateTemplate,
  className,
  ...props
}: TemplateBrowserProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<HiveLabToolCategory | "all">(defaultCategory);

  const featuredSet = useMemo(() => new Set(featuredTemplateIds), [featuredTemplateIds]);

  const categories = useMemo(() => {
    const counts = templates.reduce<Record<string, number>>((acc, template) => {
      acc[template.category] = (acc[template.category] ?? 0) + 1;
      return acc;
    }, {});
    return [{ id: "all" as const, label: "All templates", count: templates.length }, ...HIVELAB_CATEGORIES.map((entry) => ({ id: entry.id, label: entry.label, description: entry.description, count: counts[entry.id] ?? 0 }))];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) => {
      const matchesCategory = category === "all" || template.category === category;
      if (!matchesCategory) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        template.authorName.toLowerCase().includes(query)
      );
    });
  }, [category, search, templates]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className={cn(brand.surface.bento({ accent: "gold" }), "border border-[hsl(var(--border)/0.35)] p-6 shadow-[0_20px_45px_rgba(15,23,42,0.18)]") }>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-caption font-caption uppercase tracking-[0.24em] text-muted-foreground/80">
              <Layers className="h-4 w-4 text-gold-contrast" aria-hidden />
              HiveLab Templates
            </div>
            <h2 className="text-h3 font-h3 text-foreground">Start with a spark, not a blank canvas</h2>
            <p className="max-w-2xl text-body-sm font-body-sm text-muted-foreground/85">
              Every template is grounded in real campus rituals—pick one to launch in minutes or remix it into something distinctly yours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full border border-gold-role/32 bg-gold-soft text-gold-contrast">
              {featuredSet.size} featured
            </Badge>
            <Badge variant="outline" className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.72)] text-muted-foreground">
              {templates.length} templates
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by purpose, author, or tag"
              aria-label="Search templates"
              className="pl-10"
            />
            <Star className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" aria-hidden />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onGenerateTemplate ? (
              <Button variant="outline" className="gap-2 text-gold-contrast hover:bg-gold-soft" onClick={onGenerateTemplate}>
                <Wand2 className="h-4 w-4" aria-hidden />
                Generate with AI
              </Button>
            ) : null}
            {onCreateBlank ? (
              <Button variant="ghost" className="text-muted-foreground/80 hover:text-foreground" onClick={onCreateBlank}>
                Start from blank tool
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <Tabs value={category} onValueChange={(value) => setCategory(value as HiveLabToolCategory | "all")} className="space-y-4">
        <TabsList className="flex w-full flex-wrap justify-start gap-2">
          {categories.map((entry) => (
            <TabsTrigger key={entry.id} value={entry.id} className="gap-2">
              {entry.label}
              <span className="rounded-full bg-muted/40 px-2 py-0.5 text-body-xs font-body-xs text-muted-foreground/75">{entry.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredTemplates.length === 0 ? (
        <Card className="border border-dashed border-gold-role/25 bg-gold-soft p-12 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-3">
            <Layers className="h-6 w-6 text-muted-foreground/70" aria-hidden />
            <h3 className="text-h4 font-h4 text-foreground">No templates in this slice</h3>
            <p className="text-body-sm font-body-sm text-muted-foreground/80">
              We&apos;re curating more templates for {categoryLabel(category === "all" ? "automation" : category)}. Try another category or build from scratch.
            </p>
            <Button variant="outline" className="mt-2" onClick={onCreateBlank}>
              Start from blank tool
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} featured={featuredSet.has(template.id)} onSelect={onSelectTemplate} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TemplateCardProps {
  readonly template: HiveLabTemplate;
  readonly featured?: boolean;
  readonly onSelect?: (template: HiveLabTemplate) => void;
}

function TemplateCard({ template, featured = false, onSelect }: TemplateCardProps) {
  const { name, description, authorAvatar, authorName, installCount, rating, updatedAt, tags = [], complexity = "starter" } = template;

  return (
    <Card
      className={cn(
        brand.surface.bento({ accent: featured ? "gold" : "slate" }),
        "flex h-full flex-col justify-between gap-5 border border-[hsl(var(--border)/0.35)] p-5 transition hover:-translate-y-1 hover:border-primary/40"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-h4 font-h4 text-foreground">{name}</h3>
              <Badge variant="outline" className="border border-border/60 bg-muted/10 text-muted-foreground">
                {categoryLabel(template.category)}
              </Badge>
              {featured ? (
                <Badge variant="secondary" className="border border-amber-400/40 bg-amber-100/20 text-amber-600">
                  Featured
                </Badge>
              ) : null}
              <Badge variant="outline" className={cn("border px-2 py-0.5 text-[11px] uppercase tracking-[0.18em]", complexityBadge[complexity])}>
                {complexity}
              </Badge>
            </div>
            <p className="text-body-sm font-body-sm text-muted-foreground/85">{description}</p>
          </div>
          {authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element -- Storybook surface
            <img
              src={authorAvatar}
              alt={`${authorName} avatar`}
              className="h-10 w-10 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
            />
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-body-xs font-body-xs text-muted-foreground/80 uppercase tracking-[0.18em]">
          <Tag className="h-3.5 w-3.5 text-primary/80" aria-hidden />
          {tags.length > 0 ? tags.join(" · ") : "Ready to configure"}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 text-body-sm font-body-sm text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary/80" aria-hidden />
            {installCount.toLocaleString()} installs
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" aria-hidden />
            {rating.toFixed(1)} rating
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground/65" aria-hidden />
            {formatRelativeDate(updatedAt)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button size="sm" className="gap-2" onClick={() => onSelect?.(template)}>
            Use template
          </Button>
        </div>
      </div>
    </Card>
  );
}
