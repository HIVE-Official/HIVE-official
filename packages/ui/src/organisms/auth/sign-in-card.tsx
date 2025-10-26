// Bounded Context Owner: Design System Guild
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/atoms/card";
import { Input } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { Banner } from "@/molecules/banner";
import { RadioGroup, RadioGroupItem } from "@/atoms/radio";
import { HiveLogo } from "@/atoms/hive-logo";
import { cn } from "@/utils";

export type UserTypeOption = "student" | "alumni" | "faculty";

const userTypeOptions: ReadonlyArray<{ value: UserTypeOption; label: string }> = [
  { value: "student", label: "Student" },
  { value: "alumni", label: "Alumni" },
  { value: "faculty", label: "Faculty / Staff" }
];

export interface SignInCardProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string;
  userType: UserTypeOption;
  loading?: boolean;
  awaitingVerification?: boolean;
  errorMessage?: string | null;
  schoolName?: string | null;
  onEmailChange?: (value: string) => void;
  onUserTypeChange?: (value: UserTypeOption) => void;
  onSubmit?: () => void;
}

export function SignInCard({
  email,
  userType,
  loading,
  awaitingVerification,
  errorMessage,
  schoolName,
  onEmailChange,
  onUserTypeChange,
  onSubmit,
  className,
  ...rest
}: SignInCardProps) {
  const canSubmit = email.trim().length > 0 && !loading;

  return (
    <Card className={cn("overflow-hidden border border-border/70 bg-background/90 shadow-lg", className)} {...rest}>
      <CardHeader className="flex flex-col items-center gap-4 bg-gradient-to-b from-[hsl(var(--hive-gold)/0.12)] via-background/75 to-background px-6 py-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--hive-gold))] bg-[hsl(var(--hive-gold)/0.18)] px-4 py-1 text-caption font-caption text-[hsl(var(--hive-gold))] shadow-[0_0_0_1px_hsl(var(--hive-gold)/0.35)]">
          <HiveLogo size={18} variant="gold" aria-hidden />
          <span className="tracking-wide text-foreground">Hive Campus Network</span>
        </span>
        <div className="space-y-2">
          <CardTitle>Access HIVE</CardTitle>
          <CardDescription>
            {schoolName
              ? `Continue with ${schoolName}`
              : "Available to students, alumni, and faculty with verified campus emails."}
          </CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-6 px-6 pb-6">
        {awaitingVerification ? (
          <Banner variant="info" title="Magic link sent" description="Check your email to continue. The link expires soon." />
        ) : null}
        {errorMessage ? (
          <Banner variant="error" title="Request failed" description={errorMessage} />
        ) : null}

        <div className="space-y-2">
          <label className="text-sm font-semibold">Campus email</label>
          <Input
            value={email}
            onChange={(e) => onEmailChange?.(e.target.value)}
            placeholder="you@university.edu"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">I am a</label>
          <RadioGroup value={userType} onValueChange={(value) => onUserTypeChange?.(value as UserTypeOption)} className="grid gap-2 sm:grid-cols-3">
            {userTypeOptions.map(({ value, label: optionLabel }) => {
              const id = `sign-in-card-${value}`;
              const isSelected = userType === value;

              return (
                <label
                  key={value}
                  htmlFor={id}
                  className={cn(
                    "group flex cursor-pointer items-center gap-3 rounded-card border border-border/60 bg-background/60 p-3 transition focus-within:ring-2 focus-within:ring-ring/80 focus-within:ring-offset-0",
                    isSelected
                      ? "border-[hsl(var(--hive-gold))] bg-[hsl(var(--hive-gold)/0.18)] text-foreground shadow-[0_0_0_1px_hsl(var(--hive-gold)/0.35)]"
                      : "hover:border-[hsl(var(--hive-gold))] hover:bg-secondary/40"
                  )}
                >
                  <RadioGroupItem
                    id={id}
                    value={value}
                    className={cn(
                      "h-4 w-4 border-border/60 text-muted-foreground transition group-hover:border-[hsl(var(--hive-gold))] group-hover:text-[hsl(var(--hive-gold))]",
                      "data-[state=checked]:border-[hsl(var(--hive-gold))] data-[state=checked]:bg-transparent data-[state=checked]:text-[hsl(var(--hive-gold))]",
                      isSelected && "border-[hsl(var(--hive-gold))] text-[hsl(var(--hive-gold))]"
                    )}
                  />
                  <span className="text-sm font-medium">{optionLabel}</span>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button onClick={onSubmit} disabled={!canSubmit}>
            {loading ? "Sending..." : "Send magic link"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
