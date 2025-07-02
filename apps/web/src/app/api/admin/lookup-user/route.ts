import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";
import { logger } from "@hive/core";

const lookupUserSchema = z.object({
  query: z.string().min(1, "Query is required"),
});

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

interface FirestoreUserData {
  fullName?: string;
  handle?: string;
  schoolId?: string;
  role?: string;
  isBuilder?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to verify admin authentication
async function verifyAdminAuth(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Authorization header required");
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    throw new Error("Invalid authorization format");
  }

  const decodedToken = await getAuth().verifyIdToken(token);
  
  // Check if current user is admin
  const db = getFirestore();
  const currentUserDoc = await db
    .collection("users")
    .doc(decodedToken.uid)
    .get();
  const currentUserData = currentUserDoc.data() as FirestoreUserData | undefined;

  if (!currentUserData || currentUserData.role !== "admin") {
    throw new Error("Admin access required");
  }

  return decodedToken.uid;
}

// Helper function to lookup user by email or UID
async function lookupUserInAuth(query: string): Promise<UserData | null> {
  try {
    let userRecord;
    
    if (query.includes("@")) {
      userRecord = await getAuth().getUserByEmail(query);
    } else {
      userRecord = await getAuth().getUser(query);
    }

    return {
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
    if (error.code === "auth/user-not-found") {
      return null;
    }
    throw authError;
  }
}

// Helper function to get Firestore data for a user
async function getFirestoreUserData(uid: string): Promise<FirestoreUserData | null> {
  const db = getFirestore();
  const userDoc = await db.collection("users").doc(uid).get();
  
  if (!userDoc.exists) {
    return null;
  }

  const docData = userDoc.data();
  return {
    fullName: docData?.fullName,
    handle: docData?.handle,
    schoolId: docData?.schoolId,
    role: docData?.role,
    isBuilder: docData?.isBuilder,
    createdAt: docData?.createdAt?.toDate(),
    updatedAt: docData?.updatedAt?.toDate(),
  };
}

// Helper function to search by handle in Firestore
async function searchByHandle(query: string): Promise<{ userData: UserData | null; firestoreData: FirestoreUserData | null }> {
  const db = getFirestore();
  const usersRef = db.collection("users");

  const handleQuery = await usersRef
    .where("handle", "==", query)
    .limit(1)
    .get();

  if (handleQuery.empty) {
    return { userData: null, firestoreData: null };
  }

  const doc = handleQuery.docs[0];
  const docData = doc.data();

  const firestoreData: FirestoreUserData = {
    fullName: docData?.fullName,
    handle: docData?.handle,
    schoolId: docData?.schoolId,
    role: docData?.role,
    isBuilder: docData?.isBuilder,
    createdAt: docData?.createdAt?.toDate(),
    updatedAt: docData?.updatedAt?.toDate(),
  };

  // Get Auth data for this user
  let userData: UserData | null = null;
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

  return { userData, firestoreData };
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { query } = lookupUserSchema.parse(body);

    // Verify admin authentication
    await verifyAdminAuth(request);

    let userData: UserData | null = null;
    let firestoreData: FirestoreUserData | null = null;

    try {
      // Try to lookup by email or UID first
      userData = await lookupUserInAuth(query);

      // If we found a user in Auth, get their Firestore data
      if (userData) {
        firestoreData = await getFirestoreUserData(userData.uid);
      } else {
        // If not found by email/UID, try searching Firestore by handle
        const searchResult = await searchByHandle(query);
        userData = searchResult.userData;
        firestoreData = searchResult.firestoreData;
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
  } catch (error) {
    logger.error("Lookup user error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message === "Authorization header required" || error.message === "Invalid authorization format") {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }
      if (error.message === "Admin access required") {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }
      if (error.message === "Invalid admin token") {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
