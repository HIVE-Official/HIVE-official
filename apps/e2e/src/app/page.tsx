"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiveLogo, Button, Input, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, Checkbox, Text, Heading, Countdown, SearchInput, cn, useReducedMotion as useUiReducedMotion } from "@hive/ui";
import { getLandingFlags } from "../lib/landing-flags";
import type { School } from "../fixtures/schools";
import { schoolsSeed, searchSchools } from "../fixtures/schools";
import { trackCtaClick } from "@web/lib/telemetry";
import { Sparkles, Users2, Filter, Mail, ArrowRight } from "lucide-react";

// Utilities
function useDebounced<T>(value: T, delay = 250): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function LandingPage(): JSX.Element {
  // Flags are runtime-togglable via localStorage or URL params
  const flags = getLandingFlags();
  const prefersReduced = useUiReducedMotion();

  // Telemetry helper
  const telemetry = (event: string, meta?: Record<string, unknown>): void => {
    try {
      // Lightweight console event; reuse CTA payload shape when helpful
      console.log("telemetry", { event, ...meta });
    } catch {}
  };

  // Search state
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 250);
  const filtered = useMemo(() => searchSchools(debouncedQuery), [debouncedQuery]);

  // Notify modal state
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<School | null>(schoolsSeed[0]); // UB default

  // Header glass on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) >= 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryCtaLabel = flags.state === "live" ? "Enter" : "Enter your campus";
  const handlePrimaryCta = () => {
    telemetry("cta_click", { label: primaryCtaLabel, state: flags.state });
    // In prelaunch, open the school picker section
    if (flags.state === "prelaunch") {
      document.getElementById("schools")?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    } else {
      // Live → route to auth start; no school preselected
      trackCtaClick({ id: "landing_enter", href: "/login", surface: "landing", pos: "hero" });
      window.location.href = "/login";
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Ambient campus lights */}
      <AmbientLights reduced={prefersReduced} />

      {/* Top Bar */}
      <header className={cn(
        "sticky top-0 z-50",
        scrolled ? "backdrop-blur-md bg-card/70 border-b border-border/60" : "bg-transparent",
      )}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10">
          <div className="flex h-14 md:h-16 items-center justify-between">
            <a href="#top" className="inline-flex items-center gap-2 focus-ring rounded-md px-1 py-1" aria-label="Go to top">
              <HiveLogo size={20} variant="gold" aria-hidden />
              <span className="font-semibold tracking-tight">HIVE</span>
            </a>
            <nav className="flex items-center gap-2 sm:gap-4">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded px-2 py-1" onClick={() => telemetry("nav_click", { label: "about" })}>About</a>
              <a href="#builders" className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded px-2 py-1" onClick={() => telemetry("nav_click", { label: "builders" })}>For Builders</a>
              <a href="mailto:hello@joinhive.com" className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded px-2 py-1" onClick={() => telemetry("nav_click", { label: "contact" })}>Contact</a>
              <Button variant="gold" size="lg" className="ml-2" onClick={handlePrimaryCta} aria-label={primaryCtaLabel}>
                {primaryCtaLabel}
              </Button>
            </nav>
          </div>
        </div>
        {/* 1px gold keyline on scroll */}
        <div className={cn("h-[1px] w-full", scrolled ? "bg-[hsl(var(--gold))]" : "bg-transparent")} aria-hidden />
      </header>

      <main id="top" className="relative">
        {/* Hero */}
        <section className="relative min-h-[100svh] grid place-items-center">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">Finally, your campus.</h1>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-prose">
                HIVE is how students run student life—clean, calm, and on your terms.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="gold" size="lg" onClick={handlePrimaryCta} aria-label={primaryCtaLabel}>
                  {primaryCtaLabel}
                </Button>
                <a href="#schools" className="text-sm font-semibold text-gold-role hover:underline focus-ring rounded px-2 py-1" onClick={() => telemetry("cta_click", { label: "see_schools", state: flags.state })}>
                  See planned schools
                </a>
              </div>
            </div>
          </div>
          {/* Hero bottom gold keyline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--gold))]" aria-hidden />
        </section>

        {/* Manifesto Strip */}
        <section aria-labelledby="manifesto" className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10 py-8">
            <h2 id="manifesto" className="sr-only">Manifesto</h2>
            <p className="text-base sm:text-lg">Autonomy over algorithms. Clarity over chaos. HIVE belongs to students.</p>
            <div className="mt-2 h-[2px] w-24 bg-[hsl(var(--gold))]" aria-hidden />
          </div>
        </section>

        {/* Planned Schools */}
        <section id="schools" aria-labelledby="schools-heading" className="py-16 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 id="schools-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight">Planned schools</h2>
                <p className="mt-1 text-muted-foreground">Find your campus. UB is first wave.</p>
              </div>
            </div>
            <div className="mt-6">
              <SearchInput
                placeholder="Find your campus"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-xl"
                onClear={() => setQuery("")}
              />
            </div>

            {/* Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((s, idx) => (
                <SchoolCard
                  key={s.slug}
                  school={s}
                  idx={idx}
                  flagsState={flags.state}
                  onNotify={() => { setSelectedCampus(s); setNotifyOpen(true); telemetry("notify_opened", { campus: s.slug }); }}
                />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-xl border border-border bg-card/60 p-6 text-center">
                <p className="text-sm text-muted-foreground">Don’t see your campus?</p>
                {flags.schoolsRequestEnabled ? (
                  <Button className="mt-3" onClick={() => { setRequestOpen(true); telemetry("request_opened", {}); }}>Request my campus</Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {/* Why HIVE */}
        <section id="about" aria-labelledby="why-heading" className="py-16 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10">
            <h2 id="why-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight">Why HIVE</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Pillar icon={<Users2 className="h-5 w-5" />} title="Belonging" text="Find your people and show up." />
              <Pillar icon={<Filter className="h-5 w-5" />} title="Control" text="One place for the things that matter." />
              <Pillar icon={<Sparkles className="h-5 w-5" />} title="Clarity" text="Less noise. More signal." />
            </div>
          </div>
        </section>

        {/* Optional Countdown */}
        {flags.countdownEnabled ? (
          <section aria-labelledby="countdown" className="py-16 md:py-24 border-b border-border">
            <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10 text-center">
              <Heading level="h3" className="text-xl font-semibold">Next campus wave opens in:</Heading>
              <div className="mt-6">
                {/* Target uses an example 2 weeks out; can be swapped via serverNow/target inputs later */}
                <Countdown target={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)} />
              </div>
              {/* SR polite status updated once per minute */}
              <MinuteAnnouncer />
            </div>
          </section>
        ) : null}

        {/* For Builders */}
        <section id="builders" aria-labelledby="builders-heading" className="py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10">
            <h2 id="builders-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight">For builders</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Lead the next wave on your campus. We’re shaping this with student leaders who value autonomy and clarity. No tool UI here—just outcomes. Interested?
            </p>
            <a href="https://forms.gle/placeholder" className="mt-5 inline-flex items-center gap-2 text-gold-role hover:underline focus-ring rounded px-2 py-1" onClick={() => telemetry("cta_click", { label: "builders_interest" })}>
              Tell us you’re in <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Landing Footer (legal links) */}
      <footer className="border-t border-border/60 bg-background/80">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 xl:px-10 py-8 text-sm text-muted-foreground flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-foreground/80">
            <span className="font-semibold">HIVE</span>
            <span aria-hidden>•</span>
            <span>Campus OS — run by students</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/legal/privacy" className="hover:underline" onClick={() => trackCtaClick({ id: "footer_privacy", href: "/legal/privacy", surface: "landing", pos: "footer" })}>Privacy</a>
            <a href="/legal/terms" className="hover:underline" onClick={() => trackCtaClick({ id: "footer_terms", href: "/legal/terms", surface: "landing", pos: "footer" })}>Terms</a>
            {flags.schoolsRequestEnabled ? (
              <button className="hover:underline" onClick={() => { setRequestOpen(true); telemetry("request_opened", {}); }}>Request your campus</button>
            ) : null}
          </nav>
        </div>
      </footer>

      {/* Modals */}
      <NotifyDialog
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        campus={selectedCampus}
        referralsEnabled={flags.referralsEnabled}
        onSubmitted={(email, campus) => telemetry("notify_submitted", { campus: campus.slug, domain: email.split("@")[1] ?? "" })}
      />
      {flags.schoolsRequestEnabled ? (
        <RequestDialog
          open={requestOpen}
          onOpenChange={setRequestOpen}
          onSubmitted={() => telemetry("request_submitted", {})}
        />
      ) : null}
    </div>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }): JSX.Element {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-subtle">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-3 text-base">{text}</p>
    </div>
  );
}

