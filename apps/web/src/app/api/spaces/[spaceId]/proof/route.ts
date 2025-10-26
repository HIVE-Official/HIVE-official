// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { spaceService, getSpaceProofManifest } from "../../../../../server/spaces/service";

export async function GET(
  _request: Request,
  { params }: { params: { spaceId: string } }
) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);
  if (!snapshot) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found." } },
      { status: 404 }
    );
  }

  const manifest = await getSpaceProofManifest(params.spaceId);
  return NextResponse.json({ success: true, data: manifest });
}
