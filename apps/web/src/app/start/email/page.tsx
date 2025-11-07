"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@hive/ui";
import { loadSelectedCampus, saveEmail, generateOtp, saveOtp } from "@/lib/start-flow";

export default function StartEmailPage(): JSX.Element {
  const router = useRouter();
  const campus = loadSelectedCampus();

  useEffect(() => {
    if (!campus) router.replace("/start");
  }, [campus, router]);

  const [userPart, setUserPart] = useState("");
  const [error, setError] = useState<string | null>(null);
  const domain = campus?.domain ?? "";

  const email = useMemo(() => (userPart ? `${userPart}@${domain}` : ""), [userPart, domain]);

  function handleSend() {
    if (!campus) return;
    if (!userPart || !/^[^\s@]+$/.test(userPart)) {
      setError("Enter the first part of your campus email (before the @).");
      return;
    }
    setError(null);
    saveEmail(email);
    const code = generateOtp();
    const now = Date.now();
    saveOtp({ code, sentAt: now, expiresAt: now + 5 * 60_000, resendAvailableAt: now + 30_000, email });
    router.push("/start/verify");
  }

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
          Step 2 of 4
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold leading-tight">
            Sign in with your campus email
          </h1>
          <p className="text-white/70">
            We only accept verified .edu accounts so every profile is tied to a real student. We never share your email publicly.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-white/80">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">
            Campus selected
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            {campus?.name ?? "Select a campus"}
          </div>
          <div className="text-xs text-white/50">@{domain}</div>
          <button
            type="button"
            onClick={() => router.push("/start")}
            className="mt-4 inline-flex items-center text-xs text-white/60 underline underline-offset-2 hover:text-white"
          >
            Change campus
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-white/60" htmlFor="campus-email">
            Campus email address
          </label>
          <div className={`flex items-center gap-2 rounded-2xl border ${error ? "border-red-400/60" : "border-white/15"} bg-black/40 px-4 py-3`}>
            <input
              id="campus-email"
              autoFocus
              data-testid="start-email-input"
              className="w-full bg-transparent py-2 text-base text-white placeholder:text-white/40 focus:outline-none"
              placeholder="your.name"
              value={userPart}
              onChange={(e) => setUserPart(e.target.value.trim())}
            />
            <span className="select-none text-sm text-white/50">@{domain}</span>
          </div>
          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="status" aria-live="polite">
              {error}
            </div>
          ) : (
            <p className="text-xs text-white/45">Only your university can issue this email. We never send spam.</p>
          )}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <a href="mailto:privacy@hive.college" className="text-sm text-white/70 underline underline-offset-2 hover:text-white">
          Trouble signing in? Contact us
        </a>
        <Button size="lg" variant="primary" onClick={handleSend} data-testid="start-send-code">
          Send 6-digit code
        </Button>
      </div>

      <p className="text-xs text-white/45">
        Tip: We’ll remember this trusted device for 7 days so you don’t have to enter a code every time.
      </p>
    </main>
  );
}
