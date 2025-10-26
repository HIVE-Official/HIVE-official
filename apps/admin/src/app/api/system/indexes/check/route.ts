// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin } from "@admin/server/auth";
import { isFirebaseConfigured } from "@hive/firebase";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }
  const configured = isFirebaseConfigured();
  // Placeholder check; in CI we deploy indexes. Here we just return environment status.
  return NextResponse.json({ success: true, data: { firebaseConfigured: configured, note: configured ? "Use CI to deploy indexes." : "Firebase not configured in this environment." } });
}
