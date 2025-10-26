"use client";
// Bounded Context Owner: Community Guild
import {
  AboutSection,
  type Space as UiSpace,
  type SpaceMember,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Separator
} from "@hive/ui";

export function AboutClient(props: {
  space: UiSpace;
  leaders: SpaceMember[];
  viewerRole: string | null;
  helperIds: string[];
  guidelines: string[];
  postingPolicy: "leaders_only" | "members";
  allowPublicPosts: boolean;
}): JSX.Element {
  const { space, leaders, viewerRole, helperIds, guidelines, postingPolicy, allowPublicPosts } = props;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <Card className="border-border/70 bg-card/90">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <AboutSection space={space} leaders={leaders} isLeader={viewerRole === "leader" || viewerRole === "admin"} />
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardHeader className="space-y-2">
          <CardTitle className="text-body font-body font-semibold">Governance & Safety</CardTitle>
          <p className="text-muted-foreground text-caption">
            UB students lean on this page for clarity before joining. Keep policies in sync with Settings so we never contradict ourselves downstream.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="text-body-sm font-semibold text-foreground">Policies at a glance</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Posting policy: {postingPolicy === "leaders_only" ? "Leaders only. Coach students before upgrading access." : "Members can post. Auto-hide catches risky behavior."}</li>
              <li>Campus sharing: {allowPublicPosts ? "Leaders and members can surface posts to the campus feed when permitted." : "This space stays members-only until governance expands access."}</li>
              <li>Join policy: open to verified UB students. Tighten once demand outpaces helpers.</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-body-sm font-semibold text-foreground">Helper contacts</h3>
            {helperIds.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {helperIds.map((helperId) => (
                  <Badge key={helperId} variant="muted" className="font-mono text-caption">
                    @{helperId.replace(/^profile-/, "")}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-caption">No designated helpers yet. Assign at least one leader or mentor.</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="text-body-sm font-semibold text-foreground">Guidelines</h3>
            {guidelines.length > 0 ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {guidelines.map((guideline) => (
                  <li key={guideline}>{guideline}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-caption">
                Add three punchy guidelines so new UB members know how to contribute without second guessing.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
