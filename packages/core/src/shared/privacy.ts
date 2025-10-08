export type GhostModeLevel = "minimal" | "moderate" | "maximum";
export type DetailedGhostModeLevel = "invisible" | "minimal" | "selective" | "normal";

export interface ProfilePrivacySettings {
  isPublic: boolean;
  showEmail: boolean;
  showSchool: boolean;
  showMajor: boolean;
  showGraduationYear: boolean;
  showActivity: boolean;
  showSpaces: boolean;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  allowSpaceInvites: boolean;
  allowEventInvites: boolean;
  allowAnalytics: boolean;
  allowPersonalization: boolean;
  ghostMode: {
    enabled: boolean;
    level: GhostModeLevel;
    hideActivity: boolean;
    hideOnlineStatus: boolean;
    hideMemberships: boolean;
  };
}

export const defaultProfilePrivacySettings: ProfilePrivacySettings = {
  isPublic: false,
  showEmail: false,
  showSchool: true,
  showMajor: true,
  showGraduationYear: true,
  showActivity: true,
  showSpaces: true,
  showOnlineStatus: true,
  allowDirectMessages: true,
  allowSpaceInvites: true,
  allowEventInvites: true,
  allowAnalytics: true,
  allowPersonalization: true,
  ghostMode: {
    enabled: false,
    level: "minimal",
    hideActivity: false,
    hideOnlineStatus: false,
    hideMemberships: false,
  },
};

export interface DetailedPrivacySettings {
  userId: string;
  ghostMode: {
    enabled: boolean;
    level: DetailedGhostModeLevel;
    hideFromDirectory: boolean;
    hideActivity: boolean;
    hideSpaceMemberships: boolean;
    hideLastSeen: boolean;
    hideOnlineStatus: boolean;
  };
  profileVisibility: {
    showToSpaceMembers: boolean;
    showToFollowers: boolean;
    showToPublic: boolean;
    hideProfilePhoto: boolean;
    hideHandle: boolean;
    hideInterests: boolean;
  };
  activitySharing: {
    shareActivityData: boolean;
    shareSpaceActivity: boolean;
    shareToolUsage: boolean;
    shareContentCreation: boolean;
    allowAnalytics: boolean;
  };
  notifications: {
    enableActivityNotifications: boolean;
    enableSpaceNotifications: boolean;
    enableToolNotifications: boolean;
    enableRitualNotifications: boolean;
  };
  dataRetention: {
    retainActivityData: boolean;
    retentionPeriod: number;
    autoDeleteInactiveData: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export const defaultDetailedPrivacySettings: Omit<DetailedPrivacySettings, "userId" | "createdAt" | "updatedAt"> = {
  ghostMode: {
    enabled: false,
    level: "normal",
    hideFromDirectory: false,
    hideActivity: false,
    hideSpaceMemberships: false,
    hideLastSeen: false,
    hideOnlineStatus: false,
  },
  profileVisibility: {
    showToSpaceMembers: true,
    showToFollowers: true,
    showToPublic: false,
    hideProfilePhoto: false,
    hideHandle: false,
    hideInterests: false,
  },
  activitySharing: {
    shareActivityData: false,
    shareSpaceActivity: true,
    shareToolUsage: false,
    shareContentCreation: true,
    allowAnalytics: true,
  },
  notifications: {
    enableActivityNotifications: true,
    enableSpaceNotifications: true,
    enableToolNotifications: true,
    enableRitualNotifications: true,
  },
  dataRetention: {
    retainActivityData: true,
    retentionPeriod: 365,
    autoDeleteInactiveData: false,
  },
};
