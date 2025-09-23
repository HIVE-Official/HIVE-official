import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "@/lib/logger";
import { withAdminAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

// Validation schema
const lookupUserSchema = z.object({
  query: z.string().min(1, "Search query is required") });

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

export const POST = withAdminAuthAndErrors(
  async (request: AuthenticatedRequest, context: any, respond: any) => {
    // Validate request body
    const body = await request.json();
    const validation = lookupUserSchema.safeParse(body);

    if (!validation.success) {
      return respond.badRequest(validation.error.errors[0].message);
    }

    const { query } = validation.data;
    const currentUserId = getUserId(request);
    const db = getFirestore();

    let userData: UserData | null = null;
    let firestoreData: FirestoreUserData | null = null;

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
              logger.warn('Orphaned user data found', {
                userId: doc.id,
                endpoint: '/api/admin/lookup-user'
              });
            }
          }
        }

    logger.info('Admin user lookup completed', {
      search: query,
      metadata: { found: userData !== null || firestoreData !== null },
      adminUserId: currentUserId,
      endpoint: '/api/admin/lookup-user'
    });

    // Return combined data
    return respond.success({
      found: userData !== null || firestoreData !== null,
      auth: userData,
      profile: firestoreData
    });
  }
);
