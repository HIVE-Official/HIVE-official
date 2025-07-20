import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const autoJoinSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

/**
 * Auto-join a user to default/popular spaces after onboarding
 * POST /api/spaces/auto-join
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { userId } = autoJoinSchema.parse(body);

    // Get user data to understand their profile
    const userDoc = await dbAdmin.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const userMajor = userData?.major;

    // Define default spaces to auto-join new users
    // Start with a few popular/default spaces across categories
    const defaultSpaces = [
      // HIVE Exclusive - always join
      { type: "hive_exclusive", id: "general-discussion" },
      { type: "hive_exclusive", id: "announcements" },
      
      // Campus Living - common residential options
      { type: "campus_living", id: "off-campus-housing" },
      { type: "campus_living", id: "roommate-finder" },
      
      // Student Organizations - general interest
      { type: "student_organizations", id: "study-groups" },
      { type: "student_organizations", id: "tutoring-exchange" },
    ];

    // Add major-specific spaces if available
    if (userMajor) {
      // Convert major to potential space ID (lowercase, replace spaces with dashes)
      const majorSpaceId = userMajor.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      defaultSpaces.push({ type: "student_organizations", id: majorSpaceId });
    }

    const joinResults = [];
    const errors = [];

    // Attempt to join each default space
    for (const { type, id } of defaultSpaces) {
      try {
        // Check if space exists
        const spaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(id);
        const spaceDoc = await spaceRef.get();
        
        if (!spaceDoc.exists) {
          console.log(`Space ${type}/${id} not found, skipping`);
          continue;
        }

        // Check if user is already a member
        const memberRef = spaceRef.collection("members").doc(userId);
        const memberDoc = await memberRef.get();
        
        if (memberDoc.exists) {
          console.log(`User ${userId} already member of ${type}/${id}, skipping`);
          continue;
        }

        // Join the space using a batch operation
        const batch = dbAdmin.batch();

        // Add user to members sub-collection
        const newMember = {
          uid: userId,
          role: "member",
          joinedAt: FieldValue.serverTimestamp(),
        };

        batch.set(memberRef, newMember);

        // Increment the space's member count
        batch.update(spaceRef, {
          memberCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });

        // Execute the batch
        await batch.commit();

        joinResults.push({
          spaceType: type,
          spaceId: id,
          spaceName: spaceDoc.data()?.name || id,
          joined: true,
        });

        console.log(`Successfully auto-joined user ${userId} to ${type}/${id}`);
        
      } catch (spaceError) {
        console.error(`Failed to auto-join ${type}/${id}:`, spaceError);
        errors.push({
          spaceType: type,
          spaceId: id,
          error: spaceError instanceof Error ? spaceError.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Auto-joined user to ${joinResults.length} spaces`,
      joined: joinResults,
      errors: errors.length > 0 ? errors : undefined,
      userId,
    });

  } catch (error) {
    console.error("Auto-join error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process auto-join request" },
      { status: 500 }
    );
  }
}
