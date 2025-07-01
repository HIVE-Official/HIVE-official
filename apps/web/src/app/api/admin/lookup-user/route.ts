import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "@hive/core";

// Validation schema
const lookupUserSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

// User data interface
interface UserData {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  disabled?: boolean;
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

// Firestore user document interface
interface FirestoreUserData {
  fullName?: string;
  handle?: string;
  schoolId?: string;
  role?: string;
  isBuilder?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { query } = lookupUserSchema.parse(body);

    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Invalid authorization format" },
        { status: 401 }
      );
    }

    try {
      const decodedToken = await getAuth().verifyIdToken(token);

      // Check if current user is admin
      const db = getFirestore();
      const currentUserDoc = await db
        .collection("users")
        .doc(decodedToken.uid)
        .get();
      const currentUserData = currentUserDoc.data() as
        | FirestoreUserData
        | undefined;

      if (!currentUserData || currentUserData.role !== "admin") {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        );
      }

      let userData: UserData | null = null;
      let firestoreData: FirestoreUserData | null = null;

      try {
        // Try to lookup by email first
        if (query.includes("@")) {
          try {
            const userRecord = await getAuth().getUserByEmail(query);
            userData = {
              uid: userRecord.uid,
              email: userRecord.email,
              emailVerified: userRecord.emailVerified,
              displayName: userRecord.displayName,
              photoURL: userRecord.photoURL,
              disabled: userRecord.disabled,
              metadata: {
                creationTime: userRecord.metadata.creationTime,
                lastSignInTime: userRecord.metadata.lastSignInTime,
              },
            };
          } catch (authError: unknown) {
            const error = authError as { code?: string };
            if (error.code !== "auth/user-not-found") {
              throw authError;
            }
          }
        } else {
          // Try to lookup by UID
          try {
            const userRecord = await getAuth().getUser(query);
            userData = {
              uid: userRecord.uid,
              email: userRecord.email,
              emailVerified: userRecord.emailVerified,
              displayName: userRecord.displayName,
              photoURL: userRecord.photoURL,
              disabled: userRecord.disabled,
              metadata: {
                creationTime: userRecord.metadata.creationTime,
                lastSignInTime: userRecord.metadata.lastSignInTime,
              },
            };
          } catch (authError: unknown) {
            const error = authError as { code?: string };
            if (error.code !== "auth/user-not-found") {
              throw authError;
            }
          }
        }

        // If we found a user in Auth, get their Firestore data
        if (userData) {
          const userDoc = await db.collection("users").doc(userData.uid).get();
          if (userDoc.exists) {
            const docData = userDoc.data();
            firestoreData = {
              fullName: docData?.fullName,
              handle: docData?.handle,
              schoolId: docData?.schoolId,
              role: docData?.role,
              isBuilder: docData?.isBuilder,
              createdAt: docData?.createdAt?.toDate(),
              updatedAt: docData?.updatedAt?.toDate(),
            };
          }
        } else {
          // If not found by email/UID, try searching Firestore by handle or name
          const usersRef = db.collection("users");

          // Search by handle
          const handleQuery = await usersRef
            .where("handle", "==", query)
            .limit(1)
            .get();
          if (!handleQuery.empty) {
            const doc = handleQuery.docs[0];
            const docData = doc.data();

            firestoreData = {
              fullName: docData?.fullName,
              handle: docData?.handle,
              schoolId: docData?.schoolId,
              role: docData?.role,
              isBuilder: docData?.isBuilder,
              createdAt: docData?.createdAt?.toDate(),
              updatedAt: docData?.updatedAt?.toDate(),
            };

            // Get Auth data for this user
            try {
              const userRecord = await getAuth().getUser(doc.id);
              userData = {
                uid: userRecord.uid,
                email: userRecord.email,
                emailVerified: userRecord.emailVerified,
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
                disabled: userRecord.disabled,
                metadata: {
                  creationTime: userRecord.metadata.creationTime,
                  lastSignInTime: userRecord.metadata.lastSignInTime,
                },
              };
            } catch {
              // User exists in Firestore but not in Auth (orphaned data)
              logger.warn(`User ${doc.id} exists in Firestore but not in Auth`);
            }
          }
        }

        // Return combined data
        return NextResponse.json({
          found: userData !== null || firestoreData !== null,
          auth: userData,
          profile: firestoreData,
        });
      } catch (searchError) {
        logger.error("User lookup error:", searchError);
        return NextResponse.json(
          { error: "Error searching for user" },
          { status: 500 }
        );
      }
    } catch (authError) {
      logger.error("Failed to verify admin token:", authError);
      return NextResponse.json(
        { error: "Invalid admin token" },
        { status: 401 }
      );
    }
  } catch (error) {
    logger.error("Lookup user error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
