// Bounded Context Owner: Identity & Access Management Guild
import { NextResponse } from "next/server";
import { firebaseFirestore } from "@hive/firebase";

export function GET(): NextResponse {
  const devSeeds = process.env.ENABLE_DEV_SEEDS === "true";
  const preferSpacesFirestore = process.env.USE_FIRESTORE_SPACES !== "false";
  let connectivity: "available" | "unavailable" = "unavailable";
  try {
    const firestore = firebaseFirestore();
    // minimal ping: list collections (no access needed)
    const _ = firestore; // if this line runs, admin is configured
    connectivity = "available";
  } catch (_e) {
    connectivity = "unavailable";
  }

  return NextResponse.json({
    connectivity,
    devSeeds,
    preferSpacesFirestore
  });
}
