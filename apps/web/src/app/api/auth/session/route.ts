// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { getAuthContainer } from "../../../../server/auth/container";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS
} from "../../../../server/auth/constants";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    // No session cookie -> not authenticated
    return new NextResponse(null, { status: 204 });
  }

  const container = getAuthContainer();
  const sessionEntity = await container.sessionRepository.findById(sessionCookie.value);

  if (!sessionEntity) {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.delete({
      name: SESSION_COOKIE_NAME,
      path: SESSION_COOKIE_OPTIONS.path
    });
    return response;
  }

  const sessionProps = sessionEntity.getProps();
  const profile = await container.profileRepository.findById(sessionProps.profileId);
  const profileProps = profile?.getProps();

  const onboardingComplete = profileProps?.isOnboarded ?? false;
  const userType = profileProps?.userType ?? null;

  return NextResponse.json({
    session: {
      sessionId: sessionProps.sessionId,
      profileId: sessionProps.profileId,
      issuedAt: sessionProps.issuedAt.toISOString(),
      expiresAt: sessionProps.expiresAt.toISOString(),
      scopes: sessionProps.scopes
    },
    onboardingComplete,
    userType
  });
}

export function DELETE(): NextResponse {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete({
    name: SESSION_COOKIE_NAME,
    path: SESSION_COOKIE_OPTIONS.path
  });
  return response;
}
