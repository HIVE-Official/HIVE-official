"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@hive/ui";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

// Parse an "GMT±H[:MM]" or "UTC±H[:MM]" offset like "GMT-4" or "UTC+05:30" to minutes
function parseGmtOffsetToMinutes(name: string): number | null {
  const match = name.match(/(GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/i);
  if (!match) return null;
  const sign = match[2] === "+" ? 1 : -1;
  const hours = parseInt(match[3] ?? "0", 10);
  const minutes = parseInt(match[4] ?? "0", 10);
  return sign * (hours * 60 + minutes);
}

// Get the UTC timestamp for Nov 1, 12:00 AM in America/New_York for the current year
function getTargetUtcMsForNov1MidnightET(now: Date): number {
  const year = now.getFullYear();
  // Determine the Eastern offset for that date (handles DST automatically)
  const probe = new Date(Date.UTC(year, 10 /* Nov */, 1, 12, 0, 0)); // Midday UTC on Nov 1 for stable offset read
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "shortOffset",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = dtf.formatToParts?.(probe) ?? [];
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-4"; // Reasonable default near Nov 1
  const offsetMinutes = parseGmtOffsetToMinutes(tzName) ?? -240; // -04:00 default
  // Local(ET) -> UTC: add the absolute offset minutes when sign is negative, subtract when positive
  // Equivalently: UTC minutes = local minutes - (local offset from UTC)
  // Since offsetMinutes is e.g. -240 for GMT-4, subtracting a negative adds 240.
  const utcMs = Date.UTC(year, 10 /* Nov */, 1, 0, 0, 0) - offsetMinutes * 60 * 1000;
  return utcMs;
}

function useCountdown(targetUtcMs: number): Countdown {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, targetUtcMs - nowMs);
  const completed = remaining === 0;

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  return { days, hours, minutes, seconds, completed };
}

const schools = [
  "University at Buffalo (UB)",
  "RIT",
  "Cornell",
  "NYU",
  "Syracuse",
];

export default function PreLaunch(): JSX.Element {
  const targetUtcMs = useMemo(() => getTargetUtcMsForNov1MidnightET(new Date()), []);
  const countdown = useCountdown(targetUtcMs);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Hero */}
      <header className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center sm:pt-32">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl" data-testid="hero-headline">
          Finally YOUR campus
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-white/70" data-testid="hero-subtext">
          Built by students, for students. Quiet autonomy. Real community.
        </p>

        {/* Countdown */}
        <div className="mt-8 grid grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur" aria-live="polite" data-testid="countdown">
          {[{ label: "Days", value: countdown.days }, { label: "Hours", value: countdown.hours }, { label: "Minutes", value: countdown.minutes }, { label: "Seconds", value: countdown.seconds }].map((part) => (
            <div key={part.label} className="flex flex-col items-center">
              <div className="text-3xl font-semibold tabular-nums" data-testid={`countdown-${part.label.toLowerCase()}`}>
                {String(part.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{part.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row" data-testid="ctas">
          <Link href="/start" className="w-full sm:w-auto">
            <Button size="lg" variant="brand" className="w-full" data-testid="cta-primary">
              Get Started
            </Button>
          </Link>
          <Link href="/landing" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full" data-testid="cta-secondary">
              Learn More
            </Button>
          </Link>
        </div>
        <div className="mt-2 text-xs text-white/60">Launches Nov 1, 12:00 AM ET</div>
      </header>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/70" data-testid="schools">
            {schools.map((name, i) => (
              <li key={name} className={i === 0 ? "font-semibold text-white" : undefined}>
                {name}
              </li>
            ))}
          </ul>

          <nav className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/legal/privacy" className="hover:text-white" data-testid="footer-privacy">
              Privacy
            </Link>
            <a href="mailto:privacy@hive.college" className="hover:text-white" data-testid="footer-contact">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
