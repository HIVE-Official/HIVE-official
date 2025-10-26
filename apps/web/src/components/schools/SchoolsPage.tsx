// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { CampusRecord } from "@core";
import { Button, Card, CardDescription, CardTitle, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@hive/ui";
import { Search, Inbox } from "lucide-react";
import { GradientBackdrop } from "../layout/GradientBackdrop";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

export function SchoolsPage({ campuses }: { campuses: readonly CampusRecord[] }): JSX.Element {
  const [query, setQuery] = useState("");
  const [openRequest, setOpenRequest] = useState(false);
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return campuses;
    }
    return campuses.filter((campus) =>
      campus.name.toLowerCase().includes(q) || campus.emailDomains.some((d) => d.toLowerCase().includes(q))
    );
  }, [campuses, query]);

  const hasResults = filtered.length > 0;

  return (
    <GradientBackdrop>
      <Container className="pt-20 pb-12 sm:pt-24">
        <Section className="py-0">
          <div className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Find your school</h1>
              <p className="mt-2 text-sm text-muted-foreground">Search your campus to continue with a secure magic link.</p>
            </div>
            <Button variant="outline" onClick={() => setOpenRequest(true)}>Request your school</Button>
          </div>
        </Section>

        <Section className="pt-6">
          <div className="relative mb-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by school name or email domain"
              className="pl-9"
            />
          </div>

          {hasResults ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((campus) => (
                <Card
                  key={campus.campusId}
                  className="surface-glass cursor-pointer transition hover:-translate-y-1 hover:shadow-level1"
                  onClick={() => handleSelect(router, campus)}
                >
                  <div className="space-y-3 p-5">
                    <CardTitle className="text-base font-semibold text-foreground">{campus.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {campus.emailDomains.join(", ")}
                    </CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState onRequest={() => setOpenRequest(true)} />
          )}
        </Section>
      </Container>

      <RequestSchoolModal open={openRequest} onOpenChange={setOpenRequest} />
    </GradientBackdrop>
  );
}

function handleSelect(router: ReturnType<typeof useRouter>, campus: CampusRecord): void {
  const domain = campus.emailDomains[0] ?? "";
  const params = new URLSearchParams({
    schoolId: campus.campusId,
    schoolName: campus.name,
    domain
  }).toString();
  router.push(`/login?${params}`);
}

function EmptyState({ onRequest }: { onRequest: () => void }): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-background/80 p-10 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-base font-semibold text-foreground">We’re still rolling out</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Don’t see your campus yet? Tell us where you are and we’ll notify you as soon as your community is ready.
      </p>
      <Button variant="outline" onClick={onRequest}>Request your school</Button>
    </div>
  );
}

function RequestSchoolModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = (): void => {
    setName("");
    setEmail("");
    setSchool("");
    setSubmitted(false);
    setSubmitting(false);
  };

  const submit = async (): Promise<void> => {
    if (!email || !school) {
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/schools/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, school })
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request your school</DialogTitle>
          <DialogDescription>
            Don’t see your campus? Tell us where and we’ll let you know the moment HIVE launches there.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="py-4 text-sm text-foreground">Thanks! We&rsquo;ll reach out as soon as your campus is live.</div>
        ) : (
          <div className="space-y-3 py-2">
            <Field label="Your name (optional)">
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Jordan Lee" />
            </Field>
            <Field label="Email" required>
              <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@school.edu" />
            </Field>
            <Field label="School" required>
              <Input value={school} onChange={(event) => setSchool(event.target.value)} placeholder="Your University" />
            </Field>
            <div className="pt-2">
              <Button className="w-full" onClick={() => { void submit(); }} disabled={submitting || !email || !school}>
                {submitting ? "Sending..." : "Submit request"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </label>
      {children}
    </div>
  );
}
