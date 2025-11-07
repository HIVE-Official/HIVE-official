"use client";

import { Loader2 } from "lucide-react";
import { Button, HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle, Input } from "../../atoms";

export interface LoginEmailCardProps {
  campusLabel?: string;
  email?: string;
  placeholder?: string;
  error?: string | null;
  isSubmitting?: boolean;
  onEmailChange?: (value: string) => void;
  onSubmit?: () => void;
  onBack?: () => void;
}

export function LoginEmailCard({
  campusLabel = "Sign in",
  email = "",
  placeholder = "name@campus.edu",
  error,
  isSubmitting,
  onEmailChange,
  onSubmit,
  onBack,
}: LoginEmailCardProps) {
  return (
    <div className="space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
        >
          &larr; Choose a different campus
        </button>
      )}
      <HiveCard>
        <HiveCardHeader>
          <HiveCardTitle>{campusLabel}</HiveCardTitle>
          <p className="text-sm text-[var(--hive-text-secondary)]">Use your campus email.</p>
        </HiveCardHeader>
        <HiveCardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--hive-text-secondary)]" htmlFor="auth-email">
              Campus email
            </label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              placeholder={placeholder}
              onChange={(event) => onEmailChange?.(event.target.value)}
            />
          </div>
          {error && (
            <div className="rounded-lg border border-[var(--hive-status-error)]/40 bg-[var(--hive-status-error)]/10 px-4 py-2 text-sm text-[var(--hive-status-error)]">
              {error}
            </div>
          )}
          <Button
            type="button"
            className="w-full"
            disabled={isSubmitting}
            onClick={onSubmit}
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
    </div>
  );
}

export default LoginEmailCard;
