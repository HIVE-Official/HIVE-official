import { NextRequest, NextResponse } from "next/server";
import { listSpaceMembersOnline } from "../../../../../server/fake-db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const members = listSpaceMembersOnline(id);
  return NextResponse.json({ members, total: members.length });
}

