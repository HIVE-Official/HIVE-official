// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { spaceService, spaceMediaApprovalService } from "../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../server/auth/session-actor";
import { canModerate } from "../../../../../server/spaces/policy";
import { firebaseStorageBucket } from "@hive/firebase";

const PromoteSchema = z.object({
  approvalId: z.string().min(1),
  actorId: z.string().min(1).optional(),
  action: z.enum(["approve", "reject"]),
  reason: z.string().trim().min(1).max(500).optional()
});

export async function GET(_request: Request, context: { params: { spaceId: string } }) {
  try {
    const space = await spaceService.getSpaceById(context.params.spaceId);
    if (!space) {
      return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND" } }, { status: 404 });
    }
    const pending = await spaceMediaApprovalService.listPending(space.id);
    const data = pending.map((a) => ({
      id: a.id,
      spaceId: a.spaceId,
      postId: a.postId,
      attachment: a.attachment,
      status: a.status,
      requestedBy: a.requestedBy,
      requestedAt: a.requestedAt.toISOString(),
      resolvedAt: a.resolvedAt ? a.resolvedAt.toISOString() : null,
      resolvedBy: a.resolvedBy,
      resolutionReason: a.resolutionReason
    }));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "LIST_FAILED", message: String((error as Error).message ?? error) } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: { params: { spaceId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND" } }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = PromoteSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map((i) => i.message).join(", ") } },
      { status: 400 }
    );
  }

  const actorId = (await resolveActorProfileId(request, parsed.data.actorId)) ?? undefined;
  const devBypass = process.env.ENABLE_DEV_SEEDS === "true" || process.env.DISABLE_AUTH === "true";
  if (!actorId && !devBypass) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } },
      { status: 401 }
    );
  }
  if (!devBypass && actorId && !canModerate(space, actorId)) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Leaders or moderators only" } },
      { status: 403 }
    );
  }

  try {
    if (parsed.data.action === "reject") {
      const result = await spaceMediaApprovalService.reject({
        spaceId: space.id,
        approvalId: parsed.data.approvalId,
        actorId: (actorId ?? "system")
      });
      if (!result.ok) {
        return NextResponse.json(
          { success: false, error: { code: "REJECT_FAILED", message: result.error } },
          { status: 400 }
        );
      }
      return NextResponse.json({ success: true, data: { ...result.value, requestedAt: result.value.requestedAt.toISOString(), resolvedAt: result.value.resolvedAt?.toISOString() ?? null } });
    }

    // Approve flow: optionally promote storage, then append attachment to post
    // Pre-flight: inspect the approval to see if promotion is needed
    // We do this here so we can override the attachment URL prior to persisting
    let promotedUrl: string | null = null;

    const approval = await spaceMediaApprovalService.get(space.id, parsed.data.approvalId);
    if (!approval) {
      return NextResponse.json(
        { success: false, error: { code: "APPROVAL_NOT_FOUND", message: "Approval request not found" } },
        { status: 404 }
      );
    }

    if (approval.status !== "pending") {
      return NextResponse.json(
        { success: false, error: { code: "APPROVAL_ALREADY_RESOLVED", message: "Approval request already resolved" } },
        { status: 400 }
      );
    }

    if (typeof approval.attachment?.url === "string") {
      const srcParsed = parseStorageUrl(approval.attachment.url);
      if (srcParsed && (srcParsed.path.startsWith(`spaces/${space.id}/pending/`) || srcParsed.path.includes(`/pending/`))) {
        // Promote to approved media path: spaces/{spaceId}/media/{filename}
        const filename = srcParsed.path.split("/").slice(-1)[0] ?? "media.bin";
        const destPath = `spaces/${space.id}/media/${filename}`;
        try {
          const bucket = firebaseStorageBucket();
          await bucket.file(srcParsed.path).copy(destPath);
          await bucket.file(srcParsed.path).delete().catch(() => undefined);
          // Attach a download token so clients can render without auth
          const token = cryptoRandom();
          await bucket.file(destPath).setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
          const encoded = encodeURIComponent(destPath);
          promotedUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encoded}?alt=media&token=${token}`;
        } catch (e) {
          // Non-fatal: fall back to original URL if promotion fails
          // eslint-disable-next-line no-console
          console.warn("media.promotion_failed", { spaceId: space.id, approvalId: parsed.data.approvalId, error: String(e) });
        }
      }
    }

    const result = await spaceMediaApprovalService.approve({
      spaceId: space.id,
      approvalId: parsed.data.approvalId,
      actorId: (actorId ?? "system")
    });
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: { code: "APPROVE_FAILED", message: result.error } },
        { status: 400 }
      );
    }

    // If we promoted and got a new URL, rewrite the just-appended attachment URL on the post
    if (promotedUrl) {
      try {
        const updated = result.value;
        const postRepoModule = await import("../../../../../server/spaces/firestore-space-post.repository");
        const repo = new postRepoModule.FirestoreSpacePostRepository();
        const post = await repo.findById(updated.spaceId, updated.postId);
        if (post) {
          const snap = post.toSnapshot();
          const replaced = snap.attachments.map((att) =>
            att.url === (updated.attachment?.url ?? att.url) ? { ...att, url: promotedUrl! } : att
          );
          const r = post.replaceAttachments(replaced, new Date());
          if (r.ok) {
            await repo.save(post);
          }
        }
      } catch (e) {
        // Non-fatal, log and continue
        // eslint-disable-next-line no-console
        console.warn("media.attachment_rewrite_failed", { approvalId: parsed.data.approvalId, error: String(e) });
      }
    }

    const payload = result.value;
    return NextResponse.json({
      success: true,
      data: {
        id: payload.id,
        spaceId: payload.spaceId,
        postId: payload.postId,
        attachment: payload.attachment,
        status: payload.status,
        requestedBy: payload.requestedBy,
        requestedAt: payload.requestedAt.toISOString(),
        resolvedAt: payload.resolvedAt?.toISOString() ?? null,
        resolvedBy: payload.resolvedBy,
        resolutionReason: payload.resolutionReason
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "UNEXPECTED", message: String((error as Error).message ?? error) } },
      { status: 500 }
    );
  }
}

function parseStorageUrl(url: string): { path: string } | null {
  try {
    if (url.startsWith("gs://")) {
      const [, , ...rest] = url.split("/");
      return { path: rest.join("/") };
    }
    if (url.startsWith("https://storage.googleapis.com/")) {
      const rest = url.replace("https://storage.googleapis.com/", "");
      const slash = rest.indexOf("/");
      return slash > 0 ? { path: rest.slice(slash + 1) } : null;
    }
    if (url.startsWith("spaces/")) {
      return { path: url };
    }
    return null;
  } catch (error) {
    console.warn("media_approvals.storage_url.parse_failed", error);
    return null;
  }
}

function cryptoRandom(): string {
  try {
    return randomUUID();
  } catch (error) {
    console.warn("media_approvals.crypto_random_failed", error);
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}
