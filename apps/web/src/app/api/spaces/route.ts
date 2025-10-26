// Bounded Context Owner: Community Guild
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, getCatalogPresentation, serializeSpace } from "../../../server/spaces/service";

const DEFAULT_CAMPUS_ID = "ub-buffalo";
const DEFAULT_PROFILE_ID = "profile-jwrhineh";
const SPACE_TYPES = [
  "student_organization",
  "university_organization",
  "greek_life",
  "residential"
] as const;

const SPACE_VISIBILITY = ["public", "campus", "private"] as const;

const CreateSpaceBodySchema = z.object({
  name: z.string().min(3, "Space name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.enum(SPACE_TYPES),
  visibility: z.enum(SPACE_VISIBILITY).default("campus"),
  tags: z.array(z.string().min(1)).max(6).optional(),
  maxMembers: z.number().int().positive().max(1000).optional(),
  isInviteOnly: z.boolean().optional(),
  campusId: z.string().min(1).default(DEFAULT_CAMPUS_ID),
  leaderId: z.string().min(1).default(DEFAULT_PROFILE_ID)
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const campusId = url.searchParams.get("campusId") ?? DEFAULT_CAMPUS_ID;
  const profileId = url.searchParams.get("profileId") ?? DEFAULT_PROFILE_ID;

  return NextResponse.json({
    success: true,
    data: await getCatalogPresentation({ campusId, profileId })
  });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = CreateSpaceBodySchema.safeParse(json ?? {});

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

  const spaceId = randomUUID();
  const result = await spaceService.createSpace({
    spaceId,
    campusId: parsed.data.campusId,
    leaderId: parsed.data.leaderId,
    name: parsed.data.name,
    description: parsed.data.description,
    type: parsed.data.type,
    visibility: parsed.data.visibility,
    tags: parsed.data.tags,
    settings: {
      maxMembers: parsed.data.maxMembers,
      isInviteOnly: parsed.data.isInviteOnly
    }
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

  const serialized = await serializeSpace(result.value, parsed.data.leaderId, {
    includeMembers: true,
    includeMeta: true,
    includePosts: true
  });

  return NextResponse.json(
    {
      success: true,
      data: serialized
    },
    { status: 201 }
  );
}
