import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { type User, ALL_MAJORS, logger } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuth } from "@/lib/auth";

/**
 * Auto-join a user to relevant spaces (major and residential).
 * Creates spaces if they don't exist.
 * POST /api/spaces/auto-join
 */
export async function POST(request: NextRequest) {
  try {
    const { uid } = await requireAuth(request);
    const userDoc = await dbAdmin.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const user = userDoc.data() as User;

    if (!user.majorId || !user.schoolId) {
      return NextResponse.json(
        { error: "User missing required fields (major, schoolId)" },
        { status: 400 }
      );
    }

    // Find if the user's major exists in our UB_MAJORS list
    const majorData = ALL_MAJORS.find((m) => m.name === user.majorId);

    const batch = dbAdmin.batch();
    const spacesJoined: string[] = [];

    // 1. Handle Major Space
    const majorSpacesSnapshot = await dbAdmin
      .collection("spaces")
      .where("type", "==", "major")
      .where("tags", "array-contains", { type: "major", sub_type: user.majorId })
      .limit(1)
      .get();

    let majorSpaceId: string;
    if (majorSpacesSnapshot.empty) {
      // Create the major space if it doesn't exist
      const spaceName = majorData
        ? `${majorData.name} Majors`
        : `${user.majorId} Majors`;
      const majorSpaceRef = dbAdmin.collection("spaces").doc();
      majorSpaceId = majorSpaceRef.id;

      const newMajorSpace = {
        name: spaceName,
        name_lowercase: spaceName.toLowerCase(),
        description: `Connect with fellow ${user.majorId} students, share resources, and collaborate on projects.`,
        memberCount: 0,
        schoolId: user.schoolId,
        type: "major",
        tags: [
          {
            type: "major",
            sub_type: user.majorId,
          },
        ],
        status: "activated",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      batch.set(majorSpaceRef, newMajorSpace);
    } else {
      majorSpaceId = majorSpacesSnapshot.docs[0].id;
    }

    // Add user to major space
    const majorMemberRef = dbAdmin
      .collection("spaces")
      .doc(majorSpaceId)
      .collection("members")
      .doc(uid);
    batch.set(majorMemberRef, {
      uid: uid,
      role: "member",
      joinedAt: FieldValue.serverTimestamp(),
    });

    // Update major space member count
    const majorSpaceRef = dbAdmin.collection("spaces").doc(majorSpaceId);
    batch.update(majorSpaceRef, {
      memberCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    spacesJoined.push(majorSpaceId);

    // 2. Handle General Residential Space
    const residentialSpacesSnapshot = await dbAdmin
      .collection("spaces")
      .where("type", "==", "residential")
      .where("tags", "array-contains", {
        type: "residential",
        sub_type: "general",
      })
      .limit(1)
      .get();

    let residentialSpaceId: string;
    if (residentialSpacesSnapshot.empty) {
      // Create a general residential space if it doesn't exist
      const residentialSpaceRef = dbAdmin.collection("spaces").doc();
      residentialSpaceId = residentialSpaceRef.id;

      const newResidentialSpace = {
        name: "UB Community",
        name_lowercase: "ub community",
        description:
          "A general community space for all UB students to connect, share experiences, and build friendships.",
        memberCount: 0,
        schoolId: user.schoolId,
        type: "residential",
        tags: [
          {
            type: "residential",
            sub_type: "general",
          },
        ],
        status: "activated",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      batch.set(residentialSpaceRef, newResidentialSpace);
    } else {
      residentialSpaceId = residentialSpacesSnapshot.docs[0].id;
    }

    // Add user to residential space
    const residentialMemberRef = dbAdmin
      .collection("spaces")
      .doc(residentialSpaceId)
      .collection("members")
      .doc(uid);
    batch.set(residentialMemberRef, {
      uid: uid,
      role: "member",
      joinedAt: FieldValue.serverTimestamp(),
    });

    // Update residential space member count
    const residentialSpaceRef = dbAdmin
      .collection("spaces")
      .doc(residentialSpaceId);
    batch.update(residentialSpaceRef, {
      memberCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    spacesJoined.push(residentialSpaceId);

    // Execute all operations atomically
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Successfully auto-joined user to ${spacesJoined.length} spaces`,
      spacesJoined,
    });
  } catch (error) {
    logger.error("Auto-join error:", error);
    return NextResponse.json(
      { error: "Failed to auto-join user to spaces" },
      { status: 500 }
    );
  }
}
