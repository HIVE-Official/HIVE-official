import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { withAuthAndErrors, type AuthenticatedRequest } from '@/lib/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  try {
    // First try to resolve as a slug
    const slugSnapshot = await dbAdmin
      .collection('spaces')
      .where('slug', '==', slug)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();

    if (!slugSnapshot.empty) {
      const space = slugSnapshot.docs[0];
      return NextResponse.json({
        spaceId: space.id,
        slug: slug,
        found: true
      });
    }

    // If no slug match, try to resolve as legacy space ID
    // This handles the case where old URLs with IDs are redirected here
    const idSnapshot = await dbAdmin
      .collection('spaces')
      .doc(slug)
      .get();

    if (idSnapshot.exists) {
      const spaceData = idSnapshot.data();
      if (spaceData && spaceData.campusId === CURRENT_CAMPUS_ID) {
        return NextResponse.json({
          spaceId: idSnapshot.id,
          slug: spaceData.slug || slug,
          found: true,
          isLegacyId: true
        });
      }
    }

    // Space not found
    return NextResponse.json(
      {
        error: 'Space not found',
        slug: slug,
        found: false
      },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error resolving space slug:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle legacy space ID redirects too
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return GET(request, { params });
}
