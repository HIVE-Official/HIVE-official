/**
 * React hooks for HIVE safety features
 * Provides client-side functionality for reporting, blocking, and privacy controls
 */

import { useState, useCallback } from "react";
import { httpsCallable, type Functions } from "firebase/functions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ReportReason,
  PrivacySettingsData,
  BlockedUserData,
} from "@hive/core";

// Firebase functions (to be initialized with Firebase app)
declare const functions: Functions;

/**
 * Hook for reporting users or content
 */
export function useReportUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reportUserFn = httpsCallable(functions, "reportUser");

  const reportUser = useCallback(
    async ({
      reportedUserId,
      reportedContentId,
      reportedContentType,
      reason,
      description,
      screenshots,
      additionalContext,
    }: {
      reportedUserId?: string;
      reportedContentId?: string;
      reportedContentType?:
        | "profile"
        | "post"
        | "comment"
        | "message"
        | "space";
      reason: ReportReason;
      description: string;
      screenshots?: string[];
      additionalContext?: string;
    }) => {
      setIsSubmitting(true);
      try {
        const result = await reportUserFn({
          reportedUserId,
          reportedContentId,
          reportedContentType,
          reason,
          description,
          screenshots,
          additionalContext,
        });

        return result.data;
      } catch (error) {
        console.error("Error reporting user:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [reportUserFn]
  );

  return {
    reportUser,
    isSubmitting,
  };
}

/**
 * Hook for blocking and unblocking users
 */
export function useBlockUser() {
  const queryClient = useQueryClient();
  const blockUserFn = httpsCallable(functions, "blockUser");
  const unblockUserFn = httpsCallable(functions, "unblockUser");

  const blockMutation = useMutation({
    mutationFn: async ({
      blockedUserId,
      reason,
      isTemporary,
      durationDays,
    }: {
      blockedUserId: string;
      reason?: string;
      isTemporary?: boolean;
      durationDays?: number;
    }) => {
      const result = await blockUserFn({
        blockedUserId,
        reason,
        isTemporary,
        durationDays,
      });
      return result.data;
    },
    onSuccess: () => {
      // Invalidate blocked users query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
    },
  });

  const unblockMutation = useMutation({
    mutationFn: async ({ blockedUserId }: { blockedUserId: string }) => {
      const result = await unblockUserFn({ blockedUserId });
      return result.data;
    },
    onSuccess: () => {
      // Invalidate blocked users query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
    },
  });

  return {
    blockUser: blockMutation.mutate,
    unblockUser: unblockMutation.mutate,
    isBlocking: blockMutation.isPending,
    isUnblocking: unblockMutation.isPending,
    blockError: blockMutation.error,
    unblockError: unblockMutation.error,
  };
}

/**
 * Hook for getting the list of blocked users
 */
export function useBlockedUsers() {
  const getBlockedUsersFn = httpsCallable(functions, "getBlockedUsers");

  return useQuery({
    queryKey: ["blockedUsers"],
    queryFn: async (): Promise<BlockedUserData[]> => {
      const result = await getBlockedUsersFn({});
      return (result.data as any).blockedUsers || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for checking if a specific user is blocked
 */
export function useIsUserBlocked(userId: string) {
  const { data: blockedUsers, isLoading } = useBlockedUsers();

  const isBlocked =
    blockedUsers?.some((block) => block.blockedId === userId) ?? false;

  return {
    isBlocked,
    isLoading,
  };
}

/**
 * Hook for privacy settings management
 */
export function usePrivacySettings() {
  const queryClient = useQueryClient();
  const updatePrivacySettingsFn = httpsCallable(
    functions,
    "updatePrivacySettings"
  );
  const getPrivacySettingsFn = httpsCallable(functions, "getPrivacySettings");

  // Query for getting current privacy settings
  const privacyQuery = useQuery({
    queryKey: ["privacySettings"],
    queryFn: async (): Promise<PrivacySettingsData> => {
      const result = await getPrivacySettingsFn({});
      return (result.data as any).privacySettings;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for updating privacy settings
  const updateMutation = useMutation({
    mutationFn: async (privacySettings: Partial<PrivacySettingsData>) => {
      const result = await updatePrivacySettingsFn({ privacySettings });
      return result.data;
    },
    onSuccess: (data) => {
      // Update the cached privacy settings
      queryClient.setQueryData(
        ["privacySettings"],
        (data as any).updatedSettings
      );
    },
  });

  return {
    privacySettings: privacyQuery.data,
    isLoading: privacyQuery.isLoading,
    error: privacyQuery.error,
    updatePrivacySettings: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}

/**
 * Hook for safety utilities and helpers
 */
export function useSafetyUtils() {
  const { data: blockedUsers } = useBlockedUsers();

  // Filter content based on blocked users
  const filterBlockedContent = useCallback(
    <T extends { userId?: string; authorId?: string }>(items: T[]): T[] => {
      if (!blockedUsers || blockedUsers.length === 0) return items;

      const blockedUserIds = new Set(
        blockedUsers.map((block) => block.blockedId)
      );

      return items.filter((item) => {
        const userId = item.userId || item.authorId;
        return userId ? !blockedUserIds.has(userId) : true;
      });
    },
    [blockedUsers]
  );

  // Check if content should be filtered
  const shouldFilterContent = useCallback(
    (userId: string): boolean => {
      if (!blockedUsers) return false;
      return blockedUsers.some((block) => block.blockedId === userId);
    },
    [blockedUsers]
  );

  // Get safety indicators for a user
  const getSafetyInfo = useCallback(
    (userId: string) => {
      const blockedUser = blockedUsers?.find(
        (block) => block.blockedId === userId
      );

      return {
        isBlocked: !!blockedUser,
        blockReason: blockedUser?.reason,
        blockedAt: blockedUser?.blockedAt,
        isTemporaryBlock: blockedUser?.isTemporary,
        blockExpiresAt: blockedUser?.expiresAt,
      };
    },
    [blockedUsers]
  );

  return {
    filterBlockedContent,
    shouldFilterContent,
    getSafetyInfo,
    blockedUserCount: blockedUsers?.length || 0,
  };
}

/**
 * Hook for content filtering based on user preferences
 */
export function useContentFilter() {
  const { privacySettings } = usePrivacySettings();

  const shouldFilterContent = useCallback(
    (content: {
      type?: string;
      tags?: string[];
      authorSafetyScore?: number;
      containsExplicitContent?: boolean;
    }) => {
      if (!privacySettings) return false;

      // Filter explicit content if user preference is set
      if (
        privacySettings.filterExplicitContent &&
        content.containsExplicitContent
      ) {
        return true;
      }

      // Filter content from low-trust users if auto-block is enabled
      if (
        privacySettings.autoBlockSuspiciousAccounts &&
        content.authorSafetyScore !== undefined &&
        content.authorSafetyScore < 20
      ) {
        return true;
      }

      return false;
    },
    [privacySettings]
  );

  return {
    shouldFilterContent,
    filterSettings: privacySettings
      ? {
          filterExplicitContent: privacySettings.filterExplicitContent,
          autoBlockSuspiciousAccounts:
            privacySettings.autoBlockSuspiciousAccounts,
        }
      : null,
  };
}

/**
 * Hook for profile visibility checks
 */
export function useProfileVisibility() {
  const { privacySettings } = usePrivacySettings();

  const isProfileVisible = useCallback(
    (
      profileUserId: string,
      currentUserId: string,
      viewerRelationship?: "same_school" | "connection" | "stranger"
    ) => {
      if (!privacySettings || profileUserId === currentUserId) return true;

      switch (privacySettings.profileVisibility) {
        case "public":
          return true;
        case "school_only":
          return (
            viewerRelationship === "same_school" ||
            viewerRelationship === "connection"
          );
        case "private":
          return viewerRelationship === "connection";
        default:
          return false;
      }
    },
    [privacySettings]
  );

  const getVisibleFields = useCallback(
    (
      profileUserId: string,
      currentUserId: string,
      viewerRelationship?: "same_school" | "connection" | "stranger"
    ) => {
      if (!privacySettings || profileUserId === currentUserId) {
        return {
          showRealName: true,
          showMajor: true,
          showGraduationYear: true,
          showAvatar: true,
        };
      }

      const isStranger = viewerRelationship === "stranger";

      return {
        showRealName: privacySettings.showRealName,
        showMajor: privacySettings.showMajor,
        showGraduationYear: privacySettings.showGraduationYear,
        showAvatar: !isStranger || privacySettings.showAvatarToStranger,
      };
    },
    [privacySettings]
  );

  return {
    isProfileVisible,
    getVisibleFields,
    profileVisibility: privacySettings?.profileVisibility,
  };
}
