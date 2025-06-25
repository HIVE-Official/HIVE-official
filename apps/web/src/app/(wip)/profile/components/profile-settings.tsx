"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Textarea,
  Switch,
  Label,
} from "@hive/ui";
import { Save, Shield, Bell, Eye, Trash2 } from "lucide-react";
import type { User } from "@hive/core";

interface ProfileSettingsProps {
  user: User;
}

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                defaultValue={user.fullName}
                className="mt-1 bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="handle" className="text-gray-300">
                Handle
              </Label>
              <Input
                id="handle"
                defaultValue={user.handle}
                className="mt-1 bg-gray-800 border-gray-600 text-white"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="text-gray-300">
              Bio
            </Label>
            <Textarea
              id="bio"
              defaultValue=""
              placeholder="Tell others about yourself..."
              className="mt-1 bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="major" className="text-gray-300">
                Major
              </Label>
              <Input
                id="major"
                defaultValue={user.major || ""}
                className="mt-1 bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="graduationYear" className="text-gray-300">
                Graduation Year
              </Label>
              <Input
                id="graduationYear"
                type="number"
                defaultValue={user.graduationYear || ""}
                className="mt-1 bg-gray-800 border-gray-600 text-white"
                min="2024"
                max="2030"
              />
            </div>
          </div>

          <Button className="bg-gold text-black hover:bg-gold/90">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Profile Visibility</Label>
              <p className="text-sm text-gray-500">
                Control who can see your profile information
              </p>
            </div>
            <Switch checked={user.isPublic} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Show Activity Status</Label>
              <p className="text-sm text-gray-500">
                Let others see when you&apos;re active on HIVE
              </p>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Analytics Tracking</Label>
              <p className="text-sm text-gray-500">
                Help improve HIVE with anonymized usage data
              </p>
            </div>
            <Switch checked={user.builderAnalyticsEnabled !== false} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Builder Status Visible</Label>
              <p className="text-sm text-gray-500">
                Show your builder badge on your profile
              </p>
            </div>
            <Switch checked={user.isBuilder} />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Space Notifications</Label>
              <p className="text-sm text-gray-500">
                Get notified about activity in your Spaces
              </p>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Tool Updates</Label>
              <p className="text-sm text-gray-500">
                Notifications when your Tools are used or updated
              </p>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Weekly Digest</Label>
              <p className="text-sm text-gray-500">
                Summary of your HIVE activity each week
              </p>
            </div>
            <Switch checked={true} />
          </div>
        </CardContent>
      </Card>

      {/* Data & Account */}
      <Card className="border-red-500/20 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="h-5 w-5" />
            Data & Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
            <p className="text-xs text-gray-500">
              Export all your HIVE data in JSON format
            </p>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Request Data Deletion
            </Button>
            <p className="text-xs text-gray-500">
              Request deletion of specific data types
            </p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="space-y-2">
              <Button
                variant="destructive"
                className="w-full justify-start bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
              <p className="text-xs text-gray-500">
                Permanently delete your HIVE account and all associated data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
