// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthContainer } from "../../../../server/auth/container";

const schema = z.object({
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(20, "Handle must be at most 20 characters")
    // Lowercase, start/end alphanumeric, allow . _ - in between
    .regex(
      /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])$/,
      "Handle must start/end with a letter or number and may contain . _ - in between"
    )
    .refine((v) => !/[._-]{2,}/.test(v), {
      message: "Handle cannot contain consecutive special characters"
    })
});

const normalise = (value: string): string => value.trim().toLowerCase();

export async function GET(request: NextRequest): Promise<NextResponse> {
  const handle = request.nextUrl.searchParams.get("handle") ?? "";
  return checkHandle(handle);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const bodySchema = z.object({ handle: z.string().optional() });
  const rawJson = (await request.json().catch(() => null)) as unknown;
  const parsedBody = bodySchema.safeParse(rawJson);
  const handle = parsedBody.success && typeof parsedBody.data.handle === "string"
    ? parsedBody.data.handle
    : "";
  return checkHandle(handle);
}

async function checkHandle(raw: string): Promise<NextResponse> {
  const parsed = schema.safeParse({ handle: normalise(raw) });
  if (!parsed.success) {
    return NextResponse.json(
      { available: false, reason: parsed.error.issues[0]?.message ?? "Invalid handle" },
      { status: 400 }
    );
  }

  const { handle } = parsed.data;
  const container = getAuthContainer();
  const existing = await container.profileRepository.findByHandle(handle);
  return NextResponse.json({ available: !existing, handle });
}
