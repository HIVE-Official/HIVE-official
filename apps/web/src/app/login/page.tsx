// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { Suspense, useEffect, useMemo, useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardDescription, CardHeader, CardTitle, Input, Banner, RadioGroup, RadioGroupItem, Heading, Text, useToast, useReducedMotion as useUiReducedMotion, DUR } from "@hive/ui";
import { useAuth } from "@auth";
import type { UserType } from "@core";
import { GradientBackdrop } from "../../components/layout/GradientBackdrop";
import { Container } from "../../components/layout/Container";

interface FormState {
  readonly email: string;
  readonly userType: UserType;
}

const userTypeOptions: ReadonlyArray<{
  readonly value: UserType;
  readonly label: string;
  readonly description: string;
}> = [
  {
    value: "student",
    label: "Student",
    description: "Current student using an official campus email"
  },
  {
    value: "alumni",
    label: "Alumni",
    description: "Graduated and retained your campus email"
  },
  {
    value: "faculty",
    label: "Faculty / Staff",
    description: "Faculty or staff participating in early access"
  }
];

const validationMessage = "Email must be provided";

// Use design-system Banner instead of local implementation

function LoginContent(): JSX.Element {
  const router = useRouter();
  const search = useSearchParams();
  const { state, actions } = useAuth();
  const { toast } = useToast();
  const prefersReduced = useUiReducedMotion();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    userType: "student"
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (state.email) {
      setFormState((previous) => ({ ...previous, email: state.email ?? previous.email }));
    }
  }, [state.email]);

  useEffect(() => {
    if (state.userType) {
      setFormState((previous) => ({ ...previous, userType: state.userType ?? previous.userType }));
    }
  }, [state.userType]);

  useEffect(() => {
    if (state.status === "onboarding") {
      router.replace("/onboarding");
      return;
    }
    if (state.status === "authenticated") {
      router.replace("/spaces");
    }
  }, [router, state.status]);

  const awaitingVerification = state.status === "awaitingVerification";
  const isAuthenticated = state.status === "authenticated";
  const loading = state.status === "loading";
  const errorMessage = state.status === "error" ? state.error ?? "Failed to request magic link" : null;
  const magicLinkMode = state.lastMagicLink?.mode;

  const schoolDomain = useMemo(() => {
    const d = search.get("domain");
    return d && d.includes(".") ? d : null;
  }, [search]);

  const schoolName = useMemo(() => search.get("schoolName"), [search]);

  // Friendly error surfaced from /api/auth/verify redirects
  const urlErrorKey = search.get("error");
  const urlErrorMessage = useMemo(() => {
    switch (urlErrorKey) {
      case "missing-token":
        return "Verification link is missing required information. Try requesting a new link.";
      case "invalid-link":
        return "This verification link is invalid. Request a fresh magic link to continue.";
      case "consumed":
        return "This verification link was already used. Request a new link to sign in again.";
      case "expired":
        return "Your verification link has expired. Request a new magic link to continue.";
      default:
        return null;
    }
  }, [urlErrorKey]);

  const showSchoolPrompt = !schoolName && !schoolDomain;

  const magicLinkExpiryLabel = useMemo(() => {
    const expiresAt = state.lastMagicLink?.expiresAt;
    if (!expiresAt) {
      return null;
    }
    const parsed = new Date(expiresAt);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }
    return parsed.toLocaleString();
  }, [state.lastMagicLink?.expiresAt]);

  const magicLinkHeadline = useMemo(() => {
    if (!state.email) {
      return "Magic link sent";
    }

    switch (magicLinkMode) {
      case "welcomeBack":
        return `Welcome back, we emailed ${state.email}`;
      case "resume":
        return `Resume your onboarding at ${state.email}`;
      default:
        return `Magic link sent to ${state.email}`;
    }
  }, [magicLinkMode, state.email]);

  const magicLinkSupportingText = useMemo(() => {
    const expirySuffix = magicLinkExpiryLabel
      ? ` The link expires at ${magicLinkExpiryLabel}.`
      : " The link expires shortly, so complete verification soon.";

    switch (magicLinkMode) {
      case "welcomeBack":
        return `You're already onboarded. Use the link to sign back in and we'll take you right to the latest experience.${expirySuffix}`;
      case "resume":
        return `We saved your progress—use the link to jump back into onboarding and finish your profile.${expirySuffix}`;
      default:
        return `Follow the instructions in your inbox to verify.${expirySuffix}`;
    }
  }, [magicLinkExpiryLabel, magicLinkMode]);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormState((previous) => ({
      ...previous,
      email: event.target.value
    }));
  };

  const handleUserTypeChange = (value: string): void => {
    setFormState((previous) => ({
      ...previous,
      userType: value as UserType
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setAttemptedSubmit(true);

    const email = formState.email.trim();
    if (!email) {
      return;
    }

    // lightweight telemetry: magic_link_requested
    try {
      const domain = email.includes("@") ? email.split("@")[1] : null;
      // eslint-disable-next-line no-console
      console.log("telemetry", {
        event: "magic_link_requested",
        domain,
        userType: formState.userType
      });
    } catch (error) {
      console.warn("login.telemetry.magic_link_requested_failed", error);
    }

    await actions.requestMagicLink({
      email,
      userType: formState.userType
    });
  };

  const emailInvalid = attemptedSubmit && formState.email.trim().length === 0;
  const canSubmit = formState.email.trim().length > 0 && !loading;

  // auto-poll for session while awaiting verification
  const pollTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!awaitingVerification) {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      return;
    }
    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data?.session) {
            // Refresh local session state
            await actions.restoreSession();
          }
        }
      } catch (error) {
        console.warn("login.poll.session_failed", error);
      }
      if (attempts >= 24) {
        if (pollTimerRef.current) {
          window.clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
      }
    };
    void poll();
    pollTimerRef.current = window.setInterval(() => {
      void poll();
    }, 5000);
    return () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awaitingVerification]);

  return (
    <GradientBackdrop>
      <Container className="flex min-h-screen flex-col items-center justify-center py-16">
        {/* Brand-forward header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : DUR.lg / 1000 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/70 px-3 py-1">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground">EARLY ACCESS</span>
          </div>
          <Heading level="h1" className="mt-3 text-balance sm:text-4xl">
            {schoolName ? `Continue with ${schoolName}` : "Access HIVE with your campus email"}
          </Heading>
          <Text variant="muted" className="mt-2 max-w-xl mx-auto">
            {schoolName
              ? "No passwords. We’ll send a secure magic link to your verified campus email."
              : "Choose your school, then get a secure magic link (no passwords)."}
          </Text>
        </motion.div>

        {showSchoolPrompt ? (
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : DUR.sm / 1000 }}
            className="mb-6 text-center"
          >
            <a
              href="/schools"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Select your school to continue
            </a>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : DUR.md / 1000 }}
          className="w-full max-w-2xl"
        >
        <Card className="w-full border-border/70 bg-card/80 shadow-subtle backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Get your magic link</CardTitle>
            <CardDescription>Verified campus emails only — built for trust.</CardDescription>
          </CardHeader>
          <div className="space-y-6 px-6 pb-6" aria-live="polite">
            {!awaitingVerification && !isAuthenticated && urlErrorMessage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: prefersReduced ? 0 : DUR.sm / 1000 }}>
                <Banner variant="error" title="Couldn’t verify your link" description={urlErrorMessage} />
              </motion.div>
            ) : null}
            {awaitingVerification ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: prefersReduced ? 0 : DUR.sm / 1000 }}>
                <Banner variant="info" title={magicLinkHeadline} description={magicLinkSupportingText} />
              </motion.div>
            ) : null}

            {isAuthenticated ? (
              <Banner
                variant="neutral"
                title="You’re already signed in"
                description="You can resend a link if you need to switch accounts."
              />
            ) : null}

            {errorMessage ? (
              <Banner variant="error" title="Something went wrong" description={errorMessage} />
            ) : null}

            <form className="space-y-6" onSubmit={(e) => { void handleSubmit(e); }} noValidate>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Campus email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formState.email}
                  onChange={handleEmailChange}
                  placeholder={schoolDomain ? `you@${schoolDomain}` : "you@school.edu"}
                  aria-invalid={emailInvalid}
                  aria-describedby={emailInvalid ? "email-error" : undefined}
                  disabled={loading}
                  required
                />
                {emailInvalid ? (
                  <p id="email-error" className="text-xs text-destructive">
                    {validationMessage}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {schoolDomain ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold-role/40 bg-gold-role/10 px-2 py-0.5 text-gold-role">Verified: @{schoolDomain}</span>
                    ) : (
                      "We currently support campus email addresses."
                    )}
                  </p>
                )}
              </div>

              {schoolName && (
                <div className="flex items-center justify-between text-xs text-muted-foreground -mt-1">
                  <span>Selected: {schoolName} {schoolDomain ? `( @${schoolDomain} )` : ""}</span>
                  <a href="/schools" className="font-medium text-primary hover:underline">Switch school</a>
                </div>
              )}

              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold text-foreground">I’m joining as</legend>
                <RadioGroup
                  name="userType"
                  value={formState.userType}
                  onValueChange={handleUserTypeChange}
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {userTypeOptions.map((option) => {
                    const checked = formState.userType === option.value;
                    return (
                      <label
                        key={option.value}
                        htmlFor={`userType-${option.value}`}
                        className={`flex h-full cursor-pointer flex-col gap-1 rounded-xl border p-3 transition ${
                          checked
                            ? "border-gold-role/60 bg-gold-role/10"
                            : "border-border bg-background/70 hover:border-gold-role/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            id={`userType-${option.value}`}
                            value={option.value}
                            disabled={loading}
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-medium text-foreground">{option.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </fieldset>

              <Button type="submit" variant="gold" className="w-full h-11" disabled={!canSubmit} aria-label="Send magic link to your campus email">
                {loading ? "Sending…" : "Send magic link"}
              </Button>
            </form>

            {awaitingVerification && state.email && state.userType ? (
              <div className="flex flex-col gap-3 rounded-md border border-muted bg-muted/30 p-4 text-sm text-muted-foreground">
                <p>Didn’t get the email?</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const email = state.email;
                      const userType = state.userType;
                      if (!email || !userType) {
                        return;
                      }
                      void (async () => {
                        try {
                          const res = await fetch("/api/auth/resend", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, userType })
                          });
                          if (!res.ok) {
                            const data: unknown = await res.json().catch(() => ({}));
                            if (res.status === 429) {
                              toast({ title: "Please wait a moment", description: (data as { error?: string })?.error || "You can request another link shortly.", duration: 3500 });
                              try {
                                console.log("telemetry", { event: "magic_link_resend", throttled: true });
                              } catch (error) {
                                console.warn("login.telemetry.magic_link_resend_throttled_failed", error);
                              }
                              return;
                            }
                            throw new Error((data as { error?: string })?.error || "Failed to resend");
                          }
                          // On success, trigger Firebase to send the email using the new messageId
                          try {
                            const payload = (await res.json()) as { messageId?: string };
                            if (payload?.messageId) {
                              const { sendMagicLinkViaFirebase } = await import("../../lib/firebase.client");
                              await sendMagicLinkViaFirebase({ email, messageId: payload.messageId });
                            }
                          } catch (e) {
                            console.warn("resend.firebase_send.failed", e);
                          }
                          try {
                            console.log("telemetry", { event: "magic_link_resend", throttled: false });
                          } catch (error) {
                            console.warn("login.telemetry.magic_link_resend_logged_failed", error);
                          }
                        } catch (e) {
                          toast({ title: "Couldn’t resend link", description: e instanceof Error ? e.message : String(e), variant: "destructive", duration: 3500 });
                        }
                      })();
                    }}
                    disabled={loading}
                  >
                    Resend magic link
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Check promotions or spam if it doesn’t arrive quickly.
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </Card>
        </motion.div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Built for trust. Verified presence, clear roles, reversible actions. Need help? <a className="font-medium text-primary hover:underline" href="mailto:access@joinhive.com">access@joinhive.com</a>
        </footer>
      </Container>
    </GradientBackdrop>
  );
}

export default function LoginPage(): JSX.Element {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center p-8 text-sm text-muted-foreground">Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}
