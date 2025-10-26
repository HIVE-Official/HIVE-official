// Bounded Context Owner: Identity & Access Management Guild
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "@auth";
// Replace legacy stepper with shadcn-style 7-step wizard
import HiveOnboardingWizard from "./components/HiveOnboardingWizard";
import { GradientBackdrop } from "../../components/layout/GradientBackdrop";
import { Container } from "../../components/layout/Container";
import { Heading, Text } from "@hive/ui";

const SectionShell = ({ title, description, children }: { title: string; description?: string; children?: ReactNode }) => (
  <div className="text-center">
    <Heading level="h1" className="sm:text-4xl">{title}</Heading>
    {description ? <Text variant="muted" className="mt-2">{description}</Text> : null}
    {children ? <div className="mt-6 flex justify-center">{children}</div> : null}
  </div>
);

export default function OnboardingPage(): JSX.Element {
  const { state } = useAuth();
  const router = useRouter();

  // Feature flag: redirect to DM-style onboarding when enabled
  const DM_ENABLED = process.env.NEXT_PUBLIC_ONBOARDING_DM === "true";
  const PICK_SPACES_ENABLED = process.env.NEXT_PUBLIC_ONBOARDING_PICK_SPACES === "true";

  useEffect(() => {
    if (DM_ENABLED) {
      router.replace("/dm/onboarding");
      return;
    }
  }, [DM_ENABLED, router]);

  useEffect(() => {
    if (state.status === "authenticated") {
      if (PICK_SPACES_ENABLED) {
        router.replace("/onboarding/pick-spaces");
      } else {
        router.replace("/spaces");
      }
    }
  }, [PICK_SPACES_ENABLED, router, state.status]);

  // Show a brief skeleton only while actively restoring a session.
  // Treat "idle" as no-session so users aren't stuck on this screen.
  if (state.status === "loading") {
    return (
      <GradientBackdrop>
        <Container className="flex min-h-screen flex-col items-center justify-center py-16">
          <SectionShell
            title="Preparing your onboarding flow"
            description="Hold tight while we confirm your session."
          >
            <div className="h-32 w-64 animate-pulse rounded-xl border border-dashed border-border" />
          </SectionShell>
        </Container>
      </GradientBackdrop>
    );
  }

  if (state.status === "awaitingVerification") {
    return (
      <CalloutPage
        title="Check your email to continue"
        description={`We sent a verification link to ${state.email ?? "your campus inbox"}. Click it to resume onboarding.`}
        linkLabel="Back to magic link request"
      />
    );
  }

  if (state.status === "error") {
    return (
      <CalloutPage
        title="We hit a snag loading your onboarding data"
        description={state.error ?? "Head back to the sign-in page to try again."}
      />
    );
  }

  if (state.status === "authenticated") {
    // Brief placeholder while redirecting
    return (
      <GradientBackdrop>
        <Container className="flex min-h-screen flex-col items-center justify-center py-16">
          <SectionShell title="Redirecting" description="Taking you to your spaces..." />
        </Container>
      </GradientBackdrop>
    );
  }

  if (state.status !== "onboarding") {
    return (
      <CalloutPage
        title="We couldn’t find an active onboarding session"
        description="Request a magic link to pick up where you left off."
      />
    );
  }

  return (
    <GradientBackdrop>
      <Container className="flex min-h-screen flex-col gap-10 py-16">
        <div className="text-center">
          <Heading level="h1" className="sm:text-4xl">Complete your profile</Heading>
          <Text variant="muted" className="mt-2">We use this information to match you with the right spaces, rituals, and teammates.</Text>
        </div>
        <HiveOnboardingWizard />
      </Container>
    </GradientBackdrop>
  );
}

function CalloutPage({
  title,
  description,
  linkLabel
}: {
  title: string;
  description: string;
  linkLabel?: string;
}): JSX.Element {
  return (
    <GradientBackdrop>
      <Container className="flex min-h-screen flex-col items-center justify-center py-16">
        <SectionShell title={title} description={description}>
          <Link
            href="/login"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {linkLabel ?? "Return to sign in"}
          </Link>
        </SectionShell>
      </Container>
    </GradientBackdrop>
  );
}
