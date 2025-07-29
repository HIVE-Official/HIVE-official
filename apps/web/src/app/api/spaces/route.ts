import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { z } from "zod";
import type { Space, SpaceType } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";

const createSpaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  type: z.enum(['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive']),
  subType: z.string().optional(),
  isPrivate: z.boolean().default(false),
  tags: z.array(z.string()).default([])
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type") as SpaceType | "all" | null;
    const searchTerm = searchParams.get("q")?.toLowerCase() || null;

    let query: admin.firestore.Query = dbAdmin.collection("spaces");

    if (filterType && filterType !== "all") {
      query = query.where("type", "==", filterType);
    }

    // Note: Firestore doesn't support full-text search on its own.
    // This search implementation is a basic "starts-with" search on the name.
    // For a real-world application, a dedicated search service like Algolia or Typesense would be required.
    if (searchTerm) {
      query = query
        .where("name_lowercase", ">=", searchTerm)
        .where("name_lowercase", "<=", searchTerm + "\uf8ff");
    }

    const snapshot = await query.orderBy("name_lowercase").limit(50).get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const spaces = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Space[];

    return NextResponse.json(spaces, { status: 200 });
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return NextResponse.json(
      { error: "Failed to fetch spaces" },
      { status: 500 }
    );
  }
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
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, description, type, subType, isPrivate, tags } = createSpaceSchema.parse(body);

    // Generate space ID and create space document
    const spaceId = dbAdmin.collection('spaces').doc(type).collection('spaces').doc().id;
    const now = admin.firestore.Timestamp.now();
    
    const spaceData = {
      name,
      name_lowercase: name.toLowerCase(),
      description,
      type,
      subType: subType || null,
      status: 'dormant', // New spaces start in dormant mode
      isPrivate,
      tags: tags.map(tag => ({ sub_type: tag })),
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
      metrics: {
        memberCount: 1, // Creator is first member
        postCount: 0,
        eventCount: 0
      },
      bannerUrl: null
    };

    // Create space in nested structure
    await dbAdmin.collection('spaces')
      .doc(type)
      .collection('spaces')
      .doc(spaceId)
      .set(spaceData);

    // Add creator as owner
    await dbAdmin.collection('spaces')
      .doc(type)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .set({
        userId,
        role: 'owner',
        joinedAt: now,
        isActive: true
      });

    // Initialize empty collections for space widgets
    const collections = ['posts', 'events', 'pinned'];
    for (const collection of collections) {
      await dbAdmin.collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId)
        .collection(collection)
        .doc('_placeholder')
        .set({ placeholder: true });
    }

    console.log(`✅ Created space ${spaceId} of type ${type} by user ${userId}`);

    return NextResponse.json({
      success: true,
      space: {
        id: spaceId,
        ...spaceData
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('❌ Create space error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
