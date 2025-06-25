"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Slider,
  Switch,
  Label,
  Separator,
  Badge,
  Input,
} from "@hive/ui";
import { ArrowLeft, Sliders, Eye, EyeOff, Plus, X } from "lucide-react";
import Link from "next/link";
import { logger } from "@hive/core";

interface AlgorithmPreferences {
  contentTypeWeights: {
    events: number;
    posts: number;
    tools: number;
  };
  sourcePreferences: {
    joinedSpacesBoost: number;
    campusWideWeight: number;
  };
  engagementWeight: number;
  recencyWeight: number;
  surgeContentBoost: number;
  eventDensityCap: number;
}

interface ContentFilters {
  blockedTopics: string[];
  mutedUsers: string[];
  hiddenContentTypes: string[];
  minimumEngagementThreshold: number;
}

interface NotificationSettings {
  feedUpdates: boolean;
  newPosts: boolean;
  reactions: boolean;
  comments: boolean;
  mentions: boolean;
  spaceActivity: boolean;
  frequency: "instant" | "hourly" | "daily" | "none";
}

interface FeedSettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  // Add other properties as needed
}

const defaultAlgorithmPrefs: AlgorithmPreferences = {
  contentTypeWeights: {
    events: 30,
    posts: 20,
    tools: 10,
  },
  sourcePreferences: {
    joinedSpacesBoost: 10,
    campusWideWeight: 50,
  },
  engagementWeight: 75,
  recencyWeight: 85,
  surgeContentBoost: 25,
  eventDensityCap: 5,
};

const defaultContentFilters: ContentFilters = {
  blockedTopics: [],
  mutedUsers: [],
  hiddenContentTypes: [],
  minimumEngagementThreshold: 0,
};

const defaultNotificationSettings: NotificationSettings = {
  feedUpdates: true,
  newPosts: true,
  reactions: true,
  comments: true,
  mentions: true,
  spaceActivity: false,
  frequency: "hourly",
};

