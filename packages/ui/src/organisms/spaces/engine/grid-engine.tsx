// Bounded Context Owner: Spaces Domain Guild
// GridCalendarEngine (Day/Week) — lightweight engine with selection + clicks and accessible grid semantics.

import * as React from "react";
import { cn } from "@/utils/cn";
import type { CalendarEvent } from "../types";
import type { CalendarEngineComponent } from "./calendar-engine";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export const GridCalendarEngine: CalendarEngineComponent = ({
  view,
  events,
  timeStepMinutes = 30,
  startHour = 8,
  endHour = 22,
  currentDate,
  onSelectSlot,
  onSelectEvent,
  className,
}) => {
  const baseDate = React.useMemo(() => (currentDate ? new Date(currentDate) : new Date()), [currentDate]);
  const baseWeekStart = React.useMemo(() => {
    const d = new Date(baseDate);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [baseDate]);
  const days = React.useMemo(() => (view === 'day' ? [0] : [0,1,2,3,4,5,6]), [view]);
  const totalSteps = ((endHour - startHour) * 60) / timeStepMinutes;

  const [selecting, setSelecting] = React.useState<{ startDay: number; startStep: number; endDay: number; endStep: number } | null>(null);

  const finalizeSelection = (startDay: number, startStep: number, endDay: number, endStep: number) => {
    if (!onSelectSlot) return;
    const dayMin = Math.min(startDay, endDay);
    const dayMax = Math.max(startDay, endDay);
    const stepMin = Math.min(startStep, endStep);
    const stepMax = Math.max(startStep, endStep);
    const start = new Date(baseWeekStart);
    start.setDate(baseWeekStart.getDate() + dayMin);
    start.setHours(startHour, stepMin * timeStepMinutes, 0, 0);
    const end = new Date(baseWeekStart);
    end.setDate(baseWeekStart.getDate() + dayMax);
    end.setHours(startHour, stepMax * timeStepMinutes, 0, 0);
    onSelectSlot({ start, end });
  };

  const handleCellMouseDown = (dayIndex: number, stepIndex: number) => setSelecting({ startDay: dayIndex, startStep: stepIndex, endDay: dayIndex, endStep: stepIndex });
  const handleCellMouseEnter = (dayIndex: number, stepIndex: number) => selecting && setSelecting({ ...selecting, endDay: dayIndex, endStep: stepIndex });
  const handleMouseUp = () => { if (selecting) finalizeSelection(selecting.startDay, selecting.startStep, selecting.endDay, selecting.endStep); setSelecting(null); };

  const sourceOf = (evt: any): 'campus' | 'space' | 'my' | 'tools' => {
    if (evt.tags && evt.tags.some?.((t: string) => /tool|deadline/i.test(t))) return 'tools';
    if (evt.userRsvp === 'going' || evt.userRsvp === 'maybe') return 'my';
    return 'space';
  };

  const renderEvent = (evt: CalendarEvent) => {
    const evtDate = new Date(evt.startTime);
    const normalized = new Date(evtDate.getFullYear(), evtDate.getMonth(), evtDate.getDate());
    const dayDiff = Math.floor((normalized.getTime() - baseWeekStart.getTime()) / 86400000);
    const col = view === 'day' ? 0 : Math.max(0, Math.min(6, dayDiff));
    const start = new Date(evt.startTime);
    const end = new Date(evt.endTime);
    const startStep = clamp(Math.floor(((start.getHours() + start.getMinutes() / 60) - startHour) * (60 / timeStepMinutes)), 0, totalSteps - 1);
    const durationSteps = Math.max(1, Math.ceil(((end.getTime() - start.getTime()) / 60000) / timeStepMinutes));
    const src = sourceOf(evt as any);
    const bg = `hsl(var(--source-${src}) / 0.10)`;
    const br = `hsl(var(--source-${src}) / 0.35)`;
    return (
      <button
        key={evt.id}
        onClick={() => onSelectEvent?.(evt)}
        className={cn("absolute left-0 right-0 rounded-md px-2 py-1 text-left anim-fade-in",
          "hover:bg-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
        style={{ gridColumn: col + 2, gridRow: startStep + 2 + " / span " + durationSteps, backgroundColor: bg, border: `1px solid ${br}`, borderLeft: `4px solid ${br}` }}
        title={evt.title}
      >
        <div className="text-caption font-semibold text-primary line-clamp-1">{evt.title}</div>
        {evt.location && (<div className="text-[11px] text-muted-foreground line-clamp-1">{evt.location}</div>)}
      </button>
    );
  };

  return (
    <div className={cn("w-full rounded-lg border border-border/60 bg-card overflow-hidden", className)} role="grid" aria-label={`${view} view calendar`} onMouseUp={handleMouseUp}>
      <div className="relative grid" style={{ gridTemplateColumns: `80px repeat(${view === 'day' ? 1 : 7}, 1fr)`, gridTemplateRows: `32px repeat(${totalSteps}, minmax(28px, 1fr))` }}>
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/65 border-b border-border/50" />
        {days.map((d) => {
          const dayDate = new Date(baseWeekStart); dayDate.setDate(baseWeekStart.getDate() + d);
          const label = view === 'day' ? baseDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : dayDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          return (<div key={d} role="columnheader" className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border/50 px-2 py-1 text-caption font-semibold">{label}</div>);
        })}

        {Array.from({ length: totalSteps }).map((_, step) => (
          <React.Fragment key={step}>
            <div role="rowheader" className="border-r border-border/50 px-2 text-[11px] text-muted-foreground flex items-start">
              {step % (60 / timeStepMinutes) === 0 ? (<span>{String(startHour + Math.floor((step * timeStepMinutes) / 60)).padStart(2, "0")}:00</span>) : (<span className="opacity-0">.</span>)}
            </div>
            {days.map((d) => (
              <button key={`${d}-${step}`} type="button" onMouseDown={() => handleCellMouseDown(d, step)} onMouseEnter={() => handleCellMouseEnter(d, step)} className={cn("relative border-b border-l border-border/30 hover:bg-muted/30", step % (60 / timeStepMinutes) === 0 && "border-border/50")} role="gridcell" aria-label={`Select ${view === 'day' ? '' : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d] + ' '} ${String(startHour + Math.floor((step * timeStepMinutes) / 60)).padStart(2, "0")}:${String((step * timeStepMinutes) % 60).padStart(2, "0")}`} />
            ))}
          </React.Fragment>
        ))}

        <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `80px repeat(${view === 'day' ? 1 : 7}, 1fr)`, gridTemplateRows: `32px repeat(${totalSteps}, minmax(28px, 1fr))` }}>
          <div />
          {days.map((d) => <div key={`h-${d}`} />)}
          {events.map(renderEvent)}
          {selecting && (
            <div className="absolute rounded-md bg-primary/15 border border-primary/30 transition-all duration-200 ease-standard" style={{ gridColumn: Math.min(selecting.startDay, selecting.endDay) + 2 + ' / span ' + (Math.abs(selecting.endDay - selecting.startDay) + 1), gridRow: Math.min(selecting.startStep, selecting.endStep) + 2 + ' / span ' + (Math.abs(selecting.endStep - selecting.startStep) + 1) }} aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
};
