// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  profilePrivacySettingsSchema,
  profilePrivacyUpdatePayloadSchema
} from "../../../../profile/profile.contract";
import { updateProfilePrivacy } from "../../../../server/profile/profile.service";
import { isProfileServiceError } from "../../../../server/profile/profile.errors";

const privacyPatchSchema = z.object({
  profileId: z.string().min(1),
  privacy: profilePrivacyUpdatePayloadSchema
});

const resolveStatus = (error: unknown): number => {
  if (error instanceof Error && error.message === "Profile not found") {
    return 404;
  }
  return 500;
};

export async function PATCH(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = privacyPatchSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message ?? "Invalid privacy payload" },
        { status: 400 }
      );
    }

    const privacy = await updateProfilePrivacy(parsed.data.profileId, parsed.data.privacy);
    return NextResponse.json(profilePrivacySettingsSchema.parse(privacy));
  } catch (error) {
    if (isProfileServiceError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update privacy" },
      { status: resolveStatus(error) }
    );
  }
}