export default function FeedSettingsPage() {
  const [algorithmPrefs, setAlgorithmPrefs] = useState<AlgorithmPreferences>(
    defaultAlgorithmPrefs
  );
  const [contentFilters, setContentFilters] = useState<ContentFilters>(
    defaultContentFilters
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(defaultNotificationSettings);
  const [activeTab, setActiveTab] = useState("algorithm");
  const [previewMode, setPreviewMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState("");
  const [newUserInput, setNewUserInput] = useState("");
  const [_settings, setSettings] = useState<FeedSettingsData>({
    emailNotifications: true,
    pushNotifications: true,
  });
  const [_isLoading, setIsLoading] = useState(false);

  // Track changes
  useEffect(() => {
    setHasChanges(true);
  }, [algorithmPrefs, contentFilters, notificationSettings]);

  const _handleSettingChange = (setting: string, value: boolean) => {
    // Handle setting change without console logging
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const _handleSave = async () => {
    // Handle save without console logging
    try {
      // Save settings logic here
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Handle error properly
      logger.error(error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Implement API calls to save settings
      logger.info("Saving settings:", {
        algorithmPrefs,
        contentFilters,
        notificationSettings,
      });
      setHasChanges(false);
    } catch (error) {
      logger.error("Failed to save settings:", error);
    }
  };

  const handleResetToDefaults = () => {
    setAlgorithmPrefs(defaultAlgorithmPrefs);
    setContentFilters(defaultContentFilters);
    setNotificationSettings(defaultNotificationSettings);
  };

  const handleAlgorithmChange = <K extends keyof AlgorithmPreferences>(
    key: K,
    value: AlgorithmPreferences[K]
  ) => {
    setAlgorithmPrefs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addBlockedTopic = () => {
    if (
      newTopicInput.trim() &&
      !contentFilters.blockedTopics.includes(newTopicInput.trim())
    ) {
      setContentFilters((prev) => ({
        ...prev,
        blockedTopics: [...prev.blockedTopics, newTopicInput.trim()],
      }));
      setNewTopicInput("");
    }
  };

  const removeBlockedTopic = (topic: string) => {
    setContentFilters((prev) => ({
      ...prev,
      blockedTopics: prev.blockedTopics.filter((t) => t !== topic),
    }));
  };

  const addMutedUser = () => {
    if (
      newUserInput.trim() &&
      !contentFilters.mutedUsers.includes(newUserInput.trim())
    ) {
      setContentFilters((prev) => ({
        ...prev,
        mutedUsers: [...prev.mutedUsers, newUserInput.trim()],
      }));
      setNewUserInput("");
    }
  };

  const removeMutedUser = (user: string) => {
    setContentFilters((prev) => ({
      ...prev,
      mutedUsers: prev.mutedUsers.filter((u) => u !== user),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/feed"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Feed</span>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-gray-700" />
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-yellow-500" />
              <h1 className="text-xl font-semibold">Feed Settings</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              {previewMode ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {previewMode ? "Hide Preview" : "Preview Changes"}
            </Button>
            {hasChanges && (
              <Badge
                variant="secondary"
                className="bg-yellow-500/20 text-yellow-300"
              >
                Unsaved Changes
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 ${previewMode ? "pr-0" : ""}`}>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
              {[
                { id: "algorithm", label: "Algorithm Preferences" },
                { id: "filters", label: "Content Filters" },
                { id: "notifications", label: "Notifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-yellow-500 text-black"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Algorithm Preferences Tab */}
            {activeTab === "algorithm" && (
              <div className="space-y-6">
                {/* Content Type Weights */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Content Type Priorities
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Adjust how much you want to see different types of content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">Events</Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.contentTypeWeights.events} points
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.contentTypeWeights.events]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("contentTypeWeights", {
                              ...algorithmPrefs.contentTypeWeights,
                              events: value,
                            })
                          }
                          max={50}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Campus events, meetings, social gatherings
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">Posts</Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.contentTypeWeights.posts} points
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.contentTypeWeights.posts]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("contentTypeWeights", {
                              ...algorithmPrefs.contentTypeWeights,
                              posts: value,
                            })
                          }
                          max={50}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Regular posts, discussions, updates
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">
                            Tools & Interactive Content
                          </Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.contentTypeWeights.tools} points
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.contentTypeWeights.tools]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("contentTypeWeights", {
                              ...algorithmPrefs.contentTypeWeights,
                              tools: value,
                            })
                          }
                          max={50}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Polls, prompts, interactive tools
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Source Preferences */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Source Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Control content from your joined spaces vs campus-wide
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-white">
                          Joined Spaces Boost
                        </Label>
                        <span className="text-sm text-gray-400">
                          +{algorithmPrefs.sourcePreferences.joinedSpacesBoost}{" "}
                          points
                        </span>
                      </div>
                      <Slider
                        value={[
                          algorithmPrefs.sourcePreferences.joinedSpacesBoost,
                        ]}
                        onValueChange={([value]) =>
                          handleAlgorithmChange("sourcePreferences", {
                            ...algorithmPrefs.sourcePreferences,
                            joinedSpacesBoost: value,
                          })
                        }
                        max={25}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Extra priority for content from spaces you&apos;ve
                        joined
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-white">
                          Campus-wide Content Weight
                        </Label>
                        <span className="text-sm text-gray-400">
                          {algorithmPrefs.sourcePreferences.campusWideWeight}%
                        </span>
                      </div>
                      <Slider
                        value={[
                          algorithmPrefs.sourcePreferences.campusWideWeight,
                        ]}
                        onValueChange={([value]) =>
                          handleAlgorithmChange("sourcePreferences", {
                            ...algorithmPrefs.sourcePreferences,
                            campusWideWeight: value,
                          })
                        }
                        max={100}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        How much campus-wide content to include
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Algorithm Controls */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Advanced Algorithm Controls
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Fine-tune the ranking algorithm behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">
                            Engagement Weight
                          </Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.engagementWeight}%
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.engagementWeight]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("engagementWeight", value)
                          }
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          How much reactions/comments matter
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">Recency Weight</Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.recencyWeight}%
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.recencyWeight]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("recencyWeight", value)
                          }
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Preference for newer content
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">
                            Trending Content Boost
                          </Label>
                          <span className="text-sm text-gray-400">
                            +{algorithmPrefs.surgeContentBoost} points
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.surgeContentBoost]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("surgeContentBoost", value)
                          }
                          max={50}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Extra boost for trending/viral content
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-white">
                            Daily Events Limit
                          </Label>
                          <span className="text-sm text-gray-400">
                            {algorithmPrefs.eventDensityCap} events
                          </span>
                        </div>
                        <Slider
                          value={[algorithmPrefs.eventDensityCap]}
                          onValueChange={([value]) =>
                            handleAlgorithmChange("eventDensityCap", value)
                          }
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Maximum events shown per day
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Content Filters Tab */}
            {activeTab === "filters" && (
              <div className="space-y-6">
                {/* Blocked Topics */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Blocked Topics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Hide content related to specific topics or keywords
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add topic to block (e.g., 'politics', 'sports')"
                        value={newTopicInput}
                        onChange={(e) => setNewTopicInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addBlockedTopic()
                        }
                        className="flex-1 bg-gray-700 border-gray-600 text-white"
                      />
                      <Button
                        onClick={addBlockedTopic}
                        className="bg-yellow-500 text-black hover:bg-yellow-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {contentFilters.blockedTopics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {contentFilters.blockedTopics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="bg-gray-700 text-gray-200"
                          >
                            {topic}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBlockedTopic(topic)}
                              className="ml-1 h-4 w-4 p-0 text-gray-400 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Muted Users */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Muted Users</CardTitle>
                    <CardDescription className="text-gray-400">
                      Hide content from specific users
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add user to mute (username or email)"
                        value={newUserInput}
                        onChange={(e) => setNewUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addMutedUser()}
                        className="flex-1 bg-gray-700 border-gray-600 text-white"
                      />
                      <Button
                        onClick={addMutedUser}
                        className="bg-yellow-500 text-black hover:bg-yellow-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {contentFilters.mutedUsers.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {contentFilters.mutedUsers.map((user) => (
                          <Badge
                            key={user}
                            variant="secondary"
                            className="bg-gray-700 text-gray-200"
                          >
                            {user}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMutedUser(user)}
                              className="ml-1 h-4 w-4 p-0 text-gray-400 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Content Type Filters */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Content Type Filters
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose which types of content to hide completely
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "polls",
                        "media-posts",
                        "event-cards",
                        "join-forms",
                      ].map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <Label className="text-white capitalize">
                            {type.replace("-", " ")}
                          </Label>
                          <Switch
                            checked={
                              !contentFilters.hiddenContentTypes.includes(type)
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setContentFilters((prev) => ({
                                  ...prev,
                                  hiddenContentTypes:
                                    prev.hiddenContentTypes.filter(
                                      (t) => t !== type
                                    ),
                                }));
                              } else {
                                setContentFilters((prev) => ({
                                  ...prev,
                                  hiddenContentTypes: [
                                    ...prev.hiddenContentTypes,
                                    type,
                                  ],
                                }));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Threshold */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Minimum Engagement Threshold
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Hide content with fewer reactions than this threshold
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-white">Minimum Reactions</Label>
                        <span className="text-sm text-gray-400">
                          {contentFilters.minimumEngagementThreshold} reactions
                        </span>
                      </div>
                      <Slider
                        value={[contentFilters.minimumEngagementThreshold]}
                        onValueChange={([value]) =>
                          handleAlgorithmChange(
                            "minimumEngagementThreshold",
                            value
                          )
                        }
                        max={20}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                {/* Notification Types */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Control what notifications you receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        {
                          key: "feedUpdates",
                          label: "Feed Updates",
                          description: "New content in your feed",
                        },
                        {
                          key: "newPosts",
                          label: "New Posts",
                          description: "Posts in spaces you follow",
                        },
                        {
                          key: "reactions",
                          label: "Reactions",
                          description: "When someone reacts to your content",
                        },
                        {
                          key: "comments",
                          label: "Comments",
                          description: "Comments on your posts",
                        },
                        {
                          key: "mentions",
                          label: "Mentions",
                          description: "When you're mentioned in content",
                        },
                        {
                          key: "spaceActivity",
                          label: "Space Activity",
                          description: "Updates from your joined spaces",
                        },
                      ].map(({ key, label, description }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <Label className="text-white">{label}</Label>
                            <p className="text-xs text-gray-500">
                              {description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notificationSettings[
                                key as keyof NotificationSettings
                              ] as boolean
                            }
                            onCheckedChange={(checked) =>
                              handleAlgorithmChange(key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Frequency */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Notification Frequency
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      How often to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: "instant", label: "Instant" },
                        { value: "hourly", label: "Hourly" },
                        { value: "daily", label: "Daily" },
                        { value: "none", label: "None" },
                      ].map(({ value, label }) => (
                        <Button
                          key={value}
                          variant={
                            notificationSettings.frequency === value
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            handleAlgorithmChange(
                              "frequency",
                              value as NotificationSettings["frequency"]
                            )
                          }
                          className={`w-full ${
                            notificationSettings.frequency === value
                              ? "bg-yellow-500 text-black hover:bg-yellow-600"
                              : "border-gray-600 text-gray-300 hover:text-white"
                          }`}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <Button
                variant="outline"
                onClick={handleResetToDefaults}
                className="border-gray-600 text-gray-300 hover:text-white"
              >
                Reset to Defaults
              </Button>
              <div className="flex gap-3">
                <Link href="/feed">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  onClick={handleSaveSettings}
                  disabled={!hasChanges}
                  className="bg-yellow-500 text-black hover:bg-yellow-600 disabled:opacity-50"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {previewMode && (
          <div className="w-96 border-l border-gray-700 bg-gray-800 p-4">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Live Preview
              </h3>
              <Card className="bg-gray-900 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-sm text-yellow-400">
                    Algorithm Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Events priority:</span>
                    <span className="text-white">
                      {algorithmPrefs.contentTypeWeights.events}pts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Posts priority:</span>
                    <span className="text-white">
                      {algorithmPrefs.contentTypeWeights.posts}pts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tools priority:</span>
                    <span className="text-white">
                      {algorithmPrefs.contentTypeWeights.tools}pts
                    </span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Joined spaces boost:</span>
                    <span className="text-white">
                      +{algorithmPrefs.sourcePreferences.joinedSpacesBoost}pts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blocked topics:</span>
                    <span className="text-white">
                      {contentFilters.blockedTopics.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Muted users:</span>
                    <span className="text-white">
                      {contentFilters.mutedUsers.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
