"use client";
// Bounded Context Owner: Community Guild
import { MembersRoster, type SpaceMember, type MemberRole } from "@hive/ui";

export function MembersClient(props: {
  members: SpaceMember[];
  totalCount: number;
  viewerRole: MemberRole;
}): JSX.Element {
  const { members, totalCount, viewerRole } = props;
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <MembersRoster
        members={members}
        totalCount={totalCount}
        currentUserRole={viewerRole}
        // Handlers may be wired later to API routes when available
      />
    </div>
  );
}
