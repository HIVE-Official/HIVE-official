// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Heading, Text, Input, Card, CardContent, HiveLogo, Eyebrow } from "@hive/ui";
import { GradientBackdrop } from "../layout/GradientBackdrop";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

const ACCESS_STORAGE_KEY = "hive.lab.access.granted";

export function Landing(): JSX.Element {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const configuredCodes = useMemo(() => {
    const multi = process.env.NEXT_PUBLIC_HIVELAB_ACCESS_CODES ?? "";
    const legacy = process.env.NEXT_PUBLIC_HIVELAB_ACCESS_CODE ?? "";
    const merged = [multi, legacy]
      .join(",")
      .split(/[\s,]+/u)
      .map((token) => token.trim())
      .filter((token) => token.length === 6 && /^\d+$/.test(token));
    return Array.from(new Set(merged));
  }, []);

  const hasConfiguredCodes = configuredCodes.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === "true") {
      router.replace("/hivelab");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasConfiguredCodes) {
      setError("Access codes are not configured. Add NEXT_PUBLIC_HIVELAB_ACCESS_CODES to your env before launching.");
      return;
    }

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError("Enter the 6-digit access code.");
      return;
    }

    setIsSubmitting(true);

    const isMatch = configuredCodes.includes(code);
    if (isMatch) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "true");
      }
      router.push("/hivelab");
    } else {
      setError("That code doesn’t match. Try again.");
      setIsSubmitting(false);
    }
  };

  const handleGenerateCode = useCallback(() => {
    const buffer = typeof window !== "undefined" && window.crypto ? window.crypto.getRandomValues(new Uint32Array(1))[0] : Math.random() * 1_000_000;
    const nextCode = Math.floor(buffer % 1_000_000)
      .toString()
      .padStart(6, "0");
    setGeneratedCode(nextCode);
    setCopyState("idle");
  }, []);

  const handleCopyGenerated = useCallback(async () => {
    if (!generatedCode) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedCode);
        setCopyState("copied");
        setTimeout(() => setCopyState("idle"), 3000);
      } else {
        throw new Error("Clipboard unavailable");
      }
    } catch {
      setCopyState("error");
    }
  }, [generatedCode]);

  return (
    <GradientBackdrop>
      <Container>
        <Section className="flex min-h-screen items-center justify-center py-24">
          <Card className="w-full max-w-xl border-border/70 bg-card/75 backdrop-blur">
            <CardContent className="flex flex-col items-center gap-10 px-10 py-12 text-center">
              <div className="space-y-6">
                <div className="relative flex flex-col items-center gap-6">
                  <div className="glitch-logo relative">
                    <HiveLogo variant="gradient" size={88} className="drop-shadow-[0_0_24px_rgba(255,196,26,0.35)]" aria-hidden />
                    <HiveLogo variant="white" size={88} className="glitch-logo__layer glitch-logo__layer--offset" aria-hidden />
                    <HiveLogo variant="gold" size={88} className="glitch-logo__layer glitch-logo__layer--offset-alt" aria-hidden />
                  </div>
                  <span className="glitch-text block text-4xl font-semibold uppercase tracking-[0.35em]" data-text="HIVE(LAB)">
                    HIVE(LAB)
                  </span>
                  <Eyebrow className="tracking-[0.45em] text-muted-foreground/80">Experimental Access Gate</Eyebrow>
                </div>

                <Heading level="display" className="text-foreground">
                  Enter the LAB
                </Heading>

                <Text variant="body" className="mx-auto max-w-md text-muted-foreground">
                  HiveLAB previews new systems, navigation, and rituals before they ship to the wider Hive community. Drop the six-digit code to unlock the build.
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
                <Input
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.replace(/\D+/g, "").slice(0, 6));
                    setError(null);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\\d{6}"
                  placeholder="000000"
                  maxLength={6}
                  className="h-16 rounded-lg border-border/60 bg-background/60 text-center text-2xl tracking-[0.6em]"
                  aria-label="HiveLAB access code"
                />
                <Button type="submit" size="lg" variant="brand" disabled={isSubmitting || code.length !== 6}>
                  {isSubmitting ? "Checking…" : "Enter HiveLAB"}
                </Button>
              </form>

              {error ? (
                <Text variant="bodySm" className="text-destructive" role="alert">
                  {error}
                </Text>
              ) : (
                <Text variant="bodySm" className="text-muted-foreground">
                  Codes refresh often—check your launch brief or ask the HiveLAB crew if you need a hand.
                </Text>
              )}

              <div className="w-full space-y-3">
                <Button variant="ghost" size="sm" className="mx-auto flex items-center gap-2 text-muted-foreground hover:text-foreground" type="button" onClick={() => setShowGenerator((prev) => !prev)}>
                  {showGenerator ? "Hide code tools" : "Create a new access code"}
                </Button>

                {showGenerator ? (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 text-left">
                    <Heading level="h3" className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Code generator
                    </Heading>
                    <Text variant="bodySm" className="mt-2 text-muted-foreground">
                      Generate a fresh six-digit code for limited drops. Add it to `NEXT_PUBLIC_HIVELAB_ACCESS_CODES` (comma separated) before pushing live, then share with your crew.
                    </Text>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button variant="outline" size="sm" type="button" onClick={handleGenerateCode}>
                        Generate 6-digit code
                      </Button>
                      {generatedCode ? (
                        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2">
                          <code className="text-base font-semibold tracking-[0.4em] text-foreground">{generatedCode}</code>
                          <Button variant="ghost" size="sm" type="button" onClick={handleCopyGenerated}>
                            {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy"}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                    {copyState === "error" ? (
                      <Text variant="bodySm" className="mt-2 text-destructive">
                        Copy permissions blocked. Manually note the code above.
                      </Text>
                    ) : null}
                    {!hasConfiguredCodes ? (
                      <Text variant="bodySm" className="mt-3 text-destructive">
                        No codes detected yet. Update your environment variable before launch.
                      </Text>
                    ) : (
                      <Text variant="bodySm" className="mt-3 text-muted-foreground/80">
                        Active codes configured: {configuredCodes.length}
                      </Text>
                    )}
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </Section>
      </Container>

      <style jsx>{`
        .glitch-logo {
          filter: drop-shadow(0 0 12px rgba(255, 196, 26, 0.25));
        }

        .glitch-logo__layer {
          position: absolute;
          inset: 0;
          opacity: 0.6;
          mix-blend-mode: screen;
          animation: glitch-shift-logo 3.2s infinite ease-in-out alternate;
        }

        .glitch-logo__layer--offset {
          transform: translate(-2px, -1px);
          color: hsl(var(--accent));
        }

        .glitch-logo__layer--offset-alt {
          transform: translate(2px, 1px);
          color: hsl(var(--primary));
          animation-delay: 1.2s;
        }

        .glitch-text {
          position: relative;
          color: hsl(var(--foreground));
          animation: glitch-skew 5s ease-in-out infinite alternate;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          opacity: 0.7;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .glitch-text::before {
          color: hsl(var(--accent));
          animation: glitch-shift-left 2.8s infinite linear alternate;
          clip-path: inset(0 0 65% 0);
        }

        .glitch-text::after {
          color: hsl(var(--primary));
          animation: glitch-shift-right 3.2s infinite linear alternate;
          clip-path: inset(35% 0 0 0);
        }

        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          25% {
            transform: skew(1deg);
          }
          50% {
            transform: skew(0deg);
          }
          75% {
            transform: skew(-1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }

        @keyframes glitch-shift-left {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-2px, -1px);
          }
          50% {
            transform: translate(0, 1px);
          }
          75% {
            transform: translate(-1px, 0);
          }
          100% {
            transform: translate(-2px, 2px);
          }
        }

        @keyframes glitch-shift-right {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(2px, 1px);
          }
          50% {
            transform: translate(0, -1px);
          }
          75% {
            transform: translate(1px, 0);
          }
          100% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-shift-logo {
          0% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(2px, -1px);
          }
          66% {
            transform: translate(-2px, 1px);
          }
          100% {
            transform: translate(3px, -2px);
          }
        }
      `}</style>
    </GradientBackdrop>
  );
}
