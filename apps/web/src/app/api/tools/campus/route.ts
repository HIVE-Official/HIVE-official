// Bounded Context Owner: HiveLab Guild
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { toolService, serializeToolForCatalog } from "../../../../server/tools/service";
import { resolveActorProfileId } from "../../../../server/auth/session-actor";
import type { CampusCatalogVisibilityFilter } from "@core";

const DEFAULT_CAMPUS_ID = "ub-buffalo";
const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";
const VisibilitySchema = z.enum(["campus", "public", "all"]);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const campusId = searchParams.get("campusId")?.trim() || DEFAULT_CAMPUS_ID;
  const qpProfile = searchParams.get("profileId")?.trim() || null;
  const visibilityParam = searchParams.get("visibility") ?? "all";

  const parsedVisibility = VisibilitySchema.safeParse(visibilityParam);
  if (!parsedVisibility.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_QUERY",
          message: "visibility must be campus, public, or all"
        }
      },
      { status: 400 }
    );
  }

  const visibility = parsedVisibility.data as CampusCatalogVisibilityFilter;
  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? qpProfile : null);
  if (!profileId) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHENTICATED", message: "Sign in to browse campus catalog" }
      },
      { status: 401 }
    );
  }

  const catalogResult = await toolService.listCampusCatalog({ campusId, profileId, visibility });

  if (!catalogResult.ok) {
    if (catalogResult.error === "FORBIDDEN") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You do not have permission to browse this campus catalog."
          }
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: catalogResult.error
        }
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: catalogResult.value.map((tool) => serializeToolForCatalog(tool)),
    meta: {
      campusId,
      profileId,
      visibility
    }
  });
}
