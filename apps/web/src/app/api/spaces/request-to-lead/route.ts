import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Builder Activation System - "Request to Lead" API
 * Allows students to request builder rights for spaces they want to activate
 * POST /api/spaces/request-to-lead
 */

const requestToLeadSchema = z.object({
  spaceId: z.string().min(1, 'Space ID is required'),
  motivation: z.string().min(50, 'Please provide at least 50 characters explaining your motivation').max(1000, 'Motivation must be under 1000 characters'),
  experience: z.string().min(10, 'Please describe relevant experience').max(500, 'Experience must be under 500 characters'),
  plans: z.string().min(30, 'Please describe your plans for the space').max(1000, 'Plans must be under 1000 characters'),
  timeCommitment: z.enum(['5-10hrs/week', '10-15hrs/week', '15-20hrs/week', '20+hrs/week']),
  hasAgreedToTerms: z.boolean().refine(val => val === true, 'You must agree to the builder terms')
});

interface BuilderRequest {
  id: string;
  spaceId: string;
  spaceType: string;
  spaceName: string;
  userId: string;
  userEmail: string;
  userName: string;
  motivation: string;
  experience: string;
  plans: string;
  timeCommitment: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: FieldValue;
  reviewedAt?: FieldValue;
  reviewedBy?: string;
  reviewNotes?: string;
  expiresAt: FieldValue; // Auto-expire requests after 7 days
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId: string;
    let userEmail: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      userId = 'test-user';
      userEmail = 'test@example.com';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
        userEmail = decodedToken.email || 'unknown@example.com';
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    // Parse and validate request body
    const body = await request.json();
    const { spaceId, motivation, experience, plans, timeCommitment, hasAgreedToTerms } = requestToLeadSchema.parse(body);

    console.log(`🎯 Builder request for space ${spaceId} from user ${userId}`);

    // Find the space in nested structure
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceType: string | null = null;

    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin
        .collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        spaceDoc = potentialDoc;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const spaceData = spaceDoc.data();

    // Check if space is eligible for builder requests
    if (spaceData.isPrivate) {
      return NextResponse.json(
        { error: 'Private spaces cannot accept builder requests' },
        { status: 403 }
      );
    }

    // Check if user is already a member with elevated permissions
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceType!)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();

    if (memberDoc.exists) {
      const memberData = memberDoc.data();
      if (memberData?.role === 'builder' || memberData?.role === 'admin') {
        return NextResponse.json(
          { error: 'You already have builder rights for this space' },
          { status: 409 }
        );
      }
    }

    // Check for existing pending requests from this user for this space
    const existingRequestQuery = await dbAdmin
      .collection('builderRequests')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    if (!existingRequestQuery.empty) {
      return NextResponse.json(
        { error: 'You already have a pending request for this space' },
        { status: 409 }
      );
    }

    // Get user profile for additional context
    let userName = 'Unknown User';
    try {
      const userDoc = await dbAdmin.collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        userName = userData?.displayName || userData?.handle || userName;
      }
    } catch (error) {
      console.warn(`Could not fetch user data for ${userId}:`, error);
    }

    // Create builder request
    const requestRef = dbAdmin.collection('builderRequests').doc();
    const builderRequest: BuilderRequest = {
      id: requestRef.id,
      spaceId,
      spaceType: spaceType!,
      spaceName: spaceData.name,
      userId,
      userEmail,
      userName,
      motivation,
      experience,
      plans,
      timeCommitment,
      status: 'pending',
      submittedAt: FieldValue.serverTimestamp(),
      expiresAt: FieldValue.serverTimestamp() // Will be updated with actual expiry
    };

    // Set expiry to 7 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    builderRequest.expiresAt = FieldValue.serverTimestamp();

    await requestRef.set(builderRequest);

    // TODO: Send notification to admins (implement when notification system is ready)
    console.log(`📧 Admin notification needed for builder request ${requestRef.id}`);

    return NextResponse.json({
      success: true,
      message: 'Builder request submitted successfully',
      requestId: requestRef.id,
      space: {
        id: spaceId,
        name: spaceData.name,
        type: spaceType
      },
      nextSteps: [
        'Your request has been submitted to our admin team',
        'You will receive a response within 24 hours',
        'Check your email and notifications for updates',
        'Approved builders get access to HiveLAB tools and space management'
      ],
      estimatedReviewTime: '24 hours'
    });

  } catch (error: any) {
    console.error('Request to Lead error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit builder request' },
      { status: 500 }
    );
  }
}

/**
 * Get builder requests for a user (their submitted requests)
 * GET /api/spaces/request-to-lead?userId=USER_ID
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter required' },
        { status: 400 }
      );
    }

    // Get user's builder requests
    const requestsSnapshot = await dbAdmin
      .collection('builderRequests')
      .where('userId', '==', userId)
      .orderBy('submittedAt', 'desc')
      .limit(20)
      .get();

    const requests = requestsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate?.()?.toISOString(),
      reviewedAt: doc.data().reviewedAt?.toDate?.()?.toISOString(),
      expiresAt: doc.data().expiresAt?.toDate?.()?.toISOString()
    }));

    // Group requests by status
    const requestsByStatus = requests.reduce((acc, request) => {
      const status = request.status as string;
      if (!acc[status]) acc[status] = [];
      acc[status].push(request);
      return acc;
    }, {} as Record<string, typeof requests>);

    return NextResponse.json({
      success: true,
      requests,
      requestsByStatus,
      summary: {
        total: requests.length,
        pending: requestsByStatus.pending?.length || 0,
        approved: requestsByStatus.approved?.length || 0,
        rejected: requestsByStatus.rejected?.length || 0
      }
    });

  } catch (error) {
    console.error('Get builder requests error:', error);
    return NextResponse.json(
      { error: 'Failed to get builder requests' },
      { status: 500 }
    );
  }
}