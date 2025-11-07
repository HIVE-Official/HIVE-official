"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { sseRealtimeService } from "@/lib/sse-realtime-service";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const ReactionSchema = z.object({
  type: z.enum(["heart"]).default("heart"),
  action: z.enum(["add", "remove", "toggle"]).default("toggle"),
});

async function ensureMembership(spaceId: string, userId: string) {
  const membership = await requireSpaceMembership(spaceId, userId);
  if (!membership.ok) {
    return {
      ok: false as const,
      status: membership.status,
      message: membership.error,
    };
  }

  const spaceData = membership.space;
  if (spaceData.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: HttpStatus.FORBIDDEN,
      message: "Access denied for this campus",
    };
  }

  return { ok: true as const };
}

async function ensurePostExists(spaceId: string, postId: string) {
  const postDoc = await dbAdmin
    .collection("spaces")
    .doc(spaceId)
    .collection("posts")
    .doc(postId)
    .get();
  if (!postDoc.exists) {
    return { ok: false as const, status: 404, message: "Post not found" };
  }
  const postData = postDoc.data();
  if (!postData) {
    return { ok: false as const, status: 404, message: "Post data missing" };
  }
  if (postData.campusId && postData.campusId !== CURRENT_CAMPUS_ID) {
    return { ok: false as const, status: HttpStatus.FORBIDDEN, message: "Access denied for this campus" };
  }
  return { ok: true as const, postDoc };
}

export const POST = withAuthValidationAndErrors(
  ReactionSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string; postId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId, postId } = await params;
      const userId = getUserId(request);

      const membership = await ensureMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(membership.message, code, { status: membership.status });
      }

      const post = await ensurePostExists(spaceId, postId);
      if (!post.ok) {
        return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
      }

      const result = await dbAdmin.runTransaction(async (tx) => {
        const snapshot = await tx.get(post.postDoc);
        const data = snapshot.data() as Record<string, any> | undefined;
        if (!data) {
          throw Object.assign(new Error("Post data missing"), { status: 404 });
        }

        const reactions = data.reactions || { heart: 0 };
        const reactedUsers = data.reactedUsers || { heart: [] as string[] };

        const users = new Set<string>((reactedUsers[body.type] || []) as string[]);
        const alreadyReacted = users.has(userId);
        let count = reactions[body.type] || 0;
        let didReact = alreadyReacted;

        if (body.action === "add" || (body.action === "toggle" && !alreadyReacted)) {
          if (!alreadyReacted) {
            users.add(userId);
            count = Math.max(0, count + 1);
            didReact = true;
          }
        } else if (
          body.action === "remove" ||
          (body.action === "toggle" && alreadyReacted)
        ) {
          if (alreadyReacted) {
            users.delete(userId);
            count = Math.max(0, count - 1);
            didReact = false;
          }
        }

        tx.update(post.postDoc.ref, {
          [`reactions.${body.type}`]: count,
          [`reactedUsers.${body.type}`]: Array.from(users),
          updatedAt: new Date(),
        });

        return { count, reacted: didReact };
      });

      try {
        await sseRealtimeService.sendMessage({
          type: "chat",
          channel: `space:${spaceId}:posts`,
          senderId: userId,
          content: {
            type: "reaction_update",
            postId,
            reactionType: body.type,
            reacted: result.reacted,
            count: result.count,
          },
          metadata: {
            timestamp: new Date().toISOString(),
            priority: "low",
            requiresAck: false,
            retryCount: 0,
          },
        });
      } catch (broadcastError) {
        logger.warn("Failed to broadcast reaction via SSE", {
          broadcastError,
          spaceId,
          postId,
        });
      }

      return respond.success({
        postId,
        reactions: { [body.type]: result.count },
        userReacted: result.reacted,
      });
    } catch (error) {
      const status = (error as any)?.status || 500;
      logger.error(
        "Error updating reaction at /api/spaces/[spaceId]/posts/[postId]/reactions",
        error instanceof Error ? error : new Error(String(error)),
      );
      const code =
        status === 404 ? "RESOURCE_NOT_FOUND" : status === 403 ? "FORBIDDEN" : "INTERNAL_ERROR";
      return respond.error("Failed to update reaction", code, { status });
    }
  },
);
