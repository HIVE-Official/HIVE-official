"use client";

import { useMemo, useState } from "react";
import { useProfile } from "@profile";
import { Button, Card, CardContent, CardHeader, CardTitle, Heading, Input, Label, Text, Textarea } from "@hive/ui";
import { ProfileLayout } from "@hive/ui";
import { mapBundleToProfileLayout } from "../../lib/profile-mappers";

export default function ProfilePage(): JSX.Element {
  const { profile, connections, activity, recommendations, actions } = useProfile();

  const layoutProps = useMemo(() => {
    if (!profile || !connections || !activity || !recommendations) return null;
    return mapBundleToProfileLayout({ profile, connections, activity, recommendations });
  }, [profile, connections, activity, recommendations]);

  const [bioDraft, setBioDraft] = useState<string>(profile?.identity.personalInfo?.bio ?? "");
  const [handleDraft, setHandleDraft] = useState<string>(profile?.identity.handle ?? "");
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <main className="page px-page py-section">
      <div className="container-page space-y-8">
        <div className="space-y-1">
          <Heading level="h1" className="text-3xl font-semibold">Profile</Heading>
          <Text variant="muted">Always-on UI driven by the in-memory profile client, aligned with @hive/ui components.</Text>
        </div>

        {layoutProps ? (
          <ProfileLayout
            {...layoutProps}
          />
        ) : (
          <Text>Loading profile…</Text>
        )}

        {profile ? (
          <Card>
            <CardHeader>
              <CardTitle>Quick edits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="handle">Handle</Label>
                <Input
                  id="handle"
                  value={handleDraft}
                  onChange={(e) => setHandleDraft(e.target.value)}
                  placeholder="your_handle"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bioDraft}
                  onChange={(e) => setBioDraft(e.target.value)}
                  placeholder="Tell others what you’re coordinating."
                />
              </div>
              <div className="flex gap-2">
                <Button
                  disabled={saving}
                  onClick={async () => {
                    setSaving(true);
                    try {
                      await actions.updateProfile({
                        handle: handleDraft.trim() || undefined,
                        personalInfo: { bio: bioDraft.trim() || undefined }
                      });
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
              <Text variant="muted" className="text-sm">Edits persist only in memory for the e2e sandbox.</Text>
            </CardContent>
          </Card>
        ) : null}

        {profile ? (
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(["public", "campus", "connections"] as const).map((v) => (
                  <Button
                    key={v}
                    variant={profile.privacy.visibility === v ? "default" : "outline"}
                    onClick={async () => {
                      await actions.updatePrivacy({ visibility: v });
                    }}
                  >
                    {v === "public" ? "Public" : v === "campus" ? "Campus" : "Connections"}
                  </Button>
                ))}
              </div>
              <Text variant="muted" className="text-sm">This mirrors the banner above; changes update the in-memory snapshot.</Text>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
