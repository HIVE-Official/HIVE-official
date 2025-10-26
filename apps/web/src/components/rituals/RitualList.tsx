// Bounded Context Owner: Rituals Guild
"use client";
export interface RitualListItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly cadence: "daily" | "weekly";
  readonly timeOfDay: string;
  readonly daysOfWeek: readonly number[];
  readonly participants: number;
}

const daysLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function RitualList({ rituals }: { rituals: readonly RitualListItem[] }): JSX.Element {
  if (rituals.length === 0) return <div className="text-muted-foreground">No rituals yet.</div>;
  return (
    <div className="space-y-4">
      {rituals.map((r) => (
        <article key={r.id} className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{r.name}</h3>
            <div className="text-xs text-muted-foreground">{r.participants} joined</div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {r.cadence === "daily" ? (
              <span>Daily at {r.timeOfDay}</span>
            ) : (
              <span>
                {r.daysOfWeek.map((d) => daysLabel[d]).join(" · ")} at {r.timeOfDay}
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
