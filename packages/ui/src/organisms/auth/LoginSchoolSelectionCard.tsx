"use client";

import { Loader2 } from "lucide-react";
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from "../../atoms";

export interface LoginSchool {
  id: string;
  name: string;
  domain: string;
  location?: string | null;
}

export interface LoginSchoolSelectionCardProps {
  schools: LoginSchool[];
  isLoading?: boolean;
  onSelect?: (school: LoginSchool) => void;
  emptyState?: React.ReactNode;
  subtitle?: string;
}

export function LoginSchoolSelectionCard({
  schools,
  isLoading,
  onSelect,
  emptyState,
  subtitle = "Select your university to continue",
}: LoginSchoolSelectionCardProps) {
  return (
    <HiveCard>
      <HiveCardHeader>
        <HiveCardTitle className="text-xl">Welcome to HIVE</HiveCardTitle>
        <p className="text-sm text-[var(--hive-text-secondary)]">{subtitle}</p>
      </HiveCardHeader>
      <HiveCardContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-primary)]" />
          </div>
        ) : schools.length === 0 ? (
          emptyState ?? (
            <div className="rounded-xl border border-[var(--hive-border-primary)]/40 bg-[var(--hive-background-elevated)] px-4 py-6 text-center text-sm text-[var(--hive-text-secondary)]">
              No active campuses available.
            </div>
          )
        ) : (
          <div className="space-y-2">
            {schools.map((school) => (
              <button
                key={school.id}
                type="button"
                onClick={() => onSelect?.(school)}
                className="w-full rounded-xl border border-[var(--hive-border-primary)]/40 bg-[var(--hive-background-elevated)] px-4 py-3 text-left transition-colors hover:border-[var(--hive-brand-primary)]/60 hover:bg-[var(--hive-brand-primary)]/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[var(--hive-text-primary)]">{school.name}</div>
                    {school.location && (
                      <div className="text-xs text-[var(--hive-text-muted)]">{school.location}</div>
                    )}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">@{school.domain}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </HiveCardContent>
    </HiveCard>
  );
}

export default LoginSchoolSelectionCard;
