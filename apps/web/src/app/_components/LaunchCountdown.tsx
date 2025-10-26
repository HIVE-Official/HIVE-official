// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Heading, Text } from "@hive/ui";
import { GradientBackdrop } from "../../components/layout/GradientBackdrop";
import { Container } from "../../components/layout/Container";

const TARGET_TIMESTAMP = Date.UTC(2025, 10, 1, 0, 0, 0); // November 1, 2025 00:00:00 UTC

interface CountdownState {
  readonly total: number;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

const getCountdown = (): CountdownState => {
  const diff = TARGET_TIMESTAMP - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);
  return { total: clamped, days, hours, minutes, seconds };
};

const formatSegment = (value: number): string => value.toString().padStart(2, "0");

export function LaunchCountdown(): JSX.Element {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdown());

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const segments = useMemo(
    () => [
      { label: "Days", value: countdown.days.toString() },
      { label: "Hours", value: formatSegment(countdown.hours) },
      { label: "Minutes", value: formatSegment(countdown.minutes) },
      { label: "Seconds", value: formatSegment(countdown.seconds) }
    ],
    [countdown.days, countdown.hours, countdown.minutes, countdown.seconds]
  );

  const launchActive = countdown.total === 0;

  return (
    <GradientBackdrop className="bg-background">
      <Container className="flex min-h-screen flex-col items-center justify-center gap-14 py-24">
        <div className="text-center space-y-4">
          <Heading level="h1" className="text-4xl sm:text-6xl font-bold tracking-tight text-balance">
            HIVE opens campus on November&nbsp;1
          </Heading>
          <Text variant="muted" className="max-w-2xl mx-auto text-base sm:text-lg">
            We’re finalizing the Campus OS for early cohorts. The countdown is live—claim your spot to be first in.
          </Text>
        </div>

        <Card className="w-full max-w-3xl border-border/70 bg-card/80 backdrop-blur-sm px-6 py-10 shadow-subtle">
          {launchActive ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <Heading level="h2" className="text-3xl sm:text-4xl font-semibold">Doors are open</Heading>
              <Text variant="muted">It’s time to enter HIVE and run your campus.</Text>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {segments.map((segment) => (
                <div key={segment.label} className="space-y-2">
                  <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-6 text-3xl sm:text-4xl font-semibold">
                    {segment.value}
                  </div>
                  <Text variant="muted" className="uppercase tracking-[0.25em] text-xs font-medium">
                    {segment.label}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="h-12 px-8">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <a href="mailto:hello@hive-campus.com?subject=HIVE%20Launch%20—%20Campus%20Inquiry">Talk to the team</a>
            </Button>
          </div>
          <Text variant="muted" className="text-sm">
            Already verified? Use your campus email to get a fresh magic link and jump back in.
          </Text>
        </div>
      </Container>
    </GradientBackdrop>
  );
}
