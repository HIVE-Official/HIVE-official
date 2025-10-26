// Bounded Context Owner: HiveLab Guild
import { NextResponse, type NextRequest } from "next/server";

// Temporary redirect: canonical route is /lab per IA spec
export function GET(request: NextRequest): Response {
  const url = new URL(request.url);
  // Preserve query string if any
  const search = url.search ? url.search : "";
  return NextResponse.redirect(new URL(`/lab${search}`, request.url), 307);
}
