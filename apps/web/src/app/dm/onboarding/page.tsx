// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Heading, Input, Text, Textarea, Badge } from "@hive/ui";

type UserType = "student" | "alumni" | "faculty";

interface SessionResponse {
  readonly session?: { readonly sessionId: string; readonly profileId: string };
  readonly onboardingComplete?: boolean;
  readonly userType?: UserType | null;
}

interface CatalogResponse {
  readonly majors: { id: string; name: string; college?: string }[];
  readonly interests: { id: string; label: string; category?: string }[];
  readonly residentialSpaces: { spaceId: string; name: string; cta?: string }[];
}

export default function DMOnboardingPage(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>("student");
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);

  // Local draft state
  const [handle, setHandle] = useState("");
  const [handleStatus, setHandleStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [bio, setBio] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [gradYear, setGradYear] = useState<number | undefined>(undefined);
  const [department, setDepartment] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  // Steps
  const steps = useMemo(() => {
    if (userType === "student") {
      return ["handle", "bio", "student", "interests", "consent"] as const;
    }
    return ["handle", "bio", "faculty", "interests", "consent"] as const;
  }, [userType]);
  const [stepIndex, setStepIndex] = useState(0);
  const current = steps[stepIndex] ?? "handle";

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        // Get session
        const sRes = await fetch("/api/auth/session", { cache: "no-store" });
        if (sRes.status === 204) {
          router.replace("/login");
          return;
        }
        const session = (await sRes.json()) as SessionResponse;
        if (session.onboardingComplete) {
          router.replace("/spaces");
          return;
        }
        setProfileId(session.session?.profileId ?? null);
        setUserType((session.userType ?? "student") as UserType);

        // Load catalog
        const cRes = await fetch("/api/catalog", { cache: "no-store" });
        const data = (await cRes.json()) as CatalogResponse;
        if (!cancelled) setCatalog(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // Handle availability checker (debounced)
  useEffect(() => {
    let cancel = false;
    if (!handle || handle.trim().length < 3) {
      setHandleStatus("idle");
      return;
    }
    setHandleStatus("checking");
    const t = setTimeout(() => {
      void (async () => {
        try {
          const res = await fetch(`/api/auth/check-handle?handle=${encodeURIComponent(handle.toLowerCase())}`);
          if (!res.ok) {
            if (!cancel) setHandleStatus("invalid");
            return;
          }
          const json = (await res.json()) as { available: boolean };
          if (!cancel) setHandleStatus(json.available ? "available" : "taken");
        } catch {
          if (!cancel) setHandleStatus("invalid");
        }
      })();
    }, 350);
    return () => {
      cancel = true;
      clearTimeout(t);
    };
  }, [handle]);

  const saveStep = async (id: string, patch: unknown) => {
    if (!profileId) return;
    await fetch("/api/onboarding/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, stepId: id, partialSubmission: patch })
    });
  };

  const canContinue = useMemo(() => {
    switch (current) {
      case "handle":
        return handleStatus === "available";
      case "bio":
        return userType === "student" ? bio.trim().length > 0 : bio.trim().length >= 50;
      case "student":
        return selectedMajors.length > 0 && !!gradYear;
      case "faculty":
        return department.trim().length > 0; // kept light in DM
      case "interests":
        return interests.length >= 3 && interests.length <= 6;
      case "consent":
        return consent === true;
      default:
        return false;
    }
  }, [current, department, gradYear, handleStatus, interests.length, bio, selectedMajors.length, userType, consent]);

  const next = async () => {
    if (!profileId) return;
    try {
      if (current === "handle") {
        await saveStep("personal-info", { handle: handle.toLowerCase().trim() });
      } else if (current === "bio") {
        await saveStep("personal-info", { personalInfo: { bio: bio.trim() } });
      } else if (current === "student") {
        await saveStep("academic-info", { academicInfo: { majors: selectedMajors, graduationYear: gradYear } });
      } else if (current === "faculty") {
        await saveStep("academic-info", { affiliation: { department: department.trim() } });
      } else if (current === "interests") {
        await saveStep("interests", { interests: interests.map((id) => {
          const opt = catalog?.interests.find((i) => i.id === id);
          return opt ? { id: opt.id, label: opt.label } : { id, label: id };
        }) });
      } else if (current === "consent") {
        // complete
        const submission: any = {
          handle: handle.toLowerCase().trim(),
          personalInfo: { bio: bio.trim() },
          interests: interests.map((id) => {
            const opt = catalog?.interests.find((i) => i.id === id);
            return opt ? { id: opt.id, label: opt.label } : { id, label: id };
          }),
          consentGiven: true
        };
        if (userType === "student") submission.academicInfo = { majors: selectedMajors, graduationYear: gradYear };
        else submission.affiliation = { department: department.trim() };

        const res = await fetch("/api/onboarding/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId, submission })
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to complete onboarding");
        }
        router.replace("/spaces");
        return;
      }
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-sm text-muted-foreground">Preparing your onboarding…</div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <Card className="max-w-lg w-full">
          <CardContent className="p-6">
            <Heading level="h3">We hit a snag</Heading>
            <Text variant="muted" className="mt-2">{error}</Text>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => location.reload()}>Try again</Button>
              <Button variant="outline" asChild>
                <a href="/login">Back to sign‑in</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 text-center">
          <Heading level="h1" className="text-2xl">Let’s get you set up</Heading>
          <Text variant="muted" className="mt-1">A few quick steps to tune HIVE to you.</Text>
        </div>

        {/* DM Thread */}
        <div className="space-y-4">
          {/* Hive: greeting */}
          <Bot>Welcome — your campus email is verified.</Bot>
          <Bot>Claim your handle so people can find you.</Bot>
          {/* User: handle */}
          {current === "handle" && (
            <Card>
              <CardContent className="p-4">
                <label htmlFor="handle" className="text-sm font-medium">Handle</label>
                <Input id="handle" value={handle} onChange={(e) => setHandle(e.target.value.toLowerCase())} placeholder="ava_nguyen" maxLength={20} className="mt-2" />
                <Text variant="muted" className="mt-2 text-xs">
                  {handleStatus === "idle" && "Type to check availability"}
                  {handleStatus === "checking" && "Checking availability…"}
                  {handleStatus === "available" && "Available"}
                  {handleStatus === "taken" && "That handle is taken"}
                  {handleStatus === "invalid" && "Handle format not allowed"}
                </Text>
              </CardContent>
            </Card>
          )}

          {/* Bot: bio prompt */}
          {stepIndex >= 1 && <Bot>Say a bit about yourself (you can edit this later).</Bot>}
          {current === "bio" && (
            <Card>
              <CardContent className="p-4">
                <label htmlFor="bio" className="text-sm font-medium">Short bio</label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-2" placeholder={userType === "student" ? "I’m a CS student into design sprints and open mics." : "I advise undergrad research and love campus makeathons."} />
                <Text variant="muted" className="mt-2 text-xs">
                  {userType === "student" ? "Required." : "Required — 50+ characters preferred for faculty/staff."}
                </Text>
              </CardContent>
            </Card>
          )}

          {/* Bot: student academic / faculty affiliation */}
          {stepIndex >= 2 && userType === "student" && <Bot>Pick your major(s) and grad year.</Bot>}
          {current === "student" && catalog && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-sm font-medium">Majors (max 2)</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {catalog.majors.map((m) => {
                      const active = selectedMajors.includes(m.id);
                      return (
                        <Badge key={m.id} className={active ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} onClick={() => {
                          setSelectedMajors((prev) => {
                            if (prev.includes(m.id)) return prev.filter((x) => x !== m.id);
                            if (prev.length >= 2) return prev;
                            return [...prev, m.id];
                          });
                        }}>
                          {m.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="grad">Graduation year</label>
                  <Input id="grad" type="number" value={gradYear ? String(gradYear) : ""} onChange={(e) => setGradYear(Number(e.target.value) || undefined)} className="mt-2 w-40" />
                </div>
              </CardContent>
            </Card>
          )}

          {stepIndex >= 2 && userType !== "student" && <Bot>Tell us your department (you can refine later).</Bot>}
          {current === "faculty" && (
            <Card>
              <CardContent className="p-4">
                <label htmlFor="dept" className="text-sm font-medium">Department or office</label>
                <Input id="dept" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="School of Engineering Undergraduate Advising" className="mt-2" />
              </CardContent>
            </Card>
          )}

          {/* Bot: interests */}
          {stepIndex >= 3 && <Bot>Pick a few interests to tune your feed (3–6).</Bot>}
          {current === "interests" && catalog && (
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {catalog.interests.map((i) => {
                    const active = interests.includes(i.id);
                    return (
                      <Badge key={i.id} className={active ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} onClick={() => {
                        setInterests((prev) => {
                          if (prev.includes(i.id)) return prev.filter((x) => x !== i.id);
                          if (prev.length >= 6) return prev;
                          return [...prev, i.id];
                        });
                      }}>
                        {i.label}
                      </Badge>
                    );
                  })}
                </div>
                <Text variant="muted" className="mt-2 text-xs">{interests.length} selected</Text>
              </CardContent>
            </Card>
          )}

          {/* Bot: consent */}
          {stepIndex >= 4 && <Bot>We’re student‑run, privacy‑first. You can edit or remove info later.</Bot>}
          {current === "consent" && (
            <Card>
              <CardContent className="p-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  I agree to the HIVE Code of Conduct and data use policy.
                </label>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={stepIndex === 0}>Back</Button>
            <Button onClick={() => { void next(); }} disabled={!canContinue}>{current === "consent" ? "Finish" : "Continue"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
      <Text variant="body" className="max-w-xl">{children}</Text>
    </div>
  );
}
