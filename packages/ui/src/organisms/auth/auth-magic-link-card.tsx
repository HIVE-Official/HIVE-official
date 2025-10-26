"use client";
import * as React from "react";
import { Card } from "@/atoms/card";
import { Input } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { InlineNotice } from "@/molecules/inline-notice";
import { SegmentedControl } from "@/molecules/segmented-control";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/molecules/command";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/molecules/sheet";
import { AwaitChecklistCard } from "./await-checklist-card";
import { CAMPUSES, suggestDomainCorrection } from "@/fixtures/campuses";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";
import { Mail, Building2 } from "lucide-react";

type Role = "student" | "faculty" | "alumni";

export interface AuthMagicLinkCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthMagicLinkCard({ className, ...rest }: AuthMagicLinkCardProps) {
  const [schoolOpen, setSchoolOpen] = React.useState(false);
  const [role, setRole] = React.useState<Role>("student");
  const [schoolDomain, setSchoolDomain] = React.useState<string>("buffalo.edu");
  const [emailLocal, setEmailLocal] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [awaiting, setAwaiting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fullEmail = emailLocal ? `${emailLocal}@${schoolDomain}` : "";
  const correction = React.useMemo(() => suggestDomainCorrection(schoolDomain), [schoolDomain]);

  const onSend = async () => {
    setError(null);
    if (!emailLocal) {
      setError("Enter your campus email username");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setAwaiting(true);
  };

  const onResend = async () => {
    await new Promise((r) => setTimeout(r, 400));
  };

  if (awaiting && fullEmail) {
    return (
      <AwaitChecklistCard email={fullEmail} cooldownSeconds={60} onResend={onResend} onChangeEmail={() => setAwaiting(false)} />
    );
  }

  return (
    <Card className={cn("surface-glass", className)} {...rest}>
      <div className={cn("space-y-4 p-6", motionClass("ambient"), "enter-fade")}> 
        <div className="flex items-center gap-2">
          <Mail className="size-5 text-muted-foreground" aria-hidden />
          <h3 className="text-h3 font-h3">Sign in with your campus email</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,2fr]">
          {/* School Combobox */}
          <div className="space-y-1.5">
            <label className="text-label font-label">School</label>
            <button
              type="button"
              className="interactive focus-ring w-full rounded-md border border-input bg-background px-3 py-2 text-body text-foreground hover:bg-muted/30"
              onClick={() => setSchoolOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={schoolOpen}
            >
              <span className="inline-flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" aria-hidden />
                <span className="text-body font-body">{schoolDomain}</span>
              </span>
            </button>
          </div>

          {/* Email (username + locked domain) */}
          <div className="space-y-1.5">
            <label className="text-label font-label">Campus email</label>
            <div className="flex items-stretch overflow-hidden rounded-md border border-input">
              <Input
                aria-label="Email username"
                placeholder="name"
                className="flex-1 rounded-none border-0 bg-transparent"
                value={emailLocal}
                onChange={(e) => setEmailLocal(e.target.value.replace(/[^a-zA-Z0-9._-]/g, ""))}
              />
              <div className="flex items-center gap-1 border-l border-input bg-muted/30 px-3 text-muted-foreground">
                @
                <span className="text-body font-body text-foreground/90">{schoolDomain}</span>
              </div>
            </div>
            {correction && correction !== schoolDomain ? (
              <InlineNotice variant="warning" className="mt-1.5">
                Did you mean <button className="underline" onClick={() => setSchoolDomain(correction)}>{correction}</button>?
              </InlineNotice>
            ) : null}
          </div>
        </div>

        {/* Role segmented */}
        <div className="space-y-1.5">
          <label className="text-label font-label">Role</label>
          <SegmentedControl
            value={role}
            onValueChange={(v) => setRole((v as Role) ?? "student")}
            items={[
              { value: "student", label: "Student" },
              { value: "faculty", label: "Faculty" },
              { value: "alumni", label: "Alumni" },
            ]}
          />
        </div>

        {error ? <InlineNotice variant="destructive">{error}</InlineNotice> : (
          <p className="text-caption text-muted-foreground">We’ll email a one‑tap sign‑in link. Link expires in 15 minutes.</p>
        )}

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button onClick={onSend} disabled={!emailLocal || sending}>
            {sending ? "Sending…" : "Send magic link"}
          </Button>
        </div>
      </div>

      {/* School picker sheet */}
      <Sheet open={schoolOpen} onOpenChange={setSchoolOpen}>
        <SheetContent side="right" className="w-[420px] max-w-[90vw]">
          <SheetHeader>
            <SheetTitle>Select your school</SheetTitle>
            <SheetDescription>Choose your campus to lock the email domain.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <Command>
              <CommandInput placeholder="Search schools…" />
              <CommandList className="max-h-[50vh]">
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup heading="Campuses">
                  {CAMPUSES.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={c.name}
                      onSelect={() => {
                        setSchoolDomain(c.domain);
                        setSchoolOpen(false);
                      }}
                    >
                      <span className="text-body font-body">{c.name}</span>
                      <span className="ml-auto text-caption text-muted-foreground">{c.domain}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
