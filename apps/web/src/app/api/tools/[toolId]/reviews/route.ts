import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5).max(100),
  content: z.string().min(10).max(1000),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  useCase: z.string().optional(),
  verified: z.boolean().optional()
});

interface ToolReview {
  id?: string;
  toolId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  useCase?: string;
  verified: boolean;
  helpful: number;
  reported: number;
  status: 'published' | 'pending' | 'hidden';
  createdAt: string;
  updatedAt: string;
  version?: string; // Tool version when reviewed
}

// POST - Create new review
export async function POST(request: NextRequest, { params }: { params: Promise<{ toolId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = await params;
    const body = await request.json();
    const validatedData = ReviewSchema.parse(body);

    // Check if tool exists and is published
    const toolDoc = await adminDb.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (toolData?.status !== 'published') {
      return NextResponse.json(ApiResponseHelper.error("Cannot review unpublished tool", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if user has already reviewed this tool
    const existingReviewSnapshot = await adminDb
      .collection('toolReviews')
      .where('toolId', '==', toolId)
      .where('userId', '==', user.uid)
      .get();

    if (!existingReviewSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("You have already reviewed this tool", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Check if user has actually used the tool (optional verification)
    const usageSnapshot = await adminDb
      .collection('analytics_events')
      .where('eventType', '==', 'tool_interaction')
      .where('userId', '==', user.uid)
      .where('toolId', '==', toolId)
      .limit(1)
      .get();

    const hasUsedTool = !usageSnapshot.empty;

    const now = new Date();
    const review: ToolReview = {
      toolId,
      userId: user.uid,
      rating: validatedData.rating,
      title: validatedData.title,
      content: validatedData.content,
      pros: validatedData.pros,
      cons: validatedData.cons,
      useCase: validatedData.useCase,
      verified: hasUsedTool,
      helpful: 0,
      reported: 0,
      status: 'published',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      version: toolData?.currentVersion
    };

    // Create review
    const reviewRef = await adminDb.collection('toolReviews').add(review);

    // Update tool rating statistics
    await updateToolRatingStats(toolId);

    // Log activity
    await adminDb.collection('analytics_events').add({
      eventType: 'tool_reviewed',
      userId: user.uid,
      toolId,
      rating: validatedData.rating,
      timestamp: now.toISOString(),
      metadata: {
        reviewId: reviewRef.id,
        verified: hasUsedTool,
        hasContent: validatedData.content.length > 50
      }
    });

    // Notify tool owner
    if (toolData?.ownerId !== user.uid) {
      await adminDb.collection('notifications').add({
        type: 'tool_review_received',
        title: 'New Tool Review',
        message: `Your tool "${toolData?.name}" received a ${validatedData.rating}-star review`,
        data: {
          toolId,
          toolName: toolData?.name,
          reviewId: reviewRef.id,
          rating: validatedData.rating,
          reviewTitle: validatedData.title
        },
        recipients: [toolData?.ownerId],
        createdAt: now.toISOString(),
        read: false
      });
    }

    return NextResponse.json({
      reviewId: reviewRef.id,
      message: 'Review created successfully'
    }, { status: HttpStatus.CREATED });

  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid review data',
        details: error.errors
      }, { status: HttpStatus.BAD_REQUEST });
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to create review", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get tool reviews
export async function GET(request: NextRequest, { params }: { params: Promise<{ toolId: string }> }) {
  try {
    const { toolId } = await params;
    const { searchParams } = new URL(request.url);
    
    const limitParam = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'newest'; // newest, oldest, rating_high, rating_low, helpful
    const verified = searchParams.get('verified') === 'true';

    // Check if tool exists
    const toolDoc = await adminDb.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    let reviewsQuery = adminDb
      .collection('toolReviews')
      .where('toolId', '==', toolId)
      .where('status', '==', 'published');

    if (verified) {
      reviewsQuery = reviewsQuery.where('verified', '==', true);
    }

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        reviewsQuery = reviewsQuery.orderBy('createdAt', 'asc');
        break;
      case 'rating_high':
        reviewsQuery = reviewsQuery.orderBy('rating', 'desc');
        break;
      case 'rating_low':
        reviewsQuery = reviewsQuery.orderBy('rating', 'asc');
        break;
      case 'helpful':
        reviewsQuery = reviewsQuery.orderBy('helpful', 'desc');
        break;
      default: // newest
        reviewsQuery = reviewsQuery.orderBy('createdAt', 'desc');
    }

    reviewsQuery = reviewsQuery.limit(limitParam);

    const reviewsSnapshot = await reviewsQuery.get();
    const reviews = [];

    for (const doc of reviewsSnapshot.docs) {
      const reviewData = { id: doc.id, ...doc.data() } as { id: string; userId?: string; [key: string]: any };
      
      // Get reviewer details
      if (!reviewData.userId) continue;
      const userDoc = await adminDb.collection('users').doc(reviewData.userId).get();
      const userData = userDoc.exists ? userDoc.data() : null;

      reviews.push({
        ...reviewData,
        user: userData ? {
          id: reviewData.userId,
          displayName: userData.displayName,
          avatar: userData.photoURL,
          verified: userData.verified || false
        } : null
      });
    }

    // Get rating summary
    const allReviewsSnapshot = await adminDb
      .collection('toolReviews')
      .where('toolId', '==', toolId)
      .where('status', '==', 'published')
      .get();

    const ratingSummary = calculateRatingSummary(allReviewsSnapshot.docs.map(doc => doc.data()));

    return NextResponse.json({
      reviews,
      count: reviews.length,
      total: allReviewsSnapshot.size,
      ratingSummary,
      sortBy
    });

  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch reviews", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to update tool rating statistics
async function updateToolRatingStats(toolId: string) {
  try {
    const reviewsSnapshot = await adminDb
      .collection('toolReviews')
      .where('toolId', '==', toolId)
      .where('status', '==', 'published')
      .get();

    const reviews = reviewsSnapshot.docs.map(doc => doc.data());
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    // Update tool document
    await adminDb.collection('tools').doc(toolId).update({
      rating: {
        average: Math.round(averageRating * 10) / 10,
        total: totalReviews,
        distribution: ratingDistribution
      },
      updatedAt: new Date().toISOString()
    });

    // Update marketplace entry if exists
    const marketplaceSnapshot = await adminDb
      .collection('marketplace')
      .where('toolId', '==', toolId)
      .get();

    if (!marketplaceSnapshot.empty) {
      const marketplaceDoc = marketplaceSnapshot.docs[0];
      await adminDb.collection('marketplace').doc(marketplaceDoc.id).update({
        'stats.rating': Math.round(averageRating * 10) / 10,
        'stats.reviews': totalReviews
      });
    }

  } catch (error) {
    // Error updating marketplace stats - this is non-critical, so we silently continue
    logger.error('Failed to update marketplace stats', { error: error, endpoint: '/api/tools/[toolId]/reviews' });
  }
}

// Helper function to calculate rating summary
function calculateRatingSummary(reviews: any[]) {
  const total = reviews.length;
  if (total === 0) {
    return {
      average: 0,
      total: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      verifiedCount: 0
    };
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / total;
  const distribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };
  const verifiedCount = reviews.filter(r => r.verified).length;

  return {
    average: Math.round(average * 10) / 10,
    total,
    distribution,
    verifiedCount
  };
}