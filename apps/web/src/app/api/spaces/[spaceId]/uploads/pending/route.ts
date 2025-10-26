// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService } from "../../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../../server/auth/session-actor";
import { firebaseStorageBucket } from "@hive/firebase";

export const runtime = "nodejs";

const ACCEPTED = new Set(["image/", "video/"]);

const ParamsSchema = z.object({ spaceId: z.string().min(1) });

export async function POST(request: Request, context: { params: { spaceId: string } }) {
  const params = ParamsSchema.safeParse(context.params);
  if (!params.success) {
    return NextResponse.json({ success: false, error: { code: "INVALID_PARAMS" } }, { status: 400 });
  }

  const space = await spaceService.getSpaceById(params.data.spaceId);
  if (!space) {
    return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND" } }, { status: 404 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ success: false, error: { code: "INVALID_FORM" } }, { status: 400 });
  }

  const file = form.get("file");
  const actorOverride = form.get("actorId");

  const actorId = (await resolveActorProfileId(request, typeof actorOverride === "string" ? actorOverride : undefined)) ?? undefined;
  const devBypass = process.env.ENABLE_DEV_SEEDS === "true" || process.env.DISABLE_AUTH === "true";
  if (!actorId && !devBypass) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED" } }, { status: 401 });
  }

  const isMember = actorId
    ? Boolean(((space as unknown) as { members?: Array<{ profileId: string }> }).members?.find((m: { profileId: string }) => m.profileId === actorId))
    : devBypass;
  if (!isMember) {
    return NextResponse.json({ success: false, error: { code: "NOT_A_MEMBER" } }, { status: 403 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: { code: "FILE_REQUIRED" } }, { status: 400 });
  }

  const contentType = file.type || "application/octet-stream";
  const isAccepted = [...ACCEPTED].some((prefix) => contentType.startsWith(prefix));
  if (!isAccepted) {
    return NextResponse.json({ success: false, error: { code: "UNSUPPORTED_TYPE", contentType } }, { status: 415 });
  }

  const uploaderId = actorId ?? "system";
  const ext = (() => {
    const name = file.name || "upload";
    const dot = name.lastIndexOf(".");
    return dot > -1 ? name.slice(dot) : "";
  })();
  const safeBase = (file.name || "upload").replace(/[^a-zA-Z0-9_.-]/g, "-").slice(0, 64) || "upload";
  const dest = `spaces/${space.id}/pending/${uploaderId}/${Date.now()}-${safeBase}${ext}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const bucket = firebaseStorageBucket();
    const gcsFile = bucket.file(dest);
    await gcsFile.save(buf, { contentType, resumable: false, public: false, metadata: { contentType } });
    const url = `https://storage.googleapis.com/${bucket.name}/${dest}`;
    return NextResponse.json({ success: true, data: { path: dest, url, contentType } });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: "UPLOAD_FAILED", message: String((error as Error).message ?? error) } }, { status: 500 });
  }
}
