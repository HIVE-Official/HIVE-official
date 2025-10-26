"use client";

// Bounded Context Owner: HiveLab Guild
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Sparkles } from "lucide-react";
import { BaseWidget } from "@/organisms/spaces/widgets/base-widget";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/utils/cn";

export interface UsagePoint {
  readonly date: string;
  readonly responses: number;
  readonly completions?: number;
}

export interface UsageRangeOption {
  readonly id: string;
  readonly label: string;
  readonly days: number;
}

export interface ToolUsageWidgetProps {
  readonly toolName: string;
  readonly data: readonly UsagePoint[];
  readonly rangeOptions?: readonly UsageRangeOption[];
  readonly defaultRangeId?: string;
  readonly highlight?: string;
  readonly onRangeChange?: (rangeId: string) => void;
}

const DEFAULT_RANGES: readonly UsageRangeOption[] = [
  { id: "90d", label: "Last 3 months", days: 90 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "7d", label: "Last 7 days", days: 7 },
];

const DEFAULT_CHART_CONFIG: ChartConfig = {
  responses: {
    label: "Responses captured",
    color: "#ffd700",
  },
  completions: {
    label: "Completed actions",
    color: "rgba(255,215,0,0.65)",
  },
};

const REFERENCE_DATE = new Date("2024-06-30");

export function ToolUsageWidget({
  toolName,
  data,
  rangeOptions = DEFAULT_RANGES,
  defaultRangeId = "30d",
  highlight,
  onRangeChange,
}: ToolUsageWidgetProps) {
  const [rangeId, setRangeId] = React.useState(defaultRangeId);
  const activeRange = rangeOptions.find((option) => option.id === rangeId) ?? rangeOptions[0];
  const filteredData = React.useMemo(() => {
    if (!activeRange) {
      return data;
    }
    const startDate = new Date(REFERENCE_DATE);
    startDate.setDate(startDate.getDate() - activeRange.days);
    return data.filter((point) => new Date(point.date) >= startDate);
  }, [data, activeRange]);

  const hasData = filteredData.length > 0;

  const handleRangeChange = (value: string) => {
    setRangeId(value);
    onRangeChange?.(value);
  };

  return (
    <BaseWidget
      title="USAGE"
      headerHint={toolName}
      icon={<Sparkles className="h-4 w-4" aria-hidden />}
      accent="warning"
      backgroundLabel="ENGAGE"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {highlight ? <p className="text-body-sm font-body-sm text-gold-contrast">{highlight}</p> : <span className="text-body-sm font-body-sm text-muted-foreground/80">Responses and completions over time</span>}
          <Select value={rangeId} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[160px] border-gold-role/32 bg-gold-soft text-gold-contrast" aria-label="Select time range">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {rangeOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasData ? (
          <ChartContainer config={DEFAULT_CHART_CONFIG} className="aspect-auto h-[220px] w-full rounded-2xl border border-gold-role/25 bg-[hsl(var(--background)/0.9)] p-2">
            <AreaChart data={Array.from(filteredData)}>
              <defs>
                <linearGradient id="fillResponses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--gold))" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="hsl(var(--gold))" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="fillCompletions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--gold) / 0.6)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="hsl(var(--gold) / 0.6)" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-border/50" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={28}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                  />
                }
              />
              <Area dataKey="responses" type="natural" fill="url(#fillResponses)" stroke="hsl(var(--gold))" strokeWidth={2} />
              <Area dataKey="completions" type="natural" fill="url(#fillCompletions)" stroke="hsl(var(--gold) / 0.7)" strokeWidth={2} />
              <ChartLegend content={<ChartLegendContent className="pt-2 text-muted-foreground/75" />} />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gold-role/25 bg-gold-soft px-6 py-10 text-center text-body-sm font-body-sm text-muted-foreground/80">
            We&apos;ll start charting engagement once members use this tool.
          </div>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-2 text-body-xs font-body-xs text-muted-foreground/70">
          <span>Range · {activeRange.label}</span>
          <span>Data as of {REFERENCE_DATE.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </footer>
      </div>
    </BaseWidget>
  );
}
