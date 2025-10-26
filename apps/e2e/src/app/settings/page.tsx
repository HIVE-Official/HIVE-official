"use client";

import { useAuth } from "@auth";
import { Card, CardContent, CardHeader, CardTitle, Switch, Text } from "@hive/ui";
import { useState } from "react";

export default function SettingsPage(): JSX.Element {
  const { state, actions } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-3xl space-y-6">
        <div className="space-y-1">
          <CardTitle>Sandbox settings</CardTitle>
          <Text variant="muted">Toggle UI affordances exactly as the production settings shell would render them.</Text>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Text variant="muted" className="text-sm">Status: {state.status}</Text>
            <Text variant="muted" className="text-sm">Email: {state.email ?? "—"}</Text>
            <Text variant="muted" className="text-sm">Profile ID: {state.profileId ?? "—"}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <Text className="font-medium">Enable mock notifications</Text>
              <Text variant="muted" className="text-sm">Flip to preview switch styling and focus states.</Text>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={(value: boolean) => setNotificationsEnabled(Boolean(value))} />
          </CardContent>
        </Card>
        <Text variant="muted" className="text-xs">
          Signing out resets the mock session only — no production services are called.
        </Text>
      </div>
    </main>
  );
}
