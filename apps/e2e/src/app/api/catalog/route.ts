import { NextResponse } from "next/server";
import { catalogFixture } from "../../../fixtures";

export async function GET(): Promise<Response> {
  return NextResponse.json(catalogFixture);
}
