// Bounded Context Owner: Community Guild
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  spaceService,
  spacePostService,
  spaceMediaApprovalService,
  serializePost,
  SPACE_ROLE_PERMISSIONS
} from "../../../../../server/spaces/service";

const AttachmentSchema = z.object({
  type: z.enum(["image", "file", "link", "video"]).optional().default("link"),
  url: z.string().url().min(1),
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional()
});

const CreatePostSchema = z.object({
  authorId: z.string().min(1),
  authorHandle: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string().min(1)).optional(),
  attachments: z.array(AttachmentSchema).optional()
});

export async function GET(
  _request: Request,
  context: { params: { spaceId: string } }
) {
  const space = await spaceService.getSpaceById(context.params.spaceId);

  if (!space) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SPACE_NOT_FOUND",
          message: "Space not found"
        }
      },
      { status: 404 }
    );
  }

  const posts = await spacePostService.list(space.id, 50);

  return NextResponse.json({
    success: true,
    data: posts.map(serializePost)
  });
}

export async function POST(
  request: Request,
  context: { params: { spaceId: string } }
) {
  const space = await spaceService.getSpaceById(context.params.spaceId);

  if (!space) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SPACE_NOT_FOUND",
          message: "Space not found"
        }
      },
      { status: 404 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = CreatePostSchema.safeParse(json ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_BODY",
          message: parsed.error.issues.map((issue) => issue.message).join(", ")
        }
      },
      { status: 400 }
    );
  }

  const postingPolicy = space.settings.postingPolicy ?? "members";
  const membership = space.members.find((member) => member.profileId === parsed.data.authorId);

  if (!membership) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "NOT_A_MEMBER",
          message: "Only members can post in this space"
        }
      },
      { status: 403 }
    );
  }

  if (postingPolicy === "leaders_only" && !SPACE_ROLE_PERMISSIONS.canPin.has(membership.role)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "POSTING_RESTRICTED",
          message: "Only leaders can post in this space"
        }
      },
      { status: 403 }
    );
  }

  const attachments = parsed.data.attachments ?? [];
  const mediaPolicy = space.settings.mediaApprovalPolicy ?? "leaders_only";
  let requiresApproval = false;
  if (mediaPolicy === "disabled") {
    requiresApproval = false;
  } else if (mediaPolicy === "all") {
    requiresApproval = true;
  } else {
    requiresApproval = !SPACE_ROLE_PERMISSIONS.canPin.has(membership.role);
  }

  const pendingApprovalAttachments: {
    type: "image" | "video" | "file" | "link";
    url: string;
    title?: string;
    description?: string;
  }[] = [];
  const approvedAttachments: {
    type: "image" | "video" | "file" | "link";
    url: string;
    title?: string;
    description?: string;
  }[] = [];

  for (const attachment of attachments) {
    const normalized = {
      type: attachment.type,
      url: attachment.url,
      title: attachment.title ?? undefined,
      description: attachment.description ?? undefined
    } as const;

    const needsApproval =
      requiresApproval && (normalized.type === "image" || normalized.type === "video");

    if (needsApproval) {
      pendingApprovalAttachments.push({ ...normalized });
    } else {
      approvedAttachments.push({ ...normalized });
    }
  }

  const result = await spacePostService.create({
    postId: randomUUID(),
    spaceId: space.id,
    authorId: parsed.data.authorId,
    authorHandle: parsed.data.authorHandle,
    content: parsed.data.content,
    tags: parsed.data.tags,
    attachments: approvedAttachments
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CREATE_FAILED",
          message: result.error
        }
      },
      { status: 400 }
    );
  }

  let pendingMedia: Array<{
    approvalId: string;
    attachment: {
      type: string;
      url: string;
      title?: string;
      description?: string;
    };
  }> = [];

  if (pendingApprovalAttachments.length > 0) {
    const enqueueResult = await spaceMediaApprovalService.enqueuePendingMedia({
      spaceId: space.id,
      postId: result.value.id,
      requestedBy: parsed.data.authorId,
      attachments: pendingApprovalAttachments
    });

    if (!enqueueResult.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MEDIA_APPROVAL_QUEUE_FAILED",
            message: enqueueResult.error
          }
        },
        { status: 500 }
      );
    }

    pendingMedia = enqueueResult.value.map((entry) => ({
      approvalId: entry.id,
      attachment: entry.attachment
    }));
  }

  return NextResponse.json(
    {
      success: true,
      data: serializePost(result.value),
      pendingMedia
    },
    { status: 201 }
  );
}
