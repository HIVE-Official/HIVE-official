// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  profileBundleSchema,
  profileSnapshotSchema,
  profileUpdatePayloadSchema
} from "../../../profile/profile.contract";
import { fetchProfileBundle, updateProfileDetails } from "../../../server/profile/profile.service";
import { isProfileServiceError } from "../../../server/profile/profile.errors";

const profileQuerySchema = z.object({
  profileId: z.string().min(1)
});

const profilePatchSchema = z.object({
  profileId: z.string().min(1),
  profile: profileUpdatePayloadSchema
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
    const parsed = profileQuerySchema.safeParse({
      profileId: searchParams.get("profileId") ?? ""
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    const bundle = await fetchProfileBundle(parsed.data.profileId);
    return NextResponse.json(profileBundleSchema.parse(bundle));
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load profile" },
      { status: resolveStatus(error) }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = profilePatchSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message ?? "Invalid profile update payload" },
        { status: 400 }
      );
    }

    const snapshot = await updateProfileDetails(parsed.data.profileId, parsed.data.profile);
    return NextResponse.json(profileSnapshotSchema.parse(snapshot));
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update profile" },
      { status: resolveStatus(error) }
    );
  }
}
