// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

export async function GET(_request: Request, context: { params: { profileId: string } }) {
  try {
    const profileId = context.params.profileId;
    if (!isFirebaseConfigured()) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }
    const db = firebaseFirestore();
    const snap = await db.collection("profiles").doc(profileId).collection("connections").get();
    const accepted = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));
    const counts = { accepted: accepted.length, suggestions: 0, pending: 0 };
    return NextResponse.json({ profileId, counts, accepted });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load connections";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
