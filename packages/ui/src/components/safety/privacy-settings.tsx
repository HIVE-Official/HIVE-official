"use client";

import React, { useState } from "react";
import { Shield, Eye, MessageCircle, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface PrivacySettingsProps {
  settings?: {
    profileVisibility: "public" | "school_only" | "private";
    showRealName: boolean;
    showMajor: boolean;
    showGraduationYear: boolean;
    showAvatarToStranger: boolean;
    allowDirectMessages: "everyone" | "connections_only" | "none";
    allowSpaceInvitations: boolean;
    allowEventInvitations: boolean;
    discoverableByEmail: boolean;
    discoverableByHandle: boolean;
    showInMemberLists: boolean;
    showActivityStatus: boolean;
    requireConnectionApproval: boolean;
    autoBlockSuspiciousAccounts: boolean;
    filterExplicitContent: boolean;
    hideFromSearch: boolean;
  };
  onSettingsChange?: (settings: unknown) => void;
  isLoading?: boolean;
}

export function PrivacySettings({
  settings,
  onSettingsChange,
  isLoading = false,
}: PrivacySettingsProps) {
  const [localSettings, setLocalSettings] = useState(
    settings || {
      profileVisibility: "school_only" as const,
      showRealName: true,
      showMajor: true,
      showGraduationYear: false,
      showAvatarToStranger: true,
      allowDirectMessages: "connections_only" as const,
      allowSpaceInvitations: true,
      allowEventInvitations: true,
      discoverableByEmail: false,
      discoverableByHandle: true,
      showInMemberLists: true,
      showActivityStatus: false,
      requireConnectionApproval: true,
      autoBlockSuspiciousAccounts: true,
      filterExplicitContent: true,
      hideFromSearch: false,
    }
  );

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (key: string, value: unknown) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSettingsChange?.(localSettings);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save privacy settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLocalSettings(settings || localSettings);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-3 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>
            Control who can see your profile and personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Who can see your profile
            </Label>
            <div className="mt-2 space-y-2">
              {[
                {
                  value: "public",
                  label: "Everyone",
                  description: "Anyone can view your profile",
                },
                {
                  value: "school_only",
                  label: "School only",
                  description: "Only people from your school",
                },
                {
                  value: "private",
                  label: "Connections only",
                  description: "Only your approved connections",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option.value}
                    checked={localSettings.profileVisibility === option.value}
                    onChange={(e) =>
                      updateSetting("profileVisibility", e.target.value)
                    }
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Profile information to show
            </Label>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showRealName" className="text-sm">
                  Real name
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Show your full name on your profile
                </p>
              </div>
              <Switch
                id="showRealName"
                checked={localSettings.showRealName}
                onCheckedChange={(checked) =>
                  updateSetting("showRealName", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showMajor" className="text-sm">
                  Major
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Show your academic major
                </p>
              </div>
              <Switch
                id="showMajor"
                checked={localSettings.showMajor}
                onCheckedChange={(checked) =>
                  updateSetting("showMajor", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showGraduationYear" className="text-sm">
                  Graduation year
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Show when you're graduating
                </p>
              </div>
              <Switch
                id="showGraduationYear"
                checked={localSettings.showGraduationYear}
                onCheckedChange={(checked) =>
                  updateSetting("showGraduationYear", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showAvatarToStranger" className="text-sm">
                  Profile picture to strangers
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Show your avatar to people outside your network
                </p>
              </div>
              <Switch
                id="showAvatarToStranger"
                checked={localSettings.showAvatarToStranger}
                onCheckedChange={(checked) =>
                  updateSetting("showAvatarToStranger", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Communication
          </CardTitle>
          <CardDescription>
            Control how others can contact and interact with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Who can message you directly
            </Label>
            <div className="mt-2 space-y-2">
              {[
                {
                  value: "everyone",
                  label: "Everyone",
                  description: "Anyone can send you messages",
                },
                {
                  value: "connections_only",
                  label: "Connections only",
                  description: "Only approved connections",
                },
                {
                  value: "none",
                  label: "No one",
                  description: "Disable direct messages",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="allowDirectMessages"
                    value={option.value}
                    checked={localSettings.allowDirectMessages === option.value}
                    onChange={(e) =>
                      updateSetting("allowDirectMessages", e.target.value)
                    }
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowSpaceInvitations" className="text-sm">
                  Space invitations
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Allow others to invite you to spaces
                </p>
              </div>
              <Switch
                id="allowSpaceInvitations"
                checked={localSettings.allowSpaceInvitations}
                onCheckedChange={(checked) =>
                  updateSetting("allowSpaceInvitations", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowEventInvitations" className="text-sm">
                  Event invitations
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Allow others to invite you to events
                </p>
              </div>
              <Switch
                id="allowEventInvitations"
                checked={localSettings.allowEventInvitations}
                onCheckedChange={(checked) =>
                  updateSetting("allowEventInvitations", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireConnectionApproval" className="text-sm">
                  Connection approval
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Require approval for new connections
                </p>
              </div>
              <Switch
                id="requireConnectionApproval"
                checked={localSettings.requireConnectionApproval}
                onCheckedChange={(checked) =>
                  updateSetting("requireConnectionApproval", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discovery & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Discovery & Search
          </CardTitle>
          <CardDescription>
            Control how others can find and discover your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="discoverableByHandle" className="text-sm">
                Discoverable by username
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Others can find you by searching your username
              </p>
            </div>
            <Switch
              id="discoverableByHandle"
              checked={localSettings.discoverableByHandle}
              onCheckedChange={(checked) =>
                updateSetting("discoverableByHandle", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="discoverableByEmail" className="text-sm">
                Discoverable by email
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Others can find you using your email address
              </p>
            </div>
            <Switch
              id="discoverableByEmail"
              checked={localSettings.discoverableByEmail}
              onCheckedChange={(checked) =>
                updateSetting("discoverableByEmail", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showInMemberLists" className="text-sm">
                Show in member lists
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Appear in space and group member lists
              </p>
            </div>
            <Switch
              id="showInMemberLists"
              checked={localSettings.showInMemberLists}
              onCheckedChange={(checked) =>
                updateSetting("showInMemberLists", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showActivityStatus" className="text-sm">
                Activity status
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Show when you're online or active
              </p>
            </div>
            <Switch
              id="showActivityStatus"
              checked={localSettings.showActivityStatus}
              onCheckedChange={(checked) =>
                updateSetting("showActivityStatus", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="hideFromSearch" className="text-sm">
                Hide from search
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Don't appear in search results
              </p>
            </div>
            <Switch
              id="hideFromSearch"
              checked={localSettings.hideFromSearch}
              onCheckedChange={(checked) =>
                updateSetting("hideFromSearch", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Safety & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Safety & Security
          </CardTitle>
          <CardDescription>
            Automated safety features to protect your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoBlockSuspiciousAccounts" className="text-sm">
                Auto-block suspicious accounts
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Automatically block accounts flagged as suspicious
              </p>
            </div>
            <Switch
              id="autoBlockSuspiciousAccounts"
              checked={localSettings.autoBlockSuspiciousAccounts}
              onCheckedChange={(checked) =>
                updateSetting("autoBlockSuspiciousAccounts", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="filterExplicitContent" className="text-sm">
                Filter explicit content
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Hide content marked as explicit or inappropriate
              </p>
            </div>
            <Switch
              id="filterExplicitContent"
              checked={localSettings.filterExplicitContent}
              onCheckedChange={(checked) =>
                updateSetting("filterExplicitContent", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      {hasChanges && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200">
                  You have unsaved changes
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Your privacy settings haven't been saved yet.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSaving}
                >
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
