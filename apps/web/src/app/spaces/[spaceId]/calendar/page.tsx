import * as React from 'react';

export const dynamic = 'force-static';

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildMonthGrid(date = new Date()) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7)); // Monday-start grid
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

export default function SpaceCalendarPage() {
  const today = new Date();
  const days = buildMonthGrid(today);

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Space Calendar</h1>
        <p className="text-[color:var(--hive-text-secondary)]">Lightweight SSR calendar for this space.</p>
      </header>
      <section className="overflow-hidden rounded-xl border border-[color:var(--hive-border-subtle)]">
        <div className="grid grid-cols-7 bg-[color:var(--hive-background-tertiary)] text-xs text-[color:var(--hive-text-secondary)]">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <div key={d} className="px-3 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d) => {
            const inMonth = d.getMonth() === today.getMonth();
            const isToday = dayKey(d) === dayKey(today);
            return (
              <div key={dayKey(d)} className={"min-h-[92px] border-b border-r border-[color:var(--hive-border-subtle)] p-2 text-sm " + (!inMonth ? 'opacity-45' : '')}>
                <div className={"mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs " + (isToday ? 'bg-[color:var(--hive-brand-primary)] text-[var(--hive-text-inverse)]' : 'text-[color:var(--hive-text-secondary)]')}>{d.getDate()}</div>
                {/* Placeholder events */}
                {Math.random() < 0.12 && (
                  <div className="mt-1 truncate rounded-md bg-[color:var(--hive-brand-primary)]/15 px-2 py-1 text-xs text-[color:var(--hive-text-primary)]">Meeting · 7p</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

