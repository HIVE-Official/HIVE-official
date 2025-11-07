"use client";

import { Loader2 } from "lucide-react";
import { Button, HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from "../../atoms";

export interface LoginLinkSentCardProps {
  email: string;
  canResend?: boolean;
  resendCountdownMs?: number;
  devMagicLink?: string | null;
  error?: string | null;
  isSubmitting?: boolean;
  onResend?: () => void;
  onUseDifferentEmail?: () => void;
}

export function LoginLinkSentCard({
  email,
  canResend = true,
  resendCountdownMs,
  devMagicLink,
  error,
  isSubmitting,
  onResend,
  onUseDifferentEmail,
}: LoginLinkSentCardProps) {
  const seconds = resendCountdownMs ? Math.ceil(resendCountdownMs / 1000) : 0;

  return (
    <HiveCard>
      <HiveCardHeader>
        <HiveCardTitle>Check your inbox</HiveCardTitle>
        <p className="text-sm text-[var(--hive-text-secondary)]">We sent a magic link to {email}.</p>
      </HiveCardHeader>
      <HiveCardContent className="space-y-4">
        {devMagicLink && (
          <div className="rounded-xl border border-[var(--hive-brand-primary)]/40 bg-[var(--hive-brand-primary)]/10 px-4 py-3 text-sm">
            <p className="mb-2 text-[var(--hive-brand-primary)] font-medium">Development link</p>
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
          className="w-full"
          disabled={!canResend || isSubmitting}
          onClick={onResend}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </span>
          ) : canResend ? (
            "Send another link"
          ) : (
            `Resend available in ${seconds}s`
          )}
        </Button>

        <Button type="button" variant="ghost" className="w-full" onClick={onUseDifferentEmail}>
          Use a different email
        </Button>
      </HiveCardContent>
    </HiveCard>
  );
}

export default LoginLinkSentCard;