function SchoolCard({ school, idx, flagsState, onNotify }: { school: School; idx: number; flagsState: "prelaunch" | "live"; onNotify: () => void }): JSX.Element {
  const label = (() => {
    if (flagsState === "prelaunch") {
      if (school.status === "first-wave") return "Join UB";
      if (school.status === "planned") return "Notify me";
      return "Enter";
    }
    // live
    if (school.status === "first-wave") return "Enter UB";
    if (school.status === "planned") return "Notify me";
    return "Enter";
  })();

  const isUb = school.slug === "ub";
  const badge = isUb ? "First Wave" : school.status === "planned" ? "Planned" : "Open";

  const onPrimary = () => {
    if (label.toLowerCase().includes("notify") || label.toLowerCase().includes("join")) {
      onNotify();
      return;
    }
    // Enter flow → hand off to login with optional domain/school name
    const params = new URLSearchParams();
    if (school.name) params.set("schoolName", school.name);
    if (school.domain) params.set("domain", school.domain);
    const href = `/login?${params.toString()}`;
    trackCtaClick({ id: `enter_${school.slug}`, href, surface: "landing", pos: "schools" });
    try { console.log("telemetry", { event: "enter_clicked", campus: school.slug }); } catch {}
    window.location.href = href;
  };

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${school.name} — ${badge}`}
      className="focus-ring rounded-2xl border border-border bg-card/60 p-5 shadow-subtle outline-none transition hover:shadow-level1"
      onKeyDown={(e) => { if (e.key === "Enter") onPrimary(); }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{school.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground break-words">{school.domain ? `@${school.domain}` : ""}&nbsp;</p>
        </div>
        <Badge variant={isUb ? "gold" : "default"}>{badge}</Badge>
      </div>
      <div className="mt-4">
        <Button variant={isUb ? "gold" : "default"} className="w-full" onClick={onPrimary} aria-label={label}>
          {label}
        </Button>
      </div>
    </div>
  );
}

function NotifyDialog({ open, onOpenChange, campus, referralsEnabled, onSubmitted }: { open: boolean; onOpenChange: (v: boolean) => void; campus: School | null; referralsEnabled: boolean; onSubmitted: (email: string, campus: School) => void }): JSX.Element {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [success, setSuccess] = useState(false);
  const invalid = attempted && (email.trim().length === 0 || !email.includes("@"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!campus) return;
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    // telemetry handled by caller
    setSuccess(true);
    onSubmitted(trimmed, campus);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{campus?.slug === "ub" ? "Join UB" : "Notify me"}</DialogTitle>
          <DialogDescription>
            {campus ? `We’ll email you when ${campus.name} opens.` : "We’ll email you when your campus opens."}
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="space-y-3">
            <Text variant="muted">You’re in. We’ll email you when your campus opens.</Text>
            {referralsEnabled ? (
              <div className="rounded-md border border-border/60 bg-card/60 p-3 text-sm">
                <p className="font-medium">Get early access—invite 3 friends</p>
                <a href="#referral" className="mt-1 inline-flex text-gold-role hover:underline">Copy your invite code</a>
              </div>
            ) : null}
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="notify-email" className="text-sm font-medium">Email</label>
              <Input id="notify-email" type="email" inputMode="email" placeholder={campus?.domain ? `you@${campus.domain}` : "you@school.edu"} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={invalid} aria-describedby={invalid ? "notify-email-err" : undefined} />
              {invalid ? <p id="notify-email-err" className="text-xs text-destructive">Enter a valid email</p> : <p className="text-xs text-muted-foreground">Campus email is allowed but not required.</p>}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="notify-consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
              <label htmlFor="notify-consent" className="text-sm text-muted-foreground">I agree to be contacted about early access</label>
            </div>
            <DialogFooter>
              <Button type="submit" variant="gold" className="w-full">{campus?.slug === "ub" ? "Join UB" : "Notify me"}</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RequestDialog({ open, onOpenChange, onSubmitted }: { open: boolean; onOpenChange: (v: boolean) => void; onSubmitted: () => void }): JSX.Element {
  const [campusName, setCampusName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student" | "staff" | "alumni">("student");
  const [attempted, setAttempted] = useState(false);
  const invalid = attempted && campusName.trim().length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!campusName.trim()) return;
    onSubmitted();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request my campus</DialogTitle>
          <DialogDescription>Help shape where we go next.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="request-campus" className="text-sm font-medium">Campus name</label>
            <Input id="request-campus" value={campusName} onChange={(e) => setCampusName(e.target.value)} aria-invalid={invalid} aria-describedby={invalid ? "request-campus-err" : undefined} />
            {invalid ? <p id="request-campus-err" className="text-xs text-destructive">Please enter your campus</p> : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="request-email" className="text-sm font-medium">Email</label>
            <Input id="request-email" type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" />
          </div>
          <div className="space-y-2">
            <label htmlFor="request-role" className="text-sm font-medium">Role</label>
            <select id="request-role" className="rounded-md border border-border bg-background px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as any)}>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AmbientLights({ reduced }: { reduced: boolean }): JSX.Element | null {
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35]">
        {/* 12 blurred nodes with long, subtle motion */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="absolute block h-24 w-24 rounded-full blur-xl" style={nodeStyle(i)} />
        ))}
      </div>
    </div>
  );
}

function nodeStyle(i: number): React.CSSProperties {
  const colors = ["hsl(var(--gold)/0.08)", "hsl(var(--primary)/0.08)", "hsl(var(--accent)/0.08)"];
  const rand = (seed: number, min: number, max: number) => min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min);
  const top = `${rand(i + 1, 2, 88)}%`;
  const left = `${rand(i + 7, 2, 88)}%`;
  const duration = `${Math.round(rand(i + 13, 12, 18))}s`;
  const delay = `${Math.round(rand(i + 17, 0, 6))}s`;
  return {
    top,
    left,
    background: `radial-gradient(circle at center, ${colors[i % colors.length]} 0%, transparent 70%)`,
    animation: `float-${i % 3} ${duration} ease-in-out ${delay} infinite alternate`,
  } as const;
}

function MinuteAnnouncer(): JSX.Element {
  const [minute, setMinute] = useState<number>(() => new Date().getMinutes());
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      const m = new Date().getMinutes();
      setMinute(m);
    }, 60_000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);
  return <div aria-live="polite" className="sr-only">Minute {minute}</div>;
}

// Keyframes inlined here for portability
const style = document?.createElement?.("style");
if (style) {
  style.innerHTML = `
@keyframes float-0 { from { transform: translate(-8px, -10px); } to { transform: translate(8px, 10px); } }
@keyframes float-1 { from { transform: translate(10px, -6px); } to { transform: translate(-10px, 6px); } }
@keyframes float-2 { from { transform: translate(-6px, 8px); } to { transform: translate(6px, -8px); } }
`;
  document.head.appendChild(style);
}
