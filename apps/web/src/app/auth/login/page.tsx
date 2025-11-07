"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthOnboardingLayout, Button, HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle, Input, HiveLogo } from "@hive/ui";
import { motion, AnimatePresence } from "framer-motion";

export const dynamic = "force-dynamic";

type Step = "school" | "email" | "sent";

interface School {
  id: string;
  name: string;
  domain: string;
  location?: string;
}

interface MagicLinkResponse {
  success?: boolean;
  error?: string;
  devMode?: boolean;
  magicLink?: string;
  message?: string;
}

const RESEND_DELAY_MS = 30_000;

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSchool: School | null = useMemo(() => {
    const id = searchParams?.get("schoolId");
    const name = searchParams?.get("schoolName");
    const domain = searchParams?.get("domain");
    if (id && name && domain) {
      return { id, name, domain };
    }
    return null;
  }, [searchParams]);

  const [step, setStep] = useState<Step>(initialSchool ? "email" : "school");
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(initialSchool);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);

  const mode = step === "sent" ? "warm" : "calm";
  const canResend = sentAt ? Date.now() - sentAt >= RESEND_DELAY_MS : true;
  const resendCountdown = sentAt ? Math.max(0, RESEND_DELAY_MS - (Date.now() - sentAt)) : 0;

  useEffect(() => {
    let active = true;

    async function fetchSchools() {
      setIsLoadingSchools(true);
      try {
        const response = await fetch("/api/schools", { credentials: "include" });
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        const formatted = (data || [])
          .filter((school: any) => school?.status === "active")
          .map((school: any) => ({
            id: school.id,
            name: school.name,
            domain: school.domain,
            location: school.location?.city
              ? `${school.location.city}, ${school.location.state ?? ""}`.trim()
              : school.location,
          }));
        if (active) {
          setSchools(formatted);
        }
      } catch (err) {
        if (active) {
          setSchools([
            {
              id: "ub",
              name: "University at Buffalo",
              domain: "buffalo.edu",
              location: "Buffalo, NY",
            },
            {
              id: "test",
              name: "Test University (Development)",
              domain: "test.edu",
              location: "Development",
            },
          ]);
        }
      } finally {
        if (active) {
          setIsLoadingSchools(false);
        }
      }
    }

    if (step === "school") {
      void fetchSchools();
    }

    return () => {
      active = false;
    };
  }, [step]);

  useEffect(() => {
    let timer: number | undefined;
    if (sentAt && !canResend) {
      timer = window.setInterval(() => {
        setSentAt((current) => (current ? current : null));
      }, 1_000);
    }
    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [sentAt, canResend]);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setStep("email");
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedSchool) {
      setError("Select your campus to continue.");
      return;
    }
    if (!email) {
      setError("Enter your campus email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, schoolId: selectedSchool.id }),
      });

      const data: MagicLinkResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || data.message || "Failed to send magic link");
      }

      setStep("sent");
      setSentAt(Date.now());
      setDevMagicLink(data.devMode ? data.magicLink ?? null : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send magic link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!selectedSchool || !email) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/resend-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, schoolId: selectedSchool.id }),
      });
      const data: MagicLinkResponse = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to resend magic link");
      }
      setSentAt(Date.now());
      setDevMagicLink(data.devMode ? data.magicLink ?? null : devMagicLink);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resend magic link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headerSlot = (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]">
        <span>&larr; Home</span>
      </Link>
      <HiveLogo size="default" variant="gradient" showText />
      <div className="w-12" />
    </div>
  );

  const footerSlot = (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--hive-text-muted)]">
      <span>
        Need help? <a className="text-[var(--hive-brand-primary)] hover:underline" href="mailto:support@hivecampus.com">support@hivecampus.com</a>
      </span>
      <div className="flex gap-3">
        <a className="hover:underline" href="/legal/terms">Terms</a>
        <a className="hover:underline" href="/legal/privacy">Privacy</a>
      </div>
    </div>
  );

  return (
    <AuthOnboardingLayout mode={mode} headerSlot={headerSlot} footerSlot={footerSlot}>
      <div className="w-full space-y-6">
        <AnimatePresence mode="wait">
          {step === "school" && (
            <motion.div
              key="school"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-[var(--hive-text-primary)]">Welcome to HIVE</h1>
                <p className="text-sm text-[var(--hive-text-secondary)]">Select your campus to continue.</p>
              </div>
              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Select your university</HiveCardTitle>
                </HiveCardHeader>
                <HiveCardContent className="space-y-3">
                  {isLoadingSchools ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-primary)]" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {schools.map((school) => (
                        <button
                          key={school.id}
                          type="button"
                          onClick={() => handleSchoolSelect(school)}
                          className="w-full rounded-xl border border-[var(--hive-border-primary)]/40 bg-[var(--hive-background-elevated)] px-4 py-3 text-left transition-colors hover:border-[var(--hive-brand-primary)]/60 hover:bg-[var(--hive-brand-primary)]/10"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-[var(--hive-text-primary)]">{school.name}</div>
                              {school.location && (
                                <div className="text-xs text-[var(--hive-text-muted)]">{school.location}</div>
                              )}
                            </div>
                            <div className="text-xs text-[var(--hive-text-secondary)]">@{school.domain}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </HiveCardContent>
              </HiveCard>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-4"
            >
              <button
                type="button"
                onClick={() => {
                  setStep("school");
                  setSelectedSchool(null);
                  setError(null);
                }}
                className="text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
              >
                &larr; Choose a different campus
              </button>

              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Sign in</HiveCardTitle>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Use your {selectedSchool?.domain ?? "campus"} email.
                  </p>
                </HiveCardHeader>
                <HiveCardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--hive-text-secondary)]" htmlFor="email">Campus email</label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={selectedSchool ? `name@${selectedSchool.domain}` : "name@campus.edu"}
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg border border-[var(--hive-status-error)]/40 bg-[var(--hive-status-error)]/10 px-4 py-2 text-sm text-[var(--hive-status-error)]">
                      {error}
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </span>
                    ) : (
                      "Send link"
                    )}
                  </Button>
                </HiveCardContent>
              </HiveCard>
            </motion.div>
          )}

          {step === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-4"
            >
              <HiveCard>
                <HiveCardHeader>
                  <HiveCardTitle>Check your inbox</HiveCardTitle>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    We sent a magic link to {email}.
                  </p>
                </HiveCardHeader>
                <HiveCardContent className="space-y-4">
                  {devMagicLink && (
                    <div className="rounded-xl border border-[var(--hive-brand-primary)]/40 bg-[var(--hive-brand-primary)]/10 px-4 py-3 text-sm">
                      <p className="mb-2 text-[var(--hive-brand-primary)] font-medium">
                        Development link (local only)
                      </p>
                      <a href={devMagicLink} className="break-all text-[var(--hive-brand-primary)] hover:underline">
                        {devMagicLink}
                      </a>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-lg border border-[var(--hive-status-error)]/40 bg-[var(--hive-status-error)]/10 px-4 py-2 text-sm text-[var(--hive-status-error)]">
                      {error}
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleResend}
                    disabled={!canResend || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </span>
                    ) : canResend ? (
                      "Send another link"
                    ) : (
                      `Resend available in ${Math.ceil(resendCountdown / 1000)}s`
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setStep("email");
                      setError(null);
                    }}
                  >
                    Use a different email
                  </Button>
                </HiveCardContent>
              </HiveCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthOnboardingLayout>
  );
}

function LoginPageFallback() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] flex items-center justify-center">
      <span className="flex items-center gap-3 text-sm text-[var(--hive-text-secondary)]">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </span>
    </div>
  );
}

function LoginPageContentSuspense() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginContent />
    </Suspense>
  );
}

export default function LoginPage() {
  return <LoginPageContentSuspense />;
}
