// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  profileConnectionSchema,
  profileConnectionStateSchema
} from "../../../../profile/profile.contract";
import {
  connectProfiles,
  disconnectProfiles,
  refreshConnections
} from "../../../../server/profile/profile.service";
import { isProfileServiceError } from "../../../../server/profile/profile.errors";

const connectionsQuerySchema = z.object({
  profileId: z.string().min(1)
});

const connectionsMutationSchema = z.object({
  profileId: z.string().min(1),
  targetProfileId: z.string().min(1)
});

const resolveStatus = (error: unknown): number => {
  if (error instanceof Error && error.message === "Profile not found") {
    return 404;
  }
  return 500;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = connectionsQuerySchema.safeParse({
      profileId: searchParams.get("profileId") ?? ""
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const connections = await refreshConnections(parsed.data.profileId);
    return NextResponse.json(profileConnectionStateSchema.parse(connections));
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load connections" },
      { status: resolveStatus(error) }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = connectionsMutationSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message ?? "Invalid connection payload" },
        { status: 400 }
      );
    }

    const connection = await connectProfiles(parsed.data.profileId, parsed.data.targetProfileId);
    return NextResponse.json(profileConnectionSchema.parse(connection));
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to connect profile" },
      { status: resolveStatus(error) }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = connectionsMutationSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message ?? "Invalid connection payload" },
        { status: 400 }
      );
    }

    await disconnectProfiles(parsed.data.profileId, parsed.data.targetProfileId);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to disconnect profile" },
      { status: resolveStatus(error) }
    );
  }
}
