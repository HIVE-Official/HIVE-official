"use client";

import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button, HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from "../../atoms";

export type VerifyLinkStatus = "loading" | "success-existing" | "success-new" | "expired" | "error";

export interface VerifyLinkStatusCardProps {
  status: VerifyLinkStatus;
  message?: string;
  onRetry?: () => void;
  onContinue?: () => void;
  onStartOver?: () => void;
}

export function VerifyLinkStatusCard({
  status,
  message,
  onRetry,
  onContinue,
  onStartOver,
}: VerifyLinkStatusCardProps) {
  const renderIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-brand-primary)]" />;
      case "success-existing":
      case "success-new":
        return <CheckCircle2 className="h-8 w-8 text-[var(--hive-brand-primary)]" />;
      case "expired":
      case "error":
        return <AlertTriangle className="h-8 w-8 text-[var(--hive-status-error)]" />;
    }
  };

  const renderActions = () => {
    if (status === "loading") {
      return null;
    }

    if (status === "success-existing" && onContinue) {
      return (
        <Button className="w-full" onClick={onContinue}>
          Go to your feed
        </Button>
      );
    }

    if (status === "success-new" && onContinue) {
      return (
        <Button className="w-full" onClick={onContinue}>
          Finish onboarding
        </Button>
      );
    }

    if (status === "expired" || status === "error") {
      return (
        <div className="space-y-2">
          {onRetry && (
            <Button className="w-full" onClick={onRetry}>
              Send a new magic link
            </Button>
          )}
          {onStartOver && (
            <Button variant="ghost" className="w-full" onClick={onStartOver}>
              Start over
            </Button>
          )}
        </div>
      );
    }

    return null;
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying your access";
      case "success-existing":
        return "Welcome back";
      case "success-new":
        return "You're in!";
      case "expired":
        return "Link expired";
      case "error":
        return "Verification failed";
    }
  };

  return (
    <HiveCard>
      <HiveCardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--hive-background-elevated)]">
          {renderIcon()}
        </div>
        <HiveCardTitle>{getTitle()}</HiveCardTitle>
      </HiveCardHeader>
      <HiveCardContent className="space-y-4 text-center">
        <p className="text-sm text-[var(--hive-text-secondary)]">
          {message ?? defaultMessageForStatus(status)}
        </p>
        {renderActions()}
      </HiveCardContent>
    </HiveCard>
  );
}

function defaultMessageForStatus(status: VerifyLinkStatus) {
  switch (status) {
    case "loading":
      return "Please wait while we verify your magic link.";
    case "success-existing":
      return "Your session is ready. Taking you to your digital campus.";
    case "success-new":
      return "You're verified! Let's finish setting up your profile.";
    case "expired":
      return "This magic link has expired. Request another to continue.";
    case "error":
      return "We couldn't verify the link. Please try again or start over.";
  }
}

export default VerifyLinkStatusCard;
