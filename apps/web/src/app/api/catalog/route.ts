// Bounded Context Owner: Identity & Access Management Guild
import { NextResponse } from "next/server";
import { fetchCatalogSnapshot } from "../../../server/catalog/catalog.service";

export async function GET(): Promise<NextResponse> {
  const catalog = await fetchCatalogSnapshot();
  return NextResponse.json(catalog);
}
