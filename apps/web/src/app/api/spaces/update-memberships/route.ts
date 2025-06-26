import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { type User, ALL_MAJORS, logger } from "@hive/core";

// Server-side space type that allows FieldValue for timestamps
interface ServerSpace {
  name: string;
  name_lowercase: string;
  description: string;
  memberCount: number;
  schoolId: string;
  type: "major" | "residential" | "interest" | "creative" | "organization";
  tags: Array<{
    type: string;
    sub_type: string;
  }>;
  status: "dormant" | "activated" | "frozen";
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

// Server-side member type that allows FieldValue for timestamps
interface ServerMember {
  uid: string;
  role: "member" | "builder" | "requested_builder";
  joinedAt: FieldValue;
}

const updateMembershipsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  previousMajor: z.string().optional(),
  newMajor: z.string().optional(),
  previousResidential: z.string().optional(),
  newResidential: z.string().optional(),
});

/**
 * Update space memberships when user changes major or residential info
 * POST /api/spaces/update-memberships
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header and verify the user
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    const auth = getAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (authError) {
      logger.error("Token verification failed:", authError);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const requestingUserId = decodedToken.uid;

    // Parse and validate request body
    const body = await request.json();
    const {
      userId,
      previousMajor,
      newMajor,
      previousResidential,
      newResidential,
    } = updateMembershipsSchema.parse(body);

    // Verify the requesting user is updating their own profile or is an admin
    if (requestingUserId !== userId) {
      // TODO: Add admin check when admin system is implemented
      return NextResponse.json(
        { error: "You can only update your own memberships" },
        { status: 403 }
      );
    }

    // Get Firestore instance
    const db = getFirestore();

    // Get user data
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userDoc.data() as User;

    if (!user.schoolId) {
      return NextResponse.json(
        { error: "User missing school ID" },
        { status: 400 }
      );
    }

    const batch = db.batch();
    const changes: string[] = [];

    // Handle major change
    if (previousMajor && newMajor && previousMajor !== newMajor) {
      // Leave old major space
      const oldMajorSpacesQuery = db
        .collection("spaces")
        .where("type", "==", "major")
        .where("tags", "array-contains", {
          type: "major",
          sub_type: previousMajor,
        })
        .limit(1);
      const oldMajorSpacesSnapshot = await oldMajorSpacesQuery.get();

      if (!oldMajorSpacesSnapshot.empty) {
        const oldSpaceId = oldMajorSpacesSnapshot.docs[0].id;
        const oldMemberRef = db
          .collection("spaces")
          .doc(oldSpaceId)
          .collection("members")
          .doc(userId);
        const oldSpaceRef = db.collection("spaces").doc(oldSpaceId);

        // Check if user is actually a member before removing
        const oldMemberDoc = await oldMemberRef.get();
        if (oldMemberDoc.exists) {
          batch.delete(oldMemberRef);
          batch.update(oldSpaceRef, {
            memberCount: FieldValue.increment(-1),
            updatedAt: FieldValue.serverTimestamp(),
          });
          changes.push(`Left ${previousMajor} space`);
        }
      }

      // Join new major space (create if needed)
      const majorData = ALL_MAJORS.find((m) => m.name === newMajor);

      const newMajorSpacesQuery = db
        .collection("spaces")
        .where("type", "==", "major")
        .where("tags", "array-contains", { type: "major", sub_type: newMajor })
        .limit(1);
      const newMajorSpacesSnapshot = await newMajorSpacesQuery.get();

      let newMajorSpaceId: string;
      if (newMajorSpacesSnapshot.empty) {
        // Create the major space if it doesn't exist
        const spaceName = majorData
          ? `${majorData.name} Majors`
          : `${newMajor} Majors`;
        newMajorSpaceId = db.collection("spaces").doc().id;

        const newMajorSpace: ServerSpace = {
          name: spaceName,
          name_lowercase: spaceName.toLowerCase(),
          description: `Connect with fellow ${newMajor} students, share resources, and collaborate on projects.`,
          memberCount: 0,
          schoolId: user.schoolId,
          type: "major",
          tags: [
            {
              type: "major",
              sub_type: newMajor,
            },
          ],
          status: "activated",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        };

        const newMajorSpaceRef = db.collection("spaces").doc(newMajorSpaceId);
        batch.set(newMajorSpaceRef, newMajorSpace);
        changes.push(`Created and joined ${newMajor} space`);
      } else {
        newMajorSpaceId = newMajorSpacesSnapshot.docs[0].id;
        changes.push(`Joined ${newMajor} space`);
      }

      // Add user to new major space
      const newMajorMemberRef = db
        .collection("spaces")
        .doc(newMajorSpaceId)
        .collection("members")
        .doc(userId);
      const newMember: ServerMember = {
        uid: userId,
        role: "member",
        joinedAt: FieldValue.serverTimestamp(),
      };
      batch.set(newMajorMemberRef, newMember);

      // Update new major space member count
      const newMajorSpaceRef = db.collection("spaces").doc(newMajorSpaceId);
      batch.update(newMajorSpaceRef, {
        memberCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    // Handle residential change (if implemented in the future)
    if (
      previousResidential &&
      newResidential &&
      previousResidential !== newResidential
    ) {
      // TODO: Implement residential space changes when residential spaces are more specific
      // For now, all users stay in the general "UB Community" space
      changes.push(
        `Residential change noted (${previousResidential} → ${newResidential})`
      );
    }

    if (changes.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No membership changes needed",
        changes: [],
      });
    }

    // Execute all changes atomically
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Space memberships updated successfully",
      changes,
    });
  } catch (error) {
    logger.error("Error updating memberships:", error);
    return NextResponse.json(
      { error: "Failed to update memberships. Please try again." },
      { status: 500 }
    );
  }
}
