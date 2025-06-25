"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@hive/ui";
import { type MemberRole } from "@hive/core";
import { useAuth } from "@hive/auth-logic";
import { Loader2, CheckCircle, LogOut, Crown } from "lucide-react";
import { toast } from "sonner";
import { logger } from "@hive/core";

interface MembershipStatus {
  isMember: boolean;
  role: MemberRole | null;
}

function fetchMembershipStatus(
  spaceId: string,
  userId: string
): Promise<MembershipStatus> {
  try {
    // For now, we'll assume users are auto-joined to spaces
    // In a real implementation, we'd check the user's membership in the space
    // This is a placeholder that always returns member status
    logger.info("Checking membership for:", { spaceId, userId });
    return Promise.resolve({
      isMember: true, // Placeholder - in vBETA users are auto-joined
      role: "member" as MemberRole,
    });
  } catch {
    return Promise.resolve({ isMember: false, role: null });
  }
}

// Note: joinSpace function removed since users are auto-joined in vBETA
// TODO: Re-implement when manual joining is needed

async function leaveSpace(spaceId: string): Promise<void> {
  const response = await fetch(`/api/spaces/leave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ spaceId }),
  });

  if (!response.ok) {
    const error = (await response.json()) as { error?: string };
    throw new Error(error.error || "Failed to leave space");
  }
}

export function SpaceActionButton({ spaceId }: { spaceId: string }) {
  const { user, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: membership, isLoading: membershipLoading } =
    useQuery<MembershipStatus>({
      queryKey: ["membership", spaceId, user?.uid],
      queryFn: () => fetchMembershipStatus(spaceId, user?.uid || ""),
      enabled: !!user && !!spaceId,
    });

  const leaveMutation = useMutation({
    mutationFn: () => leaveSpace(spaceId),
    onSuccess: () => {
      toast.success("You have left the space.");
      void queryClient
        .invalidateQueries({ queryKey: ["membership", spaceId] })
        .catch(logger.error);
      void queryClient
        .invalidateQueries({ queryKey: ["space", spaceId] })
        .catch(logger.error);
      void queryClient
        .invalidateQueries({ queryKey: ["spaces"] })
        .catch(logger.error);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to leave space. Please try again.");
    },
  });

  // Show loading state while auth or membership is loading
  if (authLoading || membershipLoading) {
    return (
      <Button disabled className="min-w-[140px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <Button disabled variant="outline" className="min-w-[140px]">
        Sign in to join
      </Button>
    );
  }

  // For vBETA: Manual join/leave is disabled, but we show the UI
  // In practice, users are auto-joined to spaces based on their profile
  if (!membership?.isMember) {
    return (
      <Button disabled className="min-w-[140px]" variant="outline">
        Auto-joined only
      </Button>
    );
  }

  // Member - show role-based status and leave option
  switch (membership.role) {
    case "builder":
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
            <Crown className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Builder</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              leaveMutation.mutate();
            }}
            disabled={leaveMutation.isPending}
            className="text-red-400 border-red-400/20 hover:bg-red-400/10"
          >
            {leaveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {leaveMutation.isPending ? "Leaving..." : "Leave"}
          </Button>
        </div>
      );

    case "member":
    default:
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-white">Member</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              leaveMutation.mutate();
            }}
            disabled={leaveMutation.isPending}
            className="text-red-400 border-red-400/20 hover:bg-red-400/10"
          >
            {leaveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {leaveMutation.isPending ? "Leaving..." : "Leave"}
          </Button>
        </div>
      );
  }
}
