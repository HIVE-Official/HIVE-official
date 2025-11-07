"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const steps = [
  { key: "school", label: "Campus", description: "Pick your university" },
  { key: "email", label: "Email", description: "Confirm identity" },
  { key: "code", label: "Code", description: "Secure login" },
  { key: "done", label: "Done", description: "Join HIVE" },
] as const;

const heroBullets = [
  "Invite-only beta for Fall '24 campuses",
  "Verified with your .edu email",
  "Built for clubs, labs, and campus creators",
];

export default function StepLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeIndex = (() => {
    if (!pathname) return 0;
    if (pathname.startsWith("/start/email")) return 1;
    if (pathname.startsWith("/start/verify")) return 2;
    if (pathname.startsWith("/start/done")) return 3;
    return 0;
  })();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040305] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,221,137,0.12),_transparent_45%),radial-gradient(circle_at_70%_20%,_rgba(255,215,0,0.18),_transparent_40%),linear-gradient(120deg,_rgba(10,10,10,0.9),_rgba(4,4,6,0.96))]" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen" aria-hidden>
        <div className="animate-[pulse_12s_ease-in-out_infinite] bg-[radial-gradient(circle,_rgba(255,215,0,0.25),_transparent_55%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-5 text-sm text-white/70 sm:px-10">
          <span className="tracking-[0.4em] text-white/80">HIVE</span>
          <span className="hidden text-xs uppercase tracking-[0.3em] lg:block">Pre-Launch • Invite Only</span>
        </header>

        {/* Mobile stepper */}
        <div className="flex items-center justify-center gap-2 px-6 pb-4 md:hidden" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${i <= activeIndex ? "bg-white" : "bg-white/25"}`}
            />
          ))}
        </div>

        <div className="flex-1 px-4 pb-10 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="relative hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 text-sm backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.35)] lg:block">
              <div className="mb-6 text-xs uppercase tracking-[0.4em] text-white/60">Launch brief</div>
              <h2 className="text-2xl font-semibold leading-tight">Campus access for builders</h2>
              <p className="mt-3 text-white/70">
                Every student on HIVE is verified with their campus email, so your spaces stay authentic, real, and aligned with your university.
              </p>
              <ul className="mt-6 space-y-3">
                {heroBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#FFD678] to-[#F0B93A]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-5">
                {steps.map((step, index) => {
                  const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "todo";
                  return (
                    <div key={step.key} className="flex items-start gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                          state === "done"
                            ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
                            : state === "active"
                            ? "border-white/50 bg-white/10 text-white"
                            : "border-white/15 bg-white/5 text-white/50"
                        }`}
                        aria-hidden
                      >
                        {state === "done" ? "✓" : index + 1}
                      </span>
                      <div>
                        <div className="text-base font-medium">{step.label}</div>
                        <p className="text-xs text-white/60">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            <motion.section
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
            >
              {children}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
