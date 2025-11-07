import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuthValidationAndErrors, respond, getUserId } from '@/lib/middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import { currentEnvironment } from '@/lib/env';
import { createSession, setSessionCookie, getSession } from '@/lib/session';

const schema = z.object({
  fullName: z.string().min(1),
  userType: z.enum(['student', 'alumni', 'faculty']),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  major: z.string().min(1),
  graduationYear: z.number().int().min(new Date().getFullYear()).max(new Date().getFullYear() + 10),
  handle: z.string().min(3).max(20),
  avatarUrl: z.string().url().optional(),
  interests: z.array(z.string()).optional(),
  builderRequestSpaces: z.array(z.string()).optional(),
  consentGiven: z.boolean().refine(v => v === true, 'Consent is required'),
  academicLevel: z.enum(['undergraduate', 'graduate', 'doctoral']).optional(),
  bio: z.string().max(200).optional(),
  livingSituation: z.enum(['on-campus', 'off-campus', 'commuter', 'not-sure']).optional(),
});

export const POST = withAuthValidationAndErrors(schema, async (request: NextRequest, _ctx, body, respondFmt) => {
  const userId = getUserId(request as any);

  // In production: persist onboarding fields and mark completion
  if (process.env.NODE_ENV === 'production') {
    try {
      const userRef = dbAdmin.collection('users').doc(userId);
      await userRef.set({
        fullName: body.fullName,
        handle: body.handle,
        major: body.major,
        graduationYear: body.graduationYear,
        interests: body.interests || [],
        academicLevel: body.academicLevel || null,
        bio: body.bio || null,
        livingSituation: body.livingSituation || null,
        userType: body.userType,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return respondFmt.success({ success: true });
    } catch (e) {
      return respond.error('Failed to complete onboarding', 'INTERNAL_ERROR', { status: 500 });
    }
  }

  // Development: update dev session to reflect onboardingCompleted
  const session = await getSession(request);
  const email = (session?.email) || 'dev@test.edu';
  const campusId = (session?.campusId) || 'test-university';
  const isAdmin = session?.isAdmin || false;

  // Re-issue session cookie with same identifiers (dev flow)
  const newToken = await createSession({
    userId,
    email,
    campusId,
    isAdmin
  });

  const response = NextResponse.json({
    success: true,
    user: { id: userId, email, onboardingCompleted: true },
    builderRequestsCreated: 0,
    devUserUpdate: { uid: userId, email, onboardingCompleted: true }
  });

  setSessionCookie(response, newToken, { isAdmin });
  return response;
});
